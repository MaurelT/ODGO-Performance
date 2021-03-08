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
import { Calendar, CalendarList, Agenda, LocaleConfig,ExpandableCalendar } from '../../components/react-native-calendars/src';
import LinearGradient from 'react-native-linear-gradient';
import Swiper from 'react-native-swiper'
import colors from '../../configs/colors';
import styles from './styles';
import baseStyles from '../../base/BaseStyles';
import AutoHeightImage from 'react-native-auto-height-image';
import CalendarMonthView from '../../components/CalendarMonthView';
import {
    SET_PREV_MONTH,
    SET_NEXT_MONTH,
    SET_POP_TO_TOP,
    SET_ACTIVE_TAB,
    SET_PARAM_FOR_CALENDAR,
    SET_LISTE_ACTIVITE_PROGRAM, SET_ACTIVE_FP, SET_ACTIVE_TABMENU_CARNET,SET_DEPUIS_CALENDAR
} from '../../redux/types/tabTypes';
import calendarEventHelper from "../../apis/helpers/calendarEvent_helper";
import moment, {months} from "moment";
import AsyncStorage from "@react-native-community/async-storage";
import statusBarHeight from '../../configs/screen';
import MAAButton from '../../components/MAAButton/MAAButton';

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


class CalendarWithPlugin extends Component {

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
            datearray:null
        }

    }

    async componentDidMount() {
        let a = new Date();
        const userToken = await AsyncStorage.getItem("userToken")
        this.setState({ userToken });
        if(((moment(a).month()).toString()).split("").length === 1){
            this.getCalendarEvent(moment(a).year(),'0'+moment(a).month())

        }else{
            this.getCalendarEvent(moment(a).year(),moment(a).month())
        }
    }

    getCalendarEvent = async (annee,month) => {

        this.setState({refreshing: true});

        const calendarEvents = await calendarEventHelper.getCalendarEvent(this.state.userToken, annee, month);
        let calendarEvents1 = await calendarEventHelper.getCalendarEvent(this.state.userToken, annee, 1);
        let calendarEvents2 = await calendarEventHelper.getCalendarEvent(this.state.userToken, annee, 2);
        let calendarEvents3 = await calendarEventHelper.getCalendarEvent(this.state.userToken, annee, 3);
        let calendarEvents4 = await calendarEventHelper.getCalendarEvent(this.state.userToken, annee, 4);
        let calendarEvents5 = await calendarEventHelper.getCalendarEvent(this.state.userToken, annee, 5);
        let calendarEvents6 = await calendarEventHelper.getCalendarEvent(this.state.userToken, annee, 6);
        let calendarEvents7 = await calendarEventHelper.getCalendarEvent(this.state.userToken, annee, 7);
        let calendarEvents8 = await calendarEventHelper.getCalendarEvent(this.state.userToken, annee, 8);
        let calendarEvents9 = await calendarEventHelper.getCalendarEvent(this.state.userToken, annee, 9);
        let calendarEvents10 = await calendarEventHelper.getCalendarEvent(this.state.userToken, annee, 10);
        let calendarEvents11 = await calendarEventHelper.getCalendarEvent(this.state.userToken, annee, 11);
        let calendarEvents12 = await calendarEventHelper.getCalendarEvent(this.state.userToken, annee, 12);
        let calendarEvents1_2 = await calendarEvents1.data.concat(calendarEvents2.data);
        let calendarEvents1_2_3 = await calendarEvents1_2.concat(calendarEvents3.data);
        let calendarEvents1_2_3_4 = await calendarEvents1_2_3.concat(calendarEvents4.data);
        let calendarEvents1_2_3_4_5 = await calendarEvents1_2_3_4.concat(calendarEvents5.data);
        let calendarEvents1_2_3_4_5_6 = await calendarEvents1_2_3_4_5.concat(calendarEvents6.data);
        let calendarEvents1_2_3_4_5_6_7 = await calendarEvents1_2_3_4_5_6.concat(calendarEvents7.data);
        let calendarEvents1_2_3_4_5_6_7_8 = await calendarEvents1_2_3_4_5_6_7.concat(calendarEvents8.data);
        let calendarEvents1_2_3_4_5_6_7_8_9 = await calendarEvents1_2_3_4_5_6_7_8.concat(calendarEvents9.data);
        let calendarEvents1_2_3_4_5_6_7_8_9_10 = await calendarEvents1_2_3_4_5_6_7_8_9.concat(calendarEvents10.data);
        let calendarEvents1_2_3_4_5_6_7_8_9_10_11 = await calendarEvents1_2_3_4_5_6_7_8_9_10.concat(calendarEvents11.data);
        let calendarEvents1_2_3_4_5_6_7_8_9_10_11_12 = await calendarEvents1_2_3_4_5_6_7_8_9_10_11.concat(calendarEvents12.data);

        console.warn('le mois',calendarEvents1_2_3_4_5_6_7_8_9_10_11_12)
        if (calendarEvents1_2_3_4_5_6_7_8_9_10_11_12) {
            let datearray = [];
            for (let i = 0; i < calendarEvents1_2_3_4_5_6_7_8_9_10_11_12.length; i++){
                let date = moment(calendarEvents1_2_3_4_5_6_7_8_9_10_11_12[i].date).format('YYYY-MM-DD');
                if (datearray.includes(date) === false){
                    datearray.push(date);
                }
            }
            let data = {};
            for (let i = 0; i < datearray.length; i++) {
                let periods = [];
                for (let j = 0; j < calendarEvents1_2_3_4_5_6_7_8_9_10_11_12.length; j++) {
                    let date = moment(calendarEvents1_2_3_4_5_6_7_8_9_10_11_12[j].date).format('YYYY-MM-DD');
                    if (datearray[i] === date) {
                        periods.push(
                            {
                                startingDay: false,
                                endingDay: false,
                                color: calendarEvents1_2_3_4_5_6_7_8_9_10_11_12[j].activite_type.color,
                                id:calendarEvents1_2_3_4_5_6_7_8_9_10_11_12[j].id, //ref mila fanitsiana de jereo sara eto
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
            }

            this.setState({calendarEvents: data});
            this.setState({refreshing: false});
            console.warn(data)
            return data;
        }
    };

    render() {



        if(this.props.popToTop === 'home'){
            this.props.navigation.popToTop();
            const setPopToTop = { type: SET_POP_TO_TOP, value: '' } //eto zany za no mi-trave
            this.props.dispatch(setPopToTop);
            // return null;
        }
        return (
            <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }} colors={[colors.balck, colors.green, colors.balck]}
                            style={[styles.linearGradient,{height:'100%'}]}>
                <ScrollView
                    contentInsetAdjustmentBehavior="automatic"
                    style={[styles.scrollView,{marginBottom:20}]}
                    contentContainerStyle={[styles.contentContainerStyle]}
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.refreshing}
                            onRefresh={() => {
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

                        markedDates={this.state.calendarEvents}

                        onPressArrowLeft={
                            async (subs,monthse) => {
                                subs()
                                // console.warn(monthse)
                                //     console.warn(moment(monthse).year(),'0'+moment(monthse).month())
                                //       let msi = await this.getCalendarEvent(moment(monthse).year(),moment(monthse).month());
                                //       if(msi){
                                //           this.setState({
                                //               year: moment(monthse).year(),
                                //               month:moment(monthse).month(),
                                //               day: moment(monthse).day(),
                                //               now: monthse
                                //           },()=>{
                                //               subs()
                                //           })
                                //       }
                                //     console.warn('kk',msi)
                            }}
                        onPressArrowRight={
                            (addMonth) => {
                                addMonth();
                            }}
                        // onMonthChange={(months) => {
                        //     console.warn('doda', months)
                        // }}
                        //
                        // onUpdateMonth={(months) => {
                        //     console.warn('jeje', months)
                        // }}

                        // onVisibleMonthsChange={(months) => {
                        //     console.warn('mont',months)
                        //     InteractionManager.runAfterInteractions(() => {
                        //         if(((months[0].month).toString()).split("").length === 1) {
                        //             this.getCalendarEvent(months[0].year,'0'+ months[0].month);
                        //             this.setState({
                        //                 year: months[0].year,
                        //                 month: months[0].month,
                        //                 day: months[0].day,
                        //                 now: months[0].year + '-0' + months[0].month + '-' + months[0].day + 'T00:00:00Z'
                        //             })
                        //         }else{
                        //             this.getCalendarEvent(months[0].year, months[0].month)
                        //             this.setState({
                        //                 year: months[0].year,
                        //                 month: months[0].month,
                        //                 day: months[0].day,
                        //                 now: months[0].year + '-' + months[0].month + '-' + months[0].day + 'T00:00:00Z'
                        //             })
                        //         }
                        //     })
                        // }}


                        onDayPress={(day)=>{
                            const listeActivitesProgram_ = { type: SET_LISTE_ACTIVITE_PROGRAM, value: [] };
                            this.props.dispatch(listeActivitesProgram_);
                            console.warn(day.month,day.day,day.dateString)
                            this.props.navigation.navigate('ActiviteProgrammes',
                                {
                                    year: day.year,
                                    month:day.month,
                                    day:day.day,
                                    //    id:this.state.calendarEvents[day.dateString].periods[this.state.calendarEvents[day.dateString].periods.length-1].id
                                }
                            );
                            this.props.dispatch({ type: SET_PARAM_FOR_CALENDAR, value: {
                                    year: day.year,
                                    month:day.month,
                                    day:day.day,
                                    dateString:day.dateString,
                                    from:'calendar'
                                    // tam iz tato amban tato no niasa, id:this.state.calendarEvents[day.dateString].periods[this.state.calendarEvents[day.dateString].periods.length-1].id
                                } });
                            this.props.dispatch({ type: SET_ACTIVE_TAB, value: "fichepedag_activiteprogram" })

                            // for(let i=0;i<this.state.datearray.length;i++){
                            //     if(this.state.datearray[i] == day.dateString){
                            //         if( this.state.calendarEvents[day.dateString].periods.length>0){
                            //
                            //          //nesoriko tato io ivelan io
                            //         }
                            //     }
                            // }
                        }}
                        markingType='multi-period'
                        horizontal={true}
                        pagingEnabled={true}
                        hideArrows={false}
                        firstDay={1}
                        hideExtraDays={false}
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
                                    <View>
                                    <AutoHeightImage
                                        width={15}
                                        source={require("../../assets/icons/arrow-white.png")}
                                        style={{}} />
                                    </View>

                                )
                            }
                        }}

                        calendarStyle={{ flex: 1, height: "auto"}}
                        // dayComponent={({date, state}) => {
                        //     return (
                        //         <View style={{
                        //             borderWidth:1,
                        //             borderColor:'#808182',
                        //             width:'100%',
                        //             minHeight:50,
                        //             alignItems:'center',
                        //             justifyContent:'center'
                        //         }}>
                        //             <Text style={{textAlign: 'center', color: state === 'disabled' ? '#3e3f3f' : '#b3b4b5'}}>
                        //                 {date.day}
                        //             </Text>
                        //         </View>
                        //     );
                        // }}
                        //calendarWidth={200}
                    />
                    <View style={{top:-40}}>
                    <MAAButton text={"MA SEMAINE TYPE"} width={(screenWidth - 100)} height={40}
                               style={[styles.btnValidate]}
                               onPress={()=>{
                                   global.is_venudedonneperso = true;
                                   const set = { type: SET_DEPUIS_CALENDAR, value: true };
                                   this.props.dispatch(set);
                                   const setActiveTab = { type: SET_ACTIVE_TAB, value: "monplaning" };
                                   this.props.dispatch(setActiveTab);
                                   this.props.navigation.navigate('LogedinNavigator');
                               }}
                    /></View>
                </ScrollView>
            </LinearGradient>
        )
    }
}

const mapStateToProps = (state) => {
    const { selectedDate, date, prevMonth, nextMonth, startDay,popToTop } = state
    return { selectedDate, date, prevMonth, nextMonth, startDay,popToTop }
};

export default connect(mapStateToProps)(CalendarWithPlugin);
