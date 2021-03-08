<?php
namespace App\Test\TestCase\Model\Table;

use App\Model\Table\UserBlessureImagesTable;
use Cake\ORM\TableRegistry;
use Cake\TestSuite\TestCase;

/**
 * App\Model\Table\UserBlessureImagesTable Test Case
 */
class UserBlessureImagesTableTest extends TestCase
{
    /**
     * Test subject
     *
     * @var \App\Model\Table\UserBlessureImagesTable
     */
    public $UserBlessureImages;

    /**
     * Fixtures
     *
     * @var array
     */
    public $fixtures = [
        'app.UserBlessureImages',
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
        $config = TableRegistry::getTableLocator()->exists('UserBlessureImages') ? [] : ['className' => UserBlessureImagesTable::class];
        $this->UserBlessureImages = TableRegistry::getTableLocator()->get('UserBlessureImages', $config);
    }

    /**
     * tearDown method
     *
     * @return void
     */
    public function tearDown()
    {
        unset($this->UserBlessureImages);

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
