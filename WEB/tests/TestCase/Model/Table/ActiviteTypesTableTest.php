<?php
namespace App\Test\TestCase\Model\Table;

use App\Model\Table\ActiviteTypesTable;
use Cake\ORM\TableRegistry;
use Cake\TestSuite\TestCase;

/**
 * App\Model\Table\ActiviteTypesTable Test Case
 */
class ActiviteTypesTableTest extends TestCase
{
    /**
     * Test subject
     *
     * @var \App\Model\Table\ActiviteTypesTable
     */
    public $ActiviteTypes;

    /**
     * Fixtures
     *
     * @var array
     */
    public $fixtures = [
        'app.ActiviteTypes',
        'app.Sports',
        'app.UserCalendriers',
        'app.UserSemaineTypes'
    ];

    /**
     * setUp method
     *
     * @return void
     */
    public function setUp()
    {
        parent::setUp();
        $config = TableRegistry::getTableLocator()->exists('ActiviteTypes') ? [] : ['className' => ActiviteTypesTable::class];
        $this->ActiviteTypes = TableRegistry::getTableLocator()->get('ActiviteTypes', $config);
    }

    /**
     * tearDown method
     *
     * @return void
     */
    public function tearDown()
    {
        unset($this->ActiviteTypes);

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
