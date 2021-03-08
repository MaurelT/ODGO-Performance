<?php
namespace App\Model\Table;

use Cake\ORM\Query;
use Cake\ORM\RulesChecker;
use Cake\ORM\Table;
use Cake\Validation\Validator;

/**
 * UsersAliments Model
 *
 * @property \App\Model\Table\UsersTable&\Cake\ORM\Association\BelongsTo $Users
 * @property \App\Model\Table\AlimentsTable&\Cake\ORM\Association\BelongsTo $Aliments
 * @property \App\Model\Table\RepasTypesTable&\Cake\ORM\Association\BelongsTo $RepasTypes
 *
 * @method \App\Model\Entity\UsersAliment get($primaryKey, $options = [])
 * @method \App\Model\Entity\UsersAliment newEntity($data = null, array $options = [])
 * @method \App\Model\Entity\UsersAliment[] newEntities(array $data, array $options = [])
 * @method \App\Model\Entity\UsersAliment|false save(\Cake\Datasource\EntityInterface $entity, $options = [])
 * @method \App\Model\Entity\UsersAliment saveOrFail(\Cake\Datasource\EntityInterface $entity, $options = [])
 * @method \App\Model\Entity\UsersAliment patchEntity(\Cake\Datasource\EntityInterface $entity, array $data, array $options = [])
 * @method \App\Model\Entity\UsersAliment[] patchEntities($entities, array $data, array $options = [])
 * @method \App\Model\Entity\UsersAliment findOrCreate($search, callable $callback = null, $options = [])
 *
 * @mixin \Cake\ORM\Behavior\TimestampBehavior
 */
class UsersAlimentsTable extends Table
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

        $this->setTable('users_aliments');
        $this->setDisplayField('id');
        $this->setPrimaryKey('id');

        $this->addBehavior('Timestamp');

        $this->belongsTo('Users', [
            'foreignKey' => 'user_id',
            'joinType' => 'INNER'
        ]);
        $this->belongsTo('Aliments', [
            'foreignKey' => 'aliment_id',
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

        $validator
            ->date('date')
            ->requirePresence('date', 'create')
            ->notEmptyDate('date');

        $validator
            ->numeric('quantite')
            ->requirePresence('quantite', 'create')
            ->notEmptyString('quantite');

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
        $rules->add($rules->existsIn(['aliment_id'], 'Aliments'));
        $rules->add($rules->existsIn(['repas_type_id'], 'RepasTypes'));

        return $rules;
    }
}
