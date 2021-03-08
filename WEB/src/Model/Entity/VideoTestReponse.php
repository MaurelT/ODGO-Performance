<?php
namespace App\Model\Entity;

use Cake\ORM\Entity;

/**
 * VideoTestReponse Entity
 *
 * @property int $id
 * @property string $image
 * @property int $note
 * @property int $video_test_id
 *
 * @property \App\Model\Entity\VideoTest $video_test
 */
class VideoTestReponse extends Entity
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
        'image' => true,
        'note' => true,
        'video_test_id' => true,
        'video_test' => true
    ];
}
