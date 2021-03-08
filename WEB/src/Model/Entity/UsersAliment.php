<?php
namespace App\Model\Entity;

use Cake\ORM\Entity;

/**
 * UsersAliment Entity
 *
 * @property int $id
 * @property int $user_id
 * @property int $aliment_id
 * @property int $repas_type_id
 * @property \Cake\I18n\FrozenDate $date
 * @property float $quantite
 * @property \Cake\I18n\FrozenTime|null $created
 * @property \Cake\I18n\FrozenTime|null $modified
 *
 * @property \App\Model\Entity\User $user
 * @property \App\Model\Entity\Aliment $aliment
 * @property \App\Model\Entity\RepasType $repas_type
 */
class UsersAliment extends Entity
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
        'user_id' => true,
        'aliment_id' => true,
        'repas_type_id' => true,
        'date' => true,
        'quantite' => true,
        'created' => true,
        'modified' => true,
        'user' => true,
        'aliment' => true,
        'repas_type' => true
    ];
}
