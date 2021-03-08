<?php
namespace App\Model\Entity;

use Cake\ORM\Entity;

/**
 * ExigenceAlimentairesUser Entity
 *
 * @property int $id
 * @property int $user_id
 * @property int $exigence_alimentaire_id
 *
 * @property \App\Model\Entity\User $user
 * @property \App\Model\Entity\ExigenceAlimentaire $exigence_alimentaire
 */
class ExigenceAlimentairesUser extends Entity
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
        'exigence_alimentaire_id' => true,
        'user' => true,
        'exigence_alimentaire' => true
    ];
}
