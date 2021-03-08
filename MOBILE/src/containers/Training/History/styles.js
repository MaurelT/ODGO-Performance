import { StyleSheet, Dimensions, StatusBar } from 'react-native';
import colors from '../../../configs/colors';
import statusBarHeight from '../../../configs/screen';

const screen = Dimensions.get('screen');
const SBHelight = statusBarHeight;
const screenWidth = screen.width
const screenHeight = screen.height - SBHelight

const styles = StyleSheet.create({
    linearGradient: {
        minHeight: (screenHeight - 130),
        maxHeight: (screenHeight - 130),
        alignItems: "center",
    },
    contentContainerStyle: {
        minHeight: (screenHeight - 130),
        minWidth: screenWidth,
        paddingBottom: 85
    },
    titleText: {
        color: colors.white,
        fontSize: 19
    },
    headCtn: {
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-evenly",
        marginBottom: 15
    },
    blockTitle: {
        color: colors.white,
        fontSize: 12
    },
    blockCtn: {
        padding: 20,
        paddingTop: 0
    },
    blockStory: {
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        marginTop: 0
    },
    trainButton: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
        width: (screenWidth - 48),
        borderWidth: 1,
        borderColor: colors.white,
        padding: 0,
        borderRadius: 5,
        height: 50,
        marginTop: 15
    },
    dateBG: {
        width: 0,
        height: 0,
        borderLeftWidth: 100,
        borderLeftColor: colors.red,
        borderTopWidth: 50,
        borderTopColor: colors.red,
        borderRightWidth: 25,
        borderRightColor: colors.white + "00",
        marginLeft: -1,
        borderTopLeftRadius: 5,
        borderBottomLeftRadius: 5
    },
    dateCtn: {
        width: 100,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: colors.balck + "00",
        marginLeft: -100,
        marginTop: -50
    },
    trainBtnText: {
        color: colors.white
    },
    blockSeparator: {
        width: (screenWidth - 40),
        height: 1,
        backgroundColor: colors.white + "A5",
        marginTop: 20
    },
    trainTitlectn: {
        paddingLeft: 15
    }
})

export default styles