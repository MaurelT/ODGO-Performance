<?php
namespace App\Model\Table;

use Cake\ORM\Query;
use Cake\ORM\RulesChecker;
use Cake\ORM\Table;
use Cake\Validation\Validator;

/**
 * HydratationContenants Model
 *
 * @property \App\Model\Table\UserHydratationsTable&\Cake\ORM\Association\HasMany $UserHydratations
 *
 * @method \App\Model\Entity\HydratationContenant get($primaryKey, $options = [])
 * @method \App\Model\Entity\HydratationContenant newEntity($data = null, array $options = [])
 * @method \App\Model\Entity\HydratationContenant[] newEntities(array $data, array $options = [])
 * @method \App\Model\Entity\HydratationContenant|false save(\Cake\Datasource\EntityInterface $entity, $options = [])
 * @method \App\Model\Entity\HydratationContenant saveOrFail(\Cake\Datasource\EntityInterface $entity, $options = [])
 * @method \App\Model\Entity\HydratationContenant patchEntity(\Cake\Datasource\EntityInterface $entity, array $data, array $options = [])
 * @method \App\Model\Entity\HydratationContenant[] patchEntities($entities, array $data, array $options = [])
 * @method \App\Model\Entity\HydratationContenant findOrCreate($search, callable $callback = null, $options = [])
 */
class HydratationContenantsTable extends Table
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

        $this->setTable('hydratation_contenants');
        $this->setDisplayField('name');
        $this->setPrimaryKey('id');

        $this->hasMany('UserHydratations', [
            'foreignKey' => 'hydratation_contenant_id'
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
            ->requirePresence('name', 'create')
            ->notEmptyString('name');

        $validator
            ->integer('contenance_ml')
            ->requirePresence('contenance_ml', 'create')
            ->notEmptyString('contenance_ml');

        return $validator;
    }
}
