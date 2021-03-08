<?php
namespace App\Model\Entity;

use Cake\ORM\Entity;

/**
 * ObjectifsRepasType Entity
 *
 * @property int $id
 * @property int $objectif_id
 * @property int $repas_type_id
 * @property int $percent
 *
 * @property \App\Model\Entity\Objectif $objectif
 * @property \App\Model\Entity\RepasType $repas_type
 */
class ObjectifsRepasType extends Entity
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
        'objectif_id' => true,
        'repas_type_id' => true,
        'percent' => true,
        'objectif' => true,
        'repas_type' => true
    ];
}
