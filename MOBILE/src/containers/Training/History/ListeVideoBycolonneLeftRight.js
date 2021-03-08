import React, { Component } from 'react';
import {
    Dimensions,
    StatusBar,
    TouchableOpacity,
    ScrollView,
    View,Platform,
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
import {SET_ACTIVE_TAB, SET_POP_TO_TOP, SET_USERPROGRAM_BY_ID_VIDEOTECH, SET_ZONE,SET_PARAM_VIDEOTECH} from '../../../redux/types/tabTypes';
import VideothequeHelper from '../../../apis/helpers/videotheque_helper';
import Toast from 'react-native-toast-native';
import statusBarHeight from '../../../configs/screen';
import pathologieHelper from '../../../apis/helpers/pathologie_helper';
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


class ListeVideoBycolonneLeftRight extends Component {
    swiper = []

    constructor(props) {
        super(props)
        this.state = {
            activeMenu: 1,
            selectedType: "",
            activeContent: "listing",
            popToTop:this.props.popToTop,
            changeStateHereOrGoback:false,
            titrepo:"",

            UserProgramByZone:[],

        }
    }




    getUserProgramByColumngauchedroite  = async (idzone,idtest) => {
        this.setState({refreshing: true});
        const UserProgramByZone = await VideothequeHelper.getUserProgramByColumngauchedroite(this.props.userToken,idzone,idtest);
        console.warn(UserProgramByZone);
        if (UserProgramByZone.success === true) {
            console.warn('mitohy programmes zone',UserProgramByZone)
           this.setState({UserProgramByZone:UserProgramByZone.data});
            this.setState({refreshing: false});
        }
    }

    getUserProgramBysquelettepory= async (idzone,idtest) => {
        this.setState({refreshing: true});
        const UserProgramByZone = await VideothequeHelper.getUserProgramBysquelettepo(this.props.userToken,idzone,idtest);
        console.warn(UserProgramByZone);
        if (UserProgramByZone.success === true) {
            console.warn('mitohy programmes zone',UserProgramByZone)
            this.setState({UserProgramByZone:UserProgramByZone.data});
            this.setState({refreshing: false});
        }
    }

   async componentDidMount() {
        this.setState({refreshing:true});
        //activeContent === "listing"
        //nomZone
        const getNameMembreOfSquelette = await pathologieHelper.getNameMembreOfSquelette(this.props.userToken,this.props.paramsmamobilite.zonetestid);
        if (getNameMembreOfSquelette) {
            console.warn(getNameMembreOfSquelette.data.name);
            this.setState({titrepo: getNameMembreOfSquelette.data.name});
        }


            if( this.props.paramsmamobilite !== null){
                if(this.props.paramsmamobilite.depuissquelette === false){
                    this.setState({activeContent:'listing'});
                    this.getUserProgramByColumngauchedroite( this.props.paramsmamobilite.zonetestid, this.props.paramsmamobilite.idprogramme).then(()=>{
                        this.setState({refreshing:false});
                    })
                }else{
                    this.setState({activeContent:'listing'});
                    this.getUserProgramBysquelettepory( this.props.paramsmamobilite.zonetestid, this.props.paramsmamobilite.idprogramme).then(()=>{
                        this.setState({refreshing:false});
                    })
                }
            }else{
                this.setState({refreshing:false});
            }

    }





    render() {
        if(this.props.popToTop === 'train'){
            this.props.navigation.popToTop();
            const setPopToTop = { type: SET_POP_TO_TOP, value: '' }
            this.props.dispatch(setPopToTop);
        }


        return (
            <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }} colors={[colors.balck, colors.green, colors.balck]} style={[baseStyles.linearGradient,{marginLeft:-screenWidth*0.01}]}>
                <View style={{ alignItems :"center",justifyContent:"center",width:"100%",marginTop:15 ,marginBottom:15 }}>
                    <TouchableOpacity
                        onPress={() => {
                            console.warn('this.props.setforretourtrain',this.props.setforretourtrain)
                            if(this.props.setforretourtrain === 0){
                                const setActiveTab = {type: SET_ACTIVE_TAB, value: "colonneleftright"};
                                this.props.dispatch(setActiveTab);
                                this.props.navigation.navigate('LogedinNavigator');
                            }else if(this.props.setforretourtrain === 1){

                                const setActiveTab = {type: SET_ACTIVE_TAB, value: "tensionvideo"};
                                this.props.dispatch(setActiveTab);
                                this.props.navigation.navigate('LogedinNavigator');
                            }else if(this.props.setforretourtrain === 2){
                                const setActiveTab = {type: SET_ACTIVE_TAB, value: "Mamobilite"};
                                this.props.dispatch(setActiveTab);
                                this.props.navigation.navigate('LogedinNavigator');
                            } else{
                            if(this.props.navigation.goBack()){}
                                else {
                                const setActiveTab = {type: SET_ACTIVE_TAB, value: "Mamobilite"};
                                this.props.dispatch(setActiveTab);
                                this.props.navigation.navigate('LogedinNavigator');
                              }
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
                    <TouchableOpacity onPress={async ()=>{
                        // await this.setState({ selectedType: "" })
                        // await this.setState({ activeContent: "choice" })
                        const setSelectedZone = { type: SET_ZONE, value: {id:0,text:"Ajouter un exercice"}}
                        this.props.dispatch(setSelectedZone)
                        this.props.navigation.goBack()
                    }}>
                    <Text style={[baseStyles.titleText,{textAlign:"center"}]}>
                        {this.props.paramsmamobilite !== null && this.props.paramsmamobilite.depuissquelette === false && this.props.paramsmamobilite.nomZone}
                        {this.props.paramsmamobilite !== null && this.props.paramsmamobilite.depuissquelette === true && this.state.titrepo}
                    </Text>
                    </TouchableOpacity>
                </View>
                <ScrollView
                    ref='_scrollView'
                    keyboardShouldPersistTaps={'always'}
                    // onScroll={({ nativeEvent }) =>  {
                    //     if (isCloseToBottom(nativeEvent)) {
                    //     //detect si tobottom
                    //         let page = this.state.page +1;
                    //         //ts maints mande io satria efa nahazo id sy page zareo
                    //         if(this.state.id_user_program !== null){
                    //             this.getUserProgramByID( this.state.id_user_program ,page).then(()=>{
                    //                 this.setState({page:page})
                    //                 this.refs._scrollView.scrollTo({x:5,y:5,animated:true});
                    //                 Toast.show('Page : '+page, Toast.SHORT, Toast.TOP,style);
                    //
                    //             })
                    //         }
                    //
                    //         console.warn('bob')
                    //      }}}
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
                                }
                            }
                            tintColor={Platform.OS==='ios'?colors.white:colors.green}
                            colors={[Platform.OS==='ios'?colors.white:colors.green]}
                        />
                    }
                >


                    {this.state.activeContent === "listing" ?
                        <View style={{ alignItems: "center", width: screenWidth,marginBottom:screenHeight*0.05 }}>
                            {
                                // this.props.listExercice.map((value, index) => {
                                this.state.UserProgramByZone.length>0 &&
                                this.state.UserProgramByZone.map((value, index) => {
                                    return (
                                        <TouchableOpacity key={"ExItemk" + index}
                                                           style={{flexDirection:'row',alignItems:'center',
                                                               borderBottomColor: colors.white + "A5",
                                                               borderBottomWidth: 0.4,
                                                               paddingVertical:7
                                                           }}
                                            onPress={() => {
                                                const setparamsingleexo = { type: SET_PARAM_VIDEOTECH, value: {id:value.id,exercice:this.props.paramsmamobilite !== null && this.props.paramsmamobilite.nomZone} }
                                                this.props.dispatch(setparamsingleexo);
                                                console.warn('la params',setparamsingleexo)
                                                // this.props.navigation.navigate("SingleExercice")
                                                const setActiveTab = { type: SET_ACTIVE_TAB, value: "SingleExercice"};
                                                this.props.dispatch(setActiveTab);
                                                this.props.navigation.navigate('LogedinNavigator');
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
    const { selectedZone, popToTop,userToken,paramsmamobilite,setforretourtrain } = state.statedata
    return { selectedZone, popToTop,userToken,paramsmamobilite,setforretourtrain }
};

export default connect(mapStateToProps)(ListeVideoBycolonneLeftRight);
