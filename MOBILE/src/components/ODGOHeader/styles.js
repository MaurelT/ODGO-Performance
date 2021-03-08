import { StyleSheet, Dimensions, StatusBar } from 'react-native';
import colors from '../../configs/colors';
import statusBarHeight from '../../configs/screen';

const screen = Dimensions.get('screen');
const SBHelight = statusBarHeight;
const screenWidth = screen.width
const screenHeight = screen.height - SBHelight

const styles = StyleSheet.create({
    ODGOHeaderCtn: {
        padding: 0,
        paddingRight: 15,
        paddingLeft: 15,
        marginTop: 0,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: colors.balck,
        // flex: 1,
        minHeight: 80,
        maxHeight: 80,
    },
    headerCtn: {
        flexDirection: "column",
        width: screenWidth,
    },
    isFichePedag: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        width: screenWidth
    },
    barPagingCtn: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        flex: 1
    },
    outRoundSelected: {
        padding: 2,
        borderWidth: 1.3,
        borderColor: colors.red,
        margin: 3,
        borderRadius: 50
    },
    outRound: {
        alignItems: "center",
        justifyContent: "center"
    },
    inRoundSelected: {
        width: 10,
        height: 10,
        borderRadius: 10,
        backgroundColor: colors.red,
        margin: 3
    },
    inRound: {
        width: 10,
        height: 10,
        borderRadius: 10,
        backgroundColor: colors.white,
        margin: 3
    },
    barPassed: {
        width: 35,
        height: 4,
        borderRadius: 5,
        backgroundColor: colors.red
    },
    barWhite: {
        width: 35,
        height: 4,
        borderRadius: 5,
        backgroundColor: colors.white
    }
})

export default styles