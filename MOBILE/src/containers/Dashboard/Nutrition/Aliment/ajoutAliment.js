import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    ScrollView,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Dimensions,
    StatusBar,
    Modal
} from 'react-native';
import baseStyles from '../../../../base/BaseStyles';
import styles from './styles';
import colors from '../../../../configs/colors';
import LinearGradient from 'react-native-linear-gradient';
// import ZonePicker from '../../../../components/ZonePicker/ZonePicker';
// import MAAButton from '../../../../components/MAAButton/MAAButton';
import AutoHeightImage from 'react-native-auto-height-image';
import statusBarHeight from '../../../../configs/screen';
// import ProgressCircle from 'react-native-progress-circle';


const screen = Dimensions.get("window");
const SBHelight = statusBarHeight;
const screenWidth = screen.width
const screenHeight = screen.height - SBHelight

class AjoutAliment extends Component {

    constructor(props) {
        super(props)
        this.state = {
            activeMenu: 'aliments',
            selectedZone: props.selectedZone,
            zonePicker: false,
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
                    <TouchableOpacity style={[styles.noSelectedBtn,{flexDirection:'row',alignItems:'center'}]}
                        onPress={() => {
                            console.log("Chenging Zone")
                            // this.setState({ zonePicker: true })
                            this.props.navigation.pop()
                        }}>
                        <AutoHeightImage
                            width={18}
                            source={require('../../../../assets/icons/left.arrow.white.png')} />
                        <View style={[styles.headCtn,{marginLeft:40}]}>
                            <Text style={[baseStyles.titleText]}>
                                {"Ajout Aliment"}
                            </Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity style={{ width: screenWidth, height: 40 }}>
                        <View style={[styles.goToNowCtn]}>
                            <AutoHeightImage
                                width={18}
                                source={require('../../../../assets/icons/left.arrow.white.png')} />
                            <Text style={[baseStyles.textColorWhite, { fontSize: 20 }]}>
                                Déjeuner
                            </Text>
                            <AutoHeightImage
                                width={18}
                                source={require('../../../../assets/icons/left.arrow.white.png')}
                                style={{ transform: [{ rotateY: "180deg" }] }}
                            // style={{ opacity: 0 }}
                            />
                        </View>
                    </TouchableOpacity>

                    <View style={{ margin: 10 }}></View>

                    <View style={{ margin: 15, borderRadius: 5, borderWidth: 0.5, borderColor: "lightgrey", padding: 15, width: screenWidth * 0.9 }}>

                        <View style={{ flexDirection: "column", width: screenWidth * 0.9 }}>
                            <Text style={[styles.qtText]}>MON REPAS : 950 kcal</Text>
                            <View style={[styles.progressBlock]}>
                                <View style={[styles.progressCtn]}>
                                    <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={[colors.red+'af', colors.red]} style={[styles.progressValue, { width: "75%" }]}></LinearGradient>
                                </View>
                                <Text style={[styles.qtText, {}]}>75%</Text>

                            </View>
                        </View>
                        <View style={{ margin: 5 }}></View>
                        <View style={{ flexDirection: "row", justifyContent: "space-around", marginLeft: 5 }}>
                            <View style={{ flexDirection: "column", width: screenWidth * 0.3 }}>
                                <Text style={[styles.qtText]}>Glucides</Text>
                                <Text style={[styles.qtText, { color: "lightgrey", fontSize: 8 }]}>90 / 109 g</Text>
                                <View style={[styles.progressBlock]}>
                                    <View style={[styles.progressCtn]}>
                                        <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={[colors.red+'af', colors.red]} style={[styles.progressValue, { width: "60%" }]}></LinearGradient>
                                    </View>
                                </View>
                            </View>
                            <View style={{ flexDirection: "column", width: screenWidth * 0.3 }}>
                                <Text style={[styles.qtText]}>Protéines</Text>
                                <Text style={[styles.qtText, { color: "lightgrey", fontSize: 8 }]}>35 / 40 g</Text>
                                <View style={[styles.progressBlock]}>
                                    <View style={[styles.progressCtn]}>
                                        <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={[colors.red+'af', colors.red]} style={[styles.progressValue, { width: "80%" }]}></LinearGradient>
                                    </View>
                                </View>
                            </View>
                            <View style={{ flexDirection: "column", width: screenWidth * 0.3 }}>
                                <Text style={[styles.qtText]}>Lipides</Text>
                                <Text style={[styles.qtText, { color: "lightgrey", fontSize: 8 }]}>10 / 20 g</Text>
                                <View style={[styles.progressBlock]}>
                                    <View style={[styles.progressCtn]}>
                                        <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={[colors.red+'af', colors.red]} style={[styles.progressValue, { width: "40%" }]}></LinearGradient>
                                    </View>
                                </View>
                            </View>
                        </View>

                    </View>
                    <View style={{ margin: 15, borderRadius: 5, borderWidth: 0.5, borderColor: "lightgrey", padding: 15, width: screenWidth * 0.9 }}>

                        <View style={{ flexDirection: "column", width: screenWidth * 0.9 }}>
                            <Text style={[styles.qtText]}>OBJECTIF DU JOUR : 2900 kcal</Text>
                            <View style={[styles.progressBlock]}>
                                <View style={[styles.progressCtn]}>
                                    <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={[colors.red+'af', colors.red]} style={[styles.progressValue, { width: "83%" }]}></LinearGradient>
                                </View>
                                <Text style={[styles.qtText, {}]}>83%</Text>

                            </View>
                        </View>
                    </View>
                    <View style={{ margin: 5 }}></View>
                    <View style={{ flexDirection: "row", justifyContent: "space-around", width: screenWidth * 0.85 }}>
                        <TouchableOpacity
                            onPress={() => this.setState({ activeMenu: 'aliments' })}
                            style={
                                this.state.activeMenu == 'aliments' ?
                                    { borderBottomColor: colors.red, padding: 10, borderBottomWidth: 1, borderTopWidth: 0, borderLeftWidth: 0, borderRightWidth: 0 } :
                                    { borderBottomColor: colors.red, padding: 10, borderBottomWidth: 0, borderTopWidth: 0, borderLeftWidth: 0, borderRightWidth: 0 }

                            }>
                            <Text style={[styles.qtText]}>ALIMENTS</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.setState({ activeMenu: 'repas' })}
                            style={
                                this.state.activeMenu == 'repas' ?
                                    { borderBottomColor: colors.red, padding: 10, borderBottomWidth: 1, borderTopWidth: 0, borderLeftWidth: 0, borderRightWidth: 0 } :
                                    { borderBottomColor: colors.red, padding: 10, borderBottomWidth: 0, borderTopWidth: 0, borderLeftWidth: 0, borderRightWidth: 0 }

                            }>
                            <Text style={[styles.qtText]}>REPAS</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.setState({ activeMenu: 'recettes' })}
                            style={
                                this.state.activeMenu == 'recettes' ?
                                    { borderBottomColor: colors.red, padding: 10, borderBottomWidth: 1, borderTopWidth: 0, borderLeftWidth: 0, borderRightWidth: 0 } :
                                    { borderBottomColor: colors.red, padding: 10, borderBottomWidth: 0, borderTopWidth: 0, borderLeftWidth: 0, borderRightWidth: 0 }

                            }>
                            <Text style={[styles.qtText]}>RECETTES</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.setState({ activeMenu: 'liste' })}
                            style={
                                this.state.activeMenu == 'liste' ?
                                    { borderBottomColor: colors.red, padding: 10, borderBottomWidth: 1, borderTopWidth: 0, borderLeftWidth: 0, borderRightWidth: 0 } :
                                    { borderBottomColor: colors.red, padding: 10, borderBottomWidth: 0, borderTopWidth: 0, borderLeftWidth: 0, borderRightWidth: 0 }

                            }>
                            <Text style={[styles.qtText]}>LISTE</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ margin: 10 }}></View>
                    <View style={{ flexDirection: "row", justifyContent: "space-around", width: screenWidth * 0.8, borderRadius: screenWidth * 0.4, borderColor: "#fff", borderWidth: 1, padding: 0 }}>
                        <AutoHeightImage
                            width={15}
                            source={require("../../../../assets/icons/search.png")}
                            style={{ alignSelf: "center" }}
                        />
                        {/* <Text style={[styles.qtText]}>Rechercher un aliment</Text> */}
                        <TextInput
                            placeholderTextColor="#fff"
                            placeholder="Rechercher un aliment"
                            style={styles.qtText}
                        />
                        <AutoHeightImage
                            width={15}
                            source={require("../../../../assets/icons/search.png")}
                            style={{ opacity: 0 }}
                        />
                    </View>
                    <View style={{ margin: 10 }}></View>
                    <View style={{ flexDirection: "row", width: screenWidth * 0.9, justifyContent: "flex-start" }}>
                        <Text style={[styles.qtText, { fontSize: 14 }]}>Nos suggestions</Text>
                    </View>
                    <View style={{ margin: 5 }}></View>
                    <View style={{ flexDirection: "column", width: screenWidth * 0.9, backgroundColor: "grey", paddingLeft: 10 }}>
                        <Text style={[styles.qtText, { color: colors.green, fontWeight: "bold", fontSize: 14 }]}>{'fruits'.toUpperCase()}</Text>
                    </View>
                    <View style={{ margin: 5 }}></View>
                    <View style={{ flexDirection: "row", justifyContent: "space-between", width: screenWidth * 0.9, }}>
                        <View style={{ flexDirection: "row", width: screenWidth * 0.5, }}>
                            <TouchableOpacity
                                style={{ alignSelf: 'center', backgroundColor: "grey", borderRadius: 30, padding: 5, marginLeft:5 }}
                            >
                                <AutoHeightImage
                                    width={15}
                                    source={require("../../../../assets/icons/add.white.png")}
                                    style={{ alignSelf: 'center' }}
                                />
                            </TouchableOpacity>


                            <AutoHeightImage
                                width={30}
                                source={require("../../../../assets/icons/apples.png")}
                                style={{ alignSelf: 'center', marginLeft:5, marginRight:5 }}
                            />
                            <View style={{ flexDirection: 'column',width: screenWidth*0.3 }}>
                                <Text style={[styles.qtText, { fontSize: 12 }]}>Banana</Text>
                                <Text style={[styles.qtText, { color: "lightgrey", fontSize: 8 }]}>1 fruit (150g)</Text>

                            </View>
                        </View>
                        <View style={{ flexDirection: "row", justifyContent: 'space-between', width: screenWidth * 0.25, }}>
                            <View style={{ alignSelf: 'center' }}>
                                <Text style={[styles.qtText, { color: colors.red, fontSize: 12 }]}>134 kcal</Text>
                            </View>
                            <AutoHeightImage
                                width={15}
                                source={require("../../../../assets/icons/arrow-white.png")}
                                style={{ alignSelf: 'center',}}
                            />
                        </View>
                    </View>
                    <View style={{ margin: 5 }}></View>
                    <View style={{ flexDirection: "row", justifyContent: "space-between", width: screenWidth * 0.9, }}>
                        <View style={{ flexDirection: "row", width: screenWidth * 0.5, }}>
                            <TouchableOpacity
                                style={{ alignSelf: 'center', backgroundColor: colors.red, borderRadius: 30, padding: 5, marginLeft:5 }}
                            >
                                <AutoHeightImage
                                    width={15}
                                    source={require("../../../../assets/icons/check.mark.white.png")}
                                    style={{ alignSelf: 'center' }}
                                />
                            </TouchableOpacity>


                            <AutoHeightImage
                                width={30}
                                source={require("../../../../assets/icons/apples.png")}
                                style={{ alignSelf: 'center', marginRight:5,marginLeft:5 }}
                            />
                            <View style={{ flexDirection: 'column',width: screenWidth*0.3 }}>
                                <Text style={[styles.qtText, { fontSize: 12 }]}>Pomme</Text>
                                <Text style={[styles.qtText, { color: "lightgrey", fontSize: 8 }]}>1 fruit (180g)</Text>

                            </View>
                        </View>
                        <View style={{ flexDirection: "row", justifyContent: 'space-between', width: screenWidth * 0.25, }}>
                            <View style={{ alignSelf: 'center' }}>
                                <Text style={[styles.qtText, { color: colors.red, fontSize: 12 }]}>95 kcal</Text>
                            </View>
                            <AutoHeightImage
                                width={15}
                                source={require("../../../../assets/icons/arrow-white.png")}
                                style={{ alignSelf: 'center', marginLeft: 5 }}
                            />
                        </View>
                    </View>

                    <View style={{ margin: 5 }}></View>
                    <View style={{ flexDirection: "column", width: screenWidth * 0.9, backgroundColor: "grey", paddingLeft: 10 }}>
                        <Text style={[styles.qtText, { color: colors.green, fontWeight: "bold", fontSize: 14 }]}>{'céréales'.toUpperCase()}</Text>
                    </View>
                    <View style={{ margin: 5 }}></View>
                    <View style={{ flexDirection: "row", justifyContent: "space-between", width: screenWidth * 0.9, }}>
                        <View style={{ flexDirection: "row", width: screenWidth * 0.5, }}>
                            <TouchableOpacity
                                style={{ alignSelf: 'center', backgroundColor: "grey", borderRadius: 30, padding: 5, marginLeft:5 }}
                            >
                                <AutoHeightImage
                                    width={15}
                                    source={require("../../../../assets/icons/add.white.png")}
                                    style={{ alignSelf: 'center' }}
                                />
                            </TouchableOpacity>


                            <AutoHeightImage
                                width={30}
                                source={require("../../../../assets/icons/apples.png")}
                                style={{ alignSelf: 'center', marginRight:5,marginLeft:5 }}
                            />
                            <View style={{ flexDirection: 'column',width: screenWidth*0.3 }}>
                                <Text style={[styles.qtText, { fontSize: 12 }]}>Pain Blanc</Text>
                                <Text style={[styles.qtText, { color: "lightgrey", fontSize: 8 }]}>1 tranche (28g)</Text>

                            </View>
                        </View>
                        <View style={{ flexDirection: "row", justifyContent: 'space-between', width: screenWidth * 0.25, }}>
                            <View style={{ alignSelf: 'center' }}>
                                <Text style={[styles.qtText, { color: colors.red, fontSize: 12 }]}>74 kcal</Text>
                            </View>
                            <AutoHeightImage
                                width={15}
                                source={require("../../../../assets/icons/arrow-white.png")}
                                style={{ alignSelf: 'center'}}
                            />
                        </View>
                    </View>
                    <View style={{ margin: 5 }}></View>
                    <View style={{ flexDirection: "row", justifyContent: "space-between", width: screenWidth * 0.9, }}>
                        <View style={{ flexDirection: "row", width: screenWidth * 0.5, }}>
                            <TouchableOpacity
                                style={{ alignSelf: 'center', backgroundColor: colors.red, borderRadius: 30, padding: 5, marginLeft:5 }}
                            >
                                <AutoHeightImage
                                    width={15}
                                    source={require("../../../../assets/icons/check.mark.white.png")}
                                    style={{ alignSelf: 'center' }}
                                />
                            </TouchableOpacity>


                            <AutoHeightImage
                                width={30}
                                source={require("../../../../assets/icons/apples.png")}
                                style={{ alignSelf: 'center',marginRight:5,marginLeft:5 }}
                            />
                            <View style={{ flexDirection: 'column', width: screenWidth*0.3 }}>
                                <Text style={[styles.qtText, { fontSize: 12 }]}>Pain aux céréales</Text>
                                <Text style={[styles.qtText, { color: "lightgrey", fontSize: 8 }]}>1 tranche (30g)</Text>

                            </View>
                        </View>
                        <View style={{ flexDirection: "row", justifyContent: 'space-between', width: screenWidth * 0.25, }}>
                            <View style={{ alignSelf: 'center' }}>
                                <Text style={[styles.qtText, { color: colors.red, fontSize: 12 }]}>79 kcal</Text>
                            </View>
                            <AutoHeightImage
                                width={15}
                                source={require("../../../../assets/icons/arrow-white.png")}
                                style={{ alignSelf: 'center', marginLeft: 5 }}
                            />
                        </View>
                    </View>
                    {/* <View style={{ margin: 10 }}></View> */}
                    <View style={{ margin: 5 }}></View>
                    <View style={{ flexDirection: "column", width: screenWidth * 0.9, backgroundColor: "grey", paddingLeft: 10 }}>
                        <Text style={[styles.qtText, { color: colors.green, fontWeight: "bold", fontSize: 14 }]}>{'jus'.toUpperCase()}</Text>
                    </View>
                    <View style={{ margin: 5 }}></View>
                    <View style={{ flexDirection: "row", justifyContent: "space-between", width: screenWidth * 0.9, }}>
                        <View style={{ flexDirection: "row", width: screenWidth * 0.5, }}>
                            <TouchableOpacity
                                style={{ alignSelf: 'center', backgroundColor: colors.red, borderRadius: 30, padding: 5, marginLeft:5 }}
                            >
                                <AutoHeightImage
                                    width={15}
                                    source={require("../../../../assets/icons/check.mark.white.png")}
                                    style={{ alignSelf: 'center' }}
                                />
                            </TouchableOpacity>


                            <AutoHeightImage
                                width={30}
                                source={require("../../../../assets/icons/apples.png")}
                                style={{ alignSelf: 'center',marginRight:5,marginLeft:5 }}
                            />
                            <View style={{ flexDirection: 'column', width: screenWidth*0.3 }}>
                                <Text style={[styles.qtText, { fontSize: 12 }]}>Jus d'orange</Text>
                                <Text style={[styles.qtText, { color: "lightgrey", fontSize: 8 }]}>1 verre (248ml)</Text>

                            </View>
                        </View>
                        <View style={{ flexDirection: "row", justifyContent: 'space-between', width: screenWidth * 0.25, }}>
                            <View style={{ alignSelf: 'center' }}>
                                <Text style={[styles.qtText, { color: colors.red, fontSize: 12 }]}>112 kcal</Text>
                            </View>
                            <AutoHeightImage
                                width={15}
                                source={require("../../../../assets/icons/arrow-white.png")}
                                style={{ alignSelf: 'center', marginLeft: 5 }}
                            />
                        </View>
                    </View>
                    {/* <View style={{ margin: 10 }}></View> */}
                    <View style={{ margin: 5 }}></View>
                    <View style={{ flexDirection: "column", width: screenWidth * 0.9, backgroundColor: "grey", paddingLeft: 10 }}>
                        <Text style={[styles.qtText, { color: colors.green, fontWeight: "bold", fontSize: 14 }]}>{'produits laitiers'.toUpperCase()}</Text>
                    </View>
                    <View style={{ margin: 5 }}></View>
                    <View style={{ flexDirection: "row", justifyContent: "space-between", width: screenWidth * 0.9, }}>
                        <View style={{ flexDirection: "row", width: screenWidth * 0.5, }}>
                            <TouchableOpacity
                                style={{ alignSelf: 'center', backgroundColor: "grey", borderRadius: 30, padding: 5, marginLeft:5 }}
                            >
                                <AutoHeightImage
                                    width={15}
                                    source={require("../../../../assets/icons/add.white.png")}
                                    style={{ alignSelf: 'center' }}
                                />
                            </TouchableOpacity>


                            <AutoHeightImage
                                width={30}
                                source={require("../../../../assets/icons/apples.png")}
                                style={{ alignSelf: 'center',marginRight:5,marginLeft:5 }}
                            />
                            <View style={{ flexDirection: 'column', width: screenWidth*0.3 }}>
                                <Text style={[styles.qtText, { fontSize: 12 }]}>Beurre</Text>
                                <Text style={[styles.qtText, { color: "lightgrey", fontSize: 8 }]}>1 c. à soupe (14,2g)</Text>

                            </View>
                        </View>
                        <View style={{ flexDirection: "row", justifyContent: 'space-between', width: screenWidth * 0.25, }}>
                            <View style={{ alignSelf: 'center' }}>
                                <Text style={[styles.qtText, { color: colors.red, fontSize: 12 }]}>102 kcal</Text>
                            </View>
                            <AutoHeightImage
                                width={15}
                                source={require("../../../../assets/icons/arrow-white.png")}
                                style={{ alignSelf: 'center', marginLeft: 5 }}
                            />
                        </View>
                    </View>
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

export default connect(mapStateToProps)(AjoutAliment);
