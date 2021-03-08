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
import {connect} from "react-redux";
import {SET_POP_TO_TOP} from "../../redux/types/tabTypes";
import statusBarHeight from '../../configs/screen';

const screen = Dimensions.get('screen');
const SBHelight = statusBarHeight;
const screenWidth = screen.width
const screenHeight = screen.height - SBHelight


class Performance extends Component {
    constructor(props) {
        super(props)
        this.state = {
            popToTop:this.props.popToTop
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
                    contentInsetAdjustmentBehavior="automatic"
                    style={styles.scrollView}
                    contentContainerStyle={[styles.contentContainerStyle]}>

                    <View style={{
                        alignSelf: "flex-start",
                        width: screenWidth,
                        alignItems: "center",
                        justifyContent: "center",
                        padding: 15,
                        backgroundColor: colors.balck
                    }}>
                        <Text style={{
                            color: colors.white,
                            fontSize: 20
                        }}>
                            Mes performances
                        </Text>
                    </View>

                    <View style={[styles.btnCtn]}>

                        <TouchableOpacity
                            // onPress={() => this.props.navigation.navigate("HistoriqueCompetition")}>
                            onPress={() => this.props.navigation.navigate("CalendarWithPluginCompetition")}>
                            <View style={[styles.ctnMenu]}>
                                <Text style={[styles.btnMenuText]}>Historique des compétitions</Text>
                                <AutoHeightImage
                                    width={20}
                                    source={require("../../assets/icons/arrow-white.png")} />
                            </View>
                        </TouchableOpacity>

                        <View onPress={() => {
                            this.props.navigation.navigate("Statistic")
                        }}>
                            <View style={{borderColor:colors.grisee,
                                borderWidth: 2.5,
                                borderRadius: 5,
                                flexDirection: "row",
                                padding: 30,
                                alignItems: "center",
                                justifyContent: "space-between",
                                width: (screenWidth - 30),
                                marginTop: 15,
                                marginBottom: 15}}>
                                <View style={{flexDirection:'row',alignItems:'center'}}>
                                <Text style={[styles.btnMenuText,{color:colors.textgrisee}]} >Statistiques</Text>
                                <Text style={[{color:colors.textgrisee,fontSize:11,fontStyle:'italic'}]} > (bientôt disponible)</Text>
                                </View>
                                <AutoHeightImage
                                    width={20}
                                    style={{tintColor:colors.grisee}}
                                    source={require("../../assets/icons/arrow-white.png")} />
                            </View>
                        </View>

                    </View>

                </ScrollView>
            </LinearGradient>
        )
    }
}

// export default Performance;
const mapStateToProps = (state) => {
    const { popToTop } = state.statedata
    return { popToTop }
};

export default connect(mapStateToProps)(Performance);
