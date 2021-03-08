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
        paddingBottom: 50
    },

    noSelectedCtn: {
        width: screenWidth,
        alignItems: "center"
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
        // marginBottom: 50
    },
    btnMonProfil: {
        borderColor: '#fff',
        borderWidth: 1,
    },

    sliderCtn: {
        width: (screenWidth - 30),
        paddingTop: screenHeight*0.01,
        paddingBottom: screenHeight*0.01,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    sliderTensionLabelG: {
        width: screenWidth*0.6,
    },
    sliderTensionLabelD: {
        width: screenWidth*0.3,
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
    },
    noSelectedBtn: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
    },
    containerTitle:{
        flexDirection: 'row',
        alignSelf:'flex-start',
    },
    imgTitle:{
        alignSelf:'center',
        marginRight: screenWidth*0.02,
    },
    separator:{
        width: screenWidth-25,
        height:1,
        backgroundColor: 'grey',
        marginTop: 30,
        marginBottom: 30,
    },
    // headCtn: {
    //     flexDirection: "column",
    //     alignItems: "center",
    //     justifyContent: "space-around",
    //     marginBottom: 15
    // },
    menuText: {
        color: colors.white
    },
    headCtn: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-evenly",
        marginBottom: 15,
        padding: 15

    },
    headMenu: {
        alignItems: "center",
        justifyContent: "center",
        // width: ((screenWidth - 30) * 2) / 5,
        width: screenWidth *0.4,
        backgroundColor: colors.red + "00",
        padding: 10
    },
    activeMenu: {
        width: "60%",
        height: 3,
        backgroundColor: colors.red,
        marginTop: 3
    },
})

export default styles
