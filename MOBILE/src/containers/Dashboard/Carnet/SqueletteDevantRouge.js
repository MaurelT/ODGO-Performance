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

class SqueletteDevantBlancl extends Component {
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
            <View
            >

                <TouchableOpacity
                    onPress={()=>{
                        console.warn('tete')
                    }}
                    style={{marginLeft:-screenWidth*0.02,alignSelf:'center'}}>
                    <Image
                        source={require("../../../assets/images/devant_rouge/tete.png")}
                    />
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={()=>{
                        console.warn('cou')
                    }}
                     style={{marginTop:-screenWidth*0.02,marginLeft:-screenWidth*0.02,alignSelf:'center'}}
                    >
                <Image
                    source={require("../../../assets/images/devant_rouge/coup.png")}
                />
                </TouchableOpacity>

                <View style={{flexDirection:'row'}}>
                    <View>
                        <TouchableOpacity
                            onPress={()=>{
                                console.warn('epaule gauche')
                            }}
                            style={{right:-screenWidth*0.054,top:-screenWidth*0.04,}}
                        >
                        <Image
                            source={require("../../../assets/images/devant_rouge/epaule2.png")}
                        />
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={()=>{
                                console.warn('bras gauche')
                            }}
                            style={{left:-screenWidth*0.01 ,top:-screenWidth*0.065,}}
                        >
                            <Image
                                source={require("../../../assets/images/devant_rouge/bras2.png")}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={()=>{
                                console.warn('bras gauche')
                            }}
                            style={{left:-screenWidth*0.1 ,top:-screenWidth*0.08,}}
                        >
                            <Image
                                source={require("../../../assets/images/devant_rouge/main2.png")}
                            />
                        </TouchableOpacity>
                    </View>

                    <View>

                        <TouchableOpacity
                            onPress={()=>{
                                console.warn('poitrine')
                            }}
                            style={{marginTop:-screenWidth*0.01}}
                        >
                        <Image
                            source={require("../../../assets/images/devant_rouge/poitrine.png")}
                        />
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={()=>{
                                console.warn('bassin')
                            }}
                            style={{marginTop:-screenWidth*0.055,right:-screenWidth*0.028}}
                        >
                        <Image
                            source={require("../../../assets/images/devant_rouge/bassin.png")}
                        />
                        </TouchableOpacity>

                        <View style={{flexDirection:'row'}}>
                            <View style={{}}>
                                <TouchableOpacity
                                    onPress={()=>{
                                        console.warn('cuisse gauche')
                                    }}
                                    style={{top:-screenWidth*0.15,left:-screenWidth*0.01,}}
                                >
                                <Image
                                    source={require("../../../assets/images/devant_rouge/cuisse.png")}
                                />
                                </TouchableOpacity>
                                <View style={{}}>
                                    <TouchableOpacity
                                        onPress={()=>{
                                            console.warn('jambe gauche')
                                        }}
                                        style={{top:-screenWidth*0.17,left:-screenWidth*0.02,}}
                                    >
                                    <Image
                                        source={require("../../../assets/images/devant_rouge/jambe.png")}
                                    />
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        onPress={()=>{
                                            console.warn('pied gauche')
                                        }}
                                        style={{top:-screenWidth*0.17,left:-screenWidth*0.035,}}
                                    >
                                    <Image
                                        source={require("../../../assets/images/devant_rouge/pied.png")}
                                    />
                                    </TouchableOpacity>
                                </View>
                            </View>


                            <View style={{}}>
                                <TouchableOpacity
                                    onPress={()=>{
                                        console.warn('cuisse droite')
                                    }}
                                    style={{top:-screenWidth*0.15,left:-screenWidth*0.008,}}
                                >
                                <Image
                                    source={require("../../../assets/images/devant_rouge/cuisse2.png")}
                                />
                                </TouchableOpacity>
                                <View style={{}}>
                                    <TouchableOpacity
                                        onPress={()=>{
                                            console.warn('jambe gauche')
                                        }}
                                        style={{top:-screenWidth*0.17,left:screenWidth*0.007,}}
                                    >
                                    <Image
                                        source={require("../../../assets/images/devant_rouge/jambe2.png")}
                                    />
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        onPress={()=>{
                                            console.warn('pied droite')
                                        }}
                                        style={{top:-screenWidth*0.17,left:screenWidth*0.07,}}
                                    >
                                    <Image
                                        source={require("../../../assets/images/devant_rouge/pied2.png")}
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
                            }}
                            style={{left:-screenWidth*0.04,top:-screenWidth*0.038,}}
                        >
                            <Image
                                source={require("../../../assets/images/devant_rouge/epaule.png")}
                            />
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={()=>{
                                console.warn('bras droite')
                            }}
                            style={{top:-screenWidth*0.067,left:-screenWidth*0.008}}
                        >
                            <Image
                                source={require("../../../assets/images/devant_rouge/bras.png")}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={()=>{
                                console.warn('main droite')
                            }}
                            style={{top:-screenWidth*0.08,right:-screenWidth*0.09}}
                        >
                            <Image
                                source={require("../../../assets/images/devant_rouge/main.png")}
                            />
                        </TouchableOpacity>

                    </View>

                </View>





            </View>
        );
    }
}

const mapStateToProps = (state) => {
    const { selectedZone,isFichePedag } = state.statedata
    return { selectedZone,isFichePedag }
};

export default connect(mapStateToProps)(SqueletteDevantBlancl);
