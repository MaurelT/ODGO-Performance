import { createStackNavigator, createAppContainer, createSwitchNavigator } from "react-navigation";
import LogedinNavigator from "./LogedInNavigator";
import LogedoutNavigator from "./LogedOutNavigator";
import Authloading from "../containers/Authloading/Authloading";

const AppNavigator = createSwitchNavigator({
    Authloading: {
        screen: Authloading
    },
    LogedinNavigator: {
        screen: LogedinNavigator
    },
    LogedoutNavigator: {
        screen: LogedoutNavigator
    }

},{
    initialRouteName: "Authloading",
    defaultNavigationOptions: {
        header: null
    }
})

const AppContainer = createAppContainer(AppNavigator)

export default AppContainer
