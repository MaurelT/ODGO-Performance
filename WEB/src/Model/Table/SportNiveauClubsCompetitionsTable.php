<?php
namespace App\Model\Table;

use Cake\ORM\Query;
use Cake\ORM\RulesChecker;
use Cake\ORM\Table;
use Cake\Validation\Validator;

/**
 * SportNiveauClubsCompetitions Model
 *
 * @property \App\Model\Table\SportNiveauClubsTable&\Cake\ORM\Association\BelongsTo $SportNiveauClubs
 * @property \App\Model\Table\CompetitionsTable&\Cake\ORM\Association\BelongsTo $Competitions
 *
 * @method \App\Model\Entity\SportNiveauClubsCompetition get($primaryKey, $options = [])
 * @method \App\Model\Entity\SportNiveauClubsCompetition newEntity($data = null, array $options = [])
 * @method \App\Model\Entity\SportNiveauClubsCompetition[] newEntities(array $data, array $options = [])
 * @method \App\Model\Entity\SportNiveauClubsCompetition|false save(\Cake\Datasource\EntityInterface $entity, $options = [])
 * @method \App\Model\Entity\SportNiveauClubsCompetition saveOrFail(\Cake\Datasource\EntityInterface $entity, $options = [])
 * @method \App\Model\Entity\SportNiveauClubsCompetition patchEntity(\Cake\Datasource\EntityInterface $entity, array $data, array $options = [])
 * @method \App\Model\Entity\SportNiveauClubsCompetition[] patchEntities($entities, array $data, array $options = [])
 * @method \App\Model\Entity\SportNiveauClubsCompetition findOrCreate($search, callable $callback = null, $options = [])
 */
class SportNiveauClubsCompetitionsTable extends Table
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

        $this->setTable('sport_niveau_clubs_competitions');
        $this->setDisplayField('id');
        $this->setPrimaryKey('id');

        $this->belongsTo('SportNiveauClubs', [
            'foreignKey' => 'sport_niveau_club_id',
            'joinType' => 'INNER'
        ]);
        $this->belongsTo('Competitions', [
            'foreignKey' => 'competition_id',
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
        $rules->add($rules->existsIn(['sport_niveau_club_id'], 'SportNiveauClubs'));
        $rules->add($rules->existsIn(['competition_id'], 'Competitions'));

        return $rules;
    }
}
