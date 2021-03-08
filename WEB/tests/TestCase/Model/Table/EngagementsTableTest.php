<?php
namespace App\Test\TestCase\Model\Table;

use App\Model\Table\EngagementsTable;
use Cake\ORM\TableRegistry;
use Cake\TestSuite\TestCase;

/**
 * App\Model\Table\EngagementsTable Test Case
 */
class EngagementsTableTest extends TestCase
{
    /**
     * Test subject
     *
     * @var \App\Model\Table\EngagementsTable
     */
    public $Engagements;

    /**
     * Fixtures
     *
     * @var array
     */
    public $fixtures = [
        'app.Engagements',
        'app.AbonnementEngagement',
        'app.Abonnements'
    ];

    /**
     * setUp method
     *
     * @return void
     */
    public function setUp()
    {
        parent::setUp();
        $config = TableRegistry::getTableLocator()->exists('Engagements') ? [] : ['className' => EngagementsTable::class];
        $this->Engagements = TableRegistry::getTableLocator()->get('Engagements', $config);
    }

    /**
     * tearDown method
     *
     * @return void
     */
    public function tearDown()
    {
        unset($this->Engagements);

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
