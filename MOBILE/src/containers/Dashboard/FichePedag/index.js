import { createStackNavigator, createAppContainer } from "react-navigation";
import FichePedag from "./FichePedag";
import Dashboard from "../Dashboard";
import Settings from "../Settings/Settings";
import MyEnergy from "../MyEnergiy/MyEnergy";
import DonneesPerso from "./DonneesPerso/DonneesPerso";
import Carnet from "../Carnet/Carnet";
import CompteurNutritionnel from "../Nutrition/compteurNutritionnel";
// import CalendarWithPlugin from "../../CalendarWithPlugin/CalendarWithPlugin";
import Evenement from "./Evenement/Evenement"
import Masemaine from "../FichePedag/Masemaine/Masemaine"
import PathologieFichepedag from '../../Sante/Pathologie/Pathologie' ;
import AddtensionFichepedag from '../../Sante/AddTension/AddTension' ;
import AddBlessureFichepedag from '../../Sante/AddBlessure/AddBlessure' ;

import AjoutAliment from "../Nutrition/Aliment/ajoutAliment";
// import Hydratation from "../../Performance/Hydratation/Hydratation"

import MonPhysique from   "./MonPhysique/MonPhysique";
import Mobilites from   "./MonPhysique/Mobilites";
import TestMobilites from   "./MonPhysique/TestMoblilites";
import TestMobilitesUnitaires from   "./MonPhysique/TestMobilitesUnitaires";
import DetailsTestUnitaires from   "./MonPhysique/DetailsTestUnitaires";
import Montestunit from   "./MonPhysique/Montestunit";
import DeclarerMatchs from "./Declarer";

const FichePedagNavigator = createStackNavigator({
    Dashboard: {
        screen: Dashboard
    },
    // Hydratation: {
    //     screen: Hydratation
    // },
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
    Mobilites: {
        screen: Mobilites
    },
    TestMobilites: {
        screen: TestMobilites
    },
    TestMobilitesUnitaires: {
        screen: TestMobilitesUnitaires
    },
    DetailsTestUnitaires: {
        screen: DetailsTestUnitaires
    },
        Montestunit: {
            screen: Montestunit
        },
    // Calendar: {
    //     screen: CalendarWithPlugin
    // },
    Evenement: {
        screen: Evenement
    },
    Masemaine:{
        screen: Masemaine
    },
    // ActiviteProgrammes:{
    //     screen: ActiviteProgrammes
    // },
    CompteurNutritionnel: {
        screen: CompteurNutritionnel
    },
        DeclarerMatch:{
            screen: DeclarerMatchs
        },
        PathologieFichepedag:{
            screen: PathologieFichepedag
        },
        AddtensionFichepedag:{
            screen: AddtensionFichepedag
        },
        AddBlessureFichepedag:{
            screen: AddBlessureFichepedag
        },

},
    {
        initialRouteName: "FichePedag",
        defaultNavigationOptions: {
            header: null
        }
    })

export default createAppContainer(FichePedagNavigator)
