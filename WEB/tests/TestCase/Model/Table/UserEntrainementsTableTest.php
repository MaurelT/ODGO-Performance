<?php
namespace App\Test\TestCase\Model\Table;

use App\Model\Table\UserEntrainementsTable;
use Cake\ORM\TableRegistry;
use Cake\TestSuite\TestCase;

/**
 * App\Model\Table\UserEntrainementsTable Test Case
 */
class UserEntrainementsTableTest extends TestCase
{
    /**
     * Test subject
     *
     * @var \App\Model\Table\UserEntrainementsTable
     */
    public $UserEntrainements;

    /**
     * Fixtures
     *
     * @var array
     */
    public $fixtures = [
        'app.UserEntrainements',
        'app.Users',
        'app.EntrainementTypes'
    ];

    /**
     * setUp method
     *
     * @return void
     */
    public function setUp()
    {
        parent::setUp();
        $config = TableRegistry::getTableLocator()->exists('UserEntrainements') ? [] : ['className' => UserEntrainementsTable::class];
        $this->UserEntrainements = TableRegistry::getTableLocator()->get('UserEntrainements', $config);
    }

    /**
     * tearDown method
     *
     * @return void
     */
    public function tearDown()
    {
        unset($this->UserEntrainements);

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
