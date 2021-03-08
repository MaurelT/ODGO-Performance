<?php
namespace App\Model\Table;

use Cake\ORM\Query;
use Cake\ORM\RulesChecker;
use Cake\ORM\Table;
use Cake\Validation\Validator;

/**
 * Programmes Model
 *
 * @property \App\Model\Table\ProgrammeTypesTable&\Cake\ORM\Association\BelongsTo $ProgrammeTypes
 * @property \App\Model\Table\ZonesTable&\Cake\ORM\Association\BelongsTo $Zones
 * @property &\Cake\ORM\Association\BelongsToMany $Videos
 *
 * @method \App\Model\Entity\Programme get($primaryKey, $options = [])
 * @method \App\Model\Entity\Programme newEntity($data = null, array $options = [])
 * @method \App\Model\Entity\Programme[] newEntities(array $data, array $options = [])
 * @method \App\Model\Entity\Programme|false save(\Cake\Datasource\EntityInterface $entity, $options = [])
 * @method \App\Model\Entity\Programme saveOrFail(\Cake\Datasource\EntityInterface $entity, $options = [])
 * @method \App\Model\Entity\Programme patchEntity(\Cake\Datasource\EntityInterface $entity, array $data, array $options = [])
 * @method \App\Model\Entity\Programme[] patchEntities($entities, array $data, array $options = [])
 * @method \App\Model\Entity\Programme findOrCreate($search, callable $callback = null, $options = [])
 */
class ProgrammesTable extends Table
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

        $this->setTable('programmes');
        $this->setDisplayField('name');
        $this->setPrimaryKey('id');

        $this->belongsTo('ProgrammeTypes', [
            'foreignKey' => 'programme_type_id'
        ]);
        $this->belongsTo('Zones', [
            'foreignKey' => 'zone_id',
            'joinType' => 'INNER'
        ]);
        $this->belongsToMany('Videos', [
            'foreignKey' => 'programme_id',
            'targetForeignKey' => 'video_id',
            'joinTable' => 'programmes_videos'
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
            ->integer('intensite_min')
            ->requirePresence('intensite_min', 'create')
            ->notEmptyString('intensite_min');

        $validator
            ->integer('intensite_max')
            ->allowEmptyString('intensite_max');

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
        $rules->add($rules->existsIn(['programme_type_id'], 'ProgrammeTypes'));
        $rules->add($rules->existsIn(['zone_id'], 'Zones'));

        return $rules;
    }
}
