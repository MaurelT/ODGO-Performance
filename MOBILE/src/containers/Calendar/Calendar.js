import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    ScrollView,
    RefreshControl,
    View,
    Dimensions,
    StatusBar,
    Text,
    TouchableOpacity
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Swiper from 'react-native-swiper'
import colors from '../../configs/colors';
import styles from './styles';
import baseStyles from '../../base/BaseStyles';
import AutoHeightImage from 'react-native-auto-height-image';
import CalendarMonthView from '../../components/CalendarMonthView';
import {SET_PREV_MONTH, SET_NEXT_MONTH, SET_POP_TO_TOP} from '../../redux/types/tabTypes';
import statusBarHeight from '../../configs/screen';

const screen = Dimensions.get("window");
const SBHelight = statusBarHeight;
const screenWidth = screen.width
const screenHeight = screen.height - SBHelight


class Calendar extends Component {

    swiper = []

    constructor(props) {
        super(props)
        this.state = {
            refreshing: false,
            calendarShower: [0, 1, 2],

            selectedDate: props.selectedDate,
            date: props.date,
            prevMonth: props.prevMonth,
            nextMonth: props.nextMonth,
            startDay: props.startDay
        }

        var prevMonth = new Date()
        prevMonth.setMonth(
            (this.state.date.getMonth() > 0 ? (this.state.date.getMonth() - 1) : 11)
        )
        prevMonth.setFullYear(
            (this.state.date.getMonth() > 0 ? (this.state.date.getFullYear()) : (this.state.date.getFullYear() - 1))
        )

        var nextMonth = new Date()
        nextMonth.setMonth(
            (this.state.date.getMonth() < 11 ? (this.state.date.getMonth() + 1) : 0)
        )
        nextMonth.setFullYear(
            (this.state.date.getMonth() < 11 ? (this.state.date.getFullYear()) : (this.state.date.getFullYear() + 1))
        )

        props.dispatch({ type: SET_PREV_MONTH, value: prevMonth })
        props.dispatch({ type: SET_NEXT_MONTH, value: nextMonth })

        console.log(this.props.date.getMonth())
        console.log(prevMonth.getMonth())
        console.log(nextMonth.getMonth())

    }

    render() {

        if(this.props.popToTop === 'home'){
            this.props.navigation.popToTop();
            const setPopToTop = { type: SET_POP_TO_TOP, value: '' }
            this.props.dispatch(setPopToTop);
            // return null;
        }
        return (
            <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }} colors={[colors.balck, colors.green, colors.balck]}
                style={[styles.linearGradient]}>
                <ScrollView
                    contentInsetAdjustmentBehavior="automatic"
                    style={styles.scrollView}
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
                    <View
                    // style={{ height: 60 * 7}}
                    >
                        <Swiper
                            showsButtons={false}
                            showsPagination={false}
                            loop={false}
                            ref={(ref) => { this.swiper.push(ref) }}
                            style={{ width: screenWidth, backgroundColor: colors.red + "00" }}
                            index={1}
                            onIndexChanged={(index) => {
                                console.log("Index : " + index)
                            }}>
                            {/* {
                                this.state.calendarShower.map((value, index) => {
                                    return <CalendarMonthView time={new Date().getTime()} />
                                })
                            } */}

                            <CalendarMonthView type={"prevMonth"} />
                            <CalendarMonthView type={"date"} />
                            <CalendarMonthView type={"nextMonth"} />
                        </Swiper>
                    </View>

                    {/* <View
                        style={{ backgroundColor: 'red' }}
                    > */}
                        <TouchableOpacity style={{
                            width: (screenWidth - 50), backgroundColor: colors.red, padding: 5,
                            alignItems: "center", justifyContent: "center"
                        }}>
                            <Text style={[baseStyles.textColorWhite]}>Ajouter un nouvel évènement</Text>
                        </TouchableOpacity>
                        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
                            <View style={{
                                borderWidth: 1.5, borderColor: colors.white, padding: 5, borderRadius: 10,
                                width: (screenWidth - 100) / 4, paddingTop: 15, paddingBottom: 15, margin: 5
                            }}>
                                <View style={{ padding: 3, backgroundColor: "#0712FE", alignItems: "center" }}>
                                    <Text style={[baseStyles.textColorWhite, { fontSize: 8 }]}>Training</Text>
                                </View>
                                <View>
                                    <Text style={[baseStyles.textColorWhite, { fontSize: 8 }]}>08:00 - 17:00</Text>
                                </View>
                            </View>
                            <View style={{
                                borderWidth: 1.5, borderColor: colors.white, padding: 5, borderRadius: 10,
                                width: (screenWidth - 100) / 4, paddingTop: 15, paddingBottom: 15, margin: 5
                            }}>
                                <View style={{ padding: 3, backgroundColor: colors.red, alignItems: "center" }}>
                                    <Text style={[baseStyles.textColorWhite, { fontSize: 8 }]}>Repos</Text>
                                </View>
                                <View>
                                    <Text style={[baseStyles.textColorWhite, { fontSize: 8 }]}>08:00 - 17:00</Text>
                                </View>
                            </View>
                            <View style={{
                                borderWidth: 1.5, borderColor: colors.white, padding: 5, borderRadius: 10,
                                width: (screenWidth - 100) / 4, paddingTop: 15, paddingBottom: 15, margin: 5
                            }}>
                                <View style={{ padding: 3, backgroundColor: "#DDAD22", alignItems: "center" }}>
                                    <Text style={[baseStyles.textColorWhite, { fontSize: 8 }]}>Musc</Text>
                                </View>
                                <View>
                                    <Text style={[baseStyles.textColorWhite, { fontSize: 8 }]}>08:00 - 17:00</Text>
                                </View>
                            </View>
                            <View style={{
                                borderWidth: 1.5, borderColor: colors.white, padding: 5, borderRadius: 10,
                                width: (screenWidth - 100) / 4, paddingTop: 15, paddingBottom: 15, margin: 5
                            }}>
                                <View style={{ padding: 3, backgroundColor: "#00DF21", alignItems: "center" }}>
                                    <Text style={[baseStyles.textColorWhite, { fontSize: 8 }]}>Soins</Text>
                                </View>
                                <View>
                                    <Text style={[baseStyles.textColorWhite, { fontSize: 8 }]}>08:00 - 17:00</Text>
                                </View>
                            </View>
                        </View>
                    {/* </View> */}
                </ScrollView>
            </LinearGradient>
        )
    }
}

// export default Calendar;
const mapStateToProps = (state) => {
    const { selectedDate, date, prevMonth, nextMonth, startDay ,popToTop} = state.statedata
    return { selectedDate, date, prevMonth, nextMonth, startDay ,popToTop}
};

export default connect(mapStateToProps)(Calendar);
