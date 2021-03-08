<?php
namespace App\Model\Table;

use Cake\ORM\Query;
use Cake\ORM\RulesChecker;
use Cake\ORM\Table;
use Cake\Validation\Validator;

/**
 * SommeilFactureNuisibles Model
 *
 * @property \App\Model\Table\UserSommeilsSommeilFacteurNuisiblesTable&\Cake\ORM\Association\HasMany $UserSommeilsSommeilFacteurNuisibles
 *
 * @method \App\Model\Entity\SommeilFactureNuisible get($primaryKey, $options = [])
 * @method \App\Model\Entity\SommeilFactureNuisible newEntity($data = null, array $options = [])
 * @method \App\Model\Entity\SommeilFactureNuisible[] newEntities(array $data, array $options = [])
 * @method \App\Model\Entity\SommeilFactureNuisible|false save(\Cake\Datasource\EntityInterface $entity, $options = [])
 * @method \App\Model\Entity\SommeilFactureNuisible saveOrFail(\Cake\Datasource\EntityInterface $entity, $options = [])
 * @method \App\Model\Entity\SommeilFactureNuisible patchEntity(\Cake\Datasource\EntityInterface $entity, array $data, array $options = [])
 * @method \App\Model\Entity\SommeilFactureNuisible[] patchEntities($entities, array $data, array $options = [])
 * @method \App\Model\Entity\SommeilFactureNuisible findOrCreate($search, callable $callback = null, $options = [])
 */
class SommeilFactureNuisiblesTable extends Table
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

        $this->setTable('sommeil_facture_nuisibles');
        $this->setDisplayField('name');
        $this->setPrimaryKey('id');

        $this->hasMany('UserSommeilsSommeilFacteurNuisibles', [
            'foreignKey' => 'sommeil_facture_nuisible_id'
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
            ->requirePresence('name', 'create')
            ->notEmptyString('name');

        return $validator;
    }
}
