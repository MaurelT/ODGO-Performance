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
    SET_PARAMS_REPAS_TYPE,
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
import {getViaPostPetitsDejeuner, monassiete,getViaPostRepas} from '../../../../apis/FonctionRedondant';
import SearchInput, { createFilter } from 'react-native-search-filter';
import {Keyboard} from 'react-native'
import moment from 'moment';

const screen = Dimensions.get("window");
const screenWidth = screen.width

// const { navigate } = this.props.route.navigation;

this.ajouterstyle={width:screenWidth*0.2,height:screenWidth*0.06,backgroundColor:'#FF3A28',justifyContent:'center',alignItems:'center',borderRadius:6}
this.borderradiuscirclecolored = screenWidth * 0.04

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
            index: 0,
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

        this.iitem = {name:"item"};

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
        ];
        this.ajouterstyle={width:screenWidth*0.1,height:screenWidth*0.06,backgroundColor:'#FF3A28',justifyContent:'center',alignItems:'center',borderRadius:6,}
    }



    actualisefirst(){
        setTimeout(this._tabs.goToPage.bind(this._tabs,0),4);
        setTimeout(this._tabs.goToPage.bind(this._tabs,1),10);
        setTimeout(this._tabs.goToPage.bind(this._tabs,0),15)
    }

    actualisesecond(){
        setTimeout(this._tabs.goToPage.bind(this._tabs,1),4);
        setTimeout(this._tabs.goToPage.bind(this._tabs,0),10);
        setTimeout(this._tabs.goToPage.bind(this._tabs,1),15)
    }

    componentDidMount() {

        this.RepasTypes();
        setTimeout(()=>{
            this.setState({refreshing: false})
        },10000)
    }

    // getCompteurNutritionnelViaAjouterMesRepas = async () => {
    //     const compteurNutritionnel = await compteurNutritionnelHelper.getCompteurNutritionnel(this.props.userToken);
    //     if (compteurNutritionnel) {
    //         return compteurNutritionnel;
    //     }
    // };

    getalldata(index_repas_,venuderefresh){ //index repas

        if(venuderefresh === true){
            if(this.state.indexrepas === 0 ){ //petit dejeuner
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



    save_alimentMesRepas = async (idaliment) => {
        this.setState({refreshing: true});
        console.warn('id repas',idaliment)
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
                            this.setState({ refreshingy: true })
                            setTimeout(() => {
                                this.setState({ refreshingy: false })
                            }, 2000)
                        }}
                    />
                }
                contentContainerStyle={{width:'100%',marginTop:screenWidth*0.005}}>
                <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }} colors={[colors.balck, colors.green,  '#213D2E']} style={{paddingBottom:screenWidth}}>
                    {
                        this.props.nosSuggestions.length > 0 && this.props.nosSuggestions.map(
                            (item)=>{
                                return(
                                    <View style={{flexDirection:'column',justifyContent:'flex-start',backgroundColor:'#14261D'}}>
                                        <Text style={{color:'#7c8e85',paddingLeft:screenWidth*0.07,fontSize:13,paddingTop:2,paddingBottom:2}}>{item.name}</Text>
                                        {
                                            item.aliment.length>0 && item.aliment.map(
                                                (item1)=>{
                                                    return(
                                                        <TouchableOpacity
                                                            onPress={()=>{
                                                                if( this.props.navigation.navigate('MesProduits_NosSuggesstion_Item',{item:item,item1:item1,edit:false,aliment_id:item1.id,suggestion_id:item1.suggestion_id})){}
                                                                else{
                                                                    this.props.navigation.navigate('MesProduits_NosSuggesstion_Item_dashboard',{item:item,item1:item1,edit:false,aliment_id:item1.id,suggestion_id:item1.suggestion_id})
                                                                }
                                                            }}
                                                            style={{  //item1
                                                            flexDirection:'row',
                                                            alignItems:'center',
                                                            justifyContent:'space-between',
                                                            width:'100%',
                                                            height:screenWidth*0.08,
                                                            backgroundColor:'#213D2E',
                                                            marginBottom:2
                                                        }}>
                                                            <View

                                                                style={{flexDirection:'row',alignItems:'center',width:'51%',height:screenWidth*0.08}}>
                                                                <View style={{borderRadius:screenWidth*0.04,width:screenWidth*0.04,height:screenWidth*0.04,backgroundColor:item1.color,marginLeft:screenWidth*0.02}}/>
                                                                <View style={screenWidth <= 360 ? {width:"80%"} :{width:"80%"}}><Text style={{color:'#b4c1b9',marginLeft:10,fontSize:12}}>{item1.name}</Text></View>
                                                            </View>
                                                            <TouchableOpacity
                                                                onPress={()=>{
                                                                    if( this.props.navigation.navigate('MesProduits_NosSuggesstion_Item',{item:item,item1:item1,edit:false,aliment_id:item1.id,suggestion_id:item1.suggestion_id})){}
                                                                    else{
                                                                        this.props.navigation.navigate('MesProduits_NosSuggesstion_Item_dashboard',{item:item,item1:item1,edit:false,aliment_id:item1.id,suggestion_id:item1.suggestion_id})
                                                                    }
                                                                }}
                                                                style={{width:'19%',height:screenWidth*0.08,justifyContent: 'center',alignItems:'flex-start'}}>
                                                                <Text style={{color:'#8e9992',fontSize:11,paddingLeft:screenWidth*0.05}}>{item1.kilocalorie} Kcal</Text>
                                                            </TouchableOpacity>
                                                            {/*<View style={{}}>*/}
                                                            {/*<View style={{width:'29%',justifyContent:'center',height:screenWidth*0.09,alignItems:'flex-start',paddingLeft:screenWidth*0.03}}>*/}
                                                            {/*    <Text style={{color:'#8e9992',fontSize:11,textAlign:'center'}}>Qté suggérée: {item1.quantite}</Text>*/}
                                                            {/*</View>*/}
                                                            {/*<View style={{width:'12%',justifyContent:'center',alignItems:'flex-end',marginRight:10,height:screenWidth*0.09}}>*/}
                                                            {/*    <TouchableOpacity*/}
                                                            {/*        onPress={()=>{*/}
                                                            {/*            let repas_type_id = item1.repas_type_id;*/}
                                                            {/*            let food_id = item1.food_id;*/}
                                                            {/*            //satria petitsdejeuner le firstroute eto de 1*/}
                                                            {/*            // "data": [*/}
                                                            {/*            //     {*/}
                                                            {/*            //         "id": 1,*/}
                                                            {/*            //         "name": "Petit déjeuner"*/}
                                                            {/*            //     },*/}
                                                            {/*            //     {*/}
                                                            {/*            //         "id": 2,*/}
                                                            {/*            //         "name": "Collation matin"*/}
                                                            {/*            //     },*/}
                                                            {/*            //     {*/}
                                                            {/*            //         "id": 3,*/}
                                                            {/*            //         "name": "Déjeuner"*/}
                                                            {/*            //     },*/}
                                                            {/*            //     {*/}
                                                            {/*            //         "id": 4,*/}
                                                            {/*            //         "name": "Collation après-midi"*/}
                                                            {/*            //     },*/}
                                                            {/*            //     {*/}
                                                            {/*            //         "id": 5,*/}
                                                            {/*            //         "name": "Diner"*/}
                                                            {/*            //     }*/}
                                                            {/*            // ]*/}
                                                            {/*            this.save_food(global.repas_type_id,food_id);*/}
                                                            {/*        }}*/}

                                                            {/*        style={this.ajouterstyle}>*/}
                                                            {/*        /!*ajouter*!/*/}
                                                            {/*        <Text style={{color:'white',fontSize:12}}>{'+'}</Text>*/}
                                                            {/*    </TouchableOpacity>*/}
                                                            {/*</View>*/}
                                                        </TouchableOpacity>
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
                            this.setState({ refreshingy: true })
                            setTimeout(() => {
                                this.setState({ refreshingy: false })
                            }, 2000)
                        }}
                    />
                }

                contentContainerStyle={{width:'100%',marginTop:screenWidth*0.005}}
            >
                <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }} colors={[colors.balck, colors.green,  '#213D2E']} style={{paddingBottom:screenWidth}}>
                    {
                        this.state.filteredNosSuggestionfiltered.length > 0 ?
                        this.state.filteredNosSuggestionfiltered.map(

                                (item,index)=>{
                                   if(item.name ) {
                                       return (
                                           <View style={{
                                               flexDirection: 'column',
                                               justifyContent: 'flex-start',
                                               backgroundColor: '#14261D'
                                           }}><Text style={{
                                                   color: '#7c8e85',
                                                   paddingLeft: screenWidth * 0.07,
                                                   fontSize: 13,
                                                   paddingBottom: 2
                                               }}>{item.name}</Text>
                                               {

                                                                       item.aliment.length > 0 && item.aliment.map(
                                                                           (item1) => {
                                                                               return (
                                                                                   <TouchableOpacity style={{  //item1
                                                                                       flexDirection: 'row',
                                                                                       alignItems: 'center',
                                                                                       justifyContent: 'space-between',
                                                                                       width: '100%',
                                                                                       height: screenWidth * 0.08,
                                                                                       backgroundColor: '#213D2E',
                                                                                       marginBottom: 2
                                                                                   }}
                                                                                                     onPress={() => {
                                                                                                         // let dataForMesProduitsItem = {
                                                                                                         //     id:,
                                                                                                         //     name:,
                                                                                                         //     kilocalorie:,
                                                                                                         //     quantite:,
                                                                                                         //     glucide:,
                                                                                                         //     proteine:,
                                                                                                         //     lipide:,
                                                                                                         // };

                                                                                                         if (this.props.navigation.navigate('MesProduits_NosSuggesstion_Item', {
                                                                                                             item: item,
                                                                                                             item1: item1,
                                                                                                             edit: false,
                                                                                                             aliment_id: item1.id,
                                                                                                             suggestion_id: item1.suggestion_id
                                                                                                         })) {
                                                                                                         } else {
                                                                                                             this.props.navigation.navigate('MesProduits_NosSuggesstion_Item_dashboard', {
                                                                                                                 item: item,
                                                                                                                 item1: item1,
                                                                                                                 edit: false,
                                                                                                                 aliment_id: item1.id,
                                                                                                                 suggestion_id: item1.suggestion_id
                                                                                                             })
                                                                                                         }
                                                                                                     }}
                                                                                   ><View

                                                                                           style={{
                                                                                               flexDirection: 'row',
                                                                                               alignItems: 'center',
                                                                                               width: '51%',
                                                                                               height: screenWidth * 0.08
                                                                                           }}>
                                                                                           <View style={{
                                                                                               borderRadius: screenWidth * 0.04,
                                                                                               width: screenWidth * 0.04,
                                                                                               height: screenWidth * 0.04,
                                                                                               backgroundColor: item1.color,
                                                                                               marginLeft: screenWidth * 0.02
                                                                                           }}/>
                                                                                           <View
                                                                                               style={screenWidth <= 360 ? {width: "80%"} : {width: "80%"}}><Text
                                                                                               style={{
                                                                                                   color: '#b4c1b9',
                                                                                                   marginLeft: 10,
                                                                                                   fontSize: 12
                                                                                               }}>{item1.name}</Text>
                                                                                           </View>
                                                                                       </View>
                                                                                       <View
                                                                                           // onPress={() => {
                                                                                           //     if (this.props.navigation.navigate('MesProduits_NosSuggesstion_Item', {
                                                                                           //         item: item,
                                                                                           //         item1: item1,
                                                                                           //         edit: false,
                                                                                           //         aliment_id: item1.id,
                                                                                           //         suggestion_id: item1.suggestion_id
                                                                                           //     })) {
                                                                                           //     } else {
                                                                                           //         this.props.navigation.navigate('MesProduits_NosSuggesstion_Item_dashboard', {
                                                                                           //             item: item,
                                                                                           //             item1: item1,
                                                                                           //             edit: false,
                                                                                           //             aliment_id: item1.id,
                                                                                           //             suggestion_id: item1.suggestion_id
                                                                                           //         })
                                                                                           //     }
                                                                                           // }}
                                                                                           style={{
                                                                                               width: '19%',
                                                                                               height: screenWidth * 0.08,
                                                                                               justifyContent: 'center',
                                                                                               alignItems: 'flex-start'
                                                                                           }}>
                                                                                           <Text style={{
                                                                                               color: '#8e9992',
                                                                                               fontSize: 11,
                                                                                               paddingLeft: screenWidth * 0.05
                                                                                           }}>{item1.kilocalorie} Kcal</Text>
                                                                                       </View>
                                                                                       {/*<View style={{}}>*/}
                                                                                       {/*<View style={{width:'29%',justifyContent:'center',height:screenWidth*0.09,alignItems:'flex-start',paddingLeft:screenWidth*0.03}}>*/}
                                                                                       {/*    <Text style={{color:'#8e9992',fontSize:11,textAlign:'center'}}>Qté suggérée: {item1.quantite}</Text>*/}
                                                                                       {/*</View>*/}
                                                                                   </TouchableOpacity>
                                                                               )
                                                                           }
                                                                       )
                                                       }

                                           </View>
                                       )
                                   }
                                }
                            )
                            :
                            this.props.nosSuggestions.length > 0 && this.props.nosSuggestions.map(
                            (item,index)=>{
                                return(
                                    <View style={{flexDirection:'column',justifyContent:'flex-start',backgroundColor:'#14261D'}}>
                                        <Text style={{color:'#7c8e85',paddingLeft:screenWidth*0.07,fontSize:13,paddingTop:2,paddingBottom:2}}>{item.name}</Text>
                                        {
                                            item.aliment.length>0 && item.aliment.map(
                                                (item1)=>{
                                                    return(
                                                        <TouchableOpacity style={{  //item1
                                                            flexDirection:'row',
                                                            alignItems:'center',
                                                            justifyContent:'space-between',
                                                            width:'100%',
                                                            height:screenWidth*0.08,
                                                            backgroundColor:'#213D2E',
                                                            marginBottom:2
                                                        }}
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

                                                                              if( this.props.navigation.navigate('MesProduits_NosSuggesstion_Item',{item:item,item1:item1,edit:false,aliment_id:item1.id,suggestion_id:item1.suggestion_id})){}
                                                                              else{
                                                                                  this.props.navigation.navigate('MesProduits_NosSuggesstion_Item_dashboard',{item:item,item1:item1,edit:false,aliment_id:item1.id,suggestion_id:item1.suggestion_id})
                                                                              }
                                                                          }}
                                                        >
                                                            <View

                                                                style={{flexDirection:'row',alignItems:'center',width:'51%',height:screenWidth*0.08}}>
                                                                <View style={{borderRadius:screenWidth*0.04,width:screenWidth*0.04,height:screenWidth*0.04,backgroundColor:item1.color,marginLeft:screenWidth*0.03}}/>
                                                                <View style={screenWidth <= 360 ? {width:"80%"} :{width:"80%"}}><Text style={{color:'#b4c1b9',marginLeft:10,fontSize:12}}>{item1.name}</Text></View>
                                                            </View>
                                                            <View
                                                                // onPress={()=>{
                                                                //     if( this.props.navigation.navigate('MesProduits_NosSuggesstion_Item',{item:item,item1:item1,edit:false,aliment_id:item1.id,suggestion_id:item1.suggestion_id})){}
                                                                //     else{
                                                                //         this.props.navigation.navigate('MesProduits_NosSuggesstion_Item_dashboard',{item:item,item1:item1,edit:false,aliment_id:item1.id,suggestion_id:item1.suggestion_id})
                                                                //     }
                                                                // }}
                                                                style={{width:'19%',height:screenWidth*0.08,justifyContent: 'center',alignItems:'flex-start'}}>
                                                                <Text style={{color:'#8e9992',fontSize:11,paddingLeft:screenWidth*0.05}}>{item1.kilocalorie} Kcal</Text>
                                                            </View>
                                                            {/*<View style={{}}>*/}
                                                            {/*<View style={{width:'29%',justifyContent:'center',height:screenWidth*0.09,alignItems:'flex-start',paddingLeft:screenWidth*0.03}}>*/}
                                                            {/*    <Text style={{color:'#8e9992',fontSize:11,textAlign:'center'}}>Qté suggérée: {item1.quantite}</Text>*/}
                                                            {/*</View>*/}
                                                        </TouchableOpacity>
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

            contentContainerStyle={{width:'100%',marginTop:screenWidth*0.005}}
        >
            <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }} colors={[colors.balck, colors.green,  '#213D2E']} style={{marginBottom:screenWidth,width:'100%'}}>
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
                                        style={{flexDirection:'row',alignItems:'center',width:'50%'}}>

                                        <Image
                                            //   width={35}
                                            source={{uri:item1.thumbnail}}
                                            style={{
                                            marginLeft:10,
                                            borderRadius: 35,
                                            width:35,
                                            height:35,
                                            resizeMode: 'cover'
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
                                        <Text style={{color:'#8e9992',marginLeft:20,fontSize:12,}}>{item1.kilocalorie}Kilocalories</Text>
                                    </TouchableOpacity>
                                    <View style={{width:'20%',justifyContent:'center',alignItems:'flex-end',marginRight:10,}}>
                                        <TouchableOpacity
                                            onPress={()=>{

                                                console.warn('item id',item1)
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
                        let paramsrepast = { type: SET_PARAMS_REPAS_TYPE, value: 1 }
                        this.props.dispatch(paramsrepast);
                        if(this.props.navigation.navigate("CreerRepas",{paramRepasType:1})){}
                        else{
                            this.props.navigation.navigate("CreerRepasDashboard",{paramRepasType:1})
                        }
                    }}
                    style={{marginBottom:300,marginTop:15, alignSelf:'center'}}>
                    {/*Boutton*/}
                    <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} colors={[colors.red, 'rgb(229, 35, 48)', '#F93529']}
                                    style={{width:screenWidth*0.35,alignItems:'center',borderRadius:screenWidth * 0.06,height:screenWidth*0.06,justifyContent:'center'}}>
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

                contentContainerStyle={{width:'100%',marginTop:screenWidth*0.005}}>
                <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }} colors={[colors.balck, colors.green,  '#213D2E']} style={{width:'100%',paddingBottom:screenWidth}}>
                    {
                        this.state.filteredmesRepaspetitsdejeunerfiltered.length > 0 ?
                            this.state.filteredmesRepaspetitsdejeunerfiltered.map(
                                (item1)=>{
                                    return(
                                        <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between',width:'100%',height:screenWidth*0.13,backgroundColor:'#213D2E',marginBottom:2}}>
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
                                                style={{flexDirection:'row',alignItems:'center',width:'50%'}}>

                                                <Image
                                                    //   width={35}
                                                    source={{uri:item1.thumbnail}}
                                                    style={{
                                                        marginLeft:10,
                                                        borderRadius: 35,
                                                        width:35,
                                                        height:35,
                                                        resizeMode: 'cover'

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
                                                <Text style={{color:'#8e9992',marginLeft:20,fontSize:12,}}>{item1.kilocalorie}Kilocalories</Text>
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
                            )
                            :
                            ( this.state.indexrepas ===0 &&
                                this.props.mesRepaspetitsdejeuner.length>0 ) && this.props.mesRepaspetitsdejeuner.map(
                            (item1)=>{
                                return(
                                    <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between',width:'100%',height:screenWidth*0.13,backgroundColor:'#213D2E',marginBottom:2}}>
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
                                            style={{flexDirection:'row',alignItems:'center',width:'50%'}}>

                                            <Image
                                                //   width={35}
                                                source={{uri:item1.thumbnail}}
                                                style={{
                                                    marginLeft:10,
                                                    borderRadius: 35,
                                                    width:35,
                                                    height:35,
                                                    resizeMode: 'cover'

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
                                            <Text style={{color:'#8e9992',marginLeft:20,fontSize:12,}}>{item1.kilocalorie}Kilocalories</Text>
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
                            )
                    }
                    <TouchableOpacity
                        onPress={()=>{
                            let setarrayalimentcreate = { type: SET_ARRAY_ALIMENT_CREATE, value: [] }
                            this.props.dispatch(setarrayalimentcreate);
                            let paramsrepast = { type: SET_PARAMS_REPAS_TYPE, value: 1 }
                            this.props.dispatch(paramsrepast);
                            if(this.props.navigation.navigate("CreerRepas",{paramRepasType:1})){}
                            else{
                                this.props.navigation.navigate("CreerRepasDashboard",{paramRepasType:1})
                            }
                        }}
                        style={{marginBottom:300,marginTop:15, alignSelf:'center'}}>
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
            contentContainerStyle={{width:'100%',marginTop:screenWidth*0.005}}>
            <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }} colors={[colors.balck, colors.green,  '#213D2E']} style={{width:'100%',paddingBottom:screenWidth}}>
                {
                    // this.mesRepas.length>0 && this.mesRepas.map(
                    ( this.state.indexrepas ==1 &&
                        this.props.collationmatin.length>0 ) && this.props.collationmatin.map(
                        (item1)=>{
                            return(
                                <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between',width:'100%',height:screenWidth*0.13,backgroundColor:'#213D2E',marginBottom:2}}>
                                    <TouchableOpacity
                                        onPress={()=>{
                                            let setarrayalimentedit = { type: SET_ARRAY_ALIMENT_EDIT, value: [] }
                                            this.props.dispatch(setarrayalimentedit);
                                            if(this.props.navigation.navigate('MesRepasItem',{item_id_repas:item1.id})){}
                                            else{
                                                this.props.navigation.navigate('MesRepasItemDashboard',{item_id_repas:item1.id})
                                            }
                                        }}
                                        style={{flexDirection:'row',alignItems:'center',width:'50%'}}>

                                        <Image
                                            //   width={35}
                                            source={{uri:item1.thumbnail}}
                                            style={{
                                                marginLeft:10,
                                                borderRadius: 35,
                                                width:35,
                                                height:35,
                                                resizeMode: 'cover'

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
                                        <Text style={{color:'#8e9992',marginLeft:20,fontSize:12,}}>{item1.kilocalorie}Kilocalories</Text>
                                    </TouchableOpacity>
                                    <View style={{width:'20%',justifyContent:'center',alignItems:'flex-end',marginRight:10,}}>
                                        <TouchableOpacity
                                            onPress={()=>{
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
                        let paramsrepast = { type: SET_PARAMS_REPAS_TYPE, value: 2 }
                        this.props.dispatch(paramsrepast);
                        if(this.props.navigation.navigate("CreerRepas",{paramRepasType:2})){}//collationmatin
                        else{
                            this.props.navigation.navigate("CreerRepasDashboard",{paramRepasType:2})
                        }

                    }}
                    style={{marginBottom:300,marginTop:15, alignSelf:'center'}}>
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

                contentContainerStyle={{width:'100%',marginTop:screenWidth*0.005}}>
                <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }} colors={[colors.balck, colors.green,  '#213D2E']} style={{width:'100%',paddingBottom:screenWidth}}>
                    {
                        this.state.filteredCollationmatinfiltered.length > 0 ?
                            this.state.filteredCollationmatinfiltered.map(
                                (item1)=>{
                                    return(
                                        <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between',width:'100%',height:screenWidth*0.13,backgroundColor:'#213D2E',marginBottom:2}}>
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
                                                style={{flexDirection:'row',alignItems:'center',width:'50%'}}>

                                                <Image
                                                    //   width={35}
                                                    source={{uri:item1.thumbnail}}
                                                    style={{
                                                        marginLeft:10,
                                                        borderRadius: 35,
                                                        width:35,
                                                        height:35,
                                                        resizeMode: 'cover'

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
                                                <Text style={{color:'#8e9992',marginLeft:20,fontSize:12,}}>{item1.kilocalorie}Kilocalories</Text>
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
                                    <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between',width:'100%',height:screenWidth*0.13,backgroundColor:'#213D2E',marginBottom:2}}>
                                        <TouchableOpacity
                                            onPress={()=>{
                                                let setarrayalimentedit = { type: SET_ARRAY_ALIMENT_EDIT, value: [] }
                                                this.props.dispatch(setarrayalimentedit);
                                                if(this.props.navigation.navigate('MesRepasItem',{item_id_repas:item1.id})){}
                                                else{
                                                    this.props.navigation.navigate('MesRepasItemDashboard',{item_id_repas:item1.id})
                                                }
                                            }}
                                            style={{flexDirection:'row',alignItems:'center',width:'50%'}}>

                                            <Image
                                                //   width={35}
                                                source={{uri:item1.thumbnail}}
                                                style={{
                                                    marginLeft:10,
                                                    borderRadius: 35,
                                                    width:35,
                                                    height:35,
                                                    resizeMode: 'cover'

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
                                            <Text style={{color:'#8e9992',marginLeft:20,fontSize:12,}}>{item1.kilocalorie}Kilocalories</Text>
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
                            let setarrayalimentcreate = { type: SET_ARRAY_ALIMENT_CREATE, value: [] }
                            this.props.dispatch(setarrayalimentcreate);
                            let paramsrepast = { type: SET_PARAMS_REPAS_TYPE, value: 2 }
                            this.props.dispatch(paramsrepast);
                            if(this.props.navigation.navigate("CreerRepas",{paramRepasType:2})){}
                            else{
                                this.props.navigation.navigate("CreerRepasDashboard",{paramRepasType:2})
                            }
                        }}
                        style={{marginBottom:300,marginTop:15, alignSelf:'center'}}>
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
            contentContainerStyle={{width:'100%',marginTop:screenWidth*0.005}}>
            <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }} colors={[colors.balck, colors.green,  '#213D2E']} style={{width:"100%",paddingBottom:screenWidth}}>
                {
                    // this.mesRepas.length>0 && this.mesRepas.map(
                    ( this.state.indexrepas ===2 &&
                        this.props.dejeuner.length>0 ) && this.props.dejeuner.map(
                        (item1)=>{
                            return(
                                <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between',width:'100%',height:screenWidth*0.13,backgroundColor:'#213D2E',marginBottom:2}}>
                                    <TouchableOpacity
                                        onPress={()=>{
                                            let setarrayalimentedit = { type: SET_ARRAY_ALIMENT_EDIT, value: [] }
                                            this.props.dispatch(setarrayalimentedit);
                                            if(this.props.navigation.navigate('MesRepasItem',{item_id_repas:item1.id})){}
                                            else{
                                                this.props.navigation.navigate('MesRepasItemDashboard',{item_id_repas:item1.id})
                                            }
                                        }}
                                        style={{flexDirection:'row',alignItems:'center',width:'50%'}}>

                                        <Image
                                            //   width={35}
                                            source={{uri:item1.thumbnail}}
                                            style={{
                                                marginLeft:10,
                                                borderRadius: 35,
                                                width:35,
                                                height:35,
                                                resizeMode: 'cover'

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
                                        <Text style={{color:'#8e9992',marginLeft:20,fontSize:12,}}>{item1.kilocalorie}Kilocalories</Text>
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
                        let paramsrepast = { type: SET_PARAMS_REPAS_TYPE, value: 3 }
                        this.props.dispatch(paramsrepast);
                        if(this.props.navigation.navigate("CreerRepas",{paramRepasType:3})){} //dejeuner
                        else{
                            this.props.navigation.navigate("CreerRepasDashboard",{paramRepasType:3})
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

                contentContainerStyle={{width:'100%',marginTop:screenWidth*0.005}}>
                <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }} colors={[colors.balck, colors.green,  '#213D2E']} style={{width:'100%',paddingBottom:screenWidth}}>
                    {
                        this.state.filteredDejeunerfiltered.length > 0 ?
                            this.state.filteredDejeunerfiltered.map(
                                (item1)=>{
                                    return(
                                        <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between',width:'100%',height:screenWidth*0.13,backgroundColor:'#213D2E',marginBottom:2}}>
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
                                                style={{flexDirection:'row',alignItems:'center',width:'50%'}}>

                                                <Image
                                                    //   width={35}
                                                    source={{uri:item1.thumbnail}}
                                                    style={{
                                                        marginLeft:10,
                                                        borderRadius: 35,
                                                        width:35,
                                                        height:35,
                                                        resizeMode: 'cover'


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
                                                <Text style={{color:'#8e9992',marginLeft:20,fontSize:12,}}>{item1.kilocalorie}Kilocalories</Text>
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
                                    <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between',width:'100%',height:screenWidth*0.13,backgroundColor:'#213D2E',marginBottom:2}}>
                                        <TouchableOpacity
                                            onPress={()=>{
                                                let setarrayalimentedit = { type: SET_ARRAY_ALIMENT_EDIT, value: [] }
                                                this.props.dispatch(setarrayalimentedit);
                                                if(this.props.navigation.navigate('MesRepasItem',{item_id_repas:item1.id})){}
                                                else{
                                                    this.props.navigation.navigate('MesRepasItemDashboard',{item_id_repas:item1.id})
                                                }
                                            }}
                                            style={{flexDirection:'row',alignItems:'center',width:'50%'}}>

                                            <Image
                                                //   width={35}
                                                source={{uri:item1.thumbnail}}
                                                style={{
                                                    marginLeft:10,
                                                    borderRadius: 35,
                                                    width:35,
                                                    height:35,
                                                    resizeMode: 'cover'

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
                                            <Text style={{color:'#8e9992',marginLeft:20,fontSize:12,}}>{item1.kilocalorie}Kilocalories</Text>
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
                            let setarrayalimentcreate = { type: SET_ARRAY_ALIMENT_CREATE, value: [] }
                            this.props.dispatch(setarrayalimentcreate);
                            let paramsrepast = { type: SET_PARAMS_REPAS_TYPE, value: 3 }
                            this.props.dispatch(paramsrepast);
                            if(this.props.navigation.navigate("CreerRepas",{paramRepasType:3})){}
                            else{
                                this.props.navigation.navigate("CreerRepasDashboard",{paramRepasType:3})
                            }
                        }}
                        style={{marginBottom:300,marginTop:15, alignSelf:'center'}}>
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
            contentContainerStyle={{width:'100%',marginTop:screenWidth*0.005}}>
            <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }} colors={[colors.balck, colors.green,  '#213D2E']} style={{width:'100%',marginBottom:screenWidth}}>

                {
                    // this.mesRepas.length>0 && this.mesRepas.map(
                    ( this.state.indexrepas ===3 &&
                        this.props.collationapresmidi.length>0 ) && this.props.collationapresmidi.map(
                        (item1)=>{
                            return(
                                <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between',width:'100%',height:screenWidth*0.13,backgroundColor:'#213D2E',marginBottom:2}}>
                                    <TouchableOpacity
                                        onPress={()=>{
                                            let setarrayalimentedit = { type: SET_ARRAY_ALIMENT_EDIT, value: [] }
                                            this.props.dispatch(setarrayalimentedit);
                                            if(this.props.navigation.navigate('MesRepasItem',{item_id_repas:item1.id})){}
                                            else{
                                                this.props.navigation.navigate('MesRepasItemDashboard',{item_id_repas:item1.id})
                                            }
                                        }}
                                        style={{flexDirection:'row',alignItems:'center',width:'50%'}}>

                                        <Image
                                            //   width={35}
                                            source={{uri:item1.thumbnail}}
                                            style={{
                                                marginLeft:10,
                                                borderRadius: 35,
                                                width:35,
                                                height:35,
                                                resizeMode: 'cover'

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
                                        <Text style={{color:'#8e9992',marginLeft:20,fontSize:12,}}>{item1.kilocalorie}Kilocalories</Text>
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
                        let paramsrepast = { type: SET_PARAMS_REPAS_TYPE, value: 4 }
                        this.props.dispatch(paramsrepast);
                        if(this.props.navigation.navigate("CreerRepas",{paramRepasType:4})){}
                        else{
                            this.props.navigation.navigate("CreerRepasDashboard",{paramRepasType:4})
                        }

                    }}
                    style={{marginBottom:300,marginTop:15, alignSelf:'center'}}>
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

                style={{width:'100%',marginTop:screenWidth*0.005,flex:1}}>
                <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }} colors={[colors.balck, colors.green,  '#213D2E']} style={{width:'100%',height:screenHeight}}>
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
                                                style={{flexDirection:'row',alignItems:'center',width:'50%'}}>

                                                <Image
                                                    //   width={35}
                                                    source={{uri:item1.thumbnail}}
                                                    style={{
                                                        marginLeft:10,
                                                        borderRadius: 35,
                                                        width:35,
                                                        height:35,
                                                        resizeMode: 'cover'

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
                                                <Text style={{color:'#8e9992',marginLeft:20,fontSize:12,}}>{item1.kilocalorie}Kilocalories</Text>
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
                                    <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between',width:'100%',height:screenWidth*0.13,backgroundColor:'#213D2E',marginBottom:2}}>
                                        <TouchableOpacity
                                            onPress={()=>{
                                                let setarrayalimentedit = { type: SET_ARRAY_ALIMENT_EDIT, value: [] }
                                                this.props.dispatch(setarrayalimentedit);
                                                if(this.props.navigation.navigate('MesRepasItem',{item_id_repas:item1.id})){}
                                                else{
                                                    this.props.navigation.navigate('MesRepasItemDashboard',{item_id_repas:item1.id})
                                                }
                                            }}
                                            style={{flexDirection:'row',alignItems:'center',width:'50%'}}>

                                            <Image
                                                //   width={35}
                                                source={{uri:item1.thumbnail}}
                                                style={{
                                                    marginLeft:10,
                                                    borderRadius: 35,
                                                    width:35,
                                                    height:35,
                                                    resizeMode: 'cover'

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
                                            <Text style={{color:'#8e9992',marginLeft:20,fontSize:12,}}>{item1.kilocalorie}Kilocalories</Text>
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
                            let setarrayalimentcreate = { type: SET_ARRAY_ALIMENT_CREATE, value: [] }
                            this.props.dispatch(setarrayalimentcreate);
                            let paramsrepast = { type: SET_PARAMS_REPAS_TYPE, value: 4 }
                            this.props.dispatch(paramsrepast);
                            if(this.props.navigation.navigate("CreerRepas",{paramRepasType:4})){}
                            else{
                                this.props.navigation.navigate("CreerRepasDashboard",{paramRepasType:4})
                            }
                        }}
                        style={{marginBottom:300,marginTop:15, alignSelf:'center'}}>
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
            contentContainerStyle={{width:'100%',marginTop:screenWidth*0.005}}>
            <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }} colors={[colors.balck, colors.green,  '#213D2E']} style={{width:'100%',paddingBottom:screenWidth}}>
                {
                    // this.mesRepas.length>0 && this.mesRepas.map(
                    ( this.state.indexrepas ===4 &&
                        this.props.diner.length>0 ) && this.props.diner.map(
                        (item1)=>{
                            return(
                                <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between',width:'100%',height:screenWidth*0.13,backgroundColor:'#213D2E',marginBottom:2}}>
                                    <TouchableOpacity
                                        onPress={()=>{
                                            let setarrayalimentedit = { type: SET_ARRAY_ALIMENT_EDIT, value: [] }
                                            this.props.dispatch(setarrayalimentedit);
                                            if(this.props.navigation.navigate('MesRepasItem',{item_id_repas:item1.id})){}
                                            else{
                                                this.props.navigation.navigate('MesRepasItemDashboard',{item_id_repas:item1.id})
                                            }
                                        }}
                                        style={{flexDirection:'row',alignItems:'center',width:'50%'}}>

                                        <Image
                                            //   width={35}
                                            source={{uri:item1.thumbnail}}
                                            style={{
                                                marginLeft:10,
                                                borderRadius: 35,
                                                width:35,
                                                height:35,
                                                resizeMode: 'cover'

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
                                        <Text style={{color:'#8e9992',marginLeft:20,fontSize:12,}}>{item1.kilocalorie}Kilocalories</Text>
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
                        let paramsrepast = { type: SET_PARAMS_REPAS_TYPE, value: 5 }
                        this.props.dispatch(paramsrepast);
                        if(this.props.navigation.navigate("CreerRepas",{paramRepasType:5})){}
                        else{
                            this.props.navigation.navigate("CreerRepasDashboard",{paramRepasType:5})
                        }
                    }}
                    style={{marginBottom:300,marginTop:15, alignSelf:'center'}}>
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

                contentContainerStyle={{width:'100%',marginTop:screenWidth*0.005}}>
                <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }} colors={[colors.balck, colors.green,  '#213D2E']} style={{width:'100%',paddingBottom:screenWidth}}>
                    {
                        this.state.filteredDinerfiltered.length > 0 ?
                            this.state.filteredDinerfiltered.map(
                                (item1)=>{
                                    return(
                                        <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between',width:'100%',height:screenWidth*0.13,backgroundColor:'#213D2E',marginBottom:2}}>
                                            <TouchableOpacity
                                                onPress={()=>{
                                                    let setarrayalimentedit = { type: SET_ARRAY_ALIMENT_EDIT, value: [] }
                                                    this.props.dispatch(setarrayalimentedit);
                                                    if(this.props.navigation.navigate('MesRepasItem',{item_id_repas:item1.id})){}
                                                    else{
                                                        this.props.navigation.navigate('MesRepasItemDashboard',{item_id_repas:item1.id})
                                                    }
                                                }}
                                                style={{flexDirection:'row',alignItems:'center',width:'50%'}}>

                                                <Image
                                                    //   width={35}
                                                    source={{uri:item1.thumbnail}}
                                                    style={{
                                                        marginLeft:10,
                                                        borderRadius: 35,
                                                        width:35,
                                                        height:35,
                                                        resizeMode: 'cover'

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
                                                <Text style={{color:'#8e9992',marginLeft:20,fontSize:12,}}>{item1.kilocalorie}Kilocalories</Text>
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
                                    <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between',width:'100%',height:screenWidth*0.13,backgroundColor:'#213D2E',marginBottom:2}}>
                                        <TouchableOpacity
                                            onPress={()=>{
                                                let setarrayalimentedit = { type: SET_ARRAY_ALIMENT_EDIT, value: [] }
                                                this.props.dispatch(setarrayalimentedit);
                                                if(this.props.navigation.navigate('MesRepasItem',{item_id_repas:item1.id})){}
                                                else{
                                                    this.props.navigation.navigate('MesRepasItemDashboard',{item_id_repas:item1.id})
                                                }
                                            }}
                                            style={{flexDirection:'row',alignItems:'center',width:'50%'}}>

                                            <Image
                                                //   width={35}
                                                source={{uri:item1.thumbnail}}
                                                style={{
                                                    marginLeft:10,
                                                    borderRadius: 35,
                                                    width:35,
                                                    height:35,
                                                    resizeMode: 'cover'

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
                                            <Text style={{color:'#8e9992',marginLeft:20,fontSize:12,}}>{item1.kilocalorie}Kilocalories</Text>
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
                            let setarrayalimentcreate = { type: SET_ARRAY_ALIMENT_CREATE, value: [] }
                            this.props.dispatch(setarrayalimentcreate);
                            let paramsrepast = { type: SET_PARAMS_REPAS_TYPE, value: 5 }
                            this.props.dispatch(paramsrepast);
                            if(this.props.navigation.navigate("CreerRepas",{paramRepasType:5})){}
                            else{
                                this.props.navigation.navigate("CreerRepasDashboard",{paramRepasType:5})
                            }
                        }}
                        style={{marginBottom:300,marginTop:15, alignSelf:'center'}}>
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
        );};


    _handleIndexChange = index =>{ this.setState({ index:index });
            console.warn('the index',index)
    };

    _renderTabBar = props => {
        const inputRange = props.navigationState.routes.map((x, i) => i);

        return (
            <View style={{ }}>
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


                    renderLabel={({ route, focused, color }) =>{
                        if(route.key==='first' && this.state.index === 0){
                            return (
                                <Text style={{ color:"#FF3A28", margin: 8, }}>
                                    {route.title}
                                </Text>
                            )
                        }else if(route.key==='second' &&  this.state.index === 1) {
                            return (
                                <Text style={{color: "#FF3A28", margin: 8}}>
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
                {/*{//le index, index tabview*/}
                {/*    this.state.index === 0 &&*/}
                {/*    <View style={{backgroundColor: '#15261d',width:'100%',alignItems:'center',justifyContent:'center',paddingVertical:7}}>*/}
                {/*        <Text style={{color:'#afb7bf',fontSize:12,textAlign:'center'}}>Pour atteindre votre objectif, sélectionnez un aliment par famille</Text>*/}
                {/*    </View>*/}
                {/*}*/}
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

                        { this.state.indexrepas !== this.props.repasType.length-1 ?
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
                    </View>
                }
            </View>

        );
    };

    _renderScene = SceneMap({
        first: this.FirstRoute,
        second: this.SecondRoute
    });

    _renderSceneSearch_NosSuggestion = SceneMap({
        first: this.FirstRouteSearch_NosSuggestion,
        second: this.SecondRouteSearch_PetitsDejeuner
    });

    _renderScenecollationmatin= SceneMap({
        first: this.FirstRoute,
        second: this.SecondRoutecollationmatin
    });

    _renderSceneSearch_collationmatin= SceneMap({
        first: this.FirstRouteSearch_NosSuggestion,
        second: this.SecondRouteSearch_Collationmatin
    });

    _renderScenedejeuner= SceneMap({
        first: this.FirstRoute,
        second: this.SecondRoutedejeuner
    });

    _renderSceneSearch_dejeuner = SceneMap({
        first: this.FirstRouteSearch_NosSuggestion,
        second: this.SecondRouteSearch_Dejeuner
    });

    _renderSceneCollationapresmidi = SceneMap({
        first: this.FirstRoute,
        second: this.secondRouteApresmidi
    });

    _renderSceneSearch_Collationapresmidi = SceneMap({
        first: this.FirstRouteSearch_NosSuggestion,
        second: this.SecondRouteSearch_CollationApresMidi
    });

    _renderSceneDiner = SceneMap({
        first: this.FirstRoute,
        second: this.secondRouteDiner
    });

    _renderSceneSearch_Diner = SceneMap({
        first: this.FirstRouteSearch_NosSuggestion,
        second: this.SecondRouteSearch_Diner
    });


    search(){
        // if(this.state.textSearch.length>0){
        //
        //
        // }
        this.setState({refreshing:true});

        this.setState({filteredNosSuggestionfiltered:[],
            filteredmesRepaspetitsdejeunerfiltered:[],
            filteredEatRecentlyfiltered:[],
            filteredCollationmatinfiltered:[],
            filteredDejeunerfiltered:[],
            filteredCollationApresMidifiltered:[],
            filteredDinerfiltered:[],

        },()=>{
            if(this.state.textSearch.length>0){
                const filteredNosSuggestion0 = this.props.nosSuggestionssearch.filter(createFilter(this.state.textSearch, KEYS_TO_FILTERS0,{caseSensitive:false}));
                //savaina tsirairay
                console.warn('filteredNosSuggestion0',filteredNosSuggestion0)
                if(filteredNosSuggestion0.length>0) {
                    this.setState({filteredNosSuggestionfiltered : filteredNosSuggestion0});
                    this.setState({refreshing:false});
                }else{
                    console.warn('ici')
                    for (let i = 0; i < this.props.nosSuggestionssearch.length; i++) {
                        if(this.props.nosSuggestionssearch[i].aliment.length>0) {//esorina
                            let filteredNosSuggestion1_ = this.props.nosSuggestionssearch[i].aliment.filter(createFilter(this.state.textSearch, KEYS_TO_FILTERS1));//aliments am api fa namoronako json tany am fonction redondant aliment tampoka
                            //  console.warn('filteredNosSuggestion1_',filteredNosSuggestion1_);
                            if(filteredNosSuggestion1_.length>0){
                                let item = {
                                    id: this.props.nosSuggestionssearch[i].id,
                                    name: this.props.nosSuggestionssearch[i].name,
                                    is_active: this.props.nosSuggestionssearch[i].is_active,
                                    created: this.props.nosSuggestionssearch[i].created,
                                    modified: this.props.nosSuggestionssearch[i].modified,
                                };
                                item.aliment = filteredNosSuggestion1_;
                                    this.state.filteredNosSuggestionfiltered.push(item);


                            }
                        }
                    }
                    this.setState({filteredNosSuggestionfiltered : this.state.filteredNosSuggestionfiltered})
                     this.setState({refreshing:false});
                }


                // const filteredEatRecently = this.props.nosSuggestions.filter(createFilter(this.state.textSearch, KEYS_TO_FILTERS0));
                // //savaina tsirairay
                // if(filteredEatRecently.length>0) {
                //     this.setState({filteredEatRecentlyfiltered : filteredEatRecently});
                // }else{
                //     for (let i = 0; i < this.props.eatrecently.length; i++) {
                //         if(this.props.eatrecently[i].aliment.length>0) {//esorina
                //             let filteredEatRecently1_ = this.props.eatrecently[i].aliment.filter(createFilter(this.state.textSearch, KEYS_TO_FILTERS1));
                //             if(filteredEatRecently1_.length>0){
                //                 let item = {
                //                     id: this.props.nosSuggestions[i].id,
                //                     name: this.props.nosSuggestions[i].name,
                //                     is_active: this.props.nosSuggestions[i].is_active,
                //                     created: this.props.nosSuggestions[i].created,
                //                     modified: this.props.nosSuggestions[i].modified,
                //                 };
                //                 item.aliment = filteredEatRecently1_;
                //                 this.state.filteredEatRecentlyfiltered.push(item);
                //             }
                //         }
                //     }
                //     this.setState({filteredEatRecentlyfiltered : this.state.filteredEatRecentlyfiltered})
                // }

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
        let collationmatinrendered = this.props.collationmatin;
        return (
            <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }} colors={[colors.balck, colors.green,  '#213D2E']} style={{flex:1}}>
                <Loading load={this.state.refreshing} />
                <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }} colors={[colors.balck, colors.green,  '#213D2E']} style={{
                    justifyContent: 'center',alignItems:'center',paddingBottom:10
                }}>
                    <View style={{}}>
                        <TouchableOpacity onPress={()=>{
                            this.search();
                            Keyboard.dismiss();
                        }}
                                          style={{position:'absolute',top:screenHeight*0.04,zIndex:1,left:screenWidth*0.02}}
                        >
                            <Image
                                style={{width: 23, height: 23,}}
                                source={require('../../../../assets/icons/search.png')}
                            />
                        </TouchableOpacity>
                        <SearchInput
                            onChangeText={(term) => { this.setState({textSearch:term}) }}
                            onSubmitEditing = {()=>{
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

                {  this.state.indexrepas == 0 ?
                (
                    ( this.state.filteredNosSuggestionfiltered.length >0 || this.state.filteredmesRepaspetitsdejeunerfiltered.length >0 )? //de aon ra tsis no suggestions io fa repas no mis
                        <TabView
                            ref={component => this._tabs = component}
                            navigationState={this.state}
                            renderScene={this._renderSceneSearch_NosSuggestion.bind(this)}
                            renderTabBar={this._renderTabBar}
                            onIndexChange={this._handleIndexChange}
                        />
                        :
                        <TabView
                            ref={component => this._tabs = component}
                            navigationState={this.state}
                            renderScene={this._renderScene.bind(this)}
                            renderTabBar={this._renderTabBar}
                            onIndexChange={this._handleIndexChange}
                        />
                )
               :  this.state.indexrepas == 1 ?
                (
                    ( this.state.filteredNosSuggestionfiltered.length >0 || this.state.filteredCollationmatinfiltered.length >0 ) ?
                        <TabView
                            ref={component => this._tabs = component}
                            navigationState={this.state}
                            renderScene={this._renderSceneSearch_collationmatin.bind(this)}
                            renderTabBar={this._renderTabBar}
                            onIndexChange={this._handleIndexChange}
                        />
                        :
                        <TabView
                            ref={component => this._tabs = component}
                            navigationState={this.state}
                            renderScene={this._renderScenecollationmatin.bind(this)}
                            renderTabBar={this._renderTabBar}
                            onIndexChange={this._handleIndexChange}
                        />
                )
                :  this.state.indexrepas == 2 ? //dejeuner
                (
                    ( this.state.filteredNosSuggestionfiltered.length >0 || this.state.filteredDejeunerfiltered.length >0 )?
                        <TabView
                            ref={component => this._tabs = component}
                            navigationState={this.state}
                            renderScene={this._renderSceneSearch_dejeuner.bind(this)}
                            renderTabBar={this._renderTabBar}
                            onIndexChange={this._handleIndexChange}
                        />
                        :
                        ( this.props.dejeuner.length >=0 && <TabView
                            ref={component => this._tabs = component}
                            navigationState={this.state}
                            renderScene={this._renderScenedejeuner.bind(this)}
                            renderTabBar={this._renderTabBar}
                            onIndexChange={this._handleIndexChange}
                        />)
                )
               :  this.state.indexrepas == 3 ? //collation apres midi
                (
                    (this.state.filteredNosSuggestionfiltered.length >0 || this.state.filteredCollationApresMidifiltered.length >0 )?
                        <TabView
                            ref={component => this._tabs = component}
                            navigationState={this.state}
                            renderScene={this._renderSceneSearch_Collationapresmidi.bind(this)}
                            renderTabBar={this._renderTabBar}
                            onIndexChange={this._handleIndexChange}
                        />
                        :
                        <TabView
                            ref={component => this._tabs = component}
                            navigationState={this.state}
                            renderScene={this._renderSceneCollationapresmidi.bind(this)}
                            renderTabBar={this._renderTabBar}
                            onIndexChange={this._handleIndexChange}
                        />
                )
                :  this.state.indexrepas == 4  && //collation apres midi
                (
                    (this.state.filteredNosSuggestionfiltered.length >0  || this.state.filteredDinerfiltered.length >0) ?
                        <TabView
                            ref={component => this._tabs = component}
                            navigationState={this.state}
                            renderScene={this._renderSceneSearch_Diner.bind(this)}
                            renderTabBar={this._renderTabBar}
                            onIndexChange={this._handleIndexChange}
                        />
                        :
                        <TabView
                            ref={component => this._tabs = component}
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
    const { nosSuggestionssearch, userToken,nosSuggestions,repasType ,mesRepaspetitsdejeuner,dejeuner,eatrecently,ArrayAlimentEdit,collationmatin,collationapresmidi,diner} = state.statedata
    return { nosSuggestionssearch, userToken,nosSuggestions,repasType ,mesRepaspetitsdejeuner,dejeuner,eatrecently ,ArrayAlimentEdit,collationmatin,collationapresmidi,diner}
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
