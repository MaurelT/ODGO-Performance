<?php
namespace App\Model\Table;

use Cake\ORM\Query;
use Cake\ORM\RulesChecker;
use Cake\ORM\Table;
use Cake\Validation\Validator;

/**
 * UserAbonnementEngagement Model
 *
 * @property &\Cake\ORM\Association\BelongsTo $Stripes
 * @property \App\Model\Table\UsersTable&\Cake\ORM\Association\BelongsTo $Users
 * @property \App\Model\Table\AbonnementEngagementTable&\Cake\ORM\Association\BelongsTo $AbonnementEngagement
 *
 * @method \App\Model\Entity\UserAbonnementEngagement get($primaryKey, $options = [])
 * @method \App\Model\Entity\UserAbonnementEngagement newEntity($data = null, array $options = [])
 * @method \App\Model\Entity\UserAbonnementEngagement[] newEntities(array $data, array $options = [])
 * @method \App\Model\Entity\UserAbonnementEngagement|false save(\Cake\Datasource\EntityInterface $entity, $options = [])
 * @method \App\Model\Entity\UserAbonnementEngagement saveOrFail(\Cake\Datasource\EntityInterface $entity, $options = [])
 * @method \App\Model\Entity\UserAbonnementEngagement patchEntity(\Cake\Datasource\EntityInterface $entity, array $data, array $options = [])
 * @method \App\Model\Entity\UserAbonnementEngagement[] patchEntities($entities, array $data, array $options = [])
 * @method \App\Model\Entity\UserAbonnementEngagement findOrCreate($search, callable $callback = null, $options = [])
 */
class UserAbonnementEngagementTable extends Table
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

        $this->setTable('user_abonnement_engagement');
        $this->setDisplayField('id');
        $this->setPrimaryKey('id');

        $this->belongsTo('Users', [
            'foreignKey' => 'user_id',
            'joinType' => 'INNER'
        ]);
        $this->belongsTo('AbonnementEngagement', [
            'foreignKey' => 'user_abonnement_id',
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

        $validator
            ->dateTime('date_debut')
            ->requirePresence('date_debut', 'create')
            ->notEmptyDateTime('date_debut');

        $validator
            ->dateTime('date_fin')
            ->requirePresence('date_fin', 'create')
            ->notEmptyDateTime('date_fin');

        $validator
            ->boolean('is_active')
            ->notEmptyString('is_active');

        $validator
            ->boolean('gift_have_been_given')
            ->notEmptyString('gift_have_been_given');

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
        $rules->add($rules->existsIn(['user_abonnement_id'], 'AbonnementEngagement'));

        return $rules;
    }
}
