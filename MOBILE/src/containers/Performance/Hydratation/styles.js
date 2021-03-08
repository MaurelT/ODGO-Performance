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
        paddingBottom: screenHeight*0.07,
    },
    block: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    bgImage: {
        position: "absolute",
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
    },
    headCtn: {
        padding: 15
    },
    noSelectedCtn: {
        width: screenWidth,
        alignItems: "center"
    },
    
    headerCtn: {
        alignItems: "center",
        marginTop:0,
        minWidth: screenWidth,
        paddingLeft: 15,
        paddingRight: 15
    },
    bodyHydratation:
    {
        flex:1,
        alignItems:"center",
        marginTop:screenHeight*0.055,
    },
    hydrateElem: {
        width: (screenWidth - 60) / 3,
        height: (screenHeight*0.08),
        borderWidth: 0.5,
        // borderColor: colors.white,
        // borderRadius: 10,
        alignItems: "center",
        // marginLeft:screenWidth*0.01,
        // marginRight:screenWidth*0.01,
        flexDirection:"row",
        justifyContent:"center"
        // justifyContent: "flex-end"
    },
    headTitreOjectif:
    {
        // backgroundColor:colors.red,
        alignItems:"center",
        justifyContent:"center",
        width:screenWidth*0.85,
        // borderRadius:screenWidth*0.05,
        // height:screenHeight*0.045,
    },
    textObectif:
    {
        color: colors.white,
        fontSize: 14,
    } ,
    panelrowChoix:
    {
        flexDirection:"row"
    },
    rowChoix:
    {
        flex:0.3,
        backgroundColor:"red",
    },
    textMettre_a_jrs:
    {
        color:colors.white,
        fontSize:12,
        marginTop:screenHeight*0.05,
    },
    panelIncreDecreHydratation:
    {
        flexDirection:"row",
        alignItems:"center",
        marginTop:screenHeight*0.03,
    },
    textBtnHydrat:
    {
        fontSize:16,
        color:colors.white,
    },
    btnHydrat:
    {
        alignItems:"center",
        justifyContent:"center",
        width:screenWidth*0.08,
        height:screenWidth*0.08,
        borderRadius:(screenWidth*0.08)/2,
        borderWidth:0.5,
        borderColor:colors.white,
    },
    nbrsVerres:
    {
        marginLeft:screenWidth*0.075,
        marginRight:screenWidth*0.075,
        color:colors.white,
        fontSize:14,
    }
})

export default styles