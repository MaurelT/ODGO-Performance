import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    Dimensions,
    StatusBar,
    ScrollView,
    View,
    TouchableOpacity,
    Text
} from 'react-native';
import colors from '../../../configs/colors';
import baseStyles from '../../../base/BaseStyles';
import LinearGradient from 'react-native-linear-gradient';
import styles from './styles';
import AutoHeightImage from 'react-native-auto-height-image';
import {SET_ACTIVE_TAB, SET_POP_TO_TOP} from '../../../redux/types/tabTypes';
import statusBarHeight from '../../../configs/screen';
import {getDashboar} from '../../../apis/FonctionRedondant';
import dashboardHelper from '../../../apis/helpers/dashboard_helper';

const screen = Dimensions.get("window");
const SBHelight = statusBarHeight;
const screenWidth = screen.width
const screenHeight = screen.height - SBHelight

class StatEnergy extends Component {
    constructor(props) {
        super(props)
        this.state = {
            listEnergy: props.listEnergy,
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
                    contentInsetAdjustmentBehavior="automatic"
                    style={styles.scrollView}
                    contentContainerStyle={[styles.contentContainerStyle]}>


                    <View style={{ alignItems :"center",justifyContent:"center",width:"100%",marginVertical:15  }}>
                        <TouchableOpacity
                            onPress={() => {
                                console.log("Changing Zone")
                                this.props.navigation.goBack()
                            }}
                            style={{width:50,position:"absolute",left:0}}
                        >
                            <AutoHeightImage
                                width={18}
                                source={require('../../../assets/icons/arrow-white.png')}
                                style={{
                                    marginLeft:15,
                                    transform: [
                                        { rotateY: "180deg" }
                                    ],
                                }}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity style={{ alignSelf:"center"}}
                                          onPress={async () => {
                                              console.log("Chenging Zone")
                                              // await this.setState({ selectedType: "" })
                                              // await this.setState({ activeContent: "choice" })
                                          }}>
                                <Text style={[baseStyles.titleText]}>
                                    {"Énergétiques"}
                                </Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ alignItems: "center", width: screenWidth }}>

                        {
                            this.props.listEnergy.map((value, index) =>
                            {
                                return (
                                    <TouchableOpacity key={"ExItem" + index}
                                        onPress={() =>
                                        {
                                            if(value.title=='Sommeil'){
                                             //   this.props.navigation.navigate("Sommeil")
                                            }else if(value.title=='Hydratation')
                                            {
                                                // this.props.navigation.navigate("Hydratation")
                                            }
                                            // const setExToShow = { type: SET_EXERCICE_TO_SHOW, value: value }
                                            // this.props.dispatch(setExToShow)
                                            // this.props.navigation.navigate("SingleExercice")
                                        }}
                                    >
                                        <View style={[styles.videoItemCtn, (index == (this.state.listEnergy.length - 1) ? styles.videoItemCtnLast : {})]}>
                                            <AutoHeightImage
                                                width={24}
                                                source={value.icon}
                                                style={{
                                                    marginRight: 20
                                                }} />
                                            <Text style={[baseStyles.textColorWhite, { marginRight: 10 }]}>{value.title}</Text>

                                            <AutoHeightImage
                                                width={14}
                                                source={require("../../../assets/icons/arrow-white.png")}
                                                style={[styles.arrowRightIcon]} />
                                        </View>
                                    </TouchableOpacity>
                                )
                            })
                        }

                    </View>

                </ScrollView>

            </LinearGradient>
        )
    }
}

// export default StatEnergy;
const mapStateToProps = (state) => {
    const { listEnergy,popToTop } = state.statedata
    return { listEnergy,popToTop }
};

export default connect(mapStateToProps)(StatEnergy);
