<?php
namespace App\Test\Fixture;

use Cake\TestSuite\Fixture\TestFixture;

/**
 * UserSommeilsSommeilFacteurNuisiblesFixture
 */
class UserSommeilsSommeilFacteurNuisiblesFixture extends TestFixture
{
    /**
     * Fields
     *
     * @var array
     */
    // @codingStandardsIgnoreStart
    public $fields = [
        'id' => ['type' => 'integer', 'length' => 11, 'unsigned' => false, 'null' => false, 'default' => null, 'comment' => '', 'autoIncrement' => true, 'precision' => null],
        'user_sommeil_id' => ['type' => 'integer', 'length' => 11, 'unsigned' => false, 'null' => false, 'default' => null, 'comment' => '', 'precision' => null, 'autoIncrement' => null],
        'sommeil_facture_nuisible_id' => ['type' => 'integer', 'length' => 11, 'unsigned' => false, 'null' => false, 'default' => null, 'comment' => '', 'precision' => null, 'autoIncrement' => null],
        '_indexes' => [
            'FK_user_sommeils_sommeil_facteur_nuisiblesuser_sommeils' => ['type' => 'index', 'columns' => ['user_sommeil_id'], 'length' => []],
            'FK_sommeil_facture_nuisibles' => ['type' => 'index', 'columns' => ['sommeil_facture_nuisible_id'], 'length' => []],
        ],
        '_constraints' => [
            'primary' => ['type' => 'primary', 'columns' => ['id'], 'length' => []],
            'FK_user_sommeils_sommeil_facteur_nuisiblesuser_sommeils' => ['type' => 'foreign', 'columns' => ['user_sommeil_id'], 'references' => ['user_sommeils', 'id'], 'update' => 'cascade', 'delete' => 'cascade', 'length' => []],
            'FK_sommeil_facture_nuisibles' => ['type' => 'foreign', 'columns' => ['sommeil_facture_nuisible_id'], 'references' => ['sommeil_facture_nuisibles', 'id'], 'update' => 'cascade', 'delete' => 'cascade', 'length' => []],
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
                'user_sommeil_id' => 1,
                'sommeil_facture_nuisible_id' => 1
            ],
        ];
        parent::init();
    }
}
