<?php
namespace App\Test\TestCase\Model\Table;

use App\Model\Table\AlimentsRepasTable;
use Cake\ORM\TableRegistry;
use Cake\TestSuite\TestCase;

/**
 * App\Model\Table\AlimentsRepasTable Test Case
 */
class AlimentsRepasTableTest extends TestCase
{
    /**
     * Test subject
     *
     * @var \App\Model\Table\AlimentsRepasTable
     */
    public $AlimentsRepas;

    /**
     * Fixtures
     *
     * @var array
     */
    public $fixtures = [
        'app.AlimentsRepas',
        'app.Aliments',
        'app.Repas'
    ];

    /**
     * setUp method
     *
     * @return void
     */
    public function setUp()
    {
        parent::setUp();
        $config = TableRegistry::getTableLocator()->exists('AlimentsRepas') ? [] : ['className' => AlimentsRepasTable::class];
        $this->AlimentsRepas = TableRegistry::getTableLocator()->get('AlimentsRepas', $config);
    }

    /**
     * tearDown method
     *
     * @return void
     */
    public function tearDown()
    {
        unset($this->AlimentsRepas);

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
