<?php
namespace App\Model\Entity;

use Cake\ORM\Entity;

/**
 * Competition Entity
 *
 * @property int $id
 * @property string|null $name
 * @property int $sport_id
 * @property int $user_id
 * @property \Cake\I18n\FrozenDate $comp_date
 * @property string|null $participant1_logo
 * @property string|null $participant1_name
 * @property string|null $participant2_logo
 * @property string|null $participant2_name
 * @property \Cake\I18n\FrozenTime|null $created
 * @property \Cake\I18n\FrozenTime|null $modified
 * @property bool|null $is_active
 *
 * @property \App\Model\Entity\Sport $sport
 * @property \App\Model\Entity\User $user
 * @property \App\Model\Entity\CompetitionSportParam[] $competition_sport_params
 */
class Competition extends Entity
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
        'sport_id' => true,
        'user_id' => true,
        'comp_date' => true,
        'participant1_logo' => true,
        'participant1_name' => true,
        'participant2_logo' => true,
        'participant2_name' => true,
        'created' => true,
        'modified' => true,
        'is_active' => true,
        'sport' => true,
        'user' => true,
        'competition_sport_params' => true
    ];
}
