<?php
namespace App\Test\Fixture;

use Cake\TestSuite\Fixture\TestFixture;

/**
 * CompetitionSportParamsFixture
 */
class CompetitionSportParamsFixture extends TestFixture
{
    /**
     * Fields
     *
     * @var array
     */
    // @codingStandardsIgnoreStart
    public $fields = [
        'id' => ['type' => 'integer', 'length' => 11, 'unsigned' => false, 'null' => false, 'default' => null, 'comment' => '', 'autoIncrement' => true, 'precision' => null],
        'competition_id' => ['type' => 'integer', 'length' => 11, 'unsigned' => false, 'null' => false, 'default' => null, 'comment' => '', 'precision' => null, 'autoIncrement' => null],
        'sport_param_id' => ['type' => 'integer', 'length' => 11, 'unsigned' => false, 'null' => false, 'default' => null, 'comment' => '', 'precision' => null, 'autoIncrement' => null],
        'user_id' => ['type' => 'integer', 'length' => 11, 'unsigned' => false, 'null' => false, 'default' => null, 'comment' => '', 'precision' => null, 'autoIncrement' => null],
        'current_value' => ['type' => 'string', 'length' => 255, 'null' => false, 'default' => null, 'collate' => 'utf8_general_ci', 'comment' => '', 'precision' => null, 'fixed' => null],
        '_indexes' => [
            'FK_competition_sport_params_competitions' => ['type' => 'index', 'columns' => ['competition_id'], 'length' => []],
            'FK_competition_sport_params_sports' => ['type' => 'index', 'columns' => ['sport_param_id'], 'length' => []],
            'FK_competition_sport_params_users' => ['type' => 'index', 'columns' => ['user_id'], 'length' => []],
        ],
        '_constraints' => [
            'primary' => ['type' => 'primary', 'columns' => ['id'], 'length' => []],
            'FK_competition_sport_params_competitions' => ['type' => 'foreign', 'columns' => ['competition_id'], 'references' => ['competitions', 'id'], 'update' => 'cascade', 'delete' => 'cascade', 'length' => []],
            'FK_competition_sport_params_sports' => ['type' => 'foreign', 'columns' => ['sport_param_id'], 'references' => ['sport_params', 'id'], 'update' => 'cascade', 'delete' => 'cascade', 'length' => []],
            'FK_competition_sport_params_users' => ['type' => 'foreign', 'columns' => ['user_id'], 'references' => ['users', 'id'], 'update' => 'restrict', 'delete' => 'restrict', 'length' => []],
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
                'competition_id' => 1,
                'sport_param_id' => 1,
                'user_id' => 1,
                'current_value' => 'Lorem ipsum dolor sit amet'
            ],
        ];
        parent::init();
    }
}
