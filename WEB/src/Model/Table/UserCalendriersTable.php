<?php
namespace App\Model\Table;

use Cake\ORM\Query;
use Cake\ORM\RulesChecker;
use Cake\ORM\Table;
use Cake\Validation\Validator;

/**
 * UserCalendriers Model
 *
 * @property \App\Model\Table\UsersTable&\Cake\ORM\Association\BelongsTo $Users
 * @property \App\Model\Table\ActiviteTypesTable&\Cake\ORM\Association\BelongsTo $ActiviteTypes
 * @property \App\Model\Table\UserSemaineTypesTable&\Cake\ORM\Association\BelongsTo $UserSemaineTypes
 *
 * @method \App\Model\Entity\UserCalendrier get($primaryKey, $options = [])
 * @method \App\Model\Entity\UserCalendrier newEntity($data = null, array $options = [])
 * @method \App\Model\Entity\UserCalendrier[] newEntities(array $data, array $options = [])
 * @method \App\Model\Entity\UserCalendrier|false save(\Cake\Datasource\EntityInterface $entity, $options = [])
 * @method \App\Model\Entity\UserCalendrier saveOrFail(\Cake\Datasource\EntityInterface $entity, $options = [])
 * @method \App\Model\Entity\UserCalendrier patchEntity(\Cake\Datasource\EntityInterface $entity, array $data, array $options = [])
 * @method \App\Model\Entity\UserCalendrier[] patchEntities($entities, array $data, array $options = [])
 * @method \App\Model\Entity\UserCalendrier findOrCreate($search, callable $callback = null, $options = [])
 *
 * @mixin \Cake\ORM\Behavior\TimestampBehavior
 */
class UserCalendriersTable extends Table
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

        $this->setTable('user_calendriers');
        $this->setDisplayField('id');
        $this->setPrimaryKey('id');

        $this->addBehavior('Timestamp');

        $this->belongsTo('Users', [
            'foreignKey' => 'user_id',
            'joinType' => 'INNER'
        ]);
        $this->belongsTo('ActiviteTypes', [
            'foreignKey' => 'activite_type_id',
            'joinType' => 'INNER'
        ]);
        $this->belongsTo('UserSemaineTypes', [
            'foreignKey' => 'user_semaine_type_id'
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
            ->date('date')
            ->requirePresence('date', 'create')
            ->notEmptyDate('date');

        $validator
            ->time('heure_debut')
            ->requirePresence('heure_debut', 'create')
            ->notEmptyTime('heure_debut');

        $validator
            ->time('heure_fin')
            ->requirePresence('heure_fin', 'create')
            ->notEmptyTime('heure_fin');

        $validator
            ->boolean('is_active')
            ->allowEmptyString('is_active');

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
        $rules->add($rules->existsIn(['user_id'], 'Users'));
        $rules->add($rules->existsIn(['activite_type_id'], 'ActiviteTypes'));
        $rules->add($rules->existsIn(['user_semaine_type_id'], 'UserSemaineTypes'));

        return $rules;
    }
}
