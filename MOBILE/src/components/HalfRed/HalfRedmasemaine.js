import React, { Component } from 'react';
import {
    TouchableOpacity,
    View,
    Text,
    ImageBackground,
    Dimensions,
    StatusBar,
    Image
} from 'react-native';
import styles from './styles';
import statusBarHeight from '../../configs/screen';
import colors from '../../configs/colors';
import AutoHeightImage from 'react-native-auto-height-image';

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
            <View style={{flexDirection:'row',marginBottom:-7}}>
                <View style={{left:screenWidth*0.11}}>
                <TouchableOpacity style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-around",
                    alignSelf:'center',
                    width: (screenWidth*0.6),
                    borderWidth: 0,
                    borderColor: colors.white,
                    padding: 0,
                    borderRadius: 5,
                    marginTop: 10}}
                onPress={()=>{
                    this.props.onPress()
                }}>
                    <View style={{alignItems:'center'}}>
                        <Text style={[styles.trainBtnText,{ marginRight: screenWidth*0.08 , fontSize:13,top:22,zIndex:2}]}>{this.props.redText}</Text>
                        <Image style={{tintColor:this.props.backgroundcolo,top:-8.7, width: (screenWidth*0.3),
                        height:45,
                        justifyContent:"center",
                        alignSelf:"center",
                        zIndex:1,}} source={require("../../assets/icons/stickers.png")} />
                    </View>
                    <View style={{paddingLeft: 50,
                        flexDirection:'row',
                        alignItems:"center",
                        justifyContent:"space-between",
                        zIndex:0,
                        width: (screenWidth*0.65),
                        height:45,
                        flexWrap:'nowrap',
                        borderWidth: 0.5,
                        borderLeftWidth:0,
                        borderColor: colors.white,}}>
                        <View>
                            <Text style={[styles.trainBtnText]}>{blackText}</Text>
                        </View>
                    </View>
                </TouchableOpacity>
                </View>
                <View  style={{
                    top:33,
                    left:screenWidth*0.15
                }}>
                    <TouchableOpacity
                        onPress={()=> {

                            console.warn('ici')
                            this.props.trash()
                        }}
                        style={{}}
                    >
                        <AutoHeightImage
                            width={screenWidth*0.04}
                            source={require("../../assets/icons/delete_programme.png")}
                        />
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

export default HalfRed;
