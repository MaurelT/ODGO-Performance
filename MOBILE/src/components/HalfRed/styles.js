import { StyleSheet, Dimensions, StatusBar } from 'react-native';
import colors from '../../configs/colors';
import statusBarHeight from '../../configs/screen';

const screen = Dimensions.get("window");
const SBHelight = statusBarHeight;
const screenWidth = screen.width
const screenHeight = screen.height - SBHelight

const styles = StyleSheet.create({
    trainButton: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around",
        width: (screenWidth*0.8),
        borderWidth: 0,
        borderColor: colors.white,
        padding: 0,
        borderRadius: 5,
        marginTop: 15
    },
    dateBG: {
        width: (screenWidth*0.3),
        height:45,
        justifyContent:"center",
        alignSelf:"center",
        zIndex:1,
        // borderWidth:1,
        // borderRightWidth:0,
        // borderColor: colors.red
        // padding:10
        // borderLeftWidth: 50,
        // borderLeftColor: colors.red,
        // borderTopWidth: 50,
        // borderTopColor: colors.red,
        // borderRightWidth: 25,
        // borderRightColor: colors.white + "00",
        // // marginLeft: -1,
        // borderTopLeftRadius: 5,
        // borderBottomLeftRadius: 5
    },
    dateCtn: {
        // width: 70,
        // height: 51,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: colors.balck + "00",
        marginLeft: -50,
        marginTop: -50
    },
    trainBtnText: {
        color: colors.white,
        flexWrap:"nowrap",
        // paddingLeft:10,
        paddingLeft:screenWidth*0.02,
        justifyContent:"flex-start",
        //alignSelf:"center"
    },
    blockSeparator: {
        width: (screenWidth - 40),
        height: 1,
        backgroundColor: colors.white + "A5",
        marginTop: 20
    },
    trainTitlectn: {
        paddingLeft: 20,
        alignSelf:"center",
        justifyContent:"center",
        // paddingTop: 25,
        // paddingBottom: 25,
        marginLeft:-15,
        zIndex:0,
        width: (screenWidth*0.65),
        height:45,
        flexWrap:'nowrap',
        borderWidth: 0.5,
        borderLeftWidth:0,
        borderColor: colors.white,
    }
})

export default styles
