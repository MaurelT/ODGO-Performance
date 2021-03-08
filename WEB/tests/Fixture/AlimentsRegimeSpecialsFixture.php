<?php
namespace App\Test\Fixture;

use Cake\TestSuite\Fixture\TestFixture;

/**
 * AlimentsRegimeSpecialsFixture
 */
class AlimentsRegimeSpecialsFixture extends TestFixture
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
        'regime_special_id' => ['type' => 'integer', 'length' => 11, 'unsigned' => false, 'null' => false, 'default' => null, 'comment' => '', 'precision' => null, 'autoIncrement' => null],
        '_indexes' => [
            'FK_aliments_regime_specials_aliments' => ['type' => 'index', 'columns' => ['aliment_id'], 'length' => []],
            'FK_aliments_regime_specials_regime_specials' => ['type' => 'index', 'columns' => ['regime_special_id'], 'length' => []],
        ],
        '_constraints' => [
            'primary' => ['type' => 'primary', 'columns' => ['id'], 'length' => []],
            'FK_aliments_regime_specials_regime_specials' => ['type' => 'foreign', 'columns' => ['regime_special_id'], 'references' => ['regime_specials', 'id'], 'update' => 'cascade', 'delete' => 'cascade', 'length' => []],
            'FK_aliments_regime_specials_aliments' => ['type' => 'foreign', 'columns' => ['aliment_id'], 'references' => ['aliments', 'id'], 'update' => 'cascade', 'delete' => 'cascade', 'length' => []],
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
                'regime_special_id' => 1
            ],
        ];
        parent::init();
    }
}
