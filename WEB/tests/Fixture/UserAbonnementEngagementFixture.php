<?php
namespace App\Test\Fixture;

use Cake\TestSuite\Fixture\TestFixture;

/**
 * UserAbonnementEngagementFixture
 */
class UserAbonnementEngagementFixture extends TestFixture
{
    /**
     * Table name
     *
     * @var string
     */
    public $table = 'user_abonnement_engagement';
    /**
     * Fields
     *
     * @var array
     */
    // @codingStandardsIgnoreStart
    public $fields = [
        'id' => ['type' => 'integer', 'length' => 11, 'unsigned' => false, 'null' => false, 'default' => null, 'comment' => '', 'autoIncrement' => true, 'precision' => null],
        'stripe_id' => ['type' => 'string', 'length' => 255, 'null' => false, 'default' => '', 'collate' => 'utf8_general_ci', 'comment' => '', 'precision' => null, 'fixed' => null],
        'user_id' => ['type' => 'integer', 'length' => 11, 'unsigned' => false, 'null' => false, 'default' => '0', 'comment' => '', 'precision' => null, 'autoIncrement' => null],
        'user_abonnement_id' => ['type' => 'integer', 'length' => 11, 'unsigned' => false, 'null' => false, 'default' => '0', 'comment' => '', 'precision' => null, 'autoIncrement' => null],
        'date_debut' => ['type' => 'datetime', 'length' => null, 'null' => false, 'default' => null, 'comment' => '', 'precision' => null],
        'date_fin' => ['type' => 'datetime', 'length' => null, 'null' => false, 'default' => null, 'comment' => '', 'precision' => null],
        'is_active' => ['type' => 'boolean', 'length' => null, 'null' => false, 'default' => '0', 'comment' => '', 'precision' => null],
        'gift_have_been_given' => ['type' => 'boolean', 'length' => null, 'null' => false, 'default' => '0', 'comment' => '', 'precision' => null],
        '_indexes' => [
            'FK_user_abonnement_engagement_users' => ['type' => 'index', 'columns' => ['user_id'], 'length' => []],
            'FK_user_abonnement_engagement_abonnement_engagement' => ['type' => 'index', 'columns' => ['user_abonnement_id'], 'length' => []],
        ],
        '_constraints' => [
            'primary' => ['type' => 'primary', 'columns' => ['id'], 'length' => []],
            'FK_user_abonnement_engagement_abonnement_engagement' => ['type' => 'foreign', 'columns' => ['user_abonnement_id'], 'references' => ['abonnement_engagement', 'id'], 'update' => 'restrict', 'delete' => 'restrict', 'length' => []],
            'FK_user_abonnement_engagement_users' => ['type' => 'foreign', 'columns' => ['user_id'], 'references' => ['users', 'id'], 'update' => 'restrict', 'delete' => 'restrict', 'length' => []],
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
                'stripe_id' => 'Lorem ipsum dolor sit amet',
                'user_id' => 1,
                'user_abonnement_id' => 1,
                'date_debut' => '2020-03-30 09:54:06',
                'date_fin' => '2020-03-30 09:54:06',
                'is_active' => 1,
                'gift_have_been_given' => 1
            ],
        ];
        parent::init();
    }
}
