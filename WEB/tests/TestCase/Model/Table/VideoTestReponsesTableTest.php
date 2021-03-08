<?php
namespace App\Test\TestCase\Model\Table;

use App\Model\Table\VideoTestReponsesTable;
use Cake\ORM\TableRegistry;
use Cake\TestSuite\TestCase;

/**
 * App\Model\Table\VideoTestReponsesTable Test Case
 */
class VideoTestReponsesTableTest extends TestCase
{
    /**
     * Test subject
     *
     * @var \App\Model\Table\VideoTestReponsesTable
     */
    public $VideoTestReponses;

    /**
     * Fixtures
     *
     * @var array
     */
    public $fixtures = [
        'app.VideoTestReponses',
        'app.VideoTests'
    ];

    /**
     * setUp method
     *
     * @return void
     */
    public function setUp()
    {
        parent::setUp();
        $config = TableRegistry::getTableLocator()->exists('VideoTestReponses') ? [] : ['className' => VideoTestReponsesTable::class];
        $this->VideoTestReponses = TableRegistry::getTableLocator()->get('VideoTestReponses', $config);
    }

    /**
     * tearDown method
     *
     * @return void
     */
    public function tearDown()
    {
        unset($this->VideoTestReponses);

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
