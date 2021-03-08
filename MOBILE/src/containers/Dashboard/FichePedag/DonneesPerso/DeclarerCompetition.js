import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    ScrollView,
    View,
    Text,
    TouchableOpacity,
    Dimensions,
    StatusBar,
    Modal, RefreshControl, TextInput,
    Image, Keyboard, Alert,
} from 'react-native';
import baseStyles from '../../../../base/BaseStyles';
import styles from './styles'
import colors from '../../../../configs/colors';
import LinearGradient from 'react-native-linear-gradient';
import ZonePicker from '../../../../components/ZonePicker/ZonePicker';
import MAAButton from '../../../../components/MAAButton/MAAButton';
import AutoHeightImage from 'react-native-auto-height-image';
import calendarEventHelper from "../../../../apis/helpers/calendarEvent_helper";
import moment from "moment";
import {SET_ACTIVE_TAB, SET_HIDDEN_FOOTER} from '../../../../redux/types/tabTypes';
import Toast from 'react-native-toast-native';
import statusBarHeight from '../../../../configs/screen';
import Slidebottom from '../../../../components/selectslidebottom/Slidebottom';
import DateTimePicker from 'react-native-modal-datetime-picker';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

const style={
    backgroundColor: "#F54130",
    width: 300,
    height: Platform.OS === ("ios") ? 200 : 200,
    color: "#ffffff",
    fontSize: 15,
    lineHeight: 2,
    textAlign:'center',
    // lines: 4,
    borderRadius: 15,
    fontWeight: "bold",
    yOffset: 40
};


const screen = Dimensions.get("window");
const SBHelight = statusBarHeight;
const screenWidth = screen.width
const screenHeight = screen.height - SBHelight

class DeclarerCompetition extends Component {
    constructor(props) {
        super(props)
        this.state = {
            activeMenu: 2,
            selectedZone: props.selectedZone,
            zonePicker: false,
            sliderValueIntensite: 3.45,
            sliderValueDifficulte: 3,
            sliderValueQualite: 4,
            sliderValueImplication: 2,
            labels:[],
            labels1:null,
            userDataforsend:[],
            userDataforsend1:[],
            idDataSportParamforsend:[],
            competbyId:null,
            isWritingScore:false,
            scoreParams:[],
            newDataForSend:{'date':new Date()},
            boolshow:{},
            isDateTimePickerVisible:false,
            date_:new Date(),
        }
    }


    componentDidMount() {
        this.getolddataandforeachit();
        Keyboard.addListener(
            "keyboardDidHide",
            () => {
                const setHiddenFooter = { type: SET_HIDDEN_FOOTER, value: false };
                this.props.dispatch(setHiddenFooter);

            }
        );
        this.keyboardDidShowListener = Keyboard.addListener(
            "keyboardDidShow",
            () => {
                const setHiddenFooter = { type: SET_HIDDEN_FOOTER, value: true };
                this.props.dispatch(setHiddenFooter);
            }
        );
    }


    showDateTimePicker = () => {
        this.setState({ isDateTimePickerVisible: true });
    };

    hideDateTimePicker = () => {
        this.setState({ isDateTimePickerVisible: false });
    };

    handleDatePicked = date => {
        console.warn("A date has been picked: ", date);
        this.setState({date_:date});
        this.hideDateTimePicker();
    };



    getolddataandforeachit= async () => {
        this.setState({refreshing: true});
        const scoreParams = await calendarEventHelper.getScoreParams(this.props.userToken);
        if (scoreParams) {
            if(scoreParams.success === true) {
                if(scoreParams.data.length === 0){
                    console.warn('zero le score params')
                    Toast.show('Les données nécessaires pour déclarer  une compétition sont incomplètes.', Toast.LONG, Toast.TOP,style);
                    if(this.props.navigation.goBack()) {}
                    else{
                        const setActiveTab = { type: SET_ACTIVE_TAB, value: "home" }
                        this.props.dispatch(setActiveTab);
                    }
                }
                this.setState({scoreParams: scoreParams.data, idCompet:scoreParams.data[0].sport_id});
                for(let i=0;i<scoreParams.data.length;i++){
                    this.state.boolshow[scoreParams.data[i].id]=false;
                    if(scoreParams.data[i].type =="string"){
                        this.state.newDataForSend[scoreParams.data[i].id]={
                            type:scoreParams.data[i].type,
                            renderdata:"....................",
                            renderviaboolshow:<View>
                                <TouchableOpacity
                                    style={{
                                        position: "absolute",
                                        top: 2,
                                        right: 5,
                                        zIndex: 1000
                                    }}
                                    onPress={() => {
                                       let temp = this.state.boolshow;
                                        temp[scoreParams.data[i].id] = false;
                                        this.setState({boolshow:temp})
                                    }}
                                ><Image
                                    style={{
                                        width: 20,
                                        height: 20,
                                    }}
                                    source={require("../../../../assets/icons/error.png")}
                                />
                                </TouchableOpacity>
                                <View
                                    style={{
                                        position: "absolute",
                                        top: 8,
                                        right: 10,
                                        backgroundColor: colors.white,
                                        borderRadius: 5,
                                        zIndex: 999,
                                    }}
                                ><TextInput
                                   // value={"" + this.state.userScore}
                                    onChangeText={(text) => {
                                        let tempe = this.state.newDataForSend;
                                        tempe[scoreParams.data[i].id].renderdata = text;
                                        this.setState({newDataForSend:tempe })
                                    }}
                                   // keyboardAppearance={"default"}
                                    // keyboardType={"numeric"}
                                    onBlur={() => {
                                     //   this.setState({isWritingScore: false})
                                    }}
                                    style={{
                                        padding:5,
                                        width: 120
                                    }}
                                    autoFocus={true}
                                />
                                </View>
                            </View>
                        };
                    }else if(scoreParams.data[i].type =="int") {

                        this.state.newDataForSend[scoreParams.data[i].id]={
                            type:scoreParams.data[i].type,
                            renderdata:"....................",
                            renderviaboolshow:<View>
                                <TouchableOpacity
                                    style={{
                                        position: "absolute",
                                        top: 10,
                                        right: 5,
                                        zIndex: 1000
                                    }}
                                    onPress={() => {
                                        let temp = this.state.boolshow;
                                        temp[scoreParams.data[i].id] = false;
                                        this.setState({boolshow:temp})
                                    }}
                                ><Image
                                    style={{
                                        width: 20,
                                        height: 20,
                                    }}
                                    source={require("../../../../assets/icons/error.png")}
                                />
                                </TouchableOpacity>
                                <View
                                    style={{
                                        position: "absolute",
                                        top: 20,
                                        right: 10,
                                        backgroundColor: colors.white,
                                        borderRadius: 5,
                                        zIndex: 999
                                    }}
                                ><TextInput
                                    // value={"" + this.state.userScore}
                                    onChangeText={(text) => {
                                        let tempe = this.state.newDataForSend;
                                        tempe[scoreParams.data[i].id].renderdata = text;
                                        this.setState({newDataForSend:tempe })
                                    }}
                                    //keyboardAppearance={"default"}
                                     keyboardType={"numeric"}
                                    onBlur={() => {
                                      //  this.setState({isWritingScore: false})
                                    }}
                                    style={{
                                        padding:5,
                                        width: 120
                                    }}
                                    autoFocus={true}
                                />
                                </View>
                            </View>
                        };


                    }else if(scoreParams.data[i].type =="select" || scoreParams.data[i].type =="jauge"){
                        this.state.newDataForSend[scoreParams.data[i].id]={
                            type:scoreParams.data[i].type,
                            renderdata:"....................",
                            // renderviaboolshow:<Slidebottom showModal={
                            //     this.state.boolshow[scoreParams.data[i].id]
                            // }
                            //                                onRequestClose={() => {
                            //                                    let temp = this.state.boolshow;
                            //                                    temp[scoreParams.data[i].id] = false;
                            //                                    this.setState({boolshow:temp})
                            //                                }}
                            //                                callback={async (item, index) => {
                            //                                    let temp = this.state.boolshow;
                            //                                    temp[scoreParams.data[i].id] = false;
                            //                                    this.setState({boolshow:temp})
                            //
                            //                                    let temps = this.state.newDataForSend;
                            //                                    temps[scoreParams.data[i].id].renderdata = item;
                            //                                    this.setState({newDataForSend:temps })
                            //                                }}
                            //                                items={['a','b','c']}
                            //                                component_item={(item) => {
                            //                                    return (
                            //                                        <Text style={{color: '#373535'}}>
                            //                                            {
                            //                                                item
                            //                                            }
                            //                                        </Text>
                            //                                    )
                            //                                }}
                            //                     />

                        };
                    }
                }

                let idCompet = scoreParams.data[0].sport_id;
                    for(let z= 0; z< scoreParams.data.length; z++)
                    {
                        this.state.idDataSportParamforsend.push(scoreParams.data[z].id);
                    }
                const competbyId = await calendarEventHelper.getCompetitionbyId(this.props.userToken, idCompet);
                if (competbyId) {
                    this.setState({refreshing: false, competbyId: competbyId});
                    let labels1 = {};
                    let labels=[];

                    let lenghtparams = scoreParams.data.length;
                    for(let j = 0; j<lenghtparams; j++){
                        if(labels.indexOf(scoreParams.data[j].label) === -1) {
                            labels.push(scoreParams.data[j].label);
                        }
                    }

                    if(competbyId.data.params){
                        if(competbyId.data.params.length > 0){
                            for(let k =0; k<labels.length; k++){
                                let values = [];
                                for(let l = 0; l<competbyId.data.params.length; l++){
                                    if(labels[k] === competbyId.data.params[l].label){
                                        values.push(competbyId.data.params[l].value)
                                    }
                                }
                                labels1[labels[k]]=values;
                            }
                            this.setState({labels1:labels1})
                        }
                    }else{
                            for(let k =0; k<labels.length; k++){
                                let values = [];
                                values.push(null);
                                labels1[labels[k]]=values;
                                this.state.userDataforsend.push(null) //add null value in array
                                this.state.userDataforsend1.push(null) //for sended data
                            }
                            this.setState({labels1:labels1})
                    }
                    this.setState({labels:labels});

                }else{
                    this.setState({refreshing: false})
                }
            }else {
                this.setState({refreshing:false})
            }
        }
    };


    setDeclarerCompetSave = async () => {
        this.setState({ refreshing: true });
        let data = {date:moment(new Date(this.state.date_)).format("YYYY-MM-DD")};
        let params=[];
        for(let i = 0; i <this.state.scoreParams.length; i++){
            let value = {};//newDataForSend
            value.sport_param_id = parseInt(this.state.scoreParams[i].id,10);
            if(this.state.newDataForSend[this.state.scoreParams[i].id].type =="int" ){
                console.warn('send int',parseInt(this.state.newDataForSend[this.state.scoreParams[i].id].renderdata,10));
                value.current_value = parseInt(this.state.newDataForSend[this.state.scoreParams[i].id].renderdata,10);
            }else if(this.state.newDataForSend[this.state.scoreParams[i].id].type =="string"){
                console.warn('send str',this.state.newDataForSend[this.state.scoreParams[i].id].renderdata);
                value.current_value = this.state.newDataForSend[this.state.scoreParams[i].id].renderdata;
            }else if(this.state.newDataForSend[this.state.scoreParams[i].id].type =="jauge" || this.state.newDataForSend[this.state.scoreParams[i].id].type =="select"){
                if(Number.isInteger(parseInt(this.state.newDataForSend[this.state.scoreParams[i].id].renderdata,10)) === true){
                    value.current_value =  parseInt(this.state.newDataForSend[this.state.scoreParams[i].id].renderdata,10);
                }else if(Number.isInteger(parseInt(this.state.newDataForSend[this.state.scoreParams[i].id].renderdata,10)) === false){
                    value.current_value = this.state.newDataForSend[this.state.scoreParams[i].id].renderdata;
                    console.warn('select str',this.state.newDataForSend[this.state.scoreParams[i].id].renderdata);
                }
            }
            console.warn('sport_param_id',this.state.scoreParams[i].id,'current_value',this.state.newDataForSend[this.state.scoreParams[i].id].renderdata);
            params.push(value)
        }
        data.sport_params = params;
        console.warn("paramètre>",data);
        const setDeclarerCompetSave = await calendarEventHelper.postDeclarerCompet(
            this.props.userToken,
            // this.state.idCompet, //pour tout
            // this.state.idDataSportParamforsend,
            // this.state.userDataforsend1,
            data
        );
        if(setDeclarerCompetSave){
            this.setState({ refreshing: false })
            if(setDeclarerCompetSave.success === true){
                Alert.alert("Odgo",'Compétition déclarée avec succès.',
                    [
                        {
                            text:"Ok",
                            onPress:()=>{
                                const setActiveTab = { type: SET_ACTIVE_TAB, value: "home" }
                                this.props.dispatch(setActiveTab);
                                // this.props.navigation.navigate('CalendarWithPluginCompetition');
                            }
                        }
                    ]);
            }
        }
    };

    render() {
        return (
            <KeyboardAwareScrollView>
            <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }} colors={[colors.balck, colors.green, colors.balck]} style={baseStyles.linearGradient}>
                <ScrollView
                    style={styles.scrollView}
                    contentContainerStyle={[styles.contentContainerStyle]}
                    keyboardShouldPersistTaps={'always'}
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.refreshing}
                            onRefresh={() => {
                                console.log("Refreshing...")
                                this.setState({ refreshing: true })
                                setTimeout(() => {
                                    console.log("Refresh finished.")
                                    this.setState({ refreshing: false })
                                }, 1000)
                                // this.animateTiming()

                            }}
                            tintColor={colors.green}
                            colors={[colors.green]}
                        />
                    }
                >
                    <View style={{
                        flexDirection: "row",
                        width: screenWidth,
                        alignItems: "center",
                        justifyContent: "space-between",
                        padding: 15,
                        paddingLeft: 0,
                        paddingRight: 0,
                        // backgroundColor: colors.balck
                    }}>
                        <TouchableOpacity
                            onPress={()=> {
                                if(this.props.navigation.goBack()) {}
                                else{
                                    const setActiveTab = { type: SET_ACTIVE_TAB, value: "home" }
                                    this.props.dispatch(setActiveTab);
                                }
                            }}
                            style={{
                            width: 40, height: 40, alignItems: "center",paddingLeft:0,
                            justifyContent: "center"
                        }}
                          >
                            <AutoHeightImage
                                width={18}
                                source={require('../../../../assets/icons/left.arrow.white.png')} />
                        </TouchableOpacity>
                        <Text style={{
                            color: colors.white,
                            fontSize: 20
                        }}>
                            Déclarer une compétition
                        </Text>
                        <TouchableOpacity style={{
                            width: 40, height: 40, alignItems: "center",
                            justifyContent: "center", opacity: 0
                        }}>
                            <AutoHeightImage
                                width={20}
                                source={require("../../../../assets/icons/arrow-white.png")}
                                style={{
                                }} />
                        </TouchableOpacity>
                    </View>
                    {/* <View style={[styles.noSelectedBtn]}>
                        <View style={[styles.headCtn]}>
                            <Text style={[baseStyles.titleText]}>
                                {"Déclarer Compétition"}
                            </Text>
                        </View>
                    </View> */}
                    <View style={[styles.noSelectedBtn,{marginBottom:30}]}>
                        <View style={[styles.headCtn]}>
                            <Text style={[baseStyles.titleText]}>
                                {"Championat Régional"}
                            </Text>
                        </View>
                    </View>

                    <View style={[styles.sliderCtn]}>
                        <View style={[styles.sliderTensionLabelG]}>
                            <Text style={[baseStyles.textColorWhite]}>Date</Text>
                        </View>
                        <TouchableOpacity
                            onPress={()=>{
                                this.setState({isDateTimePickerVisible:true})
                            }}
                            style={[styles.sliderTensionLabelD]}>
                            <Text style={[baseStyles.textColorGrey]}>
                                {/*{this.state.competbyId != null && moment(this.state.competbyId.data.comp_date).format('DD/MM/YYYY')}*/}
                                {/*{moment(this.state.newDataForSend.date).format('DD/MM/YYYY')}*/}
                                {moment(this.state.date_).format('DD/MM/YYYY')}
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.separator}></View>

                    {this.state.scoreParams.length > 0 && this.state.scoreParams.map(
                        (item, key) => {
                                return (
                                    <View>
                                        <View style={[styles.sliderCtn]}>
                                                <TouchableOpacity
                                                    style={[styles.sliderTensionLabelG]}
                                                    onPress={() => {
                                                        let temp = this.state.boolshow;
                                                        temp[item.id] = !temp[item.id];
                                                        this.setState({boolshow:temp })
                                                     //   console.warn('renderviaboolshow',this.state.newDataForSend[item.id].renderviaboolshow)
                                                    }}
                                                >
                                                <Text style={[baseStyles.textColorWhite]}>
                                                    {item.label}
                                                </Text>
                                                </TouchableOpacity>
                                           {  this.state.scoreParams.length > 0 && this.state.scoreParams.map(
                                                   (item1, key) => {
                                                       if(item.id == item1.id && item.label == item1.label){
                                                           try { //this.state.newDataForSend n anton anaovana ity
                                                               return (
                                                                   <View>
                                                                       <TouchableOpacity
                                                                           onPress={() => {
                                                                               let temp = this.state.boolshow;
                                                                               temp[item.id] = !temp[item.id];
                                                                               this.setState({boolshow:temp })
                                                                             //  console.warn('renderviaboolshow',this.state.newDataForSend[item.id].renderviaboolshow)
                                                                           }}
                                                                       ><Text style={[baseStyles.textColorGrey,{textDecorationLine:'underline'}]}>{this.state.newDataForSend[item.id].renderdata}</Text>
                                                                       </TouchableOpacity>
                                                                        {this.state.boolshow[item.id] && this.state.newDataForSend[item.id].renderviaboolshow}
                                                                   </View>
                                                               );
                                                           }catch (e) { }






                                                        }
                                                     }
                                                    )
                                                  }
                                        </View>
                                        {key !== this.state.scoreParams.length -1 ? <View style={styles.separator}></View> : <View style={{marginBottom:30}}/>}
                                    </View>
                                )
                        }
                    )
                    }


                    {/*            /!*{this.state.userDataforsend[key] !== null || this.state.userDataforsend[key] !== undefined &&*!/*/}
                    {/*            /!*    <TextInput*!/*/}
                    {/*            /!*        value={null}*!/*/}
                    {/*            /!*        onChangeText={(text) => {*!/*/}
                    {/*            /!*            for (let i = 0; i < this.state.userDataforsend1.length; i++) {*!/*/}
                    {/*            /!*                const copied = [...this.state.userDataforsend1];*!/*/}
                    {/*            /!*                copied[key] = text;*!/*/}
                    {/*            /!*                this.setState({userDataforsend1: copied})*!/*/}
                    {/*            /!*            }*!/*/}
                    {/*            /!*        }}*!/*/}
                    {/*            /!*        keyboardAppearance={"default"}*!/*/}
                    {/*            /!*        style={{*!/*/}
                    {/*            /!*            width: 120,*!/*/}
                    {/*            /!*            position: "absolute",*!/*/}
                    {/*            /!*            top: -7,*!/*/}
                    {/*            /!*            right: 0,*!/*/}
                    {/*            /!*            backgroundColor: colors.white,*!/*/}
                    {/*            /!*            borderRadius: 5,*!/*/}
                    {/*            /!*            zIndex: 999*!/*/}
                    {/*            /!*        }}*!/*/}
                    {/*            /!*    />*!/*/}
                    {/*            /!*}*!/*/}

                    {/*            /!*{this.state.userDataforsend[key] !== null || this.state.userDataforsend[key] !== undefined ?*!/*/}
                    {/*            /!*    <TouchableOpacity*!/*/}
                    {/*            /!*        // onPress={()=>{*!/*/}
                    {/*            /!*        //     console.warn(this.state.userDataforsend[key])*!/*/}
                    {/*            /!*        // }}*!/*/}
                    {/*            /!*    >*!/*/}
                    {/*            /!*    <View style={[styles.sliderTensionLabelD]}>*!/*/}
                    {/*            /!*        <Text style={[baseStyles.textColorGrey]}>{this.state.labels1[item][0]}</Text>*!/*/}
                    {/*            /!*    </View>*!/*/}
                    {/*            /!*    </TouchableOpacity>*!/*/}
                    {/*            /!*    :*!/*/}
                    {/*            /!*    <TextInput*!/*/}
                    {/*            /!*        value={null}*!/*/}
                    {/*            /!*        onChangeText={(text) => {*!/*/}
                    {/*            /!*            for(let i = 0;i < this.state.userDataforsend1.length; i++){*!/*/}
                    {/*            /!*                const copied = [...this.state.userDataforsend1]*!/*/}
                    {/*            /!*                copied[key] = text;*!/*/}
                    {/*            /!*                this.setState({ userDataforsend1: copied })*!/*/}
                    {/*            /!*            }*!/*/}
                    {/*            /!*        }}*!/*/}
                    {/*            /!*        keyboardAppearance={"default"}*!/*/}
                    {/*            /!*        style={{*!/*/}
                    {/*            /!*            width: 120,*!/*/}
                    {/*            /!*            position: "absolute",*!/*/}
                    {/*            /!*            top: -7,*!/*/}
                    {/*            /!*            right: 0,*!/*/}
                    {/*            /!*            backgroundColor: colors.white,*!/*/}
                    {/*            /!*            borderRadius: 5,*!/*/}
                    {/*            /!*            zIndex: 999*!/*/}
                    {/*            /!*        }}*!/*/}
                    {/*            /!*    />*!/*/}
                    {/*            /!*}*!/*/}
                    {/*        </View>*/}
                    {/*    < View style={styles.separator}></View>*/}
                    {/*    </View>)}*/}
                    {/*    }*/}
                    {/*    )}*/}

                    <MAAButton text={"VALIDER"} width={(screenWidth - 100)} height={40}
                        onPress={() => {
                            this.setDeclarerCompetSave()

                        }}
                        style={[styles.btnValidate]} />

                </ScrollView>
                {  this.state.scoreParams.length > 0 && this.state.scoreParams.map(
                    (item,key)=>{
                            if(item.type =="select" || item.type =="jauge"  ){
                                return (
                                    <Slidebottom showModal={
                                    this.state.boolshow[item.id]
                                }
                                onRequestClose={() => {
                                    let temp = this.state.boolshow;
                                    temp[item.id] = false;
                                    this.setState({boolshow:temp})
                                }}
                                callback={async (items, index) => {
                                    let temps = this.state.newDataForSend;
                                    temps[item.id].renderdata = items;
                                    this.setState({newDataForSend:temps })

                                    let temper = this.state.boolshow;
                                    temper[item.id] = false;
                                    this.setState({boolshow:temper})

                                }}
                                items={JSON.parse(item.json_possibilite)}
                                component_item={(items) => {
                                    return (
                                        <Text style={{color: '#373535'}}>
                                            {
                                                items
                                            }
                                        </Text>
                                    )
                                }}
                                />)
                            }
                    }
                )}
                <DateTimePicker
                    isVisible={this.state.isDateTimePickerVisible}
                    onConfirm={this.handleDatePicked}
                    onCancel={this.hideDateTimePicker}
                    // maximumDate={new Date()}
                />
            </LinearGradient>
          </KeyboardAwareScrollView>
        )
    }
}

// export default AddTension;
const mapStateToProps = (state) => {
    const { selectedZone,userToken } = state.statedata
    return { selectedZone,userToken }
};

export default connect(mapStateToProps)(DeclarerCompetition);
