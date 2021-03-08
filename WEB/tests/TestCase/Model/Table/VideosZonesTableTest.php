<?php
namespace App\Test\TestCase\Model\Table;

use App\Model\Table\VideosZonesTable;
use Cake\ORM\TableRegistry;
use Cake\TestSuite\TestCase;

/**
 * App\Model\Table\VideosZonesTable Test Case
 */
class VideosZonesTableTest extends TestCase
{
    /**
     * Test subject
     *
     * @var \App\Model\Table\VideosZonesTable
     */
    public $VideosZones;

    /**
     * Fixtures
     *
     * @var array
     */
    public $fixtures = [
        'app.VideosZones',
        'app.Videos',
        'app.Zones'
    ];

    /**
     * setUp method
     *
     * @return void
     */
    public function setUp()
    {
        parent::setUp();
        $config = TableRegistry::getTableLocator()->exists('VideosZones') ? [] : ['className' => VideosZonesTable::class];
        $this->VideosZones = TableRegistry::getTableLocator()->get('VideosZones', $config);
    }

    /**
     * tearDown method
     *
     * @return void
     */
    public function tearDown()
    {
        unset($this->VideosZones);

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
