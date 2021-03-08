import { StyleSheet, Dimensions, StatusBar } from 'react-native';
import colors from '../../../configs/colors';
import statusBarHeight from '../../../configs/screen';

const screen = Dimensions.get("window");
const SBHelight = statusBarHeight;
const screenWidth = screen.width
const screenHeight = screen.height - SBHelight

const styles = StyleSheet.create({
    contentContainerStyle: {
        alignItems: "center",
    },
    headCtn: {
        padding: 15
    },
    noSelectedCtn: {
        width: screenWidth,
        alignItems: "center"
    },
    zoneItem: {
        width: screenWidth,
        padding: 10,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        borderBottomColor: colors.white + "77",
        borderBottomWidth: 1,
    },
    inputBlock: {
        width: (screenWidth - 30),
        paddingTop: 15,
        paddingBottom: 15,
        borderBottomColor: colors.white + "AA",
        borderBottomWidth: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    lastInputBlock: {
        borderBottomColor: colors.white + "00",
        borderBottomWidth: 1
    },
    inputTxt: {
        padding: 0,
        margin: 0
    },
    btnValidate: {
        marginBottom: 50
    },

    sliderCtn: {
        width: (screenWidth - 30),
    },
    sliderTensionLabel: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingLeft: 10,
        paddingRight: 10
    },
    sliderView: {
        width: (screenWidth - 30),
    },
    markerCtn: {
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        height: "100%",
        position: "absolute",
        backgroundColor: colors.green + "00",
        paddingLeft: 0,
        paddingRight: 0
    },
    sliderOptionMark: {
        width: 5,
        height: 10,
        backgroundColor: "#A5A5A5",
        margin: 0
    },
    sliderOptionMarkValued: {
        backgroundColor: colors.red,
    }
})

export default styles