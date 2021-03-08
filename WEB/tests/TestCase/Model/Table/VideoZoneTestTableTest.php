<?php
namespace App\Test\TestCase\Model\Table;

use App\Model\Table\VideoZoneTestTable;
use Cake\ORM\TableRegistry;
use Cake\TestSuite\TestCase;

/**
 * App\Model\Table\VideoZoneTestTable Test Case
 */
class VideoZoneTestTableTest extends TestCase
{
    /**
     * Test subject
     *
     * @var \App\Model\Table\VideoZoneTestTable
     */
    public $VideoZoneTest;

    /**
     * Fixtures
     *
     * @var array
     */
    public $fixtures = [
        'app.VideoZoneTest',
        'app.ZoneTests',
        'app.Videos'
    ];

    /**
     * setUp method
     *
     * @return void
     */
    public function setUp()
    {
        parent::setUp();
        $config = TableRegistry::getTableLocator()->exists('VideoZoneTest') ? [] : ['className' => VideoZoneTestTable::class];
        $this->VideoZoneTest = TableRegistry::getTableLocator()->get('VideoZoneTest', $config);
    }

    /**
     * tearDown method
     *
     * @return void
     */
    public function tearDown()
    {
        unset($this->VideoZoneTest);

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
