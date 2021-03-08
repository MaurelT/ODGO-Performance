<?php
namespace App\Test\TestCase\Model\Table;

use App\Model\Table\SportNiveauClubsCompetitionsTable;
use Cake\ORM\TableRegistry;
use Cake\TestSuite\TestCase;

/**
 * App\Model\Table\SportNiveauClubsCompetitionsTable Test Case
 */
class SportNiveauClubsCompetitionsTableTest extends TestCase
{
    /**
     * Test subject
     *
     * @var \App\Model\Table\SportNiveauClubsCompetitionsTable
     */
    public $SportNiveauClubsCompetitions;

    /**
     * Fixtures
     *
     * @var array
     */
    public $fixtures = [
        'app.SportNiveauClubsCompetitions',
        'app.SportNiveauClubs',
        'app.Competitions'
    ];

    /**
     * setUp method
     *
     * @return void
     */
    public function setUp()
    {
        parent::setUp();
        $config = TableRegistry::getTableLocator()->exists('SportNiveauClubsCompetitions') ? [] : ['className' => SportNiveauClubsCompetitionsTable::class];
        $this->SportNiveauClubsCompetitions = TableRegistry::getTableLocator()->get('SportNiveauClubsCompetitions', $config);
    }

    /**
     * tearDown method
     *
     * @return void
     */
    public function tearDown()
    {
        unset($this->SportNiveauClubsCompetitions);

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
