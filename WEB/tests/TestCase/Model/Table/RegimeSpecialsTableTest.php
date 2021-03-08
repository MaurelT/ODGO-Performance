<?php
namespace App\Test\TestCase\Model\Table;

use App\Model\Table\RegimeSpecialsTable;
use Cake\ORM\TableRegistry;
use Cake\TestSuite\TestCase;

/**
 * App\Model\Table\RegimeSpecialsTable Test Case
 */
class RegimeSpecialsTableTest extends TestCase
{
    /**
     * Test subject
     *
     * @var \App\Model\Table\RegimeSpecialsTable
     */
    public $RegimeSpecials;

    /**
     * Fixtures
     *
     * @var array
     */
    public $fixtures = [
        'app.RegimeSpecials',
        'app.Users',
        'app.Aliments'
    ];

    /**
     * setUp method
     *
     * @return void
     */
    public function setUp()
    {
        parent::setUp();
        $config = TableRegistry::getTableLocator()->exists('RegimeSpecials') ? [] : ['className' => RegimeSpecialsTable::class];
        $this->RegimeSpecials = TableRegistry::getTableLocator()->get('RegimeSpecials', $config);
    }

    /**
     * tearDown method
     *
     * @return void
     */
    public function tearDown()
    {
        unset($this->RegimeSpecials);

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
