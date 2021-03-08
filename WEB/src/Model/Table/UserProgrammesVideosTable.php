<?php
namespace App\Model\Table;

use Cake\ORM\Query;
use Cake\ORM\RulesChecker;
use Cake\ORM\Table;
use Cake\Validation\Validator;

/**
 * UserProgrammesVideos Model
 *
 * @property \App\Model\Table\UserProgrammesTable&\Cake\ORM\Association\BelongsTo $UserProgrammes
 * @property \App\Model\Table\VideosTable&\Cake\ORM\Association\BelongsTo $Videos
 *
 * @method \App\Model\Entity\UserProgrammesVideo get($primaryKey, $options = [])
 * @method \App\Model\Entity\UserProgrammesVideo newEntity($data = null, array $options = [])
 * @method \App\Model\Entity\UserProgrammesVideo[] newEntities(array $data, array $options = [])
 * @method \App\Model\Entity\UserProgrammesVideo|false save(\Cake\Datasource\EntityInterface $entity, $options = [])
 * @method \App\Model\Entity\UserProgrammesVideo saveOrFail(\Cake\Datasource\EntityInterface $entity, $options = [])
 * @method \App\Model\Entity\UserProgrammesVideo patchEntity(\Cake\Datasource\EntityInterface $entity, array $data, array $options = [])
 * @method \App\Model\Entity\UserProgrammesVideo[] patchEntities($entities, array $data, array $options = [])
 * @method \App\Model\Entity\UserProgrammesVideo findOrCreate($search, callable $callback = null, $options = [])
 */
class UserProgrammesVideosTable extends Table
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

        $this->setTable('user_programmes_videos');
        $this->setDisplayField('id');
        $this->setPrimaryKey('id');

        $this->belongsTo('UserProgrammes', [
            'foreignKey' => 'user_programme_id',
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

        $validator
            ->requirePresence('ordre', 'create')
            ->notEmptyString('ordre');

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
        $rules->add($rules->existsIn(['user_programme_id'], 'UserProgrammes'));
        $rules->add($rules->existsIn(['video_id'], 'Videos'));

        return $rules;
    }
}
