import { createStackNavigator, createAppContainer } from "react-navigation";
import Declarer from "./Declarer";
import DeclarerCompetition from "../DonneesPerso/DeclarerCompetition";
import DeclarerMatch from "../DonneesPerso/DeclarerMatch";
import CompteurNutritionnel from '../../Nutrition/compteurNutritionnel';


const DeclareNavigator = createStackNavigator({
    Declarer: {
        screen: Declarer
    },
    DeclarerMatch: {
        screen: DeclarerMatch
    },
    DeclarerCompetition: {
        screen: DeclarerCompetition
    },
    // CompteurNutritionnel: {
    //     screen: CompteurNutritionnel
    // }
},
{
    initialRouteName: "Declarer",
    defaultNavigationOptions: {
        header: null
    }
})

export default createAppContainer(DeclareNavigator)
