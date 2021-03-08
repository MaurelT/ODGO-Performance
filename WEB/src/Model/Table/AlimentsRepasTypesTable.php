<?php
namespace App\Model\Table;

use Cake\ORM\Query;
use Cake\ORM\RulesChecker;
use Cake\ORM\Table;
use Cake\Validation\Validator;

/**
 * AlimentsRepasTypes Model
 *
 * @property \App\Model\Table\AlimentsTable&\Cake\ORM\Association\BelongsTo $Aliments
 * @property \App\Model\Table\AlimentsRepasTypesTable&\Cake\ORM\Association\BelongsTo $AlimentsRepasTypes
 *
 * @method \App\Model\Entity\AlimentsRepasType get($primaryKey, $options = [])
 * @method \App\Model\Entity\AlimentsRepasType newEntity($data = null, array $options = [])
 * @method \App\Model\Entity\AlimentsRepasType[] newEntities(array $data, array $options = [])
 * @method \App\Model\Entity\AlimentsRepasType|false save(\Cake\Datasource\EntityInterface $entity, $options = [])
 * @method \App\Model\Entity\AlimentsRepasType saveOrFail(\Cake\Datasource\EntityInterface $entity, $options = [])
 * @method \App\Model\Entity\AlimentsRepasType patchEntity(\Cake\Datasource\EntityInterface $entity, array $data, array $options = [])
 * @method \App\Model\Entity\AlimentsRepasType[] patchEntities($entities, array $data, array $options = [])
 * @method \App\Model\Entity\AlimentsRepasType findOrCreate($search, callable $callback = null, $options = [])
 */
class AlimentsRepasTypesTable extends Table
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

        $this->setTable('aliments_repas_types');
        $this->setDisplayField('id');
        $this->setPrimaryKey('id');

        $this->belongsTo('Aliments', [
            'foreignKey' => 'aliment_id',
            'joinType' => 'INNER'
        ]);
        $this->belongsTo('AlimentsRepasTypes', [
            'foreignKey' => 'aliments_repas_types_id',
            'joinType' => 'INNER'
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

        return $validator;
    }

    /**
     * Returns a rules checker object that will be used for validating
     * application integrity.
     *
     * @param \Cake\ORM\RulesChecker $rules The rules object to be modified.
     * @return \Cake\ORM\RulesChecker
     */
    public function buildRules(RulesChecker $rules)
    {
        $rules->add($rules->existsIn(['aliment_id'], 'Aliments'));
        $rules->add($rules->existsIn(['aliments_repas_types_id'], 'AlimentsRepasTypes'));

        return $rules;
    }
}
