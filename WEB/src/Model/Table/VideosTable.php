<?php
namespace App\Model\Table;

use Cake\ORM\Query;
use Cake\ORM\RulesChecker;
use Cake\ORM\Table;
use Cake\Validation\Validator;

/**
 * Videos Model
 *
 * @property \App\Model\Table\VideoObjectsTable&\Cake\ORM\Association\BelongsTo $VideoObjects
 * @property \App\Model\Table\VideoTypesTable&\Cake\ORM\Association\BelongsTo $VideoTypes
 * @property &\Cake\ORM\Association\BelongsToMany $Programmes
 * @property \App\Model\Table\ZonesTable&\Cake\ORM\Association\BelongsToMany $Zones
 *
 * @method \App\Model\Entity\Video get($primaryKey, $options = [])
 * @method \App\Model\Entity\Video newEntity($data = null, array $options = [])
 * @method \App\Model\Entity\Video[] newEntities(array $data, array $options = [])
 * @method \App\Model\Entity\Video|false save(\Cake\Datasource\EntityInterface $entity, $options = [])
 * @method \App\Model\Entity\Video saveOrFail(\Cake\Datasource\EntityInterface $entity, $options = [])
 * @method \App\Model\Entity\Video patchEntity(\Cake\Datasource\EntityInterface $entity, array $data, array $options = [])
 * @method \App\Model\Entity\Video[] patchEntities($entities, array $data, array $options = [])
 * @method \App\Model\Entity\Video findOrCreate($search, callable $callback = null, $options = [])
 */
class VideosTable extends Table
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

        $this->setTable('videos');
        $this->setDisplayField('name');
        $this->setPrimaryKey('id');

        $this->belongsTo('VideoObjects', [
            'foreignKey' => 'video_object_id'
        ]);
        $this->belongsTo('VideoTypes', [
            'foreignKey' => 'video_type_id',
            'joinType' => 'INNER'
        ]);
        $this->belongsToMany('Programmes', [
            'foreignKey' => 'video_id',
            'targetForeignKey' => 'programme_id',
            'joinTable' => 'programmes_videos'
        ]);
        $this->belongsToMany('Zones', [
            'foreignKey' => 'video_id',
            'targetForeignKey' => 'zone_id',
            'joinTable' => 'videos_zones'
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
            ->allowEmptyString('indice');

        $validator
            ->scalar('lien_youtube')
            ->maxLength('lien_youtube', 255)
            ->requirePresence('lien_youtube', 'create')
            ->notEmptyString('lien_youtube');

        $validator
            ->scalar('position_outil')
            ->maxLength('position_outil', 255)
            ->allowEmptyString('position_outil');

        $validator
            ->scalar('position_corps')
            ->maxLength('position_corps', 255)
            ->allowEmptyString('position_corps');

        $validator
            ->scalar('instruction')
            ->allowEmptyString('instruction');

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
        $rules->add($rules->existsIn(['video_object_id'], 'VideoObjects'));
        $rules->add($rules->existsIn(['video_type_id'], 'VideoTypes'));

        return $rules;
    }
}
