<?php
namespace App\Model\Entity;

use Cake\ORM\Entity;

/**
 * AlimentsRepasType Entity
 *
 * @property int $id
 * @property int $aliment_id
 * @property int $aliments_repas_types_id
 *
 * @property \App\Model\Entity\Aliment $aliment
 * @property \App\Model\Entity\AlimentsRepasType $aliments_repas_type
 */
class AlimentsRepasType extends Entity
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
        'aliment_id' => true,
        'aliments_repas_types_id' => true,
        'aliment' => true,
        'aliments_repas_type' => true
    ];
}
