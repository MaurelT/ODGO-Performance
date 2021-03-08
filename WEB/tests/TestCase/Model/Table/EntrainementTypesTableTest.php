<?php
namespace App\Test\TestCase\Model\Table;

use App\Model\Table\EntrainementTypesTable;
use Cake\ORM\TableRegistry;
use Cake\TestSuite\TestCase;

/**
 * App\Model\Table\EntrainementTypesTable Test Case
 */
class EntrainementTypesTableTest extends TestCase
{
    /**
     * Test subject
     *
     * @var \App\Model\Table\EntrainementTypesTable
     */
    public $EntrainementTypes;

    /**
     * Fixtures
     *
     * @var array
     */
    public $fixtures = [
        'app.EntrainementTypes',
        'app.UserEntrainements'
    ];

    /**
     * setUp method
     *
     * @return void
     */
    public function setUp()
    {
        parent::setUp();
        $config = TableRegistry::getTableLocator()->exists('EntrainementTypes') ? [] : ['className' => EntrainementTypesTable::class];
        $this->EntrainementTypes = TableRegistry::getTableLocator()->get('EntrainementTypes', $config);
    }

    /**
     * tearDown method
     *
     * @return void
     */
    public function tearDown()
    {
        unset($this->EntrainementTypes);

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
