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
    Alert, Platform,
    // Slider
} from 'react-native';
import { connect } from 'react-redux';
import baseStyles from '../../../base/BaseStyles';
import styles from '../AddBlessure/styles';
import colors from '../../../configs/colors';
import LinearGradient from 'react-native-linear-gradient';
import ZonePicker from '../../../components/ZonePicker/ZonePicker';
import MAAButton from '../../../components/MAAButton/MAAButton';
import AutoHeightImage from 'react-native-auto-height-image';
import {
    SET_ACTIVE_FP,
    SET_ACTIVE_MENUPATHO,
    SET_ACTIVE_TAB,
    SET_POP_TO_TOP,
    SET_ZONE,
} from '../../../redux/types/tabTypes';
import SqueletteDevantBlanc from '../AddBlessure/SqueletteDevantBlanc';
import SqueletteDevantBlancNotTouchable from '../AddBlessure/SqueletteDevantBlancNotTouchable';
import SqueletteDerriereBlanc from '../AddBlessure/SqueletteDerriereBlanc';
import SqueletteDerriereBlancNotTouchable from '../AddBlessure/SqueletteDerriereBlancNotTouchable';
import Swiper from "react-native-swiper";
import {CustomSlider} from '../../Training/NewTraining/CustomSlider';
import tensionHelper from '../../../apis/helpers/tension_helper';
import moment from 'moment';
import {getDashboar, getTensionPathologie} from '../../../apis/FonctionRedondant';
import pathologieHelper from '../../../apis/helpers/pathologie_helper';
// import Slider from 'react-native-slider';
//import Slider from '@react-native-community/slider';
import statusBarHeight from '../../../configs/screen';
import {Slider} from 'react-native-elements';
import dashboardHelper from '../../../apis/helpers/dashboard_helper';

const screen = Dimensions.get("window");
const SBHelight = statusBarHeight;
const screenWidth = screen.width
const screenHeight = screen.height - SBHelight;




// const renderPagination = (index, total, context) => {
//     return (
//         <View style={{  position: 'absolute',
//             bottom: 10,
//             right: 10}}>
//             <Text style={{ color: 'grey' }}>
//                 <Text style={{ color: 'white',
//                     fontSize: 20}}>{index + 1}</Text>/{total}
//             </Text>
//         </View>
//     )
// }


const renderPagination = (index, total, context) => {
    return (
      <View style={{
          position: 'absolute',
            top: 0,
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

class AddTension extends Component {
    constructor(props) {
        super(props)
        this.scrollview = React.createRef();
        this.scrollview1 = React.createRef();
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
            refreshing:false,
            valuesNumberIntensite:[0],
            nomzoneonetension:null,
            idzoneviaprops:0,

        }
    }

    _selectedId = (id,nom,state) =>{ //sert à rien puisque c'est tension
        console.warn('ato');
        this.scrollview.scrollTo({y:screenHeight});
        this.scrollview1.scrollTo({y:screenHeight});

        const setSelectedZone = { type: SET_ZONE, value: {id:id,text:nom,state:state} };
        this.props.dispatch(setSelectedZone)
    };

    componentDidMount() {
        const setActiveFPAction = { type: SET_ACTIVE_FP, value: null }
        this.props.dispatch(setActiveFPAction)
        if(this.props.notshowvalider === true){
            if(this.props.pathologieonetension !== null){
                this.setState({valuesNumberIntensite:[this.props.pathologieonetension.intensite]});//redux
                this.setState({nomzoneonetension:this.props.pathologieonetension.zone.name});//redux
            }
            //  this._selectedId = (pathologietension.data.zone_id,pathologietension.data.zone.name,true)
        }
        this.setState({idzoneviaprops:this.props.idzone})
        console.warn('iidzone',this.props.idzone)
    }

    entete(){
        return(
            <View style={{marginLeft:-screenWidth*0.035}}>

                <View style={{ alignItems :"center",justifyContent:"center",width:screenWidth,marginVertical:15  }}>
                    <TouchableOpacity
                        onPress={() => {
                            if(this.props.navigation.goBack()){

                            }else{
                                const setActiveTab = {
                                    type: SET_ACTIVE_TAB,value: "Pathologie"
                                };
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
                    <TouchableOpacity
                        onPress={() => {
                            const setSelectedZone = { type: SET_ZONE, value: {id:0,text:"Ajouter une tension",state:true}}
                            this.props.dispatch(setSelectedZone)
                        }}
                        style={{alignItems:'center'}}
                    >
                    <Text style={[baseStyles.titleText,{textAlign:"center"}]}>
                        {this.props.notshowvalider ===true ? this.state.nomzoneonetension : (this.props.selectedZone.id == 0 ? "Ajouter une tension" : this.props.selectedZone.state === true ? "Ajouter une tension" : this.props.selectedZone.text )}
                    </Text>
                    </TouchableOpacity>
                </View>
                {(this.props.selectedZone.id === 0 && this.props.notshowvalider ===false)   ?
                    <View style={[styles.noSelectedBtn]}
                >
                    <View style={[styles.noSelectedCtn,{marginBottom:10,alignSelf:'center'}]}>
                        <Text style={[baseStyles.textColorWhite, { textAlign: "center" }]}>Sélectionner une zone et une intensité de tension</Text>
                        <Text style={[baseStyles.textColorWhite]}></Text>
                    </View>
                </View>
                    :
                    this.props.selectedZone.state === true &&
                    <View style={[styles.noSelectedBtn]}
                    >
                        <View style={[styles.noSelectedCtn,{marginBottom:10,alignSelf:'center'}]}>
                            <Text style={[baseStyles.textColorWhite, { textAlign: "center" }]}>Sélectionner une zone et une intensité de tension</Text>
                            <Text style={[baseStyles.textColorWhite]}></Text>
                        </View>
                    </View>
                }
            </View>
        )
    }






    postTension = async () => {

        if(  this.props.selectedZone.id ==0){
            this.setState({refreshing: false});
            Alert.alert(
                'Odgo',
                "Veuillez sélectionner une zone de tension s'il vous plait",
                [
                    {
                        text: "Ok",
                        onPress: async () => { }
                    }
                ]
            )
        }else{
            if(this.props.selectedZone.state === true){
                Alert.alert(
                    'Odgo',
                    "Veuillez sélectionner une zone de tension s'il vous plait",
                    [
                        {
                            text: "Ok",
                            onPress: async () => { }
                        }
                    ]
                )
            }else{
                this.setState({refreshing: true});
                const tensionsave = await tensionHelper.tensionsave(this.props.userToken,
                    this.props.selectedZone.id,
                    parseInt(this.state.valuesNumberIntensite[0])
                );
                // slide 42:{
                // 	"zone_id": 1,
                // 	"intensite": 4
                // }
                if (tensionsave) {
                    //alert
                    //   this.props.navigation.navigate('Pathologie',{depuisTensionOrBlessure:1})
                    this.setState({refreshing:true});
                    getTensionPathologie(tensionHelper,this.props,moment(new Date()).format("YYYY")).then((refreshingfalse)=>{
                        const setActiveMenupatho = { type: SET_ACTIVE_MENUPATHO, value: 2 };
                        this.props.dispatch(setActiveMenupatho);
                        if(global.is_venudedonneperso === true){
                            const setActiveTab = {
                                type: SET_ACTIVE_TAB,value: "Pathologie"
                            };
                            this.props.dispatch(setActiveTab);
                        }else{
                            this.props.navigation.goBack()
                        }
                        this.setState({refreshing:false})
                        setTimeout(()=>{
                            Alert.alert(
                                'Odgo',
                                'Tension ajoutée avec succès !',
                                [{
                                    text:'Ok',onPress:()=>{

                                    }
                                }]
                            )
                        },600);
                    });
                }
            }
        }
    };

    singleSliderValueCallbackIntensite =(values)=> {
        this.setState({valuesNumberIntensite:values})
    }

    render() {
        //console.warn('dddd',parseInt(this.state.valuesNumberIntensite[0].toFixed(0)),this.state.valuesNumberIntensite)
        if(this.props.popToTop === 'sante'){
            this.props.navigation.popToTop();
            const setPopToTop = { type: SET_POP_TO_TOP, value: '' }
            this.props.dispatch(setPopToTop);
        }
        return (

            <View style={{flex:1}}>

            {
                (this.props.idzone>=1 && this.props.idzone<17) &&
                <Swiper
                    //renderPagination={renderPagination}
                    loop={false}
                    showsButtons={false}


                >
                    <ScrollView
                        refreshControl={
                            <RefreshControl
                                refreshing={this.state.refreshing}
                                onRefresh={() => {
                                    this.setState({ refreshing: true });
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

                        <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }} colors={[colors.balck, colors.green, colors.balck]} style={[baseStyles.linearGradient,{paddingBottom:60,paddingLeft:screenWidth*0.02}]}>
                            {this.entete()}
                                <SqueletteDevantBlancNotTouchable _selectedId={this._selectedId} userToken={this.props.userToken} idoneTension={this.props.itemid} />
                            <View style={[styles.sliderCtn,{marginTop:-screenWidth*0.07}]}>
                                <View style={[styles.sliderTensionLabel]}>
                                    <Text style={[baseStyles.textColorWhite]}>Tension</Text>
                                </View>
                                <View style={styles.sliderView}>
                                    <View style={[styles.markerCtn,{top:-0}]}>
                                        <View style={[styles.sliderOptionMark, (this.state.valuesNumberIntensite[0] >= 0 ? styles.sliderOptionMarkValued : {})]}></View>
                                        <View style={[styles.sliderOptionMark, (this.state.valuesNumberIntensite[0] >= 1 ? styles.sliderOptionMarkValued : {})]}></View>
                                        <View style={[styles.sliderOptionMark, (this.state.valuesNumberIntensite[0] >= 2 ? styles.sliderOptionMarkValued : {})]}></View>
                                        <View style={[styles.sliderOptionMark, (this.state.valuesNumberIntensite[0] >= 3 ? styles.sliderOptionMarkValued : {})]}></View>
                                        <View style={[styles.sliderOptionMark, (this.state.valuesNumberIntensite[0] >= 4 ? styles.sliderOptionMarkValued : {})]}></View>
                                        <View style={[styles.sliderOptionMark, (this.state.valuesNumberIntensite[0] >= 5 ? styles.sliderOptionMarkValued : {})]}></View>
                                    </View>
                                    <View style={[styles.markerCtn, { top: 13, alignItems: "flex-end" }]}>
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
                                        value={this.state.valuesNumberIntensite[0]}
                                    />
                                </View>
                            </View>

                        </LinearGradient>
                    </ScrollView>
                </Swiper>
            }
                {
                    (this.props.idzone>=17 && this.props.idzone<=32) &&
                    <Swiper
                       // renderPagination={renderPagination}
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
                            <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }} colors={[colors.balck, colors.green, colors.balck]} style={[baseStyles.linearGradient,{paddingBottom:60,paddingLeft:screenWidth*0.04}]}>
                                {this.entete()}
                                <SqueletteDerriereBlancNotTouchable _selectedId={this._selectedId} userToken={this.props.userToken} idoneTension={this.props.itemid}  />

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

                                <View style={[styles.sliderCtn,{marginTop:-screenWidth*0.07}]}>
                                    <View style={[styles.sliderTensionLabel]}>
                                        <Text style={[baseStyles.textColorWhite]}>Tension</Text>
                                    </View>
                                    <View style={styles.sliderView}>
                                        <View style={[styles.markerCtn,{  top : -0}]}>
                                            <View style={[styles.sliderOptionMark, (this.state.valuesNumberIntensite[0] >= 0 ? styles.sliderOptionMarkValued : {})]}></View>
                                            <View style={[styles.sliderOptionMark, (this.state.valuesNumberIntensite[0] >= 1 ? styles.sliderOptionMarkValued : {})]}></View>
                                            <View style={[styles.sliderOptionMark, (this.state.valuesNumberIntensite[0] >= 2 ? styles.sliderOptionMarkValued : {})]}></View>
                                            <View style={[styles.sliderOptionMark, (this.state.valuesNumberIntensite[0] >= 3 ? styles.sliderOptionMarkValued : {})]}></View>
                                            <View style={[styles.sliderOptionMark, (this.state.valuesNumberIntensite[0] >= 4 ? styles.sliderOptionMarkValued : {})]}></View>
                                            <View style={[styles.sliderOptionMark, (this.state.valuesNumberIntensite[0] >= 5 ? styles.sliderOptionMarkValued : {})]}></View>
                                        </View>
                                        <View style={[styles.markerCtn, { top: 13, alignItems: "flex-end" }]}>
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
                                            value={this.state.valuesNumberIntensite[0]}
                                        />
                                    </View>
                                </View>


                            </LinearGradient>
                        </ScrollView>
                    </Swiper>
                }

                { (this.props.notshowvalider ===false && this.state.idzoneviaprops === 0) &&
                    <Swiper
                        renderPagination={renderPagination}
                        loop={false}
                        showsButtons={false}
                        onMomentumScrollEnd ={()=>{
                            const setSelectedZone = { type: SET_ZONE, value: {id:0,text:"Ajouter une tension",state:true} }
                            this.props.dispatch(setSelectedZone)
                        }}
                    >
                        <ScrollView
                            ref={(el) => {this.scrollview = el;}}
                            refreshControl={
                                <RefreshControl
                                    refreshing={this.state.refreshing}
                                    onRefresh={() => {
                                        this.setState({ refreshing: true });
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
                                {/*        {this.state.valuesNumberIntensite == 3 && <Text style={{color:'white'}}>forte</Text> }*/}
                                {/*        {this.state.valuesNumberIntensite == 4 && <Text style={{color:'white'}}>très forte</Text> }*/}
                                {/*        {this.state.valuesNumberIntensite == 5 && <Text style={{color:'white'}}>extrême</Text> }*/}
                                {/*    </View>*/}
                                {/*</View>*/}


                                <View style={{ flexDirection: "row", width: screenWidth * 0.9, marginLeft: 5 ,marginBottom:-9,marginTop:-screenWidth*0.15}}>
                                    <Text style={[{ fontSize: 14,color:'white' }]}>Tension</Text>
                                    <View style={{ width: screenWidth * 0.5, }}></View>
                                </View>
                                <View style={{ margin: 5 }}></View>
                                <View style={[styles.sliderCtn,{marginBottom:25}]}>
                                    <View style={styles.sliderView}>
                                        <View style={[styles.markerCtn,{top:Platform.OS==='ios'? -7:-10}]}>
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
                                            }}
                                        />
                                        <View style={{top:-5,left: ((parseInt(this.state.valuesNumberIntensite[0])  * (screenWidth - 80)) / 5)}}>
                                            {parseInt(this.state.valuesNumberIntensite[0]) == 0 && <Text style={{color:'white'}}>très faible</Text> }
                                            {parseInt(this.state.valuesNumberIntensite[0])  == 1 && <Text style={{color:'white'}}>faible</Text> }
                                            {parseInt(this.state.valuesNumberIntensite[0]) == 2 && <Text style={{color:'white'}}>moyenne</Text> }
                                            {parseInt(this.state.valuesNumberIntensite[0]) == 3 && <Text style={{color:'white'}}>forte</Text> }
                                            {parseInt(this.state.valuesNumberIntensite[0])  == 4 && <Text style={{color:'white'}}>trés forte</Text> }
                                            {parseInt(this.state.valuesNumberIntensite[0])  == 5 && <Text style={{color:'white'}}>extrême</Text> }
                                        </View>
                                    </View>
                                </View>

                                {
                                    this.props.notshowvalider ===false &&
                                    <MAAButton text={"VALIDER"} width={(screenWidth - 100)} height={40}
                                               onPress={() => {
                                                   this.postTension()
                                               }}
                                               style={[styles.btnValidate,{marginLeft:-4}]} />}
                            </LinearGradient>
                        </ScrollView>
                        <ScrollView
                            ref={(el) => {this.scrollview1 = el;}}
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
                            <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }} colors={[colors.balck, colors.green, colors.balck]} style={[baseStyles.linearGradient,{paddingBottom:40,paddingLeft:screenWidth*0.04}]}>
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

                                <View style={{ flexDirection: "row", width: screenWidth * 0.9, marginLeft: 5 ,marginBottom:-9,marginTop:0}}>
                                    <Text style={[{ fontSize: 14,color:'white' }]}>Tension</Text>
                                    <View style={{ width: screenWidth * 0.5, }}></View>
                                </View>
                                <View style={{ margin: 5 }}></View>
                                <View style={[styles.sliderCtn,{marginBottom:25}]}>
                                    <View style={styles.sliderView}>
                                        <View style={[styles.markerCtn,{top:Platform.OS==='ios'? -7:-10}]}>
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
                                            }}
                                        />
                                        {/*<View style={{top:-5,left: ((parseInt(this.state.valuesNumberIntensite[0],10)  * (screenWidth - 80)) / 5)}}>*/}
                                        <View style={{top:-5,left: ((parseInt(this.state.valuesNumberIntensite[0])  * (screenWidth - 80)) / 5)}}>
                                        {parseInt(this.state.valuesNumberIntensite[0]) == 0 && <Text style={{color:'white'}}>très faible</Text> }
                                            {parseInt(this.state.valuesNumberIntensite[0])  == 1 && <Text style={{color:'white'}}>faible</Text> }
                                            {parseInt(this.state.valuesNumberIntensite[0]) == 2 && <Text style={{color:'white'}}>moyenne</Text> }
                                            {parseInt(this.state.valuesNumberIntensite[0]) == 3 && <Text style={{color:'white'}}>forte</Text> }
                                            {parseInt(this.state.valuesNumberIntensite[0])  == 4 && <Text style={{color:'white'}}>très forte</Text> }
                                            {parseInt(this.state.valuesNumberIntensite[0])  == 5 && <Text style={{color:'white'}}>extrême</Text> }
                                        </View>
                                    </View>
                                </View>
                                <MAAButton text={"VALIDER"} width={(screenWidth - 100)} height={40}
                                           onPress={() => {
                                               this.postTension()
                                           }}
                                           style={[styles.btnValidate,{marginLeft:-6}]} />
                            </LinearGradient>
                        </ScrollView>
                    </Swiper>
                }




                <Modal
                    visible={this.state.zonePicker}
                    transparent={true}
                    onRequestClose={() => {
                        this.setState({ zonePicker: false })
                    }}
                >
                    <ZonePicker close={() => {
                        this.setState({ zonePicker: false })
                    }} type="tension" />
                    {/* <View style={{padding:10}}></View> */}
                </Modal>
            </View>
        )
    }


}


const mapStateToProps = (state) => {
    const { selectedZone,popToTop,userToken,pathologieonetension,idzone,itemid,notshowvalider } = state.statedata
    return { selectedZone,popToTop,userToken,pathologieonetension,idzone,itemid,notshowvalider}
};

export default connect(mapStateToProps)(AddTension);
