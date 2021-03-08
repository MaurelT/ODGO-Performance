<?php
namespace App\Test\Fixture;

use Cake\TestSuite\Fixture\TestFixture;

/**
 * UserProgrammesVideosFixture
 */
class UserProgrammesVideosFixture extends TestFixture
{
    /**
     * Fields
     *
     * @var array
     */
    // @codingStandardsIgnoreStart
    public $fields = [
        'id' => ['type' => 'integer', 'length' => 11, 'unsigned' => false, 'null' => false, 'default' => null, 'comment' => '', 'autoIncrement' => true, 'precision' => null],
        'user_programme_id' => ['type' => 'integer', 'length' => 11, 'unsigned' => false, 'null' => false, 'default' => null, 'comment' => '', 'precision' => null, 'autoIncrement' => null],
        'video_id' => ['type' => 'integer', 'length' => 11, 'unsigned' => false, 'null' => false, 'default' => null, 'comment' => '', 'precision' => null, 'autoIncrement' => null],
        'ordre' => ['type' => 'tinyinteger', 'length' => 4, 'unsigned' => false, 'null' => false, 'default' => null, 'comment' => '', 'precision' => null],
        '_indexes' => [
            'FK_user_programmes_videos_user_programmes' => ['type' => 'index', 'columns' => ['user_programme_id'], 'length' => []],
            'FK_user_programmes_videos_videos' => ['type' => 'index', 'columns' => ['video_id'], 'length' => []],
        ],
        '_constraints' => [
            'primary' => ['type' => 'primary', 'columns' => ['id'], 'length' => []],
            'FK_user_programmes_videos_user_programmes' => ['type' => 'foreign', 'columns' => ['user_programme_id'], 'references' => ['user_programmes', 'id'], 'update' => 'cascade', 'delete' => 'cascade', 'length' => []],
            'FK_user_programmes_videos_videos' => ['type' => 'foreign', 'columns' => ['video_id'], 'references' => ['videos', 'id'], 'update' => 'cascade', 'delete' => 'cascade', 'length' => []],
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
                'user_programme_id' => 1,
                'video_id' => 1,
                'ordre' => 1
            ],
        ];
        parent::init();
    }
}
