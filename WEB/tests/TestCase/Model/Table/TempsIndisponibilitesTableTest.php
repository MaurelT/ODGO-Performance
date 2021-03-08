<?php
namespace App\Test\TestCase\Model\Table;

use App\Model\Table\TempsIndisponibilitesTable;
use Cake\ORM\TableRegistry;
use Cake\TestSuite\TestCase;

/**
 * App\Model\Table\TempsIndisponibilitesTable Test Case
 */
class TempsIndisponibilitesTableTest extends TestCase
{
    /**
     * Test subject
     *
     * @var \App\Model\Table\TempsIndisponibilitesTable
     */
    public $TempsIndisponibilites;

    /**
     * Fixtures
     *
     * @var array
     */
    public $fixtures = [
        'app.TempsIndisponibilites',
        'app.UserBlessures'
    ];

    /**
     * setUp method
     *
     * @return void
     */
    public function setUp()
    {
        parent::setUp();
        $config = TableRegistry::getTableLocator()->exists('TempsIndisponibilites') ? [] : ['className' => TempsIndisponibilitesTable::class];
        $this->TempsIndisponibilites = TableRegistry::getTableLocator()->get('TempsIndisponibilites', $config);
    }

    /**
     * tearDown method
     *
     * @return void
     */
    public function tearDown()
    {
        unset($this->TempsIndisponibilites);

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
