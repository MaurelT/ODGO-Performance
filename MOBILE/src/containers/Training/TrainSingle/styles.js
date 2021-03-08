import { StyleSheet, Dimensions, StatusBar } from 'react-native';
import colors from '../../../configs/colors';
import statusBarHeight from '../../../configs/screen';

const screen = Dimensions.get("window");
const SBHelight = statusBarHeight;
const screenWidth = screen.width
const screenHeight = screen.height - SBHelight

const styles = StyleSheet.create({
    contentContainerStyle: {
        minHeight: (screenHeight - 130),
        minWidth: screenWidth,
        paddingBottom: 50,
        alignItems: "center"
    },
    headCtn: {
        padding: 15,
        alignItems: "center",
        justifyContent: "center"
    },
    noSelectedCtn: {
        width: screenWidth,
        alignItems: "center"
    },
    headerCtn: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
        minWidth: screenWidth - 30,
        maxWidth: screenWidth - 30,
        paddingLeft: 0,
        paddingRight: 0
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
        height: 50,
        backgroundColor: colors.balck + "00"
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
        margin: 0,
        transform: [
            {translateY: -5}
        ]
    },
    sliderOptionMarkValued: {
        backgroundColor: colors.red,
    },
    
})

export default styles