<?php
namespace App\Model\Entity;

use Cake\ORM\Entity;

/**
 * Programme Entity
 *
 * @property int $id
 * @property int|null $programme_type_id
 * @property string $name
 * @property int $zone_id
 * @property int $intensite_min
 * @property int|null $intensite_max
 *
 * @property \App\Model\Entity\ProgrammeType $programme_type
 * @property \App\Model\Entity\Zone $zone
 * @property \App\Model\Entity\ProgrammeVideo[] $programme_videos
 */
class Programme extends Entity
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
        'programme_type_id' => true,
        'name' => true,
        'zone_id' => true,
        'intensite_min' => true,
        'intensite_max' => true,
        'programme_type' => true,
        'zone' => true,
        'programme_videos' => true
    ];
}
