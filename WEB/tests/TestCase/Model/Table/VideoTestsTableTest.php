<?php
namespace App\Test\TestCase\Model\Table;

use App\Model\Table\VideoTestsTable;
use Cake\ORM\TableRegistry;
use Cake\TestSuite\TestCase;

/**
 * App\Model\Table\VideoTestsTable Test Case
 */
class VideoTestsTableTest extends TestCase
{
    /**
     * Test subject
     *
     * @var \App\Model\Table\VideoTestsTable
     */
    public $VideoTests;

    /**
     * Fixtures
     *
     * @var array
     */
    public $fixtures = [
        'app.VideoTests',
        'app.ZoneTests',
        'app.VideoTestReponses'
    ];

    /**
     * setUp method
     *
     * @return void
     */
    public function setUp()
    {
        parent::setUp();
        $config = TableRegistry::getTableLocator()->exists('VideoTests') ? [] : ['className' => VideoTestsTable::class];
        $this->VideoTests = TableRegistry::getTableLocator()->get('VideoTests', $config);
    }

    /**
     * tearDown method
     *
     * @return void
     */
    public function tearDown()
    {
        unset($this->VideoTests);

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
