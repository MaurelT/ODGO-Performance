<?php

namespace App\Model\Entity;

use Cake\ORM\Entity;

/**
 * Aliment Entity
 *
 * @property int $id
 * @property int $aliment_type_id
 * @property int|null $famille_aliment_id
 * @property string $name
 * @property int $quantity_recommanded
 * @property float $kcalorie_pour_100g
 * @property float $glucide_pour_100g
 * @property float $proteine_pour_100g
 * @property float $lipide_pour_100g
 * @property float $portion_en_g
 * @property float $portion_en_ml
 * @property bool|null $is_active
 * @property \Cake\I18n\FrozenTime|null $created
 * @property \Cake\I18n\FrozenTime|null $modified
 *
 * @property \App\Model\Entity\FamilleAliment $famille_aliment
 * @property \App\Model\Entity\AlimentType $aliment_type
 * @property \App\Model\Entity\RegimeSpecial[] $regime_specials
 * @property \App\Model\Entity\RepasType[] $repas_types
 * @property \App\Model\Entity\User[] $users
 */
class Aliment extends Entity
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
        'aliment_type_id' => true,
        'famille_aliment_id' => true,
        'name' => true,
        'quantity_recommanded' => true,
        'kcalorie_pour_100g' => true,
        'glucide_pour_100g' => true,
        'proteine_pour_100g' => true,
        'lipide_pour_100g' => true,
        'portion_en_g' => true,
        'portion_en_ml' => true,
        'is_active' => true,
        'is_portion' => true,
        'created' => true,
        'modified' => true,
        'famille_aliment' => true,
        'aliment_type' => true,
        'regime_specials' => true,
        'repas_types' => true,
        'users' => true
    ];
}
