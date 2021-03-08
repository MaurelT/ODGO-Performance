<?php
namespace App\Model\Table;

use Cake\ORM\Query;
use Cake\ORM\RulesChecker;
use Cake\ORM\Table;
use Cake\Validation\Validator;

/**
 * UserBlessures Model
 *
 * @property \App\Model\Table\UsersTable&\Cake\ORM\Association\BelongsTo $Users
 * @property \App\Model\Table\ZonesTable&\Cake\ORM\Association\BelongsTo $Zones
 * @property \App\Model\Table\PathologiesTable&\Cake\ORM\Association\BelongsTo $Pathologies
 * @property \App\Model\Table\TempsIndisponibilitesTable&\Cake\ORM\Association\BelongsTo $TempsIndisponibilites
 * @property \App\Model\Table\ExamenMedicalsTable&\Cake\ORM\Association\BelongsTo $ExamenMedicals
 * @property \App\Model\Table\UserBlessureImagesTable&\Cake\ORM\Association\HasMany $UserBlessureImages
 *
 * @method \App\Model\Entity\UserBlessure get($primaryKey, $options = [])
 * @method \App\Model\Entity\UserBlessure newEntity($data = null, array $options = [])
 * @method \App\Model\Entity\UserBlessure[] newEntities(array $data, array $options = [])
 * @method \App\Model\Entity\UserBlessure|false save(\Cake\Datasource\EntityInterface $entity, $options = [])
 * @method \App\Model\Entity\UserBlessure saveOrFail(\Cake\Datasource\EntityInterface $entity, $options = [])
 * @method \App\Model\Entity\UserBlessure patchEntity(\Cake\Datasource\EntityInterface $entity, array $data, array $options = [])
 * @method \App\Model\Entity\UserBlessure[] patchEntities($entities, array $data, array $options = [])
 * @method \App\Model\Entity\UserBlessure findOrCreate($search, callable $callback = null, $options = [])
 */
class UserBlessuresTable extends Table
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

        $this->setTable('user_blessures');
        $this->setDisplayField('id');
        $this->setPrimaryKey('id');

        $this->belongsTo('Users', [
            'foreignKey' => 'user_id',
            'joinType' => 'INNER'
        ]);
        $this->belongsTo('Zones', [
            'foreignKey' => 'zone_id',
            'joinType' => 'INNER'
        ]);
        $this->belongsTo('Pathologies', [
            'foreignKey' => 'pathologie_id',
            'joinType' => 'INNER'
        ]);
        $this->belongsTo('TempsIndisponibilites', [
            'foreignKey' => 'temps_indisponibilite_id',
            'joinType' => 'INNER'
        ]);
        $this->belongsTo('ExamenMedicals', [
            'foreignKey' => 'examen_medical_id',
            'joinType' => 'INNER'
        ]);
        $this->hasMany('UserBlessureImages', [
            'foreignKey' => 'user_blessure_id'
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
            ->date('date')
            ->requirePresence('date', 'create')
            ->notEmptyDate('date');

        $validator
            ->requirePresence('operation', 'create')
            ->notEmptyString('operation');

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
        $rules->add($rules->existsIn(['user_id'], 'Users'));
        $rules->add($rules->existsIn(['zone_id'], 'Zones'));
        $rules->add($rules->existsIn(['pathologie_id'], 'Pathologies'));
        $rules->add($rules->existsIn(['temps_indisponibilite_id'], 'TempsIndisponibilites'));
        $rules->add($rules->existsIn(['examen_medical_id'], 'ExamenMedicals'));

        return $rules;
    }
}
