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
} from 'react-native';
import { connect } from 'react-redux';
import baseStyles from '../../../base/BaseStyles';
import styles from './styles';
import colors from '../../../configs/colors';
import LinearGradient from 'react-native-linear-gradient';
import ZonePicker from '../../../components/ZonePicker/ZonePicker';
import MAAButton from '../../../components/MAAButton/MAAButton';
import AutoHeightImage from 'react-native-auto-height-image';
import {SET_ACTIVE_FP, SET_POP_TO_TOP, SET_ZONE} from '../../../redux/types/tabTypes';
import SqueletteDevantBlanc from './SqueletteDevantBlanc';
import SqueletteDerriereBlanc from './SqueletteDerriereBlanc';
import Swiper from "react-native-swiper";
import pathologieHelper from '../../../apis/helpers/pathologie_helper';
import moment from 'moment';
import DateTimePicker from "react-native-modal-datetime-picker";
import SwitchToggle from "react-native-switch-toggle";
import hydratationHelper from '../../../apis/helpers/hydratation_helper';
import statusBarHeight from '../../../configs/screen';


const screen = Dimensions.get("window");
const SBHelight = statusBarHeight;
const screenWidth = screen.width
const screenHeight = screen.height - SBHelight;






class AddBlessure extends Component {
    constructor(props) {
        super(props)
        this.state = {
            activeMenu: 2,
            selectedZone: props.selectedZone,
            zonePicker: false,
            pathologie_text: "Traumatismes",
            autre_text: "Xxxxx",
            date_text: moment(new Date()).format("DD/MM/YYYY"),
            operation: false,
            indispo_time: "2 semaines",
            popToTop:this.props.popToTop,
            activeTabMenu:1,
            pathologieblessure:null,
            isDateTimePickerVisible:false,
            tempsindisponibilites:null,
            tempsindisponibilitessemaine:null,
            showTempsindisponibilitechoice:false,
            switchOn2:false,
        }
    }



    componentDidMount() {
        if(this.props.selectedZone.id === 0){}else{
            this.getpathologieblessure(this.props.userToken,this.props.selectedZone.id)
        }
        const setActiveFPAction = { type: SET_ACTIVE_FP, value: null }
        this.props.dispatch(setActiveFPAction)

    }


    _selectedId = (id,nom,state) =>{
        console.warn(id,nom,state)
        const setSelectedZone = { type: SET_ZONE, value: {id:id,text:nom} }
        this.props.dispatch(setSelectedZone)
        this.getpathologieblessure(this.props.userToken,id)

    };

    getpathologieblessure  = async (token,zoneid) => {
        this.setState({refreshing: true});
        const pathologieblessure = await pathologieHelper.getpathologieblessure(token,zoneid);
        if (pathologieblessure.data.length >0) {
            this.setState({refreshing: false,pathologieblessure:pathologieblessure},()=>{
                    switch(pathologieblessure.data[0].pathologie_type_id ){
                        case 0 :
                            this.setState({switchOn2:false});
                            break;
                        case 1 :
                            this.setState({switchOn2:true});
                            break;
                        default:
                            this.setState({switchOn2:false});
                    }

                    this.gettempsindisponibilites()
            });
        }
    };

    gettempsindisponibilites =  async () => {
        this.setState({refreshing: true});
        const tempsindisponibilites = await pathologieHelper.gettempsindisponibilites(this.props.userToken);
        if (tempsindisponibilites) {
            tempsindisponibilites.data.length >0 && this.setState({refreshing: false, tempsindisponibilites: tempsindisponibilites,tempsindisponibilitessemaine:tempsindisponibilites.data[0].name})
            this.setState({refreshing: false})
        }};


    renderPagination = (index, total, context) => {
        return (
            this.props.selectedZone.id == 0 && <View style={{  position: 'absolute',
                bottom: 10,
                right: 10}}>
                <Text style={{ color: 'grey' }}>
                    <Text style={{ color: 'white',
                        fontSize: 20}}>{index + 1}</Text>/{total}
                </Text>
            </View>
        )
    }

    showDateTimePicker = () => {
        this.setState({ isDateTimePickerVisible: true });
    };

    hideDateTimePicker = () => {
        this.setState({ isDateTimePickerVisible: false });
    };

    handleDatePicked = date => {
        console.warn("A date has been picked: ", date);
        this.setState({date_text:moment(date).format("DD/MM/YYYY")})
        this.hideDateTimePicker();
    };


    onPress2 = () => {
        this.setState({ switchOn2: !this.state.switchOn2 });
    };

    blessuresave = async () => {
        this.setState({refreshing: true});
        let switchOn2 = this.state.switchOn2 ? 2 : 1;
        let operation = this.state.operation ? 1 : 0;
        const blessuresave = await pathologieHelper.blessuresave(this.props.userToken,
                                                                    this.props.selectedZone.id,
                                                                      switchOn2,
                                                                        moment(this.state.date_naissance).format("YYYY-MM-DD"),
                                                                        operation,
                                                                        this.state.tempsindisponibilitessemaine.id,
                                                                       // files
                                                                    );
                                                                    // slide 38 : {
                                                                    //     "zone_id": 1,
                                                                    //         "pathologie_id": 1,
                                                                    //         "date": "2019-12-16",
                                                                    //         "operation": 0,
                                                                    //         "temps_indisponibilite_id": 1
                                                                    // }
        if (blessuresave) {
            this.getpathologieblessure(this.props.userToken,this.props.selectedZone.id)
            this.setState({refreshing: false});
            console.warn(blessuresave)
        }
    };

    render() {
        if(this.props.popToTop === 'sante'){
            this.props.navigation.popToTop();
            const setPopToTop = { type: SET_POP_TO_TOP, value: '' }
            this.props.dispatch(setPopToTop);
        }
        return (

            <View style={{flex:1}}>
                <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }} colors={[colors.balck, colors.green, colors.balck]} >
                <View style={{
                    minWidth: screenWidth,
                    paddingLeft: 15,
                    paddingRight: 15
                }}>

                    <View style={{flexDirection:'row',alignItems:'center',marginTop:screenWidth*0.03,justifyContent:'space-between'}}>
                        <TouchableOpacity style={{ width: 60 }}
                                          onPress={() => {
                                              if(this.props.selectedZone.id !== 0){
                                                  const setSelectedZone = { type: SET_ZONE, value: {id:0,text:"Ajouter une blessure"}}
                                                  this.props.dispatch(setSelectedZone)
                                              } else {
                                                  this.props.navigation.goBack()
                                              }

                                          }}>
                            <AutoHeightImage
                                width={18}
                                source={require("../../../assets/icons/arrow-white.png")}
                                style={{
                                    transform: [
                                        { rotateY: "180deg" }
                                    ]
                                }} />
                        </TouchableOpacity>

                            <TouchableOpacity
                                onPress={() => {
                                    //this.setState({ zonePicker: true })
                                    console.warn(this.props.selectedZone)
                                    const setSelectedZone = { type: SET_ZONE, value: {id:0,text:"Ajouter une blessure"} }
                                    this.props.dispatch(setSelectedZone)


                                }}>
                                <Text style={[baseStyles.titleText]}>
                                    {/*{this.props.selectedZone.id == 0 ? "Ajouter une blessure" : this.props.selectedZone.text}*/}
                                    {this.props.selectedZone.id === 0 ? "Ajouter une blessure" : this.props.selectedZone.text}
                                </Text>
                            </TouchableOpacity>
                        <View>
                        </View>
                        <View>
                        </View>

                    </View>

                    <View style={{ width: 60 }}>
                        <Text style={{ color: colors.balck + "00" }}>...</Text>
                    </View>
                </View>
                    {this.props.selectedZone.id === 0 ?

                        <View style={[styles.noSelectedCtn,{marginBottom:10,alignSelf:'center'}]}>
                            <Text style={[baseStyles.textColorWhite]}>Sélectionnez une zone d'une blessure passée</Text>
                        </View>
                        :
                        <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-around',paddingBottom:screenWidth*0.04}}>
                            <Text style={{color:'white'}}>Os/ligaments</Text>
                            <SwitchToggle
                                containerStyle={{

                                    width: 50,
                                    height: 24,
                                    borderRadius: 25,
                                    backgroundColor: "#30CBBD",
                                    padding: 5
                                }}
                                circleStyle={{
                                    width: 20,
                                    height: 20,
                                    borderRadius: 10,
                                    backgroundColor: "white" // rgb(102,134,205)
                                }}
                                switchOn={this.state.switchOn2}
                                onPress={this.onPress2}
                                circleColorOff="white"
                                circleColorOn="white"
                                duration={500}
                                backgroundColorOn={"#30CBBD"}
                            />
                            <Text style={{color:'white'}}>Muscles/Tendons</Text>
                        </View>
                    }
                </LinearGradient>


                {this.props.selectedZone.id === 0 &&
                <Swiper
                    renderPagination={this.renderPagination}
                    loop={false}
                    //showsButtons={false}
                >
                    <ScrollView>
                        <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }} colors={[colors.balck, colors.green, colors.balck]} style={baseStyles.linearGradient}>
                            <SqueletteDevantBlanc _selectedId={this._selectedId}/>
                        </LinearGradient>
                    </ScrollView>
                    <ScrollView>
                        <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }} colors={[colors.balck, colors.green, colors.balck]} style={baseStyles.linearGradient}>
                            <SqueletteDerriereBlanc _selectedId={this._selectedId}/>
                        </LinearGradient>
                    </ScrollView>
                </Swiper>
}
                {this.props.selectedZone.id !== 0 &&
                <ScrollView
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.refreshing}
                            onRefresh={() => {
                                this.setState({ refreshing: true })
                                setTimeout(() => {
                                    this.getpathologieblessure(this.props.userToken,this.props.selectedZone.id)
                                    this.setState({ refreshing: false })
                                }, 1000)

                            }}
                            tintColor={colors.green}
                            colors={[colors.green]}
                        />
                    }
                >
                <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }} colors={[colors.balck, colors.green, colors.balck]}>
                <View style={{ justifyContent: "space-between", alignItems: "center" }}>
                        <View>
                            <View style={[styles.inputBlock]}>
                                <Text style={[baseStyles.textColorWhite]}>Pathologie</Text>
                                <TextInput placeholder={""}
                                           onChangeText={(text) => {
                                               this.setState({ pathologie_text: text })
                                           }}
                                           value={( this.state.pathologieblessure !== null && this.state.pathologieblessure.data.length >0) && this.state.pathologieblessure.data[0].name}
                                           style={[baseStyles.textColorWhite, styles.inputTxt]} />
                            </View>
                            {/*<View style={[styles.inputBlock]}>*/}
                            {/*    <Text style={[baseStyles.textColorWhite]}>Autre</Text>*/}
                            {/*    <TextInput placeholder={""}*/}
                            {/*               onChangeText={(text) => {*/}
                            {/*                   this.setState({ autre_text: text })*/}
                            {/*               }}*/}
                            {/*               value={this.state.autre_text}*/}
                            {/*               style={[baseStyles.textColorWhite, styles.inputTxt]} />*/}
                            {/*</View>*/}

                            <TouchableOpacity onPress={
                                this.showDateTimePicker
                            }>
                                <View style={[styles.inputBlock]}>
                                    <Text style={[baseStyles.textColorWhite]}>Date</Text>
                                    {/*<TextInput placeholder={""}*/}
                                    {/*           onChangeText={(text) => {*/}
                                    {/*               this.setState({ date_text: text })*/}
                                    {/*           }}*/}
                                    {/*           value={moment(new Date()).format("DD/MM/YYYY")}*/}
                                    {/*           style={[baseStyles.textColorWhite, styles.inputTxt]} />*/}
                                    <Text style={{color:'white'}}>{this.state.date_text}</Text>
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => {
                                console.log("Date pressed.")
                                this.setState({ operation: !this.state.operation })
                            }}>
                                <View style={[styles.inputBlock]}>
                                    <Text style={[baseStyles.textColorWhite]}>Opération</Text>
                                    <Text style={[baseStyles.textColorWhite]}>
                                        {this.state.operation ? "Oui" : "Non"}
                                    </Text>
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity
                                onPress={()=>{
                                    this.setState({ showTempsindisponibilitechoice: !this.state.showTempsindisponibilitechoice })

                                }}
                                style={[styles.inputBlock, styles.lastInputBlock]}>
                                <Text style={[baseStyles.textColorWhite]}>Temps d'indisponibilité</Text>
                                <Text
                                    style={[baseStyles.textColorWhite, styles.inputTxt]} >
                                    {this.state.tempsindisponibilitessemaine}</Text>
                            </TouchableOpacity>

                            {
                                this.state.showTempsindisponibilitechoice ?
                                    <View
                                        style={{
                                            position: "absolute",
                                            top: screenWidth*0.4,
                                            right: screenWidth*0.02,
                                            backgroundColor: colors.white,
                                            borderRadius: 5,
                                            zIndex: 999
                                        }}
                                    >
                                        {
                                            this.state.tempsindisponibilites !== null &&  this.state.tempsindisponibilites.data.map((item, index) => {
                                                return (
                                                    <TouchableOpacity
                                                        key={"sport_" + index}
                                                        style={{
                                                            padding: 5,
                                                            paddingLeft: 10,
                                                            paddingRight: 10,
                                                            margin: 5,
                                                            borderBottomColor: colors.grisbox,
                                                            borderBottomWidth: 0.5
                                                        }}
                                                        onPress={() => {
                                                            this.setState({ tempsindisponibilitessemaine: item.name })
                                                            this.setState({ showTempsindisponibilitechoice: false })
                                                            // this.getSportListLevels(sport.id)
                                                        }}
                                                    >
                                                        <Text>
                                                            {
                                                                item.name
                                                            }
                                                        </Text>
                                                    </TouchableOpacity>
                                                )
                                            })
                                        }
                                    </View> : null
                            }
                        </View>
                    </View>
                    <View style={{alignItems:'center',paddingBottom:screenWidth*0.2}}>
                    <MAAButton text={"VALIDER"} width={(screenWidth - 100)} height={40}
                               onPress={() => {

                                   this.blessuresave()
                               }}
                               style={[styles.btnValidate]} />
                    </View>
                </LinearGradient>
                </ScrollView>
                }


                <Modal
                    visible={this.state.zonePicker}
                    transparent={true}
                    onRequestClose={() => {
                        this.setState({ zonePicker: false })
                    }}
                >
                    <ZonePicker close={() => {
                        this.setState({ zonePicker: false })
                    }} type="blessure" />
                    {/* <View style={{padding:10}}></View> */}
                </Modal>

                <DateTimePicker
                    isVisible={this.state.isDateTimePickerVisible}
                    onConfirm={this.handleDatePicked}
                    onCancel={this.hideDateTimePicker}
                />
            </View>
        )
    }
}


const mapStateToProps = (state) => {
    const { selectedZone,popToTop,userToken } = state.statedata
    return { selectedZone,popToTop ,userToken}
};

export default connect(mapStateToProps)(AddBlessure);
