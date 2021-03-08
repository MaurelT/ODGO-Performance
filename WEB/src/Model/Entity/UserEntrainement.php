<?php
namespace App\Model\Entity;

use Cake\ORM\Entity;

/**
 * UserEntrainement Entity
 *
 * @property int $id
 * @property int $user_id
 * @property \Cake\I18n\FrozenDate $date
 * @property int $duree_heure
 * @property int $duree_minute
 * @property int $entrainement_type_id
 * @property int $intensite
 * @property int $difficulte
 * @property int $qualite
 * @property int $implication
 * @property string|null $commentaire
 *
 * @property \App\Model\Entity\User $user
 * @property \App\Model\Entity\EntrainementType $entrainement_type
 */
class UserEntrainement extends Entity
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
        'duree_heure' => true,
        'duree_minute' => true,
        'entrainement_type_id' => true,
        'intensite' => true,
        'difficulte' => true,
        'qualite' => true,
        'implication' => true,
        'commentaire' => true,
        'user' => true,
        'entrainement_type' => true
    ];
}
