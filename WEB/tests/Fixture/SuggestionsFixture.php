<?php
namespace App\Test\Fixture;

use Cake\TestSuite\Fixture\TestFixture;

/**
 * SuggestionsFixture
 */
class SuggestionsFixture extends TestFixture
{
    /**
     * Fields
     *
     * @var array
     */
    // @codingStandardsIgnoreStart
    public $fields = [
        'id' => ['type' => 'integer', 'length' => 11, 'unsigned' => false, 'null' => false, 'default' => null, 'comment' => '', 'autoIncrement' => true, 'precision' => null],
        'range_id' => ['type' => 'integer', 'length' => 11, 'unsigned' => false, 'null' => false, 'default' => '0', 'comment' => '', 'precision' => null, 'autoIncrement' => null],
        'aliment_id' => ['type' => 'integer', 'length' => 11, 'unsigned' => false, 'null' => false, 'default' => '0', 'comment' => '', 'precision' => null, 'autoIncrement' => null],
        'groupe_aliment_id' => ['type' => 'integer', 'length' => 11, 'unsigned' => false, 'null' => false, 'default' => '0', 'comment' => '', 'precision' => null, 'autoIncrement' => null],
        'repas_type_id' => ['type' => 'integer', 'length' => 11, 'unsigned' => false, 'null' => false, 'default' => '0', 'comment' => '', 'precision' => null, 'autoIncrement' => null],
        '_indexes' => [
            'FK_suggestions_ranges' => ['type' => 'index', 'columns' => ['range_id'], 'length' => []],
            'FK_suggestions_aliments' => ['type' => 'index', 'columns' => ['aliment_id'], 'length' => []],
            'FK_suggestions_groupe_aliments' => ['type' => 'index', 'columns' => ['groupe_aliment_id'], 'length' => []],
            'FK_suggestions_repas_types' => ['type' => 'index', 'columns' => ['repas_type_id'], 'length' => []],
        ],
        '_constraints' => [
            'primary' => ['type' => 'primary', 'columns' => ['id'], 'length' => []],
            'FK_suggestions_ranges' => ['type' => 'foreign', 'columns' => ['range_id'], 'references' => ['ranges', 'id'], 'update' => 'restrict', 'delete' => 'restrict', 'length' => []],
            'FK_suggestions_aliments' => ['type' => 'foreign', 'columns' => ['aliment_id'], 'references' => ['aliments', 'id'], 'update' => 'restrict', 'delete' => 'restrict', 'length' => []],
            'FK_suggestions_groupe_aliments' => ['type' => 'foreign', 'columns' => ['groupe_aliment_id'], 'references' => ['groupe_aliments', 'id'], 'update' => 'restrict', 'delete' => 'restrict', 'length' => []],
            'FK_suggestions_repas_types' => ['type' => 'foreign', 'columns' => ['repas_type_id'], 'references' => ['repas_types', 'id'], 'update' => 'restrict', 'delete' => 'restrict', 'length' => []],
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
                'range_id' => 1,
                'aliment_id' => 1,
                'groupe_aliment_id' => 1,
                'repas_type_id' => 1
            ],
        ];
        parent::init();
    }
}
