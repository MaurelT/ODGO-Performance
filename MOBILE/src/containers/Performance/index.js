import { createStackNavigator, createAppContainer } from "react-navigation";
import Statistic from "./Statistic/Statistic";
import StatEnergy from "./Statistic/StatEnergy";
import StatSport from "./Statistic/StatSport";
import Performance from "./Performance";
import Hydratation from "./Hydratation/Hydratation";
import Sommeil from "./Statistic/Energetique/sommeil";
import TempsDeJeu from "./Statistic/Sportives/tempsDeJeu";
import HistoriqueCompetition from "../Performance/HistoriqueCompetition"
import CalendarWithPlugin from "../CalendarWithPlugin/CalendarWithPlugin"
import CalendarWithPluginCompetition from "../CalendarWithPlugin/CalendarWithPluginCompetition"
import ActiviteProgrammes from "../Dashboard/FichePedag/ActiviteProgrammes/ActiviteProgrammes"
import ListeCompetition from "../Performance/Listecompetition"


const PerfoNavigator = createStackNavigator({
    Statistic: {
        screen: Statistic
    },
    StatEnergy: {
        screen: StatEnergy
    },
    StatSport: {
        screen: StatSport
    },
    Performance: {
        screen: Performance
    },
    Sommeil: {
        screen: Sommeil
    },
    TempsDeJeu: {
        screen: TempsDeJeu
    },
     Hydratation: {
        screen: Hydratation
    },
    HistoriqueCompetition: {
        screen: HistoriqueCompetition
    },
        ListeCompetition:{
            screen:ListeCompetition
        },
        CalendarWithPluginCompetition:{
        screen:CalendarWithPluginCompetition
        },
    CalendarWithPlugin:{
    screen:CalendarWithPlugin
},
        ActiviteProgrammes:{
        screen:ActiviteProgrammes
        }

},
{
    initialRouteName: "Performance",
    defaultNavigationOptions: {
        header: null
    }
})

export default createAppContainer(PerfoNavigator)
