<?php
namespace App\Model\Table;

use Cake\ORM\Query;
use Cake\ORM\RulesChecker;
use Cake\ORM\Table;
use Cake\Validation\Validator;

/**
 * AlimentsRepas Model
 *
 * @property \App\Model\Table\AlimentsTable&\Cake\ORM\Association\BelongsTo $Aliments
 * @property \App\Model\Table\RepasTable&\Cake\ORM\Association\BelongsTo $Repas
 *
 * @method \App\Model\Entity\AlimentsRepa get($primaryKey, $options = [])
 * @method \App\Model\Entity\AlimentsRepa newEntity($data = null, array $options = [])
 * @method \App\Model\Entity\AlimentsRepa[] newEntities(array $data, array $options = [])
 * @method \App\Model\Entity\AlimentsRepa|false save(\Cake\Datasource\EntityInterface $entity, $options = [])
 * @method \App\Model\Entity\AlimentsRepa saveOrFail(\Cake\Datasource\EntityInterface $entity, $options = [])
 * @method \App\Model\Entity\AlimentsRepa patchEntity(\Cake\Datasource\EntityInterface $entity, array $data, array $options = [])
 * @method \App\Model\Entity\AlimentsRepa[] patchEntities($entities, array $data, array $options = [])
 * @method \App\Model\Entity\AlimentsRepa findOrCreate($search, callable $callback = null, $options = [])
 */
class AlimentsRepasTable extends Table
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

        $this->setTable('aliments_repas');
        $this->setDisplayField('id');
        $this->setPrimaryKey('id');

        $this->belongsTo('Aliments', [
            'foreignKey' => 'aliment_id',
            'joinType' => 'INNER'
        ]);
        $this->belongsTo('Repas', [
            'foreignKey' => 'repa_id',
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
            ->integer('quantite')
            ->notEmptyString('quantite');

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
        $rules->add($rules->existsIn(['aliment_id'], 'Aliments'));
        $rules->add($rules->existsIn(['repa_id'], 'Repas'));

        return $rules;
    }
}
