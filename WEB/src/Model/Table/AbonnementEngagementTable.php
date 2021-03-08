<?php
namespace App\Model\Table;

use Cake\ORM\Query;
use Cake\ORM\RulesChecker;
use Cake\ORM\Table;
use Cake\Validation\Validator;

/**
 * AbonnementEngagement Model
 *
 * @property \App\Model\Table\AbonnementsTable&\Cake\ORM\Association\BelongsTo $Abonnements
 * @property \App\Model\Table\EngagementsTable&\Cake\ORM\Association\BelongsTo $Engagements
 *
 * @method \App\Model\Entity\AbonnementEngagement get($primaryKey, $options = [])
 * @method \App\Model\Entity\AbonnementEngagement newEntity($data = null, array $options = [])
 * @method \App\Model\Entity\AbonnementEngagement[] newEntities(array $data, array $options = [])
 * @method \App\Model\Entity\AbonnementEngagement|false save(\Cake\Datasource\EntityInterface $entity, $options = [])
 * @method \App\Model\Entity\AbonnementEngagement saveOrFail(\Cake\Datasource\EntityInterface $entity, $options = [])
 * @method \App\Model\Entity\AbonnementEngagement patchEntity(\Cake\Datasource\EntityInterface $entity, array $data, array $options = [])
 * @method \App\Model\Entity\AbonnementEngagement[] patchEntities($entities, array $data, array $options = [])
 * @method \App\Model\Entity\AbonnementEngagement findOrCreate($search, callable $callback = null, $options = [])
 */
class AbonnementEngagementTable extends Table
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

        $this->setTable('abonnement_engagement');
        $this->setDisplayField('id');
        $this->setPrimaryKey('id');

        $this->belongsTo('Abonnements', [
            'foreignKey' => 'abonnement_id',
            'joinType' => 'INNER'
        ]);
        $this->belongsTo('Engagements', [
            'foreignKey' => 'engagement_id',
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
            ->numeric('prix')
            ->notEmptyString('prix');

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
        $rules->add($rules->existsIn(['abonnement_id'], 'Abonnements'));
        $rules->add($rules->existsIn(['engagement_id'], 'Engagements'));

        return $rules;
    }
}
