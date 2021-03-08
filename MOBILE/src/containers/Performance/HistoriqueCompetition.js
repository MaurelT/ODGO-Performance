import React, { Component } from 'react';
import {
    Dimensions,
    StatusBar,
    TouchableOpacity,
    ScrollView,
    View,
    Text,
    Easing,
    ImageBackground, RefreshControl,Image
} from 'react-native';
import AutoHeightImage from 'react-native-auto-height-image';
import LinearGradient from 'react-native-linear-gradient';
import colors from '../../configs/colors';
import baseStyles from '../../base/BaseStyles';
import styles from './styles';
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


class HistoriqueCompetitionn extends Component {
    constructor(props) {
        super(props)
        this.state = {
            popToTop:this.props.popToTop,
            refreshing:false,
            userToken:props.userToken,
            competbyId:null,
        }



    }



    async componentDidMount() {


        this.circularProgress1.animate(0, 1000, Easing.quad);
        this.circularProgress2.animate(0, 1000, Easing.quad);
        this.circularProgress3.animate(0, 1000, Easing.quad);

        //this.getCompetitionbyId();
         this.setState({refreshing: true})
         const competbyId = await calendarEventHelper.getCompetitionbyId(this.state.userToken, this.props.navigation.state.params.id);
         if (competbyId) {
             this.setState({refreshing: false, competbyId: competbyId});

         }


    }



    getCompetitionbyId = async () => {
        this.setState({refreshing: true})
        const competbyId = await calendarEventHelper.getCompetitionbyId(this.state.userToken, 1);
        if (competbyId) {
            this.setState({refreshing: false,competbyId:competbyId});



            // if(this.circularProgress2 != null){
            //     this.circularProgress2.animate(50, 1000, Easing.quad);
            // }
            //
            // if(this.circularProgress3 != null){
            //     this.circularProgress3.animate(25, 1000, Easing.quad);
            // }
        }
    };



    _localday(){
        if(this.state.competbyId !== null){
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
        let arrayforprogress = [];
        // arrayforprogress = this.state.competbyId != null && this.state.competbyId.data.params.filter((item)=>{
        //     if(
        //         item.type !== "sanction_jaune" ||
        //         item.type !== "sanction_rouge" ||
        //         item.label !== "Titulaire / Remplaçant / Non sélectionné"
        //     ){
        //         return item;
        //     }
        // });
        let test = 'test';

        if(this.state.competbyId != null){
            if(this.state.competbyId.data !== null ) {
                test = this.state.competbyId.data.params;
                if (test !== 'test' && test !== undefined) {
                    console.warn('in marn',this.state.competbyId.data);
                    for (let i = 0; i < this.state.competbyId.data.params.length; i++) {
                        let item = this.state.competbyId.data.params[i];
                        if (
                            item.type != "sanction_jaune" &&
                            item.type != "sanction_rouge" &&
                            item.label != "Titulaire / Remplaçant / Non sélectionné" &&
                            item.code != "resultat" &&
                            item.label != "Poste joué"
                        ) {
                            arrayforprogress.push(item);
                        }
                    }
                }
            }
            console.warn("arrayforprogressy",arrayforprogress);
        }


        if(this.circularProgress1){
            this.circularProgress1.animate(  0, 1000, Easing.quad);
        }

        if(this.circularProgress2){
            this.circularProgress2.animate(  0, 1000, Easing.quad);
        }
        if(this.circularProgress3){
            this.circularProgress3.animate(  0, 1000, Easing.quad);
        }

            if(this.state.competbyId != null){

                        if (arrayforprogress.length >= 1) {
                            if (this.circularProgress1) {
                                if (this.circularProgress1 !== undefined) {
                                    try {
                                        this.circularProgress1.animate(arrayforprogress[0].percentage, 1000, Easing.quad);
                                    } catch (e) {}
                                }
                            }
                        }

                        if (arrayforprogress.length >= 1 && arrayforprogress.length <= 2) {
                            if (this.circularProgress2) {
                                if (this.circularProgress2 !== undefined) {
                                    try {
                                        this.circularProgress2.animate(arrayforprogress[1].percentage, 1000, Easing.quad);
                                    } catch (e) { }
                                }
                            }
                        }

                        if(arrayforprogress.length >= 1 && arrayforprogress.length <= 3){
                            if (this.circularProgress3) {
                                if (this.circularProgress3 !== undefined) {
                                    try {
                                        this.circularProgress3.animate(arrayforprogress[2].percentage, 1000, Easing.quad);
                                    } catch (e) { }
                                }
                            }
                        }



        }





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
                            {this.state.competbyId !== null && this.state.competbyId.data.name}
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
                            this.props.navigation.navigate('CalendarWithPluginCompetition');
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
                            <Image
                                // width={screenWidth * 0.1}
                                // source={require("../../assets/images/competition.png")}
                                style={{width: 35, height: 35}}
                                source={{uri: this.state.competbyId !== null && this.state.competbyId.data.participant1_logo}}
                            />
                            <Text style={[styles.textBold, { fontSize: 18 }]}>{this.state.competbyId !== null && this.state.competbyId.data.participant1_name}</Text>

                        </View>
                        <View style={{alignSelf: "center", marginLeft:-20 }}>
                            <Text style={[styles.textBold, { fontSize: 40 }]}> {test !== 'test' ? (this.state.competbyId !== null && (this.state.competbyId.data.params != null &&( this.state.competbyId.data.params.length > 0 && this.state.competbyId.data.params.map((item)=> item.code == "resultat" ? item.value : "")))):null}</Text>
                        </View>
                        <View style={{ alignItems: "center", alignSelf: "center" }}>
                            <Image
                                style={{width: 35, height: 35}}
                                source={{uri: this.state.competbyId !== null && this.state.competbyId.data.participant2_logo}}
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
                                <Text style={[styles.qtText, { color: colors.white, fontSize: 14 }]}>{this.state.competbyId !== null && ( arrayforprogress.length > 0  && arrayforprogress[0].label)}</Text>
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
                                                        <Text style={[styles.textBold, {}]}>{this.state.competbyId !== null && ( arrayforprogress.length > 0  && arrayforprogress[0].value)}</Text>
                                                        <Text style={[styles.qtText, { color: colors.white, fontSize:11,top:-4 }]}>{this.state.competbyId !== null && ( arrayforprogress.length > 0  && arrayforprogress[0].unit)}</Text>
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
                                <Text style={[styles.qtText, { color: colors.white, fontSize: 14 }]}>{this.state.competbyId !== null && ( arrayforprogress.length>0 && arrayforprogress[1].label)}</Text>
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

                                                }}>
                                                <View style={{ alignItems: "center" }}>
                                                    <Text style={[styles.textBold, {}]}>{this.state.competbyId !== null && (arrayforprogress.length>0 && arrayforprogress[1].value)}</Text>
                                                    <Text style={[styles.qtText, { color: colors.white, fontSize:11,top:-4 }]}>{this.state.competbyId !== null && ( arrayforprogress.length > 0  && arrayforprogress[1].unit)}</Text>
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
                                <Text style={[styles.qtText, { color: colors.white, fontSize: 14 }]}>{this.state.competbyId !== null && ( arrayforprogress.length>0 && arrayforprogress[2].label)}</Text>
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
                                                    <Text style={[styles.textBold, {}]}>{this.state.competbyId !== null && ( arrayforprogress.length>0 && arrayforprogress[2].value)}</Text>
                                                    <Text style={[styles.qtText, { color: colors.white, fontSize:11,top:-4 }]}>{this.state.competbyId !== null && ( arrayforprogress.length > 0  && arrayforprogress[2].unit)}</Text>
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


                            <ImageBackground
                                style={{width:screenWidth*0.07,height:screenWidth*0.1}}
                                width={screenWidth*0.07}
                                source={require("../../assets/images/carton_jaune.png")}
                            >
                                <Text style={[styles.qtText, { color: colors.white, fontSize:11,top:-4 }]}>{(test !== 'test' && test !== undefined) ? this.state.competbyId !== null &&  this.state.competbyId.data.params.map((item)=>{ if(item.type === "sanction_jaune"){return item.value}}) : null }</Text>
                            </ImageBackground>


                                <View style={{ margin: 5 }}>
                                    <ImageBackground
                                        style={{width:screenWidth*0.07,height:screenWidth*0.1}}
                                        width={screenWidth*0.07}
                                        source={require("../../assets/images/carton_rouge.png")}
                                    >
                                        <Text style={[styles.qtText, { color: colors.white, fontSize:11,top:-4 }]}>{(test !== 'test' && test !== undefined) ? this.state.competbyId !== null &&  this.state.competbyId.data.params.map((item)=>{ if(item.type === "sanction_rouge"){return item.value}}) : null}</Text>
                                    </ImageBackground>
                                    {/*<AutoHeightImage*/}
                                    {/*width={screenWidth*0.07}*/}
                                    {/*source={require("../../assets/images/carton_rouge.png")}*/}
                                    {/*/>*/}
                                </View>

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
    const { popToTop,userToken } = state.statedata
    return { popToTop,userToken }
};

export default connect(mapStateToProps)(HistoriqueCompetitionn);
