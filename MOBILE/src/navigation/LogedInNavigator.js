import { createStackNavigator } from "react-navigation";
import Dashboard from "../containers/Dashboard/Dashboard";
import TabContainer from "../containers/TabContainer";

import FichePedag from "../containers/Dashboard/FichePedag/FichePedag";
import Settings from "../containers/Dashboard/Settings/Settings";
import MyEnergy from "../containers/Dashboard/MyEnergiy/MyEnergy";
import DonneesPerso from "../containers/Dashboard/FichePedag/DonneesPerso/DonneesPerso";
import Carnet from "../containers/Dashboard/Carnet/Carnet";
import Calendar from "../containers/Calendar/Calendar";
import CompteurNutritionnel from "../containers/Dashboard/Nutrition/compteurNutritionnel";
import CalendarWithPlugin from "../containers/CalendarWithPlugin/CalendarWithPlugin";
import Evenement from "../containers/Dashboard/FichePedag/Evenement/Evenement"
import Masemaine from "../containers/Dashboard/FichePedag/Masemaine/Masemaine"
import AjoutAliment from "../containers/Dashboard/Nutrition/Aliment/ajoutAliment";
import MonPhysique from "../containers/Dashboard/FichePedag/MonPhysique/MonPhysique";
import ListeLeftRightFoot from "../containers/Training/History/ListeVideoBycolonneLeftRight";


const LogedinNavigator = createStackNavigator({
    AppScreen: {
        screen: TabContainer
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
    MonPhysique: {
        screen: MonPhysique
    },
    Calendar: {
        screen: CalendarWithPlugin
    },
    // Evenement: {
    //     screen: Evenement
    // },
    Masemaine:{
        screen: Masemaine
    },
    // ActiviteProgrammes:{
    //     screen: ActiviteProgrammes
    // },
    AjoutAliment: {
        screen: AjoutAliment
    },
    CompteurNutritionnel: {
        screen: CompteurNutritionnel
    },
    ListeLeftRightFoot: {
        screen: ListeLeftRightFoot
    },

},{
    defaultNavigationOptions: {
        header: null
    }
})

export default LogedinNavigator
