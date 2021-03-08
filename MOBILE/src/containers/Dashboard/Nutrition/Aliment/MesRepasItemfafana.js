import * as React from 'react';
import { connect } from 'react-redux';
import {
    SET_ACTIVE_FP, SET_ACTIVE_TAB,
    SET_ARRAY_ALIMENT_CREATE,
    SET_ARRAY_ALIMENT_EDIT, SET_COLLATION_APRESMIDI, SET_COLLATION_MATIN, SET_DINER,
    SET_NOS_SUGGESTION, SET_PETITS_DEJEUNER_REPAS, SET_REFRESH_MESREPAS, SET_REPAS_DEJEUNER,
} from '../../../../redux/types/tabTypes';
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
    RefreshControl,
    Modal,
    Alert
} from 'react-native';
import Animated from 'react-native-reanimated';
import AutoHeightImage from 'react-native-auto-height-image';
import LinearGradient from "react-native-linear-gradient";
import colors from '../../../../configs/colors';
import compteurNutritionnelHelper from '../../../../apis/helpers/compteurNutritionnel_helper';
import ScrollPicker from 'react-native-wheel-scroll-picker';
import SlidingPanel from 'react-native-sliding-up-down-panels';
import styles from '../../../Training/NewTraining/styles';
import ImagePicker from 'react-native-image-picker';
import { ConfirmDialog } from 'react-native-simple-dialogs'
import statusBarHeight from '../../../../configs/screen';
import baseStyles from '../../../../base/BaseStyles';
import phoneType from '../../../../configs/typePhone';

const screen = Dimensions.get("window");
const screenWidth = screen.width
const screenHeight = screen.height

const options = {
    title: 'Séléctionner une photo',
    takePhotoButtonTitle: 'Prendre photo',
    chooseFromLibraryButtonTitle: 'Dépuis la librairie',
    quality: 0.4,
    cancelButtonTitle:'Annuler',
};

class CreerRepas  extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            refreshing:false,
            arraytomodify:[],
            selectedRepasType:null,
            selectedRepasTypeID:global.repas_type_id, //1 no teto taloha
            labelrepas:null,
            itemscrollablemesrepas: ["Petit déjeuner", "Déjeuner", "Collation matin", "Dîner","Collation après-midi"],
            showModalRepasyType:false,
            datasourcequantite:[0], //depart zero v
            isSelectedquantite:0,
            item_a_ampitoviana:null,
            actualisation:false,
            //imagepicker
            avatarSource:undefined,
            avatarSource_urlviaget:null,
            dataImage:null,
            fileName:null,
            type:null,
            iddurepas:0,
            dialogVisible:false,
            showImageViewer:false,
        };
        for(let i = 1; i<100; i++){
            this.state.datasourcequantite.push(i);
        }

        //this.props.navigation.state.params.item_id_repas ===io id a supprimer
        this.borderradiuscirclecolored = screenWidth * 0.04;
        this.ajouterstyle={width:screenWidth*0.13,height:screenWidth*0.06,backgroundColor:'#FF3A28',justifyContent:'center',alignItems:'center',borderRadius:4}

        this.nosSuggestions = [
            {
                id:1,
                name:'Produits frais',
                aliment:[
                    {id:1,name:'Oeuf',kilocalorie:30, quantite:3,color:'yellow'},
                ]
            },
            {
                id:2,
                name:'Viandes & poissons',
                aliment:[
                    {id:1,name:'Bacon',kilocalorie:948, quantite:3,color:'red'},
                    {id:2,name:'Bavette',kilocalorie:310, quantite:3,color:'red'},
                ]
            },
            {
                id:3,
                name:'Pain & pâtisseries',
                aliment:[
                    {id:1,name:'Pain de mie',kilocalorie:948, quantite:3,color:'yellow'},
                    {id:2,name:'Croissant',kilocalorie:948, quantite:3,color:'yellow'},
                ]
            },

            {
                id:4,
                name:'Fruits & légumes',
                aliment:[
                    {id:1,name:'Bananes',kilocalorie:948, quantite:3,color:'green'},
                    {id:2,name:'Pomme',kilocalorie:1000, quantite:3,color:'green'},
                    {id:2,name:'Poire',kilocalorie:150, quantite:30,color:'green'},
                    {id:2,name:'Courgette',kilocalorie:500, quantite:10,color:'green'},
                ]
            },
        ];
    }


    componentDidMount() {
        if(this.props.navigation){
            console.warn('item s',this.props.navigation.state.params.item_id_repas);
        }
        console.warn('miverina tonga')

        setInterval(()=>{
            this.setState({actualisation:!this.state.actualisation})
        },1000)

        this.getItemForEditMesRepas();
        this.setState({selectedRepasType:this.state.itemscrollablemesrepas[this.state.selectedRepasTypeID - 1]}) //initialisena petit dej
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
            console.warn('repas tonga via get ok',repasarray,repas)
            return null;
        }else{
            this.setState({refreshing: false})
            console.warn('repas tonga via get ok',repasarray,repas)
            return null;
        }
    };


    getImage(){
        this.setState({avatarSource:undefined});
        ImagePicker.showImagePicker(options, (response) => {
            this.setState({refreshing:true})
            if (response.didCancel) {
                this.setState({refreshing:false})
                console.log('User cancelled image picker');
            }
            else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
                this.setState({refreshing:false})
            }
            else if (response.customButton) {
                this.setState({refreshing:false})
                console.log('User tapped custom button: ', response.customButton);
            }
            else {
                let source = { uri: response.uri };
                this.setState({
                    avatarSource: source,
                    dataImage: response.data,
                    type: response.type,
                    fileName: response.fileName,
                });
                this.setState({refreshing:false})
                console.warn('response data',response)
            }
        });
    }


    suppressionrepas   = async () => {
        this.setState({refreshing: true});
        const suppressionrepas = await compteurNutritionnelHelper.suppressionrepas(
            this.props.userToken,
            this.state.iddurepas
        );
        if (suppressionrepas.success === true) {
            this.setState({refreshing: false});
            this.setState({dialogVisible: false});
            this.getViaPostRepas(this.state.selectedRepasTypeID).then(()=>{
                Alert.alert('Odgo','Suppression effectué avec succès.',[{
                    text:'Ok',
                    onPress:()=>{
                        this.setState({refreshing: true});
                        this.getViaPostRepas(this.state.selectedRepasTypeID).then(()=>{
                            this.props.dispatch({
                                type: SET_REFRESH_MESREPAS,
                                value: true
                            });
                            this.setState({refreshing: false});
                            if(this.props.navigation.navigate("Selectionnermesrepasdashboardbis")){ }else{
                                this.props.navigation.navigate('Selectionnermesrepasbis');
                            }
                        })
                    }
                }]);
            })
            //actualisation, na redirection
        }
    }

    editPostRepas  = async () => {
        if(this.props.ArrayAlimentEdit.length > 0){
            if(this.props.ArrayAlimentEdit[0].name === null && this.props.ArrayAlimentEdit[0].food_id === 0){
                Alert.alert('Odgo','Veuillez sélectionner au moins un aliment.')
            }else {
                //edit
                this.setState({refreshing: true});
                let aliments = []; //aliments izy ato am edit, fa aliment izy am creer
                for(let i = 0; i<this.props.ArrayAlimentEdit.length; i++) {
                    let imen = {  aliment_id : this.props.ArrayAlimentEdit[i].food_id, aliment_quantite: this.props.ArrayAlimentEdit[i].quantite}
                    aliments.push(imen)
                }
                let picture ={}
                picture.type = this.state.type
                picture.fileName = this.state.fileName
                picture.data = this.state.dataImage

                let datasend = {
                    id:this.state.iddurepas,
                    libelle:this.state.labelrepas
                };
                datasend.aliments = aliments;
                if(this.state.type !== null && this.state.fileName !== null &&  this.state.dataImage !== null){
                    datasend.picture = picture;
                }


                const saveEditionrepas = await compteurNutritionnelHelper.saveEditionrepas(
                    this.props.userToken,
                    datasend
                );
                if (saveEditionrepas.success === true) {
                    // monassiete redux
                    this.setState({refreshing: false});
                    Alert.alert('Odgo','Répas modifié avec succès.',[{
                        text:'Ok',
                        onPress:()=>{

                            this.getViaPostRepas(this.state.selectedRepasTypeID).then(()=>{
                                this.props.navigation.pop();//actualisena baba
                            })
                        }
                    }]);

                    console.warn("repas modifié",saveEditionrepas)
                }

            }
        }
    }

    getItemForEditMesRepas = async () => {
        this.setState({refreshing: true});
        const ItemForEditMesRepas = await compteurNutritionnelHelper.getItemForEditMesRepas(this.props.userToken,this.props.navigation.state.params.item_id_repas);
        if (ItemForEditMesRepas) {
            let ici = this.props.ArrayAlimentEdit;
            console.warn('ici mes repas item',ici);
            if(ItemForEditMesRepas.data.aliments.length>0){
                for(let i = 0; i<ItemForEditMesRepas.data.aliments.length; i++){
                    let item1 = ItemForEditMesRepas.data.aliments[i];
                    let repas_type_id = ItemForEditMesRepas.data.repas_type_id;
                    let food_id = item1.id;
                    let quantite = item1._joinData.quantite;
                    let name = item1.name;
                    //let color = item1.color;
                    let kilocalorie = item1.kcalorie_pour_100g;
                    let glucide = item1.glucide_pour_100g;
                    let proteine = item1.proteine_pour_100g;
                    let lipide = item1.lipide_pour_100g;
                    let portion_en_g = item1.portion_en_g;

                    let items = {
                        repas_type_id:repas_type_id,
                        food_id:food_id,
                        quantite:quantite,
                        name:name,
                        //color:color,
                    //    namegroupealiment:item1.name,
                        kilocalorie:kilocalorie,
                        glucide:glucide,
                        proteine:proteine,
                        lipide:lipide,
                        portion_en_g:portion_en_g,
                    };
                   ici.push(items);
                  //  this.props.ArrayAlimentEdit.push(items)
                }
            }else{
                let repas_type_id = ItemForEditMesRepas.data.repas_type_id;
                let food_id = 0; //0 na null
                let quantite = 0;
                let name = null;
                //let color = item1.color;
                let kilocalorie = 0;
                let glucide = 0;
                let proteine = 0;
                let lipide = 0;
                let portion_en_g = 0;

                let items = {
                    repas_type_id:repas_type_id,
                    food_id:food_id,
                    quantite:quantite,
                    name:name,
                    //color:color,
                  //  namegroupealiment:ItemForEditMesRepas.data.libelle,
                    kilocalorie:kilocalorie,
                    glucide:glucide,
                    proteine:proteine,
                    lipide:lipide,
                    portion_en_g:portion_en_g,
                };
                ici.push(items);
            }
            let setarrayalimentcreate = { type: SET_ARRAY_ALIMENT_EDIT, value: ici}
            this.props.dispatch(setarrayalimentcreate);
            this.setState({labelrepas :ItemForEditMesRepas.data.libelle})
            this.setState({avatarSource_urlviaget :ItemForEditMesRepas.data.picture})
            this.setState({selectedRepasTypeID :ItemForEditMesRepas.data.repas_type_id})
            this.setState({iddurepas :ItemForEditMesRepas.data.id})

            let defaultparamRepasType = null;
            switch (ItemForEditMesRepas.data.repas_type_id) {
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
            this.setState({selectedRepasType :defaultparamRepasType})
            this.setState({refreshing: false});
        }else{
            this.setState({iddurepas : this.props.navigation.state.params.item_id_repas});
            this.setState({refreshing:false})
        }
    }

    render() {
        let glucide = 0;
        let proteine = 0;
        let lipide = 0;
        let kilocalorie = 0;
        for(let i = 0 ; i < this.props.ArrayAlimentEdit.length; i++){
            let portion_en_g = this.props.ArrayAlimentEdit[i].portion_en_g;

            glucide += (portion_en_g * this.props.ArrayAlimentEdit[i].glucide) / 100;
            proteine += (portion_en_g * this.props.ArrayAlimentEdit[i].proteine) / 100;
            lipide += (portion_en_g * this.props.ArrayAlimentEdit[i].lipide) / 100;

            kilocalorie += (portion_en_g * this.props.ArrayAlimentEdit[i].kilocalorie) / 100;

        }

        return (
            <View style={{flex:1}}>
                <ConfirmDialog
                    visible={this.state.dialogVisible}
                    title="Suppression"
                    message="Voulez-vous vraiment supprimer ce repas?"
                    onTouchOutside={() => this.setState({dialogVisible: false})}
                    positiveButton={{
                        title: "Oui",
                        onPress: () => this.suppressionrepas()
                    }}
                    negativeButton={{
                        title: "Non",
                        onPress: () =>  this.setState({dialogVisible: false})
                    }}
                />

                <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }} colors={[colors.balck, colors.green,  '#213D2E']} style={{
                    //height:screenWidth*0.41,
                    justifyContent: 'center',alignItems:'center'}}>

                    <View style={{ alignItems :"center",justifyContent:"center",width:"100%",marginTop:15  }}>
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
                            {"Mes repas"}
                        </Text>
                    </View>
                    <View style={{}}>
                        <TouchableOpacity onPress={()=>{
                            this.setState({refreshing: true});
                           
                            this.setState({dialogVisible:true})
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
                        //   //  this.setState({showImageViewer:true})
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
                                   ( this.state.avatarSource_urlviaget !== null && <AutoHeightImage
                                    width={60}
                                        style={{borderRadius: 60,height: 60}}
                                        source={{uri:this.state.avatarSource_urlviaget}}
                                     />)
                                    :
                                    <AutoHeightImage
                                        width={60}
                                        style={{borderRadius: 60,height: 60}}
                                        source={this.state.avatarSource}
                                    />
                            }
                        </TouchableOpacity>
                    </View>

                    <View style={{flexDirection:'column',alignItems:'center',width: '100%'}} >
                        <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center',width: '100%',paddingTop:10}} >
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
                        <Text style={{fontSize:14,color:'#8da094',paddingTop:3}}>{kilocalorie}kcal</Text>
                    </View>

                    <View
                        // onPress={()=>{
                        //   //  this.setState({showModalRepasyType:!this.state.showModalRepasyType})
                        // }}
                        style={{flexDirection:'column',alignItems:'center',width: '100%'}} >
                        <Text style={{fontSize:14,color:'#8da094',paddingTop:3,marginBottom:5}}>{this.state.selectedRepasType}</Text>
                    </View>
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
                            <Text style={{color:'#6e7a72',fontSize:12}}>{glucide}g</Text>
                        </View>
                        <View style={{flexDirection:'column',justifyContent:'center',alignItems:'center',width:'33.3%'}}>
                            <Text style={{color:'#8e9992',fontSize:12,}}>Protéines</Text>
                            <Text style={{color:'#6e7a72',fontSize:12}}>{proteine}g</Text>
                        </View>
                        <View style={{width:'33.3%',justifyContent:'center',alignItems:'center',marginRight:10,}}>
                            <Text style={{color:'#8e9992',fontSize:12,marginRight:20}}>Lipides</Text>
                            <Text style={{color:'#6e7a72',fontSize:12,marginRight:20}}>{lipide}g</Text>
                        </View>
                    </View>
                    <ScrollView
                        refreshControl={
                                <RefreshControl
                                    refreshing={this.state.refreshing}
                                    onRefresh={() => {

                                        this.setState({ refreshing: true })
                                        setTimeout(() => {
                                            this.setState({ refreshing: false })
                                        }, 2000)
                                    }}
                                />
                            }
                            contentContainerStyle={{paddingBottom:200}}

                    >
                    <Text style={{color:'#8e9992',fontSize:17,marginRight:20,marginTop:15,alignSelf:'center'}}>MON ASSIETTE</Text>
                    <View style={{flexDirection:'row', justifyContent:'space-around'}}>
                        <View></View>
                        <TouchableOpacity
                            onPress={()=>{
                                if( this.props.navigation.navigate('itemAlimentForEdit')){}
                                else{
                                    this.props.navigation.navigate('itemAlimentForEditdashboard')
                                }
                            }}
                            style={{marginBottom:20,marginTop:15}}>
                            {/*Boutton*/}
                            <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} colors={[colors.red, 'rgb(229, 35, 48)', '#F93529']}
                                            style={{width:screenWidth*0.35,alignItems:'center',borderRadius:15,height:screenWidth*0.06,justifyContent:'center'}}>
                                <Text style={{fontSize:12,color:'#F4B8BF'}}>
                                    {"SELECTIONNER"}
                                </Text>
                            </LinearGradient>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={()=>{
                                this.editPostRepas()
                            }}
                            style={{marginBottom:20,marginTop:15}}
                        ><LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} colors={["gray", 'grey', 'gray']}
                                            style={{width:screenWidth*0.35,alignItems:'center',borderRadius:15,height:screenWidth*0.06,justifyContent:'center'}}>
                                <Text style={{fontSize:12,color:'white'}}>
                                    {"ENREGISTRER"}
                                </Text>
                            </LinearGradient>
                        </TouchableOpacity>
                        <View></View>
                    </View>
                        {
                            this.props.ArrayAlimentEdit.length > 0 && (
                                (this.props.ArrayAlimentEdit[0].name !== null && this.props.ArrayAlimentEdit[0].food_id !== 0 ) &&
                                this.props.ArrayAlimentEdit.map(
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
                                            }}><TouchableOpacity
                                                    style={{flexDirection:'row',alignItems:'center',width:'32%',height:screenWidth*0.09}}>
                                                    <View style={{borderRadius:screenWidth*0.04,width:screenWidth*0.04,height:screenWidth*0.04,backgroundColor:item.color,marginLeft:screenWidth*0.03}}/>
                                                    <Text style={{color:'#b4c1b9',marginLeft:20,fontSize:12}}>{item.name}</Text>
                                                </TouchableOpacity>
                                                <TouchableOpacity
                                                    style={{width:'25%',height:screenWidth*0.09,justifyContent: 'center',alignItems:'flex-start'}}>
                                                    <Text style={{color:'#8e9992',fontSize:11,paddingLeft:screenWidth*0.05}}>{item.kilocalorie} Kcal</Text>
                                                </TouchableOpacity>
                                                <View style={{width:'25%',justifyContent:'center',height:screenWidth*0.09,alignItems:'flex-start',paddingLeft:screenWidth*0.03}}>
                                                    <Text style={{color:'#8e9992',fontSize:11}}>Quantité : {item.quantite}</Text>
                                                </View>
                                                <View style={{width:'25%',justifyContent:'center',marginRight:10,height:screenWidth*0.09}}>
                                                    <TouchableOpacity
                                                        onPress={() => {
                                                            this.setState({item_a_ampitoviana:item});
                                                            this._panel.onRequestStart()
                                                        }}

                                                        style={[this.ajouterstyle,{flexDirection:'row',alignItems: 'center',justifyContent: 'center'}]}>
                                                        <Text style={{color:'white',fontSize:12}}>{item.quantite}</Text>
                                                        <AutoHeightImage
                                                            width={12}
                                                            source={require("../../../../assets/icons/arrowdownwhite.png")}
                                                            style={{marginLeft:5}}
                                                        />
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
                            ))
                        }

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
                                        for(let i = 0; i < this.props.ArrayAlimentEdit.length; i++){
                                            let itemarray = this.props.ArrayAlimentEdit[i];

                                            if( this.state.item_a_ampitoviana.name == itemarray.name
                                                && this.state.item_a_ampitoviana.repas_type_id == itemarray.repas_type_id
                                                && this.state.item_a_ampitoviana.food_id == itemarray.food_id
                                                && this.state.item_a_ampitoviana.name == itemarray.name
                                                && this.state.item_a_ampitoviana.color == itemarray.color
                                                && this.state.item_a_ampitoviana.namegroupealiment == itemarray.namegroupealiment
                                            ){
                                                let ici = this.props.ArrayAlimentEdit;
                                                ici[i].quantite = this.state.isSelectedquantite;

                                                let setArrayAlimentEdit = { type: SET_ARRAY_ALIMENT_EDIT, value: ici }
                                                this.props.dispatch(setArrayAlimentEdit);
                                                this._panel.onRequestClose()
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
                    // TSY MIASA
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
                                    this.state.itemscrollablemesrepas.map((item, index) => {
                                        return (
                                            <TouchableOpacity
                                                onPress={()=> {
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

                    { this.state.avatarSource !== undefined ? <AutoHeightImage
                        width={screenWidth}
                        source={{uri:this.state.avatarSource.uri}}
                        style={{
                            marginTop: Platform.OS === 'ios' ? statusBarHeight : 0,
                            flex:1
                        }} />
                        :
                        <AutoHeightImage
                        width={screenWidth}
                        source={{uri:this.state.avatarSource_urlviaget}}
                        style={{
                        flex:1
                    }} />
                    }
                </Modal>
            </View>
        );
    }
}


const mapStateToProps = (state) => {
    const { selectedZone,userToken,ArrayAlimentEdit } = state.statedata
    return { selectedZone,userToken,ArrayAlimentEdit }
};

export default connect(mapStateToProps)(CreerRepas);

