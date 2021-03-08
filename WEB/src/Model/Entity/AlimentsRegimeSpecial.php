<?php
namespace App\Model\Entity;

use Cake\ORM\Entity;

/**
 * AlimentsRegimeSpecial Entity
 *
 * @property int $id
 * @property int $aliment_id
 * @property int $regime_special_id
 *
 * @property \App\Model\Entity\Aliment $aliment
 * @property \App\Model\Entity\RegimeSpecial $regime_special
 */
class AlimentsRegimeSpecial extends Entity
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
        'regime_special_id' => true,
        'aliment' => true,
        'regime_special' => true
    ];
}
