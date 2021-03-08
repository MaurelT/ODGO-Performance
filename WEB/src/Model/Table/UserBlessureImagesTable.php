<?php
namespace App\Model\Table;

use Cake\ORM\Query;
use Cake\ORM\RulesChecker;
use Cake\ORM\Table;
use Cake\Validation\Validator;

/**
 * UserBlessureImages Model
 *
 * @property \App\Model\Table\UserBlessuresTable&\Cake\ORM\Association\BelongsTo $UserBlessures
 *
 * @method \App\Model\Entity\UserBlessureImage get($primaryKey, $options = [])
 * @method \App\Model\Entity\UserBlessureImage newEntity($data = null, array $options = [])
 * @method \App\Model\Entity\UserBlessureImage[] newEntities(array $data, array $options = [])
 * @method \App\Model\Entity\UserBlessureImage|false save(\Cake\Datasource\EntityInterface $entity, $options = [])
 * @method \App\Model\Entity\UserBlessureImage saveOrFail(\Cake\Datasource\EntityInterface $entity, $options = [])
 * @method \App\Model\Entity\UserBlessureImage patchEntity(\Cake\Datasource\EntityInterface $entity, array $data, array $options = [])
 * @method \App\Model\Entity\UserBlessureImage[] patchEntities($entities, array $data, array $options = [])
 * @method \App\Model\Entity\UserBlessureImage findOrCreate($search, callable $callback = null, $options = [])
 */
class UserBlessureImagesTable extends Table
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

        $this->setTable('user_blessure_images');
        $this->setDisplayField('id');
        $this->setPrimaryKey('id');

        $this->belongsTo('UserBlessures', [
            'foreignKey' => 'user_blessure_id',
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
            ->scalar('filename')
            ->maxLength('filename', 255)
            ->requirePresence('filename', 'create')
            ->notEmptyFile('filename');

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
        $rules->add($rules->existsIn(['user_blessure_id'], 'UserBlessures'));

        return $rules;
    }
}
