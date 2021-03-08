<?php
namespace App\Test\TestCase\Model\Table;

use App\Model\Table\AlimentsTable;
use Cake\ORM\TableRegistry;
use Cake\TestSuite\TestCase;

/**
 * App\Model\Table\AlimentsTable Test Case
 */
class AlimentsTableTest extends TestCase
{
    /**
     * Test subject
     *
     * @var \App\Model\Table\AlimentsTable
     */
    public $Aliments;

    /**
     * Fixtures
     *
     * @var array
     */
    public $fixtures = [
        'app.Aliments',
        'app.FamilleAliments',
        'app.AlimentTypes',
        'app.RegimeSpecials',
        'app.RepasTypes',
        'app.Users'
    ];

    /**
     * setUp method
     *
     * @return void
     */
    public function setUp()
    {
        parent::setUp();
        $config = TableRegistry::getTableLocator()->exists('Aliments') ? [] : ['className' => AlimentsTable::class];
        $this->Aliments = TableRegistry::getTableLocator()->get('Aliments', $config);
    }

    /**
     * tearDown method
     *
     * @return void
     */
    public function tearDown()
    {
        unset($this->Aliments);

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
