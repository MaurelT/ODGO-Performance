import React, { Fragment, Component } from 'react';
import {
    View,
    Dimensions,
    TextInput,
    StatusBar
} from 'react-native';
import colors from '../../configs/colors';
import styles from './styles';
import statusBarHeight from '../../configs/screen';

const screen = Dimensions.get('screen');
const SBHelight = statusBarHeight;
const screenWidth = screen.width
const screenHeight = screen.height - SBHelight

class MAAInputText extends Component {

    constructor(props) {
        super(props)
        this.state = {
            textValue: ""
        }
    }

    render() {

        // var styles = this.props.type = "border" ? borderedStyles : filledStyles
        var unifiedStyles = {
            width: (this.props.width != null && this.props.width > 0) ? this.props.width : (screenWidth - 80),
            height: (this.props.height != null && this.props.height > 0) ? this.props.height : 40,
            borderRadius: (this.props.height != null && this.props.height > 0) ? (this.props.height / 2) : 20,
            borderWidth: (this.props.borderWidth != null && this.props.borderWidth > 0) ? this.props.borderWidth : 1,
            borderColor: (this.props.borderColor != null && this.props.borderColor != "") ? this.props.borderColor : colors.white,
            paddingLeft: 20,
            paddingRight: 20,
            alignItems: "center",
            justifyContent: "center",
            margin: 5
        }
        var textStyles = {
            color: (this.props.textColor != null && this.props.textColor != "") ? this.props.textColor : colors.white,
            padding: 0,
            margin: 0,
            width: "100%",
        }

        return (
            <View style={[unifiedStyles, this.props.style]}>
                <TextInput style={[textStyles]} 
                
                keyboardType={(this.props.keyboardType != null) ? this.props.keyboardType : null}
                placeholder={(this.props.placeholder != null && this.props.placeholder != "") ? this.props.placeholder : "Ecrire"}
                placeholderTextColor={(this.props.placeholderTextColor != null && this.props.placeholderTextColor != "") ? this.props.placeholderTextColor : colors.white + "55"}
                onChangeText={(text) => {
                    this.setState({textValue: text})
                    this.props.onChangeText(text)
                }}
                value={this.props.valuepassword?this.props.valuepassword :this.props.valueemail?this.props.valueemail : this.state.textValue}
                secureTextEntry={this.props.secureTextEntry}
                textContentType={this.props.textContentType} />
            </View>
        )
    }
}

export default MAAInputText;