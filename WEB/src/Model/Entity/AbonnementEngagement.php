<?php
namespace App\Model\Entity;

use Cake\ORM\Entity;

/**
 * AbonnementEngagement Entity
 *
 * @property int $id
 * @property int $abonnement_id
 * @property int $engagement_id
 * @property float $prix
 *
 * @property \App\Model\Entity\Abonnement $abonnement
 * @property \App\Model\Entity\Engagement $engagement
 */
class AbonnementEngagement extends Entity
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
        'abonnement_id' => true,
        'engagement_id' => true,
        'prix' => true,
        'abonnement' => true,
        'engagement' => true
    ];
}
