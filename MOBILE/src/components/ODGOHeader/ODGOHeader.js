import React, {Component, Fragment} from 'react';
import { connect } from 'react-redux';
import {
    View,
    Text,
    TouchableOpacity,
    Dimensions,
    StatusBar,
    Platform
} from 'react-native';
import AutoHeightImage from 'react-native-auto-height-image';
import styles from './styles';
import {SET_ACTIVE_TAB, SET_ACTIVE_CALENDAR_RED, SET_POP_TO_TOP,SET_ACTIVE_FP} from '../../redux/types/tabTypes';
import statusBarHeight from '../../configs/screen';
import {MiniOfflineSign, unsubscribe} from '../../apis/FonctionRedondant';
import NetInfo from '@react-native-community/netinfo';
import colors from '../../configs/colors';

const screen = Dimensions.get('screen');
const SBHelight = statusBarHeight;
const screenWidth = screen.width
const screenHeight = screen.height - SBHelight

class ODGOHeader extends Component {
    constructor(props) {
        super(props)
        this.state = {
            activeTab: props.activeTab,
            isFichePedag: props.isFichePedag
        }
    }

    render() {
        let isrestrictget_agenda = false;
        if(this.props.droits.length>0){
            for(let i = 0; i < this.props.droits.length; i++){
                if(this.props.droits[i].name === "get_agenda"){
                    isrestrictget_agenda  = this.props.droits[i].is_restrict;
                    break;
                }
            }
        }
        unsubscribe(NetInfo,this.props);
        return (
            <View style={[styles.headerCtn,{paddingTop:Platform.OS === 'ios'?statusBarHeight:0}]}>
                { !this.props.isConnected &&
                <View style={{position:'relative', zIndex:30,marginTop: Platform.OS ==='ios'? 15: 0}}>
                <MiniOfflineSign />
                </View>
                }
                <View style={{padding: 0,
                    paddingRight: 15,
                    paddingLeft: 15,
                    marginTop: 0,
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    backgroundColor: colors.balck,
                    // flex: 1,
                    width:screenWidth,
                    minHeight: 80
                    }}>
                    <TouchableOpacity onPress={() => {
                        const setActiveTabAction = { type: SET_ACTIVE_TAB, value: "profile" }
                        this.props.dispatch(setActiveTabAction) //
                        const setActiveFPAction = { type: SET_ACTIVE_FP, value: -1 }
                        this.props.dispatch(setActiveFPAction)

                        // if(this.props.activeTab == "home"){    //a reflechir plus tard
                        //     // this.setState({showCalendar: true})
                        //     this.props.navigation.navigate("Calendar")
                        //     const setPopToTop = { type: SET_POP_TO_TOP, value: '' };
                        //     this.props.dispatch(setPopToTop);
                        //
                        // } else {
                        //
                        //     const setPopToTop = { type: SET_POP_TO_TOP, value: 'home' };
                        //     this.props.dispatch(setPopToTop);
                        // }




                        // this.props.navigation.navigate("FichePedag")
                    }}>
                        <AutoHeightImage
                            width={24}
                            source={
                                this.props.activeTab == "profile" ?
                                    require('../../assets/icons/personRouge.png') :
                                    require('../../assets/icons/personBlanc.png')}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <AutoHeightImage
                            width={(screenWidth * 0.43)}
                            source={require('../../assets/images/logo.png')}
                            style={{marginLeft:-screenWidth*0.01}}
                        />
                    </TouchableOpacity>
                    {!isrestrictget_agenda ?<TouchableOpacity onPress={() => {
                        // const setActiveTabAction = { type: SET_ACTIVE_CALENDAR_RED, value: "calendarred" }
                        // this.props.dispatch(setActiveTabAction)
                        const setActiveTabAction = { type: SET_ACTIVE_TAB, value: "calendartopright" }
                        const setPopToTop = { type: SET_POP_TO_TOP, value: '' };
                        this.props.dispatch(setActiveTabAction)
                        this.props.dispatch(setPopToTop);

                        const setActiveFPAction = { type: SET_ACTIVE_FP, value: -1 }
                        this.props.dispatch(setActiveFPAction)

                    }}>
                        <AutoHeightImage
                            width={24}
                            source={
                                this.props.activeTab == "calendartopright" ?
                                    require('../../assets/icons/planred.png') :
                                    require('../../assets/icons/planwhite.png')
                            }
                        />
                    </TouchableOpacity>
                    :
                        <View >
                            <AutoHeightImage
                                width={24}
                                style={{tintColor:colors.grisee}}
                                source={
                                    this.props.activeTab == "calendartopright" ?
                                        require('../../assets/icons/planred.png') :
                                        require('../../assets/icons/planwhite.png')
                                }
                            />
                        </View>
                    }
                </View>

                {

                    this.props.isFichePedag > 0 ?
                        <View style={{flexDirection: "row",alignSelf:'center',
                            alignItems: "center",
                            justifyContent: "center",
                            width: screenWidth,
                            marginLeft:-screenWidth*0.007
                        }}>
                            <View style={[styles.barPagingCtn]}>

                                <View style={[this.props.isFichePedag == 1 ? styles.outRoundSelected : styles.outRound]}>
                                    <View style={[this.props.isFichePedag >= 1 ? styles.inRoundSelected : styles.inRound]}></View>
                                </View>
                                <View style={[this.props.isFichePedag >= 2 ? styles.barPassed : styles.barWhite]}></View>

                                <View style={[this.props.isFichePedag == 2 ? styles.outRoundSelected : styles.outRound]}>
                                    <View style={[this.props.isFichePedag >= 2 ? styles.inRoundSelected : styles.inRound]}></View>
                                </View>

                                <View style={[this.props.isFichePedag >= 3 ? styles.barPassed : styles.barWhite]}></View>
                                <View style={[this.props.isFichePedag == 3 ? styles.outRoundSelected : styles.outRound]}>
                                    <View style={[this.props.isFichePedag >= 3 ? styles.inRoundSelected : styles.inRound]}></View>
                                </View>

                                <View style={[this.props.isFichePedag >= 4 ? styles.barPassed : styles.barWhite]}></View>
                                <View style={[this.props.isFichePedag == 4 ? styles.outRoundSelected : styles.outRound]}>
                                    <View style={[this.props.isFichePedag >= 4 ? styles.inRoundSelected : styles.inRound]}></View>
                                </View>

                                <View style={[this.props.isFichePedag >= 5 ? styles.barPassed : styles.barWhite]}></View>
                                <View style={[this.props.isFichePedag == 5 ? styles.outRoundSelected : styles.outRound]}>
                                    <View style={[this.props.isFichePedag >= 5 ? styles.inRoundSelected : styles.inRound]}></View>
                                </View>

                            </View>

                        </View>
                        : <View/>
                        // : <View><Text style={{color:"#FFF"}}>Test</Text></View>
                }

            </View>
        )
    }
}

// export default ODGOHeader;
const mapStateToProps = (state) => {
    const { activeTab, isFichePedag,activecalendared,isConnected,droits } = state.statedata
    return { activeTab, isFichePedag,activecalendared,isConnected,droits }
};

export default connect(mapStateToProps)(ODGOHeader);
