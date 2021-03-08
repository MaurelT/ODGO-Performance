import { createStackNavigator, createAppContainer } from "react-navigation";
import Sante from "./Sante";
import Pathologie from "./Pathologie/Pathologie";
import AddBlessure from "./AddBlessure/AddBlessure";
import AddTension from "./AddTension/AddTension";
import MyBody from "./MyBody/MyBody";

const SanteNavigator = createStackNavigator({
    Sante: {
        screen: Sante
    },
    Pathologie: {
        screen: Pathologie
    },
    AddBlessure: {
        screen: AddBlessure
    },
    AddTension: {
        screen: AddTension
    },
    MyBody: {
        screen: MyBody
    }
},
{
    initialRouteName: "Sante",
    defaultNavigationOptions: {
        header: null
    }
})

export default createAppContainer(SanteNavigator)