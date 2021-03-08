<?php
namespace App\Model\Table;

use Cake\ORM\Query;
use Cake\ORM\RulesChecker;
use Cake\ORM\Table;
use Cake\Validation\Validator;

/**
 * UserSommeilsSommeilFacteurNuisibles Model
 *
 * @property \App\Model\Table\UserSommeilsTable&\Cake\ORM\Association\BelongsTo $UserSommeils
 * @property &\Cake\ORM\Association\BelongsTo $SommeilFacteurNuisibles
 *
 * @method \App\Model\Entity\UserSommeilsSommeilFacteurNuisible get($primaryKey, $options = [])
 * @method \App\Model\Entity\UserSommeilsSommeilFacteurNuisible newEntity($data = null, array $options = [])
 * @method \App\Model\Entity\UserSommeilsSommeilFacteurNuisible[] newEntities(array $data, array $options = [])
 * @method \App\Model\Entity\UserSommeilsSommeilFacteurNuisible|false save(\Cake\Datasource\EntityInterface $entity, $options = [])
 * @method \App\Model\Entity\UserSommeilsSommeilFacteurNuisible saveOrFail(\Cake\Datasource\EntityInterface $entity, $options = [])
 * @method \App\Model\Entity\UserSommeilsSommeilFacteurNuisible patchEntity(\Cake\Datasource\EntityInterface $entity, array $data, array $options = [])
 * @method \App\Model\Entity\UserSommeilsSommeilFacteurNuisible[] patchEntities($entities, array $data, array $options = [])
 * @method \App\Model\Entity\UserSommeilsSommeilFacteurNuisible findOrCreate($search, callable $callback = null, $options = [])
 */
class UserSommeilsSommeilFacteurNuisiblesTable extends Table
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

        $this->setTable('user_sommeils_sommeil_facteur_nuisibles');
        $this->setDisplayField('id');
        $this->setPrimaryKey('id');

        $this->belongsTo('UserSommeils', [
            'foreignKey' => 'user_sommeil_id',
            'joinType' => 'INNER'
        ]);
        $this->belongsTo('SommeilFacteurNuisibles', [
            'foreignKey' => 'sommeil_facteur_nuisible_id',
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
        $rules->add($rules->existsIn(['user_sommeil_id'], 'UserSommeils'));
        $rules->add($rules->existsIn(['sommeil_facteur_nuisible_id'], 'SommeilFacteurNuisibles'));

        return $rules;
    }
}
