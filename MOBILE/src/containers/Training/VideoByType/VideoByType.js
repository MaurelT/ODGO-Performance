import React, { Component } from 'react';
import {
    Dimensions,
    StatusBar,
    TouchableOpacity,
    ScrollView,
    View,
    Text, RefreshControl,
} from 'react-native';
import AutoHeightImage from 'react-native-auto-height-image';
import LinearGradient from 'react-native-linear-gradient';
import Swiper from 'react-native-swiper'
import colors from '../../../configs/colors';
import baseStyles from '../../../base/BaseStyles';
import styles from './styles';
import MAAButton from '../../../components/MAAButton/MAAButton';
import { connect } from 'react-redux';
import {SET_ACTIVE_TAB, SET_POP_TO_TOP,SET_USERPROGRAM_BY_ID_VIDEOTECH} from '../../../redux/types/tabTypes';
import VideothequeHelper from '../../../apis/helpers/videotheque_helper';
import Toast from 'react-native-toast-native';
import statusBarHeight from '../../../configs/screen';
import {getDashboar} from '../../../apis/FonctionRedondant';
import dashboardHelper from '../../../apis/helpers/dashboard_helper';
const style={
    backgroundColor: "#F54130",
    width: 300,
    height: Platform.OS === ("ios") ? 50 : 100,
    color: "#ffffff",
    fontSize: 15,
    lineHeight: 2,
   // lines: 4,
    borderRadius: 15,
    fontWeight: "bold",
    yOffset: 40
};

const screen = Dimensions.get('screen');
const SBHelight = statusBarHeight;
const screenWidth = screen.width
const screenHeight = screen.height - SBHelight


class VideoByType extends Component {
    swiper = [];

    constructor(props) {
        super(props);
        this.state = {
            activeMenu: 1,
            selectedType: "",
            activeContent: "choice",
            popToTop:this.props.popToTop,
            changeStateHereOrGoback:false,
            trainer_userprogrammes:[],
            //pagination
            page:1,
            id_user_program:null,
            UserProgramByType:[],
        }
    }
    selectType = async (type,id_user_program_bytype) => {
        await this.setState({ selectedType: type });
        //id_user_program et pages
        this.getUserProgramByType(id_user_program_bytype).then(()=>{
            //
            this.setState({ activeContent: "listing",changeStateHereOrGoback:true })
        });
    };


    //id et pages
    getUserProgramByType  = async (id_user_program) => {
        this.setState({refreshing: true});
        console.warn('ato v getUserProgramByID',id_user_program);
        const UserProgramByType = await VideothequeHelper.getUserProgramByType(this.props.userToken,id_user_program);
        if (UserProgramByType.success === true) {
            console.warn('mitohy programmes by type',UserProgramByType)
                this.setState({UserProgramByType:UserProgramByType.data});
                this.setState({refreshing: false});

        }
    }

    componentDidMount() {
        this.setState({refreshing:true});
        this.get_trainer_userprogrammes();
    }

    get_trainer_userprogrammes  = async () => {
        this.setState({refreshing: true});
        const trainer_userprogrammes = await VideothequeHelper.get_trainer_userprogrammes_byType(this.props.userToken);
        if (trainer_userprogrammes.data.length >0) {
            this.setState({trainer_userprogrammes:trainer_userprogrammes.data});
            this.setState({refreshing: false});
        }
    };


    render() {
        if(this.props.popToTop === 'train'){
            this.props.navigation.popToTop();
            const setPopToTop = { type: SET_POP_TO_TOP, value: '' }
            this.props.dispatch(setPopToTop);
        }



        return (
            <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }} colors={[colors.balck, colors.green, colors.balck]} style={baseStyles.linearGradient}>

                  <View style={{ alignItems :"center",justifyContent:"center",width:"100%",marginTop:15  }}>
                    <TouchableOpacity
                        onPress={() => {
                            console.log("Changing Zone")
                            if(this.state.changeStateHereOrGoback === false){
                                if(this.props.navigation.goBack()){

                                }else{
                                    const setActiveTabAction = { type: SET_ACTIVE_TAB, value: "videotheque" }
                                    this.props.dispatch(setActiveTabAction)
                                }

                            }else if(this.state.changeStateHereOrGoback === true){
                                this.setState({changeStateHereOrGoback: !this.state.changeStateHereOrGoback,selectedType:'',activeContent:'choice' })
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
                    <TouchableOpacity style={[styles.noSelectedBtn, { alignSelf: "center" }]}
                                      onPress={async () => {
                                          console.log("Chenging Zone")
                                          await this.setState({ selectedType: "" })
                                          await this.setState({ activeContent: "choice" })
                                      }}>
                        <View style={[styles.headCtn,{alignSelf:"center"}]}>
                            <Text style={[baseStyles.titleText,{fontSize:20}]}>
                                {this.state.selectedType == "" ? "Par type" : this.state.selectedType}
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>

                <ScrollView
                    ref='_scrollView'
                    keyboardShouldPersistTaps={'always'}


                        refreshControl={
                        <RefreshControl
                            refreshing={this.state.refreshing}
                            onRefresh={() => {

                                //ato le izy

                                    this.setState({ refreshing: true });
                                    setTimeout(() => {
                                        console.warn('actualisation')
                                        this.setState({ refreshing: false })
                                    }, 2000)
                            }}

                        />
                    }
                >

                    {
                        this.state.activeContent == "choice" ?
                            <View style={{ width: screenWidth, alignItems: "center", paddingTop: 30,marginBottom:50}}>

                         { this.state.trainer_userprogrammes.length>0 &&
                         this.state.trainer_userprogrammes.map(
                             (item)=>
                               ( <TouchableOpacity style={[styles.typeBtn]}
                                    onPress={() => {

                                        this.selectType(item.name,item.id)
                                        this.setState({id_user_program:item.id}) //miasa am scrollview

                                    }}>
                                    <View style={[styles.btnView]}>
                                        <Text style={[baseStyles.textColorWhite]}>{item.name.toUpperCase()}</Text>
                                        <AutoHeightImage
                                            width={18}
                                            source={require("../../../assets/icons/arrow-white.png")}
                                        />
                                    </View>
                                </TouchableOpacity>)
                         )}

                                {/*<TouchableOpacity style={[styles.typeBtn]}*/}
                                {/*    onPress={() => {*/}
                                {/*        this.selectType("RÉCUPÉRATION")*/}
                                {/*    }}>*/}
                                {/*    <View style={[styles.btnView]}>*/}
                                {/*        <Text style={[baseStyles.textColorWhite]}>RÉCUPÉRATION</Text>*/}
                                {/*        <AutoHeightImage*/}
                                {/*            width={18}*/}
                                {/*            source={require("../../../assets/icons/arrow-white.png")}*/}
                                {/*        />*/}
                                {/*    </View>*/}
                                {/*</TouchableOpacity>*/}

                                {/*<TouchableOpacity style={[styles.typeBtn]}*/}
                                {/*    onPress={() => {*/}
                                {/*        this.selectType("SÉANCE")*/}
                                {/*    }}>*/}
                                {/*    <View style={[styles.btnView]}>*/}
                                {/*        <Text style={[baseStyles.textColorWhite]}>SÉANCE</Text>*/}
                                {/*        <AutoHeightImage*/}
                                {/*            width={18}*/}
                                {/*            source={require("../../../assets/icons/arrow-white.png")}*/}
                                {/*        />*/}
                                {/*    </View>*/}
                                {/*</TouchableOpacity>*/}

                                {/*<TouchableOpacity style={[styles.typeBtn,{marginBottom:50 }]}*/}
                                {/*    onPress={() => {*/}
                                {/*        this.selectType("RÉHABILITATION")*/}
                                {/*    }}>*/}
                                {/*    <View style={[styles.btnView]}>*/}
                                {/*        <Text style={[baseStyles.textColorWhite]}>RÉHABILITATION</Text>*/}
                                {/*        <AutoHeightImage*/}
                                {/*            width={18}*/}
                                {/*            source={require("../../../assets/icons/arrow-white.png")}*/}
                                {/*        />*/}
                                {/*    </View>*/}
                                {/*</TouchableOpacity>*/}

                            </View>
                            : null
                    }

                    {this.state.activeContent === "listing" ?
                        <View style={{ alignItems: "center", width: screenWidth,marginBottom:screenHeight*0.05 }}>
                            {
                                this.state.UserProgramByType.length>0 &&
                                this.state.UserProgramByType.map((value, index) => {
                                    return (
                                        <TouchableOpacity key={"ExItemk" + index}
                                                          style={{flexDirection:'row',alignItems:'center',
                                                              borderBottomColor: colors.white + "A5",
                                                              borderBottomWidth: 0.4,
                                                              paddingVertical:7
                                                          }}
                                                          onPress={() => {
                                                              // this.props.navigation.navigate("SingleExercice",{id:value.id,exercice:this.props.navigation.state.params.nomZone})
                                                              this.props.navigation.navigate("SingleExercice",{id:value.id,exercice:this.state.selectedType})

                                                          }}
                                        >
                                            <View style={{
                                                width: screenWidth,
                                                flexDirection: "row",
                                                alignItems: "center",
                                                justifyContent:'space-between',

                                            }}>
                                                <View style={{flexDirection:'row',alignItems:'center', width: '55%',}}>
                                                    {value.picture !== null ?
                                                        <AutoHeightImage
                                                            width={50}
                                                            source={{uri: value.picture}}
                                                            style={{
                                                                height: 50,
                                                                width:50,
                                                                borderRadius: 50,
                                                                marginRight: 7,
                                                                marginLeft:10
                                                            }}

                                                        />
                                                        :
                                                        <View  style={{
                                                            height: 50,
                                                            width:50,
                                                            borderRadius: 50,
                                                            marginRight: 7,
                                                            marginLeft:10
                                                        }}/>
                                                    }


                                                    <View style={{
                                                        alignItems:'flex-start',justifyContent:'center',
                                                        // flexDirection:'row',alignItems:'center'
                                                    }}>
                                                        <Text style={[baseStyles.textColorWhite, {}]}>{value.name.trim()}</Text>
                                                    </View>
                                                </View>
                                                <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
                                                    <View style={{}}>
                                                        {

                                                            (value.indice === 0  && value.video_type.show_indice === true) &&
                                                            <View style={[styles.rateCtn]}>
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
                                                        }

                                                        {

                                                            (value.indice === 1 && value.video_type.show_indice === true) &&
                                                            <View style={[styles.rateCtn]}>
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
                                                        }
                                                        {

                                                            (value.indice === 2  && value.video_type.show_indice === true) &&
                                                            <View style={[styles.rateCtn]}>
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
                                                        }
                                                        {

                                                            (value.indice === 3  && value.video_type.show_indice === true) &&
                                                            <View style={[styles.rateCtn,]}>
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
                                                        }
                                                    </View>
                                                    <AutoHeightImage
                                                        width={14}
                                                        source={require("../../../assets/icons/arrow-white.png")}
                                                        style={[{ marginRight:10 }]} />
                                                </View>
                                            </View>
                                        </TouchableOpacity>
                                    )
                                })
                            }

                        </View> : null
                    }

                </ScrollView>
            </LinearGradient >
        )
    }
}

const mapStateToProps = (state) => {
    const { selectedZone,popToTop,userToken,UserProgramByIDprogrammesVideotech } = state.statedata
    return { selectedZone,popToTop,userToken,UserProgramByIDprogrammesVideotech }
};

export default connect(mapStateToProps)(VideoByType);
