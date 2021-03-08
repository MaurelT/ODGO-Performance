<?php

/**
 * CakePHP(tm) : Rapid Development Framework (https://cakephp.org)
 * Copyright (c) Cake Software Foundation, Inc. (https://cakefoundation.org)
 *
 * Licensed under The MIT License
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright Copyright (c) Cake Software Foundation, Inc. (https://cakefoundation.org)
 * @link      https://cakephp.org CakePHP(tm) Project
 * @since     0.2.9
 * @license   https://opensource.org/licenses/mit-license.php MIT License
 */

namespace App\Controller;

use Cake\Controller\Controller;
use Cake\Event\Event;

/**
 * Application Controller
 *
 * Add your application-wide methods in the class below, your controllers
 * will inherit them.
 *
 * @link https://book.cakephp.org/3.0/en/controllers.html#the-app-controller
 */
class AppController extends Controller
{
    /**
     * Initialization hook method.
     *
     * Use this method to add common initialization code like loading components.
     *
     * e.g. `$this->loadComponent('Security');`
     *
     * @return void
     */
    public function initialize()
    {
        parent::initialize();

        $this->loadComponent('RequestHandler', [
            'enableBeforeRedirect' => false,
        ]);
        $this->loadComponent('Flash');
        $this->loadComponent('Auth', [
            'loginRedirect' => array(
                'controller' => 'Pages',
                'action' => 'index'
            ),
            'authenticate' => [
                'Form' => [
                    'fields' => ['username' => 'email']
                ],
            ],
            'authError' => false
        ]);
        

        /*
         * Enable the following component for recommended CakePHP security settings.
         * see https://book.cakephp.org/3.0/en/controllers/components/security.html
         */
        //$this->loadComponent('Security');
    }

    /**
     * Called before the controller action. You can use this method to configure and customize components
     * or perform logic that needs to happen before each controller action.
     *
     * @param \Cake\Event\Event $event An Event instance
     * @return \Cake\Http\Response|null
     * @link https://book.cakephp.org/3.0/en/controllers.html#request-life-cycle-callbacks
     */
    public function beforeFilter(\Cake\Event\Event $event)
    {
        parent::beforeFilter($event);
        if ($this->Auth) {
            $this->set('auth', $this->Auth->user());
        }
        $censure = true;
        if (in_array($this->request->clientIp(), ['31.37.12.207', '::1', '86.241.190.69', '109.190.129.33'])) {
            $censure = false;
        }
        $this->set(compact('censure'));

        $is_connected = (!empty($this->Auth->user('id'))) ? true : false;

        if ($this->request->getParam('prefix') == 'admin' && $this->request->getParam('action') != 'login') {
            if ($is_connected) {
                if ($this->Auth->user('is_admin') == 1) {
                    $this->viewBuilder()->setLayout('admin');
                    $this->set('user_connect', $this->Auth->user());
                    $this->set('user_connect_role', 'Administrateur');
                } else {
                    $this->Flash->error('Accès interdit');
                    return $this->redirect('/');
                }
            } else {
                return $this->redirect('/admin/users/login');
            }
        }

        if ($this->request->getParam('prefix') == 'admin') {
            $this->viewBuilder()->setLayout('admin');

            $this->set('user_connect', $this->Auth->user());
        }
    }

}
