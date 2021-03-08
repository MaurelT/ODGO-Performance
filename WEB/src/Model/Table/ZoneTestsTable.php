<?php
namespace App\Model\Table;

use Cake\ORM\Query;
use Cake\ORM\RulesChecker;
use Cake\ORM\Table;
use Cake\Validation\Validator;

/**
 * ZoneTests Model
 *
 * @property \App\Model\Table\VideoTestsTable&\Cake\ORM\Association\HasMany $VideoTests
 *
 * @method \App\Model\Entity\ZoneTest get($primaryKey, $options = [])
 * @method \App\Model\Entity\ZoneTest newEntity($data = null, array $options = [])
 * @method \App\Model\Entity\ZoneTest[] newEntities(array $data, array $options = [])
 * @method \App\Model\Entity\ZoneTest|false save(\Cake\Datasource\EntityInterface $entity, $options = [])
 * @method \App\Model\Entity\ZoneTest saveOrFail(\Cake\Datasource\EntityInterface $entity, $options = [])
 * @method \App\Model\Entity\ZoneTest patchEntity(\Cake\Datasource\EntityInterface $entity, array $data, array $options = [])
 * @method \App\Model\Entity\ZoneTest[] patchEntities($entities, array $data, array $options = [])
 * @method \App\Model\Entity\ZoneTest findOrCreate($search, callable $callback = null, $options = [])
 */
class ZoneTestsTable extends Table
{
    /**
     * Initialize method
     *
     * @param array $config The configuration for the Table.
     * @return void
     */
    public function initialize(array $config)
    {
        parent::initialize($config);

        $this->setTable('zone_tests');
        $this->setDisplayField('name');
        $this->setPrimaryKey('id');

        $this->hasMany('VideoTests', [
            'foreignKey' => 'zone_test_id'
        ]);
    }

    /**
     * Default validation rules.
     *
     * @param \Cake\Validation\Validator $validator Validator instance.
     * @return \Cake\Validation\Validator
     */
    public function validationDefault(Validator $validator)
    {
        $validator
            ->integer('id')
            ->allowEmptyString('id', null, 'create');

        $validator
            ->scalar('name')
            ->maxLength('name', 255)
            ->notEmptyString('name');

        return $validator;
    }
}
