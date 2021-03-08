import {StyleSheet, Dimensions, StatusBar} from 'react-native';
import colors from '../../configs/colors';
import statusBarHeight from '../../configs/screen';

const screen = Dimensions.get('screen');
const SBHelight = statusBarHeight;
const screenWidth = screen.width
const screenHeight = screen.height - SBHelight

const styles = StyleSheet.create({
    buttonBlock: {
        padding: 3,
        paddingLeft: 15,
        paddingRight: 15,
        width: "100%",
        height: "100%",
        backgroundColor: "transparent",
        alignItems: "center",
        justifyContent: "center"
    }
})

export default styles