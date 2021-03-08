<?php
namespace App\Test\TestCase\Model\Table;

use App\Model\Table\ExigenceAlimentairesUsersTable;
use Cake\ORM\TableRegistry;
use Cake\TestSuite\TestCase;

/**
 * App\Model\Table\ExigenceAlimentairesUsersTable Test Case
 */
class ExigenceAlimentairesUsersTableTest extends TestCase
{
    /**
     * Test subject
     *
     * @var \App\Model\Table\ExigenceAlimentairesUsersTable
     */
    public $ExigenceAlimentairesUsers;

    /**
     * Fixtures
     *
     * @var array
     */
    public $fixtures = [
        'app.ExigenceAlimentairesUsers',
        'app.Users',
        'app.ExigenceAlimentaires'
    ];

    /**
     * setUp method
     *
     * @return void
     */
    public function setUp()
    {
        parent::setUp();
        $config = TableRegistry::getTableLocator()->exists('ExigenceAlimentairesUsers') ? [] : ['className' => ExigenceAlimentairesUsersTable::class];
        $this->ExigenceAlimentairesUsers = TableRegistry::getTableLocator()->get('ExigenceAlimentairesUsers', $config);
    }

    /**
     * tearDown method
     *
     * @return void
     */
    public function tearDown()
    {
        unset($this->ExigenceAlimentairesUsers);

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
