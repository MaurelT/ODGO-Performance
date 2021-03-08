import React, { Component } from 'react';
import {
    Dimensions,
    StatusBar,
    TouchableOpacity,
    ScrollView,
    View,
    Text
} from 'react-native';
import AutoHeightImage from 'react-native-auto-height-image';
import LinearGradient from 'react-native-linear-gradient';
import colors from '../../configs/colors';
import baseStyles from '../../base/BaseStyles';
import styles from './styles';
import {connect} from "react-redux";
import {SET_POP_TO_TOP,SET_FOR_RETOUR_TRAIN} from "../../redux/types/tabTypes";
import statusBarHeight from '../../configs/screen';

const screen = Dimensions.get('screen');
const SBHelight = statusBarHeight;
const screenWidth = screen.width
const screenHeight = screen.height - SBHelight


class Training extends Component {
    constructor(props) {
        super(props)
        this.state = {
            popToTop:this.props.popToTop,
        }
    }

    render() {

        let isrestrictget_videotheque = false;
        if(this.props.droits.length>0){
            for(let i = 0; i < this.props.droits.length; i++){
                if(this.props.droits[i].name === "get_videotheque"){
                    isrestrictget_videotheque = this.props.droits[i].is_restrict;
                    break;
                }
            }
        }

        if(this.props.popToTop === 'train'){
            this.props.navigation.popToTop();
            const setPopToTop = { type: SET_POP_TO_TOP, value: '' }
            this.props.dispatch(setPopToTop);
        }
        return (
            <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }} colors={[colors.balck, colors.green, colors.balck]}
                            style={baseStyles.linearGradient}>
                <ScrollView
                    contentInsetAdjustmentBehavior="automatic"
                    style={styles.scrollView}
                    contentContainerStyle={[styles.contentContainerStyle]}>

                    <View style={{
                        alignSelf: "flex-start",
                        width: screenWidth,
                        alignItems: "center",
                        justifyContent: "center",
                        padding: 15,
                        left:-screenWidth*0.01
                        // backgroundColor: colors.balck
                    }}>
                        <Text style={{
                            color: colors.white,
                            fontSize: 20
                        }}>
                            Mes entraînements
                        </Text>
                    </View>

                    <View style={[styles.btnCtn,{marginTop:30,marginBottom:150}]}>

                        <TouchableOpacity onPress={()=>{
                            this.props.navigation.navigate("History")
                        }}>
                            <View style={[styles.ctnMenu]}>
                                <Text style={[styles.btnMenuText]}>Historique des entraînements</Text>
                                <AutoHeightImage
                                    width={screenWidth*0.03}
                                    source={require("../../assets/icons/arrow-white.png")} />
                            </View>
                        </TouchableOpacity>

                         {!isrestrictget_videotheque?<TouchableOpacity
                            onPress={()=>{
                                const setforretourtrain = { type: SET_FOR_RETOUR_TRAIN, value: 0 };
                                this.props.dispatch(setforretourtrain);
                                this.props.navigation.navigate("Mamobilite")
                            }}
                         ><View style={[styles.ctnMenu,{borderColor:!isrestrictget_videotheque?"white":colors.grisee}]}>
                                <Text style={[styles.btnMenuText,{color:!isrestrictget_videotheque?"white":colors.textgrisee}]} >Ma mobilité</Text>
                                <AutoHeightImage
                                    width={screenWidth*0.03}
                                    style={{tintColor:!isrestrictget_videotheque?"white":colors.textgrisee}}
                                    source={require("../../assets/icons/arrow-white.png")} />
                         </View>
                        </TouchableOpacity>
                         :
                             <View

                             ><View style={[styles.ctnMenu,{borderColor:!isrestrictget_videotheque?"white":colors.grisee}]}>
                                 <Text style={[styles.btnMenuText,{color:!isrestrictget_videotheque?"white":colors.textgrisee}]} >Ma mobilité</Text>
                                 <AutoHeightImage
                                     width={screenWidth*0.03}
                                     style={{tintColor:!isrestrictget_videotheque?"white":colors.textgrisee}}
                                     source={require("../../assets/icons/arrow-white.png")} />
                             </View>
                             </View>
                         }

                    { !isrestrictget_videotheque?   <TouchableOpacity onPress={()=>{
                            const setforretourtrain = { type: SET_FOR_RETOUR_TRAIN, value: 1 }
                            this.props.dispatch(setforretourtrain);
                        this.props.navigation.navigate("Tensionvideo")}}>
                            <View style={[styles.ctnMenu,{borderColor:!isrestrictget_videotheque?"white":colors.grisee}]}>
                                <Text style={[styles.btnMenuText,{color:!isrestrictget_videotheque?"white":colors.textgrisee}]} >Mes tensions</Text>
                                <AutoHeightImage
                                    width={screenWidth*0.03}
                                    style={{tintColor:!isrestrictget_videotheque?"white":colors.textgrisee}}
                                    source={require("../../assets/icons/arrow-white.png")} />
                            </View>
                        </TouchableOpacity>
                    :
                        <View >
                            <View style={[styles.ctnMenu,{borderColor:!isrestrictget_videotheque?"white":colors.grisee}]}>
                                <Text style={[styles.btnMenuText,{color:!isrestrictget_videotheque?"white":colors.textgrisee}]} >Mes tensions</Text>
                                <AutoHeightImage
                                    width={screenWidth*0.03}
                                    style={{tintColor:!isrestrictget_videotheque?"white":colors.textgrisee}}
                                    source={require("../../assets/icons/arrow-white.png")} />
                            </View>
                        </View>
                    }

                       {!isrestrictget_videotheque? <TouchableOpacity onPress={()=>{
                            // this.props.navigation.navigate("Programs")
                               const setforretourtrain = { type: SET_FOR_RETOUR_TRAIN, value: 2 };
                               this.props.dispatch(setforretourtrain)
                            this.props.navigation.navigate("Videothequesquelette")
                        }}>
                            <View style={[styles.ctnMenu]}>
                                <Text style={[styles.btnMenuText]} >Vidéothèque</Text>
                                <AutoHeightImage
                                    width={screenWidth*0.03}
                                    source={require("../../assets/icons/arrow-white.png")} />
                            </View>
                        </TouchableOpacity>
                           :
                           <View >
                               <View style={[styles.ctnMenu,{borderColor:colors.grisee}]}>
                                   <Text style={[styles.btnMenuText,{color:colors.textgrisee}]} >Vidéothèque</Text>
                                   <AutoHeightImage
                                       width={screenWidth*0.03}
                                       style={{tintColor:colors.textgrisee}}
                                       source={require("../../assets/icons/arrow-white.png")} />
                               </View>
                           </View>
                       }
                    </View>
                </ScrollView>
            </LinearGradient>
        )
    }
}

//export default Training;
const mapStateToProps = (state) => {
    const { popToTop,droits } = state.statedata
    return { popToTop,droits }
};

export default connect(mapStateToProps)(Training);
