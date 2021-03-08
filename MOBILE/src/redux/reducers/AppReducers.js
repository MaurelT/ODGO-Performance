import {
    SET_ACTIVE_TAB, SET_ACTIVE_LIST_PATHO, SET_ZONE,
    SET_ACTIVE_FP,
    SET_DATE,
    SET_SELECTED_DATE,
    SET_PREV_MONTH,
    SET_NEXT_MONTH,
    SET_USER_TOKEN,
    SET_POP_TO_TOP,
    SET_LISTE_ACTIVITE_PROGRAM,
    SET_ACTIVE_CALENDAR_RED,
    SET_PARAM_FOR_CALENDAR,
    SET_PETITS_DEJEUNER,
    SET_NOS_SUGGESTION,
    SET_REPAS_TYPE,
    SET_PETITS_DEJEUNER_REPAS,
    SET_PETITS_DEJEUNERD,
    SET_NOS_EATRECENTLY,
    SET_COMPTEUR_NUTRITIONNEL,
    SET_MON_ASSIETTE,
    SET_ARRAY_ALIMENT_CREATE,
    SET_ARRAY_ALIMENT_EDIT,
    SET_REPAS_DEJEUNER,
    SET_USERPROGRAM_BY_ID_VIDEOTECH,
    SET_MON_PHYSIQUE,
    SET_PATHOLOGIE_BLESSURE,
    SET_PATHOLOGIE_TENSION,
    SET_ONE_TENSION,
    SET_COLLATION_MATIN,
    SET_COLLATION_APRESMIDI,
    SET_DINER, SET_PETITS_COLLATION_MATIND, SET_DEJEUNERD, SET_COLLATION_APRESMIDID, SET_DINERD, SET_DASHBOARD,
    SET_HIDDEN_FOOTER,
    SET_TRAIN_STORIES,
    SET_ACTIVE_MOBILITEPARAMSVAVIG,
    SET_MONTESTUNIT,
    SET_ACTIVE_MOBILITEPARAMSUNIT,
    SET_SHOW_SUIVANT_AND_PROFIL_TESTMOBILITE,
    SET_ISVENU_DONNEPERSO,
    SET_ACTIVE_TABMENU_MYENERGY,
    SET_ACTIVE_TABMENU_CARNET,
    SET_IS_CONECTED,
    SET_NOT_SHOW_VALIDERBLESSURE, SET_ID_ITEM, SET_ID_ZONE,
    SET_TEST_MOBILITE_GET_REDUX,
    SET_REFRESH_MESREPAS,
    SET_USER_PASSWORD,
    SET_USER_PSEUDO,
    SET_ACTIVE_MENUPATHO,
    SET_USER_DROIT,
    SET_PARAMS_MAMOBILITE,
    SET_PARAM_VIDEOTECH,
    SET_DEPUIS_CALENDAR,
    SET_PARAM_TRAIN,
    SET_NOS_SUGGESTION_ALLFORSEARCH,
    SET_DATE_FOR_AJOUTALIMENT,
    SET_PARAMS_REPAS_TYPE,
    SET_FOR_RETOUR_TRAIN,
    SET_FACTEUR_NUISIBLE,
    filteredNosSuggestionfiltered,
    filteredmesRepaspetitsdejeunerfiltered,
    filteredEatRecentlyfiltered,
    filteredCollationmatinfiltered,
    filteredDejeunerfiltered,
    filteredCollationApresMidifiltered,
    filteredDinerfiltered
} from '../types/tabTypes';

import tensions from '../actions/listTension';
import zones from '../actions/listZone';
import listExercice from '../actions/listExercice';
import listEnergy from '../actions/listEnergy';
import listSport from '../actions/listSport';
import listActivites from '../actions/listActivites';
import listeActivitesProgram from '../actions/listeActivitesProgram'
import heures from "../actions/heures"
import heuresPM from "../actions/heuresPM"
import heuresAll from "../actions/heuresAll"
import minutes from "../actions/minutes"
import moment from 'moment';

const INITIAL_STATE = {
    filteredNosSuggestionfiltered:[],
    filteredmesRepaspetitsdejeunerfiltered:[],
    filteredEatRecentlyfiltered:[],
    filteredCollationmatinfiltered:[],
    filteredDejeunerfiltered:[],
    filteredCollationApresMidifiltered:[],
    filteredDinerfiltered:[],
    activeTab: "home",
    activeListPatho: tensions,
    selectedZone: zones[0],
    listExercice: listExercice,
    listEnergy: listEnergy,
    listSport: listSport,
    listActivites: listActivites,
    listeActivitesProgram: listeActivitesProgram,
    heures: heures,
    heuresPM: heuresPM,
    heuresAll: heuresAll,
    minutes: minutes,
    trainToShoow: {
        title: "Entrainement 1",
        date: "Mercredi 20 Mars"
    },
    isFichePedag: 0,
    selectedDate: new Date(),
    date: new Date(),
    prevMonth: new Date(),
    nextMonth: new Date(),
    userToken: "",
    popToTop:'home',
    activecalendared:null,
    nosSuggestions:[],
    nosSuggestionssearch:[],
    repasType:[],
    mesRepaspetitsdejeuner:[],
    eatrecently:[],
    monassiete:[],
    ArrayAlimentCreate:[],
    ArrayAlimentEdit:[],
    petitsdejeunerd:null,
    collationmatind:null,
    dejeunerd:null,
    collationapresmidid:null,
    dinerd:null,
    dejeuner:[],
    UserProgramByIDprogrammesVideotech:[],
    compteurNutritionnel:null, //initialisé null not []
    monPhysique:null,
    pathologieblessure:null,
    pathologietension:[],
    pathologieonetension:null,
    collationmatin:[],
    collationapresmidi:[],
    diner:[],
    dashboard:null,
    hiddenfooter:false,
    trainStoriesobj:null,
    mobiliteparamsvavig:null,
    mobiliteparamsunit:null,
    montestunit:null,
    showsuvantandprofiltestmobilite:false,
    isvenudonneperso:false,
    activeTabMenu:1,
    activemenucarnet:1,
    isConnected:true,
    notshowvalider:false,
    idzone:null,
    itemid:null,
    testmobiliteviagetredux:null,
    refreshmesrepas:false,
    user_password:"",
    user_pseudo:"",
    activeMenupatho:1,
    droits:[],
    paramsmamobilite:null,
    paramsvideotheque:null,
    depuiscalendarforplanning:false,
    paramtrain:null,
    paramRepasType:1,
    dateforajoutaliment: moment(new Date()).format("YYYY-MM-DD"),
    setforretourtrain:null,
    facteurNuisible:null,
};

const AppReducer = (state = INITIAL_STATE, action) => {
    let nextState
    switch (action.type) {
        case SET_ACTIVE_TAB:
            nextState = {
                ...state,
                activeTab: action.value
            }
            return nextState
        case SET_ACTIVE_LIST_PATHO:
            nextState = {
                ...state,
                activeListPatho: action.value
            }
            return nextState
        case SET_ZONE:
            nextState = {
                ...state,
                selectedZone: action.value
            }
            return nextState

        case SET_ACTIVE_FP:
            nextState = {
                ...state,
                isFichePedag: action.value
            }
            return nextState
        case SET_DATE:
            nextState = {
                ...state,
                date: action.value
            }
            return nextState
        case SET_SELECTED_DATE:
            nextState = {
                ...state,
                selectedDate: action.value
            }
            return nextState
        case SET_PREV_MONTH:
            nextState = {
                ...state,
                prevMonth: action.value
            }
            return nextState
        case SET_NEXT_MONTH:
            nextState = {
                ...state,
                nextMonth: action.value
            }
            return nextState
        case SET_USER_TOKEN:
            nextState = {
                ...state,
                userToken: action.value
            }
            return nextState
        case SET_POP_TO_TOP:
            nextState = {
                ...state,
                popToTop: action.value
            }
            return nextState
        case SET_LISTE_ACTIVITE_PROGRAM:
            nextState = {
                ...state,
                listeActivitesProgram: action.value
            }
            return nextState
        case SET_ACTIVE_CALENDAR_RED:
            nextState = {
                ...state,
                activecalendared: action.value
            }
            return nextState
        case SET_PARAM_FOR_CALENDAR:
            nextState = {
                ...state,
                reduxparamforcalendar: action.value
            }
            return nextState;

        // case SET_PETITS_DEJEUNER:
        //     nextState = {
        //         ...state,
        //         petitsdejeuner: action.value
        //     }
        //     return nextState;
        case SET_NOS_SUGGESTION :
            nextState = {
                ...state,
                nosSuggestions: action.value
            }
            return nextState;

        case SET_REPAS_TYPE :
            nextState = {
                ...state,
                repasType: action.value
            }
            return nextState;
        case SET_PETITS_DEJEUNER_REPAS :
            nextState = {
                ...state,
                mesRepaspetitsdejeuner: action.value
            };
            return nextState;
        case SET_PETITS_DEJEUNERD :
            nextState = {
                ...state,
                petitsdejeunerd: action.value //le ao am fichier petits dejeuner ity, le progress iren
            }
            return nextState;

        case SET_PETITS_COLLATION_MATIND :
            nextState = {
                ...state,
                collationmatind: action.value
            }
            return nextState;
        case SET_DEJEUNERD :
            nextState = {
                ...state,
                dejeunerd: action.value
            }
            return nextState;
        case SET_COLLATION_APRESMIDID :
            nextState = {
                ...state,
                collationapresmidid: action.value
            }
            return nextState;
        case SET_DINERD :
            nextState = {
                ...state,
                dinerd: action.value
            }
            return nextState;
        case SET_NOS_EATRECENTLY :
            nextState = {
                ...state,
                eatrecently: action.value
            }
            return nextState;
        case SET_COMPTEUR_NUTRITIONNEL :
            nextState = {
                ...state,
                compteurNutritionnel: action.value
            }
            return nextState;
        case SET_MON_ASSIETTE :
            nextState = {
                ...state,
                monassiete: action.value
            }
            return nextState;
        case SET_ARRAY_ALIMENT_CREATE :
            nextState = {
                ...state,
                ArrayAlimentCreate: action.value
            }
            return nextState;
        case SET_ARRAY_ALIMENT_EDIT :
            nextState = {
                ...state,
                ArrayAlimentEdit: action.value
            }
            return nextState;
        case SET_REPAS_DEJEUNER :
            nextState = {
                ...state,
                dejeuner: action.value
            }
            return nextState;
        case SET_USERPROGRAM_BY_ID_VIDEOTECH :
            nextState = {
                ...state,
                UserProgramByIDprogrammesVideotech: action.value
            }
            return nextState;
        case SET_MON_PHYSIQUE :
            nextState = {
                ...state,
                monPhysique: action.value
            }
            return nextState;

        case SET_PATHOLOGIE_BLESSURE :
            nextState = {
                ...state,
                pathologieblessure: action.value
            }
            return nextState;

        case SET_PATHOLOGIE_TENSION :
            nextState = {
                ...state,
                pathologietension: action.value
            }
            return nextState;

        case SET_ONE_TENSION :
            nextState = {
                ...state,
                pathologieonetension: action.value
            }
            return nextState;

        case SET_COLLATION_MATIN :
            nextState = {
                ...state,
                collationmatin: action.value
            }
            return nextState;

        case SET_COLLATION_APRESMIDI :
            nextState = {
                ...state,
                collationapresmidi: action.value
            }
            return nextState;

        case SET_DINER :
            nextState = {
                ...state,
                diner: action.value
            }
            return nextState;

        case SET_DASHBOARD :
            nextState = {
                ...state,
                dashboard: action.value
            }
            return nextState;

        case SET_HIDDEN_FOOTER :
            nextState = {
                ...state,
                hiddenfooter: action.value
            }
            return nextState;

        case SET_TRAIN_STORIES :
            nextState = {
                ...state,
                trainStoriesobj: action.value
            }
            return nextState;


        case SET_ACTIVE_MOBILITEPARAMSVAVIG :
            nextState = {
                ...state,
                mobiliteparamsvavig: action.value
            }
            return nextState;

        case SET_ACTIVE_MOBILITEPARAMSUNIT :
            nextState = {
                ...state,
                mobiliteparamsunit: action.value
            }
            return nextState;

        case SET_MONTESTUNIT :
            nextState = {
                ...state,
                montestunit: action.value
            }
            return nextState;

        case SET_SHOW_SUIVANT_AND_PROFIL_TESTMOBILITE :
            nextState = {
                ...state,
                showsuvantandprofiltestmobilite: action.value
            }
            return nextState;

        case SET_ISVENU_DONNEPERSO :
            nextState = {
                ...state,
                isvenudonneperso: action.value
            }
            return nextState;

        case SET_ACTIVE_TABMENU_MYENERGY :
            nextState = {
                ...state,
                activeTabMenu: action.value
            }
            return nextState;

        case SET_ACTIVE_TABMENU_CARNET :
            nextState = {
                ...state,
                activemenucarnet: action.value
            }
            return nextState;

        case SET_IS_CONECTED :
            nextState = {
                ...state,
                isConnected: action.value
            }
            return nextState;

        case SET_NOT_SHOW_VALIDERBLESSURE :
            nextState = {
                ...state,
                notshowvalider: action.value
            }
            return nextState;

        case SET_ID_ZONE :
            nextState = {
                ...state,
                idzone: action.value
            }
            return nextState;

        case SET_ID_ITEM :
            nextState = {
                ...state,
                itemid: action.value
            }
            return nextState;

        case SET_TEST_MOBILITE_GET_REDUX :
            nextState = {
                ...state,
                testmobiliteviagetredux: action.value
            }
            return nextState;
        case SET_REFRESH_MESREPAS :
            nextState = {
                ...state,
                refreshmesrepas: action.value
            }
            return nextState;

            case SET_USER_PASSWORD :
                nextState = {
                    ...state,
                    user_password: action.value
                }
                return nextState;
                case SET_USER_PSEUDO :
                    nextState = {
                        ...state,
                        user_pseudo: action.value
                    }
                    return nextState;

        case SET_ACTIVE_MENUPATHO :
            nextState = {
                ...state,
                activeMenupatho: action.value
            }
            return nextState;

        case SET_USER_DROIT :
            nextState = {
                ...state,
                droits: action.value
            }
            return nextState;
        case SET_PARAMS_MAMOBILITE :
            nextState = {
                ...state,
                paramsmamobilite: action.value
            }
            return nextState;
        case SET_PARAM_VIDEOTECH :
            nextState = {
                ...state,
                paramsvideotheque: action.value
            }
            return nextState;
        case SET_DEPUIS_CALENDAR :
            nextState = {
                ...state,
                depuiscalendarforplanning: action.value
            }
            return nextState;

        case SET_PARAM_TRAIN :
            nextState = {
                ...state,
                paramtrain: action.value
            }
            return nextState;
        case SET_NOS_SUGGESTION_ALLFORSEARCH:
            nextState = {
                ...state,
                nosSuggestionssearch: action.value
            }
            return nextState;
        case SET_DATE_FOR_AJOUTALIMENT:
            nextState = {
                ...state,
                dateforajoutaliment: action.value
            }
            return nextState;

        case SET_PARAMS_REPAS_TYPE:
            nextState = {
                ...state,
                paramRepasType: action.value
            }
            return nextState;
        case SET_FOR_RETOUR_TRAIN:
            nextState = {
                ...state,
                setforretourtrain: action.value
            }
            return nextState;
        case SET_FACTEUR_NUISIBLE:
            nextState = {
                ...state,
                facteurNuisible: action.value
            }
            return nextState;
            
            case filteredNosSuggestionfiltered:
                nextState = {
                    ...state,
                    filteredNosSuggestionfiltered: action.value
                }
                return nextState;
                case filteredmesRepaspetitsdejeunerfiltered:
                    nextState = {
                        ...state,
                        filteredmesRepaspetitsdejeunerfiltered: action.value
                    }
                    return nextState;
                    case filteredEatRecentlyfiltered:
                        nextState = {
                            ...state,
                            filteredEatRecentlyfiltered: action.value
                        }
                        return nextState;
                        case filteredCollationmatinfiltered:
                            nextState = {
                                ...state,
                                filteredCollationmatinfiltered: action.value
                            }
                            return nextState;
                            case filteredDejeunerfiltered:
                                nextState = {
                                    ...state,
                                    filteredDejeunerfiltered: action.value
                                }
                                return nextState;
                                case filteredCollationApresMidifiltered:
                                    nextState = {
                                        ...state,
                                        filteredCollationApresMidifiltered: action.value
                                    }
                                    return nextState;
                                    case filteredDinerfiltered:
                                        nextState = {
                                            ...state,
                                            filteredDinerfiltered: action.value
                                        }
                                        return nextState;

        default:
            return state
    }
};

export default AppReducer;
