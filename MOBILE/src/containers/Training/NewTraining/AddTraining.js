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
    Alert
} from 'react-native';
import baseStyles from '../../../base/BaseStyles';
import styles from './styles';

import colors from '../../../configs/colors';
import LinearGradient from 'react-native-linear-gradient';
import ZonePicker from '../../../components/ZonePicker/ZonePicker';
import MAAButton from '../../../components/MAAButton/MAAButton';
import AutoHeightImage from 'react-native-auto-height-image';
import {CustomSlider} from './CustomSlider';
import {SET_ACTIVE_TAB, SET_POP_TO_TOP,SET_HIDDEN_FOOTER} from '../../../redux/types/tabTypes';
import trainHelper from "../../../apis/helpers/train_helper";
import AsyncStorage from "@react-native-community/async-storage";
import statusBarHeight from '../../../configs/screen';
import Slidebottom from '../../../components/selectslidebottom/Slidebottom';
import phoneType from '../../../configs/typePhone';
import moment from 'moment';
import {getUserTrains} from'../../../apis/FonctionRedondant'
import {Slider} from 'react-native-elements';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

const screen = Dimensions.get("window");
const SBHelight = statusBarHeight;
const screenWidth = screen.width
const screenHeight = screen.height - SBHelight

class AddTraining extends Component {
    textComment =null;
    constructor(props) {
        super(props)
        this.state = {
            value:0,
            activeMenu: 2,
            selectedZone: props.selectedZone,
            zonePicker: false,
            sliderValueIntensite: 4,
            sliderValueDifficulte: 4,
            sliderValueQualite: 4,
            sliderValueImplication: 4,
            intensiteValueTextWidth: 0,
            difficulteValueTextWidth: 0,
            qualiteValueTextWidth: 0,
            implicationValueTextWidth: 0,
            // singleSliderValuesIntensite: [2],
            // singleSliderValuesDifficulte: [3],
            valuesNumberIntensite:[0],
            valuesNumberDiffuculte:[0],
            valuesNumberQualite:[0],
            valuesNumberImplication:[0],
            popToTop:this.props.popToTop,
            showActiviteprincipale:false,
            entrainement_types:[],
            userToken:'',
            entrainementtypeselectionne:'',
            entrainementtypeid:1,
            showHour:false,
            showMinute:false,
            hourselectionne:0,
            minuteselectionne:10,
            // hours:[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24],
            hours:[0,1,2,3,4,5,6,7,8,9,10],
            // minutes:[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60],
            minutes:[0,10,20,30,40,50,60],
            text:' ',
            showInputcoms:false,
        };

        this.text = '';
        this.idtrainmodif = null;
    }


    async componentDidMount() {
        const userToken = await AsyncStorage.getItem("userToken");
        this.setState({ userToken });
        this.getActivitePrincipale();
        Keyboard.addListener(
            "keyboardDidHide",
            () => {
                this.setState({showInputcoms:false},()=>{
                    this.sendcoms()
                });
                const setHiddenFooter = { type: SET_HIDDEN_FOOTER, value: false };
                this.props.dispatch(setHiddenFooter);
            }
        );
        this.keyboardDidShowListener = Keyboard.addListener(
            "keyboardDidShow",
            () => {
                console.warn('show')
                const setHiddenFooter = { type: SET_HIDDEN_FOOTER, value: true };
                this.props.dispatch(setHiddenFooter);
            }
        );
    }

    _onRequestClose = async () => {
         this.setState({showActiviteprincipale:false});
        console.warn('bob')
    };

    _onPressItem = async (item,index) => {
        this.setState({entrainementtypeselectionne:item.name,showActiviteprincipale:false,entrainementtypeid:item.id});
    };


    getActivitePrincipale = async () => {
        this.setState({ refreshing:true });
        const activiteprincipale = await trainHelper.getactiviteprincipale(this.state.userToken);
        if(activiteprincipale){
            this.setState({refreshing: false});
            this.setState({entrainementtypeselectionne:activiteprincipale.data[0].name,entrainementtypeid:activiteprincipale.data[0].id})
            //console.warn('boen ',activiteprincipale)
            this.setState({entrainement_types:activiteprincipale.data});
        }
    };

    putUserConnectedTrain = async () => {
        this.setState({ refreshing:true });
         console.warn(this.state.hourselectionne,
             this.state.minuteselectionne,
             this.state.entrainementtypeid,
             parseInt(this.state.valuesNumberIntensite[0],10),
             parseInt(this.state.valuesNumberDiffuculte[0],10),
             // this.state.valuesNumberDiffuculte[0],
             parseInt(this.state.valuesNumberQualite[0],10),
             parseInt(this.state.valuesNumberImplication[0],10),
             this.state.text);

        const response = await trainHelper.putUserConnectedTrain(this.state.userToken,
            this.state.hourselectionne,
            this.state.minuteselectionne,
            this.state.entrainementtypeid,
            this.state.valuesNumberIntensite[0],
            this.state.valuesNumberDiffuculte[0],
            this.state.valuesNumberQualite[0],
            this.state.valuesNumberImplication[0],
            this.state.text
        );
        if(response){
            this.setState({refreshing: false});
            if(response.success === true){
                this.idtrainmodif = response.data.id
                getUserTrains(trainHelper,this.props,moment(new Date()).format('YYYY')).then((refreshinfalse)=>{
                    this.setState({refreshing:refreshinfalse},()=>{
                        // this.props.navigation.navigate('History')
                        if(this.props.navigation.goBack()){}
                        else{
                            const setActiveTab = { type: SET_ACTIVE_TAB, value: "history" }
                            this.props.dispatch(setActiveTab);
                        }
                    });
                });
            }
            console.warn('response ',response);
            // this.props.navigation.pop()
            Alert.alert('Odgo','Entraînement ajouté avec succès.',
                [{
                    text: 'Ok',
                    onPress: () =>{

                    }
                }]
                );
        }
    };

    singleSliderValueCallbackIntensite =(values)=> {
        // this.setState({singleSliderValuesIntensite : values});
        this.setState({valuesNumberIntensite:values})
    }

    singleSliderValueCallbackDifficulte =(values)=> {
        // this.setState({singleSliderValuesDifficulte : values});
        //console.warn('zeze',values);
        this.setState({valuesNumberDiffuculte:values})
    }

    singleSliderValueCallbackQualite =(values)=> {
        this.setState({valuesNumberQualite:values})
    }

    singleSliderValueCallbackImplication =(values)=> {
        this.setState({valuesNumberImplication:values})
    }

   async sendcoms(){
        if(this.idtrainmodif !== null){
            if(this.state.text ==this.text){
                let coms = {id:this.idtrainmodif,commentaire:this.text}
                const response = await trainHelper.sendcomsonly(this.state.userToken,coms)
                if(response){}
            }
        }

    }



    render() {
        if(this.props.popToTop === 'train'){
            this.props.navigation.popToTop();
            const setPopToTop = { type: SET_POP_TO_TOP, value: '' }
            this.props.dispatch(setPopToTop);
        }
        return (
            <KeyboardAwareScrollView  onStartShouldSetResponder={() =>
                {
                    if(this.text === this.state.text){}else{
                        this.text = this.state.text
                        this.setState({showInputcoms:false},()=>{
                            this.sendcoms()
                        })
                    }


                }}>
            <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }} colors={[colors.balck, colors.green, colors.balck]}
                            style={baseStyles.linearGradient}
                            style={{
                                flex:1,alignItems:'center'
                            }}

                            //
                            onStartShouldSetResponder={() =>
                            {
                                if(this.text === this.state.text){}else{
                                    this.text = this.state.text
                                    this.setState({showInputcoms:false},()=>{
                                        this.sendcoms()
                                    })
                                }


                            }}
            >

                <ScrollView
                    style={styles.scrollView}
                    contentContainerStyle={[styles.contentContainerStyle]}
                    keyboardShouldPersistTaps={'always'}
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.refreshing}
                            onRefresh={() => {
                                console.log("Refreshing...")
                                this.setState({ refreshing: true })
                                setTimeout(() => {
                                    console.log("Refresh finished.")
                                    this.setState({ refreshing: false })
                                }, 1000)
                                // this.animateTiming()

                            }}
                            tintColor={Platform.OS==='ios'?colors.white:colors.green}
                            colors={[Platform.OS==='ios'?colors.white:colors.green]}
                        />
                    }
                >
                    {/*<View style={{alignItems:'center',width:'100%',justifyContent:'center'}}>*/}
                    {/*    <TouchableOpacity*/}
                    {/*        onPress={()=> {*/}
                    {/*            if(this.props.navigation.goBack()) {}*/}
                    {/*            else{*/}
                    {/*                const setActiveTab = { type: SET_ACTIVE_TAB, value: "home" }*/}
                    {/*                this.props.dispatch(setActiveTab);*/}
                    {/*            }*/}
                    {/*        }}*/}
                    {/*        style={{width:50,position:"absolute",left:0}}*/}
                    {/*    >*/}
                    {/*        <AutoHeightImage*/}
                    {/*            width={18}*/}
                    {/*            source={require('../../../assets/icons/left.arrow.white.png')}*/}
                    {/*            style={{marginLeft:20}}*/}
                    {/*        />*/}
                    {/*    </TouchableOpacity>*/}
                    {/*    <View>*/}
                    {/*        <Text style={[baseStyles.titleText]}>*/}
                    {/*            {"Nouvel entraînement"}*/}
                    {/*        </Text>*/}
                    {/*    </View>*/}
                    {/*</View>*/}

                    <View style={{ alignItems :"center",justifyContent:"center",width:"100%" ,marginBottom:10 }}>
                        <TouchableOpacity
                            onPress={()=> {
                                if(this.props.navigation.goBack()) {}
                                else{
                                    const setActiveTab = { type: SET_ACTIVE_TAB, value: "home" }
                                    this.props.dispatch(setActiveTab);
                                }
                            }}
                            style={{width:50,position:"absolute",left:0}}
                        >
                            <AutoHeightImage
                                width={18}
                                source={require('../../../assets/icons/left.arrow.white.png')}
                                style={{marginLeft:15}}
                            />
                        </TouchableOpacity>
                        <Text style={[baseStyles.titleText,{textAlign:"center"}]}>
                            {"Nouvel entraînement"}
                        </Text>
                    </View>
                        <View style={[styles.goToNowCtn]}>
                            <Text style={[baseStyles.textColorWhite, { fontSize: 18 }]}>
                                AUJOURD'HUI
                            </Text>
                        </View>

                    <TouchableOpacity style={[styles.noSelectedBtn, { marginTop: 15 }]}
                                      onPress={() => {
                                          console.log("Chenging Zone")
                                          // this.setState({ zonePicker: true })
                                      }}>
                        <View style={[styles.noSelectedCtn]}>
                            <Text style={[baseStyles.textColorWhite]}>Quel a été votre type d'entraînement?</Text>
                            {/* <Text style={[baseStyles.textColorWhite]}> </Text> */}
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity

                        onPress={()=>{
                            this.setState({showActiviteprincipale:true})
                        }}
                        style={{
                            flexDirection: "row", alignItems: "center", justifyContent: "space-between", padding: 10,
                            paddingLeft: 15, paddingRight: 15,
                            width: (screenWidth - 40), marginTop: 20,
                            borderWidth: 1, borderColor: colors.white, borderRadius: 5
                        }}
                    >
                        <Text style={[baseStyles.textColorWhite]}>{this.state.entrainementtypeselectionne}</Text>
                        <AutoHeightImage
                            width={18}
                            source={require('../../../assets/icons/left.arrow.white.png')}
                            style={{ transform: [{ rotateY: "180deg" }] }} />
                    </TouchableOpacity>




                    <TouchableOpacity style={[styles.noSelectedBtn]}
                                      onPress={() => {
                                          console.log("Chenging Zone")
                                          // this.setState({ zonePicker: true })
                                      }}>
                        <View style={[styles.headCtn]}>
                            <Text style={[baseStyles.titleText]}>
                                {"Durée"}
                            </Text>
                        </View>
                    </TouchableOpacity>
                    <View
                        style={{
                            flexDirection: "row", alignItems: "center", justifyContent: "space-evenly",
                            width: screenWidth
                        }}
                    >
                        <TouchableOpacity
                            onPress={()=>{
                                this.setState({showHour:true})
                            }}
                            style={{
                                flexDirection: "row", alignItems: "center", justifyContent: "space-between", padding: 10,
                                paddingLeft: 15, paddingRight: 15,
                                width: (screenWidth - 60) / 3, marginTop: 10,
                                borderWidth: 1, borderColor: colors.white, borderRadius: 5
                            }}
                        >
                            <Text style={[baseStyles.textColorWhite]}>{this.state.hourselectionne} h</Text>
                            <AutoHeightImage
                                width={18}
                                source={require('../../../assets/icons/left.arrow.white.png')}
                                style={{ transform: [{ rotateY: "180deg" }] }} />
                        </TouchableOpacity>


                        <TouchableOpacity
                            onPress={()=>{
                                this.setState({showMinute:true})
                            }}
                            style={{
                                flexDirection: "row", alignItems: "center", justifyContent: "space-between", padding: 10,
                                paddingLeft: 15, paddingRight: 15,
                                width: (screenWidth - 60) / 3, marginTop: 10,
                                borderWidth: 1, borderColor: colors.white, borderRadius: 5
                            }}
                        >
                            <Text style={[baseStyles.textColorWhite]}>{this.state.minuteselectionne} min</Text>
                            <AutoHeightImage
                                width={18}
                                source={require('../../../assets/icons/left.arrow.white.png')}
                                style={{ transform: [{ rotateY: "180deg" }] }} />
                        </TouchableOpacity>


                    </View>
                    <View style={{ margin: 10 }}></View>
                    <TouchableOpacity style={[styles.noSelectedBtn]}
                                      onPress={() => {
                                          console.log("Chenging Zone")
                                          // this.setState({ zonePicker: true })
                                      }}>
                        <View style={[styles.headCtn]}>
                            <Text style={[baseStyles.titleText]}>
                                {"Mes sensations"}
                            </Text>
                        </View>
                    </TouchableOpacity>

                    {/*<View style={[styles.sliderCtn, { top:-20 }]}>*/}
                    {/*    <View style={[styles.sliderTensionLabel,{bottom: -25}]}>*/}
                    {/*        <Text style={[baseStyles.textColorWhite]}>Intensité</Text>*/}
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
                    {/*        {this.state.valuesNumberIntensite == 3 && <Text style={{color:'white'}}>forte</Text> }*/}
                    {/*        {this.state.valuesNumberIntensite == 4 && <Text style={{color:'white'}}>très forte</Text> }*/}
                    {/*        {this.state.valuesNumberIntensite == 5 && <Text style={{color:'white'}}>extrême</Text> }*/}
                    {/*    </View>*/}
                    {/*</View>*/}


                    <View style={{ flexDirection: "row", width: screenWidth * 0.9, marginLeft: 5 ,marginTop:10,marginBottom:-9}}>
                        <Text style={[{ fontSize: 14,color:'white' }]}>Intensité</Text>
                        <View style={{ width: screenWidth * 0.5, }}></View>
                    </View>
                    <View style={{ margin: 5 }}></View>
                    <View style={[styles.sliderCtn]}>
                        <View style={styles.sliderView}>
                            <View style={[styles.markerCtn]}>
                                <View style={[styles.sliderOptionMark, (this.state.valuesNumberIntensite[0] >= 0 ? styles.sliderOptionMarkValued : {})]}></View>
                                <View style={[styles.sliderOptionMark, (this.state.valuesNumberIntensite[0] >= 1 ? styles.sliderOptionMarkValued : {})]}></View>
                                <View style={[styles.sliderOptionMark, (this.state.valuesNumberIntensite[0] >= 2 ? styles.sliderOptionMarkValued : {})]}></View>
                                <View style={[styles.sliderOptionMark, (this.state.valuesNumberIntensite[0] >= 3 ? styles.sliderOptionMarkValued : {})]}></View>
                                <View style={[styles.sliderOptionMark, (this.state.valuesNumberIntensite[0] >= 4 ? styles.sliderOptionMarkValued : {})]}></View>
                                <View style={[styles.sliderOptionMark, (this.state.valuesNumberIntensite[0] >= 5 ? styles.sliderOptionMarkValued : {})]}></View>
                            </View>
                            <Slider
                                style={{ width: "100%", height: 40 }}
                                minimumValue={0}
                                maximumValue={5}
                                minimumTrackTintColor={colors.red}
                                maximumTrackTintColor={"#A5A5A5"}
                                thumbTintColor={colors.red}
                                value={this.state.valuesNumberIntensite[0]}
                                onValueChange={(values)=>{
                                    this.setState({valuesNumberIntensite:[values]})
                                    console.warn(values,'values')
                                }

                                }
                            />
                                <View style={{top:-5,left: ((parseInt(this.state.valuesNumberIntensite[0],10)  * (screenWidth - 80)) / 5)}}>
                                    {parseInt(this.state.valuesNumberIntensite[0],10) == 0 && <Text style={{color:'white'}}>très faible</Text> }
                                    {parseInt(this.state.valuesNumberIntensite[0],10)  == 1 && <Text style={{color:'white'}}>faible</Text> }
                                    {parseInt(this.state.valuesNumberIntensite[0],10) == 2 && <Text style={{color:'white'}}>moyenne</Text> }
                                    {parseInt(this.state.valuesNumberIntensite[0],10) == 3 && <Text style={{color:'white'}}>forte</Text> }
                                    {parseInt(this.state.valuesNumberIntensite[0],10)  == 4 && <Text style={{color:'white'}}>très forte</Text> }
                                    {parseInt(this.state.valuesNumberIntensite[0],10)  == 5 && <Text style={{color:'white'}}>extrême</Text> }
                                </View>

                            {/*<Text*/}
                            {/*    style={{*/}
                            {/*        color: colors.white,*/}
                            {/*        left: ((0 * (screenWidth - 50)) / 5),*/}
                            {/*        position: "absolute", bottom: 0*/}
                            {/*    }}>*/}
                            {/*    0*/}
                            {/*</Text>*/}
                            {/*<Text*/}
                            {/*    style={{*/}
                            {/*        color: colors.white,*/}
                            {/*        left: ((1.04 * (screenWidth - 50)) / 5),*/}
                            {/*        position: "absolute", bottom: 0*/}
                            {/*    }}>*/}
                            {/*    2*/}
                            {/*</Text>*/}
                            {/*<Text*/}
                            {/*    style={{*/}
                            {/*        color: colors.white,*/}
                            {/*        left: ((2.06 * (screenWidth - 50)) / 5),*/}
                            {/*        position: "absolute", bottom: 0*/}
                            {/*    }}>*/}
                            {/*    4*/}
                            {/*</Text>*/}
                            {/*<Text*/}
                            {/*    style={{*/}
                            {/*        color: colors.white,*/}
                            {/*        left: ((3.12 * (screenWidth - 50)) / 5),*/}
                            {/*        position: "absolute", bottom: 0*/}
                            {/*    }}>*/}
                            {/*    6*/}
                            {/*</Text>*/}
                            {/*<Text*/}
                            {/*    style={{*/}
                            {/*        color: colors.white,*/}
                            {/*        left: ((4.16 * (screenWidth - 50)) / 5),*/}
                            {/*        position: "absolute", bottom: 0*/}
                            {/*    }}>*/}
                            {/*    8*/}
                            {/*</Text>*/}
                            {/*<Text*/}
                            {/*    style={{*/}
                            {/*        color: colors.white,*/}
                            {/*        left: ((5.18 * (screenWidth - 50)) / 5),*/}
                            {/*        position: "absolute", bottom: 0*/}
                            {/*    }}>*/}
                            {/*    10*/}
                            {/*</Text>*/}
                        </View>
                    </View>


                    {/*<View style={[styles.sliderCtn, {top:-20  }]}>*/}
                    {/*    <View style={[styles.sliderTensionLabel,{bottom: -25}]}>*/}
                    {/*        <Text style={[baseStyles.textColorWhite]}>Difficulté</Text>*/}
                    {/*    </View>*/}
                    {/*    <CustomSlider*/}
                    {/*        min={0}*/}
                    {/*        max={5}*/}
                    {/*        valueOffstetNumber={()=>{return this.state.valuesNumberDiffuculte}}*/}
                    {/*        LRpadding={40}*/}
                    {/*        callback={(values)=>{*/}
                    {/*            this.singleSliderValueCallbackDifficulte(values)*/}
                    {/*        }}*/}
                    {/*        single={true}*/}
                    {/*    />*/}
                    {/*    <View style={{top:-18,left: ((this.state.valuesNumberDiffuculte * (screenWidth - 80)) / 5)}}>*/}
                    {/*        {this.state.valuesNumberDiffuculte == 0 && <Text style={{color:'white'}}>très faible</Text> }*/}
                    {/*        {this.state.valuesNumberDiffuculte == 1 && <Text style={{color:'white'}}>faible</Text> }*/}
                    {/*        {this.state.valuesNumberDiffuculte == 2 && <Text style={{color:'white'}}>moyenne</Text> }*/}
                    {/*        {this.state.valuesNumberDiffuculte == 3 && <Text style={{color:'white'}}>forte</Text> }*/}
                    {/*        {this.state.valuesNumberDiffuculte == 4 && <Text style={{color:'white'}}>très forte</Text> }*/}
                    {/*        {this.state.valuesNumberDiffuculte == 5 && <Text style={{color:'white'}}>extrême</Text> }*/}
                    {/*    </View>*/}
                    {/*</View>*/}

                    <View style={{ flexDirection: "row", width: screenWidth * 0.9, marginLeft: 5 ,marginTop:30,marginBottom:-9}}>
                        <Text style={[{ fontSize: 14,color:'white' }]}>Difficulté</Text>
                        <View style={{ width: screenWidth * 0.5, }}></View>
                    </View>
                    <View style={{ margin: 5 }}></View>
                    <View style={[styles.sliderCtn]}>
                        <View style={styles.sliderView}>
                            <View style={[styles.markerCtn]}>
                                <View style={[styles.sliderOptionMark, (this.state.valuesNumberDiffuculte[0] >= 0 ? styles.sliderOptionMarkValued : {})]}></View>
                                <View style={[styles.sliderOptionMark, (this.state.valuesNumberDiffuculte[0] >= 1 ? styles.sliderOptionMarkValued : {})]}></View>
                                <View style={[styles.sliderOptionMark, (this.state.valuesNumberDiffuculte[0] >= 2 ? styles.sliderOptionMarkValued : {})]}></View>
                                <View style={[styles.sliderOptionMark, (this.state.valuesNumberDiffuculte[0] >= 3 ? styles.sliderOptionMarkValued : {})]}></View>
                                <View style={[styles.sliderOptionMark, (this.state.valuesNumberDiffuculte[0] >= 4 ? styles.sliderOptionMarkValued : {})]}></View>
                                <View style={[styles.sliderOptionMark, (this.state.valuesNumberDiffuculte[0] >= 5 ? styles.sliderOptionMarkValued : {})]}></View>
                            </View>
                            <Slider
                                style={{ width: "100%", height: 40 }}
                                minimumValue={0}
                                maximumValue={5}
                                minimumTrackTintColor={colors.red}
                                maximumTrackTintColor={"#A5A5A5"}
                                thumbTintColor={colors.red}
                                value={this.state.valuesNumberDiffuculte[0]}
                                onValueChange={(values)=>{
                                    this.setState({valuesNumberDiffuculte:[values]})
                                    console.warn(values,'values')
                                }

                                }
                            />
                            <View style={{top:-5,left: ((parseInt(this.state.valuesNumberDiffuculte[0],10)  * (screenWidth - 80)) / 5)}}>
                                {parseInt(this.state.valuesNumberDiffuculte[0],10) == 0 && <Text style={{color:'white'}}>très faible</Text> }
                                {parseInt(this.state.valuesNumberDiffuculte[0],10)  == 1 && <Text style={{color:'white'}}>faible</Text> }
                                {parseInt(this.state.valuesNumberDiffuculte[0],10) == 2 && <Text style={{color:'white'}}>moyenne</Text> }
                                {parseInt(this.state.valuesNumberDiffuculte[0],10) == 3 && <Text style={{color:'white'}}>forte</Text> }
                                {parseInt(this.state.valuesNumberDiffuculte[0],10)  == 4 && <Text style={{color:'white'}}>très forte</Text> }
                                {parseInt(this.state.valuesNumberDiffuculte[0],10)  == 5 && <Text style={{color:'white'}}>extrême</Text> }
                            </View>
                        </View>
                    </View>

                    {/*<View style={[styles.sliderCtn, {top:-20  }]}>*/}
                    {/*    <View style={[styles.sliderTensionLabel,{bottom: -25}]}>*/}
                    {/*        <Text style={[baseStyles.textColorWhite]}>Qualité</Text>*/}
                    {/*    </View>*/}
                    {/*    <CustomSlider*/}
                    {/*        min={0}*/}
                    {/*        max={5}*/}
                    {/*        valueOffstetNumber={()=>{return this.state.valuesNumberQualite}}*/}
                    {/*        LRpadding={40}*/}
                    {/*        callback={(values)=>{*/}
                    {/*            this.singleSliderValueCallbackQualite(values)*/}
                    {/*        }}*/}
                    {/*        single={true}*/}
                    {/*    />*/}
                    {/*    <View style={{top:-18,left: ((this.state.valuesNumberQualite * (screenWidth - 80)) / 5)}}>*/}
                    {/*        {this.state.valuesNumberQualite == 0 && <Text style={{color:'white'}}>très faible</Text> }*/}
                    {/*        {this.state.valuesNumberQualite == 1 && <Text style={{color:'white'}}>faible</Text> }*/}
                    {/*        {this.state.valuesNumberQualite == 2 && <Text style={{color:'white'}}>moyenne</Text> }*/}
                    {/*        {this.state.valuesNumberQualite == 3 && <Text style={{color:'white'}}>bonne</Text> }*/}
                    {/*        {this.state.valuesNumberQualite == 4 && <Text style={{color:'white'}}>très bonne</Text> }*/}
                    {/*        {this.state.valuesNumberQualite == 5 && <Text style={{color:'white',left:-37}}>exceptionnelle</Text> }*/}
                    {/*    </View>*/}
                    {/*</View>*/}


                    <View style={{ flexDirection: "row", width: screenWidth * 0.9, marginLeft: 5 ,marginTop:30,marginBottom:-9}}>
                        <Text style={[{ fontSize: 14,color:'white' }]}>Qualité</Text>
                        <View style={{ width: screenWidth * 0.5, }}></View>
                    </View>
                    <View style={{ margin: 5 }}></View>
                    <View style={[styles.sliderCtn]}>
                        <View style={styles.sliderView}>
                            <View style={[styles.markerCtn]}>
                                <View style={[styles.sliderOptionMark, (this.state.valuesNumberQualite[0] >= 0 ? styles.sliderOptionMarkValued : {})]}></View>
                                <View style={[styles.sliderOptionMark, (this.state.valuesNumberQualite[0] >= 1 ? styles.sliderOptionMarkValued : {})]}></View>
                                <View style={[styles.sliderOptionMark, (this.state.valuesNumberQualite[0] >= 2 ? styles.sliderOptionMarkValued : {})]}></View>
                                <View style={[styles.sliderOptionMark, (this.state.valuesNumberQualite[0] >= 3 ? styles.sliderOptionMarkValued : {})]}></View>
                                <View style={[styles.sliderOptionMark, (this.state.valuesNumberQualite[0] >= 4 ? styles.sliderOptionMarkValued : {})]}></View>
                                <View style={[styles.sliderOptionMark, (this.state.valuesNumberQualite[0] >= 5 ? styles.sliderOptionMarkValued : {})]}></View>
                            </View>
                            <Slider
                                style={{ width: "100%", height: 40 }}
                                minimumValue={0}
                                maximumValue={5}
                                minimumTrackTintColor={colors.red}
                                maximumTrackTintColor={"#A5A5A5"}
                                thumbTintColor={colors.red}
                                value={this.state.valuesNumberQualite[0]}
                                onValueChange={(values)=>{
                                    this.setState({valuesNumberQualite:[values]})
                                    console.warn(values,'values')
                                }

                                }
                            />
                            <View style={{top:-5,left: ((parseInt(this.state.valuesNumberQualite[0],10)  * (screenWidth - 80)) / 5)}}>
                                {parseInt(this.state.valuesNumberQualite[0],10) == 0 && <Text style={{color:'white'}}>très faible</Text> }
                                {parseInt(this.state.valuesNumberQualite[0],10)  == 1 && <Text style={{color:'white'}}>faible</Text> }
                                {parseInt(this.state.valuesNumberQualite[0],10) == 2 && <Text style={{color:'white'}}>moyenne</Text> }
                                {parseInt(this.state.valuesNumberQualite[0],10) == 3 && <Text style={{color:'white'}}>bonne</Text> }
                                {parseInt(this.state.valuesNumberQualite[0],10)  == 4 && <Text style={{color:'white'}}>très bonne</Text> }
                                {parseInt(this.state.valuesNumberQualite[0],10)  == 5 && <Text style={{color:'white',left:-42}}>exceptionnelle</Text> }
                            </View>
                        </View>
                    </View>





                    {/*<View style={[styles.sliderCtn, {top:-20  }]}>*/}
                    {/*    <View style={[styles.sliderTensionLabel,{bottom: -25}]}>*/}
                    {/*        <Text style={[baseStyles.textColorWhite]}>Implication</Text>*/}
                    {/*    </View>*/}
                    {/*    <CustomSlider*/}
                    {/*        min={0}*/}
                    {/*        max={5}*/}
                    {/*        valueOffstetNumber={()=>{return this.state.valuesNumberImplication}}*/}
                    {/*        LRpadding={40}*/}
                    {/*        callback={(values)=>{*/}
                    {/*            this.singleSliderValueCallbackImplication(values)*/}
                    {/*        }}*/}
                    {/*        single={true}*/}
                    {/*    />*/}
                    {/*    <View style={{top:-18,left: ((this.state.valuesNumberImplication * (screenWidth - 80)) / 5)}}>*/}
                    {/*        {this.state.valuesNumberImplication == 0 && <Text style={{color:'white'}}>très faible</Text> }*/}
                    {/*        {this.state.valuesNumberImplication == 1 && <Text style={{color:'white'}}>faible</Text> }*/}
                    {/*        {this.state.valuesNumberImplication == 2 && <Text style={{color:'white'}}>moyenne</Text> }*/}
                    {/*        {this.state.valuesNumberImplication == 3 && <Text style={{color:'white'}}>bonne</Text> }*/}
                    {/*        {this.state.valuesNumberImplication == 4 && <Text style={{color:'white'}}>très bonne</Text> }*/}
                    {/*        {this.state.valuesNumberImplication == 5 && <Text style={{color:'white',left:-37}}>exceptionnelle</Text> }*/}
                    {/*    </View>*/}
                    {/*</View>*/}



                    <View style={{ flexDirection: "row", width: screenWidth * 0.9, marginLeft: 5 ,marginTop:30,marginBottom:-9}}>
                        <Text style={[{ fontSize: 14,color:'white' }]}>Implication</Text>
                        <View style={{ width: screenWidth * 0.5, }}></View>
                    </View>
                    <View style={{ margin: 5 }}></View>
                    <View style={[styles.sliderCtn]}>
                        <View style={styles.sliderView}>
                            <View style={[styles.markerCtn]}>
                                <View style={[styles.sliderOptionMark, (this.state.valuesNumberImplication[0] >= 0 ? styles.sliderOptionMarkValued : {})]}></View>
                                <View style={[styles.sliderOptionMark, (this.state.valuesNumberImplication[0] >= 1 ? styles.sliderOptionMarkValued : {})]}></View>
                                <View style={[styles.sliderOptionMark, (this.state.valuesNumberImplication[0] >= 2 ? styles.sliderOptionMarkValued : {})]}></View>
                                <View style={[styles.sliderOptionMark, (this.state.valuesNumberImplication[0] >= 3 ? styles.sliderOptionMarkValued : {})]}></View>
                                <View style={[styles.sliderOptionMark, (this.state.valuesNumberImplication[0] >= 4 ? styles.sliderOptionMarkValued : {})]}></View>
                                <View style={[styles.sliderOptionMark, (this.state.valuesNumberImplication[0] >= 5 ? styles.sliderOptionMarkValued : {})]}></View>
                            </View>
                            <Slider
                                style={{ width: "100%", height: 40 }}
                                minimumValue={0}
                                maximumValue={5}
                                minimumTrackTintColor={colors.red}
                                maximumTrackTintColor={"#A5A5A5"}
                                thumbTintColor={colors.red}
                                value={this.state.valuesNumberImplication[0]}
                                onValueChange={(values)=>{
                                    this.setState({valuesNumberImplication:[values]})
                                    console.warn(values,'values')
                                }

                                }
                            />
                            <View style={{top:-5,left: ((parseInt(this.state.valuesNumberImplication[0],10)  * (screenWidth - 80)) / 5)}}>
                                {parseInt(this.state.valuesNumberImplication[0],10) == 0 && <Text style={{color:'white'}}>très faible</Text> }
                                {parseInt(this.state.valuesNumberImplication[0],10)  == 1 && <Text style={{color:'white'}}>faible</Text> }
                                {parseInt(this.state.valuesNumberImplication[0],10) == 2 && <Text style={{color:'white'}}>moyenne</Text> }
                                {parseInt(this.state.valuesNumberImplication[0],10) == 3 && <Text style={{color:'white'}}>bonne</Text> }
                                {parseInt(this.state.valuesNumberImplication[0],10)  == 4 && <Text style={{color:'white'}}>très bonne</Text> }
                                {parseInt(this.state.valuesNumberImplication[0],10)  == 5 && <Text style={{color:'white',left:-42}}>exceptionnelle</Text> }
                            </View>
                        </View>
                    </View>

                    <View style={{width:'100%',alignItems:'center'}}>
                        <View style={{ paddingTop: 10, paddingBottom: 10 }}>
                            <Text style={[baseStyles.titleText]}>
                                {"Commentaire"}
                            </Text>
                        </View>
                    </View>

                    <TouchableOpacity
                        onPress={async ()=>{
                            await  this.setState({showInputcoms:!this.state.showInputcoms});

                            if(this.showInputcoms == true){
                                this.textComment.focus();
                            }
                            //
                        }}
                        style={{
                            flexDirection: "row", alignItems: "center", justifyContent: "space-between", padding: 10,
                            paddingLeft: 15, paddingRight: 15,
                            width: (screenWidth - 40), marginTop: 0, marginBottom: 15,
                            borderWidth: 0, borderColor: colors.white + "00", borderRadius: 5
                        }}
                    >
                        <Text style={[baseStyles.textColorWhite, { fontSize: 12, opacity: 0.6 }]}>
                            Ajouter un commentaire sur l’entraînement
                        </Text>
                        <AutoHeightImage
                            width={14}
                            source={require('../../../assets/icons/left.arrow.white.png')}
                            style={{ transform: [{ rotateY: "180deg" }], opacity: 0.6 }} />
                    </TouchableOpacity>

                    { this.state.showInputcoms &&
                    <TextInput
                        ref={(ref)=>{this.textComment=ref}}
                        style={{backgroundColor:'white',width:screenWidth*0.7,borderRadius:5,height:100,marginBottom:30,
                            textAlignVertical: 'top'
                        }}
                        onChangeText={(text) => {
                            this.setState({ text: text })
                        }}
                        multiline={true}
                        numberOfLines={4}
                        value={""+this.state.text}
                        keyboardAppearance={"default"}
                        // keyboardType={"numeric"}
                        autoFocus={true}

                    />
                    }
                    {this.state.showInputcoms === false &&
                        <TouchableOpacity  onPress={async ()=>{
                            await  this.setState({showInputcoms:!this.state.showInputcoms});

                            if(this.showInputcoms == true){
                                this.textComment.focus();
                            }}}>
                            <Text style={{color:'white',opacity: 0.6,marginBottom:13,textAlign:'center'}}>{this.state.text}</Text>
                        </TouchableOpacity>
                    }


                    <View style={{ marginBottom: 50 }}>
                        <MAAButton text={"VALIDER"} width={(screenWidth - 100)} height={40}
                                   onPress={() => {

                                      this.putUserConnectedTrain()


                                   }}
                                   style={[styles.btnValidate]} />
                    </View>


                </ScrollView>

                <Modal
                    visible={this.state.zonePicker}
                    transparent={true}
                    onRequestClose={() => {
                        this.setState({ zonePicker: false })
                    }}
                >
                    <ZonePicker close={() => {
                        this.setState({ zonePicker: false })
                    }} />
                </Modal>
                <Slidebottom showModal={this.state.showActiviteprincipale}
                             onRequestClose={this._onRequestClose}
                             callback={(item,index)=>{
                                 this._onPressItem(item,index)
                                 console.warn('onpressitem',item)
                             }}
                             items={this.state.entrainement_types}
                             component_item={(item)=>{
                                 return(
                                 <Text style={{color:'#373535'}}>{item.name}</Text>
                                 )
                             }}
                />
                {/*<Modal*/}
                {/*    visible={this.state.showHour}*/}
                {/*    onRequestClose={() => {*/}
                {/*        this.setState({ showHour: false })*/}
                {/*    }}*/}
                {/*    transparent={true}*/}

                {/*><TouchableOpacity*/}
                {/*    onPress={() => {*/}
                {/*        this.setState({ showHour: false })*/}
                {/*    }}*/}
                {/*    style={{*/}
                {/*        position: "absolute",*/}
                {/*        top: 0,*/}
                {/*        left: 0,*/}
                {/*        width: screenWidth,*/}
                {/*        height: screenHeight,*/}
                {/*        zIndex: 0*/}
                {/*    }}*/}
                {/*>*/}
                {/*</TouchableOpacity>*/}
                {/*    <View style={{*/}
                {/*        //marginTop: 20,*/}
                {/*        paddingTop:10,*/}
                {/*        paddingBottom:10,*/}
                {/*        borderRadius: 5,*/}
                {/*        alignSelf: "center",*/}
                {/*        // maxHeight: screenHeight - 60,*/}
                {/*        // minHeight: screenHeight - 60,*/}
                {/*        height:330,*/}
                {/*        backgroundColor: colors.white,*/}
                {/*        transform:[*/}
                {/*            {translateY:(screenHeight/2)-170}*/}
                {/*        ]*/}
                {/*    }}>*/}
                {/*        <ScrollView>*/}
                {/*            {*/}
                {/*                this.state.hours.map((item, index) => {*/}
                {/*                    return (*/}
                {/*                        <TouchableOpacity*/}
                {/*                            onPress={()=> {*/}
                {/*                                this.setState({hourselectionne:item,showHour:false})*/}
                {/*                            }}*/}
                {/*                            style={styles.anneePicker}>*/}
                {/*                            <Text style={{color:'white'}}>{item} h</Text>*/}
                {/*                        </TouchableOpacity>*/}
                {/*                    );*/}
                {/*                })*/}

                {/*            }*/}

                {/*        </ScrollView>*/}
                {/*    </View>*/}
                {/*</Modal>*/}
                <Slidebottom showModal={this.state.showHour}
                             onRequestClose={()=>{
                                 this.setState({showHour:false});
                             }}
                             callback={(item,index)=>{
                                 this.setState({hourselectionne:item,showHour:false})
                             }}
                             items={this.state.hours}
                             component_item={(item)=>{
                                 return(
                                     <Text style={{color:'#373535'}}>{item} h</Text>
                                 )
                             }}
                />
                {/*<Modal*/}
                {/*    visible={this.state.showMinute}*/}
                {/*    onRequestClose={() => {*/}
                {/*        this.setState({ showMinute: false })*/}
                {/*    }}*/}
                {/*    transparent={true}*/}

                {/*><TouchableOpacity*/}
                {/*    onPress={() => {*/}
                {/*        this.setState({ showMinute: false })*/}
                {/*    }}*/}
                {/*    style={{*/}
                {/*        position: "absolute",*/}
                {/*        top: 0,*/}
                {/*        left: 0,*/}
                {/*        width: screenWidth,*/}
                {/*        height: screenHeight,*/}
                {/*        zIndex: 0*/}
                {/*    }}*/}
                {/*>*/}
                {/*</TouchableOpacity>*/}
                {/*    <View style={{*/}
                {/*       // marginTop: 20,*/}
                {/*        paddingTop:10,*/}
                {/*        paddingBottom:10,*/}
                {/*        borderRadius: 5,*/}
                {/*        alignSelf: "center",*/}
                {/*        // maxHeight: screenHeight - 60,*/}
                {/*        // minHeight: screenHeight - 60,*/}
                {/*        height:220,*/}
                {/*        transform:[*/}
                {/*            {translateY:(screenHeight/2)-110}*/}
                {/*        ],*/}
                {/*        backgroundColor: colors.white,*/}
                {/*    }}>*/}
                {/*        <ScrollView>*/}
                {/*            {*/}
                {/*                this.state.minutes.map((item, index) => {*/}
                {/*                    return (*/}
                {/*                        <TouchableOpacity*/}
                {/*                            onPress={()=> {*/}
                {/*                                this.setState({minuteselectionne:item,showMinute:false})*/}
                {/*                            }}*/}
                {/*                            style={styles.anneePicker}>*/}
                {/*                            <Text style={{color:'white'}}>{item} mn</Text>*/}
                {/*                        </TouchableOpacity>*/}
                {/*                    );*/}
                {/*                })*/}

                {/*            }*/}

                {/*        </ScrollView>*/}
                {/*    </View>*/}
                {/*</Modal>*/}
                <Slidebottom showModal={this.state.showMinute}
                             onRequestClose={()=>{
                                 this.setState({showMinute:false});
                             }}
                             callback={(item,index)=>{
                                 this.setState({minuteselectionne:item,showMinute:false})
                             }}
                             items={this.state.minutes}
                             component_item={(item)=>{
                                 return(
                                     <Text style={{color:'#373535'}}>{item} mn</Text>
                                 )
                             }}
                />
            </LinearGradient>
            </KeyboardAwareScrollView>
        )
    }
}

// export default AddTension;
const mapStateToProps = (state) => {
    const { selectedZone,popToTop,userToken } = state.statedata
    return { selectedZone,popToTop,userToken }
};

export default connect(mapStateToProps)(AddTraining);
