import React, { Component } from 'react'
import {
    ScrollView,
    View,
    Text,
    Image,
    TouchableOpacity,
    Dimensions,
    StatusBar,
    Modal,
    TextInput,
    KeyboardAvoidingView, RefreshControl,
    Alert
} from 'react-native';
import { connect } from 'react-redux';
import baseStyles from '../../../base/BaseStyles';
import styles from '../AddBlessure/styles';
import colors from '../../../configs/colors';
import LinearGradient from 'react-native-linear-gradient';
import ZonePicker from '../../../components/ZonePicker/ZonePicker';
import MAAButton from '../../../components/MAAButton/MAAButton';
import AutoHeightImage from 'react-native-auto-height-image';
import {SET_ACTIVE_FP, SET_ACTIVE_TAB, SET_POP_TO_TOP, SET_ZONE} from '../../../redux/types/tabTypes';
import SqueletteDevantBlanc from '../AddBlessure/SqueletteDevantBlanc';
import SqueletteDerriereBlanc from '../AddBlessure/SqueletteDerriereBlanc';
import Swiper from "react-native-swiper";
import {CustomSlider} from '../../Training/NewTraining/CustomSlider';
import tensionHelper from '../../../apis/helpers/tension_helper';
import moment from 'moment';
import pathologieHelper from '../../../apis/helpers/pathologie_helper';
import statusBarHeight from '../../../configs/screen';
import {getDashboar} from '../../../apis/FonctionRedondant';
import dashboardHelper from '../../../apis/helpers/dashboard_helper';

const screen = Dimensions.get("window");
const SBHelight = statusBarHeight;
const screenWidth = screen.width
const screenHeight = screen.height - SBHelight;






class VideobyZone extends Component {
    constructor(props) {
        super(props)
        this.state = {
            activeMenu: 2,
            selectedZone: props.selectedZone,
            zonePicker: false,
            pathologie_text: "Traumatismes",
            autre_text: "Xxxxx",
            date_text: "07/06/2019",
            operation: false,
            indispo_time: "2 semaines",
            popToTop:this.props.popToTop,
            activeTabMenu:1,

            valuesNumberIntensite:[5],

        }
    }

    componentDidMount() {
        const setActiveFPAction = { type: SET_ACTIVE_FP, value: null }
        this.props.dispatch(setActiveFPAction)

    }

    _selectedId =async (id,nom,state) =>{
      //  console.warn(id,nom,state)
       // const setSelectedZone = { type: SET_ZONE, value: {id:id,text:nom} }
        console.warn('ato tsi aloh0');

        const getNameMembreOfSquelette = await pathologieHelper.getNameMembreOfSquelette(this.props.userToken,id);
        console.warn('ato tsi aloh',getNameMembreOfSquelette);
        if (getNameMembreOfSquelette) {
            const setSelectedZone = {type: SET_ZONE, value: {id: id, text: getNameMembreOfSquelette.data.name}};
            this.props.dispatch(setSelectedZone)
            this.props.navigation.navigate('ListeExerciceByZone', {zoneId: id, nomZone:  getNameMembreOfSquelette.data.name});
        }
    };



    singleSliderValueCallbackIntensite =(values)=> {
        this.setState({valuesNumberIntensite:values})
    }


    renderPagination = (index, total, context) => {
        return (
            <View style={{
                position: 'absolute',
                top: 1,
                alignSelf:'center'
            }}>
                {/*<Text style={{ color: 'grey' }}>*/}
                {/*    <Text style={{ color: 'white',*/}
                {/*        fontSize: 20}}>{index + 1}</Text>/{total}*/}
                {/*</Text>*/}
                <View style={{flexDirection:'row'}}>
                    <View style={{width:15,height:5,borderRadius:3,backgroundColor:index === 0 ? '#F44130' :'gray',marginRight:4}}/>
                    <View style={{width:15,height:5,borderRadius:3,backgroundColor:index === total-1 ? '#F44130' :'gray'}}/>
                </View>
            </View>
        )
    };

    entete(){
        return(
            <View  >
                <View style={{
                    minWidth: screenWidth,
                }}>
                    <View style={{ alignItems :"center",justifyContent:"center",width:"100%",marginVertical:15  }}>
                        <TouchableOpacity
                            onPress={() => {
                                this.props.navigation.goBack()
                            }}
                            style={{width:50,position:"absolute",left:0}}
                        >
                            <AutoHeightImage
                                width={18}
                                source={require('../../../assets/icons/arrow-white.png')}
                                style={{
                                    marginLeft:15,
                                    transform: [
                                        { rotateY: "180deg" }
                                    ],
                                }}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={async ()=>{
                            const setSelectedZone = { type: SET_ZONE, value: {id:0,text:"Ajouter un exercice"} }
                            this.props.dispatch(setSelectedZone)
                        }}>
                            <Text style={[baseStyles.titleText,{textAlign:"center"}]}>
                                {this.props.selectedZone.id == 0 ? "Ajouter un exercice" : this.props.selectedZone.text}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
                {this.props.selectedZone.id === 0 &&
                <View style={[styles.noSelectedBtn]}
                >
                    <View style={[styles.noSelectedCtn,{marginBottom:10,alignSelf:'center'}]}>
                        <Text style={[baseStyles.textColorWhite, { textAlign: "center" }]}>Sélectionnez la zone du corps à travailler</Text>
                        <Text style={[baseStyles.textColorWhite]}></Text>
                    </View>
                </View>
                }
            </View>
        )
    }

    render() {
        if(this.props.popToTop === 'sante'){
            this.props.navigation.popToTop();
            const setPopToTop = { type: SET_POP_TO_TOP, value: '' }
            this.props.dispatch(setPopToTop);
        }
        return (

            <View style={{flex:1}}>
                <Swiper
                    renderPagination={this.renderPagination}
                    loop={false}
                    showsButtons={false}
                >
                    <ScrollView
                        refreshControl={
                            <RefreshControl
                                refreshing={this.state.refreshing}
                                onRefresh={() => {
                                    this.setState({ refreshing: true })
                                    setTimeout(() => {
                                        // this.getpathologieblessure(this.props.userToken,this.props.selectedZone.id)
                                        this.setState({ refreshing: false })
                                    }, 1000)

                                }}
                                tintColor={colors.green}
                                colors={[colors.green]}
                            />
                        }
                    >
                        <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }} colors={[colors.balck, colors.green, colors.balck]} style={[baseStyles.linearGradient,{paddingBottom:40,paddingLeft:screenWidth*0.02}]}>
                            {this.entete()}
                            <SqueletteDevantBlanc _selectedId={this._selectedId}/>

                            {/*<View style={{marginTop:-screenWidth*0.15}}>*/}
                            {/*    <View style={[styles.sliderTensionLabel,{bottom: -25}]}>*/}
                            {/*        <Text style={[baseStyles.textColorWhite]}>Tension</Text>*/}
                            {/*    </View>*/}
                            {/*    <CustomSlider*/}
                            {/*        min={0}*/}
                            {/*        max={5}*/}
                            {/*        valueOffstetNumber={()=>{return this.state.valuesNumberIntensite}}*/}
                            {/*        LRpadding={40}*/}
                            {/*        callback={(values)=>{*/}
                            {/*            this.singleSliderValueCallbackIntensite(values)*/}
                            {/*        }}*/}
                            {/*        single={true}*/}
                            {/*    />*/}
                            {/*    <View style={{top:-18,left: ((this.state.valuesNumberIntensite * (screenWidth - 80)) / 5)}}>*/}
                            {/*        {this.state.valuesNumberIntensite == 0 && <Text style={{color:'white'}}>très faible</Text> }*/}
                            {/*        {this.state.valuesNumberIntensite == 1 && <Text style={{color:'white'}}>faible</Text> }*/}
                            {/*        {this.state.valuesNumberIntensite == 2 && <Text style={{color:'white'}}>moyenne</Text> }*/}
                            {/*        {this.state.valuesNumberIntensite == 3 && <Text style={{color:'white'}}>bonne</Text> }*/}
                            {/*        {this.state.valuesNumberIntensite == 4 && <Text style={{color:'white'}}>forte</Text> }*/}
                            {/*        {this.state.valuesNumberIntensite == 5 && <Text style={{color:'white'}}>très forte</Text> }*/}
                            {/*    </View>*/}
                            {/*</View>*/}

                            {/*<MAAButton text={"VALIDER"} width={(screenWidth - 100)} height={40}*/}
                            {/*           onPress={() => {*/}
                            {/*               this.postTension()*/}
                            {/*           }}*/}
                            {/*           style={[styles.btnValidate]} />*/}
                        </LinearGradient>
                    </ScrollView>
                    <ScrollView
                        refreshControl={
                            <RefreshControl
                                refreshing={this.state.refreshing}
                                onRefresh={() => {
                                    this.setState({ refreshing: true })
                                    setTimeout(() => {
                                        // this.getpathologieblessure(this.props.userToken,this.props.selectedZone.id)
                                        this.setState({ refreshing: false })
                                    }, 1000)
                                }}
                                tintColor={colors.green}
                                colors={[colors.green]}
                            />
                        }
                    ><LinearGradient start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }} colors={[colors.balck, colors.green, colors.balck]} style={[baseStyles.linearGradient,{paddingBottom:40,paddingLeft:screenWidth*0.04}]}>
                        {this.entete()}
                            <SqueletteDerriereBlanc  _selectedId={this._selectedId}/>
                            {/*<View style={{marginTop:-40}}>*/}
                            {/*    <View style={[styles.sliderTensionLabel,{bottom: -25}]}>*/}
                            {/*        <Text style={[baseStyles.textColorWhite]}>Tension</Text>*/}
                            {/*    </View>*/}
                            {/*    <CustomSlider*/}
                            {/*        min={0}*/}
                            {/*        max={5}*/}
                            {/*        valueOffstetNumber={()=>{return this.state.valuesNumberIntensite}}*/}
                            {/*        LRpadding={40}*/}
                            {/*        callback={(values)=>{*/}
                            {/*            this.singleSliderValueCallbackIntensite(values)*/}
                            {/*        }}*/}
                            {/*        single={true}*/}
                            {/*    />*/}
                            {/*    <View style={{top:-18,left: ((this.state.valuesNumberIntensite * (screenWidth - 80)) / 5)}}>*/}
                            {/*        {this.state.valuesNumberIntensite == 0 && <Text style={{color:'white'}}>très faible</Text> }*/}
                            {/*        {this.state.valuesNumberIntensite == 1 && <Text style={{color:'white'}}>faible</Text> }*/}
                            {/*        {this.state.valuesNumberIntensite == 2 && <Text style={{color:'white'}}>moyenne</Text> }*/}
                            {/*        {this.state.valuesNumberIntensite == 3 && <Text style={{color:'white'}}>bonne</Text> }*/}
                            {/*        {this.state.valuesNumberIntensite == 4 && <Text style={{color:'white'}}>forte</Text> }*/}
                            {/*        {this.state.valuesNumberIntensite == 5 && <Text style={{color:'white'}}>très forte</Text> }*/}
                            {/*    </View>*/}
                            {/*</View>*/}

                            {/*<MAAButton text={"VALIDER"} width={(screenWidth - 100)} height={40}*/}
                            {/*           onPress={() => {*/}
                            {/*               this.postTension()*/}
                            {/*           }}*/}
                            {/*           style={[styles.btnValidate]} />*/}
                        </LinearGradient>
                    </ScrollView>
                </Swiper>







                <Modal
                    visible={this.state.zonePicker}
                    transparent={true}
                    onRequestClose={() => {
                        this.setState({ zonePicker: false })
                    }}
                >
                    <ZonePicker close={() => {
                        this.setState({ zonePicker: false })
                    }} type="exercice" />
                    {/* <View style={{padding:10}}></View> */}
                </Modal>
            </View>
        )
    }
}


const mapStateToProps = (state) => {
    const { selectedZone,popToTop,userToken } = state.statedata
    return { selectedZone,popToTop,userToken }
};

export default connect(mapStateToProps)(VideobyZone);
