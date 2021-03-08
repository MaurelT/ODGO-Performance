import React, { Component } from 'react'
import {
    ScrollView,
    View,
    Text,
    Image,
    TouchableOpacity,
    Dimensions,
    StatusBar,
    Modal,
    TextInput,
    KeyboardAvoidingView, RefreshControl,
    Alert, Platform,
    // Slider
} from 'react-native';
import { connect } from 'react-redux';
import baseStyles from '../../../base/BaseStyles';
import styles from '../AddBlessure/styles';
import colors from '../../../configs/colors';
import LinearGradient from 'react-native-linear-gradient';
import ZonePicker from '../../../components/ZonePicker/ZonePicker';
import MAAButton from '../../../components/MAAButton/MAAButton';
import AutoHeightImage from 'react-native-auto-height-image';
import {
    SET_ACTIVE_FP, SET_ACTIVE_LIST_PATHO,
    SET_ACTIVE_MENUPATHO,
    SET_ACTIVE_TAB, SET_ACTIVE_TABMENU_MYENERGY, SET_PARAMS_MAMOBILITE,
    SET_POP_TO_TOP,
    SET_ZONE,
} from '../../../redux/types/tabTypes';
import SqueletteDevantBlanc from '../AddBlessure/SqueletteDevantBlanc';
import SqueletteDerriereBlanc from '../AddBlessure/SqueletteDerriereBlanc';
import Swiper from "react-native-swiper";
import tensionHelper from '../../../apis/helpers/tension_helper';
import {getTensionPathologie} from '../../../apis/FonctionRedondant';
import statusBarHeight from '../../../configs/screen';
import {Slider} from 'react-native-elements';
import VideothequeHelper from '../../../apis/helpers/videotheque_helper';

const screen = Dimensions.get("window");
const SBHelight = statusBarHeight;
const screenWidth = screen.width
const screenHeight = screen.height - SBHelight;





const renderPagination = (index, total, context) => {
    return (
      <View style={{
          position: 'absolute',
            top: 0,
          alignSelf:'center'
      }}>
            {/*<Text style={{ color: 'grey' }}>*/}
            {/*    <Text style={{ color: 'white',*/}
            {/*        fontSize: 20}}>{index + 1}</Text>/{total}*/}
            {/*</Text>*/}
            <View style={{flexDirection:'row'}}>
                <View style={{width:15,height:5,borderRadius:3,backgroundColor:index === 0 ? '#F44130' :'gray',marginRight:4}}/>
                <View style={{width:15,height:5,borderRadius:3,backgroundColor:index === total-1 ? '#F44130' :'gray'}}/>
            </View>
        </View>
    )
};
class Videothequesquelette extends Component {
    constructor(props) {
        super(props)
        this.scrollview = React.createRef();
        this.scrollview1 = React.createRef();
        this.state = {
            activeMenu: 2,
            selectedZone: null,
            zonePicker: false,
            pathologie_text: "Traumatismes",
            autre_text: "Xxxxx",
            date_text: "07/06/2019",
            operation: false,
            indispo_time: "2 semaines",
            popToTop:this.props.popToTop,
            activeTabMenu:1,
            refreshing:false,
            nomzoneonetension:"Sélectionnez une zone",
            idzoneviaprops:0,
            Showchoice:false,
            programtypes:[],
            membres:[],

        }
    }

    _selectedId = (id,nom,state) =>{ //sert à rien puisque c'est tension
        const setSelectedZone = { type: SET_ZONE, value: {id:id,text:nom,state:state} };
        this.props.dispatch(setSelectedZone)

  this.setState({ Showchoice: true })

    };

    componentDidMount() {
        const setActiveFPAction = { type: SET_ACTIVE_FP, value: null }
        this.props.dispatch(setActiveFPAction)

        const setSelectedZone = { type: SET_ZONE, value: {id:0,text:"Sélectionner une zone",state:true} }
        this.props.dispatch(setSelectedZone)

        this.setAtivaListPathoToTension()
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
            console.warn(programme)
            this.setState({ programtypes: programme.data })
            this.setState({ refreshing: false })
        }
    }

    setAtivaListPathoToTension = (pathologietension) => {
        const setActiveListPatho = { type: SET_ACTIVE_LIST_PATHO, value: pathologietension }
        this.props.dispatch(setActiveListPatho)
    };

    entete(){
        return(
            <View >


                <View style={{ alignItems :"center",justifyContent:"center",width:screenWidth,marginTop:15 ,marginBottom:15 }}>
                    <TouchableOpacity
                        onPress={() => {

                               if(this.props.navigation.goBack()){}
                               else{
                                   const setActiveTab = { type: SET_ACTIVE_TAB, value: "home" }
                                   this.props.dispatch(setActiveTab);
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
                    <Text style={[baseStyles.titleText,{textAlign:"center",left:-screenWidth*0.012}]}>
                        { this.state.nomzoneonetension }
                    </Text>
                    {/*<Text style={[baseStyles.titleText,{textAlign:"center"}]}>*/}
                    {/*    {  this.props.selectedZone.text }*/}
                    {/*</Text>*/}
                </View>
            </View>
        )
    }






    render() {
        if(this.props.popToTop === 'train'){
            this.props.navigation.popToTop();
            const setPopToTop = { type: SET_POP_TO_TOP, value: '' }
            this.props.dispatch(setPopToTop);
        }
        return (
            <View style={{flex:1}}>
                    <Swiper
                        renderPagination={renderPagination}
                        loop={false}
                        showsButtons={false}
                        onMomentumScrollEnd ={()=>{
                            const setSelectedZone = { type: SET_ZONE, value: {id:0,text:"Ajouter une tension",state:true} }
                            this.props.dispatch(setSelectedZone)
                        }}
                    >
                        <ScrollView
                            ref={(el) => {this.scrollview = el;}}
                            refreshControl={
                                <RefreshControl
                                    refreshing={this.state.refreshing}
                                    onRefresh={() => {
                                        this.setState({ refreshing: true });
                                        setTimeout(() => {
                                            this.setState({ refreshing: false })
                                        }, 1000)

                                    }}
                                    tintColor={Platform.OS==='ios'?colors.white:colors.green}
                                    colors={[Platform.OS==='ios'?colors.white:colors.green]}
                                />
                            }
                        >
                            <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }} colors={[colors.balck, colors.green, colors.balck]} style={[baseStyles.linearGradient,{paddingBottom:40,paddingLeft:screenWidth*0.01}]}>
                                {this.entete()}
                                <SqueletteDevantBlanc _selectedId={this._selectedId}/>
                            </LinearGradient>
                        </ScrollView>
                        <ScrollView
                            ref={(el) => {this.scrollview1 = el;}}
                            refreshControl={
                                <RefreshControl
                                    refreshing={this.state.refreshing}
                                    onRefresh={() => {
                                        this.setState({ refreshing: true })
                                        setTimeout(() => {
                                            // this.getpathologieblessure(this.props.userToken,this.props.selectedZone.id)
                                            this.setState({ refreshing: false })
                                        }, 1000)

                                    }}
                                    tintColor={Platform.OS==='ios'?colors.white:colors.green}
                                    colors={[Platform.OS==='ios'?colors.white:colors.green]}
                                />
                            }
                        >
                        <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }} colors={[colors.balck, colors.green, colors.balck]} style={[baseStyles.linearGradient,{paddingBottom:40,paddingLeft:screenWidth*0.04}]}>
                            {this.entete()}
                            <SqueletteDerriereBlanc  _selectedId={this._selectedId}/>
                        </LinearGradient>
                        </ScrollView>
                    </Swiper>

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
                        backgroundColor: "rgba(0,0,0,0.65)",
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
                    <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }} colors={[colors.balck, colors.green, colors.balck]}   style={{width:screenWidth-20,height:350,alignSelf:'center',marginTop:(screenHeight/2)-170,alignItems:'center',justifyContent:'center'}}>

                        {this.state.programtypes.length >0 && this.state.programtypes.map((item,index)=>{
                            if(index<3){
                                return  <TouchableOpacity
                                    key={"ind"+index} onPress={()=>{
                                       console.warn("selec id", this.props.selectedZone.id)
                                    let membreid = 0;
                                    let membrename = "name" // amboarina
                                    let membres = this.state.membres;
                                    if(this.state.membres.length>=4){
                                        switch(this.props.selectedZone.id){
                                            case 1://tete
                                                membreid=membres[0].id;
                                                membrename=membres[0].name;
                                                break;
                                            case 2://cou
                                                membreid=membres[0].id;
                                                membrename=membres[0].name;
                                                break;
                                            case 11://epaule
                                                membreid=membres[0].id;
                                                membrename=membres[0].name;
                                                break;
                                            case 3://poitrine
                                                membreid=membres[0].id;
                                                membrename=membres[0].name;
                                                break;
                                            case 5://epaule
                                                membreid=membres[0].id;
                                                membrename=membres[0].name;
                                                break;
                                                //afara
                                            case 17://tete
                                                membreid=membres[0].id;
                                                membrename=membres[0].name;
                                                break;
                                            case 18://cou
                                                membreid=membres[0].id;
                                                membrename=membres[0].name;
                                                break;
                                            case 20://epaule
                                                membreid=membres[0].id;
                                                membrename=membres[0].name;
                                                break;
                                            case 19://dos
                                                membreid=membres[0].id;
                                                membrename=membres[0].name;
                                                break;
//chaine
                                            case 12://bras
                                                membreid=membres[3].id; //3 chaine musculaire
                                                membrename=membres[3].name;
                                                break;

                                            case 6://bras
                                                membreid=membres[3].id;
                                                membrename=membres[3].name;
                                                break;
                                            case 13://main
                                                membreid=membres[3].id;
                                                membrename=membres[3].name;
                                                break;
                                            case 7://main
                                                membreid=membres[3].id;
                                                membrename=membres[3].name;
                                                break;
//chaine musc
                                            case 28://bras
                                                membreid=membres[3].id;
                                                membrename=membres[3].name;
                                                break;
                                            case 29://main
                                                membreid=membres[3].id;
                                                membrename=membres[3].name;
                                                break;
                                            case 21://main
                                                membreid=membres[3].id;
                                                membrename=membres[3].name;
                                                break;
                                            case 23://main
                                                membreid=membres[3].id;
                                                membrename=membres[3].name;
                                                break;
                                                //hanche
                                            case 4://hanche
                                                membreid=membres[1].id;
                                                membrename=membres[1].name;
                                                break;
                                            case 14://hanche
                                                membreid=membres[1].id;
                                                membrename=membres[1].name;
                                                break;
                                            case 8://hanche
                                                membreid=membres[1].id;
                                                membrename=membres[1].name;
                                                break;
                                                //hanche
                                            case 22://hanche
                                                membreid=membres[1].id;
                                                membrename=membres[1].name;
                                                break;
                                            case 30://hanche
                                                membreid=membres[1].id;
                                                membrename=membres[1].name;
                                                break;
                                            case 24://hanche
                                                membreid=membres[1].id;
                                                membrename=membres[1].name;
                                                break;
                                            //cheville
                                            case 15://chevill
                                                membreid=membres[2].id;
                                                membrename=membres[2].name;
                                                break;
                                            case 16://chevill
                                                membreid=membres[2].id;
                                                membrename=membres[2].name;
                                                break;
                                            case 9://chevill
                                                membreid=membres[2].id;
                                                membrename=membres[2].name;
                                                break;
                                            case 10://chevill
                                                membreid=membres[2].id;
                                                membrename=membres[2].name;
                                                break;
                                                //cheville
                                            case 31://chevill
                                                membreid=membres[2].id;
                                                membrename=membres[2].name;
                                                break;
                                            case 32://chevill
                                                membreid=membres[2].id;
                                                membrename=membres[2].name;
                                                break;
                                            case 25://chevill
                                                membreid=membres[2].id;
                                                membrename=membres[2].name;
                                                break;
                                            case 26://chevill
                                                membreid=membres[2].id;
                                                membrename=membres[2].name;
                                                break;

                                        }
                                    }


                                     // amboarina
                                    // const setparam = { type: SET_PARAMS_MAMOBILITE, value: {zonetestid:membreid,idprogramme:item.id,nomZone:item.name,depuissquelette:true} };
                                    const setparam = { type: SET_PARAMS_MAMOBILITE, value: {zonetestid:this.props.selectedZone.id,idprogramme:item.id,nomZone:item.name,depuissquelette:true} };
                                    this.props.dispatch(setparam);
                                        console.warn('setparam',setparam)
                                    if( this.props.navigation.navigate("ListeVideoByColonneLeftRight",{zonetestid:membreid,idprogramme:item.id,nomZone:item.name})){}
                                    else if(this.props.navigation.navigate("ListeLeftRightDash",{zonetestid:membreid,idprogramme:item.id,nomZone:item.name})){}
                                    else{

                                        const setActiveTab = { type: SET_ACTIVE_TAB, value: "ListeLeftRightFoot" };
                                        this.props.dispatch(setActiveTab);
                                        this.props.navigation.navigate('LogedinNavigator');
                                    }
                                    this.setState({Showchoice:false})

                                }}>
                                    <View style={{borderWidth: 1,
                                        borderColor: colors.white,
                                        borderRadius: 5,
                                        flexDirection: "row",
                                        padding: 30,
                                        alignItems: "center",
                                        justifyContent: "space-between",
                                        width: (screenWidth - 80),
                                        marginTop: 15,
                                        marginBottom: 15}}>
                                        <Text style={{color:'white'}} >{item.name}</Text>
                                        <AutoHeightImage
                                            width={screenWidth*0.03}
                                            source={require("../../../assets/icons/arrow-white.png")} />
                                    </View>
                                </TouchableOpacity>} else {
                                return null
                            }
                        }
                        )}
                </LinearGradient>
                </Modal>
            </View>
        )
    }
}


const mapStateToProps = (state) => {
    const { selectedZone,popToTop,userToken,pathologieonetension,idzone,itemid,notshowvalider, } = state.statedata
    return { selectedZone,popToTop,userToken,pathologieonetension,idzone,itemid,notshowvalider}
};

export default connect(mapStateToProps)(Videothequesquelette);
