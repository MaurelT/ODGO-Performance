<?php
namespace App\Model\Entity;

use Cake\ORM\Entity;

/**
 * SportParam Entity
 *
 * @property int $id
 * @property int $sport_param_type_id
 * @property int $sport_id
 * @property string $label
 * @property string|null $max_value
 * @property string|null $unit
 *
 * @property \App\Model\Entity\SportParamType $sport_param_type
 * @property \App\Model\Entity\Sport $sport
 * @property \App\Model\Entity\CompetitionSportParam[] $competition_sport_params
 */
class SportParam extends Entity
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
        'sport_param_type_id' => true,
        'sport_id' => true,
        'label' => true,
        'max_value' => true,
        'unit' => true,
        'sport_param_type' => true,
        'sport' => true,
        'competition_sport_params' => true
    ];
}
