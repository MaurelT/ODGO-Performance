<?php
namespace App\Test\TestCase\Model\Table;

use App\Model\Table\UserTensionsTable;
use Cake\ORM\TableRegistry;
use Cake\TestSuite\TestCase;

/**
 * App\Model\Table\UserTensionsTable Test Case
 */
class UserTensionsTableTest extends TestCase
{
    /**
     * Test subject
     *
     * @var \App\Model\Table\UserTensionsTable
     */
    public $UserTensions;

    /**
     * Fixtures
     *
     * @var array
     */
    public $fixtures = [
        'app.UserTensions',
        'app.Users',
        'app.Zones'
    ];

    /**
     * setUp method
     *
     * @return void
     */
    public function setUp()
    {
        parent::setUp();
        $config = TableRegistry::getTableLocator()->exists('UserTensions') ? [] : ['className' => UserTensionsTable::class];
        $this->UserTensions = TableRegistry::getTableLocator()->get('UserTensions', $config);
    }

    /**
     * tearDown method
     *
     * @return void
     */
    public function tearDown()
    {
        unset($this->UserTensions);

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
