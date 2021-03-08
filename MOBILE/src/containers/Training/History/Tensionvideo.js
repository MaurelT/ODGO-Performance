import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    ScrollView,
    View,
    Text,
    TouchableOpacity,
    Dimensions,
    StatusBar,
    Platform,
    StyleSheet, Modal, RefreshControl
} from 'react-native';
import baseStyles from '../../../base/BaseStyles';
import styles from './styles';
import colors from '../../../configs/colors';
import LinearGradient from 'react-native-linear-gradient';
import HalfRed from '../../../components/HalfRed/HalfRed';
import AutoHeightImage from 'react-native-auto-height-image';
import MAAButton from '../../../components/MAAButton/MAAButton';
import {
    SET_ACTIVE_FP,
    SET_ACTIVE_LIST_PATHO,
    SET_ACTIVE_TAB,
    SET_POP_TO_TOP,
    SET_ZONE,
    SET_ID_ITEM,
    SET_ID_ZONE, SET_ACTIVE_TABMENU_CARNET,
    SET_ACTIVE_MENUPATHO, SET_PARAMS_MAMOBILITE,

} from '../../../redux/types/tabTypes';
import tensions from '../../../redux/actions/listTension';
import TrainHelper from '../../../apis/helpers/train_helper';
import PathologieHelper from '../../../apis/helpers/pathologie_helper';
import PathologieHelperTension from '../../../apis/helpers/tension_helper';
import AsyncStorage from "@react-native-community/async-storage";
import {getTensionPathologie, getonetension, getBlessurePathologie} from '../../../apis/FonctionRedondant';
import statusBarHeight from '../../../configs/screen';
import Slidebottom from '../../../components/selectslidebottom/Slidebottom';
import ScrollPicker from 'react-native-wheel-scroll-picker';
import VideothequeHelper from '../../../apis/helpers/videotheque_helper';


const screen = Dimensions.get("window")
const SBHelight = statusBarHeight
const screenWidth = screen.width
const screenHeight = screen.height - SBHelight

class Tensionvideo extends Component {
    constructor(props) {
        super(props)
        this.anneeDebut = 1998;
        this.anneeDebutboocle = 1970;
        this.selectedAnnee = new Date().getFullYear();
        this.anneeFin = 2060;

        this.state = {
            showCalendar:false,
            arrayAnnee:[],
            selectedAnnee:this.selectedAnnee,
            refreshing:false,
            pathologietension:[],
            popToTop:this.props.popToTop,
            selectedIndex:new Date().getFullYear() - this.anneeDebutboocle,

            Showchoice:false,
            programtypes:[],
            membres:[],
            zone_id:0,
        };
    }


    async componentDidMount() {
        const setActiveFPAction = { type: SET_ACTIVE_FP, value: null }
        this.props.dispatch(setActiveFPAction)
        this.setState({refreshing:true})
        getTensionPathologie(PathologieHelperTension,this.props,this.selectedAnnee).then((refreshingfalse)=>{
            this.setState({refreshing:refreshingfalse})
        });
        for(let i = this.anneeDebutboocle; i< this.anneeFin; i++)
        {
            this.state.arrayAnnee.push(i);
        }
        this.getProgrammetypes()
        this.getMembres()
    }


    async getMembres(){
        this.setState({ refreshing: true });
        const membres = await VideothequeHelper.getMembres(this.props.userToken)
        if(membres){
            this.setState({ membres: membres.data.zones })
            this.setState({ refreshing: false })
        }
    }

    async getProgrammetypes(){
        this.setState({ refreshing: true });
        const programme = await VideothequeHelper.getProgrammetypes(this.props.userToken)
        if(programme){
            this.setState({ programtypes: programme.data })
            this.setState({ refreshing: false })
        }
    }


    SortTime(a,b){
        let  da=new Date(a.date);
        let   db=new Date(b.date);
        return (da<db)?1:-1;
    }

    render() {





        if(this.props.popToTop === 'train'){
            this.props.navigation.popToTop();
            const setPopToTop = { type: SET_POP_TO_TOP, value: '' }
            this.props.dispatch(setPopToTop);
        }

        this.pathologietension =[];


        if(this.props.pathologietension.length > 0 ){
            this.pathologietension = this.props.pathologietension.sort(this.SortTime);
        }

        return (

            <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }} colors={[colors.balck, colors.green, colors.balck]} style={[{flex:1, alignItems:"center"}]}>
                <ScrollView
                    style={[styles.scrollView, {}]}
                    contentContainerStyle={[styles.contentContainerStyle,{alignItems:'center'}]}
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.refreshing}
                            onRefresh={() => {
                                getTensionPathologie(PathologieHelperTension,this.props,this.state.selectedAnnee)
                            }}
                            tintColor={Platform.OS==='ios'?colors.white:colors.green}
                            colors={[Platform.OS==='ios'?colors.white:colors.green]}
                        />
                    }
                >
                    <View style={{ alignItems :"center",justifyContent:"center",width:"100%",marginTop:0  }}>
                        <TouchableOpacity
                            onPress={() => {

                                   if(this.props.navigation.goBack()){}
                                   else{
                                       const setActiveTab = { type: SET_ACTIVE_TAB, value: "train" }
                                       this.props.dispatch(setActiveTab);
                                   }


                            }}
                            style={{width:50,position:"absolute",left:0}}
                        >
                            <AutoHeightImage
                                width={18}
                                source={require('../../../assets/icons/left.arrow.white.png')}
                                style={{marginLeft:5}}
                            />
                        </TouchableOpacity>
                        <Text style={[baseStyles.titleText]}>Tensions</Text>
                    </View>

                    <TouchableOpacity
                        onPress={()=>{
                            this.setState({showCalendar:true});
                            //console.warn(this.state.arrayAnnee)
                            }
                        }
                    >
                        <View style={{flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "center",
                            width: screenWidth / 2,
                            marginTop:20,
                            paddingBottom: 5}}>
                            <View>
                                <AutoHeightImage
                                    width={18}
                                    source={require("../../../assets/icons/left.arrow.white.png")} />
                            </View>
                            <View>
                                <Text style={[baseStyles.textColorWhite,{marginLeft:7}]}>{this.state.selectedAnnee}</Text>
                            </View>
                            <View>
                                <Text style={{ color: "#00000000",opacity:0 }}>.</Text>
                            </View>
                        </View>

                    </TouchableOpacity>

                    {
                        this.pathologietension.map((item, index) => {
                            if( item.zone !== undefined){
                                return <HalfRed key={("A_" + index)} redText={
                                    "" + item.date.substring(8, 10) + "/" +
                                    item.date.substring(5, 7) + "/" +
                                    item.date.substring(0, 4)
                                } blackText={ 'Tension: ' + item.zone.name }
                                                onPress={() => {
                                                    this.setState({refreshing:false});
                                                    this.setState({zone_id:item.zone_id});
                                                    this.setState({Showchoice:true});
                                                }} />
                            }
                        })
                    }

                </ScrollView>
                <Modal
                    visible={this.state.Showchoice}
                    transparent={true}
                    onRequestClose={() => {
                        this.setState({ zonePicker: false })
                    }}
                ><TouchableOpacity
                    onPress={() => {
                        this.setState({ Showchoice: false })
                    }}
                    style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: screenWidth,
                        height: screenHeight,
                        zIndex: 0,
                        backgroundColor: "rgba(0,0,0,0.65)"
                    }}
                >
                </TouchableOpacity>
                    {/*<TouchableOpacity onPress={()=>{*/}
                    {/*    this.setState({Showchoice:false})*/}
                    {/*}}>*/}
                    {/*    <View style={{*/}
                    {/*        marginTop: 8,marginRight:22}}>*/}
                    {/*        <Text style={{color:colors.red,fontSize:33,alignSelf:'flex-end'}} >X</Text>*/}
                    {/*    </View>*/}
                    {/*</TouchableOpacity>*/}
                    <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }} colors={[colors.balck, colors.green, colors.balck]}   style={{width:screenWidth-20,height:250,alignSelf:'center',marginTop:(screenHeight/2)-150,borderWidth:2,alignItems:'center',justifyContent:'center'}}>
                        {this.state.programtypes.length >0 && this.state.programtypes.map((item,index)=>{
                                if(index<3) {
                                    if (index !== 1) {
                                        return <TouchableOpacity
                                            key={"ind" + index} onPress={() => {
                                            let membreid = 0;
                                            let membrename = "name" // amboarina
                                            let membres = this.state.membres;
                                            console.warn('membre',membres)
                                            if (this.state.membres.length >= 4) {
                                                switch (this.state.zone_id) {
                                                    case 1://tete
                                                        membreid = membres[0].id;
                                                        membrename = membres[0].name;
                                                        break;
                                                    case 2://cou
                                                        membreid = membres[0].id;
                                                        membrename = membres[0].name;
                                                        break;
                                                    case 11://epaule
                                                        membreid = membres[0].id;
                                                        membrename = membres[0].name;
                                                        break;
                                                    case 3://poitrine
                                                        membreid = membres[0].id;
                                                        membrename = membres[0].name;
                                                        break;
                                                    case 5://epaule
                                                        membreid = membres[0].id;
                                                        membrename = membres[0].name;
                                                        break;
                                                    //afara
                                                    case 17://tete
                                                        membreid = membres[0].id;
                                                        membrename = membres[0].name;
                                                        break;
                                                    case 18://cou
                                                        membreid = membres[0].id;
                                                        membrename = membres[0].name;
                                                        break;
                                                    case 20://epaule
                                                        membreid = membres[0].id;
                                                        membrename = membres[0].name;
                                                        break;
                                                    case 19://dos
                                                        membreid = membres[0].id;
                                                        membrename = membres[0].name;
                                                        break;
//chaine
                                                    case 12://bras
                                                        membreid = membres[3].id; //3 chaine musculaire
                                                        membrename = membres[3].name;
                                                        break;

                                                    case 6://bras
                                                        membreid = membres[3].id;
                                                        membrename = membres[3].name;
                                                        break;
                                                    case 13://main
                                                        membreid = membres[3].id;
                                                        membrename = membres[3].name;
                                                        break;
                                                    case 7://main
                                                        membreid = membres[3].id;
                                                        membrename = membres[3].name;
                                                        break;
//chaine musc
                                                    case 28://bras
                                                        membreid = membres[3].id;
                                                        membrename = membres[3].name;
                                                        break;
                                                    case 29://main
                                                        membreid = membres[3].id;
                                                        membrename = membres[3].name;
                                                        break;
                                                    case 21://main
                                                        membreid = membres[3].id;
                                                        membrename = membres[3].name;
                                                        break;
                                                    case 23://main
                                                        membreid = membres[3].id;
                                                        membrename = membres[3].name;
                                                        break;
                                                    //hanche
                                                    case 4://hanche
                                                        membreid = membres[1].id;
                                                        membrename = membres[1].name;
                                                        break;
                                                    case 14://hanche
                                                        membreid = membres[1].id;
                                                        membrename = membres[1].name;
                                                        break;
                                                    case 8://hanche
                                                        membreid = membres[1].id;
                                                        membrename = membres[1].name;
                                                        break;
                                                    //hanche
                                                    case 22://hanche
                                                        membreid = membres[1].id;
                                                        membrename = membres[1].name;
                                                        break;
                                                    case 30://hanche
                                                        membreid = membres[1].id;
                                                        membrename = membres[1].name;
                                                        break;
                                                    case 24://hanche
                                                        membreid = membres[1].id;
                                                        membrename = membres[1].name;
                                                        break;
                                                    //cheville
                                                    case 15://chevill
                                                        membreid = membres[2].id;
                                                        membrename = membres[2].name;
                                                        break;
                                                    case 16://chevill
                                                        membreid = membres[2].id;
                                                        membrename = membres[2].name;
                                                        break;
                                                    case 9://chevill
                                                        membreid = membres[2].id;
                                                        membrename = membres[2].name;
                                                        break;
                                                    case 10://chevill
                                                        membreid = membres[2].id;
                                                        membrename = membres[2].name;
                                                        break;
                                                    //cheville
                                                    case 31://chevill
                                                        membreid = membres[2].id;
                                                        membrename = membres[2].name;
                                                        break;
                                                    case 32://chevill
                                                        membreid = membres[2].id;
                                                        membrename = membres[2].name;
                                                        break;
                                                    case 25://chevill
                                                        membreid = membres[2].id;
                                                        membrename = membres[2].name;
                                                        break;
                                                    case 26://chevill
                                                        membreid = membres[2].id;
                                                        membrename = membres[2].name;
                                                        break;
                                                }
                                            }
                                            const setparam = { type: SET_PARAMS_MAMOBILITE, value: {zonetestid:this.state.zone_id,idprogramme:item.id,nomZone:item.name,depuissquelette:true} };
                                            this.props.dispatch(setparam);
                                            console.warn('setparam',setparam)

                                            // amboarina
                                            if( this.props.navigation.navigate("ListeVideoByColonneLeftRight", {
                                                zonetestid: membreid,
                                                idprogramme: item.id,
                                                nomZone: item.name,
                                                // idmembrepournom:this.state.zone_id
                                            })){}
                                            else if(
                                                this.props.navigation.navigate("ListeLeftRightDash", {
                                                    zonetestid: membreid,
                                                    idprogramme: item.id,
                                                    nomZone: item.name,
                                                    // idmembrepournom:this.state.zone_id

                                                }) ){  } else{
                                                    const setActiveTab = { type: SET_ACTIVE_TAB, value: "ListeLeftRightFoot" };
                                                    this.props.dispatch(setActiveTab);
                                                    this.props.navigation.navigate('LogedinNavigator');
                                                                                          }
                                            this.setState({Showchoice: false})
                                        }}>
                                            <View style={{
                                                borderWidth: 1,
                                                borderColor: colors.white,
                                                borderRadius: 5,
                                                flexDirection: "row",
                                                padding: 30,
                                                alignItems: "center",
                                                justifyContent: "space-between",
                                                width: (screenWidth - 80),
                                                marginTop: 15,
                                                marginBottom: 15
                                            }}>
                                                <Text style={{color: 'white'}}>{item.name}</Text>
                                                <AutoHeightImage
                                                    width={screenWidth * 0.03}
                                                    source={require("../../../assets/icons/arrow-white.png")}/>
                                            </View>
                                        </TouchableOpacity>
                                    }
                                }else {
                                    return null
                                }
                            }
                        )}
                    </LinearGradient>
                </Modal>
                <Modal
                    visible={this.state.showCalendar}
                    animationType={"slide"}
                    onRequestClose={() => {
                        this.setState({showCalendar:false})
                    }
                    }
                    transparent={true}
                >
                    <TouchableOpacity
                        onPress={() => {
                            this.setState({showCalendar:false})
                        }}
                        style={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            width: screenWidth,
                            height: screenHeight,
                            zIndex: 0
                        }}
                    >
                    </TouchableOpacity>
                    <View style={{justifyContent:'flex-end',alignItems:'center',top:screenHeight-(30 + screenWidth*0.5)}}>
                        <View style={{
                            height: 33,width: screenWidth,
                            backgroundColor: '#FF3A28',
                            bottom: 0
                        }}>
                            <View
                                style={{flexDirection:'row',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    paddingTop:7,
                                    paddingHorizontal:20,
                                }}>
                                <TouchableOpacity
                                    onPress={ async ()=>{
                                        await  this.setState({showCalendar:false})
                                    }}
                                >
                                    <Text style={{color:'white'}}></Text>
                                </TouchableOpacity>
                                <Text style={{color:'white'}}></Text>
                                <TouchableOpacity
                                    onPress={async () => {
                                        this.setState({ showCalendar: false })
                                    }}
                                >
                                    <Text style={{color:'white'}}>Ok</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={{width: screenWidth,
                            alignItems:'center',
                            height: screenWidth*0.5,
                            backgroundColor: '#E6E6E6',
                            // top: (phoneType === "iphoneX")?( (screenHeight*0.685) + 60) : (-screenHeight*0.685)
                            top: screenHeight*0.00
                        }}>
                            <View style={{width: screenWidth/2,
                                height: screenWidth*0.5,
                                backgroundColor: '#E6E6E6',
                                top: screenHeight*0.00,
                            }}>
                                <ScrollPicker
                                    dataSource={this.state.arrayAnnee}
                                    selectedIndex={this.state.selectedIndex}
                                    renderItem={(data, index, isSelected) => {
                                    }}
                                    onValueChange={(item, index) => {
                                        getBlessurePathologie(PathologieHelper,this.props,item);
                                        getTensionPathologie(PathologieHelperTension,this.props,item);
                                        this.setState({pathologieblessure:this.props.pathologieblessure, selectedAnnee:item})
                                        this.setState({pathologietension:this.props.pathologietension, selectedAnnee:item})
                                        this.setState({selectedAnnee:item})
                                    }}
                                    wrapperHeight={180}
                                    wrapperWidth={screenWidth-20}
                                    wrapperBackground={'#e6e6e6'}
                                    itemHeight={60}
                                    highlightColor={'#d8d8d8'}
                                    highlightBorderWidth={2}
                                    activeItemColor={'#222121'}
                                    itemColor={'#B4B4B4'}
                                />
                            </View>
                        </View>
                    </View>
                </Modal>
            </LinearGradient>
        )
    }
}

// export default Pathologie;
const mapStateToProps = (state) => {
    const { popToTop,userToken,pathologietension,activeMenupatho,droits } = state.statedata
    return { popToTop ,userToken,pathologietension,activeMenupatho,droits}
};

export default connect(mapStateToProps)(Tensionvideo);
