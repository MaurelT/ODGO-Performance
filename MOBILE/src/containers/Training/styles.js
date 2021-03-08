import {StyleSheet, Dimensions, StatusBar} from 'react-native';
import colors from '../../configs/colors';
import statusBarHeight from '../../configs/screen';


const screen = Dimensions.get("window");
const SBHelight = statusBarHeight;
const screenWidth = screen.width
const screenHeight = screen.height - SBHelight

const styles = StyleSheet.create({
    scrollView: {
        backgroundColor: colors.balck + "00"
    },
    contentContainerStyle: {
        // minHeight: (screenHeight - 130),
        minWidth: screenWidth
    },
    btnCtn: {
        width: screenWidth,
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        flex: 1
    },
    ctnMenu: {
        borderWidth: 1,
        borderColor: colors.white,
        borderRadius: 5,
        flexDirection: "row",
        padding: 30,
        alignItems: "center",
        justifyContent: "space-between",
        width: (screenWidth - 30),
        marginTop: 15,
        marginBottom: 15
    },
    btnMenuText: {
        color: colors.white
    }
})

export default styles