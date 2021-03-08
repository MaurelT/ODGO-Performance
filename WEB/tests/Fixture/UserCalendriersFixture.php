<?php
namespace App\Test\Fixture;

use Cake\TestSuite\Fixture\TestFixture;

/**
 * UserCalendriersFixture
 */
class UserCalendriersFixture extends TestFixture
{
    /**
     * Fields
     *
     * @var array
     */
    // @codingStandardsIgnoreStart
    public $fields = [
        'id' => ['type' => 'integer', 'length' => 11, 'unsigned' => false, 'null' => false, 'default' => null, 'comment' => '', 'autoIncrement' => true, 'precision' => null],
        'user_id' => ['type' => 'integer', 'length' => 11, 'unsigned' => false, 'null' => false, 'default' => null, 'comment' => '', 'precision' => null, 'autoIncrement' => null],
        'date' => ['type' => 'date', 'length' => null, 'null' => false, 'default' => null, 'comment' => '', 'precision' => null],
        'heure_debut' => ['type' => 'time', 'length' => null, 'null' => false, 'default' => null, 'comment' => '', 'precision' => null],
        'heure_fin' => ['type' => 'time', 'length' => null, 'null' => false, 'default' => null, 'comment' => '', 'precision' => null],
        'activite_type_id' => ['type' => 'integer', 'length' => 11, 'unsigned' => false, 'null' => false, 'default' => null, 'comment' => '', 'precision' => null, 'autoIncrement' => null],
        'user_semaine_type_id' => ['type' => 'integer', 'length' => 11, 'unsigned' => false, 'null' => true, 'default' => null, 'comment' => '', 'precision' => null, 'autoIncrement' => null],
        '_indexes' => [
            'FK_user_calendriers_users' => ['type' => 'index', 'columns' => ['user_id'], 'length' => []],
            'FK_user_semaine_types_activite_types0' => ['type' => 'index', 'columns' => ['activite_type_id'], 'length' => []],
            'FK_user_calendriers_user_semaine_types' => ['type' => 'index', 'columns' => ['user_semaine_type_id'], 'length' => []],
        ],
        '_constraints' => [
            'primary' => ['type' => 'primary', 'columns' => ['id'], 'length' => []],
            'FK_user_calendriers_users' => ['type' => 'foreign', 'columns' => ['user_id'], 'references' => ['users', 'id'], 'update' => 'cascade', 'delete' => 'cascade', 'length' => []],
            'FK_user_semaine_types_activite_types0' => ['type' => 'foreign', 'columns' => ['activite_type_id'], 'references' => ['activite_types', 'id'], 'update' => 'cascade', 'delete' => 'cascade', 'length' => []],
            'FK_user_calendriers_user_semaine_types' => ['type' => 'foreign', 'columns' => ['user_semaine_type_id'], 'references' => ['user_semaine_types', 'id'], 'update' => 'cascade', 'delete' => 'setNull', 'length' => []],
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
                'user_id' => 1,
                'date' => '2019-10-07',
                'heure_debut' => '07:30:48',
                'heure_fin' => '07:30:48',
                'activite_type_id' => 1,
                'user_semaine_type_id' => 1
            ],
        ];
        parent::init();
    }
}
