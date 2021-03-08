import * as React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import {
    SET_ACTIVE_FP,
    SET_POP_TO_TOP,
    SET_NOS_SUGGESTION,
    SET_REPAS_TYPE,
    SET_PETITS_DEJEUNER, SET_PETITS_DEJEUNER_REPAS, SET_COMPTEUR_NUTRITIONNEL, SET_MON_ASSIETTE,
    SET_ARRAY_ALIMENT_CREATE, SET_ACTIVE_TAB,
} from '../../../../redux/types/tabTypes';
import { getSelectionnerNossuggestionsAll } from '../../../../apis/FonctionRedondant';

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
    RefreshControl, Alert, Keyboard,
} from 'react-native';
import Animated from 'react-native-reanimated';
import AutoHeightImage from 'react-native-auto-height-image';
import LinearGradient from "react-native-linear-gradient";
import colors from '../../../../configs/colors';
import compteurNutritionnelHelper from '../../../../apis/helpers/compteurNutritionnel_helper';
import pathologieHelper from '../../../../apis/helpers/pathologie_helper';
import {screenHeight} from '../../../../components/react-native-calendars/src/expandableCalendar/commons';
import SearchInput, {createFilter} from 'react-native-search-filter';
import baseStyles from '../../../../base/BaseStyles';
const screen = Dimensions.get("window");
const screenWidth = screen.width

// const { navigate } = this.props.route.navigation;

this.ajouterstyle={width:screenWidth*0.1,height:screenWidth*0.06,backgroundColor:'#FF3A28',justifyContent:'center',alignItems:'center',borderRadius:6}
this.borderradiuscirclecolored = screenWidth * 0.04

const KEYS_TO_FILTERS0 = ['name'];

const KEYS_TO_FILTERS1 = [//aliments
    'name','kcalorie_pour_100g'
];


class ItemAlimentForAdd  extends Component {


    constructor(props) {
        super(props)
        this.state = {
            index: 0,
            indexrepas: 0,
            navigation:this.props.navigation,
            refreshing:false,
            filteredNosSuggestionfiltered:[],
            textSearch:'',
            nosSuggestions:[],
        };

       this.ajouterstyle={width:screenWidth*0.1,height:screenWidth*0.06,backgroundColor:'#FF3A28',justifyContent:'center',alignItems:'center',borderRadius:6}

    }


    componentDidMount() {
        // this.setState({refreshing:true});
        // getSelectionnerNossuggestionsAll(this.props.userToken,this.props).then(()=>this.setState({refreshing:false}));

    }


    search(){
        this.setState({refreshing:true});
        if(this.state.textSearch.length>0){
            const filteredNosSuggestion0 = this.props.nosSuggestionssearch.filter(createFilter(this.state.textSearch, KEYS_TO_FILTERS0));
            //savaina tsirairay
            if(filteredNosSuggestion0.length>0) {
                this.setState({filteredNosSuggestionfiltered : filteredNosSuggestion0});
                this.setState({refreshing:false})

            }else{
                for (let i = 0; i < this.props.nosSuggestionssearch.length; i++) {
                    if(this.props.nosSuggestionssearch[i].aliment.length>0) {//esorina
                        let filteredNosSuggestion1_ = this.props.nosSuggestionssearch[i].aliment.filter(createFilter(this.state.textSearch, KEYS_TO_FILTERS1));//aliments am api fa namoronako json tany am fonction redondant aliment tampoka
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
                            this.setState({filteredNosSuggestionfiltered : this.state.filteredNosSuggestionfiltered})
                        }
                    }
                }
                this.setState({refreshing:false})
            }
            console.warn('filtered',this.state.filteredEatRecentlyfiltered);
        }else{
            this.setState({filteredNosSuggestionfiltered:[]})
            this.setState({refreshing:false})

        }
    }





    //     save_food = async (repas_type_id,food_id) => {
    //     this.setState({refreshing: true});
    //     const saveMesRepas = await compteurNutritionnelHelper.save_food(
    //         this.props.userToken,
    //         repas_type_id,
    //         food_id
    //     );
    //
    //     if (saveMesRepas) {
    //         // monassiete redux
    //         console.warn('repas type id avant recuperer mon assiete',repas_type_id)
    //         this.monassiete(repas_type_id);
    //         this.setState({refreshing: false});
    //         Alert.alert('Odgo','Aliment ajouté avec succès.');
    //         if( this.props.navigation.navigate('Petitdejeuner')){} //redirection de actualisation atao
    //         else {
    //             this.props.navigation.navigate('Petitdejeuners')
    //         }
    //         console.warn("save food",saveMesRepas)
    //     }
    // };









    render() {
        return (
            <LinearGradient   onStartShouldSetResponder={() =>
            {
                Keyboard.dismiss()
            }}
                              start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }} colors={[colors.balck, colors.green,  '#213D2E']} style={{flex:1}}>
               {/*<ScrollView*/}
               {/*    refreshControl={*/}
               {/*        <RefreshControl*/}
               {/*            refreshing={this.state.refreshing}*/}
               {/*            onRefresh={() => {*/}

               {/*                this. getalldata();*/}
               {/*                this.setState({ refreshing: true })*/}
               {/*                setTimeout(() => {*/}
               {/*                    this.setState({ refreshing: false })*/}
               {/*                }, 2000)*/}
               {/*            }}*/}
               {/*        />*/}
               {/*    }*/}
               {/*    contentContainerStyle={{flex:1}}*/}
               {/*>*/}
                <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }} colors={[colors.balck, colors.green,  '#213D2E']} style={{
                    height:screenWidth*0.41,
                    justifyContent: 'center',alignItems:'center'}}>
                    {/*<View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between',width:screenWidth,marginLeft:screenWidth*0.1}}>*/}
                    {/*    <TouchableOpacity style={{*/}
                    {/*        width: 40, height: 40,*/}
                    {/*        justifyContent: "center"*/}
                    {/*    }}*/}
                    {/*                      onPress={() => {*/}
                    {/*                          this.props.navigation.goBack()*/}
                    {/*                          const setActiveFPAction = { type: SET_ACTIVE_FP, value: -1 }*/}
                    {/*                          this.props.dispatch(setActiveFPAction)*/}
                    {/*                          // const setnosSuggestions = { type: SET_NOS_SUGGESTION, value: [] } //eto zany za no mi-trave*/}
                    {/*                          // this.props.dispatch(setnosSuggestions);*/}
                    {/*                      }}>*/}
                    {/*        <AutoHeightImage*/}
                    {/*            width={20}*/}
                    {/*            source={require("../../../../assets/icons/arrow-white.png")}*/}
                    {/*            style={{*/}
                    {/*                transform: [*/}
                    {/*                    { rotateY: "180deg" }*/}
                    {/*                ]*/}
                    {/*            }} />*/}
                    {/*    </TouchableOpacity>*/}
                    {/*    <Text style={{*/}
                    {/*        color: colors.white,*/}
                    {/*        fontSize: 20*/}
                    {/*    }}>*/}
                    {/*        Sélectionner*/}
                    {/*    </Text>*/}
                    {/*    <View/>*/}
                    {/*    <View/>*/}
                    {/*</View>*/}
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
                            {"Sélectionner"}
                        </Text>
                    </View>

                    <View style={{}}>
                        <TouchableOpacity onPress={()=>{
                            console.warn('search');
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
                                paddingLeft:38,
                                color:'white'
                            }}
                            placeholderTextColor={'#afb7bf'}
                            placeholder="Trouver un produit"
                        />
                    </View>
                </LinearGradient>
                <ScrollView
                    keyboardShouldPersistTaps={'always'}
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.refreshing}
                            onRefresh={() => {
                                this.setState({ refreshing: true });
                                setTimeout(() => {
                                    this.setState({ refreshing: false })
                                }, 2000)
                            }}
                        />
                    }

                    style={{width:'100%',marginTop:screenWidth*0.03}}>
                    <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }} colors={[colors.balck, colors.green,  '#213D2E']} style={{paddingBottom:250,flex:1}}>
                        {

                                this.state.filteredNosSuggestionfiltered.length > 0 ?
                                    this.state.filteredNosSuggestionfiltered.map(
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
                                                                        if( this.props.navigation.navigate('MesProduits_NosSuggesstion_Item',{item:item,item1:item1,edit:false,aliment_id:item1.id,suggestion_id:item1.suggestion_id,addrepas:true})){}
                                                                        else{
                                                                            this.props.navigation.navigate('MesProduits_NosSuggesstion_Item_dashboard',{item:item,item1:item1,edit:false,aliment_id:item1.id,suggestion_id:item1.suggestion_id,addrepas:true})
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
                                                                            if( this.props.navigation.navigate('MesProduits_NosSuggesstion_Item',{item:item,item1:item1,edit:false,aliment_id:item1.id,suggestion_id:item1.suggestion_id,addrepas:true})){}
                                                                            else{
                                                                                this.props.navigation.navigate('MesProduits_NosSuggesstion_Item_dashboard',{item:item,item1:item1,edit:false,aliment_id:item1.id,suggestion_id:item1.suggestion_id,addrepas:true})
                                                                            }
                                                                        }}
                                                                        style={{width:'19%',height:screenWidth*0.08,justifyContent: 'center',alignItems:'flex-start'}}>
                                                                        <Text style={{color:'#8e9992',fontSize:11,paddingLeft:screenWidth*0.05}}>{item1.kilocalorie} Kcal</Text>
                                                                    </TouchableOpacity>
                                                                </TouchableOpacity>
                                                            )
                                                        }
                                                    )}
                                            </View>
                                            )
                                        }
                                    )
                            : this.props.nosSuggestionssearch.length > 0 && this.props.nosSuggestionssearch.map(
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
                                                                    if( this.props.navigation.navigate('MesProduits_NosSuggesstion_Item',{item:item,item1:item1,edit:false,aliment_id:item1.id,suggestion_id:item1.suggestion_id,addrepas:true})){}
                                                                    else{
                                                                        this.props.navigation.navigate('MesProduits_NosSuggesstion_Item_dashboard',{item:item,item1:item1,edit:false,aliment_id:item1.id,suggestion_id:item1.suggestion_id,addrepas:true})
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
                                                                        if( this.props.navigation.navigate('MesProduits_NosSuggesstion_Item',{item:item,item1:item1,edit:false,aliment_id:item1.id,suggestion_id:item1.suggestion_id,addrepas:true})){}
                                                                        else{
                                                                            this.props.navigation.navigate('MesProduits_NosSuggesstion_Item_dashboard',{item:item,item1:item1,edit:false,aliment_id:item1.id,suggestion_id:item1.suggestion_id,addrepas:true})
                                                                        }
                                                                    }}
                                                                    style={{width:'19%',height:screenWidth*0.08,justifyContent: 'center',alignItems:'flex-start'}}>
                                                                    <Text style={{color:'#8e9992',fontSize:11,paddingLeft:screenWidth*0.05}}>{item1.kilocalorie} Kcal</Text>
                                                                </TouchableOpacity>
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
            </LinearGradient>
        );
    }
}


const mapStateToProps = (state) => {
    const { userToken,nosSuggestions,ArrayAlimentCreate,nosSuggestionssearch} = state.statedata
    return { userToken,nosSuggestions,ArrayAlimentCreate,nosSuggestionssearch}
};

export default connect(mapStateToProps)(ItemAlimentForAdd);


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
