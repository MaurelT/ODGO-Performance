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
    Alert
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import LinearGradient from 'react-native-linear-gradient';
import styles from './styles';
import MAAButton from '../../components/MAAButton/MAAButton';
import colors from '../../configs/colors';
import baseStyles from '../../base/BaseStyles';
import MAAInputText from '../../components/MAAInputText/MAAInputText';
import AutoHeightImage from 'react-native-auto-height-image';
import AuthHelper from '../../apis/helpers/auth_helper';
import Loading from '../../components/Load/loading';
import { SET_USER_TOKEN } from '../../redux/types/tabTypes';
import statusBarHeight from '../../configs/screen';
import {MiniOfflineSign, unsubscribe} from '../../apis/FonctionRedondant';
import NetInfo from '@react-native-community/netinfo';

const screen = Dimensions.get("window");
const SBHelight = statusBarHeight;
const screenWidth = screen.width
const screenHeight = screen.height - SBHelight

class MdpOublier extends Component {

    textAnimationValue = new Animated.Value(0)

    constructor(props) {
        super(props)
        this.state = {
            refreshing: false,
            loading: false,
            animateText: 0,
            user_pseudo: "",
            user_passwd: "",
            testEmail: false,
            testMdp: false,
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
        this.setState({ user_pseudo: text.toLowerCase() })
    }

    _setUserPasswd = (text) => {
        this.setState({ user_passwd: text })
    }

    // getUserToken = async () => {
    //     console.log("Getting token ... ")
    //     let userToken = await (await AuthHelpr._getToken(this.state.user_pseudo, this.state.user_passwd)).json()
    //     console.log("Resultat : ")
    //     console.log(JSON.stringify(userToken))
    // }
    _onValid = async () => {

        // this.props.navigation.navigate("LogedinNavigator")

        this.setState({ loading: true })
        let email = this.state.user_pseudo
        let password = this.state.user_passwd
        if (email == "") {
            this.setState({ loading: false })
            this.setState({ testEmail: true })
            this.setState({ testMdp: false })
            // Alert.alert("Information", "Paramètre email manquant")
        }
        else {
            Alert.alert("Information", "Fonctionnalité mise en place avec la prochaine version")

            // this.setState({ testEmail: false })
            // this.setState({ testMdp: false })
            // let response = await AuthHelper.getAuth(email, password)
            // console.log("response")
            // console.log(response)
            // this.setState({ loading: false })
            // if (response.message) {
            //     this.setState({ loading: false })
            //     Alert.alert("information", response.message.toString())
            // }
            // else {
            //     if (response.success == false) {
            //         this.setState({ loading: false })
            //         Alert.alert("information", response.error_msg[0].toString())
            //     }
            //     else if (response.success == true) {
            //         this.setState({ loading: false })
            //         const setUserTokenAction = { type: SET_USER_TOKEN, value: response.data.token }
            //         this.props.dispatch(setUserTokenAction)
            //         const saveTokenUser = await AsyncStorage.setItem("userToken", response.data.token)
            //         this.props.navigation.navigate("LogedinNavigator")

            //         console.log(saveTokenUser)
            //     }
            // }

        }
    };

    componentDidMount() {
        unsubscribe(NetInfo,this.props);
    }

    render() {

        const textAnime = this.textAnimationValue.interpolate({
            inputRange: [0, 0.5, 1],
            outputRange: [14, 20, 14]
        })
        return (
            <Fragment>
                <SafeAreaView>
                    <Loading load={this.state.loading} />
                    <ScrollView
                        contentInsetAdjustmentBehavior="automatic"
                        style={styles.scrollView}
                        contentContainerStyle={[styles.contentContainerStyle]}
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
                        <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }} colors={[colors.balck, colors.green, colors.balck]} style={styles.linearGradient}>
                            <View style={[baseStyles.loginHeader]}>
                                {/* <View style={[baseStyles.odgoDot]}></View>
                                <Text style={[baseStyles.odgoTextTitle]}>ODGO</Text>
                                <View style={[baseStyles.odgoDot]}></View> */}
                                <AutoHeightImage
                                    width={screenWidth / 2}
                                    source={require('../../assets/images/logoRedDot.png')} />
                            </View>

                            <View style={{ width: (screenWidth - 80), alignSelf: "center" }} >
                                <MAAInputText placeholder={"E-MAIL"}
                                    textContentType={"emailAddress"}
                                    keyboardType={"email-address"}
                                    onChangeText={(text) => {
                                        this._setUserPseudo(text)
                                    }}
                                    value={this.state.user_pseudo}
                                    style={
                                        [this.state.testEmail ?
                                            { borderColor: colors.red } :
                                            { borderColor: colors.white }]
                                    }
                                />
                                {this.state.testEmail ?
                                    <Text style={{ color: colors.red, fontSize: 12, alignItems: "center" }}>Adresse e-mail manquante.</Text> :
                                    null
                                }
                                <MAAButton text={"ENVOYER"} type={"filled"} height={40} width={(screenWidth - 80)}
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
                                        this.props.navigation.navigate('Login')
                                    }}
                                >
                                    <Animated.View style={{ padding: 10, alignItems: "center" }}>
                                        <Animated.Text style={[baseStyles.textColorWhite, { fontSize: this.state.animateText == 1 ? textAnime : 14 }]}>Retour à la connexion</Animated.Text>
                                        {/* <Animated.Text style={[baseStyles.textColorWhite, { fontSize: this.state.animateText == 1 ? textAnime : 14 }]}>S'inscrire</Animated.Text> */}
                                    </Animated.View>
                                </TouchableOpacity>
                                {/* <TouchableOpacity
                                    onPress={async () => {
                                        await this.setState({ animateText: 2 })
                                        this.animateClickedText()
                                    }}
                                >
                                    <Animated.View style={{ padding: 10, alignItems: "center" }}>
                                        <Animated.Text style={[baseStyles.textColorWhite, { fontSize: this.state.animateText == 2 ? textAnime : 14 }]}>Mot de passe oublié</Animated.Text>
                                    </Animated.View>
                                </TouchableOpacity> */}
                            </View>
                        </LinearGradient>
                    </ScrollView>
                </SafeAreaView>
                { !this.props.isConnected &&
                <View style={{marginTop:0,position:'relative',top:-screenHeight}}>
                    <MiniOfflineSign />
                </View>
                }
            </Fragment>
        )
    }
}

// export default Login;
const mapStateToProps = (state) => {
    const { userToken,isConnected } = state.statedata
    return { userToken,isConnected }
};

export default connect(mapStateToProps)(MdpOublier);
