<?php
namespace App\Model\Table;

use Cake\ORM\Query;
use Cake\ORM\RulesChecker;
use Cake\ORM\Table;
use Cake\Validation\Validator;

/**
 * Suggestions Model
 *
 * @property \App\Model\Table\RangesTable&\Cake\ORM\Association\BelongsTo $Ranges
 * @property \App\Model\Table\AlimentsTable&\Cake\ORM\Association\BelongsTo $Aliments
 * @property \App\Model\Table\GroupeAlimentsTable&\Cake\ORM\Association\BelongsTo $GroupeAliments
 * @property \App\Model\Table\RepasTypesTable&\Cake\ORM\Association\BelongsTo $RepasTypes
 *
 * @method \App\Model\Entity\Suggestion get($primaryKey, $options = [])
 * @method \App\Model\Entity\Suggestion newEntity($data = null, array $options = [])
 * @method \App\Model\Entity\Suggestion[] newEntities(array $data, array $options = [])
 * @method \App\Model\Entity\Suggestion|false save(\Cake\Datasource\EntityInterface $entity, $options = [])
 * @method \App\Model\Entity\Suggestion saveOrFail(\Cake\Datasource\EntityInterface $entity, $options = [])
 * @method \App\Model\Entity\Suggestion patchEntity(\Cake\Datasource\EntityInterface $entity, array $data, array $options = [])
 * @method \App\Model\Entity\Suggestion[] patchEntities($entities, array $data, array $options = [])
 * @method \App\Model\Entity\Suggestion findOrCreate($search, callable $callback = null, $options = [])
 */
class SuggestionsTable extends Table
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

        $this->setTable('suggestions');
        $this->setDisplayField('id');
        $this->setPrimaryKey('id');

        $this->belongsTo('Ranges', [
            'foreignKey' => 'range_id',
            'joinType' => 'INNER'
        ]);
        $this->belongsTo('Aliments', [
            'foreignKey' => 'aliment_id',
            'joinType' => 'INNER'
        ]);
        $this->belongsTo('GroupeAliments', [
            'foreignKey' => 'groupe_aliment_id',
            'joinType' => 'INNER'
        ]);
        $this->belongsTo('RepasTypes', [
            'foreignKey' => 'repas_type_id',
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
        $rules->add($rules->existsIn(['range_id'], 'Ranges'));
        $rules->add($rules->existsIn(['aliment_id'], 'Aliments'));
        $rules->add($rules->existsIn(['groupe_aliment_id'], 'GroupeAliments'));
        $rules->add($rules->existsIn(['repas_type_id'], 'RepasTypes'));

        return $rules;
    }
}
