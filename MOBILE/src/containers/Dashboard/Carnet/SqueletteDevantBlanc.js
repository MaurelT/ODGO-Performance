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

class SqueletteDevantBlanc extends Component {
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
                <View style={{alignSelf:'center',backgroundColor:'transparent',marginVertical:10,marginLeft:-4}}>
            <TouchableOpacity
                    onPress={()=>{
                        console.warn('tete')
                        this.props._selectedId(1,'Tête')

                    }}
                    style={{marginLeft:-screenWidth*0.02,alignSelf:'center'}}>
                    <AutoHeightImage
                        width={screenWidth*0.13}
                        source={require("../../../assets/images/devant_blanc/tete.png")}
                    />
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={()=>{
                        console.warn('cou')
                        this.props._selectedId(2,'Cou')

                    }}
                     style={{marginTop:-screenWidth*0.02,marginLeft:-screenWidth*0.02,alignSelf:'center'}}
                    >
                    <AutoHeightImage
                        width={screenWidth*0.22}
                    source={require("../../../assets/images/devant_blanc/Cou.png")}
                />
                </TouchableOpacity>

                <View style={{flexDirection:'row'}}>
                    <View>
                        <TouchableOpacity
                            onPress={()=>{
                                console.warn('epaule gauche')
                                this.props._selectedId(11,'Epaule droite')

                            }}
                            style={{right:-screenWidth*0.055,top:-screenWidth*0.038,}}
                        >
                            <AutoHeightImage
                                width={screenWidth*0.125}
                            source={require("../../../assets/images/devant_blanc/epaule2.png")}
                        />
                        </TouchableOpacity>
                        <View>
                        <TouchableOpacity
                            onPress={()=>{
                                console.warn('bras gauche')
                                this.props._selectedId(12,'Bras droit')

                            }}
                            style={{left:-screenWidth*0.01 ,top:-screenWidth*0.065,}}
                        >
                            <AutoHeightImage
                                width={screenWidth*0.16}
                                source={require("../../../assets/images/devant_blanc/bras.png")}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={()=>{
                                console.warn('main gauche')
                                this.props._selectedId(13,'Main droite')

                            }}
                        >
                            <AutoHeightImage
                                style={{left:-screenWidth*0.095 ,top:-screenWidth*0.08,}}
                                width={screenWidth*0.14}
                                source={require("../../../assets/images/devant_blanc/main.png")}
                            />
                        </TouchableOpacity>
                        </View>
                    </View>

                    <View>

                        <TouchableOpacity
                            onPress={()=>{
                                console.warn('poitrine')
                                this.props._selectedId(3,'Poitrine')

                            }}
                            style={{marginTop:-screenWidth*0.01}}
                        >
                            <AutoHeightImage
                                width={screenWidth*0.259}
                            source={require("../../../assets/images/devant_blanc/poitrune.png")}
                        />
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={()=>{
                                console.warn('bassin')
                                this.props._selectedId(4,'Bassin')

                            }}
                            style={{marginTop:-screenWidth*0.065,right:-screenWidth*0.02}}
                        >
                            <AutoHeightImage
                                width={screenWidth*0.22}
                            source={require("../../../assets/images/devant_blanc/Bassin.png")}
                        />
                        </TouchableOpacity>

                        <View style={{flexDirection:'row'}}>
                            <View style={{}}>
                                <TouchableOpacity
                                    onPress={()=>{
                                        console.warn('cuisse droite')
                                        this.props._selectedId(14,'Cuisse gauche')

                                    }}
                                    style={{top:-screenWidth*0.15,left:-screenWidth*0.01,}}
                                >
                                    <AutoHeightImage
                                        width={screenWidth*0.14}
                                    source={require("../../../assets/images/devant_blanc/cuisse.png")}
                                />
                                </TouchableOpacity>
                                <View style={{}}>
                                    <TouchableOpacity
                                        onPress={()=>{
                                            console.warn('jambe gauche')
                                            this.props._selectedId(15,'Jambe droite')

                                        }}
                                        style={{top:-screenWidth*0.17,left:-screenWidth*0.02,}}
                                    >
                                        <AutoHeightImage
                                            width={screenWidth*0.13}
                                        source={require("../../../assets/images/devant_blanc/jambe.png")}
                                    />
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        onPress={()=>{
                                            console.warn('pied gauche')
                                            this.props._selectedId(16,'Pied droite')

                                        }}
                                        style={{top:-screenWidth*0.17,left:-screenWidth*0.035,}}
                                    >
                                        <AutoHeightImage
                                            width={screenWidth*0.09}
                                        source={require("../../../assets/images/devant_blanc/pied2.png")}
                                    />
                                    </TouchableOpacity>
                                </View>
                            </View>


                            <View style={{}}>
                                <TouchableOpacity
                                    onPress={()=>{
                                        console.warn('cuisse droite')
                                        this.props._selectedId(8,'Cuisse gauche')

                                    }}
                                    style={{top:-screenWidth*0.15,left:-screenWidth*0.008,}}
                                >
                                    <AutoHeightImage
                                        width={screenWidth*0.142}
                                    source={require("../../../assets/images/devant_blanc/cuisse2.png")}
                                />
                                </TouchableOpacity>
                                <View style={{}}>
                                    <TouchableOpacity
                                        onPress={()=>{
                                            console.warn('jambe gauche')
                                            this.props._selectedId(9,'Jambe droite')

                                        }}
                                        style={{top:-screenWidth*0.17,left:screenWidth*0.007,}}
                                    >
                                        <AutoHeightImage
                                            width={screenWidth*0.13}
                                        source={require("../../../assets/images/devant_blanc/jambe2.png")}
                                    />
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        onPress={()=>{
                                            console.warn('pied droite')
                                            this.props._selectedId(10,'Pied droite')

                                        }}
                                        style={{top:-screenWidth*0.17,left:screenWidth*0.07,}}
                                    >
                                        <AutoHeightImage
                                            width={screenWidth*0.09}
                                        source={require("../../../assets/images/devant_blanc/pied.png")}
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
                                this.props._selectedId(5,'Epaule gauche')

                            }}
                            style={{left:-screenWidth*0.045,top:-screenWidth*0.04,}}
                        >
                            <AutoHeightImage
                                width={screenWidth*0.125}
                                source={require("../../../assets/images/devant_blanc/epaule.png")}
                            />
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={()=>{
                                console.warn('bras droite')
                                this.props._selectedId(6,'Bras gauche')

                            }}
                            style={{top:-screenWidth*0.067,left:-screenWidth*0.008}}
                        >
                            <AutoHeightImage
                                width={screenWidth*0.15}
                                source={require("../../../assets/images/devant_blanc/bras2.png")}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={()=>{
                                console.warn('main droite')
                                this.props._selectedId(7,'Main gauche')

                            }}
                            style={{top:-screenWidth*0.08,right:-screenWidth*0.09}}
                        >
                            <AutoHeightImage
                                width={screenWidth*0.14}
                                source={require("../../../assets/images/devant_blanc/main2.png")}
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

export default connect(mapStateToProps)(SqueletteDevantBlanc);
