<?php
namespace App\Model\Table;

use Cake\ORM\Query;
use Cake\ORM\RulesChecker;
use Cake\ORM\Table;
use Cake\Validation\Validator;

/**
 * ExigenceAlimentairesUsers Model
 *
 * @property \App\Model\Table\UsersTable&\Cake\ORM\Association\BelongsTo $Users
 * @property \App\Model\Table\ExigenceAlimentairesTable&\Cake\ORM\Association\BelongsTo $ExigenceAlimentaires
 *
 * @method \App\Model\Entity\ExigenceAlimentairesUser get($primaryKey, $options = [])
 * @method \App\Model\Entity\ExigenceAlimentairesUser newEntity($data = null, array $options = [])
 * @method \App\Model\Entity\ExigenceAlimentairesUser[] newEntities(array $data, array $options = [])
 * @method \App\Model\Entity\ExigenceAlimentairesUser|false save(\Cake\Datasource\EntityInterface $entity, $options = [])
 * @method \App\Model\Entity\ExigenceAlimentairesUser saveOrFail(\Cake\Datasource\EntityInterface $entity, $options = [])
 * @method \App\Model\Entity\ExigenceAlimentairesUser patchEntity(\Cake\Datasource\EntityInterface $entity, array $data, array $options = [])
 * @method \App\Model\Entity\ExigenceAlimentairesUser[] patchEntities($entities, array $data, array $options = [])
 * @method \App\Model\Entity\ExigenceAlimentairesUser findOrCreate($search, callable $callback = null, $options = [])
 */
class ExigenceAlimentairesUsersTable extends Table
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

        $this->setTable('exigence_alimentaires_users');
        $this->setDisplayField('id');
        $this->setPrimaryKey('id');

        $this->belongsTo('Users', [
            'foreignKey' => 'user_id',
            'joinType' => 'INNER'
        ]);
        $this->belongsTo('ExigenceAlimentaires', [
            'foreignKey' => 'exigence_alimentaire_id',
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
        $rules->add($rules->existsIn(['user_id'], 'Users'));
        $rules->add($rules->existsIn(['exigence_alimentaire_id'], 'ExigenceAlimentaires'));

        return $rules;
    }
}