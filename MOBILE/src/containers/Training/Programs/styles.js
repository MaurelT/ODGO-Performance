import { StyleSheet, Dimensions, StatusBar } from 'react-native';
import colors from '../../../configs/colors';
import statusBarHeight from '../../../configs/screen';

const screen = Dimensions.get('screen');
const SBHelight = statusBarHeight;
const screenWidth = screen.width
const screenHeight = screen.height - SBHelight

const styles = StyleSheet.create({
    linearGradient: {
        minHeight: (screenHeight - 130),
        maxHeight: (screenHeight - 130),
        alignItems: "center",
    },
    contentContainerStyle: {
        minWidth: screenWidth,
        paddingBottom: 50,
        minHeight: screenHeight - 130
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
        width: (screenWidth - 30) / 2,
        backgroundColor: colors.red + "00",
        padding: 10
    },
    activeMenu: {
        width: "40%",
        height: 3,
        backgroundColor: colors.red,
        marginTop: 3
    },
    blockTitle: {
        color: colors.red
    },
    blockCtn: {
        padding: 20,
        paddingTop: 0
    },
    blockVideo: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
        marginTop: 10
    },
    playButton: {
        borderWidth: 1,
        borderColor: colors.white,
        borderRadius: 3,
        width: (screenWidth - 90) / 3,
        height: (screenWidth - 90) / 3,
        marginRight: 2,
        marginLeft: 2,
        padding: (screenWidth - 90) / 18,
        alignItems: "center"
    },
    playRound: {
        backgroundColor: colors.white,
        width: (screenWidth - 90) / 6,
        height: (screenWidth - 90) / 6,
        borderRadius: (screenWidth - 90) / 12,
        alignItems: "center",
        justifyContent: "center"
    },
    playBtnText: {
        color: colors.white,
        fontSize: 8,
        marginTop: 7
    },
    blockSeparator: {
        // width: (screenWidth - 48),
        width: "100%",
        height: 1,
        backgroundColor: colors.white + "A5",
        marginTop: 20
    },
    videoBtnCtn: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-evenly"
    },
    // videoBytype style
    contentContainerStyle: {
        alignItems: "flex-start",
        paddingBottom: 50
    },
    // headCtn: {
    //     padding: 15
    // },
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
    typeBtn: {
        marginTop: 15
    },
    btnView: {
        width: screenWidth - 40,
        padding: 25,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        borderWidth: 1,
        borderColor: colors.white,
        borderRadius: 7
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
    },
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
    }
})

export default styles
