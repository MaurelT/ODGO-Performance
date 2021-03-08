<?php
namespace App\Model\Entity;

use Cake\ORM\Entity;

/**
 * CompetitionSportParam Entity
 *
 * @property int $id
 * @property int $competition_id
 * @property int $sport_param_id
 * @property int $user_id
 * @property string $current_value
 *
 * @property \App\Model\Entity\Competition $competition
 * @property \App\Model\Entity\SportParam $sport_param
 */
class CompetitionSportParam extends Entity
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
        'competition_id' => true,
        'sport_param_id' => true,
        'user_id' => true,
        'current_value' => true,
        'competition' => true,
        'sport_param' => true
    ];
}
