import { createStackNavigator, createAppContainer, createSwitchNavigator } from "react-navigation";
import CompteurNutritionnel from "./compteurNutritionnel";

import AjoutAliment from "./Aliment/ajoutAliment";
import Petitdejeuner from "./Aliment/Petitdejeuner";
import PetitdejeunerNew from "./newaliment/PetitdejeunerNew";
import Selectionnermesrepas from "./Aliment/SelectionnerMesRepas";
import Selectionnermesrepasbis from "./Aliment/SelectionnerMesRepas";
import CreerRepas from "./Aliment/CreerRepas";
import MesRepasItem from "./Aliment/MesRepasItem";
import MesProduits_NosSuggesstion_Item from "./Aliment/MesProduits_NosSuggesstion_Item";
import itemAlimentForAdd from "./Aliment/ItemAlimentForAdd";
import itemAlimentForEdit from "./Aliment/ItemAlimentForEdit";

const CompteurNutritionnels = createStackNavigator({
        CompteurNutritionnels: {
        screen: CompteurNutritionnel
    },
    AjoutAliment: {
        screen: AjoutAliment
    },
        Petitdejeuner: {
            screen: Petitdejeuner
       },
        Selectionnermesrepas: {
            screen: Selectionnermesrepas
        },
        Selectionnermesrepasbis: {
            screen: Selectionnermesrepasbis
        },
        CreerRepas: {
            screen: CreerRepas
        },
        MesRepasItem: {
            screen: MesRepasItem
        },
        MesProduits_NosSuggesstion_Item:{
            screen: MesProduits_NosSuggesstion_Item
        },
        itemAlimentForAdd:{
            screen: itemAlimentForAdd
        },
        itemAlimentForEdit:{
            screen: itemAlimentForEdit
        },
        PetitdejeunerNew:{
            screen: PetitdejeunerNew
        },
},
    {
        initialRouteName: "CompteurNutritionnels",
        defaultNavigationOptions: {
            header: null
        }
    })



export default createAppContainer(CompteurNutritionnels)
