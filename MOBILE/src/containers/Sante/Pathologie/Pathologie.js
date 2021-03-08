import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    ScrollView,
    View,
    Text,
    TouchableOpacity,
    Dimensions,
    StatusBar,
    StyleSheet, Modal, RefreshControl
} from 'react-native';
import baseStyles from '../../../base/BaseStyles';
import styles from './styles';
import colors from '../../../configs/colors';
import LinearGradient from 'react-native-linear-gradient';
import HalfRed from '../../../components/HalfRed/HalfRed';
import HalfRedNotpressed from '../../../components/HalfRed/HalfRedNotpressed';
import AutoHeightImage from 'react-native-auto-height-image';
import MAAButton from '../../../components/MAAButton/MAAButton';
import {
    SET_ACTIVE_FP,
    SET_ACTIVE_LIST_PATHO,
    SET_ACTIVE_TAB,
    SET_POP_TO_TOP,
    SET_ZONE,
    SET_NOT_SHOW_VALIDERBLESSURE,
    SET_ID_ITEM,
    SET_ID_ZONE, SET_ACTIVE_TABMENU_CARNET,
    SET_ACTIVE_MENUPATHO

} from '../../../redux/types/tabTypes';
import blessures from '../../../redux/actions/listBlessure';
import tensions from '../../../redux/actions/listTension';
import TrainHelper from '../../../apis/helpers/train_helper';
import PathologieHelper from '../../../apis/helpers/pathologie_helper';
import PathologieHelperTension from '../../../apis/helpers/tension_helper';
import AsyncStorage from "@react-native-community/async-storage";
import { getBlessurePathologie , getTensionPathologie, getonetension} from '../../../apis/FonctionRedondant';
import statusBarHeight from '../../../configs/screen';
import Slidebottom from '../../../components/selectslidebottom/Slidebottom';
import ScrollPicker from 'react-native-wheel-scroll-picker';


const screen = Dimensions.get("window")
const SBHelight = statusBarHeight
const screenWidth = screen.width
const screenHeight = screen.height - SBHelight

class Pathologie extends Component {
    constructor(props) {
        super(props)
        this.anneeDebut = 1998;
        this.anneeDebutboocle = 1970;
        this.selectedAnnee = new Date().getFullYear();
        this.anneeFin = 2060;

        this.state = {
            activeListPatho: props.activeListPatho,
            showCalendar:false,
            arrayAnnee:[],
            selectedAnnee:this.selectedAnnee,
            refreshing:false,
            pathologieblessure:null,
            pathologietension:[],
            popToTop:this.props.popToTop,
            depuisTensionOrBlessure:0,
            selectedIndex:new Date().getFullYear() - this.anneeDebutboocle
        };
    }


    async componentDidMount() {
        const setActiveFPAction = { type: SET_ACTIVE_FP, value: null }
        this.props.dispatch(setActiveFPAction)
        // const userToken = await AsyncStorage.getItem("userToken")
        // this.setState({ userToken });
        this.setState({refreshing:true})
        //this.getBlessurePathologie(this.selectedAnnee);
        getBlessurePathologie(PathologieHelper,this.props,this.selectedAnnee).then((data)=>{
            // console.warn('path bless',pathologieblessure)
            //  this.setState({pathologieblessure:pathologieblessure})
            this.setState({refreshing:false})
        });
        getTensionPathologie(PathologieHelperTension,this.props,this.selectedAnnee).then((refreshingfalse)=>{
            //this.setState({pathologietension:pathologietension})
            this.setState({refreshing:refreshingfalse})
        });
        // this.getTensionPathologie(this.selectedAnnee);
        //  for(let i = this.anneeDebutboocle; i<this.anneeFin; i++)
        for(let i = this.anneeDebutboocle; i< this.anneeFin; i++)
        {
            this.state.arrayAnnee.push(i);
        }

    }



    setAtivaListPathoToBlessure = (pathologieblessure) => {
        const setActiveListPatho = { type: SET_ACTIVE_LIST_PATHO, value: pathologieblessure }
        this.props.dispatch(setActiveListPatho)
    };

    setAtivaListPathoToTension = (pathologietension) => {
        const setActiveListPatho = { type: SET_ACTIVE_LIST_PATHO, value: pathologietension }
        this.props.dispatch(setActiveListPatho)
    };


    SortTime(a,b){
        let  da=new Date(a.date);
        let   db=new Date(b.date);
        return (da<db)?1:-1;
    }

    render() {

        let isrestrictget_historique_blessure = false;
        if(this.props.droits.length>0){
            for(let i = 0; i < this.props.droits.length; i++){
                if(this.props.droits[i].name === "get_historique_blessure"){
                    isrestrictget_historique_blessure = this.props.droits[i].is_restrict;
                    break;
                }
            }
        }

        try{
            if(this.props.navigation.state.params.depuisTensionOrBlessure === 1 ){
                this.setState({depuisTensionOrBlessure:1})
            }
        }catch (e) {
        }

        if(this.state.depuisTensionOrBlessure === 1){
            getBlessurePathologie(PathologieHelper,this.props,this.state.selectedAnnee)
            getTensionPathologie(PathologieHelperTension,this.props,this.state.selectedAnnee)
        }

        if(this.props.popToTop === 'sante'){
            this.props.navigation.popToTop();
            const setPopToTop = { type: SET_POP_TO_TOP, value: '' }
            this.props.dispatch(setPopToTop);
        }

        this.pathologieblessure =[];//ra vita ny pathologie blessure de initialise vide iz ato tsis blem zan na aon na aon
        this.pathologietension =[];

        if (this.props.pathologieblessure !== null){
            this.pathologieblessure = this.props.pathologieblessure.sort(this.SortTime); //novaiko ity mi-sort via date
        }

        if(this.props.pathologietension.length > 0 ){
            this.pathologietension = this.props.pathologietension.sort(this.SortTime);
        }

        return (

            <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }} colors={[colors.balck, colors.green, colors.balck]} style={[{flex:1, alignItems:"center"}]}>
                <ScrollView
                    style={[styles.scrollView, {}]}
                    contentContainerStyle={[styles.contentContainerStyle]}
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.refreshing}
                            onRefresh={() => {
                                getBlessurePathologie(PathologieHelper,this.props,this.state.selectedAnnee)
                                getTensionPathologie(PathologieHelperTension,this.props,this.state.selectedAnnee)
                            }}
                        />
                    }
                >
                    <View style={{ alignItems :"center",justifyContent:"center",width:"100%",marginTop:15  }}>
                        <TouchableOpacity
                            onPress={() => {
                                if(global.is_venudedonneperso === true) {
                                    const setActive = { type: SET_ACTIVE_TABMENU_CARNET, value: 2 };
                                    this.props.dispatch(setActive);
                                    const setActiveTab = {type: SET_ACTIVE_TAB, value: "Carnet"};
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
                                source={require('../../../assets/icons/left.arrow.white.png')}
                                style={{marginLeft:5}}
                            />
                        </TouchableOpacity>
                        <Text style={[baseStyles.titleText,{left:-screenWidth*0.006}]}>Mes pathologies</Text>
                    </View>


                    <View style={[styles.headCtn,{marginTop:15}]}>

                        <TouchableOpacity
                            style={[styles.headMenu]}
                            onPress={() => {
                                const setActiveMenupatho = { type: SET_ACTIVE_MENUPATHO, value: 1 }
                                this.props.dispatch(setActiveMenupatho);
                                this.setAtivaListPathoToBlessure()
                            }}>
                            <View >
                                <Text style={[styles.menuText]}>BLESSURES</Text>
                            </View>
                            <View style={[(this.props.activeMenupatho === 1 ? styles.activeMenu : styles.inactiveMenu)]}></View>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[styles.headMenu]}
                            onPress={() => {
                                const setActiveMenupatho = { type: SET_ACTIVE_MENUPATHO, value: 2 }
                                this.props.dispatch(setActiveMenupatho);
                                this.setAtivaListPathoToTension()
                            }}>
                            <View >
                                <Text style={[styles.menuText]}>TENSIONS</Text>
                            </View>
                            <View style={[(this.props.activeMenupatho == 2 ? styles.activeMenu : styles.inactiveMenu)]}></View>
                        </TouchableOpacity>

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
                    {this.props.activeMenupatho === 1 && (
                        this.pathologieblessure.map((item, index) => {

                            if( item.zone !== undefined){
                                if(!isrestrictget_historique_blessure){
                                    return <HalfRed key={("A_" + index)} redText={
                                        "" + item.date.substring(8, 10) + "/" +
                                        item.date.substring(5, 7) + "/" +
                                        item.date.substring(0, 4)
                                    } blackText={ item.pathology.name + ' : ' + item.zone.name }
                                                    onPress={() => {
                                                        const params = {type: SET_NOT_SHOW_VALIDERBLESSURE, value: true};
                                                        this.props.dispatch(params);
                                                        const setiditem = {type: SET_ID_ITEM, value: item.id};
                                                        this.props.dispatch(setiditem);
                                                        if(global.is_venudedonneperso === true) {
                                                            const setActiveTab = {type: SET_ACTIVE_TAB, value: "AddBlessure"};
                                                            this.props.dispatch(setActiveTab);
                                                            this.props.navigation.navigate('LogedinNavigator');
                                                        }else{
                                                            if( this.props.navigation.navigate("AddBlessure")){}
                                                            else{
                                                                this.props.navigation.navigate("AddBlessureFichepedag")
                                                            }
                                                        }
                                                    }} />
                                }else{
                                    return <HalfRedNotpressed key={("A_" + index)} redText={
                                        "" + item.date.substring(8, 10) + "/" +
                                        item.date.substring(5, 7) + "/" +
                                        item.date.substring(0, 4)
                                    } blackText={ item.pathology.name + ' : ' + item.zone.name }
                                                  />
                                }

                            }
                        })
                    )}

                    {this.props.activeMenupatho === 2 && (
                        this.pathologietension.map((item, index) => {
                            if( item.zone !== undefined){
                                if(!isrestrictget_historique_blessure) {
                                    return <HalfRed key={("A_" + index)} redText={
                                        "" + item.date.substring(8, 10) + "/" +
                                        item.date.substring(5, 7) + "/" +
                                        item.date.substring(0, 4)
                                    } blackText={'Tension: ' + item.zone.name}
                                                    onPress={() => {
                                                        //ato alaiko one tension
                                                        this.setState({refreshing: true});
                                                        getonetension(PathologieHelperTension, this.props, item.id).then((idzone) => {
                                                            this.setState({refreshing: false})//ts miasa le id ato am navigate io a
                                                            const params = {
                                                                type: SET_NOT_SHOW_VALIDERBLESSURE,
                                                                value: true
                                                            };
                                                            this.props.dispatch(params);
                                                            const setiditem = {type: SET_ID_ITEM, value: item.id};
                                                            this.props.dispatch(setiditem);
                                                            const setidZONE = {type: SET_ID_ZONE, value: idzone};
                                                            this.props.dispatch(setidZONE);

                                                            if (global.is_venudedonneperso === true) {
                                                                const setActiveTab = {
                                                                    type: SET_ACTIVE_TAB, value: "AddTension"
                                                                };
                                                                this.props.dispatch(setActiveTab);
                                                                this.props.navigation.navigate('LogedinNavigator');
                                                            } else if (this.props.navigation.navigate("AddTension")) {
                                                                } else {
                                                                    this.props.navigation.navigate("AddtensionFichepedag")
                                                            }

                                                        });
                                                    }}/>
                                }else{
                                    return <HalfRedNotpressed key={("A_" + index)} redText={
                                        "" + item.date.substring(8, 10) + "/" +
                                        item.date.substring(5, 7) + "/" +
                                        item.date.substring(0, 4)
                                    } blackText={'Tension: ' + item.zone.name}
                                                  />
                                }
                            }
                        })
                    )}



                </ScrollView>
                <View style={{ marginBottom:50, marginTop:20}}>
                    {
                        this.props.activeMenupatho == 2 ?
                            <MAAButton text={"AJOUTER UNE TENSION"}
                                       height={40}
                                       width={(screenWidth - 80)}
                                       style={styles.btnAdd}
                                       onPress={() => {
                                           const setSelectedZone = {type: SET_ZONE, value: {id: 0, text: "Ajouter une tension"}}
                                           this.props.dispatch(setSelectedZone)
                                           this.setState({depuisTensionOrBlessure: 0});
                                           const setidZONE = {type: SET_ID_ZONE, value: 0};
                                           this.props.dispatch(setidZONE);
                                           const params = {type: SET_NOT_SHOW_VALIDERBLESSURE, value: false};
                                           this.props.dispatch(params);

                                           if(this.props.navigation.navigate("AddTension" )){
                                               console.warn('ici')
                                           }else if(global.is_venudedonneperso === true) {

                                               const setActiveTab = {
                                                   type: SET_ACTIVE_TAB,value: "AddTension"
                                               };
                                               this.props.dispatch(setActiveTab);
                                               this.props.navigation.navigate('LogedinNavigator');
                                               console.warn('ic')
                                           }
                                           else{
                                               console.warn('icis')

                                               this.props.navigation.navigate("AddtensionFichepedag")
                                           }

                                       }} /> : null

                    }

                    {
                        this.props.activeMenupatho == 1 ?
                            <MAAButton text={"AJOUTER UNE BLESSURE"}
                                       height={40}
                                       width={(screenWidth - 80)}
                                       style={styles.btnAdd}
                                       onPress={() => {
                                           const params = {type: SET_NOT_SHOW_VALIDERBLESSURE, value: false};
                                           this.props.dispatch(params);
                                           const setSelectedZone = { type: SET_ZONE, value: {id:0,text:"Ajouter une blessure"}};
                                           this.props.dispatch(setSelectedZone);
                                           const paramse = {type: SET_NOT_SHOW_VALIDERBLESSURE, value: false};
                                           this.props.dispatch(paramse);
                                           this.setState({depuisTensionOrBlessure:0});

                                           if(global.is_venudedonneperso === true) {
                                               const setActiveTab = {type: SET_ACTIVE_TAB, value: "AddBlessure"};
                                               this.props.dispatch(setActiveTab);
                                               this.props.navigation.navigate('LogedinNavigator');
                                           }else{
                                               if(this.props.navigation.navigate("AddBlessure")){}
                                               else{
                                                   this.props.navigation.navigate("AddBlessureFichepedag")
                                               }
                                           }

                                       }} /> : null
                    }
                </View>


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
    const { activeListPatho,popToTop,userToken,pathologieblessure,pathologietension,activeMenupatho,droits } = state.statedata
    return { activeListPatho,popToTop ,userToken,pathologieblessure,pathologietension,activeMenupatho,droits}
};

export default connect(mapStateToProps)(Pathologie);
