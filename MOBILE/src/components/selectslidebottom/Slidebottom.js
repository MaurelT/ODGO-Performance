import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    ScrollView,
    View,
    Text,
    TouchableOpacity,
    Dimensions,
    StatusBar,
    TextInput,
    Modal, RefreshControl,
    Keyboard,
    TouchableHighlight,
    TouchableWithoutFeedback
} from 'react-native';
import colors from '../../configs/colors';
import baseStyles from '../../base/BaseStyles';
import LinearGradient from 'react-native-linear-gradient';
import statusBarHeight from '../../configs/screen';
import phoneType from '../../configs/typePhone';
const screen = Dimensions.get("window");
const SBHelight = statusBarHeight;
const screenWidth = screen.width
const screenHeight = screen.height - SBHelight

class Slidebottom extends Component {
    constructor(props) {
        super(props)
        this.state = {
        };
    }


    async componentDidMount() {


    }





    render() {

        return (
            <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }} colors={[colors.balck, colors.green, colors.balck]}
                            style={baseStyles.linearGradient}
                            style={{
                                flex:1,alignItems:'center'
                            }}
            >
                <Modal
                    visible={this.props.showModal}
                    animationType={"slide"}
                    onRequestClose={() => {
                        this.props.onRequestClose()
                        }
                    }
                    transparent={true}
                >
                    <TouchableOpacity
                        onPress={() => {
                            this.props.onRequestClose()
                        }}
                        style={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            width: screenWidth,
                            height: screenHeight,
                            zIndex: 0
                        }}
                    >
                    </TouchableOpacity>
                    <View style={{justifyContent:'flex-end',alignItems:'center',top:screenHeight-(0 + screenWidth*0.5)}}>
                        <View style={{height: 30,width: screenWidth,
                            backgroundColor: '#FF3A28',
                            bottom: 0 }}>
                            <View style={{flexDirection:'row',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                paddingTop:screenWidth*0.013,
                                paddingHorizontal:20
                            }}>
                                <TouchableOpacity
                                    onPress={ async ()=>{ await this.props.onRequestClose()}}
                                >
                                    <Text style={{color:'white'}}>Annuler</Text>
                                </TouchableOpacity>
                                <Text style={{color:'white'}}></Text>
                                <TouchableOpacity
                                    onPress={()=>{

                                    }}
                                >
                                    <Text style={{color:'white'}}></Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <ScrollView
                                    style={{height: screenWidth*0.5,backgroundColor:'white',}}
                                    contentContainerStyle={{justifyContent:'center',alignItems:'center'}}
                        >
                            {
                                this.props.items.map((item, index) => {
                                    return (
                                        <TouchableHighlight
                                            onPress={()=> {
                                                this.props.callback(item,index);
                                            }}
                                            style={{height:50,alignItems:'center',
                                                marginBottom:index === this.props.items.length - 1 ? 50 : 0,
                                                justifyContent:'center',
                                                backgroundColor:'white',
                                                borderTopWidth:0.5,
                                                // borderColor:'#444242',
                                                borderColor:'rgb(189,198,192)',
                                                width:screenWidth,
                                            }}>
                                            {this.props.component_item(item)}
                                        </TouchableHighlight>
                                    );
                                })

                            }
                        </ScrollView>
                    </View>
                </Modal>
            </LinearGradient>
        )
    }
}

export default Slidebottom;
// const mapStateToProps = (state) => {
//     const {  } = state.statedata;
//     return {  }
// };
//
// export default connect(mapStateToProps)(Slidebottom);
