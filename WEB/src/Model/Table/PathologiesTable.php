<?php
namespace App\Model\Table;

use Cake\ORM\Query;
use Cake\ORM\RulesChecker;
use Cake\ORM\Table;
use Cake\Validation\Validator;

/**
 * Pathologies Model
 *
 * @property &\Cake\ORM\Association\BelongsTo $Zones
 * @property &\Cake\ORM\Association\BelongsTo $PathologieTypes
 *
 * @method \App\Model\Entity\Pathology get($primaryKey, $options = [])
 * @method \App\Model\Entity\Pathology newEntity($data = null, array $options = [])
 * @method \App\Model\Entity\Pathology[] newEntities(array $data, array $options = [])
 * @method \App\Model\Entity\Pathology|false save(\Cake\Datasource\EntityInterface $entity, $options = [])
 * @method \App\Model\Entity\Pathology saveOrFail(\Cake\Datasource\EntityInterface $entity, $options = [])
 * @method \App\Model\Entity\Pathology patchEntity(\Cake\Datasource\EntityInterface $entity, array $data, array $options = [])
 * @method \App\Model\Entity\Pathology[] patchEntities($entities, array $data, array $options = [])
 * @method \App\Model\Entity\Pathology findOrCreate($search, callable $callback = null, $options = [])
 */
class PathologiesTable extends Table
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

        $this->setTable('pathologies');
        $this->setDisplayField('name');
        $this->setPrimaryKey('id');

        $this->belongsTo('Zones', [
            'foreignKey' => 'zone_id',
            'joinType' => 'INNER'
        ]);
        $this->belongsTo('PathologieTypes', [
            'foreignKey' => 'pathologie_type_id',
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
            ->scalar('name')
            ->maxLength('name', 255)
            ->requirePresence('name', 'create')
            ->notEmptyString('name');

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
        $rules->add($rules->existsIn(['zone_id'], 'Zones'));
        $rules->add($rules->existsIn(['pathologie_type_id'], 'PathologieTypes'));

        return $rules;
    }
}
