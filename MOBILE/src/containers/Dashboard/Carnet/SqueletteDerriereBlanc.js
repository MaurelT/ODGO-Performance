import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    ScrollView,
    View,
    Text,
    TouchableOpacity,
    Dimensions,
    StatusBar,
    Modal,
    Alert,
    Image
} from 'react-native';
import baseStyles from '../../../base/BaseStyles';
import styles from './styles'
import colors from '../../../configs/colors';
import LinearGradient from 'react-native-linear-gradient';
import AutoHeightImage from 'react-native-auto-height-image';
import {SET_ACTIVE_FP} from "../../../redux/types/tabTypes";
import statusBarHeight from '../../../configs/screen';

const screen = Dimensions.get("window");
const SBHelight = statusBarHeight;
const screenWidth = screen.width
const screenHeight = screen.height - SBHelight

class SqueletteDevantBlancd extends Component {
    constructor(props) {
        super(props)
        this.state = {
            activeTabMenu: 1,
            selectedZone: props.selectedZone,
            zonePicker: false
        }
    }


    componentDidMount() {
        // const setActiveFPAction = { type: SET_ACTIVE_FP, value: 4 }
        // this.props.dispatch(setActiveFPAction)
    }

    render() {
        return (
            <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }} colors={[colors.balck, colors.green, colors.balck]} style={[styles.linearGradient]}>
                <View style={{alignSelf:'center',backgroundColor:'transparent',marginVertical:10}}>


                <TouchableOpacity
                    onPress={()=>{
                        console.warn('tete')
                        this.props._selectedId(17,'Tête dérrière')

                    }}
                    style={{marginLeft:-screenWidth*0.035,alignSelf:'center'}}>
                    <AutoHeightImage
                        width={screenWidth*0.13}
                        source={require("../../../assets/images/Dos_blnc/teteblnc.png")}
                    />
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={()=>{
                        console.warn('cou')
                        this.props._selectedId(18,'Cou dérrière')

                    }}
                     style={{marginTop:-screenWidth*0.02,marginLeft:-screenWidth*0.035,alignSelf:'center'}}
                    >
                    <AutoHeightImage
                        width={screenWidth*0.22}
                    source={require("../../../assets/images/Dos_blnc/Coublnc.png")}
                />
                </TouchableOpacity>

                <View style={{flexDirection:'row'}}>
                    <View>
                        <TouchableOpacity
                            onPress={()=>{
                                console.warn('epaule gauche')
                                this.props._selectedId(27,'Omoplate gauche')

                            }}
                            style={{right:-screenWidth*0.04,top:-screenWidth*0.015,}}
                        >
                            <AutoHeightImage
                                width={screenWidth*0.125}
                            source={require("../../../assets/images/Dos_blnc/epauleblnc2.png")}
                        />
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={()=>{
                                console.warn('bras gauche')
                                this.props._selectedId(28,'Bras gauche')

                            }}
                            style={{left:-screenWidth*0.03 ,top:-screenWidth*0.045,}}
                        >
                            <AutoHeightImage
                                width={screenWidth*0.16}
                                source={require("../../../assets/images/Dos_blnc/brasblnc2.png")}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={()=>{
                                this.props._selectedId(29,'Main gauche')

                            }}
                            style={{left:-screenWidth*0.11 ,top:-screenWidth*0.07,}}
                        >
                            <AutoHeightImage
                                width={screenWidth*0.14}
                                source={require("../../../assets/images/Dos_blnc/Mainblnc2.png")}
                            />
                        </TouchableOpacity>
                    </View>

                    <View>

                        <TouchableOpacity
                            onPress={()=>{
                                console.warn('Dos')
                                this.props._selectedId(19,'Dos')

                            }}
                            style={{marginTop:-screenWidth*0.015,left:-screenWidth*0.015}}
                        >
                            <AutoHeightImage
                                width={screenWidth*0.25}
                            source={require("../../../assets/images/Dos_blnc/dosblnc.png")}
                        />
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={()=>{
                                console.warn('bassin')
                                this.props._selectedId(22,'Bassin')

                            }}
                            style={{marginTop:-screenWidth*0.05}}
                        >
                            <AutoHeightImage
                                width={screenWidth*0.22}
                            source={require("../../../assets/images/Dos_blnc/Bassinblnc.png")}
                        />
                        </TouchableOpacity>

                        <View style={{flexDirection:'row'}}>
                            <View style={{}}>
                                <TouchableOpacity
                                    onPress={()=>{
                                        console.warn('cuisse gauche')
                                        this.props._selectedId(30,'Cuisse gauche')

                                    }}
                                    style={{top:-screenWidth*0.06,left:-screenWidth*0.035,}}
                                >
                                    <AutoHeightImage
                                        width={screenWidth*0.14}
                                    source={require("../../../assets/images/Dos_blnc/Cuisseblnc2.png")}
                                />
                                </TouchableOpacity>
                                <View style={{}}>
                                    <TouchableOpacity
                                        onPress={()=>{
                                            console.warn('jambe gauche')
                                            this.props._selectedId(31,'Jambe gauche')

                                        }}
                                        style={{top:-screenWidth*0.079,left:-screenWidth*0.04,}}
                                    >
                                        <AutoHeightImage
                                            width={screenWidth*0.13}
                                        source={require("../../../assets/images/Dos_blnc/Jambeblnc.png")}
                                    />
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        onPress={()=>{
                                            console.warn('pied gauche')
                                            this.props._selectedId(32,'Pied gauche')

                                        }}
                                        style={{top:-screenWidth*0.08,left:-screenWidth*0.054,}}
                                    >
                                        <AutoHeightImage
                                            width={screenWidth*0.09}
                                        source={require("../../../assets/images/Dos_blnc/piedblnc2.png")}
                                    />
                                    </TouchableOpacity>
                                </View>
                            </View>


                            <View style={{}}>
                                <TouchableOpacity
                                    onPress={()=>{
                                        console.warn('cuisse droite')
                                        this.props._selectedId(24,'Cuisse droite')

                                    }}
                                    style={{top:-screenWidth*0.055,left:-screenWidth*0.03,}}
                                >
                                    <AutoHeightImage
                                        width={screenWidth*0.134}
                                    source={require("../../../assets/images/Dos_blnc/Cuisseblnc.png")}
                                />
                                </TouchableOpacity>
                                <View style={{}}>
                                    <TouchableOpacity
                                        onPress={()=>{
                                            this.props._selectedId(25,'Jambe droite')

                                        }}
                                        style={{top:-screenWidth*0.075,left:-screenWidth*0.02,}}
                                    >
                                        <AutoHeightImage
                                            width={screenWidth*0.13}
                                        source={require("../../../assets/images/Dos_blnc/Jambeblnc2.png")}
                                    />
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        onPress={()=>{
                                            console.warn('pied droite')
                                            this.props._selectedId(26,'Pied droit')

                                        }}
                                        style={{top:-screenWidth*0.07,right:-screenWidth*0.04,}}
                                    >
                                        <AutoHeightImage
                                            width={screenWidth*0.09}
                                        source={require("../../../assets/images/Dos_blnc/piedblnc.png")}
                                    />
                                    </TouchableOpacity>
                                </View>

                            </View>
                        </View>
                    </View>


                    <View style={{}}>
                        <TouchableOpacity
                            onPress={()=>{
                                console.warn('epaule droite')
                                this.props._selectedId(20,'Epaule droite')

                            }}
                            style={{left:-screenWidth*0.06,top:-screenWidth*0.02,}}
                        >
                            <AutoHeightImage
                                width={screenWidth*0.125}
                                source={require("../../../assets/images/Dos_blnc/epauleblnc.png")}
                            />
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={()=>{
                                console.warn('bras droite')
                                this.props._selectedId(21,'Bras droit')

                            }}
                            style={{top:-screenWidth*0.048,left:-screenWidth*0.02}}
                        >
                            <AutoHeightImage
                                width={screenWidth*0.14}
                                source={require("../../../assets/images/Dos_blnc/brasblnc.png")}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={()=>{
                                console.warn('main droite')
                                this.props._selectedId(23,'Main droite')

                            }}
                            style={{top:-screenWidth*0.07,right:-screenWidth*0.07}}
                        >
                            <AutoHeightImage
                                width={screenWidth*0.14}
                                source={require("../../../assets/images/Dos_blnc/Mainblnc.png")}
                            />
                        </TouchableOpacity>

                    </View>

                </View>





                </View>
            </LinearGradient>
        );
    }
}

const mapStateToProps = (state) => {
    const { selectedZone,isFichePedag } = state.statedata
    return { selectedZone,isFichePedag }
};

export default connect(mapStateToProps)(SqueletteDevantBlancd);
