import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    Dimensions,
    StatusBar,
    TouchableOpacity,
    ScrollView,
    View,
    Text,
    Easing,
    ImageBackground
} from 'react-native';
import AutoHeightImage from 'react-native-auto-height-image';
import LinearGradient from 'react-native-linear-gradient';
import colors from '../../../../configs/colors';
import baseStyles from '../../../../base/BaseStyles';
import styles from './styles';
import { SET_ACTIVE_FP } from '../../../../redux/types/tabTypes';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import MAAButton from '../../../../components/MAAButton/MAAButton';
import statusBarHeight from '../../../../configs/screen';


const screen = Dimensions.get('screen');
const SBHelight = statusBarHeight;
const screenWidth = screen.width
const screenHeight = screen.height - SBHelight


class DetailsTestUnitaires extends Component {

    constructor(props) {
        super(props)
        this.state = {
            // name: this.props.navigation.getParam("name")
        }
    }
    componentDidMount() {
        // this.circularProgress.animate(56, 2000, Easing.quad);
        // this.circularProgress1.animate(100, 2000, Easing.quad);
        // this.circularProgressWhite.animate(100);
    }
    componentWillMount() {
    }

    componentWillUpdate() {
    }

    componentDidUpdate() {
    }

    componentWillUnmount() {
        const setActiveFPAction = { type: SET_ACTIVE_FP, value: 0 }
        this.props.dispatch(setActiveFPAction)
    }
    render() {
        return (
            <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }} colors={[colors.balck, colors.green, colors.balck]} style={baseStyles.linearGradient}>
                <ScrollView
                    contentInsetAdjustmentBehavior="automatic"
                    style={styles.scrollView}
                    contentContainerStyle={styles.contentContainerStyle}>

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
                            Test 2
                        </Text>
                        <TouchableOpacity style={{
                            width: 40, height: 40, alignItems: "center",
                            justifyContent: "center", opacity: 0
                        }}>
                            <AutoHeightImage
                                width={20}
                                source={require("../../../../assets/icons/arrow-white.png")}
                                style={{}} />
                        </TouchableOpacity>
                    </View>

                    <View style={{ margin: 10 }}></View>
                    <View style={{ borderRadius: 15, borderWidth: 2, borderColor: colors.red, alignSelf: "center", justifyContent: "center", alignItems: "center", width: screenWidth * 0.85 }}>

                    </View>

                    <View style={{ margin: 15, flexDirection: "row", width: screenWidth * 0.8 }}>
                        <View style={{ width: screenWidth * 0.2, alignItems: "flex-start" }}>
                            <Text style={{ color: colors.white, fontSize: 18 }}> Objectif: </Text>
                        </View>
                        <View style={{ flexDirection: "row", width: screenWidth * 0.6, alignItems: "center" }}>
                            <View style={{ width: screenWidth * 0.25, alignItems: "center" }}>
                                <Text style={{ color: colors.white, fontSize: 18 }}> 10 min</Text>
                            </View>
                            <View style={{ width: screenWidth * 0.05, alignItems: "center" }}>
                                <Text style={{ color: colors.white, fontSize: 18 }}> - </Text>
                            </View>
                            <View style={{ width: screenWidth * 0.25, alignItems: "center" }}>
                                <Text style={{ color: colors.white, fontSize: 18 }}> x5 </Text>
                            </View>
                        </View>
                    </View>

                    <View style={{ margin: 15, flexDirection: "row", width: screenWidth * 0.8 }}>
                        <View style={{ width: screenWidth * 0.4, alignItems: "flex-start" }}>
                            <Text style={{ color: colors.white, fontSize: 18 }}> Instructions: </Text>
                        </View>
                        <View style={{ flexDirection: "row", width: screenWidth * 0.4, alignItems: "center" }}>
                        </View>
                    </View>

                    <View style={{ margin: 15, flexDirection: "row", width: screenWidth * 0.85 }}>
                        <Text style={{ color: colors.white, fontSize: 18, flexWrap:"nowrap", textAlign:"justify" }}> Haec dum oriens diu perferret, caeli reserato tepore Constantius consulatu suo septies et Caesaris ter egressus Arelate Valentiam petit, in Gundomadum et Vadomarium fratres Alamannorum reges arma moturus, quorum crebris excursibus vastabantur confines limitibus terrae Gallorum. </Text>
                    </View>

                    <View style={[styles.valueCtn, { marginTop: 5, marginBottom: 10, justifyContent: "center", flexDirection: "row" }]}>
                        <View></View>
                        <MAAButton
                            text={"faire le test".toUpperCase()}
                            width={(screenWidth - 100)}
                            height={40}
                            style={{ alignSelf: "center" }}
                        // onPress={() => {
                        //     this.props.navigation.navigate("Mobilites")
                        // }}
                        />
                        <View></View>
                    </View>
                    <View style={{ margin: 10 }}></View>
                </ScrollView>
            </LinearGradient>
        )
    }
}

// export default FichePedag;
const mapStateToProps = (state) => {
    const { isFichePedag } = state.statedata
    return { isFichePedag }
};

export default connect(mapStateToProps)(DetailsTestUnitaires);
