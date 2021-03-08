import {StyleSheet, Dimensions, StatusBar} from 'react-native';
import colors from '../../configs/colors';
import statusBarHeight from '../../configs/screen';


const screen = Dimensions.get("window");
const SBHelight = statusBarHeight;
const screenWidth = screen.width
const screenHeight = screen.height - SBHelight

const styles = StyleSheet.create({
    scrollView: {
        backgroundColor: colors.balck + "00",
        minHeight: (screenHeight - 130),
        height: (screenHeight - 130),
        maxHeight: (screenHeight - 130),
    },
    contentContainerStyle: {
        minHeight: (screenHeight - 130),
        minWidth: screenWidth,
        alignItems: "center",
        paddingBottom: 50,
    },
    linearGradient: {},
    linearGradientOvelay: {
        minHeight: "100%",
        maxHeight: "100%",
        alignItems: "center",
    },
    imageBG: {
        width: screenWidth,
        height: screenHeight / 3
    },
    goToNowCtn: {
        paddingLeft: 20,
        paddingRight: 20,
        width: screenWidth,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-evenly",
        paddingTop: 16
    },
    statCtn: {
        backgroundColor: colors.red + "00",
        marginTop: -((screenWidth - 60) / 4)
    },
    statMeterCtn: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-evenly"
    },
    outerProgress: {
        // borderWidth: 4,
        // borderColor: colors.white,
        // backgroundColor: colors.white,
        elevation: 8,
        shadowOffset: {width: 0, height: 2},
        shadowColor: colors.white,
        shadowRadius: (screenWidth - 60) / 3,
        shadowOpacity: 0.8,
        borderRadius: (screenWidth - 60) / 3,
        margin: 4
    },
    innerProgress: {
        alignItems: "center",
        height: "100%",
        justifyContent: "space-evenly"
    },
    textBold: {
        fontSize: 22,
        fontWeight: "bold",
        color:"#fff"
    },
    mesureText: {
        fontSize: 7,
        color:"#fff"
    },
    qtText: {
        fontSize: 8.2,
        color:"#fff"
    },
    valueCtn: {
        alignItems: "center"
    },
    indiceCtn: {
        width: (screenWidth - 60),
        // height: 60,
        padding: 15,
        borderRadius: 7
    },
    indiceText: {
        color: colors.white,
        fontSize: 12
    },
    progressBlock: {
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginTop: 10
    },
    progressCtn: {
        width: "80%",
        height: 10,
        backgroundColor: colors.white + "56",
        borderRadius: 10
    },
    progressValue: {
        height: 10,
        borderRadius: 10
    },
    bottomBlock: {
        flexDirection: "row",
        justifyContent:"space-around",
        marginTop: 30,
    },
    bottomCol: {
        // flex: 1,
        width:screenWidth*0.5,
        alignItems: "center",
        height: 200,
    },
    colTitle: {
        color: colors.white
    },
    menubtctn: {
        width: screenWidth*0.35,
        // alignSelf:"center"
    },
    routMenu: {
        // backgroundColor: colors.white,
        width: "100%",
        flexDirection: "row",
        // alignItems: "center",
        marginTop: 0
    },
    roudPlayRed: {
        width: 20,
        height: 20,
        borderRadius: 20,
        backgroundColor: colors.red,
        alignItems: "center",
        justifyContent: "center",

    },
    routText: {
        color: colors.white,
        fontSize: 12,
        marginLeft: 10,
        // alignSelf:"center"
    },
    leftCol: {
        flexDirection: "row",
        flex: 1,
        width: "100%",
        height: "100%",
        padding: 5,
        paddingLeft: 16,
        marginTop: 15,
        // backgroundColor: colors.green
    },
    rightCol: {
        justifyContent: "space-between",
        padding:5,
        // paddingLeft: 10,
        marginTop: 15,
        height: 150,
        // backgroundColor: colors.green
    },
    leftIconCtn: {
        justifyContent: "space-between",
        alignItems:'center',
        paddingLeft: 10,
        height: 150
    },
    dotRed: {
        width: 10,
        height: 10,
        backgroundColor: colors.red,
        borderRadius: 10,
        justifyContent: "space-between"
    },
    barRed: {
        position: "absolute",
        top: 0,
        width: 4,
        left: 13,
        height: "100%",
        backgroundColor: colors.red,
        borderRadius: 10
    },
    fichepedagBtn: {
        marginTop: 20
    }
})

export default styles
