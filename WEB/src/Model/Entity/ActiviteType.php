<?php
namespace App\Model\Entity;

use Cake\ORM\Entity;

/**
 * ActiviteType Entity
 *
 * @property int $id
 * @property string $name
 * @property string $color
 * @property \Cake\I18n\FrozenTime|null $created
 * @property \Cake\I18n\FrozenTime|null $modified
 * @property bool|null $is_active
 *
 * @property \App\Model\Entity\Sport $sport
 * @property \App\Model\Entity\UserCalendrier[] $user_calendriers
 * @property \App\Model\Entity\UserSemaineType[] $user_semaine_types
 */
class ActiviteType extends Entity
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
        'name' => true,
        'color' => true,
        'created' => true,
        'modified' => true,
        'is_active' => true,
        'sport' => true,
        'user_calendriers' => true,
        'user_semaine_types' => true
    ];
}
