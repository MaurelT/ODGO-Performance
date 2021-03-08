<?php
namespace App\Test\TestCase\Model\Table;

use App\Model\Table\GroupeAlimentsTable;
use Cake\ORM\TableRegistry;
use Cake\TestSuite\TestCase;

/**
 * App\Model\Table\GroupeAlimentsTable Test Case
 */
class GroupeAlimentsTableTest extends TestCase
{
    /**
     * Test subject
     *
     * @var \App\Model\Table\GroupeAlimentsTable
     */
    public $GroupeAliments;

    /**
     * Fixtures
     *
     * @var array
     */
    public $fixtures = [
        'app.GroupeAliments',
        'app.Suggestions'
    ];

    /**
     * setUp method
     *
     * @return void
     */
    public function setUp()
    {
        parent::setUp();
        $config = TableRegistry::getTableLocator()->exists('GroupeAliments') ? [] : ['className' => GroupeAlimentsTable::class];
        $this->GroupeAliments = TableRegistry::getTableLocator()->get('GroupeAliments', $config);
    }

    /**
     * tearDown method
     *
     * @return void
     */
    public function tearDown()
    {
        unset($this->GroupeAliments);

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
