<?php
namespace App\Test\Fixture;

use Cake\TestSuite\Fixture\TestFixture;

/**
 * UsersFixture
 */
class UsersFixture extends TestFixture
{
    /**
     * Fields
     *
     * @var array
     */
    // @codingStandardsIgnoreStart
    public $fields = [
        'id' => ['type' => 'integer', 'length' => 11, 'unsigned' => false, 'null' => false, 'default' => null, 'comment' => '', 'autoIncrement' => true, 'precision' => null],
        'email' => ['type' => 'string', 'length' => 255, 'null' => false, 'default' => null, 'collate' => 'utf8_general_ci', 'comment' => '', 'precision' => null, 'fixed' => null],
        'password' => ['type' => 'string', 'length' => 255, 'null' => false, 'default' => null, 'collate' => 'utf8_general_ci', 'comment' => '', 'precision' => null, 'fixed' => null],
        'sexe' => ['type' => 'string', 'length' => null, 'null' => true, 'default' => null, 'collate' => 'utf8_general_ci', 'comment' => '', 'precision' => null, 'fixed' => null],
        'date_naissance' => ['type' => 'date', 'length' => null, 'null' => true, 'default' => null, 'comment' => '', 'precision' => null],
        'nationalite_id' => ['type' => 'integer', 'length' => 11, 'unsigned' => false, 'null' => true, 'default' => null, 'comment' => '', 'precision' => null, 'autoIncrement' => null],
        'taille_cm' => ['type' => 'integer', 'length' => 11, 'unsigned' => false, 'null' => true, 'default' => null, 'comment' => '', 'precision' => null, 'autoIncrement' => null],
        'poids_kg' => ['type' => 'float', 'length' => 4, 'precision' => 1, 'unsigned' => false, 'null' => true, 'default' => null, 'comment' => ''],
        'sport_niveau_club_id' => ['type' => 'integer', 'length' => 11, 'unsigned' => false, 'null' => true, 'default' => null, 'comment' => '', 'precision' => null, 'autoIncrement' => null],
        'equipe_nationale' => ['type' => 'tinyinteger', 'length' => 4, 'unsigned' => false, 'null' => true, 'default' => null, 'comment' => '', 'precision' => null],
        'nom_equipe' => ['type' => 'string', 'length' => 255, 'null' => true, 'default' => null, 'collate' => 'utf8_general_ci', 'comment' => '', 'precision' => null, 'fixed' => null],
        'frequence_entrainement_id' => ['type' => 'integer', 'length' => 11, 'unsigned' => false, 'null' => true, 'default' => null, 'comment' => '', 'precision' => null, 'autoIncrement' => null],
        'have_acces_tiers' => ['type' => 'tinyinteger', 'length' => 4, 'unsigned' => false, 'null' => true, 'default' => null, 'comment' => '', 'precision' => null],
        'prenom_nom_tiers' => ['type' => 'string', 'length' => 255, 'null' => true, 'default' => null, 'collate' => 'utf8_general_ci', 'comment' => '', 'precision' => null, 'fixed' => null],
        'email_tiers' => ['type' => 'string', 'length' => 255, 'null' => true, 'default' => null, 'collate' => 'utf8_general_ci', 'comment' => '', 'precision' => null, 'fixed' => null],
        'fonction_tiers' => ['type' => 'string', 'length' => 255, 'null' => true, 'default' => null, 'collate' => 'utf8_general_ci', 'comment' => '', 'precision' => null, 'fixed' => null],
        'morphologie' => ['type' => 'string', 'length' => null, 'null' => true, 'default' => null, 'collate' => 'utf8_general_ci', 'comment' => '', 'precision' => null, 'fixed' => null],
        'objectif_id' => ['type' => 'integer', 'length' => 11, 'unsigned' => false, 'null' => true, 'default' => null, 'comment' => '', 'precision' => null, 'autoIncrement' => null],
        'regime_special_id' => ['type' => 'integer', 'length' => 11, 'unsigned' => false, 'null' => true, 'default' => null, 'comment' => '', 'precision' => null, 'autoIncrement' => null],
        'nb_heure_sommeil' => ['type' => 'float', 'length' => 4, 'precision' => 2, 'unsigned' => false, 'null' => true, 'default' => null, 'comment' => ''],
        'heure_coucher' => ['type' => 'time', 'length' => null, 'null' => true, 'default' => null, 'comment' => '', 'precision' => null],
        'heure_reveil' => ['type' => 'time', 'length' => null, 'null' => true, 'default' => null, 'comment' => '', 'precision' => null],
        'temps_sieste_min' => ['type' => 'integer', 'length' => 11, 'unsigned' => false, 'null' => true, 'default' => null, 'comment' => '', 'precision' => null, 'autoIncrement' => null],
        'is_active' => ['type' => 'boolean', 'length' => null, 'null' => true, 'default' => '1', 'comment' => '', 'precision' => null],
        'created' => ['type' => 'datetime', 'length' => null, 'null' => true, 'default' => null, 'comment' => '', 'precision' => null],
        'modified' => ['type' => 'datetime', 'length' => null, 'null' => true, 'default' => null, 'comment' => '', 'precision' => null],
        '_indexes' => [
            'FK_users_nationalites' => ['type' => 'index', 'columns' => ['nationalite_id'], 'length' => []],
            'FK_users_sport_niveau_clubs' => ['type' => 'index', 'columns' => ['sport_niveau_club_id'], 'length' => []],
            'FK_users_frequence_entrainements' => ['type' => 'index', 'columns' => ['frequence_entrainement_id'], 'length' => []],
            'FK_users_objectifs' => ['type' => 'index', 'columns' => ['objectif_id'], 'length' => []],
            'FK_users_regime_specials' => ['type' => 'index', 'columns' => ['regime_special_id'], 'length' => []],
        ],
        '_constraints' => [
            'primary' => ['type' => 'primary', 'columns' => ['id'], 'length' => []],
            'FK_users_frequence_entrainements' => ['type' => 'foreign', 'columns' => ['frequence_entrainement_id'], 'references' => ['frequence_entrainements', 'id'], 'update' => 'cascade', 'delete' => 'setNull', 'length' => []],
            'FK_users_nationalites' => ['type' => 'foreign', 'columns' => ['nationalite_id'], 'references' => ['nationalites', 'id'], 'update' => 'cascade', 'delete' => 'setNull', 'length' => []],
            'FK_users_objectifs' => ['type' => 'foreign', 'columns' => ['objectif_id'], 'references' => ['objectifs', 'id'], 'update' => 'cascade', 'delete' => 'setNull', 'length' => []],
            'FK_users_regime_specials' => ['type' => 'foreign', 'columns' => ['regime_special_id'], 'references' => ['regime_specials', 'id'], 'update' => 'cascade', 'delete' => 'setNull', 'length' => []],
            'FK_users_sport_niveau_clubs' => ['type' => 'foreign', 'columns' => ['sport_niveau_club_id'], 'references' => ['sport_niveau_clubs', 'id'], 'update' => 'cascade', 'delete' => 'setNull', 'length' => []],
        ],
        '_options' => [
            'engine' => 'InnoDB',
            'collation' => 'utf8_general_ci'
        ],
    ];
    // @codingStandardsIgnoreEnd
    /**
     * Init method
     *
     * @return void
     */
    public function init()
    {
        $this->records = [
            [
                'id' => 1,
                'email' => 'Lorem ipsum dolor sit amet',
                'password' => 'Lorem ipsum dolor sit amet',
                'sexe' => 'Lorem ipsum dolor sit amet',
                'date_naissance' => '2019-10-09',
                'nationalite_id' => 1,
                'taille_cm' => 1,
                'poids_kg' => 1,
                'sport_niveau_club_id' => 1,
                'equipe_nationale' => 1,
                'nom_equipe' => 'Lorem ipsum dolor sit amet',
                'frequence_entrainement_id' => 1,
                'have_acces_tiers' => 1,
                'prenom_nom_tiers' => 'Lorem ipsum dolor sit amet',
                'email_tiers' => 'Lorem ipsum dolor sit amet',
                'fonction_tiers' => 'Lorem ipsum dolor sit amet',
                'morphologie' => 'Lorem ipsum dolor sit amet',
                'objectif_id' => 1,
                'regime_special_id' => 1,
                'nb_heure_sommeil' => 1,
                'heure_coucher' => '08:23:15',
                'heure_reveil' => '08:23:15',
                'temps_sieste_min' => 1,
                'is_active' => 1,
                'created' => '2019-10-09 08:23:15',
                'modified' => '2019-10-09 08:23:15'
            ],
        ];
        parent::init();
    }
}
