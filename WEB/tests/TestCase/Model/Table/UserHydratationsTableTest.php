<?php
namespace App\Test\TestCase\Model\Table;

use App\Model\Table\UserHydratationsTable;
use Cake\ORM\TableRegistry;
use Cake\TestSuite\TestCase;

/**
 * App\Model\Table\UserHydratationsTable Test Case
 */
class UserHydratationsTableTest extends TestCase
{
    /**
     * Test subject
     *
     * @var \App\Model\Table\UserHydratationsTable
     */
    public $UserHydratations;

    /**
     * Fixtures
     *
     * @var array
     */
    public $fixtures = [
        'app.UserHydratations',
        'app.Users',
        'app.HydratationContenants'
    ];

    /**
     * setUp method
     *
     * @return void
     */
    public function setUp()
    {
        parent::setUp();
        $config = TableRegistry::getTableLocator()->exists('UserHydratations') ? [] : ['className' => UserHydratationsTable::class];
        $this->UserHydratations = TableRegistry::getTableLocator()->get('UserHydratations', $config);
    }

    /**
     * tearDown method
     *
     * @return void
     */
    public function tearDown()
    {
        unset($this->UserHydratations);

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
