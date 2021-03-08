<?php
namespace App\Model\Entity;

use Cake\ORM\Entity;

/**
 * SportNiveauClubsCompetition Entity
 *
 * @property int $id
 * @property int $sport_niveau_club_id
 * @property int $competition_id
 *
 * @property \App\Model\Entity\SportNiveauClub $sport_niveau_club
 * @property \App\Model\Entity\Competition $competition
 */
class SportNiveauClubsCompetition extends Entity
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
        'sport_niveau_club_id' => true,
        'competition_id' => true,
        'sport_niveau_club' => true,
        'competition' => true
    ];
}
