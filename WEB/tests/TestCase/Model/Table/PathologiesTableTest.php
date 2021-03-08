<?php
namespace App\Test\TestCase\Model\Table;

use App\Model\Table\PathologiesTable;
use Cake\ORM\TableRegistry;
use Cake\TestSuite\TestCase;

/**
 * App\Model\Table\PathologiesTable Test Case
 */
class PathologiesTableTest extends TestCase
{
    /**
     * Test subject
     *
     * @var \App\Model\Table\PathologiesTable
     */
    public $Pathologies;

    /**
     * Fixtures
     *
     * @var array
     */
    public $fixtures = [
        'app.Pathologies'
    ];

    /**
     * setUp method
     *
     * @return void
     */
    public function setUp()
    {
        parent::setUp();
        $config = TableRegistry::getTableLocator()->exists('Pathologies') ? [] : ['className' => PathologiesTable::class];
        $this->Pathologies = TableRegistry::getTableLocator()->get('Pathologies', $config);
    }

    /**
     * tearDown method
     *
     * @return void
     */
    public function tearDown()
    {
        unset($this->Pathologies);

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
