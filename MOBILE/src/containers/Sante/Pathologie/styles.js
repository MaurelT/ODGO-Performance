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
        // minHeight: (screenHeight - 130)
        // height: 200,
    },
    // headCtn: {
    //     flexDirection: "column",
    //     alignItems: "center",
    //     justifyContent: "space-evenly",
    //     marginBottom: 15
    // },
    menuText: {
        color: colors.white
    },
    headCtn: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-evenly",
        marginBottom: 15
    },
    headMenu: {
        alignItems: "center",
        justifyContent: "center",
        width: (screenWidth - 30) / 2,
        backgroundColor: colors.red + "00",
        padding: 5
    },
    activeMenu: {
        width: "60%",
        height: 3,
        backgroundColor: colors.red,
        marginTop: 3
    },
    navHeader: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around",
        width: screenWidth / 2,
        paddingBottom: 5
    },
    btnAdd: {
        // position: "absolute",
        // bottom: 50
        marginBottom: 50
    },
    anneePicker:{
        marginTop:2,paddingHorizontal:30, backgroundColor:colors.red, marginHorizontal:4, paddingVertical:4,color:'white'
    }
})

export default styles
