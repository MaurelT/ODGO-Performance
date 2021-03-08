<?php
namespace App\Test\TestCase\Model\Table;

use App\Model\Table\ExigenceAlimentairesTable;
use Cake\ORM\TableRegistry;
use Cake\TestSuite\TestCase;

/**
 * App\Model\Table\ExigenceAlimentairesTable Test Case
 */
class ExigenceAlimentairesTableTest extends TestCase
{
    /**
     * Test subject
     *
     * @var \App\Model\Table\ExigenceAlimentairesTable
     */
    public $ExigenceAlimentaires;

    /**
     * Fixtures
     *
     * @var array
     */
    public $fixtures = [
        'app.ExigenceAlimentaires',
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
        $config = TableRegistry::getTableLocator()->exists('ExigenceAlimentaires') ? [] : ['className' => ExigenceAlimentairesTable::class];
        $this->ExigenceAlimentaires = TableRegistry::getTableLocator()->get('ExigenceAlimentaires', $config);
    }

    /**
     * tearDown method
     *
     * @return void
     */
    public function tearDown()
    {
        unset($this->ExigenceAlimentaires);

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
