<?php
namespace App\Test\TestCase\Model\Table;

use App\Model\Table\ZoneTestsTable;
use Cake\ORM\TableRegistry;
use Cake\TestSuite\TestCase;

/**
 * App\Model\Table\ZoneTestsTable Test Case
 */
class ZoneTestsTableTest extends TestCase
{
    /**
     * Test subject
     *
     * @var \App\Model\Table\ZoneTestsTable
     */
    public $ZoneTests;

    /**
     * Fixtures
     *
     * @var array
     */
    public $fixtures = [
        'app.ZoneTests',
        'app.VideoTests'
    ];

    /**
     * setUp method
     *
     * @return void
     */
    public function setUp()
    {
        parent::setUp();
        $config = TableRegistry::getTableLocator()->exists('ZoneTests') ? [] : ['className' => ZoneTestsTable::class];
        $this->ZoneTests = TableRegistry::getTableLocator()->get('ZoneTests', $config);
    }

    /**
     * tearDown method
     *
     * @return void
     */
    public function tearDown()
    {
        unset($this->ZoneTests);

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
