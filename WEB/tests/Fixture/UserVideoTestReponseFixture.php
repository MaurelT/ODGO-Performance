<?php
namespace App\Test\Fixture;

use Cake\TestSuite\Fixture\TestFixture;

/**
 * UserVideoTestReponseFixture
 */
class UserVideoTestReponseFixture extends TestFixture
{
    /**
     * Table name
     *
     * @var string
     */
    public $table = 'user_video_test_reponse';
    /**
     * Fields
     *
     * @var array
     */
    // @codingStandardsIgnoreStart
    public $fields = [
        'id' => ['type' => 'integer', 'length' => 11, 'unsigned' => false, 'null' => false, 'default' => null, 'comment' => '', 'autoIncrement' => true, 'precision' => null],
        'user_id' => ['type' => 'integer', 'length' => 11, 'unsigned' => false, 'null' => false, 'default' => '0', 'comment' => '', 'precision' => null, 'autoIncrement' => null],
        'video_test_reponse_id' => ['type' => 'integer', 'length' => 11, 'unsigned' => false, 'null' => false, 'default' => '0', 'comment' => '', 'precision' => null, 'autoIncrement' => null],
        '_indexes' => [
            'FK_user_video_test_reponse_users' => ['type' => 'index', 'columns' => ['user_id'], 'length' => []],
            'FK_user_video_test_reponse_video_test_reponses' => ['type' => 'index', 'columns' => ['video_test_reponse_id'], 'length' => []],
        ],
        '_constraints' => [
            'primary' => ['type' => 'primary', 'columns' => ['id'], 'length' => []],
            'FK_user_video_test_reponse_users' => ['type' => 'foreign', 'columns' => ['user_id'], 'references' => ['users', 'id'], 'update' => 'restrict', 'delete' => 'restrict', 'length' => []],
            'FK_user_video_test_reponse_video_test_reponses' => ['type' => 'foreign', 'columns' => ['video_test_reponse_id'], 'references' => ['video_test_reponses', 'id'], 'update' => 'restrict', 'delete' => 'restrict', 'length' => []],
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
                'video_test_reponse_id' => 1
            ],
        ];
        parent::init();
    }
}
