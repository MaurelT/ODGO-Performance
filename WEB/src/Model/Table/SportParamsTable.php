<?php
namespace App\Model\Table;

use Cake\ORM\Query;
use Cake\ORM\RulesChecker;
use Cake\ORM\Table;
use Cake\Validation\Validator;

/**
 * SportParams Model
 *
 * @property \App\Model\Table\SportParamTypesTable&\Cake\ORM\Association\BelongsTo $SportParamTypes
 * @property \App\Model\Table\SportsTable&\Cake\ORM\Association\BelongsTo $Sports
 * @property \App\Model\Table\CompetitionSportParamsTable&\Cake\ORM\Association\HasMany $CompetitionSportParams
 *
 * @method \App\Model\Entity\SportParam get($primaryKey, $options = [])
 * @method \App\Model\Entity\SportParam newEntity($data = null, array $options = [])
 * @method \App\Model\Entity\SportParam[] newEntities(array $data, array $options = [])
 * @method \App\Model\Entity\SportParam|false save(\Cake\Datasource\EntityInterface $entity, $options = [])
 * @method \App\Model\Entity\SportParam saveOrFail(\Cake\Datasource\EntityInterface $entity, $options = [])
 * @method \App\Model\Entity\SportParam patchEntity(\Cake\Datasource\EntityInterface $entity, array $data, array $options = [])
 * @method \App\Model\Entity\SportParam[] patchEntities($entities, array $data, array $options = [])
 * @method \App\Model\Entity\SportParam findOrCreate($search, callable $callback = null, $options = [])
 */
class SportParamsTable extends Table
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

        $this->setTable('sport_params');
        $this->setDisplayField('id');
        $this->setPrimaryKey('id');

        $this->belongsTo('SportParamTypes', [
            'foreignKey' => 'sport_param_type_id',
            'joinType' => 'INNER'
        ]);
        $this->belongsTo('Sports', [
            'foreignKey' => 'sport_id',
            'joinType' => 'INNER'
        ]);
        $this->hasMany('CompetitionSportParams', [
            'foreignKey' => 'sport_param_id'
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
            ->scalar('label')
            ->maxLength('label', 255)
            ->requirePresence('label', 'create')
            ->notEmptyString('label');

        $validator
            ->scalar('max_value')
            ->maxLength('max_value', 255)
            ->allowEmptyString('max_value');

        $validator
            ->scalar('unit')
            ->maxLength('unit', 255)
            ->allowEmptyString('unit');

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
        $rules->add($rules->existsIn(['sport_param_type_id'], 'SportParamTypes'));
        $rules->add($rules->existsIn(['sport_id'], 'Sports'));

        return $rules;
    }
}
