<?php
namespace App\Test\TestCase\Model\Table;

use App\Model\Table\ProgrammesTable;
use Cake\ORM\TableRegistry;
use Cake\TestSuite\TestCase;

/**
 * App\Model\Table\ProgrammesTable Test Case
 */
class ProgrammesTableTest extends TestCase
{
    /**
     * Test subject
     *
     * @var \App\Model\Table\ProgrammesTable
     */
    public $Programmes;

    /**
     * Fixtures
     *
     * @var array
     */
    public $fixtures = [
        'app.Programmes',
        'app.ProgrammeTypes',
        'app.Zones',
        'app.ProgrammeVideos'
    ];

    /**
     * setUp method
     *
     * @return void
     */
    public function setUp()
    {
        parent::setUp();
        $config = TableRegistry::getTableLocator()->exists('Programmes') ? [] : ['className' => ProgrammesTable::class];
        $this->Programmes = TableRegistry::getTableLocator()->get('Programmes', $config);
    }

    /**
     * tearDown method
     *
     * @return void
     */
    public function tearDown()
    {
        unset($this->Programmes);

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
