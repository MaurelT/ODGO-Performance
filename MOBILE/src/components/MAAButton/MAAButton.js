import React, { Fragment, Component } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Dimensions,
    StatusBar
} from 'react-native';
import colors from '../../configs/colors';
import styles from './styles';
import statusBarHeight from '../../configs/screen';

const screen = Dimensions.get("window");
const SBHelight = statusBarHeight;
const screenWidth = screen.width
const screenHeight = screen.height - SBHelight

class MAAButton extends Component {

    constructor(props) {
        super(props)
        this.state = {
            borderColor: props.borderColor,
            textColor: props.textColor,
            width: props.width,
            height: props.height,
            text: props.text
        }
    }

    render() {

        // var styles = this.props.type = "border" ? borderedStyles : filledStyles
        var margin = {
            margin: (this.props.margin != null && this.props.margin > 0) ? this.props.margin : 10,
        }
        var unifiedStyles = {
            width: (this.props.width != null && this.props.width > 0) ? this.props.width : (screenWidth - 40),
            height: (this.props.height != null && this.props.height > 0) ? this.props.height : 32,
            borderRadius: (this.props.height != null && this.props.height > 0) ? (this.props.height / 2) : 16
        }
        var textStyles = {
            color: (this.props.textColor != null && this.props.textColor != "") ? this.props.textColor : colors.white,
            fontSize: (this.props.fontSize != null && this.props.fontSize != 0) ? this.props.fontSize : 14,
        }
        var secondStyles = this.props.type == "border" ?
            {
                borderColor: (this.props.borderColor != null && this.props.borderColor != "") ? this.props.borderColor : colors.white,
                borderWidth: (this.props.borderWidth != null && this.props.borderWidth > 0) ? this.props.borderWidth : 1
            } :
            {
                backgroundColor: (this.props.backgroundColor != null && this.props.backgroundColor != "") ? this.props.backgroundColor : colors.red
            }

        return (
            <View style={[unifiedStyles, margin]}>
                <TouchableOpacity style={[styles.buttonTouchable]}
                    onPress={this.props.onPress}>
                    <View style={[styles.buttonBlock, unifiedStyles, secondStyles, this.props.style]}>
                        <Text style={textStyles}>
                            {(this.state.text != null && this.state.text != "") ? this.state.text : "Button"}
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }
}

export default MAAButton;