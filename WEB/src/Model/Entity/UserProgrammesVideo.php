<?php
namespace App\Model\Entity;

use Cake\ORM\Entity;

/**
 * UserProgrammesVideo Entity
 *
 * @property int $id
 * @property int $user_programme_id
 * @property int $video_id
 * @property int $ordre
 *
 * @property \App\Model\Entity\UserProgramme $user_programme
 * @property \App\Model\Entity\Video $video
 */
class UserProgrammesVideo extends Entity
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
        'user_programme_id' => true,
        'video_id' => true,
        'ordre' => true,
        'user_programme' => true,
        'video' => true
    ];
}
