<?php
namespace App\Test\TestCase\Model\Table;

use App\Model\Table\AbonnementEngagementTable;
use Cake\ORM\TableRegistry;
use Cake\TestSuite\TestCase;

/**
 * App\Model\Table\AbonnementEngagementTable Test Case
 */
class AbonnementEngagementTableTest extends TestCase
{
    /**
     * Test subject
     *
     * @var \App\Model\Table\AbonnementEngagementTable
     */
    public $AbonnementEngagement;

    /**
     * Fixtures
     *
     * @var array
     */
    public $fixtures = [
        'app.AbonnementEngagement',
        'app.Abonnements',
        'app.Engagements'
    ];

    /**
     * setUp method
     *
     * @return void
     */
    public function setUp()
    {
        parent::setUp();
        $config = TableRegistry::getTableLocator()->exists('AbonnementEngagement') ? [] : ['className' => AbonnementEngagementTable::class];
        $this->AbonnementEngagement = TableRegistry::getTableLocator()->get('AbonnementEngagement', $config);
    }

    /**
     * tearDown method
     *
     * @return void
     */
    public function tearDown()
    {
        unset($this->AbonnementEngagement);

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
