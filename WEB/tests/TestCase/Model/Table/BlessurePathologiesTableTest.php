<?php
namespace App\Test\TestCase\Model\Table;

use App\Model\Table\BlessurePathologiesTable;
use Cake\ORM\TableRegistry;
use Cake\TestSuite\TestCase;

/**
 * App\Model\Table\BlessurePathologiesTable Test Case
 */
class BlessurePathologiesTableTest extends TestCase
{
    /**
     * Test subject
     *
     * @var \App\Model\Table\BlessurePathologiesTable
     */
    public $BlessurePathologies;

    /**
     * Fixtures
     *
     * @var array
     */
    public $fixtures = [
        'app.BlessurePathologies'
    ];

    /**
     * setUp method
     *
     * @return void
     */
    public function setUp()
    {
        parent::setUp();
        $config = TableRegistry::getTableLocator()->exists('BlessurePathologies') ? [] : ['className' => BlessurePathologiesTable::class];
        $this->BlessurePathologies = TableRegistry::getTableLocator()->get('BlessurePathologies', $config);
    }

    /**
     * tearDown method
     *
     * @return void
     */
    public function tearDown()
    {
        unset($this->BlessurePathologies);

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
