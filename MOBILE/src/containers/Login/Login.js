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
    Modal,
    AccessibilityInfo
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import styles from '../Login/styles';
import MAAButton from '../../components/MAAButton/MAAButton';
import colors from '../../configs/colors';
import baseStyles from '../../base/BaseStyles';
import MAAInputText from '../../components/MAAInputText/MAAInputText';
import AutoHeightImage from 'react-native-auto-height-image';
import AuthHelper from '../../apis/helpers/auth_helper';
import Loading from '../../components/Load/loading';
import { SET_ISVENU_DONNEPERSO, SET_USER_TOKEN, SET_USER_PASSWORD, SET_USER_PSEUDO, SET_USER_DROIT } from '../../redux/types/tabTypes';
import { SET_ACTIVE_TAB } from '../../redux/types/tabTypes';
import { validators } from '../../apis/validators';
import statusBarHeight from '../../configs/screen';
import PersonalDataHelper from '../../apis/helpers/person_data_helper';
import moment from 'moment';
import { MiniOfflineSign, unsubscribe } from '../../apis/FonctionRedondant';
import DeclarerCompetition from '../Dashboard/FichePedag/DonneesPerso/DeclarerCompetition';
import NetInfo from '@react-native-community/netinfo';
//const { navigation } = this.props;
import AsyncStorage from '@react-native-community/async-storage';


const screen = Dimensions.get("window");
const SBHelight = statusBarHeight;
const screenWidth = screen.width
const screenHeight = Platform.OS === 'ios' ? screen.height : screen.height - SBHelight

class Login extends Component {

    textAnimationValue = new Animated.Value(0)

    constructor(props) {
        super(props);
        this.state = {
            refreshing: false,
            loading: false,
            animateText: 0,
            // user_pseudo: this.props.user_pseudo,
            // user_passwd: this.props.user_password,
            testEmail: 0,
            testMdp: false,
            pprop: props,
            showDescription: false,
            descriptionToShaow: '',
            checked: false,
        }
    }

    animateClickedText = () => {
        this.textAnimationValue.setValue(0)
        Animated.spring(
            this.textAnimationValue,
            {
                toValue: 1,
                friction: 3
            }
        )
            .start(() => {
            })
    }

    _setUserPseudo = (text) => {
        //this.setState({ user_pseudo: text.toLowerCase() })
        const setuserpass = { type: SET_USER_PSEUDO, value: text.toLowerCase() };
        this.props.dispatch(setuserpass);
    }

    _setUserPasswd = (text) => {
        // this.setState({ user_passwd: text })
        const setuserpass = { type: SET_USER_PASSWORD, value: text };
        this.props.dispatch(setuserpass);
    }

    // getUserToken = async () => {
    //     console.log("Getting token ... ")
    //     let userToken = await (await AuthHelpr._getToken(this.state.user_pseudo, this.state.user_passwd)).json()
    //     console.log("Resultat : ")
    //     console.log(JSON.stringify(userToken))
    // }

    async storePassword(value) {
        try {
            await AsyncStorage.setItem("password", value === null ? "" : value);
        } catch (error) {
            console.warn('error', error);
        }
    }

    async retrievePassword() {
        try {
            return await AsyncStorage.getItem("password");
        } catch (error) {
            console.warn('error retrieve', error);
        }
    }

    async storeCheckbox(value) {
        try {
            await AsyncStorage.setItem("checkbox", value === null ? "" : value);
        } catch (error) {
            console.warn('error', error);
        }
    }

    async retrieveCheckbox() {
        try {
            return await AsyncStorage.getItem("checkbox");
        } catch (error) {
            console.warn('error retrieve', error);
        }
    }

    async storeLogin(value) {
        console.warn(value)

        try {
            await AsyncStorage.setItem("login", value === null ? "" : value);
        } catch (error) {
        }
    }

    async retrieveLogin() {
        try {
            return await AsyncStorage.getItem("login");
        } catch (error) {
            alert(error);
        }
    }


    getUserData = async (token) => {
        this.setState({ refreshing: true });
        const userData = await PersonalDataHelper.getUserData(token);
        console.warn('aaa', userData.data.is_premiere_connexion);
        if (userData.success == true && userData.data.is_premiere_connexion !== true) {
            const droits = await PersonalDataHelper.getDroits(token);
            if (droits) {
                if (droits.success === true) {
                    const setdroits = { type: SET_USER_DROIT, value: droits.data };
                    this.props.dispatch(setdroits);
                } else {
                    const setdroits = { type: SET_USER_DROIT, value: [] };
                    this.props.dispatch(setdroits);
                }
            }

            return userData;
        } else {
            this.setState({ refreshing: false });
            return null;
        }
    };

    componentDidMount() {
        StatusBar.setHidden(false);

        unsubscribe(NetInfo, this.props);
        this.retrieveLogin().then(value => {
            // this.setState({ user_pseudo: value });
            const setuser = { type: SET_USER_PSEUDO, value: value };
            this.props.dispatch(setuser);
        });

        this.retrievePassword().then(value => {
            // this.setState({ user_passwd: value });
            const setuserpass = { type: SET_USER_PASSWORD, value: value };
            this.props.dispatch(setuserpass);
            if (this.props.user_password !== "" && this.props.user_password !== null && this.props.user_password !== undefined) {
                this.setState({ checked: true });
            }
        });



    }

    _onValid = async () => {
        this.setState({ loading: true });
        let email = this.props.user_pseudo;
        let password = this.props.user_password;
        if (!this.state.checked) {
            await this.storePassword("");
            await this.storeLogin("");
        }
        if (email == "") {
            this.setState({ loading: false });
            this.setState({ testEmail: 1 });
            this.setState({ testMdp: false })
            // Alert.alert("Odgo", "L'adresse email est vide.")
        }
        else if (password == "") {
            this.setState({ loading: false });
            this.setState({ testEmail: 0 });
            this.setState({ testMdp: true })
            //   Alert.alert("Odgo", "Le mot de passe est vide.")
        } else if (!validators.validateEMail(email)) {
            this.setState({ testEmail: 2 });
            this.setState({ testMdp: false });
            this.setState({ loading: false })
        } else {
            this.setState({ testEmail: 0 });
            this.setState({ testMdp: false });
            setTimeout(() => {
                this.setState({ loading: false });
            }, 5000)

            let response = await AuthHelper.getAuth(email, password);
            this.setState({ loading: false });
            if (response.message) {
                console.warn('response auth', response);
                this.setState({ loading: false });
                Alert.alert('Odgo', response.message.toString())
            } else if (response.success == false) {
                this.setState({ loading: false, showDescription: true, descriptionToShaow: response.error_msg[0].toString() });
                //Alert.alert("information", response.error_msg[0].toString())

            } else if (response.success == true) {
                if (this.state.checked) {
                    this.storePassword(password);
                    this.storeLogin(email);
                    const setuserpass = { type: SET_USER_PASSWORD, value: password };
                    this.props.dispatch(setuserpass);
                    const setuserpseudo = { type: SET_USER_PSEUDO, value: email };
                    this.props.dispatch(setuserpseudo);
                }
                //this.storeCheckbox('' + this.state.checked + '');
                this.setState({ loading: false });
                const setUserTokenAction = { type: SET_USER_TOKEN, value: response.data.token };
                this.props.dispatch(setUserTokenAction);
                await AsyncStorage.setItem("userToken", response.data.token); // miditra io a
                this.getUserData(response.data.token).then((retour) => {
                    if (retour == null) {
                        const isvenudonneperso = { type: SET_ISVENU_DONNEPERSO, value: true };
                        this.props.dispatch(isvenudonneperso);
                        const setActiveTab = { type: SET_ACTIVE_TAB, value: "DonneesPerso" };
                        this.props.dispatch(setActiveTab);
                        this.props.navigation.navigate("LogedinNavigator")
                    } else {
                        const isvenudonneperso = { type: SET_ISVENU_DONNEPERSO, value: false };
                        this.props.dispatch(isvenudonneperso);
                        const setActiveTab = { type: SET_ACTIVE_TAB, value: "home" };
                        this.props.dispatch(setActiveTab); //nis await teto talohan nidiran tato
                        this.props.navigation.navigate("LogedinNavigator")
                    }
                });
            }

        }
    }

    render() {

        const textAnime = this.textAnimationValue.interpolate({
            inputRange: [0, 0.5, 1],
            outputRange: [14, 20, 14]
        })
        return (
            <View style={{ flex: 1 }}>
                <StatusBar hidden={true} />
                <Loading load={this.state.loading} />
                <View style={{}}>
                    <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }} colors={[colors.balck, colors.green, colors.balck]} style={{
                        minHeight: screenHeight,
                        height: "100%",
                        alignItems: "center",
                        paddingBottom: 50,
                        paddingTop: 30,
                        justifyContent: "space-between"
                    }}>
                        <View style={[baseStyles.loginHeader,{top:60}]}>
                            {/* <View style={[baseStyles.odgoDot]}></View>
                                <Text style={[baseStyles.odgoTextTitle]}>ODGO</Text>
                                <View style={[baseStyles.odgoDot]}></View> */}
                            <AutoHeightImage
                                width={screenWidth - 30}
                                // style={{height: screenWidth/2 - 90}}
                                source={require('../../assets/images/logoRedDot.png')} />
                        </View>

                        <View style={{ width: (screenWidth - 80), alignSelf: "center" }} >
                            <MAAInputText placeholder={"E-MAIL"}
                                textContentType={"emailAddress"}
                                keyboardType={"email-address"}
                                onChangeText={(text) => {
                                    this._setUserPseudo(text)
                                }}
                                valueemail={this.props.user_pseudo}
                                style={
                                    [(this.state.testEmail === 1 || this.state.testEmail === 2) ?
                                        { borderColor: colors.red } :
                                        { borderColor: colors.white }]
                                }
                            />


                            {this.state.testEmail === 1 ?
                                <Text style={{ color: colors.red, fontSize: 12, alignItems: "center" }}>Adresse e-mail manquante.</Text> :
                                null
                            }
                            {this.state.testEmail === 2 ?
                                <Text style={{ color: colors.red, fontSize: 12, alignItems: "center" }}>Adresse e-mail incorrecte.</Text> :
                                null
                            }

                            <MAAInputText placeholder={"MOT DE PASSE"}
                                secureTextEntry={true}
                                // textContentType={}
                                onChangeText={(text) => {
                                    this._setUserPasswd(text)
                                }}
                                valuepassword={this.props.user_password}

                                style={
                                    [this.state.testMdp ?
                                        { borderColor: colors.red } :
                                        { borderColor: colors.white }]
                                }
                            />

                            {this.state.testMdp ?
                                <Text style={{ color: colors.red, fontSize: 12, alignItems: "center" }}>Mot de passe manquant</Text> :
                                null
                            }
                            <View style={{ width: screenWidth, flexDirection: 'row', justifyContent: "flex-start", alignItems: 'center', marginLeft: 15, marginTop: 10 }}>
                                <TouchableOpacity
                                    onPress={() => {
                                        this.setState({ checked: !this.state.checked })
                                    }}
                                    style={{ alignSelf: "center", marginRight: 10 }}>
                                    {this.state.checked ? <View style={{ top: -16, marginBottom: -15 }}><AutoHeightImage
                                        width={13}
                                        source={require("../../assets/icons/check.mark.white.png")}
                                        style={{ alignSelf: "center", bottom: -17 }}
                                    />
                                        <AutoHeightImage
                                            width={20}
                                            source={require("../../assets/icons/check-no.png")}
                                            style={{ alignSelf: "center" }}
                                        />
                                    </View>
                                        : <AutoHeightImage
                                            width={20}
                                            source={require("../../assets/icons/check-no.png")}
                                            style={{ alignSelf: "center" }}
                                        />

                                    }

                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => {
                                        this.setState({ checked: !this.state.checked })
                                    }}
                                    style={[]}>
                                    <Text style={{ color: 'white', fontSize: 15 }}>
                                        {"Se souvenir de moi"}
                                    </Text>
                                </TouchableOpacity>
                            </View>
                            <MAAButton text={"SE CONNECTER"} type={"filled"} height={40} width={(screenWidth - 80)}
                                style={{ marginTop: 10, marginLeft: -5 }}
                                onPress={() => {
                                    this._onValid()
                                }} />
                        </View>

                        <View>
                            <TouchableOpacity
                                onPress={async () => {
                                    await this.setState({ animateText: 1 })
                                    this.animateClickedText()
                                }}
                            >
                                {/* <Animated.View style={{ padding: 10, alignItems: "center" }}>
                                        <Animated.Text style={[baseStyles.textColorWhite, { fontSize: this.state.animateText == 1 ? textAnime : 14 }]}>Pas encore inscrit ?</Animated.Text>
                                        <Animated.Text style={[baseStyles.textColorWhite, { fontSize: this.state.animateText == 1 ? textAnime : 14 }]}>S'inscrire</Animated.Text>
                                    </Animated.View> */}
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={async () => {
                                    await this.setState({ animateText: 2 })
                                    this.animateClickedText()
                                    this.props.navigation.navigate('MdpOublier')
                                }}
                            >
                                <Animated.View style={{ padding: 10, alignItems: "center" }}>
                                    <Animated.Text style={[baseStyles.textColorWhite, { fontSize: this.state.animateText == 2 ? textAnime : 14 }]}>Mot de passe oublié</Animated.Text>
                                </Animated.View>
                            </TouchableOpacity>
                        </View>
                    </LinearGradient>
                </View>
                {/* { !this.props.isConnected &&
                <View style={{marginTop:0,position:'relative',top:-screenHeight}}>
                    <MiniOfflineSign />
                </View>
                } */}
                <Modal
                    visible={this.state.showDescription}
                    transparent={true}
                    onRequestClose={() => {
                        this.setState({ showDescription: false })
                    }}
                ><TouchableOpacity
                    onPress={() => {
                        this.setState({ showDescription: false })
                    }}
                    style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: screenWidth,
                        height: screenHeight,
                        zIndex: 0
                    }}
                ></TouchableOpacity><View
                    style={{
                        width: screenWidth - 60,
                        height: screenWidth - 200,
                        alignSelf: "center",
                        backgroundColor: colors.white,
                        borderRadius: 15,
                        justifyContent: 'space-between',
                        marginTop: (screenHeight - (screenWidth - 200)) / 2,

                    }}
                ><View style={{ height: ((screenWidth - 200) / 3) - 10, alignItems: 'center', justifyContent: 'center', borderTopLeftRadius: 15, borderTopRightRadius: 15, borderBottomWidth: 1, borderColor: 'gray' }}>
                            <Text style={{ fontSize: 16, textAlign: 'center', fontWeight: 'bold', color: colors.red }}>
                                {
                                    "Odgo"
                                }
                            </Text>
                        </View>
                        <View style={{ alignItems: 'center', justifyContent: 'center', paddingHorizontal: 15 }}>
                            <Text style={{ fontSize: 16, textAlign: 'center', }}>
                                {
                                    this.state.descriptionToShaow
                                }
                            </Text>
                        </View>
                        <TouchableOpacity
                            style={{
                                padding: 6,
                                width: '100%',
                                height: (screenWidth - 200) / 3,
                                borderBottomLeftRadius: 15,
                                borderBottomRightRadius: 15,
                                borderTopWidth: 1,
                                borderColor: 'gray',
                                alignItems: "center",
                                justifyContent: "center",
                                alignSelf: "center",
                            }}
                            onPress={() => {
                                this.setState({ showDescription: false })
                            }}
                        >
                            <Text
                                style={{
                                    color: 'grey', fontWeight: 'bold', fontSize: 16
                                }}
                            >
                                Fermer
                            </Text>
                        </TouchableOpacity>
                    </View>
                </Modal>
                { !this.props.isConnected &&
                    <View style={{ marginTop: 0, position: 'relative', top: -screenHeight }}>
                        <MiniOfflineSign />
                    </View>
                }
            </View>
        )
    }
}

// export default Login;
const mapStateToProps = (state) => {
    const { userToken, isConnected, user_password, user_pseudo } = state.statedata
    return { userToken, isConnected, user_password, user_pseudo }
};

export default connect(mapStateToProps)(Login);
