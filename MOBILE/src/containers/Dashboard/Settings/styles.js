import {StyleSheet, Dimensions, StatusBar} from 'react-native';
import colors from '../../../configs/colors';
import statusBarHeight from '../../../configs/screen';


const screen = Dimensions.get('screen');
const SBHelight = statusBarHeight;
const screenWidth = screen.width
const screenHeight = screen.height - SBHelight

const styles = StyleSheet.create({
    scrollView: {
        backgroundColor: colors.balck + "00"
    },
    contentContainerStyle: {
        // minHeight: (screenHeight - 130),
        minWidth: screenWidth,
        paddingBottom: 50
    },
    btnCtn: {
        width: screenWidth,
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        flex: 1
    },
    ctnMenu: {
        borderBottomWidth: 0.5,
        borderBottomColor: colors.white + "88",
        borderRadius: 0,
        flexDirection: "row",
        padding: 15,
        paddingLeft: 0,
        paddingRight: 0,
        alignItems: "center",
        justifyContent: "flex-start",
        width: (screenWidth - 30),
        marginTop: 5,
        marginBottom: 5
    },
    btnMenuText: {
        color: colors.white
    },
    indiceCtn: {
        width: (screenWidth - 60),
        padding: 15,
        borderRadius: 7
    },
    iconArrow: {
        position: "absolute",
        right: 0
    },
    iconBtn: {
        marginRight: 20,
    },
})

export default styles