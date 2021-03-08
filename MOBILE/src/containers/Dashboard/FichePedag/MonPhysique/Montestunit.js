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
    Platform, StyleSheet,
    Alert,
    Image

} from 'react-native';
import AutoHeightImage from 'react-native-auto-height-image';
import LinearGradient from 'react-native-linear-gradient';
import colors from '../../../../configs/colors';
import baseStyles from '../../../../base/BaseStyles';
import styles from './styles';
import {
    SET_ACTIVE_FP,
    SET_ACTIVE_TAB,
    SET_SHOW_SUIVANT_AND_PROFIL_TESTMOBILITE,
    SET_TEST_MOBILITE_GET_REDUX
} from '../../../../redux/types/tabTypes';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import MAAButton from '../../../../components/MAAButton/MAAButton';
import PersonalDataHelper from '../../../../apis/helpers/person_data_helper';
import {getDashboar, getMonPhysique} from '../../../../apis/FonctionRedondant';
import statusBarHeight from '../../../../configs/screen';
import dashboardHelper from '../../../../apis/helpers/dashboard_helper';


const screen = Dimensions.get('screen');
const SBHelight = statusBarHeight;
const screenWidth = screen.width
const screenHeight = screen.height - SBHelight


class Montestunit extends Component  {

    constructor(props) {
        super(props)
        this.state = {
            refreshing:false,
            testMobilites:null,
            borderbackgroundcolored : [],
            lastKeyPressed:-1,
            checkred:[],
            pressedIndex:null,


        }
    }
    componentDidMount() {
            this.getTestMobilitewithphoto()
    }


    getTestMobilitewithphoto = async () => {
        this.setState({ refreshing: true });
        console.warn('ato indray',this.props.montestunit.photos_id)
        const TestMobilites = await PersonalDataHelper.getTestMobilitewithphoto(this.props.userToken,this.props.montestunit.photos_id)
        if(TestMobilites){
            for(let i = 0; i<TestMobilites.data.length; i++){
                if(i === 0){
                  //  this.state.borderbackgroundcolored.push(colors.red)
                  this.state.borderbackgroundcolored.push('#FFFF')
                }else{
                    this.state.borderbackgroundcolored.push('#FFFF')
                }
            }
            this.setState({ refreshing: false,testMobilites:TestMobilites });
        }
        return null;
    };

    getTestMobilite = async () => {
        this.setState({ refreshing: true })
        const TestMobilites = await PersonalDataHelper.getTestMobilite(this.props.userToken,this.props.mobiliteparamsvavig.zoneTest_id)
        if(TestMobilites){
            this.setState({ refreshing: false })
            const testmob = { type: SET_TEST_MOBILITE_GET_REDUX, value: TestMobilites }
            this.props.dispatch(testmob)
        }
        return null;
    }


    putVideoTestResponse = async () => {
        this.setState({ refreshing:true });
        console.warn(this.state.pressedIndex,this.props.montestunit.photos_id);
        if(this.state.pressedIndex !== null){
            const response = await PersonalDataHelper.putVideoTestResponse(this.props.userToken,
                this.state.pressedIndex
            );
            if(response){
                this.setState({refreshing: false});
                console.warn('response ',response);
                Alert.alert('Odgo','Test ajouté avec succès',[
                    {
                        text:"Ok",
                        onPress:()=>{
                            this.setState({refreshing: true});
                            this.getTestMobilite()
                            getMonPhysique(PersonalDataHelper,this.props).then((refreshingfalse)=>{
                                this.setState({
                                    refreshing: refreshingfalse
                                });
                                //redirect
                                const setActiveFPAction = { type: SET_ACTIVE_FP, value: 5 }
                                this.props.dispatch(setActiveFPAction)
                                const showsuvantandprofiltestmobilite = { type: SET_SHOW_SUIVANT_AND_PROFIL_TESTMOBILITE, value:true };
                                this.props.dispatch(showsuvantandprofiltestmobilite);
                                if(global.is_venudedonneperso === true) {
                                    const setActiveTab = { type: SET_ACTIVE_TAB, value: "TestMobilites" };
                                    this.props.dispatch(setActiveTab);
                                    // const setActiveTab = { type: SET_ACTIVE_TAB, value: "MonPhysique" };
                                    // this.props.dispatch(setActiveTab);
                                    this.props.navigation.navigate('LogedinNavigator');

                                }else{
                                    this.props.navigation.pop( 2);
                                }

                            });
                        }
                    }
                ]);
            }
        }else{
            this.setState({refreshing: false});
            Alert.alert('Odgo','Veuillez choisir une réponse',[
                {
                    text: "Ok",
                    onPress: () => {
                    }
                }
            ])
        }
    };

    componentWillUnmount() {
        // const setActiveFPAction = { type: SET_ACTIVE_FP, value: 0 }
        // this.props.dispatch(setActiveFPAction)
    }
    render() {


        return (
            <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }} colors={[colors.balck, colors.green, colors.balck]} style={baseStyles.linearGradient}>
                <ScrollView
                    contentInsetAdjustmentBehavior="automatic"
                    ref = 'scrollView'
                    contentContainerStyle={[styles.contentContainerStyle,{width:screenWidth}]}
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.refreshing}
                            onRefresh={() => {
                                this.getTestMobilitewithphoto()
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
                                    const setActiveTab = { type: SET_ACTIVE_TAB, value: "TestMobilitesUnitaires" };
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
                                    marginLeft:10,
                                    transform: [
                                        { rotateY: "180deg" }
                                    ],
                                }}
                            />
                        </TouchableOpacity>
                        <Text style={[baseStyles.titleText,{textAlign:"center",marginLeft:-3}]}>
                            {
                                this.props.montestunit.nameandtext2.name
                            }
                        </Text>
                    </View>

                    <View style={{marginTop:15, alignSelf: "center", flexDirection: "row", justifyContent: "center", alignItems: "center", width: screenWidth * 0.8 }}>
                        <Text style={{
                            color: colors.white,
                            fontSize: 15,
                            marginBottom:10,
                            textAlign: "center"
                        }}>
                            {
                                this.props.montestunit.nameandtext2.text2
                            }
                        </Text>
                    </View>

                    {
                        (this.state.testMobilites !== null && this.state.testMobilites.data.length > 0) &&

                        this.state.testMobilites.data.map((item,index)=>{
                                    this.state.borderbackgroundcolored.push('#FFFF')
                                    this.state.checkred.push(null)

                            return(
                                    <TouchableOpacity
                                        key={'photo'+index}
                                        onPress={()=>{
                                          //  this.state.borderbackgroundcolored[index] = colors.red;
                                         //   this.state.borderbackgroundcolored[this.state.lastKeyPressed] = "#FFFF";
                                            if(this.state.lastKeyPressed === index ){
                                            }else {
                                                let array = this.state.borderbackgroundcolored;
                                                array[index] = colors.red;
                                                array[this.state.lastKeyPressed] = '#FFF';

                                                let arrayone = this.state.checkred;
                                                arrayone[index] = <AutoHeightImage
                                                    width={20}
                                                    source={require("../../../../assets/icons/check.red.png")}
                                                />
                                                arrayone[this.state.lastKeyPressed] = null;

                                                this.setState({
                                                    borderbackgroundcolored: array,
                                                    checkred: arrayone,
                                                    lastKeyPressed: index,
                                                    pressedIndex: item.id,
                                                })
                                                this.refs.scrollView.scrollTo({y:screenHeight})
                                            }
                                        }}
                                        style={{margin: 10,borderRadius: 15,borderWidth: 2, borderColor: this.state.borderbackgroundcolored[index], alignSelf: "center", justifyContent: "center", alignItems: "center" }}>
                                        <ImageBackground
                                            source={{uri: item.image}}
                                            // source={require("../../../../assets/images/test.png")}
                                            style={{ width:screenWidth*0.85, height: screenWidth*0.54, padding: 5 }}
                                            imageStyle={{borderRadius: 15}}
                                        >

                                            <View style={{ flexDirection: "row", justifyContent: "space-between", padding: 5, height: "100%" }}>
                                                <View style={{ alignSelf: "flex-start", borderRadius:15, borderColor:colors.white, borderWidth:1, padding:5 }}>
                                                    <Text style={{ color: colors.white, fontSize: 12, }}>{index+1}</Text>
                                                </View>
                                                <View style={{ flexDirection: "column", justifyContent: "space-between" }}>
                                                    <View style={{}}>
                                                        <AutoHeightImage
                                                            //width={60}
                                                            source={require("../../../../assets/images/logotestnet.png")}
                                                            style={{width:57,height:16}}
                                                        />
                                                    </View>
                                                    <View style={{alignSelf:"flex-end"}}>
                                                        {
                                                            this.state.checkred[index]
                                                        }

                                                    </View>
                                                </View>
                                            </View>
                                            <Image
                                                source={{uri: item.image}}
                                                style={{ position:'absolute',borderRadius:15,zIndex:-1,width:screenWidth*0.85, height: screenWidth*0.54, padding: 5 }}
                                            />
                                        </ImageBackground>
                                    </TouchableOpacity>
                            )
                        } )

                    }

                    <View style={{ margin: 10 }}></View>
                    {/* <View style={{borderRadius: 15, borderWidth: 2, borderColor: colors.white, alignSelf: "center", justifyContent: "center", alignItems: "center", width: screenWidth * 0.85 }}>
                        <ImageBackground
                            source={require('../../../../assets/images/bg.sport.png')}
                            style={{ width: "100%", height: 200, padding: 5 }}
                            imageStyle={{borderRadius: 15}}
                        >
                            <View style={{ flexDirection: "row", justifyContent: "space-between", padding: 5, height: "100%" }}>
                                <View style={{ alignSelf: "flex-start", borderRadius:15, borderColor:colors.white, borderWidth:1, padding:5 }}>
                                    <Text style={{ color: colors.white, fontSize: 12, }}>2</Text>
                                </View>
                                <View style={{ flexDirection: "column", justifyContent: "space-between" }}>
                                    <View style={{}}>
                                        <AutoHeightImage
                                            width={60}
                                            source={require("../../../../assets/images/logo.png")}
                                        />
                                    </View>
                                    <View style={{alignSelf:"flex-end"}}>
                                        <AutoHeightImage
                                            width={20}
                                            source={require("../../../../assets/icons/check.red.png")}
                                            style={{opacity:0}}
                                        />
                                    </View>
                                </View>
                            </View>
                        </ImageBackground>
                    </View> */}
                    {/* <View style={{ margin: 10 }}></View> */}
                    <View style={[styles.valueCtn, { marginTop: 10,marginBottom: 10, justifyContent: "center", flexDirection: "row" }]}>
                        <View></View>
                        <MAAButton
                            text={"Valider".toUpperCase()}
                            width={(screenWidth - 100)}
                            height={40}
                            style={{ alignSelf: "center" }}
                            onPress={() => {
                                this.putVideoTestResponse()
                            }}
                            />
                        <View></View>
                    </View>
                    <View style={{ margin: 10 }}></View>
                </ScrollView>
            </LinearGradient>
        )
    }
}

const TopBar = ({ play, fullScreen }) => (
    <View
      style={{
        alignSelf: "center",
        position: "absolute",
        top: 0
      }}
    >
      <Text style={{ color: "#FFF" }}> Custom Top bar</Text>
    </View>
  );




// export default FichePedag;
const mapStateToProps = (state) => {
    const { isFichePedag,userToken,montestunit,mobiliteparamsvavig } = state.statedata
    return { isFichePedag,userToken,montestunit,mobiliteparamsvavig}
};

export default connect(mapStateToProps)(Montestunit);
