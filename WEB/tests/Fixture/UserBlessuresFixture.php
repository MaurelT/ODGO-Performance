<?php
namespace App\Test\Fixture;

use Cake\TestSuite\Fixture\TestFixture;

/**
 * UserBlessuresFixture
 */
class UserBlessuresFixture extends TestFixture
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
        'zone_id' => ['type' => 'integer', 'length' => 11, 'unsigned' => false, 'null' => false, 'default' => null, 'comment' => '', 'precision' => null, 'autoIncrement' => null],
        'pathologie_id' => ['type' => 'integer', 'length' => 11, 'unsigned' => false, 'null' => false, 'default' => null, 'comment' => '', 'precision' => null, 'autoIncrement' => null],
        'date' => ['type' => 'date', 'length' => null, 'null' => false, 'default' => null, 'comment' => '', 'precision' => null],
        'operation' => ['type' => 'tinyinteger', 'length' => 4, 'unsigned' => false, 'null' => false, 'default' => null, 'comment' => '', 'precision' => null],
        'temps_indisponibilite_id' => ['type' => 'integer', 'length' => 11, 'unsigned' => false, 'null' => false, 'default' => null, 'comment' => '', 'precision' => null, 'autoIncrement' => null],
        'examen_medical_id' => ['type' => 'integer', 'length' => 11, 'unsigned' => false, 'null' => false, 'default' => null, 'comment' => '', 'precision' => null, 'autoIncrement' => null],
        '_indexes' => [
            'FK_user_blessures_users' => ['type' => 'index', 'columns' => ['user_id'], 'length' => []],
            'FK_user_blessures_pathologies' => ['type' => 'index', 'columns' => ['pathologie_id'], 'length' => []],
            'FK_user_blessures_temps_indisponibilites' => ['type' => 'index', 'columns' => ['temps_indisponibilite_id'], 'length' => []],
            'FK_user_blessures_examen_medicals' => ['type' => 'index', 'columns' => ['examen_medical_id'], 'length' => []],
            'FK_user_blessures_zones' => ['type' => 'index', 'columns' => ['zone_id'], 'length' => []],
        ],
        '_constraints' => [
            'primary' => ['type' => 'primary', 'columns' => ['id'], 'length' => []],
            'FK_user_blessures_users' => ['type' => 'foreign', 'columns' => ['user_id'], 'references' => ['users', 'id'], 'update' => 'cascade', 'delete' => 'cascade', 'length' => []],
            'FK_user_blessures_pathologies' => ['type' => 'foreign', 'columns' => ['pathologie_id'], 'references' => ['pathologies', 'id'], 'update' => 'cascade', 'delete' => 'cascade', 'length' => []],
            'FK_user_blessures_temps_indisponibilites' => ['type' => 'foreign', 'columns' => ['temps_indisponibilite_id'], 'references' => ['temps_indisponibilites', 'id'], 'update' => 'cascade', 'delete' => 'cascade', 'length' => []],
            'FK_user_blessures_examen_medicals' => ['type' => 'foreign', 'columns' => ['examen_medical_id'], 'references' => ['examen_medicals', 'id'], 'update' => 'cascade', 'delete' => 'cascade', 'length' => []],
            'FK_user_blessures_zones' => ['type' => 'foreign', 'columns' => ['zone_id'], 'references' => ['zones', 'id'], 'update' => 'cascade', 'delete' => 'cascade', 'length' => []],
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
                'zone_id' => 1,
                'pathologie_id' => 1,
                'date' => '2019-10-07',
                'operation' => 1,
                'temps_indisponibilite_id' => 1,
                'examen_medical_id' => 1
            ],
        ];
        parent::init();
    }
}
