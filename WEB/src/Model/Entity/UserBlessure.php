<?php
namespace App\Model\Entity;

use Cake\ORM\Entity;

/**
 * UserBlessure Entity
 *
 * @property int $id
 * @property int $user_id
 * @property int $zone_id
 * @property int $pathologie_id
 * @property \Cake\I18n\FrozenDate $date
 * @property int $operation
 * @property int $temps_indisponibilite_id
 * @property int $examen_medical_id
 *
 * @property \App\Model\Entity\User $user
 * @property \App\Model\Entity\Zone $zone
 * @property \App\Model\Entity\Pathology $pathology
 * @property \App\Model\Entity\TempsIndisponibilite $temps_indisponibilite
 * @property \App\Model\Entity\ExamenMedical $examen_medical
 * @property \App\Model\Entity\UserBlessureImage[] $user_blessure_images
 */
class UserBlessure extends Entity
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
        'zone_id' => true,
        'pathologie_id' => true,
        'date' => true,
        'operation' => true,
        'temps_indisponibilite_id' => true,
        'examen_medical_id' => true,
        'user' => true,
        'zone' => true,
        'pathology' => true,
        'temps_indisponibilite' => true,
        'examen_medical' => true,
        'user_blessure_images' => true
    ];
}
