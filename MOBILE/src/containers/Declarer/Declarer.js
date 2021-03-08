import React, { Component } from 'react';
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
import colors from '../../configs/colors';
import baseStyles from '../../base/BaseStyles';
import styles from './styles';
import statusBarHeight from '../../configs/screen';

const screen = Dimensions.get('screen');
const SBHelight = statusBarHeight;
const screenWidth = screen.width
const screenHeight = screen.height - SBHelight


class Declarer extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        return (
            <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }} colors={[colors.balck, colors.green, colors.balck]} style={baseStyles.linearGradient}>
                <ScrollView
                    contentInsetAdjustmentBehavior="automatic"
                    style={styles.scrollView}
                    contentContainerStyle={[styles.contentContainerStyle]}>

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
                            Ajouter
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

                    <View style={[styles.btnCtn]}>

                        <TouchableOpacity onPress={() => {
                            this.props.navigation.navigate("DeclarerMatch")
                        }}>
                            <View style={[styles.ctnMenu]}>
                                <Text style={[styles.btnMenuText]}>Déclarer un match</Text>
                                <AutoHeightImage
                                    width={20}
                                    source={require("../../assets/icons/arrow-white.png")} />
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => {
                            this.props.navigation.navigate("DeclarerCompetition")
                        }}>
                            <View style={[styles.ctnMenu]}>
                                <Text style={[styles.btnMenuText]} >Déclarer une compétition</Text>
                                <AutoHeightImage
                                    width={20}
                                    source={require("../../assets/icons/arrow-white.png")} />
                            </View>
                        </TouchableOpacity>

                    </View>

                </ScrollView>
            </LinearGradient>
        )
    }
}

export default Declarer;