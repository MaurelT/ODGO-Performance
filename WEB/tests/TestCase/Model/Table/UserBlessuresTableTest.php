<?php
namespace App\Test\TestCase\Model\Table;

use App\Model\Table\UserBlessuresTable;
use Cake\ORM\TableRegistry;
use Cake\TestSuite\TestCase;

/**
 * App\Model\Table\UserBlessuresTable Test Case
 */
class UserBlessuresTableTest extends TestCase
{
    /**
     * Test subject
     *
     * @var \App\Model\Table\UserBlessuresTable
     */
    public $UserBlessures;

    /**
     * Fixtures
     *
     * @var array
     */
    public $fixtures = [
        'app.UserBlessures',
        'app.Users',
        'app.Zones',
        'app.Pathologies',
        'app.TempsIndisponibilites',
        'app.ExamenMedicals',
        'app.UserBlessureImages'
    ];

    /**
     * setUp method
     *
     * @return void
     */
    public function setUp()
    {
        parent::setUp();
        $config = TableRegistry::getTableLocator()->exists('UserBlessures') ? [] : ['className' => UserBlessuresTable::class];
        $this->UserBlessures = TableRegistry::getTableLocator()->get('UserBlessures', $config);
    }

    /**
     * tearDown method
     *
     * @return void
     */
    public function tearDown()
    {
        unset($this->UserBlessures);

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
