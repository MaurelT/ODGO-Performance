<?php
namespace App\Test\TestCase\Model\Table;

use App\Model\Table\AlimentsRegimeSpecialsTable;
use Cake\ORM\TableRegistry;
use Cake\TestSuite\TestCase;

/**
 * App\Model\Table\AlimentsRegimeSpecialsTable Test Case
 */
class AlimentsRegimeSpecialsTableTest extends TestCase
{
    /**
     * Test subject
     *
     * @var \App\Model\Table\AlimentsRegimeSpecialsTable
     */
    public $AlimentsRegimeSpecials;

    /**
     * Fixtures
     *
     * @var array
     */
    public $fixtures = [
        'app.AlimentsRegimeSpecials',
        'app.Aliments',
        'app.RegimeSpecials'
    ];

    /**
     * setUp method
     *
     * @return void
     */
    public function setUp()
    {
        parent::setUp();
        $config = TableRegistry::getTableLocator()->exists('AlimentsRegimeSpecials') ? [] : ['className' => AlimentsRegimeSpecialsTable::class];
        $this->AlimentsRegimeSpecials = TableRegistry::getTableLocator()->get('AlimentsRegimeSpecials', $config);
    }

    /**
     * tearDown method
     *
     * @return void
     */
    public function tearDown()
    {
        unset($this->AlimentsRegimeSpecials);

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
