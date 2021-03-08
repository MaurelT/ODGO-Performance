import React, {Component} from 'react';
import ReactNative, {Alert, Dimensions, Keyboard, TouchableOpacity, ScrollView, Image} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import colors from '../../../../configs/colors';
// import {screenHeight} from '../../../../components/react-native-calendars/src/expandableCalendar/commons';
import AutoHeightImage from 'react-native-auto-height-image';
import statusBarHeight from '../../../../configs/screen';
import {connect} from 'react-redux';
import compteurNutritionnelHelper from '../../../../apis/helpers/compteurNutritionnel_helper';
import {
    SET_COLLATION_APRESMIDID,
    SET_COMPTEUR_NUTRITIONNEL, SET_DEJEUNERD, SET_DINERD,
    SET_HIDDEN_FOOTER,
    SET_MON_ASSIETTE, SET_NOS_EATRECENTLY, SET_PETITS_COLLATION_MATIND,
    SET_PETITS_DEJEUNERD, SET_REPAS_TYPE,
} from '../../../../redux/types/tabTypes';
import moment from 'moment';
import SelectionnerMesRepas from '../Aliment/SelectionnerMesRepas';
import {getViaPostRepas, monassiete} from '../../../../apis/FonctionRedondant';
const screen = Dimensions.get("window");
const SBHelight = statusBarHeight;
const screenWidth = screen.width
const screenHeight = screen.height - SBHelight
const {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    TouchableHighlight,
    Animated
} = ReactNative;


var isHidden = true;

class PetitdejeunerNew extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bounceValue: new Animated.Value(28),  //This is the initial position of the subview
            buttonText: "Show poux",
            //navokako daol
            activeMenu: 'aliments',
            selectedZone: props.selectedZone,
            zonePicker: false,
            compteurNutritionnel:null,
            refreshing:true,
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
         // this.ajouterstyle={width:screenWidth*0.13,height:screenWidth*0.06,backgroundColor:'#FF3A28',justifyContent:'center',alignItems:'center',borderRadius:4}

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


        console.warn('scre',screenHeight);
        Keyboard.addListener(
            "keyboardDidHide",
            () => {
                const setHiddenFooter = { type: SET_HIDDEN_FOOTER, value: false };
                this.props.dispatch(setHiddenFooter);

            }
        );
       Keyboard.addListener(
            "keyboardDidShow",
            () => {
                const setHiddenFooter = { type: SET_HIDDEN_FOOTER, value: true };
                this.props.dispatch(setHiddenFooter);
            }
        );
        this.RepasTypes().then(()=>{
            console.warn('repas type')
            this.setState({refreshing: false});
        });

        // getViaPostRepas(compteurNutritionnelHelper,this.props,global.repas_type_id).then(()=>{
        //     this.setState({refreshing: false});
        //
        // })

    }

    getCompteurNutritionnelViaAjouterMesRepas = async () => { //alaina le fonction evit redondant iny fa efa mis any
        this.setState({refreshing: true});
        const compteurNutritionnel = await compteurNutritionnelHelper.getCompteurNutritionnel(this.props.userToken);
        if (compteurNutritionnel) {
            const setcompteurNutritionnel = {type: SET_COMPTEUR_NUTRITIONNEL, value: compteurNutritionnel};
            this.props.dispatch(setcompteurNutritionnel);
            this.setState({refreshing: false});
            return compteurNutritionnel;
        }
    };
    _toggleSubview() {
        console.warn(isHidden);
        this.setState({
            buttonText: !isHidden ? "Show poux" : "Hide poux"
        });

        var toValue = screenHeight <= 616 ? 138 : screenHeight * 0.21;

        if(isHidden) {
            toValue = 28;
        }

        Animated.spring(
            this.state.bounceValue,
            {
                toValue: toValue,
                velocity: 3,
                tension: 2,
                friction: 8,
            }
        ).start();

        isHidden = !isHidden;
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
                    monassiete(compteurNutritionnelHelper,this.props,global.repas_type_id,this.props.dateforajoutaliment).then((refreshingfalse)=>{
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

    render() {
        var max = 0;
        var current = 0;
        let percentmonrepas = 0;
        var petitsdejeunerdetconsort = null;
        // var collationmatind = null;
        // var dejeunerd = null;
        // var  collationapresmidid = null;
        // var dinerd = null;

        let currently = this.props.monassiete.length > 0 ? this.props.monassiete[0].totalbe.total_kcal : 0;
        let  glu = this.props.monassiete.length > 0 ? this.props.monassiete[0].totalbe.total_glucides : 0;
        let  prot = this.props.monassiete.length > 0 ? this.props.monassiete[0].totalbe.total_proteines : 0;
        let  lip = this.props.monassiete.length > 0 ? this.props.monassiete[0].totalbe.total_lipides : 0;

        let newmax = this.props.monassiete.length > 0 ? this.props.monassiete[0].totalbe.max_kcal:0;
        let maxglu = this.props.monassiete.length > 0 ? this.props.monassiete[0].totalbe.max_glucides:0;
        let maxpro = this.props.monassiete.length > 0 ? this.props.monassiete[0].totalbe.max_proteines:0;
        let maxlip = this.props.monassiete.length > 0 ? this.props.monassiete[0].totalbe.max_lipides:0;

        switch(global.repas_type_id){
            case 1 :
                try{
                    max =this.props.petitsdejeunerd !== null && this.props.petitsdejeunerd.max;
                    current = this.props.petitsdejeunerd !== null && this.props.petitsdejeunerd.current;
                    petitsdejeunerdetconsort = this.props.petitsdejeunerd;
                    console.warn('ireto',max,current,petitsdejeunerdetconsort)
                    break;
                }catch (e) {  }

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
                    break;
                }catch (e) {  }


            case 4 :
                try{
                    max =this.props.collationapresmidid !== null && this.props.collationapresmidid.max;
                    current = this.props.collationapresmidid !== null && this.props.collationapresmidid.current;
                    petitsdejeunerdetconsort = this.props.collationapresmidid;
                    break;
                }catch (e) {  }


            case 5 :
                try{
                    max =this.props.dinerd !== null && this.props.dinerd.max;
                    current = this.props.dinerd !== null && this.props.dinerd.current;
                    petitsdejeunerdetconsort =  this.props.dinerd !== null && this.props.dinerd;
                    break;
                }catch (e) {  }

            default:
                try{
                    max =this.props.petitsdejeunerd !== null && this.props.petitsdejeunerd.max;
                    current = this.props.petitsdejeunerd !== null && this.props.petitsdejeunerd.current;
                    petitsdejeunerdetconsort = this.props.petitsdejeunerd;
                }catch (e) {  }
        }
        //let   percentmonrepasbefore = (current*288)/max; //288 === 10%
        // let   percentmonrepasbefore = (currently*288)/max; //288 === 10%
        let   percentmonrepasbefore = (currently*288)/newmax; //288 === 10%
        if(percentmonrepasbefore  >= 288){
            percentmonrepas = 288;
        }else{
            console.warn('ye miditra poux')
            if(isNaN(percentmonrepasbefore)){
                percentmonrepas = 0;
            }else{
                percentmonrepas = percentmonrepasbefore;
            }
        }
        return (
            <View style={{flex:1,}}     onStartShouldSetResponder={() =>
            {
                console.warn('boneim')
                Keyboard.dismiss()
            }}>
                <View style={{
                    // alignItems :"center",justifyContent:"center",width:"100%",marginTop:15
                    alignItems :"center",
                    justifyContent:"center",
                    width:"100%",
                    position:'absolute',
                    zIndex:2,
                    marginTop:-4,
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
                    <Text style={{textAlign:"center", color: colors.white, fontSize: 17,marginRight:8,left:-2}}>
                        Ajouter mon {this.props.navigation.state.params.nom_PetitDejOuCollationEtReste.toLowerCase()}
                    </Text>
                </View>
                <View style={{
                   }}>
                    <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }} colors={[colors.balck, colors.green,  '#213D2E']}
                                    style={{
                                        height:28,
                                    }} >
                    </LinearGradient>
                </View>
                <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} colors={[colors.red, 'rgb(229, 35, 48)', '#F93529']}
                    style={{
                        alignItems:'center',
                        flex:1,
                    }}
                >
                    {/*manomboka orange*/}
                    {/*Progress bar*/}
                    <View
                        style={{ flexDirection: "column",
                            justifyContent:'center',
                            width: screenWidth,
                            alignItems:'center',
                            marginTop:screenHeight <= 700 ? 0 :screenHeight*0.035
                        }}>
                        <Text style={{fontSize:14,color:'rgb(127, 22, 19)', paddingTop:1}}>Mon repas</Text>
                        {/*<Text style={{fontSize:14,color:'#F4B8BF', paddingTop:screenHeight*0.001, marginBottom:screenHeight*0.003}}>{Math.trunc(currently)}/{newmax} Kcal</Text>*/}
                        <Text style={{fontSize:14,color:'#F4B8BF', paddingTop:screenHeight*0.001, marginBottom:screenHeight*0.003}}>{currently.toFixed(0)}/{newmax.toFixed(0)} Kcal</Text>
                        <View style={{ width: "80%",
                            height: 10,
                            backgroundColor: colors.balck + "56",
                            borderRadius:5}}>
                            <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['rgb(190, 90, 74)'+'af', 'white']} style={{ width: percentmonrepas, height: 10, borderRadius: 10 }}></LinearGradient>
                        </View>
                    </View>
                    <View style={{flexDirection:'row',marginTop:3}}>
                        {/*petit Progress bar*/}
                        <View style={{ flexDirection: "column",justifyContent:'center', width: screenWidth *0.3,alignItems:'center' }}>
                            <Text style={{fontSize:14,color:'rgb(127, 22, 19)', paddingTop:screenHeight*0.003}}>Glucides</Text>
                            {/*<Text style={{fontSize:14,color:'#F4B8BF',paddingTop:screenHeight*0.001,marginBottom:screenHeight*0.005}}>{Math.trunc(petitsdejeunerdetconsort.glu.current)} Kcal</Text>*/}
                            <Text style={{fontSize:14,color:'#F4B8BF',paddingTop:screenHeight*0.001,marginBottom:screenHeight*0.005}}>{glu.toFixed(0)}/{maxglu.toFixed(0)} gr</Text>
                            <View style={{ width: "80%",
                                height: 10,
                                backgroundColor: colors.balck + "56",
                                borderRadius:5}}>
                                {/*<LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['rgb(178, 74, 74)'+'af', 'rgb(183, 95, 95)']} style={[styles.progressValue, petitsdejeunerdetconsort.glu.percent> 100 ? { width:100}:{ width: petitsdejeunerdetconsort.glu.percent }]}></LinearGradient>*/}
                                {/*<LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['rgb(190, 90, 74)'+'af', 'white']} style={(petitsdejeunerdetconsort.glu.current*87)/petitsdejeunerdetconsort.glu.max > 87 ? { width:87, height: 10, borderRadius: 10}:{ width: isNaN((petitsdejeunerdetconsort.glu.current*87)/petitsdejeunerdetconsort.glu.max)?0:(petitsdejeunerdetconsort.glu.current*87)/petitsdejeunerdetconsort.glu.max, height: 10, borderRadius: 10 }}></LinearGradient>*/}
                                <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['rgb(190, 90, 74)'+'af', 'white']} style={(glu *87)/maxglu > 87 ? { width:87, height: 10, borderRadius: 10}:{ width: isNaN((glu * 87)/maxglu) ? 0 : ( glu *87)/maxglu, height: 10, borderRadius: 10 }}></LinearGradient>
                            </View>
                        </View>
                        {/*petit Progress bar*/}
                        <View style={{ flexDirection: "column",justifyContent:'center', width: screenWidth *0.3,alignItems:'center' }}>
                            <Text style={{fontSize:14,color:'rgb(127, 22, 19)',paddingTop:screenHeight*0.003}}>Protéines</Text>
                            {/*<Text style={{fontSize:14,color:'#F4B8BF',paddingTop:screenHeight*0.005,marginBottom:screenHeight*0.01}}>{petitsdejeunerdetconsort.prot.current.toFixed(2)} Kcal</Text>*/}
                            {/*<Text style={{fontSize:14,color:'#F4B8BF',paddingTop:screenHeight*0.001,marginBottom:screenHeight*0.005}}>{Math.trunc(petitsdejeunerdetconsort.prot.current)} Kcal</Text>*/}
                            <Text style={{fontSize:14,color:'#F4B8BF',paddingTop:screenHeight*0.001,marginBottom:screenHeight*0.005}}>{prot.toFixed(0)}/{maxpro.toFixed(0)} gr</Text>
                            <View style={{ width: "80%",
                                height: 10,
                                backgroundColor: colors.balck + "56",
                                borderRadius:5}}>
                                {/*<LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['rgb(178, 74, 74)'+'af', 'rgb(183, 95, 95)']} style={[styles.progressValue,petitsdejeunerdetconsort.prot.percent >100?  { width:100 } : { width: petitsdejeunerdetconsort.prot.percent }]}></LinearGradient>*/}
                                <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['rgb(190, 90, 74)'+'af', 'white']} style={(prot*87)/maxpro >87?  { width:87, height: 10, borderRadius: 10 } : { width:isNaN( (prot*87)/maxpro)?0:(prot*87)/maxpro, height: 10, borderRadius: 10 }}></LinearGradient>
                            </View>
                        </View>
                        {/*petit Progress bar*/}
                        <View style={{ flexDirection: "column",justifyContent:'center', width: screenWidth *0.3,alignItems:'center' }}>
                            <Text style={{fontSize:14,color:'rgb(127, 22, 19)',paddingTop:screenHeight*0.003}}>Lipides</Text>
                            {/*<Text style={{fontSize:14,color:'#F4B8BF',paddingTop:screenHeight*0.005,marginBottom:screenHeight*0.01}}>{petitsdejeunerdetconsort.lip.current.toFixed(2)} Kcal</Text>*/}
                            {/*<Text style={{fontSize:14,color:'#F4B8BF',paddingTop:screenHeight*0.001,marginBottom:screenHeight*0.005}}>{Math.trunc(petitsdejeunerdetconsort.lip.current)} Kcal</Text>*/}
                            <Text style={{fontSize:14,color:'#F4B8BF',paddingTop:screenHeight*0.001,marginBottom:screenHeight*0.005}}>{lip.toFixed(0)}/{maxlip.toFixed(0)} gr</Text>
                            <View style={{ width: "80%",
                                height: 10,
                                backgroundColor: colors.balck + "56",
                                borderRadius:5}}>
                                {/*<LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['rgb(178, 74, 74)'+'af', 'rgb(183, 95, 95)']} style={[styles.progressValue, petitsdejeunerdetconsort.lip.percent>100? { width: 100}: { width: petitsdejeunerdetconsort.lip.percent }]}></LinearGradient>*/}
                                <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['rgb(190, 90, 74)'+'af', 'white']} style={(lip*87)/maxlip > 87? { width: 87, height: 10, borderRadius: 10}: { width: isNaN((lip*87)/maxlip)?0:(lip*87)/maxlip , height: 10, borderRadius: 10}}></LinearGradient>
                            </View>
                        </View>
                    </View>
                </LinearGradient>
                <Animated.View
                    style={
                        {transform: [{translateY: this.state.bounceValue}], position: "absolute",
                            top: 0,
                            left: 0,
                            right: 0,
                            marginTop:0,
                            height: screenHeight
                        }}
                >
                    <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }} colors={[colors.balck, colors.green,  '#213D2E']}
                style={{
                    flex:1,

                }}
                >
                        <TouchableHighlight
                    onPress={()=> {this._toggleSubview()}}
                    >
                        <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} colors={['rgb(229, 35, 48)', 'rgb(229, 35, 48)', 'rgb(229, 35, 48)']}
                                        style={{width:"100%",
                                           // marginTop:-20,
                                            height:25,
                                        }}
                        >
                            <AutoHeightImage
                                width={18}
                                source={require('../../../../assets/icons/top.arrow.white.png')}
                                style={{
                                    marginTop:0.5,
                                    alignSelf:'center'
                                }}
                            />
                        </LinearGradient>
                    </TouchableHighlight>
                    <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }} colors={[colors.balck, colors.green,  '#213D2E']}
                                    style={{flex:1,top:-5,borderTopLeftRadius:7,borderTopRightRadius:7}}
                    >
                        <View style={{alignSelf:'center',marginTop:7}}><Text style={{color:'white',fontSize: 16}}>MON ASSIETTE</Text></View>
                        <View style={{ maxHeight: this.state.buttonText ==="Show poux"? 60:100,
                            buttonText: !isHidden ? "Show poux" : "Hide poux"

                        }}>
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
                                                                    <View
                                                                        onPress={()=>{ }}
                                                                        style={{flexDirection:'row',alignItems:'center',width:'35%',height:screenWidth*0.09}}>
                                                                        <View style={{borderRadius:screenWidth*0.04,width:screenWidth*0.04,height:screenWidth*0.04,backgroundColor:item1.color,marginLeft:screenWidth*0.03}}/>
                                                                        <View style={{}}>
                                                                        <Text style={{color:'#b4c1b9',marginLeft:7,fontSize:12,flexWrap:'wrap'}}>{item1.name}</Text>
                                                                        </View>
                                                                    </View>
                                                                    <View
                                                                        onPress={()=>{}}
                                                                        style={{width:'22%',height:screenHeight*0.06,justifyContent: 'center',alignItems:'flex-start'}}>
                                                                        <Text style={{color:'#8e9992',fontSize:11,paddingLeft:screenWidth*0.05}}>{item1.kilocalorie % 1 !== 0 ? item1.kilocalorie.toFixed(0) :item1.kilocalorie } Kcal</Text>
                                                                    </View>
                                                                    {/*<View style={{}}>*/}
                                                                    <View style={{width:'26%',justifyContent:'center',height:screenWidth*0.09,alignItems:'flex-start',paddingLeft:screenWidth*0.03}}>
                                                                        <Text style={{color:'#8e9992',fontSize:11}}>Quantité : {item1.is_portion === false ? item1.quantite : item1.quantite }</Text>
                                                                    </View>
                                                                    <View style={{width:'19%',flexDirection:'row',alignItems:'center',justifyContent:'flex-end',marginRight:10,height:screenWidth*0.09}}>
                                                                        <TouchableOpacity onPress={()=>{
                                                                            console.warn('foodid',item1.food_id);
                                                                           let alimentss = {
                                                                                id:item1.id,
                                                                                name:item1.name,
                                                                                kilocalorie: item1.kcalorie_pour_100g,
                                                                                quantite:item1.quantite,
                                                                                color:item1.color,
                                                                                repas_type_id:item1.aliment_type_id,
                                                                                food_id:item1.food_id,
                                                                                is_portion:item1.is_portion
                                                                            };

                                                                            if( this.props.navigation.navigate('MesProduits_NosSuggesstion_Item',{item:item,item1:item1,edit:true,aliment_id:item1.id,myfoodid:item1.food_id,alimentss:alimentss})){}
                                                                            else{
                                                                                this.props.navigation.navigate('MesProduits_NosSuggesstion_Item_dashboard',{item:item,item1:item1,edit:true,aliment_id:item1.id,myfoodid:item1.food_id,alimentss:alimentss})
                                                                            }
                                                                            console.warn('edit')
                                                                        }}><Image
                                                                            style={{width: 18, height: 18,marginLeft:7,marginRight:8}}
                                                                            source={require('../../../../assets/icons/edit.png')}
                                                                        />
                                                                        </TouchableOpacity>
                                                                        <TouchableOpacity onPress={async ()=>{

                                                                        // let putquantitemonassiette =    await compteurNutritionnelHelper.putquantitemonassiette(this.props.userToken,item1.food_id,0);
                                                                        let putquantitemonassiette =    await compteurNutritionnelHelper.deletealimentassiete(this.props.userToken,item1.food_id);
                                                                            if (putquantitemonassiette) {
                                                                                this.setState({refreshing: false});
                                                                                Alert.alert('Odgo','Suppression effectuée avec succès',[{text:'Ok',onPress:()=>{
                                                                                        this.setState({refreshing: true});
                                                                                        const setmonassiettey = { type: SET_MON_ASSIETTE, value: [] };
                                                                                        this.props.dispatch(setmonassiettey);
                                                                                        monassiete(compteurNutritionnelHelper,this.props,global.repas_type_id,this.props.dateforajoutaliment).then((refreshingfalse)=>{
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
                                                                                        if( this.props.navigation.navigate('PetitdejeunerNew')){}
                                                                                        else {
                                                                                            this.props.navigation.navigate('PetitdejeunerNews')
                                                                                        }
                                                                                    }}]);
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
                        </View>
                        <View

                            style={{marginBottom:5,marginTop:9}}>
                            {/*Boutton*/}
                            <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} colors={[colors.red, 'rgb(229, 35, 48)', '#F93529']}
                                            style={{width:screenWidth*0.35,alignItems:'center',borderRadius:screenWidth * 0.06,height:screenWidth*0.07,justifyContent:'center',alignSelf:'center'}}>
                                <TouchableOpacity
                                    style={{width:'100%',alignItems:'center',height:screenWidth*0.07,justifyContent:'center'}}
                                    onPress={()=>{
                                            this.getCompteurNutritionnelViaAjouterMesRepas().then(()=>{
                                                if( this.props.navigation.navigate('CompteurNutritionnels')){}
                                                else {
                                                    this.props.navigation.navigate('CompteurNutritionnel')
                                                }
                                            })
                                    }}
                                >
                                <Text style={{fontSize:12,color:'#F4B8BF'}}>
                                    {"VALIDER"}
                                </Text>
                                </TouchableOpacity>
                            </LinearGradient>
                        </View>
                        {console.warn('hey',this.props.navigation.state.params.isvidersearch ? this.props.navigation.state.params.isvidersearch:false)}
                        <SelectionnerMesRepas navigation={this.props.navigation}  textsearch={""}/>
                    </LinearGradient>
                </LinearGradient>
                </Animated.View>
            </View>
        );
    }
}

var styles = StyleSheet.create({

    button: {
        padding: 8,
    },
    buttonText: {
        fontSize: 17,
        color: "#007AFF"
    }
});

const mapStateToProps = (state) => {



    const { filteredNosSuggestionfiltered,
        filteredmesRepaspetitsdejeunerfiltered,
        filteredEatRecentlyfiltered,
        filteredCollationmatinfiltered,
        filteredDejeunerfiltered,
        filteredCollationApresMidifiltered,
        filteredDinerfiltered,selectedZone,userToken,petitsdejeunerd,monassiete,collationmatind,dejeunerd,collationapresmidid,dinerd,refreshmesrepas,dateforajoutaliment } = state.statedata
    return { filteredNosSuggestionfiltered,
        filteredmesRepaspetitsdejeunerfiltered,
        filteredEatRecentlyfiltered,
        filteredCollationmatinfiltered,
        filteredDejeunerfiltered,
        filteredCollationApresMidifiltered,
        filteredDinerfiltered,selectedZone,userToken,petitsdejeunerd,monassiete ,collationmatind,dejeunerd,collationapresmidid,dinerd,refreshmesrepas,dateforajoutaliment }
};

export default connect(mapStateToProps)(PetitdejeunerNew);
