import React, { Component } from 'react'
import { connect } from 'react-redux';
import {
    Text,
    View,
    Image,
    Dimensions,
    TouchableOpacity,
    StatusBar,
    Modal,
    Alert, RefreshControl, TextInput, ScrollView,Platform
} from 'react-native';
import Swiper from 'react-native-swiper'
import AsyncStorage from "@react-native-community/async-storage";
import CorpsHelper from '../../../apis/helpers/corps_helper';
import SqueletteDevantBlanc from '../../Sante/AddBlessure/SqueletteDevantBlanc';
import SqueletteDerriereBlanc from '../../Sante/AddBlessure/SqueletteDerriereBlanc';
import SqueletteDevantRouge from './SqueletteDevantRouge';
import baseStyles from '../../../base/BaseStyles';
import styles from './styles'
import colors from '../../../configs/colors';
import LinearGradient from 'react-native-linear-gradient';
import ZonePicker from '../../../components/ZonePicker/ZonePicker';
import MAAButton from '../../../components/MAAButton/MAAButton';
import AutoHeightImage from 'react-native-auto-height-image';
import ImagePicker from 'react-native-image-picker';
// import MyBody from "../../../containers/Sante/MyBody/MyBody"
import MyBodyTemplates from '../../Sante/MyBody/MyBodyTemplates';
import {SET_ACTIVE_FP, SET_ACTIVE_TAB, SET_ACTIVE_TABMENU_MYENERGY, SET_ZONE,SET_ACTIVE_TABMENU_CARNET} from '../../../redux/types/tabTypes';
import SwitchToggle from 'react-native-switch-toggle';
import pathologieHelper from '../../../apis/helpers/pathologie_helper';
import moment from 'moment';
import DateTimePicker from 'react-native-modal-datetime-picker';
import {getBlessurePathologie} from '../../../apis/FonctionRedondant';
import { Dialog } from 'react-native-simple-dialogs';
import statusBarHeight from '../../../configs/screen';
import TrainHelper from '../../../apis/helpers/train_helper';
import Slidebottom from '../../../components/selectslidebottom/Slidebottom';

const options = {
    title: 'Sélectionner une photo',
    takePhotoButtonTitle: 'Prendre photo',
    chooseFromLibraryButtonTitle: 'Depuis la librairie',
    cancelButtonTitle:'Annuler',
    quality: 0.3,
};


const screen = Dimensions.get("window");
const SBHelight = statusBarHeight;
const screenWidth = screen.width
const screenHeight = screen.height - SBHelight

const styless = {
    wrapper: {
    },
    slide: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'transparent'
    },
    text: {
        color: '#fff',
        fontSize: 30,
        fontWeight: 'bold'
    },
    image: {
        width:'100%',
        flex: 1
    },
    paginationStyle: {
        position: 'absolute',
        bottom: 10,
        right: 10
    },
    paginationText: {
        color: 'white',
        fontSize: 20
    }
}



 class Carnet extends Component {


    constructor(props) {
        super(props)

        this.state = {
            activeMenu: 1,
            refreshing:false,
            pathologieblessure:null,
            pathologietension:[],
            popToTop:this.props.popToTop,
            data:'',
            showImc: false,
            tshowImG: false,
            showFFMI:false,
            // blessure
            selectedZone: props.selectedZone,
            date_text: moment(new Date()).format("DD/MM/YYYY"),
            operation: false,
            isDateTimePickerVisible:false,
            tempsindisponibilites:null,
            tempsindisponibilitessemaine:null,
            showTempsindisponibilitechoice:false,
            switchOn2:false,
            pathologieselected:null,
            showPathologie:false,
            pathologieselectedId:null,
            dateSelectedForsave:moment(new Date()).format("YYYY-MM-DD"),
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
            //pic
            avatarSource:[],
            dataImage: null,
            type: null,
            fileName: null,
            shown:false,
            responseImage:null,
        };
    }

    componentDidMount = async()=>{

        const setActiveFPAction = { type: SET_ACTIVE_FP, value: 4 };
        this.props.dispatch(setActiveFPAction)

        const userToken = await AsyncStorage.getItem("userToken");
        let responseCorps = await CorpsHelper.getCorps(userToken);
        this.setState({data: responseCorps.data})
        //blessure
        if(this.props.selectedZone.id === 0){}else{
            this.getpathologieblessure(this.props.userToken,this.props.selectedZone.id,1)
        }

        //fafain
        const setSelectedZone = { type: SET_ZONE, value: {id:0,text:"Ajouter une blessure"}}
        this.props.dispatch(setSelectedZone)
    };


    getImage(){
        this.setState({avatarSource:[]})
        ImagePicker.showImagePicker(options, (response) => {
            this.setState({refreshing:true});
            if (response.didCancel) {
                this.setState({refreshing:false});
                console.log('User cancelled image picker');
            }
            else if (response.error) {
                this.setState({refreshing:false})
                console.log('ImagePicker Error: ', response.error);
            }
            else if (response.customButton) {
                this.setState({refreshing:false})
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



    _selectedId = async (id,nom,state) =>{
        const getNameMembreOfSquelette = await pathologieHelper.getNameMembreOfSquelette(this.props.userToken,id);
        console.warn('id nom state',id,nom,state);
        if (getNameMembreOfSquelette) {
            console.warn('retour',getNameMembreOfSquelette.data.name);
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
            console.warn('temps indisp',tempsindisponibilites);
            tempsindisponibilites.data.length >0 && this.setState({refreshing: false, tempsindisponibilites: tempsindisponibilites,tempsindisponibilitessemaine:tempsindisponibilites.data[0]})
            this.setState({refreshing: false})
        }};


     renderPagination = (index, total, context) => {
         return (
             <View style={{
                 position: 'absolute',
                // bottom: 10,
                 top: 0,
                 marginLeft:-screenWidth*0.02,
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
            this.setState({refreshing: false});
            Alert.alert('Odgo','Blessure ajoutée avec succès.',[{
                text:'Ok',onPress:()=>{
                    this.setState({refreshing:true})

                    getBlessurePathologie(pathologieHelper,this.props,new Date().getFullYear()).then((datapahtologie)=>{
                        if(datapahtologie.length === 0 || datapahtologie.length === 1 || datapahtologie.length === 2){
                            console.warn('lenght0 et consort')
                            const setActive = { type: SET_ACTIVE_TABMENU_CARNET, value: 2 };
                            this.props.dispatch(setActive);
                            const setSelectedZone = { type: SET_ZONE, value: {id:0,text:"Ajouter une blessure"}};
                            this.props.dispatch(setSelectedZone)
                            this.setState({refreshing:false})
                        }else{

                                if(global.is_venudedonneperso === true){
                                    const setActiveTab = { type: SET_ACTIVE_TAB, value: "Pathologie" };
                                    this.props.dispatch(setActiveTab);
                                    this.props.navigation.navigate('LogedinNavigator');
                                    this.setState({refreshing:false})

                                } else{
                                    console.warn(' globla false ato v')
                                    if(this.props.navigation.navigate('Pathologie')){}else{
                                        this.props.navigation.navigate('PathologieFichepedag');
                                    }
                                    this.setState({refreshing:false})
                                }


                        }
                    });
                }
            }]);
            //
        }
    };

    entete(){
        return(
            <View style={{
                flex:1
            }}>
                <View style={{ alignItems :"center",justifyContent:"center",width:"100%",marginTop:15  }}>
                    <TouchableOpacity
                        onPress={async () => {
                            if(this.props.activemenucarnet === 2 ){
                                const setActive = { type: SET_ACTIVE_TABMENU_CARNET, value: 1 };
                                await this.props.dispatch(setActive);
                            }else{
                                if( global.is_venudedonneperso === true) {
                                    const setActiveTab = { type: SET_ACTIVE_TAB, value: "monplaning" };
                                    this.props.dispatch(setActiveTab);
                                    this.props.navigation.navigate('LogedinNavigator');
                                    // console.warn('jereo')
                                    // const setActiveTab = {type: SET_ACTIVE_TAB, value: "profile"};
                                    // this.props.dispatch(setActiveTab);
                                }else{
                                    this.props.navigation.goBack()
                                }
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
                    <Text style={[baseStyles.titleText,{left:0}]}>Mon carnet de santé</Text>
                </View>
                <View style={[styles.headCtn,{marginTop:0}]}>
                    <TouchableOpacity
                        style={[styles.headMenu]}
                        onPress={() => {
                            const setActive = { type: SET_ACTIVE_TABMENU_CARNET, value: 1 };
                            this.props.dispatch(setActive);
                            const setActiveFPAction = { type: SET_ACTIVE_FP, value: 4 }
                            this.props.dispatch(setActiveFPAction);
                        }}>
                        <View >
                            <Text style={[styles.menuText]}>MON CORPS</Text>
                        </View>
                        <View style={[(this.props.activemenucarnet == 1 ? styles.activeMenu : styles.inactiveMenu)]}></View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.headMenu]}
                        onPress={() => {
                            const setActive = { type: SET_ACTIVE_TABMENU_CARNET, value: 2 };
                            this.props.dispatch(setActive);
                            const setActiveFPAction = { type: SET_ACTIVE_FP, value: null }
                            this.props.dispatch(setActiveFPAction)
                        }}>
                        <View >
                            <Text style={[styles.menuText]}>MES BLESSURES</Text>
                        </View>
                        <View style={[(this.props.activemenucarnet == 2 ? styles.activeMenu : styles.inactiveMenu)]}></View>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    modalfooter(){
        return(
            <View
            >

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
                            right:20,
                            marginTop: Platform.OS === 'ios' ? statusBarHeight : 0,
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
                            marginTop: Platform.OS === 'ios' ? statusBarHeight : 0,
                            flex:1
                        }} />
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

    footer(){
        let isrestrictget_testing = false;
        if(this.props.droits.length>0){
            for(let i = 0; i < this.props.droits.length; i++){
                if(this.props.droits[i].name === "get_testing"){
                    isrestrictget_testing = this.props.droits[i].is_restrict;
                    break;
                }
            }
        }
        return(
            <View style={{alignSelf:'center'}}>
                {
                    this.props.selectedZone.id === 0 &&
                    <View>
                        {!isrestrictget_testing ?
                    <MAAButton text={"SUIVANT"} width={(screenWidth - 100)} height={40}
                               onPress={() => {
                                   if(this.props.activemenucarnet ===2){
                                       //
                                       if( global.is_venudedonneperso === true) {
                                           const setActiveTab = {type: SET_ACTIVE_TAB, value: "MonPhysique"};
                                           this.props.dispatch(setActiveTab);
                                           this.props.navigation.navigate('LogedinNavigator');
                                           // this.props.navigation.navigate('AppScreen');
                                       }else{
                                           this.props.navigation.navigate("MonPhysique");
                                       }
                                       const setActiveFPAction = { type: SET_ACTIVE_FP, value: 5 }
                                       this.props.dispatch(setActiveFPAction)
                                   }else {
                                       const setActive = { type: SET_ACTIVE_TABMENU_CARNET, value: 2 };
                                       this.props.dispatch(setActive);
                                   }
                               }}
                               style={[styles.btnValidate]}
                    />
                        :
                            <View style={[styles.buttonBlock, {width: screenWidth - 100,height:40,backgroundColor: colors.grisee,borderRadius:20,alignSelf:'center',alignItems:'center',justifyContent: "center",marginBottom:15,marginTop:10}]}>
                                <Text style={{color:colors.textgrisee,fontSize:14}}>
                                    {"SUIVANT"}
                                </Text>
                            </View>

                        }
                    <MAAButton text={"MON PROFIL"} width={(screenWidth - 100)} height={40} backgroundColor='transparent' borderColor='#fff'
                               onPress={() => {

                                   if( global.is_venudedonneperso === true) {
                                       console.warn('vers profile')
                                       const setActiveTab = {type: SET_ACTIVE_TAB, value: "profile"};
                                       this.props.dispatch(setActiveTab);
                                   }else{
                                       this.props.navigation.popToTop();
                                   }
                               }}
                               style={[styles.btnMonProfil]}
                    />
                    </View>
                }</View>
        )
    }

    moncorps(){
        return(
            <LinearGradient
                onStartShouldSetResponder={() =>
                {
                    console.warn('You click by View')
                    this.setState({ showImc: false })
                    this.setState({ showImG: false })
                    this.setState({ showFFMI: false })
                    this.setState({ showTempsindisponibilitechoice:false });
                }}
                start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }} colors={[colors.balck, colors.green, colors.balck]} style={[{flex:1}]}>
                <ScrollView
                    style={{}}
                    contentContainerStyle={{}}
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.refreshing}
                            onRefresh={() => {
                            }}
                            tintColor={Platform.OS==='ios'?colors.white:colors.green}
                            colors={[Platform.OS==='ios'?colors.white:colors.green]}
                        />
                    }
                >
                    {this.entete()}
                    <View style={{ justifyContent: "space-between", alignItems: "center",marginTop:-30 }}>
                        <View style={{}}>
                            <View style={[styles.inputBlock]}>
                                <View style={{ flexDirection: "row", alignItems: "center" }}>
                                    <Text style={[baseStyles.textColorWhite]}>IMC</Text>
                                    <TouchableOpacity
                                        onPress={()=>{
                                            this.setState({showImc:!this.state.showImc})
                                        }}
                                    ><AutoHeightImage
                                        width={14}
                                        source={require('../../../assets/icons/shape.red.1.png')}
                                        style={{ marginLeft: 5, marginRight: 5 }}
                                    /></TouchableOpacity>
                                    { this.state.showImc &&
                                    <View>
                                        <Text style={{fontSize: 8,color:'white',fontStyle:'italic',paddingBottom:6}}>Indice de masse corporelle</Text>
                                        <View style={{ flexDirection: "row",marginBottom:-10 }}>
                                            <View style={{ paddingLeft: 10, paddingRight: 10 }}>
                                                <Text style={[baseStyles.textColorWhite, { fontSize: 8 }]}>{"< 18,4"}</Text>
                                                <Text style={[baseStyles.textColorWhite, { fontSize: 8 }]}>{"18,5 - 25"}</Text>
                                                <Text style={[baseStyles.textColorWhite, { fontSize: 8 }]}>{"25,1 - 30"}</Text>
                                                <Text style={[baseStyles.textColorWhite, { fontSize: 8 }]}>{"30,1 - 35"}</Text>
                                            </View>
                                            <View style={{ paddingLeft: 10, paddingRight: 10 }}>
                                                <Text style={[baseStyles.textColorWhite, { fontSize: 8 }]}>Déficit</Text>
                                                <Text style={[baseStyles.textColorWhite, { fontSize: 8 }]}>Normal</Text>
                                                <Text style={[baseStyles.textColorWhite, { fontSize: 8 }]}>Surpoids</Text>
                                                <Text style={[baseStyles.textColorWhite, { fontSize: 8 }]}>Obésité</Text>
                                            </View>
                                        </View>
                                    </View>
                                    }
                                </View>
                                {/*<Text style={[baseStyles.textColorWhite]}>{this.state.data.imc}</Text>*/}
                                <Text style={[baseStyles.textColorWhite]}>{ this.state.data !== "" && (this.state.data.imc % 1 != 0 ? (this.state.data.imc).toFixed(2) : this.state.data.imc)}</Text>

                            </View>
                            <View style={[styles.inputBlock]}>
                                <View style={{ flexDirection: "row", alignItems: "center" }}>
                                    <Text style={[baseStyles.textColorWhite]}>IMG</Text>
                                    <TouchableOpacity
                                        onPress={()=>{
                                            this.setState({showImG:!this.state.showImG})
                                        }}
                                    >
                                        <AutoHeightImage
                                            width={14}
                                            source={require('../../../assets/icons/shape.red.1.png')}
                                            style={{ marginLeft: 5, marginRight: 5 }}
                                        />
                                    </TouchableOpacity>

                                    { this.state.showImG &&
                                    <View style={{ marginBottom:-10, marginTop:-10 }}>
                                        <View style={{alignItems:'center',marginBottom:4}}>
                                            <Text style={{fontSize: 9,color:'white',fontStyle:'italic',paddingBottom:6}}>Indice de masse graisseuse</Text>
                                            <Text style={{fontSize: 8,color:'white',fontStyle:'italic'}}>Pourcentage de gras</Text>
                                        </View>
                                        <View style={{flexDirection: "row",}}>
                                            <View style={{ paddingLeft: 10 }}>
                                                <Text style={[baseStyles.textColorWhite, { fontSize: 8,fontWeight:'bold',fontStyle:'italic' }]}>Hommes</Text>
                                                <Text style={[baseStyles.textColorWhite, { fontSize: 8 }]}>{"2% - 5%"}</Text>
                                                <Text style={[baseStyles.textColorWhite, { fontSize: 8 }]}>{"6% - 13%"}</Text>
                                                <Text style={[baseStyles.textColorWhite, { fontSize: 8 }]}>{"14% - 17%"}</Text>
                                                <Text style={[baseStyles.textColorWhite, { fontSize: 8 }]}>{"18% - 25%"}</Text>
                                                <Text style={[baseStyles.textColorWhite, { fontSize: 8 }]}>plus de 25%</Text>
                                            </View>
                                            <View style={{ paddingLeft: 10,alignItems:'center'}}>
                                                <Text style={[baseStyles.textColorWhite, { fontSize: 8 ,fontWeight:'bold',fontStyle:'italic'}]}>Catégories</Text>
                                                <Text style={[baseStyles.textColorWhite, { fontSize: 8 }]}>Gras essentiel minimal</Text>
                                                <Text style={[baseStyles.textColorWhite, { fontSize: 8 }]}>Athlètes</Text>
                                                <Text style={[baseStyles.textColorWhite, { fontSize: 8 }]}>Actifs</Text>
                                                <Text style={[baseStyles.textColorWhite, { fontSize: 8 }]}>Sédentaires</Text>
                                                <Text style={[baseStyles.textColorWhite, { fontSize: 8 }]}>Obèses</Text>
                                            </View>
                                            <View style={{ paddingLeft: 10, paddingRight: 10 }}>
                                                <Text style={[baseStyles.textColorWhite, { fontSize: 8 ,fontWeight:'bold',fontStyle:'italic'}]}>Femmes</Text>
                                                <Text style={[baseStyles.textColorWhite, { fontSize: 8 }]}>{"10% - 13%"}</Text>
                                                <Text style={[baseStyles.textColorWhite, { fontSize: 8 }]}>{"14% - 20%"}</Text>
                                                <Text style={[baseStyles.textColorWhite, { fontSize: 8 }]}>{"21% - 24%"}</Text>
                                                <Text style={[baseStyles.textColorWhite, { fontSize: 8 }]}>{"25% - 31%"}</Text>
                                                <Text style={[baseStyles.textColorWhite, { fontSize: 8 }]}>plus de 31%</Text>
                                            </View>
                                        </View>
                                    </View>}
                                </View>
                                <Text style={[baseStyles.textColorWhite]}>{ this.state.data !== "" && (this.state.data.img % 1 != 0 ? (this.state.data.img).toFixed(2) : this.state.data.img)}%</Text>
                            </View>

                            <View style={[styles.inputBlock]}>
                                <Text style={[baseStyles.textColorWhite]}>Masse grasse</Text>
                                {/*<Text style={[baseStyles.textColorWhite]}>{this.state.data.masse_grasse} kg</Text>*/}
                                <Text style={[baseStyles.textColorWhite]}>{ this.state.data !== "" && (this.state.data.masse_grasse % 1 != 0 ? (this.state.data.masse_grasse).toFixed(2) : this.state.data.masse_grasse)} kg</Text>

                            </View>

                            <View style={[styles.inputBlock]}>
                                <Text style={[baseStyles.textColorWhite]}>Masse maigre</Text>
                                {/*<Text style={[baseStyles.textColorWhite]}>{this.state.data.masse_maigre} kg</Text>*/}
                                <Text style={[baseStyles.textColorWhite]}>{ this.state.data !== "" && (this.state.data.masse_maigre % 1 != 0 ? (this.state.data.masse_maigre).toFixed(2) : this.state.data.masse_maigre)} kg</Text>

                            </View>
                            <View style={[styles.inputBlock]}>
                                <View style={{ flexDirection: "row", alignItems: "center" }}>
                                    <Text style={[baseStyles.textColorWhite]}>FFMI</Text>
                                    <TouchableOpacity
                                        onPress={()=>{
                                            this.setState({showFFMI:!this.state.showFFMI})
                                        }}
                                    ><AutoHeightImage
                                        width={14}
                                        source={require('../../../assets/icons/shape.red.1.png')}
                                        style={{ marginLeft: 5, marginRight: 5 }}
                                    /></TouchableOpacity>
                                    { this.state.showFFMI &&
                                    <View style={{ marginBottom:-10, marginTop:-10 }}>
                                        <View style={{alignItems:'center',marginBottom:4}}><Text style={{fontSize: 8,color:'white',fontStyle:'italic'}}>FFMI (Fat Free Mass Index)</Text></View>
                                        <View style={{flexDirection: "row",}}>
                                            <View style={{ paddingLeft: 3,justifyContent:'space-between' }}>
                                                <Text style={[baseStyles.textColorWhite, { fontSize: 7,fontWeight:'bold',fontStyle:'italic' }]}>Hommes</Text>
                                                <Text style={[baseStyles.textColorWhite, { fontSize: 7 }]}>Moins de 17</Text>
                                                <Text style={[baseStyles.textColorWhite, { fontSize: 7 }]}>Entre 17 et 20</Text>
                                                <Text style={[baseStyles.textColorWhite, { fontSize: 7 }]}>Entre 20 et 23</Text>
                                                <Text style={[baseStyles.textColorWhite, { fontSize: 7 }]}>Au-dessus de 23</Text>
                                            </View>
                                            <View style={{ paddingLeft: 5,alignItems:'center',justifyContent:'space-between'}}>
                                                <Text style={[baseStyles.textColorWhite, { fontSize: 7 ,fontWeight:'bold',fontStyle:'italic'}]}>Catégories</Text>
                                                <Text style={[baseStyles.textColorWhite, { fontSize: 6 }]}>Peu de muscle(maigre)</Text>
                                                <Text style={[baseStyles.textColorWhite, { fontSize: 6 }]}>Moyenne pour les jeunes adultes</Text>
                                                <Text style={[baseStyles.textColorWhite, { fontSize: 6 }]}>Visiblement musclé(e)</Text>
                                                <Text style={[baseStyles.textColorWhite, { fontSize: 6 }]}>Utilisateur/Utilisatrice de stéroïdes</Text>
                                            </View>
                                            <View style={{ paddingLeft: 5, justifyContent:'space-between' }}>
                                                <Text style={[baseStyles.textColorWhite, { fontSize: 7 ,fontWeight:'bold',fontStyle:'italic'}]}>Femmes</Text>
                                                <Text style={[baseStyles.textColorWhite, { fontSize: 7 }]}>Moins de 14</Text>
                                                <Text style={[baseStyles.textColorWhite, { fontSize: 7 }]}>Entre 14 et 17</Text>
                                                <Text style={[baseStyles.textColorWhite, { fontSize: 7 }]}>Entre 17 et 20</Text>
                                                <Text style={[baseStyles.textColorWhite, { fontSize: 7 }]}>Au-dessus de 20</Text>
                                            </View>
                                        </View>
                                    </View>}
                                </View>
                                {/*<Text style={[baseStyles.textColorWhite]}>{this.state.data.ffmi}</Text>*/}
                                <Text style={[baseStyles.textColorWhite]}>{ this.state.data !== "" && (this.state.data.ffmi % 1 != 0 ? (this.state.data.ffmi).toFixed(2) : this.state.data.ffmi)}</Text>

                            </View>
                            <View style={[styles.inputBlock, styles.lastInputBlock]}>
                                <Text style={[baseStyles.textColorWhite]}>Poids idéal</Text>
                                <Text style={[baseStyles.textColorWhite]}>{this.state.data !== "" && (this.state.data.poids_ideal % 1 != 0 ? (this.state.data.poids_ideal).toFixed(2) :this.state.data.poids_ideal)} kg</Text>
                            </View>
                        </View>
                        <View style={{alignItems:'center',marginBottom:20}}>{
                            this.props.selectedZone.id === 0 &&
                            <MAAButton text={"SUIVANT"} width={(screenWidth - 100)} height={40}
                                       onPress={() => {
                                           if(this.props.activemenucarnet ===2){
                                               if( global.is_venudedonneperso === true) {
                                                   const setActiveTab = {type: SET_ACTIVE_TAB, value: "MonPhysique"};
                                                   this.props.dispatch(setActiveTab);
                                                   this.props.navigation.navigate('LogedinNavigator');
                                                   // this.props.navigation.navigate('AppScreen');
                                               }else{
                                                   this.props.navigation.navigate("MonPhysique");
                                               }
                                               const setActiveFPAction = { type: SET_ACTIVE_FP, value: 5 }
                                               this.props.dispatch(setActiveFPAction)
                                           }else {
                                               const setActive = { type: SET_ACTIVE_TABMENU_CARNET, value: 2 };
                                               this.props.dispatch(setActive);
                                               const setActiveFPAction = { type: SET_ACTIVE_FP, value: null}
                                               this.props.dispatch(setActiveFPAction)
                                           }
                                       }}
                                       style={[styles.btnValidate]}
                            />
                        }
                            {
                                this.props.selectedZone.id === 0 &&
                                <MAAButton text={"MON PROFIL"} width={(screenWidth - 100)} height={40} backgroundColor='transparent' borderColor='#fff'
                                           onPress={() => {
                                               const setActiveFPAction = {type: SET_ACTIVE_FP, value: null}
                                               this.props.dispatch(setActiveFPAction)
                                               if( global.is_venudedonneperso === true) {
                                                   console.warn('vers profile');
                                                   const setActiveTab = {type: SET_ACTIVE_TAB, value: "profile"};
                                                   this.props.dispatch(setActiveTab);
                                               }else{
                                                   this.props.navigation.popToTop();
                                               }
                                           }}
                                           style={[styles.btnMonProfil]}
                                />
                            }</View>
                    </View>
                </ScrollView>
            </LinearGradient>
        )
    }

    render () {

        return (
            <View style={{flex:1}}>
                {this.modalfooter()}
            {
                this.props.activemenucarnet == 2 ?
                    (this.props.selectedZone.id !== 0 ?
                            <LinearGradient start={{x: 0, y: 0}} end={{x: 0, y: 1}}
                                            colors={[colors.balck, colors.green, colors.balck]} >
                                <ScrollView
                                    refreshControl={
                                        <RefreshControl
                                            refreshing={this.state.refreshing}
                                            onRefresh={() => {
                                            }}
                                            tintColor={Platform.OS==='ios'?colors.white:colors.green}
                                            colors={[Platform.OS==='ios'?colors.white:colors.green]}
                                        />
                                    }
                                    contentContainerStyle={{height:screenHeight,marginBottom:100}}>
                                <View style={{ justifyContent: "space-between", alignItems: "center" }}>
                                    <View>
                                        <View style={{
                                            minWidth: screenWidth,
                                        }}>
                                            <View style={{ alignItems :"center",justifyContent:"center",width:"100%" ,marginTop:20 }}>
                                                <TouchableOpacity
                                                    onPress={() => {
                                                        const setActiveFPAction = { type: SET_ACTIVE_FP, value: -1 };
                                                        this.props.dispatch(setActiveFPAction)

                                                        if(this.props.selectedZone.id !== 0){ //ts kitika anty tsika ra notshowvalider ===true
                                                            const setSelectedZone = { type: SET_ZONE, value: {id:0,text:"Ajouter une blessure"}};
                                                            this.props.dispatch(setSelectedZone)
                                                        }
                                                        else
                                                        {
                                                            console.warn('ato v')
                                                            this.props.navigation.goBack()
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
                                                <TouchableOpacity
                                                    onPress={() => {
                                                        const setSelectedZone = { type: SET_ZONE, value: {id:0,text:"Ajouter une blessure"} }
                                                        this.props.dispatch(setSelectedZone)

                                                        const setActiveFPAction = { type: SET_ACTIVE_FP, value: -1};
                                                        this.props.dispatch(setActiveFPAction)

                                                    }}>
                                                    <Text style={[baseStyles.titleText,{fontSize:17}]}>
                                                        { this.props.activemenucarnet == 2 && this.props.selectedZone.id === 0 ? "Ajouter une blessure" : this.props.selectedZone.text}
                                                    </Text>
                                                </TouchableOpacity>
                                            </View>
                                            <View style={{ width: 60 }}>
                                                <Text style={{ color: colors.balck + "00" }}>...</Text>
                                            </View>
                                        </View>
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
                                        <TouchableOpacity
                                            onPress={()=>{
                                                this.setState({ showPathologie: !this.state.showPathologie })
                                            }}
                                            style={{flexDirection:'row',
                                                justifyContent: "space-between",
                                                alignItems:'center',
                                                //width: (screenWidth - 30),
                                                paddingTop: 15,
                                                marginHorizontal:10,
                                                paddingBottom: 15,
                                                borderBottomColor: colors.white + "AA",
                                                borderBottomWidth: 1,
                                            }}>
                                            <View >
                                                <Text style={[baseStyles.textColorWhite]}>Pathologie</Text>
                                            </View>
                                            <View style={{width:'62%'}}>
                                                <Text
                                                    style={[baseStyles.textColorWhite,{textAlign:'right',textDecoration:'underline'}]} >
                                                    {this.state.pathologieselected}
                                                </Text>
                                            </View>
                                        </TouchableOpacity>

                                        <TouchableOpacity onPress={
                                            this.showDateTimePicker
                                        }>
                                            <View style={{
                                                marginHorizontal:10,
                                                paddingTop: 15,
                                                paddingBottom: 15,
                                                borderBottomColor: colors.white + "AA",
                                                borderBottomWidth: 1,
                                                flexDirection: "row",
                                                alignItems: "center",
                                                justifyContent: "space-between"}}>
                                                <Text style={[baseStyles.textColorWhite]}>Date</Text>
                                                <Text style={{color:'white'}}>{this.state.date_text}</Text>
                                            </View>
                                        </TouchableOpacity>

                                        <TouchableOpacity onPress={() => {
                                            console.log("Date pressed.")
                                            this.setState({ booleanValuesShow: !this.state.booleanValuesShow })
                                        }}>
                                            <View style={{marginHorizontal:10,
                                                paddingTop: 15,
                                                paddingBottom: 15,
                                                borderBottomColor: colors.white + "AA",
                                                borderBottomWidth: 1,
                                                flexDirection: "row",
                                                alignItems: "center",
                                                justifyContent: "space-between"}}>
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
                                            style={{marginHorizontal:10,
                                                paddingTop: 15,
                                                paddingBottom: 15,
                                                borderBottomColor: colors.white + "AA",
                                                borderBottomWidth: 1,
                                                flexDirection: "row",
                                                alignItems: "center",
                                                justifyContent: "space-between"}}>
                                            <Text style={[baseStyles.textColorWhite]}>Temps d'indisponibilité</Text>
                                            <Text
                                                style={[baseStyles.textColorWhite, styles.inputTxt]} >
                                                {this.state.tempsindisponibilitessemaine !== null && this.state.tempsindisponibilitessemaine.name}
                                            </Text>
                                        </TouchableOpacity>

                                        <View
                                            style={[{marginHorizontal:10,
                                                paddingTop: 15,
                                                paddingBottom: 15,
                                                borderBottomColor: colors.white + "AA",
                                                borderBottomWidth: 1,
                                                flexDirection: "row",
                                                alignItems: "center",
                                                justifyContent: "space-between"},styles.lastInputBlock]}>
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
                                            <View style={{flexDirection:'column',justifyContent:'flex-end',marginHorizontal:15}}>
                                                <TouchableOpacity
                                                    onPress={()=>{
                                                        this.setState({   avatarSource:[], responseImage:null})
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
                                                    this.setState({refreshing:true})
                                                   this.blessuresave()
                                                   console.warn('test pour navigation depuis squeleette')
                                               }}
                                               style={[styles.btnValidate]} />

                                    {/*<TouchableOpacity*/}
                                    {/*    onPress={()=>{*/}
                                    {/*        this.blessuresave()*/}
                                    {/*    }}*/}
                                    {/*    style={{alignItems:'center',flexDirection:'row'}}>*/}
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
                                    {/*        <Text style={{fontSize:15,color:'white'}}>VALI</Text>*/}
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
                                </ScrollView>
                            </LinearGradient>
                    :
                    <Swiper
                        style={{}}
                        renderPagination={this.renderPagination}
                        loop={false}
                    >
                        <LinearGradient start={{x: 0, y: 0}} end={{x: 0, y: 1}}
                                        colors={[colors.balck, colors.green, colors.balck]}>
                            <ScrollView style={{marginLeft: screenWidth * 0.02}}>
                                {this.entete()}
                                {(this.props.activemenucarnet === 2 && this.props.selectedZone.id === 0) && <View style={[styles.noSelectedCtn,{marginBottom:10,alignSelf:'center'}]}>
                                    <Text style={[baseStyles.textColorWhite]}>Sélectionnez une zone d’une blessure passée</Text>
                                </View>}
                                <SqueletteDevantBlanc _selectedId={this._selectedId}/>
                                <View style={{marginTop:-60,marginBottom:70}} >
                                {this.footer()}
                                </View>
                            </ScrollView>
                        </LinearGradient>
                        <LinearGradient start={{x: 0, y: 0}} end={{x: 0, y: 1}}
                                        colors={[colors.balck, colors.green, colors.balck]}>
                            <ScrollView style={{marginLeft: screenWidth * 0.04}}>
                                {this.entete()}
                                {(this.props.activemenucarnet === 2 && this.props.selectedZone.id === 0) && <View style={[styles.noSelectedCtn,{marginBottom:10,alignSelf:'center'}]}>
                                    <Text style={[baseStyles.textColorWhite]}>Sélectionnez une zone d'une blessure passée</Text>
                                </View>}
                                <SqueletteDerriereBlanc _selectedId={this._selectedId}/>
                                <View style={{marginTop:-30,marginBottom:70}} >
                                    {this.footer()}
                                </View>
                            </ScrollView>
                        </LinearGradient>
                    </Swiper>
                    )
                    :
                    this.moncorps()
            }
            </View>
        )
    }
}


const mapStateToProps = (state) => {
    const { popToTop,userToken,selectedZone,activemenucarnet,droits } = state.statedata
    return { popToTop ,userToken,selectedZone,activemenucarnet,droits}
};

export default connect(mapStateToProps)(Carnet);
