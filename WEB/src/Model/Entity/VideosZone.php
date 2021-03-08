<?php
namespace App\Model\Entity;

use Cake\ORM\Entity;

/**
 * VideosZone Entity
 *
 * @property int $id
 * @property int $video_id
 * @property int|null $zone_id
 *
 * @property \App\Model\Entity\Video $video
 * @property \App\Model\Entity\Zone $zone
 */
class VideosZone extends Entity
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
        'video_id' => true,
        'zone_id' => true,
        'video' => true,
        'zone' => true
    ];
}
