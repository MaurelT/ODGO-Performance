<?php
namespace App\Model\Entity;

use Cake\ORM\Entity;

/**
 * UserAbonnementEngagement Entity
 *
 * @property int $id
 * @property string $stripe_id
 * @property int $user_id
 * @property int $user_abonnement_id
 * @property \Cake\I18n\FrozenTime $date_debut
 * @property \Cake\I18n\FrozenTime $date_fin
 * @property bool $is_active
 * @property bool $gift_have_been_given
 *
 * @property \App\Model\Entity\User $user
 * @property \App\Model\Entity\AbonnementEngagement $abonnement_engagement
 */
class UserAbonnementEngagement extends Entity
{
    /**
     * Fields that can be mass assigned using newEntity() or patchEntity().
     *
     * Note that when '*' is set to true, this allows all unspecified fields to
     * be mass assigned. For security purposes, it is advised to set '*' to false
     * (or remove it), and explicitly make individual fields accessible as needed.
     *
     * @var array
     */
    protected $_accessible = [
        'stripe_id' => true,
        'user_id' => true,
        'user_abonnement_id' => true,
        'date_debut' => true,
        'date_fin' => true,
        'is_active' => true,
        'gift_have_been_given' => true,
        'user' => true,
        'abonnement_engagement' => true
    ];
}
