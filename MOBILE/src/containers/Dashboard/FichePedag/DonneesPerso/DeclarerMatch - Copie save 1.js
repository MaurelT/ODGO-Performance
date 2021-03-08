import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    ScrollView,
    View,
    Text,
    TouchableOpacity,
    Dimensions,
    StatusBar,
    Modal, Easing, RefreshControl, Image, TextInput
} from 'react-native';
// import Slider from '@react-native-community/slider';
import baseStyles from '../../../../base/BaseStyles';
import styles from './styles'
import colors from '../../../../configs/colors';
import LinearGradient from 'react-native-linear-gradient';
import ZonePicker from '../../../../components/ZonePicker/ZonePicker';
import MAAButton from '../../../../components/MAAButton/MAAButton';
import AutoHeightImage from 'react-native-auto-height-image';
import calendarEventHelper from "../../../../apis/helpers/calendarEvent_helper";
import moment from "moment";
import PersonalDataHelper from "../../../../apis/helpers/person_data_helper";
import statusBarHeight from '../../../../configs/screen';


const screen = Dimensions.get("window");
const SBHelight = statusBarHeight;
const screenWidth = screen.width
const screenHeight = screen.height - SBHelight

class DeclarerMatch extends Component {
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
            competbyId:null,
            userToken:props.userToken,
            scoreParams:null,
            labels:[],
            labels1:{},
            showModalForSelectValue:false,
            valeursaafficher:null,
            isWritingScore:true,
            isWritingStatut:true,
            isWritingTempdejeu:true,
            isWritingButs:true,
            isWritingPasses:true,
            isWritingRouge:true,
            isWritingJaune:true,
            userScore:'0 - 0',
            userStatut:'Titulaire',
            userTempdejeu:0,
            userButs:0,
            userPasses:0,
            userRouge:0,
            userJaune:0,

            param_idScore:null,
            param_idStatut:null,
            param_idTempdejeu:null,
            param_idButs:null,
            param_idPasses:null,
            param_idRouge:null,
            param_idJaune:null,

            idCompet:null,
            param_idj18:null,
            j18:null

        }
    }

    async componentDidMount() {

        this.setState({refreshing: true});
        const scoreParams = await calendarEventHelper.getScoreParams(this.state.userToken);
        if (scoreParams) {
            if (scoreParams.success === true) {
                this.setState({scoreParams: scoreParams,
                    param_idScore:scoreParams.data[0].id,
                    param_idStatut:scoreParams.data[6].id,
                    param_idTempdejeu:scoreParams.data[1].id,
                    param_idButs:scoreParams.data[2].id,
                    param_idPasses:scoreParams.data[3].id,
                    param_idRouge:scoreParams.data[4].id,
                    param_idJaune:scoreParams.data[5].id,
                    param_idj18:scoreParams.data[7].id,

                    idCompet:scoreParams.data[0].sport_id,

                });
                let idCompet = scoreParams.data[0].sport_id;

                const competbyId = await calendarEventHelper.getCompetitionbyId(this.state.userToken, idCompet);
                console.warn('ok',competbyId)
                if (competbyId) {
                    try {
                        if (competbyId.data.params.length > 0) {
                            this.setState({
                                refreshing: false,
                                competbyId: competbyId,

                                userScore: competbyId.data.params[0].value,
                                userStatut: competbyId.data.params[6].value,
                                userTempdejeu: competbyId.data.params[1].value,
                                userButs: competbyId.data.params[2].value,
                                userPasses: competbyId.data.params[3].value,
                                userRouge: competbyId.data.params[4].value,
                                userJaune: competbyId.data.params[5].value,
                                j18: competbyId.data.params[7].value,

                                isWritingScore: false,
                                isWritingStatut: false,
                                isWritingTempdejeu: false,
                                isWritingButs: false,
                                isWritingPasses: false,
                                isWritingRouge: false,
                                isWritingJaune: false,

                            })
                        } else {
                            this.setState({
                                refreshing: false,
                                competbyId: competbyId,
                                isWritingScore: true,
                                isWritingStatut: true,
                                isWritingTempdejeu: true,
                                isWritingButs: true,
                                isWritingPasses: true,
                                isWritingRouge: true,
                                isWritingJaune: true,
                            });
                        }
                    } catch (e) {
                        this.setState({ refreshing: false})
                    }
                }
            }
        }

    }

    setDeclarerMatchSave = async () => {
        this.setState({ refreshing: true });

        const setDeclarerMatchSave = await calendarEventHelper.postDeclarerMatch(
            this.state.userToken,
            this.state.idCompet, //pour tout

            this.state.param_idScore,
            this.state. userScore,

            this.state.param_idStatut,
            this.state.userStatut,

            this.state.param_idTempdejeu,
            this.state.userTempdejeu,

            this.state.param_idButs,
            this.state.userButs,

            this.state.param_idPasses,
            this.state.userPasses,

            this.state.param_idRouge,
            this.state.userRouge,

            this.state.param_idJaune,
            this.state.userJaune,

            this.state.param_idj18,
            this.state.j18

        );
       if(setDeclarerMatchSave){
           this.setState({ refreshing: false })
       }
    };

    getolddataandforeachit= async () => {
        this.setState({refreshing: true});
        const scoreParams = await calendarEventHelper.getScoreParams(this.state.userToken);
        if (scoreParams) {
            if(scoreParams.success === true) {
                this.setState({scoreParams: scoreParams});
                let idCompet = scoreParams.data[0].sport_id;
                // for(let i = 0; i < scoreParams.data.length; i++){
                //     idCompet = scoreParams.data[i]; //sure hoe mis data
                // }

                const competbyId = await calendarEventHelper.getCompetitionbyId(this.state.userToken, idCompet);
                if (competbyId) {
                    this.setState({refreshing: false, competbyId: competbyId});
                    let lenghtparams = competbyId.data.params.length;
                    let labels=[];
                    for(let j = 0; j<lenghtparams; j++){
                        if(labels.indexOf(competbyId.data.params[j].label) === -1) {
                            labels.push(competbyId.data.params[j].label);
                        }
                    }

                    let labels1 = {};
                    for(let k =0; k<labels.length; k++){
                        let values = [];
                        for(let l = 0; l<competbyId.data.params.length; l++){
                            if(labels[k] === competbyId.data.params[l].label){
                                // valu = {[labels[k]]:competbyId.data.params[l].value}
                                values.push(competbyId.data.params[l].value)
                            }
                        }
                        labels1[labels[k]]=values;
                        //
                        //      // console.warn(competbyId)
                    }
                    this.setState({labels:labels,labels1:labels1})
                    // console.warn('labels1',labels1)
                } else{
                    this.setState({refreshing: false})
                    //na goback
                }

            }}
    }


    render() {
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
                        <TouchableOpacity style={{
                            width: 40, height: 40, alignItems: "center",
                            justifyContent: "center"
                        }}
                            onPress={() => {
                                this.props.navigation.goBack()
                            }}>
                            <AutoHeightImage
                                width={20}
                                source={require("../../../../assets/icons/arrow-white.png")}
                                style={{
                                    transform: [
                                        { rotateY: "180deg" }
                                    ]
                                }} />
                        </TouchableOpacity>
                        <Text style={{
                            color: colors.white,
                            fontSize: 20
                        }}>
                            Déclarer un Match
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
                                {"Déclarer un Match"}
                            </Text>
                        </View>
                    </View> */}
                    <View style={[styles.noSelectedBtn]}>
                        <Image
                            // width={screenWidth * 0.1}
                            // source={require('../../../assets/icons/logo.match.png')}
                            style={{width: 35, height: 35, marginRight:10}}
                            source={{uri: this.state.competbyId !== null && this.state.competbyId.data.participant1_logo}}
                        />
                        <View style={{justifyContent:'center', alignSelf:'center'}}>
                            <Text style={[baseStyles.textColorWhite, {fontSize:16}]}>
                                {/*{" SMUC - OM ".toUpperCase() + " "}*/}
                                {this.state.competbyId != null && this.state.competbyId.data.participant1_name} - {this.state.competbyId != null && this.state.competbyId.data.participant2_name}
                            </Text>
                        </View>
                        <Image
                            // width={screenWidth * 0.1}
                            // source={require('../../../assets/icons/logo.match.png')}
                            style={{width: 35, height: 35,marginLeft:10,marginRight:5}}
                            source={{uri: this.state.competbyId !== null && this.state.competbyId.data.participant2_logo}}
                        />
                        <AutoHeightImage
                            width={12}
                            source={require('../../../../assets/icons/arrow-white.png')}
                            style={styles.imgTitle}
                        />
                    </View>
                    <View style={[styles.noSelectedBtn]}>
                        <View style={[styles.headCtn]}>
                            <Text style={[baseStyles.titleText]}>
                                {/*{"J 18 - 08/03/2019 "}*/}
                                {this.state.competbyId !== null && this.state.competbyId.data.params[7].value + '   '}
                                {this.state.competbyId != null && moment(this.state.competbyId.data.comp_date).format('DD/MM/YYYY')}
                            </Text>
                        </View>
                    </View>

                    {/*{this.state.labels.length > 0 && this.state.labels.map(*/}
                    {/*    (item) => (*/}
                    {/*        <View>*/}
                    {/*        <View style={[styles.sliderCtn]}>*/}
                    {/*            <View style={[styles.sliderTensionLabelG]}>*/}
                    {/*                <Text style={[baseStyles.textColorWhite]}>*/}
                    {/*                    {item}*/}
                    {/*                </Text>*/}
                    {/*            </View>*/}

                    {/*            {this.state.labels1 &&*/}
                    {/*                <TouchableOpacity*/}
                    {/*                    onPress={()=>{*/}
                    {/*                        this.setState({showModalForSelectValue:true,valeursaafficher:this.state.labels1[item]})*/}
                    {/*                    }}*/}
                    {/*                >*/}
                    {/*                <View style={[styles.sliderTensionLabelD]}>*/}
                    {/*                    <Text style={[baseStyles.textColorGrey]}>{this.state.labels1[item][0]}</Text>*/}
                    {/*                </View>*/}
                    {/*                </TouchableOpacity>*/}
                    {/*            }*/}
                    {/*        </View>*/}
                    {/*    < View style={styles.separator}></View>*/}
                    {/*    </View>)*/}
                    {/*    )}*/}

                    <View style={[styles.sliderCtn]}>
                        <View style={[styles.sliderTensionLabelG]}>
                            <Text style={[baseStyles.textColorWhite]}>Score</Text>
                        </View>
                        <View style={[styles.sliderTensionLabelD]}>

                            <Text style={[baseStyles.textColorGrey]}>{this.state.competbyId !== null && this.state.userScore}</Text>
                            {
                                this.state.isWritingScore ?
                                    <View>

                                    <View
                                        style={{
                                            position: "absolute",
                                            top: -23,
                                            right: 0,
                                            backgroundColor: colors.white,
                                            borderRadius: 5,
                                            zIndex: 999
                                        }}
                                    ><TextInput
                                        value={"0 - 0"}
                                        onChangeText={(text) => {
                                                this.setState({ userScore: text })
                                            }}
                                            keyboardAppearance={"default"}
                                            // keyboardType={"numeric"}
                                            style={{
                                                width: 120
                                            }}
                                            // autoFocus={true}
                                        />
                                    </View>
                                    </View>: null
                            }
                        </View>
                    </View>
                    <View style={styles.separator}></View>

                    <View style={[styles.sliderCtn]}>
                        <View style={[styles.sliderTensionLabelG]}>
                            <Text style={[baseStyles.textColorWhite]}>Statut</Text>
                        </View>
                        <View style={[styles.sliderTensionLabelD]}>

                                <Text style={[baseStyles.textColorGrey]}>{this.state.competbyId !== null && this.state.userStatut}</Text>
                            {
                                this.state.isWritingStatut ?
                                    <View>

                                        <View
                                            style={{
                                                position: "absolute",
                                                top: -23,
                                                right: 0,
                                                backgroundColor: colors.white,
                                                borderRadius: 5,
                                                zIndex: 999
                                            }}
                                        ><TextInput
                                            value={"Titulaire"}
                                            onChangeText={(text) => {
                                                this.setState({ userStatut: text })
                                            }}
                                            keyboardAppearance={"default"}
                                            // keyboardType={"numeric"}

                                            style={{
                                                width: 120
                                            }}
                                        />
                                        </View>
                                    </View>: null
                            }
                        </View>
                    </View>
                    <View style={styles.separator}></View>
                    <View style={[styles.sliderCtn]}>
                        <View style={[styles.sliderTensionLabelG]}>
                            <Text style={[baseStyles.textColorWhite]}>Temps de jeu</Text>
                        </View>
                        <View style={[styles.sliderTensionLabelD]}>

                                <Text style={[baseStyles.textColorGrey]}>{this.state.competbyId !== null && this.state.userTempdejeu+ ' '}{this.state.competbyId !== null && this.state.competbyId.data.params[1].unit}</Text>
                            {
                                this.state.isWritingTempdejeu ?
                                    <View>


                                        <View
                                            style={{
                                                position: "absolute",
                                                top: -23,
                                                right: 0,
                                                backgroundColor: colors.white,
                                                borderRadius: 5,
                                                zIndex: 999
                                            }}
                                        ><TextInput
                                            value={"90"}
                                            onChangeText={(text) => {
                                                this.setState({ userTempdejeu: text })
                                            }}
                                            keyboardAppearance={"default"}
                                            // keyboardType={"numeric"}

                                            style={{
                                                width: 120
                                            }}
                                        />
                                        </View>
                                    </View>: null
                            }
                        </View>
                    </View>
                    <View style={styles.separator}></View>
                    <View style={[styles.sliderCtn]}>
                        <View style={[styles.sliderTensionLabelG]}>
                            <Text style={[baseStyles.textColorWhite]}>Buts</Text>
                        </View>
                        <View style={styles.sliderTensionLabelD}>

                                <Text style={[baseStyles.textColorGrey]}>{this.state.competbyId !== null && this.state.userButs}</Text>
                            {
                                this.state.isWritingButs ?
                                    <View>


                                        <View
                                            style={{
                                                position: "absolute",
                                                top: -23,
                                                right: 0,
                                                backgroundColor: colors.white,
                                                borderRadius: 5,
                                                zIndex: 999
                                            }}
                                        ><TextInput
                                            value={"2"}
                                            onChangeText={(text) => {
                                                this.setState({ userButs: text })
                                            }}
                                            keyboardAppearance={"default"}
                                            // keyboardType={"numeric"}

                                            style={{
                                                width: 120
                                            }}
                                        />
                                        </View>
                                    </View>: null
                            }
                        </View>
                    </View>
                    <View style={styles.separator}></View>
                    <View style={[styles.sliderCtn]}>
                        <View style={[styles.sliderTensionLabelG]}>
                            <Text style={[baseStyles.textColorWhite]}>Passes</Text>
                        </View>
                        <View style={styles.sliderTensionLabelD}>

                                <Text style={[baseStyles.textColorGrey]}>{this.state.competbyId !== null && this.state.userPasses}</Text>
                            {
                                this.state.isWritingPasses ?
                                    <View>


                                        <View
                                            style={{
                                                position: "absolute",
                                                top: -23,
                                                right: 0,
                                                backgroundColor: colors.white,
                                                borderRadius: 5,
                                                zIndex: 999
                                            }}
                                        ><TextInput
                                            value={"0"}
                                            onChangeText={(text) => {
                                                this.setState({ userPasses: text })
                                            }}
                                            keyboardAppearance={"default"}
                                            // keyboardType={"numeric"}

                                            style={{
                                                width: 120
                                            }}
                                        />
                                        </View>
                                    </View>: null
                            }
                        </View>
                    </View>
                    <View style={styles.separator}></View>
                    <View style={[styles.sliderCtn]}>
                        <View style={[styles.sliderTensionLabelG]}>
                            <Text style={[baseStyles.textColorWhite]}>Carton rouge</Text>
                        </View>
                        <View style={styles.sliderTensionLabelD}>

                                <Text style={[baseStyles.textColorGrey]}>{this.state.competbyId !== null && this.state.userRouge}</Text>
                            {
                                this.state.isWritingRouge ?
                                    <View>


                                        <View
                                            style={{
                                                position: "absolute",
                                                top: -25,
                                                right: 0,
                                                backgroundColor: colors.white,
                                                borderRadius: 5,
                                                zIndex: 999
                                            }}
                                        ><TextInput
                                            value={"0"}
                                            onChangeText={(text) => {
                                                this.setState({ userRouge: text })
                                            }}
                                            keyboardAppearance={"default"}
                                            // keyboardType={"numeric"}

                                            style={{
                                                width: 120
                                            }}
                                        />
                                        </View>
                                    </View>: null
                            }
                        </View>
                    </View>
                    <View style={styles.separator}></View>

                    <View style={[styles.sliderCtn]}>
                        <View style={[styles.sliderTensionLabelG]}>
                            <Text style={[baseStyles.textColorWhite]}>Carton jaune</Text>
                        </View>
                        <View style={styles.sliderTensionLabelD}>

                                <Text style={[baseStyles.textColorGrey]}>{this.state.competbyId !== null && this.state.userJaune}</Text>
                            {
                                this.state.isWritingJaune ?
                                    <View>


                                        <View
                                            style={{
                                                position: "absolute",
                                                top: -30,
                                                right: 0,
                                                backgroundColor: colors.white,
                                                borderRadius: 5,
                                                zIndex: 999
                                            }}
                                        ><TextInput
                                            value={"0"}
                                            onChangeText={(text) => {
                                                this.setState({ userJaune: text })
                                            }}
                                            keyboardAppearance={"default"}
                                            // keyboardType={"numeric"}

                                            style={{
                                                width: 120
                                            }}
                                        />
                                        </View>
                                    </View>: null
                            }
                        </View>
                    </View>
                    <View style={[styles.separator, {height:0}]}></View>


                    <MAAButton text={"VALIDER"} width={(screenWidth - 100)} height={40}
                        onPress={() => {
                            console.log("Suivant")
                            this.setDeclarerMatchSave()
                        }}
                        style={[styles.btnValidate]} />

                </ScrollView>
                <Modal
                    visible={this.state.showModalForSelectValue}
                    onRequestClose={() => {
                        this.setState({ showModalForSelectValue: false })
                    }}
                    transparent={true}

                ><TouchableOpacity
                    onPress={() => {
                        this.setState({ showModalForSelectValue: false })
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
                    <View style={{
                        marginTop: screenHeight/2,
                        paddingTop:10,
                        paddingBottom:10,
                        borderRadius: 5,
                        alignSelf: "center",
                        justifySelf: "center",
                        transform:[{translateY:-(screenHeight/3)/2}],
                        maxHeight: screenHeight/3,
                        // minHeight: screenHeight - 60,
                        backgroundColor: colors.white,
                    }}>
                        <ScrollView>
                            {
                                this.state.valeursaafficher !== null && this.state.valeursaafficher.map((item, index) => {
                                    return (
                                        <TouchableOpacity
                                            onPress={()=> {
                                                this.setState({showModalForSelectValue:false})
                                                // hourselectionne:item,
                                            }}
                                            style={styles.anneePicker}>
                                            <Text style={{color:'white'}}>{item}</Text>
                                        </TouchableOpacity>
                                    );
                                })

                            }

                        </ScrollView>
                    </View>
                </Modal>
            </LinearGradient>
        )
    }
}

// export default AddTension;
const mapStateToProps = (state) => {
    const { selectedZone, userToken} = state.statedata
    return { selectedZone, userToken }
};

export default connect(mapStateToProps)(DeclarerMatch);
