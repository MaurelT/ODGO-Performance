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
import {
    SET_ACTIVE_FP,
    SET_ACTIVE_MOBILITEPARAMSUNIT,
    SET_ACTIVE_TAB,
    SET_TEST_MOBILITE_GET_REDUX,
} from '../../../../redux/types/tabTypes';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import MAAButton from '../../../../components/MAAButton/MAAButton';
import PersonalDataHelper from '../../../../apis/helpers/person_data_helper';
import statusBarHeight from '../../../../configs/screen';
import {getDashboar} from '../../../../apis/FonctionRedondant';
import dashboardHelper from '../../../../apis/helpers/dashboard_helper';

const screen = Dimensions.get('screen');
const SBHelight = statusBarHeight;
const screenWidth = screen.width
const screenHeight = screen.height - SBHelight


class TestMobilites extends Component {

    constructor(props) {
        super(props)
        this.state = {
            name: this.props.mobiliteparamsvavig.name,
            testMobilites:null,
            refreshing:false,
        }
    }
    componentDidMount() {

        this.getTestMobilite();
    }


    getTestMobilite = async () => {
        this.setState({ refreshing: true })
        console.warn('zontestid',this.props.mobiliteparamsvavig);
        const TestMobilites = await PersonalDataHelper.getTestMobilite(this.props.userToken,this.props.mobiliteparamsvavig.zoneTest_id)
        if(TestMobilites){
            // testmobiliteviagetredux
            const testmob = { type: SET_TEST_MOBILITE_GET_REDUX, value: TestMobilites }
            this.props.dispatch(testmob)
            this.setState({ refreshing: false })
        }
        return null;
    }



    componentWillUnmount() {
        // const setActiveFPAction = { type: SET_ACTIVE_FP, value: 0 }
        // this.props.dispatch(setActiveFPAction)
    }
    render() {
        return (
            <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }} colors={[colors.balck, colors.green, colors.balck]} style={baseStyles.linearGradient}>
                <ScrollView
                    contentInsetAdjustmentBehavior="automatic"
                    contentContainerStyle={[styles.contentContainerStyle,{width:screenWidth}]}
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.refreshing}
                            onRefresh={() => {
                                this.getTestMobilite()
                            }}
                            tintColor={Platform.OS==='ios'?colors.white:colors.green}
                            colors={[Platform.OS==='ios'?colors.white:colors.green]}
                        />
                    }
                    >


                    <View style={{ alignItems :"center",justifyContent:"center",width:"100%",marginTop:15 ,marginBottom:10 }}>
                        <TouchableOpacity
                            onPress={() => {
                                if(global.is_venudedonneperso === true) {
                                    const setActiveFPAction = { type: SET_ACTIVE_FP, value: 5 }
                                    this.props.dispatch(setActiveFPAction)
                                    const setActiveTab = { type: SET_ACTIVE_TAB, value: "Mobilites" };
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
                            {this.state.name}
                        </Text>
                    </View>

                    <View style={{ padding: 10, justifyContent: "center", alignItems: "center" }}>
                        { (this.props.testmobiliteviagetredux !== null && this.props.testmobiliteviagetredux.data.length > 0 ) &&
                        this.props.testmobiliteviagetredux.data.map(
                            (item)=>{
                                return(
                                    <TouchableOpacity
                        onPress={
                            ()=> {
                                const setValue = { type: SET_ACTIVE_MOBILITEPARAMSUNIT, value: {video_test_id:item.id} };
                                this.props.dispatch(setValue);
                                if(global.is_venudedonneperso === true) {
                                    const setActiveTab = { type: SET_ACTIVE_TAB, value: "TestMobilitesUnitaires" };
                                    this.props.dispatch(setActiveTab);
                                    this.props.navigation.navigate('LogedinNavigator');
                                }else{
                                    this.props.navigation.navigate("TestMobilitesUnitaires")}
                            }
                            }
                        style={{margin:10, width: screenWidth - 50, alignItems: "center", alignSelf: "center", flexDirection: "row", justifyContent: "space-between", padding: 10, borderColor: colors.white, borderRadius: (screenWidth-50)/2, height: screenHeight * 0.1, borderWidth: 1 }}>
                            <Text style={{ color: colors.white, fontSize: 14 }}>
                                {item.name}
                            </Text>
                            <View>
                                {
                                    item.is_done === true ?
                                    <AutoHeightImage
                                        width={34}
                                    source={require("../../../../assets/icons/check.grey.png")}
                                    style={{}} />
                                    :
                                    <AutoHeightImage
                                    width={33}
                                    source={require("../../../../assets/icons/plusrouge.png")}
                                    style={{}} />
                                }
                            </View>
                        </TouchableOpacity>
                                )
                            }
                        )
                        }
                        {/* <TouchableOpacity
                        // onPress={()=> this.props.navigation.navigate("TestMobilites",{name:"Chevilles"})}
                        style={{margin:10, width: screenWidth - 50, alignItems: "center", alignSelf: "center", flexDirection: "row", justifyContent: "space-between", padding: 10, borderColor: colors.white, borderRadius: (screenWidth-50)/2, height: screenHeight * 0.1, borderWidth: 1 }}>
                            <Text style={{ color: colors.white, fontSize: 18 }}>
                                Test 2
                            </Text>
                            <TouchableOpacity>
                                <AutoHeightImage
                                    width={40}
                                    source={require("../../../../assets/icons/check.red.png")}
                                    style={{}} />
                            </TouchableOpacity>
                        </TouchableOpacity>
                        <TouchableOpacity
                        // onPress={()=> this.props.navigation.navigate("TestMobilites",{name:"Hanches"})}
                        style={{margin:10, width: screenWidth - 50, alignItems: "center", alignSelf: "center", flexDirection: "row", justifyContent: "space-between", padding: 10, borderColor: colors.white, borderRadius: (screenWidth-50)/2, height: screenHeight * 0.1, borderWidth: 1 }}>
                            <Text style={{ color: colors.white, fontSize: 18 }}>
                                Test 3
                            </Text>
                            <TouchableOpacity>
                                <AutoHeightImage
                                    width={40}
                                    source={require("../../../../assets/icons/check.red.png")}
                                    style={{}} />
                            </TouchableOpacity>
                        </TouchableOpacity>
                        <TouchableOpacity
                        // onPress={()=> this.props.navigation.navigate("TestMobilites",{name:"Chaînes musculaires"})}
                        style={{margin:10, width: screenWidth - 50, alignItems: "center", alignSelf: "center", flexDirection: "row", justifyContent: "space-between", padding: 10, borderColor: colors.white, borderRadius: (screenWidth-50)/2, height: screenHeight * 0.1, borderWidth: 1 }}>
                            <Text style={{ color: colors.white, fontSize: 18 }}>
                                Test 4
                            </Text>
                            <TouchableOpacity>
                                <AutoHeightImage
                                    width={40}
                                    source={require("../../../../assets/icons/check.red.png")}
                                    style={{}} />
                            </TouchableOpacity>
                        </TouchableOpacity> */}
                    </View>

                        {/*{*/}
                        {/*    this.props.showsuvantandprofiltestmobilite &&*/}
                        {/*<View style={{alignItems:'center',marginBottom:20}}>*/}
                        {/*<MAAButton text={"SUIVANT"} width={(screenWidth - 100)} height={40}*/}
                        {/*           onPress={() => {*/}

                        {/*                   const setActiveFPAction = { type: SET_ACTIVE_FP, value: 0}*/}
                        {/*                   this.props.dispatch(setActiveFPAction)*/}
                        {/*               const setActiveTab = { type: SET_ACTIVE_TAB, value: "home" };*/}
                        {/*               this.props.dispatch(setActiveTab);*/}
                        {/*               this.props.navigation.navigate("LogedinNavigator")*/}

                        {/*           }}*/}
                        {/*           style={[styles.btnValidate]}*/}
                        {/*/>*/}


                        {/*    <MAAButton text={"MON PROFIL"} width={(screenWidth - 100)} height={40} backgroundColor='transparent' borderColor='#fff'*/}
                        {/*               onPress={() => {*/}
                        {/*                   const setActiveFPAction = {type: SET_ACTIVE_FP, value: null}*/}
                        {/*                   this.props.dispatch(setActiveFPAction)*/}
                        {/*                   if( global.is_venudedonneperso === true) {*/}
                        {/*                       console.warn('vers profile');*/}
                        {/*                       const setActiveTab = {type: SET_ACTIVE_TAB, value: "profile"};*/}
                        {/*                       this.props.dispatch(setActiveTab);*/}
                        {/*                   }else{*/}
                        {/*                       this.props.navigation.popToTop();*/}
                        {/*                   }*/}
                        {/*               }}*/}
                        {/*               style={[styles.btnMonProfil]}*/}
                        {/*    />*/}
                        {/*</View>*/}
                        {/*}*/}

                </ScrollView>
            </LinearGradient>
        )
    }
}

// export default FichePedag;
const mapStateToProps = (state) => {
    const { isFichePedag,userToken,mobiliteparamsvavig,showsuvantandprofiltestmobilite,testmobiliteviagetredux } = state.statedata
    return { isFichePedag,userToken,mobiliteparamsvavig,showsuvantandprofiltestmobilite,testmobiliteviagetredux}
};

export default connect(mapStateToProps)(TestMobilites);
