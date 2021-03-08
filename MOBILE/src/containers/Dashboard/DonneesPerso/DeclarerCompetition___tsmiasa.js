import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    ScrollView,
    View,
    Text,
    TouchableOpacity,
    Dimensions,
    StatusBar,
    Modal
} from 'react-native';
// import Slider from '@react-native-community/slider';
import Slider from "react-native-slider";
import baseStyles from '../../../base/BaseStyles';
import styles from './styles'
import colors from '../../../configs/colors';
import LinearGradient from 'react-native-linear-gradient';
import ZonePicker from '../../../components/ZonePicker/ZonePicker';
import MAAButton from '../../../components/MAAButton/MAAButton';
import AutoHeightImage from 'react-native-auto-height-image';
import statusBarHeight from '../../../configs/screen';

const screen = Dimensions.get("window");
const SBHelight = statusBarHeight;
const screenWidth = screen.width
const screenHeight = screen.height - SBHelight

class DeclarerCompetition___tsmiasa extends Component {
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
        }
    }

    render() {
        return (
            <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }} colors={[colors.balck, colors.green, colors.balck]} style={baseStyles.linearGradient}>

                <ScrollView
                    style={styles.scrollView}
                    contentContainerStyle={[styles.contentContainerStyle]}
                    keyboardShouldPersistTaps={'always'}
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
                                source={require("../../../assets/icons/arrow-white.png")}
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
                            Déclarer une compétition
                        </Text>
                        <TouchableOpacity style={{
                            width: 40, height: 40, alignItems: "center",
                            justifyContent: "center", opacity: 0
                        }}>
                            <AutoHeightImage
                                width={20}
                                source={require("../../../assets/icons/arrow-white.png")}
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
                    <View style={[styles.noSelectedBtn]}>
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
                        <View style={[styles.sliderTensionLabelD]}>
                            <Text style={[baseStyles.textColorGrey]}>08/03/2019</Text>
                        </View>
                    </View>
                    <View style={styles.separator}></View>
                    <View style={[styles.sliderCtn]}>
                        <View style={[styles.sliderTensionLabelG]}>
                            <Text style={[baseStyles.textColorWhite]}>Distance</Text>
                        </View>
                        <View style={[styles.sliderTensionLabelD]}>
                            <Text style={[baseStyles.textColorGrey]}>Xxxxx</Text>
                        </View>
                    </View>
                    <View style={styles.separator}></View>
                    <View style={[styles.sliderCtn]}>
                        <View style={[styles.sliderTensionLabelG]}>
                            <Text style={[baseStyles.textColorWhite]}>Temps</Text>
                        </View>
                        <View style={[styles.sliderTensionLabelD]}>
                            <Text style={[baseStyles.textColorGrey]}>Xxxxx</Text>
                        </View>
                    </View>
                    <View style={styles.separator}></View>
                    <View style={[styles.sliderCtn]}>
                        <View style={[styles.sliderTensionLabelG]}>
                            <Text style={[baseStyles.textColorWhite]}>Allure moyenne</Text>
                        </View>
                        <View style={[styles.sliderTensionLabelD]}>
                            <Text style={[baseStyles.textColorGrey]}>Xxxxx</Text>
                        </View>
                    </View>
                    <View style={styles.separator}></View>
                    <View style={[styles.sliderCtn]}>
                        <View style={[styles.sliderTensionLabelG]}>
                            <Text style={[baseStyles.textColorWhite]}>Dénivilé</Text>
                        </View>
                        <View style={[styles.sliderTensionLabelD]}>
                            <Text style={[baseStyles.textColorGrey]}>Xxxxx</Text>
                        </View>
                    </View>
                    <View style={styles.separator}></View>
                    <View style={[styles.sliderCtn]}>
                        <View style={[styles.sliderTensionLabelG]}>
                            <Text style={[baseStyles.textColorWhite]}>Fréquence cardiaque moyenne</Text>
                        </View>
                        <View style={[styles.sliderTensionLabelD]}>
                            <Text style={[baseStyles.textColorGrey]}>Xxxxx</Text>
                        </View>
                    </View>
                    <View style={[styles.separator, {height:0}]}></View>


                    <MAAButton text={"VALIDER"} width={(screenWidth - 100)} height={40}
                        onPress={() => {
                            console.log("Suivant")
                            this.props.navigation.navigate('DeclarerMatch')
                        }}
                        style={[styles.btnValidate]} />

                </ScrollView>
            </LinearGradient>
        )
    }
}

// export default AddTension;
const mapStateToProps = (state) => {
    const { selectedZone } = state.statedata
    return { selectedZone }
};

export default connect(mapStateToProps)(DeclarerCompetition___tsmiasa);
