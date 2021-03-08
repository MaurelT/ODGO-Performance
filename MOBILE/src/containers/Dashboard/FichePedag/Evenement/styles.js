import { StyleSheet, Dimensions, StatusBar } from 'react-native';
import colors from '../../../../configs/colors';
import statusBarHeight from '../../../../configs/screen';

const screen = Dimensions.get("window");
const SBHelight = statusBarHeight;
const screenWidth = screen.width
const screenHeight = screen.height - SBHelight

const styles = StyleSheet.create({
    panelEvent:
    {
        top:0,
        left:0,
        right:0,
        bottom:0,
        position:"absolute",
        flex:1,
        zIndex:20,
        alignItems:"center",
        backgroundColor:"rgba(0,0,0,0.5)",

    },
    bodyEvenent:
    {
       /* marginRight:screenWidth*0.15,
        marginLeft:screenWidth*0.15,*/
    },
    linearGradient: {

        maxHeight: (screenHeight - 130),
        width:screenWidth*0.85,
        alignItems: "center",

    },
    contentContainerStyle: {
        minHeight: (screenHeight - 130),
        minWidth: screenWidth,
        paddingBottom: 0,
        alignItems:"center",
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
    btnActivitesProgram:
    {
        backgroundColor:colors.bleubox,
        width:screenWidth*0.29,
        height:screenHeight*0.06,
        borderRadius:screenHeight*0.01,
        alignItems:"center",
        justifyContent:"center",
        marginTop:screenHeight*0.02,
        marginBottom:screenHeight*0.05,
    },
    textbtnActivitesProgram:
    {
        fontSize:17,
        color:colors.white,

    },
    bodyEvent:
    {
        alignItems:"center",
        flex:1,
    },
    textSelectHoraire:
    {
        color:colors.white,
        fontSize:15,
        marginBottom:screenHeight*0.035
    },
    panelHeure:
    {
        flexDirection:"row",
    },
    contentHMn:
    {
        width:screenHeight*0.1,
        height:screenHeight*0.1,
        alignItems:"center",
        justifyContent:"center",
    },
    panelHMn:
    {
        flex:1,
       /* alignItems:"center",
        justifyContent:"center",*/
    },
    heureMn:
    {
        fontSize:48,
        color:colors.white,
    },
    heureMnSeparateur:
    {
        fontSize:48,
        color:colors.white,
        marginLeft:screenWidth*0.03,
        marginRight:screenWidth*0.03,
    },
    btnValider:
    {
        backgroundColor:colors.red,
        width:screenWidth*0.43,
        height:screenHeight*0.069,
        alignItems:"center",
        justifyContent:"center",
        borderRadius:screenHeight*0.03,
        marginTop:screenHeight*0.03,

    },
    textbtnValider:
    {
        fontSize:16,
        color:colors.white,
    },
    anneePicker:{
        marginTop:2,paddingHorizontal:30, backgroundColor:colors.red, marginHorizontal:4, paddingVertical:4,color:'white'
    }

})

export default styles
