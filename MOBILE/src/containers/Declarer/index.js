import { createStackNavigator, createAppContainer } from "react-navigation";
import Declarer from "./Declarer";
import DeclarerCompetition from "../Dashboard/DonneesPerso/DeclarerCompetition";
import DeclarerMatch from "../Dashboard/DonneesPerso/DeclarerMatch";

const DeclareNavigator = createStackNavigator({
    Declarer: {
        screen: Declarer
    },
    DeclarerMatch: {
        screen: DeclarerMatch
    },
    DeclarerCompetition: {
        screen: DeclarerCompetition
    }
},
{
    initialRouteName: "Declarer",
    defaultNavigationOptions: {
        header: null
    }
})

export default createAppContainer(DeclareNavigator)