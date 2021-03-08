<?php
namespace App\Model\Entity;

use Cake\ORM\Entity;

/**
 * VideoZoneTest Entity
 *
 * @property int $id
 * @property int $zone_test_id
 * @property int $video_id
 *
 * @property \App\Model\Entity\ZoneTest $zone_test
 * @property \App\Model\Entity\Video $video
 */
class VideoZoneTest extends Entity
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
        'zone_test_id' => true,
        'video_id' => true,
        'zone_test' => true,
        'video' => true
    ];
}
