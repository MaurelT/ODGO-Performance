<?php
namespace App\Model\Entity;

use Cake\ORM\Entity;

/**
 * Zone Entity
 *
 * @property int $id
 * @property string $name
 *
 * @property \App\Model\Entity\UserBlessure[] $user_blessures
 * @property \App\Model\Entity\UserTension[] $user_tensions
 * @property \App\Model\Entity\Video[] $videos
 */
class Zone extends Entity
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
        'name' => true,
        'user_blessures' => true,
        'user_tensions' => true,
        'videos' => true
    ];
}
