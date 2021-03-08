import React, { Component } from 'react';
import {
    ScrollView,
    StatusBar,
    Dimensions,
    ImageBackground,
    View,
    Text
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import styles from './styles';
import colors from '../../configs/colors';
import baseStyles from '../../base/BaseStyles';
import MAAButton from '../../components/MAAButton/MAAButton';
import { TextInput } from 'react-native-gesture-handler';
import {SET_POP_TO_TOP} from "../../redux/types/tabTypes";
import {connect} from "react-redux";
import statusBarHeight from '../../configs/screen';


const screen = Dimensions.get("window");
const SBHelight = statusBarHeight;
const screenWidth = screen.width
const screenHeight = screen.height - SBHelight


class Sante extends Component {


    constructor(props) {
        super(props)
        this.state = {
            popToTop:this.props.popToTop,
        }
    }

    render() {
        if(this.props.popToTop === 'sante'){
            this.props.navigation.popToTop();
            const setPopToTop = { type: SET_POP_TO_TOP, value: '' }
            this.props.dispatch(setPopToTop);
        }
        return (
            <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }} colors={[colors.balck, colors.green, colors.balck]} style={[baseStyles.linearGradient, styles.linearGradient]}>

                <ScrollView
                    contentInsetAdjustmentBehavior="automatic"
                    // style={styles.scrollView}
                    contentContainerStyle={[styles.contentContainerStyle]}>

                    <ImageBackground
                        source={require("../../assets/images/people.jpg")}
                        style={[styles.imageBG]}
                    >

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
                                Mon carnet de santé
                                    </Text>
                        </View>

                        <View style={[styles.btnCtn]}>
                            <MAAButton
                                width={(screenWidth - 60) / 2}
                                text={"MON CORPS"}
                                fontSize={10}
                                style={{}}
                                onPress={()=>{
                                    this.props.navigation.navigate("MyBody")
                                }} />
                            <MAAButton
                                width={(screenWidth - 60) / 2}
                                text={"MES PATHOLOGIES"}
                                fontSize={10}
                                style={{}}
                                onPress={()=>{
                                    global.is_venudedonneperso=false;
                                    this.props.navigation.navigate("Pathologie")
                                }} />
                        </View>

                        {/* <TextInput placeholder={"Text example"} /> */}

                    </ImageBackground>

                </ScrollView>
            </LinearGradient>
        )
    }
}

// export default Sante;
const mapStateToProps = (state) => {
    const { popToTop } = state.statedata
    return { popToTop  }
};

export default connect(mapStateToProps)(Sante);
