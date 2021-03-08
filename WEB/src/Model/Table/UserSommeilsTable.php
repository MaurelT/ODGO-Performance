<?php
namespace App\Model\Table;

use Cake\ORM\Query;
use Cake\ORM\RulesChecker;
use Cake\ORM\Table;
use Cake\Validation\Validator;

/**
 * UserSommeils Model
 *
 * @property \App\Model\Table\UsersTable&\Cake\ORM\Association\BelongsTo $Users
 * @property \App\Model\Table\UserSommeilsSommeilFacteurNuisiblesTable&\Cake\ORM\Association\HasMany $UserSommeilsSommeilFacteurNuisibles
 *
 * @method \App\Model\Entity\UserSommeil get($primaryKey, $options = [])
 * @method \App\Model\Entity\UserSommeil newEntity($data = null, array $options = [])
 * @method \App\Model\Entity\UserSommeil[] newEntities(array $data, array $options = [])
 * @method \App\Model\Entity\UserSommeil|false save(\Cake\Datasource\EntityInterface $entity, $options = [])
 * @method \App\Model\Entity\UserSommeil saveOrFail(\Cake\Datasource\EntityInterface $entity, $options = [])
 * @method \App\Model\Entity\UserSommeil patchEntity(\Cake\Datasource\EntityInterface $entity, array $data, array $options = [])
 * @method \App\Model\Entity\UserSommeil[] patchEntities($entities, array $data, array $options = [])
 * @method \App\Model\Entity\UserSommeil findOrCreate($search, callable $callback = null, $options = [])
 */
class UserSommeilsTable extends Table
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

        $this->setTable('user_sommeils');
        $this->setDisplayField('id');
        $this->setPrimaryKey('id');

        $this->belongsTo('Users', [
            'foreignKey' => 'user_id',
            'joinType' => 'INNER'
        ]);
        $this->hasMany('UserSommeilsSommeilFacteurNuisibles', [
            'foreignKey' => 'user_sommeil_id'
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
            ->requirePresence('qualite_reveil', 'create')
            ->notEmptyString('qualite_reveil');

        $validator
            ->requirePresence('sensation_fatigue', 'create')
            ->notEmptyString('sensation_fatigue');

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

        return $rules;
    }
}
