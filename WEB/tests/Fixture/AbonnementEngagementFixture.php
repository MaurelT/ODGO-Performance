<?php
namespace App\Test\Fixture;

use Cake\TestSuite\Fixture\TestFixture;

/**
 * AbonnementEngagementFixture
 */
class AbonnementEngagementFixture extends TestFixture
{
    /**
     * Table name
     *
     * @var string
     */
    public $table = 'abonnement_engagement';
    /**
     * Fields
     *
     * @var array
     */
    // @codingStandardsIgnoreStart
    public $fields = [
        'id' => ['type' => 'integer', 'length' => 11, 'unsigned' => false, 'null' => false, 'default' => null, 'comment' => '', 'autoIncrement' => true, 'precision' => null],
        'abonnement_id' => ['type' => 'integer', 'length' => 11, 'unsigned' => false, 'null' => false, 'default' => '0', 'comment' => '', 'precision' => null, 'autoIncrement' => null],
        'engagement_id' => ['type' => 'integer', 'length' => 11, 'unsigned' => false, 'null' => false, 'default' => '0', 'comment' => '', 'precision' => null, 'autoIncrement' => null],
        'prix' => ['type' => 'float', 'length' => null, 'precision' => null, 'unsigned' => false, 'null' => false, 'default' => '0', 'comment' => ''],
        '_indexes' => [
            'FK__abonnements' => ['type' => 'index', 'columns' => ['abonnement_id'], 'length' => []],
            'FK__engagements' => ['type' => 'index', 'columns' => ['engagement_id'], 'length' => []],
        ],
        '_constraints' => [
            'primary' => ['type' => 'primary', 'columns' => ['id'], 'length' => []],
            'FK__abonnements' => ['type' => 'foreign', 'columns' => ['abonnement_id'], 'references' => ['abonnements', 'id'], 'update' => 'restrict', 'delete' => 'restrict', 'length' => []],
            'FK__engagements' => ['type' => 'foreign', 'columns' => ['engagement_id'], 'references' => ['engagements', 'id'], 'update' => 'restrict', 'delete' => 'restrict', 'length' => []],
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
                'abonnement_id' => 1,
                'engagement_id' => 1,
                'prix' => 1
            ],
        ];
        parent::init();
    }
}
