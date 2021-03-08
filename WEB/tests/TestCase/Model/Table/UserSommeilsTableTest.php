<?php
namespace App\Test\TestCase\Model\Table;

use App\Model\Table\UserSommeilsTable;
use Cake\ORM\TableRegistry;
use Cake\TestSuite\TestCase;

/**
 * App\Model\Table\UserSommeilsTable Test Case
 */
class UserSommeilsTableTest extends TestCase
{
    /**
     * Test subject
     *
     * @var \App\Model\Table\UserSommeilsTable
     */
    public $UserSommeils;

    /**
     * Fixtures
     *
     * @var array
     */
    public $fixtures = [
        'app.UserSommeils',
        'app.Users',
        'app.UserSommeilsSommeilFacteurNuisibles'
    ];

    /**
     * setUp method
     *
     * @return void
     */
    public function setUp()
    {
        parent::setUp();
        $config = TableRegistry::getTableLocator()->exists('UserSommeils') ? [] : ['className' => UserSommeilsTable::class];
        $this->UserSommeils = TableRegistry::getTableLocator()->get('UserSommeils', $config);
    }

    /**
     * tearDown method
     *
     * @return void
     */
    public function tearDown()
    {
        unset($this->UserSommeils);

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
