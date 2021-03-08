<?php

namespace App\Model\Entity;

use Cake\ORM\Entity;

/**
 * ZoneTest Entity
 *
 * @property int $id
 * @property string $name
 *
 * @property \App\Model\Entity\VideoTest[] $video_tests
 */
class ZoneTest extends Entity {

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
        'point_faible' => true,
        'point_fort' => true,
        'video_tests' => true
    ];

}
