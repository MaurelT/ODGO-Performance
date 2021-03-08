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
    Alert,
    TextInput,
    KeyboardAvoidingView, RefreshControl,
} from 'react-native';
import { connect } from 'react-redux';
import baseStyles from '../../../base/BaseStyles';
import styles from './styles';
import colors from '../../../configs/colors';
import LinearGradient from 'react-native-linear-gradient';
import MAAButton from '../../../components/MAAButton/MAAButton';
import AutoHeightImage from 'react-native-auto-height-image';
import {SET_ACTIVE_FP, SET_ACTIVE_TAB, SET_POP_TO_TOP, SET_ZONE} from '../../../redux/types/tabTypes';
import SqueletteDevantBlanc from './SqueletteDevantBlanc';
import SqueletteDerriereBlanc from './SqueletteDerriereBlanc';
import Swiper from "react-native-swiper";
import pathologieHelper from '../../../apis/helpers/pathologie_helper';
import moment from 'moment';
import DateTimePicker from "react-native-modal-datetime-picker";
import SwitchToggle from "react-native-switch-toggle";
import {getBlessurePathologie} from '../../../apis/FonctionRedondant';
import statusBarHeight from '../../../configs/screen';
import Slidebottom from '../../../components/selectslidebottom/Slidebottom';
import ImagePicker from 'react-native-image-picker';


const screen = Dimensions.get("window");
const SBHelight = statusBarHeight;
const screenWidth = screen.width
const screenHeight = screen.height - SBHelight;


const options = {
    title: 'Sélectionner une photo',
    takePhotoButtonTitle: 'Prendre photo',
    chooseFromLibraryButtonTitle: 'Depuis la librairie',
    cancelButtonTitle:'Annuler',
    quality: 0.4,
};



class AddBlessure extends Component {
    constructor(props) {
        super(props)
        this.state = {
            activeMenu: 2,
            pathologie_text: "Traumatismes",
            autre_text: "Xxxxx",
            date_text: moment(new Date()).format("DD/MM/YYYY"),
            operation: false,
            indispo_time: "2 semaines",
            popToTop:this.props.popToTop,
            activeTabMenu:1,
            pathologieblessure:null,
            isDateTimePickerVisible:false,
            tempsindisponibilites:null,
            tempsindisponibilitessemaine:null,
            showTempsindisponibilitechoice:false,
            switchOn2:false,
            pathologieselected:null,
            showPathologie:false,
            pathologieselectedId:null,
            dateSelectedForsave:moment(new Date()).format("YYYY-MM-DD"),
            refreshing:false,

            //one pathologie blessure
            PATHOLOGIE:null,
            DATEPATHOLOGIE:null,
            OPERATION:null,
            TEMPSINDISPONIBILITESEMAINE:null,
            NOMZONEBLESSURE:'',
            SWITCHON2:false,
            IMAGERIE:null,
            booleanValues: [
                {
                    id: 1,
                    name: "Oui",
                    value: true
                },
                {
                    id: 2,
                    name: "Non",
                    value: false
                }
            ],
            booleanValuesShow:false,

            avatarSource:[],
            dataImage: null,
            type: null,
            fileName: null,
            shown:false,
            shown1:false,
            responseImage:null,
        }
    }



    componentDidMount() {
        if(this.props.selectedZone.id === 0){}else{
            this.getpathologieblessure(this.props.userToken,this.props.selectedZone.id,1)
        }
        const setActiveFPAction = { type: SET_ACTIVE_FP, value: -1 };
        this.props.dispatch(setActiveFPAction)

        if(this.props.notshowvalider ===true){
           // this.setState({showPathologie:true});
            this.getoneblessure();
        }
    }


    getImage(){
        this.setState({avatarSource:[]});
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
                this.setState({refreshing:false})
                let source = { uri: response.uri };
                this.state.avatarSource.push(source);
                this.setState({
                    dataImage: response.data,
                    type: response.type,
                    fileName: response.fileName,
                    responseImage:response,
                });
                console.warn('response data',response)
            }
        });

    }

    getoneblessure  = async () => { //deleguena ngamb
        this.setState({refreshing: true});
        const pathologieblessure = await pathologieHelper.getoneblessure(this.props.userToken,this.props.itemid);
        if (pathologieblessure.success) {
            console.warn('blessures',pathologieblessure);
            this.setState({PATHOLOGIE:pathologieblessure.data.pathology.name});
            this.setState({DATEPATHOLOGIE:moment(pathologieblessure.data.date).format('DD/MM/YYYY')});
            let OPERATION = pathologieblessure.data.operation;
            switch(OPERATION){
                case 0 :
                    this.setState({OPERATION:false});
                    break;
                case 1 :
                    this.setState({OPERATION:true});
                    break;
                default:
                    this.setState({OPERATION:false});
            }
            this.setState({OPERATION:OPERATION});
            switch(pathologieblessure.data.pathology.pathologie_type_id ){
                case 1 :
                    this.setState({SWITCHON2:false});
                    break;
                case 2 :
                    this.setState({SWITCHON2:true});
                    break;
                default:
                    this.setState({SWITCHON2:false});
            }
            pathologieHelper.gettempsindisponibilites(this.props.userToken).then((response)=>{
                let tempsindisponibilite = '';
              for (let i = 0; i< response.data.length; i++){
                if(pathologieblessure.data.temps_indisponibilite_id === response.data[i].id){
                    tempsindisponibilite = response.data[i].name;
                    break;
                }
              }
                this.setState({TEMPSINDISPONIBILITESEMAINE:tempsindisponibilite});
            });
            this.setState({NOMZONEBLESSURE: pathologieblessure.data.zone.name});
            this.setState({IMAGERIE: pathologieblessure.data.user_blessure_images});
            this.setState({refreshing: false});
        }else{
            this.setState({refreshing: false});
        }
    };

    _selectedId = async (id,nom,state) =>{
        const getNameMembreOfSquelette = await pathologieHelper.getNameMembreOfSquelette(this.props.userToken,id);
        if (getNameMembreOfSquelette) {
            console.warn(getNameMembreOfSquelette.data.name);
          //  const setSelectedZone = { type: SET_ZONE, value: {id:id,text:nom} }; taloha
            const setSelectedZone = { type: SET_ZONE, value: {id:id,text:getNameMembreOfSquelette.data.name}};
            this.props.dispatch(setSelectedZone);
            switch (this.state.switchOn2) {
                case false:
                    this.getpathologieblessure(this.props.userToken,id,1);
                    break;
                case true:
                    this.getpathologieblessure(this.props.userToken,id,2);
            }
        }
    };

    getpathologieblessure  = async (token,zoneid,pathologie_type_id) => {
        this.setState({refreshing: true});
        const pathologieblessure = await pathologieHelper.getpathologieblessure(token,zoneid,pathologie_type_id);
        if (pathologieblessure.data.length >0) {
            this.setState({refreshing: false,pathologieblessure:pathologieblessure,pathologieselected:pathologieblessure.data[0].name,pathologieselectedId:pathologieblessure.data[0].id},()=>{
                    switch(pathologieblessure.data[0].pathologie_type_id ){
                        case 1 :
                            this.setState({switchOn2:false});
                            break;
                        case 2 :
                            this.setState({switchOn2:true});
                            break;
                    }
                    this.gettempsindisponibilites()
            });
        }else{
            this.setState({refreshing:false})
        }
    };

    gettempsindisponibilites =  async () => {
        this.setState({refreshing: true});
        const tempsindisponibilites = await pathologieHelper.gettempsindisponibilites(this.props.userToken);
        if (tempsindisponibilites) {
            tempsindisponibilites.data.length >0 && this.setState({refreshing: false, tempsindisponibilites: tempsindisponibilites,tempsindisponibilitessemaine:tempsindisponibilites.data[0]})
            this.setState({refreshing: false})
        }};


     renderPagination = (index, total, context) => {
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

    showDateTimePicker = () => {
        this.setState({ isDateTimePickerVisible: true });
    };

    hideDateTimePicker = () => {
        this.setState({ isDateTimePickerVisible: false });
    };

    handleDatePicked = date => {
        console.warn("A date has been picked: ", date);
        this.setState({date_text:moment(date).format("DD/MM/YYYY"),dateSelectedForsave:moment(date).format("YYYY-MM-DD")})
        this.hideDateTimePicker();
    };


    onPress2 = () => {
        this.setState({ switchOn2: !this.state.switchOn2 },()=>{
            switch (this.state.switchOn2) {
                case false:
                    this.getpathologieblessure(this.props.userToken, this.props.selectedZone.id, 1);
                    break;
                case true:
                    this.getpathologieblessure(this.props.userToken, this.props.selectedZone.id, 2);
                    break;
            }
        });
        };

    blessuresave = async () => {
        this.setState({refreshing: true});
        let switchOn2 = this.state.switchOn2 ? 2 : 1;
        let operation = this.state.operation ? 1 : 0;
        let files= [];
        if(this.state.responseImage !== null){
            let filesjson={};
            filesjson.type =  this.state.responseImage.type;
            filesjson.fileName =  this.state.responseImage.fileName;
            filesjson.data =  this.state.responseImage.data;
            files.push(filesjson);
        }
        const blessuresave = await pathologieHelper.blessuresave(this.props.userToken,
            this.props.selectedZone.id,
            //switchOn2, //j'ai enlevé ça pour changer en pathologie_id recupéré depuis pathologie_id/index
            this.state.pathologieselectedId,
            this.state.dateSelectedForsave,
            operation,
            this.state.tempsindisponibilitessemaine.id,
            files,
        );
        // let blessuresave = true;
        if (blessuresave) {
            this.setState({refreshing:true})
            //le carnet ian n asiana io if else amban io

            Alert.alert('Odgo','Blessure ajoutée avec succès.',[{
                text:'Ok',onPress:()=> {
                    console.warn('bob')
                }
            }]);
            getBlessurePathologie(pathologieHelper,this.props,new Date().getFullYear()).then((datapahtologie)=>{
                // if(datapahtologie.length === 0 || datapahtologie.length === 1  || datapahtologie.length === 2){
                //     const setSelectedZone = { type: SET_ZONE, value: {id:0,text:"Ajouter une blessure"}}
                //     this.props.dispatch(setSelectedZone)
                //     this.setState({refreshing:false})
                // }else{
                    this.setState({refreshing:false})
                const setActiveTab = { type: SET_ACTIVE_TAB, value: "Pathologie" };
                this.props.dispatch(setActiveTab);
                this.props.navigation.navigate('LogedinNavigator');
                this.setState({refreshing:false})            });
        }
    };

    entete(){
        return(
            <View style={{
                minWidth: screenWidth,
                paddingLeft: 15,
                paddingRight: 15,
                left:-screenWidth*0.016
            }}>
                <View style={{ alignItems :"center",justifyContent:"center",width:"100%" ,marginTop:15 }}>
                    <TouchableOpacity
                        onPress={() => {
                            const setActiveFPAction = { type: SET_ACTIVE_FP, value: -1 }
                            this.props.dispatch(setActiveFPAction)

                            if(global.is_venudedonneperso === true){
                                if(this.props.selectedZone.id !== 0){ //ts kitika anty tsika ra notshowvalider ===true
                                    const setSelectedZone = { type: SET_ZONE, value: {id:0,text:"Ajouter une blessure"}}
                                    this.props.dispatch(setSelectedZone)
                                }
                                else {
                                    const setActiveTab = {
                                        type: SET_ACTIVE_TAB, value: "Pathologie"
                                    };
                                    this.props.dispatch(setActiveTab);
                                }
                            }else{
                                if(this.props.selectedZone.id !== 0){ //ts kitika anty tsika ra notshowvalider ===true
                                    const setSelectedZone = { type: SET_ZONE, value: {id:0,text:"Ajouter une blessure"}}
                                    this.props.dispatch(setSelectedZone)
                                }
                                else
                                {
                                    this.props.navigation.goBack()
                                }
                            }


                        }}
                        style={{width:50,position:"absolute",left:0}}
                    >
                        <AutoHeightImage
                            width={18}
                            source={require('../../../assets/icons/left.arrow.white.png')}
                            style={{marginLeft:0}}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {
                            const setSelectedZone = { type: SET_ZONE, value: {id:0,text:"Ajouter une blessure"} }
                            this.props.dispatch(setSelectedZone)

                            const setActiveFPAction = { type: SET_ACTIVE_FP, value: -1};
                            this.props.dispatch(setActiveFPAction)

                        }}>
                        <Text style={[baseStyles.titleText,{fontSize:17}]}>
                            {this.props.notshowvalider ===true ? this.state.NOMZONEBLESSURE : (this.props.selectedZone.id === 0 ? "Ajouter une blessure" : this.props.selectedZone.text)}
                        </Text>
                    </TouchableOpacity>
                </View>
                <View style={{ width: 60 }}>
                    <Text style={{ color: colors.balck + "00" }}>...</Text>
                </View>

               {(this.props.selectedZone.id === 0 && this.props.notshowvalider !==true)&& <View style={[styles.noSelectedCtn,{marginBottom:10,alignSelf:'center'}]}>
                    <Text style={[baseStyles.textColorWhite]}>Sélectionnez une zone</Text>
                    {/*<Text style={[baseStyles.textColorWhite]}>à une blessure</Text>*/}
                </View>}

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

            <View
                onStartShouldSetResponder={() =>
                {
                    console.warn('You click by View')
                    this.setState({ showTempsindisponibilitechoice:false });

                }}
                style={{flex:1}}>



                { this.props.notshowvalider ===true ? null:(this.props.selectedZone.id === 0 &&
                <Swiper
                    renderPagination={this.renderPagination}
                    loop={false}
                   // showsButtons={true}
                    // dot ={<View style={{width:screenWidth-20,alignItems:'flex-start',left:100}}><View style={{backgroundColor:'red', width: 8, height: 8,borderRadius: 4, marginLeft: 3,  marginTop: 3, marginBottom:30,}} /></View>}
                    // activeDot ={<View style={{width:screenWidth,alignItems:'flex-start',left:100}}><View style={{backgroundColor:'yellow', width: 8, height: 8,borderRadius: 4, marginLeft: 3,  marginTop: 3, marginBottom:30,}} /></View>}
                >
                    <ScrollView>
                        <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }} colors={[colors.balck, colors.green, colors.balck]} style={baseStyles.linearGradient}>
                            <View style={{width:'100%',marginLeft:screenWidth*0.02}}>{this.entete()}
                            <SqueletteDevantBlanc _selectedId={this._selectedId}/>
                            </View>
                        </LinearGradient>
                    </ScrollView>
                    <ScrollView>
                        <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }} colors={[colors.balck, colors.green, colors.balck]} style={baseStyles.linearGradient}>
                            <View style={{width:'100%',marginLeft:screenWidth*0.04}}>{this.entete()}
                                <SqueletteDerriereBlanc _selectedId={this._selectedId}/>
                            </View>
                        </LinearGradient>
                    </ScrollView>
                </Swiper>)
                }
                {  this.props.notshowvalider === true ?
                    //ato no avoaka ilay select one blessure
                        <ScrollView
                            refreshControl={
                                <RefreshControl
                                    refreshing={this.state.refreshing}
                                    onRefresh={() => {
                                        this.setState({ refreshing: true })
                                        setTimeout(() => {
                                            switch (this.state.switchOn2) {
                                                case false:
                                                    this.getpathologieblessure(this.props.userToken,this.props.selectedZone.id,1);
                                                    break;
                                                case true:
                                                    this.getpathologieblessure(this.props.userToken,this.props.selectedZone.id,2);
                                                    break;
                                            }
                                            this.setState({ refreshing: false })
                                        }, 1000)
                                    }}
                                    tintColor={colors.green}
                                    colors={[colors.green]}
                                />
                            }
                        >
                            <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }} colors={[colors.balck, colors.green, colors.balck]} style={{height:screenHeight}}>
                                <View style={{}}>
                                    {this.entete()}
                                    <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-around',paddingBottom:screenWidth*0.04,marginTop: Platform.OS === "ios" ? 15 : 0}}>

                                        <Text style={this.state.switchOn2 === false ?{color:'#F44130'}:{color:'white'}}>Os/ligaments</Text>
                                        <SwitchToggle
                                            backgroundColorOff={"#F44130"}
                                            containerStyle={{
                                                width: 50,
                                                height: 24,
                                                borderRadius: 25,
                                                backgroundColor: "#F44130",
                                                padding: 5
                                            }}
                                            circleStyle={{
                                                width: 20,
                                                height: 20,
                                                borderRadius: 10,
                                                backgroundColor: "white" // rgb(102,134,205)
                                            }}
                                            switchOn={this.state.SWITCHON2}
                                            //   onPress={this.onPress2}
                                            circleColorOff="white"
                                            circleColorOn="white"
                                            duration={500}
                                            backgroundColorOn={"#F44130"}
                                        />
                                        <Text style={this.state.switchOn2?{color:'#F44130'}:{color:'white'}}>Muscles/tendons</Text>
                                    </View>
                                </View>
                                <View style={{ justifyContent: "space-between", alignItems: "center" }}>
                                    <View>
                                        <View
                                            style={[styles.inputBlock,{flexDirection:'row', justifyContent: "space-between"}]}>
                                            <View style={{width:'38%'}}>
                                                <Text style={[baseStyles.textColorWhite]}>Pathologie</Text>
                                            </View>
                                            <View style={{width:'62%',alignItems:'flex-end'}}>
                                                <Text
                                                    style={[baseStyles.textColorWhite,{textAlign:'right'}]} >
                                                    {this.state.PATHOLOGIE}
                                                </Text>
                                            </View>
                                        </View>
                                        <View>
                                            <View style={[styles.inputBlock]}>
                                                <Text style={[baseStyles.textColorWhite]}>Date</Text>
                                                <Text style={{color:'white'}}>{this.state.DATEPATHOLOGIE}</Text>
                                            </View>
                                        </View>

                                        <View>
                                            <View style={[styles.inputBlock]}>
                                                <Text style={[baseStyles.textColorWhite]}>Opération</Text>
                                                <Text style={[baseStyles.textColorWhite]}>
                                                    {this.state.OPERATION ? "Oui" : "Non"}
                                                </Text>
                                            </View>
                                        </View>
                                        <View
                                            style={[styles.inputBlock]}>
                                            <Text style={[baseStyles.textColorWhite]}>Temps d'indisponibilité</Text>
                                            <Text
                                                style={[baseStyles.textColorWhite, styles.inputTxt]} >
                                                {this.state.TEMPSINDISPONIBILITESEMAINE}</Text>
                                        </View>
                                        <View
                                            style={[styles.inputBlock,styles.lastInputBlock]}>
                                            <Text style={[baseStyles.textColorWhite]}>Imagerie (IRM, scanner...)</Text>
                                            {
                                                this.state.IMAGERIE !== null &&
                                                <View style={{flexDirection:'column',justifyContent:'flex-end'}}>
                                                    <TouchableOpacity
                                                        onPress={()=>{
                                                            this.setState({shown1:true})
                                                        }}
                                                    >{this.state.IMAGERIE.length > 0 && <Image
                                                            // width={14}
                                                            source={{uri:this.state.IMAGERIE[0].filename}}
                                                            style={{width:60,height:60,borderRadius:5,alignSelf:'flex-end',marginTop:-10}}
                                                        />}
                                                    </TouchableOpacity>
                                                </View>
                                            }
                                        </View>
                                    </View>
                                </View>
                            </LinearGradient>
                        </ScrollView>
                    :
                    (this.props.selectedZone.id !== 0 &&
                <ScrollView
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.refreshing}
                            onRefresh={() => {
                                this.setState({ refreshing: true })
                                setTimeout(() => {
                                    switch (this.state.switchOn2) {
                                        case false:
                                            this.getpathologieblessure(this.props.userToken,this.props.selectedZone.id,1);
                                            break;
                                        case true:
                                            this.getpathologieblessure(this.props.userToken,this.props.selectedZone.id,2);
                                            break;
                                    }
                                    this.setState({ refreshing: false })
                                }, 1000)

                            }}
                            tintColor={colors.green}
                            colors={[colors.green]}
                        />
                    }

                >
                <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }} colors={[colors.balck, colors.green, colors.balck]} style={{height:screenHeight}}>
                    <View>
                        {this.entete()}
                        <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-around',paddingBottom:screenWidth*0.04}}>
                            <TouchableOpacity onPress={()=>{
                                this.setState({switchOn2:false})
                                this.getpathologieblessure(this.props.userToken,this.props.selectedZone.id,1);
                            }}
                                              style={this.state.switchOn2 === false ? {borderRadius:13,borderWidth:1,backgroundColor:"#F54130", borderColor:"#F54130",paddingHorizontal:13,paddingVertical:3} :{borderRadius:13,borderWidth:1, borderColor:"white",paddingHorizontal:13,paddingVertical:3}}
                            >
                                <Text style={{color:'white'}}>Os/ligaments</Text>
                            </TouchableOpacity>
                            <SwitchToggle
                                backgroundColorOff={"#F44130"}
                                containerStyle={{
                                    width: 50,
                                    height: 24,
                                    borderRadius: 25,
                                    backgroundColor: "#F44130",
                                    padding: 5
                                }}
                                circleStyle={{
                                    width: 20,
                                    height: 20,
                                    borderRadius: 10,
                                    backgroundColor: "white" // rgb(102,134,205)
                                }}
                                switchOn={this.state.switchOn2}
                                onPress={this.onPress2}
                                circleColorOff="white"
                                circleColorOn="white"
                                duration={500}
                                backgroundColorOn={"#F44130"}
                            />
                            <TouchableOpacity onPress={()=>{
                                this.setState({switchOn2:true})
                                this.getpathologieblessure(this.props.userToken,this.props.selectedZone.id,2);
                            }}
                                     style={this.state.switchOn2 === true ? {borderRadius:13,borderWidth:1,backgroundColor:"#F54130", borderColor:"#F54130",paddingHorizontal:7,paddingVertical:3} :{borderRadius:13,borderWidth:1, borderColor:"white",paddingHorizontal:7,paddingVertical:3}}
                            >
                                {/*<Text style={this.state.switchOn2?{color:'white'}:{color:'#F44130'}}>Muscles/tendons</Text>*/}
                                <Text style={{color:'white'}}>Muscles/tendons</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{ justifyContent: "space-between", alignItems: "center" }}>
                        <View>
                            <TouchableOpacity
                                onPress={()=>{
                                    this.setState({ showPathologie: !this.state.showPathologie })

                                }}
                                style={[styles.inputBlock,{flexDirection:'row', justifyContent: "space-between"}]}>

                                <View style={{width:'38%'}}>
                                    <Text style={[baseStyles.textColorWhite]}>Pathologie</Text>
                                </View>
                                <View style={{width:'62%',alignItems:'flex-end'}}>
                                    <Text
                                        style={[baseStyles.textColorWhite,{textAlign:'right'}]} >
                                        {this.state.pathologieselected}
                                    </Text>
                                </View>

                            </TouchableOpacity>
                            <TouchableOpacity onPress={
                                this.showDateTimePicker
                            }>
                                <View style={[styles.inputBlock]}>
                                    <Text style={[baseStyles.textColorWhite]}>Date</Text>
                                    <Text style={{color:'white'}}>{this.state.date_text}</Text>
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => {
                                console.log("Date pressed.")
                                this.setState({ booleanValuesShow: !this.state.booleanValuesShow })
                            }}>
                                <View style={[styles.inputBlock]}>
                                    <Text style={[baseStyles.textColorWhite]}>Opération</Text>
                                    <Text style={[baseStyles.textColorWhite]}>
                                        {this.state.operation ? "Oui" : "Non"}
                                    </Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={()=>{
                                    this.setState({ showTempsindisponibilitechoice: !this.state.showTempsindisponibilitechoice })
                                }}
                                style={[styles.inputBlock]}>
                                <Text style={[baseStyles.textColorWhite]}>Temps d'indisponibilité</Text>
                                <Text
                                    style={[baseStyles.textColorWhite, styles.inputTxt]} >
                                    {this.state.tempsindisponibilitessemaine !== null && this.state.tempsindisponibilitessemaine.name}</Text>
                            </TouchableOpacity>
                            <View
                                style={[styles.inputBlock,styles.lastInputBlock]}>
                                <Text style={[baseStyles.textColorWhite]}>Ajouter une imagerie (IRM, scanner...)</Text>

                                <TouchableOpacity
                                    onPress={this.getImage.bind(this)}
                                >
                                    <Image
                                        // width={14}
                                        source={require("../../../assets/icons/downarrow.png")}
                                        style={{width:20,height:20}}
                                    /></TouchableOpacity>

                            </View>
                            {
                                this.state.avatarSource.length>0 &&
                                <View style={{flexDirection:'column',justifyContent:'flex-end'}}>
                                    <TouchableOpacity
                                        onPress={()=>{
                                            this.setState({   avatarSource:[], responseImage:null})
                                            console.warn('pressed')
                                        }}
                                        style={{alignSelf:'flex-end',zIndex:10}}
                                    >
                                        <Image
                                            // width={14}
                                            source={require("../../../assets/icons/croix.rouge.png")}
                                            style={{width:30,height:30,borderRadius:30,zIndex:10,right:-10}}
                                        />
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        onPress={()=>{
                                            this.setState({shown:true})
                                        }}
                                    >
                                        <Image
                                            // width={14}
                                            source={{uri:this.state.avatarSource[0].uri}}
                                            style={{width:60,height:60,borderRadius:5,alignSelf:'flex-end',marginTop:-10}}
                                        />
                                    </TouchableOpacity>
                                </View>
                            }
                        </View>
                    </View>
                    <View style={{alignItems:'center',paddingTop:10}}>
                    <MAAButton text={"VALIDER"} width={(screenWidth - 100)} height={40}
                               onPress={() => {

                                   this.blessuresave()

                               }}
                               style={[styles.btnValidate]} />
                        {/*<TouchableOpacity*/}
                        {/*    onPress={()=>{*/}
                        {/*        this.blessuresave()*/}
                        {/*    }}*/}
                        {/*style={{alignItems:'center',flexDirection:'row'}}>*/}
                        {/*    <View style={{width:'35%',*/}
                        {/*        backgroundColor:this.state.switchOn2? 'transparent':'#F54130',*/}
                        {/*        borderTopWidth:this.state.switchOn2? 1:0,*/}
                        {/*        borderBottomWidth:this.state.switchOn2? 1:0,*/}
                        {/*        borderLeftWidth:this.state.switchOn2? 1:0,*/}
                        {/*        borderTopColor: 'white',*/}
                        {/*        borderBottomColor: 'white',*/}
                        {/*        borderLeftColor: 'white',*/}
                        {/*        alignItems:'flex-end',*/}
                        {/*        borderBottomLeftRadius:19,*/}
                        {/*        borderTopLeftRadius:19,*/}
                        {/*        height:38,justifyContent:'center'}}>*/}
                        {/*    <Text style={{fontSize:15,color:'white'}}>VALI</Text>*/}
                        {/*    </View>*/}
                        {/*    <View style={{width:'35%',*/}
                        {/*        backgroundColor:this.state.switchOn2? '#F54130':'transparent',*/}
                        {/*        borderTopWidth:this.state.switchOn2? 0:1,*/}
                        {/*        borderBottomWidth:this.state.switchOn2? 0:1,*/}
                        {/*        borderRightWidth:this.state.switchOn2? 0:1,*/}
                        {/*        borderTopColor: 'white',*/}
                        {/*        borderBottomColor: 'white',*/}
                        {/*        borderRightColor: 'white',*/}
                        {/*        borderBottomRightRadius:19,*/}
                        {/*        borderTopRightRadius:19,*/}
                        {/*        height:38,justifyContent:'center'}}>*/}
                        {/*        <Text style={{fontSize:15,color:'white'}}>DER</Text>*/}
                        {/*    </View>*/}
                        {/*</TouchableOpacity>*/}
                    </View>
                </LinearGradient>
                </ScrollView>
                )}


                <DateTimePicker
                    isVisible={this.state.isDateTimePickerVisible}
                    onConfirm={this.handleDatePicked}
                    onCancel={this.hideDateTimePicker}
                    // maximumDate={new Date()}
                />
                <Modal
                    visible={this.state.shown}
                    onRequestClose={() => {
                        this.setState({ shown: false })
                    }}
                    transparent={true}

                >
                    <TouchableOpacity
                        onPress={() => {
                            this.setState({ shown: false })
                        }}
                        style={{
                            position: "absolute",
                            top: 10,
                            marginTop: Platform.OS === 'ios' ? statusBarHeight : 0,
                            right:20,
                            // width: screenWidth,
                            // height: screenHeight,
                            zIndex:3
                        }}
                    >
                        <Text style={{fontSize:20,color:'white',fontWeight:'bold'}}>X</Text>
                    </TouchableOpacity>

                    { this.state.avatarSource.length>0 && <AutoHeightImage
                        width={screenWidth}
                        source={{uri:this.state.avatarSource[0].uri}}
                        style={{
                            flex:1,
                            marginTop: Platform.OS === 'ios' ? statusBarHeight : 0,
                        }} />
                    }
                </Modal>
                <Modal
                    visible={this.state.shown1}
                    onRequestClose={() => {
                        this.setState({ shown1: false })
                    }}
                    transparent={true}

                >
                    <TouchableOpacity
                        onPress={() => {
                            this.setState({ shown1: false })
                        }}
                        style={{
                            position: "absolute",
                            top: 10,
                            right:20,
                            marginTop: Platform.OS === 'ios' ? statusBarHeight : 0,
                            // width: screenWidth,
                            // height: screenHeight,
                            zIndex:3
                        }}
                    >
                        <Text style={{fontSize:20,color:'gray',fontWeight:'bold'}}>X</Text>
                    </TouchableOpacity>

                    { this.state.IMAGERIE !== null && ( this.state.IMAGERIE.length > 0 &&
                    <AutoHeightImage
                        width={screenWidth}
                        source={{uri:this.state.IMAGERIE[0].filename}}
                        style={{
                            flex:1,
                            marginTop: Platform.OS === 'ios' ? statusBarHeight : 0,
                        }} />)
                    }
                </Modal>
                <View>
                {
                    this.state.pathologieblessure !== null &&
                    <Slidebottom showModal={this.state.showPathologie}
                                 onRequestClose={() => {
                                     this.setState({showPathologie: false});
                                 }}
                                 callback={async (item, index) => {
                                     this.setState({ pathologieselected: item.name,pathologieselectedId:item.id });
                                     this.setState({showPathologie: false})
                                 }}
                                 items={this.state.pathologieblessure.data}
                                 component_item={(item) => {
                                     return (
                                         <Text style={{color: '#373535'}}>
                                             {
                                                 item.name
                                             }
                                         </Text>
                                     )
                                 }}
                    />
                }

                <Slidebottom showModal={this.state.booleanValuesShow}
                             onRequestClose={()=>{
                                 this.setState({booleanValuesShow:false});
                             }}
                             callback={async (item,index)=>{
                                 this.setState({ operation: item.value })
                                 this.setState({ booleanValuesShow: false })
                             }}
                             items={ this.state.booleanValues}
                             component_item={(item)=>{
                                 return(
                                     <Text style={{color:'#373535'}}>
                                         {
                                             item.name
                                         }
                                     </Text>
                                 )
                             }}
                />

                {
                    this.state.tempsindisponibilites !== null &&
                    <Slidebottom showModal={this.state.showTempsindisponibilitechoice}
                                 onRequestClose={() => {
                                     this.setState({showTempsindisponibilitechoice: false});
                                 }}
                                 callback={async (item, index) => {
                                     this.setState({ tempsindisponibilitessemaine: item });
                                     this.setState({ showTempsindisponibilitechoice: false })
                                 }}
                                 items={this.state.tempsindisponibilites.data}
                                 component_item={(item) => {
                                     return (
                                         <Text style={{color: '#373535'}}>
                                             {
                                                 item.name
                                             }
                                         </Text>
                                     )
                                 }}
                    />
                }
                </View>
            </View>
        )
    }
}


const mapStateToProps = (state) => {
    const { selectedZone,popToTop,userToken,notshowvalider,itemid } = state.statedata
    return { selectedZone,popToTop ,userToken,notshowvalider,itemid}
};

export default connect(mapStateToProps)(AddBlessure);
