import { createStackNavigator } from "react-navigation";
import Login from "../containers/Login/Login";
import MdpOublier from "../containers/Login/MpdOublier";

const LogedoutNavigator = createStackNavigator({
    Login: {
        screen: Login
    },
    MdpOublier: {
        screen: MdpOublier
    }
},{
    initialRouteName: "Login",
    defaultNavigationOptions: {
        header: null
    }
})

export default LogedoutNavigator