<?php
namespace App\Test\Fixture;

use Cake\TestSuite\Fixture\TestFixture;

/**
 * SportNiveauClubsCompetitionsFixture
 */
class SportNiveauClubsCompetitionsFixture extends TestFixture
{
    /**
     * Fields
     *
     * @var array
     */
    // @codingStandardsIgnoreStart
    public $fields = [
        'id' => ['type' => 'integer', 'length' => 11, 'unsigned' => false, 'null' => false, 'default' => null, 'comment' => '', 'autoIncrement' => true, 'precision' => null],
        'sport_niveau_club_id' => ['type' => 'integer', 'length' => 11, 'unsigned' => false, 'null' => false, 'default' => '0', 'comment' => '', 'precision' => null, 'autoIncrement' => null],
        'competition_id' => ['type' => 'integer', 'length' => 11, 'unsigned' => false, 'null' => false, 'default' => '0', 'comment' => '', 'precision' => null, 'autoIncrement' => null],
        '_indexes' => [
            'FK_sport_niveau_clubs_competitions_sport_niveau_clubs' => ['type' => 'index', 'columns' => ['sport_niveau_club_id'], 'length' => []],
            'FK_sport_niveau_clubs_competitions_competitions' => ['type' => 'index', 'columns' => ['competition_id'], 'length' => []],
        ],
        '_constraints' => [
            'primary' => ['type' => 'primary', 'columns' => ['id'], 'length' => []],
            'FK_sport_niveau_clubs_competitions_sport_niveau_clubs' => ['type' => 'foreign', 'columns' => ['sport_niveau_club_id'], 'references' => ['sport_niveau_clubs', 'id'], 'update' => 'restrict', 'delete' => 'restrict', 'length' => []],
            'FK_sport_niveau_clubs_competitions_competitions' => ['type' => 'foreign', 'columns' => ['competition_id'], 'references' => ['competitions', 'id'], 'update' => 'restrict', 'delete' => 'restrict', 'length' => []],
        ],
        '_options' => [
            'engine' => 'InnoDB',
            'collation' => 'utf8_general_ci'
        ],
    ];
    // @codingStandardsIgnoreEnd
    /**
     * Init method
     *
     * @return void
     */
    public function init()
    {
        $this->records = [
            [
                'id' => 1,
                'sport_niveau_club_id' => 1,
                'competition_id' => 1
            ],
        ];
        parent::init();
    }
}
