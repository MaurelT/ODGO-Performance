<?php
namespace App\Model\Entity;

use Cake\ORM\Entity;

/**
 * Abonnement Entity
 *
 * @property int $id
 * @property string $name
 * @property string $description
 * @property string $plan_id_stripe
 *
 * @property \App\Model\Entity\Engagement $engagement
 * @property \App\Model\Entity\AbonnementEngagement[] $abonnement_engagement
 */
class Abonnement extends Entity
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
        'description' => true,
        'plan_id_stripe' => true,
        'engagement' => true,
        'abonnement_engagement' => true
    ];
}
