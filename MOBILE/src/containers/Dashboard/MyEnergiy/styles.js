import {StyleSheet, Dimensions, StatusBar} from 'react-native';
import colors from '../../../configs/colors';
import statusBarHeight from '../../../configs/screen';


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
        paddingBottom: 80
    },

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
        width: ((screenWidth - 30) * 2) / 5,
        backgroundColor: colors.red + "00",
        padding: 10
    },
    activeMenu: {
        width: "60%",
        height: 3,
        backgroundColor: colors.red,
        marginTop: 3
    },
    hydrateElem: {
        width: (screenWidth - 60) / 3,
        height: (screenWidth - 60) / 3,
        borderWidth: 1,
        borderColor: colors.white,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "flex-end"
    },
    nutritionElem: {
        width: (screenWidth - 70) / 3,
        height: screenHeight *0.45,
        borderWidth: 1,
        borderColor: colors.white,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center"
    }
})

export default styles
