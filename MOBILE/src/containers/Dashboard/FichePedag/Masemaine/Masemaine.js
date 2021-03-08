import React, { Component } from "react";
import {
    Text,
    View,
    LayoutAnimation,
    Alert,
    ScrollView,
    AppRegistry,
    Dimensions,
    StatusBar,
    TouchableOpacity,
    FlatList,
    RefreshControl, Modal, Animated,Platform
} from "react-native";
import {
    DragContainer,
    Draggable,
    DropZone
} from "react-native-drag-drop-and-swap";
import { connect } from 'react-redux';
import AutoHeightImage from 'react-native-auto-height-image';
import LinearGradient from 'react-native-linear-gradient';
import colors from '../../../../configs/colors';
import baseStyles from '../../../../base/BaseStyles';
import styles from './styles';
import {
    SET_ACTIVE_FP,
    SET_POP_TO_TOP,
    SET_LISTE_ACTIVITE_PROGRAM,
    SET_ACTIVE_TAB, SET_ACTIVE_TABMENU_MYENERGY, SET_ACTIVE_TABMENU_CARNET, SET_DEPUIS_CALENDAR,
} from '../../../../redux/types/tabTypes';
import { backgroundColor } from '../../../../components/react-native-calendars/src/style';
import Evenement from "../Evenement/Evenement"
import EvenementPM from "../Evenement/EvenementPM";

import calendarEventHelper from "../../../../apis/helpers/calendarEvent_helper";
import moment from "moment";
import {createDndContext} from 'react-native-easy-dnd';
import PersonalDataHelper from '../../../../apis/helpers/person_data_helper';
import MAAButton from "../../../../components/MAAButton/MAAButton";
import {enter} from 'react-native/Libraries/Utilities/ReactNativeTestTools';
import {getDashboar} from '../../../../apis/FonctionRedondant';
import dashboardHelper from '../../../../apis/helpers/dashboard_helper';
import HalfRedmasemaine from '../../../../components/HalfRed/HalfRedmasemaine';
import {ConfirmDialog} from 'react-native-simple-dialogs';

const screen = Dimensions.get('screen');
const SBHelight = Platform.OS === 'ios'? 0 : StatusBar.currentHeight;
const screenWidth = screen.width
const screenHeight = screen.height - SBHelight;
const { Provider, Droppable } = createDndContext();



class DraggyInner extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {

           if (this.props.dragOver && !this.props.ghost && !this.props.dragging) {
            LayoutAnimation.easeInEaseOut();
            return (
                <View  style={
                    [styles.rowBoxActivites,
                        {backgroundColor: this.props.alphabet.color,
                            width: this.props.dragOver ? 110 : 100,
                            alignItems: "center",
                            justifyContent: "center",
                            height: this.props.dragOver ? 110 : 100,
                            //  backgroundColor: "rgba(255,0,0,.7)"
                        }]}
                >
                    <Text style={[styles.textActivites,this.props.alphabet.color ==='yellow'?{ color:'#d9d8d9'}:{color:'white'}]}>
                        {this.props.alphabet.name}
                    </Text>
                </View>

            );
        }
        let shadows = {
            shadowColor: "black",
            shadowOffset: { width: 0, height: 20 },
            shadowOpacity: 0.5,
            shadowRadius: 20,
            opacity: 0.5
        };



        return (
            <View
                style={[
                    this.props.alphabet.color ==='yellow' ?
                        {
                            backgroundColor:colors.yellowbox,
                            alignItems: "center",
                            justifyContent: "center"
                        } :
                        {
                            backgroundColor:this.props.alphabet.color === 'cyan' ? '#3a81aa':this.props.alphabet.color,
                            alignItems: "center",
                            justifyContent: "center"
                        },
                    this.props.dragging ? shadows : null,
                    styles.rowBoxActivites,
                ]}
            >
                <Text
                    style={{
                        color: 'white',
                        fontSize: 10,
                        flexWrap:'wrap',
                        textAlign:'center'
                    }}
                >
                    {this.props.alphabet.name}
                </Text>
            </View>
        );
    }
}




class Masemaine extends Component {
    listRef = React.createRef();

    constructor(props) {
        super(props);
        this.onDelete = this.onDelete.bind(this);

        this.state={
            showpickerhour:false,
            listActivites:[],
            addEventActivity:false,
            refreshing:false,
            userToken:props.userToken,
            getEventByDay:null,
            year:null,
            month:null,
            day:null,
            _listeActivitesProgram:[],
            showModalVoulezvousVraimentSupprimer:false,
            itemPressed:null,
            bgcolorforaddeventactivity:null,
            titleeventforaddeventactivity:null,

            //swipper
            hour1:0,
            hour2:0,
            minute1:0,
            minute2:0,

            //nouveau
            hoverData: {},
            dropData: {},
            hoverDataIndex: null,

            activity_id: null,
            venudemodifier:false,

            hourforsort:null,
            hourforswiper2:null,
            minuteforswiper1 :null,
            minuteforswiper2 :null,

            idamodifier:0,


            userActivites: [],
            showpickerhourPM:false,
            titredraggedItem:'',

            //post
            jour:null,
            periode:null,
            jourMatinOuSoir:null,
            dragstart:false,

            entered:false,
            showmodalselisteonecase:false,
            caseforshow:"",

            initial_listeonecase:[],

            idedit:0,
        };

        this.nbrAct=this.props.listActivites.length
        this.nbrRowsActivites=Math.floor(this.nbrAct/3);


        //height cellule
    }



    onDelete(e) {
        let data = this.state.alphabets || [];
        let alphabets = data.map((item, i) => {
            if (e.id === item.id) {
                return { id: e.id, data: "" };
            } else {
                return item;
            }
        });
        this.setState({ alphabets });
    }


    trash_(id){
        console.warn('trash');
        this.setState({idedit:id});
        this.setState({showModalVoulezvousVraimentSupprimer:true})
    }

    async componentDidMount() {

        this.getListTypesActivities()
        this.getUserActivities().then(()=>{
            this.nbrAct = this.state.listActivites.length;
            this.nbrRowsActivites = Math.floor(this.nbrAct / 3);
        });
        const setActiveFPAction = { type: SET_ACTIVE_FP, value: 3 }
        this.props.dispatch(setActiveFPAction)
    }

    userActiviteLundiAmMap(userActivites){
        let inc = 0;
        let data =[];
        for(let i = 0; i < userActivites.length; i++){
            if (userActivites[i].jour === 1 && userActivites[i].periode === "AM" && inc < 6 ) {
                data.push(
                    <View key={"act_" + userActivites[i].id} style={[styles.barrActivities, { backgroundColor:    userActivites[i].activite_type.color ==='yellow'? colors.yellowbox : userActivites[i].activite_type.color === 'cyan' ? '#3a81aa':userActivites[i].activite_type.color }]}>
                    </View>
                );
                inc++;
            }
        }
        return data;
    }

    userActiviteMardiAmMap(userActivites){
        let inc = 0;
        let data =[];
        for(let i = 0; i < userActivites.length; i++){
            if (userActivites[i].jour === 2 && userActivites[i].periode === "AM" && inc < 6 ) {
                data.push(
                    <View key={"act_" + userActivites[i].id} style={[styles.barrActivities, { backgroundColor:    userActivites[i].activite_type.color ==='yellow'? colors.yellowbox : userActivites[i].activite_type.color === 'cyan' ? '#3a81aa':userActivites[i].activite_type.color }]}>
                    </View>
                )
                inc++;
            }
        }
        return data;
    }

    userActiviteMercrediAmMap(userActivites){
        let inc = 0;
        let data =[];
        for(let i = 0; i < userActivites.length; i++){
            if (userActivites[i].jour === 3 && userActivites[i].periode === "AM" && inc < 6 ) {
                data.push(
                    <View key={"act_" + userActivites[i].id} style={[styles.barrActivities,{ backgroundColor:    userActivites[i].activite_type.color ==='yellow'? colors.yellowbox : userActivites[i].activite_type.color === 'cyan' ? '#3a81aa':userActivites[i].activite_type.color }]}>
                    </View>
                )
                inc++;
            }
        }
        return data;
    }


    userActiviteJeudiAmMap(userActivites){
        let inc = 0;
        let data =[];
        for(let i = 0; i < userActivites.length; i++){
            if (userActivites[i].jour === 4 && userActivites[i].periode === "AM" && inc < 6 ) {
                data.push(
                    <View key={"act_" + userActivites[i].id} style={[styles.barrActivities, { backgroundColor:    userActivites[i].activite_type.color ==='yellow'? colors.yellowbox : userActivites[i].activite_type.color === 'cyan' ? '#3a81aa':userActivites[i].activite_type.color }]}>
                    </View>
                )
                inc++;
            }
        }
        return data;
    }



    userActiviteVendrediAmMap(userActivites){
        let inc = 0;
        let data =[];
        for(let i = 0; i < userActivites.length; i++){
            if (userActivites[i].jour === 5 && userActivites[i].periode === "AM" && inc < 6 ) {
                data.push(
                    <View key={"act_" + userActivites[i].id} style={[styles.barrActivities, { backgroundColor:    userActivites[i].activite_type.color ==='yellow'? colors.yellowbox : userActivites[i].activite_type.color === 'cyan' ? '#3a81aa':userActivites[i].activite_type.color }]}>
                    </View>
                )
                inc++;
            }
        }
        return data;
    }

    userActiviteSamediAmMap(userActivites){
        let inc = 0;
        let data =[];
        for(let i = 0; i < userActivites.length; i++){
            if (userActivites[i].jour === 6 && userActivites[i].periode === "AM" && inc < 6 ) {
                data.push(
                    <View key={"act_" + userActivites[i].id} style={[styles.barrActivities, { backgroundColor:    userActivites[i].activite_type.color ==='yellow'? colors.yellowbox : userActivites[i].activite_type.color === 'cyan' ? '#3a81aa':userActivites[i].activite_type.color }]}>
                    </View>
                )
                inc++;
            }
        }
        return data;
    }


    userActiviteDimancheAmMap(userActivites){
        let inc = 0;
        let data =[];
        for(let i = 0; i < userActivites.length; i++){
            if (userActivites[i].jour === 7 && userActivites[i].periode === "AM" && inc < 6 ) {
                data.push(
                    <View key={"act_" + userActivites[i].id} style={[styles.barrActivities, { backgroundColor:    userActivites[i].activite_type.color ==='yellow'? colors.yellowbox : userActivites[i].activite_type.color === 'cyan' ? '#3a81aa':userActivites[i].activite_type.color }]}>
                    </View>
                )
                inc++;
            }
        }
        return data;
    }

    userActiviteLundiPmMap(userActivites){
        let inc = 0;
        let data =[];
        for(let i = 0; i < userActivites.length; i++){
            if (userActivites[i].jour === 1 && userActivites[i].periode === "PM" && inc < 5 ) {
                data.push(
                    <View key={"act_" + userActivites[i].id} style={[styles.barrActivities, { backgroundColor:    userActivites[i].activite_type.color ==='yellow'? colors.yellowbox : userActivites[i].activite_type.color === 'cyan' ? '#3a81aa':userActivites[i].activite_type.color }]}>
                    </View>
                )
                inc++;
            }
        }
        return data;
    }


    userActiviteMardiPmMap(userActivites){
        let inc = 0;
        let data =[];
        for(let i = 0; i < userActivites.length; i++){
            if (userActivites[i].jour == 2 && userActivites[i].periode == "PM" && inc < 5 ) {
                data.push( <View key={"act_" + userActivites[i].id} style={[styles.barrActivities, { backgroundColor:    userActivites[i].activite_type.color ==='yellow'? colors.yellowbox : userActivites[i].activite_type.color === 'cyan' ? '#3a81aa':userActivites[i].activite_type.color }]}>
                </View>);
                inc++;
            }
        }
        return data;
    }

    userActiviteMercrediPmMap(userActivites){
        let inc = 0;
        let data =[];
        for(let i = 0; i < userActivites.length; i++){
            if (userActivites[i].jour == 3 && userActivites[i].periode == "PM" && inc < 5 ) {
                data.push( <View key={"act_" + userActivites[i].id} style={[styles.barrActivities, { backgroundColor:    userActivites[i].activite_type.color ==='yellow'? colors.yellowbox : userActivites[i].activite_type.color === 'cyan' ? '#3a81aa':userActivites[i].activite_type.color }]}>
                </View>);
                inc++;
            }
        }
        return data;
    }

    userActiviteJeudiPmMap(userActivites){
        let inc = 0;
        let data =[];
        for(let i = 0; i < userActivites.length; i++){
            if (userActivites[i].jour == 4 && userActivites[i].periode == "PM" && inc < 5 ) {
                data.push( <View key={"act_" + userActivites[i].id} style={[styles.barrActivities, { backgroundColor:    userActivites[i].activite_type.color ==='yellow'? colors.yellowbox : userActivites[i].activite_type.color === 'cyan' ? '#3a81aa':userActivites[i].activite_type.color}]}>
                </View>);
                inc++;
            }
        }
        return data;
    }

    userActiviteVendrediPmMap(userActivites){
        let inc = 0;
        let data =[];

            for(let i = 0; i < userActivites.length; i++){
            if(i < 9){
                if (userActivites[i].jour == 5 && userActivites[i].periode == "PM" && inc < 5 ) {
                    data.push( <View key={"act_" + userActivites[i].id} style={[styles.barrActivities, { backgroundColor:    userActivites[i].activite_type.color ==='yellow'? colors.yellowbox : userActivites[i].activite_type.color === 'cyan' ? '#3a81aa':userActivites[i].activite_type.color }]}>
                    </View>);
                    inc++;
                }
            }
        }


        return data;
    }

    userActiviteSamediPmMap(userActivites){
        let inc = 0;
        let data =[];
        for(let i = 0; i < userActivites.length; i++){
            if (userActivites[i].jour == 6 && userActivites[i].periode == "PM" && inc < 5 ) {
                data.push( <View key={"act_" + userActivites[i].id} style={[styles.barrActivities, { backgroundColor:    userActivites[i].activite_type.color ==='yellow'? colors.yellowbox : userActivites[i].activite_type.color === 'cyan' ? '#3a81aa':userActivites[i].activite_type.color }]}>
                </View>);
                inc++;
            }
        }
        return data;
    }

    userActiviteDimanchePmMap(userActivites){
        let inc = 0;
        let data =[];
        for(let i = 0; i < userActivites.length; i++){
            if(i < 30){
            if (userActivites[i].jour == 7 && userActivites[i].periode == "PM" && inc < 5 ) {
                data.push( <View key={"act_" + userActivites[i].id} style={[styles.barrActivities, { backgroundColor:    userActivites[i].activite_type.color ==='yellow'? colors.yellowbox : userActivites[i].activite_type.color === 'cyan' ? '#3a81aa':userActivites[i].activite_type.color }]}>
                </View>);
                inc++;
            }
          }
        }
        return data;
    }

    getListTypesActivities = async () => {
        this.setState({ refreshing: true });
        const listTypeActivities = await PersonalDataHelper.getListTypesActivities(this.props.userToken);
        this.setState({ listActivites: listTypeActivities.data });
        this.setState({ refreshing: false })
    };

    supprItem = async () => {
        this.setState({refreshing: true});
        console.warn("this.state.idedit",this.state.idedit, this.props.userToken)
        const supprItem = await calendarEventHelper.supprItemmasemaine(this.props.userToken,this.state.idedit);
        if (supprItem) {
            this.getUserActivities().then(()=>{
                this.nbrAct = this.state.listActivites.length;
                this.nbrRowsActivites = Math.floor(this.nbrAct / 3);
            });
            this.setState({refreshing: false,showModalVoulezvousVraimentSupprimer:false});
        }
    };










    componentWillReceiveProps({ dragOver }) {
        if (dragOver !== this.props.dragOver) LayoutAnimation.easeInEaseOut();
    }


    getUserActivities = async () => {
        this.setState({ refreshing: true });
        const userActivites = await PersonalDataHelper.getUserActivities(this.state.userToken);
        console.log("userActivites")
        console.log(JSON.stringify(userActivites))
        let newList = []
        userActivites.data.map((act, index) => {
            const actDate = new Date(act.heure_debut)
            const actDay = actDate.getDay()
            let upAct = {
                id: act.id,
                jour: act.jour,
                periode: act.periode,
                heure_debut: act.heure_debut,
                heure_fin: act.heure_fin,
                activity_day: actDay,
                activite_type: act.activite_type
            }
            newList.push(upAct)
        })
        this.setState({ userActivites: newList })
        this.setState({ refreshing: false })
    }

    _initaddEventActivity=()=> //tkn hoe event activity n teto fa ts init
    {
        //mandefa data
        this.setState({entered:false, jourMatinOuSoir:null});
        this.postEvent();
    };

    _hidePickerhour=()=>{
        this.setState({showpickerhour:false})
        this.setState({showpickerhourPM:false})
        this.setState({entered:false, jourMatinOuSoir:null})
        this.setState({refreshing:false})
    };

    postEvent = async () => {
        this.setState({refreshing: true});
        let min1 = 0;
        switch (this.state.minute1) {
            case 0:
                min1 = 0;
                break;
            case 1:
                min1 = 15;
                break;
            case 2:
                min1 = 30;
                break;
            case 3:
                min1 = 45;
                break;
            case 4:
                min1 = 60;
                break;
        }

        console.warn(this.state.minute2);
        let min2 = 0;
        switch (this.state.minute2) {
            case 0:
                min2 = 0;
                break;
            case 1:
                min2 = 15;
                break;
            case 2:
                min2 = 30;
                break;
            case 3:
                min2 = 45;
                break;
            case 4:
                min2 = 60;
                break;
        }

        let hour1 = 0;
        let hour2 = 0;
        if(this.state.periode == "AM"){
            switch (this.state.hour1){
                case 0:
                    hour1 = 1;
                    break;
                case 1:
                    hour1 = 2;
                    break;
                case 2:
                    hour1 = 3;
                    break;
                case 3:
                    hour1 = 4;
                    break;
                case 4:
                    hour1 = 5;
                    break;
                case 5:
                    hour1 = 6;
                    break;
                case 6:
                    hour1 = 7;
                    break;
                case 7:
                    hour1 = 8;
                    break;
                case 8:
                    hour1 = 9;
                    break;
                case 9:
                    hour1 = 10;
                    break;
                case 10:
                    hour1 = 11;
                    break;
                case 11:
                    hour1 = 12;
                    break;
                case 12:
                    hour1 = 13;
                    break;
            }

            switch (this.state.hour2) {
                case 0:
                    hour2 = 1;
                    break;
                case 1:
                    hour2 = 2;
                    break;
                case 2:
                    hour2 = 3;
                    break;
                case 3:
                    hour2 = 4;
                    break;
                case 4:
                    hour2 = 5;
                    break;
                case 5:
                    hour2 = 6;
                    break;
                case 6:
                    hour2 = 7;
                    break;
                case 7:
                    hour2 = 8;
                    break;
                case 8:
                    hour2 = 9;
                    break;
                case 9:
                    hour2 = 10;
                    break;
                case 10:
                    hour2 = 11;
                    break;
                case 11:
                    hour2 = 12;
                    break;
                case 12:
                    hour2 = 13;
                    break;
            }
        }else{
            switch (this.state.hour1){
                case 0:
                    hour1 = 14;
                    break;
                case 1:
                    hour1 = 15;
                    break;
                case 2:
                    hour1 = 16;
                    break;
                case 3:
                    hour1 = 17;
                    break;
                case 4:
                    hour1 = 18;
                    break;
                case 5:
                    hour1 = 19;
                    break;
                case 6:
                    hour1 = 20;
                    break;
                case 7:
                    hour1 = 21;
                    break;
                case 8:
                    hour1 = 22;
                    break;
                case 9:
                    hour1 = 23;
                    break;
                case 10:
                    hour1 = 24;
                    break;
            }

            switch (this.state.hour2) {
                case 0:
                    hour2 = 14;
                    break;
                case 1:
                    hour2 = 15;
                    break;
                case 2:
                    hour2 = 16;
                    break;
                case 3:
                    hour2 = 17;
                    break;
                case 4:
                    hour2 = 18;
                    break;
                case 5:
                    hour2 = 19;
                    break;
                case 6:
                    hour2 = 20;
                    break;
                case 7:
                    hour2 = 21;
                    break;
                case 8:
                    hour2 = 22;
                    break;
                case 9:
                    hour2 = 23;
                    break;
                case 10:
                    hour2 = 24;
                    break;
            }
        }


        let heure_debut = (hour1 < 10 ? '0'+hour1 : hour1) +":"+(min1 < 10 ? '0'+ min1 : min1);
        let heure_fin = (hour2 < 10 ? '0'+hour2 : hour2) +":"+(min2 < 10 ? '0'+min2 : min2);


        let _translateminute1 =  (hour1 * 60) + min1;
        let _translateminute2 =  (hour2 * 60) +  min2;
        let allowpost = _translateminute2 - _translateminute1;

        console.warn(_translateminute1,_translateminute2,allowpost,"state hour1",this.state.hour1,hour1,"state hour2",this.state.hour2,hour2,"state min1",this.state.minute1,min1,"state min2",this.state.minute2,min2);
        if (allowpost <= 0){
            Alert.alert('Odgo','Merci de vérifier les horaires que vous avez insérés !')
        }else{
            let addeditEvent;
            if(this.state.dragstart){
                addeditEvent = await calendarEventHelper.postEvent(this.state.userToken,
                    this.state.jour,
                    this.state.periode,
                    this.state.activity_id,
                    heure_debut,
                    heure_fin
                );
            }else{
                addeditEvent = await calendarEventHelper.editEvent(this.state.userToken,
                    this.state.idedit,
                    this.state.jour,
                    this.state.periode,
                    this.state.activity_id,
                    heure_debut,
                    heure_fin
                );
            }

            if (addeditEvent) {
                this.setState({showpickerhour:false})
                this.setState({showpickerhourPM:false})
                this.getUserActivities();
                this.setState({refreshing: false});
            }
        }

    };

    _showEvenement=()=>
    {
        if(this.state.showpickerhour===true)
        {
            return (<Evenement
                defaulthour1={this.state.hour1}
                defaultminute1={this.state.minute1}
                defaulthour2={this.state.hour2}
                defaultminute2={this.state.minute2}
                ispost={this.state.dragstart}
                userActivites ={ this.state.userActivites}
                onchangehour1={(hour1)=>{
                    this.setState({hour1:hour1})
                }}
                onchangehour2={(hour2)=>{
                    this.setState({hour2:hour2})
                }}
                onchangeminute1={(minute1)=>{
                    this.setState({minute1:minute1})
                }}
                onchangeminute2={(minute2)=>{
                    this.setState({minute2:minute2})
                }}
                _initaddEventActivity={this._initaddEventActivity}
                _hidePickerhour={this._hidePickerhour}
                training={this.state.titredraggedItem}
                backcolordraggedItem={this.state.backcolordraggedItem}
                jourMatinOuSoir={this.state.jourMatinOuSoir}
            />)

        }else {
            return null
        }
    };

    _showEvenementPM=()=>
    {
        if(this.state.showpickerhourPM===true)
        {
            return (<EvenementPM
                defaulthour1={this.state.hour1}
                defaultminute1={this.state.minute1}
                defaulthour2={this.state.hour2}
                defaultminute2={this.state.minute2}
                ispost={this.state.dragstart}
                userActivites ={ this.state.userActivites}
                onchangehour1={(hour1)=>{
                    this.setState({hour1:hour1})
                }}
                onchangehour2={(hour2)=>{
                    this.setState({hour2:hour2})
                }}
                onchangeminute1={(minute1)=>{
                    this.setState({minute1:minute1})
                }}
                onchangeminute2={(minute2)=>{
                    this.setState({minute2:minute2})
                }}
                _initaddEventActivity={this._initaddEventActivity}
                _hidePickerhour={this._hidePickerhour}
                training={this.state.titredraggedItem}
                backcolordraggedItem={this.state.backcolordraggedItem}
                jourMatinOuSoir={this.state.jourMatinOuSoir}
            />)
        }else {
            return null
        }
    };



    render() {

        let listeonecase =this.state.initial_listeonecase;
        let userActivites = this.state.userActivites;

        if(userActivites.length > 0 && this.state.dragstart === false){
            if(this.state.caseforshow =="Jeudi matin"){
                 listeonecase =[];
                for(let i = 0; i < userActivites.length; i++){
                    if (userActivites[i].jour === 4 && userActivites[i].periode === "AM" ) {
                        listeonecase.push(
                            userActivites[i]
                        )
                    }
                }
            }else if(this.state.caseforshow =="Jeudi après-midi"){
                listeonecase =[];
                for(let i = 0; i < userActivites.length; i++){
                    if (userActivites[i].jour === 4 && userActivites[i].periode === "PM" ) {
                        listeonecase.push(
                            userActivites[i]
                        )
                    }
                }
            }
            else if(this.state.caseforshow == 'Lundi matin'){
                listeonecase =[];
                for(let i = 0; i < userActivites.length; i++){
                    if (userActivites[i].jour == 1 && userActivites[i].periode == "AM" ) {
                        listeonecase.push(
                            userActivites[i]
                        )
                    }
                }
            }
            else if(this.state.caseforshow == 'Lundi après-midi'){
                listeonecase =[];
                for(let i = 0; i < userActivites.length; i++){
                    if (userActivites[i].jour == 1 && userActivites[i].periode == "PM" ) {
                        listeonecase.push(
                            userActivites[i]
                        )
                    }
                }
            }else if(this.state.caseforshow == 'Mardi matin'){
                listeonecase =[];
                for(let i = 0; i < userActivites.length; i++){
                    if (userActivites[i].jour == 2 && userActivites[i].periode == "AM" ) {
                        listeonecase.push(
                            userActivites[i]
                        )
                    }
                }
            }else if(this.state.caseforshow == 'Mardi après-midi'){
                listeonecase =[];
                for(let i = 0; i < userActivites.length; i++){
                    if (userActivites[i].jour == 2 && userActivites[i].periode == "PM" ) {
                        listeonecase.push(
                            userActivites[i]
                        )
                    }
                }
            }else if(this.state.caseforshow == 'Mercredi matin'){
                listeonecase =[];
                for(let i = 0; i < userActivites.length; i++){
                    if (userActivites[i].jour == 3 && userActivites[i].periode == "AM" ) {
                        listeonecase.push(
                            userActivites[i]
                        )
                    }
                }
            }else if(this.state.caseforshow == 'Mercredi après-midi'){
                listeonecase =[];
                for(let i = 0; i < userActivites.length; i++){
                    if (userActivites[i].jour == 3 && userActivites[i].periode == "PM" ) {
                        listeonecase.push(
                            userActivites[i]
                        )
                    }
                }
            }else if(this.state.caseforshow =="Vendredi matin"){
                listeonecase =[];
                for(let i = 0; i < userActivites.length; i++){
                    if (userActivites[i].jour == 5 && userActivites[i].periode == "AM" ) {
                        listeonecase.push(
                            userActivites[i]
                        )
                    }
                }
            }
            else if(this.state.caseforshow =="Vendredi après-midi"){
                 listeonecase =[];
                for(let i = 0; i < userActivites.length; i++){
                    if (userActivites[i].jour == 5 && userActivites[i].periode == "PM" ) {
                        listeonecase.push(
                            userActivites[i]
                        )
                    }
                }
            }else if(this.state.caseforshow =="Samedi matin"){
                listeonecase =[];
                for(let i = 0; i < userActivites.length; i++){
                    if (userActivites[i].jour == 6 && userActivites[i].periode == "AM" ) {
                        listeonecase.push(
                            userActivites[i]
                        )
                    }
                }
            }
            else if(this.state.caseforshow =="Samedi après-midi"){
                listeonecase =[];
                for(let i = 0; i < userActivites.length; i++){
                    if (userActivites[i].jour == 6 && userActivites[i].periode == "PM" ) {
                        listeonecase.push(
                            userActivites[i]
                        )
                    }
                }
            }else if(this.state.caseforshow =="Dimanche matin"){
                listeonecase =[];
                for(let i = 0; i < userActivites.length; i++){
                    if (userActivites[i].jour == 7 && userActivites[i].periode == "AM" ) {
                        listeonecase.push(
                            userActivites[i]
                        )
                    }
                }
            }
            else if(this.state.caseforshow =="Dimanche après-midi"){
                listeonecase =[];
                for(let i = 0; i < userActivites.length; i++){
                    if (userActivites[i].jour == 7 && userActivites[i].periode == "PM" ) {
                        listeonecase.push(
                            userActivites[i]
                        )
                    }
                }
            }

        }

        console.warn('liste one case',listeonecase);


        return (
            <DragContainer
                onDragStart={()=>{
                    console.warn('drag star');
                    this.setState({ dragstart:true });

                    this.setState({entered:false, jourMatinOuSoir:null})
                }}
            >{this.showsuppr()}
                <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }} colors={[colors.balck, colors.green, colors.balck]} style={baseStyles.linearGradient}>

                    <ScrollView
                        contentInsetAdjustmentBehavior="automatic"
                        ref="_scrollView"
                        style={styles.scrollView}
                        contentContainerStyle={[styles.contentContainerStyle]}
                        refreshControl={
                            <RefreshControl
                                refreshing={this.state.refreshing}
                                onRefresh={() => {
                                    //
                                    this.getListTypesActivities()
                                    this.getUserActivities()
                                }}
                                tintColor={Platform.OS==='ios'?colors.white:colors.green}
                                colors={[Platform.OS==='ios'?colors.white:colors.green]}
                            />
                        }
                    >
                        <View style={{ alignItems :"center",justifyContent:"center",width:"100%",marginVertical:15  }}>
                            <TouchableOpacity
                                onPress={async () => {
                                    const set = { type: SET_DEPUIS_CALENDAR, value: false };
                                    this.props.dispatch(set);
                                    if( global.is_venudedonneperso === true){
                                        const setActiveFPAction = {type: SET_ACTIVE_FP, value: 2};
                                        this.props.dispatch(setActiveFPAction);
                                        const setActive = { type: SET_ACTIVE_TABMENU_MYENERGY, value: 3 };
                                        this.props.dispatch(setActive);
                                        const setActiveTab = { type: SET_ACTIVE_TAB, value: "myenergyviadatapersoempty" };
                                        this.props.dispatch(setActiveTab);
                                        this.props.navigation.navigate('LogedinNavigator');
                                    } else{
                                        const setActive = { type: SET_ACTIVE_TABMENU_MYENERGY, value: 3 };
                                        await this.props.dispatch(setActive);
                                        const setActiveFPAction = {type: SET_ACTIVE_FP, value: null};
                                        this.props.dispatch(setActiveFPAction)
                                        // if(
                                        this.props.navigation.goBack()
                                        // ){
                                        // }else{
                                        //     const setActiveTabAction = { type: SET_ACTIVE_TAB, value: "profile" }
                                        //     this.props.dispatch(setActiveTabAction)
                                        // }
                                    }

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
                                {"Ma semaine type"}
                            </Text>
                        </View>

                        <View style={styles.bodyMasemaine}>
                            <Text style={styles.textDescription}>Remplissez les activités de votre semaine type (<Text style={{ fontStyle: "italic" }}>vous aurez la possibilité de modifier le tableau à tout moment</Text>)</Text>
                            <View>
                                <View style={{ width: "100%", alignItems: "center", marginTop: screenHeight * 0.05, marginBottom: screenHeight * 0.05 }} >
                                    <View style={{ flexDirection: "row", borderBottomColor: colors.white, borderBottomWidth: 0.5 }}>
                                        <View style={[styles.labeljrsSemaine, { width: screenWidth * 0.06, borderRightColor: colors.white, borderRightWidth: 0.5 }]} >
                                            <Text style={styles.txtjrsSemaine}></Text>
                                        </View>
                                        <View style={[styles.labeljrsSemaine, { borderRightColor: colors.white, borderRightWidth: 0.5 }]} >
                                            <Text style={styles.txtjrsSemaine}>LU</Text>
                                        </View>
                                        <View style={[styles.labeljrsSemaine, { borderRightColor: colors.white, borderRightWidth: 0.5 }]}  >
                                            <Text style={styles.txtjrsSemaine} >MA</Text>
                                        </View>
                                        <View style={[styles.labeljrsSemaine, { borderRightColor: colors.white, borderRightWidth: 0.5 }]}  >
                                            <Text style={styles.txtjrsSemaine}>ME</Text>
                                        </View>
                                        <View style={[styles.labeljrsSemaine, { borderRightColor: colors.white, borderRightWidth: 0.5 }]}  >
                                            <Text style={styles.txtjrsSemaine}>JE</Text>
                                        </View>
                                        <View style={[styles.labeljrsSemaine, { borderRightColor: colors.white, borderRightWidth: 0.5 }]} >
                                            <Text style={styles.txtjrsSemaine}>VE</Text>
                                        </View>
                                        <View style={[styles.labeljrsSemaine, { borderRightColor: colors.white, borderRightWidth: 0.5 }]}  >
                                            <Text style={styles.txtjrsSemaine}>SA</Text>
                                        </View>
                                        <View style={[styles.labeljrsSemaine,{borderRightWidth:0.5,borderColor:'white'}]}  >
                                            <Text style={styles.txtjrsSemaine}>DI</Text>
                                        </View>
                                    </View>

                                    <View style={{ flexDirection: "row", borderBottomColor: colors.white, borderBottomWidth: 0.5 }}>
                                        <View style={[styles.amBoxjrsSemaine, { justifyContent: "center", width: screenWidth * 0.06, borderRightColor: colors.white, borderRightWidth: 0.5 }]} >
                                            <Text style={
                                                {
                                                    fontSize: 12,
                                                    color: colors.white,
                                                    transform: [{ rotate: "-90deg" }],
                                                }}>AM</Text>
                                        </View>


                                        <DropZone onDrop={e => {
                                            this.setState({ backcolordraggedItem:e.color });
                                            this.setState({  titredraggedItem:e.name});
                                            this.setState({showpickerhour:true,refreshing:false},()=>{
                                                this.setState({
                                                    hour1:0,
                                                    hour2:0,
                                                    minute1:0,
                                                    minute2:0
                                                });
                                            });
                                            let act = {};
                                            act.jour = 1;
                                            act.periode = "AM";
                                            act.id = Math.random();
                                            act.activite_type = {color : e.color};
                                            this.state.userActivites.push(act);
                                            this.setState({userActivites:this.state.userActivites})
                                            this.setState({
                                                periode: "AM",
                                                activity_id: e.id,
                                                jour:1,
                                                jourMatinOuSoir:'Lundi matin'
                                            })
                                        }}
                                                  onEnter={() =>
                                                  {
                                                      this.setState({entered:true,jourMatinOuSoir:'Lundi matin'})
                                                  }}
                                        >
                                            <TouchableOpacity
                                                onPress={()=>{
                                                    this.setState({dragstart:false,showmodalselisteonecase:true,caseforshow:"Lundi matin"});
                                                    this.setState({
                                                        periode: "AM",
                                                        jour:1,
                                                    })
                                                }}
                                                style={[
                                                    {
                                                        borderRightColor: colors.white, borderRightWidth: 0.5,
                                                        minHeight: screenWidth*0.2,paddingBottom:3,
                                                        backgroundColor: (this.state.jourMatinOuSoir==='Lundi matin' && this.state.entered  ? "#420420" : null)
                                                    },
                                                    styles.amBoxjrsSemaine
                                                ]}
                                            >
                                                <View >
                                                    {
                                                        this.userActiviteLundiAmMap(this.state.userActivites)
                                                    }
                                                </View>
                                            </TouchableOpacity>
                                        </DropZone>


                                        <DropZone onDrop={e => {
                                            this.setState({ backcolordraggedItem:e.color });
                                            this.setState({  titredraggedItem:e.name});
                                            this.setState({showpickerhour:true,refreshing:false});
                                            this.setState({
                                                hour1:0,
                                                hour2:0,
                                                minute1:0,
                                                minute2:0
                                            });
                                            let act = {};
                                            act.jour = 2;
                                            act.periode = "AM";
                                            act.id = Math.random();
                                            act.activite_type = {color : e.color};
                                            this.state.userActivites.push(act);
                                            this.setState({userActivites:this.state.userActivites})
                                            this.setState({
                                                periode: "AM",
                                                activity_id: e.id,
                                                jour:2,
                                                jourMatinOuSoir:'Mardi matin'
                                            })
                                        }}
                                                  onEnter={() =>
                                                  {
                                                      this.setState({entered:true,jourMatinOuSoir:'Mardi matin'})
                                                  }}
                                        >
                                            <TouchableOpacity
                                                onPress={()=>{
                                                    this.setState({dragstart:false,showmodalselisteonecase:true,caseforshow:"Mardi matin"});
                                                    this.setState({
                                                        periode: "AM",
                                                        jour:2,
                                                    })
                                                }}
                                                style={[
                                                    {
                                                        borderRightColor: colors.white, borderWidth: 0.5,borderTopColor:'transparent',borderBottomColor:'transparent',
                                                        minHeight: screenWidth*0.2,paddingBottom:3,
                                                        backgroundColor: (this.state.jourMatinOuSoir==='Mardi matin' && this.state.entered  ? "#420420" : null)
                                                    },
                                                    styles.amBoxjrsSemaine
                                                ]}
                                            >
                                                <View>
                                                    {
                                                        this.userActiviteMardiAmMap(this.state.userActivites)
                                                    }
                                                </View>
                                            </TouchableOpacity>
                                        </DropZone>

                                        <DropZone onDrop={e => {
                                            this.setState({ backcolordraggedItem:e.color });
                                            this.setState({  titredraggedItem:e.name});
                                            this.setState({showpickerhour:true,refreshing:false});
                                            this.setState({
                                                hour1:0,
                                                hour2:0,
                                                minute1:0,
                                                minute2:0
                                            });
                                            let act = {};
                                            act.jour = 3;
                                            act.periode = "AM";
                                            act.id = Math.random();
                                            act.activite_type = {color : e.color};
                                            this.state.userActivites.push(act);
                                            this.setState({userActivites:this.state.userActivites})
                                            this.setState({
                                                periode: "AM",
                                                activity_id: e.id,
                                                jour:3,
                                                jourMatinOuSoir:'Mercredi matin'
                                            })
                                        }}
                                                  onEnter={() =>
                                                  {
                                                      this.setState({entered:true,jourMatinOuSoir:'Mercredi matin'})
                                                  }}
                                        >

                                            <TouchableOpacity
                                                onPress={()=>{
                                                    this.setState({dragstart:false,showmodalselisteonecase:true,caseforshow:"Mercredi matin"});
                                                    this.setState({
                                                        periode: "AM",
                                                        jour:3,
                                                    })
                                                }}
                                                style={[
                                                    {
                                                        borderRightColor: colors.white, borderWidth: 0.5,borderTopColor:'transparent',borderBottomColor:'transparent',
                                                        minHeight: screenWidth*0.2,paddingBottom:3,
                                                        backgroundColor: (this.state.jourMatinOuSoir==='Mercredi matin' && this.state.entered  ? "#420420" : null)
                                                    },
                                                    styles.amBoxjrsSemaine
                                                ]}
                                            >
                                                <View >
                                                    {
                                                        this.userActiviteMercrediAmMap(this.state.userActivites)
                                                    }
                                                </View>
                                            </TouchableOpacity>
                                        </DropZone>


                                        <DropZone onDrop={e => {
                                            this.setState({initial_listeonecase:[]})
                                            this.setState({ backcolordraggedItem:e.color });
                                            this.setState({  titredraggedItem:e.name});
                                            this.setState({showpickerhour:true,refreshing:false});
                                            this.setState({
                                                hour1:0,
                                                hour2:0,
                                                minute1:0,
                                                minute2:0
                                            });
                                            let act = {};
                                            act.jour = 4;
                                            act.periode = "AM";
                                            act.id = Math.random();
                                            act.activite_type = {color : e.color};
                                            this.state.userActivites.push(act);
                                            this.setState({userActivites:this.state.userActivites})
                                            this.setState({
                                                periode: "AM",
                                                activity_id: e.id,
                                                jour:4,
                                                jourMatinOuSoir:'Jeudi matin'
                                            })
                                        }}
                                                  onEnter={() =>
                                                  {
                                                      this.setState({entered:true,jourMatinOuSoir:'Jeudi matin', periode: "AM"})
                                                  }}
                                        ><TouchableOpacity
                                                onPress={()=>{
                                                    this.setState({dragstart:false,showmodalselisteonecase:true,caseforshow:"Jeudi matin"});
                                                    this.setState({
                                                        periode: "AM",
                                                        jour:4,
                                                    })
                                                  }}
                                                style={[
                                                    {
                                                        borderRightColor: colors.white, borderWidth: 0.5,borderTopColor:'transparent',borderBottomColor:'transparent',
                                                        minHeight: screenWidth*0.2,paddingBottom:3,
                                                        backgroundColor: (this.state.jourMatinOuSoir==='Jeudi matin' && this.state.entered  ? "#420420" : null)
                                                    },
                                                    styles.amBoxjrsSemaine
                                                ]}
                                            ><View >
                                                    {
                                                        this.userActiviteJeudiAmMap(this.state.userActivites)
                                                    }
                                             </View>
                                            </TouchableOpacity>
                                        </DropZone>

                                        <DropZone onDrop={e => {
                                            this.setState({ backcolordraggedItem:e.color });
                                            this.setState({  titredraggedItem:e.name});
                                            this.setState({showpickerhour:true,refreshing:false});
                                            this.setState({
                                                hour1:0,
                                                hour2:0,
                                                minute1:0,
                                                minute2:0
                                            });
                                            let act = {};
                                            act.jour = 5;
                                            act.periode = "AM";
                                            act.id = Math.random();
                                            act.activite_type = {color : e.color};
                                            this.state.userActivites.push(act);
                                            this.setState({userActivites:this.state.userActivites})
                                            this.setState({
                                                periode: "AM",
                                                activity_id: e.id,
                                                jour:5,
                                                jourMatinOuSoir:'Vendredi matin'
                                            })
                                        }}
                                                  onEnter={() =>
                                                  {
                                                      this.setState({entered:true,jourMatinOuSoir:'Vendredi matin'})
                                                  }}
                                        >
                                            <TouchableOpacity
                                                onPress={()=>{
                                                    this.setState({dragstart:false,showmodalselisteonecase:true,caseforshow:'Vendredi matin'});
                                                    this.setState({
                                                        periode: "AM",
                                                        jour:5,
                                                    })
                                                }}
                                                style={[
                                                    {
                                                        borderRightColor: colors.white, borderWidth: 0.5,borderTopColor:'transparent',borderBottomColor:'transparent',
                                                        minHeight: screenWidth*0.2,paddingBottom:3,
                                                        backgroundColor: (this.state.jourMatinOuSoir==='Vendredi matin' && this.state.entered  ? "#420420" : null)
                                                    },
                                                    styles.amBoxjrsSemaine
                                                ]}
                                            >

                                                <View >
                                                    {
                                                        this.userActiviteVendrediAmMap(this.state.userActivites)
                                                    }
                                                </View>
                                            </TouchableOpacity>
                                        </DropZone>


                                        <DropZone onDrop={e => {
                                            this.setState({ backcolordraggedItem:e.color });
                                            this.setState({  titredraggedItem:e.name});
                                            this.setState({showpickerhour:true,refreshing:false});
                                            this.setState({
                                                hour1:0,
                                                hour2:0,
                                                minute1:0,
                                                minute2:0
                                            });
                                            let act = {};
                                            act.jour = 6;
                                            act.periode = "AM";
                                            act.id = Math.random();
                                            act.activite_type = {color : e.color};
                                            this.state.userActivites.push(act);
                                            this.setState({userActivites:this.state.userActivites})
                                            this.setState({
                                                periode: "AM",
                                                activity_id: e.id,
                                                jour:6,
                                                jourMatinOuSoir:'Samedi matin'
                                            })
                                        }}
                                                  onEnter={() =>
                                                  {
                                                      this.setState({entered:true, jourMatinOuSoir:'Samedi matin'})
                                                  }}
                                                  style={{borderColor:'white'}}
                                        >


                                                <TouchableOpacity
                                                    onPress={()=>{
                                                        this.setState({dragstart:false,showmodalselisteonecase:true,caseforshow:'Samedi matin'});
                                                        this.setState({
                                                            periode: "AM",
                                                            jour:6,
                                                        })
                                                    }}
                                                    style={[
                                                        {
                                                             borderWidth: 0.5,borderTopColor:'transparent',borderBottomColor:'transparent',
                                                            borderLeftColor:'transparent',
                                                            minHeight: screenWidth*0.2,paddingBottom:3,
                                                            backgroundColor: (this.state.jourMatinOuSoir==='Samedi matin' && this.state.entered  ? "#420420" : null)
                                                        },
                                                        styles.amBoxjrsSemaine
                                                    ]}
                                                >

                                                <View >
                                                    {
                                                        this.userActiviteSamediAmMap(this.state.userActivites)
                                                    }
                                                </View>
                                            </TouchableOpacity>
                                        </DropZone>
                                        <DropZone onDrop={e => {
                                            this.setState({ backcolordraggedItem:e.color });
                                            this.setState({  titredraggedItem:e.name});
                                            this.setState({showpickerhour:true,refreshing:false});
                                            this.setState({
                                                hour1:0,
                                                hour2:0,
                                                minute1:0,
                                                minute2:0
                                            });
                                            let act = {};
                                            act.jour = 7;
                                            act.periode = "AM";
                                            act.id = Math.random();
                                            act.activite_type = {color : e.color};
                                            this.state.userActivites.push(act);
                                            this.setState({userActivites:this.state.userActivites})
                                            this.setState({
                                                periode: "AM",
                                                activity_id: e.id,
                                                jour:7,
                                                jourMatinOuSoir:'Dimanche matin'
                                            })
                                        }}
                                                  onEnter={() =>
                                                  {
                                                      this.setState({entered:true,jourMatinOuSoir:'Dimanche matin'})
                                                  }}
                                        >
                                            <TouchableOpacity
                                                onPress={()=>{
                                                    this.setState({dragstart:false,showmodalselisteonecase:true,caseforshow:'Dimanche matin'});
                                                    this.setState({
                                                        periode: "AM",
                                                        jour:7,
                                                    })
                                                }}
                                                style={[
                                                    {
                                                        borderRightColor: colors.white, borderWidth: 0.5,borderTopColor:'transparent',borderBottomColor:'transparent',
                                                        borderLeftColor:'white',
                                                        minHeight: screenWidth*0.2,paddingBottom:3,
                                                        backgroundColor: (this.state.jourMatinOuSoir==='Dimanche matin' && this.state.entered  ? "#420420" : null)
                                                    },
                                                    styles.amBoxjrsSemaine
                                                ]}
                                            >

                                                <View >
                                                    {
                                                        this.userActiviteDimancheAmMap(this.state.userActivites)
                                                    }
                                                </View>
                                            </TouchableOpacity>
                                        </DropZone>
                                    </View>

                                    <View style={{ flexDirection: "row",minHeight: screenWidth*0.2 }}>

                                        <View style={[styles.amBoxjrsSemaine, { justifyContent: "center", width: screenWidth * 0.06, borderRightColor: colors.white, borderRightWidth: 0.5 }]} >
                                            <Text style={
                                                {
                                                    fontSize: 12,
                                                    color: colors.white,
                                                    transform: [{ rotate: "-90deg" }],

                                                }
                                            }>PM</Text>
                                        </View>

                                        <DropZone onDrop={e => {
                                            this.setState({ backcolordraggedItem:e.color });
                                            this.setState({  titredraggedItem:e.name});
                                            this.setState({showpickerhourPM:true,refreshing:false});
                                            this.setState({
                                                hour1:0,
                                                hour2:0,
                                                minute1:0,
                                                minute2:0
                                            });
                                            let act = {};
                                            act.jour = 1;
                                            act.periode = "PM";
                                            act.id = Math.random();
                                            act.activite_type = {color : e.color};
                                            this.state.userActivites.push(act);
                                            this.setState({userActivites:this.state.userActivites})
                                            this.setState({
                                                periode: "PM",
                                                activity_id: e.id,
                                                jour:1,
                                                jourMatinOuSoir:'Lundi après-midi'
                                            })
                                        }}
                                                  onEnter={() =>
                                                  {
                                                      this.setState({entered:true,jourMatinOuSoir:'Lundi après-midi'})
                                                  }}
                                        >

                                            <TouchableOpacity
                                                onPress={()=>{
                                                    this.setState({dragstart:false,showmodalselisteonecase:true,caseforshow:'Lundi après-midi'});
                                                    this.setState({
                                                        periode: "PM",
                                                        jour:1,
                                                    })
                                                }}
                                                style={[
                                                    {
                                                        borderRightColor: colors.white, borderRightWidth: 0.5,
                                                        minHeight: screenWidth*0.2,
                                                        backgroundColor: (this.state.jourMatinOuSoir==='Lundi après-midi' && this.state.entered  ? "#420420" : null)
                                                    },
                                                    styles.amBoxjrsSemaine
                                                ]}
                                            >
                                                <View >
                                                    {
                                                        this.userActiviteLundiPmMap(this.state.userActivites)
                                                    }

                                                </View>
                                            </TouchableOpacity>
                                        </DropZone>

                                        <DropZone onDrop={e => {
                                            this.setState({ backcolordraggedItem:e.color });
                                            this.setState({  titredraggedItem:e.name});
                                            this.setState({showpickerhourPM:true,refreshing:false});
                                            this.setState({
                                                hour1:0,
                                                hour2:0,
                                                minute1:0,
                                                minute2:0
                                            });
                                            let act = {};
                                            act.jour = 2;
                                            act.periode = "PM";
                                            act.id = Math.random();
                                            act.activite_type = {color : e.color};
                                            this.state.userActivites.push(act);
                                            this.setState({userActivites:this.state.userActivites})
                                            this.setState({
                                                periode: "PM",
                                                activity_id: e.id,
                                                jour:2,
                                                jourMatinOuSoir:'Mardi après-midi'
                                            })
                                        }}
                                                  onEnter={() =>
                                                  {
                                                      this.setState({entered:true,jourMatinOuSoir:'Mardi après-midi'})
                                                  }}
                                        >

                                            <TouchableOpacity
                                                onPress={()=>{
                                                    this.setState({dragstart:false,showmodalselisteonecase:true,caseforshow:"Mardi après-midi"});
                                                    this.setState({
                                                        periode: "PM",
                                                        jour:2,
                                                    })
                                                }}
                                                style={[
                                                    {
                                                        borderRightColor: colors.white, borderWidth: 0.5,borderTopColor:'transparent',borderBottomColor:'transparent',
                                                        minHeight: screenWidth*0.2,
                                                        backgroundColor: (this.state.jourMatinOuSoir==='Mardi après-midi' && this.state.entered  ? "#420420" : null)
                                                    },
                                                    styles.amBoxjrsSemaine
                                                ]}
                                            >
                                                <View >
                                                    {
                                                        this.userActiviteMardiPmMap(this.state.userActivites)
                                                    }

                                                </View>
                                            </TouchableOpacity>
                                        </DropZone>

                                        <DropZone onDrop={e => {
                                            this.setState({ backcolordraggedItem:e.color });
                                            this.setState({  titredraggedItem:e.name});
                                            this.setState({showpickerhourPM:true,refreshing:false});
                                            this.setState({
                                                hour1:0,
                                                hour2:0,
                                                minute1:0,
                                                minute2:0
                                            });
                                            let act = {};
                                            act.jour = 3;
                                            act.periode = "PM";
                                            act.id = Math.random();
                                            act.activite_type = {color : e.color};
                                            this.state.userActivites.push(act);
                                            this.setState({userActivites:this.state.userActivites})
                                            this.setState({
                                                periode: "PM",
                                                activity_id: e.id,
                                                jour:3,
                                                jourMatinOuSoir:'Mercredi après-midi'
                                            })
                                        }}
                                                  onEnter={() =>
                                                  {
                                                      this.setState({entered:true,jourMatinOuSoir:'Mercredi après-midi'})
                                                  }}
                                        >

                                            <TouchableOpacity
                                                onPress={()=>{
                                                    this.setState({dragstart:false,showmodalselisteonecase:true,caseforshow:"Mercredi après-midi"});
                                                    this.setState({
                                                        periode: "PM",
                                                        jour:3,
                                                    })
                                                }}
                                                style={[
                                                    {
                                                        borderRightColor: colors.white, borderWidth: 0.5,borderTopColor:'transparent',borderBottomColor:'transparent',
                                                        minHeight: screenWidth*0.2,
                                                        backgroundColor: (this.state.jourMatinOuSoir==='Mercredi après-midi' && this.state.entered  ? "#420420" : null)
                                                    },
                                                    styles.amBoxjrsSemaine
                                                ]}
                                            >

                                                <View >
                                                    {
                                                        this.userActiviteMercrediPmMap(this.state.userActivites)
                                                    }
                                                </View>
                                            </TouchableOpacity>
                                        </DropZone>

                                        <DropZone onDrop={e => {
                                            this.setState({ backcolordraggedItem:e.color });
                                            this.setState({  titredraggedItem:e.name});
                                            this.setState({showpickerhourPM:true,refreshing:false});
                                            this.setState({
                                                hour1:0,
                                                hour2:0,
                                                minute1:0,
                                                minute2:0
                                            });
                                            let act = {};
                                            act.jour = 4;
                                            act.periode = "PM";
                                            act.id = Math.random();
                                            act.activite_type = {color : e.color};
                                            this.state.userActivites.push(act);
                                            this.setState({userActivites:this.state.userActivites})
                                            this.setState({
                                                periode: "PM",
                                                activity_id: e.id,
                                                jour:4,
                                                jourMatinOuSoir:'Jeudi après-midi'
                                            })
                                        }}
                                                  onEnter={() =>
                                                  {
                                                      this.setState({entered:true,jourMatinOuSoir:'Jeudi après-midi'})
                                                  }}
                                        >
                                            <TouchableOpacity
                                                onPress={()=>{
                                                    this.setState({dragstart:false,showmodalselisteonecase:true,caseforshow:"Jeudi après-midi"});
                                                    this.setState({
                                                        periode: "PM",
                                                        jour:4,
                                                    })
                                                }}
                                                style={[
                                                    {
                                                        borderRightColor: colors.white, borderWidth: 0.5,borderTopColor:'transparent',borderBottomColor:'transparent',
                                                        minHeight: screenWidth*0.2,
                                                        backgroundColor: (this.state.jourMatinOuSoir==='Jeudi après-midi' && this.state.entered  ? "#420420" : null)
                                                    },
                                                    styles.amBoxjrsSemaine
                                                ]}
                                            >

                                                <View >
                                                    {
                                                        this.userActiviteJeudiPmMap(this.state.userActivites)
                                                    }
                                                </View>
                                            </TouchableOpacity>
                                        </DropZone>

                                        <DropZone onDrop={e => {
                                            this.setState({ backcolordraggedItem:e.color });
                                            this.setState({  titredraggedItem:e.name});
                                            this.setState({showpickerhourPM:true,refreshing:false});
                                            this.setState({
                                                hour1:0,
                                                hour2:0,
                                                minute1:0,
                                                minute2:0
                                            });
                                            let act = {};
                                            act.jour = 5;
                                            act.periode = "PM";
                                            act.id = Math.random();
                                            act.activite_type = {color : e.color};
                                            this.state.userActivites.push(act);
                                            this.setState({userActivites:this.state.userActivites})
                                            this.setState({
                                                periode: "PM",
                                                activity_id: e.id,
                                                jour:5,
                                                jourMatinOuSoir:'Vendredi après-midi'
                                            })
                                        }}
                                                  onEnter={() =>
                                                  {
                                                      this.setState({entered:true,jourMatinOuSoir:'Vendredi après-midi'})
                                                  }}
                                        >
                                            <TouchableOpacity

                                                onPress={()=>{
                                                    this.setState({dragstart:false,showmodalselisteonecase:true,caseforshow:"Vendredi après-midi"});
                                                    this.setState({
                                                        periode: "PM",
                                                        jour:5,
                                                    })
                                                }}
                                                style={[
                                                    {
                                                        borderRightColor: colors.white, borderWidth: 0.5,borderTopColor:'transparent',borderBottomColor:'transparent',
                                                        minHeight: screenWidth*0.2,
                                                        backgroundColor: (this.state.jourMatinOuSoir==='Vendredi après-midi' && this.state.entered  ? "#420420" : null)
                                                    },
                                                    styles.amBoxjrsSemaine
                                                ]}
                                            >
                                                <View >
                                                    {
                                                        this.userActiviteVendrediPmMap(this.state.userActivites)
                                                    }
                                                </View>
                                            </TouchableOpacity>
                                        </DropZone>

                                        <DropZone onDrop={e => {
                                            this.setState({ backcolordraggedItem:e.color });
                                            this.setState({  titredraggedItem:e.name});
                                            this.setState({showpickerhourPM:true,refreshing:false});
                                            this.setState({
                                                hour1:0,
                                                hour2:0,
                                                minute1:0,
                                                minute2:0
                                            });
                                            let act = {};
                                            act.jour = 6;
                                            act.periode = "PM";
                                            act.id = Math.random();
                                            act.activite_type = {color : e.color};
                                            this.state.userActivites.push(act);
                                            this.setState({userActivites:this.state.userActivites})
                                            this.setState({
                                                jour:6,
                                                periode: "PM",
                                                jourMatinOuSoir:'Samedi après-midi',
                                                activity_id: e.id,
                                            })
                                        }}
                                                  onEnter={() =>
                                                  {
                                                      console.warn('babal')
                                                      this.setState({entered:true,jourMatinOuSoir:'Samedi après-midi'})
                                                  }}
                                        >
                                            <TouchableOpacity
                                                onPress={()=>{
                                                    this.setState({dragstart:false,showmodalselisteonecase:true,caseforshow:'Samedi après-midi'});
                                                    this.setState({
                                                        periode: "PM",
                                                        jour:6,
                                                    })
                                                }}
                                                style={[
                                                    {
                                                        borderRightColor: 'transparent', borderWidth: 0.5,borderTopColor:'transparent',borderBottomColor:'transparent',
                                                        minHeight: screenWidth*0.2,
                                                        backgroundColor: (this.state.jourMatinOuSoir==='Samedi après-midi' && this.state.entered  ? "#420420" : null)
                                                    },
                                                    styles.amBoxjrsSemaine
                                                ]}
                                            >
                                                <View >
                                                    {
                                                        this.userActiviteSamediPmMap(this.state.userActivites)
                                                    }
                                                </View>
                                            </TouchableOpacity>
                                        </DropZone>

                                        <DropZone onDrop={e => {
                                            this.setState({ backcolordraggedItem:e.color });
                                            this.setState({  titredraggedItem:e.name});
                                            this.setState({showpickerhourPM:true,refreshing:false});
                                            this.setState({
                                                hour1:0,
                                                hour2:0,
                                                minute1:0,
                                                minute2:0
                                            });
                                            let act = {};
                                            act.jour = 7;
                                            act.periode = "PM";
                                            act.id = Math.random();
                                            act.activite_type = {color : e.color};
                                            this.state.userActivites.push(act);
                                            this.setState({userActivites:this.state.userActivites})
                                            this.setState({
                                                jour:7,
                                                periode: "PM",
                                                activity_id: e.id,
                                                jourMatinOuSoir:'Dimanche après-midi'

                                                })

                                            }}
                                             onEnter={() =>
                                                  {
                                                      console.warn('babal')
                                                      this.setState({entered:true,jourMatinOuSoir:'Dimanche après-midi'})
                                                  }}
                                        >


                                            <TouchableOpacity
                                                onPress={()=>{
                                                    this.setState({dragstart:false,showmodalselisteonecase:true,caseforshow:'Dimanche après-midi'});
                                                    this.setState({
                                                        periode: "PM",
                                                        jour:7,
                                                    })
                                                }}
                                                style={[
                                                    {
                                                        borderRightColor: colors.white, borderWidth: 0.5,borderTopColor:'transparent',borderBottomColor:'transparent',
                                                        borderLeftColor:'white',
                                                        minHeight: screenWidth*0.2,
                                                        backgroundColor: (this.state.jourMatinOuSoir==='Dimanche après-midi' && this.state.entered  ? "#420420" : null)
                                                    },
                                                    styles.amBoxjrsSemaine
                                                ]}
                                            >

                                                <View >

                                                    {
                                                        this.userActiviteDimanchePmMap(this.state.userActivites)
                                                    }
                                                </View>
                                            </TouchableOpacity>
                                        </DropZone>
                                    </View>
                                </View>
                                    <View style={
                                        // [styles.btnAddActivites,
                                        {width:screenWidth*0.8,alignSelf:'center'}
                                        // ]
                                    }><Text style={[styles.textAddActivites,{flexWrap:'wrap',textAlign:'center',marginBottom:7}]} >Faîtes glisser les activités ci-dessous directement dans le calendrier</Text>
                                    </View>
                                <View
                                    style={{
                                        flexDirection: "row",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        flexWrap: "wrap"
                                    }}
                                >
                                    {    this.state.listActivites.map((value,
                                                                       //viewProps,
                                                                       key) => {
                                        return (
                                            <Draggable
                                                key={'value'+value.id}
                                                data={value}
                                                // payload={value}
                                                // onDragStart={() => {
                                                //     //   this.refs._scrollView.setNativeProps({ scrollEnabled: false });
                                                //     this.setState({ dragstart:true });
                                                //     this.setState({ backcolordraggedItem:value.color });
                                                //     this.setState({  titredraggedItem:value.name});
                                                // }}
                                                // onDragEnd={() => {
                                                //     this.setState({ dragstart:false });
                                                // }}
                                            >

                                                <DraggyInner
                                                    alphabet={value}
                                                    index={key}
                                                />
                                            </Draggable>

                                        )
                                    })
                                    }
                                </View>
                                <View style={{ alignItems: "center" }}>

                                    <MAAButton text="SUIVANT" width={(screenWidth - 100)} height={40}
                                               style={{
                                                   marginTop: 5
                                               }}
                                               onPress={async() => {
                                                   //
                                                   if(!this.props.depuiscalendarforplanning){
                                                       const setActiveFPAction = { type: SET_ACTIVE_FP, value: 4 };
                                                       this.props.dispatch(setActiveFPAction)
                                                       console.warn('bob');
                                                       const setActive = { type: SET_ACTIVE_TABMENU_CARNET, value: 1 };
                                                       await this.props.dispatch(setActive);
                                                       if(global.is_venudedonneperso === true) {
                                                           const setActiveTab = {type: SET_ACTIVE_TAB, value: "Carnet"};
                                                           this.props.dispatch(setActiveTab);
                                                           this.props.navigation.navigate('LogedinNavigator');
                                                       }else{
                                                           this.props.navigation.navigate("Carnet");
                                                       }
                                                   }else{
                                                       this.setState({refreshing:true});
                                                       const set = { type: SET_DEPUIS_CALENDAR, value: false };
                                                       this.props.dispatch(set);
                                                       getDashboar(dashboardHelper,this.props).then(()=>{
                                                           this.setState({refreshing:false})
                                                       })
                                                           const setActiveTab = { type: SET_ACTIVE_TAB, value: "home" }
                                                           this.props.dispatch(setActiveTab);

                                                   }
                                               }}
                                    />
                                    <MAAButton text="MON PROFIL" width={(screenWidth - 100)} height={40}
                                               style={{
                                                   backgroundColor: "transparent", borderColor: colors.white,
                                                   marginTop: 5,
                                                   borderWidth: 1,
                                               }}
                                               onPress={() => {
                                                   if( global.is_venudedonneperso === true) {
                                                       const setActiveTab = {type: SET_ACTIVE_TAB, value: "profile"};
                                                       this.props.dispatch(setActiveTab);
                                                   }else{
                                                       this.props.navigation.popToTop()
                                                   }
                                               }}
                                    />
                                </View>
                            </View>
                        </View>
                    </ScrollView>
                </LinearGradient>

                {this.showlisteonecase(listeonecase)}

                {
                    this._showEvenement()

                }
                {
                    this._showEvenementPM()

                }
            </DragContainer>
        );
    }
    showsuppr(){
        console.warn('affiché v')
        return(
            <ConfirmDialog
                visible={this.state.showModalVoulezvousVraimentSupprimer}
                title="Suppression"
                message="Voulez-vous vraiment supprimer cette activité?"
                onTouchOutside={() => this.setState({showModalVoulezvousVraimentSupprimer: false})}
                positiveButton={{
                    title: "Oui",
                    onPress: () => this.supprItem()
                }}
                negativeButton={{
                    title: "Non",
                    onPress: () =>  this.setState({showModalVoulezvousVraimentSupprimer: false})
                }}
            />
        )
    }
    showlisteonecase(listeonecase){
        return(
            <Modal
                visible={this.state.showmodalselisteonecase}
                onRequestClose={() => {
                    this.setState({ showmodalselisteonecase: false })
                }}
                transparent={true}
            ><TouchableOpacity
                onPress={() => {
                    this.setState({ showmodalselisteonecase: false })
                }}
                style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: screenWidth,
                    height: screenHeight,
                    zIndex: 0,
                    backgroundColor: "rgba(0,0,0,0.65)",
                }}
            >
            </TouchableOpacity>
                <View style={{width:screenWidth-60, alignSelf:'center'}}>
                    <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }} colors={[colors.balck, colors.green, colors.balck]} style={{height:screenHeight-80,marginTop:40,paddingTop:17,justifyContent:'space-between',alignItems:'center'}}>
                        <Text style={{fontSize:18,color:'white',alignSelf:'center'}}>{this.state.caseforshow}</Text>
                        <ScrollView style={{width:'100%'}}>
                        {
                            listeonecase.length>0 && listeonecase.map((story, index) => {
                                    return (
                                        <HalfRedmasemaine key={'key' + index}
                                                          backgroundcolo={story.activite_type.color === 'cyan' ? '#3a81aa':story.activite_type.color === 'yellow' ? 'rgb(255,206,73)' :story.activite_type.color}
                                                          redText={
                                                              "" + story.heure_debut.substring(11, 13) + ":" +
                                                              story.heure_debut.substring(14, 16) +
                                                              " - " + story.heure_fin.substring(11, 13) + ":" +
                                                              story.heure_fin.substring(14, 16)
                                                          }
                                                          blackText={story.activite_type.name}
                                                          trash={()=>{this.trash_(story.id)}}
                                          onPress={() => {
                                              console.warn('sto',story)
                                              this.setState({ backcolordraggedItem:story.activite_type.color });
                                              this.setState({  titredraggedItem:story.activite_type.name});
                                              this.setState({idedit:story.id});
                                              this.setState({activity_id:story.activite_type.id});
                                              let min1 = 0;
                                              switch (parseInt(story.heure_debut.substring(14, 16))) {
                                                  case 0:
                                                      min1 = 0;
                                                      break;
                                                  case 15:
                                                      min1 = 1;
                                                      break;
                                                  case 30:
                                                      min1 = 2;
                                                      break;
                                                  case 45:
                                                      min1 = 3;
                                                      break;
                                                  case 60:
                                                      min1 = 4;
                                                      break;
                                              }
                                              let min2 = 0;
                                              switch (parseInt(story.heure_fin.substring(14, 16))) {
                                                  case 0:
                                                      min2 = 0;
                                                      break;
                                                  case 15:
                                                      min2 = 1;
                                                      break;
                                                  case 30:
                                                      min2 = 2;
                                                      break;
                                                  case 45:
                                                      min2 = 3;
                                                      break;
                                                  case 60:
                                                      min2 = 4;
                                                      break;
                                              }
                                              console.warn('ok ici story clické',story);
                                              let hour1 = parseInt(story.heure_debut.substring(11, 13));
                                              let hour2 = parseInt(story.heure_fin.substring(11, 13));
                                              if(this.state.periode == "PM"){
                                                  console.warn('mba hitan v ato')
                                                  switch (parseInt(story.heure_debut.substring(11, 13))){
                                                  case 14:
                                                      hour1 = 0;
                                                      break;
                                                  case 15:
                                                      hour1 = 1;
                                                      break;
                                                  case 16:
                                                      hour1 = 2;
                                                      break;
                                                  case 17:
                                                      hour1 = 3;
                                                      break;
                                                  case 18:
                                                      hour1 = 4;
                                                      break;
                                                  case 19:
                                                      hour1 = 5;
                                                      break;
                                                  case 20:
                                                      hour1 = 6;
                                                      break;
                                                  case 21:
                                                      hour1 = 7;
                                                      break;
                                                  case 22:
                                                      hour1 = 8;
                                                      break;
                                                  case 23:
                                                      hour1 = 9;
                                                      break;
                                                  case 24:
                                                      hour1 = 10;
                                                      break;
                                              }

                                                  switch (parseInt(story.heure_fin.substring(11, 13))){
                                                      case 14:
                                                          hour2 = 0;
                                                          break;
                                                      case 15:
                                                          hour2 = 1;
                                                          break;
                                                      case 16:
                                                          hour2 = 2;
                                                          break;
                                                      case 17:
                                                          hour2 = 3;
                                                          break;
                                                      case 18:
                                                          hour2 = 4;
                                                          break;
                                                      case 19:
                                                          hour2 = 5;
                                                          break;
                                                      case 20:
                                                          hour2 = 6;
                                                          break;
                                                      case 21:
                                                          hour2 = 7;
                                                          break;
                                                      case 22:
                                                          hour2 = 8;
                                                          break;
                                                      case 23:
                                                          hour2 = 9;
                                                          break;
                                                      case 24:
                                                          hour2 = 10;
                                                          break;
                                                  }
                                              }else{
                                                      switch (parseInt(story.heure_debut.substring(11, 13))){
                                                          case 1:
                                                              hour1 = 0;
                                                              break;
                                                          case 2:
                                                              hour1 = 1;
                                                              break;
                                                          case 3:
                                                              hour1 = 2;
                                                              break;
                                                          case 4:
                                                              hour1 = 3;
                                                              break;
                                                          case 5:
                                                              hour1 = 4;
                                                              break;
                                                          case 6:
                                                              hour1 = 5;
                                                              break;
                                                          case 7:
                                                              hour1 = 6;
                                                              break;
                                                          case 8:
                                                              hour1 = 7;
                                                              break;
                                                          case 9:
                                                              hour1 = 8;
                                                              break;
                                                          case 10:
                                                              hour1 = 9;
                                                              break;
                                                          case 11:
                                                              hour1 = 10;
                                                              break;
                                                          case 12:
                                                              hour1 = 11;
                                                              break;
                                                          case 13:
                                                              hour1 = 12;
                                                              break;
                                                      }

                                                  switch (parseInt(story.heure_fin.substring(11, 13))){
                                                      case 1:
                                                          hour2 = 0;
                                                          break;
                                                      case 2:
                                                          hour2 = 1;
                                                          break;
                                                      case 3:
                                                          hour2 = 2;
                                                          break;
                                                      case 4:
                                                          hour2 = 3;
                                                          break;
                                                      case 5:
                                                          hour2 = 4;
                                                          break;
                                                      case 6:
                                                          hour1 = 5;
                                                          break;
                                                      case 7:
                                                          hour2 = 6;
                                                          break;
                                                      case 8:
                                                          hour2 = 7;
                                                          break;
                                                      case 9:
                                                          hour2 = 8;
                                                          break;
                                                      case 10:
                                                          hour2 = 9;
                                                          break;
                                                      case 11:
                                                          hour2 = 10;
                                                          break;
                                                      case 12:
                                                          hour2 = 11;
                                                          break;
                                                      case 13:
                                                          hour2 = 12;
                                                          break;
                                                  }

                                              }
                                              this.setState({
                                                  hour1:hour1,
                                                  hour2:hour2,
                                                  minute1:min1,
                                                  minute2:min2
                                              });
                                              if(this.state.periode ==="AM"){
                                                  this.setState({showpickerhour:true});
                                              }else if(this.state.periode ==="PM"){
                                                  this.setState({showpickerhourPM:true});
                                              }
                                              this.setState({showmodalselisteonecase:false});
                                          }}/>
                                     )

                            })
                        }
                        </ScrollView>
                        <View style={{marginBottom:20}}>
                        <MAAButton text="Fermer" width={(screenWidth - 200)} height={40}
                                   style={{
                                       marginTop: 5,
                                   }}
                                   onPress={async() => {
                                       this.setState({ showmodalselisteonecase: false })
                                   }}
                        /></View>
                        </LinearGradient>
                </View>
            </Modal>
        )
    }
}

const mapStateToProps = (state) => {
    const { listeActivitesProgram, popToTop,listActivites,userToken,reduxparamforcalendar,isFichePedag,depuiscalendarforplanning } = state.statedata
    return { listeActivitesProgram, popToTop,listActivites,userToken,reduxparamforcalendar,isFichePedag,depuiscalendarforplanning }
};
export default connect(mapStateToProps)(Masemaine);
