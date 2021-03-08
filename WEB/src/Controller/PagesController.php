<?php

namespace App\Controller;

use Cake\Event\Event;
use Cake\Mailer\Email;
use Exception;
use GuzzleHttp\Client;
use SendinBlue\Client\Api\SMTPApi;
use SendinBlue\Client\Configuration;
use SendinBlue\Client\Api\ContactsApi;
use SendinBlue\Client\Model\CreateContact;
use SendinBlue\Client\Model\SendSmtpEmail;
use SendinBlue\Client\Model\SendSmtpEmailSender;
use SendinBlue\Client\Model\SendSmtpEmailTo;

class PagesController extends AppController
{
    private function addingOnSendinBlue(string $email)
    {
        $config = Configuration::getDefaultConfiguration()->setApiKey("api-key", "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");

        $apiInstance = new ContactsApi(
                // If you want use custom http client, pass your client which implements `GuzzleHttp\ClientInterface`.
                // This is optional, `GuzzleHttp\Client` will be used as default.
                new Client(), $config
        );
        $createContact = new CreateContact(); // \SendinBlue\Client\Model\CreateContact | Values to create a contact
        $createContact['email'] = $email;
        $createContact['listIds'] = [6];
        try {
            $apiInstance->createContact($createContact);
            $this->Flash->success(__('Votre email a bien été ajouté.'));
            $this->sendRegisterMail($email);
        } catch (Exception $e) {
            $this->Flash->error(__('Votre email est déjà présent dans notre liste.'));
        }
    }

    private function sendRegisterMail($email)
    {
        $config = Configuration::getDefaultConfiguration()->setApiKey("api-key", "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");

        $apiInstance = new SMTPApi(
                // If you want use custom http client, pass your client which implements `GuzzleHttp\ClientInterface`.
                // This is optional, `GuzzleHttp\Client` will be used as default.
                new Client(), $config
        );
        $sendSmtpEmail = new SendSmtpEmail([
            'sender' => new SendSmtpEmailSender([
                'name' => 'Odgo performance',
                'email' => 'contact@odgoperformance.com',
                    ]),
            'to' => [
                new SendSmtpEmailTo([
                    'email' => $email,
                        ])
            ],
            'templateId' => 16
        ]);
        try {
            $apiInstance->sendTransacEmail($sendSmtpEmail);
        } catch (Exception $e) {
            $this->Flash->error(__('Une erreur est survenue lors de l\'envoie du mail d\'inscription.'));
        }
    }

    public function beforeFilter(Event $event)
    {
        parent::beforeFilter($event);
        $this->Auth->allow();
    }

    public function index()
    {
        if ($this->Auth->user()) {
            $this->viewBuilder()->setLayout('default_connect');
        }

        $this->loadModel('Sports');
        $sports = $this->Sports->find()->where(['is_active' => 1])->order(['name' => 'ASC']);
        $this->set(compact('sports'));

        $this->loadModel('Problematiques');
        $problematiques = $this->Problematiques->find()->where(['user_id IS NULL']);
        $this->set(compact('problematiques'));

        $this->loadModel('CmsIntroduction');
        $cms_introduction = $this->CmsIntroduction->find()->first();

        $this->loadModel('CmsFonctionnalite');
        $cms_fonctionnalite = $this->CmsFonctionnalite->find()->first();

        $this->loadModel('CmsOffres');
        $cms_offres = $this->CmsOffres->find()->first();

        $this->set(compact('cms_introduction', 'cms_fonctionnalite', 'cms_offres'));

        if ($this->getRequest()->is(['post'])) {
            $recaptcha = new \ReCaptcha\ReCaptcha("6LcbJeQUAAAAAMVill64MgmVqoNQPCyZA0oy2IWL");
            $resp = $recaptcha->setScoreThreshold(0.5)
                    ->verify($this->getRequest()->getData('recaptcha_token'));

            if ($resp->isSuccess()) {

                $this->addingOnSendinBlue($this->request->getData('email'));
            } else {
                $this->Flash->error(__('Une erreur est survenue. (captcha)'));
            }
            return $this->redirect(['controller' => 'Pages', 'action' => 'index']);
        }
    }

    public function quiSommesNous() {
      $this->render('/Pages/qui_sommes_nous');
    }

    public function NosProgrammes() {
      $this->render('/Pages/nos_programmes');
    }

    public function ilsNousFontConfiance() {
      $this->render('/Pages/ils_nous_font_confiance');
    }

    public function contact()
    {
        $recaptcha = new \ReCaptcha\ReCaptcha("6LcbJeQUAAAAAMVill64MgmVqoNQPCyZA0oy2IWL");
        $resp = $recaptcha->setScoreThreshold(0.5)
                ->verify($this->getRequest()->getData('recaptcha_token'));

        if ($resp->isSuccess()) {

            $this->loadModel('Contacts');
            $contact = $this->Contacts->newEntity($this->getRequest()->getData());
            $contact->tel = $this->getRequest()->getData('phone');
            if ($this->Contacts->save($contact)) {

            }

            $email = new Email();
            $email->setTo('contact@odgoperformance.com');
            $email->viewBuilder()->setTemplate('contact');
            $email->setEmailFormat('html');
            $email->setSubject('[ODGO] Demande de contact');
            $email->setViewVars(['data' => $this->getRequest()->getData()]);
            if ($email->send()) {
                $this->Flash->success(__('Votre demande de contact a bien été envoyée.'));
            } else {
                $this->Flash->error(__('Une erreur est survenue, lors de l\'envoi de l\'email.'));
            }
        } else {
            $this->Flash->error(__('Une erreur est survenue. (captcha)'));
        }
        return $this->redirect(['action' => 'index']);
    }

    public function politiqueDeConfidentialite()
    {
        if ($this->Auth->user()) {
            $this->viewBuilder()->setLayout('default_connect');
        }
    }

    public function cgu()
    {
        if ($this->Auth->user()) {
            $this->viewBuilder()->setLayout('default_connect');
        }
    }

    public function cgv()
    {
        if ($this->Auth->user()) {
            $this->viewBuilder()->setLayout('default_connect');
        }
    }

    public function updateSubscription()
    {
        $this->render(false, false);
        if ($this->getRequest()->is('POST')) {
            $this->loadModel('UserAbonnementEngagement');

            $filleulAbonnement = $this->UserAbonnementEngagement->find()
                    ->contain('Users')
                    ->where([
                        'UserAbonnementEngagement.stripe_id' => $this->getRequest()->getData('data.object.id'),
                        'UserAbonnementEngagement.is_active' => 1,
                        'UserAbonnementEngagement.gift_have_been_given' => 0,
                        'UserAbonnementEngagement.date_debut <= ' => date('Y-m-d') . ' 00:00:00',
                        'UserAbonnementEngagement.date_fin >=' => date('Y-m-d') . ' 00:00:00',
                    ])
                    ->first();

            if (!empty($filleulAbonnement)) {

                $parrainAboonnement = $this->UserAbonnementEngagement->find()
                        ->where([
                            'UserAbonnementEngagement.user_id' => $filleulAbonnement->user->user_id, // ID du parain
                            'UserAbonnementEngagement.is_active' => 1,
                            'UserAbonnementEngagement.date_debut <= ' => date('Y-m-d') . ' 00:00:00',
                            'UserAbonnementEngagement.date_fin >=' => date('Y-m-d') . ' 00:00:00',
                        ])
                        ->first();

                if (!empty($parrainAboonnement)) {
                    $parrainAboonnement->date_fin = $parrainAboonnement->date_fin->modify('+1 month');
                    $stripe = \Stripe\Subscription::update(
                                    $parrainAboonnement->stripe_id, [
                                'billing_cycle_anchor' => $parrainAboonnement->date_fin->getTimestamp(),
                                    ]
                    );
                    $this->UserAbonnementEngagement->save($parrainAboonnement);

                    $filleulAbonnement->gift_have_been_given = 1;
                    $this->UserAbonnementEngagement->save($filleulAbonnement);
                }
            }
        }
    }

}
