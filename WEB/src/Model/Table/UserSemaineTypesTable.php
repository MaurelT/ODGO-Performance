<?php
namespace App\Model\Table;

use Cake\ORM\Query;
use Cake\ORM\RulesChecker;
use Cake\ORM\Table;
use Cake\Validation\Validator;

/**
 * UserSemaineTypes Model
 *
 * @property \App\Model\Table\UsersTable&\Cake\ORM\Association\BelongsTo $Users
 * @property \App\Model\Table\ActiviteTypesTable&\Cake\ORM\Association\BelongsTo $ActiviteTypes
 * @property \App\Model\Table\UserCalendriersTable&\Cake\ORM\Association\HasMany $UserCalendriers
 *
 * @method \App\Model\Entity\UserSemaineType get($primaryKey, $options = [])
 * @method \App\Model\Entity\UserSemaineType newEntity($data = null, array $options = [])
 * @method \App\Model\Entity\UserSemaineType[] newEntities(array $data, array $options = [])
 * @method \App\Model\Entity\UserSemaineType|false save(\Cake\Datasource\EntityInterface $entity, $options = [])
 * @method \App\Model\Entity\UserSemaineType saveOrFail(\Cake\Datasource\EntityInterface $entity, $options = [])
 * @method \App\Model\Entity\UserSemaineType patchEntity(\Cake\Datasource\EntityInterface $entity, array $data, array $options = [])
 * @method \App\Model\Entity\UserSemaineType[] patchEntities($entities, array $data, array $options = [])
 * @method \App\Model\Entity\UserSemaineType findOrCreate($search, callable $callback = null, $options = [])
 *
 * @mixin \Cake\ORM\Behavior\TimestampBehavior
 */
class UserSemaineTypesTable extends Table
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

        $this->setTable('user_semaine_types');
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
        $this->hasMany('UserCalendriers', [
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
            ->requirePresence('jour', 'create')
            ->notEmptyString('jour');

        $validator
            ->scalar('periode')
            ->requirePresence('periode', 'create')
            ->notEmptyString('periode');

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

        return $rules;
    }
}
