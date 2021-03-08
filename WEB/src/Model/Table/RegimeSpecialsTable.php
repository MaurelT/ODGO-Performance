<?php
namespace App\Model\Table;

use Cake\ORM\Query;
use Cake\ORM\RulesChecker;
use Cake\ORM\Table;
use Cake\Validation\Validator;

/**
 * RegimeSpecials Model
 *
 * @property \App\Model\Table\UsersTable&\Cake\ORM\Association\HasMany $Users
 * @property \App\Model\Table\AlimentsTable&\Cake\ORM\Association\BelongsToMany $Aliments
 *
 * @method \App\Model\Entity\RegimeSpecial get($primaryKey, $options = [])
 * @method \App\Model\Entity\RegimeSpecial newEntity($data = null, array $options = [])
 * @method \App\Model\Entity\RegimeSpecial[] newEntities(array $data, array $options = [])
 * @method \App\Model\Entity\RegimeSpecial|false save(\Cake\Datasource\EntityInterface $entity, $options = [])
 * @method \App\Model\Entity\RegimeSpecial saveOrFail(\Cake\Datasource\EntityInterface $entity, $options = [])
 * @method \App\Model\Entity\RegimeSpecial patchEntity(\Cake\Datasource\EntityInterface $entity, array $data, array $options = [])
 * @method \App\Model\Entity\RegimeSpecial[] patchEntities($entities, array $data, array $options = [])
 * @method \App\Model\Entity\RegimeSpecial findOrCreate($search, callable $callback = null, $options = [])
 *
 * @mixin \Cake\ORM\Behavior\TimestampBehavior
 */
class RegimeSpecialsTable extends Table
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

        $this->setTable('regime_specials');
        $this->setDisplayField('name');
        $this->setPrimaryKey('id');

        $this->addBehavior('Timestamp');

        $this->hasMany('Users', [
            'foreignKey' => 'regime_special_id'
        ]);
        $this->belongsToMany('Aliments', [
            'foreignKey' => 'regime_special_id',
            'targetForeignKey' => 'aliment_id',
            'joinTable' => 'aliments_regime_specials'
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
            ->boolean('is_active')
            ->allowEmptyString('is_active');

        return $validator;
    }
}
