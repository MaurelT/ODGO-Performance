<?php
namespace App\Model\Table;

use Cake\ORM\Query;
use Cake\ORM\RulesChecker;
use Cake\ORM\Table;
use Cake\Validation\Validator;

/**
 * FamilleAliments Model
 *
 * @property \App\Model\Table\AlimentsTable&\Cake\ORM\Association\BelongsToMany $Aliments
 *
 * @method \App\Model\Entity\FamilleAliment get($primaryKey, $options = [])
 * @method \App\Model\Entity\FamilleAliment newEntity($data = null, array $options = [])
 * @method \App\Model\Entity\FamilleAliment[] newEntities(array $data, array $options = [])
 * @method \App\Model\Entity\FamilleAliment|false save(\Cake\Datasource\EntityInterface $entity, $options = [])
 * @method \App\Model\Entity\FamilleAliment saveOrFail(\Cake\Datasource\EntityInterface $entity, $options = [])
 * @method \App\Model\Entity\FamilleAliment patchEntity(\Cake\Datasource\EntityInterface $entity, array $data, array $options = [])
 * @method \App\Model\Entity\FamilleAliment[] patchEntities($entities, array $data, array $options = [])
 * @method \App\Model\Entity\FamilleAliment findOrCreate($search, callable $callback = null, $options = [])
 *
 * @mixin \Cake\ORM\Behavior\TimestampBehavior
 */
class FamilleAlimentsTable extends Table
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

        $this->setTable('famille_aliments');
        $this->setDisplayField('name');
        $this->setPrimaryKey('id');

        $this->addBehavior('Timestamp');

        $this->belongsToMany('Aliments', [
            'foreignKey' => 'famille_aliment_id',
            'targetForeignKey' => 'aliment_id',
            'joinTable' => 'aliments_famille_aliments'
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
