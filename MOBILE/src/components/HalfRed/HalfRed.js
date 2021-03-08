import React, { Component } from 'react';
import {
    TouchableOpacity,
    View,
    Text,
    ImageBackground,
    Dimensions,
    StatusBar
} from 'react-native';
import styles from './styles';
import statusBarHeight from '../../configs/screen';

const screen = Dimensions.get("window");
const SBHelight = statusBarHeight;
const screenWidth = screen.width
const screenHeight = screen.height - SBHelight
class HalfRed extends Component {

    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        let blackText = null;
        if(this.props.blackText !== null ){
        if (this.props.blackText.length > 20) {
            blackText = this.props.blackText.substring(0, 23) + '...'
        } else {
            blackText = this.props.blackText
        }
    }
        return (
            <TouchableOpacity style={[styles.trainButton]}
            onPress={()=>{
                this.props.onPress()
            }}>
                {/* <View style={[styles.dateBG]}>
                    <View style={[styles.dateCtn]}>
                        <Text style={[styles.trainBtnText]}>{this.props.redText}</Text>
                    </View>
                </View> */}
                <ImageBackground style={[styles.dateBG]} source={require("../../assets/icons/stickers.png")}>
                    <Text style={[styles.trainBtnText,{ marginRight: screenWidth*0.05 , fontSize:13}]}>{this.props.redText}</Text>
                </ImageBackground>
                <View style={[styles.trainTitlectn]}>
                    <View>
                        <Text style={[styles.trainBtnText]}>{blackText}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }
}

export default HalfRed;
