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
import baseStyles from '../../../base/BaseStyles';
import styles from './styles';
import colors from '../../../configs/colors';
import LinearGradient from 'react-native-linear-gradient';
import AutoHeightImage from 'react-native-auto-height-image';
import CorpsHelper from "../../../apis/helpers/corps_helper";
import AsyncStorage from '@react-native-community/async-storage';
import {SET_POP_TO_TOP} from "../../../redux/types/tabTypes";
import statusBarHeight from '../../../configs/screen';

const screen = Dimensions.get("window");
const SBHelight = statusBarHeight;
const screenWidth = screen.width
const screenHeight = screen.height - SBHelight

class MyBodyTemplates extends Component {
    constructor(props) {
        super(props)
        this.state = {
            activeMenu: 2,
            selectedZone: props.selectedZone,
            zonePicker: false,
            pathologie_text: "Traumatismes",
            autre_text: "Xxxxx",
            date_text: "07/06/2019",
            operation: false,
            indispo_time: "2 semaines",
            data:"",
            popToTop:this.props.popToTop,
        }
    }
    componentDidMount = async()=>{
        const userToken = await AsyncStorage.getItem("userToken")
        let responseCorps = await CorpsHelper.getCorps(userToken)
        console.log(responseCorps)
        this.setState({data: responseCorps.data})

    };
    render() {
        if(this.props.popToTop === 'sante'){
            this.props.navigation.popToTop();
            const setPopToTop = { type: SET_POP_TO_TOP, value: '' }
            this.props.dispatch(setPopToTop);
        }
        return (
            // <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }} colors={[colors.balck, colors.green, colors.balck]} style={baseStyles.linearGradient}>

                <ScrollView
                    style={styles.scrollView}
                    contentContainerStyle={[styles.contentContainerStyle]}
                    keyboardShouldPersistTaps={'always'}
                >
                    <TouchableOpacity style={[styles.noSelectedBtn]}
                        onPress={() => {
                            console.log("Chenging Zone")
                            this.setState({ zonePicker: true })
                        }}>
                        <View style={[styles.headCtn]}>
                            <Text style={[baseStyles.titleText]}>
                                Mon corps
                            </Text>
                        </View>
                    </TouchableOpacity>


                    {/* {this.props.selectedZone.id != 0 ? */}

                    <View style={{ justifyContent: "space-between", alignItems: "center" }}>
                        <View style={{}}>
                            <View style={[styles.inputBlock]}>
                                <View style={{ flexDirection: "row", alignItems: "center" }}>
                                    <Text style={[baseStyles.textColorWhite]}>IMC</Text>
                                    <AutoHeightImage
                                        width={15}
                                        source={require('../../../assets/icons/shape.red.1.png')}
                                        style={{ marginLeft: 5, marginRight: 5 }}
                                    />
                                    <View style={{ flexDirection: "row" }}>
                                        <View style={{ paddingLeft: 10, paddingRight: 10 }}>
                                            <Text style={[baseStyles.textColorWhite, { fontSize: 8 }]}>{"< 18,4"}</Text>
                                            <Text style={[baseStyles.textColorWhite, { fontSize: 8 }]}>{"18,5 - 25"}</Text>
                                            <Text style={[baseStyles.textColorWhite, { fontSize: 8 }]}>{"25,1 - 30"}</Text>
                                            <Text style={[baseStyles.textColorWhite, { fontSize: 8 }]}>{"30,1 - 35"}</Text>
                                        </View>
                                        <View style={{ paddingLeft: 10, paddingRight: 10 }}>
                                            <Text style={[baseStyles.textColorWhite, { fontSize: 8 }]}>Déficit</Text>
                                            <Text style={[baseStyles.textColorWhite, { fontSize: 8 }]}>Poids</Text>
                                            <Text style={[baseStyles.textColorWhite, { fontSize: 8 }]}>Surpoids</Text>
                                            <Text style={[baseStyles.textColorWhite, { fontSize: 8 }]}>Obésité</Text>
                                        </View>
                                    </View>
                                </View>

                                <Text style={[baseStyles.textColorWhite]}>{this.state.data.imc}</Text>
                            </View>
                            <View style={[styles.inputBlock]}>
                                <View style={{ flexDirection: "row", alignItems: "center" }}>
                                    <Text style={[baseStyles.textColorWhite]}>IMG</Text>
                                    <AutoHeightImage
                                        width={15}
                                        source={require('../../../assets/icons/shape.red.1.png')}
                                        style={{ marginLeft: 5, marginRight: 5 }}
                                    />
                                </View>
                                <Text style={[baseStyles.textColorWhite]}>{this.state.data.img}%</Text>
                            </View>

                            <View style={[styles.inputBlock]}>
                                <Text style={[baseStyles.textColorWhite]}>Masse grasse</Text>
                                <Text style={[baseStyles.textColorWhite]}>{this.state.data.masse_grasse} kg</Text>
                            </View>

                            <View style={[styles.inputBlock]}>
                                <Text style={[baseStyles.textColorWhite]}>Masse maigre</Text>
                                <Text style={[baseStyles.textColorWhite]}>{this.state.data.masse_maigre} kg</Text>
                            </View>

                            <View style={[styles.inputBlock]}>
                            <View style={{ flexDirection: "row", alignItems: "center" }}>
                                    <Text style={[baseStyles.textColorWhite]}>FFMI</Text>
                                    <AutoHeightImage
                                        width={15}
                                        source={require('../../../assets/icons/shape.red.1.png')}
                                        style={{ marginLeft: 5, marginRight: 5 }}
                                    />
                                </View>
                                <Text style={[baseStyles.textColorWhite]}>{this.state.data.ffmi}</Text>
                            </View>
                            <View style={[styles.inputBlock, styles.lastInputBlock]}>
                                <Text style={[baseStyles.textColorWhite]}>Poids idéal</Text>
                                <Text style={[baseStyles.textColorWhite]}>{this.state.data.poids_ideal} kg</Text>
                            </View>
                        </View>

                    </View>

                </ScrollView>

            // </LinearGradient>
        )
    }
}

// export default MyBody;
const mapStateToProps = (state) => {
    const { selectedZone,popToTop } = state.statedata
    return { selectedZone,popToTop }
};

export default connect(mapStateToProps)(MyBodyTemplates);
