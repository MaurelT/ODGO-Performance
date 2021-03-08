<?php
namespace App\Model\Entity;

use Cake\ORM\Entity;

/**
 * Engagement Entity
 *
 * @property int $id
 * @property string $name
 * @property int $value
 *
 * @property \App\Model\Entity\AbonnementEngagement[] $abonnement_engagement
 * @property \App\Model\Entity\Abonnement[] $abonnements
 */
class Engagement extends Entity
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
        'value' => true,
        'abonnement_engagement' => true,
        'abonnements' => true
    ];
}
