import * as React from 'react';
import { connect } from 'react-redux';
import {
    filteredNosSuggestionfiltered,filteredmesRepaspetitsdejeunerfiltered,filteredEatRecentlyfiltered,filteredCollationmatinfiltered,filteredDejeunerfiltered,filteredCollationApresMidifiltered,filteredDinerfiltered,

    SET_ACTIVE_FP,
    SET_ACTIVE_TAB,
    SET_ARRAY_ALIMENT_CREATE,
    SET_COLLATION_APRESMIDID,
    SET_COMPTEUR_NUTRITIONNEL,
    SET_DEJEUNERD,
    SET_DINERD,
    SET_MON_ASSIETTE,
    SET_PETITS_COLLATION_MATIND,
    SET_PETITS_DEJEUNERD,
    SET_ARRAY_ALIMENT_EDIT
} from '../../../../redux/types/tabTypes';
import SearchInput, { createFilter } from 'react-native-search-filter';

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
    Alert,
    RefreshControl, Platform
} from 'react-native';
import Animated from 'react-native-reanimated';
import AutoHeightImage from 'react-native-auto-height-image';
import LinearGradient from "react-native-linear-gradient";
import colors from '../../../../configs/colors';
import baseStyles from '../../../../base/BaseStyles';
const screen = Dimensions.get("window");
const screenWidth = screen.width
import LineGauge from  "react-native-line-gauge"
import compteurNutritionnelHelper from '../../../../apis/helpers/compteurNutritionnel_helper';
import {monassiete,search} from '../../../../apis/FonctionRedondant';
import moment from 'moment';
import Loading from '../../../../components/Load/loadingblack';
import isIphoneX from '../../../../configs/isIphoneX';

class MesProduits_NosSuggesstion_Item  extends React.Component {
    constructor(props) {
        super(props)
        this.state={
            isSelectedquantite:0,
            actualise:false,
            refreshing:false,
            getfor_reglettepage:null,
            positionreglette: 0,
            nowdate:moment(new Date()).day(),
            shortdayofweekone:['dim.','lun.','mar.','mer.','jeu.','ven.','sam.'],
        };
        this.borderradiuscirclecolored = screenWidth * 0.04;
        this.ajouterstyle={width:screenWidth*0.13,height:screenWidth*0.06,backgroundColor:'#FF3A28',justifyContent:'center',alignItems:'center',borderRadius:4}
    };


    async componentDidMount() {
        /* setInterval(()=>{
           this.setState({actualise:!this.state.actualise})
       },800)*/
        this.setState({refreshing:true});
        console.warn('item 1',this.props.navigation.state.params.item1);
        if(this.props.navigation.state.params.edit === false){
            // GET : http://odgo.makeitdev.fr/api/foods/view/{aliment_id}/{suggestion_id (optionnel)}
            // => Passer en paramètre  “suggestion_id” uniquement si cette vue est appelée depuis la page des suggestions
            let getfor_reglettepage;
            if(this.props.navigation.state.params.suggestion_id){
                getfor_reglettepage = await compteurNutritionnelHelper.getforReglettepagewithparam(this.props.userToken,this.props.navigation.state.params.aliment_id,this.props.navigation.state.params.suggestion_id);
            }else{
                getfor_reglettepage = await compteurNutritionnelHelper.getforReglettepage(this.props.userToken,this.props.navigation.state.params.aliment_id);
                console.warn("getfor_reglettepage0",getfor_reglettepage)
            }
            console.warn("getfor_reglettepage0",getfor_reglettepage)
            if(getfor_reglettepage){
                this.setState({getfor_reglettepage:getfor_reglettepage});
                // const position = getfor_reglettepage.data.reglette.position *60;
                let position =0;
                let popo = getfor_reglettepage.data.reglette.position;
                if(Platform.OS === "ios"){
                    if(isIphoneX){
                        if(popo <= 30){
                            position = (popo * 141)/8;
                        }else if(popo > 30){
                            position = (popo * 144)/8;
                        }
                        positionx = position;
                        position = positionx * 20;
                    }else{
                          if(popo <= 30){
                            position = (popo * 141)/8;
                            }else if(popo > 30){
                             position = (popo * 144)/8;
                        }
                   }
                }else{
                    if(popo <= 30){
                        position = (popo * 141)/8;
                        }else if(popo > 30){
                         position = (popo * 144)/8;
                    }
                }
               


                this.setState({positionreglette:position},()=>{
                    this.setState({positionreglette:position},()=>{
                        this.setState({positionreglette: position});
                    });
                });
                setTimeout(()=>{
                    this.setState({refreshing:false})
                },800)

            }
        }else{
            const getfor_reglettepage = await compteurNutritionnelHelper.getforReglettepage(this.props.userToken,this.props.navigation.state.params.aliment_id);
            console.warn("getfor_reglettepage1",getfor_reglettepage)
            if(getfor_reglettepage) {
                let jsonbuilded = getfor_reglettepage;
                let popo = 0;
                if(this.props.navigation.state.params.ajoutrepaspoureditiontenany){
                    popo = this.props.navigation.state.params.alimentss.quantite;
                }else if(this.props.navigation.state.params.addrepas) {
                    popo = getfor_reglettepage.data.reglette.position;
                }else{
                    jsonbuilded.data.reglette.position = this.props.navigation.state.params.alimentss.quantite
                    jsonbuilded.data.reglette.position = this.props.navigation.state.params.alimentss.quantite
                    popo = this.props.navigation.state.params.alimentss.quantite;
                }
                this.setState({getfor_reglettepage: jsonbuilded});
                let position = 0;
                // let popo = this.props.navigation.state.params.alimentss.quantite;
                if(isIphoneX){
                    if(popo <= 30){
                        position = (popo * 141)/8;
                    }else if(popo > 30 ){
                        position = (popo * 144)/8;
                    }
                    positionx = position;
                    position = positionx * 20;
                }else{
                    if(popo <= 30){
                        position = (popo * 141)/8;
                    }else if(popo > 30 ){
                        position = (popo * 144)/8;
                    }
                }

                this.setState({positionreglette:position},()=>{
                    this.setState({positionreglette:position},()=>{
                        this.setState({positionreglette: position});
                    });
                });
                setTimeout(()=>{
                    this.setState({refreshing:false})
                },800) }
        }
    }

    getCompteurNutritionnelViaAjouterMesRepas = async () => { //alaina le fonction evit redondant iny fa efa mis any
        this.setState({refreshing: true});
        const compteurNutritionnel = await compteurNutritionnelHelper.getCompteurNutritionnel(this.props.userToken);
        if (compteurNutritionnel) {
            const setcompteurNutritionnel = {type: SET_COMPTEUR_NUTRITIONNEL, value: compteurNutritionnel};
            this.props.dispatch(setcompteurNutritionnel);
                this.setState({refreshing:false})
            return compteurNutritionnel;
        }
    };




    putquantitemonassiette = async (idalimentitem,is_portion,alimentid) => {
        this.setState({refreshing: true});
        let quantite = 0;
        if(this.state.isSelectedquantite == 0 || this.state.isSelectedquantite ==='Supprimer'){
            //supprimer izy izay//
            // }else if(this.state.isSelectedquantite ==1){ //mety miaraka  1 sy ngeza noho 1, fa aleo sarahana, le plug in matonga io, plug in scroll slide
            //     quantite = 0;
            // }else if(this.state.isSelectedquantite > 1){
            //     quantite = this.state.isSelectedquantite -1; miasa tam le quantite taloha
        }else{
            quantite =  this.state.isSelectedquantite;
        }
        console.warn('this.props.navigation.state.params.myfoodid',this.props.navigation.state.params.myfoodid)
                    console.warn('date for modif aliment',this.props.dateforajoutaliment)
        const putquantitemonassiette = await compteurNutritionnelHelper.putquantitemonassiette(this.props.userToken,idalimentitem,this.state.positionreglette,alimentid,this.props.navigation.state.params.myfoodid,this.props.dateforajoutaliment);
        if (putquantitemonassiette) {
            this.setState({refreshing: false});
            setTimeout(()=>{
                Alert.alert('Odgo','Quantité modifiée avec succès',[{text:'Ok',onPress:()=>{
                    search("",this.props,filteredNosSuggestionfiltered,filteredmesRepaspetitsdejeunerfiltered,filteredEatRecentlyfiltered,filteredCollationmatinfiltered,filteredDejeunerfiltered,filteredCollationApresMidifiltered,filteredDinerfiltered,createFilter);

                    this.setState({refreshing: true});
                    const setmonassiettey = { type: SET_MON_ASSIETTE, value: [] };
                    this.props.dispatch(setmonassiettey);
                    monassiete(compteurNutritionnelHelper,this.props,global.repas_type_id,this.props.dateforajoutaliment).then((refreshingfalse)=>{
                        this.setState({
                            refreshing: refreshingfalse
                        })
                    });// na exportena function eo ambon eo
                    this.getCompteurNutritionnelViaAjouterMesRepas().then((data)=>{

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
                    if( this.props.navigation.navigate('PetitdejeunerNew',{isvidersearch:true})){}
                    else {
                        this.props.navigation.navigate('PetitdejeunerNews',{isvidersearch:true})
                    }
                }}]);
            },600)
        }
    };

    save_food = async (repas_type_id,food_id) => {
        this.setState({refreshing: true});
        const saveMesRepas = await compteurNutritionnelHelper.save_food(
            this.props.userToken,
            repas_type_id,
            food_id,
            this.state.positionreglette,
            this.props.dateforajoutaliment
        );

        // if(saveMesRepas.success === true) {
        //     await compteurNutritionnelHelper.putquantitemonassiette(this.props.userToken, saveMesRepas.data.id, this.state.positionreglette);
        // }
        console.warn(saveMesRepas)

        if (saveMesRepas) {
            // monassiete redux
            const setmonassiette = { type: SET_MON_ASSIETTE, value: [] };
            this.props.dispatch(setmonassiette);
            monassiete(compteurNutritionnelHelper,this.props,repas_type_id,this.props.dateforajoutaliment).then((refreshingfalse)=>{
                this.setState({
                    refreshing: refreshingfalse
                },()=>{
                 /*   this.getCompteurNutritionnelViaAjouterMesRepas().then((data)=>{ //tsy mandeha
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
                    });*/
                    setTimeout(()=>{
                         Alert.alert('Odgo','Aliment ajouté avec succès.',[{
                        text :'Ok',
                        onPress :()=>{
                            search("",this.props,filteredNosSuggestionfiltered,filteredmesRepaspetitsdejeunerfiltered,filteredEatRecentlyfiltered,filteredCollationmatinfiltered,filteredDejeunerfiltered,filteredCollationApresMidifiltered,filteredDinerfiltered,createFilter);

                            if( this.props.navigation.navigate('PetitdejeunerNew',{isvidersearch:true})){} //redirection de actualisation atao
                            else {
                                this.props.navigation.navigate('PetitdejeunerNews',{isvidersearch:true})
                            }
                        }
                    }]);
                    },600)

                })
            });
            console.warn("saved food",saveMesRepas)
        }
    };

    render() {

        let calories = 0;
        let positionreglette = 0;
        let glucide = 0;
        let proteine = 0;
        let lipide = 0;

        if(this.state.getfor_reglettepage !== null){
            positionreglette = this.state.positionreglette;
            if(this.state.getfor_reglettepage.data.aliment.is_portion){
                let calories_ = 0;
                let glucide_ = 0;
                let proteine_ = 0;
                let lipide_ = 0;
                if(this.state.getfor_reglettepage.data.aliment.portion_en_ml && this.state.getfor_reglettepage.data.aliment.portion_en_ml > 0){
                    calories_ =  (positionreglette * this.state.getfor_reglettepage.data.aliment.portion_en_ml) * this.state.getfor_reglettepage.data.aliment.kcalorie_pour_100g / 100
                    glucide_ =  (positionreglette * this.state.getfor_reglettepage.data.aliment.portion_en_ml) * this.state.getfor_reglettepage.data.aliment.glucide_pour_100g / 100
                    proteine_ = (positionreglette * this.state.getfor_reglettepage.data.aliment.portion_en_ml) * this.state.getfor_reglettepage.data.aliment.proteine_pour_100g / 100
                    lipide_ =  (positionreglette * this.state.getfor_reglettepage.data.aliment.portion_en_ml)  * this.state.getfor_reglettepage.data.aliment.lipide_pour_100g / 100

                }else{
                    calories_ =  (positionreglette * this.state.getfor_reglettepage.data.aliment.portion_en_g) * this.state.getfor_reglettepage.data.aliment.kcalorie_pour_100g / 100
                    glucide_ =  (positionreglette * this.state.getfor_reglettepage.data.aliment.portion_en_g) * this.state.getfor_reglettepage.data.aliment.glucide_pour_100g / 100
                    proteine_ = (positionreglette * this.state.getfor_reglettepage.data.aliment.portion_en_g) * this.state.getfor_reglettepage.data.aliment.proteine_pour_100g / 100
                    lipide_ =  (positionreglette * this.state.getfor_reglettepage.data.aliment.portion_en_g)  * this.state.getfor_reglettepage.data.aliment.lipide_pour_100g / 100

                }
                calories = calories_;
                if(calories_ % 1 !== 0){
                    calories = calories_.toFixed(0)
                }
                glucide = glucide_;
                if(glucide_ % 1 !== 0){
                    glucide = glucide_.toFixed(0)
                }
                proteine = proteine_;
                if(proteine_ % 1 !== 0){
                    proteine = proteine_.toFixed(0)
                }
                lipide = lipide_;
                if(lipide_ % 1 !== 0){
                    lipide = lipide_.toFixed(0)
                }
            }else{
                let calories_ = 0;
                let glucide_ = 0;
                let proteine_ = 0;
                let lipide_ = 0;
                if(this.state.getfor_reglettepage.data.aliment.portion_en_ml && this.state.getfor_reglettepage.data.aliment.portion_en_ml > 0){
                    calories_ =  positionreglette * this.state.getfor_reglettepage.data.aliment.kcalorie_pour_100g / 100
                    // calories_ =  positionreglette * this.state.getfor_reglettepage.data.aliment.kcalorie_pour_100g
                    glucide_ =  positionreglette * this.state.getfor_reglettepage.data.aliment.glucide_pour_100g / 100
                    proteine_ =  positionreglette * this.state.getfor_reglettepage.data.aliment.proteine_pour_100g / 100
                    lipide_ =  positionreglette * this.state.getfor_reglettepage.data.aliment.lipide_pour_100g / 100
                }else{
                    calories_ =  positionreglette * this.state.getfor_reglettepage.data.aliment.kcalorie_pour_100g / 100
                    // calories_ =  positionreglette * this.state.getfor_reglettepage.data.aliment.kcalorie_pour_100g
                    glucide_ =  positionreglette * this.state.getfor_reglettepage.data.aliment.glucide_pour_100g / 100
                    proteine_ =  positionreglette * this.state.getfor_reglettepage.data.aliment.proteine_pour_100g / 100
                    lipide_ =  positionreglette * this.state.getfor_reglettepage.data.aliment.lipide_pour_100g / 100

                }
                calories = calories_;
                if(calories_ % 1 !== 0){
                    calories = calories_.toFixed(0)
                }

                glucide = glucide_;
                if(glucide_ % 1 !== 0){
                    glucide = glucide_.toFixed(0)
                }

                proteine = proteine_;
                if(proteine_ % 1 !== 0){
                    proteine = proteine_.toFixed(0)
                }

                lipide = lipide_;
                if(lipide_ % 1 !== 0){
                    lipide = lipide_.toFixed(0)
                }
            }
        };

        return (
            <ScrollView contentContainerStyle={{flex:1}}
                        // refreshControl={
                        //     <RefreshControl
                        //         refreshing={this.state.refreshing}
                        //         onRefresh={() => {
                        //             this.setState({ refreshing: true })
                        //             setTimeout(() => {
                        //                 this.setState({ refreshing: false })
                        //             }, 2000)
                        //         }}
                        //     />
                        // }
            >
                <Loading load={this.state.refreshing} />

                <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }} colors={[colors.balck, colors.green,  '#213D2E']} style={{
                    //height:screenWidth*0.41,
                    justifyContent: 'center',alignItems:'center',flex:1}}>

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
                            {"Mes produits"}
                        </Text>
                    </View>

                    <View style={{flexDirection:'row',alignItems: 'center',width: '100%'}}>
                        <View style={{borderRadius:this.borderradiuscirclecolored,width:this.borderradiuscirclecolored,height:this.borderradiuscirclecolored,backgroundColor:this.props.navigation.state.params.item1.color,marginLeft:screenWidth*0.06,}}/>

                        <View style={{flexDirection:'column',alignItems:'center',width: '100%',marginBottom:10,marginLeft:-screenWidth*0.1}} >
                            <View style={{flexDirection:'row',alignItems:'center',marginTop:20}} >
                                <Text style={{fontSize:18,color:'white'}}>{this.props.navigation.state.params.item1.name}</Text>
                            </View>
                            <Text style={{fontSize:14,color:'#8da094'}}>{calories} Kcal</Text>
                        </View>
                    </View>

                </LinearGradient>

                <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }} colors={[colors.balck, colors.green,  '#213D2E']}
                                style={{
                                    height:screenWidth*0.9,
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
                    {/*<Text style={{fontSize:10,color:'#8da094',marginLeft:10,marginTop:7}}>Quantité suggérée: {this.state.getfor_reglettepage !== null ? this.state.getfor_reglettepage.data.aliment.quantity_recommanded : 0}</Text>*/}
                    <View style={{margin:14}}/>
                    <View style={{borderWidth:1,width:screenWidth/4,alignSelf:'center',borderColor:"rgb(229,98,107)",paddingVertical:5,alignItems:'center',justifyContent:'center'}}><Text style={{color:'white'}}>{positionreglette}{this.state.getfor_reglettepage !== null && this.state.getfor_reglettepage.data.unite}</Text></View>
                    {/*{ this.props.navigation.state.params.item1.is_portion ?*/}
                    {/*    <LineGauge min={0} max={20} largeInterval={5}*/}
                    {/*        // mediumInterval={0.5}*/}
                    {/*               value={this.state.isSelectedquantite} onChange={(value)=>{*/}
                    {/*        //console.warn('val',value)*/}
                    {/*        //   let forpush = 0;*/}
                    {/*        //   let datasourcequantite = [];*/}
                    {/*        //   for(let i = 0; i<20; i++){//scroll quantite*/}
                    {/*        //       forpush = forpush+0.5;*/}
                    {/*        //       datasourcequantite.push(forpush);*/}
                    {/*        //   }*/}

                    {/*        this.setState({isSelectedquantite:value})*/}
                    {/*    }} />*/}
                    {/*    :*/}
                    {/*    <LineGauge min={10} max={100} largeInterval={10}*/}
                    {/*        // mediumInterval={50}*/}
                    {/*               value={this.state.isSelectedquantite} onChange={(value)=>{*/}
                    {/*        //console.warn('val',value)*/}
                    {/*        // let forpush1 = 50;*/}
                    {/*        // let datasourcequantite1 = [];*/}
                    {/*        // for(let i = 0; i<19; i++){*/}
                    {/*        //     datasourcequantite1.push(forpush1);*/}
                    {/*        //     forpush1 = forpush1+25;*/}
                    {/*        // }*/}
                    {/*        this.setState({isSelectedquantite:value})*/}
                    {/*    }} />*/}
                    {/*}*/}

                    {
                        this.state.getfor_reglettepage !== null &&
                        <LineGauge min={this.state.getfor_reglettepage.data.reglette.min} max={this.state.getfor_reglettepage.data.reglette.max} largeInterval={this.state.getfor_reglettepage.data.reglette.scale_big}
                                   mediumInterval={this.state.getfor_reglettepage.data.reglette.scale_little}
                                   intervalSize={'small'}
                                   value={this.state.positionreglette} onChange={(value)=>{

                                           this.setState({positionreglette:value})

                        }} />
                    }

                    <TouchableOpacity
                        onPress={()=>{
                            if(this.props.navigation.state.params.edit === true){
                                if(this.props.navigation.state.params.addrepas){
                                    if(this.props.navigation.state.params.ajoutrepaspoureditiontenany){
                                        let item1 = this.props.navigation.state.params.item1;
                                        let ArrayAlimentCreate_ = [];
                                        for (let i = 0; i < this.props.ArrayAlimentEdit.length; i++) {
                                            let ici = this.props.ArrayAlimentEdit[i];
                                            let haha = {
                                                repas_type_id: ici.repas_type_id,
                                                food_id: ici.food_id,
                                                name: ici.name,
                                                color: ici.color,
                                                quantite: ici.quantite,
                                                namegroupealiment: ici.namegroupealiment,
                                                kilocalorie: ici.kilocalorie,
                                                glucide: ici.glucide,
                                                proteine: ici.proteine,
                                                lipide: ici.lipide,
                                                portion_en_g: ici.portion_en_g,
                                                portion_en_ml: ici.portion_en_ml,
                                                is_portion: ici.is_portion
                                            };
                                            if (ici.food_id === item1.food_id) {
                                                haha.quantite = this.state.positionreglette;
                                            }
                                            ArrayAlimentCreate_.push(haha);
                                        }
                                        let setarrayalimentcreate = { type: SET_ARRAY_ALIMENT_EDIT, value: ArrayAlimentCreate_ }
                                        this.props.dispatch(setarrayalimentcreate);
                                        if(this.props.navigation.navigate('MesRepasItem',{item_id_repas:item1.food_id})){}
                                        else{
                                            this.props.navigation.navigate('MesRepasItemDashboard',{item_id_repas:item1.food_id})
                                        }
                                    }else if(this.props.navigation.state.params.ajoutrepaspouredition){
                                        let item1 = this.props.navigation.state.params.item1;
                                        let ArrayAlimentCreate_ = this.props.ArrayAlimentEdit;
                                        let items = {
                                            repas_type_id: item1.repas_type_id,
                                            food_id: item1.food_id,
                                            quantite: this.state.positionreglette,
                                            name: item1.name,
                                            color: item1.color,
                                            namegroupealiment: this.props.navigation.state.params.item.name,
                                            kilocalorie: this.state.getfor_reglettepage.data.aliment.kcalorie_pour_100g,
                                            glucide: this.state.getfor_reglettepage.data.aliment.glucide_pour_100g,
                                            proteine: this.state.getfor_reglettepage.data.aliment.proteine_pour_100g,
                                            lipide: this.state.getfor_reglettepage.data.aliment.lipide_pour_100g,
                                            portion_en_g: item1.portion_en_g,
                                            portion_en_ml: this.state.getfor_reglettepage.data.aliment.portion_en_ml,
                                            is_portion: this.state.getfor_reglettepage.data.aliment.is_portion
                                        };
                                        ArrayAlimentCreate_.push(items);
                                        let setarrayalimentcreate = { type: SET_ARRAY_ALIMENT_EDIT, value: ArrayAlimentCreate_ }
                                        this.props.dispatch(setarrayalimentcreate);

                                        if(this.props.navigation.navigate('MesRepasItem',{item_id_repas:item1.food_id})){}
                                        else{
                                            this.props.navigation.navigate('MesRepasItemDashboard',{item_id_repas:item1.food_id})
                                        }
                                    }else{
                                        console.warn('edit')
                                        let item1 = this.props.navigation.state.params.item1;
                                        let ArrayAlimentCreate_ = [];
                                        for (let i = 0; i < this.props.ArrayAlimentCreate.length; i++){
                                            let ici = this.props.ArrayAlimentCreate[i];
                                            let haha = {
                                                repas_type_id: ici.repas_type_id,
                                                food_id: ici.food_id,
                                                name: ici.name,
                                                color: ici.color,
                                                quantite: ici.quantite,
                                                namegroupealiment: ici.namegroupealiment,
                                                kilocalorie: ici.kilocalorie,
                                                glucide: ici.glucide,
                                                proteine: ici.proteine,
                                                lipide: ici.lipide,
                                                portion_en_g: ici.portion_en_g,
                                                portion_en_ml: ici.portion_en_ml,
                                                is_portion: ici.is_portion
                                            };
                                            if(ici.food_id === item1.food_id){
                                                haha.quantite = this.state.positionreglette;
                                            }
                                            ArrayAlimentCreate_.push(haha);
                                        }

                                        let setarrayalimentedit = { type: SET_ARRAY_ALIMENT_CREATE, value: ArrayAlimentCreate_ }
                                        this.props.dispatch(setarrayalimentedit);
                                        if(this.props.navigation.navigate("CreerRepas")){}
                                        else{
                                            this.props.navigation.navigate("CreerRepasDashboard")
                                        }
                                    }

                                }else{
                                    this.putquantitemonassiette(this.props.navigation.state.params.item1.food_id,this.props.navigation.state.params.item1.is_portion,this.props.navigation.state.params.aliment_id);
                                }
                            }else{
                                if(this.props.navigation.state.params.addrepas){
                                    let item1 = this.props.navigation.state.params.item1;
                                    let ArrayAlimentCreate_ = this.props.ArrayAlimentCreate;
                                    let items = {
                                        repas_type_id: item1.repas_type_id,
                                        food_id: item1.food_id,
                                        quantite: this.state.positionreglette,
                                        name: item1.name,
                                        color: item1.color,
                                        namegroupealiment: this.props.navigation.state.params.item.name,
                                        kilocalorie: this.state.getfor_reglettepage.data.aliment.kcalorie_pour_100g,
                                        glucide: this.state.getfor_reglettepage.data.aliment.glucide_pour_100g,
                                        proteine: this.state.getfor_reglettepage.data.aliment.proteine_pour_100g,
                                        lipide: this.state.getfor_reglettepage.data.aliment.lipide_pour_100g,
                                        portion_en_g: item1.portion_en_g,
                                        portion_en_ml: this.state.getfor_reglettepage.data.aliment.portion_en_ml,
                                        is_portion: this.state.getfor_reglettepage.data.aliment.is_portion
                                    };
                                    ArrayAlimentCreate_.push(items);
                                    let setarrayalimentcreate = { type: SET_ARRAY_ALIMENT_CREATE, value: ArrayAlimentCreate_ }
                                    this.props.dispatch(setarrayalimentcreate);

                                    if(this.props.navigation.navigate("CreerRepas")){}
                                    else{
                                        this.props.navigation.navigate("CreerRepasDashboard")
                                    }
                                }else{
                                    this.save_food(global.repas_type_id,this.props.navigation.state.params.aliment_id);
                                }

                            }
                        }}
                        style={{marginBottom:10,marginTop:15}}>
                        {/*Boutton*/}
                        <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} colors={[colors.red, 'rgb(229, 35, 48)', '#F93529']}
                                        style={{width:screenWidth*0.35,alignItems:'center',borderRadius:screenWidth * 0.06,height:screenWidth*0.085,justifyContent:'center',alignSelf:'center'}}>
                            <Text style={{fontSize:12,color:'#F4B8BF'}}>
                                {this.props.navigation.state.params.edit === true ? this.props.navigation.state.params.ajoutrepaspoureditiontenany? "Modifier" : this.props.navigation.state.params.ajoutrepaspouredition? "Ajouter" : "Modifier" :"Ajouter"}
                            </Text>
                        </LinearGradient>
                    </TouchableOpacity>
                </LinearGradient>

            </ScrollView>
        );
    }
}


const mapStateToProps = (state) => {
    const { selectedZone,userToken, dateforajoutaliment,ArrayAlimentCreate,ArrayAlimentEdit } = state.statedata
    return { selectedZone,userToken, dateforajoutaliment,ArrayAlimentCreate,ArrayAlimentEdit }
};

export default connect(mapStateToProps)(MesProduits_NosSuggesstion_Item);

