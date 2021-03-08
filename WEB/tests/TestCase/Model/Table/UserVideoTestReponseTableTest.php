<?php
namespace App\Test\TestCase\Model\Table;

use App\Model\Table\UserVideoTestReponseTable;
use Cake\ORM\TableRegistry;
use Cake\TestSuite\TestCase;

/**
 * App\Model\Table\UserVideoTestReponseTable Test Case
 */
class UserVideoTestReponseTableTest extends TestCase
{
    /**
     * Test subject
     *
     * @var \App\Model\Table\UserVideoTestReponseTable
     */
    public $UserVideoTestReponse;

    /**
     * Fixtures
     *
     * @var array
     */
    public $fixtures = [
        'app.UserVideoTestReponse',
        'app.Users',
        'app.VideoTestReponses'
    ];

    /**
     * setUp method
     *
     * @return void
     */
    public function setUp()
    {
        parent::setUp();
        $config = TableRegistry::getTableLocator()->exists('UserVideoTestReponse') ? [] : ['className' => UserVideoTestReponseTable::class];
        $this->UserVideoTestReponse = TableRegistry::getTableLocator()->get('UserVideoTestReponse', $config);
    }

    /**
     * tearDown method
     *
     * @return void
     */
    public function tearDown()
    {
        unset($this->UserVideoTestReponse);

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
