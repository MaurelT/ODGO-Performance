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
import baseStyles from '../../../../base/BaseStyles';
import styles from './styles'
import colors from '../../../../configs/colors';
import LinearGradient from 'react-native-linear-gradient';
import ZonePicker from '../../../../components/ZonePicker/ZonePicker';
import MAAButton from '../../../../components/MAAButton/MAAButton';
import AutoHeightImage from 'react-native-auto-height-image';
import ProgressCircle from 'react-native-progress-circle';
import {SET_POP_TO_TOP} from "../../../../redux/types/tabTypes";
import statusBarHeight from '../../../../configs/screen';


const screen = Dimensions.get("window");
const SBHelight = statusBarHeight;
const screenWidth = screen.width
const screenHeight = screen.height - SBHelight

class TempsDeJeu extends Component {

    constructor(props) {
        super(props)
        this.state = {
            activeMenu: 'semaine',
            selectedZone: props.selectedZone,
            zonePicker: false,
            sliderValueIntensite: 3.5,
            sliderValueDifficulte: 2,
            popToTop:this.props.popToTop,
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
                    style={styles.scrollView}
                    contentContainerStyle={[styles.contentContainerStyle]}
                    keyboardShouldPersistTaps={'always'}
                >
                    <View style={[styles.headCtn,{flexDirection:'row',justifyContent:'space-between',alignItems:'center'}]}>
                        <TouchableOpacity style={{ width: 60 }}
                                          onPress={() => {
                                              this.props.navigation.goBack()
                                          }}>
                            <AutoHeightImage
                                width={18}
                                source={require("../../../../assets/icons/arrow-white.png")}
                                style={{
                                    transform: [
                                        { rotateY: "180deg" }
                                    ]
                                }} />
                        </TouchableOpacity>
                    <TouchableOpacity style={[styles.noSelectedBtn]}
                        onPress={() => {
                            console.log("Chenging Zone")
                            // this.setState({ zonePicker: true })
                        }}>
                        <View style={[styles.headCtn]}>
                            <Text style={[baseStyles.titleText]}>
                                {"Temps de jeu"}
                            </Text>
                        </View>
                    </TouchableOpacity>
                        <View/>
                        <View/>
                    </View>

                    <TouchableOpacity
                        style={{ width: screenWidth, height: 40 }}
                    >
                        <View style={[styles.goToNowCtn]}>
                            <AutoHeightImage
                                width={18}
                                source={require('../../../../assets/icons/left.arrow.white.png')}
                                style={{ opacity: 0 }} />
                            <Text style={[baseStyles.textColorWhite, { fontSize: 20 }]}>
                                Football
                            </Text>
                            <AutoHeightImage
                                width={18}
                                source={require('../../../../assets/icons/left.arrow.white.png')}
                                style={{ transform: [{ rotateY: "180deg" }] }}
                            />
                        </View>
                    </TouchableOpacity>
                    <View style={{ margin: 10 }}></View>
                    <View style={{ flexDirection: "row", justifyContent: "space-around", width: screenWidth * 0.85 }}>
                        <TouchableOpacity
                            onPress={() => this.setState({ activeMenu: 'semaine' })}
                            style={
                                this.state.activeMenu == 'semaine' ?
                                    { borderBottomColor: colors.red, padding: 10, borderBottomWidth: 1, borderTopWidth: 0, borderLeftWidth: 0, borderRightWidth: 0 } :
                                    { borderBottomColor: colors.red, padding: 10, borderBottomWidth: 0, borderTopWidth: 0, borderLeftWidth: 0, borderRightWidth: 0 }

                            }>
                            <Text style={[styles.qtText]}>1 SEMAINE</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.setState({ activeMenu: 'mois' })}
                            style={
                                this.state.activeMenu == 'mois' ?
                                    { borderBottomColor: colors.red, padding: 10, borderBottomWidth: 1, borderTopWidth: 0, borderLeftWidth: 0, borderRightWidth: 0 } :
                                    { borderBottomColor: colors.red, padding: 10, borderBottomWidth: 0, borderTopWidth: 0, borderLeftWidth: 0, borderRightWidth: 0 }

                            }>
                            <Text style={[styles.qtText]}>1 MOIS</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.setState({ activeMenu: 'annee' })}
                            style={
                                this.state.activeMenu == 'annee' ?
                                    { borderBottomColor: colors.red, padding: 10, borderBottomWidth: 1, borderTopWidth: 0, borderLeftWidth: 0, borderRightWidth: 0 } :
                                    { borderBottomColor: colors.red, padding: 10, borderBottomWidth: 0, borderTopWidth: 0, borderLeftWidth: 0, borderRightWidth: 0 }

                            }>
                            <Text style={[styles.qtText]}>12 MOIS</Text>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity
                        style={{ width: screenWidth, height: 40 }}
                    >
                        <View style={[styles.goToNowCtn]}>
                            <AutoHeightImage
                                width={18}
                                source={require('../../../../assets/icons/left.arrow.white.png')}
                            />
                            <Text style={[baseStyles.textColorWhite, { fontSize: 20 }]}>
                                Mai 2018 - Mai 2019
                            </Text>
                            <AutoHeightImage
                                width={18}
                                source={require('../../../../assets/icons/left.arrow.white.png')}
                                style={{ transform: [{ rotateY: "180deg" }] }}
                            />
                        </View>
                    </TouchableOpacity>

                    <View style={{ margin: 10 }}></View>
                    <View style={{ flexDirection: "row", justifyContent: "space-between", width: (screenWidth * 0.95), backgroundColor: "rgba(0,0,0,0.5)", padding:10, borderRadius: 5, borderBottomLeftRadius:0, borderBottomRightRadius:0 }}>
                        <View style={{ width: screenWidth * 0.5 }}>
                            <Text style={[baseStyles.textColorWhite, { fontSize: 16 }]}>Temps de jeu / Match</Text>
                        </View>
                        <View style={{ width: screenWidth * 0.2 }}>
                        </View>
                    </View>
                    <View style={{ height: 200, justifyContent: "space-between", zIndex: 1 }}>

                        <View style={{ flexDirection: "row", justifyContent: "space-between", marginLeft: 5, width: (screenWidth * 0.8) }}>
                            <View style={{ width: screenWidth * 0.1, }}>
                                <Text style={[baseStyles.textColorWhite, { fontSize: 14, marginTop:5 }]}>90</Text>
                            </View>
                            <View style={{ width: screenWidth * 0.7, borderWidth: 0, borderBottomColor: "#77777703", borderBottomWidth: 1 }}>
                            </View>
                        </View>
                        <View style={{ flexDirection: "row", justifyContent: "space-between", marginLeft: 5, width: (screenWidth * 0.8) }}>
                            <View style={{ width: screenWidth * 0.1, marginTop:2 }}>
                                <Text style={[baseStyles.textColorWhite, { fontSize: 14 }]}>75</Text>
                            </View>
                            <View style={{ width: screenWidth * 0.7, borderWidth: 0, borderBottomColor: "#77777703", borderBottomWidth: 1 }}>
                            </View>
                        </View>
                        <View style={{ flexDirection: "row", justifyContent: "space-between", marginLeft: 5, width: (screenWidth * 0.8) }}>
                            <View style={{ width: screenWidth * 0.1, marginTop:2 }}>
                                <Text style={[baseStyles.textColorWhite, { fontSize: 14 }]}>60</Text>
                            </View>
                            <View style={{ width: screenWidth * 0.7, borderWidth: 0, borderBottomColor: "#FFF", borderBottomWidth: 1 }}>
                            </View>
                            <View style={{ marginLeft: -15, marginTop:-10, alignSelf: "flex-start" }}>
                                <Text style={[baseStyles.textColorWhite, { fontSize: 10, transform: [{ rotate: "-90deg" }] }]}>Moyenne</Text>
                            </View>
                        </View>
                        <View style={{ flexDirection: "row", justifyContent: "space-between", marginLeft: 5, width: (screenWidth * 0.8) }}>
                            <View style={{ width: screenWidth * 0.1, marginTop:2 }}>
                                <Text style={[baseStyles.textColorWhite, { fontSize: 14 }]}>45</Text>
                            </View>
                            <View style={{ width: screenWidth * 0.7, borderWidth: 0, borderBottomColor: "#77777703", borderBottomWidth: 1 }}>
                            </View>
                        </View>
                        <View style={{ flexDirection: "row", justifyContent: "space-between", marginLeft: 5, width: (screenWidth * 0.8) }}>
                            <View style={{ width: screenWidth * 0.1, marginTop:2 }}>
                                <Text style={[baseStyles.textColorWhite, { fontSize: 14 }]}>30</Text>
                            </View>
                            <View style={{ width: screenWidth * 0.7, borderWidth: 0, borderBottomColor: "#77777703", borderBottomWidth: 1 }}>
                            </View>
                        </View>
                        <View style={{ flexDirection: "row", justifyContent: "space-between", marginLeft: 5, width: (screenWidth * 0.8) }}>
                            <View style={{ width: screenWidth * 0.1, marginTop:2 }}>
                                <Text style={[baseStyles.textColorWhite, { fontSize: 14 }]}>15</Text>
                            </View>
                            <View style={{ width: screenWidth * 0.7, borderWidth: 0, borderBottomColor: "#77777703", borderBottomWidth: 1 }}>
                            </View>
                        </View>
                        <View style={{ flexDirection: "row", justifyContent: "space-between", marginLeft: 5, width: (screenWidth * 0.8) }}>
                            <View style={{ width: screenWidth * 0.1, marginTop:2 }}>
                                <Text style={[baseStyles.textColorWhite, { fontSize: 14 }]}>0</Text>
                            </View>
                            <View style={{ width: screenWidth * 0.7, borderWidth: 0, borderBottomColor: "#77777703", borderBottomWidth: 1 }}>
                            </View>
                        </View>
                    </View>
                    <View style={{ margin: 10 }}></View>

                    <View style={{ marginTop: -220, zIndex: 0, backgroundColor: "rgba(0,0,0,0.5)", padding: 0, borderRadius: 5, borderTopLeftRadius:0, borderTopRightRadius:0, width: (screenWidth * 0.95), height: 270 }}>
                        <View style={{ flexDirection: "row", justifyContent: "space-between", marginLeft: 20, width: (screenWidth * 0.8) }}>
                            <View style={{ flexDirection: "column", width: screenWidth * 0.15 }}>
                                <View style={[styles.progressBlock]}>
                                    <View style={[styles.progressVertical,
                                    {
                                        // transform: [{ rotateX: "180deg" }],
                                        width: 20,
                                        height: 200,
                                        justifyContent: "space-between",
                                    }
                                    ]}>
                                        <Text style={[baseStyles.textColorWhite, { fontSize: 16 }]}></Text>
                                        <Text style={[baseStyles.textColorWhite, { fontSize: 16 }]}></Text>
                                        <Text style={[baseStyles.textColorWhite, { fontSize: 16 }]}></Text>
                                        <Text style={[baseStyles.textColorWhite, { fontSize: 16 }]}></Text>
                                        <Text style={[baseStyles.textColorWhite, { fontSize: 16 }]}></Text>
                                        <Text style={[baseStyles.textColorWhite, { fontSize: 16 }]}></Text>
                                        <Text style={[baseStyles.textColorWhite, { fontSize: 16 }]}></Text>
                                    </View>
                                </View>
                            </View>
                            <View style={{ flexDirection: "column", marginLeft: -10 }}>
                                <View style={[styles.progressBlock]}>
                                    <View style={[styles.progressVertical,
                                    {
                                        transform: [{ rotateX: "180deg" }],
                                        height: 200
                                    }
                                    ]}>
                                        <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={["#FF9999", colors.red]} style={[styles.progressVerticalValue, { height: "63%" }]}></LinearGradient>
                                    </View>
                                </View>
                                <View style={{ alignSelf: "flex-start", flexWrap: "nowrap", marginLeft: -10, marginTop: 20 }}>
                                    <Text style={[baseStyles.textColorWhite, { fontSize: 8, transform: [{ rotate: "-90deg" }] }]}>Mai 2018</Text>
                                </View>
                            </View>
                            <View style={{ flexDirection: "column", marginLeft: -10 }}>
                                <View style={[styles.progressBlock]}>
                                    <View style={[styles.progressVertical,
                                    {
                                        transform: [{ rotateX: "180deg" }],
                                        height: 200
                                    }
                                    ]}>
                                        <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={["#FF9999", colors.red]} style={[styles.progressVerticalValue, { height: "90%" }]}></LinearGradient>
                                    </View>
                                </View>
                                <View style={{ alignSelf: "flex-start", flexWrap: "nowrap", marginLeft: -10, marginTop: 20 }}>
                                    <Text style={[baseStyles.textColorWhite, { fontSize: 8, transform: [{ rotate: "-90deg" }] }]}>Juin2018</Text>
                                </View>
                            </View>
                            <View style={{ flexDirection: "column", marginLeft: -10 }}>
                                <View style={[styles.progressBlock]}>
                                    <View style={[styles.progressVertical,
                                    {
                                        transform: [{ rotateX: "180deg" }],
                                        height: 200
                                    }
                                    ]}>
                                        <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={["#FF9999", colors.red]} style={[styles.progressVerticalValue, { height: "47%" }]}></LinearGradient>
                                    </View>
                                </View>
                                <View style={{ alignSelf: "flex-start", flexWrap: "nowrap", marginLeft: -10, marginTop: 20 }}>
                                    <Text style={[baseStyles.textColorWhite, { fontSize: 8, transform: [{ rotate: "-90deg" }] }]}>Jui 2018</Text>
                                </View>
                            </View>
                            <View style={{ flexDirection: "column", marginLeft: -10 }}>
                                <View style={[styles.progressBlock]}>
                                    <View style={[styles.progressVertical,
                                    {
                                        transform: [{ rotateX: "180deg" }],
                                        height: 200
                                    }
                                    ]}>
                                        <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={["#FF9999", colors.red]} style={[styles.progressVerticalValue, { height: "67%" }]}></LinearGradient>
                                    </View>
                                </View>
                                <View style={{ alignSelf: "flex-start", flexWrap: "nowrap", marginLeft: -10, marginTop: 20 }}>
                                    <Text style={[baseStyles.textColorWhite, { fontSize: 8, transform: [{ rotate: "-90deg" }] }]}>Aou 2018</Text>
                                </View>
                            </View>
                            <View style={{ flexDirection: "column", marginLeft: -10 }}>
                                <View style={[styles.progressBlock]}>
                                    <View style={[styles.progressVertical,
                                    {
                                        transform: [{ rotateX: "180deg" }],
                                        height: 200
                                    }
                                    ]}>
                                        <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={["#FF9999", colors.red]} style={[styles.progressVerticalValue, { height: "80%" }]}></LinearGradient>
                                    </View>
                                </View>
                                <View style={{ alignSelf: "flex-start", flexWrap: "nowrap", marginLeft: -10, marginTop: 20 }}>
                                    <Text style={[baseStyles.textColorWhite, { fontSize: 8, transform: [{ rotate: "-90deg" }] }]}>Sep 2018</Text>
                                </View>
                            </View>
                            <View style={{ flexDirection: "column", marginLeft: -10 }}>
                                <View style={[styles.progressBlock]}>
                                    <View style={[styles.progressVertical,
                                    {
                                        transform: [{ rotateX: "180deg" }],
                                        height: 200
                                    }
                                    ]}>
                                        <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={["#FF9999", colors.red]} style={[styles.progressVerticalValue, { height: "85%" }]}></LinearGradient>
                                    </View>
                                </View>
                                <View style={{ alignSelf: "flex-start", flexWrap: "nowrap", marginLeft: -10, marginTop: 20 }}>
                                    <Text style={[baseStyles.textColorWhite, { fontSize: 8, transform: [{ rotate: "-90deg" }] }]}>Oct 2018</Text>
                                </View>
                            </View>
                            <View style={{ flexDirection: "column", marginLeft: -10 }}>
                                <View style={[styles.progressBlock]}>
                                    <View style={[styles.progressVertical,
                                    {
                                        transform: [{ rotateX: "180deg" }],
                                        height: 200
                                    }
                                    ]}>
                                        <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={["#FF9999", colors.red]} style={[styles.progressVerticalValue, { height: "55%" }]}></LinearGradient>
                                    </View>
                                </View>
                                <View style={{ alignSelf: "flex-start", flexWrap: "nowrap", marginLeft: -10, marginTop: 20 }}>
                                    <Text style={[baseStyles.textColorWhite, { fontSize: 8, transform: [{ rotate: "-90deg" }] }]}>Nov 2018</Text>
                                </View>
                            </View>
                            <View style={{ flexDirection: "column", marginLeft: -10 }}>
                                <View style={[styles.progressBlock]}>
                                    <View style={[styles.progressVertical,
                                    {
                                        transform: [{ rotateX: "180deg" }],
                                        height: 200
                                    }
                                    ]}>
                                        <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={["#FF9999", colors.red]} style={[styles.progressVerticalValue, { height: "85%" }]}></LinearGradient>
                                    </View>
                                </View>
                                <View style={{ alignSelf: "flex-start", flexWrap: "nowrap", marginLeft: -10, marginTop: 20 }}>
                                    <Text style={[baseStyles.textColorWhite, { fontSize: 8, transform: [{ rotate: "-90deg" }] }]}>Dec 2018</Text>
                                </View>
                            </View>
                            <View style={{ flexDirection: "column", marginLeft: -10 }}>
                                <View style={[styles.progressBlock]}>
                                    <View style={[styles.progressVertical,
                                    {
                                        transform: [{ rotateX: "180deg" }],
                                        height: 200
                                    }
                                    ]}>
                                        <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={["#FF9999", colors.red]} style={[styles.progressVerticalValue, { height: "95%" }]}></LinearGradient>
                                    </View>
                                </View>
                                <View style={{ alignSelf: "flex-start", flexWrap: "nowrap", marginLeft: -10, marginTop: 20 }}>
                                    <Text style={[baseStyles.textColorWhite, { fontSize: 8, transform: [{ rotate: "-90deg" }] }]}>Jan 2019</Text>
                                </View>
                            </View>
                            <View style={{ flexDirection: "column", marginLeft: -10 }}>
                                <View style={[styles.progressBlock]}>
                                    <View style={[styles.progressVertical,
                                    {
                                        transform: [{ rotateX: "180deg" }],
                                        height: 200
                                    }
                                    ]}>
                                        <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={["#FF9999", colors.red]} style={[styles.progressVerticalValue, { height: "62%" }]}></LinearGradient>
                                    </View>
                                </View>
                                <View style={{ alignSelf: "flex-start", flexWrap: "nowrap", marginLeft: -10, marginTop: 20 }}>
                                    <Text style={[baseStyles.textColorWhite, { fontSize: 8, transform: [{ rotate: "-90deg" }] }]}>Fev 2019</Text>
                                </View>
                            </View>
                            <View style={{ flexDirection: "column", marginLeft: -10 }}>
                                <View style={[styles.progressBlock]}>
                                    <View style={[styles.progressVertical,
                                    {
                                        transform: [{ rotateX: "180deg" }],
                                        height: 200
                                    }
                                    ]}>
                                        <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={["#FF9999", colors.red]} style={[styles.progressVerticalValue, { height: "65%" }]}></LinearGradient>
                                    </View>
                                </View>
                                <View style={{ alignSelf: "flex-start", flexWrap: "nowrap", marginLeft: -10, marginTop: 20 }}>
                                    <Text style={[baseStyles.textColorWhite, { fontSize: 8, transform: [{ rotate: "-90deg" }] }]}>Mar 2019</Text>
                                </View>
                            </View>
                            <View style={{ flexDirection: "column", marginLeft: -10 }}>
                                <View style={[styles.progressBlock]}>
                                    <View style={[styles.progressVertical,
                                    {
                                        transform: [{ rotateX: "180deg" }],
                                        height: 200
                                    }
                                    ]}>
                                        <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={["#FF9999", colors.red]} style={[styles.progressVerticalValue, { height: "70%" }]}></LinearGradient>
                                    </View>
                                </View>
                                <View style={{ alignSelf: "flex-start", flexWrap: "nowrap", marginLeft: -10, marginTop: 20 }}>
                                    <Text style={[baseStyles.textColorWhite, { fontSize: 8, transform: [{ rotate: "-90deg" }] }]}>Avr 2019</Text>
                                </View>
                            </View>
                            <View style={{ flexDirection: "column", marginLeft: -10 }}>
                                <View style={[styles.progressBlock]}>
                                    <View style={[styles.progressVertical,
                                    {
                                        transform: [{ rotateX: "180deg" }],
                                        height: 200
                                    }
                                    ]}>
                                        <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={["#FF9999", colors.red]} style={[styles.progressVerticalValue, { height: "80%" }]}></LinearGradient>
                                    </View>
                                </View>
                                <View style={{ alignSelf: "flex-start", flexWrap: "nowrap", marginLeft: -10, marginTop: 20 }}>
                                    <Text style={[baseStyles.textColorWhite, { fontSize: 8, transform: [{ rotate: "-90deg" }] }]}>Mai 2019</Text>
                                </View>
                            </View>
                        </View>
                    </View>

                    <View style={{ margin: 10 }}></View>

                    <TouchableOpacity style={[styles.noSelectedBtn]}
                        onPress={() => {
                            console.log("Chenging Zone")
                            // this.setState({ zonePicker: true })
                        }}>
                        <View style={[styles.headCtn]}>
                            <Text style={[baseStyles.titleText]}>
                                {"TOTAUX (minutes)"}
                            </Text>
                        </View>
                    </TouchableOpacity>

                    <View style={{ margin: 5 }}></View>
                    <View style={{ flexDirection: "row", justifyContent: "space-around", width: screenWidth * 0.9 }}>
                        <View style={{ flexDirection: "column", width: screenWidth * 0.4, height: 100, borderRadius: 5, borderWidth: 1, borderColor: "#fff", justifyContent: "center", alignSelf: "center" }}>
                            <Text style={[baseStyles.textColorWhite, { fontSize: 28, fontWeight: "bold", textAlign: "center" }]}>49</Text>
                            <Text style={[styles.qtText, { textAlign: "center", color: "grey" }]}>Temps min</Text>
                        </View>
                        <View style={{ flexDirection: "column", width: screenWidth * 0.4, height: 100, borderRadius: 5, borderWidth: 1, borderColor: "#fff", justifyContent: "center", alignSelf: "center" }}>
                            <Text style={[baseStyles.textColorWhite, { fontSize: 28, fontWeight: "bold", textAlign: "center" }]}>90</Text>
                            <Text style={[styles.qtText, { textAlign: "center", color: "grey" }]}>Temps max</Text>
                        </View>
                    </View>
                    <View style={{ margin: 5 }}></View>
                    <View style={{ flexDirection: "row", justifyContent: "space-around", width: screenWidth * 0.9 }}>
                        <View style={{ flexDirection: "column", width: screenWidth * 0.4, height: 100, borderRadius: 5, borderWidth: 1, borderColor: "#fff", justifyContent: "center", alignSelf: "center" }}>
                            <Text style={[baseStyles.textColorWhite, { fontSize: 28, fontWeight: "bold", textAlign: "center" }]}>60</Text>
                            <Text style={[styles.qtText, { textAlign: "center", color: "grey" }]}>Moyenne annuelle</Text>
                        </View>
                        <View style={{ flexDirection: "column", width: screenWidth * 0.4, height: 100, borderRadius: 5, borderWidth: 1, borderColor: "#fff", justifyContent: "center", alignSelf: "center" }}>
                            <Text style={[baseStyles.textColorWhite, { fontSize: 28, fontWeight: "bold", textAlign: "center" }]}>920</Text>
                            <Text style={[styles.qtText, { textAlign: "center", color: "grey" }]}>Temps total</Text>
                        </View>
                    </View>
                    <View style={{ margin: 5 }}></View>
                </ScrollView>
            </LinearGradient>
        )
    }
}

// export default AddTension;
const mapStateToProps = (state) => {
    const { selectedZone,popToTop } = state.statedata
    return { selectedZone,popToTop }
};

export default connect(mapStateToProps)(TempsDeJeu);
