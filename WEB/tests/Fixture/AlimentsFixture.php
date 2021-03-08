<?php
namespace App\Test\Fixture;

use Cake\TestSuite\Fixture\TestFixture;

/**
 * AlimentsFixture
 */
class AlimentsFixture extends TestFixture
{
    /**
     * Fields
     *
     * @var array
     */
    // @codingStandardsIgnoreStart
    public $fields = [
        'id' => ['type' => 'integer', 'length' => 11, 'unsigned' => false, 'null' => false, 'default' => null, 'comment' => '', 'autoIncrement' => true, 'precision' => null],
        'aliment_type_id' => ['type' => 'integer', 'length' => 11, 'unsigned' => false, 'null' => false, 'default' => null, 'comment' => '', 'precision' => null, 'autoIncrement' => null],
        'famille_aliment_id' => ['type' => 'integer', 'length' => 11, 'unsigned' => false, 'null' => true, 'default' => null, 'comment' => '', 'precision' => null, 'autoIncrement' => null],
        'name' => ['type' => 'string', 'length' => 255, 'null' => false, 'default' => null, 'collate' => 'utf8_general_ci', 'comment' => '', 'precision' => null, 'fixed' => null],
        'quantity_recommanded' => ['type' => 'integer', 'length' => 11, 'unsigned' => false, 'null' => false, 'default' => '0', 'comment' => '', 'precision' => null, 'autoIncrement' => null],
        'kcalorie_pour_100g' => ['type' => 'float', 'length' => null, 'precision' => null, 'unsigned' => false, 'null' => false, 'default' => '0', 'comment' => ''],
        'glucide_pour_100g' => ['type' => 'float', 'length' => null, 'precision' => null, 'unsigned' => false, 'null' => false, 'default' => '0', 'comment' => ''],
        'proteine_pour_100g' => ['type' => 'float', 'length' => null, 'precision' => null, 'unsigned' => false, 'null' => false, 'default' => '0', 'comment' => ''],
        'lipide_pour_100g' => ['type' => 'float', 'length' => null, 'precision' => null, 'unsigned' => false, 'null' => false, 'default' => '0', 'comment' => ''],
        'portion_en_g' => ['type' => 'float', 'length' => null, 'precision' => null, 'unsigned' => false, 'null' => false, 'default' => '0', 'comment' => ''],
        'portion_en_ml' => ['type' => 'float', 'length' => null, 'precision' => null, 'unsigned' => false, 'null' => false, 'default' => '0', 'comment' => ''],
        'is_active' => ['type' => 'boolean', 'length' => null, 'null' => true, 'default' => '1', 'comment' => '', 'precision' => null],
        'created' => ['type' => 'datetime', 'length' => null, 'null' => true, 'default' => '2020-01-13 15:55:55', 'comment' => '', 'precision' => null],
        'modified' => ['type' => 'datetime', 'length' => null, 'null' => true, 'default' => '2020-01-13 15:55:55', 'comment' => '', 'precision' => null],
        '_indexes' => [
            'FK_aliments_aliment_types' => ['type' => 'index', 'columns' => ['aliment_type_id'], 'length' => []],
            'FK_aliments_famille_aliments' => ['type' => 'index', 'columns' => ['famille_aliment_id'], 'length' => []],
        ],
        '_constraints' => [
            'primary' => ['type' => 'primary', 'columns' => ['id'], 'length' => []],
            'FK_aliments_famille_aliments' => ['type' => 'foreign', 'columns' => ['famille_aliment_id'], 'references' => ['famille_aliments', 'id'], 'update' => 'restrict', 'delete' => 'restrict', 'length' => []],
            'FK_aliments_aliment_types' => ['type' => 'foreign', 'columns' => ['aliment_type_id'], 'references' => ['aliment_types', 'id'], 'update' => 'cascade', 'delete' => 'cascade', 'length' => []],
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
                'aliment_type_id' => 1,
                'famille_aliment_id' => 1,
                'name' => 'Lorem ipsum dolor sit amet',
                'quantity_recommanded' => 1,
                'kcalorie_pour_100g' => 1,
                'glucide_pour_100g' => 1,
                'proteine_pour_100g' => 1,
                'lipide_pour_100g' => 1,
                'portion_en_g' => 1,
                'portion_en_ml' => 1,
                'is_active' => 1,
                'created' => '2020-01-16 07:32:18',
                'modified' => '2020-01-16 07:32:18'
            ],
        ];
        parent::init();
    }
}
