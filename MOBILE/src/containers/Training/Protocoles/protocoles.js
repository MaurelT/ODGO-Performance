import React, { Component } from 'react';
import {
    Dimensions,
    StatusBar,
    TouchableOpacity,
    ScrollView,
    View,
    Text, RefreshControl,Platform
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


class Protocoles extends Component {
    swiper = []

    constructor(props) {
        super(props)
        this.state = {
            activeMenu: 1,
            selectedType: "",
            activeContent: "choice",
            listExercice: props.listExercice,
            popToTop:this.props.popToTop,
            changeStateHereOrGoback:false,
            trainer_userprogrammes:[],
            UserProgramByID:[],

            //pagination
            page:1,
            id_user_program:null,
        }
    }


    selectType = async (type,id_user_program) => {
        await this.setState({ selectedType: type });
        //id_user_program et pages
        this.getUserProgramByID(id_user_program,this.state.page).then(()=>{
            //
            this.setState({ activeContent: "listing",changeStateHereOrGoback:true })
        });
    };


    //id et pages
    getUserProgramByID  = async (id_user_program,page) => {
        this.setState({refreshing: true});
        const UserProgramByID = await VideothequeHelper.getUserProgramByID(this.props.userToken,id_user_program,page);
        let msi = JSON.parse(UserProgramByID);
        if (msi) {
           // this.setState({UserProgramByID:UserProgramByID.data});
            //UserProgramByIDprogrammesVideotech n variable miasa am redux
            const setuserprogram = { type: SET_USERPROGRAM_BY_ID_VIDEOTECH, value: msi.data }
            this.props.dispatch(setuserprogram);
            this.setState({refreshing: false});
        }
    }

    componentDidMount() {
        this.setState({refreshing:true});
        this.get_trainer_userprogrammes();

        //activeContent === "listing"
        if(this.props.navigation.state.params.venudedashboard === true){
            console.warn('nameitem', this.props.navigation.state.params.nameitem);
            this.setState({selectedType: this.props.navigation.state.params.nameitem});
            this.setState({activeContent:'listing'});
            this.setState({id_user_program:this.props.navigation.state.params.id});
            this.getUserProgramByID( this.props.navigation.state.params.id ,this.state.page).then(()=>{
                this.setState({refreshing:false});
            })
        }
    }

    get_trainer_userprogrammes  = async () => {
        this.setState({refreshing: true});
        const trainer_userprogrammes = await VideothequeHelper.get_trainer_userprogrammes(this.props.userToken);
        if (trainer_userprogrammes.data.length >0) {

            this.setState({trainer_userprogrammes:trainer_userprogrammes.data});
            this.setState({refreshing: false});
        }else {
            this.setState({refreshing: false});

        }
    };


    render() {
        if(this.props.popToTop === 'train' || this.props.popToTop === 'home'){
            const setPopToTop = { type: SET_POP_TO_TOP, value: '' }
            this.props.dispatch(setPopToTop);
            this.props.navigation.popToTop();
        }

        const isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
            return (        layoutMeasurement.height + contentOffset.y >= contentSize.height - 1     );
        };

        return (
            <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }} colors={[colors.balck, colors.green, colors.balck]} style={baseStyles.linearGradient}>
                <View style={{ alignItems :"center",justifyContent:"center",width:"100%",marginTop:15  }}>
                    <TouchableOpacity
                        onPress={() => {
                            console.log("Changing Zone")
                            this.setState({page:1})
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
                    <TouchableOpacity
                        onPress={async () => {
                            console.log("Chenging Zone")
                            this.setState({page:1})
                            await this.setState({ selectedType: "" })
                            await this.setState({ activeContent: "choice" })
                        }}>
                        <Text style={[baseStyles.titleText]}>
                            {this.state.selectedType == "" ? "Mes protocoles" : this.state.selectedType}
                        </Text>
                    </TouchableOpacity>
                </View>

                <ScrollView
                    ref='_scrollView'
                    keyboardShouldPersistTaps={'always'}
                    onScroll={({ nativeEvent }) =>  {
                        if (isCloseToBottom(nativeEvent)) {
                        //detect si tobottom
                            console.warn('scroll page aloha',this.state.page)
                            let page = this.state.page +1;
                            //ts maints mande io satria efa nahazo id sy page zareo
                            if(this.state.id_user_program !== null){
                                this.getUserProgramByID( this.state.id_user_program ,page).then(()=>{
                                    this.setState({page:page})
                                    this.refs._scrollView.scrollTo({x:0,y:0,animated:true});
                                    console.warn('page scrollup',this.state.page,page)
                                    Toast.show('Page : '+page, Toast.SHORT, Toast.TOP,style);

                                })
                            }
                         }}}

                        refreshControl={
                        <RefreshControl
                            refreshing={this.state.refreshing}
                            onRefresh={() => {
                                //ato le izy
                                if(this.state.activeContent === "listing"){
                                    if(this.state.page >= 2 ){
                                        let page = this.state.page - 1;
                                        this.getUserProgramByID( this.state.id_user_program ,page).then(()=>{
                                            this.setState({page:page})
                                            this.refs._scrollView.scrollTo({x:5,y:5,animated:true});
                                            console.warn('page scrolldown',this.state.page,page)
                                            Toast.show('Page : '+page, Toast.SHORT, Toast.TOP,style);
                                        })
                                    }
                                }else{
                                    this.setState({ refreshing: true });
                                    setTimeout(() => {
                                        console.warn('actualisation')
                                        this.setState({ refreshing: false })
                                    }, 2000)
                                }

                            }}
                            tintColor={Platform.OS==='ios'?colors.white:colors.green}
                            colors={[Platform.OS==='ios'?colors.white:colors.green]}

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
                                        this.setState({page:1})
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



                            </View>
                            : null
                    }

                    {/*{this.state.activeContent === "listing" ?*/}
                    {/*    <View style={{ alignItems: "center", width: screenWidth,marginBottom:screenHeight*0.2 }}>*/}
                    {/*        {*/}
                    {/*            // this.props.listExercice.map((value, index) => {*/}
                    {/*            this.props.UserProgramByIDprogrammesVideotech.length>0 &&*/}
                    {/*            this.props.UserProgramByIDprogrammesVideotech.map((value, index) => {*/}
                    {/*                return (*/}
                    {/*                    <TouchableOpacity key={"ExItemk" + index}*/}
                    {/*                        onPress={() => {*/}
                    {/*                            console.warn('voatsindry item')*/}
                    {/*                            // if(this.props.navigation.navigate("SingleExercice",{id:value.id,exercice:this.state.selectedType})){}*/}
                    {/*                            if(this.props.navigation.navigate("SingleExercice",{id:value.id,exercice:this.state.selectedType})){}*/}
                    {/*                            else{*/}
                    {/*                                this.props.navigation.navigate("SingleExerciceDashboard",{id:value.id,exercice:this.state.selectedType})*/}
                    {/*                            }*/}
                    {/*                        }}*/}
                    {/*                    >*/}
                    {/*                        /!* <View style={[styles.videoItemCtn, (index == (this.state.listExercice.length - 1) ? styles.videoItemCtnLast : {})]}>*/}
                    {/*                            <AutoHeightImage*/}
                    {/*                                width={50}*/}
                    {/*                                source={require("../../../assets/images/attelle.genou.jpg")}*/}
                    {/*                                style={{*/}
                    {/*                                    minHeight: 50,*/}
                    {/*                                    maxHeight: 50,*/}
                    {/*                                    height: 50,*/}
                    {/*                                    borderRadius: 50,*/}
                    {/*                                    marginRight: 10*/}
                    {/*                                }} />*/}
                    {/*                            <Text style={[baseStyles.textColorWhite, { marginRight: 10 }]}>{value.title}</Text>*/}

                    {/*                            <AutoHeightImage*/}
                    {/*                                width={14}*/}
                    {/*                                source={require("../../../assets/icons/arrow-white.png")}*/}
                    {/*                                style={[styles.arrowRightIcon]} />*/}
                    {/*                        </View> *!/*/}
                    {/*                        <View style={[styles.videoItemCtn, (index == (this.props.UserProgramByIDprogrammesVideotech.length - 1) ? styles.videoItemCtnLast : {})]}>*/}
                    {/*                            <View style={{ flexDirection: "row", justifyContent: "flex-start", width: screenWidth * 0.5 }}>*/}
                    {/*                                <AutoHeightImage*/}
                    {/*                                    width={50}*/}
                    {/*                                    source={{uri: value.picture}}*/}
                    {/*                                    style={{*/}
                    {/*                                        minHeight: 50,*/}
                    {/*                                        maxHeight: 50,*/}
                    {/*                                        height: 50,*/}
                    {/*                                        borderRadius: 50,*/}
                    {/*                                        marginRight: 10*/}
                    {/*                                    }} />*/}
                    {/*                                <Text style={[baseStyles.textColorWhite, { alignSelf: "center" }]}>{value.name}</Text>*/}
                    {/*                            </View>*/}
                    {/*                            <AutoHeightImage*/}
                    {/*                                width={14}*/}
                    {/*                                source={require("../../../assets/icons/arrow-white.png")}*/}
                    {/*                                // style={[styles.arrowRightIcon, { alignSelf: "center" }]} />*/}
                    {/*                                style={[{ alignSelf: "center" }]} />*/}
                    {/*                        </View>*/}
                    {/*                    </TouchableOpacity>*/}
                    {/*                )*/}
                    {/*            })*/}
                    {/*        }*/}

                    {/*    </View> : null*/}
                    {/*}*/}

                    {this.state.activeContent === "listing" ?
                        <View style={{ alignItems: "center", width: screenWidth,marginBottom:screenHeight*0.05 }}>
                            {
                                this.props.UserProgramByIDprogrammesVideotech.length>0 &&
                                this.props.UserProgramByIDprogrammesVideotech.map((value, index) => {
                                    return (
                                        <TouchableOpacity key={"ExItemk" + index}
                                                          style={{flexDirection:'row',alignItems:'center',
                                                              borderBottomColor: colors.white + "A5",
                                                              borderBottomWidth: 0.4,
                                                              paddingVertical:7
                                                          }}
                                                          onPress={() => {
                                                              // this.props.navigation.navigate("SingleExercice",{id:value.id,exercice:this.props.navigation.state.params.nomZone})
                                                              if(this.props.navigation.navigate("SingleExercice",{id:value.id,exercice:this.state.selectedType})){}
                                                              else{
                                                                  this.props.navigation.navigate("SingleExerciceDashboard",{id:value.id,exercice:this.state.selectedType})
                                                              }
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
                                                        <Text style={[baseStyles.textColorWhite, {}]}>{value.name.trim().replace(/\n/g, "").replace(/\t/g, "").replace(/\r/g, "")
                                                            .replace(/\'/g, "")
                                                            .replace(/\"/g, '')
                                                            .replace(/\&/g, "")
                                                            .replace(/\b/g, "")
                                                            .replace(/\f/g, "")}</Text>
                                                    </View>
                                                </View>
                                                <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>

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
    const { selectedZone, listExercice,popToTop,userToken,UserProgramByIDprogrammesVideotech } = state.statedata
    return { selectedZone, listExercice,popToTop,userToken,UserProgramByIDprogrammesVideotech }
};

export default connect(mapStateToProps)(Protocoles);
