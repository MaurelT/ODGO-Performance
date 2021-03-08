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
        paddingBottom: 50
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
    arrowRightIcon: {
        position: "absolute",
        right: 0,
        top: "50%",
    }
})

export default styles