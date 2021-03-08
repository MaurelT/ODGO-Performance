import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    ScrollView,
    View,
    Text,
    TouchableOpacity,
    Dimensions,
    StatusBar,
    Modal,
    ImageBackground,
    Easing,
    Animated, RefreshControl, Platform,
} from 'react-native';
import baseStyles from '../../../base/BaseStyles';
import styles from './styles'
import colors from '../../../configs/colors';
import LinearGradient from 'react-native-linear-gradient';
import ZonePicker from '../../../components/ZonePicker/ZonePicker';
import MAAButton from '../../../components/MAAButton/MAAButton';
import AutoHeightImage from 'react-native-auto-height-image';
// import ProgressCircle from 'react-native-progress-circle';

import { AnimatedCircularProgress } from 'react-native-circular-progress';
import {
    filteredNosSuggestionfiltered,filteredmesRepaspetitsdejeunerfiltered,filteredEatRecentlyfiltered,filteredCollationmatinfiltered,filteredDejeunerfiltered,filteredCollationApresMidifiltered,filteredDinerfiltered,
    SET_ACTIVE_TAB,
    SET_POP_TO_TOP,
    SET_PETITS_DEJEUNERD,
    SET_COMPTEUR_NUTRITIONNEL,
    SET_MON_ASSIETTE,
    SET_PETITS_COLLATION_MATIND,
    SET_DEJEUNERD,
    SET_COLLATION_APRESMIDID,
    SET_DINERD,
    SET_DATE_FOR_AJOUTALIMENT
} from '../../../redux/types/tabTypes';
import compteurNutritionnelHelper from '../../../apis/helpers/compteurNutritionnel_helper';
import moment from 'moment';
import Day from '../../../components/react-native-calendars/src/calendar/day/basic';
import {
    monassiete,
    getCompteurNutritionnel,
    getSelectionnerNosSuggestion,
    getDashboar, getViaPostRepas,search
} from '../../../apis/FonctionRedondant';
import statusBarHeight from '../../../configs/screen';
import dashboardHelper from '../../../apis/helpers/dashboard_helper';

import SearchInput, { createFilter } from 'react-native-search-filter';


const screen = Dimensions.get("window");
const SBHelight = statusBarHeight;
const screenWidth = screen.width
const screenHeight = screen.height - SBHelight;

class CompteurNutritionnel extends Component {

    constructor(props) {
        super(props)
        this.state = {
            activeMenu: 2,
            selectedZone: props.selectedZone,
            zonePicker: false,
            sliderValueIntensite: 5,
            sliderValueDifficulte: 5,
            sliderValueQualite: 5,
            sliderValueImplication: 5,
            intensiteValueTextWidth: 0,
            difficulteValueTextWidth: 0,
            qualiteValueTextWidth: 0,
            implicationValueTextWidth: 0,
            popToTop:props.popToTop,
            //compteurNutritionnel:this.props.compteurNutritionnel,
            compteurNutritionnel:null,
            refreshing:false,
            shortdayofweek:['lun.','mar.','mer.','jeu.','ven.','sam.','dim.'],
            shortdayofweekone:['dim.','lun.','mar.','mer.','jeu.','ven.','sam.'],
            newarrayarrenged:null,
            // nowdate:null,
            //   nowdate:moment(new Date()).subtract(1, 'days').day(),
            nowdate:moment(new Date()).day(),
            indexcollationetconsort:6,

        }
        this.monassieteu = []
    }
    componentDidMount() {
        // const setActiveTab = { type: SET_ACTIVE_TAB, value: "CompteurNutritionnel" }
        // this.props.dispatch(setActiveTab);

        this.circularProgressCompteurNutritionnel.animate(0, 3000, Easing.quad);
        // this.setState({nowdate:moment(new Date()).day()}); taloha
        //console.warn(moment(new Date()).subtract(1, 'days').day());

        this.setState({refreshing: true});


        this.setState({refreshing: true});
        let setPetitsDejeuner = { type: SET_PETITS_DEJEUNERD, value: [] };
        this.props.dispatch(setPetitsDejeuner);
        getCompteurNutritionnel(compteurNutritionnelHelper,this.props,this.props.userToken).then((refreshingfalse)=>{
            if(this.props.compteurNutritionnel !== null)
            {
                let array0 = this.state.shortdayofweek.slice(this.state.shortdayofweek.indexOf(this.state.shortdayofweek[this.state.nowdate]),this.state.shortdayofweek.length);
                let array1 = this.state.shortdayofweek.slice(0,this.state.shortdayofweek.indexOf(this.state.shortdayofweek[this.state.nowdate]));
                let newarrayarrenged = array0.concat(array1);
                this.setState({newarrayarrenged:newarrayarrenged});

                const  PetitsDejeuner = this.props.compteurNutritionnel.data[this.state.shortdayofweekone[this.state.nowdate]].repas['1'];
                let setPetitsDejeuner = { type: SET_PETITS_DEJEUNERD, value: PetitsDejeuner };
                this.props.dispatch(setPetitsDejeuner);

                const  Collationmatin = this.props.compteurNutritionnel.data[this.state.shortdayofweekone[this.state.nowdate]].repas['2'];
                let setCollationmatin = { type: SET_PETITS_COLLATION_MATIND, value: Collationmatin };
                this.props.dispatch(setCollationmatin);

                const  Dejeuner = this.props.compteurNutritionnel.data[this.state.shortdayofweekone[this.state.nowdate]].repas['3'];
                let setDejeuner = { type: SET_DEJEUNERD, value: Dejeuner };
                this.props.dispatch(setDejeuner);

                const  CollationApresmidi = this.props.compteurNutritionnel.data[this.state.shortdayofweekone[this.state.nowdate]].repas['4'];
                let setCollationApresmidi = { type: SET_COLLATION_APRESMIDID, value: CollationApresmidi };
                this.props.dispatch(setCollationApresmidi);

                const  Diner = this.props.compteurNutritionnel.data[this.state.shortdayofweekone[this.state.nowdate]].repas['5'];
                let setDiner = { type: SET_DINERD, value: Diner };
                this.props.dispatch(setDiner);
            }
            this.setState({refreshing: refreshingfalse});
        });
    }




    getdatee(){
        // let bob = new Date();
        // bob.setDate(bob.getDate()+5);
        // console.warn(moment(bob).format("YYYY-MM-DD"));
        let d = new Date();
        switch (this.state.indexcollationetconsort) {
            case 6:
                d = new Date();
                break;
            case 5:
                d.setDate(d.getDate()-1);
                break;
            case 4:
                d.setDate(d.getDate()-2);
                break;
            case 3:
                d.setDate(d.getDate()-3);
                break;
            case 2:
                d.setDate(d.getDate()-4);
                break;
            case 1:
                d.setDate(d.getDate()-5);
                break;
            case 0:
                d.setDate(d.getDate()-6);
                break;
        }
        const dd = moment(d).format("YYYY-MM-DD");
        const setdate = { type: SET_DATE_FOR_AJOUTALIMENT, value: dd };
        this.props.dispatch(setdate);
        return d;
    };



    renderweeknutritional(nowdayinweekshortstring,indexcollationetconsort) {

        let array0 = this.state.shortdayofweek.slice(this.state.shortdayofweek.indexOf(nowdayinweekshortstring),this.state.shortdayofweek.length);
        let array1 = this.state.shortdayofweek.slice(0,this.state.shortdayofweek.indexOf(nowdayinweekshortstring));

        let newarrayarrenged = array0.concat(array1);
        //console.warn(newarrayarrenged,this.state.shortdayofweek[this.state.nowdate])

        let height1recupere = this.props.compteurNutritionnel.data[newarrayarrenged[0]].kcal.percent;
        let height1 = Math.trunc(height1recupere*25/100);
        if(height1>25){
            height1 = 25;
        }

        let height2recupere = this.props.compteurNutritionnel.data[newarrayarrenged[1]].kcal.percent;
        let height2 = Math.trunc(height2recupere*25/100);
        if(height2>25){
            height2 = 25;
        }

        let height3recupere = this.props.compteurNutritionnel.data[newarrayarrenged[2]].kcal.percent;
        let height3 = Math.trunc(height3recupere*25/100);
        if(height3 > 25){
            height3 = 25;
        }

        let height4recupere = this.props.compteurNutritionnel.data[newarrayarrenged[3]].kcal.percent;
        let height4 = Math.trunc(height4recupere*25/100);
        if(height4>25){
            height4 = 25;
        }

        let height5recupere = this.props.compteurNutritionnel.data[newarrayarrenged[4]].kcal.percent;
        let height5 = Math.trunc(height5recupere*25/100);
        if(height5>25){
            height5 = 25;
        }
        let height6recupere = this.props.compteurNutritionnel.data[newarrayarrenged[5]].kcal.percent;
        let height6 = Math.trunc(height6recupere*25/100);
        if(height6>25){
            height6 = 25;
        }

        let height7recupere = this.props.compteurNutritionnel.data[newarrayarrenged[6]].kcal.percent;
        let height7 = Math.trunc(height7recupere*25/100);
        if(height7>25){
            height7 = 25;
        }

        const firstday = <View style={{ flexDirection: "column", alignItems:'center' }}>
            <View style={[styles.progressBlock]}>
                <View style={[styles.progressVertical,
                    { transform: [{ rotateX: "180deg" }] }
                ]}>
                    <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={["#FF9999", colors.red]} style={[styles.progressVerticalValue, { height: height1}]}></LinearGradient>
                </View>
            </View>
            <Text style={[styles.qtText, indexcollationetconsort === 0 ? { color: "red", fontSize: 8 } : { color: "lightgrey", fontSize: 8 }]}>{this.props.compteurNutritionnel.data[newarrayarrenged[0]].letter}</Text>
        </View>;

        const secondday = <View style={{ flexDirection: "column", alignItems:'center'  }}>
            <View style={[styles.progressBlock]}>
                <View style={[styles.progressVertical,
                    { transform: [{ rotateX: "180deg" }] }
                ]}>
                    <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={["#FF9999", colors.red]} style={[styles.progressVerticalValue, { height: height2 }]}></LinearGradient>
                </View>
            </View>
            <Text style={[styles.qtText, indexcollationetconsort === 1 ? { color: "red", fontSize: 8 } : { color: "lightgrey", fontSize: 8 }]}>{this.props.compteurNutritionnel.data[newarrayarrenged[1]].letter}</Text>
        </View>;

        const thirdday = <View style={{ flexDirection: "column", alignItems:'center'  }}>
            <View style={[styles.progressBlock]}>
                <View style={[styles.progressVertical,
                    { transform: [{ rotateX: "180deg" }] }
                ]}>
                    <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={["#FF9999", colors.red]} style={[styles.progressVerticalValue, { height: height3 }]}></LinearGradient>
                </View>
            </View>
            <Text style={[styles.qtText, indexcollationetconsort === 2 ? { color: "red", fontSize: 8 } : { color: "lightgrey", fontSize: 8 }]}>{this.props.compteurNutritionnel.data[newarrayarrenged[2]].letter}</Text>
        </View>;

        const fourthday = <View style={{ flexDirection: "column", alignItems:'center'  }}>
            <View style={[styles.progressBlock]}>
                <View style={[styles.progressVertical,
                    { transform: [{ rotateX: "180deg" }] }
                ]}>
                    <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={["#FF9999", colors.red]} style={[styles.progressVerticalValue, { height: height4}]}></LinearGradient>
                </View>
            </View>
            <Text style={[styles.qtText, indexcollationetconsort === 3 ? { color: "red", fontSize: 8 } : { color: "lightgrey", fontSize: 8 }]}>{this.props.compteurNutritionnel.data[newarrayarrenged[3]].letter}</Text>
        </View>;


        const fifthday = <View style={{ flexDirection: "column", alignItems:'center'  }}>
            <View style={[styles.progressBlock]}>
                <View style={[styles.progressVertical,
                    { transform: [{ rotateX: "180deg" }] }
                ]}>
                    <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={["#FF9999", colors.red]} style={[styles.progressVerticalValue, { height: height5 }]}></LinearGradient>
                </View>
            </View>
            <Text style={[styles.qtText, indexcollationetconsort === 4 ? { color: "red", fontSize: 8 } : { color: "lightgrey", fontSize: 8 }]}>{this.props.compteurNutritionnel.data[newarrayarrenged[4]].letter}</Text>
        </View>;

        const sixthday = <View style={{ flexDirection: "column", alignItems:'center'  }}>
            <View style={[styles.progressBlock]}>
                <View style={[styles.progressVertical,
                    { transform: [{ rotateX: "180deg" }] }
                ]}>
                    <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={["#FF9999", colors.red]} style={[styles.progressVerticalValue, { height: height6 }]}></LinearGradient>
                </View>
            </View>
            <Text style={[styles.qtText, indexcollationetconsort === 5 ? { color: "red", fontSize: 8 } : { color: "lightgrey", fontSize: 8 }]}>{this.props.compteurNutritionnel.data[newarrayarrenged[5]].letter}</Text>
        </View>;

        const seventhday = <View style={{ flexDirection: "column", alignItems:'center'  }}>
            <View style={[styles.progressBlock]}>
                <View style={[styles.progressVertical,
                    { transform: [{ rotateX: "180deg" }] }
                ]}>
                    <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={["#FF9999", colors.red]} style={[styles.progressVerticalValue, { height: height7 }]}></LinearGradient>
                </View>
            </View>
            <Text style={[styles.qtText, indexcollationetconsort === 6 ? { color: "red", fontSize: 8 } : { color: "lightgrey", fontSize: 8 }]}>{this.props.compteurNutritionnel.data[newarrayarrenged[6]].letter}</Text>
        </View>;


        return(
            <View style={{ flexDirection: "row", justifyContent: "space-around", marginLeft: 5, width: (screenWidth - 50) }}>
                {firstday}
                {secondday}
                {thirdday}
                {fourthday}
                {fifthday}
                {sixthday}
                {seventhday}
            </View>
        )
    };

    render() {
        let isrestrictget_besoin_kcal = false;
        if(this.props.droits.length>0){
            for(let i = 0; i < this.props.droits.length; i++){
                if(this.props.droits[i].name === "get_besoin_kcal"){
                    isrestrictget_besoin_kcal = this.props.droits[i].is_restrict;
                    break;
                }
            }
        }

        if(this.circularProgressCompteurNutritionnel){
            this.circularProgressCompteurNutritionnel.animate(0, 3000, Easing.quad);
        }

        if(this.circularProgressCompteurNutritionnel){
            if(this.props.compteurNutritionnel != null){
                if(this.circularProgressCompteurNutritionnel !== undefined){
                    try{
                        // console.warn('nowdated',this.state.nowdate)
                        // console.warn('week',this.props.compteurNutritionnel)
                        // console.warn('inona',this.state.shortdayofweek[this.state.nowdate])
                        if(!isrestrictget_besoin_kcal){
                            this.state.indexcollationetconsort === 6 ? this.circularProgressCompteurNutritionnel.animate(  this.props.compteurNutritionnel.data[this.state.shortdayofweekone[this.state.nowdate]].kcal.percent, 1000, Easing.quad) : this.circularProgressCompteurNutritionnel.animate(  this.props.compteurNutritionnel.data[this.state.newarrayarrenged[this.state.indexcollationetconsort]].kcal.percent, 1000, Easing.quad)

                        }
                    }catch (e) { }
                }
            }
        }


        if(this.props.popToTop === 'home'){
            this.props.navigation.popToTop();
            const setPopToTop = { type: SET_POP_TO_TOP, value: '' } //eto zany za no mi-trave
            this.props.dispatch(setPopToTop);
            // return null;
        }

        return (
            <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }} colors={[colors.balck, colors.green, colors.balck]} style={baseStyles.linearGradient}>
                <ScrollView
                    style={styles.scrollView}
                    contentContainerStyle={[styles.contentContainerStyle]}
                    keyboardShouldPersistTaps={'always'}
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.refreshing}
                            onRefresh={() => {
                                getCompteurNutritionnel(compteurNutritionnelHelper,this.props,this.props.userToken).then(()=>{
                                    this.setState({refreshing:false})
                                })
                            }}
                            tintColor={Platform.OS==='ios'?colors.white:colors.green}
                            colors={[Platform.OS==='ios'?colors.white:colors.green]}
                        />
                    }
                ><View style={{ alignItems :"center",justifyContent:"center",width:"100%",marginTop:15  }}>
                    <TouchableOpacity
                        onPress={() => {
                            getDashboar(dashboardHelper,this.props).then(()=>{})
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
                            source={require('../../../assets/icons/arrow-white.png')}
                            style={{
                                marginLeft:15,
                                transform: [
                                    { rotateY: "180deg" }
                                ],
                            }}
                        />
                    </TouchableOpacity>
                    <Text style={[baseStyles.titleText,{textAlign:"center",marginLeft:-screenWidth * 0.008}]}>
                        {"Compteur nutritionnel"}
                    </Text>
                </View>

                    {this.props.compteurNutritionnel !== null && this.renderweeknutritional(this.state.shortdayofweek[this.state.nowdate],this.state.indexcollationetconsort)}

                    <View
                        style={{ width: screenWidth, height: 40,marginTop:15 }}
                    >
                        <View style={{alignItems :"center",justifyContent:"center",width:"100%"}}>

                            { this.state.indexcollationetconsort !== 0 ?
                                <TouchableOpacity
                                    onPress={() => {
                                        //vers gauche
                                        this.setState({indexcollationetconsort: this.state.indexcollationetconsort - 1});

                                    }}
                                    style={{width:50,position:"absolute",left:50}}
                                >
                                    <AutoHeightImage
                                        width={18}
                                        source={require('../../../assets/icons/left.arrow.white.png')} />
                                </TouchableOpacity>
                                :
                                <View/>
                            }

                            { this.state.indexcollationetconsort === 6 ?
                                <Text style={[baseStyles.textColorWhite, { fontSize: 18 }]}>{/*AUJOURD'HUI*/}{this.props.compteurNutritionnel !== null && this.props.compteurNutritionnel.data[this.state.shortdayofweekone[this.state.nowdate]].day.toUpperCase()}</Text>
                                :
                                <Text style={[baseStyles.textColorWhite, { fontSize: 18 }]}>{this.state.newarrayarrenged !== null && ( this.props.compteurNutritionnel !== null && this.props.compteurNutritionnel.data[this.state.newarrayarrenged[this.state.indexcollationetconsort]].day.toUpperCase())}</Text>
                            }


                            {  this.state.indexcollationetconsort !== 6 ?
                                <TouchableOpacity
                                    onPress={() => {
                                        this.setState({indexcollationetconsort: this.state.indexcollationetconsort+1})
                                    }}
                                    style={{width:50,position:"absolute",right:50,alignItems:"flex-end"}}
                                >
                                    <AutoHeightImage
                                        width={18}
                                        source={require('../../../assets/icons/left.arrow.white.png')}
                                        style={{
                                            //opacity: 0
                                            transform: [{ rotateY: "180deg" }]
                                        }} />
                                </TouchableOpacity>
                                :
                                <View/>
                            }

                        </View>
                    </View>
                    <View style={{ margin: 4 }}></View>
                    <View style={[styles.outerProgress]}>
                        <AnimatedCircularProgress
                            ref={(ref) => this.circularProgressCompteurNutritionnel = ref}
                            size={screenWidth * 0.55}
                            width={10}
                            rotation={-360}
                            tintColor={colors.red}
                            lineCap={"round"}
                            style={{
                                overflow: "hidden",
                                paddingTop:screenWidth*0.001,
                                paddingBottom:screenWidth*0.002
                            }}
                            backgroundColor="transparent"
                        >
                            {
                                (fill) => (
                                    <View style={{marginTop:7}}>
                                        {!isrestrictget_besoin_kcal ? <ImageBackground
                                                style={{
                                                    width: screenWidth * 0.45, height: screenWidth * 0.45, alignItems: "center"}}
                                                source={require("../../../assets/images/bb.png")}>
                                                <View style={[styles.innerProgress, { alignItems: "center", justifyContent: "center", flex: 1 }]}
                                                >
                                                    <View style={[styles.valueCtn,{padding:3}]}>
                                                        {/*1850*/}
                                                        {this.state.indexcollationetconsort === 6 ?
                                                            <Text
                                                                // style={[styles.textBold, {fontSize: 31}]}>{this.props.compteurNutritionnel !== null && this.props.compteurNutritionnel.data[this.state.shortdayofweekone[this.state.nowdate]].kcal.current.toFixed(2)}</Text>
                                                                style={[styles.textBold, {fontSize: 31}]}>{Math.trunc(this.props.compteurNutritionnel !== null && this.props.compteurNutritionnel.data[this.state.shortdayofweekone[this.state.nowdate]].kcal.current)}</Text>
                                                            :
                                                            <Text
                                                                // style={[styles.textBold, {fontSize: 31}]}>{this.props.compteurNutritionnel !== null && this.props.compteurNutritionnel.data[this.state.newarrayarrenged[this.state.indexcollationetconsort]].kcal.current.toFixed(2)}</Text>
                                                                style={[styles.textBold, {fontSize: 31}]}>{Math.trunc(this.props.compteurNutritionnel !== null && this.props.compteurNutritionnel.data[this.state.newarrayarrenged[this.state.indexcollationetconsort]].kcal.current)}</Text>
                                                        }
                                                    </View>
                                                    <View style={{flexDirection:'row',top:-2, alignItems:'flex-end'}}>
                                                        {this.state.indexcollationetconsort === 6 ?
                                                            <Text style={[styles.qtText,{fontSize:13}]}>/{ this.props.compteurNutritionnel !== null && this.props.compteurNutritionnel.data[this.state.shortdayofweekone[this.state.nowdate]].kcal.max} </Text>
                                                            :
                                                            <Text style={[styles.qtText,{fontSize:13}]}>/{ this.props.compteurNutritionnel !== null && this.props.compteurNutritionnel.data[this.state.newarrayarrenged[this.state.indexcollationetconsort]].kcal.max} </Text>
                                                        }
                                                        <Text style={{fontSize:12,color:"#fff"}}>kcal</Text>
                                                    </View>
                                                    {this.state.indexcollationetconsort === 6 ?
                                                        <Text
                                                            // style={[styles.qtText, { color: colors.red,fontSize:19,fontWeight: "bold" }]}>{ this.props.compteurNutritionnel !== null && this.props.compteurNutritionnel.data[this.state.shortdayofweekone[this.state.nowdate]].kcal.percent.toFixed(2)}%</Text>*/}
                                                            style={[styles.qtText, { color: colors.red,fontSize:19,fontWeight: "bold" }]}>{ Math.trunc(this.props.compteurNutritionnel !== null && this.props.compteurNutritionnel.data[this.state.shortdayofweekone[this.state.nowdate]].kcal.percent)}%</Text>
                                                        :
                                                        <Text
                                                            // style={[styles.qtText, { color: colors.red,fontSize:19,fontWeight: "bold" }]}>{ this.props.compteurNutritionnel !== null && this.props.compteurNutritionnel.data[this.state.newarrayarrenged[this.state.indexcollationetconsort]].kcal.percent.toFixed(2)}%</Text>
                                                            style={[styles.qtText, { color: colors.red,fontSize:19,fontWeight: "bold" }]}>{ Math.trunc(this.props.compteurNutritionnel !== null && this.props.compteurNutritionnel.data[this.state.newarrayarrenged[this.state.indexcollationetconsort]].kcal.percent)}%</Text>
                                                    }
                                                </View>
                                            </ImageBackground>
                                            :
                                            <View  style={{
                                                width: screenWidth * 0.55, height: screenWidth * 0.55, alignItems: "center",backgroundColor:colors.grisee}}
                                            >
                                                <View style={[styles.innerProgress, { alignItems: "center", justifyContent: "center", flex: 1 }]}
                                                >
                                                    <View style={[styles.valueCtn,{padding:3}]}>
                                                        {/*1850*/}
                                                        {this.state.indexcollationetconsort === 6 ?
                                                            <Text
                                                                // style={[styles.textBold, {fontSize: 31}]}>{this.props.compteurNutritionnel !== null && this.props.compteurNutritionnel.data[this.state.shortdayofweekone[this.state.nowdate]].kcal.current.toFixed(2)}</Text>
                                                                style={[styles.textBold, {fontSize: 31,color:colors.textgrisee}]}>0</Text>
                                                            :
                                                            <Text
                                                                // style={[styles.textBold, {fontSize: 31}]}>{this.props.compteurNutritionnel !== null && this.props.compteurNutritionnel.data[this.state.newarrayarrenged[this.state.indexcollationetconsort]].kcal.current.toFixed(2)}</Text>
                                                                style={[styles.textBold, {fontSize: 31}]}>{Math.trunc(this.props.compteurNutritionnel !== null && this.props.compteurNutritionnel.data[this.state.newarrayarrenged[this.state.indexcollationetconsort]].kcal.current)}</Text>
                                                        }
                                                    </View>
                                                    <View style={{flexDirection:'row',top:-2, alignItems:'flex-end'}}>
                                                        {this.state.indexcollationetconsort === 6 ?
                                                            <Text style={[styles.qtText,{fontSize:13,color:colors.textgrisee}]}>/{ this.props.compteurNutritionnel !== null && this.props.compteurNutritionnel.data[this.state.shortdayofweekone[this.state.nowdate]].kcal.max} </Text>
                                                            :
                                                            <Text style={[styles.qtText,{fontSize:13,color:colors.textgrisee}]}>/{ this.props.compteurNutritionnel !== null && this.props.compteurNutritionnel.data[this.state.newarrayarrenged[this.state.indexcollationetconsort]].kcal.max} </Text>
                                                        }
                                                        <Text style={{fontSize:12,color:colors.textgrisee}}>kcal</Text>
                                                    </View>
                                                    {this.state.indexcollationetconsort === 6 ?
                                                        <Text
                                                            // style={[styles.qtText, { color: colors.red,fontSize:19,fontWeight: "bold" }]}>{ this.props.compteurNutritionnel !== null && this.props.compteurNutritionnel.data[this.state.shortdayofweekone[this.state.nowdate]].kcal.percent.toFixed(2)}%</Text>*/}
                                                            style={[styles.qtText, { fontSize:19,fontWeight: "bold",color:colors.textgrisee }]}>0%</Text>
                                                        :
                                                        <Text
                                                            // style={[styles.qtText, { color: colors.red,fontSize:19,fontWeight: "bold" }]}>{ this.props.compteurNutritionnel !== null && this.props.compteurNutritionnel.data[this.state.newarrayarrenged[this.state.indexcollationetconsort]].kcal.percent.toFixed(2)}%</Text>
                                                            style={[styles.qtText, { color: colors.textgrisee,fontSize:19,fontWeight: "bold" }]}>0%</Text>
                                                    }
                                                </View>
                                            </View>
                                        }
                                    </View>
                                )
                            }
                        </AnimatedCircularProgress>
                    </View>
                    <View style={{ margin: 10 }}></View>

                    <View style={{ flexDirection: "row", justifyContent: "space-around", marginLeft: 5 }}>
                        <View style={{ flexDirection: "column", width: screenWidth * 0.3 }}>
                            <Text style={[styles.qtText]}>Glucides</Text>
                            {this.state.indexcollationetconsort === 6 ?
                                <Text
                                    // style={[styles.qtText, { color: "lightgrey", fontSize: 8 }]}>{ this.props.compteurNutritionnel !== null && this.props.compteurNutritionnel.data[this.state.shortdayofweekone[this.state.nowdate]].glu.current.toFixed(3)} / { this.props.compteurNutritionnel !== null && this.props.compteurNutritionnel.data[this.state.shortdayofweekone[this.state.nowdate]].glu.max.toFixed(3)} g</Text>
                                    style={[styles.qtText, { color: "lightgrey", fontSize: 8 }]}>{ this.props.compteurNutritionnel !== null && Math.trunc(this.props.compteurNutritionnel.data[this.state.shortdayofweekone[this.state.nowdate]].glu.current)} / { this.props.compteurNutritionnel !== null && Math.trunc(this.props.compteurNutritionnel.data[this.state.shortdayofweekone[this.state.nowdate]].glu.max)} g</Text>
                                :
                                <Text
                                    // style={[styles.qtText, { color: "lightgrey", fontSize: 8 }]}>{ this.props.compteurNutritionnel !== null && this.props.compteurNutritionnel.data[this.state.newarrayarrenged[this.state.indexcollationetconsort]].glu.current.toFixed(3)} / { this.props.compteurNutritionnel !== null && this.props.compteurNutritionnel.data[this.state.newarrayarrenged[this.state.indexcollationetconsort]].glu.max.toFixed(3)} g</Text>
                                    style={[styles.qtText, { color: "lightgrey", fontSize: 8 }]}>{ this.props.compteurNutritionnel !== null && Math.trunc(this.props.compteurNutritionnel.data[this.state.newarrayarrenged[this.state.indexcollationetconsort]].glu.current)} / { this.props.compteurNutritionnel !== null && Math.trunc(this.props.compteurNutritionnel.data[this.state.newarrayarrenged[this.state.indexcollationetconsort]].glu.max)} g</Text>
                            }
                            <View style={[styles.progressBlock]}>
                                <View style={[styles.progressCtn]}>
                                    {this.state.indexcollationetconsort === 6 ?
                                        <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={[colors.red + "44", colors.red]} style={[styles.progressValue, { width:  this.props.compteurNutritionnel !== null ? (this.props.compteurNutritionnel.data[this.state.shortdayofweekone[this.state.nowdate]].glu.percent> 100 ? 100+"%" : this.props.compteurNutritionnel.data[this.state.shortdayofweekone[this.state.nowdate]].glu.percent+"%") : "0%"}]}></LinearGradient>
                                        :
                                        <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={[colors.red + "44", colors.red]} style={[styles.progressValue, { width:  this.props.compteurNutritionnel !== null ? (this.props.compteurNutritionnel.data[this.state.newarrayarrenged[this.state.indexcollationetconsort]].glu.percent> 100 ? 100+"%" : this.props.compteurNutritionnel.data[this.state.newarrayarrenged[this.state.indexcollationetconsort]].glu.percent+"%") : "0%"}]}></LinearGradient>
                                    }
                                    {/* <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={["#FF9999", colors.red]} style={[styles.progressValue,{width:"60%"}]}></LinearGradient> */}
                                </View>
                            </View>
                        </View>
                        <View style={{ flexDirection: "column", width: screenWidth * 0.3 }}>
                            <Text style={[styles.qtText]}>Protéines</Text>
                            <Text
                                // style={[styles.qtText, { color: "lightgrey", fontSize: 8 }]}>{ this.props.compteurNutritionnel !== null && this.props.compteurNutritionnel.data[this.state.shortdayofweekone[this.state.nowdate]].prot.current.toFixed(3)} / { this.props.compteurNutritionnel !== null && this.props.compteurNutritionnel.data[this.state.shortdayofweekone[this.state.nowdate]].prot.max.toFixed(3)} g</Text>
                                style={[styles.qtText, { color: "lightgrey", fontSize: 8 }]}>{ this.props.compteurNutritionnel !== null && Math.trunc(this.props.compteurNutritionnel.data[this.state.shortdayofweekone[this.state.nowdate]].prot.current)} / { this.props.compteurNutritionnel !== null && Math.trunc(this.props.compteurNutritionnel.data[this.state.shortdayofweekone[this.state.nowdate]].prot.max)} g</Text>
                            <View style={[styles.progressBlock]}>
                                <View style={[styles.progressCtn]}>
                                    {this.state.indexcollationetconsort === 6 ?
                                        <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={[colors.red + "44", colors.red]} style={[styles.progressValue, { width:  this.props.compteurNutritionnel !== null ? (this.props.compteurNutritionnel.data[this.state.shortdayofweekone[this.state.nowdate]].prot.percent> 100 ? 100+"%" : this.props.compteurNutritionnel.data[this.state.shortdayofweekone[this.state.nowdate]].prot.percent+"%") : "0%"}]}></LinearGradient>
                                        :
                                        <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={[colors.red + "44", colors.red]} style={[styles.progressValue, { width:  this.props.compteurNutritionnel !== null ? (this.props.compteurNutritionnel.data[this.state.newarrayarrenged[this.state.indexcollationetconsort]].prot.percent> 100 ? 100+"%" : this.props.compteurNutritionnel.data[this.state.newarrayarrenged[this.state.indexcollationetconsort]].prot.percent+"%") : "0%"}]}></LinearGradient>
                                    }
                                </View>
                            </View>
                        </View>
                        <View style={{ flexDirection: "column", width: screenWidth * 0.3 }}>
                            <Text style={[styles.qtText]}>Lipides</Text>
                            <Text
                                // style={[styles.qtText, { color: "lightgrey", fontSize: 8 }]}>{ this.props.compteurNutritionnel !== null && this.props.compteurNutritionnel.data[this.state.shortdayofweekone[this.state.nowdate]].lip.current.toFixed(3)} / { this.props.compteurNutritionnel !== null && this.props.compteurNutritionnel.data[this.state.shortdayofweekone[this.state.nowdate]].lip.max.toFixed(3)} g</Text>
                                style={[styles.qtText, { color: "lightgrey", fontSize: 8 }]}>{ this.props.compteurNutritionnel !== null && Math.trunc(this.props.compteurNutritionnel.data[this.state.shortdayofweekone[this.state.nowdate]].lip.current)} / { this.props.compteurNutritionnel !== null && Math.trunc(this.props.compteurNutritionnel.data[this.state.shortdayofweekone[this.state.nowdate]].lip.max)} g</Text>
                            <View style={[styles.progressBlock]}>
                                <View style={[styles.progressCtn]}>
                                    {this.state.indexcollationetconsort === 6 ?
                                        <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={[colors.red + "44", colors.red]} style={[styles.progressValue, { width:  this.props.compteurNutritionnel !== null ? (this.props.compteurNutritionnel.data[this.state.shortdayofweekone[this.state.nowdate]].lip.percent> 100 ? 100+"%" : this.props.compteurNutritionnel.data[this.state.shortdayofweekone[this.state.nowdate]].lip.percent+"%") : "0%"}]}></LinearGradient>
                                        :
                                        <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={[colors.red + "44", colors.red]} style={[styles.progressValue, { width:  this.props.compteurNutritionnel !== null ? (this.props.compteurNutritionnel.data[this.state.newarrayarrenged[this.state.indexcollationetconsort]].lip.percent> 100 ? 100+"%" : this.props.compteurNutritionnel.data[this.state.newarrayarrenged[this.state.indexcollationetconsort]].lip.percent+"%") : "0%"}]}></LinearGradient>
                                    }
                                </View>
                            </View>
                        </View>
                    </View>

                    <TouchableOpacity
                        onPress={()=>{
                            search("",this.props,filteredNosSuggestionfiltered,filteredmesRepaspetitsdejeunerfiltered,filteredEatRecentlyfiltered,filteredCollationmatinfiltered,filteredDejeunerfiltered,filteredCollationApresMidifiltered,filteredDinerfiltered,createFilter);
                            this.setState({refreshing:true});
                            this.getdatee();
                            getSelectionnerNosSuggestion(compteurNutritionnelHelper,this.props,1).then((refreshingfalse)=>{
                                // this.setState({
                                //     refreshing: refreshingfalse
                                // })
                            });
                            this.setState({refreshing:true});
                            const setmonassiette = { type: SET_MON_ASSIETTE, value: [] };
                            this.props.dispatch(setmonassiette);
                            global.repas_type_id = this.props.compteurNutritionnel !== null && this.props.compteurNutritionnel.data[this.state.shortdayofweekone[this.state.nowdate]].repas['1'].id;
                            monassiete(compteurNutritionnelHelper,this.props,this.props.compteurNutritionnel !== null && this.props.compteurNutritionnel.data[this.state.shortdayofweekone[this.state.nowdate]].repas['1'].id,this.props.dateforajoutaliment).then((refreshingfalse)=>{ //initialisena mon assiette =  petit dejeuner
                                this.setState({
                                    refreshing: refreshingfalse
                                });
                                this.setState({refreshing:true});
                                getViaPostRepas(compteurNutritionnelHelper,this.props,global.repas_type_id).then(()=>{
                                    this.setState({refreshing:false});

                                    if( this.props.navigation.navigate('PetitdejeunerNew',{venurepas:false,repastypeid_propsnavig:this.props.compteurNutritionnel !== null && this.props.compteurNutritionnel.data[this.state.shortdayofweekone[this.state.nowdate]].repas['1'].id,nom_PetitDejOuCollationEtReste:this.props.compteurNutritionnel !== null && this.props.compteurNutritionnel.data[this.state.shortdayofweekone[this.state.nowdate]].repas['1'].name})){}
                                    else {
                                        this.props.navigation.navigate('PetitdejeunerNews',{venurepas:false,repastypeid_propsnavig:this.props.compteurNutritionnel !== null && this.props.compteurNutritionnel.data[this.state.shortdayofweekone[this.state.nowdate]].repas['1'].id,nom_PetitDejOuCollationEtReste:this.props.compteurNutritionnel !== null && this.props.compteurNutritionnel.data[this.state.shortdayofweekone[this.state.nowdate]].repas['1'].name})
                                    }
                                });
                            });
                        }}
                        style={{
                            flexDirection: "row", alignItems: "center", justifyContent: "space-between", padding: 10,
                            paddingLeft: 15, paddingRight: 15,
                            width: (screenWidth - 40), marginTop: 20,
                            borderWidth: 1, borderColor: colors.white, borderRadius: 5
                        }}
                    >
                        <View
                            style={{ flexDirection: "row" }}>
                            <AutoHeightImage
                                width={26}
                                // source={require('../../../assets/icons/coffee2.png')}
                                source={{uri : this.props.compteurNutritionnel !== null ? this.props.compteurNutritionnel.data[this.state.shortdayofweekone[this.state.nowdate]].repas['1'].icon :''}}
                                style={{ alignSelf: "center",marginLeft:-4,marginRight:5 }} />
                            <View style={{ flexDirection: "column", marginLeft: 5 }}>
                                <Text style={[baseStyles.textColorWhite]}>{ this.props.compteurNutritionnel !== null && this.props.compteurNutritionnel.data[this.state.shortdayofweekone[this.state.nowdate]].repas['1'].name}</Text>
                                {this.state.indexcollationetconsort === 6 ?
                                    <Text
                                        // style={[styles.qtText, { color: "lightgrey", fontSize: 8 }]}>{ this.props.compteurNutritionnel !== null && this.props.compteurNutritionnel.data[this.state.shortdayofweekone[this.state.nowdate]].repas['1'].current.toFixed(3)} / { this.props.compteurNutritionnel !== null && this.props.compteurNutritionnel.data[this.state.shortdayofweekone[this.state.nowdate]].repas['1'].max.toFixed(3)} Kcal</Text>
                                        style={[styles.qtText, { color: !isrestrictget_besoin_kcal ?"lightgrey":colors.textgrisee, fontSize: 8 }]}>{!isrestrictget_besoin_kcal ? (this.props.compteurNutritionnel !== null && Math.trunc(this.props.compteurNutritionnel.data[this.state.shortdayofweekone[this.state.nowdate]].repas['1'].current)):0} / { this.props.compteurNutritionnel !== null && Math.trunc(this.props.compteurNutritionnel.data[this.state.shortdayofweekone[this.state.nowdate]].repas['1'].max)} Kcal</Text>
                                    :
                                    <Text
                                        // style={[styles.qtText, { color: "lightgrey", fontSize: 8 }]}>{ this.props.compteurNutritionnel !== null && this.props.compteurNutritionnel.data[this.state.newarrayarrenged[this.state.indexcollationetconsort]].repas['1'].current.toFixed(3)} / { this.props.compteurNutritionnel !== null && this.props.compteurNutritionnel.data[this.state.newarrayarrenged[this.state.indexcollationetconsort]].repas['1'].max.toFixed(3)} Kcal</Text>
                                        style={[styles.qtText, { color: !isrestrictget_besoin_kcal ?"lightgrey":colors.textgrisee, fontSize: 8 }]}>{ !isrestrictget_besoin_kcal ?(this.props.compteurNutritionnel !== null && Math.trunc(this.props.compteurNutritionnel.data[this.state.newarrayarrenged[this.state.indexcollationetconsort]].repas['1'].current)):0} / { this.props.compteurNutritionnel !== null && Math.trunc(this.props.compteurNutritionnel.data[this.state.newarrayarrenged[this.state.indexcollationetconsort]].repas['1'].max)} Kcal</Text>
                                }
                            </View>
                        </View>
                        <AutoHeightImage
                            width={30}
                            source={require('../../../assets/icons/group.png')}
                            style={{}} />
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={{
                            flexDirection: "row", alignItems: "center", justifyContent: "space-between", padding: 10,
                            paddingLeft: 15, paddingRight: 15,
                            width: (screenWidth - 40), marginTop: 20,
                            borderWidth: 1, borderColor: colors.white, borderRadius: 5
                        }}
                        //  onPress={() => this.props.navigation.navigate("AjoutAliment")}
                        onPress={()=>{
                            search("",this.props,filteredNosSuggestionfiltered,filteredmesRepaspetitsdejeunerfiltered,filteredEatRecentlyfiltered,filteredCollationmatinfiltered,filteredDejeunerfiltered,filteredCollationApresMidifiltered,filteredDinerfiltered,createFilter);
                            this.getdatee();
                            this.setState({refreshing:true});
                            getSelectionnerNosSuggestion(compteurNutritionnelHelper,this.props,2).then((refreshingfalse)=>{
                                // this.setState({
                                //     refreshing: refreshingfalse
                                // })
                            });
                            this.setState({refreshing:true});
                            const setmonassiette = { type: SET_MON_ASSIETTE, value: [] };
                            this.props.dispatch(setmonassiette);
                            global.repas_type_id = this.props.compteurNutritionnel !== null && this.props.compteurNutritionnel.data[this.state.shortdayofweekone[this.state.nowdate]].repas['2'].id;
                            monassiete(compteurNutritionnelHelper,this.props,this.props.compteurNutritionnel !== null && this.props.compteurNutritionnel.data[this.state.shortdayofweekone[this.state.nowdate]].repas['2'].id,this.props.dateforajoutaliment).then((refreshingfalse)=>{ //initialisena mon assiette =  petit dejeuner
                                this.setState({
                                    refreshing: refreshingfalse
                                });
                                this.setState({refreshing:true});
                                getViaPostRepas(compteurNutritionnelHelper,this.props,global.repas_type_id).then(()=>{
                                    this.setState({refreshing:false});

                                    if( this.props.navigation.navigate('PetitdejeunerNew',{venurepas:false,repastypeid_propsnavig:this.props.compteurNutritionnel !== null && this.props.compteurNutritionnel.data[this.state.shortdayofweekone[this.state.nowdate]].repas['2'].id,nom_PetitDejOuCollationEtReste:this.props.compteurNutritionnel !== null && this.props.compteurNutritionnel.data[this.state.shortdayofweekone[this.state.nowdate]].repas['2'].name})){}
                                    else {
                                        this.props.navigation.navigate('PetitdejeunerNews',{venurepas:false,repastypeid_propsnavig:this.props.compteurNutritionnel !== null && this.props.compteurNutritionnel.data[this.state.shortdayofweekone[this.state.nowdate]].repas['2'].id,nom_PetitDejOuCollationEtReste:this.props.compteurNutritionnel !== null && this.props.compteurNutritionnel.data[this.state.shortdayofweekone[this.state.nowdate]].repas['2'].name})
                                    }
                                });
                            });
                        }}
                    >
                        <View style={{ flexDirection: "row" }}>
                            <AutoHeightImage
                                width={26}
                                // source={require('../../../assets/icons/porridge2.png')}
                                source = {{uri : this.props.compteurNutritionnel !== null ? this.props.compteurNutritionnel.data[this.state.shortdayofweekone[this.state.nowdate]].repas['2'].icon :''}}
                                style={{ alignSelf: "center",marginLeft:-6,marginRight:6 }} />
                            <View style={{ flexDirection: "column", marginLeft: 5 }}>
                                <Text style={[baseStyles.textColorWhite]}>{ this.props.compteurNutritionnel !== null && this.props.compteurNutritionnel.data[this.state.shortdayofweekone[this.state.nowdate]].repas['2'].name}</Text>
                                {this.state.indexcollationetconsort === 6 ?
                                    <Text style={[styles.qtText, { color: !isrestrictget_besoin_kcal ?"lightgrey":colors.textgrisee, fontSize: 8 }]}>{ !isrestrictget_besoin_kcal ?(this.props.compteurNutritionnel !== null && Math.trunc(this.props.compteurNutritionnel.data[this.state.shortdayofweekone[this.state.nowdate]].repas['2'].current)):0} / { this.props.compteurNutritionnel !== null && Math.trunc(this.props.compteurNutritionnel.data[this.state.shortdayofweekone[this.state.nowdate]].repas['2'].max)} Kcal</Text>
                                    :
                                    <Text
                                        // style={[styles.qtText, { color: "lightgrey", fontSize: 8 }]}>{ this.props.compteurNutritionnel !== null && this.props.compteurNutritionnel.data[this.state.newarrayarrenged[this.state.indexcollationetconsort]].repas['2'].current.toFixed(3)} / { this.props.compteurNutritionnel !== null && this.props.compteurNutritionnel.data[this.state.newarrayarrenged[this.state.indexcollationetconsort]].repas['2'].max.toFixed(3)} Kcal</Text>
                                        style={[styles.qtText, { color: !isrestrictget_besoin_kcal ?"lightgrey":colors.textgrisee, fontSize: 8 }]}>{!isrestrictget_besoin_kcal ?( this.props.compteurNutritionnel !== null && Math.trunc(this.props.compteurNutritionnel.data[this.state.newarrayarrenged[this.state.indexcollationetconsort]].repas['2'].current)):0} / { this.props.compteurNutritionnel !== null && Math.trunc(this.props.compteurNutritionnel.data[this.state.newarrayarrenged[this.state.indexcollationetconsort]].repas['2'].max)} Kcal</Text>
                                }
                            </View>
                        </View>
                        <AutoHeightImage
                            width={30}
                            source={require('../../../assets/icons/group.png')}
                            style={{}} />
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={()=>{
                            search("",this.props,filteredNosSuggestionfiltered,filteredmesRepaspetitsdejeunerfiltered,filteredEatRecentlyfiltered,filteredCollationmatinfiltered,filteredDejeunerfiltered,filteredCollationApresMidifiltered,filteredDinerfiltered,createFilter);
                            this.getdatee();
                            this.setState({refreshing:true});
                            getSelectionnerNosSuggestion(compteurNutritionnelHelper,this.props,3).then((refreshingfalse)=>{
                                this.setState({
                                    refreshing: refreshingfalse
                                })
                            });
                            this.setState({refreshing:true});
                            const setmonassiette = { type: SET_MON_ASSIETTE, value: [] };
                            this.props.dispatch(setmonassiette);
                            global.repas_type_id = this.props.compteurNutritionnel !== null && this.props.compteurNutritionnel.data[this.state.shortdayofweekone[this.state.nowdate]].repas['3'].id;
                            monassiete(compteurNutritionnelHelper,this.props,this.props.compteurNutritionnel !== null && this.props.compteurNutritionnel.data[this.state.shortdayofweekone[this.state.nowdate]].repas['3'].id,this.props.dateforajoutaliment).then((refreshingfalse)=>{ //initialisena mon assiette =  petit dejeuner
                                this.setState({
                                    refreshing: refreshingfalse
                                });
                                this.setState({refreshing:true});
                                getViaPostRepas(compteurNutritionnelHelper,this.props,global.repas_type_id).then(()=>{
                                    this.setState({refreshing:false});

                                    if( this.props.navigation.navigate('PetitdejeunerNew',{venurepas:false,repastypeid_propsnavig:this.props.compteurNutritionnel !== null && this.props.compteurNutritionnel.data[this.state.shortdayofweekone[this.state.nowdate]].repas['3'].id,nom_PetitDejOuCollationEtReste:this.props.compteurNutritionnel !== null && this.props.compteurNutritionnel.data[this.state.shortdayofweekone[this.state.nowdate]].repas['3'].name})){}
                                    else {
                                        this.props.navigation.navigate('PetitdejeunerNews',{venurepas:false,repastypeid_propsnavig:this.props.compteurNutritionnel !== null && this.props.compteurNutritionnel.data[this.state.shortdayofweekone[this.state.nowdate]].repas['3'].id,nom_PetitDejOuCollationEtReste:this.props.compteurNutritionnel !== null && this.props.compteurNutritionnel.data[this.state.shortdayofweekone[this.state.nowdate]].repas['3'].name})
                                    }
                                });
                            });
                        }}

                        style={{
                            flexDirection: "row", alignItems: "center", justifyContent: "space-between", padding: 10,
                            paddingLeft: 15, paddingRight: 15,
                            width: (screenWidth - 40), marginTop: 20,
                            borderWidth: 1, borderColor: colors.white, borderRadius: 5
                        }}
                    >
                        <View style={{ flexDirection: "row" }}>
                            <AutoHeightImage
                                width={23.5}
                                // source={require('../../../assets/icons/shape2.png')}
                                source= {{uri : this.props.compteurNutritionnel !== null ? this.props.compteurNutritionnel.data[this.state.shortdayofweekone[this.state.nowdate]].repas['3'].icon :''}}
                                style={{ alignSelf: "center",marginLeft:-4,marginRight:7 }} />
                            <View style={{ flexDirection: "column", marginLeft: 5 }}>
                                <Text style={[baseStyles.textColorWhite]}>{ this.props.compteurNutritionnel !== null && this.props.compteurNutritionnel.data[this.state.shortdayofweekone[this.state.nowdate]].repas['3'].name}</Text>
                                {this.state.indexcollationetconsort === 6 ?
                                    <Text
                                        // style={[styles.qtText, { color: "lightgrey", fontSize: 8 }]}>{ this.props.compteurNutritionnel !== null && this.props.compteurNutritionnel.data[this.state.shortdayofweekone[this.state.nowdate]].repas['3'].current.toFixed(3)} / { this.props.compteurNutritionnel !== null && this.props.compteurNutritionnel.data[this.state.shortdayofweekone[this.state.nowdate]].repas['3'].max.toFixed(3)} Kcal</Text>
                                        style={[styles.qtText, { color: !isrestrictget_besoin_kcal ?"lightgrey":colors.textgrisee, fontSize: 8 }]}>{!isrestrictget_besoin_kcal ?( this.props.compteurNutritionnel !== null && Math.trunc(this.props.compteurNutritionnel.data[this.state.shortdayofweekone[this.state.nowdate]].repas['3'].current)):0} / { this.props.compteurNutritionnel !== null && Math.trunc(this.props.compteurNutritionnel.data[this.state.shortdayofweekone[this.state.nowdate]].repas['3'].max)} Kcal</Text>
                                    :
                                    <Text
                                        // style={[styles.qtText, { color: "lightgrey", fontSize: 8 }]}>{ this.props.compteurNutritionnel !== null && this.props.compteurNutritionnel.data[this.state.newarrayarrenged[this.state.indexcollationetconsort]].repas['3'].current.toFixed(3)} / { this.props.compteurNutritionnel !== null && this.props.compteurNutritionnel.data[this.state.newarrayarrenged[this.state.indexcollationetconsort]].repas['3'].max.toFixed(3)} Kcal</Text>
                                        style={[styles.qtText, { color: !isrestrictget_besoin_kcal ?"lightgrey":colors.textgrisee, fontSize: 8 }]}>{ !isrestrictget_besoin_kcal ?(this.props.compteurNutritionnel !== null && Math.trunc(this.props.compteurNutritionnel.data[this.state.newarrayarrenged[this.state.indexcollationetconsort]].repas['3'].current)):0} / { this.props.compteurNutritionnel !== null && Math.trunc(this.props.compteurNutritionnel.data[this.state.newarrayarrenged[this.state.indexcollationetconsort]].repas['3'].max)} Kcal</Text>
                                }
                            </View>
                        </View>
                        <AutoHeightImage
                            width={28}
                            source={require('../../../assets/icons/group.png')}
                            style={{}} />
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={()=>{
                            search("",this.props,filteredNosSuggestionfiltered,filteredmesRepaspetitsdejeunerfiltered,filteredEatRecentlyfiltered,filteredCollationmatinfiltered,filteredDejeunerfiltered,filteredCollationApresMidifiltered,filteredDinerfiltered,createFilter);
                            this.getdatee();
                            this.setState({refreshing:true});
                            getSelectionnerNosSuggestion(compteurNutritionnelHelper,this.props,4).then((refreshingfalse)=>{
                                this.setState({
                                    refreshing: refreshingfalse
                                })
                            });
                            this.setState({refreshing:true});
                            const setmonassiette = { type: SET_MON_ASSIETTE, value: [] };
                            this.props.dispatch(setmonassiette);
                            global.repas_type_id = this.props.compteurNutritionnel !== null && this.props.compteurNutritionnel.data[this.state.shortdayofweekone[this.state.nowdate]].repas['4'].id;
                            monassiete(compteurNutritionnelHelper,this.props,this.props.compteurNutritionnel !== null && this.props.compteurNutritionnel.data[this.state.shortdayofweekone[this.state.nowdate]].repas['4'].id,this.props.dateforajoutaliment).then((refreshingfalse)=>{ //initialisena mon assiette =  petit dejeuner
                                this.setState({
                                    refreshing: refreshingfalse
                                });
                                this.setState({refreshing:true});
                                getViaPostRepas(compteurNutritionnelHelper,this.props,global.repas_type_id).then(()=>{
                                    this.setState({refreshing:false});

                                    if( this.props.navigation.navigate('PetitdejeunerNew',{venurepas:false,repastypeid_propsnavig:this.props.compteurNutritionnel !== null && this.props.compteurNutritionnel.data[this.state.shortdayofweekone[this.state.nowdate]].repas['4'].id,nom_PetitDejOuCollationEtReste:this.props.compteurNutritionnel !== null && this.props.compteurNutritionnel.data[this.state.shortdayofweekone[this.state.nowdate]].repas['4'].name})){}
                                    else {
                                        this.props.navigation.navigate('PetitdejeunerNews',{venurepas:false,repastypeid_propsnavig:this.props.compteurNutritionnel !== null && this.props.compteurNutritionnel.data[this.state.shortdayofweekone[this.state.nowdate]].repas['4'].id,nom_PetitDejOuCollationEtReste:this.props.compteurNutritionnel !== null && this.props.compteurNutritionnel.data[this.state.shortdayofweekone[this.state.nowdate]].repas['4'].name})
                                    }
                                });
                            });
                        }}
                        style={{
                            flexDirection: "row", alignItems: "center", justifyContent: "space-between", padding: 10,
                            paddingLeft: 15, paddingRight: 15,
                            width: (screenWidth - 40), marginTop: 20,
                            borderWidth: 1, borderColor: colors.white, borderRadius: 5
                        }}
                    >
                        <View style={{ flexDirection: "row" }}>
                            <AutoHeightImage
                                width={26}
                                // source={require('../../../assets/icons/food2.png')}
                                source= {{uri : this.props.compteurNutritionnel !== null ? this.props.compteurNutritionnel.data[this.state.shortdayofweekone[this.state.nowdate]].repas['4'].icon :''}}
                                style={{ alignSelf: "center" ,marginLeft:-5,marginRight:6}} />
                            <View style={{ flexDirection: "column", marginLeft: 5 }}>
                                <Text style={[baseStyles.textColorWhite]}>{ this.props.compteurNutritionnel !== null && this.props.compteurNutritionnel.data[this.state.shortdayofweekone[this.state.nowdate]].repas['4'].name}</Text>
                                {this.state.indexcollationetconsort === 6 ?
                                    <Text
                                        // style={[styles.qtText, { color: "lightgrey", fontSize: 8 }]}>{ this.props.compteurNutritionnel !== null && this.props.compteurNutritionnel.data[this.state.shortdayofweekone[this.state.nowdate]].repas['4'].current.toFixed(3)} / { this.props.compteurNutritionnel !== null && this.props.compteurNutritionnel.data[this.state.shortdayofweekone[this.state.nowdate]].repas['4'].max.toFixed(3)} Kcal</Text>
                                        style={[styles.qtText, { color: !isrestrictget_besoin_kcal ?"lightgrey":colors.textgrisee, fontSize: 8 }]}>{!isrestrictget_besoin_kcal ?( this.props.compteurNutritionnel !== null && Math.trunc(this.props.compteurNutritionnel.data[this.state.shortdayofweekone[this.state.nowdate]].repas['4'].current)):0} / { this.props.compteurNutritionnel !== null && Math.trunc(this.props.compteurNutritionnel.data[this.state.shortdayofweekone[this.state.nowdate]].repas['4'].max)} Kcal</Text>
                                    :
                                    <Text style={[styles.qtText, { color:!isrestrictget_besoin_kcal ? "lightgrey":colors.textgrisee, fontSize: 8 }]}>{ !isrestrictget_besoin_kcal ?(this.props.compteurNutritionnel !== null && Math.trunc(this.props.compteurNutritionnel.data[this.state.newarrayarrenged[this.state.indexcollationetconsort]].repas['4'].current)):0} / { this.props.compteurNutritionnel !== null && Math.trunc(this.props.compteurNutritionnel.data[this.state.newarrayarrenged[this.state.indexcollationetconsort]].repas['4'].max)} Kcal</Text>
                                }
                            </View>
                        </View>
                        <AutoHeightImage
                            width={28}
                            source={require('../../../assets/icons/group.png')}
                            style={{ }} />
                    </TouchableOpacity>
                    {/* <View style={{ margin: 10 }}></View> */}
                    <TouchableOpacity
                        onPress={()=>{
                            search("",this.props,filteredNosSuggestionfiltered,filteredmesRepaspetitsdejeunerfiltered,filteredEatRecentlyfiltered,filteredCollationmatinfiltered,filteredDejeunerfiltered,filteredCollationApresMidifiltered,filteredDinerfiltered,createFilter);
                            this.getdatee();
                            this.setState({refreshing:true});
                            getSelectionnerNosSuggestion(compteurNutritionnelHelper,this.props,5).then((refreshingfalse)=>{
                                this.setState({
                                    refreshing: refreshingfalse
                                })
                            });
                            this.setState({refreshing:true});
                            const setmonassiette = { type: SET_MON_ASSIETTE, value: [] };
                            this.props.dispatch(setmonassiette);
                            global.repas_type_id = this.props.compteurNutritionnel !== null && this.props.compteurNutritionnel.data[this.state.shortdayofweekone[this.state.nowdate]].repas['5'].id;
                            monassiete(compteurNutritionnelHelper,this.props,this.props.compteurNutritionnel !== null && this.props.compteurNutritionnel.data[this.state.shortdayofweekone[this.state.nowdate]].repas['5'].id,this.props.dateforajoutaliment).then((refreshingfalse)=>{ //initialisena mon assiette =  petit dejeuner
                                this.setState({
                                    refreshing: refreshingfalse
                                });
                                this.setState({refreshing:true});
                                getViaPostRepas(compteurNutritionnelHelper,this.props,global.repas_type_id).then(()=>{
                                    this.setState({refreshing:false});

                                    if( this.props.navigation.navigate('PetitdejeunerNew',{venurepas:false,repastypeid_propsnavig:this.props.compteurNutritionnel !== null && this.props.compteurNutritionnel.data[this.state.shortdayofweekone[this.state.nowdate]].repas['5'].id,nom_PetitDejOuCollationEtReste:this.props.compteurNutritionnel !== null && this.props.compteurNutritionnel.data[this.state.shortdayofweekone[this.state.nowdate]].repas['5'].name})){}
                                    else {
                                        this.props.navigation.navigate('PetitdejeunerNews',{venurepas:false,repastypeid_propsnavig:this.props.compteurNutritionnel !== null && this.props.compteurNutritionnel.data[this.state.shortdayofweekone[this.state.nowdate]].repas['5'].id,nom_PetitDejOuCollationEtReste:this.props.compteurNutritionnel !== null && this.props.compteurNutritionnel.data[this.state.shortdayofweekone[this.state.nowdate]].repas['5'].name})
                                    }
                                });
                            });
                        }}
                        style={{
                            flexDirection: "row", alignItems: "center", justifyContent: "space-between", padding: 10,
                            paddingLeft: 15, paddingRight: 15,
                            width: (screenWidth - 40), marginTop: 20,
                            borderWidth: 1, borderColor: colors.white, borderRadius: 5
                        }}
                    >
                        <View style={{ flexDirection: "row" }}>
                            <AutoHeightImage
                                width={27}
                                source= {{uri : this.props.compteurNutritionnel !== null ? this.props.compteurNutritionnel.data[this.state.shortdayofweekone[this.state.nowdate]].repas['5'].icon :''}}
                                style={{ alignSelf: "center",marginLeft:-4,marginRight:6 }} />
                            <View style={{ flexDirection: "column", marginLeft: 5 }}>
                                <Text style={[baseStyles.textColorWhite]}>{ this.props.compteurNutritionnel !== null && this.props.compteurNutritionnel.data[this.state.shortdayofweekone[this.state.nowdate]].repas['5'].name}</Text>
                                {this.state.indexcollationetconsort === 6 ?
                                    <Text style={[styles.qtText, { color:!isrestrictget_besoin_kcal ? "lightgrey":colors.textgrisee, fontSize: 8 }]}>{ !isrestrictget_besoin_kcal ?(this.props.compteurNutritionnel !== null && Math.trunc(this.props.compteurNutritionnel.data[this.state.shortdayofweekone[this.state.nowdate]].repas['5'].current)):0} / { this.props.compteurNutritionnel !== null && Math.trunc(this.props.compteurNutritionnel.data[this.state.shortdayofweekone[this.state.nowdate]].repas['5'].max)} Kcal</Text>
                                    :
                                    <Text
                                        // style={[styles.qtText, { color: "lightgrey", fontSize: 8 }]}>{ this.props.compteurNutritionnel !== null && this.props.compteurNutritionnel.data[this.state.newarrayarrenged[this.state.indexcollationetconsort]].repas['5'].current.toFixed(3)} / { this.props.compteurNutritionnel !== null && this.props.compteurNutritionnel.data[this.state.newarrayarrenged[this.state.indexcollationetconsort]].repas['5'].max.toFixed(3)} Kcal</Text>
                                        style={[styles.qtText, { color: !isrestrictget_besoin_kcal ?"lightgrey":colors.textgrisee, fontSize: 8 }]}>{!isrestrictget_besoin_kcal ? (this.props.compteurNutritionnel !== null && Math.trunc(this.props.compteurNutritionnel.data[this.state.newarrayarrenged[this.state.indexcollationetconsort]].repas['5'].current)):0} / { this.props.compteurNutritionnel !== null && Math.trunc(this.props.compteurNutritionnel.data[this.state.newarrayarrenged[this.state.indexcollationetconsort]].repas['5'].max)} Kcal</Text>
                                }
                            </View>
                        </View>
                        <AutoHeightImage
                            width={30}
                            source={require('../../../assets/icons/group.png')}
                            style={{}} />
                    </TouchableOpacity>
                </ScrollView>
            </LinearGradient>
        )
    }
}

// export default AddTension;
const mapStateToProps = (state) => {
    const { selectedZone,popToTop,userToken,compteurNutritionnel,droits,dateforajoutaliment } = state.statedata
    return { selectedZone,popToTop,userToken,compteurNutritionnel,droits,dateforajoutaliment }
};

export default connect(mapStateToProps)(CompteurNutritionnel);
