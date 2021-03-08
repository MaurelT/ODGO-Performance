<?php
namespace App\Test\TestCase\Model\Table;

use App\Model\Table\BlessuresTable;
use Cake\ORM\TableRegistry;
use Cake\TestSuite\TestCase;

/**
 * App\Model\Table\BlessuresTable Test Case
 */
class BlessuresTableTest extends TestCase
{
    /**
     * Test subject
     *
     * @var \App\Model\Table\BlessuresTable
     */
    public $Blessures;

    /**
     * Fixtures
     *
     * @var array
     */
    public $fixtures = [
        'app.Blessures',
        'app.BlessurePathologies'
    ];

    /**
     * setUp method
     *
     * @return void
     */
    public function setUp()
    {
        parent::setUp();
        $config = TableRegistry::getTableLocator()->exists('Blessures') ? [] : ['className' => BlessuresTable::class];
        $this->Blessures = TableRegistry::getTableLocator()->get('Blessures', $config);
    }

    /**
     * tearDown method
     *
     * @return void
     */
    public function tearDown()
    {
        unset($this->Blessures);

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
