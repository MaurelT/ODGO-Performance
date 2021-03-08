<?php
namespace App\Test\TestCase\Model\Table;

use App\Model\Table\UserProgrammesTable;
use Cake\ORM\TableRegistry;
use Cake\TestSuite\TestCase;

/**
 * App\Model\Table\UserProgrammesTable Test Case
 */
class UserProgrammesTableTest extends TestCase
{
    /**
     * Test subject
     *
     * @var \App\Model\Table\UserProgrammesTable
     */
    public $UserProgrammes;

    /**
     * Fixtures
     *
     * @var array
     */
    public $fixtures = [
        'app.UserProgrammes',
        'app.Users',
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
        $config = TableRegistry::getTableLocator()->exists('UserProgrammes') ? [] : ['className' => UserProgrammesTable::class];
        $this->UserProgrammes = TableRegistry::getTableLocator()->get('UserProgrammes', $config);
    }

    /**
     * tearDown method
     *
     * @return void
     */
    public function tearDown()
    {
        unset($this->UserProgrammes);

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
