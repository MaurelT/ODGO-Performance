<?php
namespace App\Test\TestCase\Model\Table;

use App\Model\Table\UserProgrammesVideosTable;
use Cake\ORM\TableRegistry;
use Cake\TestSuite\TestCase;

/**
 * App\Model\Table\UserProgrammesVideosTable Test Case
 */
class UserProgrammesVideosTableTest extends TestCase
{
    /**
     * Test subject
     *
     * @var \App\Model\Table\UserProgrammesVideosTable
     */
    public $UserProgrammesVideos;

    /**
     * Fixtures
     *
     * @var array
     */
    public $fixtures = [
        'app.UserProgrammesVideos',
        'app.UserProgrammes',
        'app.Videos'
    ];

    /**
     * setUp method
     *
     * @return void
     */
    public function setUp()
    {
        parent::setUp();
        $config = TableRegistry::getTableLocator()->exists('UserProgrammesVideos') ? [] : ['className' => UserProgrammesVideosTable::class];
        $this->UserProgrammesVideos = TableRegistry::getTableLocator()->get('UserProgrammesVideos', $config);
    }

    /**
     * tearDown method
     *
     * @return void
     */
    public function tearDown()
    {
        unset($this->UserProgrammesVideos);

        parent::tearDown();
    }

    /**
     * Test initialize method
     *
     * @return void
     */
    public function testInitialize()
    {
        $this->markTestIncomplete('Not implemented yet.');
    }

    /**
     * Test validationDefault method
     *
     * @return void
     */
    public function testValidationDefault()
    {
        $this->markTestIncomplete('Not implemented yet.');
    }

    /**
     * Test buildRules method
     *
     * @return void
     */
    public function testBuildRules()
    {
        $this->markTestIncomplete('Not implemented yet.');
    }
}
