<?php
namespace App\Test\TestCase\Model\Table;

use App\Model\Table\UserSommeilsSommeilFacteurNuisiblesTable;
use Cake\ORM\TableRegistry;
use Cake\TestSuite\TestCase;

/**
 * App\Model\Table\UserSommeilsSommeilFacteurNuisiblesTable Test Case
 */
class UserSommeilsSommeilFacteurNuisiblesTableTest extends TestCase
{
    /**
     * Test subject
     *
     * @var \App\Model\Table\UserSommeilsSommeilFacteurNuisiblesTable
     */
    public $UserSommeilsSommeilFacteurNuisibles;

    /**
     * Fixtures
     *
     * @var array
     */
    public $fixtures = [
        'app.UserSommeilsSommeilFacteurNuisibles',
        'app.UserSommeils',
        'app.SommeilFactureNuisibles'
    ];

    /**
     * setUp method
     *
     * @return void
     */
    public function setUp()
    {
        parent::setUp();
        $config = TableRegistry::getTableLocator()->exists('UserSommeilsSommeilFacteurNuisibles') ? [] : ['className' => UserSommeilsSommeilFacteurNuisiblesTable::class];
        $this->UserSommeilsSommeilFacteurNuisibles = TableRegistry::getTableLocator()->get('UserSommeilsSommeilFacteurNuisibles', $config);
    }

    /**
     * tearDown method
     *
     * @return void
     */
    public function tearDown()
    {
        unset($this->UserSommeilsSommeilFacteurNuisibles);

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
