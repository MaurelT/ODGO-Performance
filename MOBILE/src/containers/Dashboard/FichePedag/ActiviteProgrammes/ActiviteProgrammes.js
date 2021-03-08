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
    RefreshControl, Modal, Animated,
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
    SET_ACTIVE_TAB
} from '../../../../redux/types/tabTypes';
import { backgroundColor } from '../../../../components/react-native-calendars/src/style';
// import EvenementNewSlider from "../Evenement/EvenementNewSlider"
import EvenementForActivityProgrammes from "../Evenement/EvenementForActivityProgrammes"
import hydratationHelper from "../../../../apis/helpers/hydratation_helper";
import calendarEventHelper from "../../../../apis/helpers/calendarEvent_helper";
import moment from "moment";
import {createDndContext} from 'react-native-easy-dnd';
import PersonalDataHelper from '../../../../apis/helpers/person_data_helper';
import statusBarHeight from "../../../../configs/screen";
import {getDashboar} from '../../../../apis/FonctionRedondant';
import dashboardHelper from '../../../../apis/helpers/dashboard_helper';
import {ConfirmDialog} from 'react-native-simple-dialogs';

const screen = Dimensions.get('screen');
const SBHelight = statusBarHeight;
const screenWidth = screen.width
const screenHeight = screen.height - SBHelight;
const { Provider, Droppable } = createDndContext();



// class MyDropZoneContent extends React.Component {
//
//     constructor(props) {
//         super(props);
//         this.state = {
//             refreshing: false,
//             listActivites: [],
//             userToken:props.userToken,
//              getEventByDay:null,
//             year:null,
//             _listeActivitesProgram:[],
//             showModalVoulezvousVraimentSupprimer:false,
//             itemPressed:null,
//             bgcolorforaddeventactivity:null,
//             titleeventforaddeventactivity:null,
//         }
//     }
//
//
//     onDelete(e) {
//         let data = this.state.alphabets || [];
//         let alphabets = data.map((item, i) => {
//             if (e.id === item.id) {
//                 return { id: e.id, data: "" };
//             } else {
//                 return item;
//             }
//         });
//         this.setState({ alphabets });
//     }
//
//
//     componentDidMount() {
//         this.getEventByDay();
//         this.getListTypesActivities().then(()=>{
//             console.warn('ato ve',this.state.listActivites)
//             this.nbrAct=this.state.listActivites.length;
//             this.nbrRowsActivites=Math.floor(this.nbrAct/4)
//             this.nbrColsResteActivites= this.nbrAct-(this.nbrRowsActivites*4)
//         });
//
//     }
//
//     getListTypesActivities = async () => {
//         this.setState({ refreshing: true });
//         const listTypeActivities = await PersonalDataHelper.getListTypesActivities(this.props.userToken);
//         this.setState({ listActivites: listTypeActivities.data });
//         this.setState({ refreshing: false })
//         console.warn('vita',listTypeActivities)
//     };
//
//
//     getEventByDay = async () => {
//         this.setState({refreshing: true});
//         let year
//         let month
//         let day
//         if(this.props.reduxparamforcalendar){
//             year = this.props.reduxparamforcalendar.year;
//             this.setState({year:year})
//             month = this.props.reduxparamforcalendar.month;
//             day = this.props.reduxparamforcalendar.day;
//         }else{
//             year = this.props.year;
//             this.setState({year:year})
//             month = this.props.month;
//             day = this.props.day;
//         }
//
//         const getEventByDay = await calendarEventHelper.getEventCalendarByDay(this.state.userToken,year,month,day);
//         if (getEventByDay) {
//             if(getEventByDay.success == true) {
//                 let localarray=[];
//                 for(let i=0; i<getEventByDay.data.length; i++)
//                 {
//                     let _format = {
//                         id:getEventByDay.data[i].id,
//                         title:getEventByDay.data[i].activite_type.name,
//                         heure_debut:moment(getEventByDay.data[i].heure_debut).format('H:mm'),
//                         heure_fin:moment(getEventByDay.data[i].heure_fin).format('H:mm'),
//                         bgColor:getEventByDay.data[i].activite_type.color,
//                     };
//                     this.state._listeActivitesProgram.push(_format)
//                     localarray.push(_format)
//                 }
//                 const listeActivitesProgram_ = { type: SET_LISTE_ACTIVITE_PROGRAM, value: localarray }
//                 this.props.dispatch(listeActivitesProgram_);
//                 this.setState({refreshing: false,getEventByDay:getEventByDay})
//
//             } else {
//                 this.setState({refreshing: false}) //na goback
//             }
//         }
//     };
//
//     componentWillReceiveProps({ dragOver }) {
//         if (dragOver !== this.props.dragOver) LayoutAnimation.easeInEaseOut();
//     }
//
//
//     render() {
//         return (
//
//         );
//     }
// }




class DraggyInner extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        if (this.props.dragOver && !this.props.ghost && !this.props.dragging) {
            LayoutAnimation.easeInEaseOut();
            return (
                //
                <View
                    style={{
                        width: this.props.dragOver ? 110 : 100,
                        alignItems: "center",
                        justifyContent: "center",
                        height: this.props.dragOver ? 110 : 100,
                        backgroundColor: "rgba(255,0,0,.7)"
                    }}
                >
                    <TouchableOpacity
                        style={[styles.rowBoxActivites, this.props.alphabet.color ==='yellow' ? {backgroundColor:colors.yellowbox} :{backgroundColor:this.props.alphabet.color ==='cyan'? '#3a81aa':this.props.alphabet.color}]}>
                        <Text style={[styles.textActivites,{paddingHorizontal:3}]} >{this.props.alphabet.name}</Text>
                    </TouchableOpacity>
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
                        } :{
                            backgroundColor:this.props.alphabet.color ==='cyan'? '#3a81aa':this.props.alphabet.color,
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




class ActiviteProgrammes extends Component {

    constructor(props) {
        super(props);
        this.onDelete = this.onDelete.bind(this);

        this.state={
            showpickerhour:false,
            listActivites:[],
            addEventActivity:false,
            refreshing:false,
           // userToken:props.userToken,
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
            hour1:1,
            hour2:1,
            minute1:0,
            minute2:0,

            //nouveau
            hoverData: {},
            dropData: {},
            hoverDataIndex: null,

            activity_id: 0,
            venudemodifier:false,

            hourforsort:null,
            hourforswiper2:null,
            minuteforswiper1 :null,
            minuteforswiper2 :null,

            idamodifier:0,
        };

        this.increRowsActus=0
        this.nbrAct=this.props.listActivites.length
        this.nbrRowsActivites=Math.floor(this.nbrAct/4)
        this.nbrColsResteActivites= this.nbrAct-(this.nbrRowsActivites*4)
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


    componentDidMount() {

        this.getEventByDay();
        this.getListTypesActivities().then(()=>{
            console.warn('ato ve',this.state.listActivites)
            this.nbrAct=this.state.listActivites.length;
            this.nbrRowsActivites=Math.floor(this.nbrAct/4)
            this.nbrColsResteActivites= this.nbrAct-(this.nbrRowsActivites*4)
        });
    }

    getListTypesActivities = async () => {
        this.setState({ refreshing: true });
        const listTypeActivities = await PersonalDataHelper.getListTypesActivities(this.props.userToken);
        this.setState({ listActivites: listTypeActivities.data });
        this.setState({ refreshing: false })
    };

    supprItem = async () => {
        this.setState({refreshing: true});
        console.warn('mahz token v',this.state.itemPressed)
        const supprItem = await calendarEventHelper.supprItem(this.props.userToken,this.state.itemPressed);
        if (supprItem) {
            this.getEventByDay()
            this.setState({refreshing: false,showModalVoulezvousVraimentSupprimer:false});
        }
    };




    getEventByDay = async () => {
        this.setState({refreshing: true});
        let year
        let month
        let day
        if(this.props.reduxparamforcalendar){
            year = this.props.reduxparamforcalendar.year;
            this.setState({year:year,month:this.props.reduxparamforcalendar.month,day:this.props.reduxparamforcalendar.day})
            month = this.props.reduxparamforcalendar.month;
            day = this.props.reduxparamforcalendar.day;
        }else{
            year = this.props.navigation.state.params.year;
            this.setState({year:year,month:this.props.navigation.state.params.month,day:this.props.navigation.state.params.day})
            month = this.props.navigation.state.params.month;
            day = this.props.navigation.state.params.day;
        }

        const getEventByDay = await calendarEventHelper.getEventCalendarByDay(this.props.userToken,year,month,day);
        if (getEventByDay) {
            if(getEventByDay.success == true) {
                let localarray=[];
                for(let i=0; i<getEventByDay.data.length; i++)
                {
                    let _format = {
                        id:getEventByDay.data[i].id,
                        activite_type: getEventByDay.data[i].activite_type.id,
                        title:getEventByDay.data[i].activite_type.name,
                        heure_debut:(moment(getEventByDay.data[i].heure_debut).format('H:mm')),
                        heure_fin:moment(getEventByDay.data[i].heure_fin).format('H:mm'),
                        bgColor:getEventByDay.data[i].activite_type.color,
                        timestartforsort:moment(getEventByDay.data[i].heure_debut).format('H:mm:ss'),
                        hourforsort:moment(getEventByDay.data[i].heure_debut).format('H'), //hourforswiper1
                        hourforswiper2:moment(getEventByDay.data[i].heure_fin).format('H'),
                        minuteforswiper1 :moment(getEventByDay.data[i].heure_debut).format('mm'),
                        minuteforswiper2 :moment(getEventByDay.data[i].heure_fin).format('mm'),
                    };
                    this.state._listeActivitesProgram.push(_format);
                    localarray.push(_format)
                }

                localarray.sort(function (a, b) {
                    return a.timestartforsort.localeCompare(b.timestartforsort);//arrenge by time
                });

                let newarrayarrenged = []; //suite arrenge by time
                if(localarray[0].hourforsort.length ===2) {
                    let split = 0;
                    for (let i = 0; i < localarray.length; i++) {
                        if (localarray[i].hourforsort.length == 1) {
                            split = i;
                            break;
                        }
                    }
                    let part2 = localarray.slice(0,split);
                    let part1 = localarray.slice(split,localarray.length);
                    newarrayarrenged = part1.concat(part2);
                }

                if(newarrayarrenged.length>0){
                    const listeActivitesProgram_ = { type: SET_LISTE_ACTIVITE_PROGRAM, value: newarrayarrenged };
                    this.props.dispatch(listeActivitesProgram_);
                }else{
                    const listeActivitesProgram_ = { type: SET_LISTE_ACTIVITE_PROGRAM, value: localarray };
                    this.props.dispatch(listeActivitesProgram_);
                }

                this.setState({refreshing: false,getEventByDay:getEventByDay})

            } else {
                this.setState({refreshing: false}) //na goback
            }
        }
    };


    _localday(){
        switch (
            //  moment(this.state.getEventByDay.data[0].date).days()
            moment(this.props.reduxparamforcalendar.dateString).day()
            ) {
            case 0:
                return 'Dimanche';
                break;
            case 1:
                return 'Lundi';
                break;
            case 2:
                return 'Mardi';
                break;
            case 3:
                return 'Mercredi';
                break;
            case 4:
                return 'Jeudi';
                break;
            case 5:
                return 'Vendredi';
                break;
            case 6:
                return 'Samedi';
                break;
            default:
                return null;
        }

    }

    _localmonth(){
        // let month= moment(
        //      this.state.getEventByDay.data[0].date
        //  ).month();
        let month = moment(this.props.reduxparamforcalendar.dateString).month()
        switch (month) {
            case 0:
                return 'Janvier';
                break;
            case 1:
                return 'Février';
                break;
            case 2:
                return 'Mars';
                break;
            case 3:
                return 'Avril';
                break;
            case 4:
                return 'Mai';
                break;
            case 5:
                return 'Juin';
                break;
            case 6:
                return 'Juillet';
                break;
            case 7:
                return 'Août';
                break;
            case 8:
                return 'Septembre';
                break;
            case 9:
                return 'Octobre';
                break;
            case 10:
                return 'Novembre';
                break;
            case 11:
                return 'Décembre';
                break;

            default:
                return null;
        }
    }


    componentWillUnmount(){
        const setActiveFPAction = {type: SET_ACTIVE_FP, value: 0}
        this.props.dispatch(setActiveFPAction)
    }

    _initaddEventActivity=()=>
    {
        this.postEvent();
    };

    _hidePickerhour=()=>{
        this.setState({showpickerhour:false})
    };

    postEvent = async () => {

        this.setState({refreshing: true});


        let _translateminute1 = (this.state.hour1 * 60) + this.state.minute1;
        let _translateminute2 = (this.state.hour2 * 60) + this.state.minute2;
        let allowpost = _translateminute2 - _translateminute1;
        console.warn(allowpost,'hour1,',this.state.hour1,'hour2',this.state.hour2,'min1',this.state.minute1,'min2',this.state.minute2)

        if (allowpost <= 0) {
            Alert.alert('Odgo', 'Merci de vérifier les horaires que vous avez insérés !')
        } else {
            let year
            let month
            let day
            if (this.props.reduxparamforcalendar) {
                year = this.props.reduxparamforcalendar.year;
                month = this.props.reduxparamforcalendar.month;
                day = this.props.reduxparamforcalendar.day;
            } else {
                year = this.props.navigation.state.params.year;
                month = this.props.navigation.state.params.month;
                day = this.props.navigation.state.params.day;
            }
            let post = {
                date: year + '-' + month + '-' + day,
                activity_id: this.state.activity_id,
                heure_debut: this.state.hour1.toString().padStart(2, '0') + ':' + this.state.minute1.toString().padStart(2, '0'),
                heure_fin: this.state.hour2.toString().padStart(2, '0') + ':' + this.state.minute2.toString().padStart(2, '0'),
            };
            if(this.state.venudemodifier === true){
                const editEvent = await calendarEventHelper.putEditEventActiviteProgrammes(this.props.userToken, post,this.state.idamodifier);
                if (editEvent) {
                    this.setState({showpickerhour: false});
                    this.getEventByDay();
                    this.setState({refreshing: false});
                }
            }else {
                const addEvent = await calendarEventHelper.postEventActiviteProgrammes(this.props.userToken, post);
                if (addEvent) {
                    this.setState({showpickerhour: false})
                    this.getEventByDay();
                    this.setState({refreshing: false});
                }
            }
        }
    };

    _showEvenement=()=>
    {
        if(this.state.showpickerhour==true)
        {
            return (
                <EvenementForActivityProgrammes
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

                    venudemodifier = {this.state.venudemodifier}

                    paramforswipe = {{hourforswiper1 : this.state.hourforsort,
                        hourforswiper2 : this.state.hourforswiper2,
                        minuteforswiper1: this.state.minuteforswiper1,
                        minuteforswiper2:this.state.minuteforswiper2}}

                    training={this.state.titleeventforaddeventactivity}

                    backcolordraggedItem={this.state.bgcolorforaddeventactivity}

                />
            )
        }else
        {
            return null
        }
    };


    componentWillReceiveProps({ dragOver }) {
        if (dragOver !== this.props.dragOver) LayoutAnimation.easeInEaseOut();
    }

    render() {

        console.warn('showpickerhour',this.state.showpickerhour)
        return (
            <DragContainer
                onDragStart={()=>{
                    console.warn('dragstar')
                }}
            >
                <LinearGradient
                    start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }} colors={[colors.balck, colors.green, colors.balck]} style={baseStyles.linearGradient}>

                    <View style={{ alignItems :"center",justifyContent:"center",width:"100%",marginTop:15  }}>
                        <TouchableOpacity
                            onPress={()=>{
                                console.warn(this.props.reduxparamforcalendar.from)
                                if(this.props.reduxparamforcalendar.from =="dashboard"){
                                    const setActiveTab = { type: SET_ACTIVE_TAB, value: "home" }
                                    this.props.dispatch(setActiveTab)
                                }else{
                                    const setActiveTab = { type: SET_ACTIVE_TAB, value: "calendartopright" }
                                    this.props.dispatch(setActiveTab)
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
                        <Text style={[baseStyles.titleText,{textAlign:"center",fontSize: 14,}]}>
                            { this._localmonth() + ' '}{this.state.year}
                        </Text>
                    </View>
                    <View style={styles.bodyActivitesProgram}>
                        <Text style={[styles.textDescription,{alignSelf:'center'}]}>
                            { this._localday() + ' '}
                            {
                                // moment(this.state.getEventByDay.data[0].date).format('DD ')
                                this.props.reduxparamforcalendar.day.toString().padStart(2,'0')+' '
                            }
                            { this._localmonth() + ' '}
                        </Text>
                        { this.props.listeActivitesProgram.length <= 1 && <View style={this.props.listeActivitesProgram.length ===1 ? {position:'absolute',top:screenHeight*0.3} :{position:'absolute',top:screenHeight*0.2}}><Text style={{color:'#385647',fontSize:16}}>Glissez un événement ici.</Text></View>}
                        <View  style={[styles.panelListProgram]}>
                            <DropZone onDrop={e => {
                                this.setState({ bgcolorforaddeventactivity:e.color });
                                this.setState({  titleeventforaddeventactivity:e.name});
                                this.setState({  activity_id:e.id});
                                this.setState({showpickerhour:true,venudemodifier:false})
                            }}
                                      onEnter={() =>
                                      {
                                          console.warn('babal')
                                      }}
                            >
                                <View
                                    style={[styles.scrollView,this.props.listeActivitesProgram.length > 1 ? null :{height:screenHeight*0.7}]}
                                >
                                    <FlatList
                                        data={this.props.listeActivitesProgram }
                                        keyExtractor={(item,index)=>index.toString()}
                                        renderItem={
                                            ({item}) =>
                                                {
                                                    return(<View style={styles.itemProgramAct}>
                                                    <View style={styles.panelHeure}>
                                                        <Text style={styles.textHeure}>{item.heure_debut}</Text>
                                                        <View style={styles.barrHeure}></View>
                                                    </View>
                                                    <View style={[styles.boxProgram,item.bgColor ==='yellow' ? {backgroundColor:colors.yellowbox} : {backgroundColor:item.bgColor ==='cyan'? '#3a81aa':item.bgColor}]}>
                                                        <Text style={styles.titleActivitesProg} >{item.title}</Text>
                                                        <View style={styles.panelmodifSupAct} >

                                                            {item.id && <TouchableOpacity
                                                                onPress={()=> {
                                                                    this.setState({ bgcolorforaddeventactivity:item.bgColor });
                                                                    this.setState({  titleeventforaddeventactivity:item.title});
                                                                    this.setState({  activity_id:item.activite_type, idamodifier:item.id});
                                                                    this.setState({
                                                                        hourforsort:item.hourforsort,
                                                                        hourforswiper2:item.hourforswiper2,
                                                                        minuteforswiper1: item.minuteforswiper1,
                                                                        minuteforswiper2 : item.minuteforswiper2
                                                                    });
                                                                    this.setState({showpickerhour : true ,venudemodifier:true});
                                                                }}
                                                            >
                                                                <Text style={{color:colors.white,fontSize:14,marginRight:screenWidth*0.04}}>Modifier</Text>
                                                            </TouchableOpacity>}
                                                            {item.id && <TouchableOpacity
                                                                onPress={()=> {
                                                                    this.setState({showModalVoulezvousVraimentSupprimer:true})
                                                                    this.setState({itemPressed:item.id})
                                                                }}
                                                            >
                                                                <AutoHeightImage
                                                                    width={screenWidth*0.04}
                                                                    source={require("../../../../assets/icons/delete_programme.png")}
                                                                    style={{
                                                                        left:-screenWidth*0.03
                                                                    }} />
                                                            </TouchableOpacity>}

                                                        </View>
                                                    </View>
                                                    <View style={[styles.panelHeure,{marginBottom:10}]}>
                                                        <Text style={styles.textHeure}>{item.heure_fin}</Text>
                                                        {/*<View style={styles.barrHeure}></View>*/}
                                                    </View>
                                                </View>)}
                                        }
                                        // onEndReachedThreshold={0.5}
                                    />
                                </View>
                            </DropZone>
                        </View>
                    </View>
                    <View style={[styles.btnAddActivites,{marginTop:-screenHeight*0.038}]} >
                        <Text style={styles.textAddActivites} >Ajoutez un nouvel événement</Text>
                    </View>
                    <ScrollView
                        // directionalLockEnabled={false}
                        horizontal={true}
                    >{
                        this.state.listActivites.length>0 && this.state.listActivites.map((value,key) => {
                                return (
                                    <Draggable
                                        data={value}
                                    >
                                        {/*<DropZone*/}
                                        {/*    //disabled*/}
                                        {/*    onEnter={() =>*/}
                                        {/*       {*/}
                                        {/*           console.warn('bob',value)*/}
                                        {/*            this.setState({ bgcolorforaddeventactivity:value.color });*/}
                                        {/*            this.setState({  titleeventforaddeventactivity:value.name});*/}
                                        {/*            this.setState({  activity_id:value.id});*/}
                                        {/*       }*/}
                                        {/*    }*/}
                                        {/*>*/}
                                        <DraggyInner
                                            alphabet={value}
                                            index={key}
                                        />
                                        {/*</DropZone>*/}
                                    </Draggable>
                                );
                            }
                        )
                    }
                    </ScrollView>
                    {this._showEvenement()}
                    {this.showsuppr()}
                    {/*<Modal*/}
                    {/*    visible={this.state.showModalVoulezvousVraimentSupprimer}*/}
                    {/*    onRequestClose={() => {*/}
                    {/*        this.setState({ showModalVoulezvousVraimentSupprimer: false })*/}
                    {/*    }}*/}
                    {/*    transparent={true}*/}
                    {/*><TouchableOpacity*/}
                    {/*    onPress={() => {*/}
                    {/*        this.setState({ showModalVoulezvousVraimentSupprimer: false })*/}
                    {/*    }}*/}
                    {/*    style={{*/}
                    {/*        position: "absolute",*/}
                    {/*        top: 0,*/}
                    {/*        left: 0,*/}
                    {/*        width: screenWidth,*/}
                    {/*        height: screenHeight,*/}
                    {/*        zIndex: 0*/}
                    {/*    }}*/}
                    {/*>*/}
                    {/*</TouchableOpacity>*/}
                    {/*    <View style={{*/}
                    {/*        // marginTop: 20,*/}
                    {/*        paddingTop:10,*/}
                    {/*        paddingBottom:10,*/}
                    {/*        paddingHorizontal:10,*/}
                    {/*        borderRadius: 5,*/}
                    {/*        alignSelf: "center",*/}
                    {/*        backgroundColor: colors.white,*/}
                    {/*        transform:[{translateY:(screenHeight/2)}],*/}
                    {/*    }}>*/}
                    {/*        <Text style={{color:colors.red,marginBottom:7}}>Voulez-vous vraiment supprimer ?</Text>*/}
                    {/*        <View style={{flexDirection:'row',justifyContent:'center'}}>*/}
                    {/*            <TouchableOpacity onPress={()=>{this.supprItem()}} style={{alignItems:'center',width:80,paddingVertical:5,backgroundColor:colors.red,marginRight:10,borderRadius:4}}><Text style={{color:'white'}}>Oui</Text></TouchableOpacity>*/}
                    {/*            <TouchableOpacity  onPress={()=>{ this.setState({ showModalVoulezvousVraimentSupprimer: false }) }} style={{alignItems:'center',width:90,paddingVertical:5,backgroundColor:colors.red,marginRight:10,borderRadius:4}}><Text style={{color:'white'}}>Non</Text></TouchableOpacity>*/}
                    {/*        </View>*/}
                    {/*    </View>*/}
                    {/*</Modal>*/}
                </LinearGradient>
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
}

const mapStateToProps = (state) => {
    const { listeActivitesProgram, popToTop,listActivites,userToken,reduxparamforcalendar } = state.statedata
    return { listeActivitesProgram, popToTop,listActivites,userToken,reduxparamforcalendar }
};
export default connect(mapStateToProps)(ActiviteProgrammes);
