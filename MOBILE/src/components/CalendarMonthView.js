import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    StyleSheet,
    View,
    Dimensions,
    StatusBar,
    Text,
    TouchableOpacity
} from 'react-native';
import colors from '../configs/colors';
import baseStyles from '../base/BaseStyles';
import AutoHeightImage from 'react-native-auto-height-image';
import statusBarHeight from '../configs/screen';

const screen = Dimensions.get("window");
const SBHelight = statusBarHeight;
const screenWidth = screen.width
const screenHeight = screen.height - SBHelight


class CalendarMonthView extends Component {

    listMonthFullLetter = [
        "Janvier",
        "Fevrier",
        "Mars",
        "Avril",
        "Mai",
        "Juin",
        "Juillet",
        "Aout",
        "Septembre",
        "Octobre",
        "Novembre",
        "Decembre"
    ]

    swiper = []
    showDayText = ["LU", "MA", "ME", "JE", "VE", "SA", "DI"]
    rowNB = [1, 2, 3, 4, 5, 6, 7]
    listMonth = []
    listMonthBix = [1]
    listMonth30 = [3,5,8,10]
    listMonth31 = [0,2,4,6,7,9,11]

    constructor(props) {
        super(props)
        this.state = {
            refreshing: false,
            time: props.time,
            date: props.type == "prevMonth" ? props.prevMonth :
                (props.type == "date" ? props.date : props.nextMonth),
            prevMonth: props.prevMonth,
            nextMonth: props.nextMonth,
            startDay: 0,
            months28: [1],
            rowsToRender: [
                [0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0]
            ],
            outOfMonth: [],
            postDate: []

        }

        console.log("Props type : " + props.type)

    }

    async componentDidMount() {
        let dateis = new Date()
        dateis.setTime(this.state.date.getTime())
        dateis.setDate(1)
        console.log("Start day : " + dateis.getDate())
        await this.setState({date: dateis})
        await this.setState({ startDay: (this.state.date.getDay() == 0 ? 6 : (this.state.date.getDay() - 1)) })
        console.log("Start day : " + this.state.startDay)

        this.calaculateRows()
    }

     calaculateRows = async () => {
        let rows = []
        let row1 = [0,0,0,0,0,0,0]
        let row2 = [0,0,0,0,0,0,0]
        let row3 = [0,0,0,0,0,0,0]
        let row4 = [0,0,0,0,0,0,0]
        let row5 = [0,0,0,0,0,0,0]
        let row6 = [0,0,0,0,0,0,0]
        let outOfMonth = []
        if (this.state.startDay > 0) {
            for (let z = (this.state.startDay - 1); z >= 0; z--) {
                row1[z] = 31 + (z - (this.state.startDay - 1))
                outOfMonth.push(1)
            }
        }
        for (let c = this.state.startDay; c < 7; c++) {
            row1[c] = (c - this.state.startDay) + 1

        }
        for (let c = 0; c < 7; c++) {
            row2[c] = (c + row1[6] + 1)
        }
        for (let c = 0; c < 7; c++) {
            row3[c] = (c + row2[6] + 1)
        }
        for (let c = 0; c < 7; c++) {
            row4[c] = (c + row3[6] + 1)
        }
        for (let c = 0; c < 7; c++) {
            row5[c] = (c + row4[6] + 1)
            if (this.listMonth31.indexOf(this.state.date.getMonth()) != -1 && (c + row4[6] + 1) > 31 ) {
                let postDate = []
                row5[c] = (c + row4[6] + 1) - 31
                postDate.push(1)
            }
            if (this.listMonth30.indexOf(this.state.date.getMonth()) != -1 && (c + row4[6] + 1) > 30 ) {
                let postDate = []
                row5[c] = (c + row4[6] + 1) - 30
                postDate.push(1)
            }
        }
        for (let c = 0; c < 7; c++) {
            row6[c] = (c + row5[6] + 1)
            if (this.listMonth31.indexOf(this.state.date.getMonth()) != -1 && (c + row5[6] + 1) > 31 ) {
                let postDate = []
                row6[c] = (c + row5[6] + 1) - 31
                postDate.push(1)
            }
            if (this.listMonth30.indexOf(this.state.date.getMonth()) != -1 && (c + row5[6] + 1) > 30 ) {
                let postDate = []
                row6[c] = (c + row5[6] + 1) - 30
                postDate.push(1)
            }
        }
        // for (let c = (30 - this.state.startDay); c < 42; c++) {
        //     row6[c] = (c + 1)
        //     if (this.state.startDay > 0) {
        //         for (let z = (this.state.startDay - 1); z >= 0; z--) {
        //             row1[z] = (z + 1)
        //         }
        //     }
        // }
        rows[0] = row1
        rows[1] = row2
        rows[2] = row3
        rows[3] = row4
        rows[4] = row5
        rows[5] = row6
        this.setState({rowsToRender: rows})
        this.setState({outOfMonth: outOfMonth})
    }

    render() {
        return (
            <View style={[styles.monthViewCtn]}>
                <View style={[styles.calendarHeader]}>
                    <TouchableOpacity
                        style={[styles.changeMBtn]}
                        onPress={() => {
                            this.props.previewMonth()
                        }}
                    >
                        <AutoHeightImage
                            width={15}
                            source={require("../assets/icons/arrow-white.png")}
                            style={{
                                transform: [
                                    { rotateY: "180deg" }
                                ],
                                margin: 20
                            }} />
                    </TouchableOpacity>
                    <Text style={[baseStyles.textColorWhite]}>
                        {
                            this.props.date != null && this.props.type == "date" ?
                            this.listMonthFullLetter[this.props.date.getMonth()] : ""
                        }
                        {
                            this.props.prevMonth != null && this.props.type == "prevMonth" ?
                            this.listMonthFullLetter[this.props.prevMonth.getMonth()] : ""
                        }
                        {
                            this.props.nextMonth != null && this.props.type == "nextMonth" ?
                            this.listMonthFullLetter[this.props.nextMonth.getMonth()] : ""
                        }
                    </Text>
                    <TouchableOpacity
                        style={[styles.changeMBtn]}
                        onPress={() => {
                            this.props.nextMonth()
                        }}
                    >
                        <AutoHeightImage
                            width={15}
                            source={require("../assets/icons/arrow-white.png")}
                            style={{ margin: 20 }} />
                    </TouchableOpacity>
                </View>

                {
                    this.rowNB.map((valueRow, indexRow) => {
                        return (
                            <View style={[styles.row]}>
                                {
                                    this.showDayText.map((valueCol, indexCol) => {
                                        return (
                                            <TouchableOpacity>
                                                <View style={[styles.col, (indexCol == 6 ? styles.lastCol : {}),
                                                (indexRow == 0 ? styles.firstRowCol : {})]}>
                                                    <Text style={[baseStyles.textColorWhite,
                                                        (this.state.outOfMonth[indexCol] != null && indexRow == 1 ? baseStyles.textColorGrey : {})]}>
                                                        {
                                                            indexRow == 0 ? valueCol : (this.state.rowsToRender[(indexRow - 1)][indexCol])

                                                        }
                                                    </Text>
                                                </View>
                                            </TouchableOpacity>
                                        )
                                    })
                                }
                            </View>
                        )
                    })
                }



            </View>
        )
    }
}

const styles = StyleSheet.create({
    monthViewCtn: {
        height: "100%",
        width: screenWidth,
        alignItems: "center",
    },
    calendarHeader: {
        width: screenWidth,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-evenly"
    },
    changeMBtn: {
        // padding: 20
        backgroundColor: colors.red + "00"
    },
    row: {
        flexDirection: "row",
        alignItems: "center",
        borderBottomWidth: 0.5,
        borderBottomColor: colors.white + "44"
    },
    firstRowCol: {
        height: 30,
        alignItems: "center",
        justifyContent: "center"
    },
    col: {
        alignItems: "center",
        width: (screenWidth - 40) / 7,
        height: 60,
        borderRightWidth: 0.5,
        borderRightColor: colors.white + "44"

    },
    lastCol: {
        borderRightWidth: 0,
        borderRightColor: colors.white + "00"
    }
})

// export default CalendarMonthView;
const mapStateToProps = (state) => {
    const { selectedDate, date, prevMonth, nextMonth, startDay } = state.statedata
    return { selectedDate, date, prevMonth, nextMonth, startDay }
};

export default connect(mapStateToProps)(CalendarMonthView);
