<?php
namespace App\Test\Fixture;

use Cake\TestSuite\Fixture\TestFixture;

/**
 * UsersAlimentsFixture
 */
class UsersAlimentsFixture extends TestFixture
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
        'aliment_id' => ['type' => 'integer', 'length' => 11, 'unsigned' => false, 'null' => false, 'default' => null, 'comment' => '', 'precision' => null, 'autoIncrement' => null],
        'repas_type_id' => ['type' => 'integer', 'length' => 11, 'unsigned' => false, 'null' => false, 'default' => null, 'comment' => '', 'precision' => null, 'autoIncrement' => null],
        'date' => ['type' => 'date', 'length' => null, 'null' => false, 'default' => null, 'comment' => '', 'precision' => null],
        'quantite' => ['type' => 'float', 'length' => 5, 'precision' => 2, 'unsigned' => false, 'null' => false, 'default' => null, 'comment' => ''],
        'created' => ['type' => 'datetime', 'length' => null, 'null' => true, 'default' => null, 'comment' => '', 'precision' => null],
        'modified' => ['type' => 'datetime', 'length' => null, 'null' => true, 'default' => null, 'comment' => '', 'precision' => null],
        '_indexes' => [
            'FK_users_aliments_users' => ['type' => 'index', 'columns' => ['user_id'], 'length' => []],
            'FK_users_aliments_aliments' => ['type' => 'index', 'columns' => ['aliment_id'], 'length' => []],
            'FK_users_aliments_repas_types' => ['type' => 'index', 'columns' => ['repas_type_id'], 'length' => []],
        ],
        '_constraints' => [
            'primary' => ['type' => 'primary', 'columns' => ['id'], 'length' => []],
            'FK_users_aliments_repas_types' => ['type' => 'foreign', 'columns' => ['repas_type_id'], 'references' => ['repas_types', 'id'], 'update' => 'cascade', 'delete' => 'cascade', 'length' => []],
            'FK_users_aliments_aliments' => ['type' => 'foreign', 'columns' => ['aliment_id'], 'references' => ['aliments', 'id'], 'update' => 'cascade', 'delete' => 'cascade', 'length' => []],
            'FK_users_aliments_users' => ['type' => 'foreign', 'columns' => ['user_id'], 'references' => ['users', 'id'], 'update' => 'cascade', 'delete' => 'cascade', 'length' => []],
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
                'aliment_id' => 1,
                'repas_type_id' => 1,
                'date' => '2020-01-13',
                'quantite' => 1,
                'created' => '2020-01-13 08:20:20',
                'modified' => '2020-01-13 08:20:20'
            ],
        ];
        parent::init();
    }
}
