<?php
namespace App\Model\Table;

use Cake\ORM\Query;
use Cake\ORM\RulesChecker;
use Cake\ORM\Table;
use Cake\Validation\Validator;

/**
 * Aliments Model
 *
 * @property \App\Model\Table\AlimentTypesTable&\Cake\ORM\Association\BelongsTo $AlimentTypes
 * @property \App\Model\Table\FamilleAlimentsTable&\Cake\ORM\Association\BelongsTo $FamilleAliments
 * @property &\Cake\ORM\Association\HasMany $AlimentsFamilleAliments
 * @property \App\Model\Table\FamilleAlimentsTable&\Cake\ORM\Association\BelongsToMany $FamilleAliments
 * @property \App\Model\Table\RegimeSpecialsTable&\Cake\ORM\Association\BelongsToMany $RegimeSpecials
 * @property &\Cake\ORM\Association\BelongsToMany $Repas
 * @property \App\Model\Table\RepasTypesTable&\Cake\ORM\Association\BelongsToMany $RepasTypes
 * @property \App\Model\Table\UsersTable&\Cake\ORM\Association\BelongsToMany $Users
 *
 * @method \App\Model\Entity\Aliment get($primaryKey, $options = [])
 * @method \App\Model\Entity\Aliment newEntity($data = null, array $options = [])
 * @method \App\Model\Entity\Aliment[] newEntities(array $data, array $options = [])
 * @method \App\Model\Entity\Aliment|false save(\Cake\Datasource\EntityInterface $entity, $options = [])
 * @method \App\Model\Entity\Aliment saveOrFail(\Cake\Datasource\EntityInterface $entity, $options = [])
 * @method \App\Model\Entity\Aliment patchEntity(\Cake\Datasource\EntityInterface $entity, array $data, array $options = [])
 * @method \App\Model\Entity\Aliment[] patchEntities($entities, array $data, array $options = [])
 * @method \App\Model\Entity\Aliment findOrCreate($search, callable $callback = null, $options = [])
 *
 * @mixin \Cake\ORM\Behavior\TimestampBehavior
 */
class AlimentsTable extends Table
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

        $this->setTable('aliments');
        $this->setDisplayField('name');
        $this->setPrimaryKey('id');

        $this->addBehavior('Timestamp');

        $this->belongsTo('AlimentTypes', [
            'foreignKey' => 'aliment_type_id',
            'joinType' => 'INNER'
        ]);
        $this->belongsTo('FamilleAliments', [
            'foreignKey' => 'famille_aliment_id'
        ]);
        $this->hasMany('AlimentsFamilleAliments', [
            'foreignKey' => 'aliment_id'
        ]);
//        $this->belongsToMany('FamilleAliments', [
//            'foreignKey' => 'aliment_id',
//            'targetForeignKey' => 'famille_aliment_id',
//            'joinTable' => 'aliments_famille_aliments'
//        ]);
        $this->belongsToMany('RegimeSpecials', [
            'foreignKey' => 'aliment_id',
            'targetForeignKey' => 'regime_special_id',
            'joinTable' => 'aliments_regime_specials'
        ]);
        $this->belongsToMany('Repas', [
            'foreignKey' => 'aliment_id',
            'targetForeignKey' => 'repa_id',
            'joinTable' => 'aliments_repas'
        ]);
        $this->belongsToMany('RepasTypes', [
            'foreignKey' => 'aliment_id',
            'targetForeignKey' => 'repas_type_id',
            'joinTable' => 'aliments_repas_types'
        ]);

        $this->hasMany('UsersAliments', [
            'foreignKey' => 'aliment_id'
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
            ->integer('quantity_recommanded')
            ->notEmptyString('quantity_recommanded');

        $validator
            ->numeric('kcalorie_pour_100g')
            ->notEmptyString('kcalorie_pour_100g');

        $validator
            ->numeric('glucide_pour_100g')
            ->notEmptyString('glucide_pour_100g');

        $validator
            ->numeric('proteine_pour_100g')
            ->notEmptyString('proteine_pour_100g');

        $validator
            ->numeric('lipide_pour_100g')
            ->notEmptyString('lipide_pour_100g');

        $validator
            ->numeric('portion_en_g')
            ->notEmptyString('portion_en_g');

        $validator
            ->numeric('portion_en_ml')
            ->notEmptyString('portion_en_ml');

        $validator
            ->boolean('is_active')
            ->allowEmptyString('is_active');

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
        $rules->add($rules->existsIn(['aliment_type_id'], 'AlimentTypes'));
        $rules->add($rules->existsIn(['famille_aliment_id'], 'FamilleAliments'));

        return $rules;
    }
}
