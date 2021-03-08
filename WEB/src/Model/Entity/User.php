<?php

namespace App\Model\Entity;

use DateTime;
use Cake\ORM\Entity;
use Cake\ORM\TableRegistry;
use Cake\Auth\DefaultPasswordHasher;

/**
 * User Entity
 *
 * @property int $id
 * @property string $email
 * @property string $password
 * @property string|null $sexe
 * @property \Cake\I18n\FrozenDate|null $date_naissance
 * @property int|null $nationalite_id
 * @property int|null $taille_cm
 * @property float|null $poids_kg
 * @property int|null $sport_niveau_club_id
 * @property int|null $equipe_nationale
 * @property string|null $nom_equipe
 * @property int|null $frequence_entrainement_id
 * @property int|null $have_acces_tiers
 * @property string|null $prenom_nom_tiers
 * @property string|null $email_tiers
 * @property string|null $fonction_tiers
 * @property string|null $morphologie
 * @property int|null $objectif_id
 * @property int|null $regime_special_id
 * @property float|null $nb_heure_sommeil
 * @property \Cake\I18n\FrozenTime|null $heure_coucher
 * @property \Cake\I18n\FrozenTime|null $heure_reveil
 * @property int|null $temps_sieste_min
 * @property bool|null $is_active
 * @property \Cake\I18n\FrozenTime|null $created
 * @property \Cake\I18n\FrozenTime|null $modified
 *
 * @property \App\Model\Entity\Nationalite $nationalite
 * @property \App\Model\Entity\SportNiveauClub $sport_niveau_club
 * @property \App\Model\Entity\FrequenceEntrainement $frequence_entrainement
 * @property \App\Model\Entity\Objectif $objectif
 * @property \App\Model\Entity\RegimeSpecial $regime_special
 * @property \App\Model\Entity\Blessure[] $blessures
 * @property \App\Model\Entity\UserBlessure[] $user_blessures
 * @property \App\Model\Entity\UserCalendrier[] $user_calendriers
 * @property \App\Model\Entity\UserEntrainement[] $user_entrainements
 * @property \App\Model\Entity\UserHydratation[] $user_hydratations
 * @property \App\Model\Entity\UserProgramme[] $user_programmes
 * @property \App\Model\Entity\UserSemaineType[] $user_semaine_types
 * @property \App\Model\Entity\UserSommeil[] $user_sommeils
 * @property \App\Model\Entity\UserTension[] $user_tensions
 * @property \App\Model\Entity\ExigenceAlimentaire[] $exigence_alimentaires
 * @property \App\Model\Entity\NotificationType[] $notification_types
 * @property \App\Model\Entity\Aliment[] $aliments
 */
class User extends Entity
{
    /**
     * Fields that can be mass assigned using newEntity() or patchEntity().
     *
     * Note that when '*' is set to true, this allows all unspecified fields to
     * be mass assigned. For security purposes, it is advised to set '*' to false
     * (or remove it), and explicitly make individual fields accessible as needed.
     *
     * @var array
     */
    protected $_accessible = [
        '*' => true,
    ];

    /**
     * Fields that are excluded from JSON versions of the entity.
     *
     * @var array
     */
    protected $_hidden = [
        'password'
    ];

    protected function _setPassword($password)
    {
        return (new DefaultPasswordHasher)->hash($password);
    }

    protected $_virtual = ['age', 'body_data'];

    /**
     * Calculate age
     *
     * @return int
     */
    protected function _getAge(): int
    {
        //Create a DateTime object using the user's date of birth.
        $date_naissance = (!empty($this->date_naissance)) ? $this->date_naissance->format('Y-m-d 00:00:00') : date('2000-01-01 00:00:01');
        $dob = new DateTime($date_naissance);
        //We need to compare the user's date of birth with today's date.
        $now = new DateTime();

        //Calculate the time difference between the two dates.
        $difference = $now->diff($dob);

        //Get the difference in years, as we are looking for the user's age.
        return (int) $difference->y;
    }

    /**
     * Calculate imc
     *
     * @return float
     */
    protected function getImc(): float
    {
        if (!empty($this->poids_kg) && !empty($this->taille_cm)) {
            return $this->poids_kg / (($this->taille_cm / 100) * ($this->taille_cm / 100));
        }
        return 0;
    }

    /**
     * Calculate img
     *
     * @return float
     */
    protected function getImg(): float
    {
        $calculSex = 10.8;
        if ($this->sexe == 'F') {
            $calculSex = 0;
        }

        return (1.2 * $this->getImc()) + (0.23 * $this->_getAge()) - $calculSex - 5.4;
    }

    /**
     * Calculate fat mass
     *
     * @return float
     */
    protected function getMg(): float
    {
        if (!empty($this->poids_kg)) {
            return $this->poids_kg * $this->getImg() / 100;
        }
        return 0;
    }

    /**
     * Calculate lean mass
     *
     * @return float
     */
    protected function getMm(): float
    {
        if (!empty($this->poids_kg)) {
            return $this->poids_kg - $this->getMg();
        }
        return 0;
    }

    /**
     * Calculate basic metabolism
     *
     * @return float
     */
    protected function getMb(): float
    {
        return 370 + (21.6 * $this->getMm());
    }

    /**
     * Calculate daily expenditure
     *
     * @return float
     */
    protected function getDej(): float
    {
        // OLD
        //        $frequenceEntrainements = TableRegistry::get('FrequenceEntrainements');
        //        $frequenceEntrainement = $frequenceEntrainements->findById($this->frequence_entrainement_id)->first();
        //
        //        if (!empty($frequenceEntrainement)) {
        //            return $this->getMb() * $frequenceEntrainement->indice;
        //        }
        //        return 0;
        return $this->getMb() * 1.15;
    }

    /**
     * Calculate kcal objectif
     *
     * @return float
     */
    protected function getObj(): float
    {
        $objectifs = TableRegistry::get('Objectifs');
        $objectif = $objectifs->findById($this->objectif_id)->first();



        if (!empty($objectif)) {
            $obj = ($this->getMb() + $this->getDej()) * $objectif->indice;

            // On AJoute les dépenses énergetiques des entrainements du jour
            $entrainements = TableRegistry::get('UserEntrainements');
            $entrainements = $entrainements->find()->where(['user_id' => $this->id, 'date' => date('Y-m-d')]);
            foreach ($entrainements as $entrainement) {
                $obj += $entrainement->kcal;
            }
            return $obj;
        }
        return 0;
    }

    /**
     * Calculate hydro objectif
     *
     * @return float
     */
    protected function getObjHydro(): float
    {
        $activityType = TableRegistry::get('ActiviteTypes');
        $activityType = $activityType->findByName("Entraînement technique")->first();

        $userCalendrier = TableRegistry::get('UserCalendriers');
        $userCalendrier = $userCalendrier->findByActiviteTypeId($activityType->id)
            ->where([
                'UserCalendriers.is_active' => true
            ]);

        $trainingIndex = 0.80;
        if ($userCalendrier->count() == 1) {
            $trainingIndex = 1;
        } elseif ($userCalendrier->count() == 1) {
            $trainingIndex = 1.2;
        }
        return ($this->poids_kg * 0.033) * $trainingIndex;
    }

    /**
     * Calcul du poids idéal
     *
     * @return float
     */
    private function getPoidsIdeal(): float
    {

        if ($this->sexe == 'H') {
            if ($this->morphologie === 'ecto') {
                $result = ($this->taille_cm - 100 + ($this->_getAge() / 10)) * 0.9;
            } elseif ($this->morphologie === 'meso') {
                $result = ($this->taille_cm - 100 + ($this->_getAge() / 10)) * 0.95;
            } else {
                $result = ($this->taille_cm - 100 + ($this->_getAge() / 10)) * 1;
            }
        } else {
            if ($this->morphologie === 'ecto') {
                $result = ($this->taille_cm - 100 + ($this->_getAge() / 10)) * 0.8;
            } elseif ($this->morphologie === 'meso') {
                $result = ($this->taille_cm - 100 + ($this->_getAge() / 10)) * 0.85;
            } else {
                $result = ($this->taille_cm - 100 + ($this->_getAge() / 10)) * 0.9;
            }
        }
        return $result;
    }

    /**
     * Calcul du FFMI
     *
     * @return float
     */
    private function getFFMI(): float
    {
        if (!empty($this->taille_cm)) {
            $tailleM = $this->taille_cm / 100;
            $tailleExpo2 = pow($tailleM, 2);
            return $this->getMm() / $tailleExpo2 + 6.3 * (1.8 - $tailleM);
        }
        return 0;
    }

    /**
     * Calculate kcal objectif
     *
     * @return array
     */
    protected function _getBodyData(): array
    {
        return array(
            'imc' => $this->getImc(),
            'img' => $this->getImg(),
            'mg' => $this->getMg(),
            'mm' => $this->getMm(),
            'mb' => $this->getMb(),
            'dej' => $this->getDej(),
            'age' => $this->_getAge(),
            'obj_kcal' => round($this->getObj()),
            'obj_hydro' => round($this->getObjHydro()),
            'poids_ideal' => $this->getPoidsIdeal(),
            'ffmi' => $this->getFFMI(),
        );
    }
}
