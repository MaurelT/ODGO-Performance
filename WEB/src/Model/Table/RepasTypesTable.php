<?php
namespace App\Model\Table;

use Cake\ORM\Query;
use Cake\ORM\RulesChecker;
use Cake\ORM\Table;
use Cake\Validation\Validator;

/**
 * RepasTypes Model
 *
 * @property \App\Model\Table\AlimentsTable&\Cake\ORM\Association\BelongsToMany $Aliments
 *
 * @method \App\Model\Entity\RepasType get($primaryKey, $options = [])
 * @method \App\Model\Entity\RepasType newEntity($data = null, array $options = [])
 * @method \App\Model\Entity\RepasType[] newEntities(array $data, array $options = [])
 * @method \App\Model\Entity\RepasType|false save(\Cake\Datasource\EntityInterface $entity, $options = [])
 * @method \App\Model\Entity\RepasType saveOrFail(\Cake\Datasource\EntityInterface $entity, $options = [])
 * @method \App\Model\Entity\RepasType patchEntity(\Cake\Datasource\EntityInterface $entity, array $data, array $options = [])
 * @method \App\Model\Entity\RepasType[] patchEntities($entities, array $data, array $options = [])
 * @method \App\Model\Entity\RepasType findOrCreate($search, callable $callback = null, $options = [])
 */
class RepasTypesTable extends Table
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

        $this->setTable('repas_types');
        $this->setDisplayField('name');
        $this->setPrimaryKey('id');

        $this->belongsToMany('Aliments', [
            'foreignKey' => 'repas_type_id',
            'targetForeignKey' => 'aliment_id',
            'joinTable' => 'aliments_repas_types'
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
