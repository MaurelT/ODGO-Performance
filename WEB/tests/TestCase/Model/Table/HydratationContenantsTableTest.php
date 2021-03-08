<?php
namespace App\Test\TestCase\Model\Table;

use App\Model\Table\HydratationContenantsTable;
use Cake\ORM\TableRegistry;
use Cake\TestSuite\TestCase;

/**
 * App\Model\Table\HydratationContenantsTable Test Case
 */
class HydratationContenantsTableTest extends TestCase
{
    /**
     * Test subject
     *
     * @var \App\Model\Table\HydratationContenantsTable
     */
    public $HydratationContenants;

    /**
     * Fixtures
     *
     * @var array
     */
    public $fixtures = [
        'app.HydratationContenants',
        'app.UserHydratations'
    ];

    /**
     * setUp method
     *
     * @return void
     */
    public function setUp()
    {
        parent::setUp();
        $config = TableRegistry::getTableLocator()->exists('HydratationContenants') ? [] : ['className' => HydratationContenantsTable::class];
        $this->HydratationContenants = TableRegistry::getTableLocator()->get('HydratationContenants', $config);
    }

    /**
     * tearDown method
     *
     * @return void
     */
    public function tearDown()
    {
        unset($this->HydratationContenants);

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
