<?php
namespace App\Test\TestCase\Model\Table;

use App\Model\Table\FamilleAlimentsTable;
use Cake\ORM\TableRegistry;
use Cake\TestSuite\TestCase;

/**
 * App\Model\Table\FamilleAlimentsTable Test Case
 */
class FamilleAlimentsTableTest extends TestCase
{
    /**
     * Test subject
     *
     * @var \App\Model\Table\FamilleAlimentsTable
     */
    public $FamilleAliments;

    /**
     * Fixtures
     *
     * @var array
     */
    public $fixtures = [
        'app.FamilleAliments',
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
        $config = TableRegistry::getTableLocator()->exists('FamilleAliments') ? [] : ['className' => FamilleAlimentsTable::class];
        $this->FamilleAliments = TableRegistry::getTableLocator()->get('FamilleAliments', $config);
    }

    /**
     * tearDown method
     *
     * @return void
     */
    public function tearDown()
    {
        unset($this->FamilleAliments);

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
