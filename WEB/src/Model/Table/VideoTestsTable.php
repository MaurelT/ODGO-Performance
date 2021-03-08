<?php
namespace App\Model\Table;

use Cake\ORM\Query;
use Cake\ORM\RulesChecker;
use Cake\ORM\Table;
use Cake\Validation\Validator;

/**
 * VideoTests Model
 *
 * @property \App\Model\Table\ZoneTestsTable&\Cake\ORM\Association\BelongsTo $ZoneTests
 * @property \App\Model\Table\VideoTestReponsesTable&\Cake\ORM\Association\HasMany $VideoTestReponses
 *
 * @method \App\Model\Entity\VideoTest get($primaryKey, $options = [])
 * @method \App\Model\Entity\VideoTest newEntity($data = null, array $options = [])
 * @method \App\Model\Entity\VideoTest[] newEntities(array $data, array $options = [])
 * @method \App\Model\Entity\VideoTest|false save(\Cake\Datasource\EntityInterface $entity, $options = [])
 * @method \App\Model\Entity\VideoTest saveOrFail(\Cake\Datasource\EntityInterface $entity, $options = [])
 * @method \App\Model\Entity\VideoTest patchEntity(\Cake\Datasource\EntityInterface $entity, array $data, array $options = [])
 * @method \App\Model\Entity\VideoTest[] patchEntities($entities, array $data, array $options = [])
 * @method \App\Model\Entity\VideoTest findOrCreate($search, callable $callback = null, $options = [])
 */
class VideoTestsTable extends Table
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

        $this->setTable('video_tests');
        $this->setDisplayField('name');
        $this->setPrimaryKey('id');

        $this->belongsTo('ZoneTests', [
            'foreignKey' => 'zone_test_id',
            'joinType' => 'INNER'
        ]);
        $this->hasMany('VideoTestReponses', [
            'foreignKey' => 'video_test_id'
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
            ->notEmptyString('name');

        $validator
            ->scalar('text')
            ->maxLength('text', 1000)
            ->notEmptyString('text');

        $validator
            ->scalar('url_youtube')
            ->maxLength('url_youtube', 255)
            ->notEmptyString('url_youtube');

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
        $rules->add($rules->existsIn(['zone_test_id'], 'ZoneTests'));

        return $rules;
    }
}
