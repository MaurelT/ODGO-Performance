<?php
namespace App\Model\Entity;

use Cake\ORM\Entity;

/**
 * UserSemaineType Entity
 *
 * @property int $id
 * @property int $user_id
 * @property int $jour
 * @property string $periode
 * @property \Cake\I18n\FrozenTime $heure_debut
 * @property \Cake\I18n\FrozenTime $heure_fin
 * @property int $activite_type_id
 * @property \Cake\I18n\FrozenTime|null $created
 * @property \Cake\I18n\FrozenTime|null $modified
 * @property bool|null $is_active
 *
 * @property \App\Model\Entity\User $user
 * @property \App\Model\Entity\ActiviteType $activite_type
 * @property \App\Model\Entity\UserCalendrier[] $user_calendriers
 */
class UserSemaineType extends Entity
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
        'jour' => true,
        'periode' => true,
        'heure_debut' => true,
        'heure_fin' => true,
        'activite_type_id' => true,
        'created' => true,
        'modified' => true,
        'is_active' => true,
        'user' => true,
        'activite_type' => true,
        'user_calendriers' => true
    ];
}
