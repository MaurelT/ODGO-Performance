<?php
namespace App\Test\TestCase\Model\Table;

use App\Model\Table\UsersAlimentsTable;
use Cake\ORM\TableRegistry;
use Cake\TestSuite\TestCase;

/**
 * App\Model\Table\UsersAlimentsTable Test Case
 */
class UsersAlimentsTableTest extends TestCase
{
    /**
     * Test subject
     *
     * @var \App\Model\Table\UsersAlimentsTable
     */
    public $UsersAliments;

    /**
     * Fixtures
     *
     * @var array
     */
    public $fixtures = [
        'app.UsersAliments',
        'app.Users',
        'app.Aliments',
        'app.RepasTypes'
    ];

    /**
     * setUp method
     *
     * @return void
     */
    public function setUp()
    {
        parent::setUp();
        $config = TableRegistry::getTableLocator()->exists('UsersAliments') ? [] : ['className' => UsersAlimentsTable::class];
        $this->UsersAliments = TableRegistry::getTableLocator()->get('UsersAliments', $config);
    }

    /**
     * tearDown method
     *
     * @return void
     */
    public function tearDown()
    {
        unset($this->UsersAliments);

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
