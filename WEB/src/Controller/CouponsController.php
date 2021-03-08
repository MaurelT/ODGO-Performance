<?php

namespace App\Controller;

use Cake\Http\Response;
use App\Controller\AppController;

class CouponsController extends AppController
{
    public function verif()
    {
        $this->viewBuilder()->setLayout('ajax');
        if ($this->getRequest()->is('POST')) {
            $coupon = $this->Coupons->find()->where(['LOWER(code)' => strtolower($this->getRequest()->getData('code'))])->first();
            if ($coupon) {
                return new Response([
                    'statusCode' => 200,
                    'status' => 200,
                    'type' => 'json',
                    'body' => json_encode($coupon->toArray()),
                ]);
            }
            return null;
        }
    }

}
