<?php
namespace App\Test\TestCase\Model\Table;

use App\Model\Table\NationalitesTable;
use Cake\ORM\TableRegistry;
use Cake\TestSuite\TestCase;

/**
 * App\Model\Table\NationalitesTable Test Case
 */
class NationalitesTableTest extends TestCase
{
    /**
     * Test subject
     *
     * @var \App\Model\Table\NationalitesTable
     */
    public $Nationalites;

    /**
     * Fixtures
     *
     * @var array
     */
    public $fixtures = [
        'app.Nationalites',
        'app.Users'
    ];

    /**
     * setUp method
     *
     * @return void
     */
    public function setUp()
    {
        parent::setUp();
        $config = TableRegistry::getTableLocator()->exists('Nationalites') ? [] : ['className' => NationalitesTable::class];
        $this->Nationalites = TableRegistry::getTableLocator()->get('Nationalites', $config);
    }

    /**
     * tearDown method
     *
     * @return void
     */
    public function tearDown()
    {
        unset($this->Nationalites);

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
