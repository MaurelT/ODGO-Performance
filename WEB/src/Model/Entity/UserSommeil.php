<?php

namespace App\Model\Entity;

use Cake\ORM\Entity;

/**
 * UserSommeil Entity
 *
 * @property int $id
 * @property int $user_id
 * @property \Cake\I18n\FrozenDate $date
 * @property int $qualite_reveil
 * @property int $sensation_fatigue
 *
 * @property \App\Model\Entity\User $user
 * @property \App\Model\Entity\UserSommeilsSommeilFacteurNuisible[] $user_sommeils_sommeil_facteur_nuisibles
 */
class UserSommeil extends Entity
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
        'date' => true,
        'temps_sieste_min' => true,
        'heure_coucher' => true,
        'heure_reveil' => true,
        'nb_heure_sommeil' => true,
        'qualite_reveil' => true,
        'sensation_fatigue' => true,
        'user' => true,
        'user_sommeils_sommeil_facteur_nuisibles' => true
    ];
}
