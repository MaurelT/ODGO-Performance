import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    Dimensions,
    StatusBar,
    ScrollView,
    View,
    TouchableOpacity,
    Text, RefreshControl, Alert,
} from 'react-native';
import colors from '../../configs/colors';
import baseStyles from '../../base/BaseStyles';
import LinearGradient from 'react-native-linear-gradient';
import styles from './styles';
import AutoHeightImage from 'react-native-auto-height-image';
import {SET_POP_TO_TOP} from "../../redux/types/tabTypes";
import CalendarEventHelper from '../../apis/helpers/calendarEvent_helper';
import HalfRed from '../../components/HalfRed/HalfRed';
import statusBarHeight from '../../configs/screen';
import moment from 'moment';

const screen = Dimensions.get("window");
const SBHelight = statusBarHeight;
const screenWidth = screen.width
const screenHeight = screen.height - SBHelight

class Listecompetition extends Component {
    constructor(props) {
        super(props)
        this.state = {
            listecompetitiondata:[],
            popToTop:this.props.popToTop,
            year:null,
            month:null,
            day:null,
        }
    }

    componentDidMount() {
        let year  = this.props.navigation.state.params.year;
        let month  = this.props.navigation.state.params.month;
        let day  = this.props.navigation.state.params.day;
        this.setState({year:year,month:month,day:day})
        this.getCompetitionByDay(year,month,day);
    }

    SortTime(a,b){
        let da = new Date(a.comp_date);
        let db = new Date(b.comp_date);
        return (da<db)?1:-1;
    }

    getCompetitionByDay = async (annee,month,day) => {
        this.setState({refreshing: true})
        const listecompetition = await CalendarEventHelper.getCompetitionByDay(this.props.userToken, annee, month,day);
        if (listecompetition) {
            this.setState({listecompetitiondata:listecompetition.data.sort(this.SortTime)});

            // this.setState({listecompetitiondata:listecompetition.data});
            this.setState({refreshing:false})
        }
    };

    render() {
        if(this.props.popToTop === 'perfo'){
            this.props.navigation.popToTop();
            const setPopToTop = { type: SET_POP_TO_TOP, value: '' }
            this.props.dispatch(setPopToTop);
        }
        return (
            <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }} colors={[colors.balck, colors.green, colors.balck]} style={baseStyles.linearGradient}>
                <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between',marginLeft:20,width:'100%'}}>
                    <TouchableOpacity style={[styles.noSelectedBtn, { alignSelf:"center"}]}
                                      onPress={() => {
                                          console.log("Changing Zone")
                                          this.props.navigation.goBack()
                                      }}>
                        <AutoHeightImage
                            width={18}
                            source={require("../../assets/icons/arrow-white.png")}
                            style={{
                                transform: [
                                    { rotateY: "180deg" }
                                ]
                            }} />
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.noSelectedBtn,{paddingLeft:18, alignSelf:"center"}]}
                                      onPress={async () => {
                                          console.log("Chenging Zone")
                                          // await this.setState({ selectedType: "" })
                                          // await this.setState({ activeContent: "choice" })
                                      }}>
                        <View style={[styles.headCtn]}>
                            <Text style={[baseStyles.titleText]}>
                                {"Compétitions"}
                            </Text>
                        </View>
                    </TouchableOpacity>

                    <View style={{ width: 60 }}>
                        <Text style={{ color: colors.balck + "00" }}>...</Text>
                    </View>

                </View>
                <ScrollView
                    contentInsetAdjustmentBehavior="automatic"
                    style={[styles.scrollView,]}
                    contentContainerStyle={[styles.contentContainerStyle,{alignItems:'center',marginTop:20}]}
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.refreshing}
                            onRefresh={() => {
                                this.getCompetitionByDay(this.state.year,this.state.month,this.state.day);
                                this.setState({refreshing: true})
                                setTimeout(() => {
                                    this.setState({refreshing: false})
                                }, 1000)
                            }}
                        />
                    }>


                    {
                        this.state.listecompetitiondata.length > 0 &&  this.state.listecompetitiondata.map((item, index) => {
                                  return ( <HalfRed key={'putaindekey' + index}
                                                    redText={moment(item.comp_date).format('HH:mm')}
                                                    blackText={item.participant1_name + " vs " + item.participant2_name +" ("+item.name+")"}
                                             onPress={() => {
                                                //  Alert.alert('ok',item.id)
                                                 //nesoriko
                                         //   this.props.navigation.navigate("HistoriqueCompetition", {id: item.id})
                                   }}/>
                                )
                        })
                    }
                </ScrollView>
            </LinearGradient>
        )
    }
}

// export default StatEnergy;
const mapStateToProps = (state) => {
    const { popToTop,userToken } = state.statedata
    return { popToTop,userToken  }
};

export default connect(mapStateToProps)(Listecompetition);
