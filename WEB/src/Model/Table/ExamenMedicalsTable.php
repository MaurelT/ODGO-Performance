<?php
namespace App\Model\Table;

use Cake\ORM\Query;
use Cake\ORM\RulesChecker;
use Cake\ORM\Table;
use Cake\Validation\Validator;

/**
 * ExamenMedicals Model
 *
 * @property \App\Model\Table\UserBlessuresTable&\Cake\ORM\Association\HasMany $UserBlessures
 *
 * @method \App\Model\Entity\ExamenMedical get($primaryKey, $options = [])
 * @method \App\Model\Entity\ExamenMedical newEntity($data = null, array $options = [])
 * @method \App\Model\Entity\ExamenMedical[] newEntities(array $data, array $options = [])
 * @method \App\Model\Entity\ExamenMedical|false save(\Cake\Datasource\EntityInterface $entity, $options = [])
 * @method \App\Model\Entity\ExamenMedical saveOrFail(\Cake\Datasource\EntityInterface $entity, $options = [])
 * @method \App\Model\Entity\ExamenMedical patchEntity(\Cake\Datasource\EntityInterface $entity, array $data, array $options = [])
 * @method \App\Model\Entity\ExamenMedical[] patchEntities($entities, array $data, array $options = [])
 * @method \App\Model\Entity\ExamenMedical findOrCreate($search, callable $callback = null, $options = [])
 */
class ExamenMedicalsTable extends Table
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

        $this->setTable('examen_medicals');
        $this->setDisplayField('name');
        $this->setPrimaryKey('id');

        $this->hasMany('UserBlessures', [
            'foreignKey' => 'examen_medical_id'
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
