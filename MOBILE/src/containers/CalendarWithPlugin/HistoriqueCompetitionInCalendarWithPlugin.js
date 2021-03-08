import React, { Component } from 'react';
import {
    Dimensions,
    StatusBar,
    TouchableOpacity,
    ScrollView,
    View,
    Text,
    Easing,
    ImageBackground, RefreshControl
} from 'react-native';
import AutoHeightImage from 'react-native-auto-height-image';
import LinearGradient from 'react-native-linear-gradient';
import colors from '../../configs/colors';
import baseStyles from '../../base/BaseStyles';
import styles from './stylesHistoryqueCompet';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import {SET_POP_TO_TOP} from "../../redux/types/tabTypes";
import {connect} from "react-redux";
import AsyncStorage from "@react-native-community/async-storage";
import calendarEventHelper from "../../apis/helpers/calendarEvent_helper";
import moment from "moment";
import statusBarHeight from '../../configs/screen';

const screen = Dimensions.get('screen');
const SBHelight = statusBarHeight;
const screenWidth = screen.width;
const screenHeight = screen.height - SBHelight;


class HistoriqueCompetition extends Component {
    constructor(props) {
        super(props)
        this.state = {
            popToTop:this.props.popToTop,
            refreshing:false,
            userToken:null,
            competbyId:null,
        }
    }
    async componentDidMount() {
        this.circularProgress1.animate(75, 1000, Easing.quad);
        this.circularProgress2.animate(50, 1000, Easing.quad);
        this.circularProgress3.animate(25, 1000, Easing.quad);

        const userToken = await AsyncStorage.getItem("userToken")
        this.setState({ userToken });
        this.getCompetitionbyId()
    }

    getCompetitionbyId = async () => {
        this.setState({refreshing: true})
        const competbyId = await calendarEventHelper.getCompetitionbyId(this.state.userToken, this.props.navigation.state.params.id);
        if (competbyId) {
            this.setState({refreshing: false});
            this.setState({competbyId:competbyId});
            console.warn('props',this.props.navigation.state.params.id)
        }
    };



    _localday(){
        if(this.state.competbyId != null){
            switch (moment(this.state.competbyId.data.comp_date).days()) {
                case 0:
                    return 'Dimanche';
                    break;
                case 1:
                    return 'Lundi';
                    break;
                case 2:
                    return 'Mardi';
                    break;
                case 3:
                    return 'Mercredi';
                    break;
                case 4:
                    return 'Jeudi';
                    break;
                case 5:
                    return 'Vendredi';
                    break;
                case 6:
                    return 'Samedi';
                    break;
                default:
                    return null;
            }
        }else {
            return '';
        }
    }

    _localmonth(){
        if(this.state.competbyId !== null){
            switch (moment(this.state.competbyId.data.comp_date).month()) {
                case 0:
                    return 'Janvier';
                    break;
                case 1:
                    return 'Février';
                    break;
                case 2:
                    return 'Mars';
                    break;
                case 3:
                    return 'Avril';
                    break;
                case 4:
                    return 'Mai';
                    break;
                case 5:
                    return 'Juin';
                    break;
                case 6:
                    return 'Juillet';
                    break;
                case 7:
                    return 'Août';
                    break;
                case 8:
                    return 'Septembre';
                    break;
                case 9:
                    return 'Octobre';
                    break;
                case 10:
                    return 'Novembre';
                    break;
                case 11:
                    return 'Décembre';
                    break;

                default:
                    return null;
            }
        }else {
            return '';
        }
    }

    render() {
        if(this.props.popToTop === 'perfo'){
            this.props.navigation.popToTop();
            const setPopToTop = { type: SET_POP_TO_TOP, value: '' }
            this.props.dispatch(setPopToTop);
        }
        return (
            <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }} colors={[colors.balck, colors.green, colors.balck]} style={baseStyles.linearGradient}>
                <ScrollView
                    contentInsetAdjustmentBehavior="automatic"
                    style={styles.scrollView}
                    contentContainerStyle={[styles.contentContainerStyle]}
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.refreshing}
                            onRefresh={() => {
                                this.setState({ refreshing: true })
                                setTimeout(() => {
                                    console.log("Refresh finished.")
                                    this.setState({ refreshing: false })
                                }, 1000)
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
                        marginBottom:5
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
                                source={require("../../assets/icons/arrow-white.png")}
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
                            {console.warn(this.state.competbyId)}
                            {/*{this.state.competbyId != null && (this.state.competbyId.data.name != null && this.state.competbyId.data.name)}*/}
                        </Text>
                        <TouchableOpacity style={{
                            width: 40, height: 40, alignItems: "center",
                            justifyContent: "center", opacity: 0
                        }}>
                            <AutoHeightImage
                                width={20}
                                source={require("../../assets/icons/arrow-white.png")}
                                style={{
                                }} />
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity
                        onPress={()=>{
                            this.props.navigation.navigate('CalendarWithPlugin');
                        }}
                        style={{ alignItems: "center", marginBottom: 60 }}>
                        <Text style={{
                            color: colors.white,
                            fontSize: 18
                        }}>
                            { this._localday() + ' '}
                            {this.state.competbyId !== null && moment(this.state.competbyId.data.comp_date).format('DD ')}
                            { this._localmonth() + ' '}

                        </Text>
                    </TouchableOpacity>

                    <ImageBackground
                    style={{flex:1, padding:25}}
                    source={require("../../assets/images/fond.jpg")}>
                    <View style={{ alignSelf: "center", flexDirection: "row", justifyContent: "space-around", width: screenWidth * 0.85, alignItems: "center" }}>
                        <View style={{ alignItems: "center", alignSelf: "center" }}>
                            <AutoHeightImage
                                width={screenWidth * 0.1}
                                source={require("../../assets/images/competition.png")}
                            />
                            <Text style={[styles.textBold, { fontSize: 18 }]}>{this.state.competbyId !== null && this.state.competbyId.data.participant1_name}</Text>

                        </View>
                        <View style={{alignSelf: "center", marginLeft:-20 }}>
                            <Text style={[styles.textBold, { fontSize: 40 }]}> {this.state.competbyId !== null && this.state.competbyId.data.params[0].value}</Text>
                        </View>
                        <View style={{ alignItems: "center", alignSelf: "center" }}>
                            <AutoHeightImage
                                width={screenWidth * 0.1}
                                source={require("../../assets/images/Olympique.png")}
                            />
                            <Text style={[styles.textBold, { fontSize: 18 }]}> {this.state.competbyId !== null && this.state.competbyId.data.participant2_name} </Text>

                        </View>
                    </View>
                    </ImageBackground>

                    <View style={{ margin: 10 }}></View>

                    <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
                        <View style={[
                            // styles.outerProgress
                        ]}>
                            <View style={{ alignItems: "center", margin: 5 }}>
                                <Text style={[styles.qtText, { color: colors.white, fontSize: 14 }]}>{this.state.competbyId !== null && this.state.competbyId.data.params[1].label}</Text>
                            </View>
                            <AnimatedCircularProgress
                                ref={(ref) => this.circularProgress1 = ref}
                                size={screenWidth * 0.25}
                                width={5}
                                rotation={-360}
                                tintColor={colors.red}
                                lineCap={"round"}
                                style={{
                                    overflow: "hidden",
                                }}
                                backgroundColor="transparent"
                            >
                                {
                                    (fill) => (
                                        <ImageBackground
                                            style={{ width: screenWidth * 0.2, height: screenWidth * 0.2, alignItems: "center" }}
                                            source={require("../../assets/images/bb.png")}>
                                            <TouchableOpacity
                                                style={[styles.innerProgress, { alignItems: "center", justifyContent: "center", flex: 1 }]}
                                                onPress={() => {
                                                    // this.props.navigation.navigate("CompteurNutritionnel")
                                                }}>

                                                <View style={{ alignItems: "center" }}>
                                                    <Text style={[styles.textBold, {}]}>{this.state.competbyId !== null && this.state.competbyId.data.params[1].value}</Text>
                                                    {/* <Text style={[styles.mesureText]}>kcal</Text> */}
                                                    <Text style={[styles.qtText, { color: colors.white, fontSize:12 }]}>{this.state.competbyId !== null && this.state.competbyId.data.params[1].unit}</Text>
                                                </View>
                                            </TouchableOpacity>
                                        </ImageBackground>
                                    )
                                }
                            </AnimatedCircularProgress>

                        </View>
                        <View style={[
                            // styles.outerProgress
                        ]}>
                            <View style={{ alignItems: "center", margin: 5 }}>
                                <Text style={[styles.qtText, { color: colors.white, fontSize: 14 }]}>{this.state.competbyId !== null && this.state.competbyId.data.params[2].label}</Text>
                            </View>
                            <AnimatedCircularProgress
                                ref={(ref) => this.circularProgress2 = ref}
                                size={screenWidth * 0.25}
                                width={5}
                                rotation={-360}
                                tintColor={colors.red}
                                lineCap={"round"}
                                style={{
                                    overflow: "hidden",
                                }}
                                backgroundColor="transparent"
                            >
                                {
                                    (fill) => (
                                        <ImageBackground
                                            style={{ width: screenWidth * 0.2, height: screenWidth * 0.2, alignItems: "center" }}
                                            source={require("../../assets/images/bb.png")}>
                                            <TouchableOpacity
                                                style={[styles.innerProgress, { alignItems: "center", justifyContent: "center", flex: 1 }]}
                                                onPress={() => {
                                                    // this.props.navigation.navigate("CompteurNutritionnel")
                                                }}>

                                                <View style={{ alignItems: "center" }}>
                                                    <Text style={[styles.textBold, {}]}>{this.state.competbyId !== null && this.state.competbyId.data.params[2].value}</Text>
                                                    {/* <Text style={[styles.mesureText]}>kcal</Text> */}
                                                    {/* <Text style={[styles.qtText]}>min</Text> */}
                                                </View>
                                            </TouchableOpacity>
                                        </ImageBackground>
                                    )
                                }
                            </AnimatedCircularProgress>

                        </View>
                        <View style={[
                            // styles.outerProgress
                        ]}>
                            <View style={{ alignItems: "center", margin: 5 }}>
                                <Text style={[styles.qtText, { color: colors.white, fontSize: 14 }]}>{this.state.competbyId !== null && this.state.competbyId.data.params[3].label}</Text>
                            </View>
                            <AnimatedCircularProgress
                                ref={(ref) => this.circularProgress3 = ref}
                                size={screenWidth * 0.25}
                                width={5}
                                rotation={-360}
                                tintColor={colors.red}
                                lineCap={"round"}
                                style={{
                                    overflow: "hidden",
                                }}
                                backgroundColor="transparent"
                            >
                                {
                                    (fill) => (
                                        <ImageBackground
                                            style={{ width: screenWidth * 0.2, height: screenWidth * 0.2, alignItems: "center" }}
                                            source={require("../../assets/images/bb.png")}>
                                            <TouchableOpacity
                                                style={[styles.innerProgress, { alignItems: "center", justifyContent: "center", flex: 1 }]}
                                                onPress={() => {
                                                    // this.props.navigation.navigate("CompteurNutritionnel")
                                                }}>

                                                <View style={{ alignItems: "center" }}>
                                                    <Text style={[styles.textBold, {}]}>{this.state.competbyId !== null && this.state.competbyId.data.params[3].value}</Text>
                                                    {/* <Text style={[styles.mesureText]}>kcal</Text> */}
                                                    {/* <Text style={[styles.qtText]}>min</Text> */}
                                                </View>
                                            </TouchableOpacity>
                                        </ImageBackground>
                                    )
                                }
                            </AnimatedCircularProgress>

                        </View>
                    </View>
                    <View style={{ alignItems: "center", margin: 10 }}>
                        <View style={{ alignItems: "center", margin: 5 }}>
                            <Text style={[styles.textBold, { fontSize: 16 }]}> Mes Cartons </Text>
                        </View>
                        <View style={{ alignItems: "center", flexDirection: "row" }}>
                            {this.state.competbyId !== null && (this.state.competbyId.data.params[4].value === 'yellow' ?
                            <AutoHeightImage
                                width={20}
                                source={require("../../assets/images/carton_jaune.png")}
                            /> :
                                    <AutoHeightImage
                                        width={20}
                                        source={require("../../assets/images/carton_rouge.png")}
                                 />
                            )}

                            {this.state.competbyId !== null && (this.state.competbyId.data.params[5].value === 'red' ?
                                <View style={{ margin: 5 }}>

                                    <AutoHeightImage
                                    width={20}
                                    source={require("../../assets/images/carton_rouge.png")}
                                    />
                                </View> :
                                    <View style={{ margin: 5 }}>

                                        <AutoHeightImage
                                            width={20}
                                            source={require("../../assets/images/carton_jaune.png")}
                                        />
                                    </View>
                            )}

                        </View>

                    </View>

                    <View style={{ margin: 20 }}></View>

                </ScrollView>
            </LinearGradient>
        )
    }
}

// export default HistoriqueCompetition;
const mapStateToProps = (state) => {
    const { popToTop } = state.statedata
    return { popToTop }
};

export default connect(mapStateToProps)(HistoriqueCompetition);
