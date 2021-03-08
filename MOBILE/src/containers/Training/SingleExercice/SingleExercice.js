import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    ScrollView,
    View,
    Text,
    TouchableOpacity,
    Dimensions,
    StatusBar, RefreshControl,
    Platform
} from 'react-native';
import baseStyles from '../../../base/BaseStyles';
import styles from './styles';
import colors from '../../../configs/colors';
import LinearGradient from 'react-native-linear-gradient';
import AutoHeightImage from 'react-native-auto-height-image';
// import Video from 'react-native-af-video-player'
import VideothequeHelper from '../../../apis/helpers/videotheque_helper';
import Toast from 'react-native-toast-native';
import YoutubePlayer from "react-native-yt-player";
import YouTube from 'react-native-youtube';
import statusBarHeight from '../../../configs/screen';
import {getDashboar} from '../../../apis/FonctionRedondant';
import dashboardHelper from '../../../apis/helpers/dashboard_helper';
import {SET_ACTIVE_TAB} from '../../../redux/types/tabTypes';


const screen = Dimensions.get("window");
const SBHelight = statusBarHeight;
const screenWidth = screen.width
const screenHeight = screen.height - SBHelight


function youtube_parser(url){
    if(url !== ""){
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
}

class SingleExercice extends Component {

    player = null

    constructor(props) {
        super(props)
        this.state = {
            exerciceToShow: props.exerciceToShow,
            rate: 1,
            volume: 1,
            muted: false,
            resizeMode: 'contain',
            duration: 0.0,
            currentTime: 0.0,
            controls: false,
            paused: false,
            skin: 'native',
            ignoreSilentSwitch: null,
            isBuffering: false,
            SingleVideoTrainingVideotech:null,
        }
    }

    componentDidMount() {
        this.getSingleVideoTrainingVideotech();
    }



    getSingleVideoTrainingVideotech  = async () => {
        this.setState({refreshing: true});
        let SingleVideoTrainingVideotech;
       /* console.warn(this.props.navigation.state.params.id?this.props.navigation.state.params.id : 'tsis id')
        if(this.props.navigation.state.params.id){
             SingleVideoTrainingVideotech = await VideothequeHelper.getSingleVideoTrainingVideotech(this.props.userToken,this.props.navigation.state.params.id );

        }else{*/
             SingleVideoTrainingVideotech = await VideothequeHelper.getSingleVideoTrainingVideotech(this.props.userToken,this.props.paramsvideotheque.id );
        //}
        if (SingleVideoTrainingVideotech.success === true) {
            console.warn('bob')
            this.setState({SingleVideoTrainingVideotech: SingleVideoTrainingVideotech});
            this.setState({refreshing: false});
        }else{
            this.setState({refreshing: false});
        }
    };

    // state = {
    //     rate: 1,
    //     volume: 1,
    //     muted: false,
    //     resizeMode: 'contain',
    //     duration: 0.0,
    //     currentTime: 0.0,
    //     controls: false,
    //     paused: true,
    //     skin: 'custom',
    //     ignoreSilentSwitch: null,
    //     isBuffering: false,
    //     };

    onLoad = (data) => {
        console.log('On load fired!');
        this.setState({ duration: data.duration });
    }
    onProgress = (data) => {
        this.setState({ currentTime: data.currentTime });
    }
    onBuffer = ({ isBuffering }) => {
        this.setState({ isBuffering });
    }
    getCurrentTimePercentage = () => {
        if (this.state.currentTime > 0) { return parseFloat(this.state.currentTime) / parseFloat(this.state.duration); } else { return 0; }
    }
    renderSkinControl = (skin) => {
        const isSelected = this.state.skin == skin;
        const selectControls = skin == 'native' || skin == 'embed';
        return (
            <TouchableOpacity onPress={() => {
                this.setState({
                    controls: selectControls,
                    skin: skin
                })
            }}>
                <Text style={[styles.controlOption, { fontWeight: isSelected ? "bold" : "normal" }]}>
                    {skin}
                </Text>
            </TouchableOpacity>
        );
    }
    renderRateControl = (rate) => {
        const isSelected = (this.state.rate == rate);
        return (
            <TouchableOpacity onPress={() => { this.setState({ rate: rate }) }}><Text style={[styles.controlOption, { fontWeight: isSelected ? "bold" : "normal" }]}>
                {rate}x
        </Text>
            </TouchableOpacity>
        )
    }
    renderResizeModeControl = (resizeMode) => {
        const isSelected = (this.state.resizeMode == resizeMode);
        return (
            <TouchableOpacity onPress={() => { this.setState({ resizeMode: resizeMode }) }}>
                <Text style={[styles.controlOption, { fontWeight: isSelected ? "bold" : "normal" }]}>
                    {resizeMode}
                </Text>
            </TouchableOpacity>
        )
    }
    renderVolumeControl = (volume) => {
        const isSelected = (this.state.volume == volume);
        return (
            <TouchableOpacity onPress={() => { this.setState({ volume: volume }) }}>
                <Text style={[styles.controlOption, { fontWeight: isSelected ? "bold" : "normal" }]}>
                    {volume * 100}%
        </Text>
            </TouchableOpacity>
        )
    }
    renderIgnoreSilentSwitchControl = (ignoreSilentSwitch) => {
        const isSelected = (this.state.ignoreSilentSwitch == ignoreSilentSwitch);
        return (
            <TouchableOpacity onPress={() => { this.setState({ ignoreSilentSwitch: ignoreSilentSwitch }) }}>
                <Text style={[styles.controlOption, { fontWeight: isSelected ? "bold" : "normal" }]}>
                    {ignoreSilentSwitch}
                </Text>
            </TouchableOpacity>
        )
    }



    onFullScreen = fullScreen => {
        console.log("fullscreen ", fullScreen);
    };

    render() {
        let videoId = null;
        if(this.state.SingleVideoTrainingVideotech !== null){

                videoId = youtube_parser(this.state.SingleVideoTrainingVideotech.data.lien_youtube);
                console.warn('vidoe id',videoId)

        }

        return (
            <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }} colors={[colors.balck, colors.green, colors.balck]} style={baseStyles.linearGradient}>

                <ScrollView
                    style={styles.scrollView}
                    contentContainerStyle={[styles.contentContainerStyle]}
                    keyboardShouldPersistTaps={'always'}

                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.refreshing}
                            onRefresh={() => {

                                //ato le izy
                                this.getSingleVideoTrainingVideotech();

                                this.setState({refreshing: true});
                                setTimeout(() => {
                                    console.warn('actualisation')
                                    this.setState({refreshing: false})
                                }, 2000)
                             }
                            }
                            tintColor={Platform.OS==='ios'?colors.white:colors.green}
                            colors={[Platform.OS==='ios'?colors.white:colors.green]}
                        />
                    }
                >


                    <View style={{ alignItems :"center",justifyContent:"center",width:"100%",marginTop:15  }}>
                        <TouchableOpacity
                            onPress={() => {
                                console.log("Changing Zone")
                                if(this.props.navigation.goBack()){}
                                else{
                                    const setActiveTab = { type: SET_ACTIVE_TAB, value: "ListeLeftRightFoot" };
                                    this.props.dispatch(setActiveTab);
                                    this.props.navigation.navigate('LogedinNavigator');
                                }

                            }}
                            style={{width:50,position:"absolute",left:0}}
                        >
                            <AutoHeightImage
                                width={18}
                                source={require('../../../assets/icons/arrow-white.png')}
                                style={{
                                    marginLeft:15,
                                    transform: [
                                        { rotateY: "180deg" }
                                    ],
                                }}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity style={{alignSelf:'center'}}
                                          onPress={() => {
                                              // console.log("Chenging Zone")
                                              // this.setState({ zonePicker: true })
                                          }}>
                                <Text style={[baseStyles.titleText,{marginLeft:-screenWidth*0.016}]}>
                                    {/*{ this.state.SingleVideoTrainingVideotech !== null &&   (*/}
                                    {/*this.state.SingleVideoTrainingVideotech.data.name)}*/}
                                    {/*{this.props.navigation.state.params.exercice ? this.props.navigation.state.params.exercice :this.props.paramsvideotheque.exercice}*/}
                                    {this.props.paramsvideotheque.exercice}
                                </Text>
                        </TouchableOpacity>
                    </View>

                    <View style={{ alignItems: "center", width: screenWidth, padding: 15 }}>
                        <Text style={[baseStyles.textColorWhite, { paddingTop: 0, fontSize: 20,marginHorizontal:15,textAlign:'center' }]}>
                            {this.state.SingleVideoTrainingVideotech !== null &&
                                this.state.SingleVideoTrainingVideotech.data.name
                            }
                        </Text>
                                        {
                                            this.state.SingleVideoTrainingVideotech !== null &&   (
                                                (this.state.SingleVideoTrainingVideotech.data.indice === 0 && this.state.SingleVideoTrainingVideotech.data.video_type.show_indice === true) &&
                                                <View style={{marginTop: 10,flexDirection: "row",
                                                    alignItems: "center",
                                                    justifyContent: "center",}}>
                                                    <AutoHeightImage key={"star_" + 1} // index hono
                                                    width={12}
                                                    source={(
                                                      //  require("../../../assets/icons/star.red.full.png")
                                                         require("../../../assets/icons/star.red.empty.png")
                                                        )}
                                                    style={[styles.rateStar]} />
                                                    <AutoHeightImage key={"star_" + 1} // index hono
                                                                     width={12}
                                                                     source={(
                                                                         //  require("../../../assets/icons/star.red.full.png")
                                                                         require("../../../assets/icons/star.red.empty.png")
                                                                     )}
                                                                     style={[styles.rateStar]} />
                                                    <AutoHeightImage key={"star_" + 1} // index hono
                                                                     width={12}
                                                                     source={(
                                                                         //  require("../../../assets/icons/star.red.full.png")
                                                                         require("../../../assets/icons/star.red.empty.png")
                                                                     )}
                                                                     style={[styles.rateStar]} />
                                                </View>
                                            )}

                        {
                            this.state.SingleVideoTrainingVideotech !== null &&   (
                                (this.state.SingleVideoTrainingVideotech.data.indice === 1 && this.state.SingleVideoTrainingVideotech.data.video_type.show_indice === true)  &&
                                <View style={[styles.rateCtn, {marginTop: 10}]}>
                                    <AutoHeightImage key={"star_" + 1} // index hono
                                                     width={12}
                                                     source={(
                                                           require("../../../assets/icons/star.red.full.png")
                                                       //  require("../../../assets/icons/star.red.empty.png")
                                                     )}
                                                     style={[styles.rateStar]} />
                                    <AutoHeightImage key={"star_" + 1} // index hono
                                                     width={12}
                                                     source={(
                                                         //  require("../../../assets/icons/star.red.full.png")
                                                         require("../../../assets/icons/star.red.empty.png")
                                                     )}
                                                     style={[styles.rateStar]} />
                                    <AutoHeightImage key={"star_" + 1} // index hono
                                                     width={12}
                                                     source={(
                                                         //  require("../../../assets/icons/star.red.full.png")
                                                         require("../../../assets/icons/star.red.empty.png")
                                                     )}
                                                     style={[styles.rateStar]} />
                                </View>
                            )}
                        {
                            this.state.SingleVideoTrainingVideotech !== null &&   (
                                (this.state.SingleVideoTrainingVideotech.data.indice === 2 && this.state.SingleVideoTrainingVideotech.data.video_type.show_indice === true)  &&
                                <View style={[styles.rateCtn, {marginTop: 10}]}>
                                    <AutoHeightImage key={"star_" + 1} // index hono
                                                     width={12}
                                                     source={(
                                                         require("../../../assets/icons/star.red.full.png")
                                                         //  require("../../../assets/icons/star.red.empty.png")
                                                     )}
                                                     style={[styles.rateStar]} />
                                    <AutoHeightImage key={"star_" + 1} // index hono
                                                     width={12}
                                                     source={(
                                                           require("../../../assets/icons/star.red.full.png")
                                                       //  require("../../../assets/icons/star.red.empty.png")
                                                     )}
                                                     style={[styles.rateStar]} />
                                    <AutoHeightImage key={"star_" + 1} // index hono
                                                     width={12}
                                                     source={(
                                                         //  require("../../../assets/icons/star.red.full.png")
                                                         require("../../../assets/icons/star.red.empty.png")
                                                     )}
                                                     style={[styles.rateStar]} />
                                </View>
                            )}
                        {
                            this.state.SingleVideoTrainingVideotech !== null &&   (
                                ( this.state.SingleVideoTrainingVideotech.data.indice >= 3 && this.state.SingleVideoTrainingVideotech.data.video_type.show_indice === true)  &&
                                <View style={[styles.rateCtn, {marginTop: 10}]}>
                                    <AutoHeightImage key={"star_" + 1} // index hono
                                                     width={12}
                                                     source={(
                                                         require("../../../assets/icons/star.red.full.png")
                                                         //  require("../../../assets/icons/star.red.empty.png")
                                                     )}
                                                     style={[styles.rateStar]} />
                                    <AutoHeightImage key={"star_" + 1} // index hono
                                                     width={12}
                                                     source={(
                                                           require("../../../assets/icons/star.red.full.png")
                                                         //require("../../../assets/icons/star.red.empty.png")
                                                     )}
                                                     style={[styles.rateStar]} />
                                    <AutoHeightImage key={"star_" + 1} // index hono
                                                     width={12}
                                                     source={(
                                                           require("../../../assets/icons/star.red.full.png")
                                                         //require("../../../assets/icons/star.red.empty.png")
                                                     )}
                                                     style={[styles.rateStar]} />
                                </View>
                            )}

                        {/* { this.props.exerciceToShow != null ? <Video url={"https://youtu.be/LQYnoZveO8Y"} /> : null } */}

                        {/* <View style={{ width: screenWidth, height: 200 }}>
                            <Video
                                source={{ uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4' }}   // Can be a URL or a local file.
                                ref={(ref) => {
                                    this.player = ref
                                }}
                                style={[styles.backgroundVideo]} />
                        </View> */}

                        {/*{this.state.controls ? this.renderNativeSkin() : this.renderCustomSkin()}*/}

                        <View style={{marginBottom:20,marginTop:10}}/>
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
                                style={{ height: screenHeight/3,width:screenWidth}}
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
                                source={require("../../../assets/icons/rotate.red.png")} />
                                <Text style={[baseStyles.textColorWhite]}>
                                {" "} Relecture
                                </Text>
                            </TouchableOpacity>
                            )}

                            </View>
                        }

                        {/*<View style={[styles.istrucCtn]}>*/}
                        {/*    /!*<View style={[styles.istrucElem]}>*!/*/}
                        {/*    /!*    <AutoHeightImage*!/*/}
                        {/*    /!*        width={16}*!/*/}
                        {/*    /!*        source={require("../../../assets/icons/clock.red.png")} />*!/*/}
                        {/*    /!*    <Text style={[baseStyles.textColorWhite]}>*!/*/}
                        {/*    /!*        {" "+30}*!/*/}
                        {/*    /!*    </Text>*!/*/}
                        {/*    /!*</View>*!/*/}
                        {/*    <View style={[styles.istrucElem]}>*/}
                        {/*        <AutoHeightImage*/}
                        {/*            width={16}*/}
                        {/*            source={require("../../../assets/icons/rotate.red.png")}*/}
                        {/*            style={{*/}
                        {/*                transform: [*/}
                        {/*                    // {rotateY: "180deg"},*/}
                        {/*                    // {rotateX: "180deg"},*/}
                        {/*                    {rotateZ: "150deg"}*/}
                        {/*                ]*/}
                        {/*            }} />*/}
                        {/*        <Text style={[baseStyles.textColorWhite]}>*/}
                        {/*            {" x" + 3}*/}
                        {/*        </Text>*/}
                        {/*    </View>*/}
                        {/*</View>*/}
                        <View style={[styles.istrucElem]}>
                            <Text style={[baseStyles.textColorWhite, {  marginLeft: 2,fontSize:18 }]}>
                                Instructions
                            </Text>
                        </View>


                        { this.state.SingleVideoTrainingVideotech !== null && (
                            <Text style={[baseStyles.textColorWhite, { paddingTop: 10,textAlign:'center' }]}>
                                {this.state.SingleVideoTrainingVideotech.data.position_outil.replace(/\n/g, "").replace(/\t/g, "").replace(/\r/g, "")
                                    //.replace(/\'/g, "")
                                    .replace(/\"/g, '')
                                    .replace(/\&/g, "")
                                    .replace(/\b/g, "")
                                    .replace(/\f/g, "")}
                            </Text>
                        )}
                        { this.state.SingleVideoTrainingVideotech !== null && (
                            <Text style={[baseStyles.textColorWhite, { paddingTop: 10,textAlign:'center' }]}>
                                {this.state.SingleVideoTrainingVideotech.data.position_corps.replace(/\n/g, "").replace(/\t/g, "").replace(/\r/g, "")
                                    //.replace(/\'/g, "")
                                    .replace(/\"/g, '')
                                    .replace(/\&/g, "")
                                    .replace(/\b/g, "")
                                    .replace(/\f/g, "")}
                            </Text>
                        )}
                        { this.state.SingleVideoTrainingVideotech !== null && (
                            <Text style={[baseStyles.textColorWhite, { paddingTop: 10,textAlign:'center' }]}>
                                {this.state.SingleVideoTrainingVideotech.data.instruction.replace(/\n/g, "").replace(/\t/g, "").replace(/\r/g, "")
                                    //.replace(/\'/g, "")
                                    .replace(/\"/g, '')
                                    .replace(/\&/g, "")
                                    .replace(/\b/g, "")
                                    .replace(/\f/g, "")}
                            </Text>
                        )
                        }

                    </View>

                </ScrollView>

            </LinearGradient>
        )
    }
}

// export default AddBlessure;
const mapStateToProps = (state) => {
    const { exerciceToShow ,userToken,paramsvideotheque,paramtrain} = state.statedata
    return { exerciceToShow ,userToken,paramsvideotheque,paramtrain}
};

export default connect(mapStateToProps)(SingleExercice);
