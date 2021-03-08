import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    ScrollView,
    View,
    Text,
    TouchableOpacity,
    Dimensions,
    StatusBar,
} from 'react-native';
import zones from '../../redux/actions/listZone';
import styles from './styles';
import AutoHeightImage from 'react-native-auto-height-image';
import colors from '../../configs/colors';
import { SET_ZONE } from '../../redux/types/tabTypes';
import baseStyles from '../../base/BaseStyles';
import statusBarHeight from '../../configs/screen';

const screen = Dimensions.get("window");
const SBHelight = statusBarHeight;
const screenWidth = screen.width
const screenHeight = screen.height - SBHelight

class ZonePicker extends Component {
    constructor(props) {
        super(props)
        this.state = {
            selectedZone: props.selectedZone
        }
    }

    render() {
        return (
            <ScrollView style={{ backgroundColor: colors.balck + "FF", padding: 20, paddingBottom: 50 }}>
                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                        minWidth: screenWidth,
                        paddingLeft: 15,
                        paddingRight: 15
                    }}>
                    <TouchableOpacity style={[styles.noSelectedBtn, { width: 60 }]}
                        onPress={() => {
                            console.log("Changing Zone")
                            // this.props.navigation.goBack()
                            this.props.close()
                        }}>
                        <AutoHeightImage
                            width={18}
                            source={require("../../assets/icons/arrow-white.png")}
                            style={{
                                transform: [
                                    { rotateY: "180deg" }
                                ]
                            }} />
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.noSelectedBtn, { alignSelf: "center" }]}
                        onPress={() => {
                            console.log("Chenging Zone")
                            this.setState({ zonePicker: true })
                        }}>
                        {/* <View style={{}}> */}
                        <View style={[styles.headCtn]}>
                            <Text style={[baseStyles.titleText]}>
                                Ajouter une {this.props.type}
                            </Text>
                        </View>
                    </TouchableOpacity>
                    <View style={{ width: 60 }}>
                        <Text style={{ color: colors.balck + "00" }}>...</Text>
                    </View>

                </View>
                <View style={[styles.noSelectedBtn, { padding: 15 }]}>
                    <View style={[styles.noSelectedCtn]}>
                        <Text style={[baseStyles.textColorWhite, { textAlign: "center" }]}>Sélectionner une zone correspondant à une zone de {this.props.type}</Text>
                        <Text style={[baseStyles.textColorWhite]}></Text>
                    </View>
                </View>
                <TouchableOpacity
                    style={{ padding: 10, width: screenWidth }}
                    onPress={() => {
                        this.props.close()
                    }}>
                    <Text style={[baseStyles.textColorWhite, { color: colors.red }]}>Annuler</Text>
                </TouchableOpacity>
                {
                    zones.map((item, index) => {
                        return (
                            <TouchableOpacity key={("zone_" + index)}
                                onPress={() => {
                                    const setSelectedZone = { type: SET_ZONE, value: item }
                                    this.props.dispatch(setSelectedZone)
                                    this.props.close()
                                }}>
                                <View style={[styles.zoneItem]}>
                                    <View style={{
                                        width: screenWidth * 0.4,
                                        flexDirection: "row",
                                        justifyContent: "space-between",
                                    }}>
                                        <AutoHeightImage
                                            width={screenWidth * 0.15}
                                            source={require("../../assets/images/epaule.png")} />
                                        <Text style={[baseStyles.textColorWhite]}>
                                            {item.text}
                                        </Text>
                                    </View>
                                    {/* {item.id == this.props.selectedZone.id && this.props.selectedZone.id != 0 ?
                                        <AutoHeightImage
                                            width={16}
                                            source={require("../../assets/icons/check.mark.white.png")} /> : null
                                    } */}
                                    <AutoHeightImage
                                        width={screenWidth * 0.03}
                                        source={require("../../assets/icons/arrow-white.png")}
                                        style={{}} />
                                </View>
                            </TouchableOpacity>
                        )
                    })
                }
            </ScrollView>
        )
    }
}

// export default ZonePicker;
const mapStateToProps = (state) => {
    const { selectedZone } = state.statedata
    return { selectedZone }
};

export default connect(mapStateToProps)(ZonePicker);
