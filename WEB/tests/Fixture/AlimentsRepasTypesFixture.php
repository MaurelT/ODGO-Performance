<?php
namespace App\Test\Fixture;

use Cake\TestSuite\Fixture\TestFixture;

/**
 * AlimentsRepasTypesFixture
 */
class AlimentsRepasTypesFixture extends TestFixture
{
    /**
     * Fields
     *
     * @var array
     */
    // @codingStandardsIgnoreStart
    public $fields = [
        'id' => ['type' => 'integer', 'length' => 11, 'unsigned' => false, 'null' => false, 'default' => null, 'comment' => '', 'autoIncrement' => true, 'precision' => null],
        'aliment_id' => ['type' => 'integer', 'length' => 11, 'unsigned' => false, 'null' => false, 'default' => null, 'comment' => '', 'precision' => null, 'autoIncrement' => null],
        'aliments_repas_types_id' => ['type' => 'integer', 'length' => 11, 'unsigned' => false, 'null' => false, 'default' => null, 'comment' => '', 'precision' => null, 'autoIncrement' => null],
        '_indexes' => [
            'FK_aliments_repas_types_repas_types' => ['type' => 'index', 'columns' => ['aliments_repas_types_id'], 'length' => []],
            'FK_aliments_repas_types_aliments' => ['type' => 'index', 'columns' => ['aliment_id'], 'length' => []],
        ],
        '_constraints' => [
            'primary' => ['type' => 'primary', 'columns' => ['id'], 'length' => []],
            'FK_aliments_repas_types_aliments' => ['type' => 'foreign', 'columns' => ['aliment_id'], 'references' => ['aliments', 'id'], 'update' => 'cascade', 'delete' => 'cascade', 'length' => []],
            'FK_aliments_repas_types_repas_types' => ['type' => 'foreign', 'columns' => ['aliments_repas_types_id'], 'references' => ['repas_types', 'id'], 'update' => 'cascade', 'delete' => 'cascade', 'length' => []],
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
                'aliment_id' => 1,
                'aliments_repas_types_id' => 1
            ],
        ];
        parent::init();
    }
}
