<?php
namespace App\Model\Entity;

use Cake\ORM\Entity;

/**
 * VideoTest Entity
 *
 * @property int $id
 * @property string $name
 * @property string $text
 * @property string $url_youtube
 * @property int $zone_test_id
 *
 * @property \App\Model\Entity\ZoneTest $zone_test
 * @property \App\Model\Entity\VideoTestReponse[] $video_test_reponses
 */
class VideoTest extends Entity
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
        'text' => true,
        'url_youtube' => true,
        'zone_test_id' => true,
        'zone_test' => true,
        'video_test_reponses' => true
    ];
}
