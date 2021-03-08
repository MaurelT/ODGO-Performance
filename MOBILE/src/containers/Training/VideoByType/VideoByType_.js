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
import {SET_EXERCICE_TO_SHOW, SET_POP_TO_TOP} from '../../../redux/types/tabTypes';
import statusBarHeight from '../../../configs/screen';

const screen = Dimensions.get("window");
const SBHelight = statusBarHeight;
const screenWidth = screen.width
const screenHeight = screen.height - SBHelight

class VideoByType extends Component {
    constructor(props) {
        super(props)
        this.state = {
            activeMenu: 2,
            selectedType: "",
            activeContent: "choice",
            listExercice: props.listExercice,
            popToTop:this.props.popToTop,
            changeStateHereOrGoback:false,
        }
    }

    selectType = async (type) => {
        await this.setState({ selectedType: type })
        await this.setState({ activeContent: "listing",changeStateHereOrGoback:true })
    }

    render() {
        if(this.props.popToTop === 'train'){
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
                    <View style={[styles.headerCtn]}>

                        <TouchableOpacity style={[styles.noSelectedBtn, { width: 60, alignSelf: "center" }]}
                            onPress={() => {
                                if(this.state.changeStateHereOrGoback === false){
                                    this.props.navigation.goBack()
                                }else if(this.state.changeStateHereOrGoback === true){
                                    this.setState({changeStateHereOrGoback: !this.state.changeStateHereOrGoback,selectedType:'',activeContent:'choice' })
                                }
                            }}>
                            <AutoHeightImage
                                width={18}
                                source={require("../../../assets/icons/arrow-white.png")}
                                style={{
                                    transform: [
                                        { rotateY: "180deg" }
                                    ]
                                }} />
                        </TouchableOpacity>

                        <TouchableOpacity style={[styles.noSelectedBtn, { alignSelf: "center" }]}
                            onPress={async () => {
                                console.log("Chenging Zone")
                                await this.setState({ selectedType: "" })
                                await this.setState({ activeContent: "choice" })
                            }}>
                            <View style={[styles.headCtn]}>
                                <Text style={[baseStyles.titleText]}>
                                    {this.state.selectedType == "" ? "Par type" : this.state.selectedType}
                                </Text>
                            </View>
                        </TouchableOpacity>

                        <View style={{ width: 60 }}>
                            <Text style={{ color: colors.balck + "00" }}>...</Text>
                        </View>

                    </View>

                    {
                        this.state.activeContent == "choice" ?
                            <View style={{ width: screenWidth, alignItems: "center", paddingTop: 30 }}>

                                <TouchableOpacity style={[styles.typeBtn]}
                                    onPress={() => {
                                        this.selectType("Etirement")
                                    }}>
                                    <View style={[styles.btnView]}>
                                        <Text style={[baseStyles.textColorWhite]}>Etirement</Text>
                                        <AutoHeightImage
                                            width={18}
                                            source={require("../../../assets/icons/arrow-white.png")}
                                        />
                                    </View>
                                </TouchableOpacity>

                                <TouchableOpacity style={[styles.typeBtn]}
                                    onPress={() => {
                                        this.selectType("Renforcement")
                                    }}>
                                    <View style={[styles.btnView]}>
                                        <Text style={[baseStyles.textColorWhite]}>Renforcement</Text>
                                        <AutoHeightImage
                                            width={18}
                                            source={require("../../../assets/icons/arrow-white.png")}
                                        />
                                    </View>
                                </TouchableOpacity>

                                <TouchableOpacity style={[styles.typeBtn]}
                                    onPress={() => {
                                        this.selectType("Musculation")
                                    }}>
                                    <View style={[styles.btnView]}>
                                        <Text style={[baseStyles.textColorWhite]}>Musculation</Text>
                                        <AutoHeightImage
                                            width={18}
                                            source={require("../../../assets/icons/arrow-white.png")}
                                        />
                                    </View>
                                </TouchableOpacity>

                                <TouchableOpacity style={[styles.typeBtn]}
                                    onPress={() => {
                                        this.selectType("Gainage")
                                    }}>
                                    <View style={[styles.btnView]}>
                                        <Text style={[baseStyles.textColorWhite]}>Gainage</Text>
                                        <AutoHeightImage
                                            width={18}
                                            source={require("../../../assets/icons/arrow-white.png")}
                                        />
                                    </View>
                                </TouchableOpacity>

                            </View>
                            : null
                    }


                    {this.state.activeContent == "listing" ?

                        <View style={{ alignItems: "center", width: screenWidth }}>

                            {
                                this.props.listExercice.map((value, index) => {
                                    return (
                                        <TouchableOpacity key={"ExItem" + index}
                                            onPress={() => {
                                                const setExToShow = { type: SET_EXERCICE_TO_SHOW, value: value }
                                                this.props.dispatch(setExToShow)
                                                this.props.navigation.navigate("SingleExercice")
                                            }}
                                        >
                                            <View style={[styles.videoItemCtn, (index == (this.state.listExercice.length - 1) ? styles.videoItemCtnLast : {})]}>
                                                <View style={{ flexDirection: "row", justifyContent: "flex-start", width: screenWidth * 0.5 }}>
                                                    <AutoHeightImage
                                                        width={50}
                                                        source={{uri: value.picture}}
                                                        style={{
                                                            minHeight: 50,
                                                            maxHeight: 50,
                                                            height: 50,
                                                            borderRadius: 50,
                                                            marginRight: 10
                                                        }} />
                                                    <Text style={[baseStyles.textColorWhite, { alignSelf: "center" }]}>{value.title}</Text>
                                                </View>
                                                <AutoHeightImage
                                                    width={14}
                                                    source={require("../../../assets/icons/arrow-white.png")}
                                                    // style={[styles.arrowRightIcon, { alignSelf: "center" }]} />
                                                    style={[{ alignSelf: "center" }]} />
                                            </View>
                                        </TouchableOpacity>
                                    )
                                })
                            }

                        </View> : null
                    }

                </ScrollView>

            </LinearGradient>
        )
    }
}

// export default AddBlessure;
const mapStateToProps = (state) => {
    const { popToTop,listExercice } = state.statedata
    return { popToTop,listExercice }
};

export default connect(mapStateToProps)(VideoByType);
