<?php
namespace App\Model\Entity;

use Cake\ORM\Entity;

/**
 * SportNiveauClub Entity
 *
 * @property int $id
 * @property string $name
 * @property int $niveau_id
 * @property \Cake\I18n\FrozenTime|null $created
 * @property \Cake\I18n\FrozenTime|null $modified
 * @property bool|null $is_active
 *
 * @property \App\Model\Entity\SportNiveaux $sport_niveaux
 * @property \App\Model\Entity\User[] $users
 */
class SportNiveauClub extends Entity
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
        'niveau_id' => true,
        'created' => true,
        'modified' => true,
        'is_active' => true,
        'sport_niveaux' => true,
        'users' => true
    ];
}
