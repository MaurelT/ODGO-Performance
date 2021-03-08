import {StyleSheet, Dimensions, StatusBar} from 'react-native';
import colors from '../../configs/colors';
import statusBarHeight from '../../configs/screen';

const screen = Dimensions.get('screen');
const SBHelight = statusBarHeight;
const screenWidth = screen.width
const screenHeight = screen.height - SBHelight

const styles = StyleSheet.create({})

export default styles