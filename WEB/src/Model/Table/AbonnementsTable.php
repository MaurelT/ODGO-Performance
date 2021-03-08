<?php

namespace App\Model\Table;

use Cake\ORM\Query;
use Cake\ORM\RulesChecker;
use Cake\ORM\Table;
use Cake\Validation\Validator;

/**
 * Abonnements Model
 *
 * @property \App\Model\Table\AbonnementEngagementTable&\Cake\ORM\Association\HasMany $AbonnementEngagement
 *
 * @method \App\Model\Entity\Abonnement get($primaryKey, $options = [])
 * @method \App\Model\Entity\Abonnement newEntity($data = null, array $options = [])
 * @method \App\Model\Entity\Abonnement[] newEntities(array $data, array $options = [])
 * @method \App\Model\Entity\Abonnement|false save(\Cake\Datasource\EntityInterface $entity, $options = [])
 * @method \App\Model\Entity\Abonnement saveOrFail(\Cake\Datasource\EntityInterface $entity, $options = [])
 * @method \App\Model\Entity\Abonnement patchEntity(\Cake\Datasource\EntityInterface $entity, array $data, array $options = [])
 * @method \App\Model\Entity\Abonnement[] patchEntities($entities, array $data, array $options = [])
 * @method \App\Model\Entity\Abonnement findOrCreate($search, callable $callback = null, $options = [])
 */
class AbonnementsTable extends Table
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

        $this->setTable('abonnements');
        $this->setDisplayField('name');
        $this->setPrimaryKey('id');

        $this->hasMany('AbonnementEngagement', [
            'foreignKey' => 'abonnement_id'
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
                ->scalar('name')
                ->maxLength('name', 255)
                ->notEmptyString('name');

        $validator
                ->scalar('description')
                ->requirePresence('description', 'create')
                ->notEmptyString('description');

        $validator
                ->scalar('plan_id_stripe')
                ->maxLength('plan_id_stripe', 255)
                ->notEmptyString('plan_id_stripe');

        return $validator;
    }

}
