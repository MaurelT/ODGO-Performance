<?php
namespace App\Test\TestCase\Model\Table;

use App\Model\Table\ObjectifsTable;
use Cake\ORM\TableRegistry;
use Cake\TestSuite\TestCase;

/**
 * App\Model\Table\ObjectifsTable Test Case
 */
class ObjectifsTableTest extends TestCase
{
    /**
     * Test subject
     *
     * @var \App\Model\Table\ObjectifsTable
     */
    public $Objectifs;

    /**
     * Fixtures
     *
     * @var array
     */
    public $fixtures = [
        'app.Objectifs',
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
        $config = TableRegistry::getTableLocator()->exists('Objectifs') ? [] : ['className' => ObjectifsTable::class];
        $this->Objectifs = TableRegistry::getTableLocator()->get('Objectifs', $config);
    }

    /**
     * tearDown method
     *
     * @return void
     */
    public function tearDown()
    {
        unset($this->Objectifs);

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
