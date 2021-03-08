<?php
namespace App\Test\TestCase\Model\Table;

use App\Model\Table\AlimentsRepasTypesTable;
use Cake\ORM\TableRegistry;
use Cake\TestSuite\TestCase;

/**
 * App\Model\Table\AlimentsRepasTypesTable Test Case
 */
class AlimentsRepasTypesTableTest extends TestCase
{
    /**
     * Test subject
     *
     * @var \App\Model\Table\AlimentsRepasTypesTable
     */
    public $AlimentsRepasTypes;

    /**
     * Fixtures
     *
     * @var array
     */
    public $fixtures = [
        'app.AlimentsRepasTypes',
        'app.Aliments'
    ];

    /**
     * setUp method
     *
     * @return void
     */
    public function setUp()
    {
        parent::setUp();
        $config = TableRegistry::getTableLocator()->exists('AlimentsRepasTypes') ? [] : ['className' => AlimentsRepasTypesTable::class];
        $this->AlimentsRepasTypes = TableRegistry::getTableLocator()->get('AlimentsRepasTypes', $config);
    }

    /**
     * tearDown method
     *
     * @return void
     */
    public function tearDown()
    {
        unset($this->AlimentsRepasTypes);

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
