import {StyleSheet, Dimensions, StatusBar} from 'react-native';
import colors from '../../configs/colors';
import statusBarHeight from '../../configs/screen';


const screen = Dimensions.get("window");
const SBHelight = statusBarHeight;
const screenWidth = screen.width
const screenHeight = screen.height - SBHelight

const styles = StyleSheet.create({
    contentContainerStyle: {
        // minHeight: (screenHeight - 130),
        flex: 1,
        minWidth: screenWidth,
        justifyContent: "center"
    },
    linearGradient: {
        minHeight: (screenHeight - 130),
        maxHeight: (screenHeight - 130),
        height: (screenHeight - 130)
    },
    btnCtn: {
        width: screenWidth,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-evenly",
        flex: 1
    },
    imageBG: {
        width: "100%",
        height: "100%"
    }
})

export default styles