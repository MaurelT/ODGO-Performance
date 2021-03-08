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
    anneePicker:{
        marginTop:2,paddingHorizontal:30, backgroundColor:colors.red, marginHorizontal:4, paddingVertical:4,color:'white'
    },
    headCtn: {
        padding: 15
    },
    noSelectedCtn: {
        width: screenWidth,
        alignItems: "center"
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
    goToNowCtn: {
        paddingLeft: 20,
        paddingRight: 20,
        width: screenWidth,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-evenly",
        paddingTop: 10
    },
})

export default styles
