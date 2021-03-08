<?php
namespace App\Test\TestCase\Model\Table;

use App\Model\Table\UserCalendriersTable;
use Cake\ORM\TableRegistry;
use Cake\TestSuite\TestCase;

/**
 * App\Model\Table\UserCalendriersTable Test Case
 */
class UserCalendriersTableTest extends TestCase
{
    /**
     * Test subject
     *
     * @var \App\Model\Table\UserCalendriersTable
     */
    public $UserCalendriers;

    /**
     * Fixtures
     *
     * @var array
     */
    public $fixtures = [
        'app.UserCalendriers',
        'app.Users',
        'app.ActiviteTypes',
        'app.UserSemaineTypes'
    ];

    /**
     * setUp method
     *
     * @return void
     */
    public function setUp()
    {
        parent::setUp();
        $config = TableRegistry::getTableLocator()->exists('UserCalendriers') ? [] : ['className' => UserCalendriersTable::class];
        $this->UserCalendriers = TableRegistry::getTableLocator()->get('UserCalendriers', $config);
    }

    /**
     * tearDown method
     *
     * @return void
     */
    public function tearDown()
    {
        unset($this->UserCalendriers);

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
