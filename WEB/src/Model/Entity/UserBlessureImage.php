<?php
namespace App\Model\Entity;

use Cake\ORM\Entity;

/**
 * UserBlessureImage Entity
 *
 * @property int $id
 * @property int $user_blessure_id
 * @property string $filename
 *
 * @property \App\Model\Entity\UserBlessure $user_blessure
 */
class UserBlessureImage extends Entity
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
        'user_blessure_id' => true,
        'filename' => true,
        'user_blessure' => true
    ];
}
