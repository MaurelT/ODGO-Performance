<?php
namespace App\Test\TestCase\Model\Table;

use App\Model\Table\CompetitionSportParamsTable;
use Cake\ORM\TableRegistry;
use Cake\TestSuite\TestCase;

/**
 * App\Model\Table\CompetitionSportParamsTable Test Case
 */
class CompetitionSportParamsTableTest extends TestCase
{
    /**
     * Test subject
     *
     * @var \App\Model\Table\CompetitionSportParamsTable
     */
    public $CompetitionSportParams;

    /**
     * Fixtures
     *
     * @var array
     */
    public $fixtures = [
        'app.CompetitionSportParams',
        'app.Competitions',
        'app.SportParams'
    ];

    /**
     * setUp method
     *
     * @return void
     */
    public function setUp()
    {
        parent::setUp();
        $config = TableRegistry::getTableLocator()->exists('CompetitionSportParams') ? [] : ['className' => CompetitionSportParamsTable::class];
        $this->CompetitionSportParams = TableRegistry::getTableLocator()->get('CompetitionSportParams', $config);
    }

    /**
     * tearDown method
     *
     * @return void
     */
    public function tearDown()
    {
        unset($this->CompetitionSportParams);

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
