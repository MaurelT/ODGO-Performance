import * as React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import {
    SET_ACTIVE_FP,
    SET_POP_TO_TOP,
    SET_NOS_SUGGESTION,
    SET_REPAS_TYPE,
    SET_PETITS_DEJEUNER,
    SET_PETITS_DEJEUNER_REPAS,
    SET_COMPTEUR_NUTRITIONNEL,
    SET_MON_ASSIETTE,
    SET_ARRAY_ALIMENT_EDIT,
    SET_REPAS_DEJEUNER,
    SET_COLLATION_MATIN,
    SET_COLLATION_APRESMIDI,
    SET_DINER,
    SET_PETITS_DEJEUNERD,
    SET_PETITS_COLLATION_MATIND, SET_DEJEUNERD, SET_COLLATION_APRESMIDID, SET_DINERD, SET_ARRAY_ALIMENT_CREATE,
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
    RefreshControl, Alert,
} from 'react-native';
import { TabView, SceneMap,TabBar } from 'react-native-tab-view';
import Animated from 'react-native-reanimated';
import AutoHeightImage from 'react-native-auto-height-image';
import LinearGradient from "react-native-linear-gradient";
import colors from '../../../../configs/colors';
import compteurNutritionnelHelper from '../../../../apis/helpers/compteurNutritionnel_helper';
import pathologieHelper from '../../../../apis/helpers/pathologie_helper';
import {screenHeight} from '../../../../components/react-native-calendars/src/expandableCalendar/commons';
import Loading from '../../../../components/Load/loading';
import {getViaPostPetitsDejeuner, monassiete,getSelectionnerNosSuggestion,getViaPostRepas} from '../../../../apis/FonctionRedondant';
import SearchInput, { createFilter } from 'react-native-search-filter';
import {Keyboard} from 'react-native'
import moment from 'moment';

const screen = Dimensions.get("window");
const screenWidth = screen.width

// const { navigate } = this.props.route.navigation;

this.ajouterstyle={width:screenWidth*0.2,height:screenWidth*0.06,backgroundColor:'#FF3A28',justifyContent:'center',alignItems:'center',borderRadius:6}
this.borderradiuscirclecolored = screenWidth * 0.04;

const KEYS_TO_FILTERS0 = ['name'
    //'aliments.name','aliments.kcalorie_pour_100g'
];

const KEYS_TO_FILTERS1 = [//aliments
    'name','kcalorie_pour_100g'
];

class Petitdejeuner  extends Component {


    constructor(props) {
        super(props)
        this.state = {
            index: 1,
            itemscrollablemesrepas: ["Petit-déjeuner", "Déjeuner", "Collation", "Dîner"],
            indexrepas: global.repas_type_id - 1,
            navigation:this.props.navigation,
            routes: [
                {key: 'first', title: 'Nos suggestions'},
                {key: 'second', title: 'Mes repas'},
                // {key: 'third', title: 'Consommé récemment'}
            ],
            refreshing:false,
            refreshingy:false,
            dejeuner:[],
            collationmatin:[],
            diner:[],
            collationapresmidi:[],
            textSearch:'',
            filteredNosSuggestionfiltered:[],
            filteredEatRecentlyfiltered:[],

            //second route
            filteredmesRepaspetitsdejeunerfiltered:[],
            filteredCollationmatinfiltered:[],
            filteredDejeunerfiltered:[],
            filteredCollationApresMidifiltered:[],
            filteredDinerfiltered:[],

            actualisation:false,
            shortdayofweekone:['dim.','lun.','mar.','mer.','jeu.','ven.','sam.'],
            nowdate:moment(new Date()).day(),

        };




        this.mesRepas= [
            {
                id:1,name:'Oeuf Bacon',kilocalorie:30, thumbnail:'https://theme4press.com/wp-content/uploads/2015/11/featured-small-circular.jpg'
            },
            {
                id:2,name:'Oeuf Bacon',kilocalorie:30, thumbnail:'https://theme4press.com/wp-content/uploads/2015/11/featured-small-circular.jpg'
            },
            {
                id:3,name:'Oeuf Bacon',kilocalorie:948, thumbnail:'https://theme4press.com/wp-content/uploads/2015/11/featured-small-circular.jpg'
            },
        ]

        this.ajouterstyle={width:screenWidth*0.1,height:screenWidth*0.06,backgroundColor:'#FF3A28',justifyContent:'center',alignItems:'center',borderRadius:6,}

    }


    componentDidMount() {

        // this.setState({refreshing: true});
        // getSelectionnerNosSuggestion(compteurNutritionnelHelper,this.props).then((refreshingfalse)=>{
        //     this.setState({
        //         refreshing: refreshingfalse
        //     })
        // });
        console.warn('screenwidth',screenWidth)
        this.RepasTypes();
        setTimeout(()=>{
            this.setState({refreshing: false})
        },10000)
    }

    getCompteurNutritionnelViaAjouterMesRepas = async () => {
        const compteurNutritionnel = await compteurNutritionnelHelper.getCompteurNutritionnel(this.props.userToken);
        if (compteurNutritionnel) {
            return compteurNutritionnel;
        }
    };

    getalldata(index_repas_,venuderefresh){ //index repas
        console.warn('kkk index repas',index_repas_);
        // getSelectionnerNosSuggestion(compteurNutritionnelHelper,this.props).then((refreshingfalse)=>{
        //     this.setState({
        //         refreshing: refreshingfalse
        //     })
        // });
        // this.RepasTypes(); tsy alaiko am all data intson le repas type ka, toy izay koa nos suggestion sy eat recently

        if(venuderefresh === true){
            if(this.state.indexrepas === 0 ){ //petit dejeuner
                console.warn('maka petits dej')
                getViaPostRepas(compteurNutritionnelHelper,this.props,1)
            } else  if(this.state.indexrepas === 1 ){ //collation matin

                getViaPostRepas(compteurNutritionnelHelper,this.props,2)
            }else  if(this.state.indexrepas === 2 ){//dejeuener

                getViaPostRepas(compteurNutritionnelHelper,this.props,3)
            } else if(this.state.indexrepas === 3){//collation apresmidi

                getViaPostRepas(compteurNutritionnelHelper,this.props,4)
            } else if(this.state.indexrepas === 4){ //diner

                getViaPostRepas(compteurNutritionnelHelper,this.props,5)
            }
        }else{
            if(index_repas_ === 0 ){ //petit dejeuner
                console.warn('maka petits dej')
                getViaPostRepas(compteurNutritionnelHelper,this.props,1)
            } else  if(index_repas_ === 1 ){

                getViaPostRepas(compteurNutritionnelHelper,this.props,2)
            }else  if(index_repas_ === 2 ){

                getViaPostRepas(compteurNutritionnelHelper,this.props,3)
            } else if(index_repas_ === 3){

                getViaPostRepas(compteurNutritionnelHelper,this.props,4)
            } else if(index_repas_ === 4){

                getViaPostRepas(compteurNutritionnelHelper,this.props,5)
            }
        }
    }


    RepasTypes  = async () => {
        this.setState({refreshing: true});
        let setrepasType = { type: SET_REPAS_TYPE, value: [] }
        this.props.dispatch(setrepasType);
        const repasTypes = await compteurNutritionnelHelper.getRepasType(this.props.userToken);
        if (repasTypes) {
            let arrayrepasTypes = [];
            for(let i=0;i<repasTypes.data.length;i++){
                arrayrepasTypes.push(repasTypes.data[i].name)
            }
            let setrepasType = { type: SET_REPAS_TYPE, value: arrayrepasTypes }
            this.props.dispatch(setrepasType);
            this.setState({refreshing: false});

        }
    };




    // getViaPostCollationmatin

    // getViaPostDejeuner

    // getViaPostdiner

    // getViaPostCollationapresmidi

    save_food = async (repas_type_id,food_id) => {
        this.setState({refreshing: true});
        const saveMesRepas = await compteurNutritionnelHelper.save_food(
            this.props.userToken,
            repas_type_id,
            food_id
        );

        if (saveMesRepas) {
            // monassiete redux
            const setmonassiette = { type: SET_MON_ASSIETTE, value: [] };
            this.props.dispatch(setmonassiette);
            monassiete(compteurNutritionnelHelper,this.props,repas_type_id).then((refreshingfalse)=>{
                this.setState({
                    refreshing: refreshingfalse
                },()=>{
                    this.getCompteurNutritionnelViaAjouterMesRepas().then((data)=>{ //tsy mandeha
                        switch(global.repas_type_id){
                            case 1 :
                                try{
                                    const  PetitsDejeuner = data.data[this.state.shortdayofweekone[this.state.nowdate]].repas['1'];
                                    let setPetitsDejeuner = { type: SET_PETITS_DEJEUNERD, value: PetitsDejeuner };
                                    this.props.dispatch(setPetitsDejeuner);
                                }catch (e) {  }
                                break;

                            case 2 :
                                try{
                                    const  Collationmatin = data.data[this.state.shortdayofweekone[this.state.nowdate]].repas['2'];
                                    let setCollationmatin = { type: SET_PETITS_COLLATION_MATIND, value: Collationmatin };
                                    this.props.dispatch(setCollationmatin);
                                }catch (e) {  }
                                break;

                            case 3 :
                                try{
                                    const  Dejeuner = data.data[this.state.shortdayofweekone[this.state.nowdate]].repas['3'];
                                    let setDejeuner = { type: SET_DEJEUNERD, value: Dejeuner };
                                    this.props.dispatch(setDejeuner);
                                }catch (e) {  }
                                break;

                            case 4 :
                                try{
                                    const  CollationApresmidi = data.data[this.state.shortdayofweekone[this.state.nowdate]].repas['4'];
                                    let setCollationApresmidi = { type: SET_COLLATION_APRESMIDID, value: CollationApresmidi };
                                    this.props.dispatch(setCollationApresmidi);
                                }catch (e) {  }
                                break;

                            case 5 :
                                console.warn('din',data.data[this.state.shortdayofweekone[this.state.nowdate]].repas['5'])
                                try{
                                    const  Diner = data.data[this.state.shortdayofweekone[this.state.nowdate]].repas['5'];
                                    let setDiner = { type: SET_DINERD, value: Diner };
                                    this.props.dispatch(setDiner);
                                }catch (e) {  }
                                break;

                            default:
                                try{
                                    const  PetitsDejeuner = data.data[this.state.shortdayofweekone[this.state.nowdate]].repas['1'];
                                    let setPetitsDejeuner = { type: SET_PETITS_DEJEUNERD, value: PetitsDejeuner };
                                    this.props.dispatch(setPetitsDejeuner);
                                }catch (e) {  }
                        }
                    });
                    Alert.alert('Odgo','Aliment ajouté avec succès.',[{
                        text :'Ok',
                        onPress :()=>{

                            if( this.props.navigation.navigate('Petitdejeuner')){} //redirection de actualisation atao
                            else {
                                this.props.navigation.navigate('Petitdejeuners')
                            }

                        }
                    }]);
                })
            });
            console.warn("saved food",saveMesRepas)
        }
    };



    save_alimentMesRepas = async (idaliment) => {
        this.setState({refreshing: true});
        const saveMesRepas = await compteurNutritionnelHelper.save_alimentMesRepas(
            this.props.userToken,
            idaliment
        );
        if (saveMesRepas) {
            this.setState({refreshing: false});
            Alert.alert('Odgo','Répas ajouté avec succès.',[{
                text:'Ok',onPress:()=>{
                    this.getCompteurNutritionnelViaAjouterMesRepas().then(()=>{
                        if( this.props.navigation.navigate('CompteurNutritionnels')){}
                        else {
                            this.props.navigation.navigate('CompteurNutritionnel')
                        }
                    })
                }
            }]);
        }
    };


    getCompteurNutritionnelViaAjouterMesRepas = async () => { //alaina le fonction evit redondant iny fa efa mis any
        this.setState({refreshing: true});
        const compteurNutritionnel = await compteurNutritionnelHelper.getCompteurNutritionnel(this.props.userToken);
        if (compteurNutritionnel) {
            const setcompteurNutritionnel = {type: SET_COMPTEUR_NUTRITIONNEL, value: compteurNutritionnel};
            this.props.dispatch(setcompteurNutritionnel);
            this.setState({refreshing: false});
        }
    };



    FirstRoute = () => {
        return(
            <ScrollView
                keyboardShouldPersistTaps={'always'}
                refreshControl={
                    <RefreshControl
                        refreshing={this.state.refreshingy} //tsy  baikon'ny refreshing intson, fa nataoko amny  loading
                        onRefresh={() => {
                            this. getalldata(null,true);
                            console.warn('nos suggestion firts',this.props.nosSuggestions)
                            this.setState({ refreshingy: true })
                            setTimeout(() => {
                                this.setState({ refreshingy: false })
                            }, 2000)
                        }}
                    />
                }

                style={{width:'100%',marginTop:screenWidth*0.03,paddingBottom:screenWidth*0.3}}>
                <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }} colors={[colors.balck, colors.green,  '#213D2E']} style={{paddingBottom:screenWidth*0.12,flex:1}}>
                    {
                        this.props.nosSuggestions.length > 0 && this.props.nosSuggestions.map(
                            (item)=>{
                                return(
                                    <View style={{flexDirection:'column',justifyContent:'flex-start',backgroundColor:'#14261D'}}>
                                        <Text style={{color:'#7c8e85',paddingLeft:screenWidth*0.07,fontSize:13,paddingTop:2,paddingBottom:3}}>{item.name}</Text>
                                        {
                                            item.aliment.length>0 && item.aliment.map(
                                                (item1)=>{
                                                    return(
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
                                                                onPress={()=>{
                                                                    // let dataForMesProduitsItem = {
                                                                    //     id:,
                                                                    //     name:,
                                                                    //     kilocalorie:,
                                                                    //     quantite:,
                                                                    //     glucide:,
                                                                    //     proteine:,
                                                                    //     lipide:,
                                                                    // };

                                                                    if( this.props.navigation.navigate('MesProduits_NosSuggesstion_Item',{item:item,item1:item1})){}
                                                                    else{
                                                                        this.props.navigation.navigate('MesProduits_NosSuggesstion_Item_dashboard',{item:item,item1:item1})
                                                                    }
                                                                }}
                                                                style={{flexDirection:'row',alignItems:'center',width:'39%',height:screenWidth*0.09}}>
                                                                <View style={{borderRadius:screenWidth*0.04,width:screenWidth*0.04,height:screenWidth*0.04,backgroundColor:item1.color,marginLeft:screenWidth*0.02}}/>
                                                                <View style={screenWidth <= 360 ? {width:90} :{width:screenWidth*0.3}}><Text style={{color:'#b4c1b9',marginLeft:10,fontSize:12}}>{item1.name}</Text></View>
                                                            </TouchableOpacity>
                                                            <TouchableOpacity
                                                                onPress={()=>{
                                                                    if( this.props.navigation.navigate('MesProduits_NosSuggesstion_Item',{item:item,item1:item1})){}
                                                                    else{
                                                                        this.props.navigation.navigate('MesProduits_NosSuggesstion_Item_dashboard',{item:item,item1:item1})
                                                                    }
                                                                }}
                                                                style={{width:'19%',height:screenWidth*0.09,justifyContent: 'center',alignItems:'flex-start'}}>
                                                                <Text style={{color:'#8e9992',fontSize:11,paddingLeft:screenWidth*0.05}}>{item1.kilocalorie} Kcal</Text>
                                                            </TouchableOpacity>
                                                            {/*<View style={{}}>*/}
                                                            <View style={{width:'29%',justifyContent:'center',height:screenWidth*0.09,alignItems:'flex-start',paddingLeft:screenWidth*0.03}}>
                                                                <Text style={{color:'#8e9992',fontSize:11,textAlign:'center'}}>Qté suggérée: {item1.quantite}</Text>
                                                            </View>
                                                            <View style={{width:'12%',justifyContent:'center',alignItems:'flex-end',marginRight:10,height:screenWidth*0.09}}>
                                                                <TouchableOpacity
                                                                    onPress={()=>{
                                                                        let repas_type_id = item1.repas_type_id;
                                                                        let food_id = item1.food_id;
                                                                        //satria petitsdejeuner le firstroute eto de 1
                                                                        // "data": [
                                                                        //     {
                                                                        //         "id": 1,
                                                                        //         "name": "Petit déjeuner"
                                                                        //     },
                                                                        //     {
                                                                        //         "id": 2,
                                                                        //         "name": "Collation matin"
                                                                        //     },
                                                                        //     {
                                                                        //         "id": 3,
                                                                        //         "name": "Déjeuner"
                                                                        //     },
                                                                        //     {
                                                                        //         "id": 4,
                                                                        //         "name": "Collation après-midi"
                                                                        //     },
                                                                        //     {
                                                                        //         "id": 5,
                                                                        //         "name": "Diner"
                                                                        //     }
                                                                        // ]
                                                                        console.warn('save food',global.repas_type_id,food_id)
                                                                        this.save_food(global.repas_type_id,food_id);
                                                                    }}

                                                                    style={this.ajouterstyle}>
                                                                    {/*ajouter*/}
                                                                    <Text style={{color:'white',fontSize:12}}>{'+'}</Text>
                                                                </TouchableOpacity>
                                                            </View>
                                                        </View>
                                                    )
                                                }
                                            )}
                                    </View>
                                )
                            }
                        )
                    }
                </LinearGradient>
            </ScrollView>
        );};

    FirstRouteSearch_NosSuggestion = () => {
        return(
            <ScrollView
                keyboardShouldPersistTaps={'always'}
                refreshControl={
                    <RefreshControl
                        refreshing={this.state.refreshingy} //tsy  baikon'ny refreshing intson, fa nataoko amny  loading
                        onRefresh={() => {
                            this. getalldata(null,true);
                            console.warn('nos suggestion firts',this.props.nosSuggestions)
                            this.setState({ refreshingy: true })
                            setTimeout(() => {
                                this.setState({ refreshingy: false })
                            }, 2000)
                        }}
                    />
                }

                style={{width:'100%',marginTop:screenWidth*0.03,paddingBottom:screenWidth*0.3}}>
                <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }} colors={[colors.balck, colors.green,  '#213D2E']} style={{paddingBottom:screenWidth*0.12,flex:1}}>
                    {
                        this.state.filteredNosSuggestionfiltered.length > 0 ?
                            this.state.filteredNosSuggestionfiltered.map(
                                (item)=>{
                                    return(
                                        <View style={{flexDirection:'column',justifyContent:'flex-start',backgroundColor:'#14261D'}}>
                                            <Text style={{color:'#7c8e85',paddingLeft:screenWidth*0.07,fontSize:13,paddingTop:2,paddingBottom:3}}>{item.name}</Text>
                                            {
                                                item.aliment.length>0 && item.aliment.map(
                                                    (item1)=>{
                                                        console.warn(item1.color)
                                                        return(
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
                                                                    onPress={()=>{
                                                                        // let dataForMesProduitsItem = {
                                                                        //     id:,
                                                                        //     name:,
                                                                        //     kilocalorie:,
                                                                        //     quantite:,
                                                                        //     glucide:,
                                                                        //     proteine:,
                                                                        //     lipide:,
                                                                        // };

                                                                        if( this.props.navigation.navigate('MesProduits_NosSuggesstion_Item',{item:item,item1:item1})){}
                                                                        else{
                                                                            this.props.navigation.navigate('MesProduits_NosSuggesstion_Item_dashboard',{item:item,item1:item1})
                                                                        }
                                                                    }}
                                                                    style={{flexDirection:'row',alignItems:'center',width:'39%',height:screenWidth*0.09}}>
                                                                    <View style={{borderRadius:screenWidth*0.04,width:screenWidth*0.04,height:screenWidth*0.04,backgroundColor:item1.color,marginLeft:screenWidth*0.03}}/>
                                                                    <View style={screenWidth <= 360 ? {width:90} :{width:screenWidth*0.3}}><Text style={{color:'#b4c1b9',marginLeft:10,fontSize:12}}>{item1.name}</Text></View>
                                                                </TouchableOpacity>
                                                                <TouchableOpacity
                                                                    onPress={()=>{
                                                                        if( this.props.navigation.navigate('MesProduits_NosSuggesstion_Item',{item:item,item1:item1})){}
                                                                        else{
                                                                            this.props.navigation.navigate('MesProduits_NosSuggesstion_Item_dashboard',{item:item,item1:item1})
                                                                        }
                                                                    }}
                                                                    style={{width:'19%',height:screenWidth*0.09,justifyContent: 'center',alignItems:'flex-start'}}>
                                                                    <Text style={{color:'#8e9992',fontSize:11,paddingLeft:screenWidth*0.05}}>{item1.kilocalorie} Kcal</Text>
                                                                </TouchableOpacity>
                                                                {/*<View style={{}}>*/}
                                                                <View style={{width:'29%',height:screenWidth*0.09,alignItems:'flex-start',paddingLeft:screenWidth*0.03}}>
                                                                    <Text style={{color:'#8e9992',fontSize:11,textAlign:'center'}}>Qté suggérée: {item1.quantite}</Text>
                                                                </View>
                                                                <View style={{width:'12%',justifyContent:'center',alignItems:'flex-end',marginRight:10,height:screenWidth*0.09}}>
                                                                    <TouchableOpacity
                                                                        onPress={()=>{
                                                                            let repas_type_id = item1.repas_type_id;
                                                                            let food_id = item1.food_id;
                                                                            this.save_food(global.repas_type_id,food_id)
                                                                        }}

                                                                        style={this.ajouterstyle}>
                                                                        {/*ajouter*/}
                                                                        <Text style={{color:'white',fontSize:12}}>{'+'}</Text>
                                                                    </TouchableOpacity>
                                                                </View>
                                                            </View>
                                                        )
                                                    }
                                                )}
                                        </View>
                                    )
                                }
                            )
                            :
                            this.props.nosSuggestions.length > 0 && this.props.nosSuggestions.map(
                            (item,index)=>{
                                return(
                                    <View style={{flexDirection:'column',justifyContent:'flex-start',backgroundColor:'#14261D'}}>
                                        <Text style={{color:'#7c8e85',paddingLeft:screenWidth*0.07,fontSize:13,paddingTop:2,paddingBottom:3}}>{item.name}</Text>
                                        {
                                            item.aliment.length>0 && item.aliment.map(
                                                (item1)=>{
                                                    console.warn(item1.color)
                                                    return(
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
                                                                onPress={()=>{
                                                                    // let dataForMesProduitsItem = {
                                                                    //     id:,
                                                                    //     name:,
                                                                    //     kilocalorie:,
                                                                    //     quantite:,
                                                                    //     glucide:,
                                                                    //     proteine:,
                                                                    //     lipide:,
                                                                    // };

                                                                    if( this.props.navigation.navigate('MesProduits_NosSuggesstion_Item',{item:item,item1:item1})){}
                                                                    else{
                                                                        this.props.navigation.navigate('MesProduits_NosSuggesstion_Item_dashboard',{item:item,item1:item1})
                                                                    }
                                                                }}
                                                                style={{flexDirection:'row',alignItems:'center',width:'39%',height:screenWidth*0.09}}>
                                                                <View style={{borderRadius:screenWidth*0.04,width:screenWidth*0.04,height:screenWidth*0.04,backgroundColor:item1.color,marginLeft:screenWidth*0.03}}/>
                                                                <View style={screenWidth <= 360 ? {width:90} :{width:screenWidth*0.3}}><Text style={{color:'#b4c1b9',marginLeft:10,fontSize:12}}>{item1.name}</Text></View>
                                                            </TouchableOpacity>
                                                            <TouchableOpacity
                                                                onPress={()=>{
                                                                    if( this.props.navigation.navigate('MesProduits_NosSuggesstion_Item',{item:item,item1:item1})){}
                                                                    else{
                                                                        this.props.navigation.navigate('MesProduits_NosSuggesstion_Item_dashboard',{item:item,item1:item1})
                                                                    }
                                                                }}
                                                                style={{width:'19%',height:screenWidth*0.09,justifyContent: 'center',alignItems:'flex-start'}}>
                                                                <Text style={{color:'#8e9992',fontSize:11,paddingLeft:screenWidth*0.05}}>{item1.kilocalorie} Kcal</Text>
                                                            </TouchableOpacity>
                                                            {/*<View style={{}}>*/}
                                                            <View style={{width:'29%',justifyContent:'center',height:screenWidth*0.09,alignItems:'flex-start',paddingLeft:screenWidth*0.03}}>
                                                                <Text style={{color:'#8e9992',fontSize:11,textAlign:'center'}}>Qté suggérée: {item1.quantite}</Text>
                                                            </View>
                                                            <View style={{width:'12%',justifyContent:'center',alignItems:'flex-end',marginRight:10,height:screenWidth*0.09}}>
                                                                <TouchableOpacity
                                                                    onPress={()=>{
                                                                        let repas_type_id = item1.repas_type_id;
                                                                        let food_id = item1.food_id;
                                                                        this.save_food(global.repas_type_id,food_id,food_id)
                                                                    }}

                                                                    style={this.ajouterstyle}>
                                                                    {/*ajouter*/}
                                                                    <Text style={{color:'white',fontSize:12}}>{'+'}</Text>
                                                                </TouchableOpacity>
                                                            </View>
                                                        </View>
                                                    )
                                                }
                                            )}
                                    </View>
                                )
                            }
                            )
                    }
                </LinearGradient>
            </ScrollView>
        );};


    ThirdRouteSearch_EatRecently = () => {
        return(
            <ScrollView
                keyboardShouldPersistTaps={'always'}
                refreshControl={
                    <RefreshControl
                        refreshing={this.state.refreshingy} //tsy  baikon'ny refreshing intson, fa nataoko amny  loading
                        onRefresh={() => {
                            this. getalldata(null,true);
                            this.setState({ refreshingy: true })
                            setTimeout(() => {
                                this.setState({ refreshingy: false })
                            }, 2000)
                        }}
                    />
                }

                style={{width:'100%',marginTop:screenWidth*0.03,paddingBottom:screenWidth*0.3}}>
                <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }} colors={[colors.balck, colors.green,  '#213D2E']} style={{paddingBottom:screenWidth*0.12,flex:1}}>
                    {
                        this.state.filteredEatRecentlyfiltered.length > 0 ?
                            this.state.filteredEatRecentlyfiltered.map(
                                (item)=>{
                                    return(
                                        <View style={{flexDirection:'column',justifyContent:'flex-start',backgroundColor:'#14261D'}}>
                                            <Text style={{color:'#7c8e85',paddingLeft:screenWidth*0.07,fontSize:13,paddingTop:2,paddingBottom:3}}>{item.name}</Text>
                                            {
                                                item.aliment.length>0 && item.aliment.map(
                                                    (item1)=>{
                                                        console.warn(item1.color)
                                                        return(
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
                                                                    onPress={()=>{
                                                                        // let dataForMesProduitsItem = {
                                                                        //     id:,
                                                                        //     name:,
                                                                        //     kilocalorie:,
                                                                        //     quantite:,
                                                                        //     glucide:,
                                                                        //     proteine:,
                                                                        //     lipide:,
                                                                        // };

                                                                        if( this.props.navigation.navigate('MesProduits_NosSuggesstion_Item',{item:item,item1:item1})){}
                                                                        else{
                                                                            this.props.navigation.navigate('MesProduits_NosSuggesstion_Item_dashboard',{item:item,item1:item1})
                                                                        }
                                                                    }}
                                                                    style={{flexDirection:'row',alignItems:'center',width:'39%',height:screenWidth*0.09}}>
                                                                    <View style={{borderRadius:screenWidth*0.04,width:screenWidth*0.04,height:screenWidth*0.04,backgroundColor:item1.color,marginLeft:screenWidth*0.03}}/>
                                                                    <View style={screenWidth <= 360 ? {width:90} :{width:screenWidth*0.3}}><Text style={{color:'#b4c1b9',marginLeft:10,fontSize:12}}>{item1.name}</Text></View>
                                                                </TouchableOpacity>
                                                                <TouchableOpacity
                                                                    onPress={()=>{
                                                                        if( this.props.navigation.navigate('MesProduits_NosSuggesstion_Item',{item:item,item1:item1})){}
                                                                        else{
                                                                            this.props.navigation.navigate('MesProduits_NosSuggesstion_Item_dashboard',{item:item,item1:item1})
                                                                        }
                                                                    }}
                                                                    style={{width:'19%',height:screenWidth*0.09,justifyContent: 'center',alignItems:'flex-start'}}>
                                                                    <Text style={{color:'#8e9992',fontSize:11,paddingLeft:screenWidth*0.05}}>{item1.kilocalorie} Kcal</Text>
                                                                </TouchableOpacity>
                                                                {/*<View style={{}}>*/}
                                                                <View style={{width:'29%',justifyContent:'center',height:screenWidth*0.09,alignItems:'flex-start',paddingLeft:screenWidth*0.03}}>
                                                                    <Text style={{color:'#8e9992',fontSize:11,textAlign:'center'}}>Qté suggérée: {item1.quantite}</Text>
                                                                </View>
                                                                <View style={{width:'12%',justifyContent:'center',alignItems:'flex-end',marginRight:10,height:screenWidth*0.09}}>
                                                                    <TouchableOpacity
                                                                        onPress={()=>{
                                                                            let repas_type_id = item1.repas_type_id;
                                                                            let food_id = item1.food_id;
                                                                            this.save_food(global.repas_type_id,food_id,food_id)
                                                                        }}

                                                                        style={this.ajouterstyle}>
                                                                        {/*ajouter*/}
                                                                        <Text style={{color:'white',fontSize:12}}>{'+'}</Text>
                                                                    </TouchableOpacity>
                                                                </View>
                                                            </View>
                                                        )
                                                    }
                                                )}
                                        </View>
                                    )
                                }
                            )
                            :
                            this.props.eatrecently.length > 0 && this.props.eatrecently.map(
                            (item,index)=>{
                                return(
                                    <View style={{flexDirection:'column',justifyContent:'flex-start',backgroundColor:'#14261D'}}>
                                        <Text style={{color:'#7c8e85',paddingLeft:screenWidth*0.07,fontSize:13,paddingTop:2,paddingBottom:3}}>{item.name}</Text>
                                        {
                                            item.aliment.length>0 && item.aliment.map(
                                                (item1)=>{
                                                    console.warn(item1.color)
                                                    return(
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
                                                                onPress={()=>{
                                                                    // let dataForMesProduitsItem = {
                                                                    //     id:,
                                                                    //     name:,
                                                                    //     kilocalorie:,
                                                                    //     quantite:,
                                                                    //     glucide:,
                                                                    //     proteine:,
                                                                    //     lipide:,
                                                                    // };

                                                                    if( this.props.navigation.navigate('MesProduits_NosSuggesstion_Item',{item:item,item1:item1})){}
                                                                    else{
                                                                        this.props.navigation.navigate('MesProduits_NosSuggesstion_Item_dashboard',{item:item,item1:item1})
                                                                    }
                                                                }}
                                                                style={{flexDirection:'row',alignItems:'center',width:'39%',height:screenWidth*0.09}}>
                                                                <View style={{borderRadius:screenWidth*0.04,width:screenWidth*0.04,height:screenWidth*0.04,backgroundColor:item1.color,marginLeft:screenWidth*0.03}}/>
                                                                <View style={screenWidth <= 360 ? {width:90} :{width:screenWidth*0.3}}><Text style={{color:'#b4c1b9',marginLeft:10,fontSize:12}}>{item1.name}</Text></View>
                                                            </TouchableOpacity>
                                                            <TouchableOpacity
                                                                onPress={()=>{
                                                                    if( this.props.navigation.navigate('MesProduits_NosSuggesstion_Item',{item:item,item1:item1})){}
                                                                    else{
                                                                        this.props.navigation.navigate('MesProduits_NosSuggesstion_Item_dashboard',{item:item,item1:item1})
                                                                    }
                                                                }}
                                                                style={{width:'19%',height:screenWidth*0.09,justifyContent: 'center',alignItems:'flex-start'}}>
                                                                <Text style={{color:'#8e9992',fontSize:11,paddingLeft:screenWidth*0.05}}>{item1.kilocalorie} Kcal</Text>
                                                            </TouchableOpacity>
                                                            {/*<View style={{}}>*/}
                                                            <View style={{width:'29%',justifyContent:'center',height:screenWidth*0.09,alignItems:'flex-start',paddingLeft:screenWidth*0.03}}>
                                                                <Text style={{color:'#8e9992',fontSize:11}}>Qté suggérée: {item1.quantite}</Text>
                                                            </View>
                                                            <View style={{width:'12%',justifyContent:'center',alignItems:'flex-end',marginRight:10,height:screenWidth*0.09}}>
                                                                <TouchableOpacity
                                                                    onPress={()=>{
                                                                        let repas_type_id = item1.repas_type_id;
                                                                        let food_id = item1.food_id;
                                                                        this.save_food(global.repas_type_id,food_id,food_id)
                                                                    }}

                                                                    style={this.ajouterstyle}>
                                                                    {/*ajouter*/}
                                                                    <Text style={{color:'white',fontSize:12}}>{'+'}</Text>
                                                                </TouchableOpacity>
                                                            </View>
                                                        </View>
                                                    )
                                                }
                                            )}
                                    </View>
                                )
                            }
                            )
                    }
                </LinearGradient>
            </ScrollView>
        );};


    SecondRoute = () => (

        <ScrollView
            keyboardShouldPersistTaps={'always'}
            refreshControl={
                <RefreshControl
                    refreshing={this.state.refreshingy}
                    onRefresh={() => {
                        this. getalldata(null,true);
                        this.setState({ refreshingy: true })
                        setTimeout(() => {
                            this.setState({ refreshingy: false })
                        }, 2000)
                    }}
                />
            }

            style={{width:'100%',marginTop:screenWidth*0.03,flex:1}}>
            {console.warn('second route')}
            <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }} colors={[colors.balck, colors.green,  '#213D2E']} style={{flex:1}}>

                {
                    // this.mesRepas.length>0 && this.mesRepas.map(
                    this.state.indexrepas ===0 &&  (  this.props.mesRepaspetitsdejeuner.length>0 && this.props.mesRepaspetitsdejeuner.map(
                        (item1)=>{
                            return(
                                <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between',width:'100%',height:screenWidth*0.13,backgroundColor:'#213D2E',marginBottom:3}}>
                                    <TouchableOpacity
                                        onPress={()=>{
                                            // this.getItemForEditMesRepas(item1.id).then(()=>{ //petits dejeuner = 1
                                            //
                                            // });
                                            let setarrayalimentedit = { type: SET_ARRAY_ALIMENT_EDIT, value: [] }
                                            this.props.dispatch(setarrayalimentedit);
                                            if(this.props.navigation.navigate('MesRepasItem',{item_id_repas:item1.id})){}
                                            else{
                                                this.props.navigation.navigate('MesRepasItemDashboard',{item_id_repas:item1.id})
                                            }
                                        }}
                                        style={{flexDirection:'row',alignItems:'center',width:'30%'}}>

                                        <Image
                                            //   width={35}
                                            source={{uri:item1.thumbnail}}
                                            style={{
                                                marginLeft:10,
                                                borderRadius: 35,
                                                width:35,
                                                height:35
                                            }}
                                        />
                                        <Text style={{color:'#b4c1b9',marginLeft:15,fontSize:12}}>{item1.name}</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        onPress={()=>{
                                            let setarrayalimentedit = { type: SET_ARRAY_ALIMENT_EDIT, value: [] }
                                            this.props.dispatch(setarrayalimentedit);
                                            if(this.props.navigation.navigate('MesRepasItem',{item_id_repas:item1.id})){}
                                            else{
                                                this.props.navigation.navigate('MesRepasItemDashboard',{item_id_repas:item1.id})
                                            }
                                        }}
                                        style={{alignItems:'flex-start',justifyContent:'center'}}>
                                        <Text style={{color:'#8e9992',marginLeft:20,fontSize:12,}}>{item1.kilocalorie}Calories</Text>
                                    </TouchableOpacity>
                                    <View style={{width:'20%',justifyContent:'center',alignItems:'flex-end',marginRight:10,}}>
                                        <TouchableOpacity
                                            onPress={()=>{
                                                console.warn('item id',item1.id)
                                                this.save_alimentMesRepas(item1.id)
                                            }}

                                            style={[this.ajouterstyle]}>
                                            {/*ajouter*/}
                                            <Text style={{color:'white',fontSize:12}}>{'+'}</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            )
                        }

                    ))
                }
                <TouchableOpacity
                    onPress={()=>{
                        let setarrayalimentcreate = { type: SET_ARRAY_ALIMENT_CREATE, value: [] }
                        this.props.dispatch(setarrayalimentcreate);
                        if(this.state.navigation.navigate("CreerRepas",{paramRepasType:1})){}
                        else{
                            this.state.navigation.navigate("CreerRepasDashboard",{paramRepasType:1})
                        }

                    }}
                    style={{marginBottom:screenWidth*0.25,marginTop:15, alignSelf:'center'}}>
                    {/*Boutton*/}
                    <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} colors={[colors.red, 'rgb(229, 35, 48)', '#F93529']}
                                    style={{width:screenWidth*0.35,alignItems:'center',borderRadius:15,height:screenWidth*0.06,justifyContent:'center'}}>
                        <Text style={{fontSize:12,color:'#F4B8BF'}}>
                            {"CREER UN REPAS"}
                        </Text>
                    </LinearGradient>
                </TouchableOpacity>
            </LinearGradient>
        </ScrollView>
    );


    SecondRouteSearch_PetitsDejeuner = () => {
        return(
            <ScrollView
                keyboardShouldPersistTaps={'always'}
                refreshControl={
                    <RefreshControl
                        refreshing={this.state.refreshingy} //tsy  baikon'ny refreshing intson, fa nataoko amny  loading
                        onRefresh={() => {
                            this. getalldata(null,true);
                            this.setState({ refreshingy: true })
                            setTimeout(() => {
                                this.setState({ refreshingy: false })
                            }, 2000)
                        }}
                    />
                }

                style={{width:'100%',marginTop:screenWidth*0.03,paddingBottom:screenWidth*0.3}}>
                <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }} colors={[colors.balck, colors.green,  '#213D2E']} style={{paddingBottom:screenWidth*0.12,flex:1}}>
                    {
                        this.state.filteredmesRepaspetitsdejeunerfiltered.length > 0 ?
                            this.state.filteredmesRepaspetitsdejeunerfiltered.map(
                                (item1)=>{
                                    return(
                                        <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between',width:'100%',height:screenWidth*0.13,backgroundColor:'#213D2E',marginBottom:3}}>
                                            <TouchableOpacity
                                                onPress={()=>{
                                                    // this.getItemForEditMesRepas(item1.id).then(()=>{ //petits dejeuner = 1
                                                    //
                                                    // });
                                                    let setarrayalimentedit = { type: SET_ARRAY_ALIMENT_EDIT, value: [] }
                                                    this.props.dispatch(setarrayalimentedit);
                                                    if(this.props.navigation.navigate('MesRepasItem',{item_id_repas:item1.id})){}
                                                    else{
                                                        this.props.navigation.navigate('MesRepasItemDashboard',{item_id_repas:item1.id})
                                                    }
                                                }}
                                                style={{flexDirection:'row',alignItems:'center',width:'30%'}}>

                                                <Image
                                                    //   width={35}
                                                    source={{uri:item1.thumbnail}}
                                                    style={{
                                                        marginLeft:10,
                                                        borderRadius: 35,
                                                        width:35,
                                                        height:35
                                                    }}
                                                />
                                                <Text style={{color:'#b4c1b9',marginLeft:15,fontSize:12}}>{item1.name}</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity
                                                onPress={()=>{
                                                    let setarrayalimentedit = { type: SET_ARRAY_ALIMENT_EDIT, value: [] }
                                                    this.props.dispatch(setarrayalimentedit);
                                                    if(this.props.navigation.navigate('MesRepasItem',{item_id_repas:item1.id})){}
                                                    else{
                                                        this.props.navigation.navigate('MesRepasItemDashboard',{item_id_repas:item1.id})
                                                    }
                                                }}
                                                style={{alignItems:'flex-start',justifyContent:'center'}}>
                                                <Text style={{color:'#8e9992',marginLeft:20,fontSize:12,}}>{item1.kilocalorie}Calories</Text>
                                            </TouchableOpacity>
                                            <View style={{width:'20%',justifyContent:'center',alignItems:'flex-end',marginRight:10,}}>
                                                <TouchableOpacity
                                                    onPress={()=>{
                                                        console.warn('item id',item1.id)
                                                        this.save_alimentMesRepas(item1.id)
                                                    }}

                                                    style={[this.ajouterstyle,{alignItems:'flex-end'}]}>
                                                    {/*ajouter*/}
                                                    <Text style={{color:'white',fontSize:12}}>{'+'}</Text>
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                    )
                                }
                            )
                            :
                            ( this.state.indexrepas ===0 &&
                                this.props.mesRepaspetitsdejeuner.length>0 ) && this.props.mesRepaspetitsdejeuner.map(
                            (item1)=>{
                                return(
                                    <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between',width:'100%',height:screenWidth*0.13,backgroundColor:'#213D2E',marginBottom:3}}>
                                        <TouchableOpacity
                                            onPress={()=>{
                                                // this.getItemForEditMesRepas(item1.id).then(()=>{ //petits dejeuner = 1
                                                //
                                                // });
                                                let setarrayalimentedit = { type: SET_ARRAY_ALIMENT_EDIT, value: [] }
                                                this.props.dispatch(setarrayalimentedit);
                                                if(this.props.navigation.navigate('MesRepasItem',{item_id_repas:item1.id})){}
                                                else{
                                                    this.props.navigation.navigate('MesRepasItemDashboard',{item_id_repas:item1.id})
                                                }
                                            }}
                                            style={{flexDirection:'row',alignItems:'center',width:'30%'}}>

                                            <Image
                                                //   width={35}
                                                source={{uri:item1.thumbnail}}
                                                style={{
                                                    marginLeft:10,
                                                    borderRadius: 35,
                                                    width:35,
                                                    height:35
                                                }}
                                            />
                                            <Text style={{color:'#b4c1b9',marginLeft:15,fontSize:12}}>{item1.name}</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            onPress={()=>{
                                                let setarrayalimentedit = { type: SET_ARRAY_ALIMENT_EDIT, value: [] }
                                                this.props.dispatch(setarrayalimentedit);
                                                if(this.props.navigation.navigate('MesRepasItem',{item_id_repas:item1.id})){}
                                                else{
                                                    this.props.navigation.navigate('MesRepasItemDashboard',{item_id_repas:item1.id})
                                                }
                                            }}
                                            style={{alignItems:'flex-start',justifyContent:'flex-end'}}>
                                            <Text style={{color:'#8e9992',marginLeft:20,fontSize:12,}}>{item1.kilocalorie}Calories</Text>
                                        </TouchableOpacity>
                                        <View style={{width:'20%',justifyContent:'center',alignItems:'flex-end',marginRight:10,}}>
                                            <TouchableOpacity
                                                onPress={()=>{
                                                    console.warn('item id',item1.id)
                                                    this.save_alimentMesRepas(item1.id)
                                                }}

                                                style={[this.ajouterstyle,{alignItems:'flex-end'}]}>
                                                {/*ajouter*/}
                                                <Text style={{color:'white',fontSize:12}}>{'+'}</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                )
                            }
                            )
                    }
                </LinearGradient>
            </ScrollView>
        );};


    SecondRoutecollationmatin = () => (
        <ScrollView
            keyboardShouldPersistTaps={'always'}
            refreshControl={
                <RefreshControl
                    refreshing={this.state.refreshingy} //tsy  baikon'ny refreshing intson, fa nataoko amny  loading
                    onRefresh={() => {
                        this. getalldata(null,true);
                        this.setState({ refreshingy: true })
                        setTimeout(() => {
                            this.setState({ refreshingy: false })
                        }, 2000)
                    }}
                />
            }
            style={{width:'100%',marginTop:screenWidth*0.03,flex:1}}>
            {console.warn('rendered ve',this.props.collationmatin)}
            <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }} colors={[colors.balck, colors.green,  '#213D2E']} style={{flex:1}}>
                {
                    // this.mesRepas.length>0 && this.mesRepas.map(
                    ( this.state.indexrepas ==1 &&
                        this.props.collationmatin.length>0 ) && this.props.collationmatin.map(
                        (item1)=>{
                            return(
                                <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between',width:'100%',height:screenWidth*0.13,backgroundColor:'#213D2E',marginBottom:3}}>
                                    <TouchableOpacity
                                        onPress={()=>{
                                            let setarrayalimentedit = { type: SET_ARRAY_ALIMENT_EDIT, value: [] }
                                            this.props.dispatch(setarrayalimentedit);
                                            if(this.props.navigation.navigate('MesRepasItem',{item_id_repas:item1.id})){}
                                            else{
                                                this.props.navigation.navigate('MesRepasItemDashboard',{item_id_repas:item1.id})
                                            }
                                        }}
                                        style={{flexDirection:'row',alignItems:'center',width:'30%'}}>

                                        <Image
                                            //   width={35}
                                            source={{uri:item1.thumbnail}}
                                            style={{
                                                marginLeft:10,
                                                borderRadius: 35,
                                                width:35,
                                                height:35
                                            }}
                                        />
                                        <Text style={{color:'#b4c1b9',marginLeft:15,fontSize:12}}>{item1.name}</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        onPress={()=>{
                                            // this.getItemForEditMesRepas(item1.id).then(()=>{
                                            //     if(this.props.navigation.navigate('MesRepasItem',{item:item1})){}
                                            //     else{
                                            //         this.props.navigation.navigate('MesRepasItemDashboard',{item:item1})
                                            //     }
                                            // });
                                            let setarrayalimentedit = { type: SET_ARRAY_ALIMENT_EDIT, value: [] }
                                            this.props.dispatch(setarrayalimentedit);
                                            if(this.props.navigation.navigate('MesRepasItem',{item_id_repas:item1.id})){}
                                            else{
                                                this.props.navigation.navigate('MesRepasItemDashboard',{item_id_repas:item1.id})
                                            }
                                        }}
                                        style={{alignItems:'flex-start',justifyContent:'flex-end'}}>
                                        <Text style={{color:'#8e9992',marginLeft:20,fontSize:12,}}>{item1.kilocalorie}Calories</Text>
                                    </TouchableOpacity>
                                    <View style={{width:'20%',justifyContent:'center',alignItems:'flex-end',marginRight:10,}}>
                                        <TouchableOpacity
                                            onPress={()=>{
                                                console.warn('item id',item1.id)
                                                this.save_alimentMesRepas(item1.id)
                                            }}
                                            style={this.ajouterstyle}>
                                            {/*ajouter*/}
                                            <Text style={{color:'white',fontSize:12}}>{'+'}</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            )
                        }

                    )
                }
                <TouchableOpacity
                    onPress={()=>{
                        if(this.state.navigation.navigate("CreerRepas",{paramRepasType:2})){}//collationmatin
                        else{
                            this.state.navigation.navigate("CreerRepasDashboard",{paramRepasType:2})
                        }

                    }}
                    style={{marginBottom:screenWidth*0.25,marginTop:15, alignSelf:'center'}}>
                    {/*Boutton*/}
                    <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} colors={[colors.red, 'rgb(229, 35, 48)', '#F93529']}
                                    style={{width:screenWidth*0.35,alignItems:'center',borderRadius:15,height:screenWidth*0.06,justifyContent:'center'}}>
                        <Text style={{fontSize:12,color:'#F4B8BF'}}>
                            {"CREER UN REPAS"}
                        </Text>
                    </LinearGradient>
                </TouchableOpacity>
            </LinearGradient>
        </ScrollView>
    );

    SecondRouteSearch_Collationmatin = () => {
        return(
            <ScrollView
                keyboardShouldPersistTaps={'always'}
                refreshControl={
                    <RefreshControl
                        refreshing={this.state.refreshingy} //tsy  baikon'ny refreshing intson, fa nataoko amny  loading
                        onRefresh={() => {
                            this. getalldata(null,true);
                            this.setState({ refreshingy: true })
                            setTimeout(() => {
                                this.setState({ refreshingy: false })
                            }, 2000)
                        }}
                    />
                }

                style={{width:'100%',marginTop:screenWidth*0.03,paddingBottom:screenWidth*0.3}}>
                <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }} colors={[colors.balck, colors.green,  '#213D2E']} style={{paddingBottom:screenWidth*0.12,flex:1}}>
                    {
                        this.state.filteredCollationmatinfiltered.length > 0 ?
                            this.state.filteredCollationmatinfiltered.map(
                                (item1)=>{
                                    return(
                                        <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between',width:'100%',height:screenWidth*0.13,backgroundColor:'#213D2E',marginBottom:3}}>
                                            <TouchableOpacity
                                                onPress={()=>{
                                                    // this.getItemForEditMesRepas(item1.id).then(()=>{ //petits dejeuner = 1
                                                    //
                                                    // });
                                                    let setarrayalimentedit = { type: SET_ARRAY_ALIMENT_EDIT, value: [] }
                                                    this.props.dispatch(setarrayalimentedit);
                                                    if(this.props.navigation.navigate('MesRepasItem',{item_id_repas:item1.id})){}
                                                    else{
                                                        this.props.navigation.navigate('MesRepasItemDashboard',{item_id_repas:item1.id})
                                                    }
                                                }}
                                                style={{flexDirection:'row',alignItems:'center',width:'30%'}}>

                                                <Image
                                                    //   width={35}
                                                    source={{uri:item1.thumbnail}}
                                                    style={{
                                                        marginLeft:10,
                                                        borderRadius: 35,
                                                        width:35,
                                                        height:35
                                                    }}
                                                />
                                                <Text style={{color:'#b4c1b9',marginLeft:15,fontSize:12}}>{item1.name}</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity
                                                onPress={()=>{
                                                    let setarrayalimentedit = { type: SET_ARRAY_ALIMENT_EDIT, value: [] }
                                                    this.props.dispatch(setarrayalimentedit);
                                                    if(this.props.navigation.navigate('MesRepasItem',{item_id_repas:item1.id})){}
                                                    else{
                                                        this.props.navigation.navigate('MesRepasItemDashboard',{item_id_repas:item1.id})
                                                    }
                                                }}
                                                style={{alignItems:'flex-start',justifyContent:'flex-end'}}>
                                                <Text style={{color:'#8e9992',marginLeft:20,fontSize:12,}}>{item1.kilocalorie}Calories</Text>
                                            </TouchableOpacity>
                                            <View style={{width:'20%',justifyContent:'center',alignItems:'flex-end',marginRight:10,}}>
                                                <TouchableOpacity
                                                    onPress={()=>{
                                                        console.warn('item id',item1.id)
                                                        this.save_alimentMesRepas(item1.id)
                                                    }}

                                                    style={this.ajouterstyle}>
                                                    {/*ajouter*/}
                                                    <Text style={{color:'white',fontSize:12}}>{'+'}</Text>
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                    )
                                }
                            )
                            :
                            ( this.state.indexrepas ===1 &&
                                this.props.collationmatin.length>0 ) && this.props.collationmatin.map(
                            (item1)=>{
                                return(
                                    <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between',width:'100%',height:screenWidth*0.13,backgroundColor:'#213D2E',marginBottom:3}}>
                                        <TouchableOpacity
                                            onPress={()=>{
                                                let setarrayalimentedit = { type: SET_ARRAY_ALIMENT_EDIT, value: [] }
                                                this.props.dispatch(setarrayalimentedit);
                                                if(this.props.navigation.navigate('MesRepasItem',{item_id_repas:item1.id})){}
                                                else{
                                                    this.props.navigation.navigate('MesRepasItemDashboard',{item_id_repas:item1.id})
                                                }
                                            }}
                                            style={{flexDirection:'row',alignItems:'center',width:'30%'}}>

                                            <Image
                                                //   width={35}
                                                source={{uri:item1.thumbnail}}
                                                style={{
                                                    marginLeft:10,
                                                    borderRadius: 35,
                                                    width:35,
                                                    height:35
                                                }}
                                            />
                                            <Text style={{color:'#b4c1b9',marginLeft:15,fontSize:12}}>{item1.name}</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            onPress={()=>{
                                                // this.getItemForEditMesRepas(item1.id).then(()=>{
                                                //     if(this.props.navigation.navigate('MesRepasItem',{item:item1})){}
                                                //     else{
                                                //         this.props.navigation.navigate('MesRepasItemDashboard',{item:item1})
                                                //     }
                                                // });
                                                let setarrayalimentedit = { type: SET_ARRAY_ALIMENT_EDIT, value: [] }
                                                this.props.dispatch(setarrayalimentedit);
                                                if(this.props.navigation.navigate('MesRepasItem',{item_id_repas:item1.id})){}
                                                else{
                                                    this.props.navigation.navigate('MesRepasItemDashboard',{item_id_repas:item1.id})
                                                }
                                            }}
                                            style={{alignItems:'flex-start',justifyContent:'flex-end'}}>
                                            <Text style={{color:'#8e9992',marginLeft:20,fontSize:12,}}>{item1.kilocalorie}Calories</Text>
                                        </TouchableOpacity>
                                        <View style={{width:'20%',justifyContent:'center',alignItems:'flex-end',marginRight:10,}}>
                                            <TouchableOpacity
                                                onPress={()=>{
                                                    console.warn('item id',item1.id)
                                                    this.save_alimentMesRepas(item1.id)
                                                }}
                                                style={this.ajouterstyle}>
                                                {/*ajouter*/}
                                                <Text style={{color:'white',fontSize:12}}>{'+'}</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                )
                            }
                            )
                    }
                </LinearGradient>
            </ScrollView>
        );};


    SecondRoutedejeuner = () => (
        <ScrollView
            keyboardShouldPersistTaps={'always'}
            refreshControl={
                <RefreshControl
                    refreshing={this.state.refreshingy}
                    onRefresh={() => {
                        this. getalldata(null,true);
                        this.setState({ refreshingy: true })
                        setTimeout(() => {
                            this.setState({ refreshingy: false })
                        }, 2000)
                    }}
                />
            }

            style={{width:'100%',marginTop:screenWidth*0.03,flex:1}}>
            <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }} colors={[colors.balck, colors.green,  '#213D2E']} style={{flex:1}}>

                {
                    // this.mesRepas.length>0 && this.mesRepas.map(
                    ( this.state.indexrepas ===2 &&
                        this.props.dejeuner.length>0 ) && this.props.dejeuner.map(
                        (item1)=>{
                            return(
                                <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between',width:'100%',height:screenWidth*0.13,backgroundColor:'#213D2E',marginBottom:3}}>
                                    <TouchableOpacity
                                        onPress={()=>{
                                            let setarrayalimentedit = { type: SET_ARRAY_ALIMENT_EDIT, value: [] }
                                            this.props.dispatch(setarrayalimentedit);
                                            if(this.props.navigation.navigate('MesRepasItem',{item_id_repas:item1.id})){}
                                            else{
                                                this.props.navigation.navigate('MesRepasItemDashboard',{item_id_repas:item1.id})
                                            }
                                        }}
                                        style={{flexDirection:'row',alignItems:'center',width:'30%'}}>

                                        <Image
                                            //   width={35}
                                            source={{uri:item1.thumbnail}}
                                            style={{
                                                marginLeft:10,
                                                borderRadius: 35,
                                                width:35,
                                                height:35
                                            }}
                                        />
                                        <Text style={{color:'#b4c1b9',marginLeft:15,fontSize:12}}>{item1.name}</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        onPress={()=>{
                                            let setarrayalimentedit = { type: SET_ARRAY_ALIMENT_EDIT, value: [] }
                                            this.props.dispatch(setarrayalimentedit);
                                            if(this.props.navigation.navigate('MesRepasItem',{item_id_repas:item1.id})){}
                                            else{
                                                this.props.navigation.navigate('MesRepasItemDashboard',{item_id_repas:item1.id})
                                            }
                                        }}
                                        style={{alignItems:'flex-start',justifyContent:'flex-end'}}>
                                        <Text style={{color:'#8e9992',marginLeft:20,fontSize:12,}}>{item1.kilocalorie}Calories</Text>
                                    </TouchableOpacity>
                                    <View style={{width:'20%',justifyContent:'center',alignItems:'flex-end',marginRight:10,}}>
                                        <TouchableOpacity
                                            onPress={()=>{
                                                console.warn('item id',item1.id)
                                                this.save_alimentMesRepas(item1.id)
                                            }}
                                            style={this.ajouterstyle}>
                                            {/*ajouter*/}
                                            <Text style={{color:'white',fontSize:12}}>{'+'}</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            )
                        }

                    )
                }
                <TouchableOpacity
                    onPress={()=>{
                        if(this.state.navigation.navigate("CreerRepas",{paramRepasType:3})){} //dejeuner
                        else{
                            this.state.navigation.navigate("CreerRepasDashboard",{paramRepasType:3})
                        }

                    }}
                    style={{marginBottom:screenWidth*0.25,marginTop:15, alignSelf:'center'}}>
                    {/*Boutton*/}
                    <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} colors={[colors.red, 'rgb(229, 35, 48)', '#F93529']}
                                    style={{width:screenWidth*0.35,alignItems:'center',borderRadius:15,height:screenWidth*0.06,justifyContent:'center'}}>
                        <Text style={{fontSize:12,color:'#F4B8BF'}}>
                            {"CREER UN REPAS"}
                        </Text>
                    </LinearGradient>
                </TouchableOpacity>
            </LinearGradient>
        </ScrollView>
    );


    SecondRouteSearch_Dejeuner = () => {
        return(
            <ScrollView
                keyboardShouldPersistTaps={'always'}
                refreshControl={
                    <RefreshControl
                        refreshing={this.state.refreshingy} //tsy  baikon'ny refreshing intson, fa nataoko amny  loading
                        onRefresh={() => {
                            this. getalldata(null,true);
                            this.setState({ refreshingy: true })
                            setTimeout(() => {
                                this.setState({ refreshingy: false })
                            }, 2000)
                        }}
                    />
                }

                style={{width:'100%',marginTop:screenWidth*0.03,paddingBottom:screenWidth*0.3}}>
                <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }} colors={[colors.balck, colors.green,  '#213D2E']} style={{paddingBottom:screenWidth*0.12,flex:1}}>
                    {
                        this.state.filteredDejeunerfiltered.length > 0 ?
                            this.state.filteredDejeunerfiltered.map(
                                (item1)=>{
                                    return(
                                        <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between',width:'100%',height:screenWidth*0.13,backgroundColor:'#213D2E',marginBottom:3}}>
                                            <TouchableOpacity
                                                onPress={()=>{
                                                    // this.getItemForEditMesRepas(item1.id).then(()=>{ //petits dejeuner = 1
                                                    //
                                                    // });
                                                    let setarrayalimentedit = { type: SET_ARRAY_ALIMENT_EDIT, value: [] }
                                                    this.props.dispatch(setarrayalimentedit);
                                                    if(this.props.navigation.navigate('MesRepasItem',{item_id_repas:item1.id})){}
                                                    else{
                                                        this.props.navigation.navigate('MesRepasItemDashboard',{item_id_repas:item1.id})
                                                    }
                                                }}
                                                style={{flexDirection:'row',alignItems:'center',width:'30%'}}>

                                                <Image
                                                    //   width={35}
                                                    source={{uri:item1.thumbnail}}
                                                    style={{
                                                        marginLeft:10,
                                                        borderRadius: 35,
                                                        width:35,
                                                        height:35
                                                    }}
                                                />
                                                <Text style={{color:'#b4c1b9',marginLeft:15,fontSize:12}}>{item1.name}</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity
                                                onPress={()=>{
                                                    let setarrayalimentedit = { type: SET_ARRAY_ALIMENT_EDIT, value: [] }
                                                    this.props.dispatch(setarrayalimentedit);
                                                    if(this.props.navigation.navigate('MesRepasItem',{item_id_repas:item1.id})){}
                                                    else{
                                                        this.props.navigation.navigate('MesRepasItemDashboard',{item_id_repas:item1.id})
                                                    }
                                                }}
                                                style={{alignItems:'flex-start',justifyContent:'flex-end'}}>
                                                <Text style={{color:'#8e9992',marginLeft:20,fontSize:12,}}>{item1.kilocalorie}Calories</Text>
                                            </TouchableOpacity>
                                            <View style={{width:'20%',justifyContent:'center',alignItems:'flex-end',marginRight:10,}}>
                                                <TouchableOpacity
                                                    onPress={()=>{
                                                        console.warn('item id',item1.id)
                                                        this.save_alimentMesRepas(item1.id)
                                                    }}

                                                    style={this.ajouterstyle}>
                                                    {/*ajouter*/}
                                                    <Text style={{color:'white',fontSize:12}}>{'+'}</Text>
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                    )
                                }
                            )
                            :
                            ( this.state.indexrepas ===2 &&
                                this.props.dejeuner.length>0 ) && this.props.dejeuner.map(
                            (item1)=>{
                                return(
                                    <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between',width:'100%',height:screenWidth*0.13,backgroundColor:'#213D2E',marginBottom:3}}>
                                        <TouchableOpacity
                                            onPress={()=>{
                                                let setarrayalimentedit = { type: SET_ARRAY_ALIMENT_EDIT, value: [] }
                                                this.props.dispatch(setarrayalimentedit);
                                                if(this.props.navigation.navigate('MesRepasItem',{item_id_repas:item1.id})){}
                                                else{
                                                    this.props.navigation.navigate('MesRepasItemDashboard',{item_id_repas:item1.id})
                                                }
                                            }}
                                            style={{flexDirection:'row',alignItems:'center',width:'30%'}}>

                                            <Image
                                                //   width={35}
                                                source={{uri:item1.thumbnail}}
                                                style={{
                                                    marginLeft:10,
                                                    borderRadius: 35,
                                                    width:35,
                                                    height:35
                                                }}
                                            />
                                            <Text style={{color:'#b4c1b9',marginLeft:15,fontSize:12}}>{item1.name}</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            onPress={()=>{
                                                let setarrayalimentedit = { type: SET_ARRAY_ALIMENT_EDIT, value: [] }
                                                this.props.dispatch(setarrayalimentedit);
                                                if(this.props.navigation.navigate('MesRepasItem',{item_id_repas:item1.id})){}
                                                else{
                                                    this.props.navigation.navigate('MesRepasItemDashboard',{item_id_repas:item1.id})
                                                }
                                            }}
                                            style={{alignItems:'flex-start',justifyContent:'flex-end'}}>
                                            <Text style={{color:'#8e9992',marginLeft:20,fontSize:12,}}>{item1.kilocalorie}Calories</Text>
                                        </TouchableOpacity>
                                        <View style={{width:'20%',justifyContent:'center',alignItems:'flex-end',marginRight:10,}}>
                                            <TouchableOpacity
                                                onPress={()=>{
                                                    console.warn('item id',item1.id)
                                                    this.save_alimentMesRepas(item1.id)
                                                }}
                                                style={this.ajouterstyle}>
                                                {/*ajouter*/}
                                                <Text style={{color:'white',fontSize:12}}>{'+'}</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                )
                            }

                            )
                    }
                </LinearGradient>
            </ScrollView>
        );};

    secondRouteApresmidi = () => (
        <ScrollView
            keyboardShouldPersistTaps={'always'}
            refreshControl={
                <RefreshControl
                    refreshing={this.state.refreshingy} //tsy  baikon'ny refreshing intson, fa nataoko amny  loading
                    onRefresh={() => {
                        this. getalldata(null,true);
                        this.setState({ refreshingy: true })
                        setTimeout(() => {
                            this.setState({ refreshingy: false })
                        }, 2000)
                    }}
                />
            }
            style={{width:'100%',marginTop:screenWidth*0.03,flex:1}}>
            <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }} colors={[colors.balck, colors.green,  '#213D2E']} style={{flex:1}}>

                {
                    // this.mesRepas.length>0 && this.mesRepas.map(
                    ( this.state.indexrepas ===3 &&
                        this.props.collationapresmidi.length>0 ) && this.props.collationapresmidi.map(
                        (item1)=>{
                            return(
                                <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between',width:'100%',height:screenWidth*0.13,backgroundColor:'#213D2E',marginBottom:3}}>
                                    <TouchableOpacity
                                        onPress={()=>{
                                            let setarrayalimentedit = { type: SET_ARRAY_ALIMENT_EDIT, value: [] }
                                            this.props.dispatch(setarrayalimentedit);
                                            if(this.props.navigation.navigate('MesRepasItem',{item_id_repas:item1.id})){}
                                            else{
                                                this.props.navigation.navigate('MesRepasItemDashboard',{item_id_repas:item1.id})
                                            }
                                        }}
                                        style={{flexDirection:'row',alignItems:'center',width:'30%'}}>

                                        <Image
                                            //   width={35}
                                            source={{uri:item1.thumbnail}}
                                            style={{
                                                marginLeft:10,
                                                borderRadius: 35,
                                                width:35,
                                                height:35
                                            }}
                                        />
                                        <Text style={{color:'#b4c1b9',marginLeft:15,fontSize:12}}>{item1.name}</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        onPress={()=>{
                                            let setarrayalimentedit = { type: SET_ARRAY_ALIMENT_EDIT, value: [] }
                                            this.props.dispatch(setarrayalimentedit);
                                            if(this.props.navigation.navigate('MesRepasItem',{item_id_repas:item1.id})){}
                                            else{
                                                this.props.navigation.navigate('MesRepasItemDashboard',{item_id_repas:item1.id})
                                            }
                                        }}
                                        style={{alignItems:'flex-start',justifyContent:'flex-end'}}>
                                        <Text style={{color:'#8e9992',marginLeft:20,fontSize:12,}}>{item1.kilocalorie}Calories</Text>
                                    </TouchableOpacity>
                                    <View style={{width:'20%',justifyContent:'center',alignItems:'flex-end',marginRight:10,}}>
                                        <TouchableOpacity
                                            onPress={()=>{
                                                console.warn('item id',item1.id)
                                                this.save_alimentMesRepas(item1.id)
                                            }}
                                            style={this.ajouterstyle}>
                                            {/*ajouter*/}
                                            <Text style={{color:'white',fontSize:12}}>{'+'}</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            )
                        }

                    )
                }
                <TouchableOpacity
                    onPress={()=>{
                        if(this.state.navigation.navigate("CreerRepas",{paramRepasType:4})){}
                        else{
                            this.state.navigation.navigate("CreerRepasDashboard",{paramRepasType:4})
                        }

                    }}
                    style={{marginBottom:screenWidth*0.25,marginTop:15, alignSelf:'center'}}>
                    {/*Boutton*/}
                    <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} colors={[colors.red, 'rgb(229, 35, 48)', '#F93529']}
                                    style={{width:screenWidth*0.35,alignItems:'center',borderRadius:15,height:screenWidth*0.06,justifyContent:'center'}}>
                        <Text style={{fontSize:12,color:'#F4B8BF'}}>
                            {"CREER UN REPAS"}
                        </Text>
                    </LinearGradient>
                </TouchableOpacity>
            </LinearGradient>
        </ScrollView>
    );


    SecondRouteSearch_CollationApresMidi = () => {
        return(
            <ScrollView
                keyboardShouldPersistTaps={'always'}
                refreshControl={
                    <RefreshControl
                        refreshing={this.state.refreshingy} //tsy  baikon'ny refreshing intson, fa nataoko amny  loading
                        onRefresh={() => {
                            this. getalldata(null,true);
                            this.setState({ refreshingy: true })
                            setTimeout(() => {
                                this.setState({ refreshingy: false })
                            }, 2000)
                        }}
                    />
                }

                style={{width:'100%',marginTop:screenWidth*0.03,paddingBottom:screenWidth*0.3}}>
                <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }} colors={[colors.balck, colors.green,  '#213D2E']} style={{paddingBottom:screenWidth*0.12,flex:1}}>
                    {
                        this.state.filteredCollationApresMidifiltered.length > 0 ?
                            this.state.filteredCollationApresMidifiltered.map(
                                (item1)=>{
                                    return(
                                        <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between',width:'100%',height:screenWidth*0.13,backgroundColor:'#213D2E',marginBottom:3}}>
                                            <TouchableOpacity
                                                onPress={()=>{
                                                    let setarrayalimentedit = { type: SET_ARRAY_ALIMENT_EDIT, value: [] }
                                                    this.props.dispatch(setarrayalimentedit);
                                                    if(this.props.navigation.navigate('MesRepasItem',{item_id_repas:item1.id})){}
                                                    else{
                                                        this.props.navigation.navigate('MesRepasItemDashboard',{item_id_repas:item1.id})
                                                    }
                                                }}
                                                style={{flexDirection:'row',alignItems:'center',width:'30%'}}>

                                                <Image
                                                    //   width={35}
                                                    source={{uri:item1.thumbnail}}
                                                    style={{
                                                        marginLeft:10,
                                                        borderRadius: 35,
                                                        width:35,
                                                        height:35
                                                    }}
                                                />
                                                <Text style={{color:'#b4c1b9',marginLeft:15,fontSize:12}}>{item1.name}</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity
                                                onPress={()=>{
                                                    let setarrayalimentedit = { type: SET_ARRAY_ALIMENT_EDIT, value: [] }
                                                    this.props.dispatch(setarrayalimentedit);
                                                    if(this.props.navigation.navigate('MesRepasItem',{item_id_repas:item1.id})){}
                                                    else{
                                                        this.props.navigation.navigate('MesRepasItemDashboard',{item_id_repas:item1.id})
                                                    }
                                                }}
                                                style={{alignItems:'flex-start',justifyContent:'flex-end'}}>
                                                <Text style={{color:'#8e9992',marginLeft:20,fontSize:12,}}>{item1.kilocalorie}Calories</Text>
                                            </TouchableOpacity>
                                            <View style={{width:'20%',justifyContent:'center',alignItems:'flex-end',marginRight:10,}}>
                                                <TouchableOpacity
                                                    onPress={()=>{
                                                        console.warn('item id',item1.id)
                                                        this.save_alimentMesRepas(item1.id)
                                                    }}

                                                    style={this.ajouterstyle}>
                                                    {/*ajouter*/}
                                                    <Text style={{color:'white',fontSize:12}}>{'+'}</Text>
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                    )
                                }
                            )
                            :
                            ( this.state.indexrepas ===3 &&
                                this.props.collationapresmidi.length>0 ) && this.props.collationapresmidi.map(
                            (item1)=>{
                                return(
                                    <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between',width:'100%',height:screenWidth*0.13,backgroundColor:'#213D2E',marginBottom:3}}>
                                        <TouchableOpacity
                                            onPress={()=>{
                                                let setarrayalimentedit = { type: SET_ARRAY_ALIMENT_EDIT, value: [] }
                                                this.props.dispatch(setarrayalimentedit);
                                                if(this.props.navigation.navigate('MesRepasItem',{item_id_repas:item1.id})){}
                                                else{
                                                    this.props.navigation.navigate('MesRepasItemDashboard',{item_id_repas:item1.id})
                                                }
                                            }}
                                            style={{flexDirection:'row',alignItems:'center',width:'30%'}}>

                                            <Image
                                                //   width={35}
                                                source={{uri:item1.thumbnail}}
                                                style={{
                                                    marginLeft:10,
                                                    borderRadius: 35,
                                                    width:35,
                                                    height:35
                                                }}
                                            />
                                            <Text style={{color:'#b4c1b9',marginLeft:15,fontSize:12}}>{item1.name}</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            onPress={()=>{
                                                let setarrayalimentedit = { type: SET_ARRAY_ALIMENT_EDIT, value: [] }
                                                this.props.dispatch(setarrayalimentedit);
                                                if(this.props.navigation.navigate('MesRepasItem',{item_id_repas:item1.id})){}
                                                else{
                                                    this.props.navigation.navigate('MesRepasItemDashboard',{item_id_repas:item1.id})
                                                }
                                            }}
                                            style={{alignItems:'flex-start',justifyContent:'flex-end'}}>
                                            <Text style={{color:'#8e9992',marginLeft:20,fontSize:12,}}>{item1.kilocalorie}Calories</Text>
                                        </TouchableOpacity>
                                        <View style={{width:'20%',justifyContent:'center',alignItems:'flex-end',marginRight:10,}}>
                                            <TouchableOpacity
                                                onPress={()=>{
                                                    console.warn('item id',item1.id)
                                                    this.save_alimentMesRepas(item1.id)
                                                }}
                                                style={this.ajouterstyle}>
                                                {/*ajouter*/}
                                                <Text style={{color:'white',fontSize:12}}>{'+'}</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                )
                            }

                            )
                    }
                </LinearGradient>
            </ScrollView>
        );};


    secondRouteDiner = () => (
        <ScrollView
            keyboardShouldPersistTaps={'always'}
            refreshControl={
                <RefreshControl
                    refreshing={this.state.refreshingy} //tsy  baikon'ny refreshing intson, fa nataoko amny  loading
                    onRefresh={() => {
                        this. getalldata(null,true);
                        this.setState({ refreshingy: true })
                        setTimeout(() => {
                            this.setState({ refreshingy: false })
                        }, 2000)
                    }}
                />
            }
            style={{width:'100%',marginTop:screenWidth*0.03,flex:1}}>
            <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }} colors={[colors.balck, colors.green,  '#213D2E']} style={{flex:1}}>

                {
                    // this.mesRepas.length>0 && this.mesRepas.map(
                    ( this.state.indexrepas ===4 &&
                        this.props.diner.length>0 ) && this.props.diner.map(
                        (item1)=>{
                            return(
                                <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between',width:'100%',height:screenWidth*0.13,backgroundColor:'#213D2E',marginBottom:3}}>
                                    <TouchableOpacity
                                        onPress={()=>{
                                            let setarrayalimentedit = { type: SET_ARRAY_ALIMENT_EDIT, value: [] }
                                            this.props.dispatch(setarrayalimentedit);
                                            if(this.props.navigation.navigate('MesRepasItem',{item_id_repas:item1.id})){}
                                            else{
                                                this.props.navigation.navigate('MesRepasItemDashboard',{item_id_repas:item1.id})
                                            }
                                        }}
                                        style={{flexDirection:'row',alignItems:'center',width:'30%'}}>

                                        <Image
                                            //   width={35}
                                            source={{uri:item1.thumbnail}}
                                            style={{
                                                marginLeft:10,
                                                borderRadius: 35,
                                                width:35,
                                                height:35
                                            }}
                                        />
                                        <Text style={{color:'#b4c1b9',marginLeft:15,fontSize:12}}>{item1.name}</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        onPress={()=>{
                                            let setarrayalimentedit = { type: SET_ARRAY_ALIMENT_EDIT, value: [] }
                                            this.props.dispatch(setarrayalimentedit);
                                            if(this.props.navigation.navigate('MesRepasItem',{item_id_repas:item1.id})){}
                                            else{
                                                this.props.navigation.navigate('MesRepasItemDashboard',{item_id_repas:item1.id})
                                            }
                                        }}
                                        style={{alignItems:'flex-start',justifyContent:'flex-end'}}>
                                        <Text style={{color:'#8e9992',marginLeft:20,fontSize:12,}}>{item1.kilocalorie}Calories</Text>
                                    </TouchableOpacity>
                                    <View style={{width:'20%',justifyContent:'center',alignItems:'flex-end',marginRight:10,}}>
                                        <TouchableOpacity
                                            onPress={()=>{
                                                console.warn('item id',item1.id)
                                                this.save_alimentMesRepas(item1.id)
                                            }}
                                            style={this.ajouterstyle}>
                                            {/*ajouter*/}
                                            <Text style={{color:'white',fontSize:12}}>{'+'}</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            )
                        }

                    )
                }
                <TouchableOpacity
                    onPress={()=>{
                        if(this.state.navigation.navigate("CreerRepas",{paramRepasType:5})){}
                        else{
                            this.state.navigation.navigate("CreerRepasDashboard",{paramRepasType:5})
                        }

                    }}
                    style={{marginBottom:screenWidth*0.25,marginTop:15, alignSelf:'center'}}>
                    {/*Boutton*/}
                    <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} colors={[colors.red, 'rgb(229, 35, 48)', '#F93529']}
                                    style={{width:screenWidth*0.35,alignItems:'center',borderRadius:15,height:screenWidth*0.06,justifyContent:'center'}}>
                        <Text style={{fontSize:12,color:'#F4B8BF'}}>
                            {"CREER UN REPAS"}
                        </Text>
                    </LinearGradient>
                </TouchableOpacity>
            </LinearGradient>
        </ScrollView>
    );


    SecondRouteSearch_Diner = () => {
        return(
            <ScrollView
                keyboardShouldPersistTaps={'always'}
                refreshControl={
                    <RefreshControl
                        refreshing={this.state.refreshingy} //tsy  baikon'ny refreshing intson, fa nataoko amny  loading
                        onRefresh={() => {
                            this. getalldata(null,true);
                            this.setState({ refreshingy: true })
                            setTimeout(() => {
                                this.setState({ refreshingy: false })
                            }, 2000)
                        }}
                    />
                }

                style={{width:'100%',marginTop:screenWidth*0.03,paddingBottom:screenWidth*0.3}}>
                <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }} colors={[colors.balck, colors.green,  '#213D2E']} style={{paddingBottom:screenWidth*0.12,flex:1}}>
                    {
                        this.state.filteredDinerfiltered.length > 0 ?
                            this.state.filteredDinerfiltered.map(
                                (item1)=>{
                                    return(
                                        <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between',width:'100%',height:screenWidth*0.13,backgroundColor:'#213D2E',marginBottom:3}}>
                                            <TouchableOpacity
                                                onPress={()=>{
                                                    let setarrayalimentedit = { type: SET_ARRAY_ALIMENT_EDIT, value: [] }
                                                    this.props.dispatch(setarrayalimentedit);
                                                    if(this.props.navigation.navigate('MesRepasItem',{item_id_repas:item1.id})){}
                                                    else{
                                                        this.props.navigation.navigate('MesRepasItemDashboard',{item_id_repas:item1.id})
                                                    }
                                                }}
                                                style={{flexDirection:'row',alignItems:'center',width:'30%'}}>

                                                <Image
                                                    //   width={35}
                                                    source={{uri:item1.thumbnail}}
                                                    style={{
                                                        marginLeft:10,
                                                        borderRadius: 35,
                                                        width:35,
                                                        height:35
                                                    }}
                                                />
                                                <Text style={{color:'#b4c1b9',marginLeft:15,fontSize:12}}>{item1.name}</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity
                                                onPress={()=>{
                                                    let setarrayalimentedit = { type: SET_ARRAY_ALIMENT_EDIT, value: [] }
                                                    this.props.dispatch(setarrayalimentedit);
                                                    if(this.props.navigation.navigate('MesRepasItem',{item_id_repas:item1.id})){}
                                                    else{
                                                        this.props.navigation.navigate('MesRepasItemDashboard',{item_id_repas:item1.id})
                                                    }
                                                }}
                                                style={{alignItems:'flex-start',justifyContent:'flex-end'}}>
                                                <Text style={{color:'#8e9992',marginLeft:20,fontSize:12,}}>{item1.kilocalorie}Calories</Text>
                                            </TouchableOpacity>
                                            <View style={{width:'20%',justifyContent:'center',alignItems:'flex-end',marginRight:10,}}>
                                                <TouchableOpacity
                                                    onPress={()=>{
                                                        console.warn('item id',item1.id)
                                                        this.save_alimentMesRepas(item1.id)
                                                    }}

                                                    style={this.ajouterstyle}>
                                                    {/*ajouter*/}
                                                    <Text style={{color:'white',fontSize:12}}>{'+'}</Text>
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                    )
                                }
                            )
                            :
                            ( this.state.indexrepas ===4 &&
                                this.props.diner.length>0 ) && this.props.diner.map(
                            (item1)=>{
                                return(
                                    <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between',width:'100%',height:screenWidth*0.13,backgroundColor:'#213D2E',marginBottom:3}}>
                                        <TouchableOpacity
                                            onPress={()=>{
                                                let setarrayalimentedit = { type: SET_ARRAY_ALIMENT_EDIT, value: [] }
                                                this.props.dispatch(setarrayalimentedit);
                                                if(this.props.navigation.navigate('MesRepasItem',{item_id_repas:item1.id})){}
                                                else{
                                                    this.props.navigation.navigate('MesRepasItemDashboard',{item_id_repas:item1.id})
                                                }
                                            }}
                                            style={{flexDirection:'row',alignItems:'center',width:'30%'}}>

                                            <Image
                                                //   width={35}
                                                source={{uri:item1.thumbnail}}
                                                style={{
                                                    marginLeft:10,
                                                    borderRadius: 35,
                                                    width:35,
                                                    height:35
                                                }}
                                            />
                                            <Text style={{color:'#b4c1b9',marginLeft:15,fontSize:12}}>{item1.name}</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            onPress={()=>{
                                                let setarrayalimentedit = { type: SET_ARRAY_ALIMENT_EDIT, value: [] }
                                                this.props.dispatch(setarrayalimentedit);
                                                if(this.props.navigation.navigate('MesRepasItem',{item_id_repas:item1.id})){}
                                                else{
                                                    this.props.navigation.navigate('MesRepasItemDashboard',{item_id_repas:item1.id})
                                                }
                                            }}
                                            style={{alignItems:'flex-start',justifyContent:'flex-end'}}>
                                            <Text style={{color:'#8e9992',marginLeft:20,fontSize:12,}}>{item1.kilocalorie}Calories</Text>
                                        </TouchableOpacity>
                                        <View style={{width:'20%',justifyContent:'center',alignItems:'flex-end',marginRight:10,}}>
                                            <TouchableOpacity
                                                onPress={()=>{
                                                    console.warn('item id',item1.id)
                                                    this.save_alimentMesRepas(item1.id)
                                                }}
                                                style={this.ajouterstyle}>
                                                {/*ajouter*/}
                                                <Text style={{color:'white',fontSize:12}}>{'+'}</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                )
                            }
                            )
                    }
                </LinearGradient>
            </ScrollView>
        );};


    Thirdroute  = () => (
        <ScrollView style={{width:'100%',marginTop:screenWidth*0.03,}}
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.refreshingy}
                            onRefresh={() => {
                                this. getalldata(null,true);
                                this.setState({ refreshingy: true })
                                setTimeout(() => {
                                    this.setState({ refreshingy: false })
                                }, 2000)
                            }}
                        />
                    }
        >
            <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }} colors={[colors.balck, colors.green,  '#213D2E']} style={{paddingBottom:screenWidth*0.12}}>
                {
                    this.props.eatrecently.length>0 && this.props.eatrecently.map(
                        (item)=>{
                            return(
                                <View style={{flexDirection:'column',justifyContent:'flex-start',backgroundColor:'#14261D'}}>
                                    <Text style={{color:'#7c8e85',paddingLeft:screenWidth*0.07,fontSize:13,paddingTop:2,paddingBottom:3}}>{item.name}</Text>
                                    {
                                        item.aliment.length>0 && item.aliment.map(
                                            (item1)=>{
                                                return(
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
                                                            onPress={()=>{
                                                                if( this.props.navigation.navigate('MesProduits_NosSuggesstion_Item',{item:item,item1:item1})){}
                                                                else{
                                                                    this.props.navigation.navigate('MesProduits_NosSuggesstion_Item_dashboard',{item:item,item1:item1})
                                                                }
                                                            }}
                                                            style={{flexDirection:'row',alignItems:'center',width:'39%',height:screenWidth*0.09}}>
                                                            <View style={{borderRadius:screenWidth*0.04,width:screenWidth*0.04,height:screenWidth*0.04,backgroundColor:item1.color,marginLeft:screenWidth*0.03}}/>
                                                            <View style={screenWidth <= 360 ? {width:90} :{width:screenWidth*0.3}}><Text style={{color:'#b4c1b9',marginLeft:10,fontSize:12}}>{item1.name}</Text></View>
                                                        </TouchableOpacity>
                                                        <TouchableOpacity
                                                            onPress={()=>{
                                                                if( this.props.navigation.navigate('MesProduits_NosSuggesstion_Item',{item:item,item1:item1})){}
                                                                else{
                                                                    this.props.navigation.navigate('MesProduits_NosSuggesstion_Item_dashboard',{item:item,item1:item1})
                                                                }
                                                            }}
                                                            style={{width:'19%',height:screenWidth*0.09,justifyContent: 'center',alignItems:'flex-start'}}>
                                                            <Text style={{color:'#8e9992',fontSize:11,paddingLeft:screenWidth*0.05}}>{item1.kilocalorie} Kcal</Text>
                                                        </TouchableOpacity>
                                                        {/*<View style={{}}>*/}
                                                        <View style={{width:'29%',justifyContent:'center',height:screenWidth*0.09,alignItems:'flex-start',paddingLeft:screenWidth*0.03}}>
                                                            <Text style={{color:'#8e9992',fontSize:11}}>Qté suggérée: {item1.quantite}</Text>
                                                        </View>
                                                        <View style={{width:'12%',justifyContent:'center',alignItems:'flex-end',marginRight:10,height:screenWidth*0.09}}>
                                                            <TouchableOpacity

                                                                onPress={()=>{
                                                                    // monassiete
                                                                    let repas_type_id = item1.repas_type_id; //ts miasa ity
                                                                    let food_id = item1.food_id;
                                                                    this.save_food(global.repas_type_id,food_id)
                                                                }}

                                                                style={this.ajouterstyle}>
                                                                {/*ajouter*/}
                                                                <Text style={{color:'white',fontSize:12}}>{'+'}</Text>
                                                            </TouchableOpacity>
                                                        </View>
                                                    </View>
                                                )
                                            }
                                        )}
                                </View>
                            )
                        }
                    )
                }
            </LinearGradient>
        </ScrollView>
    );

    _handleIndexChange = index => this.setState({ index:index });

    _renderTabBar = props => {
        const inputRange = props.navigationState.routes.map((x, i) => i);

        return (
            <View style={{ marginBottom:-12,}}>
                <TabBar
                    {...props}
                    activeColor={'yellow'}
                    indicatorStyle={{ backgroundColor: '#FF3A28' }}
                    //    getLabelText={({ route }) => { return(<Text>{route.title}</Text>)}}
                    style={{
                        backgroundColor: '#213D2E',
                        marginTop:-20,
                        fontSize:11,
                    }}
                    // onTabPress={({ route }) => {
                    //     if (route.key === 'first') {
                    //
                    //         console.warn('bob')
                    //         // Do something else
                    //     }
                    // }}
                    onIndexChange={
                        // console.warn('index',index)
                        this.coloronIndexChange ='#FF3A28'//orange
                    }
                    renderLabel={({ route, focused, color }) =>{
                        if(route.key==='first' && this.state.index === 0){
                            return (
                                <Text style={{ color:this.coloronIndexChange, margin: 8, }}>
                                    {route.title}
                                </Text>
                            )
                        }else if(route.key==='second' &&  this.state.index === 1){
                            return (
                                <Text style={{ color:this.coloronIndexChange, margin: 8 }}>
                                    {route.title}
                                </Text>
                            )
                        }else if(route.key==='third' &&  this.state.index === 2){
                            return (
                                <Text style={{ color:this.coloronIndexChange, margin: 8 }}>
                                    {route.title}
                                </Text>
                            )
                        }else{
                            //gray
                            return (
                                <Text style={{ color:'#84968d', margin: 8 }}>
                                    {route.title}
                                </Text>
                            )
                        }
                    }
                    }
                />
                {//le index, index tabview
                    this.state.index === 0 &&
                    <View style={{backgroundColor: '#15261d',width:'100%',alignItems:'center',paddingVertical:7}}>
                        <Text style={{color:'#afb7bf',fontSize:12,}}>Veuillez sélectionner au moins un aliment par famille</Text>
                    </View>
                }
                {//le index, index tabview
                    this.state.index === 1 &&
                    <View style={{height:screenWidth*0.08, flexDirection:'row',alignItems:'center',justifyContent: 'space-between',backgroundColor: '#15261d',paddingHorizontal:12}}>
                        { this.state.indexrepas !== 0 ?
                            <TouchableOpacity
                                onPress={()=>{
                                    if(this.state.indexrepas>0) {
                                        this.getalldata(this.state.indexrepas - 1,false);
                                        console.warn('index repas nataoko - 1',this.state.indexrepas  - 1);
                                        this.setState({indexrepas: this.state.indexrepas - 1});
                                    }
                                }}
                            >
                                <AutoHeightImage
                                    width={14}
                                    style={{ transform: [{ rotateY: "180deg" }],}}
                                    source={require('../../../../assets/icons/arrow-white.png')} />
                            </TouchableOpacity>
                            :
                            <View/>
                        }
                        <Text style={{color:'#afb7bf',fontSize:12,}}>
                            {
                                // this.state.itemscrollablemesrepas[this.state.indexrepas]
                                this.props.repasType[this.state.indexrepas]
                            }
                        </Text>

                        {  this.state.indexrepas !== this.props.repasType.length-1 ?
                            <TouchableOpacity
                                onPress={()=>{
                                    if(this.state.indexrepas<this.props.repasType.length-1) {

                                        this.getalldata(this.state.indexrepas + 1,false);
                                        console.warn('indexrp +',this.state.indexrepas + 1);
                                        this.setState({indexrepas: this.state.indexrepas+1})
                                    }
                                }}
                            >
                                <AutoHeightImage
                                    width={14}
                                    source={require('../../../../assets/icons/arrow-white.png')} />
                            </TouchableOpacity> :
                            <View/>
                        }
                        {/*{this.props.mesRepaspetitsdejeuner.length>0 && (<Text style={{color:'white'}}>Bob</Text>)}*/}
                        {/*<Text style={{color:'white'}}>{JSON.stringify(this.props.mesRepaspetitsdejeuner)}</Text>*/}
                    </View>
                }
            </View>

        );
    };

    _renderScene = SceneMap({
        first: this.FirstRoute,
        second: this.SecondRoute,
        third: this.Thirdroute,
    });

    _renderSceneSearch_NosSuggestion = SceneMap({
        first: this.FirstRouteSearch_NosSuggestion,
        second: this.SecondRouteSearch_PetitsDejeuner,
        third: this.ThirdRouteSearch_EatRecently,
    });

    _renderScenecollationmatin= SceneMap({
        first: this.FirstRoute,
        second: this.SecondRoutecollationmatin,
        third: this.Thirdroute,
    });

    _renderSceneSearch_collationmatin= SceneMap({
        first: this.FirstRouteSearch_NosSuggestion,
        second: this.SecondRouteSearch_Collationmatin,
        third: this.ThirdRouteSearch_EatRecently,
    });

    _renderScenedejeuner= SceneMap({
        first: this.FirstRoute,
        second: this.SecondRoutedejeuner,
        third: this.Thirdroute,
    });

    _renderSceneSearch_dejeuner = SceneMap({
        first: this.FirstRouteSearch_NosSuggestion,
        second: this.SecondRouteSearch_Dejeuner,
        third: this.ThirdRouteSearch_EatRecently,
    });

    _renderSceneCollationapresmidi = SceneMap({
        first: this.FirstRoute,
        second: this.secondRouteApresmidi,
        third: this.Thirdroute,
    });

    _renderSceneSearch_Collationapresmidi = SceneMap({
        first: this.FirstRouteSearch_NosSuggestion,
        second: this.SecondRouteSearch_CollationApresMidi,
        third: this.ThirdRouteSearch_EatRecently,
    });

    _renderSceneDiner = SceneMap({
        first: this.FirstRoute,
        second: this.secondRouteDiner,
        third: this.Thirdroute,
    });

    _renderSceneSearch_Diner = SceneMap({
        first: this.FirstRouteSearch_NosSuggestion,
        second: this.SecondRouteSearch_Diner,
        third: this.ThirdRouteSearch_EatRecently,
    });


    search(){
        // if(this.state.textSearch.length>0){
        //
        //
        // }
        //this.setState({refreshing:true});

        this.setState({filteredNosSuggestionfiltered:[],
                            filteredmesRepaspetitsdejeunerfiltered:[],
                            filteredEatRecentlyfiltered:[],
                            filteredCollationmatinfiltered:[],
                            filteredDejeunerfiltered:[],
                            filteredCollationApresMidifiltered:[],
                              filteredDinerfiltered:[],

        },()=>{
            if(this.state.textSearch.length>0){
                const filteredNosSuggestion0 = this.props.nosSuggestions.filter(createFilter(this.state.textSearch, KEYS_TO_FILTERS0));
                //savaina tsirairay
                if(filteredNosSuggestion0.length>0) {
                    this.setState({filteredNosSuggestionfiltered : filteredNosSuggestion0});
                }else{
                    for (let i = 0; i < this.props.nosSuggestions.length; i++) {
                        if(this.props.nosSuggestions[i].aliment.length>0) {//esorina
                            let filteredNosSuggestion1_ = this.props.nosSuggestions[i].aliment.filter(createFilter(this.state.textSearch, KEYS_TO_FILTERS1));//aliments am api fa namoronako json tany am fonction redondant aliment tampoka
                            //  console.warn('filteredNosSuggestion1_',filteredNosSuggestion1_);
                            if(filteredNosSuggestion1_.length>0){
                                let item = {
                                    id: this.props.nosSuggestions[i].id,
                                    name: this.props.nosSuggestions[i].name,
                                    is_active: this.props.nosSuggestions[i].is_active,
                                    created: this.props.nosSuggestions[i].created,
                                    modified: this.props.nosSuggestions[i].modified,
                                };
                                item.aliment = filteredNosSuggestion1_;
                                this.state.filteredNosSuggestionfiltered.push(item);
                            }
                        }
                    }
                    this.setState({filteredNosSuggestionfiltered : this.state.filteredNosSuggestionfiltered})
                    this.setState({refreshing:false});
                }


                const filteredEatRecently = this.props.nosSuggestions.filter(createFilter(this.state.textSearch, KEYS_TO_FILTERS0));
                //savaina tsirairay
                if(filteredEatRecently.length>0) {
                    this.setState({filteredEatRecentlyfiltered : filteredEatRecently});
                }else{
                    for (let i = 0; i < this.props.eatrecently.length; i++) {
                        if(this.props.eatrecently[i].aliment.length>0) {//esorina
                            let filteredEatRecently1_ = this.props.eatrecently[i].aliment.filter(createFilter(this.state.textSearch, KEYS_TO_FILTERS1));
                            if(filteredEatRecently1_.length>0){
                                let item = {
                                    id: this.props.nosSuggestions[i].id,
                                    name: this.props.nosSuggestions[i].name,
                                    is_active: this.props.nosSuggestions[i].is_active,
                                    created: this.props.nosSuggestions[i].created,
                                    modified: this.props.nosSuggestions[i].modified,
                                };
                                item.aliment = filteredEatRecently1_;
                                this.state.filteredEatRecentlyfiltered.push(item);
                            }
                        }
                    }
                    this.setState({filteredEatRecentlyfiltered : this.state.filteredEatRecentlyfiltered})
                }


                //petits dejeuner
                const filteredPetitsDejeuner = this.props.mesRepaspetitsdejeuner.filter(createFilter(this.state.textSearch, KEYS_TO_FILTERS0));
                if(filteredPetitsDejeuner.length>0) {
                    this.setState({filteredmesRepaspetitsdejeunerfiltered : filteredPetitsDejeuner});
                }

                //filtered collation matin
                const filteredCollationmatin = this.props.collationmatin.filter(createFilter(this.state.textSearch, KEYS_TO_FILTERS0));
                if(filteredCollationmatin.length>0) {
                    this.setState({filteredCollationmatinfiltered : filteredCollationmatin});
                }

                //filtered collation matin
                const filteredDejeuner = this.props.dejeuner.filter(createFilter(this.state.textSearch, KEYS_TO_FILTERS0));
                if(filteredDejeuner.length>0) {
                    this.setState({filteredDejeunerfiltered : filteredDejeuner});
                }

                const filteredCollationApresMidi = this.props.collationapresmidi.filter(createFilter(this.state.textSearch, KEYS_TO_FILTERS0));
                if(filteredCollationApresMidi.length>0) {
                    this.setState({filteredCollationApresMidifiltered : filteredCollationApresMidi});
                }

                const filteredCollationDiner = this.props.diner.filter(createFilter(this.state.textSearch, KEYS_TO_FILTERS0));
                if(filteredCollationDiner.length>0) {
                    this.setState({filteredDinerfiltered : filteredCollationDiner});
                }

            }else{
                this.setState({filteredNosSuggestionfiltered:[]})
                this.setState({filteredEatRecentlyfiltered:[]})
                //secondtab
                this.setState({filteredmesRepaspetitsdejeunerfiltered:[]})
                this.setState({filteredCollationmatinfiltered:[]})
                this.setState({filteredDejeunerfiltered:[]})
                this.setState({filteredCollationApresMidifiltered:[]})
                this.setState({filteredDinerfiltered:[]})
                this.setState({refreshing:false});
            }
        });



    }

    render() {
        console.warn('index repas',this.state.indexrepas);
        console.warn('this.props.mesRepaspetitsdejeuner',this.props.mesRepaspetitsdejeuner);
        let collationmatinrendered = this.props.collationmatin;
        console.warn('collationmatinrendered',collationmatinrendered);
        return (
            <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }} colors={[colors.balck, colors.green,  '#213D2E']} style={{flex:1}}>
                <Loading load={this.state.refreshing} />
                <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }} colors={[colors.balck, colors.green,  '#213D2E']} style={{
                    height:screenWidth*0.41,
                    justifyContent: 'center',alignItems:'center'}}>

                    <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between',width:screenWidth,marginLeft:screenWidth*0.1}}>
                        <TouchableOpacity style={{
                            width: 40, height: 40,
                            justifyContent: "center"
                        }}
                                          onPress={() => {
                                              this.props.navigation.goBack()
                                              const setActiveFPAction = { type: SET_ACTIVE_FP, value: -1 }
                                              this.props.dispatch(setActiveFPAction)
                                              // const setnosSuggestions = { type: SET_NOS_SUGGESTION, value: [] } //eto zany za no mi-trave
                                              // this.props.dispatch(setnosSuggestions);
                                          }}>
                            <AutoHeightImage
                                width={20}
                                source={require("../../../../assets/icons/arrow-white.png")}
                                style={{
                                    transform: [
                                        { rotateY: "180deg" }
                                    ]
                                }} />
                        </TouchableOpacity>
                        <Text style={{
                            color: colors.white,
                            fontSize: 20,
                            marginRight:12
                        }}>
                            Sélectionner
                        </Text>
                        <View/>
                        <View/>
                    </View>

                    <View style={{}}>
                        <TouchableOpacity onPress={()=>{
                            this.search();
                            Keyboard.dismiss();

                        }}
                                          style={{position:'absolute',top:screenWidth*0.07,zIndex:1,left:screenWidth*0.02}}
                        >
                            <Image
                                style={{width: 23, height: 23,}}
                                source={require('../../../../assets/icons/search.png')}
                            />
                        </TouchableOpacity>
                        {/*<TextInput*/}
                        {/*    style={{height: 40,*/}
                        {/*        width:screenWidth*0.8,*/}
                        {/*        backgroundColor:'#27322C',*/}
                        {/*        marginTop:screenWidth*0.05,*/}
                        {/*        borderRadius:5,*/}
                        {/*        borderWidth:1,*/}
                        {/*        borderColor:'#afb7bf',*/}
                        {/*        paddingLeft:38,*/}
                        {/*        color:'white'*/}
                        {/*    }}*/}
                        {/*    placeholder="c*/}
                        {/*    placeholderTextColor={'#afb7bf'}*/}
                        {/*    onChangeText={(text) => this.setState({textSearch:text})}*/}
                        {/*    value={this.state.textSearch}*/}
                        {/*/>*/}
                        <SearchInput
                            onChangeText={(term) => { this.setState({textSearch:term}) }}
                            onSubmitEditing = {()=>{
                                console.warn('bbob')
                                this.search()
                            }}
                            style={{height: 40,
                                width:screenWidth*0.8,
                                backgroundColor:'#27322C',
                                marginTop:screenWidth*0.05,
                                borderRadius:5,
                                borderWidth:1,
                                borderColor:'#afb7bf',
                                // paddingLeft:38,
                                paddingLeft:screenWidth*0.1,
                                color:'white'
                            }}
                            placeholderTextColor={'#afb7bf'}
                            placeholder="Trouver un produit"
                        />
                    </View>
                </LinearGradient>

                {  this.state.indexrepas == 0 &&
                (
                    ( this.state.filteredNosSuggestionfiltered.length >0 || this.state.filteredmesRepaspetitsdejeunerfiltered.length >0 )? //de aon ra tsis no suggestions io fa repas no mis
                        <TabView
                            navigationState={this.state}
                            renderScene={this._renderSceneSearch_NosSuggestion.bind(this)}
                            renderTabBar={this._renderTabBar}
                            onIndexChange={this._handleIndexChange}
                        />
                        :
                        <TabView
                            navigationState={this.state}
                            renderScene={this._renderScene.bind(this)}
                            renderTabBar={this._renderTabBar}
                            onIndexChange={this._handleIndexChange}
                        />
                )
                }

                {  this.state.indexrepas == 1 &&
                (
                        ( this.state.filteredNosSuggestionfiltered.length >0 || this.state.filteredCollationmatinfiltered.length >0 ) ?
                            <TabView
                                navigationState={this.state}
                                renderScene={this._renderSceneSearch_collationmatin.bind(this)}
                                renderTabBar={this._renderTabBar}
                                onIndexChange={this._handleIndexChange}
                            />
                            :
                            <TabView
                                navigationState={this.state}
                                renderScene={this._renderScenecollationmatin.bind(this)}
                                renderTabBar={this._renderTabBar}
                                onIndexChange={this._handleIndexChange}
                            />
                    )
                }

                {
               //     collationmatinrendered.length>0 ?
                }

                {  this.state.indexrepas == 2 && //dejeuner
                (
                    ( this.state.filteredNosSuggestionfiltered.length >0 || this.state.filteredDejeunerfiltered.length >0 )?
                        <TabView
                            navigationState={this.state}
                            renderScene={this._renderSceneSearch_dejeuner.bind(this)}
                            renderTabBar={this._renderTabBar}
                            onIndexChange={this._handleIndexChange}
                        />
                        :
                        ( this.props.dejeuner.length >=0 && <TabView
                            navigationState={this.state}
                            renderScene={this._renderScenedejeuner.bind(this)}
                            renderTabBar={this._renderTabBar}
                            onIndexChange={this._handleIndexChange}
                        />)
                )
                }

                {  this.state.indexrepas == 3 && //collation apres midi
                (
                    (this.state.filteredNosSuggestionfiltered.length >0 || this.state.filteredCollationApresMidifiltered.length >0 )?
                        <TabView
                            navigationState={this.state}
                            renderScene={this._renderSceneSearch_Collationapresmidi.bind(this)}
                            renderTabBar={this._renderTabBar}
                            onIndexChange={this._handleIndexChange}
                        />
                        :
                        <TabView
                            navigationState={this.state}
                            renderScene={this._renderSceneCollationapresmidi.bind(this)}
                            renderTabBar={this._renderTabBar}
                            onIndexChange={this._handleIndexChange}
                        />
                )
                }

                {  this.state.indexrepas == 4  && //collation apres midi
                (
                    (this.state.filteredNosSuggestionfiltered.length >0  || this.state.filteredDinerfiltered.length >0) ?
                        <TabView
                            navigationState={this.state}
                            renderScene={this._renderSceneSearch_Diner.bind(this)}
                            renderTabBar={this._renderTabBar}
                            onIndexChange={this._handleIndexChange}
                        />
                        :
                        <TabView
                            navigationState={this.state}
                            renderScene={this._renderSceneDiner.bind(this)}
                            renderTabBar={this._renderTabBar}
                            onIndexChange={this._handleIndexChange}
                        />
                )
                }

            </LinearGradient>
        );
    }
}


const mapStateToProps = (state) => {
    const { userToken,nosSuggestions,repasType ,mesRepaspetitsdejeuner,dejeuner,eatrecently,ArrayAlimentEdit,collationmatin,collationapresmidi,diner} = state.statedata
    return { userToken,nosSuggestions,repasType ,mesRepaspetitsdejeuner,dejeuner,eatrecently ,ArrayAlimentEdit,collationmatin,collationapresmidi,diner}
};

export default connect(mapStateToProps)(Petitdejeuner);


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    tabBar: {
        flexDirection: 'row',
        paddingTop: 20,
    },
    tabItem: {
        flex: 1,
        alignItems: 'center',
        padding: 16,
    },
});
