import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    ScrollView,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Dimensions,
    StatusBar,
    Modal, RefreshControl, SafeAreaView,
    Alert,
    Image,
    TouchableHighlight,
    Platform
} from 'react-native';
import baseStyles from '../../../../base/BaseStyles';
import styles from './styles';
import colors from '../../../../configs/colors';
import LinearGradient from 'react-native-linear-gradient';
// import ZonePicker from '../../../../components/ZonePicker/ZonePicker';
// import MAAButton from '../../../../components/MAAButton/MAAButton';
import AutoHeightImage from 'react-native-auto-height-image';
// import ProgressCircle from 'react-native-progress-circle';
import SlidingPanel from 'react-native-sliding-up-down-panels';
import compteurNutritionnelHelper from '../../../../apis/helpers/compteurNutritionnel_helper';
import {
    SET_NOS_SUGGESTION,
    SET_PETITS_DEJEUNER,
    SET_REPAS_TYPE,
    SET_PETITS_DEJEUNER_REPAS,
    SET_NOS_EATRECENTLY,
    SET_MON_ASSIETTE,
    SET_COMPTEUR_NUTRITIONNEL,
    SET_ACTIVE_TAB,
    SET_DINERD,
    SET_COLLATION_APRESMIDID,
    SET_DEJEUNERD,
    SET_PETITS_COLLATION_MATIND, SET_PETITS_DEJEUNERD,
} from '../../../../redux/types/tabTypes';
import ScrollPicker from 'react-native-wheel-scroll-picker';
import Loading from '../../../../components/Load/loading';
import {
    getSelectionnerNosSuggestion,
    monassiete,
    getViaPostPetitsDejeuner,
    getViaPostRepas,
} from '../../../../apis/FonctionRedondant';
import statusBarHeight from '../../../../configs/screen';
import phoneType from '../../../../configs/typePhone';
import moment from 'moment';

const screen = Dimensions.get("window");
const SBHelight = statusBarHeight;
const screenWidth = screen.width
const screenHeight = screen.height - SBHelight

class Petitdejeuner extends Component {

    constructor(props) {
        super(props);
        this.state = {
            activeMenu: 'aliments',
            selectedZone: props.selectedZone,
            zonePicker: false,
            compteurNutritionnel:null,
            refreshing:false,
            datasourcequantite:['Supprimer'],
            datasourcequantite1:['Supprimer'],//is_portion = true
            datasourcequantite1label:['Supprimer'],//is_portion = true
            isSelectedquantite:0,
            idputquantite:0, //initialiseko am le supprimer
            //  monassiete:props.monassiete,
            repas_type_id:global.repas_type_id,
            actualisation:false,
            panelrepasouvert:true,
            is_portion:false,
            shortdayofweekone:['dim.','lun.','mar.','mer.','jeu.','ven.','sam.'],
            nowdate:moment(new Date()).day(),
        };
        this.eatrecently=[];
        this.ajouterstyle={width:screenWidth*0.13,height:screenWidth*0.06,backgroundColor:'#FF3A28',justifyContent:'center',alignItems:'center',borderRadius:4}

        let forpush = 0;
        for(let i = 0; i<20; i++){//scroll quantite
            forpush = forpush+0.5;
            this.state.datasourcequantite.push(forpush);
        }

        let forpush1 = 50;
        for(let i = 0; i<19; i++){
            this.state.datasourcequantite1.push(forpush1);
            forpush1 = forpush1+25;
        }

        let forpush1label = 50;
        for(let i = 0; i<19; i++){
            let forpush1label_= forpush1label+'g';
            this.state.datasourcequantite1label.push(forpush1label_);
            forpush1label = forpush1label+25;
        }
    }

    componentDidMount() {
        console.warn('global repas type id',global.repas_type_id)
        //  this.getCompteurNutritionnel()

        this.RepasTypes().then(()=>{
            console.warn('repas type')
            this.setState({refreshing: false});
        });

        //  this.setState({refreshing: true});          //1 na 2 na 3 na 4 na 5
        // getViaPostPetitsDejeuner(compteurNutritionnelHelper,this.props,this.props.navigation.state.params.repastypeid_propsnavig).then((refreshingfalse)=>{ //petits dejeuner = 1
        //     this.setState({
        //         refreshing: refreshingfalse
        //     })
        // });

        getViaPostRepas(compteurNutritionnelHelper,this.props,global.repas_type_id);
        this.getEatRecently().then(()=>{
            this.setState({refreshing: false});
        });

        // setInterval(()=>{
        //     this.setState({actualisation:!this.state.actualisation})
        // },1000)
    }




    putquantitemonassiette = async (idalimentitem) => {
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

        const putquantitemonassiette = await compteurNutritionnelHelper.putquantitemonassiette(this.props.userToken,idalimentitem,quantite);
        if (putquantitemonassiette) {
            this.setState({refreshing: false});
            Alert.alert('Odgo','Quantité ajoutée avec succès',[{text:'Ok',onPress:()=>{
                    this.setState({refreshing: true});
                    const setmonassiettey = { type: SET_MON_ASSIETTE, value: [] };
                    this.props.dispatch(setmonassiettey);
                    monassiete(compteurNutritionnelHelper,this.props,global.repas_type_id).then((refreshingfalse)=>{
                        this.setState({
                            refreshing: refreshingfalse
                        })
                    });// na exportena function eo ambon eo
                    this.getCompteurNutritionnelViaAjouterMesRepas().then((data)=>{

                        console.warn('global.repas_type_id',global.repas_type_id)
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
                    this._panel.onRequestClose()
                }}]);
        }
    };

    getCompteurNutritionnel = async () => { //tsy miasa korn
        this.setState({refreshing: true});
        const compteurNutritionnel = await compteurNutritionnelHelper.getCompteurNutritionnel(this.props.userToken);
        if (compteurNutritionnel) {
            this.setState({compteurNutritionnel:compteurNutritionnel});
            this.setState({refreshing: false});
        }
    };





    getEatRecently = async () => {
        this.setState({refreshing: true});
        let eatrecently = { type: SET_NOS_EATRECENTLY, value: [] } //eatrecently
        this.props.dispatch(eatrecently);
        const selectionnereatrecently = await compteurNutritionnelHelper.getEatRecently(this.props.userToken); //api/foods/eatRecently
        if (selectionnereatrecently) {
            console.warn('data selectionnereatrecently set nos suggession',selectionnereatrecently)
            if(selectionnereatrecently.data.length> 0 ){
                for(let i = 0;i <selectionnereatrecently.data.length;i++){
                    let recently = {
                        id :selectionnereatrecently.data[i].id ,
                        name:selectionnereatrecently.data[i].name,
                    };
                    let aliments = [];
                    let aliments_ = selectionnereatrecently.data[i].aliments;
                    for(let j = 0;j < aliments_.length; j++){
                        let aliment = aliments_[j];
                        let alimentss = {
                            id:aliment.id,
                            name:aliment.name,
                            kilocalorie:(aliment.portion_en_g * aliment.kcalorie_pour_100g/100),
                            quantite:aliment.quantity_recommanded,
                            color:aliment.aliment_type.color,
                            repas_type_id:aliment.aliment_type_id,
                            food_id:aliment.id,
                            glucide:aliment.glucide_pour_100g,
                            proteine:aliment.proteine_pour_100g,
                            lipide:aliment.lipide_pour_100g
                        }
                        aliments.push(alimentss)
                    }
                    recently.aliment = aliments;

                    this.eatrecently.push(recently);
                }

                let setEatRecently = { type: SET_NOS_EATRECENTLY, value: this.eatrecently }
                this.props.dispatch(setEatRecently);
                this.setState({refreshing: false});
            }

        }
    };

    RepasTypes  = async () => {
        this.setState({refreshing: true});
        let setrepasType = { type: SET_REPAS_TYPE, value: []};
        this.props.dispatch(setrepasType);
        const repasTypes = await compteurNutritionnelHelper.getRepasType(this.props.userToken);
        if (repasTypes) {
            console.warn('repas type')
            let arrayrepasTypes = [];
            for(let i=0;i<repasTypes.data.length;i++){
                arrayrepasTypes.push(repasTypes.data[i].name)
            }
            let setrepasType = { type: SET_REPAS_TYPE, value: arrayrepasTypes }
            this.props.dispatch(setrepasType);
            this.setState({refreshing: false});
        }
    };


    getCompteurNutritionnelViaAjouterMesRepas = async () => { //alaina le fonction evit redondant iny fa efa mis any
        this.setState({refreshing: true});
        const compteurNutritionnel = await compteurNutritionnelHelper.getCompteurNutritionnel(this.props.userToken);
        if (compteurNutritionnel) {
            const setcompteurNutritionnel = {type: SET_COMPTEUR_NUTRITIONNEL, value: compteurNutritionnel};
            this.props.dispatch(setcompteurNutritionnel);
            console.warn('laza v compteur',compteurNutritionnel)
            this.setState({refreshing: false});
            return compteurNutritionnel;
        }
    };



    panelrepasopenclose(){
        if(this.state.panelrepasouvert){
            this._panelmonrepas.onRequestStart()
        }else{
            this._panelmonrepas.onRequestClose()
        }
    }


    render() {
        var max = 0;
        var current = 0;
        let percentmonrepas = 0;
        var petitsdejeunerdetconsort = null;
        // var collationmatind = null;
        // var dejeunerd = null;
        // var  collationapresmidid = null;
        // var dinerd = null;

        switch(global.repas_type_id){
            case 1 :
                try{
                    max =this.props.petitsdejeunerd !== null && this.props.petitsdejeunerd.max;
                    current = this.props.petitsdejeunerd !== null && this.props.petitsdejeunerd.current;
                    petitsdejeunerdetconsort = this.props.petitsdejeunerd;
                }catch (e) {  }
                break;

            case 2 :
                try{
                    max =this.props.collationmatind !== null && this.props.collationmatind.max;
                    current = this.props.collationmatind !== null && this.props.collationmatind.current;
                    petitsdejeunerdetconsort = this.props.collationmatind;
                }catch (e) {  }
                break;

            case 3 :
                try{
                    max =this.props.dejeunerd !== null && this.props.dejeunerd.max;
                    current = this.props.dejeunerd !== null && this.props.dejeunerd.current;
                    petitsdejeunerdetconsort = this.props.dejeunerd;
                }catch (e) {  }
                break;

            case 4 :
                try{
                    max =this.props.collationapresmidid !== null && this.props.collationapresmidid.max;
                    current = this.props.collationapresmidid !== null && this.props.collationapresmidid.current;
                    petitsdejeunerdetconsort = this.props.collationapresmidid;
                }catch (e) {  }
                break;

            case 5 :
                try{
                    max =this.props.dinerd !== null && this.props.dinerd.max;
                    current = this.props.dinerd !== null && this.props.dinerd.current;
                    petitsdejeunerdetconsort =  this.props.dinerd !== null && this.props.dinerd;
                }catch (e) {  }
                break;
            default:
                try{
                    max =this.props.petitsdejeunerd !== null && this.props.petitsdejeunerd.max;
                    current = this.props.petitsdejeunerd !== null && this.props.petitsdejeunerd.current;
                    petitsdejeunerdetconsort = this.props.petitsdejeunerd;
                }catch (e) {  }
        }
        let   percentmonrepasbefore = (current*288)/max; //288 === 10%
        if(percentmonrepasbefore  > 288){
            percentmonrepas = 288;
        }else{
            if(isNaN(percentmonrepasbefore)){
                percentmonrepas = 0;
            }else{
                percentmonrepas = percentmonrepasbefore;
            }
        }
        return (
            <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }} colors={[colors.balck, colors.green,  '#213D2E']}
            style={{flex:1}} //nesoriko omal le 16/01/2019

      >
            <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }} colors={[colors.balck, colors.green,  '#213D2E']}
                  //style={baseStyles.linearGradient} //nesoriko omal le 16/01/2019

            >
                <Loading load={this.state.refreshing} />
                <View style={{
                    // alignItems :"center",justifyContent:"center",width:"100%",marginTop:15
                    alignItems :"center",
                    justifyContent:"center",
                    width:"100%",
                    // marginTop:15,
                    position:'absolute',
                    zIndex:2,
                    flexDirection:'row',
                    paddingLeft:screenWidth*0.03,
                }}>
                    <TouchableOpacity
                        onPress={() => {
                            this.getCompteurNutritionnelViaAjouterMesRepas().then(()=>{
                                if( this.props.navigation.goBack()){}
                                else {
                                    this.props.navigation.goBack()
                                }
                            });
                        }}
                        style={{width:50,position:"absolute",left:0}}
                    >
                        <AutoHeightImage
                            width={18}
                            source={require('../../../../assets/icons/arrow-white.png')}
                            style={{
                                marginLeft:5,
                                transform: [
                                    { rotateY: "180deg" }
                                ],
                            }}
                        />
                    </TouchableOpacity>
                    <Text style={{textAlign:"center", color: colors.white, fontSize: 17,marginRight:8}}>
                        Ajouter mon {this.props.navigation.state.params.nom_PetitDejOuCollationEtReste.toLowerCase()}
                    </Text>
                </View>
                <View style={{
                    zIndex:1,
                    width:'100%',flex:1}}>
                    <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }} colors={[colors.balck, colors.green,  '#213D2E']}
                                    style={{
                                        height:screenWidth*0.10,
                                        //zIndex:102
                                    }} >
                    </LinearGradient>
                </View>
                <View
                    //  style={styles.scrollView}
                    style={{
                        //minHeight: (screenHeight - 130),
                        minWidth: screenWidth,
                        alignItems: "center",
                    }}
                    // keyboardShouldPersistTaps={'always'}
                    // refreshControl={
                    //     <RefreshControl
                    //         refreshing={this.state.refreshing}
                    //         onRefresh={() => {
                    //
                    //             const setnosSuggestions = { type: SET_NOS_SUGGESTION, value: [] } //eto zany za no mi-trave
                    //             this.props.dispatch(setnosSuggestions);
                    //             this.getCompteurNutritionnel();
                    //             this.getSelectionnerNosSuggestion(); //so de ty matonga doublon any ambadika any
                    //             this.setState({ refreshing: true })
                    //             setTimeout(() => {
                    //                 this.setState({ refreshing: false })
                    //             }, 2000)
                    //         }}
                    //     />
                    // }
                >
                    <View style={{
                        //marginTop:screenWidth*1.32,
                        //marginTop:screenHeight*0.76,304
                        //  marginTop:screenHeight*0.84,336
                        marginTop:Platform.OS ==="ios"?(screenHeight*0.76)+7:(screenHeight*0.76),
                        flex:1
                    }}
                    ><SlidingPanel
                            ref={cd => this._panelmonrepas = cd}
                            //headerLayoutHeight = {screenHeight*0.71}
                            headerLayoutHeight = {screenHeight*0.71}
                            //  headerLayout = {screenWidth*0.7}
                            onRequestStart ={()=>{
                                console.warn('open v')
                            }}
                            headerLayout = { () =>
                                <View style={{left:-screenWidth*0.5,}}>
                                    <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} colors={[colors.red, 'rgb(229, 35, 48)', '#F93529']}
                                                    style={{width:"100%",
                                                        //  bottom:-screenWidth*0.03,
                                                        alignItems:'center',
                                                        height:screenHeight*0.7,
                                                    }}
                                    >
                                        {/*manomboka orange*/}
                                        {/*Progress bar*/}
                                        <View
                                            style={{ flexDirection: "column",
                                                justifyContent:'center',
                                                width: screenWidth * 1,
                                                alignItems:'center',
                                            }}>
                                            <Text style={{fontSize:14,color:'rgb(127, 22, 19)', paddingTop:screenHeight*0.04}}>Mon repas</Text>
                                            {/*redux*/}
                                            {/*<Text style={{fontSize:14,color:'#F4B8BF', paddingTop:screenHeight*0.008, marginBottom:screenHeight*0.008}}>{petitsdejeunerdetconsort.current.toFixed(3)} Kcal</Text>*/}
                                            <Text style={{fontSize:14,color:'#F4B8BF', paddingTop:screenHeight*0.008, marginBottom:screenHeight*0.008}}>{Math.trunc(petitsdejeunerdetconsort.current)} Kcal</Text>
                                            <View style={{ width: "80%",
                                                height: 10,
                                                backgroundColor: colors.balck + "56",
                                                borderRadius:5}}>
                                                <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['rgb(178, 74, 74)'+'af', 'rgb(183, 95, 95)']} style={[styles.progressValue, { width: percentmonrepas }]}></LinearGradient>
                                            </View>
                                        </View>
                                        <View style={{flexDirection:'row',marginTop:10}}>
                                            {/*petit Progress bar*/}
                                            <View style={{ flexDirection: "column",justifyContent:'center', width: screenWidth *0.3,alignItems:'center' }}>
                                                <Text style={{fontSize:14,color:'rgb(127, 22, 19)', paddingTop:screenHeight*0.01}}>Glucides</Text>
                                                {/*<Text style={{fontSize:14,color:'#F4B8BF',paddingTop:screenHeight*0.005,marginBottom:screenHeight*0.01}}>{petitsdejeunerdetconsort !== null && petitsdejeunerdetconsort.glu.current.toFixed(2)} Kcal</Text>*/}
                                                <Text style={{fontSize:14,color:'#F4B8BF',paddingTop:screenHeight*0.005,marginBottom:screenHeight*0.01}}>{Math.trunc(petitsdejeunerdetconsort.glu.current)} Kcal</Text>
                                                <View style={{ width: "80%",
                                                    height: 10,
                                                    backgroundColor: colors.balck + "56",
                                                    borderRadius:5}}>
                                                    {/*<LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['rgb(178, 74, 74)'+'af', 'rgb(183, 95, 95)']} style={[styles.progressValue, petitsdejeunerdetconsort.glu.percent> 100 ? { width:100}:{ width: petitsdejeunerdetconsort.glu.percent }]}></LinearGradient>*/}
                                                    <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['rgb(178, 74, 74)'+'af', 'rgb(183, 95, 95)']} style={[styles.progressValue, (petitsdejeunerdetconsort.glu.current*87)/petitsdejeunerdetconsort.glu.max > 87 ? { width:87}:{ width: isNaN((petitsdejeunerdetconsort.glu.current*87)/petitsdejeunerdetconsort.glu.max)?0:(petitsdejeunerdetconsort.glu.current*87)/petitsdejeunerdetconsort.glu.max }]}></LinearGradient>
                                                </View>
                                            </View>
                                            {/*petit Progress bar*/}
                                            <View style={{ flexDirection: "column",justifyContent:'center', width: screenWidth *0.3,alignItems:'center' }}>
                                                <Text style={{fontSize:14,color:'rgb(127, 22, 19)',paddingTop:screenHeight*0.01}}>Protéines</Text>
                                                {/*<Text style={{fontSize:14,color:'#F4B8BF',paddingTop:screenHeight*0.005,marginBottom:screenHeight*0.01}}>{petitsdejeunerdetconsort.prot.current.toFixed(2)} Kcal</Text>*/}
                                                <Text style={{fontSize:14,color:'#F4B8BF',paddingTop:screenHeight*0.005,marginBottom:screenHeight*0.01}}>{Math.trunc(petitsdejeunerdetconsort.prot.current)} Kcal</Text>
                                                <View style={{ width: "80%",
                                                    height: 10,
                                                    backgroundColor: colors.balck + "56",
                                                    borderRadius:5}}>
                                                    {/*<LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['rgb(178, 74, 74)'+'af', 'rgb(183, 95, 95)']} style={[styles.progressValue,petitsdejeunerdetconsort.prot.percent >100?  { width:100 } : { width: petitsdejeunerdetconsort.prot.percent }]}></LinearGradient>*/}
                                                    <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['rgb(178, 74, 74)'+'af', 'rgb(183, 95, 95)']} style={[styles.progressValue,(petitsdejeunerdetconsort.prot.current*87)/petitsdejeunerdetconsort.prot.max >87?  { width:87 } : { width:isNaN( (petitsdejeunerdetconsort.prot.current*87)/petitsdejeunerdetconsort.prot.max)?0:(petitsdejeunerdetconsort.prot.current*87)/petitsdejeunerdetconsort.prot.max }]}></LinearGradient>
                                                </View>
                                            </View>


                                            {/*petit Progress bar*/}
                                            <View style={{ flexDirection: "column",justifyContent:'center', width: screenWidth *0.3,alignItems:'center' }}>
                                                <Text style={{fontSize:14,color:'rgb(127, 22, 19)',paddingTop:screenHeight*0.01}}>Lipides</Text>
                                                {/*<Text style={{fontSize:14,color:'#F4B8BF',paddingTop:screenHeight*0.005,marginBottom:screenHeight*0.01}}>{petitsdejeunerdetconsort.lip.current.toFixed(2)} Kcal</Text>*/}
                                                <Text style={{fontSize:14,color:'#F4B8BF',paddingTop:screenHeight*0.005,marginBottom:screenHeight*0.01}}>{Math.trunc(petitsdejeunerdetconsort.lip.current)} Kcal</Text>
                                                <View style={{ width: "80%",
                                                    height: 10,
                                                    backgroundColor: colors.balck + "56",
                                                    borderRadius:5}}>
                                                    {/*<LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['rgb(178, 74, 74)'+'af', 'rgb(183, 95, 95)']} style={[styles.progressValue, petitsdejeunerdetconsort.lip.percent>100? { width: 100}: { width: petitsdejeunerdetconsort.lip.percent }]}></LinearGradient>*/}
                                                    <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['rgb(178, 74, 74)'+'af', 'rgb(183, 95, 95)']} style={[styles.progressValue, (petitsdejeunerdetconsort.lip.current*87)/petitsdejeunerdetconsort.lip.max > 87? { width: 87}: { width: isNaN((petitsdejeunerdetconsort.lip.current*87)/petitsdejeunerdetconsort.lip.max)?0:(petitsdejeunerdetconsort.lip.current*87)/petitsdejeunerdetconsort.lip.max }]}></LinearGradient>
                                                </View>
                                            </View>
                                        </View>
                                        {/*tato le arrow top taloha*/}
                                    </LinearGradient>
                                </View>
                            }
                            slidingPanelLayout = { () =>
                                <View style={{left:-screenWidth*0.5,
                                    //top:-screenHeight*0.65,
                                    top:-screenHeight*0.43,
                                    height:screenHeight
                                }}>
                                    <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }} colors={[colors.balck, colors.green, '#213D2E']}
                                                    style={{width:screenWidth,
                                                        //marginTop:screenHeight*0.35,
                                                        marginTop:0,
                                                        borderTopLeftRadius:10,
                                                        borderTopRightRadius:10,
                                                        height:screenHeight
                                                    }}
                                    >
                                        <TouchableHighlight
                                            onPress={()=>{

                                                this.setState({panelrepasouvert:!this.state.panelrepasouvert});
                                                this.panelrepasopenclose()
                                            }}
                                        >
                                            <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} colors={['rgb(229, 35, 48)', 'rgb(229, 35, 48)', 'rgb(229, 35, 48)']}
                                                            style={{width:screenWidth,
                                                                //marginTop:screenHeight*0.35,
                                                                marginTop:0,
                                                                height:60,
                                                            }}
                                            >
                                                <AutoHeightImage
                                                    width={18}
                                                    source={require('../../../../assets/icons/top.arrow.white.png')}
                                                    style={{
                                                        marginTop:screenWidth*0.06,
                                                        alignSelf:'center'
                                                    }}
                                                />
                                            </LinearGradient>
                                        </TouchableHighlight>
                                        <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }} colors={[colors.balck, colors.green, '#213D2E']}
                                                        style={{width:screenWidth,
                                                            //marginTop:screenHeight*0.35,
                                                            marginTop:-16,
                                                            borderTopLeftRadius:10,
                                                            borderTopRightRadius:10,
                                                            height:screenHeight,
                                                        }}
                                        >
                                            {/*manomboka le mon assiète */}
                                            <View style={{alignItems:'center',marginTop:20}}>
                                                <Text style={[baseStyles.titleText,{fontSize:18}]}>
                                                    {"MON ASSIETTE"}
                                                </Text>
                                            </View>
                                            <View style={{flexDirection:'row', justifyContent:'space-around'}}>
                                                <View></View>
                                                <TouchableOpacity
                                                    onPress={()=>{

                                                        if( this.props.navigation.navigate('Selectionnermesrepas')){}
                                                        else{
                                                            this.props.navigation.navigate('Selectionnermesrepasdashboard')
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
                                                        console.warn('bob')
                                                        this.getCompteurNutritionnelViaAjouterMesRepas().then(()=>{
                                                            if( this.props.navigation.navigate('CompteurNutritionnels')){}
                                                            else {
                                                                this.props.navigation.navigate('CompteurNutritionnel')
                                                            }
                                                        })
                                                    }}
                                                    style={{marginBottom:20,marginTop:15}}>
                                                    <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} colors={["gray", 'grey', 'gray']}
                                                                    style={{width:screenWidth*0.35,alignItems:'center',borderRadius:15,height:screenWidth*0.06,justifyContent:'center'}}>
                                                        <Text style={{fontSize:12,color:'white'}}>
                                                            {"VALIDER"}
                                                        </Text>
                                                    </LinearGradient>
                                                </TouchableOpacity>
                                                <View></View>
                                            </View>
                                            <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }} colors={['#213D2E', colors.green,  '#213D2E']} style={{paddingBottom:70,flex:1}}>
                                                <ScrollView
                                                    keyboardShouldPersistTaps={'always'}
                                                    // refreshControl={
                                                    //     <RefreshControl
                                                    //         refreshing={this.state.refreshing}
                                                    //         onRefresh={() => {
                                                    //             this. getalldata()
                                                    //             this.setState({ refreshing: true })
                                                    //             setTimeout(() => {
                                                    //                 this.setState({ refreshing: false })
                                                    //             }, 2000)
                                                    //         }}
                                                    //     />
                                                    // }
                                                    // contentContainerStyle={{width:'100%',height: screenHeight-20}}m taloha
                                                    contentContainerStyle={{
                                                        minHeight: (screenHeight),
                                                        minWidth: screenWidth,
                                                        alignItems: "center",
                                                    }}
                                                    style={{}}>
                                                    {
                                                        this.props.monassiete.length > 0 && this.props.monassiete.map(
                                                            (item)=>{
                                                                return(
                                                                    <View style={{flexDirection:'column',justifyContent:'flex-start',backgroundColor:'#14261D'}}>
                                                                        <Text style={{color:'#7c8e85',paddingLeft:screenWidth*0.07,fontSize:13,paddingTop:2,paddingBottom:3}}>{item.name}</Text>
                                                                        {
                                                                            item.aliment.length>0 && item.aliment.map(
                                                                                (item1,index)=>{
                                                                                    return(
                                                                                        <View style={{  //item1
                                                                                            flexDirection:'row',
                                                                                            alignItems:'center',
                                                                                            justifyContent:'space-between',
                                                                                            width:'100%',
                                                                                            height:screenHeight*0.06,
                                                                                            backgroundColor:'#213D2E',
                                                                                            marginBottom:2,
                                                                                            marginLeft:8
                                                                                        }}>
                                                                                            <TouchableOpacity
                                                                                                onPress={()=>{ }}
                                                                                                style={{flexDirection:'row',alignItems:'center',width:'31%',height:screenWidth*0.09}}>
                                                                                                <View style={{borderRadius:screenWidth*0.04,width:screenWidth*0.04,height:screenWidth*0.04,backgroundColor:item1.color,marginLeft:screenWidth*0.03}}/>
                                                                                                <Text style={{color:'#b4c1b9',marginLeft:10,fontSize:12}}>{item1.name}</Text>
                                                                                            </TouchableOpacity>
                                                                                            <TouchableOpacity
                                                                                                onPress={()=>{}}
                                                                                                style={{width:'23%',height:screenHeight*0.06,justifyContent: 'center',alignItems:'flex-start'}}>
                                                                                                <Text style={{color:'#8e9992',fontSize:11,paddingLeft:screenWidth*0.05}}>{item1.kilocalorie} Kcal</Text>
                                                                                            </TouchableOpacity>
                                                                                            {/*<View style={{}}>*/}
                                                                                            <View style={{width:'25%',justifyContent:'center',height:screenWidth*0.09,alignItems:'flex-start',paddingLeft:screenWidth*0.03}}>
                                                                                                <Text style={{color:'#8e9992',fontSize:11}}>Quantité : {item1.is_portion === false ? item1.quantite * 100 : item1.quantite }</Text>
                                                                                            </View>
                                                                                            <View style={{width:'24%',justifyContent:'center',marginRight:10,height:screenWidth*0.09}}>
                                                                                                <TouchableOpacity
                                                                                                    onPress={() => {
                                                                                                        this.setState({idputquantite:item1.food_id,is_portion:item1.is_portion}); //id a utiliser est celui de users_alim
                                                                                                        // this.setState({repas_type_id:item1.repas_type_id});
                                                                                                        this._panel.onRequestStart()
                                                                                                    }}
                                                                                                    style={[this.ajouterstyle,{flexDirection:'row',alignItems: 'center',justifyContent: 'center'}]}>
                                                                                                    <Text style={{color:'white',fontSize:12}}>{item1.is_portion === false ? item1.quantite * 100 : item1.quantite }</Text>
                                                                                                    <AutoHeightImage
                                                                                                        width={12}
                                                                                                        source={require("../../../../assets/icons/arrowdownwhite.png")}
                                                                                                        style={{marginLeft:5}}
                                                                                                    />
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
                                                    {/*<View style={{backgroundColor:'#213D2E',alignItems:'center',width: '100%',paddingTop:10,paddingBottom:30}}>*/}
                                                    {/*    <Text style={{color:'white',fontSize:15}}>Enregistrer comme repas</Text>*/}
                                                    {/*</View>*/}
                                                </ScrollView>
                                            </LinearGradient>
                                        </LinearGradient>
                                        {/*liste produits taloha*/}

                                    </LinearGradient>
                                </View>
                            }
                        />
                    </View>
                </View>
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
                                        this.putquantitemonassiette(this.state.idputquantite);
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
                                dataSource={this.state.is_portion === true ? this.state.datasourcequantite :  this.state.datasourcequantite1label}
                                selectedIndex={1}
                                renderItem={(data, index, isSelected) => {
                                    //
                                }}
                                onValueChange={(data, selectedIndex) => {
                                    if(this.state.is_portion === true){
                                        console.warn('datapoi',data);
                                        this.setState({isSelectedquantite:data})
                                    }else{
                                        let subs = data.substring(0, data.length-1);
                                        console.warn('dataport',data,subs);
                                        this.setState({isSelectedquantite:subs}) //depart 0 == supprimer
                                    }
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
                {/*<Image*/}
                {/*    style={{width:screenWidth*0.75,height: screenWidth*0.75,top:-screenWidth*0.48,alignSelf:'center'}}*/}
                {/*    source={require('../../../../assets/images/ODGO_plate.png')} />*/}
            </LinearGradient>
            </LinearGradient>
        )
    }
}

const mapStateToProps = (state) => {



    const { selectedZone,userToken,petitsdejeunerd,monassiete,collationmatind,dejeunerd,collationapresmidid,dinerd,refreshmesrepas } = state.statedata
    return { selectedZone,userToken,petitsdejeunerd,monassiete ,collationmatind,dejeunerd,collationapresmidid,dinerd,refreshmesrepas }
};

export default connect(mapStateToProps)(Petitdejeuner);
