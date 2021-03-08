<?php
namespace App\Model\Entity;

use Cake\ORM\Entity;

/**
 * Video Entity
 *
 * @property int $id
 * @property int|null $video_object_id
 * @property string $name
 * @property int $video_type_id
 * @property int|null $indice
 * @property string $lien_youtube
 * @property string|null $position_outil
 * @property string|null $position_corps
 * @property string|null $instruction
 *
 * @property \App\Model\Entity\VideoObject $video_object
 * @property \App\Model\Entity\VideoType $video_type
 * @property \App\Model\Entity\ProgrammeVideo[] $programme_videos
 * @property \App\Model\Entity\Zone[] $zones
 */
class Video extends Entity
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
        'video_object_id' => true,
        'picture' => true,
        'name' => true,
        'video_type_id' => true,
        'indice' => true,
        'lien_youtube' => true,
        'instruction' => true,
        'position_corps' => true,
        'position_outil' => true,
        'video_object' => true,
        'video_type' => true,
        'programme_videos' => true,
        'programme_type_id' => true,
        'restriction' => true,
        'zones' => true
    ];
}
