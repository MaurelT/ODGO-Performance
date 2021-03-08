<?php
namespace App\Test\TestCase\Model\Table;

use App\Model\Table\ProgrammeTypesTable;
use Cake\ORM\TableRegistry;
use Cake\TestSuite\TestCase;

/**
 * App\Model\Table\ProgrammeTypesTable Test Case
 */
class ProgrammeTypesTableTest extends TestCase
{
    /**
     * Test subject
     *
     * @var \App\Model\Table\ProgrammeTypesTable
     */
    public $ProgrammeTypes;

    /**
     * Fixtures
     *
     * @var array
     */
    public $fixtures = [
        'app.ProgrammeTypes',
        'app.Programmes',
        'app.UserProgrammes'
    ];

    /**
     * setUp method
     *
     * @return void
     */
    public function setUp()
    {
        parent::setUp();
        $config = TableRegistry::getTableLocator()->exists('ProgrammeTypes') ? [] : ['className' => ProgrammeTypesTable::class];
        $this->ProgrammeTypes = TableRegistry::getTableLocator()->get('ProgrammeTypes', $config);
    }

    /**
     * tearDown method
     *
     * @return void
     */
    public function tearDown()
    {
        unset($this->ProgrammeTypes);

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
