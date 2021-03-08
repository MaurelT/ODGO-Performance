import {StyleSheet, Dimensions, StatusBar} from 'react-native';
import colors from '../../configs/colors';
import statusBarHeight from '../../configs/screen';


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
        minWidth: screenWidth
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
        borderRadius: 5,
        flexDirection: "row",
        padding: 30,
        alignItems: "center",
        justifyContent: "space-between",
        width: (screenWidth - 30),
        marginTop: 15,
        marginBottom: 15
    },
    btnMenuText: {
        color: colors.white
    },
    outerProgress: {
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
        fontSize: 30,
        fontWeight: "bold",
        color:"#fff"
    },
})

export default styles