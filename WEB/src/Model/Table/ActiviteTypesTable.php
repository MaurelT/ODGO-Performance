<?php
namespace App\Model\Table;

use Cake\ORM\Query;
use Cake\ORM\RulesChecker;
use Cake\ORM\Table;
use Cake\Validation\Validator;

/**
 * ActiviteTypes Model
 *
 * @property \App\Model\Table\UserCalendriersTable&\Cake\ORM\Association\HasMany $UserCalendriers
 * @property \App\Model\Table\UserSemaineTypesTable&\Cake\ORM\Association\HasMany $UserSemaineTypes
 * @property \App\Model\Table\SportsTable&\Cake\ORM\Association\BelongsToMany $Sports
 *
 * @method \App\Model\Entity\ActiviteType get($primaryKey, $options = [])
 * @method \App\Model\Entity\ActiviteType newEntity($data = null, array $options = [])
 * @method \App\Model\Entity\ActiviteType[] newEntities(array $data, array $options = [])
 * @method \App\Model\Entity\ActiviteType|false save(\Cake\Datasource\EntityInterface $entity, $options = [])
 * @method \App\Model\Entity\ActiviteType saveOrFail(\Cake\Datasource\EntityInterface $entity, $options = [])
 * @method \App\Model\Entity\ActiviteType patchEntity(\Cake\Datasource\EntityInterface $entity, array $data, array $options = [])
 * @method \App\Model\Entity\ActiviteType[] patchEntities($entities, array $data, array $options = [])
 * @method \App\Model\Entity\ActiviteType findOrCreate($search, callable $callback = null, $options = [])
 *
 * @mixin \Cake\ORM\Behavior\TimestampBehavior
 */
class ActiviteTypesTable extends Table
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

        $this->setTable('activite_types');
        $this->setDisplayField('name');
        $this->setPrimaryKey('id');

        $this->addBehavior('Timestamp');

        $this->hasMany('UserCalendriers', [
            'foreignKey' => 'activite_type_id'
        ]);
        $this->hasMany('UserSemaineTypes', [
            'foreignKey' => 'activite_type_id'
        ]);
        $this->belongsToMany('Sports', [
            'foreignKey' => 'activite_type_id',
            'targetForeignKey' => 'sport_id',
            'joinTable' => 'sports_activite_types'
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
            ->scalar('color')
            ->maxLength('color', 255)
            ->requirePresence('color', 'create')
            ->notEmptyString('color');

        $validator
            ->boolean('is_active')
            ->allowEmptyString('is_active');

        return $validator;
    }
}
