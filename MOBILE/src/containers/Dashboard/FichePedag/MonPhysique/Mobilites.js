import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    Dimensions,
    StatusBar,
    TouchableOpacity,
    ScrollView,
    View,
    Text,
    Easing,
    ImageBackground,
    RefreshControl,
    Platform
} from 'react-native';
import AutoHeightImage from 'react-native-auto-height-image';
import LinearGradient from 'react-native-linear-gradient';
import colors from '../../../../configs/colors';
import baseStyles from '../../../../base/BaseStyles';
import styles from './styles';
import {SET_ACTIVE_FP, SET_ACTIVE_TAB,SET_ACTIVE_MOBILITEPARAMSVAVIG,SET_SHOW_SUIVANT_AND_PROFIL_TESTMOBILITE} from '../../../../redux/types/tabTypes';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import MAAButton from '../../../../components/MAAButton/MAAButton';
import PersonalDataHelper from "../../../../apis/helpers/person_data_helper";
import statusBarHeight from '../../../../configs/screen';
import {getDashboar} from '../../../../apis/FonctionRedondant';
import dashboardHelper from '../../../../apis/helpers/dashboard_helper';

const screen = Dimensions.get('screen');
const SBHelight = statusBarHeight;
const screenWidth = screen.width
const screenHeight = screen.height - SBHelight


class Mobilites extends Component {

    constructor(props) {
        super(props)
        this.state = {
            monPhysique:null,
            refreshing:false,

        }
    }
    componentDidMount() {
        // this.circularProgress.animate(56, 2000, Easing.quad);
        // this.circularProgress1.animate(100, 2000, Easing.quad);
        // this.circularProgressWhite.animate(100);
        this.getMonPhysique()

    }
    getMonPhysique = async () => {
        this.setState({ refreshing: true })
        const monPhysique = await PersonalDataHelper.getMonPhysique(this.props.userToken)
        if(monPhysique){
            this.setState({ refreshing: false,monPhysique:monPhysique })
        }
        return null;
    }

    componentWillMount() {
    }

    componentWillUpdate() {
    }

    componentDidUpdate() {
    }

    componentWillUnmount() {
        // const setActiveFPAction = { type: SET_ACTIVE_FP, value: 0 }
        // this.props.dispatch(setActiveFPAction)
    }
    _onTestPourcentageVide = (x) => {
        let elementVide = []
        for (let index = 0; index < x; index++) {
            elementVide[index] = <View style={{}}>
                <Text style={[styles.textBold, { fontSize: 25, textAlign: "center", color: colors.white }]}>-</Text>
            </View>
        }
        return elementVide;
    }
    _onTestPourcentagePleine = (y) => {
        let element = []
        for (let indexa = 0; indexa < y; indexa++) {
            element[indexa] = <View style={{ backgroundColor: "#f44130aa", }}>
                <Text style={[styles.textBold, { fontSize: 25, textAlign: "center", color: colors.white }]}>-</Text>
            </View>
        }
        return element;
    }
    render() {
        return (
            <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }} colors={[colors.balck, colors.green, colors.balck]} style={baseStyles.linearGradient}>
                <ScrollView
                    contentInsetAdjustmentBehavior="automatic"
                    contentContainerStyle={[styles.contentContainerStyle,{width: screenWidth}]}

                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.refreshing}
                            onRefresh={() => {
                                this.getMonPhysique()
                            }}
                            tintColor={Platform.OS==='ios'?colors.white:colors.green}
                            colors={[Platform.OS==='ios'?colors.white:colors.green]}
                        />
                    }
                    >

                    <View style={{ alignItems :"center",justifyContent:"center",width:"100%",marginTop:15,marginBottom:10  }}>
                        <TouchableOpacity
                            onPress={() => {
                                if(global.is_venudedonneperso === true) {
                                    const setActiveFPAction = { type: SET_ACTIVE_FP, value: 5 }
                                    this.props.dispatch(setActiveFPAction)
                                    const setActiveTab = {type: SET_ACTIVE_TAB, value: "MonPhysique"};
                                    this.props.dispatch(setActiveTab);
                                    this.props.navigation.navigate('LogedinNavigator');
                                }else{
                                    this.props.navigation.goBack()
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
                            {"Tester ma mobilité"}
                        </Text>
                    </View>

                    <View style={{ padding: 10, justifyContent: "center", alignItems: "center" }}>
                        {
                       (this.state.monPhysique !== null && this.state.monPhysique.data.zones.length >0 ) &&
                       this.state.monPhysique.data.zones.map((item)=>
                        <TouchableOpacity
                            onPress={()=> {
                                const setValue = { type: SET_ACTIVE_MOBILITEPARAMSVAVIG, value: {name:item.name,zoneTest_id:item.id} };
                                this.props.dispatch(setValue);
                                const showsuvantandprofiltestmobilite = { type: SET_SHOW_SUIVANT_AND_PROFIL_TESTMOBILITE, value:false };
                                this.props.dispatch(showsuvantandprofiltestmobilite);
                                console.warn('ato v',showsuvantandprofiltestmobilite)
                                if(global.is_venudedonneperso === true) {
                                    const setActiveTab = { type: SET_ACTIVE_TAB, value: "TestMobilites" };
                                    this.props.dispatch(setActiveTab);
                                    this.props.navigation.navigate('LogedinNavigator');
                                }else{
                                    this.props.navigation.navigate("TestMobilites")
                                }
                            }
                            }
                            style={{margin:10, width: screenWidth - 50, alignItems: "center", alignSelf: "center", flexDirection: "row", justifyContent: "space-between", padding: 10, borderColor: colors.white, borderRadius: 10, height: screenHeight * 0.15, borderWidth: 1 }}>
                               <View style={{flexDirection:'row',alignItems:'center'}}>
                               <View style={{justifyContent:'center',  borderColor: colors.white, borderWidth: 1, width: screenWidth * 0.15, height: screenHeight * 0.098, borderRadius: screenWidth * 0.02 }}>
                                        <AutoHeightImage
                                            style={{ alignSelf: "center", alignItems: "center" }}
                                            width={screenWidth * 0.06}
                                            // source={require("../../../../assets/icons/ankle.png")}
                                            source={{uri: item.image}}
                                        />
                                    </View>
                                <Text style={{ color: colors.white, fontSize: 14,marginLeft:5 }}>
                                    {item.name}
                                </Text>
                               </View>
                                <View>
                                    {console.warn(item.avancement)}
                                    { item.avancement >= 100 &&
                                        <AutoHeightImage
                                        width={34}
                                        source={require("../../../../assets/icons/check.grey.png")}
                                        style={{}} />
                                     }
                                     { (item.avancement >0 && item.avancement <100) &&
                                        <AutoHeightImage
                                        width={32}
                                        source={require("../../../../assets/icons/plusorange.png")}
                                        style={{}} />
                                     }
                                     { (item.avancement === 0) &&
                                        <AutoHeightImage
                                        width={33}
                                        source={require("../../../../assets/icons/plusrouge.png")}
                                        style={{}} />
                                     }
                                </View>
                        </TouchableOpacity>
                       )}




                        {/* <TouchableOpacity
                        onPress={()=> this.props.navigation.navigate("TestMobilites",{name:"Chevilles"})}
                        style={{margin:10, width: screenWidth - 50, alignItems: "center", alignSelf: "center", flexDirection: "row", justifyContent: "space-between", padding: 10, borderColor: colors.white, borderRadius: 10, height: screenHeight * 0.15, borderWidth: 1 }}>
                            <Text style={{ color: colors.white, fontSize: 18 }}>
                                Chevilles
                            </Text>
                            <TouchableOpacity>
                                <AutoHeightImage
                                    width={40}
                                    source={require("../../../../assets/icons/moins.orange.png")}
                                    style={{}} />
                            </TouchableOpacity>
                        </TouchableOpacity>
                        <TouchableOpacity
                        onPress={()=> this.props.navigation.navigate("TestMobilites",{name:"Hanches"})}
                        style={{margin:10, width: screenWidth - 50, alignItems: "center", alignSelf: "center", flexDirection: "row", justifyContent: "space-between", padding: 10, borderColor: colors.white, borderRadius: 10, height: screenHeight * 0.15, borderWidth: 1 }}>
                            <Text style={{ color: colors.white, fontSize: 18 }}>
                                Hanches
                            </Text>
                            <TouchableOpacity>
                                <AutoHeightImage
                                    width={40}
                                    source={require("../../../../assets/icons/croix.rouge.png")}
                                    style={{}} />
                            </TouchableOpacity>
                        </TouchableOpacity>
                        <TouchableOpacity
                        onPress={()=> this.props.navigation.navigate("TestMobilites",{name:"Chaînes musculaires"})}
                        style={{margin:10, width: screenWidth - 50, alignItems: "center", alignSelf: "center", flexDirection: "row", justifyContent: "space-between", padding: 10, borderColor: colors.white, borderRadius: 10, height: screenHeight * 0.15, borderWidth: 1 }}>
                            <Text style={{ color: colors.white, fontSize: 18 }}>
                                Chaînes musculaires
                            </Text>
                            <TouchableOpacity>
                                <AutoHeightImage
                                    width={40}
                                    source={require("../../../../assets/icons/check.red.png")}
                                    style={{}} />
                            </TouchableOpacity>
                        </TouchableOpacity> */}
                    </View>
                    <View style={{marginVertical:20}}></View>
                </ScrollView>
            </LinearGradient>
        )
    }
}

// export default FichePedag;
const mapStateToProps = (state) => {
    const { isFichePedag,userToken } = state.statedata
    return { isFichePedag,userToken }
};

export default connect(mapStateToProps)(Mobilites);
