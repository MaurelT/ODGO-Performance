import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    ScrollView,
    RefreshControl,
    View,
    Dimensions,
    StatusBar,
    Text,
    TouchableOpacity,
    InteractionManager
} from 'react-native';
import { Calendar, CalendarList, Agenda, LocaleConfig } from '../../components/react-native-calendars/src';
import LinearGradient from 'react-native-linear-gradient';
import Swiper from 'react-native-swiper'
import colors from '../../configs/colors';
import styles from './styles';
import baseStyles from '../../base/BaseStyles';
import AutoHeightImage from 'react-native-auto-height-image';
import CalendarMonthView from '../../components/CalendarMonthView';
import {SET_PREV_MONTH, SET_NEXT_MONTH, SET_POP_TO_TOP, SET_ACTIVE_TAB, SET_PARAM_FOR_CALENDAR} from '../../redux/types/tabTypes';
import calendarEventHelper from "../../apis/helpers/calendarEvent_helper";
import moment, {months} from "moment";
import AsyncStorage from "@react-native-community/async-storage";
import statusBarHeight from '../../configs/screen';

const screen = Dimensions.get("window");
const SBHelight = statusBarHeight;
const screenWidth = screen.width
const screenHeight = screen.height - SBHelight

LocaleConfig.locales['fr'] = {
    monthNames: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'],
    monthNamesShort: ['JAN', 'FEV', 'MAR', 'AVR', 'MAI', 'JUN', 'JUL', 'AOU', 'SEP', 'OCT', 'NOV', 'DEC'],
    dayNames: ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'],
    dayNamesShort: ['DIM', 'LUN', 'MAR', 'MER', 'JEU', 'VEN', 'SAM'],
    today: 'Aujourd\'hui'
};
LocaleConfig.defaultLocale = 'fr';


class CalendarWithPluginCompetition extends Component {

    swiper = []

    constructor(props) {
        super(props)
        this.state = {
            refreshing: false,
            popToTop:this.props.popToTop,
            userToken:null,
            calendarEvents:null,
            year:null,
            month:null,
            now:null,
            datearray:null,
            dateNow: new Date(),
        }

    }

   async componentDidMount() {
        let a = new Date();
        const userToken = await AsyncStorage.getItem("userToken");
        this.setState({ userToken });
        if(((moment(a).month()).toString()).split("").length === 1){
          //  this.getCalendarEventCompetition(moment(a).year(),'0'+moment(a).format('MM'))
            this.getCalendarEventCompetition(moment(a).year(),moment(a).format('MM'))
        }else{
            //this.getCalendarEventCompetition(moment(a).year(),moment(a).month()) LOL, le 0,1,2,3 ty
            this.getCalendarEventCompetition(moment(a).year(),moment(a).format('MM'))
        }
    }

    getCalendarEventCompetition = async (annee,month) => {
        this.setState({refreshing: true});
        console.warn('lasas',annee,month);
        const calendarEvents = await calendarEventHelper.getCalendarEventCompetition(this.props.userToken, annee, month);
        console.warn('calendar events',calendarEvents);
        if (calendarEvents.data !== null) {
            let datearray = [];
            for (let i = 0; i < calendarEvents.data.length; i++) {
                let date = moment(calendarEvents.data[i].comp_date).format('YYYY-MM-DD');
                if (datearray.includes(date) === false) {
                    datearray.push(date);
                }
            }
            this.setState({datearray:datearray});
            let data = {};
            for (let i = 0; i < datearray.length; i++) {
                let periods = [];
                for (let j = 0; j < calendarEvents.data.length; j++) {
                    let date = moment(calendarEvents.data[j].comp_date).format('YYYY-MM-DD');
                    if (datearray[i] === date) {
                            periods.push(
                                {
                                    startingDay: false,
                                    endingDay: false,
                                    color: '#f44130', //red
                                    id:calendarEvents.data[j].id, //ref mila fanitsiana de jereo sara eto
                                },
                            )
                    }
                }

                var obj = {};
                for ( let k=0, len=periods.length; k < len; k++ )
                    obj[periods[k]['color']] = periods[k];
                periods = new Array();
                for ( var key in obj )
                    periods.push(obj[key]);
                data[datearray[i]] = {'periods': periods}

                this.setState({calendarEvents: data})
            }
            this.setState({refreshing: false})
        }else{
            this.setState({refreshing: false})
        }
    };

    render() {
        if(this.props.popToTop === 'home'){ // ovaina ty ref ts mzet //Performance
            this.props.navigation.popToTop();
            const setPopToTop = { type: SET_POP_TO_TOP, value: false } //eto zany za no mi-trave
            this.props.dispatch(setPopToTop);
            // return null;
        }
        return (
            <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }} colors={[colors.balck, colors.green, colors.balck]}
                style={[styles.linearGradient,{height:screenHeight}]}>
                <ScrollView
                    contentInsetAdjustmentBehavior="automatic"
                    style={[styles.scrollView,{marginBottom:20}]}
                    contentContainerStyle={[styles.contentContainerStyle]}
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.refreshing}
                            onRefresh={() => {
                                console.log("Refreshing...")
                                this.setState({ refreshing: true })
                                setTimeout(() => {
                                    console.log("Refresh finished.")
                                    this.setState({ refreshing: false })
                                }, 1000)
                                // this.animateTiming()

                            }}
                            tintColor={colors.green}
                            colors={[colors.green]}
                        />
                    }
                >
                    {/* <View style={{}}> */}
                        <CalendarList

                            // theme={{
                            //     textSectionTitleColor: 'white',
                            //     // todayTextColor: 'white',
                            //     // selectedDayTextColor: 'white',
                            //     selectedDayBackgroundColor: '#333248',
                            //
                            // }}

                            // dayComponent={({date, state}) => {
                            //     return (<View
                            //         style={{borderWidth:1,borderColor:'#4B4242',padding:10}}><Text style={{textAlign: 'center', color: state === 'disabled' ? 'gray' : 'white'}}>{date.day}</Text></View>);
                            // }}
                            markedDates={this.state.calendarEvents}


                            onPressArrowLeft={
                                (substractMonth) => {
                                    console.warn(substractMonth);
                                    substractMonth()

                                        // setTimeout(()=>{
                                        //      let previewmonth = moment(this.state.year+'-'+this.state.month+'-'+this.state.day).format('YYYY-MM-DD').toString().subtract(1,'months' ).calendar();
                                        //     //let previewmonth = moment(this.state.dateNow).subtract(1,'months').calendar();
                                        //     // this.setState({month:moment(previewmonth).month(),year:moment(previewmonth).year(),day:moment(previewmonth).day()})
                                        //     // this.getCalendarEventCompetition(moment(previewmonth).year(),moment(previewmonth).month())
                                        //     // console.warn('mois',this.state.month,previewmonth)
                                        //
                                        //     let month = moment(previewmonth).month();
                                        //     let year = moment(previewmonth).year();
                                        //     let day = moment(previewmonth).day();
                                        //     if(((month).toString()).split("").length === 1) {
                                        //         this.setState({year: year,month:'0' + month,day:day,dateNow:year+'-0'+month+'-'+day+'T00:00:00Z'},()=>{
                                        //             this.getCalendarEventCompetition(this.state.year,'0'+ this.state.month);
                                        //         })
                                        //     }else{
                                        //         this.setState({year: year,month:month,day:day,dateNow:year+'-'+month+'-'+day+'T00:00:00Z'},()=>{
                                        //             this.getCalendarEventCompetition(this.state.year,this.state.month)
                                        //         })
                                        //     }
                                        //     console.warn(previewmonth)
                                        //     substractMonth()
                                        // },1000)

                                }}
                            onPressArrowRight={
                                (addMonth) => {
                                    addMonth();
                                  }}

                            onVisibleMonthsChange={(months) => {
                                InteractionManager.runAfterInteractions(() => {

                                    if(((months[0].month).toString()).split("").length === 1) {
                                        console.warn('onvisiblemonth')
                                        this.getCalendarEventCompetition(months[0].year,'0'+ months[0].month)
                                        this.setState({year: months[0].year,month:'0' + months[0].month,day:months[0].day,now:months[0].year+'-0'+months[0].month+'-'+months[0].day+'T00:00:00Z'})

                                    }else{
                                        this.getCalendarEventCompetition(months[0].year,months[0].month)
                                        this.setState({year: months[0].year,month:months[0].month,day:months[0].day,now:months[0].year+'-'+months[0].month+'-'+months[0].day+'T00:00:00Z'})
                                    }
                                })
                            }}
                            // onMonthChange={() => {
                            //     console.warn('month changee')
                            // }}
                            // markedDates={{
                            //     '2019-09-01': {
                            //         periods: [
                            //             { startingDay: false, endingDay: false, color: 'blue' },
                            //             { startingDay: false, endingDay: false, color: 'yellow' },
                            //             { startingDay: false, endingDay: false, color: colors.red },
                            //         ]
                            //     },
                            //     '2019-09-02': {
                            //         periods: [
                            //             { startingDay: false, endingDay: false, color: 'blue' },
                            //             { startingDay: false, endingDay: false, color: colors.red },
                            //         ]
                            //     },
                            //     '2019-09-04': {
                            //         periods: [
                            //             { startingDay: false, endingDay: false, color: 'blue' },
                            //             { startingDay: false, endingDay: false, color: colors.red },
                            //             { startingDay: false, endingDay: false, color: 'green' },
                            //         ]
                            //     },
                            //     '2019-09-13': {
                            //         periods: [
                            //             { startingDay: false, endingDay: false, color: 'blue' },
                            //             { startingDay: false, endingDay: false, color: 'yellow' },
                            //             { startingDay: false, endingDay: false, color: colors.red },
                            //             { startingDay: false, endingDay: false, color: 'green' },
                            //         ]
                            //     },
                            // }}
                            onDayPress={(day)=>{
                                // console.warn(this.state.datearray)
                                // console.warn(day.dateString)
                                // console.warn('misy mitsoropaka aloha ato sao dia hadino fa mbola tsy ampy api');

                                //j'ai envlevé
                               // this.props.navigation.navigate(
                               //      // 'HistoriqueCompetition' taloha be
                               //      'ListeCompetition'
                               //      ,
                               //
                               //      {
                               //          year: day.year,
                               //          month:day.month,
                               //          day:day.day
                               //      }
                               //  )

                                if(this.state.datearray !== null && this.state.datearray.length >0){
                                    for(let i=0;i<this.state.datearray.length;i++){
                                        if(this.state.datearray[i] == day.dateString){
                                            if( this.state.calendarEvents[day.dateString].periods.length>0){
                                                this.props.navigation.navigate(
                                                    // 'HistoriqueCompetition'
                                                    'ListeCompetition'
                                                    ,
                                                {
                                                    year: day.year,
                                                    month:day.month,
                                                    day:day.day
                                                    //id:this.state.calendarEvents[day.dateString].periods[this.state.calendarEvents[day.dateString].periods.length-1].id
                                                    }
                                                )
                                            }
                                        }
                                    }
                                }

                                //     this.state.calendarEvents[moment(day.dateString).format('YYYY-MM-DD')]
                                //     if(this.state.calendarEvents.moment(day.dateString).format('YYYY-MM-DD') == -1){
                                //     }
                                    // let date = moment(this.state.calendarEvents[i]).format('YYYY-MM-DD');



                            }}
                            markingType='multi-period'
                            horizontal={true}
                            pagingEnabled={true}
                            hideArrows={true}
                            firstDay={1}
                            hideExtraDays={false}
                            // calendarHeight={60 * 7}
                            renderArrow={(dirction) => {
                                if (dirction == "left") {
                                    return (
                                        <AutoHeightImage
                                            width={15}
                                            source={require("../../assets/icons/arrow-white.png")}
                                            style={{
                                                transform: [
                                                    { rotateY: "180deg" }
                                                ]
                                            }} />
                                    )
                                }
                                else if (dirction == "right") {
                                    return (
                                        <AutoHeightImage
                                            width={15}
                                            source={require("../../assets/icons/arrow-white.png")}
                                            style={{}} />

                                    )
                                }
                            }}
                            // style={{ backgroundColor: colors.white + "" }}
                            calendarStyle={{ flex: 1, height: "auto" }}
                        />


                    {/*<TouchableOpacity style={{*/}
                    {/*    width: (screenWidth - 35), backgroundColor: colors.red, padding: 5,*/}
                    {/*    alignItems: "center", justifyContent: "center", margin:10*/}
                    {/*}}>*/}
                    {/*    <Text style={[baseStyles.textColorWhite]}>Ajouter un nouvel évènement</Text>*/}
                    {/*</TouchableOpacity>*/}

                    {/*<View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-evenly"}}>*/}
                    {/*    <View style={{*/}
                    {/*        borderWidth: 1.5, borderColor: colors.white, padding: 5, borderRadius: 10,*/}
                    {/*        width: (screenWidth - 100) / 4, paddingTop: 15, paddingBottom: 15,margin:5*/}
                    {/*    }}>*/}
                    {/*        <View style={{ padding: 3, backgroundColor: "#0712FE", alignItems: "center" }}>*/}
                    {/*            <Text style={[baseStyles.textColorWhite, { fontSize: 8 }]}>Training</Text>*/}
                    {/*        </View>*/}
                    {/*        <View style={{ }}>*/}
                    {/*            <Text style={[baseStyles.textColorWhite, { fontSize: 8, textAlign:"center" }]}>08:00 - 17:00</Text>*/}
                    {/*        </View>*/}
                    {/*    </View>*/}
                    {/*    <View style={{*/}
                    {/*        borderWidth: 1.5, borderColor: colors.white, padding: 5, borderRadius: 10,*/}
                    {/*        width: (screenWidth - 100) / 4, paddingTop: 15, paddingBottom: 15, margin: 5*/}
                    {/*    }}>*/}
                    {/*        <View style={{ padding: 3, backgroundColor: colors.red, alignItems: "center" }}>*/}
                    {/*            <Text style={[baseStyles.textColorWhite, { fontSize: 8 }]}>Repos</Text>*/}
                    {/*        </View>*/}
                    {/*        <View style={{}}>*/}
                    {/*            <Text style={[baseStyles.textColorWhite, { fontSize: 8,textAlign:"center" }]}>08:00 - 17:00</Text>*/}
                    {/*        </View>*/}
                    {/*    </View>*/}
                    {/*    <View style={{*/}
                    {/*        borderWidth: 1.5, borderColor: colors.white, padding: 5, borderRadius: 10,*/}
                    {/*        width: (screenWidth - 100) / 4, paddingTop: 15, paddingBottom: 15, margin: 5*/}
                    {/*    }}>*/}
                    {/*        <View style={{ padding: 3, backgroundColor: "#DDAD22", alignItems: "center" }}>*/}
                    {/*            <Text style={[baseStyles.textColorWhite, { fontSize: 8 }]}>Music</Text>*/}
                    {/*        </View>*/}
                    {/*        <View style={{ }}>*/}
                    {/*            <Text style={[baseStyles.textColorWhite, { fontSize: 8,textAlign:"center" }]}>08:00 - 17:00</Text>*/}
                    {/*        </View>*/}
                    {/*    </View>*/}
                    {/*    <View style={{*/}
                    {/*        borderWidth: 1.5, borderColor: colors.white, padding: 5, borderRadius: 10,*/}
                    {/*        width: (screenWidth - 100) / 4, paddingTop: 15, paddingBottom: 15, margin: 5*/}
                    {/*    }}>*/}
                    {/*        <View style={{ padding: 3, backgroundColor: colors.green, alignItems: "center" }}>*/}
                    {/*            <Text style={[baseStyles.textColorWhite, { fontSize: 8 }]}>Soins</Text>*/}
                    {/*        </View>*/}
                    {/*        <View style={{ }}>*/}
                    {/*            <Text style={[baseStyles.textColorWhite, { fontSize: 8,textAlign:"center" }]}>08:00 - 17:00</Text>*/}
                    {/*        </View>*/}
                    {/*    </View>*/}
                    {/*</View>*/}
                </ScrollView>
            </LinearGradient>
        )
    }
}

// export default CalendarWithPlugin;
const mapStateToProps = (state) => {
    const { selectedDate, date, prevMonth, nextMonth, startDay,popToTop,userToken } = state.statedata
    return { selectedDate, date, prevMonth, nextMonth, startDay,popToTop,userToken }
};

export default connect(mapStateToProps)(CalendarWithPluginCompetition);
