<?php
namespace App\Model\Table;

use Cake\ORM\Query;
use Cake\ORM\RulesChecker;
use Cake\ORM\Table;
use Cake\Validation\Validator;

/**
 * Sports Model
 *
 * @property &\Cake\ORM\Association\HasMany $Competitions
 * @property \App\Model\Table\SportNiveauxTable&\Cake\ORM\Association\HasMany $SportNiveaux
 * @property &\Cake\ORM\Association\HasMany $SportParams
 * @property \App\Model\Table\ActiviteTypesTable&\Cake\ORM\Association\BelongsToMany $ActiviteTypes
 *
 * @method \App\Model\Entity\Sport get($primaryKey, $options = [])
 * @method \App\Model\Entity\Sport newEntity($data = null, array $options = [])
 * @method \App\Model\Entity\Sport[] newEntities(array $data, array $options = [])
 * @method \App\Model\Entity\Sport|false save(\Cake\Datasource\EntityInterface $entity, $options = [])
 * @method \App\Model\Entity\Sport saveOrFail(\Cake\Datasource\EntityInterface $entity, $options = [])
 * @method \App\Model\Entity\Sport patchEntity(\Cake\Datasource\EntityInterface $entity, array $data, array $options = [])
 * @method \App\Model\Entity\Sport[] patchEntities($entities, array $data, array $options = [])
 * @method \App\Model\Entity\Sport findOrCreate($search, callable $callback = null, $options = [])
 *
 * @mixin \Cake\ORM\Behavior\TimestampBehavior
 */
class SportsTable extends Table
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

        $this->setTable('sports');
        $this->setDisplayField('name');
        $this->setPrimaryKey('id');

        $this->addBehavior('Timestamp');

        $this->hasMany('Competitions', [
            'foreignKey' => 'sport_id'
        ]);
        $this->hasMany('SportNiveaux', [
            'foreignKey' => 'sport_id'
        ]);
        $this->hasMany('SportParams', [
            'foreignKey' => 'sport_id'
        ]);
        $this->belongsToMany('ActiviteTypes', [
            'foreignKey' => 'sport_id',
            'targetForeignKey' => 'activite_type_id',
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
            ->boolean('is_individual')
            ->allowEmptyString('is_individual');

        $validator
            ->boolean('is_active')
            ->allowEmptyString('is_active');

        return $validator;
    }
}
