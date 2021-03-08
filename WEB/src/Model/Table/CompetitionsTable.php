<?php
namespace App\Model\Table;

use Cake\ORM\Query;
use Cake\ORM\RulesChecker;
use Cake\ORM\Table;
use Cake\Validation\Validator;

/**
 * Competitions Model
 *
 * @property \App\Model\Table\SportsTable&\Cake\ORM\Association\BelongsTo $Sports
 * @property \App\Model\Table\UsersTable&\Cake\ORM\Association\BelongsTo $Users
 * @property \App\Model\Table\CompetitionSportParamsTable&\Cake\ORM\Association\HasMany $CompetitionSportParams
 * @property &\Cake\ORM\Association\BelongsToMany $SportNiveauClubs
 *
 * @method \App\Model\Entity\Competition get($primaryKey, $options = [])
 * @method \App\Model\Entity\Competition newEntity($data = null, array $options = [])
 * @method \App\Model\Entity\Competition[] newEntities(array $data, array $options = [])
 * @method \App\Model\Entity\Competition|false save(\Cake\Datasource\EntityInterface $entity, $options = [])
 * @method \App\Model\Entity\Competition saveOrFail(\Cake\Datasource\EntityInterface $entity, $options = [])
 * @method \App\Model\Entity\Competition patchEntity(\Cake\Datasource\EntityInterface $entity, array $data, array $options = [])
 * @method \App\Model\Entity\Competition[] patchEntities($entities, array $data, array $options = [])
 * @method \App\Model\Entity\Competition findOrCreate($search, callable $callback = null, $options = [])
 *
 * @mixin \Cake\ORM\Behavior\TimestampBehavior
 */
class CompetitionsTable extends Table
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

        $this->setTable('competitions');
        $this->setDisplayField('name');
        $this->setPrimaryKey('id');

        $this->addBehavior('Timestamp');

        $this->belongsTo('Sports', [
            'foreignKey' => 'sport_id',
            'joinType' => 'INNER'
        ]);
        $this->belongsTo('Users', [
            'foreignKey' => 'user_id',
            'joinType' => 'INNER'
        ]);
        $this->hasMany('CompetitionSportParams', [
            'foreignKey' => 'competition_id'
        ]);
        $this->belongsToMany('SportNiveauClubs', [
            'foreignKey' => 'competition_id',
            'targetForeignKey' => 'sport_niveau_club_id',
            'joinTable' => 'sport_niveau_clubs_competitions'
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
            ->allowEmptyString('name');

        $validator
            ->date('comp_date')
            ->requirePresence('comp_date', 'create')
            ->notEmptyDate('comp_date');

        $validator
            ->scalar('participant1_logo')
            ->maxLength('participant1_logo', 255)
            ->allowEmptyString('participant1_logo');

        $validator
            ->scalar('participant1_name')
            ->maxLength('participant1_name', 255)
            ->allowEmptyString('participant1_name');

        $validator
            ->scalar('participant2_logo')
            ->maxLength('participant2_logo', 255)
            ->allowEmptyString('participant2_logo');

        $validator
            ->scalar('participant2_name')
            ->maxLength('participant2_name', 255)
            ->allowEmptyString('participant2_name');

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
        $rules->add($rules->existsIn(['sport_id'], 'Sports'));
        $rules->add($rules->existsIn(['user_id'], 'Users'));

        return $rules;
    }
}
