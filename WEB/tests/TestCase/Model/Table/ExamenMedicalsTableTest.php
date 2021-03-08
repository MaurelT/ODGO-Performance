<?php
namespace App\Test\TestCase\Model\Table;

use App\Model\Table\ExamenMedicalsTable;
use Cake\ORM\TableRegistry;
use Cake\TestSuite\TestCase;

/**
 * App\Model\Table\ExamenMedicalsTable Test Case
 */
class ExamenMedicalsTableTest extends TestCase
{
    /**
     * Test subject
     *
     * @var \App\Model\Table\ExamenMedicalsTable
     */
    public $ExamenMedicals;

    /**
     * Fixtures
     *
     * @var array
     */
    public $fixtures = [
        'app.ExamenMedicals',
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
        $config = TableRegistry::getTableLocator()->exists('ExamenMedicals') ? [] : ['className' => ExamenMedicalsTable::class];
        $this->ExamenMedicals = TableRegistry::getTableLocator()->get('ExamenMedicals', $config);
    }

    /**
     * tearDown method
     *
     * @return void
     */
    public function tearDown()
    {
        unset($this->ExamenMedicals);

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
