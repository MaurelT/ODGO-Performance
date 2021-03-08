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
    ImageBackground, RefreshControl,Platform
} from 'react-native';
import AutoHeightImage from 'react-native-auto-height-image';
import LinearGradient from 'react-native-linear-gradient';
import colors from '../../../../configs/colors';
import baseStyles from '../../../../base/BaseStyles';
import styles from './styles';
import ProgressCircle from 'react-native-progress-circle';
import * as Progress from 'react-native-progress';

import {
    SET_ACTIVE_FP,
    SET_ACTIVE_MOBILITEPARAMSVAVIG,
    SET_ACTIVE_TAB, SET_ACTIVE_TABMENU_CARNET,
    SET_SHOW_SUIVANT_AND_PROFIL_TESTMOBILITE,
} from '../../../../redux/types/tabTypes';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import MAAButton from '../../../../components/MAAButton/MAAButton';
import PersonalDataHelper from "../../../../apis/helpers/person_data_helper";
import {getMonPhysique, getSelectionnerNosSuggestion} from '../../../../apis/FonctionRedondant';
import statusBarHeight from '../../../../configs/screen';
import msi from '../../../../apis/helpers/sommeil_helper';
const screen = Dimensions.get('screen');
const SBHelight = statusBarHeight;
const screenWidth = screen.width;
const screenHeight = screen.height - SBHelight;


class MonPhysique extends Component {

    constructor(props) {
        super(props)
        this.state = {
            refreshing:false,
            monPhysique:null,
            pointfort:"-",
            notefort:0,
            pointfaible:"-",
            notefaible:0,
        }
    }
    componentDidMount() {
        // this.circularProgress1.animate(100, 0, Easing.quad);
        // this.circularProgress.animate(0, 2000, Easing.quad);

        const setActiveFPAction = { type: SET_ACTIVE_FP, value: 5 }
        this.props.dispatch(setActiveFPAction)

        this.setState({ refreshing: true })
        getMonPhysique(PersonalDataHelper,this.props).then((refreshingfalse)=>{
           // this.setState({ monPhysique:monPhysique })//NAVADIKA REDUX
            this.setState({
                refreshing: refreshingfalse
            });
        });
        this.getPointFortFaible()

    }

    async getPointFortFaible(){
        this.setState({
            refreshing: true
        });
        const getpointfortfaible = await PersonalDataHelper.getpointfortfaible(this.props.userToken);
        if(getpointfortfaible){
            if(getpointfortfaible.data.point_fort == null){
                this.setState({pointfort:"-"});
            }else{
                this.setState({pointfort:getpointfortfaible.data.point_fort.image});
                if(getpointfortfaible.data.point_fort.note>= 100){
                    this.setState({notefort:100});
                }else{
                    this.setState({notefort:getpointfortfaible.data.point_fort.note});
                }
            }

            if(getpointfortfaible.data.point_faible == null){
                this.setState({ pointfaible:"-"});
            }else{
                this.setState({ pointfaible:getpointfortfaible.data.point_faible.image});
                if(getpointfortfaible.data.point_faible.note>= 100){
                    this.setState({ notefaible:100});
                }else{
                    this.setState({ notefaible:getpointfortfaible.data.point_faible.note});
                }
            }

            this.setState({ refreshing: false});
        }
    }


    componentWillMount() {
    }

    componentWillUpdate() {
    }

    componentDidUpdate() {
    }

    componentWillUnmount() {
        const setActiveFPAction = { type: SET_ACTIVE_FP, value: 0 }
        this.props.dispatch(setActiveFPAction)
    }
    _onTestPourcentageVide = (x) => {
        let elementVide = []
        for (let index = 0; index < x; index++) {
            elementVide[index] = <View style={{}}>
                <Text style={[styles.textBold, { fontSize: 15, textAlign: "center", color: colors.white }]}>-</Text>
            </View>
        }
        return elementVide;
    }
    _onTestPourcentagePleine = (y) => {
        let element = []
        for (let indexa = 0; indexa < y; indexa++) {
            element[indexa] = <View style={{ backgroundColor: "#f44130aa", }}>
                <Text style={[styles.textBold, { fontSize: 15, textAlign: "center", color: colors.white }]}>-</Text>
            </View>
        }
        return element;
    }
    render() {
        if(this.circularProgress1){
          //  this.circularProgress1.animate(  100, 0, Easing.quad);
        }

        console.warn('notefort',this.state.notefort);

        if(this.circularProgressfort){
                if(this.circularProgressfort !== undefined){
                    try{
                  //      this.circularProgressfort.animate(  this.state.notefort.toFixed(0), 1000, Easing.quad);
                    }catch (e) { }
                }
        }

        console.warn('notefaible',this.state.notefaible);

        if(this.circularProgressfaible){

            if(this.circularProgressfaible !== undefined){

                try{
               //     this.circularProgressfaible.animate(  this.state.notefaible.toFixed(0), 1000, Easing.quad);
                }catch (e) { }
            }

        }
        if(this.circularProgress){
        //    this.circularProgress.animate(  0, 1000, Easing.quad);
        }
        let newval = 0
        // if(this.circularProgress){
            if(this.props.monPhysique != null){
                // if(this.circularProgress !== undefined){
                    let total = 0;
                    for( let i=0;i<this.props.monPhysique.data.length;i++){
                        total +=this.props.monPhysique.data[i].progression;
                    }
                    this.moyenne = total/this.props.monPhysique.data.length;// ts tkn iasa tson

                    //new api

                    if(this.props.monPhysique !== null && this.props.monPhysique !== false){
                        newval =  this.props.monPhysique.data.pourcentage_total.toFixed(0)
                        if(newval>=100){
                            newval = 100;
                        }
                        console.warn('this.props.monPhysique',this.props.monPhysique.data)
                       // this.circularProgress.animate(  newval, 1000, Easing.quad);
                    }

                // }
            }
        // }


        return (
            <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }} colors={[colors.balck, colors.green, colors.balck]} style={baseStyles.linearGradient}>
                <ScrollView
                    contentInsetAdjustmentBehavior="automatic"
                    style={styles.scrollView}
                    contentContainerStyle={[styles.contentContainerStyle,{marginLeft:-screenWidth*0.005}]}
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.refreshing}
                            onRefresh={() => {
                                this.setState({refreshing:true})
                                getMonPhysique(PersonalDataHelper,this.props).then((refreshingfalse)=>{
                                    this.setState({
                                        refreshing: refreshingfalse
                                    });
                                });
                            }}
                            tintColor={Platform.OS==='ios'?colors.white:colors.green}
                            colors={[Platform.OS==='ios'?colors.white:colors.green]}
                        />
                    }
                >

                    <View style={{
                        // alignSelf: "flex-start",
                        width: screenWidth,
                        alignItems: "center",
                        justifyContent: "center",
                        paddingVertical: 15,
                        // backgroundColor: colors.balck,
                        flexDirection: "row"
                    }}>
                        <TouchableOpacity style={{
                            width: 40, height: 40, alignItems: "center",
                            justifyContent: "center", alignSelf:"center", position:'absolute',left:10
                        }}
                            onPress={async () => {

                                if(global.is_venudedonneperso === true){
                                    const setActive = { type: SET_ACTIVE_TABMENU_CARNET, value: 2 };
                                    await this.props.dispatch(setActive);
                                    const setActiveTab = {type: SET_ACTIVE_TAB, value: "Carnet"};
                                    this.props.dispatch(setActiveTab);
                                    this.props.navigation.navigate('LogedinNavigator');
                                }else{
                                    const setActive = { type: SET_ACTIVE_TABMENU_CARNET, value: 2 };
                                    await this.props.dispatch(setActive);
                                    this.props.navigation.goBack();
                                }
                                const setActiveFPAction = { type: SET_ACTIVE_FP, value: 4 }
                                this.props.dispatch(setActiveFPAction)
                            }}>
                            <AutoHeightImage
                                width={20}
                                source={require("../../../../assets/icons/arrow-white.png")}
                                style={{
                                    transform: [
                                        { rotateY: "180deg" }
                                    ],
                                }} />
                        </TouchableOpacity>
                        <Text style={{
                            color: colors.white,
                            fontSize: 20,
                            marginLeft:-screenWidth*0.01,
                            alignSelf:"center"
                        }}>
                            Testing
                        </Text>


                    </View>

                    <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
                        <View style={[styles.outerProgress, { marginTop: 50, alignSelf: "flex-end" }]}>
                            {/*<AnimatedCircularProgress*/}
                            {/*    size={screenWidth * 0.27}*/}
                            {/*    width={7}*/}
                            {/*    prefill={100}*/}
                            {/*    fill={100}*/}
                            {/*    // tintColor={"#b5b5b5"}*/}
                            {/*    tintColor={"white"}*/}
                            {/*    lineCap={"round"}*/}
                            {/*    style={{*/}
                            {/*        // overflow: "hidden",*/}
                            {/*        // borderRadius:screenWidth * 0.27,*/}
                            {/*        // borderWidth:0.1,*/}
                            {/*        // borderColor:'#D9D9D9'*/}
                            {/*        position:'absolute',*/}
                            {/*    }}*/}
                            {/*    backgroundColor="transparent"*/}
                            {/*>*/}
                            {/*</AnimatedCircularProgress>*/}
                            {/*<AnimatedCircularProgress*/}
                            {/*    ref={(ref) => this.circularProgressfort = ref}*/}
                            {/*    size={screenWidth * 0.27}*/}
                            {/*    prefill={100}*/}
                            {/*    width={7}*/}
                            {/*    rotation={-360}*/}
                            {/*    tintColor={colors.red}*/}
                            {/*    lineCap={"round"}*/}
                            {/*    style={{*/}
                            {/*        overflow: "hidden",*/}
                            {/*    }}*/}
                            {/*    backgroundColor="transparent"*/}
                            {/*>*/}
                            {/*    {*/}
                            {/*        (fill) => (*/}
                            {/*            <View>*/}
                            {/*                <View*/}
                            {/*                    style={{ alignItems: "center", justifyContent: "center", flex: 1 }}>*/}
                            {/*                    {console.warn(this.state.pointfort)}*/}
                            {/*                    {this.state.pointfort !== "-" ? <AutoHeightImage*/}
                            {/*                            // width={screenWidth * 0.15}*/}
                            {/*                            width={30}*/}
                            {/*                            // source={require("../../../../assets/icons/dos.png")} />*/}
                            {/*                            source={{uri:this.state.pointfort}} />*/}
                            {/*                        :*/}
                            {/*                        <Text style={[styles.textBold, { fontSize: 26,marginBottom:7 }]}>-</Text>*/}
                            {/*                    }*/}
                            {/*                    <View style={{alignItems:'center', top:-7 }}>*/}
                            {/*                        <Text style={[styles.textBold, { fontSize: 10.5 , marginTop:this.state.pointfort === "-" ? 0:8}]}>Point fort</Text>*/}
                            {/*                    </View>*/}
                            {/*                </View>*/}
                            {/*            </View>*/}
                            {/*        )*/}
                            {/*    }*/}
                            {/*</AnimatedCircularProgress>*/}
                            <View style={{position:'absolute',top:(screenWidth *0.08),alignSelf:'center'}}>
                                <View
                                    style={{ alignItems: "center", justifyContent: "center", flex: 1 }}>
                                    {console.warn(this.state.pointfort)}
                                    {this.state.pointfort !== "-" ? <AutoHeightImage
                                            // width={screenWidth * 0.15}
                                            width={30}
                                            // source={require("../../../../assets/icons/dos.png")} />
                                            source={{uri:this.state.pointfort}} />
                                        :
                                        <Text style={[styles.textBold, { fontSize: 26,marginBottom:7 }]}>-</Text>
                                    }
                                    <View style={{alignItems:'center', top:-7 }}>
                                        <Text style={[styles.textBold, { fontSize: 10.5 , marginTop:this.state.pointfort === "-" ? 0:8}]}>Point fort</Text>
                                    </View>
                                </View>
                            </View>
                            <Progress.Circle size={screenWidth *0.29}
                                             progress={this.state.notefort.toFixed(0) * 0.01} unfilledColor={"white"}
                                             borderWidth={0}
                                             thickness={7}
                                             strokeCap={'round'}
                                             color={colors.red} animated={true}
                            />

                            {/*<ProgressCircle*/}
                            {/*    percent={this.state.notefort.toFixed(0)}*/}
                            {/*    radius={screenWidth * 0.14}*/}
                            {/*    borderWidth={7}*/}
                            {/*    color={colors.red}*/}
                            {/*    shadowColor="white"*/}
                            {/*    bgColor={"transparent"}*/}
                            {/*>*/}
                            {/*    <View>*/}
                            {/*        <View*/}
                            {/*            style={{ alignItems: "center", justifyContent: "center", flex: 1 }}>*/}
                            {/*            {console.warn(this.state.pointfort)}*/}
                            {/*            {this.state.pointfort !== "-" ? <AutoHeightImage*/}
                            {/*                    // width={screenWidth * 0.15}*/}
                            {/*                    width={30}*/}
                            {/*                    // source={require("../../../../assets/icons/dos.png")} />*/}
                            {/*                    source={{uri:this.state.pointfort}} />*/}
                            {/*                :*/}
                            {/*                <Text style={[styles.textBold, { fontSize: 26,marginBottom:7 }]}>-</Text>*/}
                            {/*            }*/}
                            {/*            <View style={{alignItems:'center', top:-7 }}>*/}
                            {/*                <Text style={[styles.textBold, { fontSize: 10.5 , marginTop:this.state.pointfort === "-" ? 0:8}]}>Point fort</Text>*/}
                            {/*            </View>*/}
                            {/*        </View>*/}
                            {/*    </View>*/}
                            {/*</ProgressCircle>*/}
                        </View>
                        <TouchableOpacity>
                        <View style={{ alignSelf: "flex-start",
                            left:-3,
                            // elevation: 8,
                            // shadowOffset: {width: 0, height: 2},
                            // shadowColor: colors.white,
                            // shadowRadius: (screenWidth - 60) / 3,
                            // shadowOpacity: 0.8,
                            // borderRadius: (screenWidth - 60) / 3,
                            // margin: 4

                        }}>
                            {/*{this.moyenne >= 0 && this.moyenne <100 ?<AnimatedCircularProgress*/}
                            {/*    ref={(ref) => this.circularProgress1 = ref}*/}
                            {/*    size={screenWidth * 0.27}*/}
                            {/*    prefill={100}*/}
                            {/*    width={7}*/}
                            {/*    rotation={-360}*/}
                            {/*    tintColor={'white'}*/}
                            {/*    renderCap={({ center }) => <AnimatedCircularProgress*/}
                            {/*        size={screenWidth * 0.27}*/}
                            {/*        width={8}*/}
                            {/*        lineCap={"round"}*/}
                            {/*        ref={(ref) => this.circularProgress = ref}*/}
                            {/*        tintColor={colors.red}*/}
                            {/*        rotation={-360}*/}

                            {/*    />*/}
                            {/*    }*/}
                            {/*    lineCap={"round"}*/}
                            {/*    style={{*/}
                            {/*       // overflow: "hidden",*/}
                            {/*    }}*/}
                            {/*    backgroundColor="transparent"*/}
                            {/*>*/}
                            {/*    {*/}
                            {/*        (fill) => (*/}
                            {/*            <View>*/}
                            {/*                <View*/}
                            {/*                    style={[styles.innerProgress, { alignItems: "center", justifyContent: "center", flex: 1 }]}>*/}
                            {/*                    <View style={[styles.valueCtn]}>*/}
                            {/*                        <Text style={[styles.textBold, {}]}>{this.moyenne}%</Text>*/}
                            {/*                    </View>*/}
                            {/*                </View>*/}
                            {/*            </View>*/}
                            {/*        )*/}
                            {/*    }*/}
                            {/*</AnimatedCircularProgress>*/}
                            {/*:*/}
                            {/*    <AnimatedCircularProgress*/}
                            {/*        ref={(ref) => this.circularProgress1 = ref}*/}
                            {/*        size={screenWidth * 0.27}*/}
                            {/*        prefill={100}*/}
                            {/*        width={7}*/}
                            {/*        rotation={-360}*/}
                            {/*        tintColor={null}*/}
                            {/*        renderCap={({ center }) => <AnimatedCircularProgress*/}
                            {/*            size={screenWidth * 0.27}*/}
                            {/*            width={8}*/}
                            {/*            lineCap={"round"}*/}
                            {/*            ref={(ref) => this.circularProgress = ref}*/}
                            {/*            tintColor={colors.red}*/}
                            {/*            rotation={-360}*/}

                            {/*        />*/}
                            {/*        }*/}
                            {/*        lineCap={"round"}*/}
                            {/*        style={{*/}
                            {/*            // overflow: "hidden",*/}
                            {/*        }}*/}
                            {/*        backgroundColor="transparent"*/}
                            {/*    >*/}
                            {/*        {*/}
                            {/*            (fill) => (*/}
                            {/*                <View>*/}
                            {/*                    <View*/}
                            {/*                        style={[styles.innerProgress, { alignItems: "center", justifyContent: "center", flex: 1 }]}>*/}
                            {/*                        <View style={[styles.valueCtn]}>*/}
                            {/*                            <Text style={[styles.textBold, {}]}>{this.moyenne}%</Text>*/}
                            {/*                        </View>*/}
                            {/*                    </View>*/}
                            {/*                </View>*/}
                            {/*            )*/}
                            {/*        }*/}
                            {/*    </AnimatedCircularProgress>*/}
                            {/*}*/}

                            {/*<AnimatedCircularProgress*/}
                            {/*    ref={(ref) => this.circularProgress1 = ref}*/}
                            {/*    size={screenWidth * 0.27}*/}
                            {/*    prefill={100}*/}
                            {/*    width={7}*/}
                            {/*    rotation={-360}*/}
                            {/*    tintColor={'white'}*/}
                            {/*    lineCap={"round"}*/}
                            {/*    style={{*/}
                            {/*        overflow: "hidden",*/}
                            {/*        position:'absolute',*/}
                            {/*    }}*/}
                            {/*    backgroundColor="transparent"*/}
                            {/*/>*/}
                            {/*<AnimatedCircularProgress*/}
                            {/*        ref={(ref) => this.circularProgress = ref}*/}
                            {/*        size={screenWidth * 0.27}*/}
                            {/*        prefill={100}*/}
                            {/*        width={7}*/}
                            {/*        rotation={-360}*/}
                            {/*        tintColor={colors.red}*/}
                            {/*        lineCap={"round"}*/}
                            {/*        style={{*/}
                            {/*            overflow: "hidden",*/}
                            {/*        }}*/}
                            {/*        backgroundColor="transparent"*/}
                            {/*    >*/}
                            {/*        {*/}
                            {/*            (fill) => (*/}
                            {/*                <View>*/}
                            {/*                    <View*/}
                            {/*                        style={[styles.innerProgress, { alignItems: "center", justifyContent: "center", flex: 1 }]}>*/}
                            {/*                        <View style={[styles.valueCtn]}>*/}
                            {/*                            <Text style={[styles.textBold, {}]}>{newval}%</Text>*/}
                            {/*                        </View>*/}
                            {/*                    </View>*/}
                            {/*                </View>*/}
                            {/*            )*/}
                            {/*        }*/}
                            {/*    </AnimatedCircularProgress>*/}
                            <View style={{position:'absolute',top:(screenWidth *0.098),alignSelf:'center'}}>
                                <View
                                    style={[styles.innerProgress, { alignItems: "center", justifyContent: "center", flex: 1 }]}>
                                    <View style={[styles.valueCtn]}>
                                        <Text style={[styles.textBold, {}]}>{newval}%</Text>
                                    </View>
                                </View>
                            </View>
                            <Progress.Circle size={screenWidth *0.29}
                                             progress={newval*0.01} unfilledColor={"white"}
                                             borderWidth={0}
                                             thickness={7}
                                             strokeCap={'round'}
                                             color={colors.red} animated={true}
                            />

                            {/*<ProgressCircle*/}
                            {/*    percent={newval}*/}
                            {/*    radius={screenWidth * 0.15}*/}
                            {/*    borderWidth={7}*/}
                            {/*    color={colors.red}*/}
                            {/*    shadowColor="white"*/}
                            {/*    bgColor={"transparent"}*/}
                            {/*>*/}
                            {/*    <View>*/}
                            {/*        <View*/}
                            {/*            style={[styles.innerProgress, { alignItems: "center", justifyContent: "center", flex: 1 }]}>*/}
                            {/*            <View style={[styles.valueCtn]}>*/}
                            {/*                <Text style={[styles.textBold, {}]}>{newval}%</Text>*/}
                            {/*            </View>*/}
                            {/*        </View>*/}
                            {/*    </View>*/}
                            {/*</ProgressCircle>*/}
                        </View>
                        </TouchableOpacity>
                        <View style={[styles.outerProgress, { marginTop: 50, alignSelf: "flex-end" }]}>
                            {/*<AnimatedCircularProgress*/}
                            {/*    size={screenWidth * 0.27}*/}
                            {/*    width={7}*/}
                            {/*     fill={100}*/}
                            {/*    prefill={100}*/}
                            {/*    tintColor={'white'}*/}
                            {/*    lineCap={"round"}*/}
                            {/*    style={{*/}
                            {/*       // overflow: "hidden",*/}
                            {/*       //  borderRadius:screenWidth * 0.27,*/}
                            {/*       //  borderWidth:0.1,*/}
                            {/*       //  borderColor:'white',*/}
                            {/*        position:'absolute'*/}
                            {/*    }}*/}
                            {/*    backgroundColor="transparent"*/}
                            {/*>*/}
                            {/*</AnimatedCircularProgress>*/}
                            {/*<AnimatedCircularProgress*/}
                            {/*    ref={(ref) => this.circularProgressfaible = ref}*/}
                            {/*    size={screenWidth * 0.27}*/}
                            {/*    prefill={100}*/}
                            {/*    width={7}*/}
                            {/*    rotation={-360}*/}
                            {/*    tintColor={colors.red}*/}
                            {/*    lineCap={"round"}*/}
                            {/*    style={{*/}
                            {/*        overflow: "hidden",*/}
                            {/*    }}*/}
                            {/*    backgroundColor="transparent"*/}
                            {/*>*/}
                            {/*    {*/}
                            {/*        (fill) => (*/}
                            {/*            <View>*/}
                            {/*                <View    style={{ alignItems: "center", justifyContent: "center", flex: 1 }}>*/}
                            {/*                    /!*<AutoHeightImage*!/*/}
                            {/*                    /!*    width={screenWidth * 0.14}*!/*/}
                            {/*                    /!*    source={require("../../../../assets/icons/hanche.png")} />*!/*/}

                            {/*                    {this.state.pointfaible !== "-" ? <AutoHeightImage*/}
                            {/*                            // width={screenWidth * 0.15}*/}
                            {/*                            width={30}*/}
                            {/*                            // source={require("../../../../assets/icons/dos.png")} />*/}
                            {/*                            source={{uri:this.state.pointfaible}} />*/}
                            {/*                        :*/}
                            {/*                        <Text style={[styles.textBold, { fontSize: 26,marginBottom:7 }]}>-</Text>*/}
                            {/*                    }*/}
                            {/*                    <View style={{alignItems:'center',*/}
                            {/*                        top:-5*/}
                            {/*                    }}>*/}
                            {/*                        <Text style={[styles.textBold, { fontSize: 10.5, marginTop:this.state.pointfaible === "-" ? 0:8 }]}>Point faible</Text>*/}
                            {/*                    </View>*/}
                            {/*                </View>*/}
                            {/*            </View>*/}
                            {/*        )*/}
                            {/*    }*/}
                            {/*</AnimatedCircularProgress>*/}
                            <View style={{position:'absolute',top:(screenWidth *0.08),alignSelf:'center'}}>
                                <View    style={{ alignItems: "center", justifyContent: "center", flex: 1 }}>
                                    {this.state.pointfaible !== "-" ? <AutoHeightImage
                                            // width={screenWidth * 0.15}
                                            width={30}
                                            // source={require("../../../../assets/icons/dos.png")} />
                                            source={{uri:this.state.pointfaible}} />
                                        :
                                        <Text style={[styles.textBold, { fontSize: 26,marginBottom:7 }]}>-</Text>
                                    }
                                    <View style={{alignItems:'center',
                                        top:-5
                                    }}>
                                        <Text style={[styles.textBold, { fontSize: 10.5, marginTop:this.state.pointfaible === "-" ? 0:8 }]}>Point faible</Text>
                                    </View>
                                </View>
                            </View>
                            <Progress.Circle size={screenWidth *0.29}
                                             progress={this.state.notefaible.toFixed(0) * 0.01} unfilledColor={"white"}
                                             borderWidth={0}
                                             thickness={7}
                                             strokeCap={'round'}
                                             color={colors.red} animated={true}
                            />
                            {/*<ProgressCircle*/}
                            {/*    percent={this.state.notefaible.toFixed(0)}*/}
                            {/*    radius={screenWidth * 0.14}*/}
                            {/*    borderWidth={7}*/}
                            {/*    color={colors.red}*/}
                            {/*    shadowColor="white"*/}
                            {/*    bgColor={"transparent"}*/}
                            {/*>*/}
                            {/*    <View>*/}
                            {/*        <View    style={{ alignItems: "center", justifyContent: "center", flex: 1 }}>*/}
                            {/*            {this.state.pointfaible !== "-" ? <AutoHeightImage*/}
                            {/*                    // width={screenWidth * 0.15}*/}
                            {/*                    width={30}*/}
                            {/*                    // source={require("../../../../assets/icons/dos.png")} />*/}
                            {/*                    source={{uri:this.state.pointfaible}} />*/}
                            {/*                :*/}
                            {/*                <Text style={[styles.textBold, { fontSize: 26,marginBottom:7 }]}>-</Text>*/}
                            {/*            }*/}
                            {/*            <View style={{alignItems:'center',*/}
                            {/*                top:-5*/}
                            {/*            }}>*/}
                            {/*                <Text style={[styles.textBold, { fontSize: 10.5, marginTop:this.state.pointfaible === "-" ? 0:8 }]}>Point faible</Text>*/}
                            {/*            </View>*/}
                            {/*        </View>*/}
                            {/*    </View>*/}
                            {/*</ProgressCircle>*/}
                        </View>
                    </View>
                    <View style={{width:'100%',alignItems:'center',top:-35}}><Text style={{color:'white',fontSize:16}}>Mobilité globale</Text></View>

                    <View style={[styles.valueCtn, { marginTop: 0,marginBottom: 20, justifyContent: "center", flexDirection: "row" }]}>
                        <View></View>
                        <MAAButton
                            text={"tester ma mobilité".toUpperCase()}
                            width={(screenWidth - 100)}
                            height={40}
                            style={{ alignSelf: "center" }}
                            onPress={() => {
                                if(global.is_venudedonneperso === true) {
                                    //
                                    const setActiveTab = { type: SET_ACTIVE_TAB, value: "Mobilites" };
                                    this.props.dispatch(setActiveTab);
                                    this.props.navigation.navigate('LogedinNavigator');
                                    // this.props.navigation.navigate('AppScreen');
                                }else{
                                    this.props.navigation.navigate("Mobilites")
                                }
                            }} />
                        <View></View>
                    </View>

                    <View style={{flexDirection:'row',justifyContent:'space-around'}}>
                    {
                        ( this.props.monPhysique !==null && this.props.monPhysique.data.zones.length >0) &&
                            this.props.monPhysique.data.zones.map(
                            (item,index)=>{
                                return(
                                <TouchableOpacity
                                    onPress={()=> {
                                        const setValue = { type: SET_ACTIVE_MOBILITEPARAMSVAVIG, value: {name:item.name,zoneTest_id:item.id} };
                                        this.props.dispatch(setValue);
                                        const showsuvantandprofiltestmobilite = { type: SET_SHOW_SUIVANT_AND_PROFIL_TESTMOBILITE, value:false };
                                        this.props.dispatch(showsuvantandprofiltestmobilite);
                                        if(global.is_venudedonneperso === true) {
                                            const setActiveTab = { type: SET_ACTIVE_TAB, value: "TestMobilites" };
                                            this.props.dispatch(setActiveTab);
                                            this.props.navigation.navigate('LogedinNavigator');

                                        }else{
                                            this.props.navigation.navigate("TestMobilites")
                                        }
                                    }
                                    }
                                    key={'monPhysique'+index} style={{}}>
                                    <View style={{justifyContent:'center',  borderColor: colors.white, borderWidth: 1, width: screenWidth * 0.15, height: screenHeight * 0.096, borderRadius: screenWidth * 0.02 }}>
                                        <AutoHeightImage
                                            style={{ alignSelf: "center", alignItems: "center" }}
                                            width={screenWidth * 0.06}
                                            // source={require("../../../../assets/icons/ankle.png")}
                                            source={{uri: item.image}}
                                        />
                                    </View>
                                    <View style={{ padding: 10,alignSelf:'center' }}>
                                        <Text style={[styles.textBold, { fontSize: 12, color: colors.white }]}>{item.progression}%</Text>
                                    </View>
                                </TouchableOpacity>
                                )
                            }
                        )
                    }
                    </View>

                    <View style={{ flexDirection: "row", justifyContent: "space-around" ,marginTop:15}}>
                        {
                            ( this.props.monPhysique !==null && this.props.monPhysique.data.zones.length >0) &&
                            this.props.monPhysique.data.zones.map(

                                (item,index)=>{
                                    let progressionbrute = item.progression;
                                    let pourcentagevide = 100 - progressionbrute;
                                    let progressionvidee = pourcentagevide * 10 / 100;
                                    let progressionplein = progressionbrute * 10 / 100;
                                    if(progressionplein>10){
                                        progressionplein = 10
                                    }
                                    console.warn('progressVide',progressionvidee,'plein',progressionplein);
                                    let progressionvide = null;
                                    if(progressionvide % 1 !== 0){
                                        progressionvide = progressionvidee;
                                    }else{
                                        progressionvide = Math.trunc(progressionvidee);
                                    }
                                    return(
                                        <View key={'monPhysiqued'+index} style={{  }}>
                                            <View style={{ flexDirection: "row", justifyContent: "center", borderColor: colors.white, width: screenWidth * 0.15,  borderRadius: screenWidth * 0.02 }}>
                                            </View>
                                            <View style={{ alignContent: "flex-start", justifyContent: "space-evenly" }}>
                                                {this._onTestPourcentageVide(progressionvide)}
                                                {this._onTestPourcentagePleine(progressionplein)}
                                            </View>
                                        </View>
                                    )
                                }
                            )
                        }


                        {/*<View style={{ marginBottom: 20 }}>*/}
                        {/*    <View style={{ flexDirection: "row", justifyContent: "center", borderColor: colors.white, borderWidth: 1, width: screenWidth * 0.15, height: screenHeight * 0.1, borderRadius: screenWidth * 0.02 }}>*/}
                        {/*        <AutoHeightImage*/}
                        {/*            style={{ alignSelf: "center", alignItems: "center" }}*/}
                        {/*            width={screenWidth * 0.05}*/}
                        {/*            source={require("../../../../assets/icons/ankle.png")}*/}
                        {/*        />*/}
                        {/*    </View>*/}
                        {/*    <View style={{ alignItems: 'center', padding: 10 }}>*/}
                        {/*        <Text style={[styles.textBold, { fontSize: 12, color: colors.white }]}>65%</Text>*/}
                        {/*    </View>*/}
                        {/*    <View style={{ alignContent: "flex-start", justifyContent: "space-evenly" }}>*/}
                        {/*        {this._onTestPourcentageVide(4)}*/}
                        {/*        {this._onTestPourcentagePleine(6,5)}*/}
                        {/*    </View>*/}
                        {/*</View>*/}


                        {/*<View style={{ marginBottom: 20 }}>*/}
                        {/*    <View style={{ flexDirection: "row", justifyContent: "center", borderColor: colors.white, borderWidth: 1, width: screenWidth * 0.15, height: screenHeight * 0.1, borderRadius: screenWidth * 0.02 }}>*/}
                        {/*        <AutoHeightImage*/}
                        {/*            style={{ alignSelf: "center", alignItems: "center" }}*/}
                        {/*            width={screenWidth * 0.05}*/}
                        {/*            source={require("../../../../assets/icons/hanche.png")}*/}
                        {/*        />*/}
                        {/*    </View>*/}
                        {/*    <View style={{ alignItems: 'center', padding: 10 }}>*/}
                        {/*        <Text style={[styles.textBold, { fontSize: 12, color: colors.white }]}>0%</Text>*/}
                        {/*    </View>*/}
                        {/*    <View style={{ alignContent: "flex-start", justifyContent: "space-evenly" }}>*/}
                        {/*        {this._onTestPourcentageVide(10)}*/}
                        {/*        {this._onTestPourcentagePleine(0)}*/}
                        {/*    </View>*/}
                        {/*</View>*/}

                        {/*<View style={{ marginBottom: 20 }}>*/}
                        {/*    <View style={{ flexDirection: "row", justifyContent: "center", borderColor: colors.white, borderWidth: 1, width: screenWidth * 0.15, height: screenHeight * 0.1, borderRadius: screenWidth * 0.02 }}>*/}
                        {/*        <AutoHeightImage*/}
                        {/*            style={{ alignSelf: "center", alignItems: "center" }}*/}
                        {/*            width={screenWidth * 0.05}*/}
                        {/*            source={require("../../../../assets/icons/angle.png")}*/}
                        {/*        />*/}
                        {/*    </View>*/}
                        {/*    <View style={{ alignItems: 'center', padding: 10 }}>*/}
                        {/*        <Text style={[styles.textBold, { fontSize: 12, color: colors.white }]}>45%</Text>*/}
                        {/*    </View>*/}
                        {/*    <View style={{ alignContent: "flex-start", justifyContent: "space-evenly" }}>*/}
                        {/*        {this._onTestPourcentageVide(5.5)}*/}
                        {/*        {this._onTestPourcentagePleine(3.5)}*/}
                        {/*    </View>*/}
                        {/*</View>*/}
                    </View>
                    <View style={{ flexDirection: "row", justifyContent: "space-around" }}>

                        {
                            ( this.props.monPhysique !==null && this.props.monPhysique.data.zones.length >0) &&
                            this.props.monPhysique.data.zones.map(
                                (item,index)=>{
                                    return(
                                        <View key={'monp'+index} style={{ alignItems: 'center', padding: 10, width:screenWidth*0.2 }}>
                                            <Text style={[styles.textBold, { fontSize: 10, color: colors.white ,
                                                textAlign:'center'
                                            }]}>{item.name}</Text>
                                        </View>
                                    )
                                }
                            )
                        }



                        {/*<View style={{ alignItems: 'center', padding: 10, width:screenWidth*0.2 }}>*/}
                        {/*    <Text style={[styles.textBold, { fontSize: 10, color: colors.white }]}>EPAULES</Text>*/}
                        {/*</View>*/}
                        {/*<View style={{ alignItems: 'center', padding: 10, width:screenWidth*0.2 }}>*/}
                        {/*    <Text style={[styles.textBold, { fontSize: 10, color: colors.white }]}>CHEVILLES</Text>*/}
                        {/*</View>*/}
                        {/*<View style={{ alignItems: 'center', padding: 10, width:screenWidth*0.2 }}>*/}
                        {/*    <Text style={[styles.textBold, { fontSize: 10, color: colors.white }]}>HANCHES</Text>*/}
                        {/*</View>*/}
                        {/*<View style={{ alignItems: 'center', padding: 10, width:screenWidth*0.2 }}>*/}
                        {/*    <Text style={[styles.textBold, { fontSize: 10, color: colors.white }]}>CHAINES MUSCULAIRES</Text>*/}
                        {/*</View>*/}
                    </View>
                    <View style={{alignItems:'center'}}>
                    <MAAButton text={"MON PROFIL"} width={(screenWidth - 100)} height={40} backgroundColor='transparent' borderColor='#fff'
                               onPress={() => {
                                   //  console.warn("Mon profil")
                                   const setActiveFPAction = {type: SET_ACTIVE_FP, value: -1}
                                   this.props.dispatch(setActiveFPAction)

                                   if( global.is_venudedonneperso === true) {
                                       console.warn('vers profile');
                                       const setActiveTab = {type: SET_ACTIVE_TAB, value: "profile"};
                                       this.props.dispatch(setActiveTab);
                                   }else{
                                       this.props.navigation.popToTop();
                                   }

                               }}
                               style={[styles.btnMonProfil]} />
                        <MAAButton text={"TERMINER"} width={(screenWidth - 100)} height={40}
                                   onPress={() => {
                                       const setActiveFPAction = { type: SET_ACTIVE_FP, value: 0}
                                       this.props.dispatch(setActiveFPAction)
                                       const setActiveTab = { type: SET_ACTIVE_TAB, value: "home" };
                                       this.props.dispatch(setActiveTab);
                                       this.props.navigation.navigate("LogedinNavigator")
                                   }}
                                   style={[styles.btnValidate]}
                        />
                    </View>
                </ScrollView>
            </LinearGradient>
        )
    }
}

// export default FichePedag;
const mapStateToProps = (state) => {
    const { isFichePedag,userToken,monPhysique } = state.statedata
    return { isFichePedag,userToken,monPhysique }
};

export default connect(mapStateToProps)(MonPhysique);
