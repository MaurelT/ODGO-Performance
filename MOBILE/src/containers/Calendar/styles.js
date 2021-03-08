import { StyleSheet, Dimensions, StatusBar } from 'react-native';
import colors from '../../configs/colors';
import statusBarHeight from '../../configs/screen';

const screen = Dimensions.get("window");
const SBHelight = statusBarHeight;
const screenWidth = screen.width
const screenHeight = screen.height - SBHelight

const styles = StyleSheet.create({
    contentContainerStyle: {
        minHeight: (screenHeight - 130),
        minWidth: screenWidth,
        alignItems: "center",
        paddingBottom: 50
    },
    monthViewCtn: {
        height: "100%",
        width: screenWidth,
        alignItems: "center",
    },
    calendarHeader: {
        width: screenWidth / 2,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    }
})

export default styles