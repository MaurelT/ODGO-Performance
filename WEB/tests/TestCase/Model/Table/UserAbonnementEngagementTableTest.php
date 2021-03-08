<?php
namespace App\Test\TestCase\Model\Table;

use App\Model\Table\UserAbonnementEngagementTable;
use Cake\ORM\TableRegistry;
use Cake\TestSuite\TestCase;

/**
 * App\Model\Table\UserAbonnementEngagementTable Test Case
 */
class UserAbonnementEngagementTableTest extends TestCase
{
    /**
     * Test subject
     *
     * @var \App\Model\Table\UserAbonnementEngagementTable
     */
    public $UserAbonnementEngagement;

    /**
     * Fixtures
     *
     * @var array
     */
    public $fixtures = [
        'app.UserAbonnementEngagement',
        'app.Users',
        'app.AbonnementEngagement'
    ];

    /**
     * setUp method
     *
     * @return void
     */
    public function setUp()
    {
        parent::setUp();
        $config = TableRegistry::getTableLocator()->exists('UserAbonnementEngagement') ? [] : ['className' => UserAbonnementEngagementTable::class];
        $this->UserAbonnementEngagement = TableRegistry::getTableLocator()->get('UserAbonnementEngagement', $config);
    }

    /**
     * tearDown method
     *
     * @return void
     */
    public function tearDown()
    {
        unset($this->UserAbonnementEngagement);

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
