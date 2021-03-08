<?php
namespace App\Model\Table;

use Cake\ORM\Query;
use Cake\ORM\RulesChecker;
use Cake\ORM\Table;
use Cake\Validation\Validator;

/**
 * UserVideoTestReponse Model
 *
 * @property \App\Model\Table\UsersTable&\Cake\ORM\Association\BelongsTo $Users
 * @property \App\Model\Table\VideoTestReponsesTable&\Cake\ORM\Association\BelongsTo $VideoTestReponses
 *
 * @method \App\Model\Entity\UserVideoTestReponse get($primaryKey, $options = [])
 * @method \App\Model\Entity\UserVideoTestReponse newEntity($data = null, array $options = [])
 * @method \App\Model\Entity\UserVideoTestReponse[] newEntities(array $data, array $options = [])
 * @method \App\Model\Entity\UserVideoTestReponse|false save(\Cake\Datasource\EntityInterface $entity, $options = [])
 * @method \App\Model\Entity\UserVideoTestReponse saveOrFail(\Cake\Datasource\EntityInterface $entity, $options = [])
 * @method \App\Model\Entity\UserVideoTestReponse patchEntity(\Cake\Datasource\EntityInterface $entity, array $data, array $options = [])
 * @method \App\Model\Entity\UserVideoTestReponse[] patchEntities($entities, array $data, array $options = [])
 * @method \App\Model\Entity\UserVideoTestReponse findOrCreate($search, callable $callback = null, $options = [])
 */
class UserVideoTestReponseTable extends Table
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

        $this->setTable('user_video_test_reponse');
        $this->setDisplayField('id');
        $this->setPrimaryKey('id');

        $this->belongsTo('Users', [
            'foreignKey' => 'user_id',
            'joinType' => 'INNER'
        ]);
        $this->belongsTo('VideoTestReponses', [
            'foreignKey' => 'video_test_reponse_id',
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
        $rules->add($rules->existsIn(['user_id'], 'Users'));
        $rules->add($rules->existsIn(['video_test_reponse_id'], 'VideoTestReponses'));

        return $rules;
    }
}
