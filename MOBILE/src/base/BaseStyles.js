import { StyleSheet, Dimensions, StatusBar } from 'react-native';
import colors from '../configs/colors';
import statusBarHeight from '../configs/screen';

const screen = Dimensions.get("window");
const SBHelight = statusBarHeight;
const screenWidth = screen.width
const screenHeight = screen.height - SBHelight

const baseStyles = StyleSheet.create({
    linearGradient: {
        // minHeight: (screenHeight - 130),
        // maxHeight: (screenHeight - 130),
        flex: 1,
        alignItems: "center",

    },
    odgoTextTitle: {
        color: colors.white,
        fontStyle: "italic",
        fontWeight: "bold",
        fontSize: 40
    },
    odgoDot: {
        width: 10,
        height: 10,
        borderRadius: 7,
        backgroundColor: colors.red,
        margin: 5,
        marginTop: 7
    },
    loginHeader: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center"
    },
    textColorWhite: {
        color: colors.white
    },
    verticalCenter: {
        alignItems: "center"
    },
    titleText: {
        color: colors.white,
        fontSize: 20
    },
    textColorGrey: {
        color: 'grey',
        textAlign:"right",
    },
})

export default baseStyles
