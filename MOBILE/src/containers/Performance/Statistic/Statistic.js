import React, { Component } from 'react';
import {
    Dimensions,
    StatusBar,
    ScrollView,
    View
} from 'react-native';
import colors from '../../../configs/colors';
import baseStyles from '../../../base/BaseStyles';
import AutoHeightImage from 'react-native-auto-height-image';
import LinearGradient from 'react-native-linear-gradient';
import styles from './styles';
import MAAButton from '../../../components/MAAButton/MAAButton';
import {SET_POP_TO_TOP} from "../../../redux/types/tabTypes";
import {connect} from "react-redux";
import statusBarHeight from '../../../configs/screen';

const screen = Dimensions.get("window");
const SBHelight = statusBarHeight;
const screenWidth = screen.width
const screenHeight = screen.height - SBHelight

class Statistic extends Component {
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

                <View
                    contentInsetAdjustmentBehavior="automatic"
                    style={styles.scrollView}
                    contentContainerStyle={[styles.contentContainerStyle]}>
                        <View style={[styles.block, {height: screenHeight/3}]}>
                            <AutoHeightImage
                                width={screenWidth}
                                source={require("../../../assets/images/bg.energy.png")}
                                style={[styles.bgImage]} />
                            <MAAButton text={"ÉNERGÉTIQUES"} width={screenWidth / 2}
                                // backgroundColor={"#581325ED"}
                                onPress={()=>{
                                    this.props.navigation.navigate("StatEnergy")
                                }} />
                        </View>
                        <View style={{width: screenWidth, height: 0.5, backgroundColor: colors.green + "AA"}}></View>
                        <View style={[styles.block, {height: screenHeight/3}]}>
                            <AutoHeightImage
                                width={screenWidth}
                                source={require("../../../assets/images/bg.sport.png")}
                                style={[styles.bgImage]} />
                            <MAAButton text={"SPORTIVES"} width={screenWidth / 2}
                                // backgroundColor={"#581325ED"}
                                onPress={()=>{
                                    this.props.navigation.navigate("StatSport")
                                }} />
                        </View>
                </View>

            </LinearGradient>
        )
    }
}

// export default Statistic;
const mapStateToProps = (state) => {
    const { popToTop } = state.statedata
    return { popToTop }
};

export default connect(mapStateToProps)(Statistic);
