<?php
namespace App\Test\TestCase\Model\Table;

use App\Model\Table\RepasTypesTable;
use Cake\ORM\TableRegistry;
use Cake\TestSuite\TestCase;

/**
 * App\Model\Table\RepasTypesTable Test Case
 */
class RepasTypesTableTest extends TestCase
{
    /**
     * Test subject
     *
     * @var \App\Model\Table\RepasTypesTable
     */
    public $RepasTypes;

    /**
     * Fixtures
     *
     * @var array
     */
    public $fixtures = [
        'app.RepasTypes',
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
        $config = TableRegistry::getTableLocator()->exists('RepasTypes') ? [] : ['className' => RepasTypesTable::class];
        $this->RepasTypes = TableRegistry::getTableLocator()->get('RepasTypes', $config);
    }

    /**
     * tearDown method
     *
     * @return void
     */
    public function tearDown()
    {
        unset($this->RepasTypes);

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
