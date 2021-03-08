<?php
namespace App\Model\Table;

use Cake\ORM\Query;
use Cake\ORM\RulesChecker;
use Cake\ORM\Table;
use Cake\Validation\Validator;

/**
 * TempsIndisponibilites Model
 *
 * @property \App\Model\Table\UserBlessuresTable&\Cake\ORM\Association\HasMany $UserBlessures
 *
 * @method \App\Model\Entity\TempsIndisponibilite get($primaryKey, $options = [])
 * @method \App\Model\Entity\TempsIndisponibilite newEntity($data = null, array $options = [])
 * @method \App\Model\Entity\TempsIndisponibilite[] newEntities(array $data, array $options = [])
 * @method \App\Model\Entity\TempsIndisponibilite|false save(\Cake\Datasource\EntityInterface $entity, $options = [])
 * @method \App\Model\Entity\TempsIndisponibilite saveOrFail(\Cake\Datasource\EntityInterface $entity, $options = [])
 * @method \App\Model\Entity\TempsIndisponibilite patchEntity(\Cake\Datasource\EntityInterface $entity, array $data, array $options = [])
 * @method \App\Model\Entity\TempsIndisponibilite[] patchEntities($entities, array $data, array $options = [])
 * @method \App\Model\Entity\TempsIndisponibilite findOrCreate($search, callable $callback = null, $options = [])
 */
class TempsIndisponibilitesTable extends Table
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

        $this->setTable('temps_indisponibilites');
        $this->setDisplayField('name');
        $this->setPrimaryKey('id');

        $this->hasMany('UserBlessures', [
            'foreignKey' => 'temps_indisponibilite_id'
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

        $validator
            ->integer('ordre')
            ->notEmptyString('ordre');

        return $validator;
    }
}
