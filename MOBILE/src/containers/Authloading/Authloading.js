import React, { Fragment, Component } from 'react';
import { connect } from 'react-redux';
import {
    SafeAreaView,
    ScrollView,
    View,
    Text,
    Dimensions,
    TouchableOpacity,
    StatusBar,
    Animated,
    Easing,
    TextInput,
    RefreshControl,
    Alert,
} from 'react-native';
import NetInfo from "@react-native-community/netinfo";
import AsyncStorage from '@react-native-community/async-storage';
import LinearGradient from 'react-native-linear-gradient';
import Loading from '../../components/Load/loading';
import colors from '../../configs/colors';
import styles from './styles';
import {
    SET_ACTIVE_TAB,
    SET_USER_TOKEN,
    SET_ISVENU_DONNEPERSO,
    SET_IS_CONECTED,
    SET_USER_DROIT,
} from '../../redux/types/tabTypes';
import statusBarHeight from '../../configs/screen';
import PersonalDataHelper from '../../apis/helpers/person_data_helper';
import {unsubscribe,MiniOfflineSign} from '../../apis/FonctionRedondant';

const screen = Dimensions.get("window");
const SBHelight = statusBarHeight;
const screenWidth = screen.width
const screenHeight = screen.height - SBHelight




class Authloading extends Component {

    constructor(props) {
        super(props)
        this.state = {
            loading: true,
            //fantatro probleme loading a l'infini, ndraindray io, asiako redux na state eto, false de checkena ref mis internet de averina false ref mahazo
        }
    }




    async componentDidMount(){
       // await AsyncStorage.setItem("userToken", "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjg2LCJleHAiOjE1OTc1MjI2Mjd9.VBgzZpQL47K3i-5HfGIhaCJzl8SBtyuM_LvCjkRQuCM"); // miditra io a
        this.checkUserToken();
        unsubscribe(NetInfo,this.props);
        setTimeout(()=>{
            this.props.isConnected && this.checkUserToken();
        },5000)
        // NetInfo.fetch().then(state => {
        //     console.warn("hohoy Connection type", state.type);
        //     console.warn("hohoy is connec?", state.isConnected);
        // });
    }



    getUserData = async (token) => {
        this.setState({ refreshing: true });
        const userData = await PersonalDataHelper.getUserData(token);
        if(userData.message){
            return "token expired";

        }
        else if(userData.success == true && userData.data.is_premiere_connexion !== true){

            const userData = await PersonalDataHelper.getUserData(token);
            if(userData.success == true  && userData.data.is_premiere_connexion !== true  ) {
                const droits = await PersonalDataHelper.getDroits(token);
                if (droits) {
                    if (droits.success === true) {
                        const setdroits = {type: SET_USER_DROIT, value: droits.data};
                        this.props.dispatch(setdroits);
                    } else {
                        const setdroits = {type: SET_USER_DROIT, value: []};
                        this.props.dispatch(setdroits);
                    }
                }
            }
            return userData;
        } else {
            return null;
            this.setState({ refreshing: false });

        }

    };

    checkUserToken = async () => {
        const userToken = await AsyncStorage.getItem("userToken");
        console.log(userToken)
        if (userToken) {
            this.getUserData(userToken).then((retour)=>{
                if(retour === "token expired"){
                    const setActiveTab = { type: SET_ACTIVE_TAB, value: "" };
                    this.props.dispatch(setActiveTab);
                    this.setState({ refreshing: false });
                    this.props.navigation.navigate("LogedoutNavigator")
                }else if(retour === null){
                    const isvenudonneperso = { type: SET_ISVENU_DONNEPERSO, value: true };
                    this.props.dispatch(isvenudonneperso);
                    const setActiveTab = { type: SET_ACTIVE_TAB, value: "DonneesPerso" };
                    this.props.dispatch(setActiveTab);
                    //this.props.navigation.navigate("DonneesPerso")
                    this.props.navigation.navigate("LogedinNavigator");
                    this.setState({ refreshing: false });
                }else{
                    const isvenudonneperso = { type: SET_ISVENU_DONNEPERSO, value: false };
                    this.props.dispatch(isvenudonneperso);
                    const setActiveTab = { type: SET_ACTIVE_TAB, value: "home" };
                    this.props.dispatch(setActiveTab);
                    this.props.navigation.navigate("LogedinNavigator");
                    this.setState({ refreshing: false });

                }
            });
            const droits = await PersonalDataHelper.getDroits(userToken);
            if(droits) {
                if (droits.success === true) {
                    const setdroits = {type: SET_USER_DROIT, value: droits.data};
                    this.props.dispatch(setdroits);
                } else {
                    const setdroits = {type: SET_USER_DROIT, value: []};
                    this.props.dispatch(setdroits);
                }
            }
            const setUserTokenAction = {type: SET_USER_TOKEN, value: userToken};
            this.props.dispatch(setUserTokenAction)
        } else {
            const setActiveTab = { type: SET_ACTIVE_TAB, value: "" };
            this.props.dispatch(setActiveTab);
            this.props.navigation.navigate("LogedoutNavigator")
            this.setState({ refreshing: false });

        }
        // this.setState({loading: false})
    };

    render() {

        return (
            <Fragment>
                {Platform.OS==='ios'? 
                <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }} colors={[colors.balck, colors.green, colors.balck]} style={{minHeight: screenHeight,
                    height:"100%",
                    alignItems: "center",
                    paddingBottom: 50,
                    paddingTop: 30,
                    justifyContent: "space-between"}}>
                <Loading load={this.state.loading} />
                </LinearGradient>
                :
                <SafeAreaView>
                    <Loading load={this.state.loading} />
                    <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }} colors={[colors.balck, colors.green, colors.balck]} style={styles.linearGradient}>

                    </LinearGradient>
                </SafeAreaView>}
                { !this.props.isConnected &&
                <View style={{marginTop:0,position:'relative',top:-screenHeight}}>
                    <MiniOfflineSign />
                </View>
                }
            </Fragment>
        )
    }
}

const mapStateToProps = (state) => {
    const { userToken,isConnected } = state.statedata
    return { userToken,isConnected }
};

export default connect(mapStateToProps)(Authloading);
