<?php
namespace App\Test\TestCase\Model\Table;

use App\Model\Table\RepasTable;
use Cake\ORM\TableRegistry;
use Cake\TestSuite\TestCase;

/**
 * App\Model\Table\RepasTable Test Case
 */
class RepasTableTest extends TestCase
{
    /**
     * Test subject
     *
     * @var \App\Model\Table\RepasTable
     */
    public $Repas;

    /**
     * Fixtures
     *
     * @var array
     */
    public $fixtures = [
        'app.Repas',
        'app.Users',
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
        $config = TableRegistry::getTableLocator()->exists('Repas') ? [] : ['className' => RepasTable::class];
        $this->Repas = TableRegistry::getTableLocator()->get('Repas', $config);
    }

    /**
     * tearDown method
     *
     * @return void
     */
    public function tearDown()
    {
        unset($this->Repas);

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
