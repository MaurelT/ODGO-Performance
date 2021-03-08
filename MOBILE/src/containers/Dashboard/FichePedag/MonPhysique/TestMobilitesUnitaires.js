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
import {SET_ACTIVE_FP, SET_ACTIVE_TAB,SET_MONTESTUNIT} from '../../../../redux/types/tabTypes';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import MAAButton from '../../../../components/MAAButton/MAAButton';
import PersonalDataHelper from '../../../../apis/helpers/person_data_helper';
import YoutubePlayer from "react-native-yt-player";
import YouTube from 'react-native-youtube';
import statusBarHeight from '../../../../configs/screen';
import {getDashboar} from '../../../../apis/FonctionRedondant';
import dashboardHelper from '../../../../apis/helpers/dashboard_helper';


const screen = Dimensions.get('screen');
const SBHelight = statusBarHeight;
const screenWidth = screen.width
const screenHeight = screen.height - SBHelight


class TestMobilitesUnitaires extends Component  {

    constructor(props) {
        super(props)
        this.state = {
            refreshing:false,
            testMobilites:null,
            fullScreen:true,
            isReady:false,
        }
    }
    componentDidMount() {
            this.getTestMobilitewithvideo()
    }


    getTestMobilitewithvideo = async () => {

        this.setState({ refreshing: true })
        const TestMobilites = await PersonalDataHelper.getTestMobilitewithvideo(this.props.userToken,this.props.mobiliteparamsunit.video_test_id)
        console.warn('re',TestMobilites)
        if(TestMobilites){
            this.setState({ refreshing: false,testMobilites:TestMobilites })
        }
        return null;
    };

    play = () => {
        this.player.playVideo();
    };
    pause = () => {
        this.player.pauseVideo();
    };

    seekTo = s => {
        this.player.seekTo(s);
    };

    onFullScreen = fullScreen => {
        console.warn("fullscreen ", fullScreen);
        this.setState({ fullScreen:true });
    };

    componentWillUnmount() {
        // const setActiveFPAction = { type: SET_ACTIVE_FP, value: 0 }
        // this.props.dispatch(setActiveFPAction)
    }
    render() {
        let videoId = null;
        if(this.state.testMobilites !== null){
            if(this.state.testMobilites.data.length > 0  ){
                videoId = youtube_parser(this.state.testMobilites.data[0].url_youtube);
                console.warn('videoid',videoId)
            }
        }
        return (
            <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }} colors={[colors.balck, colors.green, colors.balck]} style={baseStyles.linearGradient}>
                <ScrollView
                    contentInsetAdjustmentBehavior="automatic"
                    contentContainerStyle={[styles.contentContainerStyle,{
                        // marginLeft:-screenWidth*0.017
                    }]}
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.refreshing}
                            onRefresh={() => {
                                this.getTestMobilitewithvideo()
                            }}
                            tintColor={Platform.OS==='ios'?colors.white:colors.green}
                            colors={[Platform.OS==='ios'?colors.white:colors.green]}
                        />
                    }
                    >
                    <View style={{ alignItems :"center",justifyContent:"center",width:'100%',marginTop:10,marginBottom:5  }}>
                        <TouchableOpacity
                            onPress={() => {
                                if(global.is_venudedonneperso === true){
                                    const setActiveFPAction = { type: SET_ACTIVE_FP, value: 5 }
                                    this.props.dispatch(setActiveFPAction)
                                    const setActiveTab = { type: SET_ACTIVE_TAB, value: "TestMobilites" };
                                    this.props.dispatch(setActiveTab);
                                    this.props.navigation.navigate('LogedinNavigator');
                                }else{
                                    this.props.navigation.goBack()
                                }
                            }}
                            style={{width:50,position:"absolute",left:15}}
                        ><AutoHeightImage
                                width={18}
                                source={require('../../../../assets/icons/arrow-white.png')}
                                style={{
                                    transform: [
                                        { rotateY: "180deg" }
                                    ],
                                }}
                            />
                        </TouchableOpacity>
                        <Text style={[baseStyles.titleText,{textAlign:"center",left:-2}]}>
                            {
                                (this.state.testMobilites !== null && this.state.testMobilites.data.length > 0) &&
                                this.state.testMobilites.data[0].name.trim().replace(/\n/g, "").replace(/\t/g, "").replace(/\r/g, "")
                                  //  .replace(/\'/g, "")
                                    .replace(/\"/g, '')
                                    .replace(/\&/g, "")
                                    .replace(/\b/g, "")
                                    .replace(/\f/g, "")
                            }
                        </Text>
                    </View>

                    <View style={{ justifyContent: "center", alignItems: "center",width:'100%', marginVertical:7,paddingHorizontal:5}}>
                        <Text style={{
                            color: colors.white,
                            fontSize: 13,
                            textAlign: "center",
                            flexWrap:'wrap'
                        }}>
                            {
                            (this.state.testMobilites !== null && this.state.testMobilites.data.length > 0) &&
                                this.state.testMobilites.data[0].text1.trim().replace(/\n/g, "").replace(/\t/g, "").replace(/\r/g, "")
                                 //   .replace(/\'/g, "")
                                    .replace(/\"/g, '')
                                    .replace(/\&/g, "")
                                    .replace(/\b/g, "")
                                    .replace(/\f/g, "")
                            }
                        </Text>
                    </View>
                    {/* <View style={{borderRadius: 15,alignItems:'center', borderWidth: 2, borderColor: colors.red, alignSelf: "center", justifyContent: "center", alignItems: "center", width: screenWidth * 0.85 }}> */}

                    {

                            videoId !== null &&
                            <View>
                            {Platform.OS==='ios'?(
                                <YouTube
                                //apiKey="YOUR_API_KEY"
                                videoId={videoId}
                                play={true}
                                loop={true}
                                controls={1}
                                showinfo={false}
                                rel={false}
                                style={{ height: screenHeight/3,width:screenWidth,marginTop:20}}
                                onError={e => {
                                    console.warn(e)
                                }}
                                />
                            ):(
                                <YoutubePlayer
                                ref={ref => {
                                    this.player = ref;
                                }}
                                showFullScreenButton = {false}
                                videoId = {videoId}
                                autoPlay={true}
                                onFullScreen={this.onFullScreen}
                                onStart={() => console.warn("onStart")}
                                //onEnd={() => alert("on End")}
                            />
                            )}

                            {Platform.OS !== 'ios' && (
                                <TouchableOpacity
                                onPress={()=>{
                                this.player.seekTo(0);
                                this.player.playVideo();
                                }}
                                style={{marginLeft:30,flexDirection:'row',marginTop:15}}>
                                <AutoHeightImage
                                width={16}
                                source={require("../../../../assets/icons/rotate.red.png")} />
                                <Text style={[baseStyles.textColorWhite]}>
                                {" "} Relecture
                                </Text>
                            </TouchableOpacity>
                            )}

                            </View>
                    }
                        {/* <ImageBackground
                            source={require('../../../../assets/images/capture_decran.png')}
                            style={{ width: "100%", height: 200, padding: 5 }}
                            imageStyle={{borderRadius: 15}}
                        >
                            <View style={{ flexDirection: "row", justifyContent: "space-between", padding: 5, height: "100%" }}>
                                <View style={{ alignSelf: "flex-start", borderRadius:15, borderColor:colors.white, borderWidth:1, padding:5 }}>
                                    <Text style={{ color: colors.white, fontSize: 12, }}>1</Text>
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
                                        />
                                    </View>
                                </View>
                            </View>
                        </ImageBackground> */}
                    {/* </View> */}
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
                            text={"Répondre au test".toUpperCase()}
                            width={(screenWidth - 100)}
                            height={40}
                            style={{ alignSelf: "center" }}
                            onPress={() => {
                              //  this.props.navigation.navigate("DetailsTestUnitaires")
                                if(this.state.testMobilites !== null){
                                    if(this.state.testMobilites.data.length > 0  ){
                                      var  nameandtext2 ={name:this.state.testMobilites.data[0].name,text2:this.state.testMobilites.data[0].text2}
                                        const setValue = { type: SET_MONTESTUNIT, value: {photos_id:this.props.mobiliteparamsunit.video_test_id,nameandtext2:nameandtext2} };
                                        this.props.dispatch(setValue);
                                        if(global.is_venudedonneperso === true) {
                                            const setActiveTab = { type: SET_ACTIVE_TAB, value: "Montestunit" };
                                            this.props.dispatch(setActiveTab);
                                            this.props.navigation.navigate('LogedinNavigator');
                                            //
                                        }else{
                                            this.props.navigation.navigate("Montestunit")

                                        }
                                    }
                                }
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

  function youtube_parser(url){
    var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
    let url_ = url.trim().replace(/\n/g, "").replace(/\t/g, "").replace(/\r/g, "")
    .replace(/\'/g, "")
    .replace(/\"/g, '')
    .replace(/\&/g, "")
    .replace(/\b/g, "")
    .replace(/\f/g, "");
    var match = url_.match(regExp);
    return (match&&match[7].length==11)? match[7] : false;
}



// export default FichePedag;
const mapStateToProps = (state) => {
    const { isFichePedag,userToken,mobiliteparamsunit } = state.statedata
    return { isFichePedag,userToken,mobiliteparamsunit }
};

export default connect(mapStateToProps)(TestMobilitesUnitaires);
