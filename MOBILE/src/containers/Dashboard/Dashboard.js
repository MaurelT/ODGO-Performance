import React, { Fragment, Component } from 'react';
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    Dimensions,
    ImageBackground,
    View,
    Text,
    TouchableOpacity,
    Modal,
    Animated,
    Easing,
    RefreshControl,
    Alert,
    AppRegistry,
    StyleSheet,
    PanResponder, Platform,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-community/async-storage';
// import ProgressCircle from 'react-native-progress-circle';
import styles from './styles';
import colors from '../../configs/colors';
import AutoHeightImage from 'react-native-auto-height-image';
import baseStyles from '../../base/BaseStyles';
import Calendar from '../Calendar/Calendar';
import { connect } from 'react-redux';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import msi from "../../apis/helpers/sommeil_helper";

import {
    SET_ACTIVE_TAB,
    SET_LISTE_ACTIVITE_PROGRAM,
    SET_PARAM_FOR_CALENDAR,
    SET_POP_TO_TOP,
    SET_FACTEUR_NUISIBLE,
    SET_FOR_RETOUR_TRAIN
} from '../../redux/types/tabTypes';
import dashboardHelper from "../../apis/helpers/dashboard_helper";
import PersonalDataHelper from '../../apis/helpers/person_data_helper';
import {getDashboar, getSelectionnerNossuggestionsAll} from '../../apis/FonctionRedondant';
import statusBarHeight from '../../configs/screen';
import ImagePicker from 'react-native-image-picker';
import calendarEventHelper from '../../apis/helpers/calendarEvent_helper';
import moment from 'moment';

import {Agenda} from 'react-native-calendars';
import {LocaleConfig} from 'react-native-calendars';

LocaleConfig.locales['fr'] = {
  monthNames: ['Janvier','Février','Mars','Avril','Mai','Juin','Juillet','Août','Septembre','Octobre','Novembre','Décembre'],
  monthNamesShort: ['Janv.','Févr.','Mars','Avril','Mai','Juin','Juil.','Août','Sept.','Oct.','Nov.','Déc.'],
  dayNames: ['Dimanche','Lundi','Mardi','Mercredi','Jeudi','Vendredi','Samedi'],
  dayNamesShort: ['Dim.','Lun.','Mar.','Mer.','Jeu.','Ven.','Sam.'],
  today: 'Aujourd\'hui'
};

LocaleConfig.defaultLocale = 'fr';

const screen = Dimensions.get("window");
const window = Dimensions.get("window");
const SBHelight = statusBarHeight;
const screenWidth = screen.width
const screenHeight = screen.height - SBHelight;

const options = {
    title: 'Sélectionner une photo',
    takePhotoButtonTitle: 'Prendre photo',
    chooseFromLibraryButtonTitle: 'Depuis la librairie',
    cancelButtonTitle:'Annuler',
    quality: 0.3,
};

class Dashboard extends Component {

    constructor(props) {
        super(props)
        this.state = {
            showCalendar: false,
            pourcentageShow: 0,
            pValue: new Animated.Value(0),
            value: 0,
            dashboard:null,
            //image
            dataImage: null,
            type: null,
            fileName: null,
            responseImage:null,
            avatarSource:null,
            avatarSource_:null,
        };
        let tomorrow = new Date();
        this.defaultplanning = [{
            "user_id": 1,
            "periode": "AM",
            "heure_debut": moment(new Date()).format("YYYY-MM-DD")+"T04:00:00",
            "heure_fin": moment(new Date()).format("YYYY-MM-DD")+"T08:00:00",
            "activite_type": {
                "name": "Repos"
            },
            "type": "soleil_levant",
            "is_ampty": true
        },{
            "user_id": 2,
            "periode": "PM",
            "heure_debut": moment(new Date()).format("YYYY-MM-DD")+"T08:01:00",
            "heure_fin": moment(new Date()).format("YYYY-MM-DD")+"T16:59:00",
            "activite_type": {
                "name": "Repos"
            },
            "type": "soleil",
            "is_ampty": true
        }
            ,{
                "user_id": 2,
                "periode": "PM",
                "heure_debut": moment(new Date()).format("YYYY-MM-DD")+"T17:00:00",
                "heure_fin": moment(new Date()).format("YYYY-MM-DD")+"T19:00:00",
                "activite_type": {
                    "name": "Repos"
                },
                "type": "soleil_couchant",
                "is_ampty": true
            }
            ,{
                "user_id": 2,
                "periode": "PM",
                "heure_debut": moment(new Date()).format("YYYY-MM-DD")+"T19:01:00",
                "heure_fin": moment(tomorrow.setDate(tomorrow.getDate() + 1)).format("YYYY-MM-DD")+"T04:00:00",
                "activite_type": {
                    "name": "Repos"
                },
                "type": "lune",
                "is_ampty": true
            },
        ]
        this.animatedValue = null;
    }


    componentWillMount() {
        this.animatedValue = new Animated.ValueXY();
        this._value = {x: 0, y: 0};
        this.animatedValue.addListener((value) => this._value = value);
        this.panResponder = PanResponder.create({
            onStartShouldSetPanResponder: (evt, gestureState) => true,
            // onMoveShouldSetPanResponder: (evt, gestureState) => true, //taloha
            onMoveShouldSetPanResponder: (evt, { dx, dy }) => dx !== 0 || dy !== 0,

            onPanResponderGrant: (e, gestureState) => {
                this.animatedValue.setOffset({
                    x: this._value.x,
                    y: this._value.y,
                });
                this.animatedValue.setValue({ x: 0, y: 0})
            },
            onPanResponderMove: Animated.event([
                null, { dx: this.animatedValue.x, dy: this.animatedValue.y}
            ]),
            // onPanResponderMove: (e, gestureState)=> {
            //     (this.animatedValue.x._value > screenWidth && this.animatedValue.y._value > screenHeight) ? null : Animated.event([
            //         null,
            //         {dx: this.animatedValue.x, dy: this.animatedValue.y},
            //     ])(e, gestureState)
            // },
            onPanResponderRelease: (e, gestureState) => {
                this.animatedValue.flattenOffset();
                Animated.decay(this.animatedValue, {
                    deceleration: 0.997,
                    velocity: { x: gestureState.vx, y: gestureState.vy }
                }).start();
            },
        })
    }


    componentDidMount() {
        this.setState({refreshing: true});
        PersonalDataHelper.getUserData(this.props.userToken).then((response)=>{
            global.is_individual = response.data.sport_niveau_club.sport_niveaux.sport.is_individual
        });
        this.setState({refreshing:true});
        getSelectionnerNossuggestionsAll(this.props.userToken,this.props).then(()=>this.setState({refreshing:false}));

        this.circularProgress11.animate(100, 0, Easing.quad);
        this.circularProgress1.animate(0, 4000, Easing.quad);

        this.circularProgress22.animate(100, 0, Easing.quad);
        this.circularProgress2.animate(0, 4000, Easing.quad);

        this.circularProgress33.animate(100, 0, Easing.quad);
        this.circularProgress3.animate(0, 4000, Easing.quad);

        this.state.pValue.addListener(({ value }) => {
                //this.setState({ value: parseInt(value) })
            }
        );


        getDashboar(dashboardHelper,this.props).then((refreshingfalse) => {
            this.setState({refreshing: refreshingfalse,
                value:this.props.dashboard.data.indice_performance});
            // if(this.props.dashboard !== null && this.props.dashboard.data.background_url !=="https://odgo.makeitdev.fr/img/background/default.jpg" ){
            //     this.setState({avatarSource:this.props.dashboard.data.background_url})
            // }


                this.setState({avatarSource_:this.props.dashboard.data.background_url})
            this.state.value > 100 ?
                Animated.timing(
                    this.state.pValue,
                    {
                        toValue: 100,
                        duration: 50 * 100
                    }
                ).start(() => { })
                :
                this.state.value < 0 ?
                    Animated.timing(
                        this.state.pValue,
                        {
                            toValue: 0,
                            duration: 50 * 0
                        }
                    ).start(() => { })
                    :
                    Animated.timing(
                        this.state.pValue,
                        {
                            toValue: this.state.value,
                            duration: 50 * this.state.value
                        }
                    ).start(() => { })
        })
    }





    changephotoprofil = async () => {
        this.setState({refreshing:true});
        if(this.state.fileName !== null && this.state.type !== null && this.state.dataImage !== null ){
            let dataimageprofil = {"picture":{
                "type": this.state.type,
                "fileName":this.state.fileName,
                "data": this.state.dataImage}
            };
            const changephoto = await dashboardHelper.changephotoprofil(this.props.userToken,dataimageprofil);
            if (changephoto.success === true) {
                this.setState({refreshing:false});
                Alert.alert('Odgo','Photo modifiée avec succès.',[{
                    text: 'Ok',
                    onPress: () => {
                        this.setState({refreshing: true});
                        getDashboar(dashboardHelper,this.props).then((refreshingfalse)=>{
                            if(this.props.dashboard !== null && this.props.dashboard.data.background_url !=="https://odgo.makeitdev.fr/img/background/default.jpg" ){
                                this.setState({avatarSource_:this.props.dashboard.data.background_url})
                            }
                            this.setState({refreshing: refreshingfalse});
                        })
                    },
                }])
            }else{
                this.setState({refreshing:false});
                Alert.alert('Odgo','Une erreur est survenue lors de l\'envoi.')
            }
        }else{
            this.setState({refreshing:false});
        }
    };

    getImage(){
        ImagePicker.showImagePicker(options, (response) => {
            this.setState({refreshing:true});
            if (response.didCancel) {
                this.setState({refreshing:false});
                console.log('User cancelled image picker');
            }
            else if (response.error) {
                this.setState({refreshing:false});
                console.log('ImagePicker Error: ', response.error);
            }
            else if (response.customButton) {
                this.setState({refreshing:false});
                console.log('User tapped custom button: ', response.customButton);
            }
            else {
                this.setState({refreshing:false});
                let source = { uri: response.uri };
                this.setState({
                    dataImage: response.data,
                    type: response.type,
                    fileName: response.fileName,
                    responseImage:response,
                    avatarSource:response.uri,
                });
            }
        });

    }

    // getDashboard = async () => {
    //     this.setState({refreshing: true});
    //     const dashboard = await dashboardHelper.getDashboard(this.props.userToken);
    //     if (dashboard) {
    //         this.setState({refreshing: false,dashboard:dashboard,value:dashboard.data.indice_performance});
    //         // console.warn(dashboard)
    //         return dashboard.data.indice_performance;
    //     }
    // };






    render() {

        // var decimal = null;
        // if(this.state.nbhsommeil !== null ){
        //     if(this.state.nbhsommeil % 1 !==0 ){
        //         let  aloha = Number(String(this.state.nbhsommeil).substr(String(this.state.nbhsommeil).indexOf('.')+1));
        //         let afara = Number(String(this.state.nbhsommeil).substr(String(this.state.nbhsommeil).indexOf('.')+2))
        //         if(afara === 0){
        //             decimal = aloha +''+afara
        //         }else {
        //             decimal = aloha
        //         }
        //     }else{
        //         decimal = null;
        //     }
        // }

        let isrestrictget_videotheque = false;
        let isrestrictget_besoin_hydro = false;
        let isrestrictget_besoin_kcal = false;
        let isrestrictget_besoin_sommeil = false;
        let isrestrictget_agenda = false;
        if(this.props.droits.length>0){
            for(let i = 0; i < this.props.droits.length; i++){
                if(this.props.droits[i].name === "get_besoin_kcal"){
                    isrestrictget_besoin_kcal = this.props.droits[i].is_restrict;
                }
                if(this.props.droits[i].name === "get_besoin_hydro"){
                    isrestrictget_besoin_hydro = this.props.droits[i].is_restrict;
                }
                if(this.props.droits[i].name === "get_videotheque"){
                    isrestrictget_videotheque = this.props.droits[i].is_restrict;
                }
                if(this.props.droits[i].name === "get_besoin_sommeil"){
                    isrestrictget_besoin_sommeil  = this.props.droits[i].is_restrict;
                }
                if(this.props.droits[i].name === "get_agenda"){
                    isrestrictget_agenda  = this.props.droits[i].is_restrict;
                }
            }
        }

        const animatedStyle = {
            transform: this.animatedValue.getTranslateTransform()
        }

        let itemplaningforshow = 0;

        var hourSommeil = '0';
        if(this.props.dashboard !== null){
            if(this.props.dashboard.data.nb_heure_sommeil % 1 !== 0 ){
                // hourSommeil = Math.trunc(this.props.dashboard.data.nb_heure_sommeil) + 'h' + Number(String(this.props.dashboard.data.nb_heure_sommeil).substr(String(this.props.dashboard.data.nb_heure_sommeil).indexOf('.')+1)).toString().padEnd(2, '0')
                // let  aloha = Number(String(this.props.dashboard.data.nb_heure_sommeil).substr(String(this.props.dashboard.data.nb_heure_sommeil).indexOf('.')+1));
                // let afara = Number(String(this.props.dashboard.data.nb_heure_sommeil).substr(String(this.props.dashboard.data.nb_heure_sommeil).indexOf('.')+1))

                let aloha = this.props.dashboard.data.nb_heure_sommeil.toString().split('.')[0];
                let afara = this.props.dashboard.data.nb_heure_sommeil.toString().split('.')[1];
                hourSommeil = aloha + 'h' + afara.toString().padEnd(2,'0');
            }else {
                hourSommeil = this.props.dashboard.data.nb_heure_sommeil
            }
        }


        var hourObjectifSommeil = '0 h';
        if(this.props.dashboard !== null){
            if((this.props.dashboard.data.objectif_sommeil === null?0:this.props.dashboard.data.objectif_sommeil) % 1 !== 0 ){
                hourObjectifSommeil = Math.trunc((this.props.dashboard.data.objectif_sommeil === null?0:this.props.dashboard.data.objectif_sommeil)) + 'h' + (Number(String((this.props.dashboard.data.objectif_sommeil === null?0:this.props.dashboard.data.objectif_sommeil)).substr(String((this.props.dashboard.data.objectif_sommeil === null?0:this.props.dashboard.data.objectif_sommeil)).indexOf('.')+1))).toString().padEnd(2, '0')
            }else {
                hourObjectifSommeil = (this.props.dashboard.data.objectif_sommeil === null?0:this.props.dashboard.data.objectif_sommeil) +'h'
            }
        }

        let centpourcentSommeil  =  this.props.dashboard !== null && (this.props.dashboard.data.objectif_sommeil === null?0:this.props.dashboard.data.objectif_sommeil);
        let sommeil_ =  this.props.dashboard !== null && this.props.dashboard.data.nb_heure_sommeil;
        let  sommeil_percent = Math.trunc( (sommeil_ *100) / centpourcentSommeil);
        if(sommeil_percent>100){
            sommeil_percent =100;
        }
        // if(this.circularProgress11){
        //     if(this.circularProgress1) {
        //         this.circularProgress1.animate(0, 4000, Easing.quad);
        //     }
        // }
        if(this.circularProgress1) {
            if (this.props.dashboard !== null) {
                if (this.circularProgress1 !== undefined) {
                    try {
                        this.circularProgress1.animate(sommeil_percent, 4000, Easing.quad);
                    }catch (e) { }
                }
            }
        }

        let centpourcentHydratation = this.props.dashboard !== null && (this.props.dashboard.data.objectif_hydratation);
        let hydratation_ = this.props.dashboard !== null && (this.props.dashboard.data.nb_hydratation_l);
        let  hydratation_percent =  Math.trunc((hydratation_ *100) / centpourcentHydratation);
        let  hydratation_percentaffiche =  (hydratation_ *100)/centpourcentHydratation
        if(hydratation_percent>100){
            hydratation_percent =100;
        }

        // if(this.circularProgress33){
        //     if(this.circularProgress3) {
        //         this.circularProgress3.animate(0, 4000, Easing.quad);
        //     }
        // }
        if(this.circularProgress3) {
            if (this.props.dashboard !== null) {
                if (this.circularProgress3 !== undefined) {
                    try {
                        this.circularProgress3.animate(hydratation_percent, 4000, Easing.quad);
                    }catch (e) { }
                }
            }
        }


        // let kilocalorie_ = this.props.dashboard !== null && this.props.dashboard.data.nb_kcal.toFixed(2)
        let kilocalorie_ = 0;
        let centpourcentKilocalorie = 0;
        let kilocalorie_percent = 0;
        if(!isrestrictget_besoin_kcal){
             kilocalorie_ = this.props.dashboard !== null && Math.trunc(this.props.dashboard.data.nb_kcal)
             centpourcentKilocalorie =  this.props.dashboard !== null && this.props.dashboard.data.objectif_kcal;
             kilocalorie_percent = Math.trunc( (kilocalorie_ *100) / centpourcentKilocalorie);
            if(kilocalorie_percent>100){
                kilocalorie_percent =100;
            }
        }


        // if(this.circularProgress22){
        //     if(this.circularProgress2) {
        //         this.circularProgress2.animate(0, 4000, Easing.quad);
        //     }
        // }
        if(this.circularProgress2) {
            if (this.props.dashboard !== null) {
                if (this.circularProgress2 !== undefined) {
                    try {
                        this.circularProgress2.animate(kilocalorie_percent, 4000, Easing.quad);
                    }catch (e) { }
                }
            }
        }





        return (
            <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }} colors={[colors.balck, colors.balck, colors.balck]} style={baseStyles.linearGradient}>
                <ScrollView
                    // contentInsetAdjustmentBehavior="automatic"
                    style={styles.scrollView}
                    contentContainerStyle={[styles.contentContainerStyle]}
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.refreshing}
                            onRefresh={() => {
                                getDashboar(dashboardHelper,this.props).then(()=>{})
                            }}

                            tintColor={Platform.OS==='ios'?colors.white:colors.green}
                            colors={[Platform.OS==='ios'?colors.white:colors.green]}
                        />
                    }
                >

                    {this.state.avatarSource !== null ? <ImageBackground
                         source={{uri:this.state.avatarSource}}
                        //source={{uri:this.state.avatarSource}}
                        style={[styles.imageBG]}
                    >
                        <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }}
                                        colors={[
                                            colors.balck + 'BB',
                                            "transparent",
                                            "transparent",
                                            "transparent",
                                            "transparent",
                                            colors.balck + 'BB',
                                            // colors.green + "CC",
                                            // colors.green + "CC",
                                            // colors.green + "CC",
                                            // colors.green + "CC",
                                            // colors.green + "CC",
                                            // colors.green + "CC",
                                            // colors.green + "CC",
                                            // colors.green + "CC",
                                            // colors.green + "CC",
                                            // colors.green + "CC",
                                            // colors.green + "CC",
                                            // colors.green + "CC",
                                            // colors.green + "CC",
                                            // colors.balck
                                        ]}
                                        style={[styles.linearGradientOvelay,{justifyContent:'space-between'}]}>

                               {!isrestrictget_agenda ? <TouchableOpacity
                                    onPress={() => {
                                        if(this.props.activeTab == "home"){
                                            // this.setState({showCalendar: true})
                                            this.props.navigation.navigate("Calendar")
                                        } else {

                                            const setPopToTop = { type: SET_POP_TO_TOP, value: 'home' };
                                            this.props.dispatch(setPopToTop);
                                        }
                                    }}
                                    style={{width:'100%',height: 40,flexDirection:'row',justifyContent:'center',marginTop:15}}>
                                    <AutoHeightImage
                                        width={20}
                                        source={require("../../assets/icons/arrow-white.png")}
                                        style={{
                                            transform: [
                                                { rotateY: "180deg" }
                                            ],
                                            marginRight:30,
                                            left:-screenWidth*0.008
                                        }} />
                                    <Text style={[baseStyles.textColorWhite]}>
                                        AUJOURD'HUI
                                    </Text>

                                </TouchableOpacity>
                               :
                                   <View

                                       style={{width:'100%',alignSelf:'center',height: 40,flexDirection:'row',justifyContent:'center',alignItems:'center',marginTop:15}}>
                                       <AutoHeightImage
                                           width={20}
                                           source={require("../../assets/icons/arrow-white.png")}
                                           style={{
                                               transform: [
                                                   { rotateY: "180deg" }
                                               ],
                                               marginRight:35,
                                               tintColor:colors.textgrisee
                                           }} />
                                       <Text style={[baseStyles.textColorWhite,{color:colors.textgrisee}]}>
                                           AUJOURD'HUI
                                       </Text>

                                   </View>
                               }
                            <View style={{position:'absolute',width:'100%',justifyContent:'flex-end'}}>
                            <TouchableOpacity
                                onPress={this.getImage.bind(this)}
                                style={{height: 40,}}>
                                <AutoHeightImage
                                    width={20}
                                    source={require('../../assets/icons/add-photo.png')}
                                    style={{ opacity: 20,alignSelf:'flex-end',marginRight:screenWidth*0.02}} />
                            </TouchableOpacity>
                            </View>
                            { this.state.fileName !== null && this.state.type !== null && this.state.dataImage !== null &&
                            <View style={[
                                // animatedStyle,
                                {flexDirection:'column',marginBottom:screenHeight*0.13,borderWidth:1,borderColor:'white',padding:5,borderRadius:5,zIndex:1000}]}>
                                <TouchableOpacity style={{
                                    backgroundColor:colors.red,
                                    paddingVertical:3,
                                    paddingHorizontal:10,
                                    alignItems:"center",
                                    justifyContent:"center",
                                    borderRadius:screenHeight*0.03,
                                    zIndex:1000
                                    // borderWidth:1,
                                    // borderColor:'red',

                                }}
                                                  onPress={()=>{
                                                      this.changephotoprofil().then(()=>{
                                                          this.setState({
                                                              fileName:null,
                                                              type:null,
                                                              dataImage:null
                                                          })
                                                      })
                                                  }}
                                >
                                    <Text style={{color:'white', fontSize:11}}>Changer la photo</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={{
                                    backgroundColor:'transparent',
                                    paddingVertical:2,
                                    paddingHorizontal:10,
                                    alignItems:"center",
                                    justifyContent:"center",
                                    borderRadius:screenHeight*0.03,
                                    borderWidth:1,
                                    borderColor:'white',
                                    marginTop:3,
                                    zIndex:1001

                                }}
                                                  onPress={()=>{
                                                      this.setState({
                                                          fileName:null,
                                                          type:null,
                                                          dataImage:null,
                                                          avatarSource:null
                                                      })
                                                  }}
                                >
                                    <Text style={{color:'white', fontSize:11}}>Annuler</Text>
                                </TouchableOpacity>
                            </View>
                            }
                        </LinearGradient>
                    </ImageBackground>
                :
                (this.props.dashboard !== null && this.props.dashboard.data.background_url )?
                 <ImageBackground
                source={{uri:this.props.dashboard.data.background_url}}
               //source={{uri:this.state.avatarSource}}
               style={[styles.imageBG]}
           >
               <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }}
                               colors={[
                                   colors.balck + 'BB',
                                   "transparent",
                                   "transparent",
                                   "transparent",
                                   "transparent",
                                   colors.balck + 'BB',

                               ]}
                               style={[styles.linearGradientOvelay,{justifyContent:'space-between'}]}>

                      {!isrestrictget_agenda ? <TouchableOpacity
                           onPress={() => {
                               if(this.props.activeTab == "home"){
                                   // this.setState({showCalendar: true})
                                   this.props.navigation.navigate("Calendar")
                               } else {

                                   const setPopToTop = { type: SET_POP_TO_TOP, value: 'home' };
                                   this.props.dispatch(setPopToTop);
                               }
                           }}
                           style={{width:'100%',height: 40,flexDirection:'row',justifyContent:'center',marginTop:15}}>
                           <AutoHeightImage
                               width={20}
                               source={require("../../assets/icons/arrow-white.png")}
                               style={{
                                   transform: [
                                       { rotateY: "180deg" }
                                   ],
                                   marginRight:30,
                                   left:-screenWidth*0.008
                               }} />
                           <Text style={[baseStyles.textColorWhite]}>
                               AUJOURD'HUI
                           </Text>

                       </TouchableOpacity>
                      :
                          <View

                              style={{width:'100%',alignSelf:'center',height: 40,flexDirection:'row',justifyContent:'center',alignItems:'center',marginTop:15}}>
                              <AutoHeightImage
                                  width={20}
                                  source={require("../../assets/icons/arrow-white.png")}
                                  style={{
                                      transform: [
                                          { rotateY: "180deg" }
                                      ],
                                      marginRight:35,
                                      tintColor:colors.textgrisee
                                  }} />
                              <Text style={[baseStyles.textColorWhite,{color:colors.textgrisee}]}>
                                  AUJOURD'HUI
                              </Text>

                          </View>
                      }
                   <View style={{position:'absolute',width:'100%',justifyContent:'flex-end'}}>
                   <TouchableOpacity
                       onPress={this.getImage.bind(this)}
                       style={{height: 40,}}>
                       <AutoHeightImage
                           width={20}
                           source={require('../../assets/icons/add-photo.png')}
                           style={{ opacity: 20,alignSelf:'flex-end',marginRight:screenWidth*0.02}} />
                   </TouchableOpacity>
                   </View>
                   { this.state.fileName !== null && this.state.type !== null && this.state.dataImage !== null &&
                   <View style={[
                       // animatedStyle,
                       {flexDirection:'column',marginBottom:screenHeight*0.13,borderWidth:1,borderColor:'white',padding:5,borderRadius:5,zIndex:1000}]}>
                       <TouchableOpacity style={{
                           backgroundColor:colors.red,
                           paddingVertical:3,
                           paddingHorizontal:10,
                           alignItems:"center",
                           justifyContent:"center",
                           borderRadius:screenHeight*0.03,
                           zIndex:1000
                           // borderWidth:1,
                           // borderColor:'red',

                       }}
                                         onPress={()=>{
                                             this.changephotoprofil().then(()=>{
                                                 this.setState({
                                                     fileName:null,
                                                     type:null,
                                                     dataImage:null
                                                 })
                                             })
                                         }}
                       >
                           <Text style={{color:'white', fontSize:11}}>Changer la photo</Text>
                       </TouchableOpacity>
                       <TouchableOpacity style={{
                           backgroundColor:'transparent',
                           paddingVertical:2,
                           paddingHorizontal:10,
                           alignItems:"center",
                           justifyContent:"center",
                           borderRadius:screenHeight*0.03,
                           borderWidth:1,
                           borderColor:'white',
                           marginTop:3,
                           zIndex:1001

                       }}
                                         onPress={()=>{
                                             this.setState({
                                                 fileName:null,
                                                 type:null,
                                                 dataImage:null,
                                                 avatarSource:null
                                             })
                                         }}
                       >
                           <Text style={{color:'white', fontSize:11}}>Annuler</Text>
                       </TouchableOpacity>
                   </View>
                   }
               </LinearGradient>
           </ImageBackground>
                    :
                    <ImageBackground
                       // source={{uri:this.props.dashboard.data.background_url}}
                        //source={{uri:this.state.avatarSource}}
                        style={[styles.imageBG]}
                    >
                        <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }}
                                        colors={[
                                            colors.balck + 'BB',
                                            "transparent",
                                            "transparent",
                                            "transparent",
                                            "transparent",
                                            colors.balck + 'BB',

                                        ]}
                                        style={[styles.linearGradientOvelay,{justifyContent:'space-between'}]}>

                            {!isrestrictget_agenda ? <TouchableOpacity
                                    onPress={() => {
                                        if(this.props.activeTab == "home"){
                                            // this.setState({showCalendar: true})
                                            this.props.navigation.navigate("Calendar")
                                        } else {

                                            const setPopToTop = { type: SET_POP_TO_TOP, value: 'home' };
                                            this.props.dispatch(setPopToTop);
                                        }
                                    }}
                                    style={{width:'100%',height: 40,flexDirection:'row',justifyContent:'center',marginTop:15}}>
                                    <AutoHeightImage
                                        width={20}
                                        source={require("../../assets/icons/arrow-white.png")}
                                        style={{
                                            transform: [
                                                { rotateY: "180deg" }
                                            ],
                                            marginRight:30,
                                            left:-screenWidth*0.008
                                        }} />
                                    <Text style={[baseStyles.textColorWhite]}>
                                        AUJOURD'HUI
                                    </Text>

                                </TouchableOpacity>
                                :
                                <View

                                    style={{width:'100%',alignSelf:'center',height: 40,flexDirection:'row',justifyContent:'center',alignItems:'center',marginTop:15}}>
                                    <AutoHeightImage
                                        width={20}
                                        source={require("../../assets/icons/arrow-white.png")}
                                        style={{
                                            transform: [
                                                { rotateY: "180deg" }
                                            ],
                                            marginRight:35,
                                            tintColor:colors.textgrisee
                                        }} />
                                    <Text style={[baseStyles.textColorWhite,{color:colors.textgrisee}]}>
                                        AUJOURD'HUI
                                    </Text>

                                </View>
                            }
                            <View style={{position:'absolute',width:'100%',justifyContent:'flex-end'}}>
                                <TouchableOpacity
                                    onPress={this.getImage.bind(this)}
                                    style={{height: 40,}}>
                                    <AutoHeightImage
                                        width={20}
                                        source={require('../../assets/icons/add-photo.png')}
                                        style={{ opacity: 20,alignSelf:'flex-end',marginRight:screenWidth*0.02}} />
                                </TouchableOpacity>
                            </View>
                            { this.state.fileName !== null && this.state.type !== null && this.state.dataImage !== null &&
                            <View style={[
                                // animatedStyle,
                                {flexDirection:'column',marginBottom:screenHeight*0.13,borderWidth:1,borderColor:'white',padding:5,borderRadius:5,zIndex:1000}]}>
                                <TouchableOpacity style={{
                                    backgroundColor:colors.red,
                                    paddingVertical:3,
                                    paddingHorizontal:10,
                                    alignItems:"center",
                                    justifyContent:"center",
                                    borderRadius:screenHeight*0.03,
                                    zIndex:1000
                                    // borderWidth:1,
                                    // borderColor:'red',

                                }}
                                                  onPress={()=>{
                                                      this.changephotoprofil().then(()=>{
                                                          this.setState({
                                                              fileName:null,
                                                              type:null,
                                                              dataImage:null
                                                          })
                                                      })
                                                  }}
                                >
                                    <Text style={{color:'white', fontSize:11}}>Changer la photo</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={{
                                    backgroundColor:'transparent',
                                    paddingVertical:2,
                                    paddingHorizontal:10,
                                    alignItems:"center",
                                    justifyContent:"center",
                                    borderRadius:screenHeight*0.03,
                                    borderWidth:1,
                                    borderColor:'white',
                                    marginTop:3,
                                    zIndex:1001

                                }}
                                                  onPress={()=>{
                                                      this.setState({
                                                          fileName:null,
                                                          type:null,
                                                          dataImage:null,
                                                          avatarSource:null
                                                      })
                                                  }}
                                >
                                    <Text style={{color:'white', fontSize:11}}>Annuler</Text>
                                </TouchableOpacity>
                            </View>
                            }
                        </LinearGradient>
                    </ImageBackground>
                }

                    <View style={[styles.statCtn]}>
                        <View style={[styles.statMeterCtn]}>

                            <View style={[styles.outerProgress]}>
                                <AnimatedCircularProgress
                                    ref={(ref) => this.circularProgress11 = ref}
                                    size={screenWidth * 0.3}
                                    width={10}
                                    rotation={-360}
                                    tintColor={!isrestrictget_besoin_sommeil ? colors.green:colors.textgrisee}
                                    lineCap={"round"}
                                    style={{
                                        overflow: "hidden",
                                        position:'absolute',
                                    }}
                                    backgroundColor="transparent"
                                ></AnimatedCircularProgress>
                                <AnimatedCircularProgress
                                    ref={(ref) => this.circularProgress1 = ref}
                                    size={screenWidth * 0.3}
                                    width={10}
                                    rotation={-360}
                                    tintColor={!isrestrictget_besoin_sommeil ? colors.red : colors.textgrisee}
                                    lineCap={"round"}
                                    style={{
                                        overflow: "hidden",
                                    }}
                                    backgroundColor="transparent"
                                >
                                    {
                                        (fill) => (
                                            <ImageBackground
                                                style={{ width: screenWidth * 0.25, height: screenWidth * 0.23, alignItems: "center" }}
                                                source={require("../../assets/images/bb.png")}>
                                                {!isrestrictget_besoin_sommeil?<TouchableOpacity
                                                    onPress={async() => {
                                                        if(this.props.activeTab == "home"){
                                                           // this.setState({refreshing:true})
                                                          //  const facteurNuisible = await msi.getFacteurNuisible(this.props.userToken);
                                                            //if (facteurNuisible) {
                                                              //  const SS = { type: SET_FACTEUR_NUISIBLE, value: facteurNuisible }
                                                                //this.props.dispatch(SS);
                                                                const setActiveTab = { type: SET_ACTIVE_TAB, value: "Sommeil" }
                                                            this.props.dispatch(setActiveTab);
                                                            this.setState({refreshing:false})
                                                            const setPopToTop = { type: SET_POP_TO_TOP, value: '' };
                                                            this.props.dispatch(setPopToTop);
                                                            //}else{
                                                              //  const setActiveTab = { type: SET_ACTIVE_TAB, value: "Sommeil" }
                                                                //this.props.dispatch(setActiveTab);
                                                                //const setPopToTop = { type: SET_POP_TO_TOP, value: '' };
                                                                //this.props.dispatch(setPopToTop);
                                                            //}

                                                        } else {
                                                            const setPopToTop = { type: SET_POP_TO_TOP, value: 'home' };
                                                            this.props.dispatch(setPopToTop);
                                                        }
                                                    }}


                                                    style={{ alignItems: "center", justifyContent: "center", flex: 1 }}>
                                                    <AutoHeightImage
                                                        width={20}
                                                        source={require("../../assets/icons/sleep.stat.white.png")} />
                                                    <View style={[styles.valueCtn]}>
                                                        <Text style={[styles.textBold, { fontSize: 16 }]}>
                                                            {/*6h45*/}
                                                            {hourSommeil}
                                                        </Text>
                                                        <Text style={[styles.qtText]}>/
                                                            {/*8H*/}
                                                            {hourObjectifSommeil}
                                                        </Text>
                                                    </View>
                                                </TouchableOpacity>
                                                    :
                                                    <View

                                                        style={{ alignItems: "center", justifyContent: "center", flex: 1 }}>
                                                        <AutoHeightImage
                                                            width={20}
                                                            style={{tintColor:!isrestrictget_besoin_sommeil? "white" : colors.textgrisee}}
                                                            source={require("../../assets/icons/sleep.stat.white.png")} />
                                                        <View style={[styles.valueCtn]}>
                                                            <Text style={[styles.textBold, { fontSize: 16,color:!isrestrictget_besoin_sommeil?"white":colors.textgrisee }]}>
                                                                {/*6h45*/}
                                                                {hourSommeil}
                                                            </Text>
                                                            <Text style={[styles.qtText,{color:!isrestrictget_besoin_sommeil?"white":colors.textgrisee}]}>/
                                                                {/*8H*/}
                                                                {hourObjectifSommeil}
                                                            </Text>
                                                        </View>
                                                    </View>
                                                }
                                            </ImageBackground>
                                        )
                                    }
                                </AnimatedCircularProgress>
                            </View>
                            <View style={[styles.outerProgress]}>
                                <AnimatedCircularProgress
                                    ref={(ref) => this.circularProgress22 = ref}
                                    size={screenWidth * 0.3}
                                    width={10}
                                    rotation={-360}
                                    tintColor={!isrestrictget_besoin_kcal ? colors.green:colors.textgrisee}
                                    lineCap={"round"}
                                    style={{
                                        overflow: "hidden",
                                        position:'absolute',
                                    }}
                                    backgroundColor={"transparent"}
                                ></AnimatedCircularProgress>
                                <AnimatedCircularProgress
                                    ref={(ref) => this.circularProgress2 = ref}
                                    size={screenWidth * 0.3}
                                    width={10}
                                    rotation={-360}
                                    tintColor={!isrestrictget_besoin_kcal ?colors.red:colors.textgrisee}
                                    lineCap={"round"}
                                    style={{
                                        overflow: "hidden",
                                    }}
                                    backgroundColor={"transparent"}
                                >
                                    {
                                        (fill) => (
                                            <ImageBackground
                                                style={{ width: screenWidth * 0.23, height: screenWidth * 0.23, alignItems: "center" }}
                                                source={require("../../assets/images/bb.png")}>
                                                <TouchableOpacity
                                                    style={[styles.innerProgress, { alignItems: "center", justifyContent: "center", flex: 1 }]}
                                                    onPress={() => {
                                                        if(this.props.activeTab == "home"){
                                                            this.props.navigation.navigate("CompteurNutritionnel")
                                                            const setPopToTop = { type: SET_POP_TO_TOP, value: '' };
                                                            this.props.dispatch(setPopToTop);

                                                        } else {
                                                            const setPopToTop = { type: SET_POP_TO_TOP, value: 'home' };
                                                            this.props.dispatch(setPopToTop);
                                                        }
                                                    }}>
                                                    <AutoHeightImage
                                                        width={20}
                                                        source={require("../../assets/icons/food.stat.white.png")}
                                                        style={{tintColor:!isrestrictget_besoin_kcal ? "white":colors.textgrisee}}
                                                    />
                                                    <View style={[styles.valueCtn]}>
                                                        {/*<Text style={[styles.textBold, { fontSize: 16 }]}>{this.props.dashboard !== null && this.props.dashboard.data.nb_kcal.toFixed(2)}</Text>*/}
                                                        <Text style={[styles.textBold, { fontSize: 16,color:!isrestrictget_besoin_kcal ? "white":colors.textgrisee }]}>{!isrestrictget_besoin_kcal ?(this.props.dashboard !== null && Math.trunc(this.props.dashboard.data.nb_kcal)):0}</Text>
                                                        {/* <Text style={[styles.mesureText]}>kcal</Text> */}
                                                        <Text style={[styles.qtText,{color:!isrestrictget_besoin_kcal ?"white":colors.textgrisee}]}>/ {this.props.dashboard !== null && this.props.dashboard.data.objectif_kcal + ' '} kcal</Text>
                                                    </View>
                                                </TouchableOpacity>
                                            </ImageBackground>
                                        )
                                    }
                                </AnimatedCircularProgress>

                            </View>

                            <View style={[styles.outerProgress]}>
                                <AnimatedCircularProgress
                                    ref={(ref) => this.circularProgress33 = ref}
                                    size={screenWidth * 0.3}
                                    width={10}
                                    rotation={-360}
                                    tintColor={!isrestrictget_besoin_hydro ? colors.green:colors.textgrisee}
                                    lineCap={"round"}
                                    style={{
                                        overflow: "hidden",
                                        position:'absolute',
                                    }}
                                    backgroundColor="transparent"
                                ></AnimatedCircularProgress>
                                <AnimatedCircularProgress
                                    ref={(ref) => this.circularProgress3 = ref}
                                    size={screenWidth * 0.3}
                                    width={10}
                                    rotation={-360}
                                    tintColor={!isrestrictget_besoin_hydro ?colors.red:colors.textgrisee}
                                    lineCap={"round"}
                                    style={{
                                        overflow: "hidden",
                                    }}
                                    backgroundColor={!isrestrictget_besoin_hydro ?"transparent":colors.textgrisee}

                                >
                                    {
                                        (fill) => (
                                            <ImageBackground
                                                style={{ width: screenWidth * 0.23, height: screenWidth * 0.23, alignItems: "center" }}
                                                source={require("../../assets/images/bb.png")}>
                                                <TouchableOpacity
                                                    onPress={() => {
                                                        if(this.props.activeTab == "home"){
                                                            this.props.navigation.navigate("Hydratation")
                                                            const setPopToTop = { type: SET_POP_TO_TOP, value: '' };
                                                            this.props.dispatch(setPopToTop);

                                                        } else {

                                                            const setPopToTop = { type: SET_POP_TO_TOP, value: 'home' };
                                                            this.props.dispatch(setPopToTop);
                                                        }
                                                    }}
                                                    style={[styles.innerProgress, { alignItems: "center", justifyContent: "center", flex: 1 }]}>
                                                    <AutoHeightImage
                                                        width={21}
                                                        style={{tintColor:!isrestrictget_besoin_hydro ?"white":colors.textgrisee}}
                                                        source={require("../../assets/icons/water.stat.white.png")}
                                                    />
                                                    <View style={[styles.valueCtn]}>
                                                        <Text style={[styles.textBold, { fontSize: 16,color:!isrestrictget_besoin_hydro ? "white":colors.textgrisee }]}>
                                                            {/*2.5*/}
                                                            {/*{this.props.dashboard !== null && (this.props.dashboard.data.nb_hydratation_ml/1000)+' '} taloha, fa nampanovainy*/}
                                                            {this.props.dashboard !== null && (this.props.dashboard.data.nb_hydratation_l  % 1 !== 0 ? this.props.dashboard.data.nb_hydratation_l.toFixed(2) : this.props.dashboard.data.nb_hydratation_l)}
                                                            {/*{(this.props.dashboard !== null && !isNaN(hydratation_percentaffiche)) && (hydratation_percentaffiche % 1 !== 0 ? hydratation_percentaffiche.toFixed(2):hydratation_percentaffiche)}*/}
                                                        </Text>
                                                        {/* <Text style={[styles.mesureText]}>litres</Text> */}
                                                        {/*<Text style={[styles.qtText]}>/ {this.props.dashboard !== null && (this.props.dashboard.data.objectif_hydratation/1000)+' '}litres</Text> taloha*/}
                                                        {/*<Text style={[styles.qtText]}>/ {this.props.dashboard !== null && this.props.dashboard.data.objectif_hydratation +' '} {this.props.dashboard !== null && (this.props.dashboard.data.nb_hydratation_l == 0 || this.props.dashboard.data.nb_hydratation_l == 1? "litre":"litres")}</Text>*/}
                                                       {!isrestrictget_besoin_hydro ? <Text style={[styles.qtText]}>/ {this.props.dashboard !== null && this.props.dashboard.data.objectif_hydratation +' '} {this.props.dashboard !== null && (this.props.dashboard.data.objectif_hydratation < 2 ? "litre":"litres")}</Text> : <Text style={[styles.qtText,{color:!isrestrictget_besoin_hydro ?"white":colors.textgrisee}]}>{(this.props.dashboard !== null && this.props.dashboard.data.nb_hydratation_l > 1) ? "litres":"litre"}</Text>}
                                                    </View>
                                                </TouchableOpacity>
                                            </ImageBackground>
                                        )
                                    }
                                </AnimatedCircularProgress>
                            </View>
                        </View>
                    </View>

                    <View>
                        <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }} colors={[colors.balck, colors.green]} style={styles.indiceCtn}>
                            <Text style={[styles.indiceText]}>MON INDICE DE PERFORMANCE</Text>
                            <View style={[styles.progressBlock]}>
                                <View style={[styles.progressCtn]}>
                                    <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={["#FF9999", colors.red]} style={[styles.progressValue, { width: this.state.value< 0 ? 0 :(this.state.value>100 ? 100 : this.state.value) + "%" }]}></LinearGradient>
                                </View>
                                <Text style={[styles.indiceText]}>{this.state.value % 1 !== 0 ? this.state.value.toFixed(2) :this.state.value } %</Text>
                            </View>
                        </LinearGradient>
                    </View>

                    <View style={[styles.bottomBlock,{marginTop:screenHeight*0.06}]}>
                        {!isrestrictget_agenda ? <View style={[styles.bottomCol,{justifyContent:'center'}]}>
                            <TouchableOpacity
                                onPress={()=>{
                                    // const setActiveTabAction = { type: SET_ACTIVE_TAB, value: "monplaning" }
                                    // this.props.dispatch(setActiveTabAction)
                                    const setActiveTabAction = { type: SET_ACTIVE_TAB, value: "calendartopright" }
                                    this.props.dispatch(setActiveTabAction)
                                    //   this.props.navigation.navigate('Masemaine')
                                }}
                            >
                                <Text style={[styles.colTitle,{textDecorationLine:'underline'}]}>MON PLANNING</Text>
                            </TouchableOpacity>
                            <View style={[styles.leftCol,{marginLeft:screenWidth*0.04,}]}>
                                <View style={[styles.leftIconCtn,{marginTop:Platform.OS === 'ios'? 0 : 2}]}>
                                    {this.props.dashboard !== null && <View style={[styles.barRed,{left:35}]}></View>}
                                    {(this.props.dashboard !== null && this.props.dashboard.data.planning.length >= 4) && this.props.dashboard.data.planning.map(
                                        (item, index) => {
                                            if (index <= 7) {
                                                if (item.type === 'soleil_levant') {
                                                    if (item.is_ampty === true) {
                                                        return (
                                                            <TouchableOpacity
                                                                onPress={() => {
                                                                    if (item.is_ampty === true) {
                                                                        const listeActivitesProgram_ = {
                                                                            type: SET_LISTE_ACTIVITE_PROGRAM,
                                                                            value: []
                                                                        };
                                                                        this.props.dispatch(listeActivitesProgram_);
                                                                        this.props.navigation.navigate('ActiviteProgrammesdashboard',
                                                                            {
                                                                                year: new Date().getFullYear(),
                                                                                month:  moment(new Date()).format('MM').toString().padStart(2, '0'),
                                                                                day:  moment(new Date()).format('DD').toString().padStart(2, '0'),
                                                                            });
                                                                        this.props.dispatch({
                                                                            type: SET_PARAM_FOR_CALENDAR, value: {
                                                                                year: new Date().getFullYear(),
                                                                                month:  moment(new Date()).format('MM').toString().padStart(2, '0'),
                                                                                day:  moment(new Date()).format('DD').toString().padStart(2, '0'),
                                                                                dateString: new Date().getFullYear() + '-' + moment(new Date()).format('MM').toString().padStart(2, '0') + '-' + moment(new Date()).format('DD').toString().padStart(2, '0'),
                                                                                from:'dashboard'
                                                                            }
                                                                        });
                                                                        this.props.dispatch({
                                                                            type: SET_ACTIVE_TAB,
                                                                            value: "fichepedag_activiteprogram"
                                                                        })
                                                                    }
                                                                }}
                                                                key={'dashboardplaning' + index}
                                                                style={{flexDirection:'row',alignItems:'center'}}
                                                                >

                                                                <AutoHeightImage key={'dashboard' + index}
                                                                                 style={{marginRight:5,
                                                                                     // tintColor:colors.textgrisee
                                                                                 }}
                                                                                 width={17}
                                                                                 source={require("../../assets/icons/sun-top-white.png")}/>
                                                                <View style={[styles.dotRed]}/>
                                                                <View
                                                                    key={'key_' + index} style={[styles.menubtctn]}>
                                                                    <Text
                                                                        style={[styles.routText, {
                                                                            // color:colors.textgrisee
                                                                        }]}>{item.activite_type.name}</Text>
                                                                </View>
                                                            </TouchableOpacity>
                                                        )
                                                    } else {
                                                        return (
                                                            <View
                                                            key={'dashboardplaning' + index}
                                                            style={{flexDirection:'row',alignItems:'center'}}
                                                        >
                                                            <AutoHeightImage key={'dashboard' + index}
                                                                             style={{marginRight:5,
                                                                                 // tintColor:colors.textgrisee
                                                                             }}
                                                                             width={17}
                                                                             source={require("../../assets/icons/sun-top-white.png")}/>
                                                            <View style={[styles.dotRed]}/>
                                                                <View
                                                                    key={'key_' + index} style={[styles.menubtctn]}>
                                                                    <Text
                                                                        style={[styles.routText, {
                                                                            // color:colors.textgrisee
                                                                        }]}>{item.activite_type.name}</Text>
                                                                </View>
                                                        </View>)
                                                    }
                                                } else if (item.type === 'soleil_couchant') {
                                                    if (item.is_ampty === true) {
                                                        return (
                                                            <TouchableOpacity
                                                                onPress={() => {
                                                                    if (item.is_ampty === true) {
                                                                        const listeActivitesProgram_ = {
                                                                            type: SET_LISTE_ACTIVITE_PROGRAM,
                                                                            value: []
                                                                        };
                                                                        this.props.dispatch(listeActivitesProgram_);

                                                                        this.props.navigation.navigate('ActiviteProgrammesdashboard',
                                                                            {
                                                                                year: new Date().getFullYear(),
                                                                                month:  moment(new Date()).format('MM').toString().padStart(2, '0'),
                                                                                day:  moment(new Date()).format('DD').toString().padStart(2, '0'),
                                                                            });
                                                                        this.props.dispatch({
                                                                            type: SET_PARAM_FOR_CALENDAR, value: {
                                                                                year: new Date().getFullYear(),
                                                                                month:  moment(new Date()).format('MM').toString().padStart(2, '0'),
                                                                                day:  moment(new Date()).format('DD').toString().padStart(2, '0'),
                                                                                dateString: new Date().getFullYear() + '-' + moment(new Date()).format('MM').toString().padStart(2, '0') + '-' + moment(new Date()).format('DD').toString().padStart(2, '0'),
                                                                                from:'dashboard'
                                                                            }
                                                                        });
                                                                        this.props.dispatch({
                                                                            type: SET_ACTIVE_TAB,
                                                                            value: "fichepedag_activiteprogram"
                                                                        })
                                                                    }
                                                                }}
                                                                key={'dashboardplaning' + index}
                                                                style={{flexDirection:'row',alignItems:'center'}}
                                                            >

                                                                <AutoHeightImage key={'dashboard' + index}
                                                                                 style={{marginRight:5,
                                                                                     // tintColor:colors.textgrisee
                                                                                 }}
                                                                                 width={17}
                                                                                 source={require("../../assets/icons/sun-bottom-white.png")}/>
                                                                <View style={[styles.dotRed]}/>
                                                                <View
                                                                    key={'key_' + index} style={[styles.menubtctn]}>
                                                                    <Text
                                                                        style={[styles.routText, {
                                                                            // color:colors.textgrisee
                                                                        }]}>{item.activite_type.name}</Text>
                                                                </View>
                                                            </TouchableOpacity>
                                                        )
                                                    } else {
                                                        return ( <View key={'dashboardplaning' + index}
                                                                       style={{flexDirection:'row',alignItems:'center'}}
                                                        >

                                                            <AutoHeightImage key={'dashboard' + index}
                                                                             style={{marginRight:5,
                                                                                 // tintColor:colors.textgrisee
                                                                             }}
                                                                             width={17}
                                                                             source={require("../../assets/icons/sun-bottom-white.png")}/>
                                                            <View style={[styles.dotRed]}/>
                                                            <View
                                                                key={'key_' + index} style={[styles.menubtctn]}>
                                                                <Text
                                                                    style={[styles.routText, {
                                                                        // color:colors.textgrisee
                                                                    }]}>{item.activite_type.name}</Text>
                                                            </View>
                                                        </View>)
                                                    }
                                                } else if (item.type === 'soleil') {
                                                    if (item.is_ampty === true) {
                                                        return (
                                                            <TouchableOpacity
                                                                onPress={() => {
                                                                    if (item.is_ampty === true) {
                                                                        const listeActivitesProgram_ = {
                                                                            type: SET_LISTE_ACTIVITE_PROGRAM,
                                                                            value: []
                                                                        };
                                                                        this.props.dispatch(listeActivitesProgram_);

                                                                        this.props.navigation.navigate('ActiviteProgrammesdashboard',
                                                                            {
                                                                                year: new Date().getFullYear(),
                                                                                month:  moment(new Date()).format('MM').toString().padStart(2, '0'),
                                                                                day:  moment(new Date()).format('DD').toString().padStart(2, '0'),
                                                                            });
                                                                        this.props.dispatch({
                                                                            type: SET_PARAM_FOR_CALENDAR, value: {
                                                                                year: new Date().getFullYear(),
                                                                                month:  moment(new Date()).format('MM').toString().padStart(2, '0'),
                                                                                day:  moment(new Date()).format('DD').toString().padStart(2, '0'),
                                                                                dateString: new Date().getFullYear() + '-' + moment(new Date()).format('MM').toString().padStart(2, '0') + '-' + moment(new Date()).format('DD').toString().padStart(2, '0'),
                                                                                from:'dashboard'
                                                                            }
                                                                        });
                                                                        this.props.dispatch({
                                                                            type: SET_ACTIVE_TAB,
                                                                            value: "fichepedag_activiteprogram"
                                                                        })
                                                                    }
                                                                }}
                                                                key={'dashboardplaning' + index}
                                                                style={{flexDirection:'row',alignItems:'center'}}
                                                            >

                                                                <AutoHeightImage key={'dashboard' + index}
                                                                                 style={{marginRight:5,
                                                                                     // tintColor:colors.textgrisee
                                                                                 }}
                                                                                 width={17}
                                                                                 source={require("../../assets/icons/sun-full-white.png")}/>
                                                                <View style={[styles.dotRed]}/>
                                                                <View
                                                                    key={'key_' + index} style={[styles.menubtctn]}>
                                                                    <Text
                                                                        style={[styles.routText, {
                                                                            // color:colors.textgrisee
                                                                        }]}>{item.activite_type.name}</Text>
                                                                </View>
                                                            </TouchableOpacity>
                                                        )
                                                    } else {
                                                        return ( <View key={'dashboardplaning' + index}
                                                                       style={{flexDirection:'row',alignItems:'center'}}
                                                        >

                                                            <AutoHeightImage key={'dashboard' + index}
                                                                             style={{marginRight:5,
                                                                                 // tintColor:colors.textgrisee
                                                                             }}
                                                                             width={17}
                                                                             source={require("../../assets/icons/sun-bottom-white.png")}/>
                                                            <View style={[styles.dotRed]}/>
                                                            <View
                                                                key={'key_' + index} style={[styles.menubtctn]}>
                                                                <Text
                                                                    style={[styles.routText, {
                                                                        // color:colors.textgrisee
                                                                    }]}>{item.activite_type.name}</Text>
                                                            </View></View>)
                                                    }
                                                } else if (item.type === 'lune') {
                                                    if (item.is_ampty === true) {
                                                        return (
                                                            <TouchableOpacity
                                                                onPress={() => {
                                                                    if (item.is_ampty === true) {
                                                                        const listeActivitesProgram_ = {
                                                                            type: SET_LISTE_ACTIVITE_PROGRAM,
                                                                            value: []
                                                                        };
                                                                        this.props.dispatch(listeActivitesProgram_);

                                                                        this.props.navigation.navigate('ActiviteProgrammesdashboard',
                                                                            {
                                                                                year: new Date().getFullYear(),
                                                                                month:  moment(new Date()).format('MM').toString().padStart(2, '0'),
                                                                                day:  moment(new Date()).format('DD').toString().padStart(2, '0'),
                                                                            });
                                                                        this.props.dispatch({
                                                                            type: SET_PARAM_FOR_CALENDAR, value: {
                                                                                year: new Date().getFullYear(),
                                                                                month:  moment(new Date()).format('MM').toString().padStart(2, '0'),
                                                                                day:  moment(new Date()).format('DD').toString().padStart(2, '0'),
                                                                                dateString: new Date().getFullYear() + '-' + moment(new Date()).format('MM').toString().padStart(2, '0') + '-' + moment(new Date()).format('DD').toString().padStart(2, '0'),
                                                                                from:'dashboard'
                                                                            }
                                                                        });
                                                                        this.props.dispatch({
                                                                            type: SET_ACTIVE_TAB,
                                                                            value: "fichepedag_activiteprogram"
                                                                        })
                                                                    }
                                                                }}
                                                                key={'dashboardplaning' + index}
                                                                style={{flexDirection:'row',alignItems:'center'}}
                                                            >

                                                                <AutoHeightImage key={'dashboard' + index}
                                                                                 style={{marginRight:5,
                                                                                     // tintColor:colors.textgrisee
                                                                                 }}
                                                                                 width={16}
                                                                                 source={require("../../assets/icons/lune.png")}/>
                                                                <View style={[styles.dotRed]}/>
                                                                <View
                                                                    key={'key_' + index} style={[styles.menubtctn]}>
                                                                    <Text
                                                                        style={[styles.routText, {
                                                                            // color:colors.textgrisee
                                                                        }]}>{item.activite_type.name}</Text>
                                                                </View>
                                                            </TouchableOpacity>)
                                                    } else {
                                                        return ( <View key={'dashboardplaning' + index}
                                                                       style={{flexDirection:'row',alignItems:'center'}}
                                                        >

                                                            <AutoHeightImage key={'dashboard' + index}
                                                                             style={{marginRight:5,
                                                                                 // tintColor:colors.textgrisee
                                                                             }}
                                                                             width={16}
                                                                             source={require("../../assets/icons/lune.png")}/>
                                                            <View style={[styles.dotRed]}/>
                                                            <View
                                                                key={'key_' + index} style={[styles.menubtctn]}>
                                                                <Text
                                                                    style={[styles.routText, {
                                                                        // color:colors.textgrisee
                                                                    }]}>{item.activite_type.name}</Text>
                                                            </View></View>)
                                                    }
                                                }
                                            }
                                        }
                                    )
                                    }
                                </View>
                            </View>
                        </View>
                            // fin if else lava b tay de manaraka
                        :
                            <View style={[styles.bottomCol,{justifyContent:'center'}]}>
                                <View

                                >
                                    <Text style={[styles.colTitle,{textDecorationLine:'underline',color:colors.textgrisee}]}>MON PLANNING</Text>
                                </View>

                                <View style={[styles.leftCol,{marginLeft:screenWidth*0.06}]}>
                                    <View style={[styles.leftIconCtn]}>
                                        {this.props.dashboard !== null && <View style={[styles.barRed,{backgroundColor:colors.textgrisee,color:colors.textgrisee,left:35}]}></View>}
                                        {(this.props.dashboard !== null && this.props.dashboard.data.planning.length >= 4) && this.props.dashboard.data.planning.map(
                                            (item, index) => {
                                                if (index <= 7) {
                                                    if (item.type === 'soleil_levant') {
                                                            return (
                                                                <View

                                                                    key={'dashboardplaning' + index}
                                                                    style={{flexDirection:'row',alignItems:'center'}}
                                                                >

                                                                    <AutoHeightImage key={'dashboard' + index}
                                                                                     style={{marginRight:5,
                                                                                          tintColor:colors.textgrisee
                                                                                     }}
                                                                                     width={17}
                                                                                     source={require("../../assets/icons/sun-top-white.png")}/>
                                                                    <View style={[styles.dotRed,{backgroundColor:colors.textgrisee}]}/>
                                                                    <View
                                                                        key={'key_' + index} style={[styles.menubtctn]}>
                                                                        <Text
                                                                            style={[styles.routText, {
                                                                                 color:colors.textgrisee
                                                                            }]}>{item.activite_type.name}</Text>
                                                                    </View>
                                                                </View>
                                                            )

                                                    } else if (item.type === 'soleil_couchant') {
                                                            return (
                                                                <View
                                                                    key={'dashboardplaning' + index}
                                                                    style={{flexDirection:'row',alignItems:'center'}}
                                                                >

                                                                    <AutoHeightImage key={'dashboard' + index}
                                                                                     style={{marginRight:5,
                                                                                         tintColor:colors.textgrisee
                                                                                     }}
                                                                                     width={17}
                                                                                     source={require("../../assets/icons/sun-bottom-white.png")}/>
                                                                    <View style={[styles.dotRed,{backgroundColor:colors.textgrisee}]}/>
                                                                    <View
                                                                        key={'key_' + index} style={[styles.menubtctn]}>
                                                                        <Text
                                                                            style={[styles.routText, {
                                                                                color:colors.textgrisee
                                                                            }]}>{item.activite_type.name}</Text>
                                                                    </View>
                                                                </View>
                                                            )

                                                    } else if (item.type === 'soleil') {
                                                            return (
                                                                <View
                                                                    key={'dashboardplaning' + index}
                                                                    style={{flexDirection:'row',alignItems:'center'}}
                                                                >

                                                                    <AutoHeightImage key={'dashboard' + index}
                                                                                     style={{marginRight:5,
                                                                                         tintColor:colors.textgrisee
                                                                                     }}
                                                                                     width={17}
                                                                                     source={require("../../assets/icons/sun-full-white.png")}/>
                                                                    <View style={[styles.dotRed,{backgroundColor:colors.textgrisee}]}/>
                                                                    <View
                                                                        key={'key_' + index} style={[styles.menubtctn]}>
                                                                        <Text
                                                                            style={[styles.routText, {
                                                                                color:colors.textgrisee
                                                                            }]}>{item.activite_type.name}</Text>
                                                                    </View>
                                                                </View>
                                                            )
                                                    } else if (item.type === 'lune') {
                                                            return (
                                                                <View

                                                                    key={'dashboardplaning' + index}
                                                                    style={{flexDirection:'row',alignItems:'center'}}
                                                                >

                                                                    <AutoHeightImage key={'dashboard' + index}
                                                                                     style={{marginRight:5,
                                                                                         tintColor:colors.textgrisee
                                                                                     }}
                                                                                     width={16}
                                                                                     source={require("../../assets/icons/lune.png")}/>
                                                                    <View style={[styles.dotRed,{backgroundColor:colors.textgrisee}]}/>
                                                                    <View
                                                                        key={'key_' + index} style={[styles.menubtctn]}>
                                                                        <Text
                                                                            style={[styles.routText, {
                                                                                color:colors.textgrisee
                                                                            }]}>{item.activite_type.name}</Text>
                                                                    </View>
                                                                </View>)
                                                    }
                                                }
                                            }
                                        )
                                        }
                                    </View>
                                </View>
                            </View>
                            // ok ici c'est faran else tay'
                        }
                        <View style={[styles.bottomCol]}>
                           { !isrestrictget_videotheque?  <TouchableOpacity
                                onPress={()=>{
                                    const setPopToTop = { type: SET_POP_TO_TOP, value: 'dd' }
                                    this.props.dispatch(setPopToTop);
                                    this.props.navigation.navigate('fileProtocoles_Dashboard',{venudedashboard:false,id:0})


                                }}
                            >
                                <Text style={[styles.colTitle,{textDecorationLine:'underline'}]}>MES EXERCICES</Text>
                            </TouchableOpacity>
                           :
                               <View
                               >
                                   <Text style={[styles.colTitle,{textDecorationLine:'underline',color: !isrestrictget_videotheque?"white":colors.textgrisee}]}>MES EXERCICES</Text>
                               </View>
                           }

                            <View style={{flexDirection: "row",
                                flex: 1,
                                width: "100%",
                                height: "100%",
                                padding: 5,
                                marginTop: 15,
                                paddingBottom:Platform.OS === 'ios'? 6 : 0,
                                marginLeft:screenWidth*0.185,
                            }}>
                                {/*<View style={[styles.leftIconCtn]}>*/}
                                {/*    {this.props.dashboard !== null && this.props.dashboard.data.routines.map(*/}
                                {/*        (item,index)=>{*/}
                                {/*            if(index<=2 ){*/}
                                {/*                return(*/}
                                {/*                    <View>*/}
                                {/*                        {!isrestrictget_videotheque?<TouchableOpacity*/}
                                {/*                                onPress={()=>{*/}
                                {/*                                    //item.id no entina*/}
                                {/*                                    const setPopToTop = { type: SET_POP_TO_TOP, value: 'dd' }*/}
                                {/*                                    this.props.dispatch(setPopToTop);*/}
                                {/*                                    // this.props.navigation.navigate('fileProtocoles_Dashboard',{venudedashboard:true,id:item.id,nameitem:item.name})*/}
                                {/*                                    if(item.name === "M'échauffer" || item.name === "Ma mobilité"){*/}
                                {/*                                        this.props.navigation.navigate("MamobiliteDash")*/}
                                {/*                                    }else if(item.name === "Récupérer" || item.name === "Mes tensions"){*/}
                                {/*                                        this.props.navigation.navigate("MestensionsDash")*/}

                                {/*                                    }else if(item.name === "Prévenir" || item.name === "Vidéothèque"){*/}
                                {/*                                        this.props.navigation.navigate("VideothequeDash")*/}

                                {/*                                    }*/}
                                {/*                                }}*/}
                                {/*                                key={'routines'+index} style={[styles.roudPlayRed,{top: index ===0? -6:index ===1? -3 :index ===2 ? 0 : index ===3? 4: 0}]}>*/}
                                {/*                                <AutoHeightImage*/}
                                {/*                                    width={8}*/}
                                {/*                                    style={{right:-1}}*/}
                                {/*                                    source={require("../../assets/icons/music-player-black.png")} />*/}
                                {/*                            </TouchableOpacity>*/}
                                {/*                            :*/}
                                {/*                            <View*/}
                                {/*                                key={'routines'+index} style={{top: index ===0? -6:index ===1? -3 :index ===2 ? 0 : index ===3? 4: 0, width: 20,*/}
                                {/*                                height: 20,*/}
                                {/*                                borderRadius: 20,*/}
                                {/*                                backgroundColor: colors.grisee,*/}
                                {/*                                alignItems: "center",*/}
                                {/*                                justifyContent: "center",}}>*/}
                                {/*                                <AutoHeightImage*/}
                                {/*                                    width={8}*/}
                                {/*                                    style={{right:-1,tintColor:colors.textgrisee}}*/}
                                {/*                                    source={require("../../assets/icons/music-player-black.png")} />*/}
                                {/*                            </View>*/}
                                {/*                        }*/}
                                {/*                    </View>*/}
                                {/*                )*/}
                                {/*            }*/}
                                {/*        }*/}
                                {/*    )}*/}


                                {/*</View>*/}

                                <View style={{justifyContent:'space-between',paddingBottom:screenHeight*0.005}}>
                                    {
                                        this.props.dashboard !== null && this.props.dashboard.data.routines.map(
                                            (item,index)=>{
                                                if(index<=2){
                                                    return(
                                                        <View>
                                                            {!isrestrictget_videotheque ?
                                                                <TouchableOpacity
                                                                    onPress={()=>{
                                                                        //item.id no entina
                                                                        const setPopToTop = { type: SET_POP_TO_TOP, value: 'dd' }
                                                                        this.props.dispatch(setPopToTop);

                                                                        // this.props.navigation.navigate('fileProtocoles_Dashboard',{venudedashboard:true,id:item.id,nameitem:item.name})
                                                                        if(item.name === "M'échauffer" || item.name === "Ma mobilité"){
                                                                            const setforretourtrain = { type: SET_FOR_RETOUR_TRAIN, value: 0 };
                                                                            this.props.dispatch(setforretourtrain);
                                                                            this.props.navigation.navigate("MamobiliteDash")
                                                                        }else if(item.name === "Récupérer" || item.name === "Mes tensions"){
                                                                            const setforretourtrain = { type: SET_FOR_RETOUR_TRAIN, value: 1 }
                                                                             this.props.dispatch(setforretourtrain);
                                                                            this.props.navigation.navigate("MestensionsDash")
                                                                        }else if(item.name === "Prévenir" || item.name === "Vidéothèque"){
                                                                            const setforretourtrain = { type: SET_FOR_RETOUR_TRAIN, value: 2 };
                                                                            this.props.dispatch(setforretourtrain)
                                                                            this.props.navigation.navigate("VideothequeDash")
                                                                        }
                                                                    }}
                                                                    key={'dataroutines' + index} style={[styles.menubtctn,{flexDirection:'row',alignItems:'center'}]}>
                                                                    <View
                                                                        key={'routines'+index} style={{
                                                                        width: 20,
                                                                        height: 20,
                                                                        borderRadius: 20,
                                                                        backgroundColor: colors.red,
                                                                        alignItems: "center",
                                                                        justifyContent: "center",}}>
                                                                        <AutoHeightImage
                                                                            width={8}
                                                                            style={{left:1.5,bottom:0.5}}
                                                                            source={require("../../assets/icons/music-player-black.png")} />
                                                                    </View>
                                                                    <Text
                                                                        style={[styles.routText]}>{(item.name === "M'échauffer" || item.name === "Ma mobilité") ? "Ma mobilité" : (item.name === "Récupérer" || item.name === "Mes tensions") ? "Mes tensions" : (item.name === "Prévenir" || item.name === "Vidéothèque") && "Vidéothèque" }</Text>
                                                                </TouchableOpacity>
                                                                :
                                                                <View
                                                                key={'dataroutines' + index} style={[styles.menubtctn,{flexDirection:'row',alignItems:'center'}]}>
                                                                                                <View
                                                                                                    key={'routines'+index} style={{
                                                                                                    width: 20,
                                                                                                    height: 20,
                                                                                                    borderRadius: 20,
                                                                                                    backgroundColor: colors.grisee,
                                                                                                    alignItems: "center",
                                                                                                    justifyContent: "center",}}>
                                                                                                    <AutoHeightImage
                                                                                                        width={8}
                                                                                                        style={{right:-1,tintColor:colors.textgrisee}}
                                                                                                        source={require("../../assets/icons/music-player-black.png")} />
                                                                                                </View>
                                                                    <Text
                                                                        style={[styles.routText,{color:colors.textgrisee}]}>{(item.name === "M'échauffer" || item.name === "Ma mobilité") ? "Ma mobilité" : (item.name === "Récupérer" || item.name === "Mes tensions") ? "Mes tensions" : (item.name === "Prévenir" || item.name === "Vidéothèque") && "Vidéothèque" }</Text>
                                                                </View>
                                                            }
                                                        </View>
                                                    )
                                                }
                                            }
                                        )
                                    }</View>
                            </View>
                        </View>
                    </View>

                    {/*<TouchableOpacity*/}
                    {/*    onPress={async ()=>{*/}
                    {/*        const removeToken = await AsyncStorage.removeItem('userToken')*/}
                    {/*        console.warn("removeToken", removeToken)*/}
                    {/*        // this.props.navigation.navigate("LogedoutNavigator")*/}
                    {/*        await AsyncStorage.removeItem('userToken')*/}
                    {/*        const setActiveTab = { type: SET_ACTIVE_TAB, value: "deco" }*/}
                    {/*        await this.props.dispatch(setActiveTab)*/}
                    {/*        this.props.navigation.navigate("LogedoutNavigator")*/}
                    {/*    }}*/}
                    {/*    style={{*/}
                    {/*        backgroundColor: colors.red,*/}
                    {/*        alignItems: "center",*/}
                    {/*        justifyContent: "center",*/}
                    {/*        borderRadius: 7,*/}
                    {/*        width: screenWidth / 2,*/}
                    {/*        padding: 5,*/}
                    {/*        marginTop: screenHeight*0.05*/}
                    {/*    }}*/}
                    {/*>*/}
                    {/*    <Text*/}
                    {/*        style={{*/}
                    {/*            color: colors.white*/}
                    {/*        }}*/}
                    {/*    >*/}
                    {/*        Déconnexion*/}
                    {/*    </Text>*/}
                    {/*</TouchableOpacity>*/}
                </ScrollView>
            </LinearGradient>
        )
    }
}

// export default Dashboard;
const mapStateToProps = (state) => {
    const { activeTab,setPopToTop,userToken,dashboard,droits } = state.statedata
    return { activeTab,setPopToTop,userToken,dashboard,droits }
};

export default connect(mapStateToProps)(Dashboard);
