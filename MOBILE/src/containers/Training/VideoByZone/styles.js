import { StyleSheet, Dimensions, StatusBar } from 'react-native';
import colors from '../../../configs/colors';
import statusBarHeight from '../../../configs/screen';

const screen = Dimensions.get("window");
const SBHelight = statusBarHeight;
const screenWidth = screen.width
const screenHeight = screen.height - SBHelight

const styles = StyleSheet.create({
    contentContainerStyle: {
        alignItems: "flex-start",
        paddingBottom: 50
    },
    headCtn: {
        padding: 15
    },
    noSelectedCtn: {
        width: screenWidth,
        alignItems: "center",
        justifyContent: "center",
        // backgroundColor: colors.green
    },
    headerCtn: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        minWidth: screenWidth,
        paddingLeft: 15,
        paddingRight: 15
    },
    videoItemCtn: {
        width: screenWidth - 40,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
        borderBottomColor: colors.white + "A5",
        borderBottomWidth: 0.4,
        paddingTop: 10,
        paddingBottom: 10
    },
    videoItemCtnLast: {
        borderBottomColor: colors.white + "00",
    },
    rateCtn: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        marginRight: 10
    },
    rateStar: {
        margin: 1
    },
    arrowRightIcon: {
        position: "absolute",
        right: 0,
        top: "50%",
    }
})

export default styles