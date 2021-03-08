<?php
namespace App\Model\Entity;

use Cake\ORM\Entity;

/**
 * Suggestion Entity
 *
 * @property int $id
 * @property int $range_id
 * @property int $aliment_id
 * @property int $groupe_aliment_id
 * @property int $repas_type_id
 *
 * @property \App\Model\Entity\Range $range
 * @property \App\Model\Entity\Aliment $aliment
 * @property \App\Model\Entity\GroupeAliment $groupe_aliment
 * @property \App\Model\Entity\RepasType $repas_type
 */
class Suggestion extends Entity
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
        'range_id' => true,
        'aliment_id' => true,
        'groupe_aliment_id' => true,
        'repas_type_id' => true,
        'range' => true,
        'aliment' => true,
        'groupe_aliment' => true,
        'repas_type' => true
    ];
}
