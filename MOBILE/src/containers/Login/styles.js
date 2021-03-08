import {StyleSheet, Dimensions, StatusBar} from 'react-native';
import colors from '../../configs/colors';
import statusBarHeight from '../../configs/screen';


const screen = Dimensions.get("window");
const SBHelight = statusBarHeight;
const screenWidth = screen.width
const screenHeight = screen.height - SBHelight

const styles = StyleSheet.create({
    contentContainerStyle: {
        minHeight: screenHeight,
        minWidth: screenWidth
    },
    linearGradient: {
        minHeight: screenHeight,
        maxHeight: screenHeight,
        alignItems: "center",
        paddingBottom: 50,
        paddingTop: 30,
        justifyContent: "space-between"
    }
})

export default styles