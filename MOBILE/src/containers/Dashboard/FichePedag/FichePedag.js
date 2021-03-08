import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    Dimensions,
    StatusBar,
    TouchableOpacity,
    ScrollView,
    View,
    Text
} from 'react-native';
import AutoHeightImage from 'react-native-auto-height-image';
import LinearGradient from 'react-native-linear-gradient';
import colors from '../../../configs/colors';
import baseStyles from '../../../base/BaseStyles';
import styles from './styles';
import {
    SET_ACTIVE_FP,
    SET_ACTIVE_TAB, SET_ACTIVE_TABMENU_CARNET,
    SET_ACTIVE_TABMENU_MYENERGY,
    SET_ISVENU_DONNEPERSO,
} from '../../../redux/types/tabTypes';
import statusBarHeight from '../../../configs/screen';
import AsyncStorage from '@react-native-community/async-storage';

const screen = Dimensions.get('screen');
const SBHelight = statusBarHeight;
const screenWidth = screen.width
const screenHeight = screen.height - SBHelight


class FichePedag extends Component {

    constructor(props) {
        super(props)
        this.state = {}
    }

    //
    // componentWillUnmount(){
    //     const setActiveFPAction = {type: SET_ACTIVE_FP, value: null}
    //     this.props.dispatch(setActiveFPAction)
    // }

    componentDidMount() {
        const setActiveFPAction = { type: SET_ACTIVE_FP, value: null }
        this.props.dispatch(setActiveFPAction)
    }

    render() {
        let isrestrictget_testing = false;
        if(this.props.droits.length>0){
            for(let i = 0; i < this.props.droits.length; i++){
                if(this.props.droits[i].name === "get_testing"){
                    isrestrictget_testing = this.props.droits[i].is_restrict;
                    break;
                }
            }
        }
        return (
            <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }} colors={[colors.balck, colors.green, colors.balck]} style={baseStyles.linearGradient}>
                <ScrollView
                    contentInsetAdjustmentBehavior="automatic"
                    style={styles.scrollView}
                    contentContainerStyle={[styles.contentContainerStyle]}>

                    <View style={{
                        alignSelf: "flex-start",
                        width: screenWidth,
                        alignItems: "center",
                        justifyContent: "space-between",
                        padding: 15,
                        paddingLeft: 0,
                        paddingRight: 0,
                        // backgroundColor: colors.balck,
                        flexDirection: "row"
                    }}>
                        <TouchableOpacity style={{width: 40, height: 40, alignItems: "center",
                        justifyContent: "center"}}
                        onPress={()=>{
                            // this.props.navigation.goBack()
                            const setActiveTab = { type: SET_ACTIVE_TAB, value: "home" }
                            this.props.dispatch(setActiveTab);
                        }}>
                            <AutoHeightImage
                                width={20}
                                source={require("../../../assets/icons/arrow-white.png")}
                                style={{
                                    transform: [
                                        {rotateY: "180deg"}
                                    ],marginLeft:20
                                }} />
                        </TouchableOpacity>
                        <Text style={{
                            color: colors.white,
                            fontSize: 20
                        }}>
                            Fiche pédagogique
                        </Text>
                        <TouchableOpacity style={{width: 40, height: 40, alignItems: "center",
                        justifyContent: "center", opacity: 0}}>
                            <AutoHeightImage
                                width={20}
                                source={require("../../../assets/icons/arrow-white.png")}
                                style={{}} />
                        </TouchableOpacity>
                    </View>

                    <View style={[styles.btnCtn]}>

                        <TouchableOpacity
                            onPress={()=>{
                                global.is_venudedonneperso = true;
                                const isvenudonneperso = { type: SET_ISVENU_DONNEPERSO, value: false };
                                this.props.dispatch(isvenudonneperso);
                                const setActiveTab = { type: SET_ACTIVE_TAB, value: "DonneesPerso" };
                                this.props.dispatch(setActiveTab);
                                 this.props.navigation.navigate('AppScreen');
                                //this.props.navigation.navigate("DonneesPerso")
                                const setActiveFPAction = {type: SET_ACTIVE_FP, value: 1};
                                this.props.dispatch(setActiveFPAction)
                            }}
                        >
                            <View style={[styles.ctnMenu]}>
                                <AutoHeightImage
                                    width={17}
                                    source={require("../../../assets/icons/clipboard.white.png")}
                                    style={[styles.iconBtn]} />
                                <Text style={[styles.btnMenuText]}>Mes données personnelles</Text>
                                <AutoHeightImage
                                    width={15}
                                    source={require("../../../assets/icons/arrow-white.png")}
                                    style={[styles.iconArrow]} />
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={()=>{
                                global.is_venudedonneperso = false;
                                const setActive = { type: SET_ACTIVE_TABMENU_MYENERGY, value: 1 };
                                this.props.dispatch(setActive);
                                this.props.navigation.navigate("MyEnergy")
                                const setActiveFPAction = {type: SET_ACTIVE_FP, value: 2}
                                this.props.dispatch(setActiveFPAction)
                            }}
                        >
                            <View style={[styles.ctnMenu]}>
                                <AutoHeightImage
                                    width={15}
                                    source={require("../../../assets/icons/path.white.png")}
                                    style={[styles.iconBtn]} />
                                <Text style={[styles.btnMenuText]}>Mon énergie</Text>
                                <AutoHeightImage
                                    width={15}
                                    source={require("../../../assets/icons/arrow-white.png")}
                                    style={[styles.iconArrow]} />
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={()=>{
                            global.is_venudedonneperso = false;
                            this.props.navigation.navigate("Masemaine")}}>
                            <View style={[styles.ctnMenu]}>
                                <AutoHeightImage
                                    width={17}
                                    source={require("../../../assets/icons/plan.white.png")}
                                    style={[styles.iconBtn]} />
                                <Text style={[styles.btnMenuText]}>Mon planning</Text>
                                <AutoHeightImage
                                    width={15}
                                    source={require("../../../assets/icons/arrow-white.png")}
                                    style={[styles.iconArrow]} />
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={async()=>{
                                global.is_venudedonneperso = false;
                                const setActive = { type: SET_ACTIVE_TABMENU_CARNET, value: 1 };
                                await this.props.dispatch(setActive);
                                this.props.navigation.navigate("Carnet")
                                const setActiveFPAction = {type: SET_ACTIVE_FP, value: 4}
                                this.props.dispatch(setActiveFPAction)
                            }}
                        >
                            <View style={[styles.ctnMenu]}>
                                <AutoHeightImage
                                    width={17}
                                    source={require("../../../assets/icons/carnet.adress.png")}
                                    style={[styles.iconBtn]} />
                                <Text style={[styles.btnMenuText]}>Mon carnet de santé</Text>
                                <AutoHeightImage
                                    width={15}
                                    source={require("../../../assets/icons/arrow-white.png")}
                                    style={[styles.iconArrow]} />
                            </View>
                        </TouchableOpacity>

                        {!isrestrictget_testing ? <TouchableOpacity
                        onPress={()=>{
                            global.is_venudedonneperso = false;
                            this.props.navigation.navigate("MonPhysique")
                            const setActiveFPAction = {type: SET_ACTIVE_FP, value: 5}
                            this.props.dispatch(setActiveFPAction)
                        }}
                        >
                            <View style={{ borderWidth: 1,
                                borderColor: colors.white,
                                borderRadius: 10,
                                flexDirection: "row",
                                padding: 30,
                                alignItems: "center",
                                justifyContent: "flex-start",
                                width: (screenWidth - 30),
                                marginTop: 5,
                                marginBottom: 5}}>
                                <AutoHeightImage
                                    width={22}
                                    source={require("../../../assets/icons/runer.white.png")}
                                    style={[styles.iconBtn]} />
                                <Text style={[styles.btnMenuText]}>Mon physique</Text>
                                <AutoHeightImage
                                    width={15}
                                    source={require("../../../assets/icons/arrow-white.png")}
                                    style={{ position: "absolute",
                                        right: 30}} />
                            </View>
                        </TouchableOpacity>
                        :
                            <View

                            >
                                <View style={{ borderWidth: 1,
                                    borderColor: colors.grisee,
                                    borderRadius: 10,
                                    flexDirection: "row",
                                    padding: 30,
                                    alignItems: "center",
                                    justifyContent: "flex-start",
                                    width: (screenWidth - 30),
                                    marginTop: 5,
                                    marginBottom: 5}}>
                                    <AutoHeightImage
                                        width={22}
                                        source={require("../../../assets/icons/runer.white.png")}
                                        style={[styles.iconBtn,{tintColor:colors.textgrisee}]} />
                                    <Text style={[styles.btnMenuText,{color:colors.textgrisee}]}>Mon physique</Text>
                                    <AutoHeightImage
                                        width={15}
                                        source={require("../../../assets/icons/arrow-white.png")}
                                        style={{ position: "absolute",tintColor:colors.textgrisee,
                                            right: 30}} />
                                </View>
                            </View>
                        }

                        {/*<TouchableOpacity*/}
                        {/*    onPress={() => {*/}
                        {/*        this.props.navigation.navigate("DeclarerMatch")*/}
                        {/*    }}*/}
                        {/*>*/}
                        {/*    <View style={[styles.ctnMenu]}>*/}
                        {/*        <AutoHeightImage*/}
                        {/*            width={23}*/}
                        {/*            source={require("../../../assets/icons/sports-and-competition.png")}*/}
                        {/*            style={[styles.iconBtn]} />*/}
                        {/*        <Text style={[styles.btnMenuText]}>Déclarer un match</Text>*/}
                        {/*        <AutoHeightImage*/}
                        {/*            width={15}*/}
                        {/*            source={require("../../../assets/icons/arrow-white.png")}*/}
                        {/*            style={[styles.iconArrow]} />*/}
                        {/*    </View>*/}
                        {/*</TouchableOpacity>*/}

                        <View
                            onPress={() => {
                                const setActiveTabAction = { type: SET_ACTIVE_TAB, value: "message" }
                                this.props.dispatch(setActiveTabAction)
                            }}
                        >
                            <View style={[{  borderWidth: 2,
                                borderRadius: 10,
                                flexDirection: "row",
                                padding: 30,
                                alignItems: "center",
                                justifyContent: "flex-start",
                                width: (screenWidth - 30),
                                marginTop: 5,
                                marginBottom: 5,borderColor:colors.grisee}]}>
                                <AutoHeightImage
                                    width={23}
                                    source={require("../../../assets/icons/chat.white.png")}
                                    style={{ marginRight: 20,tintColor:colors.textgrisee}} />
                                <View style={{flexDirection:'row',alignItems:'center'}}>
                                    <Text style={{ color: colors.textgrisee}}>Message</Text>
                                    <Text style={[{color:colors.textgrisee,fontSize:11,fontStyle:'italic'}]} > (bientôt disponible)</Text>
                                </View>
                                <AutoHeightImage
                                    width={15}
                                    source={require("../../../assets/icons/arrow-white.png")}
                                    style={{position: "absolute",
                                        right: 30,tintColor:colors.textgrisee}} />
                            </View>
                        </View>

                        <TouchableOpacity
                            onPress={() => {
                                this.props.navigation.navigate("Settings")
                            }}
                        >
                            <View style={[styles.ctnMenu]}>
                                <AutoHeightImage
                                    width={22}
                                    source={require("../../../assets/icons/settings.white.png")}
                                    style={[styles.iconBtn]} />
                                <Text style={[styles.btnMenuText]}>Paramètres</Text>
                                <AutoHeightImage
                                    width={15}
                                    source={require("../../../assets/icons/arrow-white.png")}
                                    style={[styles.iconArrow]} />
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={ async () => {
                                this.props.navigation.navigate("LogedoutNavigator")
                                const setActiveTab = { type: SET_ACTIVE_TAB, value: "deco" };
                                await this.props.dispatch(setActiveTab);
                                const removeToken = await AsyncStorage.removeItem('userToken');
                                await AsyncStorage.removeItem('userToken');
                            }}
                        >
                            <View style={[styles.ctnMenu]}>
                                <AutoHeightImage
                                    width={22}
                                    source={require("../../../assets/icons/logout.png")}
                                    style={[styles.iconBtn]} />
                                <Text style={[styles.btnMenuText]}>Déconnexion</Text>
                                <AutoHeightImage
                                    width={15}
                                    source={require("../../../assets/icons/arrow-white.png")}
                                    style={[styles.iconArrow]} />
                            </View>
                        </TouchableOpacity>

                    </View>

                </ScrollView>
            </LinearGradient>
        )
    }
}

// export default FichePedag;
const mapStateToProps = (state) => {
    const { isFichePedag,droits } = state.statedata
    return { isFichePedag,droits }
};

export default connect(mapStateToProps)(FichePedag);
