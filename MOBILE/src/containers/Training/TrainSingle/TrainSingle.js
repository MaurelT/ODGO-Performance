import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    Dimensions,
    StatusBar,
    ScrollView,
    View,
    TouchableOpacity,
    Text, RefreshControl,
   // Slider
} from 'react-native';
import colors from '../../../configs/colors';
import baseStyles from '../../../base/BaseStyles';
import LinearGradient from 'react-native-linear-gradient';
import styles from './styles';
import AutoHeightImage from 'react-native-auto-height-image';
// import Slider from 'react-native-slider';
//import Slider from '@react-native-community/slider';
import AsyncStorage from "@react-native-community/async-storage";
import OneTrainHelper from "../../../apis/helpers/one_train_helper";
import moment from "moment";
import {SET_ACTIVE_TAB, SET_POP_TO_TOP} from '../../../redux/types/tabTypes';
import {CustomSlider} from "../NewTraining/CustomSlider";
import statusBarHeight from '../../../configs/screen';
import {Slider} from 'react-native-elements';




const screen = Dimensions.get("window");
const SBHelight = statusBarHeight;
const screenWidth = screen.width
const screenHeight = screen.height - SBHelight

class TrainSingle extends Component {
    constructor(props) {
        super(props)
        this.state = {
            trainToShoow: props.trainToShoow,
            sliderValueIntensite: 3.45,
            sliderValueDifficulte: 3,
            sliderValueQualite: 4,
            sliderValueImplication: 2,
            intensiteValueTextWidth: 0,
            difficulteValueTextWidth: 0,
            qualiteValueTextWidth: 0,
            implicationValueTextWidth: 0,
            onetrainStories:null,
            popToTop:this.props.popToTop,
            refreshing:true,
            idtrainstorietoget:this.props.paramtrain.itemId,


        };
    }


    async componentDidMount() {
        // itemId
        const userToken = await AsyncStorage.getItem("userToken")
        this.setState({ userToken });
        this.getOneTrains(this.state.idtrainstorietoget);
        //this.props.navigation.state.params.trainStoriesobj
    }

    getOneTrains = async (idtrain) => {
        this.setState({refreshing: true})
        const onetrainStories = await OneTrainHelper.getOneTrains(this.state.userToken,idtrain);
        if(onetrainStories){
            this.setState({refreshing: false})
            this.setState({onetrainStories: onetrainStories,
                sliderValueIntensite:onetrainStories.data.intensite,
                sliderValueDifficulte:onetrainStories.data.difficulte,
                sliderValueQualite:onetrainStories.data.qualite,
                sliderValueImplication:onetrainStories.data.implication,
            })
        }
    }

    _localday(){
        if(this.state.onetrainStories !== null){
       switch (moment(this.state.onetrainStories.data.date).days()) {
           case 0:
               return 'Dimanche';
               break;
           case 1:
               return 'Lundi';
               break;
           case 2:
               return 'Mardi';
               break;
           case 3:
               return 'Mercredi';
               break;
           case 4:
               return 'Jeudi';
               break;
           case 5:
               return 'Vendredi';
               break;
           case 6:
               return 'Samedi';
               break;
           default:
               return null;
            }
        }else {
            return '';
        }
    }

    _localmonth(){
        if(this.state.onetrainStories !== null){
            switch (moment(this.state.onetrainStories.data.date).month()) {
                case 0:
                    return 'Janvier';
                    break;
                case 1:
                    return 'Février';
                    break;
                case 2:
                    return 'Mars';
                    break;
                case 3:
                    return 'Avril';
                    break;
                case 4:
                    return 'Mai';
                    break;
                case 5:
                    return 'Juin';
                    break;
                case 6:
                    return 'Juillet';
                    break;
                case 7:
                    return 'Août';
                    break;
                case 8:
                    return 'Septembre';
                    break;
                case 9:
                    return 'Octobre';
                    break;
                case 10:
                    return 'Novembre';
                    break;
                case 11:
                    return 'Décembre';
                    break;

                default:
                    return null;
            }
        }else {
            return '';
        }
    }

    render() {

        let isrestrictget_depense_energetique = false;
        if(this.props.droits.length>0){
            for(let i = 0; i < this.props.droits.length; i++){
                if(this.props.droits[i].name === "get_depense_energetique"){
                    isrestrictget_depense_energetique = this.props.droits[i].is_restrict;
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
            <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }} colors={[colors.balck, colors.green, colors.balck]} style={baseStyles.linearGradient}>

                <ScrollView
                    contentInsetAdjustmentBehavior="automatic"
                    style={styles.scrollView}
                    contentContainerStyle={[styles.contentContainerStyle]}
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
                            tintColor={colors.green}
                            colors={[colors.green]}
                        />
                    }
                >



                    <View style={{ alignItems :"center",justifyContent:"center",width:"100%",marginTop:15,marginBottom:15  }}>
                        <TouchableOpacity
                            onPress={() => {
                                if(this.props.navigation.goBack()){}
                                else{

                                    const setActiveTab = { type: SET_ACTIVE_TAB, value: "history" }
                                    this.props.dispatch(setActiveTab);
                                }
                            }}
                            style={{width:50,position:"absolute",left:0}}
                        >
                            <AutoHeightImage
                                width={18}
                                source={require('../../../assets/icons/arrow-white.png')}
                                style={{
                                    transform: [
                                        { rotateY: "180deg" }
                                    ],
                                    marginLeft:15
                                }}
                            />
                        </TouchableOpacity>
                        <Text style={[baseStyles.titleText,{textAlign:"center"}]}>
                            {this.state.onetrainStories !== null && this.state.onetrainStories.data.entrainement_type.name}
                        </Text>
                    </View>

                    <View style={[{ alignItems: "center", justifyContent: "center", flexDirection: "row",marginBottom:15,marginTop:10 }]}>

                        {this.state.idtrainstorietoget !== this.props.paramtrain.trainStoriesobj[this.props.paramtrain.trainStoriesobj.length-1].id ?
                            <TouchableOpacity
                                onPress={() => {
                                    let index_ = this.props.paramtrain.trainStoriesobj.findIndex(x => x.id ===this.state.idtrainstorietoget);
                                    let index = index_+1;
                                    this.setState({idtrainstorietoget:this.props.paramtrain.trainStoriesobj[index].id},()=>{
                                        this.getOneTrains(this.state.idtrainstorietoget);
                                    });
                                }}
                            >
                                <AutoHeightImage
                                    width={18}
                                    source={require("../../../assets/icons/arrow-white.png")}
                                    style={{
                                        transform: [
                                            {rotateY: "180deg"}
                                        ]
                                    }}/>
                            </TouchableOpacity>
                            :
                            <View/>
                        }
                        <Text style={{ fontSize: 15, marginHorizontal:20,color:'white' }}>
                            { this._localday() + ' '}
                            {this.state.onetrainStories !== null && moment(this.state.onetrainStories.data.date).format('DD ')}
                            { this._localmonth() + ' '}
                            {this.state.onetrainStories !== null && moment(this.state.onetrainStories.data.date).format('YYYY ')}
                        </Text>
                        {this.state.idtrainstorietoget !== this.props.paramtrain.trainStoriesobj[0].id ?
                            <TouchableOpacity
                                onPress={() => {
                                    let index_ = this.props.paramtrain.trainStoriesobj.findIndex(x => x.id ===this.state.idtrainstorietoget);
                                    let index = index_-1;
                                    this.setState({idtrainstorietoget:this.props.paramtrain.trainStoriesobj[index].id},()=>{
                                        this.getOneTrains(this.state.idtrainstorietoget);
                                    });
                                }}
                            >
                                <AutoHeightImage
                                    width={18}
                                    source={require("../../../assets/icons/arrow-white.png")}
                                    style={{

                                    }}/>
                            </TouchableOpacity>
                            :
                            <View/>
                        }
                    </View>

                    <View
                        style={{
                            flexDirection: "row", alignItems: "center", justifyContent: "center", padding: 10,
                            paddingLeft: 15, paddingRight: 15,
                            width: (screenWidth - 80), marginTop: 20,
                            borderWidth: 1, borderColor: colors.white, borderRadius: 5
                        }}
                    >
                        <Text style={[baseStyles.textColorWhite]}>
                            {/*Spécifique*/}
                            {this.state.onetrainStories !== null && this.state.onetrainStories.data.entrainement_type.name}
                        </Text>
                    </View>

                    <View style={{
                        width: screenWidth, flexDirection: "row", alignItems: "center",
                        justifyContent: "space-around", paddingLeft: 15, paddingRight: 15, marginTop: 20,
                        marginBottom: 20
                    }}>
                        <TouchableOpacity
                            style={{ flexDirection: "row", marginRight: 20 }}
                        >
                            <AutoHeightImage
                                width={20}
                                source={require("../../../assets/icons/clock.png")}
                                style={{ marginRight: 10, alignSelf: "center" }} />
                            <View style={{ alignItems: "center", justifyContent: "center" }}>
                                <Text style={[baseStyles.textColorWhite, {}]}>
                                    Durée
                                </Text>
                                <Text style={[baseStyles.textColorWhite, { fontSize: 22, fontWeight: "bold" }]}>
                                    {this.state.onetrainStories !== null && this.state.onetrainStories.data.duree_heure + 'h'+(this.state.onetrainStories.data.duree_minute.toString().length==1 ? this.state.onetrainStories.data.duree_minute.toString().padStart(2,'0'):this.state.onetrainStories.data.duree_minute)}
                                </Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{ flexDirection: "row" }}
                        >
                            <AutoHeightImage
                                width={20}
                                source={require("../../../assets/icons/power.png")}
                                style={{ marginRight: 10, alignSelf: "center",tintColor:!isrestrictget_depense_energetique ?"white":colors.textgrisee }} />
                            <View style={{ alignItems: "center", justifyContent: "center" }}>
                                <Text style={{color:!isrestrictget_depense_energetique ? "white":colors.textgrisee}}>
                                    Dépenses caloriques
                                </Text>
                                <Text style={[baseStyles.textColorWhite, { fontSize: 22, fontWeight: "bold",color:!isrestrictget_depense_energetique ?"white":colors.textgrisee }]}>
                                    {!isrestrictget_depense_energetique ?(this.state.onetrainStories !== null && this.state.onetrainStories.data.kcal):0}
                                    <Text style={[baseStyles.textColorWhite, { fontSize: 22, fontWeight: "bold",color:!isrestrictget_depense_energetique ?"white":colors.textgrisee }]}> kcal</Text>
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </View>

                    <View style={[styles.sliderCtn]}>
                        <View style={[styles.sliderTensionLabel]}>
                            <Text style={[baseStyles.textColorWhite]}>Intensité</Text>
                        </View>
                        <View style={styles.sliderView}>
                            <View style={[styles.markerCtn]}>
                                <View style={[styles.sliderOptionMark, (this.state.sliderValueIntensite >= 0 ? styles.sliderOptionMarkValued : {})]}></View>
                                <View style={[styles.sliderOptionMark, (this.state.sliderValueIntensite >= 1 ? styles.sliderOptionMarkValued : {})]}></View>
                                <View style={[styles.sliderOptionMark, (this.state.sliderValueIntensite >= 2 ? styles.sliderOptionMarkValued : {})]}></View>
                                <View style={[styles.sliderOptionMark, (this.state.sliderValueIntensite >= 3 ? styles.sliderOptionMarkValued : {})]}></View>
                                <View style={[styles.sliderOptionMark, (this.state.sliderValueIntensite >= 4 ? styles.sliderOptionMarkValued : {})]}></View>
                                <View style={[styles.sliderOptionMark, (this.state.sliderValueIntensite >= 5 ? styles.sliderOptionMarkValued : {})]}></View>
                            </View>
                            <View style={[styles.markerCtn, { bottom: 5, alignItems: "flex-end" }]}>
                                <Text style={[baseStyles.textColorWhite, { fontSize: 10 }]}>0</Text>
                                <Text style={[baseStyles.textColorWhite, { fontSize: 10 }]}>2</Text>
                                <Text style={[baseStyles.textColorWhite, { fontSize: 10 }]}>4</Text>
                                <Text style={[baseStyles.textColorWhite, { fontSize: 10 }]}>6</Text>
                                <Text style={[baseStyles.textColorWhite, { fontSize: 10 }]}>8</Text>
                                <Text style={[baseStyles.textColorWhite, { fontSize: 10, marginRight: -5 }]}>10</Text>
                            </View>
                            <Slider
                                disabled={true}
                                style={{ width: "100%", height: 40 }}
                                minimumValue={0}
                                maximumValue={5}
                                minimumTrackTintColor={colors.red}
                                maximumTrackTintColor={"#A5A5A5"}
                                thumbTintColor={colors.red}
                                value={this.state.onetrainStories !== null && this.state.sliderValueIntensite}
                            // onValueChange={(value) => {
                            //     this.setState({ sliderValueIntensite: value })
                            // }}
                            />

                            {/*<CustomSlider*/}
                            {/*    min={0}*/}
                            {/*    max={5}*/}
                            {/*    valueOffstetNumber={()=>{return this.state.valuesNumberIntensite}}*/}
                            {/*    LRpadding={40}*/}
                            {/*    callback={(values = this.state.valuesNumberIntensite)=>{*/}
                            {/*        this.singleSliderValueCallbackDifficulte(values)*/}
                            {/*    }}*/}
                            {/*    single={true}*/}
                            {/*/>*/}

                            {/* <Text
                                onLayout={(event) => {
                                    var { x, y, width, height } = event.nativeEvent.layout
                                    this.setState({ intensiteValueTextWidth: width })
                                }}
                                style={{
                                    color: colors.white,
                                    left: ((this.state.sliderValueIntensite * (screenWidth - 30)) / 5),
                                    position: "absolute", bottom: 0, transform: [{ translateX: -(this.state.intensiteValueTextWidth / 2) }]
                                }}>
                                {this.state.sliderValueIntensite < 2 ? "Faible" : ""}
                                {this.state.sliderValueIntensite >= 2 && this.state.sliderValueIntensite <= 3 ? "Moyenne" : ""}
                                {this.state.sliderValueIntensite > 3 && this.state.sliderValueIntensite < 4 ? "Forte" : ""}
                                {this.state.sliderValueIntensite >= 4 ? "Bonne" : ""}
                            </Text> */}
                        </View>
                    </View>
                    <View style={[styles.sliderCtn]}>
                        <View style={[styles.sliderTensionLabel]}>
                            <Text style={[baseStyles.textColorWhite]}>Difficulté</Text>
                        </View>
                        <View style={styles.sliderView}>
                            <View style={[styles.markerCtn]}>
                                <View style={[styles.sliderOptionMark, (this.state.sliderValueDifficulte >= 0 ? styles.sliderOptionMarkValued : {})]}></View>
                                <View style={[styles.sliderOptionMark, (this.state.sliderValueDifficulte >= 1 ? styles.sliderOptionMarkValued : {})]}></View>
                                <View style={[styles.sliderOptionMark, (this.state.sliderValueDifficulte >= 2 ? styles.sliderOptionMarkValued : {})]}></View>
                                <View style={[styles.sliderOptionMark, (this.state.sliderValueDifficulte >= 3 ? styles.sliderOptionMarkValued : {})]}></View>
                                <View style={[styles.sliderOptionMark, (this.state.sliderValueDifficulte >= 4 ? styles.sliderOptionMarkValued : {})]}></View>
                                <View style={[styles.sliderOptionMark, (this.state.sliderValueDifficulte >= 5 ? styles.sliderOptionMarkValued : {})]}></View>
                            </View>
                            <View style={[styles.markerCtn, { bottom: 5, alignItems: "flex-end" }]}>
                                <Text style={[baseStyles.textColorWhite, { fontSize: 10 }]}>0</Text>
                                <Text style={[baseStyles.textColorWhite, { fontSize: 10 }]}>2</Text>
                                <Text style={[baseStyles.textColorWhite, { fontSize: 10 }]}>4</Text>
                                <Text style={[baseStyles.textColorWhite, { fontSize: 10 }]}>6</Text>
                                <Text style={[baseStyles.textColorWhite, { fontSize: 10 }]}>8</Text>
                                <Text style={[baseStyles.textColorWhite, { fontSize: 10, marginRight: -5 }]}>10</Text>
                            </View>
                            <Slider
                                disabled={true}
                                style={{ width: "100%", height: 40 }}
                                minimumValue={0}
                                maximumValue={5}
                                minimumTrackTintColor={colors.red}
                                maximumTrackTintColor={"#A5A5A5"}
                                thumbTintColor={colors.red}
                                value={this.state.onetrainStories !== null && this.state.sliderValueDifficulte}
                            // onValueChange={(value) => {
                            //     this.setState({ sliderValueDifficulte: value })
                            // }}
                            />
                            {/* <Text
                                onLayout={(event) => {
                                    var { x, y, width, height } = event.nativeEvent.layout
                                    this.setState({ difficulteValueTextWidth: width })
                                }}
                                style={{
                                    color: colors.white,
                                    left: ((this.state.sliderValueDifficulte * (screenWidth - 30)) / 5),
                                    position: "absolute", bottom: 0, transform: [{ translateX: -(this.state.difficulteValueTextWidth / 2) }]
                                }}>
                                {this.state.sliderValueDifficulte < 2 ? "Faible" : ""}
                                {this.state.sliderValueDifficulte >= 2 && this.state.sliderValueDifficulte <= 3 ? "Moyenne" : ""}
                                {this.state.sliderValueDifficulte > 3 && this.state.sliderValueDifficulte < 4 ? "Forte" : ""}
                                {this.state.sliderValueDifficulte >= 4 ? "Bonne" : ""}
                            </Text> */}
                        </View>
                    </View>
                    <View style={[styles.sliderCtn]}>
                        <View style={[styles.sliderTensionLabel]}>
                            <Text style={[baseStyles.textColorWhite]}>Qualité</Text>
                        </View>
                        <View style={styles.sliderView}>
                            <View style={[styles.markerCtn]}>
                                <View style={[styles.sliderOptionMark, (this.state.sliderValueQualite >= 0 ? styles.sliderOptionMarkValued : {})]}></View>
                                <View style={[styles.sliderOptionMark, (this.state.sliderValueQualite >= 1 ? styles.sliderOptionMarkValued : {})]}></View>
                                <View style={[styles.sliderOptionMark, (this.state.sliderValueQualite >= 2 ? styles.sliderOptionMarkValued : {})]}></View>
                                <View style={[styles.sliderOptionMark, (this.state.sliderValueQualite >= 3 ? styles.sliderOptionMarkValued : {})]}></View>
                                <View style={[styles.sliderOptionMark, (this.state.sliderValueQualite >= 4 ? styles.sliderOptionMarkValued : {})]}></View>
                                <View style={[styles.sliderOptionMark, (this.state.sliderValueQualite >= 5 ? styles.sliderOptionMarkValued : {})]}></View>
                            </View>
                            <View style={[styles.markerCtn, { bottom: 5, alignItems: "flex-end" }]}>
                                <Text style={[baseStyles.textColorWhite, { fontSize: 10 }]}>0</Text>
                                <Text style={[baseStyles.textColorWhite, { fontSize: 10 }]}>2</Text>
                                <Text style={[baseStyles.textColorWhite, { fontSize: 10 }]}>4</Text>
                                <Text style={[baseStyles.textColorWhite, { fontSize: 10 }]}>6</Text>
                                <Text style={[baseStyles.textColorWhite, { fontSize: 10 }]}>8</Text>
                                <Text style={[baseStyles.textColorWhite, { fontSize: 10, marginRight: -5 }]}>10</Text>
                            </View>
                            <Slider
                                disabled={true}
                                style={{ width: "100%", height: 40 }}
                                minimumValue={0}
                                maximumValue={5}
                                minimumTrackTintColor={colors.red}
                                maximumTrackTintColor={"#A5A5A5"}
                                thumbTintColor={colors.red}
                                value={this.state.onetrainStories !== null && this.state.sliderValueQualite}
                            // onValueChange={(value) => {
                            //     this.setState({ sliderValueQualite: value })
                            // }}
                            />
                            {/* <Text
                                onLayout={(event) => {
                                    var { x, y, width, height } = event.nativeEvent.layout
                                    this.setState({ qualiteValueTextWidth: width })
                                }}
                                style={{
                                    color: colors.white,
                                    left: ((this.state.sliderValueQualite * (screenWidth - 30)) / 5),
                                    position: "absolute", bottom: 0, transform: [{ translateX: -(this.state.qualiteValueTextWidth / 2) }]
                                }}>
                                {this.state.sliderValueQualite < 2 ? "Faible" : ""}
                                {this.state.sliderValueQualite >= 2 && this.state.sliderValueQualite <= 3 ? "Moyenne" : ""}
                                {this.state.sliderValueQualite > 3 && this.state.sliderValueQualite < 4 ? "Forte" : ""}
                                {this.state.sliderValueQualite >= 4 ? "Bonne" : ""}
                            </Text> */}
                        </View>
                    </View>
                    <View style={[styles.sliderCtn]}>
                        <View style={[styles.sliderTensionLabel]}>
                            <Text style={[baseStyles.textColorWhite]}>Implication</Text>
                        </View>
                        <View style={styles.sliderView}>
                            <View style={[styles.markerCtn]}>
                                <View style={[styles.sliderOptionMark, (this.state.sliderValueImplication >= 0 ? styles.sliderOptionMarkValued : {})]}></View>
                                <View style={[styles.sliderOptionMark, (this.state.sliderValueImplication >= 1 ? styles.sliderOptionMarkValued : {})]}></View>
                                <View style={[styles.sliderOptionMark, (this.state.sliderValueImplication >= 2 ? styles.sliderOptionMarkValued : {})]}></View>
                                <View style={[styles.sliderOptionMark, (this.state.sliderValueImplication >= 3 ? styles.sliderOptionMarkValued : {})]}></View>
                                <View style={[styles.sliderOptionMark, (this.state.sliderValueImplication >= 4 ? styles.sliderOptionMarkValued : {})]}></View>
                                <View style={[styles.sliderOptionMark, (this.state.sliderValueImplication >= 5 ? styles.sliderOptionMarkValued : {})]}></View>
                            </View>
                            <View style={[styles.markerCtn, { bottom: 5, alignItems: "flex-end" }]}>
                                <Text style={[baseStyles.textColorWhite, { fontSize: 10 }]}>0</Text>
                                <Text style={[baseStyles.textColorWhite, { fontSize: 10 }]}>2</Text>
                                <Text style={[baseStyles.textColorWhite, { fontSize: 10 }]}>4</Text>
                                <Text style={[baseStyles.textColorWhite, { fontSize: 10 }]}>6</Text>
                                <Text style={[baseStyles.textColorWhite, { fontSize: 10 }]}>8</Text>
                                <Text style={[baseStyles.textColorWhite, { fontSize: 10, marginRight: -5 }]}>10</Text>
                            </View>
                            <Slider
                                disabled={true}
                                style={{ width: "100%", height: 40 }}
                                minimumValue={0}
                                maximumValue={5}
                                minimumTrackTintColor={colors.red}
                                maximumTrackTintColor={"#A5A5A5"}
                                thumbTintColor={colors.red}
                                value={this.state.onetrainStories !== null && this.state.sliderValueImplication}
                            // onValueChange={(value) => {
                            //     this.setState({ sliderValueImplication: value })
                            // }}
                            />
                            {/* <Text
                                onLayout={(event) => {
                                    var { x, y, width, height } = event.nativeEvent.layout
                                    this.setState({ implicationValueTextWidth: width })
                                }}
                                style={{
                                    color: colors.white,
                                    left: ((this.state.sliderValueImplication * (screenWidth - 30)) / 5),
                                    position: "absolute", bottom: 0, transform: [{ translateX: -(this.state.implicationValueTextWidth / 2) }]
                                }}>
                                {this.state.sliderValueImplication < 2 ? "Faible" : ""}
                                {this.state.sliderValueImplication >= 2 && this.state.sliderValueImplication <= 3 ? "Moyenne" : ""}
                                {this.state.sliderValueImplication > 3 && this.state.sliderValueImplication < 4 ? "Forte" : ""}
                                {this.state.sliderValueImplication >= 4 ? "Bonne" : ""}
                            </Text> */}
                        </View>
                    </View>
                    <View style={{alignSelf:'flex-start',flexDirection:'row',alignItems:'center',marginLeft:20,marginTop:20,}}>
                    <AutoHeightImage
                        width={20}
                        source={require("../../../assets/icons/comment.png")}
                        style={{ marginRight: 10 }} />
                    <Text style={{color:'white',fontSize:15}}>Commentaire</Text>
                    </View>
                    {this.state.onetrainStories !== null && console.warn(this.state.onetrainStories.data.commentaire)}
                    <Text style={{color:'#c1bdbd',fontSize:14,alignSelf:'flex-start',marginHorizontal:20,marginTop:10}}>
                        {this.state.onetrainStories !== null && this.state.onetrainStories.data.commentaire}
                    </Text>
                    </ScrollView>

            </LinearGradient>
        )
    }
}

// export default TrainSingle;
const mapStateToProps = (state) => {
    const { trainToShoow,popToTop,droits,paramtrain } = state.statedata
    return { trainToShoow,popToTop,droits,paramtrain }
};

export default connect(mapStateToProps)(TrainSingle);
