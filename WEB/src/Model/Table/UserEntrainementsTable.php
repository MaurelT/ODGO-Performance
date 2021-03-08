<?php
namespace App\Model\Table;

use Cake\ORM\Query;
use Cake\ORM\RulesChecker;
use Cake\ORM\Table;
use Cake\Validation\Validator;

/**
 * UserEntrainements Model
 *
 * @property \App\Model\Table\UsersTable&\Cake\ORM\Association\BelongsTo $Users
 * @property \App\Model\Table\EntrainementTypesTable&\Cake\ORM\Association\BelongsTo $EntrainementTypes
 *
 * @method \App\Model\Entity\UserEntrainement get($primaryKey, $options = [])
 * @method \App\Model\Entity\UserEntrainement newEntity($data = null, array $options = [])
 * @method \App\Model\Entity\UserEntrainement[] newEntities(array $data, array $options = [])
 * @method \App\Model\Entity\UserEntrainement|false save(\Cake\Datasource\EntityInterface $entity, $options = [])
 * @method \App\Model\Entity\UserEntrainement saveOrFail(\Cake\Datasource\EntityInterface $entity, $options = [])
 * @method \App\Model\Entity\UserEntrainement patchEntity(\Cake\Datasource\EntityInterface $entity, array $data, array $options = [])
 * @method \App\Model\Entity\UserEntrainement[] patchEntities($entities, array $data, array $options = [])
 * @method \App\Model\Entity\UserEntrainement findOrCreate($search, callable $callback = null, $options = [])
 */
class UserEntrainementsTable extends Table
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

        $this->setTable('user_entrainements');
        $this->setDisplayField('id');
        $this->setPrimaryKey('id');

        $this->belongsTo('Users', [
            'foreignKey' => 'user_id',
            'joinType' => 'INNER'
        ]);
        $this->belongsTo('EntrainementTypes', [
            'foreignKey' => 'entrainement_type_id',
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
            ->requirePresence('duree_heure', 'create')
            ->notEmptyString('duree_heure');

        $validator
            ->requirePresence('duree_minute', 'create')
            ->notEmptyString('duree_minute');

        $validator
            ->requirePresence('intensite', 'create')
            ->notEmptyString('intensite');

        $validator
            ->requirePresence('difficulte', 'create')
            ->notEmptyString('difficulte');

        $validator
            ->requirePresence('qualite', 'create')
            ->notEmptyString('qualite');

        $validator
            ->requirePresence('implication', 'create')
            ->notEmptyString('implication');

        $validator
            ->scalar('commentaire')
            ->allowEmptyString('commentaire');

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
        $rules->add($rules->existsIn(['entrainement_type_id'], 'EntrainementTypes'));

        return $rules;
    }
}
