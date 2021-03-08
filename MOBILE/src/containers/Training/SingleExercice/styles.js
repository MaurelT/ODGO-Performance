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
    rateCtn: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        marginRight: 10
    },
    rateStar: {
        margin: 1
    },
    backgroundVideo: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        // width: "100%",
        // height: "100%"
    },
    istrucCtn: {
        width: screenWidth,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
        padding: 10
    },
    istrucElem: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
        padding: 10
    },


    container: {
        width: screenWidth - 40,
        height: 200,
        marginTop: 20
    },
    fullScreen: {
        // position: 'absolute',
        // top: 0,
        // left: 0,
        // bottom: 0,
        // right: 0,
        width: screenWidth - 40,
        height: 200,
        backgroundColor: colors.white
    },
    controls: {
        backgroundColor: colors.footerBG + "65",
        borderRadius: 5,
        position: 'absolute',
        bottom: 44,
        left: 4,
        right: 4,
    },
    progress: {
        flex: 1,
        flexDirection: 'row',
        borderRadius: 3,
        overflow: 'hidden',
    },
    innerProgressCompleted: {
        height: 20,
        backgroundColor: '#cccccc'
    },
    innerProgressRemaining: {
        height: 20,
        backgroundColor: '#2C2C2C',
    },
    generalControls: {
        flex: 1,
        flexDirection: 'row',
        overflow: 'hidden',
        paddingBottom: 10,
    },
    skinControl: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    rateControl: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    volumeControl: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    resizeModeControl: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    ignoreSilentSwitchControl: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    controlOption: {
        alignSelf: 'center',
        fontSize: 11,
        color: "white",
        paddingLeft: 2,
        paddingRight: 2,
        lineHeight: 12,
    },
    nativeVideoControls: {
        top: 184,
        // width: screenWidth,
        height: 300
    }


})

export default styles