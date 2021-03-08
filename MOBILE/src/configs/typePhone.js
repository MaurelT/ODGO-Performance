import {
    StatusBar,
    Dimensions,
    Platform
} from 'react-native';

const X_WIDTH = 375;
const X_HEIGHT = 812;

const XSMAX_WIDTH = 414;
const XSMAX_HEIGHT = 896;

const { height: W_HEIGHT, width: W_WIDTH } = Dimensions.get('window');

var isIPhoneX = false;
if (Platform.OS === 'ios' && !Platform.isPad && !Platform.isTVOS) {
    isIPhoneX = W_WIDTH === X_WIDTH && W_HEIGHT === X_HEIGHT || W_WIDTH === XSMAX_WIDTH && W_HEIGHT === XSMAX_HEIGHT;
}

var phoneType = null;
if(Platform.OS === 'android'){
    phoneType = "android";
} else{
    if(isIPhoneX){
        phoneType = "iphoneX";
    }else{
        phoneType = "iphone";
    }
}

export default phoneType;