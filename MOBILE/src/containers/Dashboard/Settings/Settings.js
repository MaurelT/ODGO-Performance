import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    Dimensions,
    StatusBar,
    TouchableOpacity,
    ScrollView,
    View,
    Text,
    RefreshControl,
    Modal
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import AutoHeightImage from 'react-native-auto-height-image';
import LinearGradient from 'react-native-linear-gradient';
import colors from '../../../configs/colors';
import baseStyles from '../../../base/BaseStyles';
import styles from './styles';
import ParamsHelper from '../../../apis/helpers/params_helper';
import statusBarHeight from '../../../configs/screen';
import {getDashboar} from '../../../apis/FonctionRedondant';
import dashboardHelper from '../../../apis/helpers/dashboard_helper';
import {SET_ACTIVE_TAB} from '../../../redux/types/tabTypes';


const screen = Dimensions.get('screen');
const SBHelight = statusBarHeight;
const screenWidth = screen.width
const screenHeight = screen.height - SBHelight


class Settings extends Component {

    constructor(props) {
        super(props)
        this.state = {
            userToken: "",
            refreshing: false,
            listParams: [],
            showDescription: false,
            descriptionToShaow: ""
        }
    }

    async componentDidMount() {
        const userToken = await AsyncStorage.getItem("userToken")
        this.setState({ userToken })
        this.getListParams()
    }

    getListParams = async () => {
        this.setState({ refreshing: true })
        const listParams = await ParamsHelper.getParams(this.state.userToken)
        console.log("Params")
        console.log(JSON.stringify(listParams))
        this.setState({ listParams: listParams.data })
        this.setState({ refreshing: false })
    }

    setParamForUser = async (notification_type_id) => {
        this.setState({ refreshing: true })
        console.log("notification_type_id")
        console.log(notification_type_id)
        const responseFromSetParam = await ParamsHelper.setParams(this.state.userToken, notification_type_id)
        console.log("responseFromSetParam : ")
        console.log(JSON.stringify(responseFromSetParam))
        this.getListParams()
    }

    render() {
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
                                    this.setState({ refreshing: false })
                                }, 2000)
                            }}
                        />
                    }
                ><View style={{ alignItems :"center",justifyContent:"center",width:"100%",marginTop:15 ,marginBottom:15 }}>
                        <TouchableOpacity
                            onPress={() => {
                                this.props.navigation.goBack()
                            }}
                            style={{width:50,position:"absolute",left:0}}
                        >
                            <AutoHeightImage
                                width={18}
                                source={require('../../../assets/icons/arrow-white.png')}
                                style={{
                                    marginLeft:15,
                                    transform: [
                                        { rotateY: "180deg" }
                                    ],
                                }}
                            />
                        </TouchableOpacity>
                        <Text style={[baseStyles.titleText,{textAlign:"center"}]}>
                            {"Paramètres"}
                        </Text>
                    </View>


                    <View style={{
                        alignSelf: "flex-start",
                        width: screenWidth,
                        alignItems: "center",
                        justifyContent: "center",
                        padding: 15,
                        backgroundColor: colors.balck + "00"
                    }}>
                        <Text style={{
                            color: colors.white,
                            fontSize: 20
                        }}>
                            Rappel de notifications
                        </Text>
                    </View>

                    <View style={[styles.btnCtn]}>

                        {
                            this.state.listParams.map((param, index) => {
                                return (
                                    <View key={"param_" + param.id}>
                                        <View

                                            style={{
                                                width: screenWidth,
                                                alignItems: "flex-start",
                                                justifyContent: "flex-start",
                                                padding: 15,
                                                paddingBottom: 0
                                            }}
                                        >
                                            <Text style={{
                                                color: colors.red,
                                                fontSize: 14,
                                                textTransform: "uppercase"
                                            }}>
                                                {param.name}
                                            </Text>
                                        </View>
                                        {
                                            param.notification_types.map((notif_type, index_notif_type) => {
                                                return (
                                                    <View key={"notif_type_" + index_notif_type} style={{ padding: 15, paddingTop: 0 }}>
                                                        <View style={[styles.ctnMenu]}>
                                                            <TouchableOpacity
                                                                style={{
                                                                    flexDirection: "row",
                                                                    alignItems: "center",
                                                                    justifyContent: "flex-start"
                                                                }}
                                                                onPress={() => {
                                                                    console.log("Pressed description")
                                                                    if (notif_type.description) {
                                                                        this.setState({ showDescription: true })
                                                                        this.setState({ descriptionToShaow: notif_type.description })
                                                                    }

                                                                }}
                                                            >
                                                                <Text style={[styles.btnMenuText]}>
                                                                    {notif_type.name}
                                                                </Text>
                                                                {/*{*/}
                                                                {/*    notif_type.description ?*/}
                                                                {/*        <AutoHeightImage*/}
                                                                {/*            width={20}*/}
                                                                {/*            source={require("../../../assets/icons/shape.red.1.png")}*/}
                                                                {/*            style={{ backgroundColor: colors.white, borderRadius: 20, marginLeft: 10 }}*/}
                                                                {/*        /> : null*/}
                                                                {/*}*/}

                                                            </TouchableOpacity>
                                                            <TouchableOpacity
                                                                onPress={() => {
                                                                    this.setParamForUser(notif_type.id)
                                                                }}
                                                                style={notif_type.isChecked ? [styles.iconArrow] :
                                                                    {
                                                                        position: "absolute",
                                                                        right: 4,
                                                                        width: 38,
                                                                        height: 38,
                                                                        alignItems: "center",
                                                                        justifyContent: "center",
                                                                        backgroundColor: "#E0E0E0",
                                                                        borderRadius: 38
                                                                    }}>
                                                                <AutoHeightImage
                                                                    width={notif_type.isChecked ? 40 : 12}
                                                                    source={notif_type.isChecked ? require("../../../assets/icons/check.red.png") : require("../../../assets/icons/add.white.png")}
                                                                    style={
                                                                        {}
                                                                    }
                                                                />
                                                            </TouchableOpacity>
                                                        </View>
                                                    </View>
                                                )
                                            })
                                        }
                                    </View>
                                )
                            })
                        }

                        {/* <View style={{
                            width: screenWidth,
                            alignItems: "flex-start",
                            justifyContent: "flex-start",
                            padding: 15,
                            paddingBottom: 0
                        }}>
                            <Text style={{
                                color: colors.red,
                                fontSize: 14
                            }}>
                                SOMMEIL
                            </Text>
                        </View>


                        <View style={[styles.ctnMenu]}>
                            <Text style={[styles.btnMenuText]}>Agenda du sommeil</Text>
                            <AutoHeightImage
                                width={10}
                                source={require("../../../assets/icons/shape.red.1.png")}
                                style={{ backgroundColor: colors.white, borderRadius: 20, marginLeft: 10 }}
                            />
                            <TouchableOpacity style={[styles.iconArrow]}>
                                <AutoHeightImage
                                    width={40}
                                    source={require("../../../assets/icons/check.red.png")}
                                />
                            </TouchableOpacity>
                        </View>


                        <View style={{
                            width: screenWidth,
                            alignItems: "flex-start",
                            justifyContent: "flex-start",
                            padding: 15,
                            paddingBottom: 0
                        }}>
                            <Text style={{
                                color: colors.red,
                                fontSize: 14
                            }}>
                                ENTRAÎNEMENT
                            </Text>
                        </View>

                        <View style={[styles.ctnMenu]}>
                            <Text style={[styles.btnMenuText]}>RPE Entraînement</Text>
                            <AutoHeightImage
                                width={10}
                                source={require("../../../assets/icons/information.png")}
                                style={{ backgroundColor: colors.white, borderRadius: 20, marginLeft: 10 }}
                            />
                            <TouchableOpacity
                                style={{
                                    position: "absolute",
                                    right: 4,
                                    width: 34,
                                    height: 34,
                                    alignItems: "center",
                                    justifyContent: "center",
                                    backgroundColor: "#E0E0E0",
                                    borderRadius: 30
                                }}>
                                <AutoHeightImage
                                    width={12}
                                    source={require("../../../assets/icons/add.white.png")}
                                    style={{
                                    }} />
                            </TouchableOpacity>
                        </View>

                        <View style={{
                            width: screenWidth,
                            alignItems: "flex-start",
                            justifyContent: "flex-start",
                            padding: 15,
                            paddingBottom: 0
                        }}>
                            <Text style={{
                                color: colors.red,
                                fontSize: 14
                            }}>
                                NUTRITION
                            </Text>
                            <TouchableOpacity
                                style={{
                                    position: "absolute",
                                    right: 25,
                                    top: 15,
                                    width: 18,
                                    height: 18,
                                    alignItems: "center",
                                    justifyContent: "center",
                                    backgroundColor: "#E0E0E0",
                                    borderRadius: 30
                                }}>
                                <AutoHeightImage
                                    width={8}
                                    source={require("../../../assets/icons/add.white.png")}
                                    style={{
                                    }} />
                            </TouchableOpacity>
                        </View>

                        <View style={[styles.ctnMenu]}>
                            <Text style={[styles.btnMenuText]}>Petit déjeuner</Text>
                            <AutoHeightImage
                                width={10}
                                source={require("../../../assets/icons/information.png")}
                                style={{ backgroundColor: colors.white, borderRadius: 20, marginLeft: 10 }}
                            />
                            <TouchableOpacity style={[styles.iconArrow]}>
                                <AutoHeightImage
                                    width={40}
                                    source={require("../../../assets/icons/check.red.png")}
                                />
                            </TouchableOpacity>
                        </View>

                        <View style={[styles.ctnMenu]}>
                            <Text style={[styles.btnMenuText]}>Déjeuner</Text>
                            <AutoHeightImage
                                width={10}
                                source={require("../../../assets/icons/information.png")}
                                style={{ backgroundColor: colors.white, borderRadius: 20, marginLeft: 10 }}
                            />
                            <TouchableOpacity style={[styles.iconArrow]}>
                                <AutoHeightImage
                                    width={40}
                                    source={require("../../../assets/icons/check.red.png")}
                                />
                            </TouchableOpacity>
                        </View>

                        <View style={[styles.ctnMenu]}>
                            <Text style={[styles.btnMenuText]}>Collation</Text>
                            <AutoHeightImage
                                width={10}
                                source={require("../../../assets/icons/information.png")}
                                style={{ backgroundColor: colors.white, borderRadius: 20, marginLeft: 10 }}
                            />
                            <TouchableOpacity
                                style={{
                                    position: "absolute",
                                    right: 4,
                                    width: 34,
                                    height: 34,
                                    alignItems: "center",
                                    justifyContent: "center",
                                    backgroundColor: "#E0E0E0",
                                    borderRadius: 30
                                }}>
                                <AutoHeightImage
                                    width={12}
                                    source={require("../../../assets/icons/add.white.png")}
                                    style={{
                                    }} />
                            </TouchableOpacity>
                        </View>

                        <View style={[styles.ctnMenu]}>
                            <Text style={[styles.btnMenuText]}>Dîner</Text>
                            <AutoHeightImage
                                width={10}
                                source={require("../../../assets/icons/information.png")}
                                style={{ backgroundColor: colors.white, borderRadius: 20, marginLeft: 10 }}
                            />
                            <TouchableOpacity style={[styles.iconArrow]}>
                                <AutoHeightImage
                                    width={40}
                                    source={require("../../../assets/icons/check.red.png")}
                                />
                            </TouchableOpacity>
                        </View> */}

                    </View>

                </ScrollView>

                <Modal
                    visible={this.state.showDescription}
                    transparent={true}
                    onRequestClose={() => {
                        this.setState({ showDescription: false })
                    }}
                >

                    <View
                        style={{
                            width: screenWidth - 60,
                            height: screenWidth - 60,
                            alignSelf: "center",
                            backgroundColor: colors.white,
                            borderRadius: 15,
                            marginTop: (screenHeight - (screenWidth - 60)) / 2,
                            padding: 20
                        }}
                    >
                        <ScrollView>
                            <Text>
                                {
                                    this.state.descriptionToShaow
                                }
                            </Text>
                        </ScrollView>
                        <TouchableOpacity
                            style={{
                                padding: 6,
                                width: 100,
                                backgroundColor: colors.red,
                                borderRadius: 7,
                                alignItems: "center",
                                justifyContent: "center",
                                alignSelf: "center"
                            }}
                            onPress={() => {
                                this.setState({ showDescription: false })
                            }}
                        >
                            <Text
                                style={{
                                    color: colors.white
                                }}
                            >
                                Fermer
                            </Text>
                        </TouchableOpacity>
                    </View>

                </Modal>
            </LinearGradient>
        )
    }
}

// export default Settings;
const mapStateToProps = (state) => {
    const { userToken } = state.statedata
    return { userToken }
};

export default connect(mapStateToProps)(Settings);
