<?php
namespace App\Model\Entity;

use Cake\ORM\Entity;

/**
 * AlimentsRepa Entity
 *
 * @property int $id
 * @property int $aliment_id
 * @property int $repa_id
 * @property int $quantite
 *
 * @property \App\Model\Entity\Aliment $aliment
 * @property \App\Model\Entity\Repa $repa
 */
class AlimentsRepa extends Entity
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
        'repa_id' => true,
        'quantite' => true,
        'aliment' => true,
        'repa' => true
    ];
}
