<?php

namespace App\Model\Table;

use Cake\ORM\Table;
use Cake\ORM\RulesChecker;
use App\Model\Rule\IsActive;
use Cake\Validation\Validator;

/**
 * Users Model
 *
 * @property \App\Model\Table\NationalitesTable&\Cake\ORM\Association\BelongsTo $Nationalites
 * @property \App\Model\Table\SportNiveauClubsTable&\Cake\ORM\Association\BelongsTo $SportNiveauClubs
 * @property \App\Model\Table\FrequenceEntrainementsTable&\Cake\ORM\Association\BelongsTo $FrequenceEntrainements
 * @property \App\Model\Table\ObjectifsTable&\Cake\ORM\Association\BelongsTo $Objectifs
 * @property \App\Model\Table\RegimeSpecialsTable&\Cake\ORM\Association\BelongsTo $RegimeSpecials
 * @property \App\Model\Table\BlessuresTable&\Cake\ORM\Association\HasMany $Blessures
 * @property \App\Model\Table\UserBlessuresTable&\Cake\ORM\Association\HasMany $UserBlessures
 * @property \App\Model\Table\UserCalendriersTable&\Cake\ORM\Association\HasMany $UserCalendriers
 * @property \App\Model\Table\UserEntrainementsTable&\Cake\ORM\Association\HasMany $UserEntrainements
 * @property \App\Model\Table\UserHydratationsTable&\Cake\ORM\Association\HasMany $UserHydratations
 * @property \App\Model\Table\UserProgrammesTable&\Cake\ORM\Association\HasMany $UserProgrammes
 * @property \App\Model\Table\UserSemaineTypesTable&\Cake\ORM\Association\HasMany $UserSemaineTypes
 * @property \App\Model\Table\UserSommeilsTable&\Cake\ORM\Association\HasMany $UserSommeils
 * @property \App\Model\Table\UserTensionsTable&\Cake\ORM\Association\HasMany $UserTensions
 * @property \App\Model\Table\ExigenceAlimentairesTable&\Cake\ORM\Association\BelongsToMany $ExigenceAlimentaires
 * @property \App\Model\Table\NotificationTypesTable&\Cake\ORM\Association\BelongsToMany $NotificationTypes
 * @property \App\Model\Table\AlimentsTable&\Cake\ORM\Association\BelongsToMany $Aliments
 *
 * @method \App\Model\Entity\User get($primaryKey, $options = [])
 * @method \App\Model\Entity\User newEntity($data = null, array $options = [])
 * @method \App\Model\Entity\User[] newEntities(array $data, array $options = [])
 * @method \App\Model\Entity\User|false save(\Cake\Datasource\EntityInterface $entity, $options = [])
 * @method \App\Model\Entity\User saveOrFail(\Cake\Datasource\EntityInterface $entity, $options = [])
 * @method \App\Model\Entity\User patchEntity(\Cake\Datasource\EntityInterface $entity, array $data, array $options = [])
 * @method \App\Model\Entity\User[] patchEntities($entities, array $data, array $options = [])
 * @method \App\Model\Entity\User findOrCreate($search, callable $callback = null, $options = [])
 *
 * @mixin \Cake\ORM\Behavior\TimestampBehavior
 */
class UsersTable extends Table
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

        $this->setTable('users');
        $this->setDisplayField('id');
        $this->setPrimaryKey('id');

        $this->addBehavior('Timestamp');

        $this->belongsTo('Nationalites', [
            'foreignKey' => 'nationalite_id'
        ]);
        $this->belongsTo('SportNiveauClubs', [
            'foreignKey' => 'sport_niveau_club_id'
        ]);
        $this->belongsTo('FrequenceEntrainements', [
            'foreignKey' => 'frequence_entrainement_id'
        ]);
        $this->belongsTo('Objectifs', [
            'foreignKey' => 'objectif_id'
        ]);
        $this->belongsTo('Sports', [
            'foreignKey' => 'sport_id'
        ]);
        $this->belongsTo('Problematiques', [
            'foreignKey' => 'problematique_id'
        ]);
        $this->belongsTo('RegimeSpecials', [
            'foreignKey' => 'regime_special_id'
        ]);
        $this->hasOne('UserAbonnementEngagement', [
            'foreignKey' => 'user_id'
        ]);
        $this->hasMany('Blessures', [
            'foreignKey' => 'user_id'
        ]);
        $this->hasMany('UserBlessures', [
            'foreignKey' => 'user_id'
        ]);
        $this->hasMany('UserCalendriers', [
            'foreignKey' => 'user_id'
        ]);
        $this->hasMany('UserEntrainements', [
            'foreignKey' => 'user_id'
        ]);
        $this->hasMany('UserHydratations', [
            'foreignKey' => 'user_id'
        ]);
        $this->hasMany('UserProgrammes', [
            'foreignKey' => 'user_id'
        ]);
        $this->hasMany('UserSemaineTypes', [
            'foreignKey' => 'user_id'
        ]);
        $this->hasMany('UserSommeils', [
            'foreignKey' => 'user_id'
        ]);
        $this->hasMany('UserTensions', [
            'foreignKey' => 'user_id'
        ]);
        $this->hasMany('UsersAliments', [
            'foreignKey' => 'user_id'
        ]);
        $this->hasMany('UsersAbonnementEngagement', [
            'foreignKey' => 'user_id'
        ]);
        $this->belongsToMany('ExigenceAlimentaires', [
            'foreignKey' => 'user_id',
            'targetForeignKey' => 'exigence_alimentaire_id',
            'joinTable' => 'exigence_alimentaires_users'
        ]);
        $this->belongsToMany('NotificationTypes', [
            'foreignKey' => 'user_id',
            'targetForeignKey' => 'notification_type_id',
            'joinTable' => 'notification_types_users'
        ]);
        $this->belongsToMany('Aliments', [
            'foreignKey' => 'user_id',
            'targetForeignKey' => 'aliment_id',
            'joinTable' => 'users_aliments'
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
            ->email('email')
            ->requirePresence('email', 'create')
            ->notEmptyString('email');

        $validator
            ->scalar('password')
            ->maxLength('password', 255)
            ->requirePresence('password', 'create')
            ->notEmptyString('password');

        $validator
            ->scalar('sexe')
            ->allowEmptyString('sexe');

        $validator
            ->date('date_naissance')
            ->allowEmptyDate('date_naissance');

        $validator
            ->integer('taille_cm')
            ->allowEmptyString('taille_cm');

        $validator
            ->numeric('poids_kg')
            ->allowEmptyString('poids_kg');

        $validator
            ->boolean('equipe_nationale')
            ->allowEmptyString('equipe_nationale');

        $validator
            ->scalar('nom_equipe')
            ->maxLength('nom_equipe', 255)
            ->allowEmptyString('nom_equipe');

        $validator
            ->boolean('have_acces_tiers')
            ->allowEmptyString('have_acces_tiers');

        $validator
            ->scalar('prenom_nom_tiers')
            ->maxLength('prenom_nom_tiers', 255)
            ->allowEmptyString('prenom_nom_tiers');

        $validator
            ->scalar('email_tiers')
            ->maxLength('email_tiers', 255)
            ->allowEmptyString('email_tiers');

        $validator
            ->scalar('fonction_tiers')
            ->maxLength('fonction_tiers', 255)
            ->allowEmptyString('fonction_tiers');

        $validator
            ->scalar('morphologie')
            ->allowEmptyString('morphologie');

        $validator
            ->numeric('nb_heure_sommeil')
            ->allowEmptyString('nb_heure_sommeil');

        $validator
            ->time('heure_coucher')
            ->allowEmptyTime('heure_coucher');

        $validator
            ->time('heure_reveil')
            ->allowEmptyTime('heure_reveil');

        $validator
            ->integer('temps_sieste_min')
            ->allowEmptyString('temps_sieste_min');

        $validator
            ->boolean('is_active')
            ->allowEmptyString('is_active');

        return $validator;
    }

    /**
     * Default validation rules.
     *
     * @param \Cake\Validation\Validator $validator Validator instance.
     * @return \Cake\Validation\Validator
     */
    public function validationPersonnalData(Validator $validator)
    {
        $validator
            ->requirePresence('sexe')
            ->scalar('sexe')
            ->notEmptyString('sexe');

        $validator
            ->requirePresence('date_naissance')
            ->date('date_naissance')
            ->notEmptyString('date_naissance');

        $validator
            ->requirePresence('taille_cm')
            ->integer('taille_cm')
            ->notEmptyString('taille_cm');

        $validator
            ->requirePresence('poids_kg')
            ->numeric('poids_kg')
            ->notEmptyString('poids_kg');

        $validator
            ->boolean('equipe_nationale')
            ->requirePresence('equipe_nationale')
            ->notEmptyString('equipe_nationale');

        $validator
            ->scalar('nom_equipe')
            ->maxLength('nom_equipe', 255)
            ->allowEmptyString('nom_equipe');

        $validator
            ->allowEmptyString('have_acces_tiers')
            ->boolean('have_acces_tiers');

        $validator
            ->scalar('prenom_nom_tiers')
            ->maxLength('prenom_nom_tiers', 255)
            ->allowEmptyString('prenom_nom_tiers');

        $validator
            ->scalar('email_tiers')
            ->maxLength('email_tiers', 255)
            ->allowEmptyString('email_tiers');

        $validator
            ->scalar('fonction_tiers')
            ->maxLength('fonction_tiers', 255)
            ->allowEmptyString('fonction_tiers');

        $validator
            ->requirePresence('nationalite_id')
            ->requirePresence('frequence_entrainement_id');

        return $validator;
    }

    /**
     * Default validation rules.
     *
     * @param \Cake\Validation\Validator $validator Validator instance.
     * @return \Cake\Validation\Validator
     */
    public function validationNutritionData(Validator $validator)
    {
        $validator
            ->requirePresence('morphologie')
            ->scalar('morphologie')
            ->notEmptyString('morphologie');

        $validator
            ->requirePresence('objectif_id')
            ->requirePresence('regime_special_id');

        return $validator;
    }

    /**
     * Default validation rules.
     *
     * @param \Cake\Validation\Validator $validator Validator instance.
     * @return \Cake\Validation\Validator
     */
    public function validationSleepData(Validator $validator)
    {
        $validator
            ->requirePresence('nb_heure_sommeil')
            ->numeric('nb_heure_sommeil')
            ->notEmptyString('nb_heure_sommeil');

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
        $rules->add($rules->isUnique(['email']));

        $rules->add($rules->existsIn(['nationalite_id'], 'Nationalites'));
        $rules->add(new IsActive(), 'isActive', [
            'Entity' => 'Nationalites',
            'errorField' => 'nationalite_id',
            'message' => __('La nationalité n\'est pas active.')
        ]);

        $rules->add($rules->existsIn(['sport_niveau_club_id'], 'SportNiveauClubs'));
        $rules->add(new IsActive(), 'isActive', [
            'Entity' => 'SportNiveauClubs',
            'errorField' => 'sport_niveau_club_id',
            'message' => __('Le club n\'est pas actif.')
        ]);

        $rules->add($rules->existsIn(['frequence_entrainement_id'], 'FrequenceEntrainements'));
        $rules->add(new IsActive(), 'isActive', [
            'Entity' => 'FrequenceEntrainements',
            'errorField' => 'frequence_entrainement_id',
            'message' => __('La fréquence d\'entrainement n\'est pas active.')
        ]);

        $rules->add($rules->existsIn(['objectif_id'], 'Objectifs'));
        $rules->add(new IsActive(), 'isActive', [
            'Entity' => 'Objectifs',
            'errorField' => 'objectif_id',
            'message' => __('L\'objectif n\'est pas actif.')
        ]);

        $rules->add($rules->existsIn(['regime_special_id'], 'RegimeSpecials'));
        $rules->add(new IsActive(), 'isActive', [
            'Entity' => 'RegimeSpecials',
            'errorField' => 'regime_special_id',
            'message' => __('L\'exigence alimentaire n\'est pas active.')
        ]);

        return $rules;
    }

    public function getSport()
    {
        debug($this);die;
    }
}
