import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    ScrollView,
    View,
    Text,
    TouchableOpacity,
    Dimensions,
    StatusBar,
    Modal, RefreshControl,
    Alert,
    Button, ImageBackground, Easing, Platform,
} from 'react-native';
// import Slider from '@react-native-community/slider';
import { Slider } from 'react-native-elements';
import baseStyles from '../../../../base/BaseStyles';
import styles from './styles'
import colors from '../../../../configs/colors';
import LinearGradient from 'react-native-linear-gradient';
import ZonePicker from '../../../../components/ZonePicker/ZonePicker';
import MAAButton from '../../../../components/MAAButton/MAAButton';
import AutoHeightImage from 'react-native-auto-height-image';
import ProgressCircle from 'react-native-progress-circle';
import {SET_ACTIVE_TAB, SET_POP_TO_TOP} from '../../../../redux/types/tabTypes';
import msi from "../../../../apis/helpers/sommeil_helper";
import moment from "moment";
import {CustomSlider} from '../../../Training/NewTraining/CustomSlider';
import DateTimePicker from "react-native-modal-datetime-picker";
import statusBarHeight from '../../../../configs/screen';
import { Popover, PopoverController } from 'react-native-modal-popover';
import {AnimatedCircularProgress} from "react-native-circular-progress";
import {getDashboar} from '../../../../apis/FonctionRedondant';
import dashboardHelper from '../../../../apis/helpers/dashboard_helper';
import Slidebottom from '../../../../components/selectslidebottom/Slidebottom';
import PersonalDataHelper from '../../../../apis/helpers/person_data_helper';
import * as Progress from "react-native-progress";

//import DateTimePicker from '@react-native-community/datetimepicker';


const screen = Dimensions.get("window");
const SBHelight = statusBarHeight;
const screenWidth = screen.width
const screenHeight = screen.height - SBHelight

const nbhsArray = [
    {h:"4h00",hor:4.00},
    {h:"4h15",hor:4.15},
    {h:"4h30",hor:4.30},
    {h:"4h45",hor:4.45},
    {h:"5h00",hor:5.00},
    {h:"5h15",hor:5.15},
    {h:"5h30",hor:5.30},
    {h:"5h45",hor:5.45},
    {h:"6h00",hor:6.00},
    {h:"6h15",hor:6.15},
    {h:"6h30",hor:6.30},
    {h:"6h45",hor:6.45},
    {h:"7h00",hor:7.00},
    {h:"7h15",hor:7.15},
    {h:"7h30",hor:7.30},
    {h:"7h45",hor:7.45},
    {h:"8h00",hor:8.00},
    {h:"8h15",hor:8.15},
    {h:"8h30",hor:8.30},
    {h:"8h45",hor:8.45},
    {h:"9h00",hor:9.00},
    {h:"9h15",hor:9.15},
    {h:"9h30",hor:9.30},
    {h:"9h45",hor:9.45},
    {h:"10h00",hor:10.00},
    {h:"10h15",hor:10.15},
    {h:"10h30",hor:10.30},
    {h:"10h45",hor:10.45},
    {h:"11h00",hor:11.00},
    {h:"11h15",hor:11.15},
    {h:"11h30",hor:11.30},
    {h:"11h45",hor:11.45},
    {h:"12h00",hor:12.00},
];

const popover = () => (
    <View style={{}}>
        <PopoverController>
            {({ openPopover, closePopover, popoverVisible, setPopoverAnchor, popoverAnchorRect }) => (
                <React.Fragment>
                    <TouchableOpacity ref={setPopoverAnchor} onPress={openPopover} ><AutoHeightImage
                        width={20}
                        source={require("../../../../assets/icons/information.png")}
                        style={{ alignSelf: "center" }}
                    /></TouchableOpacity>
                    <Popover
                        contentStyle={{width:245}}
                        arrowStyle={styles.arrow}
                        backgroundStyle={styles.background}
                        visible={popoverVisible}
                        onClose={closePopover}
                        fromRect={popoverAnchorRect}
                        supportedOrientations={['portrait', 'landscape']}
                    >
                        <Text style={{color:'#234232',textAlign:'center'}}>5 cycles de sommeil de 1h30 sont conseillés soit 7h30.</Text>
                    </Popover>
                </React.Fragment>
            )}
        </PopoverController>
    </View>
);

const popover1 = () => (
    <View style={{}}>
        <PopoverController>
            {({ openPopover, closePopover, popoverVisible, setPopoverAnchor, popoverAnchorRect }) => (
                <React.Fragment>
                    <TouchableOpacity ref={setPopoverAnchor} onPress={openPopover} ><AutoHeightImage
                        width={20}
                        source={require("../../../../assets/icons/information.png")}
                        style={{ alignSelf: "center" }}
                    /></TouchableOpacity>
                    <Popover
                        contentStyle={{width:245}}
                        arrowStyle={styles.arrow}
                        backgroundStyle={styles.background}
                        visible={popoverVisible}
                        onClose={closePopover}
                        fromRect={popoverAnchorRect}
                        supportedOrientations={['portrait', 'landscape']}
                    >
                        <Text style={{color:'#234232',textAlign:'center'}}>Recommandé entre 15' et 30'.</Text>
                    </Popover>
                </React.Fragment>
            )}
        </PopoverController>
    </View>
);

class Sommeil extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isWritingSommeil:false,
            nbhsommeil:null,

            userToken:props.userToken,
            activeMenu: 2,
            selectedZone: props.selectedZone,
            zonePicker: false,
            sliderValueIntensite:0,
            //  sliderValueDifficulte: 4,
            sliderValueQualitedureveil:[0], //inty no miasa, rehefa novaina slider de natao zero
            sliderValueSensationFatigue:[0],
            // intensiteValueTextWidth: 0,
            // difficulteValueTextWidth: 0,
            popToTop:this.props.popToTop,
            sommeilHelper:null,
            refreshing:false,
            facteurNuisible: null,
            borderC:[],
            backgroundC:[],
            idsfacteurnuisible:[],
            lastKeyPressed:null, // initialisena null mba handeha
            hsommeil:0,
            mnsommeil:'00',
            percentage:0,
            checked:false,
            hcoucherforpost:null,
            hreveilforpost:null,
            sommeil_facteur_nuisible_id:null,
            coucher :false,
            reveil :false,
            monobjectif:false,
            monobjectif_post_affichage:null,
            //datetimepicker
            isDateTimePickerVisible:false,
            time_text: moment(new Date()).format("DD/MM/YYYY"),
            dateSelectedForsave:moment(new Date()).format("YYYY-MM-DD"),
            hobjectif:1,

            heurecoucherpoursoustracction:'00',
            minutecoucherpoursoustracction:'00',
            heurereveilpoursoustracction:'00',
            minutereveilpoursoustracction:'00',

            showMinute:false,
            // minutes:[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60],
            //minutes:[0,10,20,30,40,50,60],
            minutes:[{envoie:0,affichage:"0 mn"},{envoie:10,affichage:"10 mn"},{envoie:20,affichage:"20 mn"},{envoie:30,affichage:"30 mn"},{envoie:40,affichage:"40 mn"},{envoie:50,affichage:"50 mn"},{envoie:60,affichage:"1h"},{envoie:70,affichage:"1h10"},{envoie:80,affichage:"1h20"},{envoie:90,affichage:"1h30"},{envoie:100,affichage:"1h40"},{envoie:110,affichage:"1h50"},{envoie:120,affichage:"2h"},{envoie:130,affichage:"2h10"},{envoie:140,affichage:"2h20"},{envoie:150,affichage:"2h30"},{envoie:160,affichage:"2h40"},{envoie:170,affichage:"2h50"},{envoie:180,affichage:"3h"},{envoie:190,affichage:"+3h"}],
            minuteselectionneenvoie:0,
            minuteselectionneaffichage:"0 mn",

            newdate: new Date(),
            venudesommeilnuisible:[],
        }

        this._changeslider = this._changeslider.bind(this)
    }

    _changeslider(value){
        this.setState({ sliderValueQualitedureveil: [value] }) //nezahana nitady ilay iray
    }
    componentDidMount() {
        this.circularProgress11.animate(100, 0, Easing.quad);
        this.circularProgress1.animate(0, 4000, Easing.quad);
        //this.getUserNbHeureSommeil();
        this.getUserSommeils();
        this.getFacteurNuisible();
    }


    putUserNbHeureSommeilURL = async () => {
        if(this.state.nbhsommeil !== null){
            const resPutNBHS = await PersonalDataHelper.putUserNbHeureSommeil(
                this.props.userToken,
                // parseFloat(nbhsRpl).toFixed(2)
                //this.state.nbhsommeil
                this.state.hobjectif
            );
            if (resPutNBHS){
                return true;
            }
        }
    };

   /* getUserNbHeureSommeil = async () => {
        this.setState({refreshing:true});
        const nbhsommeil = await PersonalDataHelper.getUserNbHeureSommeil(this.props.userToken);
        this.setState({ nbhsommeil: nbhsommeil.data.nb_heure_sommeil });
        this.setState({ hobjectif: nbhsommeil.data.nb_heure_sommeil });
        this.setState({refreshing:false});
        return  nbhsommeil.data.nb_heure_sommeil;
    };*/

    singleSliderValueCallbackQualitetravail =(values)=> {
        this.setState({sliderValueQualitedureveil:values})
    };

    singleSliderValueCallbackSensationFatigue =(values)=> {
        this.setState({sliderValueSensationFatigue:values})
    };


    postsommeil = async () => {
        this.setState({refreshing: true});

        let qualitereveil = 0;
        switch (parseInt(this.state.sliderValueQualitedureveil[0],10)) {
            case 0 :
                qualitereveil = 0;
                break;
            case 1 :
                qualitereveil = 2;
                break;
            case 2 :
                qualitereveil = 4;
                break;
            case 3 :
                qualitereveil = 6;
                break;
            case 4 :
                qualitereveil = 8;
                break;
            case 5 :
                qualitereveil = 10;
                break;
        }

        let quantitefatigue = 0;
        switch (parseInt(this.state.sliderValueSensationFatigue[0],10)) {

            case 0 :
                quantitefatigue = 0;
                break;
            case 1 :
                quantitefatigue = 2;
                break;
            case 2 :
                quantitefatigue = 4;
                break;
            case 3 :
                quantitefatigue = 6;
                break;
            case 4 :
                quantitefatigue = 8;
                break;
            case 5 :
                quantitefatigue = 10;
                break;
        }

        let notif_ = 0;
        if(this.state.checked===false){
            notif_ = 0;
        }else if(this.state.checked===true){
            notif_ = 1;
        }


        let datasend = {
            nb_heure_sommeil :this.state.hsommeil + '.' + this.state.mnsommeil,
            heure_coucher :this.state.hcoucherforpost,
            heure_reveil : this.state.hreveilforpost,
            temps_sieste_min: this.state.minuteselectionneenvoie,
            notif:notif_,
            qualite_reveil:qualitereveil,
            sensation_fatigue:quantitefatigue,
        };

        let jaja = this.state.idsfacteurnuisible;
        let flagss = [], outp = [], ll = jaja.length, ii;
        for( ii=0; ii<ll; ii++) {
            if( flagss[jaja[ii].id]) continue;
            flagss[jaja[ii].id] = true;
            outp.push(jaja[ii]);
        }

        let facteurnuisible = [];
        for(let i = 0; i< outp.length;i++){
            let item = outp[i];
            if(item.bool === true){
                facteurnuisible.push(item.id)
            }
        }

        if(facteurnuisible.length > 0){
            datasend.sommeil_facteur_nuisible_ids =  [...new Set(facteurnuisible)];
        }

        console.warn('da',datasend);


       const postsommeil = await msi.postsommeil(this.props.userToken,
            datasend
        );

       // let postsommeil = {};
         //postsommeil.success = false;
        console.warn(postsommeil)
        if (postsommeil.success === true) {
            this.setState({refreshing: false});
            Alert.alert('Odgo','Sommeil ajouté avec succès',[{
                text:"Ok",
                onPress:()=> {
                    this.getUserSommeils();
                    this.getFacteurNuisible();
                    getDashboar(dashboardHelper, this.props).then((refreshingfalse) => {
                        if(this.props.navigation.goBack()) {}
                        else{
                            const setActiveTab = { type: SET_ACTIVE_TAB, value: "home" }
                            this.props.dispatch(setActiveTab);
                        }
                    })
                }
            }]);
        }else{
            this.setState({refreshing:false})
        }
    };

    getUserSommeils = async () => {
        this.setState({refreshing: true});
         const sommeilHelper= await msi.getUserSommeils(this.props.userToken);

         console.warn("sommeilHelper",sommeilHelper)
        // this.setState({coucher:true})
        // this.setState({reveil:false})
        // this.setState({monobjectif:false})
        if (sommeilHelper.success === true) {
            if(sommeilHelper.data.sommeil_facteur_nuisible_ids){
                this.setState({venudesommeilnuisible:sommeilHelper.data.sommeil_facteur_nuisible_ids})
            }
            this.setState({refreshing: false,sommeilHelper:sommeilHelper});

            //let recupobjectif = await this.getUserNbHeureSommeil();
            const nbhsommeil = await PersonalDataHelper.getUserNbHeureSommeil(this.props.userToken);
            recupobjectif = nbhsommeil.data.nb_heure_sommeil;
            this.setState({ hobjectif: nbhsommeil.data.nb_heure_sommeil });

            let qualitereveil = 0;
            switch (sommeilHelper.data.qualite_reveil) {
                case 0 :
                    qualitereveil = 0;
                    break;
                case 1 :
                    qualitereveil = 0;
                    break;
                case 2 :
                    qualitereveil = 1;
                    break;
                case 3 :
                    qualitereveil = 1;
                    break;
                case 4 :
                    qualitereveil = 2;
                    break;
                case 5 :
                    qualitereveil = 2;
                case 6 :
                    qualitereveil = 3;
                    break;
                case 7 :
                    qualitereveil = 3;
                    break;
                case 8 :
                    qualitereveil = 4;
                    break;
                case 9 :
                    qualitereveil = 4;
                    break;
                case 10 :
                    qualitereveil = 5;
                    break;
            }
            this.setState({sliderValueQualitedureveil:[qualitereveil]});


            let quantitefatigue = 0;
            switch (sommeilHelper.data.sensation_fatigue) {
                case 0 :
                    quantitefatigue = 0;
                    break;
                case 1 :
                    quantitefatigue = 0;
                    break;
                case 2 :
                    quantitefatigue = 1;
                    break;
                case 3 :
                    quantitefatigue = 1;
                    break;
                case 4 :
                    quantitefatigue = 2;
                    break;
                case 5 :
                    quantitefatigue = 2;
                case 6 :
                    quantitefatigue = 3;
                    break;
                case 7 :
                    quantitefatigue = 3;
                    break;
                case 8 :
                    quantitefatigue = 4;
                    break;
                case 9 :
                    quantitefatigue = 4;
                    break;
                case 10 :
                    quantitefatigue = 5;
                    break;
            }

            this.setState({sliderValueSensationFatigue:[quantitefatigue]});

            // let hcoucher = parseInt(moment(sommeilHelper.data.heure_coucher).format('H'))
            // let mncoucher = parseInt(moment(sommeilHelper.data.heure_coucher).format('mn'))


            let hsommeil = 0;
            let mnsommeil = 0;
            let hreveil = 0;
            let mnreveil = 0;
            let hcoucher = 0;
            let mncoucher = 0;
            let hstart = 0;
            let mncoucherstart = 0;

            if(sommeilHelper.data.heure_coucher){
                hcoucher = parseInt(sommeilHelper.data.heure_coucher.substr(0,2))
                mncoucher = parseInt(sommeilHelper.data.heure_coucher.substr(3,2))
            }

            if(sommeilHelper.data.heure_reveil){
                hreveil = parseInt(sommeilHelper.data.heure_reveil.substr(0,2))
                mnreveil = parseInt(sommeilHelper.data.heure_reveil.substr(3,2))
            }
            let aloha = 0;
            let afara = 0;
            let percentage = 0;
            if(sommeilHelper.data.nb_heure_sommeil){
                if(sommeilHelper.data.nb_heure_sommeil % 1 !== 0){
                    aloha = sommeilHelper.data.nb_heure_sommeil.toString().split('.')[0];
                    afara = sommeilHelper.data.nb_heure_sommeil.toString().split('.')[1];
                    if(recupobjectif % 1 !== 0) {
                        percentage = parseFloat(aloha + '.' + afara.toString().padEnd(2,'0')) * 100/parseFloat(recupobjectif.toString().split('.')[0] + '.' + recupobjectif.toString().split('.')[1].toString().padEnd(2,'0'));
                    }else{
                        percentage = parseFloat(aloha + '.' + afara.toString().padEnd(2,'0')) * 100/parseInt(recupobjectif);
                    }
                    this.setState({hsommeil:aloha,mnsommeil:afara});
                }else{
                    this.setState({hsommeil:sommeilHelper.data.nb_heure_sommeil,mnsommeil:0});
                    if(recupobjectif % 1 !== 0) {
                        percentage = parseInt(sommeilHelper.data.nb_heure_sommeil ) * 100/parseFloat(recupobjectif.toString().split('.')[0] + '.' + recupobjectif.toString().split('.')[1].toString().padEnd(2,'0'));
                    }else{
                        percentage = parseInt(sommeilHelper.data.nb_heure_sommeil ) * 100/parseInt(recupobjectif);
                    }
                }

                // let percentage = parseFloat(aloha + "." + afara)*100/parseFloat(sommeilHelper.data.nb_heure_sommeil);
                if(percentage>100){
                    percentage = 100;
                }
                this.setState({percentage:percentage})
            }else{
                this.setState({percentage:0})
            }
            switch (sommeilHelper.data.notif) {
                case 0 :
                    this.setState({checked:false});
                    break;
                case 1 :
                    this.setState({checked:true});
                    break;
                default:
                    this.setState({checked:false});
            }

            let hcoucherforsend_ = hcoucher.toString();
            var  hcoucherforsend ='00';
            if(hcoucherforsend_.length === 1){
                hcoucherforsend = '0'+hcoucherforsend_
            }else{
                hcoucherforsend = hcoucherforsend_
            }

            let mncoucherforsend_ = mncoucher.toString();
            var  mncoucherforsend ='00';
            if(mncoucherforsend_.length === 1){
                mncoucherforsend = '0'+mncoucherforsend_
            }else{
                mncoucherforsend = mncoucherforsend_
            }

            let hreveilforsend_ = hreveil.toString();
            var  hreveilforsend ='00';
            if(hreveilforsend_.length === 1){
                hreveilforsend = '0'+hreveilforsend_
            }else{
                hreveilforsend = hreveilforsend_
            }

            let mnreveilforsend_ = mnreveil.toString();
            var  mnreveilforsend ='00';
            if(mnreveilforsend_.length === 1){
                mnreveilforsend = '0'+mnreveilforsend_
            }else{
                mnreveilforsend = mnreveilforsend_
            }

            if(sommeilHelper.data.heure_coucher !== null){
                this.setState({hcoucherforpost: hcoucherforsend + ":" + mncoucherforsend + ':00'})
            }else{
                this.setState({hcoucherforpost: "00:00:00"})
            }
            if(sommeilHelper.data.heure_reveil !== null){
                this.setState({hreveilforpost: hreveilforsend + ":" + mnreveilforsend + ':00'})
            }else{
                this.setState({hreveilforpost: "00:00:00"})
            }

            if(sommeilHelper.data.heure_coucher !== null && sommeilHelper.data.heure_reveil !== null ) {
                this.setState({heurereveilpoursoustracction: hreveilforsend})
                this.setState({minutereveilpoursoustracction: mnreveilforsend})
                this.setState({heurecoucherpoursoustracction: hcoucherforsend})
                this.setState({minutecoucherpoursoustracction: mncoucherforsend})
            }else{
                this.setState({heurereveilpoursoustracction: 0})
                this.setState({minutereveilpoursoustracction: 0})
                this.setState({heurecoucherpoursoustracction: 0})
                this.setState({minutecoucherpoursoustracction: 0})
            }
            let monobjectif_post_ = null;
            let heuresommeils = Math.trunc(sommeilHelper.data.nb_heure_sommeil);
            let mnsommeils =  sommeilHelper.data.nb_heure_sommeil % 1 !== 0 ? Number(String(sommeilHelper.data.nb_heure_sommeil).substr(String(sommeilHelper.data.nb_heure_sommeil).indexOf('.')+1)) : '00';
            monobjectif_post_ = heuresommeils.toString().padStart(2, '0')+'h'+mnsommeils.toString().padEnd(2, '0');
            this.setState({monobjectif_post_affichage:monobjectif_post_});

            if(sommeilHelper.data.temps_sieste_min){
                this.setState({minuteselectionneaffichage:sommeilHelper.data.temps_sieste_min + ' mn'})
                this.setState({minuteselectionneenvoie:sommeilHelper.data.temps_sieste_min})
            }else{
                this.setState({minuteselectionneaffichage:"0 mn"})
                this.setState({minuteselectionneenvoie:0})
            }
        }else{
            this.setState({refreshing:false})
        }
    };

    getFacteurNuisible =  async () => {
        this.setState({refreshing: true});
        const facteurNuisible = await msi.getFacteurNuisible(this.props.userToken);
        if (facteurNuisible) {
            this.setState({refreshing: false,facteurNuisible:facteurNuisible});
        }
    };



    showDateTimePicker = () => {
        this.setState({ isDateTimePickerVisible: true });
    };

    hideDateTimePicker = () => {
        this.setState({ isDateTimePickerVisible: false });
    };

    handleDatePicked = date => {
        let hour_ = date.getHours().toString().padStart(2, "0");
        let minute_ = date.getMinutes().toString().padStart(2, "0");
        if(this.state.coucher === true){
            this.setState({hcoucherforpost:hour_+':'+minute_+':00'})
            this.setState({heurecoucherpoursoustracction:hour_},()=>{
            })
            this.setState({minutecoucherpoursoustracction:minute_},()=>{
            })
             hcoucher = parseInt(hour_);
             mncoucher = parseInt(minute_);
            let hreveil = parseInt(this.state.heurereveilpoursoustracction);
            let mnreveil =parseInt(this.state.minutereveilpoursoustracction);
        let hstart = 0;
        let mncoucherstart = 0;
        let hsommeil = 0;
        let mnsommeil = 0;
        if(hcoucher>=0 && hcoucher<=4 && hreveil>= 0 && hreveil<=12  ){
            hstart = hcoucher;
            mncoucherstart = mncoucher;

            if(mncoucher > 0 && hcoucher <= hreveil){
                mncoucherstart =  mncoucher - 60;
                if(mncoucherstart<0){
                    hstart = hcoucher + 1;
                }
            }
            // hsommeil =  Math.abs(hstart - hreveil);
            hsommeil =  hreveil - hstart;
            if(hcoucher > this.state.heurereveilpoursoustracction){
                mnsommeil = mncoucherstart - mnreveil
            }else{
                mnsommeil = Math.abs(mncoucherstart - mnreveil)
            }

        // }else if(hcoucher>=5 && hcoucher<=18 && hreveil>= 0 && hreveil<=24  ) {
        }else if(hcoucher>=0 && hcoucher<=18 && hreveil>= 0 && hreveil<=24  ) {
            hstart = hcoucher;
            mncoucherstart = mncoucher;

            if(mncoucher > 0 && hcoucher <= hreveil){
                mncoucherstart =  mncoucher - 60;
                if(mncoucherstart<0){
                    hstart = hcoucher + 1;
                }
            }
            hsommeil =  hreveil - hstart;
            if(hcoucher > this.state.heurereveilpoursoustracction){
                mnsommeil = mncoucherstart - mnreveil
            }else{
                mnsommeil = Math.abs(mncoucherstart - mnreveil)
            }

        }else if(hcoucher>=19 && hcoucher<=24 && hreveil>= 19 && hreveil<=24  ) {
            if(mncoucher > 0){
                hstart =hcoucher + 1 ;
                mncoucherstart =  mncoucher;
                hsommeil = hreveil - hstart;
                mnsommeil = mnreveil - mncoucherstart
            } else {
                hstart = hcoucher;
                mncoucherstart = 0;
                hsommeil = hreveil - hstart;
                mnsommeil = mnreveil - mncoucherstart
            }
        }else{
            if(mncoucher > 0){
                hstart = (24 - 1) - hcoucher ;
                mncoucherstart = 60 - mncoucher;
            } else {
                hstart = 24 - hcoucher;
                mncoucherstart = 0;
            }
            hsommeil = hreveil + hstart;
            mnsommeil = mnreveil + mncoucherstart
        }


        if(mnsommeil >= 60){
            hsommeil = hsommeil + 1;
            mnsommeil = mnsommeil - 60
        }

        let hour__reveil = hsommeil.toString().padStart(2, "0");
        let minute__reveil = mnsommeil.toString().padStart(2, "0");
        // let percentage = parseFloat(hsommeil + '.' + mnsommeil) * 100/parseFloat(this.state.hobjectif);
        let percentage = 0;
        if(this.state.hobjectif % 1 !== 0 ){
            percentage = parseFloat(hsommeil + '.' + minute__reveil) * 100/parseFloat(this.state.hobjectif.toString().split('.')[0] + '.' + this.state.hobjectif.toString().split('.')[1].toString().padEnd(2,'0'));
        }else{
            percentage = parseFloat(hsommeil + '.' + minute__reveil) * 100/parseInt(this.state.hobjectif);
        }
        if(percentage>100){
            percentage = 100;
        }
        this.setState({percentage:percentage});
        this.setState({hsommeil:hour__reveil});
        this.setState({mnsommeil:minute__reveil});
        // this.setState({hobjectif:parseFloat(hour__reveil + "." + minute__reveil)});
        this.setState({coucher:false})
        this.hideDateTimePicker();
        }else if(this.state.reveil === true){ /////////////////////////////: ok result
            this.setState({hreveilforpost:hour_+':'+minute_+':00'})
            let hreveil = parseInt(hour_);
            let mnreveil = parseInt(minute_);
             let hcoucher = parseInt(this.state.heurecoucherpoursoustracction);
            let mncoucher = parseInt(this.state.minutecoucherpoursoustracction);
            this.setState({heurereveilpoursoustracction:hour_})
            this.setState({minutereveilpoursoustracction:minute_})

        let hstart = 0;
        let mncoucherstart = 0;

        let hsommeil = 0;
        let mnsommeil = 0;
        if(hcoucher>=0 && hcoucher<=4 && hreveil>= 0 && hreveil<=12  ){
            hstart = hcoucher;
            mncoucherstart = mncoucher;


            if(mncoucher > 0 && hcoucher <= hreveil){
                mncoucherstart =  mncoucher - 60;
                if(mncoucherstart<0){
                    hstart = hcoucher + 1;
                }
            }
            // hsommeil =  Math.abs(hstart - hreveil);
            hsommeil =  hreveil - hstart;
            if(this.state.heurecoucherpoursoustracction > hreveil){
                mnsommeil = mncoucherstart - mnreveil
            }else{
                mnsommeil = Math.abs(mncoucherstart - mnreveil)
            }

        }else if(hcoucher>=0 && hcoucher<=18 && hreveil>= 0 && hreveil<=24  ) {
            hstart = hcoucher;
            mncoucherstart = mncoucher;

            if(mncoucher > 0 && hcoucher <= hreveil){
                mncoucherstart =  mncoucher - 60;
                if(mncoucherstart<0){
                    hstart = hcoucher + 1;
                }
            }
            hsommeil =  hreveil - hstart;
            if(this.state.heurecoucherpoursoustracction > hreveil){
                mnsommeil = mncoucherstart - mnreveil
            }else{
                mnsommeil = Math.abs(mncoucherstart - mnreveil)
            }

        }else if(hcoucher>=19 && hcoucher<=24 && hreveil>= 19 && hreveil<=24  ) {
            if(mncoucher > 0){
                hstart =hcoucher + 1 ;
                mncoucherstart =  mncoucher;
                hsommeil = hreveil - hstart;
                mnsommeil = mnreveil - mncoucherstart
            } else {
                hstart = hcoucher;
                mncoucherstart = 0;
                hsommeil = hreveil - hstart;
                mnsommeil = mnreveil - mncoucherstart
            }
        }else{
            if(mncoucher > 0){
                hstart = (24 - 1) - hcoucher ;
                mncoucherstart = 60 - mncoucher;
            } else {
                hstart = 24 - hcoucher;
                mncoucherstart = 0;
            }
            hsommeil = hreveil + hstart;
            mnsommeil = mnreveil + mncoucherstart
        }


        if(mnsommeil >= 60){
            hsommeil = hsommeil + 1;
            mnsommeil = mnsommeil - 60
        }
        let hour__reveil = hsommeil.toString().padStart(2, "0");
        let minute__reveil = mnsommeil.toString().padStart(2, "0");
        // let percentage = parseFloat(hsommeil + '.' + mnsommeil) * 100/parseFloat(this.state.hobjectif);
        let percentage = 0;
        if(this.state.hobjectif % 1 !== 0 ){
            percentage = parseFloat(hsommeil + '.' + minute__reveil) * 100/parseFloat(this.state.hobjectif.toString().split('.')[0] + '.' + this.state.hobjectif.toString().split('.')[1].toString().padEnd(2,'0'));
        }else{
            percentage = parseFloat(hsommeil + '.' + minute__reveil) * 100/parseInt(this.state.hobjectif);
        }
        if(percentage>100){
            percentage = 100;
        }
        this.setState({percentage:percentage});
        this.setState({hsommeil:hour__reveil});
        this.setState({mnsommeil:minute__reveil});
        this.setState({reveil:false})
        this.hideDateTimePicker();
        }else if(this.state.monobjectif === true){
            // let hobjectif_ = hour_+'.'+minute_;
            //
            // let monobjectif_post_ = null;
            //
            // let heuresommeils = Math.trunc(hobjectif_);
            // let mnsommeils = hobjectif_ % 1 !== 0 ? Number(String(hobjectif_).substr(String(hobjectif_).indexOf('.')+1)) : '00';
            // monobjectif_post_ = heuresommeils+'h'+mnsommeils;
            // this.setState({monobjectif_post_affichage:monobjectif_post_})
            // if(hobjectif_ ==0 || hobjectif_ === undefined || hobjectif_ === null){
            //     this.setState({hobjectif:24});
            // }else{
            //     console.warn('mba ato v tsika zan e')
            //     this.setState({hobjectif:parseFloat(hobjectif_)});
            // }
            this.setState({monobjectif:false})
        }
    };


    render() {
        if(this.props.popToTop === 'perfo'){
            this.props.navigation.popToTop();
            const setPopToTop = { type: SET_POP_TO_TOP, value: '' };
            this.props.dispatch(setPopToTop);
        }
        if(this.circularProgress1) {
                    this.circularProgress1.animate(0, 1000, Easing.quad);
        }
        let percen = parseInt(this.state.percentage);
        if(percen <= 0){
            percen = 0;
        }
        if(this.circularProgress1) {
           //     if (this.circularProgress1 !== undefined) {
                    try {
                        this.circularProgress1.animate(percen, 4000, Easing.quad);
                    }catch (e) { }
            //    }
        }

        var decimal = null;
        if(this.state.nbhsommeil !== null ){
            if(this.state.nbhsommeil % 1 !==0 ){
                let  aloha = Number(String(this.state.nbhsommeil).substr(String(this.state.nbhsommeil).indexOf('.')+1));
                let afara = Number(String(this.state.nbhsommeil).substr(String(this.state.nbhsommeil).indexOf('.')+2))
                if(afara === 0){
                    decimal = aloha +''+afara
                }else {
                    decimal = aloha
                }
            }else{
                decimal = null;
            }
        }

        return (
            <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }} colors={[colors.balck, colors.green, colors.balck]} style={{
                flex: 1,
               /* alignItems: "center",minHeight: (screenHeight - 130),
                height: (screenHeight - 130),
                maxHeight: (screenHeight - 130)
                */
                }}>
                <ScrollView
                    style={styles.scrollView}
                    contentContainerStyle={[styles.contentContainerStyle,{marginLeft:-screenWidth*0.01}]}
                    keyboardShouldPersistTaps={'always'}
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.refreshing}
                            onRefresh={() => {
                                this.setState({ refreshing: true })
                                this.getUserSommeils()
                                this.getFacteurNuisible()
                                setTimeout(() => {
                                    this.setState({ refreshing: false })
                                }, 1000)
                            }}
                            tintColor={Platform.OS==='ios'?colors.white:colors.green}
                            colors={[Platform.OS==='ios'?colors.white:colors.green]}
                        />
                    }
                >
                    <View style={{ alignItems :"center",justifyContent:"center",width:"100%",marginBottom:20  }}>
                        <TouchableOpacity
                            onPress={()=>{
                                getDashboar(dashboardHelper,this.props).then(()=>{})
                                const setActiveTab = { type: SET_ACTIVE_TAB, value: "home" }
                                this.props.dispatch(setActiveTab);
                            }}
                            style={{width:50,position:"absolute",left:0}}
                        >
                            <AutoHeightImage
                                width={18}
                                source={require('../../../../assets/icons/left.arrow.white.png')}
                                style={{marginLeft:15}}
                            />
                        </TouchableOpacity>
                        <Text style={[baseStyles.titleText,{textAlign:"center"}]}>
                            {"Sommeil"}
                        </Text>
                    </View>

                    <View
                        style={{ width: screenWidth, height: 40,alignItems:'center' }}
                    >
                        <Text style={[baseStyles.textColorWhite, { fontSize: 20 }]}>
                            AUJOURD'HUI
                        </Text>
                    </View>
                    <View style={{ marginHorizontal: 10 }}></View>


                    <View style={[styles.noSelectedBtn, { flexDirection: 'row', justifyContent: "center",alignItems:'center' }]}>
                        <View style={[styles.headCtn]}>
                            <Text style={[baseStyles.titleText]}>
                                {"Mon objectif"}
                            </Text>
                        </View>


                        {popover()}

                    </View>
                    <View style={{ margin: 10 }}></View>
                    <TouchableOpacity
                        onPress={()=>{
                            this.setState({monobjectif:true})
                            this.setState({coucher:false})
                            this.setState({reveil:false})
                            this.setState({isWritingSommeil:true})
                        }}
                        style={{ borderRadius: 5, borderWidth: 1, borderColor: "#fff", justifyContent: "space-between", flexDirection: "row", width: screenWidth * 0.8, padding: 10 }}>
                        <Text style={[styles.qtText, { fontSize: 12 }]}>
                            {/*{this.state.monobjectif_post_affichage}*/}
                            {/*{this.state.nbhsommeil !== null ? <Text style={[baseStyles.textColorWhite]}> {Math.trunc(this.state.nbhsommeil) +'h'}{decimal === null ? "": decimal}</Text>:this.state.monobjectif_post_affichage}*/}
                            {this.state.hobjectif % 1 !== 0 ? this.state.hobjectif.toString().split('.')[0] + 'h' +  this.state.hobjectif.toString().split('.')[1].toString().padEnd(2,'0') : this.state.hobjectif +'h'}
                        </Text>
                        <AutoHeightImage
                            width={15}
                            source={require("../../../../assets/icons/arrow-white.png")}
                            style={{ alignSelf: "center" }}
                        />
                    </TouchableOpacity>

                    <View style={{ margin: 10 }}></View>
                    <View style={{ justifyContent: "space-around", flexDirection: "row", width: screenWidth * 0.8 }}>
                        <TouchableOpacity
                            onPress={()=>{
                                this.setState({coucher:true})
                                this.setState({reveil:false})
                                this.setState({monobjectif:false})

                                this.showDateTimePicker()
                            }}
                            style={{ flexDirection: "column",alignItems:'center' }}>
                            <View style={{ flexDirection: "row" }}>
                                <AutoHeightImage
                                    width={18}
                                    source={require("../../../../assets/icons/lune.png")}
                                />
                                <Text style={[styles.qtText, { fontSize: 14, marginLeft: 5 }]}>Coucher</Text>
                            </View>
                            <Text style={[styles.qtText, { fontSize: 24, fontWeight: "bold" }]}>
                                {this.state.hcoucherforpost !== null &&  this.state.hcoucherforpost.substr(0,5)}
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={()=>{
                                this.setState({reveil:true})
                                this.setState({coucher:false})
                                this.setState({monobjectif:false})

                                this.showDateTimePicker()


                            }}
                            style={{ flexDirection: "column",alignItems:'center' }}>
                            <View style={{ flexDirection: "row" }}>
                                <AutoHeightImage
                                    width={15}
                                    source={require("../../../../assets/icons/sonnerie.png")}
                                />
                                <Text style={[styles.qtText, { fontSize: 14, marginLeft: 5 }]}>Réveil</Text>
                            </View>
                            <Text style={[styles.qtText, { fontSize: 24, fontWeight: "bold" }]}>
                                {/*{this.state.sommeilHelper !== null &&  moment(this.state.sommeilHelper.data.heure_reveil).format('H:mm') }*/}
                                {this.state.hreveilforpost !== null &&  this.state.hreveilforpost.substr(0,5)}
                            </Text>

                        </TouchableOpacity>
                    </View>

                    <View style={[styles.outerProgress]}>
                        <AnimatedCircularProgress
                            ref={(ref) => this.circularProgress11 = ref}
                            size={screenWidth * 0.45}
                            width={10}
                            rotation={-360}
                            tintColor={colors.green}
                            lineCap={"round"}
                            style={{
                                overflow: "hidden",
                                position:'absolute',
                            }}
                            backgroundColor="transparent"
                        ></AnimatedCircularProgress>
                        <AnimatedCircularProgress
                            ref={(ref) => this.circularProgress1 = ref}
                            size={screenWidth * 0.45}
                            width={10}
                            rotation={-360}
                            tintColor={colors.red}
                            lineCap={"round"}
                            style={{
                                overflow: "hidden",
                            }}
                            backgroundColor="transparent"
                        >
                            {
                                (fill) => (
                                    <ImageBackground
                                        style={{ width: screenWidth * 0.43, height: screenWidth * 0.43, alignItems: "center" }}
                                        source={require("../../../../assets/images/bb.png")}
                                    >
                                        <View
                                            style={{ alignItems: "center", justifyContent: "center", flex: 1 }}>
                                            <View style={[styles.valueCtn]}>
                                                <Text style={[styles.textBold, { fontSize: 26 }]}>{this.state.hsommeil.toString().padStart(2, '0')}h{this.state.mnsommeil.toString().padEnd(2, '0')}</Text>
                                                {/*<Text style={[styles.textBold, { fontSize: 26 }]}>{this.state.monobjectif_post_affichage}</Text>*/}
                                            </View>
                                        </View>
                                    </ImageBackground>
                                )
                            }
                        </AnimatedCircularProgress>

                    {/*<View style={{position:'absolute',alignSelf:'center',top:screenHeight*0.459}}>*/}
                    {/*    <ImageBackground*/}
                    {/*        style={{ width: screenWidth * 0.43, height: screenWidth * 0.43, alignItems: "center" }}*/}
                    {/*        source={require("../../../../assets/images/bb.png")}*/}
                    {/*    >*/}
                    {/*        <View*/}
                    {/*            style={{ alignItems: "center", justifyContent: "center", flex: 1 }}>*/}
                    {/*            <View style={[styles.valueCtn]}>*/}
                    {/*                <Text style={[styles.textBold, { fontSize: 26 }]}>{this.state.hsommeil.toString().padStart(2, '0')}h{this.state.mnsommeil.toString().padEnd(2, '0')}</Text>*/}
                    {/*                /!*<Text style={[styles.textBold, { fontSize: 26 }]}>{this.state.monobjectif_post_affichage}</Text>*!/*/}
                    {/*            </View>*/}
                    {/*        </View>*/}
                    {/*    </ImageBackground>*/}
                    {/*</View>*/}
                    {/*    <Progress.Circle size={screenWidth *0.46}*/}
                    {/*                     progress={this.state.percentage * 0.01} unfilledColor={colors.green}*/}
                    {/*                     borderWidth={0}*/}
                    {/*                     thickness={11}*/}
                    {/*                     strokeCap={'round'}*/}
                    {/*                     color={colors.red}*/}
                    {/*                     animated={true}*/}
                    {/*                     duration={4000}*/}

                    {/*    />*/}
                    </View>
                    <View style={{ margin: 5 }}></View>
                    <View style={[styles.noSelectedBtn, { flexDirection: 'row', justifyContent: "center", alignItems:"center" }]}>
                        <View style={{flexDirection:'row',alignItems:"center",marginBottom:15}}>
                            <Text style={[baseStyles.titleText,{marginRight:15}]}>
                                {"Temps de sieste"}
                            </Text>
                            {popover1()}
                            {/*<Text style={[styles.qtText,{fontSize:16}]}>*/}
                            {/*    {"recommandé entre 15' et 30' "}*/}
                            {/*</Text>*/}
                        </View>
                    </View>
                    <View style={{ margin: 5 }}></View>
                    <TouchableOpacity
                        onPress={()=>{
                            this.setState({showMinute:true})
                        }}
                        style={{ borderRadius: 5, borderWidth: 1, borderColor: "#fff", justifyContent: "space-between", flexDirection: "row", width: screenWidth * 0.8, padding: 10 }}>
                        <Text style={[styles.qtText, { fontSize: 12 }]}>
                            {/*{this.state.sommeilHelper !== null &&  this.state.sommeilHelper.data.temps_sieste_min}*/}
                            {this.state.minuteselectionneaffichage}</Text>
                        <AutoHeightImage
                            width={15}
                            source={require("../../../../assets/icons/arrow-white.png")}
                            style={{ alignSelf: "center" }}
                        />
                    </TouchableOpacity>
                    <View style={{ margin: 5 }}></View>
                    <View style={[styles.noSelectedBtn, { flexDirection: 'row', justifyContent: "center" }]}>
                        <View style={[styles.headCtn]}>
                            <Text style={[baseStyles.titleText]}>
                                {"Qualité du sommeil"}
                            </Text>
                        </View>
                    </View>
                    {/* <View style={{ margin: 5 }}></View> */}
                    {/*<View style={[styles.noSelectedBtn, { flexDirection: 'row', justifyContent: "center" }]}>*/}
                    {/*    <TouchableOpacity*/}
                    {/*        onPress={()=>{*/}
                    {/*            this.setState({checked:!this.state.checked})*/}
                    {/*        }}*/}
                    {/*        style={{ alignSelf: "center", marginRight:10 }}>*/}
                    {/*        {this.state.checked ? <View  style={{top:-16,marginBottom:-15}}><AutoHeightImage*/}
                    {/*                width={15}*/}
                    {/*                source={require("../../../../assets/icons/check.mark.white.png")}*/}
                    {/*                style={{ alignSelf: "center",bottom:-17 }}*/}
                    {/*            />*/}
                    {/*                <AutoHeightImage*/}
                    {/*                    width={20}*/}
                    {/*                    source={require("../../../../assets/icons/check-no.png")}*/}
                    {/*                    style={{ alignSelf: "center" }}*/}
                    {/*                />*/}
                    {/*            </View>*/}
                    {/*            :<AutoHeightImage*/}
                    {/*                width={20}*/}
                    {/*                source={require("../../../../assets/icons/check-no.png")}*/}
                    {/*                style={{ alignSelf: "center" }}*/}
                    {/*            />*/}

                    {/*        }*/}

                    {/*    </TouchableOpacity>*/}
                    {/*    <View style={[]}>*/}
                    {/*        <Text style={[styles.qtText]}>*/}
                    {/*            {"Me rappeler de remplir le formulaire"}*/}
                    {/*        </Text>*/}
                    {/*    </View>*/}
                    {/*</View>*/}
                    <View style={{ margin: 5 }}></View>

                    <View style={{ flexDirection: "row", width: screenWidth * 0.9, marginLeft: 5 }}>
                        <Text style={[styles.qtText, { fontSize: 14 }]}>Facteurs nuisibles</Text>
                        <View style={{ width: screenWidth * 0.5, }}></View>
                    </View>
                    <View style={{ margin: 5 }}></View>
                    <View style={{ flexDirection: "row",flexWrap:'wrap', justifyContent: "space-around", marginLeft: 5, width: screenWidth * 0.95 }}>

                        {
                            this.state.facteurNuisible !== null &&
                            this.state.facteurNuisible.data.map((item,key) =>{
                                if(this.state.venudesommeilnuisible.length === 0){
                                    this.state.borderC.push("#ffff");
                                    this.state.backgroundC.push("transparent");
                                    this.state.idsfacteurnuisible.push({id:item.id,bool:false,borderC:"#ffff",backgroundC:"transparent"});
                                    return(<TouchableOpacity key={key.toString()}
                                                             onPress={(event)=>{

                                                                 let idsfacteurnuisible = this.state.idsfacteurnuisible;
                                                                 if(idsfacteurnuisible[key].bool ===false){
                                                                     idsfacteurnuisible[key].bool = true;
                                                                     idsfacteurnuisible[key].borderC = colors.red;
                                                                     idsfacteurnuisible[key].backgroundC = colors.red;
                                                                     idsfacteurnuisible[key].id = item.id;
                                                                 }else{
                                                                     idsfacteurnuisible[key].bool = false;
                                                                     idsfacteurnuisible[key].borderC = "#FFFF";
                                                                     idsfacteurnuisible[key].backgroundC = "transparent";
                                                                     idsfacteurnuisible[key].id = item.id;
                                                                 }

                                                                 this.setState({idsfacteurnuisible: idsfacteurnuisible})
                                                                 // this.state.borderC[key] = colors.red;
                                                                 // this.state.backgroundC[key] = colors.red;
                                                                 // this.state.borderC[this.state.lastKeyPressed] = '#fff';
                                                                 // this.state.backgroundC[this.state.lastKeyPressed] = 'transparent';
                                                                 this.setState({lastKeyPressed: key})
                                                                 // this.setState({sommeil_facteur_nuisible_id: item.id})

                                                             }}
                                                             style={{ marginBottom:10,paddingBottom:3, width: screenWidth * 0.27, backgroundColor:this.state.idsfacteurnuisible[key].backgroundC, borderColor: this.state.idsfacteurnuisible[key].borderC, borderWidth: 1, borderRadius: screenWidth * 0.15 }}>
                                        <Text style={[styles.qtText, { textAlign: "center" }]}>{item.name}</Text>
                                    </TouchableOpacity>)
                                }else{
                                    let boole = false;
                                    for(let i = 0; i<this.state.venudesommeilnuisible.length; i++){
                                       if( item.id === this.state.venudesommeilnuisible[i]  && !boole){
                                           boole = true;
                                           this.state.borderC.push(colors.red);
                                           this.state.backgroundC.push(colors.red);
                                           this.state.idsfacteurnuisible.push({id:item.id,bool:true,borderC:colors.red,backgroundC:colors.red});
                                       }
                                    }
                                    if(boole === false){
                                        this.state.borderC.push("#ffff");
                                        this.state.backgroundC.push("transparent");
                                        this.state.idsfacteurnuisible.push({id:item.id,bool:false,borderC:"#ffff",backgroundC:"transparent"});
                                    }
                                    return(<TouchableOpacity key={key.toString()}
                                                             onPress={(event)=>{
                                                                 // let idsfacteurnuisible = [...new Set(this.state.idsfacteurnuisible)];
                                                                 let idsfacteurnuisible_ = this.state.idsfacteurnuisible;
                                                                 let flags = [], idsfacteurnuisible = [], l = idsfacteurnuisible_.length, i;
                                                                 for( i=0; i<l; i++) {
                                                                     if( flags[idsfacteurnuisible_[i].id]) continue;
                                                                     flags[idsfacteurnuisible_[i].id] = true;
                                                                     // idsfacteurnuisible.push(idsfacteurnuisible_[i].age);
                                                                     idsfacteurnuisible.push(idsfacteurnuisible_[i]);
                                                                 }
                                                                 console.warn('filtered',idsfacteurnuisible);
                                                                 if(idsfacteurnuisible[key].bool ===false){
                                                                     idsfacteurnuisible[key].bool = true;
                                                                     idsfacteurnuisible[key].borderC = colors.red;
                                                                     idsfacteurnuisible[key].backgroundC = colors.red;
                                                                 }else{
                                                                     idsfacteurnuisible[key].bool = false;
                                                                     idsfacteurnuisible[key].borderC = "#FFFF";
                                                                     idsfacteurnuisible[key].backgroundC = "transparent";
                                                                 }

                                                                 this.setState({idsfacteurnuisible: idsfacteurnuisible});
                                                                console.warn('state idsfacteurnuisible',this.state.idsfacteurnuisible)
                                                                 this.setState({lastKeyPressed: key})
                                                             }}
                                                             style={{ marginBottom:10,paddingBottom:3, width: screenWidth * 0.27, backgroundColor:this.state.idsfacteurnuisible[key].backgroundC, borderColor: this.state.idsfacteurnuisible[key].borderC, borderWidth: 1, borderRadius: screenWidth * 0.15 }}>
                                        <Text style={[styles.qtText, { textAlign: "center" }]}>{item.name}</Text>
                                    </TouchableOpacity>)
                                }
                               }
                            )
                        }
                    </View>
                    <View style={{ margin: 10 }}></View>




                    <View style={{ flexDirection: "row", width: screenWidth * 0.9, marginLeft: 5 }}>
                        <Text style={[styles.qtText, { fontSize: 14 }]}>Qualité du réveil</Text>
                        <View style={{ width: screenWidth * 0.5, }}></View>
                    </View>
                    <View style={{ margin: 5 }}></View>
                    <View style={[styles.sliderCtn]}>
                        <View style={styles.sliderView}>
                            <View style={[styles.markerCtn]}>
                                <View style={[styles.sliderOptionMark, (this.state.sliderValueQualitedureveil[0] >= 0 ? styles.sliderOptionMarkValued : {})]}></View>
                                <View style={[styles.sliderOptionMark, (this.state.sliderValueQualitedureveil[0] >= 1 ? styles.sliderOptionMarkValued : {})]}></View>
                                <View style={[styles.sliderOptionMark, (this.state.sliderValueQualitedureveil[0] >= 2 ? styles.sliderOptionMarkValued : {})]}></View>
                                <View style={[styles.sliderOptionMark, (this.state.sliderValueQualitedureveil[0] >= 3 ? styles.sliderOptionMarkValued : {})]}></View>
                                <View style={[styles.sliderOptionMark, (this.state.sliderValueQualitedureveil[0] >= 4 ? styles.sliderOptionMarkValued : {})]}></View>
                                <View style={[styles.sliderOptionMark, (this.state.sliderValueQualitedureveil[0] >= 5 ? styles.sliderOptionMarkValued : {})]}></View>
                            </View>
                            <Slider
                                style={{ width: "100%", height: 40 }}
                                minimumValue={0}
                                maximumValue={5}
                                minimumTrackTintColor={colors.red}
                                maximumTrackTintColor={"#A5A5A5"}
                                thumbTintColor={colors.red}
                                value={this.state.sliderValueQualitedureveil[0]}
                                onValueChange={
                                    this._changeslider
                                }
                            />
                            {/*<Text*/}
                            {/*    style={{*/}
                            {/*        color: colors.white,*/}
                            {/*        left: ((0 * (screenWidth - 50)) / 5),*/}
                            {/*        position: "absolute", bottom: 0*/}
                            {/*    }}>*/}
                            {/*    0*/}
                            {/*</Text>*/}
                            {/*<Text*/}
                            {/*    style={{*/}
                            {/*        color: colors.white,*/}
                            {/*        left: ((1 * (screenWidth - 50)) / 5),*/}
                            {/*        position: "absolute", bottom: 0*/}
                            {/*    }}>*/}
                            {/*    2*/}
                            {/*</Text>*/}
                            {/*<Text*/}
                            {/*    style={{*/}
                            {/*        color: colors.white,*/}
                            {/*        left: ((2 * (screenWidth - 50)) / 5),*/}
                            {/*        position: "absolute", bottom: 0*/}
                            {/*    }}>*/}
                            {/*    4*/}
                            {/*</Text>*/}
                            {/*<Text*/}
                            {/*    style={{*/}
                            {/*        color: colors.white,*/}
                            {/*        left: ((3 * (screenWidth - 50)) / 5),*/}
                            {/*        position: "absolute", bottom: 0*/}
                            {/*    }}>*/}
                            {/*    6*/}
                            {/*</Text>*/}
                            {/*<Text*/}
                            {/*    style={{*/}
                            {/*        color: colors.white,*/}
                            {/*        left: ((4 * (screenWidth - 50)) / 5),*/}
                            {/*        position: "absolute", bottom: 0*/}
                            {/*    }}>*/}
                            {/*    8*/}
                            {/*</Text>*/}
                            {/*<Text*/}
                            {/*    style={{*/}
                            {/*        color: colors.white,*/}
                            {/*        left: ((5 * (screenWidth - 50)) / 5),*/}
                            {/*        position: "absolute", bottom: 0*/}
                            {/*    }}>*/}
                            {/*    10*/}
                            {/*</Text>*/}

                            <Text
                                style={{
                                    color: colors.white,
                                    left: ((0 * (screenWidth - 50)) / 5),
                                    position: "absolute", bottom: 0
                                }}>
                                0
                            </Text>
                            <Text
                                style={{
                                    color: colors.white,
                                    left: ((1.04 * (screenWidth - 50)) / 5),
                                    position: "absolute", bottom: 0
                                }}>
                                2
                            </Text>
                            <Text
                                style={{
                                    color: colors.white,
                                    left: ((2.06 * (screenWidth - 50)) / 5),
                                    position: "absolute", bottom: 0
                                }}>
                                4
                            </Text>
                            <Text
                                style={{
                                    color: colors.white,
                                    left: ((3.12 * (screenWidth - 50)) / 5),
                                    position: "absolute", bottom: 0
                                }}>
                                6
                            </Text>
                            <Text
                                style={{
                                    color: colors.white,
                                    left: ((4.16 * (screenWidth - 50)) / 5),
                                    position: "absolute", bottom: 0
                                }}>
                                8
                            </Text>
                            <Text
                                style={{
                                    color: colors.white,
                                    left: ((5.18 * (screenWidth - 50)) / 5),
                                    position: "absolute", bottom: 0
                                }}>
                                10
                            </Text>

                        </View>
                    </View>



                    {/*<View style={{ flexDirection: "row", width: screenWidth * 0.9, marginLeft: 5 }}>*/}
                    {/*    <Text style={[styles.qtText, { fontSize: 14 }]}>Qualité du réveil</Text>*/}
                    {/*    <View style={{ width: screenWidth * 0.5, }}></View>*/}
                    {/*</View>*/}
                    {/*<View style={{ margin: 5 }}></View>*/}
                    {/*<View style={[styles.sliderCtn]}>*/}
                    {/*    <View style={styles.sliderView}>*/}
                    {/*        <View style={[styles.markerCtn]}>*/}
                    {/*            <View style={[styles.sliderOptionMark, (this.state.sliderValueIntensite >= 0 ? styles.sliderOptionMarkValued : {})]}></View>*/}
                    {/*            <View style={[styles.sliderOptionMark, (this.state.sliderValueIntensite >= 1 ? styles.sliderOptionMarkValued : {})]}></View>*/}
                    {/*            <View style={[styles.sliderOptionMark, (this.state.sliderValueIntensite >= 2 ? styles.sliderOptionMarkValued : {})]}></View>*/}
                    {/*            <View style={[styles.sliderOptionMark, (this.state.sliderValueIntensite >= 3 ? styles.sliderOptionMarkValued : {})]}></View>*/}
                    {/*            <View style={[styles.sliderOptionMark, (this.state.sliderValueIntensite >= 4 ? styles.sliderOptionMarkValued : {})]}></View>*/}
                    {/*            <View style={[styles.sliderOptionMark, (this.state.sliderValueIntensite >= 5 ? styles.sliderOptionMarkValued : {})]}></View>*/}
                    {/*        </View>*/}
                    {/*        <Sliderr*/}
                    {/*            style={{ width: "100%", height: 40 }}*/}
                    {/*            minimumValue={0}*/}
                    {/*            maximumValue={5}*/}
                    {/*            minimumTrackTintColor={colors.red}*/}
                    {/*            maximumTrackTintColor={"#A5A5A5"}*/}
                    {/*            thumbTintColor={colors.red}*/}
                    {/*            value={*/}
                    {/*                this.state.sliderValueIntensite*/}
                    {/*            }*/}
                    {/*            onValueChange={(value) => {*/}
                    {/*                this.setState({ sliderValueIntensite: value })*/}
                    {/*            }}*/}
                    {/*        />*/}
                    {/*        <Text*/}
                    {/*            style={{*/}
                    {/*                color: colors.white,*/}
                    {/*                left: ((0 * (screenWidth - 50)) / 5),*/}
                    {/*                position: "absolute", bottom: 0*/}
                    {/*            }}>*/}
                    {/*            0*/}
                    {/*        </Text>*/}
                    {/*        <Text*/}
                    {/*            style={{*/}
                    {/*                color: colors.white,*/}
                    {/*                left: ((1 * (screenWidth - 50)) / 5),*/}
                    {/*                position: "absolute", bottom: 0*/}
                    {/*            }}>*/}
                    {/*            2*/}
                    {/*        </Text>*/}
                    {/*        <Text*/}
                    {/*            style={{*/}
                    {/*                color: colors.white,*/}
                    {/*                left: ((2 * (screenWidth - 50)) / 5),*/}
                    {/*                position: "absolute", bottom: 0*/}
                    {/*            }}>*/}
                    {/*            4*/}
                    {/*        </Text>*/}
                    {/*        <Text*/}
                    {/*            style={{*/}
                    {/*                color: colors.white,*/}
                    {/*                left: ((3 * (screenWidth - 50)) / 5),*/}
                    {/*                position: "absolute", bottom: 0*/}
                    {/*            }}>*/}
                    {/*            6*/}
                    {/*        </Text>*/}
                    {/*        <Text*/}
                    {/*            style={{*/}
                    {/*                color: colors.white,*/}
                    {/*                left: ((4 * (screenWidth - 50)) / 5),*/}
                    {/*                position: "absolute", bottom: 0*/}
                    {/*            }}>*/}
                    {/*            8*/}
                    {/*        </Text>*/}
                    {/*        <Text*/}
                    {/*            style={{*/}
                    {/*                color: colors.white,*/}
                    {/*                left: ((5 * (screenWidth - 50)) / 5),*/}
                    {/*                position: "absolute", bottom: 0*/}
                    {/*            }}>*/}
                    {/*            10*/}
                    {/*        </Text>*/}
                    {/*    </View>*/}
                    {/*</View>*/}



                    {/*<View style={[styles.sliderCtn, {top:-20  }]}>*/}
                    {/*    <View style={[styles.sliderTensionLabel,{bottom: -25}]}>*/}
                    {/*        <Text style={[baseStyles.textColorWhite]}>Qualité du réveil</Text>*/}
                    {/*    </View>*/}
                    {/*    <CustomSlider*/}
                    {/*        min={0}*/}
                    {/*        max={5}*/}
                    {/*        valueOffstetNumber={()=>{return this.state.sliderValueQualitedureveil}}*/}
                    {/*        LRpadding={40}*/}
                    {/*        callback={(values)=>{*/}
                    {/*            this.singleSliderValueCallbackQualitetravail(values)*/}
                    {/*        }}*/}
                    {/*        single={true}*/}
                    {/*    />*/}
                    {/*    <View style={{top:-10,flexDirection:'row',justifyContent:'space-between'}}>*/}
                    {/*        <Text style={{color:'white',left:2}}>0</Text>*/}
                    {/*        <Text style={{color:'white',left:4}}>2</Text>*/}
                    {/*        <Text style={{color:'white',left:4}}>4</Text>*/}
                    {/*        <Text style={{color:'white',left:4}}>6</Text>*/}
                    {/*        <Text style={{color:'white',left:9}}>8</Text>*/}
                    {/*        <Text style={{color:'white'}}>10</Text>*/}
                    {/*    </View>*/}
                    {/*</View>*/}

                    <View style={{ flexDirection: "row", width: screenWidth * 0.9, marginLeft: 5,marginTop:18 }}>
                        <Text style={[styles.qtText, { fontSize: 14 }]}>Sensation de fatigue</Text>
                        <View style={{ width: screenWidth * 0.5, }}></View>
                    </View>
                    <View style={{ margin: 5 }}></View>
                    <View style={[styles.sliderCtn]}>
                        <View style={styles.sliderView}>
                            <View style={[styles.markerCtn]}>
                                <View style={[styles.sliderOptionMark, (this.state.sliderValueSensationFatigue[0] >= 0 ? styles.sliderOptionMarkValued : {})]}></View>
                                <View style={[styles.sliderOptionMark, (this.state.sliderValueSensationFatigue[0] >= 1 ? styles.sliderOptionMarkValued : {})]}></View>
                                <View style={[styles.sliderOptionMark, (this.state.sliderValueSensationFatigue[0] >= 2 ? styles.sliderOptionMarkValued : {})]}></View>
                                <View style={[styles.sliderOptionMark, (this.state.sliderValueSensationFatigue[0] >= 3 ? styles.sliderOptionMarkValued : {})]}></View>
                                <View style={[styles.sliderOptionMark, (this.state.sliderValueSensationFatigue[0] >= 4 ? styles.sliderOptionMarkValued : {})]}></View>
                                <View style={[styles.sliderOptionMark, (this.state.sliderValueSensationFatigue[0] >= 5 ? styles.sliderOptionMarkValued : {})]}></View>
                            </View>
                            <Slider
                                style={{ width: "100%", height: 40 }}
                                minimumValue={0}
                                maximumValue={5}
                                minimumTrackTintColor={colors.red}
                                maximumTrackTintColor={"#A5A5A5"}
                                thumbTintColor={colors.red}
                                value={this.state.sliderValueSensationFatigue[0]}
                                onValueChange={
                                    (value)=>
                                        this.setState({ sliderValueSensationFatigue: [value] })
                                }
                            />
                            <Text
                                style={{
                                    color: colors.white,
                                    left: ((0 * (screenWidth - 50)) / 5),
                                    position: "absolute", bottom: 0
                                }}>
                                0
                            </Text>
                            <Text
                                style={{
                                    color: colors.white,
                                    left: ((1.04 * (screenWidth - 50)) / 5),
                                    position: "absolute", bottom: 0
                                }}>
                                2
                            </Text>
                            <Text
                                style={{
                                    color: colors.white,
                                    left: ((2.06 * (screenWidth - 50)) / 5),
                                    position: "absolute", bottom: 0
                                }}>
                                4
                            </Text>
                            <Text
                                style={{
                                    color: colors.white,
                                    left: ((3.12 * (screenWidth - 50)) / 5),
                                    position: "absolute", bottom: 0
                                }}>
                                6
                            </Text>
                            <Text
                                style={{
                                    color: colors.white,
                                    left: ((4.16 * (screenWidth - 50)) / 5),
                                    position: "absolute", bottom: 0
                                }}>
                                8
                            </Text>
                            <Text
                                style={{
                                    color: colors.white,
                                    left: ((5.18 * (screenWidth - 50)) / 5),
                                    position: "absolute", bottom: 0
                                }}>
                                10
                            </Text>
                        </View>
                    </View>

                    {/*<View style={[styles.sliderCtn, {top:-20  }]}>*/}
                    {/*    <View style={[styles.sliderTensionLabel,{bottom: -25}]}>*/}
                    {/*        <Text style={[baseStyles.textColorWhite]}>Sensation de fatigue</Text>*/}
                    {/*    </View>*/}
                    {/*    <CustomSlider*/}
                    {/*        min={0}*/}
                    {/*        max={5}*/}
                    {/*        valueOffstetNumber={()=>{return this.state.sliderValueSensationFatigue}}*/}
                    {/*        LRpadding={40}*/}
                    {/*        callback={(values)=>{*/}
                    {/*            this.singleSliderValueCallbackSensationFatigue(values)*/}
                    {/*        }}*/}
                    {/*        single={true}*/}
                    {/*    />*/}
                    {/*    <View style={{top:-10,flexDirection:'row',justifyContent:'space-between'}}>*/}
                    {/*        <Text style={{color:'white',left:2}}>0</Text>*/}
                    {/*        <Text style={{color:'white',left:4}}>2</Text>*/}
                    {/*        <Text style={{color:'white',left:4}}>4</Text>*/}
                    {/*        <Text style={{color:'white',left:4}}>6</Text>*/}
                    {/*        <Text style={{color:'white',left:9}}>8</Text>*/}
                    {/*        <Text style={{color:'white'}}>10</Text>*/}
                    {/*    </View>*/}
                    {/*</View>*/}

                    <View style={{ margin: 10 }}></View>
                    <MAAButton text={"VALIDER"} width={(screenWidth - 100)} height={40}
                               onPress={() => {
                                   this.putUserNbHeureSommeilURL();
                                   this.postsommeil()
                               }}
                               style={[styles.btnValidate]} />
                    <View style={{ margin: 5 }}></View>
                </ScrollView>
                <DateTimePicker
                cancelTextIOS={"Annuler"}
                confirmTextIOS={"Confirmer"}
                isDarkModeEnabled={false}
                headerTextIOS={" "}
                    isVisible={this.state.isDateTimePickerVisible}
                    mode="time"
                    //display={"clock"}
                    is24Hour={true}
                    date={this.state.newdate}
                    locale="fr_FR"
                    onConfirm={this.handleDatePicked}
                    onCancel={this.hideDateTimePicker}
                />

                <Slidebottom showModal={this.state.showMinute}
                             onRequestClose={()=>{
                                 this.setState({showMinute:false});
                             }}
                             callback={(item,index)=>{
                                 this.setState({minuteselectionneenvoie:item.envoie,minuteselectionneaffichage:item.affichage,showMinute:false})
                             }}
                             items={this.state.minutes}
                             component_item={(item)=>{
                                 return(
                                     <Text style={{color:'#373535'}}>{item.affichage}</Text>
                                 )
                             }}
                />

                <Modal
                    visible={this.state.isWritingSommeil}
                    animationType={"slide"}
                    onRequestClose={() => {
                        this.setState({isWritingSommeil:false})
                    }
                    }
                    transparent={true}
                >
                    <TouchableOpacity
                        onPress={() => {
                            this.setState({isWritingSommeil:false})
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
                    <View style={{justifyContent:'flex-end',alignItems:'center',top:screenHeight-(screenWidth*0.5)}}>
                        <View style={{height: 33,width: screenWidth,
                            backgroundColor: '#FF3A28',
                            bottom: 0 }}>
                            <View style={{flexDirection:'row',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                paddingTop:7,
                                paddingHorizontal:20
                            }}>
                                <TouchableOpacity
                                    onPress={ async ()=>{
                                        await  this.setState({isWritingSommeil:false})
                                    }}
                                >
                                    <Text style={{color:'white'}}>Annuler</Text>
                                </TouchableOpacity>
                                <Text style={{color:'white'}}></Text>
                                <TouchableOpacity
                                    onPress={()=>{
                                        this.setState({ isWritingSommeil: false })
                                    }}
                                >
                                    <Text style={{color:'white'}}></Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <ScrollView
                            style={{height: screenWidth*0.5,backgroundColor:'white',width:'100%'}}
                            contentContainerStyle={{justifyContent:'center',alignItems:'center',paddingBottom:100}}
                        >
                            {
                                nbhsArray.map((item, index) => {
                                    return (
                                        <TouchableOpacity
                                            key={"someil" + index}
                                            style={{
                                                padding: 5,
                                                margin: 5,
                                                borderBottomColor: colors.grisbox,
                                                borderBottomWidth: 0.5,
                                                flexDirection: "row",
                                                alignItems: "center",
                                                width:'100%',
                                                justifyContent: "center"
                                            }}
                                            onPress={async () => {
                                                this.setState({hobjectif:item.hor},()=>{
                                                    let percentage;
                                                    if(item.hor % 1 !== 0 ){
                                                        percentage = parseFloat(this.state.hsommeil + '.' + this.state.mnsommeil.toString().padEnd(2,'0')) * 100/parseFloat(item.hor.toString().split('.')[0] + '.' + item.hor.toString().split('.')[1].toString().padEnd(2,'0'));
                                                    }else{
                                                        percentage = parseFloat(this.state.hsommeil + '.' + this.state.mnsommeil.toString().padEnd(2,'0')) * 100/parseInt(item.hor);
                                                    }
                                                    if(percentage>100){
                                                        percentage = 100;
                                                    }
                                                    this.setState({ percentage: percentage },()=>{
                                                        this.setState({ percentage: percentage })
                                                    })
                                                });

                                                this.setState({ isWritingSommeil: false })
                                            }}
                                        >
                                            <Text>
                                                {item.h} mn
                                            </Text>

                                        </TouchableOpacity>

                                    )
                                })
                            }
                        </ScrollView>
                    </View>
                </Modal>
            </LinearGradient>
        )
    }
}

// export default AddTension;
const mapStateToProps = (state) => {
    const { selectedZone,popToTop,userToken } = state.statedata
    return { selectedZone,popToTop,userToken }
};

export default connect(mapStateToProps)(Sommeil);
