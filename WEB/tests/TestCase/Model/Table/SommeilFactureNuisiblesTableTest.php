<?php
namespace App\Test\TestCase\Model\Table;

use App\Model\Table\SommeilFactureNuisiblesTable;
use Cake\ORM\TableRegistry;
use Cake\TestSuite\TestCase;

/**
 * App\Model\Table\SommeilFactureNuisiblesTable Test Case
 */
class SommeilFactureNuisiblesTableTest extends TestCase
{
    /**
     * Test subject
     *
     * @var \App\Model\Table\SommeilFactureNuisiblesTable
     */
    public $SommeilFactureNuisibles;

    /**
     * Fixtures
     *
     * @var array
     */
    public $fixtures = [
        'app.SommeilFactureNuisibles',
        'app.UserSommeilsSommeilFacteurNuisibles'
    ];

    /**
     * setUp method
     *
     * @return void
     */
    public function setUp()
    {
        parent::setUp();
        $config = TableRegistry::getTableLocator()->exists('SommeilFactureNuisibles') ? [] : ['className' => SommeilFactureNuisiblesTable::class];
        $this->SommeilFactureNuisibles = TableRegistry::getTableLocator()->get('SommeilFactureNuisibles', $config);
    }

    /**
     * tearDown method
     *
     * @return void
     */
    public function tearDown()
    {
        unset($this->SommeilFactureNuisibles);

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
