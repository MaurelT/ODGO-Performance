import * as React from 'react';
import { connect } from 'react-redux';
import {
    SET_ACTIVE_FP,
    SET_ARRAY_ALIMENT_CREATE,
    SET_PETITS_DEJEUNER_REPAS,
    SET_REPAS_DEJEUNER,
    SET_COLLATION_MATIN,
    SET_COLLATION_APRESMIDI,
    SET_DINER,
    SET_ACTIVE_TAB,
    SET_REFRESH_MESREPAS,
    SET_MON_ASSIETTE,
    SET_PETITS_DEJEUNERD,
    SET_PETITS_COLLATION_MATIND,
    SET_DEJEUNERD,
    SET_COLLATION_APRESMIDID, SET_DINERD,
} from '../../../../redux/types/tabTypes';
import compteurNutritionnelHelper from '../../../../apis/helpers/compteurNutritionnel_helper';

import {
    View,
    TouchableOpacity,
    StyleSheet,
    Text,
    Dimensions,
    StatusBar,
    ScrollView,
    Image,
    TextInput,
    Modal,
    RefreshControl,
    Alert
} from 'react-native';
import Animated from 'react-native-reanimated';
import AutoHeightImage from 'react-native-auto-height-image';
import LinearGradient from "react-native-linear-gradient";
import colors from '../../../../configs/colors';
const screen = Dimensions.get("window");
const screenWidth = screen.width;
const screenHeight = screen.height;
import Menu, {
    MenuProvider,
    MenuTrigger,
    MenuOptions,
    MenuOption
} from "react-native-popup-menu"
import styles from '../../../Training/NewTraining/styles';
import SlidingPanel from 'react-native-sliding-up-down-panels';
import ScrollPicker from 'react-native-wheel-scroll-picker';
import ImagePicker from 'react-native-image-picker';
import Loading from '../../../../components/Load/loading';
import statusBarHeight from '../../../../configs/screen';
import baseStyles from '../../../../base/BaseStyles';
import phoneType from '../../../../configs/typePhone';
import {monassiete} from '../../../../apis/FonctionRedondant';
const options = {
    title: 'Séléctionner une photo',
    takePhotoButtonTitle: 'Prendre photo',
    chooseFromLibraryButtonTitle: 'Dépuis la librairie',
    quality: 0.4,
    cancelButtonTitle:'Annuler',
};


class CreerRepas  extends React.Component {

    constructor(props) {
        super(props);
        let defaultparamRepasType = null;
        switch (this.props.paramRepasType) {
            case 1:
                defaultparamRepasType = "Petit déjeuner";
                break;
            case 2:
                defaultparamRepasType = "Collation matin";
                break;
            case 3:
                defaultparamRepasType = "Déjeuner";
                break;
            case 4:
                defaultparamRepasType = "Collation après-midi";
                break;
            case 5:
                defaultparamRepasType = "Diner";
                break;
            default:
                defaultparamRepasType = "Repas du jour";
        }


        this.state = {
            selectedRepasType:defaultparamRepasType,
            selectedRepasTypeID:this.props.paramRepasType,
            showModalRepasyType:false,
            editlabelrepas:false,
            datasourcequantite:[0],
            isSelectedquantite:0,
            item_a_ampitoviana:null,
            actualisation:false,
            labelrepas:'Mon nom de repas',
            //imagepicker
            avatarSource:undefined,
            dataImage:null,
            fileName:null,
            type:null,
            responseImagePicker : {},
            refreshing:false,
            showImageViewer:false,
        };

        for(let i = 1; i<100; i++){
            this.state.datasourcequantite.push(i);
        }
        this.ajouterstyle={width:screenWidth*0.13,height:screenWidth*0.06,backgroundColor:'#FF3A28',justifyContent:'center',alignItems:'center',borderRadius:4}

    }

    componentDidMount() {
        setInterval(()=>{
            this.setState({actualisation:!this.state.actualisation})
        },1000)
    }


    getImage(){
        ImagePicker.showImagePicker(options, (response) => {
            this.setState({avatarSource:undefined}); //vonoina aloha le teo
            this.setState({refreshing:true});

            if (response.didCancel) {
                console.log('User cancelled image picker');
                this.setState({refreshing:false})

            }
            else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
                this.setState({refreshing:false})

            }
            else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
                this.setState({refreshing:false})

            }
            else {
                this.setState({responseImagePicker:response});
                let source = { uri: response.uri };

                this.setState({
                    avatarSource: source,
                    dataImage: response.data,
                    type: response.type,
                    fileName: response.fileName,
                });
                this.setState({refreshing:false})
             //   console.warn('response data',response)
            }
        });

    }


    getViaPostRepas = async (repas_type_id) => {
        let setrepas = null;

        if(repas_type_id == 1){ //collation matin
            let setPetitsDejeuner = { type: SET_PETITS_DEJEUNER_REPAS, value: [] };
            this.props.dispatch(setPetitsDejeuner);

        }else if(repas_type_id == 2){ //collation matin
            let setCollationMatin = { type: SET_COLLATION_MATIN, value: [] };
            this.props.dispatch(setCollationMatin);

        }else if(repas_type_id == 3){ //dejeuner
            setrepas = { type: SET_REPAS_DEJEUNER, value: [] }
            this.props.dispatch(setrepas);

        }else if(repas_type_id == 4){

            let setCollationApresmidi = { type: SET_COLLATION_APRESMIDI, value: [] };
            this.props.dispatch(setCollationApresmidi);

        }else if(repas_type_id == 5){
            let setDiner = { type: SET_DINER, value: [] };
            this.props.dispatch(setDiner);
        }

        const repas = await compteurNutritionnelHelper.getViaPostPetitsDejeuner(this.props.userToken,repas_type_id);
        let repasarray = [];
        if (repas.data !== null) {
            for(let i = 0 ; i < repas.data.length; i++){
                let Calories = 0;
                if(repas.data[i].aliments.length > 0){
                    for(let j = 0 ; j < repas.data[i].aliments.length; j++) {
                        Calories += repas.data[i].aliments[j].kcalorie_pour_100g * repas.data[i].aliments[j].portion_en_g / 100;
                    }
                }
                let dejeu = {
                    id : repas.data[i].id,
                    name : repas.data[i].libelle,
                    thumbnail: repas.data[i].picture,
                    kilocalorie : Calories //calories io fa ts kilo fa ny recepteur any kilo de avelao aminio aloh
                };
                repasarray.push(dejeu);
            }

            let setrepasplein = null; //Var redux

            if(repas_type_id == 1){
                let setPetitsDejeuner = { type: SET_PETITS_DEJEUNER_REPAS, value: repasarray };
                this.props.dispatch(setPetitsDejeuner);

            }else if(repas_type_id == 2){

                let setCollationMatinn = { type: SET_COLLATION_MATIN, value:repasarray };
                this.props.dispatch(setCollationMatinn);

            }else if(repas_type_id == 3){

                setrepasplein  = { type: SET_REPAS_DEJEUNER, value: repasarray }
                this.props.dispatch(setrepasplein);

            }else if(repas_type_id == 4){

                let setCollationApresmidi = { type: SET_COLLATION_APRESMIDI, value:repasarray };
                this.props.dispatch(setCollationApresmidi);

            }else if(repas_type_id == 5){

                let setDiner = { type: SET_DINER, value: repasarray };
                this.props.dispatch(setDiner);

            }
            this.setState({refreshing: false})
            console.warn('repas tonga via geget ok',repasarray,repas)
            return null;
        }else{
            this.setState({refreshing: false})
            return null;
        }
    };


    createPostRepas = async () => {
        this.setState({refreshing: true});


        let aliment = [
            // {aliment_id:1,aliment_quantite:4},
            // {aliment_id:2,aliment_quantite:2},
            // {aliment_id:3,aliment_quantite:6},
        ];
        for(let i = 0; i<this.props.ArrayAlimentCreate.length; i++) {
           let imen = {  aliment_id : this.props.ArrayAlimentCreate[i].food_id, aliment_quantite: this.props.ArrayAlimentCreate[i].quantite}
            aliment.push(imen)
        }

        let picture = {
            "type": this.state.type,
                "fileName":this.state.fileName,
                "data": this.state.dataImage
        }


        let datasend = {
            "repas_type_id":this.state.selectedRepasTypeID,
            "libelle":this.state.labelrepas
        };

        datasend.aliment = aliment;
        if(this.state.type !== null && this.state.fileName !== null &&  this.state.dataImage !== null) {
            datasend.picture = picture;
        }
        console.warn('datasend ',datasend);

        const saveCreationrepasFormdata = await compteurNutritionnelHelper.saveCreationrepasFormdata(
            this.props.userToken,
            datasend
        );

        if (saveCreationrepasFormdata.success === true) {
            // monassiete redux
            this.setState({refreshing: false});
            setTimeout(()=>{
                 Alert.alert('Odgo','Repas créé avec succès.',[{
                text:'Ok',
                onPress:()=>{
                    this.setState({refreshing: true});
                    this.getViaPostRepas(this.state.selectedRepasTypeID).then(()=>{
                        this.props.dispatch({
                            type: SET_REFRESH_MESREPAS,
                            value: true
                        });
                        this.setState({refreshing: false});
                        if(this.props.navigation.navigate("PetitdejeunerNews",{venurepas:true})){ }else{
                            this.props.navigation.navigate('PetitdejeunerNew',{venurepas:true});
                        }
                    })
                }
            }]);
            },600)
           
            // if( this.props.navigation.navigate('Petitdejeuner')){} //redirection de actualisation atao
            // else {
            //     this.props.navigation.navigate('Petitdejeuners')
            // }
            console.warn("repas crée",saveCreationrepasFormdata)
        }else{
            this.setState({refreshing: false});
            setTimeout(()=>{
                Alert.alert('Odgo','La création du repas n\'est pas éfféctué.');
            },300)
        }
    };




    render() {

      //  console.warn('ArrayAlimentCreate',this.props.ArrayAlimentCreate)
       let glucide = 0;
       let proteine = 0;
       let lipide = 0;
       let kilocalorie = 0;
       for(let i = 0 ; i < this.props.ArrayAlimentCreate.length; i++){
           let portion_en_g = this.props.ArrayAlimentCreate[i].portion_en_g;
           if(this.props.ArrayAlimentCreate[i].is_portion){

               //this.state.getfor_reglettepage.data.aliment.portion_en_ml
               if(this.props.ArrayAlimentCreate[i].portion_en_ml  > 0){
                   kilocalorie +=  (this.props.ArrayAlimentCreate[i].quantite * this.props.ArrayAlimentCreate[i].portion_en_ml) * this.props.ArrayAlimentCreate[i].kilocalorie / 100
                   glucide +=  (this.props.ArrayAlimentCreate[i].quantite * this.props.ArrayAlimentCreate[i].portion_en_ml) * this.props.ArrayAlimentCreate[i].glucide / 100
                   proteine +=  (this.props.ArrayAlimentCreate[i].quantite * this.props.ArrayAlimentCreate[i].portion_en_ml) * this.props.ArrayAlimentCreate[i].proteine / 100
                   lipide =  (this.props.ArrayAlimentCreate[i].quantite * this.props.ArrayAlimentCreate[i].portion_en_ml) * this.props.ArrayAlimentCreate[i].lipide / 100
               }else{
                   kilocalorie +=  (this.props.ArrayAlimentCreate[i].quantite * this.props.ArrayAlimentCreate[i].portion_en_g) * this.props.ArrayAlimentCreate[i].kilocalorie / 100
                   glucide +=  (this.props.ArrayAlimentCreate[i].quantite * this.props.ArrayAlimentCreate[i].portion_en_g) * this.props.ArrayAlimentCreate[i].glucide / 100
                   proteine +=  (this.props.ArrayAlimentCreate[i].quantite * this.props.ArrayAlimentCreate[i].portion_en_g) * this.props.ArrayAlimentCreate[i].proteine / 100
                   lipide +=  (this.props.ArrayAlimentCreate[i].quantite * this.props.ArrayAlimentCreate[i].portion_en_g) * this.props.ArrayAlimentCreate[i].lipide / 100
               }
           }else{
               if(this.props.ArrayAlimentCreate[i].portion_en_ml  > 0){
                   kilocalorie +=  this.props.ArrayAlimentCreate[i].quantite * this.props.ArrayAlimentCreate[i].kilocalorie / 100
                   glucide +=  this.props.ArrayAlimentCreate[i].quantite * this.props.ArrayAlimentCreate[i].glucide / 100
                   lipide +=  this.props.ArrayAlimentCreate[i].quantite * this.props.ArrayAlimentCreate[i].lipide / 100
                   proteine +=  this.props.ArrayAlimentCreate[i].quantite * this.props.ArrayAlimentCreate[i].proteine / 100
               }else{
                   kilocalorie +=  this.props.ArrayAlimentCreate[i].quantite * this.props.ArrayAlimentCreate[i].kilocalorie / 100
                   glucide +=  this.props.ArrayAlimentCreate[i].quantite * this.props.ArrayAlimentCreate[i].glucide / 100
                   lipide +=  this.props.ArrayAlimentCreate[i].quantite * this.props.ArrayAlimentCreate[i].lipide / 100
                   proteine +=  this.props.ArrayAlimentCreate[i].quantite * this.props.ArrayAlimentCreate[i].proteine / 100
               }

           }


           //  glucide += (portion_en_g * this.props.ArrayAlimentCreate[i].glucide) / 100;
           // proteine += (portion_en_g * this.props.ArrayAlimentCreate[i].proteine) / 100;
           // lipide += (portion_en_g * this.props.ArrayAlimentCreate[i].lipide) / 100;
           // kilocalorie += (portion_en_g * this.props.ArrayAlimentCreate[i].kilocalorie) / 100;

       }
        return (
            <View style={{flex:1}}>
                <Loading load={this.state.refreshing} />
                <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }} colors={[colors.balck, colors.green,  '#213D2E']} style={{
                    //height:screenWidth*0.41,
                    justifyContent: 'center',alignItems:'center'}}>
                    <View style={{ alignItems :"center",justifyContent:"center",width:"100%"  }}>
                        <TouchableOpacity
                            onPress={() => {
                                this.props.navigation.goBack()
                                const setActiveFPAction = { type: SET_ACTIVE_FP, value: -1 }
                                this.props.dispatch(setActiveFPAction)
                            }}
                            style={{width:50,position:"absolute",left:0}}
                        >
                            <AutoHeightImage
                                width={18}
                                source={require('../../../../assets/icons/arrow-white.png')}
                                style={{
                                    marginLeft:15,
                                    transform: [
                                        { rotateY: "180deg" }
                                    ],
                                }}
                            />
                        </TouchableOpacity>
                        <Text style={[baseStyles.titleText,{textAlign:"center"}]}>
                            {"Créer un repas"}
                        </Text>
                    </View>

                    <View style={{}}>
                        <TouchableOpacity onPress={()=>{
                            console.warn('delete')//reinitialisation eto
                            this.setState({
                                labelrepas:'Mon nom de repas',
                                avatarSource:undefined,
                                dataImage:null,
                                fileName:null,
                                type:null,
                            })
                            let setarrayalimentcreate = { type: SET_ARRAY_ALIMENT_CREATE, value: [] }
                            this.props.dispatch(setarrayalimentcreate);
                        }}
                                          style={{flexDirection:'row',alignItems:'center',
                                              justifyContent:'flex-end',width: '100%',marginRight:60}}
                        >
                            <View  style={{width: 30,height: 30,borderRadius:30,backgroundColor: '#888E8B',alignItems:'center',justifyContent: 'center'}}>
                                <Image
                                    style={{width: 18, height: 18,}}
                                    source={require('../../../../assets/icons/trash.png')}
                                />
                            </View>
                        </TouchableOpacity>
                    </View>

                    <View style={{width: '100%',marginTop:-screenWidth*0.05}} >
                        <TouchableOpacity onPress={
                            this.getImage.bind(this)
                        }
                                          style={{
                                              flexDirection:'row',
                                              alignItems:'center',
                                              justifyContent:'center',
                                              width: '100%',
                                              right:-screenWidth*0.06,
                                              bottom:-screenWidth*0.03,
                                              zIndex:2
                                          }}
                        >
                            <View  style={{width: 20,height: 20,borderRadius:20,
                                backgroundColor: '#FF3A28',
                                alignItems:'center',
                                justifyContent: 'center',
                            }}>
                                <Text style={{fontSize:13,color:'white'}}>+</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={
                        //     ()=>{
                        //     console.warn('black')
                        //       //  this.setState({showImageViewer:true})
                        //
                        // }
                            this.getImage.bind(this)
                        }
                                          style={{
                                              flexDirection:'row',
                                              alignItems:'center',
                                              justifyContent:'center',
                                              width: '100%',

                                          }}
                        >
                            {
                                (this.state.avatarSource === undefined) ?
                                <View  style={{
                                width: screenWidth*0.18,height: screenWidth*0.18,borderRadius:screenWidth*0.18,
                                backgroundColor: 'black',
                            }}
                            >
                            </View> :
                                    <AutoHeightImage
                                        width={60}
                                        style={{borderRadius: 60,height: 60}}
                                        source={this.state.avatarSource}
                                    />
                            }
                        </TouchableOpacity>
                    </View>

                    <View style={{flexDirection:'column',alignItems:'center',width: '100%'}} >
                        <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center',width: '100%',paddingTop:10,left:screenWidth*0.01}} >
                            {this.state.editlabelrepas ?
                                <View style={{flexDirection:'row',alignItems:'center',alignSelf:'center'}}>
                                    <TextInput
                                               onChangeText={(text) => {
                                                   this.setState({ labelrepas: text })
                                               }}
                                               value={this.state.labelrepas}
                                               autoFocus={true}
                                               style={[ styles.inputTxt,{color:'white',fontSize:18,paddingBottom:0,}]} />
                                    <TouchableOpacity onPress={()=>{
                                        this.setState({editlabelrepas:false})
                                    }}>
                                        <Image
                                            style={{width: 20, height: 20,marginLeft:7}}
                                            source={require('../../../../assets/icons/tick.png')}
                                        /></TouchableOpacity>
                                </View>
                                :
                                <View style={{flexDirection:'row',alignItems:'center'}}>
                                    <Text style={{fontSize:18,color:'white'}}>{this.state.labelrepas}</Text>
                                    <TouchableOpacity onPress={()=>{
                                        this.setState({editlabelrepas:true})
                                    }}><Image
                                        style={{width: 18, height: 18,marginLeft:7}}
                                        source={require('../../../../assets/icons/edit.png')}
                                    />
                                    </TouchableOpacity>
                                </View>
                            }

                        </View>

                        <Text style={{fontSize:14,color:'#8da094',paddingTop:3}}>{ kilocalorie % 1 !== 0 ?  kilocalorie.toFixed(0) : kilocalorie} Kcal</Text>
                    </View>


                    <TouchableOpacity
                        onPress={()=>{
                            this.setState({showModalRepasyType:!this.state.showModalRepasyType})
                        }}
                        style={{flexDirection:'column',alignItems:'center',width: '100%'}} >
                        <Text style={{fontSize:14,color:'#8da094',paddingTop:3,marginBottom:5}}>{this.state.selectedRepasType}</Text>
                    </TouchableOpacity>

                </LinearGradient>

                <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }} colors={[colors.balck, colors.green,  '#213D2E']}
                                style={{
                                    height:screenHeight,
                                }}>

                    <View style={{
                        flexDirection:'row',
                        alignItems:'center',
                        justifyContent:'space-between',
                        width:'100%',
                        height:screenWidth*0.13,
                        backgroundColor:'#213D2E',
                        marginVertical:2,
                    }}>
                        <View style={{flexDirection:'column',alignItems:'center',width:'33.3%'}}>
                            <Text style={{color:'#b4c1b9',fontSize:12}}>Glucides</Text>
                            <Text style={{color:'#6e7a72',fontSize:12}}>{glucide % 1 !== 0 ? glucide.toFixed(0) : glucide}g</Text>
                        </View>
                        <View style={{flexDirection:'column',justifyContent:'center',alignItems:'center',width:'33.3%'}}>
                            <Text style={{color:'#8e9992',fontSize:12,}}>Protéines</Text>
                            <Text style={{color:'#6e7a72',fontSize:12}}>{proteine % 1 !== 0 ? proteine.toFixed(0) : proteine}g</Text>
                        </View>
                        <View style={{width:'33.3%',justifyContent:'center',alignItems:'center',marginRight:10,}}>
                            <Text style={{color:'#8e9992',fontSize:12,marginRight:20}}>Lipides</Text>
                            <Text style={{color:'#6e7a72',fontSize:12,marginRight:20}}>{lipide % 1 !== 0 ?  lipide.toFixed(0) : lipide}g</Text>
                        </View>
                    </View>

                    <ScrollView
                        keyboardShouldPersistTaps={'always'}
                        // refreshControl={
                        //     <RefreshControl
                        //         refreshing={this.state.refreshing}
                        //         onRefresh={() => {
                        //             this.setState({ refreshing: true })
                        //
                        //             //
                        //             setTimeout(() => {
                        //                 this.setState({ refreshing: false })
                        //             }, 2000)
                        //         }}
                        //     />
                        // }

                        contentContainerStyle={{width:'100%',paddingBottom: 1000}}>
                    <Text style={{color:'#8e9992',fontSize:17,marginRight:20,marginTop:15,alignSelf:'center'}}>MON ASSIETTE</Text>
                    <View style={{flexDirection:'row', justifyContent:'space-around'}}>
                        <View></View>
                        <TouchableOpacity
                            onPress={()=>{
                                if( this.props.navigation.navigate('itemAlimentForAdd')){}
                                else{
                                    this.props.navigation.navigate('itemAlimentForAdddashboard')
                                }
                            }}
                            style={{marginBottom:20,marginTop:15}}>
                            {/*Boutton*/}
                            <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} colors={[colors.red, 'rgb(229, 35, 48)', '#F93529']}
                                            style={{width:screenWidth*0.35,alignItems:'center',borderRadius:screenWidth * 0.06,height:screenWidth*0.06,justifyContent:'center'}}>
                                <Text style={{fontSize:12,color:'#F4B8BF'}}>
                                    {"SELECTIONNER"}
                                </Text>
                            </LinearGradient>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={()=>{
                                this.createPostRepas()
                            }}


                            style={{marginBottom:20,marginTop:15}}>
                            <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} colors={["gray", 'grey', 'gray']}
                                            style={{width:screenWidth*0.35,alignItems:'center',borderRadius:screenWidth * 0.06,height:screenWidth*0.06,justifyContent:'center'}}>
                                <Text style={{fontSize:12,color:'white'}}>
                                    {"ENREGISTRER"}
                                </Text>
                            </LinearGradient>
                        </TouchableOpacity>
                        <View></View>
                    </View>

                        <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }} colors={['#213D2E', colors.green,  '#213D2E']} style={{paddingBottom:0}}>
                            {
                                this.props.ArrayAlimentCreate.length > 0 && this.props.ArrayAlimentCreate.map(
                                    (item,index)=>{
                                        return(
                                            <View key={'monkey'+index} style={{flexDirection:'column',justifyContent:'flex-start',backgroundColor:'#14261D'}}>
                                                {/*<Text style={{color:'#7c8e85',paddingLeft:screenWidth*0.07,fontSize:13,paddingTop:2,paddingBottom:3}}>{item.namegroupealiment}</Text>*/}
                                                <View style={{  //item1
                                                    flexDirection:'row',
                                                    alignItems:'center',
                                                    justifyContent:'space-between',
                                                    width:'100%',
                                                    height:screenWidth*0.09,
                                                    backgroundColor:'#213D2E',
                                                    marginBottom:2
                                                }}>
                                                    <TouchableOpacity
                                                        style={{flexDirection:'row',alignItems:'center',width:'32%',height:screenWidth*0.09}}>
                                                        <View style={{borderRadius:screenWidth*0.04,width:screenWidth*0.04,height:screenWidth*0.04,backgroundColor:item.color,marginLeft:screenWidth*0.03}}/>
                                                        <Text style={{color:'#b4c1b9',marginLeft:10,fontSize:12}}>{item.name}</Text>
                                                    </TouchableOpacity>
                                                    <TouchableOpacity
                                                        style={{width:'25%',height:screenWidth*0.09,justifyContent: 'center',alignItems:'flex-start'}}>
                                                        <Text style={{color:'#8e9992',fontSize:11,paddingLeft:screenWidth*0.05}}>{item.is_portion? (item.portion_en_ml  > 0 ? ((item.quantite * item.portion_en_ml) * item.kilocalorie / 100).toFixed(0) : ((item.quantite * item.portion_en_g) * item.kilocalorie / 100).toFixed(0)) : (item.quantite * item.kilocalorie / 100).toFixed(0)} Kcal</Text>
                                                    </TouchableOpacity>
                                                    <View style={{width:'25%',justifyContent:'center',height:screenWidth*0.09,alignItems:'flex-start',paddingLeft:screenWidth*0.03}}>
                                                        <Text style={{color:'#8e9992',fontSize:11}}>Quantité : {item.quantite}</Text>
                                                    </View>
                                                    {/*<View style={{width:'25%',justifyContent:'center',marginRight:10,height:screenWidth*0.09}}>*/}
                                                    {/*    <TouchableOpacity*/}
                                                    {/*        onPress={() => {*/}
                                                    {/*            this.setState({item_a_ampitoviana:item});*/}
                                                    {/*            this._panel.onRequestStart()*/}
                                                    {/*        }}*/}

                                                    {/*        style={[this.ajouterstyle,{flexDirection:'row',alignItems: 'center',justifyContent: 'center'}]}>*/}
                                                    {/*        <Text style={{color:'white',fontSize:12}}>{item.quantite}</Text>*/}
                                                    {/*        <AutoHeightImage*/}
                                                    {/*            width={12}*/}
                                                    {/*            source={require("../../../../assets/icons/arrowdownwhite.png")}*/}
                                                    {/*            style={{marginLeft:5}}*/}
                                                    {/*        />*/}
                                                    {/*    </TouchableOpacity>*/}
                                                    {/*</View>*/}
                                                    <View style={{width:'20%',height:'100%',flexDirection:'row',alignItems:'center',justifyContent:'flex-end',marginRight:10}}>
                                                        <TouchableOpacity onPress={()=>{
                                                            console.warn('foodid',item.food_id);
                                                            let alimentss = {
                                                                id:item.food_id,
                                                                name:item.name,
                                                                kilocalorie: item.kilocalorie,
                                                                quantite:item.quantite,
                                                                color:item.color,
                                                                repas_type_id:item.repas_type_id,
                                                                food_id:item.food_id,
                                                                is_portion:item.is_portion
                                                            };
                                                            const item1 = {
                                                                id:item.food_id,
                                                                color:item.color,
                                                                name:item.name,
                                                                food_id:item.food_id,
                                                                is_portion:item.is_portion,
                                                                portion_en_g:item.portion_en_g,
                                                                repas_type_id:item.repas_type_id
                                                            };

                                                            if( this.props.navigation.navigate('MesProduits_NosSuggesstion_Item',{item:item,item1:item1,edit:true,aliment_id:item1.id,myfoodid:item1.food_id,alimentss:alimentss,addrepas:true})){}
                                                            else{
                                                                this.props.navigation.navigate('MesProduits_NosSuggesstion_Item_dashboard',{item:item,item1:item1,edit:true,aliment_id:item1.id,myfoodid:item1.food_id,alimentss:alimentss,addrepas:true})
                                                            }
                                                            console.warn('edit')
                                                        }}><Image
                                                            style={{width: 18, height: 18,marginLeft:7,marginRight:8}}
                                                            source={require('../../../../assets/icons/edit.png')}
                                                        />
                                                        </TouchableOpacity>
                                                        <TouchableOpacity onPress={async ()=>{

                                                            console.warn('edit')
                                                            let newarray=[];
                                                            for (let i = 0; i < this.props.ArrayAlimentCreate.length; i++){
                                                                let ici = this.props.ArrayAlimentCreate[i];
                                                                if(ici.food_id !== item.food_id){
                                                                    newarray.push(ici);
                                                                }
                                                            }

                                                            let suppr = { type: SET_ARRAY_ALIMENT_CREATE, value: newarray }
                                                            this.props.dispatch(suppr);
                                                            if(this.props.navigation.navigate("CreerRepas")){}
                                                            else{
                                                                this.props.navigation.navigate("CreerRepasDashboard")
                                                            }

                                                        }}
                                                                          style={{}}
                                                        >
                                                            <View  style={{width: 30,height: 30,marginRight:7,alignItems:'center',justifyContent: 'center'}}>
                                                                <Image
                                                                    style={{width: 18, height: 18,tintColor:'white'}}
                                                                    source={require('../../../../assets/icons/trash.png')}
                                                                />
                                                            </View>
                                                        </TouchableOpacity>
                                                    </View>
                                                </View>

                                                {/*{*/}
                                                {/*    (item.aliment.length>0 ) &&*/}
                                                {/*    <View style={{backgroundColor:'#213D2E',alignItems:'center',width: '100%',paddingTop:10}}>*/}
                                                {/*        <Text style={{color:'white',fontSize:15}}>Enregistrer comme repas</Text>*/}
                                                {/*    </View>*/}
                                                {/*}*/}
                                            </View>
                                        )
                                    }
                                )
                            }
                        </LinearGradient>
                    </ScrollView>
                </LinearGradient>

                <SlidingPanel
                    ref={c => this._panel = c}
                    headerLayoutHeight = {screenWidth*0.1}
                    slidingPanelLayoutHeight={30}
                    headerLayout = { () =>
                        <View style={{height: 30,width: screenWidth,
                            backgroundColor: '#FF3A28',
                            top: (phoneType === "iphoneX")?( (screenHeight*0.7) + 60) : (screenHeight*0.7) }}>
                            <View style={{flexDirection:'row',justifyContent: 'space-between',alignItems: 'center',
                                paddingTop:screenWidth*0.013,
                                paddingHorizontal:20
                            }}>
                                <TouchableOpacity

                                    onPress={() =>{ this._panel.onRequestClose()
                                        //de mis state quantite videna ato
                                    }}
                                >
                                    <Text style={{color:'white'}}>Annuler</Text>
                                </TouchableOpacity>
                                <Text style={{color:'white'}}>Quantité</Text>
                                <TouchableOpacity
                                    onPress={()=>{
                                        if(this.props.ArrayAlimentCreate.length>0){
                                            for(let i = 0; i < this.props.ArrayAlimentCreate.length; i++){
                                                let itemarray = this.props.ArrayAlimentCreate[i];

                                                if( this.state.item_a_ampitoviana.name == itemarray.name
                                                    && this.state.item_a_ampitoviana.repas_type_id == itemarray.repas_type_id
                                                    && this.state.item_a_ampitoviana.food_id == itemarray.food_id
                                                    && this.state.item_a_ampitoviana.name == itemarray.name
                                                    && this.state.item_a_ampitoviana.color == itemarray.color
                                                    && this.state.item_a_ampitoviana.namegroupealiment == itemarray.namegroupealiment
                                                ){
                                                    let ici = this.props.ArrayAlimentCreate;
                                                    ici[i].quantite = this.state.isSelectedquantite;

                                                    let setarrayalimentcreate = { type: SET_ARRAY_ALIMENT_CREATE, value: ici }
                                                    this.props.dispatch(setarrayalimentcreate);
                                                    this._panel.onRequestClose()
                                                }
                                            }
                                        }
                                    }}
                                >
                                    <Text style={{color:'white'}}>Ok</Text>
                                </TouchableOpacity>

                            </View>
                        </View>
                    }

                    slidingPanelLayout = { () =>
                        <View style={{width: screenWidth,
                            height: screenWidth*0.5,
                            backgroundColor: '#E6E6E6',
                            top: (phoneType === "iphoneX")?( (screenHeight*0.685) + 60) : (screenHeight*0.685)
                        }}>
                            <ScrollPicker
                                dataSource={this.state.datasourcequantite}
                                selectedIndex={1}
                                renderItem={(data, index, isSelected) => {
                                    //

                                }}
                                onValueChange={(data, selectedIndex) => {
                                    //
                                    this.setState({isSelectedquantite:selectedIndex}) //depart 0 == supprimer
                                }}
                                wrapperHeight={180}
                                wrapperWidth={screenWidth}
                                wrapperBackground={'#e6e6e6'}
                                itemHeight={60}
                                highlightColor={'#d8d8d8'}
                                highlightBorderWidth={2}
                                activeItemColor={'#222121'}
                                itemColor={'#B4B4B4'}
                            />
                        </View>
                    }
                />
                <Modal
                    visible={this.state.showModalRepasyType}
                    onRequestClose={() => {
                        this.setState({ showModalRepasyType: false })
                    }}
                    transparent={true}

                ><TouchableOpacity
                    onPress={() => {
                        this.setState({ showModalRepasyType: false })
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
                    <View style={{justifyContent:'center',alignItems:'center',flex:1}}>
                        <View style={{

                            paddingTop:10,
                            paddingBottom:10,
                            borderRadius: 5,
                            alignSelf: "center",
                            height:155,
                            backgroundColor: colors.white,
                        }}>
                            <ScrollView>
                                {
                                    this.props.repasType.map((item, index) => {
                                        return (
                                            <TouchableOpacity
                                                onPress={()=> {
                                                    console.warn('repas type id ',index + 1);
                                                    this.setState({selectedRepasType:item,showModalRepasyType:false,selectedRepasTypeID:index + 1})
                                                }}
                                                key={'key'+index}
                                                style={{
                                                    marginTop:2,paddingHorizontal:30, backgroundColor:colors.red, marginHorizontal:4, paddingVertical:4,color:'white'
                                                }}>
                                                <Text style={{color:'white'}}>{item}</Text>
                                            </TouchableOpacity>
                                        );
                                    })

                                }

                            </ScrollView>
                        </View>
                    </View>
                </Modal>
                <Modal
                    visible={this.state.showImageViewer}
                    onRequestClose={() => {
                        this.setState({ showImageViewer: false })
                    }}
                    transparent={true}
                >
                    <TouchableOpacity
                        onPress={() => {
                            this.setState({ showImageViewer: false })
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

                    { this.state.avatarSource !== undefined && <AutoHeightImage
                        width={screenWidth}
                        source={{uri:this.state.avatarSource.uri}}
                        style={{
                            marginTop: Platform.OS === 'ios' ? statusBarHeight : 0,
                            flex:1
                        }} />
                    }
                </Modal>
            </View>
        );
    }
}


const mapStateToProps = (state) => {
    const { selectedZone,repasType,ArrayAlimentCreate,userToken,paramRepasType } = state.statedata
    return { selectedZone,repasType,ArrayAlimentCreate,userToken,paramRepasType }
};

export default connect(mapStateToProps)(CreerRepas);

