import {StyleSheet, Dimensions, StatusBar} from 'react-native';
import colors from '../../../../configs/colors';
import statusBarHeight from '../../../../configs/screen';


const screen = Dimensions.get('screen');
const SBHelight = statusBarHeight;
const screenWidth = screen.width
const screenHeight = screen.height - SBHelight

const styles = StyleSheet.create(
{


    scrollView: {
        backgroundColor: colors.balck + "00"
    },
    contentContainerStyle: {
        // minHeight: (screenHeight - 130),
        minWidth: screenWidth,
        backgroundColor: colors.balck + "00",
        alignItems:"center",
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
        borderRadius: 10,
        flexDirection: "row",
        padding: 30,
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
        right: 30
    },
    iconBtn: {
        marginRight: 20,
    },
    bodyActivitesProgram:
    {
        alignItems:"center",
        width:"100%",
        paddingLeft:screenWidth*0.05,
        paddingRight:screenWidth*0.05,
        marginTop:screenHeight*0.03,

    },
    textDescription:
    {
        color:colors.white,
        fontSize:14,
        marginLeft:screenWidth*0.08,
        marginRight:screenWidth*0.08,
        marginBottom:screenHeight*0.02,
        textAlign:"center",
    },
    panelListProgram:
    {
       height:screenHeight*0.4,
       paddingLeft:'2%',
       paddingRight:'2%',
       paddingTop:'2%',
       marginBottom:screenHeight*0.02,

       /*position:"absolute",
       zIndex:10,*/
       width:'100%',

      /*  maxHeight:screenHeight*0.3,
        width:"100%",
        backgroundColor:"blue" ,
        padding:0,*/


       /* zIndex:3,
        bottom: (heightScreen*0.07)+(heightScreen*0.01)+1,
        paddingLeft:widthScreen*0.02,
        paddingTop:heightScreen*0.02,
        paddingRight:widthScreen*0.02,*/

    },
    itemProgramAct:
    {
        height:screenHeight*0.15,
        width:"100%"
    },
    boxProgram:
    {
        height:screenHeight*0.1,
        width:screenWidth*0.76,
        flexDirection:"row",
        marginLeft:screenWidth*0.1,
        padding:screenWidth*0.01,
    },
    titleActivitesProg:
    {
        color:colors.white,
        fontSize:12,
        fontWeight:"bold",

    },
    panelmodifSupAct:
    {
        flex:1,
        flexDirection:"row",
        justifyContent:"flex-end",
        alignItems:"center",
        height:screenHeight*0.03,
    },

    panelHeure:
    {
        flexDirection:"row",
        alignItems:"center",
    },
    textHeure:
    {
        color:colors.white,
        fontSize:10,
    },
    barrHeure:
    {
        width:"100%",
        backgroundColor:colors.white,
        height:screenHeight*0.0005,
        marginLeft:screenHeight*0.02,
    },


    btnAddActivites:
    {
        color:colors.white,
        width:"100%",
        backgroundColor:colors.red,
        alignItems:"center",
        justifyContent:"center",
        marginBottom:screenHeight*0.017,
        height:screenHeight*0.038,
    },
    textAddActivites:
    {
        color:colors.white,
        fontSize:12,
    },
    panelListActivites:
    {
        flexDirection:"row",
    },
    rowBoxActivites:{
        width:screenWidth*0.2,
        height:screenWidth*0.2,
        alignItems:"center",
        justifyContent:"center",
        margin:screenWidth*0.013,
        borderRadius:screenWidth*0.02,
    },
    textActivites:
    {
        color:colors.white,
        fontSize:11,
    }
})

export default styles
