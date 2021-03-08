<?php
namespace App\Model\Entity;

use Cake\ORM\Entity;

/**
 * UserSommeilsSommeilFacteurNuisible Entity
 *
 * @property int $id
 * @property int $user_sommeil_id
 * @property int $sommeil_facteur_nuisible_id
 *
 * @property \App\Model\Entity\UserSommeil $user_sommeil
 * @property \App\Model\Entity\SommeilFactureNuisible $sommeil_facture_nuisible
 */
class UserSommeilsSommeilFacteurNuisible extends Entity
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
        'user_sommeil_id' => true,
        'sommeil_facteur_nuisible_id' => true,
        'user_sommeil' => true,
        'sommeil_facture_nuisible' => true
    ];
}
