import {StyleSheet, Dimensions, StatusBar} from 'react-native';
import colors from '../../../../configs/colors';
import statusBarHeight from '../../../../configs/screen';


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
    bodyMasemaine:
    {
        alignItems:"center",
        width:"100%",
        paddingLeft:screenWidth*0.05,
        paddingRight:screenWidth*0.05,
    },
    textDescription:
    {
        color:colors.white,
        fontSize:13,
        marginLeft:screenWidth*0.05,
        marginRight:screenWidth*0.05,
        textAlign:"center",
    },
    labeljrsSemaine:
    {
        alignItems:"center",
        justifyContent:"center",
        width:screenWidth*0.12,
        height:screenWidth*0.06,
    },
    amBoxjrsSemaine:
    {
        alignItems:"center",
        width:screenWidth*0.12,
        minHeight:screenWidth*0.2,
        paddingTop:screenHeight*0.011,
        // paddingBottom:screenHeight*0.011,

    },
    barrActivities:
    {
        width:screenWidth*0.1,
        marginTop:screenHeight*0.008,
        height:screenHeight*0.013,
    },
    barrActivitiesRemplis:
    {
        width:screenWidth*0.1,
        marginTop:screenHeight*0.008,
        height:screenWidth*0.15,
    },
    txtjrsSemaine:
    {
        color:colors.white,
        fontSize:12,
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
        width:screenWidth*0.25,
        height:screenWidth*0.2,

        alignItems:"center",
        justifyContent:"center",
        margin:screenWidth*0.013,
        borderRadius:screenWidth*0.02, //le draggable amban ty
    },
    textActivites:
    {
        color:colors.white,
        fontSize:11,
    }
})

export default styles
