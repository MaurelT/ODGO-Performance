<?php
namespace App\Model\Table;

use Cake\ORM\Query;
use Cake\ORM\RulesChecker;
use Cake\ORM\Table;
use Cake\Validation\Validator;

/**
 * BlessurePathologies Model
 *
 * @method \App\Model\Entity\BlessurePathology get($primaryKey, $options = [])
 * @method \App\Model\Entity\BlessurePathology newEntity($data = null, array $options = [])
 * @method \App\Model\Entity\BlessurePathology[] newEntities(array $data, array $options = [])
 * @method \App\Model\Entity\BlessurePathology|false save(\Cake\Datasource\EntityInterface $entity, $options = [])
 * @method \App\Model\Entity\BlessurePathology saveOrFail(\Cake\Datasource\EntityInterface $entity, $options = [])
 * @method \App\Model\Entity\BlessurePathology patchEntity(\Cake\Datasource\EntityInterface $entity, array $data, array $options = [])
 * @method \App\Model\Entity\BlessurePathology[] patchEntities($entities, array $data, array $options = [])
 * @method \App\Model\Entity\BlessurePathology findOrCreate($search, callable $callback = null, $options = [])
 */
class BlessurePathologiesTable extends Table
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

        $this->setTable('blessure_pathologies');
        $this->setDisplayField('name');
        $this->setPrimaryKey('id');
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
            ->requirePresence('name', 'create')
            ->notEmptyString('name');

        $validator
            ->boolean('is_active')
            ->notEmptyString('is_active');

        $validator
            ->requirePresence('ordre', 'create')
            ->notEmptyString('ordre');

        return $validator;
    }
}
