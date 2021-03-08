<?php
namespace App\Model\Entity;

use Cake\ORM\Entity;

/**
 * UserTension Entity
 *
 * @property int $id
 * @property int $user_id
 * @property int $zone_id
 * @property int $intensite
 * @property \Cake\I18n\FrozenDate $date
 *
 * @property \App\Model\Entity\User $user
 * @property \App\Model\Entity\Zone $zone
 */
class UserTension extends Entity
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
        'zone_id' => true,
        'intensite' => true,
        'date' => true,
        'user' => true,
        'zone' => true
    ];
}
