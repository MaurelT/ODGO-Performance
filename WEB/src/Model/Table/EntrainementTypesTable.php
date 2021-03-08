<?php
namespace App\Model\Table;

use Cake\ORM\Query;
use Cake\ORM\RulesChecker;
use Cake\ORM\Table;
use Cake\Validation\Validator;

/**
 * EntrainementTypes Model
 *
 * @property \App\Model\Table\UserEntrainementsTable&\Cake\ORM\Association\HasMany $UserEntrainements
 *
 * @method \App\Model\Entity\EntrainementType get($primaryKey, $options = [])
 * @method \App\Model\Entity\EntrainementType newEntity($data = null, array $options = [])
 * @method \App\Model\Entity\EntrainementType[] newEntities(array $data, array $options = [])
 * @method \App\Model\Entity\EntrainementType|false save(\Cake\Datasource\EntityInterface $entity, $options = [])
 * @method \App\Model\Entity\EntrainementType saveOrFail(\Cake\Datasource\EntityInterface $entity, $options = [])
 * @method \App\Model\Entity\EntrainementType patchEntity(\Cake\Datasource\EntityInterface $entity, array $data, array $options = [])
 * @method \App\Model\Entity\EntrainementType[] patchEntities($entities, array $data, array $options = [])
 * @method \App\Model\Entity\EntrainementType findOrCreate($search, callable $callback = null, $options = [])
 */
class EntrainementTypesTable extends Table
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

        $this->setTable('entrainement_types');
        $this->setDisplayField('name');
        $this->setPrimaryKey('id');

        $this->hasMany('UserEntrainements', [
            'foreignKey' => 'entrainement_type_id'
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
