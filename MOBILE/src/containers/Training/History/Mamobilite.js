import React, { Component } from 'react';
import {
    Dimensions,
    StatusBar,
    TouchableOpacity,
    ScrollView,
    View,
    Text,
    RefreshControl,Platform
} from 'react-native';
import AutoHeightImage from 'react-native-auto-height-image';
import LinearGradient from 'react-native-linear-gradient';
import colors from '../../../configs/colors';
import baseStyles from '../../../base/BaseStyles';
import styles from './styles';
import MAAButton from '../../../components/MAAButton/MAAButton';
import HalfRed from '../../../components/HalfRed/HalfRed';
import AsyncStorage from '@react-native-community/async-storage';
import TrainHelper from '../../../apis/helpers/train_helper';
import {SET_ACTIVE_TAB, SET_POP_TO_TOP, SET_PARAMS_MAMOBILITE} from '../../../redux/types/tabTypes';
import {connect} from "react-redux";
import statusBarHeight from '../../../configs/screen';
import moment from 'moment';
import {getBlessurePathologie, getTensionPathologie} from '../../../apis/FonctionRedondant';
import PathologieHelper from '../../../apis/helpers/pathologie_helper';
import PathologieHelperTension from '../../../apis/helpers/tension_helper';
import Slidebottom from '../../../components/selectslidebottom/Slidebottom';
import {getUserTrains} from'../../../apis/FonctionRedondant'
import PersonalDataHelper from '../../../apis/helpers/person_data_helper';
import VideothequeHelper from '../../../apis/helpers/videotheque_helper';

const screen = Dimensions.get('screen');
const SBHelight = statusBarHeight;
const screenWidth = screen.width
const screenHeight = screen.height - SBHelight


class Mamobilite extends Component {

    constructor(props) {
        super(props)
        this.state = {
            userToken: "",
            checked:false,
            membres:[{"name":"Epaules"},{"name":"Hanches"},{"name":"Chevilles"},{"name":"ChaÃ®nes musculaires"}],
            programtypes:[],
            indexmembrechecked:[],
            indexprogramtypeschecked:[],
            membreid:null,
            membrename:null,
            // programtypeid:null,
            isgrisegauche:false,
            isgrisedroite:false,
        };
    }

    async componentDidMount() {
        const userToken = await AsyncStorage.getItem("userToken");
        this.setState({ userToken });
        this.getMembres();
        this.getProgrammetypes();
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
            this.setState({ isgrisedroite: true })
            this.setState({ refreshing: false })
        }
    }


    render() {
        if(this.props.popToTop === 'train'){
            this.props.navigation.popToTop();
            const setPopToTop = { type: SET_POP_TO_TOP, value: '' }
            this.props.dispatch(setPopToTop);
        }

        this.trainStoriesobj =[];

        return (
            <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }} colors={[colors.balck, colors.green, colors.balck]} style={baseStyles.linearGradient}>
                <ScrollView
                    style={styles.scrollView}
                    contentContainerStyle={[styles.contentContainerStyle]}
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.refreshing}
                            onRefresh={() => {
                                this.setState({ refreshing: true });
                                setTimeout(() => {
                                    this.setState({ refreshing: false })
                                }, 2000)
                            }}
                            tintColor={Platform.OS==='ios'?colors.white:colors.green}
                            colors={[Platform.OS==='ios'?colors.white:colors.green]}
                        />
                    }
                >
                    <View style={{ alignItems :"center",justifyContent:"center",width:"100%",marginTop:15  }}>
                        <TouchableOpacity
                            onPress={() => {
                                if(this.props.navigation.goBack()){}
                                else{
                                    const setActiveTab = { type: SET_ACTIVE_TAB, value: "home" };
                                    this.props.dispatch(setActiveTab);
                                    this.props.navigation.navigate('LogedinNavigator');
                                }

                            }}
                            style={{width:50,position:"absolute",left:0}}
                        >
                            <AutoHeightImage
                                width={18}
                                source={require('../../../assets/icons/arrow-white.png')}
                                style={{marginLeft:15, transform: [
                                        { rotateY: "180deg" }
                                    ],}}
                            />
                        </TouchableOpacity>
                        <Text style={{textAlign:"center", color: colors.white,
                            fontSize: 18,marginHorizontal:screenWidth*0.12}}>
                            {"Choisissez la zone Ã  travailler puis un type d'exercice"}
                        </Text>
                    </View>

                    <View style={{flexDirection:'row',marginTop:screenHeight*0.07,paddingHorizontal:10,justifyContent:'space-between'}}>
                       { !this.state.isgrisegauche ? <View style={{width:(screenWidth/2)-20,height:screenHeight*0.5,borderWidth:2,borderRadius:17,borderColor:'white',justifyContent:'space-around',paddingLeft:10,paddingRight:5}}>
                            {this.state.membres.map((item,index)=>{
                                this.state.indexmembrechecked.push(false);
                                return <View key={'ind'+index} style={{flexDirection:'row',justifyContent:'space-between', alignItems:'center',width:"100%"}}>
                                        <View style={{ width:item.name.length > 12? "80%" : "60%"}}>
                                <Text style={{ flexWrap : item.name.length > 12? 'wrap' : "nowrap", color:'white',fontSize:16,marginTop:-3}}>
                                    {item.name}
                                </Text>
                                </View>
                                    <View style={{left:index === this.state.membres.length -1 ? 0 : 0}}>
                                    <TouchableOpacity
                                        onPress={()=>{
                                            let indexmembrechecked_= this.state.indexmembrechecked;
                                            for(let i = 0; i< indexmembrechecked_.length; i++){
                                                indexmembrechecked_[i] = false;
                                            }
                                            //this.setState({checked:!this.state.checked});
                                            indexmembrechecked_[index] = true;
                                            this.setState({membreid:item.id});
                                            this.setState({membrename:item.name});
                                            this.setState({isgrisegauche:true});
                                            this.setState({isgrisedroite:false});
                                            this.setState({indexmembrechecked:indexmembrechecked_});
                                        }}
                                        style={{ alignSelf: "center", marginRight:5 }}>
                                        {this.state.indexmembrechecked[index] === true ? <View  style={{top:-16,marginBottom:-15}}><AutoHeightImage
                                                width={13}
                                                source={require("../../../assets/icons/check.mark.white.png")}
                                                style={{ alignSelf: "center",bottom:-17 }}
                                            /><AutoHeightImage
                                                    width={20}
                                                    source={require("../../../assets/icons/check-no.png")}
                                                    style={{ alignSelf: "center" }}
                                                />
                                            </View>
                                            :<AutoHeightImage
                                                width={20}
                                                source={require("../../../assets/icons/check-no.png")}
                                                style={{ alignSelf: "center" }}
                                            />
                                        }
                                    </TouchableOpacity>
                                    </View>
                            </View>}
                            )}
                        </View>
                       :
                           <TouchableOpacity
                               onPress={()=>{
                                   this.setState({isgrisegauche:false});
                                   this.setState({isgrisedroite:true});

                               }}
                               style={{width:(screenWidth/2)-20,height:screenHeight*0.5,borderWidth:2,borderRadius:17,borderColor:colors.grisee,justifyContent:'space-around',paddingLeft:10,paddingRight:5}}>
                               {this.state.membres.map((item,index)=>{
                                   this.state.indexmembrechecked.push(false);
                                   return <View key={'ind'+index} style={{flexDirection:'row',justifyContent:'space-between', alignItems:'center'}}>
                                       <Text style={{color:colors.textgrisee,fontSize:16,marginTop:-3}}>
                                           {item.name}
                                       </Text>
                                       <View style={{left:index === this.state.membres.length -1 ? 0 : 0}}>
                                           <View
                                               style={{ alignSelf: "center", marginRight:5 }}>
                                               {this.state.indexmembrechecked[index] === true ? <View  style={{top:-16,marginBottom:-15}}><AutoHeightImage
                                                       width={13}
                                                       source={require("../../../assets/icons/check.mark.white.png")}
                                                       style={{ alignSelf: "center",bottom:-17,tintColor:colors.textgrisee }}
                                                   /><AutoHeightImage
                                                       width={20}
                                                       source={require("../../../assets/icons/check-no.png")}
                                                       style={{ alignSelf: "center",tintColor:colors.textgrisee }}
                                                   />
                                                   </View>
                                                   :<AutoHeightImage
                                                       width={20}
                                                       source={require("../../../assets/icons/check-no.png")}
                                                       style={{ alignSelf: "center",tintColor:colors.textgrisee }}
                                                   />
                                               }
                                           </View>
                                       </View>
                                   </View>}
                               )}
                           </TouchableOpacity>
                       }
                        {this.state.programtypes.length >0 && <View style={{width:(screenWidth/2)-20,height:screenHeight*0.5,borderWidth:2,borderRadius:17,borderColor: !this.state.isgrisedroite ?'white': colors.grisee,justifyContent:'space-around',paddingLeft:10,paddingRight:5}}>
                            {this.state.programtypes.length >0 && this.state.programtypes.map((item,index)=>{
                                if(item.name !== "Mes tensions"){
                                this.state.indexprogramtypeschecked.push(false);
                                return <View key={'index'+index} style={{flexDirection:'row',justifyContent:'space-between', alignItems:'center'}}>
                                    <Text style={{color: !this.state.isgrisedroite ?'white': colors.textgrisee,fontSize:16,marginTop:-3}}>
                                        {item.name}
                                    </Text>
                                    <View style={{}}>
                                        {/*jeren ato so hoe afaka isaina le length n text de limitÃ©na n width n view*/}
                                        { !this.state.isgrisedroite ? <TouchableOpacity
                                            onPress={()=>{
                                                let indexprogramtypeschecked_= this.state.indexprogramtypeschecked;
                                                for(let i = 0; i< indexprogramtypeschecked_.length; i++){
                                                    indexprogramtypeschecked_[i] = false;
                                                }
                                                indexprogramtypeschecked_[index] = true;
                                                this.setState({programtypeid:item.id});
                                                this.setState({indexprogramtypeschecked:indexprogramtypeschecked_});
                                                const setparam = { type: SET_PARAMS_MAMOBILITE, value: {zonetestid:this.state.membreid,idprogramme:item.id,nomZone:this.state.membrename,depuissquelette:false} };
                                                this.props.dispatch(setparam);
                                                console.warn('ici v de lasa',setparam)

                                               if( this.props.navigation.navigate("ListeVideoByColonneLeftRight")){}
                                               else if(this.props.navigation1) {
                                                  // this.props.navigation.navigate("ListeLeftRightFoot",{zonetestid:this.state.membreid,idprogramme:item.id,nomZone:this.state.membrename})
                                                   const setActiveTab = { type: SET_ACTIVE_TAB, value: "ListeLeftRightFoot" };
                                                   this.props.dispatch(setActiveTab);
                                                   this.props.navigation.navigate('LogedinNavigator');
                                               }else{
                                                   this.props.navigation.navigate("ListeLeftRightDash",{zonetestid:this.state.membreid,idprogramme:item.id,nomZone:this.state.membrename})
                                               }
                                            }}
                                            style={{ alignSelf: "center", marginRight:5 }}>
                                            {this.state.indexprogramtypeschecked[index] === true ? <View  style={{top:-16,marginBottom:-15}}><AutoHeightImage
                                                    width={13}
                                                    source={require("../../../assets/icons/check.mark.white.png")}
                                                    style={{ alignSelf: "center",bottom:-17 }}
                                                /><AutoHeightImage
                                                    width={20}
                                                    source={require("../../../assets/icons/check-no.png")}
                                                    style={{ alignSelf: "center" }}
                                                />
                                                </View>
                                                :<AutoHeightImage
                                                    width={20}
                                                    source={require("../../../assets/icons/check-no.png")}
                                                    style={{ alignSelf: "center" }}
                                                />
                                            }
                                        </TouchableOpacity>
                                        :
                                            <View
                                                style={{ alignSelf: "center", marginRight:5 }}>
                                                {this.state.indexprogramtypeschecked[index] === true ? <View  style={{top:-16,marginBottom:-15}}><AutoHeightImage
                                                        width={13}
                                                        source={require("../../../assets/icons/check.mark.white.png")}
                                                        style={{ alignSelf: "center",bottom:-17,tintColor:colors.textgrisee }}
                                                    /><AutoHeightImage
                                                        width={20}
                                                        source={require("../../../assets/icons/check-no.png")}
                                                        style={{ alignSelf: "center",tintColor:colors.textgrisee }}
                                                    />
                                                    </View>
                                                    :<AutoHeightImage
                                                        width={20}
                                                        source={require("../../../assets/icons/check-no.png")}
                                                        style={{ alignSelf: "center",tintColor:colors.textgrisee }}
                                                    />
                                                }
                                            </View>
                                        }
                                    </View>
                                </View>}
                                }
                            )}
                        </View>}
                    </View>
                </ScrollView>
            </LinearGradient>
        )
    }
}

// export default History;
const mapStateToProps = (state) => {
    const { popToTop,userToken } = state.statedata;
    return { popToTop,userToken }
};

export default connect(mapStateToProps)(Mamobilite);