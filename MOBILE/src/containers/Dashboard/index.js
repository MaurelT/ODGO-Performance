import { createStackNavigator, createAppContainer, createSwitchNavigator } from "react-navigation";
import FichePedag from "./FichePedag/FichePedag";
import Dashboard from "./Dashboard";
import Settings from "./Settings/Settings";
import MyEnergy from "./MyEnergiy/MyEnergy";
import DonneesPerso from "./FichePedag/DonneesPerso/DonneesPerso";
import Carnet from "./Carnet/Carnet";
import Calendar from "../Calendar/Calendar";
import CompteurNutritionnel from "./Nutrition/compteurNutritionnel";
import CalendarWithPlugin from "../CalendarWithPlugin/CalendarWithPlugin";
import HistoriqueCompetitionInCalendarWithPlugin from "../CalendarWithPlugin/HistoriqueCompetitionInCalendarWithPlugin";
import Evenement from "./FichePedag/Evenement/Evenement"
import Masemaine from "./FichePedag/Masemaine/Masemaine"
import Hydratation from "../Performance/Hydratation/Hydratation";
// import Login from "../Login/Login";
import Petitdejeuners from "./Nutrition/Aliment/Petitdejeuner";
import PetitdejeunerNews from "./Nutrition/newaliment/PetitdejeunerNew";
import SingleExerciceDashboard from "../../containers/Training/SingleExercice/SingleExercice";
import ActiviteProgrammesdashboard from "../../containers/Dashboard/FichePedag/ActiviteProgrammes/ActiviteProgrammes";

import ActiviteProgrammes from "./FichePedag/ActiviteProgrammes/ActiviteProgrammes"
import Authloading from "../Authloading/Authloading";
import AjoutAliment from './Nutrition/Aliment/ajoutAliment';
import Selectionnermesrepas from './Nutrition/Aliment/SelectionnerMesRepas';
import Selectionnermesrepasdashboardbis from './Nutrition/Aliment/SelectionnerMesRepasbis';
import CreerRepasDashboard from './Nutrition/Aliment/CreerRepas';
import MesRepasItemDashboard from './Nutrition/Aliment/MesRepasItem';
import MesProduits_NosSuggesstion_Item_dashboard from './Nutrition/Aliment/MesProduits_NosSuggesstion_Item';
import itemAlimentForAdddashboard from './Nutrition/Aliment/ItemAlimentForAdd';
import itemAlimentForEditdashboard from './Nutrition/Aliment/ItemAlimentForEdit';
import fileProtocoles_Dashboard from '../Training/Protocoles/protocoles';
import MamobiliteDash from '../Training/History/Mamobilite';
import MestensionsDash from '../Training/History/Tensionvideo';
import ListeLeftRightDash from "../Training/History/ListeVideoBycolonneLeftRight";
import VideothequeDash from "../Training/History/Videothequesquelette";

const DashboardNavigator = createStackNavigator({
    Dashboard: {
        screen: Dashboard
    },
        fileProtocoles_Dashboard:{
            screen:  fileProtocoles_Dashboard
        },
        AjoutAliment: {
            screen: AjoutAliment
        },
    Hydratation: {
        screen: Hydratation
    },
    FichePedag: {
        screen: FichePedag
    },
    Settings: {
        screen: Settings
    },
    MyEnergy: {
        screen: MyEnergy
    },
    DonneesPerso: {
        screen: DonneesPerso
    },
    Carnet: {
        screen: Carnet
    },
    Calendar: {
        screen: CalendarWithPlugin
    },
    HistoriqueCompet: {
        screen: HistoriqueCompetitionInCalendarWithPlugin
    },
    Evenement: {
        screen: Evenement
    },
    Masemaine: {
        screen: Masemaine
    },
    Petitdejeuners: {
        screen: Petitdejeuners
    },
        PetitdejeunerNews: {
            screen: PetitdejeunerNews
        },
    ActiviteProgrammes: {
        screen: ActiviteProgrammes
    },
    CompteurNutritionnel: {
        screen: CompteurNutritionnel
    },
        Selectionnermesrepasdashboard: {
            screen: Selectionnermesrepas
        },
        Selectionnermesrepasdashboardbis: {
            screen: Selectionnermesrepasdashboardbis
        },
        CreerRepasDashboard: {
            screen: CreerRepasDashboard
        },
        MesRepasItemDashboard: {
            screen: MesRepasItemDashboard
        },
        MesProduits_NosSuggesstion_Item_dashboard:{
            screen: MesProduits_NosSuggesstion_Item_dashboard
        },
        itemAlimentForAdddashboard :{
            screen: itemAlimentForAdddashboard
        },
        itemAlimentForEditdashboard:{
            screen: itemAlimentForEditdashboard
        },
        SingleExerciceDashboard:{
            screen: SingleExerciceDashboard
        },
        ActiviteProgrammesdashboard:{
            screen: ActiviteProgrammesdashboard
        },
        MamobiliteDash:{
            screen: MamobiliteDash
        },
        ListeLeftRightDash:{
            screen: ListeLeftRightDash
        },
        MestensionsDash:{
            screen: MestensionsDash
        },
        VideothequeDash:{
            screen: VideothequeDash
        },
    // Deconnexion
    // Login: {
    //     screen: Login
    // },

},
    {
        initialRouteName: "Dashboard",
        defaultNavigationOptions: {
            header: null
        }
    })


export default createAppContainer(DashboardNavigator)
