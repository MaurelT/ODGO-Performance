<?php
namespace App\Model\Entity;

use Cake\ORM\Entity;

/**
 * UserHydratation Entity
 *
 * @property int $id
 * @property int $user_id
 * @property int $hydratation_contenant_id
 * @property \Cake\I18n\FrozenTime $date
 *
 * @property \App\Model\Entity\User $user
 * @property \App\Model\Entity\HydratationContenant $hydratation_contenant
 */
class UserHydratation extends Entity
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
        'user_id' => true,
        'hydratation_contenant_id' => true,
        'date' => true,
        'user' => true,
        'hydratation_contenant' => true
    ];
}
