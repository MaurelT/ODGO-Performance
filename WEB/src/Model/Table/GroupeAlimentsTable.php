<?php
namespace App\Model\Table;

use Cake\ORM\Query;
use Cake\ORM\RulesChecker;
use Cake\ORM\Table;
use Cake\Validation\Validator;

/**
 * GroupeAliments Model
 *
 * @property \App\Model\Table\SuggestionsTable&\Cake\ORM\Association\HasMany $Suggestions
 *
 * @method \App\Model\Entity\GroupeAliment get($primaryKey, $options = [])
 * @method \App\Model\Entity\GroupeAliment newEntity($data = null, array $options = [])
 * @method \App\Model\Entity\GroupeAliment[] newEntities(array $data, array $options = [])
 * @method \App\Model\Entity\GroupeAliment|false save(\Cake\Datasource\EntityInterface $entity, $options = [])
 * @method \App\Model\Entity\GroupeAliment saveOrFail(\Cake\Datasource\EntityInterface $entity, $options = [])
 * @method \App\Model\Entity\GroupeAliment patchEntity(\Cake\Datasource\EntityInterface $entity, array $data, array $options = [])
 * @method \App\Model\Entity\GroupeAliment[] patchEntities($entities, array $data, array $options = [])
 * @method \App\Model\Entity\GroupeAliment findOrCreate($search, callable $callback = null, $options = [])
 */
class GroupeAlimentsTable extends Table
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

        $this->setTable('groupe_aliments');
        $this->setDisplayField('name');
        $this->setPrimaryKey('id');

        $this->hasMany('Suggestions', [
            'foreignKey' => 'groupe_aliment_id'
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
