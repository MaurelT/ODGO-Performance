import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    Dimensions,
    StatusBar,
    TouchableOpacity,
    ScrollView,
    View,
    Text,
    RefreshControl,
    Animated,
    Alert
} from 'react-native';
import AutoHeightImage from 'react-native-auto-height-image';
import LinearGradient from 'react-native-linear-gradient';
import colors from '../../../../configs/colors';
import baseStyles from '../../../../base/BaseStyles';
import styles from './styles';
import {SET_ACTIVE_FP, SET_ACTIVE_TAB} from '../../../../redux/types/tabTypes';
import { backgroundColor } from '../../../../components/react-native-calendars/src/style';
import PersonalDataHelper from '../../../../apis/helpers/person_data_helper';
import AsyncStorage from '@react-native-community/async-storage';
import { createDndContext } from "react-native-easy-dnd";
import Evenement from "../Evenement/Evenement";
import EvenementPM from "../Evenement/EvenementPM";
import calendarEventHelper from "../../../../apis/helpers/calendarEvent_helper";
import MAAButton from "../../../../components/MAAButton/MAAButton";
import {getDashboar} from '../../../../apis/FonctionRedondant';
import dashboardHelper from '../../../../apis/helpers/dashboard_helper';

const { Provider, Droppable, Draggable } = createDndContext();
const screen = Dimensions.get('screen');
const SBHelight = StatusBar.currentHeight;
const screenWidth = screen.width
const screenHeight = screen.height - SBHelight
const widthdragtrue = screenWidth*0.24;
const widthdragfalse = screenWidth*0.25;

class Masemaine extends Component {
    listRef = React.createRef();
    constructor(props) {
        super(props)
        this.state = {
            refreshing: false,
            // listActivites:this.props.listActivites, ancienne list static avec redux
            listActivites: [],
            userActivites: [],
            userToken: "",
            showpickerhour:false,
            showpickerhourPM:false,
            titredraggedItem:'',

            //post
            jour:null,
            periode:null,
            activity_id:null,

            //swipper
            hour1:1,
            hour2:1,
            minute1:0,
            minute2:0,
            jourMatinOuSoir:null,
            dragstart:false
    };
        this.increRowsActus = 0
        this.nbrAct = this.props.listActivites.length; //initialiseko eto ihan de fahanako ao am component did mount ao
        this.nbrRowsActivites = Math.floor(this.nbrAct / 3);
        this.nbrColsResteActivites = this.nbrAct - (this.nbrRowsActivites * 3);
    }

    async componentDidMount() {
        const userToken = await AsyncStorage.getItem("userToken");
        this.setState({ userToken })
        this.getListTypesActivities()
        this.getUserActivities().then(()=>{
            this.increRowsActus = 0
            this.nbrAct = this.state.listActivites.length;
            this.nbrRowsActivites = Math.floor(this.nbrAct / 3);
            this.nbrColsResteActivites = this.nbrAct - (this.nbrRowsActivites * 3);
        });
        const setActiveFPAction = { type: SET_ACTIVE_FP, value: 3 }
        this.props.dispatch(setActiveFPAction)
    }

    componentWillUnmount() {

        const setActiveFPAction = {type: SET_ACTIVE_FP, value: null};
        this.props.dispatch(setActiveFPAction)
    }

    getListTypesActivities = async () => {
        this.setState({ refreshing: true });
        const listTypeActivities = await PersonalDataHelper.getListTypesActivities(this.state.userToken);
        this.setState({ listActivites: listTypeActivities.data });
        this.setState({ refreshing: false })
    };

    getUserActivities = async () => {
        this.setState({ refreshing: true });
        const userActivites = await PersonalDataHelper.getUserActivities(this.state.userToken);
        console.log("userActivites")
        console.log(JSON.stringify(userActivites))
        let newList = []
        userActivites.data.map((act, index) => {
            const actDate = new Date(act.heure_debut)
            const actDay = actDate.getDay()
            // console.log("actDay")
            // console.log(actDay)
            // console.log("act.periode")
            // console.log(act.periode)
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
        this.postEvent();
    };

    _hidePickerhour=()=>{
        this.setState({showpickerhour:false})
        this.setState({showpickerhourPM:false})
    };
    postEvent = async () => {

     //   this.setState({refreshing: true});
        let heure_debut = (this.state.hour1 < 10 ? '0'+this.state.hour1 : this.state.hour1) +":"+(this.state.minute1 < 10 ? '0'+this.state.minute1 : this.state.minute1);
        let heure_fin = (this.state.hour2 < 10 ? '0'+this.state.hour1 : this.state.hour2) +":"+(this.state.minute2 < 10 ? '0'+this.state.minute2 : this.state.minute2);

        let _translateminute1 =  (this.state.hour1 * 60) + this.state.minute1;
        let _translateminute2 =  (this.state.hour2 * 60) + this.state.minute2;
        let allowpost = _translateminute2 - _translateminute1;


        if (allowpost <= 0){
                Alert.alert('Odgo','Merci de vérifier les horaires que vous avez insérés !')
            }else{
                const addEvent = await calendarEventHelper.postEvent(this.state.userToken,
                    this.state.jour,
                    this.state.periode,
                    this.state.activity_id,
                    heure_debut,
                    heure_fin,
                );
                if (addEvent) {
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
            return (<Evenement onchangehour1={(hour1)=>{
                                this.setState({hour1:hour1+1})

                                }}
                               onchangehour2={(hour2)=>{
                                   this.setState({hour2:hour2+1})
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
            return (<EvenementPM onchangehour1={(hour1)=>{
                this.setState({hour1:hour1+1})

            }}
                               onchangehour2={(hour2)=>{
                                   this.setState({hour2:hour2+1})
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
        return (
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
                        />
                    }
                >

                    <View style={{
                        flexDirection: "row",
                        width: screenWidth,
                        alignItems: "center",
                        justifyContent: "space-between",
                        padding: 15,
                        paddingLeft: 0,
                        paddingRight: 0,
                    }}>
                        <TouchableOpacity style={{
                            width: 40, height: 40, alignItems: "center",
                            justifyContent: "center"
                        }}
                            onPress={() => {
                                if(this.props.navigation.goBack()){
                                    const setActiveFPAction = { type: SET_ACTIVE_FP, value: 2 }
                                    this.props.dispatch(setActiveFPAction)
                                }else{
                                    const setActiveFPAction = {type: SET_ACTIVE_FP, value: null}
                                    this.props.dispatch(setActiveFPAction)
                                    const setActiveTabAction = { type: SET_ACTIVE_TAB, value: "profile" }
                                    this.props.dispatch(setActiveTabAction)
                                }
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
                            fontSize: 20
                        }}>
                            Ma semaine type
                        </Text>
                        <TouchableOpacity style={{
                            width: 40, height: 40, alignItems: "center",
                            justifyContent: "center", opacity: 0
                        }}>
                            <AutoHeightImage
                                width={20}
                                source={require("../../../../assets/icons/arrow-white.png")}
                                style={{
                                }} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.bodyMasemaine}>
                        <Text style={styles.textDescription}>Remplissez les activités de votre semaine type (<Text style={{ fontStyle: "italic" }}>vous aurez la possibilité de modifier le tableau à tout moment</Text>)</Text>
                <Provider>
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


                                <Droppable
                                    onEnter={() => {
                                   //     console.log('Draggable entered');
                                    }}
                                    onLeave={() => {
                                   //     console.warn('Draggable left');
                                    }}
                                    onDrop={({ payload }) => {
                                        this.setState({showpickerhour:true,refreshing:false})
                                     //   console.warn('Draggable with the following payload was dropped', payload.name);
                                        let act = {};
                                        act.jour = 1;
                                        act.periode = "AM";
                                        act.id = Math.random();
                                        act.activite_type = {color : payload.color};
                                        this.state.userActivites.push(act)
                                        this.setState({userActivites:this.state.userActivites})
                                        this.setState({
                                                        jour:1,
                                                        periode: "AM",
                                                        activity_id: payload.id,
                                                        jourMatinOuSoir:'Lundi matin'
                                                        })

                                    }}
                                >
                                    {({ active, viewProps }) => {
                                        return (
                                            <Animated.View
                                                {...viewProps}
                                                style={[
                                                    {
                                                       // width: 300,
                                                       //  minHeight: screenWidth*0.2,
                                                        borderRightColor: colors.white, borderRightWidth: 0.5,
                                                        backgroundColor: active && this.state.dragstart
                                                            ? "#420420"
                                                            : null
                                                    },
                                                    viewProps.style,styles.amBoxjrsSemaine
                                                ]}
                                            >
                                <TouchableOpacity
                                    // onPress={() => { this.props.navigation.navigate("ActiviteProgrammes") }}
                                    >
                                    {
                                        this.state.userActivites.map((act, index) => {
                                            if (act.jour == 1 && act.periode == "AM") {
                                                console.log("Tracked 1")
                                                return (
                                                    <View key={"act_" + act.id} style={[styles.barrActivities, { backgroundColor: act.activite_type.color }]}>
                                                    </View>
                                                )
                                            }
                                            else {
                                                return null
                                            }
                                        })
                                    }
                                </TouchableOpacity>
                               </Animated.View>
                                            );
                                    }}
                                </Droppable>


                                <Droppable
                                    onEnter={() => {

                                    }}
                                    onLeave={() => {

                                    }}
                                    onDrop={({ payload }) => {
                                        this.setState({showpickerhour:true,refreshing:false})
                                        let act = {};
                                        act.jour = 2;
                                        act.periode = "AM";
                                        act.id = Math.random();
                                        act.activite_type = {color : payload.color};
                                        this.state.userActivites.push(act);
                                        console.warn('dropp')
                                        this.setState({userActivites:this.state.userActivites})

                                        this.setState({
                                            jour:2,
                                            periode: "AM",
                                            activity_id: payload.id,
                                            jourMatinOuSoir:'Mardi matin'
                                        })
                                    }}
                                >
                                    {({ active, viewProps }) => {
                                        return (
                                            <Animated.View
                                                {...viewProps}
                                                style={[
                                                    {
                                                        minHeight: screenWidth*0.2,
                                                        backgroundColor: active
                                                            ? "#420420"
                                                            : null
                                                    },
                                                    viewProps.style,
                                                ]}
                                            >
                                                <TouchableOpacity onPress={() => {
                                                    // this.props.navigation.navigate("ActiviteProgrammes")
                                                }} style={[styles.amBoxjrsSemaine, {
                                                    borderRightColor: colors.white,
                                                    borderRightWidth: 0.5
                                                }]}>

                                                    <View style={[styles.amBoxjrsSemaine, {
                                                        borderRightColor: colors.white,
                                                        borderRightWidth: 0.5
                                                    }]}>
                                                        {
                                                            this.state.userActivites.map((act, index) => {
                                                                if (act.jour == 2 && act.periode == "AM") {
                                                                    console.log("Tracked 2")
                                                                    return (
                                                                        <View key={"act_" + act.id}
                                                                              style={[styles.barrActivities, {backgroundColor: act.activite_type.color}]}>

                                                                        </View>
                                                                    )
                                                                } else {
                                                                    return null
                                                                }

                                                            })
                                                        }
                                                    </View>
                                                </TouchableOpacity>
                                            </Animated.View>
                                        )
                                    }}
                                </Droppable>

                                <Droppable
                                    onEnter={() => {

                                    }}
                                    onLeave={() => {

                                    }}
                                    onDrop={({ payload }) => {
                                        this.setState({showpickerhour:true,refreshing:false})

                                        let act = {};
                                        act.jour = 3;
                                        act.periode = "AM";
                                        act.id = Math.random();
                                        act.activite_type = {color : payload.color};
                                        this.state.userActivites.push(act)
                                        this.setState({userActivites:this.state.userActivites})
                                        this.setState({
                                            jour:3,
                                            periode: "AM",
                                            activity_id: payload.id,
                                            jourMatinOuSoir:'Mercredi matin'
                                        })

                                    }}
                                >
                                    {({ active, viewProps }) => {
                                        return (
                                            <Animated.View
                                                {...viewProps}
                                                style={[
                                                    {
                                                        borderRightColor: colors.white,
                                                        borderRightWidth: 0.5,
                                                        minHeight: screenWidth*0.2,
                                                        backgroundColor: active
                                                            ? "#420420"
                                                            : null
                                                    },
                                                    viewProps.style,styles.amBoxjrsSemaine


                                                ]}
                                            >
                                                <TouchableOpacity onPress={() => {
                                                    // this.props.navigation.navigate("ActiviteProgrammes")
                                                }} >
                                <View   >
                                    {
                                        this.state.userActivites.map((act, index) => {
                                            if (act.jour == 3 && act.periode == "AM") {
                                                console.log("Tracked 3")
                                                return (
                                                    <View key={"act_" + act.id} style={[styles.barrActivities, { backgroundColor: act.activite_type.color }]}>

                                                    </View>
                                                )
                                            }
                                            else {
                                                return null
                                            }

                                        })
                                    }
                                </View>
                                                </TouchableOpacity>
                                            </Animated.View>
                                        )
                                    }}
                                </Droppable>


                                <Droppable
                                    onEnter={() => {

                                    }}
                                    onLeave={() => {

                                    }}
                                    onDrop={({ payload }) => {
                                        this.setState({showpickerhour:true,refreshing:false})
                                        let act = {};
                                        act.jour = 4;
                                        act.periode = "AM";
                                        act.id = Math.random();
                                        act.activite_type = {color : payload.color};
                                        this.state.userActivites.push(act)
                                        this.setState({userActivites:this.state.userActivites})
                                        this.setState({
                                            jour:4,
                                            periode: "AM",
                                            activity_id: payload.id,
                                            jourMatinOuSoir:'Jeudi matin'
                                        })
                                    }}
                                >
                                    {({ active, viewProps }) => {
                                        return (
                                            <Animated.View
                                                {...viewProps}
                                                style={[
                                                    {
                                                       borderRightColor: colors.white, borderRightWidth: 0.5,
                                                    minHeight: screenWidth*0.2,
                                                        backgroundColor: active
                                                            ? "#420420"
                                                            : null
                                                    },
                                                    viewProps.style, styles.amBoxjrsSemaine
                                                ]}
                                            >
                                                <TouchableOpacity onPress={() => {
                                                    // this.props.navigation.navigate("ActiviteProgrammes")
                                                }} >
                                <View  >
                                    {/* <View style={[styles.barrActivities, { backgroundColor: colors.bleubox }]}>

                                    </View> */}
                                    {
                                        this.state.userActivites.map((act, index) => {
                                            if (act.jour == 4 && act.periode == "AM") {
                                                console.log("Tracked 4")
                                                return (
                                                    <View key={"act_" + act.id} style={[styles.barrActivities, { backgroundColor: act.activite_type.color }]}>

                                                    </View>
                                                )
                                            }
                                            else {
                                                return null
                                            }

                                        })
                                    }
                                </View>
                                                </TouchableOpacity>
                                            </Animated.View>
                                        )
                                    }}
                                </Droppable>

                                <Droppable
                                    onEnter={() => {

                                    }}
                                    onLeave={() => {

                                    }}
                                    onDrop={({ payload }) => {
                                        this.setState({showpickerhour:true,refreshing:false})
                                        let act = {};
                                        act.jour = 5;
                                        act.periode = "AM";
                                        act.id = Math.random();
                                        act.activite_type = {color : payload.color};
                                        this.state.userActivites.push(act)
                                        this.setState({userActivites:this.state.userActivites})
                                        this.setState({
                                            jour:5,
                                            periode: "AM",
                                            activity_id: payload.id,
                                            jourMatinOuSoir:'Vendredi matin'
                                        })
                                    }}
                                >
                                    {({ active, viewProps }) => {
                                        return (
                                            <Animated.View
                                                {...viewProps}
                                                style={[
                                                    {
                                                        borderRightColor: colors.white, borderRightWidth: 0.5,
                                                        minHeight: screenWidth*0.2,
                                                        backgroundColor: active
                                                            ? "#420420"
                                                            : null
                                                    },
                                                    viewProps.style, styles.amBoxjrsSemaine
                                                ]}
                                            >
                                                <TouchableOpacity onPress={() => {
                                                    // this.props.navigation.navigate("ActiviteProgrammes")
                                                }} >
                                <View >
                                    {/* <View style={[styles.barrActivities, { backgroundColor: colors.yellowbox }]}>

                                    </View> */}
                                    {
                                        this.state.userActivites.map((act, index) => {
                                            if (act.jour == 5 && act.periode == "AM") {
                                                console.log("Tracked 5")
                                                return (
                                                    <View key={"act_" + act.id} style={[styles.barrActivities, { backgroundColor: act.activite_type.color }]}>

                                                    </View>
                                                )
                                            }
                                            else {
                                                return null
                                            }

                                        })
                                    }
                                </View>
                            </TouchableOpacity>
                        </Animated.View>
                        )
                        }}
                    </Droppable>


                                <Droppable
                                    onEnter={() => {

                                    }}
                                    onLeave={() => {

                                    }}
                                    onDrop={({ payload }) => {
                                        this.setState({showpickerhour:true,refreshing:false})
                                        let act = {};
                                        act.jour = 6;
                                        act.periode = "AM";
                                        act.id = Math.random();
                                        act.activite_type = {color : payload.color};
                                        this.state.userActivites.push(act)
                                        this.setState({userActivites:this.state.userActivites})
                                        this.setState({
                                            jour:6,
                                            periode: "AM",
                                            activity_id: payload.id,
                                            jourMatinOuSoir:'Samedi matin'
                                        })
                                    }}
                                >
                                    {({ active, viewProps }) => {
                                        return (
                                            <Animated.View
                                                {...viewProps}
                                                style={[
                                                    {
                                                        borderRightColor: colors.white, borderRightWidth: 0.5,
                                                        minHeight: screenWidth*0.2,
                                                        backgroundColor: active
                                                            ? "#420420"
                                                            : null
                                                    },
                                                    viewProps.style, styles.amBoxjrsSemaine
                                                ]}
                                            >
                                                <TouchableOpacity onPress={() => {
                                                    // this.props.navigation.navigate("ActiviteProgrammes")
                                                }} >
                                <View   >
                                    {/* <View style={[styles.barrActivities, { backgroundColor: colors.red }]}>

                                    </View> */}
                                    {
                                        this.state.userActivites.map((act, index) => {
                                            if (act.jour == 6 && act.periode == "AM") {
                                                console.log("Tracked 6")
                                                return (
                                                    <View key={"act_" + act.id} style={[styles.barrActivities, { backgroundColor: act.activite_type.color }]}>

                                                    </View>
                                                )
                                            }
                                            else {
                                                return null
                                            }

                                        })
                                    }
                                </View>
                                                </TouchableOpacity>
                                            </Animated.View>
                                        )
                                    }}
                                </Droppable>
                                <Droppable
                                    onEnter={() => {

                                    }}
                                    onLeave={() => {

                                    }}
                                    onDrop={({ payload }) => {
                                        this.setState({showpickerhour:true,refreshing:false})
                                        let act = {};
                                        act.jour = 7;
                                        act.periode = "AM";
                                        act.id = Math.random();
                                        act.activite_type = {color : payload.color};
                                        this.state.userActivites.push(act)
                                        this.setState({userActivites:this.state.userActivites})
                                        this.setState({
                                            jour:7,
                                            periode: "AM",
                                            activity_id: payload.id,
                                            jourMatinOuSoir:'Dimanche matin'
                                        })
                                    }}
                                >
                                    {({ active, viewProps }) => {
                                        return (
                                            <Animated.View
                                                {...viewProps}
                                                style={[
                                                    {
                                                        borderRightColor: colors.white, borderRightWidth: 0.5,
                                                        minHeight: screenWidth*0.2,
                                                        backgroundColor: active
                                                            ? "#420420"
                                                            : null
                                                    },
                                                    viewProps.style, styles.amBoxjrsSemaine
                                                ]}
                                            >
                                                <TouchableOpacity onPress={() => {
                                                    // this.props.navigation.navigate("ActiviteProgrammes")
                                                }}>
                                <View >
                                    {/* <View style={[styles.barrActivitiesRemplis, { backgroundColor: colors.grisbox }]}>

                                    </View> */}
                                    {
                                        this.state.userActivites.map((act, index) => {
                                            if (act.jour == 7 && act.periode == "AM") {
                                                console.log("Tracked 0")
                                                return (
                                                    <View key={"act_" + act.id} style={[styles.barrActivities, { backgroundColor: act.activite_type.color }]}>

                                                    </View>
                                                )
                                            }
                                            else {
                                                return null
                                            }

                                        })
                                    }
                                </View>
                            </TouchableOpacity>
                        </Animated.View>
                        )
                        }}
                    </Droppable>
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

                                <Droppable
                                    onEnter={() => {

                                    }}
                                    onLeave={() => {

                                    }}
                                    onDrop={({ payload }) => {
                                        this.setState({showpickerhourPM:true,refreshing:false})
                                        let act = {};
                                        act.jour = 1;
                                        act.periode = "PM";
                                        act.id = Math.random();
                                        act.activite_type = {color : payload.color};
                                        this.state.userActivites.push(act)
                                        this.setState({userActivites:this.state.userActivites})
                                        this.setState({
                                            jour:1,
                                            periode: "PM",
                                            activity_id: payload.id,
                                            jourMatinOuSoir:'Lundi après-midi'
                                        })
                                    }}
                                >
                                    {({ active, viewProps }) => {
                                        return (
                                            <Animated.View
                                                {...viewProps}
                                                style={[
                                                    {
                                                        borderRightColor: colors.white, borderRightWidth: 0.5,
                                                        minHeight: screenWidth*0.2,
                                                        backgroundColor: active
                                                            ? "#420420"
                                                            : null
                                                    },
                                                    viewProps.style, styles.amBoxjrsSemaine
                                                ]}
                                            >
                                                <TouchableOpacity onPress={() => {
                                                    // this.props.navigation.navigate("ActiviteProgrammes")
                                                }} >
                                <View >
                                    {/* <View style={[styles.barrActivities, { backgroundColor: colors.yellowbox }]}>

                                    </View> */}
                                    {
                                        this.state.userActivites.map((act, index) => {
                                            if (act.jour == 1 && act.periode == "PM") {
                                                console.log("Tracked 1")
                                                return (
                                                    <View key={"act_" + act.id} style={[styles.barrActivities, { backgroundColor: act.activite_type.color }]}>

                                                    </View>
                                                )
                                            }
                                            else {
                                                return null
                                            }

                                        })
                                    }
                                </View>
                                                </TouchableOpacity>
                                            </Animated.View>
                                        )
                                    }}
                                </Droppable>
                                <Droppable
                                    onEnter={() => {

                                    }}
                                    onLeave={() => {

                                    }}
                                    onDrop={({ payload }) => {
                                        this.setState({showpickerhourPM:true,refreshing:false})
                                        let act = {};
                                        act.jour = 2;
                                        act.periode = "PM";
                                        act.id = Math.random();
                                        act.activite_type = {color : payload.color};
                                        this.state.userActivites.push(act)
                                        this.setState({userActivites:this.state.userActivites})
                                        this.setState({
                                            jour:2,
                                            periode: "PM",
                                            activity_id: payload.id,
                                            jourMatinOuSoir:'Mardi après-midi'
                                        })
                                    }}
                                >
                                    {({ active, viewProps }) => {
                                        return (
                                            <Animated.View
                                                {...viewProps}
                                                style={[
                                                    {
                                                        borderRightColor: colors.white, borderRightWidth: 0.5,
                                                        minHeight: screenWidth*0.2,
                                                        backgroundColor: active
                                                            ? "#420420"
                                                            : null
                                                    },
                                                    viewProps.style, styles.amBoxjrsSemaine
                                                ]}
                                            >
                                                <TouchableOpacity onPress={() => {
                                                    // this.props.navigation.navigate("ActiviteProgrammes")
                                                }} >
                                <View   >
                                    {/* <View style={[styles.barrActivities, { backgroundColor: colors.bleubox }]}>

                                    </View>
                                    <View style={[styles.barrActivities, { backgroundColor: colors.greenbox }]}>

                                    </View> */}
                                    {
                                        this.state.userActivites.map((act, index) => {
                                            if (act.jour == 2 && act.periode == "PM") {
                                                console.log("Tracked 2")
                                                return (
                                                    <View key={"act_" + act.id} style={[styles.barrActivities, { backgroundColor: act.activite_type.color }]}>

                                                    </View>
                                                )
                                            }
                                            else {
                                                return null
                                            }

                                        })
                                    }
                                </View>
                            </TouchableOpacity>
                        </Animated.View>
                        )
                        }}
                    </Droppable>
                                <Droppable
                                    onEnter={() => {

                                    }}
                                    onLeave={() => {

                                    }}
                                    onDrop={({ payload }) => {
                                        this.setState({showpickerhourPM:true,refreshing:false})
                                        let act = {};
                                        act.jour = 3;
                                        act.periode = "PM";
                                        act.id = Math.random();
                                        act.activite_type = {color : payload.color};
                                        this.state.userActivites.push(act)
                                        this.setState({userActivites:this.state.userActivites})
                                        this.setState({
                                            jour:3,
                                            periode: "PM",
                                            activity_id: payload.id,
                                            jourMatinOuSoir:'Mercredi après-midi'

                                        })
                                    }}
                                >
                                    {({ active, viewProps }) => {
                                        return (
                                            <Animated.View
                                                {...viewProps}
                                                style={[
                                                    {
                                                        borderRightColor: colors.white, borderRightWidth: 0.5,
                                                        minHeight: screenWidth*0.2,
                                                        backgroundColor: active
                                                            ? "#420420"
                                                            : null
                                                    },
                                                    viewProps.style, styles.amBoxjrsSemaine
                                                ]}
                                            >
                                                <TouchableOpacity onPress={() => {
                                                    // this.props.navigation.navigate("ActiviteProgrammes")
                                                }}>
                                <View   >
                                    {/* <View style={[styles.barrActivities, { backgroundColor: colors.greenbox }]}>

                                    </View>
                                    <View style={[styles.barrActivities, { backgroundColor: colors.yellowbox }]}>

                                    </View> */}
                                    {
                                        this.state.userActivites.map((act, index) => {
                                            if (act.jour == 3 && act.periode == "PM") {
                                                console.log("Tracked 3")
                                                return (
                                                    <View key={"act_" + act.id} style={[styles.barrActivities, { backgroundColor: act.activite_type.color }]}>

                                                    </View>
                                                )
                                            }
                                            else {
                                                return null
                                            }

                                        })
                                    }
                                </View>
                                                </TouchableOpacity>
                                            </Animated.View>
                                        )
                                    }}
                                </Droppable>
                                <Droppable
                                    onEnter={() => {

                                    }}
                                    onLeave={() => {

                                    }}
                                    onDrop={({ payload }) => {
                                        this.setState({showpickerhourPM:true,refreshing:false})
                                        let act = {};
                                        act.jour = 4;
                                        act.periode = "PM";
                                        act.id = Math.random();
                                        act.activite_type = {color : payload.color};
                                        this.state.userActivites.push(act)
                                        this.setState({userActivites:this.state.userActivites})
                                        this.setState({
                                            jour:4,
                                            periode: "PM",
                                            activity_id: payload.id,
                                            jourMatinOuSoir:'Jeudi après-midi'

                                        })
                                    }}
                                >
                                    {({ active, viewProps }) => {
                                        return (
                                            <Animated.View
                                                {...viewProps}
                                                style={[
                                                    {
                                                        borderRightColor: colors.white, borderRightWidth: 0.5,
                                                        minHeight: screenWidth*0.2,
                                                        backgroundColor: active
                                                            ? "#420420"
                                                            : null
                                                    },
                                                    viewProps.style, styles.amBoxjrsSemaine
                                                ]}
                                            >
                                                <TouchableOpacity onPress={() => {
                                                    // this.props.navigation.navigate("ActiviteProgrammes")
                                                }} >
                                <View  >
                                    {/* <View style={[styles.barrActivities, { backgroundColor: colors.bleubox }]}>

                                    </View>
                                    <View style={[styles.barrActivities, { backgroundColor: colors.greenbox }]}>

                                    </View> */}
                                    {
                                        this.state.userActivites.map((act, index) => {
                                            if (act.jour == 4 && act.periode == "PM") {
                                                console.log("Tracked 4")
                                                return (
                                                    <View key={"act_" + act.id} style={[styles.barrActivities, { backgroundColor: act.activite_type.color }]}>

                                                    </View>
                                                )
                                            }
                                            else {
                                                return null
                                            }

                                        })
                                    }
                                </View>
                            </TouchableOpacity>
                        </Animated.View>
                        )
                        }}
                    </Droppable>
                                <Droppable
                                    onEnter={() => {

                                    }}
                                    onLeave={() => {

                                    }}
                                    onDrop={({ payload }) => {
                                        this.setState({showpickerhourPM:true,refreshing:false})
                                        let act = {};
                                        act.jour = 5;
                                        act.periode = "PM";
                                        act.id = Math.random();
                                        act.activite_type = {color : payload.color};
                                        this.state.userActivites.push(act)
                                        this.setState({userActivites:this.state.userActivites})
                                        this.setState({
                                            jour:5,
                                            periode: "PM",
                                            activity_id: payload.id,
                                            jourMatinOuSoir:'Vendredi après-midi'

                                        })
                                    }}
                                >
                                    {({ active, viewProps }) => {
                                        return (
                                            <Animated.View
                                                {...viewProps}
                                                style={[
                                                    {
                                                        borderRightColor: colors.white, borderRightWidth: 0.5,
                                                        minHeight: screenWidth*0.2,
                                                        backgroundColor: active
                                                            ? "#420420"
                                                            : null
                                                    },
                                                    viewProps.style, styles.amBoxjrsSemaine
                                                ]}
                                            >
                                                <TouchableOpacity onPress={() => {
                                                    // this.props.navigation.navigate("ActiviteProgrammes")
                                                }} >
                                <View  >
                                    {
                                        this.state.userActivites.map((act, index) => {
                                            if (act.jour == 5 && act.periode == "PM") {
                                                console.log("Tracked 5")
                                                return (
                                                    <View key={"act_" + act.id} style={[styles.barrActivities, { backgroundColor: act.activite_type.color }]}>

                                                    </View>
                                                )
                                            }
                                            else {
                                                return null
                                            }

                                        })
                                    }

                                </View>
                            </TouchableOpacity>
                        </Animated.View>
                        )
                        }}
                    </Droppable>
                                <Droppable
                                    onEnter={() => {

                                    }}
                                    onLeave={() => {

                                    }}
                                    onDrop={({ payload }) => {
                                        this.setState({showpickerhourPM:true,refreshing:false})
                                        let act = {};
                                        act.jour = 6;
                                        act.periode = "PM";
                                        act.id = Math.random();
                                        act.activite_type = {color : payload.color};
                                        this.state.userActivites.push(act)
                                        this.setState({userActivites:this.state.userActivites})
                                        this.setState({
                                            jour:6,
                                            periode: "PM",
                                            activity_id: payload.id,
                                            jourMatinOuSoir:'Samedi après-midi'

                                        })
                                    }}
                                >
                                    {({ active, viewProps }) => {
                                        return (
                                            <Animated.View
                                                {...viewProps}
                                                style={[
                                                    {
                                                        borderRightColor: colors.white, borderRightWidth: 0.5,
                                                        minHeight: screenWidth*0.2,
                                                        backgroundColor: active
                                                            ? "#420420"
                                                            : null
                                                    },
                                                    viewProps.style, styles.amBoxjrsSemaine
                                                ]}
                                            >
                                                <TouchableOpacity onPress={() => {
                                                    // this.props.navigation.navigate("ActiviteProgrammes")
                                                }} >
                                <View   >
                                    {/* <View style={[styles.barrActivities, { backgroundColor: colors.red }]}>

                                    </View> */}
                                    {
                                        this.state.userActivites.map((act, index) => {
                                            if (act.jour == 6 && act.periode == "PM") {
                                                console.log("Tracked 6")
                                                return (
                                                    <View key={"act_" + act.id} style={[styles.barrActivities, { backgroundColor: act.activite_type.color }]}>

                                                    </View>
                                                )
                                            }
                                            else {
                                                return null
                                            }

                                        })
                                    }
                                </View>
                                                </TouchableOpacity>
                                            </Animated.View>
                                        )
                                    }}
                                </Droppable>
                                <Droppable
                                    onEnter={() => {

                                    }}
                                    onLeave={() => {

                                    }}
                                    onDrop={({ payload }) => {
                                        this.setState({showpickerhourPM:true,refreshing:false})
                                        let act = {};
                                        act.jour = 7;
                                        act.periode = "PM";
                                        act.id = Math.random();
                                        act.activite_type = {color : payload.color};
                                        this.state.userActivites.push(act)
                                        this.setState({userActivites:this.state.userActivites})
                                        this.setState({
                                            jour:7,
                                            periode: "PM",
                                            activity_id: payload.id,
                                            jourMatinOuSoir:'Dimanche après-midi'

                                        })
                                    }}
                                >
                                    {({ active, viewProps }) => {
                                        return (
                                            <Animated.View
                                                {...viewProps}
                                                style={[
                                                    {
                                                        borderRightColor: colors.white, borderRightWidth: 0.5,
                                                        minHeight: screenWidth*0.2,
                                                        backgroundColor: active
                                                            ? "#420420"
                                                            : null
                                                    },
                                                    viewProps.style, styles.amBoxjrsSemaine
                                                ]}
                                            >
                                                <TouchableOpacity onPress={() => {
                                                    // this.props.navigation.navigate("ActiviteProgrammes")
                                                }} >
                                <View  >
                                    {/* <View style={[styles.barrActivitiesRemplis, { backgroundColor: colors.grisbox }]}>

                                    </View> */}
                                    {
                                        this.state.userActivites.map((act, index) => {
                                            if (act.jour == 7 && act.periode == "PM") {
                                                console.log("Tracked 0")
                                                return (
                                                    <View key={"act_" + act.id} style={[styles.barrActivities, { backgroundColor: act.activite_type.color }]}>

                                                    </View>
                                                )
                                            }
                                            else {
                                                return null
                                            }

                                        })
                                    }

                                </View>
                            </TouchableOpacity>
                        </Animated.View>
                        )
                        }}
                    </Droppable>
                            </View>
                        </View>
                        <TouchableOpacity style={
                            // [styles.btnAddActivites,
                                {width:screenWidth*0.8,alignSelf:'center'}
                                // ]
                        }><Text style={[styles.textAddActivites,{flexWrap:'wrap'}]} >Faîtes glisser les activités ci-dessous directement dans le calendrier</Text>
                        </TouchableOpacity>

                        <View
                            style={{
                                flexDirection: "row",
                                alignItems: "center",
                                justifyContent: "center",
                                flexWrap: "wrap"
                            }}
                        >


                            {    this.state.listActivites.map((value, viewProps,key) => {
                                    return (
                                      <Draggable  key={'value'+value.id}

                                                  onDragStart={() => {
                                                   //   this.refs._scrollView.setNativeProps({ scrollEnabled: false });
                                                      this.setState({ dragstart:true });
                                                      this.setState({ backcolordraggedItem:value.color });
                                                      this.setState({  titredraggedItem:value.name});
                                                  }}

                                            onDragEnd={() => {
                                             //   this.refs._scrollView.setNativeProps({ scrollEnabled: true });
                                                this.setState({ dragstart:false });
                                                // this.setState({showpickerhour:true,refreshing:false}) // noesorina tato
                                            }}
                                            payload={value}
                                      >{({ viewProps }) => {
                                                return (
                                                    <Animated.View
                                                        {...viewProps}
                                                    >
                                                    <View  style={
                                                        //styles.rowBoxActivites,
                                                       [styles.rowBoxActivites,this.state.dragstart ?  {
                                                           width:widthdragtrue,
                                                           height:widthdragtrue,
                                                           backgroundColor: value.color } : {   width:widthdragfalse,
                                                                                               height:widthdragfalse,
                                                                                                backgroundColor: value.color }]}
                                                    >
                                                        <Text style={[styles.textActivites,value.color ==='yellow'?{ color:'#d9d8d9'}:{color:'white'}]}>
                                                            {value.name}
                                                        </Text>
                                                    </View>
                                                    </Animated.View>
                                                );
                                            }}
                                    </Draggable>
                                    )
                                })
                            }
                        </View>
                    </View>

                </Provider>
                        {/* {

                            this.props.listActivites.map((value, index) => {

                                if (this.increRowsActus < this.nbrRowsActivites) {
                                    this.increRowsActus = this.increRowsActus + 1
                                    return (
                                        <View style={styles.panelListActivites}>
                                            <View style={[styles.rowBoxActivites, { backgroundColor: this.props.listActivites[this.increRowsActus - 1].bgColor }]}>
                                                <Text style={styles.textActivites} >{this.props.listActivites[this.increRowsActus - 1].title}</Text>
                                            </View>
                                            <View style={[styles.rowBoxActivites, { backgroundColor: this.props.listActivites[this.increRowsActus].bgColor }]}>
                                                <Text style={styles.textActivites} >{this.props.listActivites[this.increRowsActus].title}</Text>
                                            </View>
                                            <View style={[styles.rowBoxActivites, { backgroundColor: this.props.listActivites[this.increRowsActus + 1].bgColor }]}>
                                                <Text style={styles.textActivites} >{this.props.listActivites[this.increRowsActus + 1].title}</Text>
                                            </View>
                                        </View>)
                                } else {
                                    return null
                                }
                            })
                        }
                        <View style={styles.panelListActivites}>
                            {

                                this.props.listActivites.map((value, index) => {

                                    if (index < this.nbrColsResteActivites) {
                                        return (<View style={[styles.rowBoxActivites, { backgroundColor: this.props.listActivites[(this.nbrRowsActivites * 3) + index].bgColor }]}>
                                            <Text style={styles.textActivites} >{this.props.listActivites[(this.nbrRowsActivites * 3) + index].title}</Text>
                                        </View>)
                                    } else {
                                        return null
                                    }
                                })
                            }
                        </View> */}



                        <View style={{ alignItems: "center" }}>

                            <MAAButton text="SUIVANT" height={40}
                                       style={{
                                           marginTop: 5
                                       }}
                                       onPress={() => {
                                                if(!this.props.depuiscalendarforplanning){
                                                    this.props.navigation.navigate("Carnet")
                                                    const setActiveFPAction = { type: SET_ACTIVE_FP, value: 4 }
                                                    this.props.dispatch(setActiveFPAction)
                                                }else{
                                                    getDashboar(dashboardHelper,this.props).then(()=>{})
                                                    if(this.props.navigation.goBack()) {}
                                                    else{
                                                        const setActiveTab = { type: SET_ACTIVE_TAB, value: "home" }
                                                        this.props.dispatch(setActiveTab);
                                                    }
                                                }

                                       }}
                            />
                            <MAAButton text="MON PROFIL" height={40}
                                       style={{
                                           backgroundColor: "transparent", borderColor: colors.white,
                                           marginTop: 5,
                                           borderWidth: 1,
                                       }}
                                       onPress={() => {
                                           this.props.navigation.popToTop()
                                       }}
                            />
                        </View>


                    </View>
                </ScrollView>
                {
                    this._showEvenement()

                }
                {
                    this._showEvenementPM()

                }
            </LinearGradient>
        )
    }
}

// export default FichePedag;
const mapStateToProps = (state) => {
    const { listActivites,isFichePedag,depuiscalendarforplanning } = state.statedata
    return { listActivites,isFichePedag,depuiscalendarforplanning }
};
export default connect(mapStateToProps)(Masemaine);
