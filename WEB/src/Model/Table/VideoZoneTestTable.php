<?php
namespace App\Model\Table;

use Cake\ORM\Query;
use Cake\ORM\RulesChecker;
use Cake\ORM\Table;
use Cake\Validation\Validator;

/**
 * VideoZoneTest Model
 *
 * @property \App\Model\Table\ZoneTestsTable&\Cake\ORM\Association\BelongsTo $ZoneTests
 * @property \App\Model\Table\VideosTable&\Cake\ORM\Association\BelongsTo $Videos
 *
 * @method \App\Model\Entity\VideoZoneTest get($primaryKey, $options = [])
 * @method \App\Model\Entity\VideoZoneTest newEntity($data = null, array $options = [])
 * @method \App\Model\Entity\VideoZoneTest[] newEntities(array $data, array $options = [])
 * @method \App\Model\Entity\VideoZoneTest|false save(\Cake\Datasource\EntityInterface $entity, $options = [])
 * @method \App\Model\Entity\VideoZoneTest saveOrFail(\Cake\Datasource\EntityInterface $entity, $options = [])
 * @method \App\Model\Entity\VideoZoneTest patchEntity(\Cake\Datasource\EntityInterface $entity, array $data, array $options = [])
 * @method \App\Model\Entity\VideoZoneTest[] patchEntities($entities, array $data, array $options = [])
 * @method \App\Model\Entity\VideoZoneTest findOrCreate($search, callable $callback = null, $options = [])
 */
class VideoZoneTestTable extends Table
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

        $this->setTable('video_zone_test');
        $this->setDisplayField('id');
        $this->setPrimaryKey('id');

        $this->belongsTo('ZoneTests', [
            'foreignKey' => 'zone_test_id',
            'joinType' => 'INNER'
        ]);
        $this->belongsTo('Videos', [
            'foreignKey' => 'video_id',
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
        $rules->add($rules->existsIn(['video_id'], 'Videos'));

        return $rules;
    }
}
