<?php

namespace App\Controller;

use App\Controller\AppController;
use Cake\Auth\DefaultPasswordHasher;
use Cake\Event\Event;
use Cake\Mailer\Email;
use Cake\Routing\Router;
use DateTime;
use Exception;
use JBZoo\Image\Image;
use Stripe\Customer;
use Stripe\Exception\CardException;
use Stripe\Stripe;

class UsersController extends AppController {

    public function beforeFilter(Event $event) {
        parent::beforeFilter($event);
        $this->Auth->allow(['login', 'add']);
    }

    private function _genCodeParrain(): string {
        $alphabet = '1234567890';
        $pass = array();
        $alphaLength = strlen($alphabet) - 1;
        for ($i = 0; $i < 7; $i++) {
            $n = rand(0, $alphaLength);
            $pass[] = $alphabet[$n];
        }
        return implode($pass);
    }

    /**
     * Renvois l'abonnement actif du user connecté OU FAUX si l'user n'a pas d'abonnements actifs
     * @return boolean
     */
    private function _getAbonnementActif() {
        $this->loadModel('UserAbonnementEngagement');
        $abonnement = $this->UserAbonnementEngagement
                ->find()
                ->contain(['AbonnementEngagement.Abonnements', 'AbonnementEngagement.Engagements'])
                ->where(['is_active' => 1, 'user_id' => $this->Auth->user('id')])
                ->first();
        if ($abonnement) {
            return $abonnement;
        }
        return false;
    }

    public function login() {
        if ($this->Auth->user()) {
            return $this->redirect('/');
        }

        $user = $this->Auth->identify();
        if ($user) {
            $user = $this->Users->findById($user['id'])->contain(['Sports'])->first();
            $this->Auth->setUser($user);
            return $this->redirect('/users/mon-abonnement');
        } else {
            $this->Flash->error(__('Votre identifiant/mot de passe est incorrect.'));
            return $this->redirect('/');
        }
    }

    public function logout() {
        $this->Auth->logout();
        return $this->redirect('/');
    }

    public function add() {
        $recaptcha = new \ReCaptcha\ReCaptcha("6LcbJeQUAAAAAMVill64MgmVqoNQPCyZA0oy2IWL");
        $resp = $recaptcha->setScoreThreshold(0.5)
                ->verify($this->getRequest()->getData('recaptcha_token'));


        if ($resp->isSuccess()) {
            $user = $this->Users->newEntity($this->getRequest()->getData());
            if ($this->getRequest()->getData('password') !== $this->getRequest()->getData('password-confirmation')) {
                $this->Flash->error(__('Vos mots de passe ne sont pas identiques.'));
                return $this->redirect('/');
            }
            if ($this->getRequest()->getData('problematique_id') == 5) {
                $this->loadModel('Problematiques');
                $problematique = $this->Problematiques->newEntity();
                $problematique->name = $this->getRequest()->getData('autre');
                $problematique->user_id = $this->Auth->user('id');
                if ($this->Problematiques->save($problematique)) {
                    $user->problematique_id = $problematique->id;
                }
            }
            $user->code_parrain = $this->_genCodeParrain();
            if (!empty($this->getRequest()->getData('code_parrain'))) {
                $parrain = $this->Users->findByCodeParrain($this->getRequest()->getData('code_parrain'))->first();
                if (!empty($parrain)) {
                    $user->user_id = $parrain->id;
                } else {
                    $this->Flash->error(__('Le parrain est inexistant.'));
                }
            }
            
            $user_entity->last_connexion = date('Y-m-d H:i:s');
            
            if ($this->Users->save($user)) {
                $email = new Email();
                $email->setTo($user->email);
                $email->viewBuilder()->setTemplate('register');
                $email->setEmailFormat('html');
                $email->setSubject('[ODGO] Confirmation d\'inscription');
                $email->setViewVars(['user' => $user]);
                if ($email->send()) {
                    $this->Flash->success(__('Votre compte a été créé.'));
                } else {
                    $this->Flash->success(__('Votre compte a été créé, mais aucun email a été envoyé.'));
                }

                $this->Auth->setUser($user);
                return $this->redirect(['action' => 'monAbonnement']);
            } else {
                $this->Flash->error(__('Une erreur est survenue.'));
            }
        } else {
            $this->Flash->error(__('Une erreur est survenue. (captcha)'));
        }
        return $this->redirect('/');
    }

    public function monAbonnement() {
        $this->viewBuilder()->setLayout('connect');

        // Abonnement actif du User :
        $abonnement = $this->_getAbonnementActif();
        $this->set(compact('abonnement'));

        // Historique abonnements
        $this->loadModel('UserAbonnementEngagement');
        $history = $this->UserAbonnementEngagement
                ->find()
                ->contain(['AbonnementEngagement.Abonnements', 'AbonnementEngagement.Engagements'])
                ->where(['is_active' => 0, 'user_id' => $this->Auth->user('id')])
                ->order(['UserAbonnementEngagement.id' => 'DESC']);
        $this->set(compact('history'));
    }

    public function mesInformations() {
        $this->viewBuilder()->setLayout('connect');
        $user = $this->Users->findById($this->Auth->user('id'))->contain(['Sports'])->first();

        if ($this->getRequest()->is(['post', 'patch', 'put'])) {
            $this->Users->patchEntity($user, $this->getRequest()->getData());

            if ($this->getRequest()->getData('problematique_id') == 5) {
                $this->loadModel('Problematiques');
                $problematique = $this->Problematiques->newEntity();
                $problematique->name = $this->getRequest()->getData('autre');
                $problematique->user_id = $this->Auth->user('id');
                if ($this->Problematiques->save($problematique)) {
                    $user->problematique_id = $problematique->id;
                }
            }

            if ($this->Users->save($user)) {
                return $this->redirect(['action' => 'mesInformations']);
            }
        }


        $filleuls = $this->Users->find()->where(['user_id' => $user->id]);
        $this->set(compact('filleuls'));

        $this->loadModel('Sports');
        $sports = $this->Sports->find()->where(['is_active' => 1])->order(['name' => 'ASC']);
        $this->set(compact('sports'));

        $this->loadModel('Problematiques');
        $problematiques = $this->Problematiques->find()->where([
            'OR' => [
                ['user_id IS NULL'],
                ['user_id' => $this->Auth->user('id')]
            ]
        ]);
        $this->set(compact('problematiques'));

        $this->set('user', $user);
    }

    public function aideContact() {
        $this->viewBuilder()->setLayout('connect');
        if ($this->request->is('post')) {
            $email = new \Cake\Mailer\Email();
            $email->setTo('contact@odgoperformance.com');
            $email->setTemplate('contact');
            $email->setEmailFormat('html');
            $email->setSubject('[ODGO] Demande de contact via votre site internet');
            $email->setViewVars(['data' => $this->request->getData()]);
            if ($email->send()) {
                $this->Flash->success(__('Votre demande de contact a bien été prise en compte.'));
            } else {
                $this->Flash->error(__('Une erreur est survenue, veuillez réessayer ultérieurement.'));
            }
            return $this->redirect(['action' => 'aideContact']);
        }
    }

    public function choixOffres() {
        $this->viewBuilder()->setLayout('connect');
        $this->loadModel('Abonnements');
        $abonnements = $this->Abonnements->find()->contain(['AbonnementEngagement.Engagements']);
        $this->set(compact('abonnements'));

        $this->loadModel('Coupons');
        $coupons = $this->Coupons->findByCode('ODGO50')->first();
        $this->set(compact('coupons'));
    }

    public function paiement($coupons = null) {
        $this->viewBuilder()->setLayout('connect');
        if ($this->getRequest()->is('POST')) {
            // L'abonnement :
            $abonnement_id = $this->getRequest()->getData('abonnement_id');

            // L'engagement :
            $engagement_id = $this->getRequest()->getData('engagement_id');

            $this->loadModel('AbonnementEngagement');
            $abonnement_engagement = $this->AbonnementEngagement->find()->contain(['Engagements', 'Abonnements'])->where(['abonnement_id' => $abonnement_id, 'engagement_id' => $engagement_id])->first();
            $this->set(compact('abonnement_engagement'));

            $this->set(compact('abonnement_id'));
            $this->set(compact('engagement_id'));
            $this->set(compact('coupons'));
        } else {
            return $this->redirect('/users/choix-offres');
        }
    }

    public function charge() {
        if ($this->getRequest()->is('POST')) {
            \Stripe\Stripe::setApiKey('sk_test_toQ2Waqdk7BogxejRK94GS0l00mQMttwVv');
            $token = $this->getRequest()->getData('stripeToken');

            $this->loadModel('Users');
            $user = $this->Users->findById($this->Auth->user('id'))->first();

            // CUSTOMER ID :
            $customer_id = $user->customer_id;
            // On vérifie si le user n'a pas déjà de customer_id :
            if (empty($customer_id)) {
                // On crée le customer
                $customer = \Stripe\Customer::create([
                            'description' => $user->lastname . ' ' . $user->firstname,
                            'email' => $user->email,
                            'source' => $token
                ]);

                // Sauvegarde customer ID :

                $user->customer_id = $customer['id'];
                $this->Users->save($user);

                $customer_id = $customer['id'];
            }

            try {
                // L'abonnement :
                $abonnement_id = $this->getRequest()->getData('abonnement_id');
                $this->loadModel('Abonnements');
                $abonnement = $this->Abonnements->findById($abonnement_id)->first();

                // L'engagement :
                $engagement_id = $this->getRequest()->getData('engagement_id');

                // L'abonnement engagement :
                $this->loadModel('AbonnementEngagement');
                $abonnement_engagement = $this->AbonnementEngagement->find()->contain(['Engagements'])->where(['abonnement_id' => $abonnement_id, 'engagement_id' => $engagement_id])->first();
                if ($this->getRequest()->getData('choix') == 'periode') {
                    $plan_id = $abonnement_engagement->plan_id_periode;
                } else {
                    $plan_id = $abonnement_engagement->plan_id_month;
                }

                $this->loadModel('UserAbonnementEngagement');
                $this->UserAbonnementEngagement->updateAll(['is_active' => 0, 'date_fin' => date('Y-m-d H:i:s')], ['user_id' => $this->Auth->user('id'), 'is_active' => 1]);
                $customer = Customer::retrieve($customer_id);
                if ($customer->subscriptions->total_count) {
                    foreach ($customer->subscriptions->data as $subscription) {
                        $subscription->cancel();
                    }
                }
                if (!empty($this->getRequest()->getData('coupon'))) {
                    $subscription = \Stripe\Subscription::create([
                                'customer' => $customer_id,
                                'items' => [
                                    [
                                        'plan' => $plan_id
                                    ],
                                ],
                                'coupon' => $this->getRequest()->getData('coupon')
                    ]);
                } else {
                    $subscription = \Stripe\Subscription::create([
                                'customer' => $customer_id,
                                'items' => [
                                    [
                                        'plan' => $plan_id
                                    ],
                                ],
                    ]);
                }

                // Update de son abonnement :
                $user_abonnement_engagement = $this->UserAbonnementEngagement->newEntity();
                $user_abonnement_engagement->user_id = $this->Auth->user('id');
                $user_abonnement_engagement->stripe_id = $subscription->id;
                $user_abonnement_engagement->user_abonnement_id = $abonnement_engagement->id;
                $user_abonnement_engagement->date_debut = date('Y-m-d H:i:s');
                $date_fin = date('Y-m-d');
                $user_abonnement_engagement->date_fin = strtotime(date('Y-m-d', strtotime($date_fin)) . ' +' . $abonnement_engagement->engagement->value . ' month');
                $user_abonnement_engagement->is_active = 1;
                if ($this->UserAbonnementEngagement->save($user_abonnement_engagement)) {
                    $this->Flash->success('Votre abonnement a bien été mis à jour.');

                    $user = $this->Users->findById($this->Auth->user('id'))->first();

                    $email = new Email();
                    $email->setTo($this->Auth->user('email'));
                    $email->viewBuilder()->setTemplate('validate_offer');
                    $email->setEmailFormat('html');
                    $email->setSubject('[ODGO] Validation d’une offre');
                    $email->setViewVars(['user' => $user, 'abonnement' => $abonnement]);
                    $email->send();
                    return $this->redirect('/users/mon-abonnement');
                }
            } catch (CardException $ex) {
                echo 'Erreur lors du paiement';
            }
        }
    }

    public function uploadPhoto() {
        if ($this->request->is('post')) {
            try {
                $user = $this->Users->findById($this->Auth->user('id'))->contain(['Sports'])->first();
                $file = $this->getRequest()->getData('picture');
                $name_img = uniqid() . '.' . strtolower(pathinfo($file['name'], PATHINFO_EXTENSION));
                $img = (new Image($file['tmp_name']))->saveAs(WWW_ROOT . 'img' . DS . 'users' . DS . $name_img, 90);
                $user->picture = Router::url('/img/users/' . $name_img, true);
                if ($this->Users->save($user)) {
                    $this->Auth->setUser($user->toArray());
                    $this->Flash->success(__('Votre photo a bien été modifiée.'));
                } else {
                    $this->Flash->error(__('Une erreur est survenue, veuillez réessayer ultérieurement.'));
                }
            } catch (Exception $ex) {
                $this->Flash->error(__('Une erreur est survenue, veuillez réessayer ultérieurement.'));
            }
        }
        return $this->redirect(['action' => 'monAbonnement']);
    }

    public function cancelOffer() {
        Stripe::setApiKey('sk_test_toQ2Waqdk7BogxejRK94GS0l00mQMttwVv');
        $this->loadModel('Users');
        $user = $this->Users->findById($this->Auth->user('id'))->first();
        $this->loadModel('UserAbonnementEngagement');
        $this->UserAbonnementEngagement->updateAll(['is_active' => 0, 'date_fin' => date('Y-m-d H:i:s')], ['user_id' => $this->Auth->user('id'), 'is_active' => 1]);
        $customer = Customer::retrieve($user->customer_id);
        foreach ($customer->subscriptions as $subscription) {
            $subscription->cancel();
        }
        return $this->redirect(['action' => 'monAbonnement']);
    }

    public function trialEnded() {
        $endDate = new DateTime();
        $endDate = $endDate->modify('-20 days');

        $users = $this->Users->find()
                ->where([
            'Users.created LIKE' => $endDate->format('Y-m-d') . '%',
            'Users.is_active' => true
        ]);
        foreach ($users as $user) {
            $email = new Email();
            $email->setTo($user->email);
            $email->viewBuilder()->setTemplate('trial_end');
            $email->setEmailFormat('html');
            $email->setSubject('[ODGO] Fin de la période d\'essai');
            $email->setViewVars(['user' => $user]);
            $email->send();
        }
    }

    public function trialWillEnded() {
        $endDate = new DateTime();
        $endDate = $endDate->modify('-25 days');

        $users = $this->Users->find()
                ->where([
            'Users.created LIKE' => $endDate->format('Y-m-d') . '%',
            'Users.is_active' => true
        ]);
        foreach ($users as $user) {
            $email = new Email();
            $email->setTo($user->email);
            $email->viewBuilder()->setTemplate('trial_will_ended');
            $email->setEmailFormat('html');
            $email->setSubject('[ODGO] Rappel de la fin de la période d\'essai');
            $email->setViewVars(['user' => $user]);
            $email->send();
        }
    }

}
