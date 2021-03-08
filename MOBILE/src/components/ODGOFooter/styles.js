import { StyleSheet, Dimensions, StatusBar } from 'react-native';
import colors from '../../configs/colors';
import statusBarHeight from '../../configs/screen';

const screen = Dimensions.get("window");
const SBHelight = statusBarHeight;
const screenWidth = screen.width
const screenHeight = screen.height - SBHelight

const styles = StyleSheet.create({
    footerCtn: {
        // flex: 1,
        minHeight: 50,
        maxHeight: 50,
        flexDirection: "row",
        alignItems: "flex-end",
        justifyContent: "space-evenly",
        backgroundColor: colors.footerBG,
    },
    tabElem: {
        alignItems: "center",
        justifyContent: "center",
        width: screenWidth / 5
    },
    tabText: {
        color: colors.white,
        fontSize: 9
    },
    tabTextACtive: {
        color: colors.red,
        fontSize: 9
    }
})

export default styles
