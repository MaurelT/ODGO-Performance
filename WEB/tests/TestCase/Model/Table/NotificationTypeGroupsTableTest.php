<?php
namespace App\Test\TestCase\Model\Table;

use App\Model\Table\NotificationTypeGroupsTable;
use Cake\ORM\TableRegistry;
use Cake\TestSuite\TestCase;

/**
 * App\Model\Table\NotificationTypeGroupsTable Test Case
 */
class NotificationTypeGroupsTableTest extends TestCase
{
    /**
     * Test subject
     *
     * @var \App\Model\Table\NotificationTypeGroupsTable
     */
    public $NotificationTypeGroups;

    /**
     * Fixtures
     *
     * @var array
     */
    public $fixtures = [
        'app.NotificationTypeGroups',
        'app.NotificationTypes'
    ];

    /**
     * setUp method
     *
     * @return void
     */
    public function setUp()
    {
        parent::setUp();
        $config = TableRegistry::getTableLocator()->exists('NotificationTypeGroups') ? [] : ['className' => NotificationTypeGroupsTable::class];
        $this->NotificationTypeGroups = TableRegistry::getTableLocator()->get('NotificationTypeGroups', $config);
    }

    /**
     * tearDown method
     *
     * @return void
     */
    public function tearDown()
    {
        unset($this->NotificationTypeGroups);

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
}
