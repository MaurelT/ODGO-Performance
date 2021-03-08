// squelette not linear gradient
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
            zonePicker: false,

            tete:false,
            cou:false,
            epaulegauche:false,
            brasgauche:false,
            maingauche:false,
            poitrine:false,
            bassin:false,
            cuissegauche:false,
            jambegauche:false,
            piedgauche:false,
            cuissedroite:false,
            jambedroite:false,
            pieddroite:false,
            epauledroite:false,
            brasdroite:false,
            maindroite:false,

        }
    }


    componentDidMount() {
        // const setActiveFPAction = { type: SET_ACTIVE_FP, value: 4 }
        // this.props.dispatch(setActiveFPAction)
    }

    render() {
        return (
            <View style={{alignSelf:'center',backgroundColor:'transparent',marginVertical:10}}>
                <TouchableOpacity
                    onPress={()=>{
                        console.warn('tete')
                        this.setState({tete:!this.state.tete})
                        this.setState({cou:false})
                        this.setState({epaulegauche:false})
                        this.setState({brasgauche:false})
                        this.setState({maingauche:false})
                        this.setState({poitrine:false})
                        this.setState({bassin:false})
                        this.setState({cuissegauche:false})
                        this.setState({jambegauche:false})
                        this.setState({piedgauche:false})
                        this.setState({cuissedroite:false})
                        this.setState({jambedroite:false})
                        this.setState({pieddroite:false})
                        this.setState({epauledroite:false})
                        this.setState({brasdroite:false})
                        this.setState({maindroite:false})
                        this.props._selectedId(1,'Tête',this.state.tete)
                    }}
                    style={{marginLeft:-screenWidth*0.02,alignSelf:'center'}}>
                    { this.state.tete ? <AutoHeightImage
                            width={screenWidth*0.13}
                            source={require("../../../assets/images/devant_rouge/tete.png")}
                        />
                        :
                        <AutoHeightImage
                            width={screenWidth*0.13}
                            source={require("../../../assets/images/devant_blanc/tete.png")}
                        />
                    }
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={()=>{
                        console.warn('cou')
                        this.setState({tete:false})
                        this.setState({cou:!this.state.cou})
                        this.setState({epaulegauche:false})
                        this.setState({brasgauche:false})
                        this.setState({maingauche:false})
                        this.setState({poitrine:false})
                        this.setState({bassin:false})
                        this.setState({cuissegauche:false})
                        this.setState({jambegauche:false})
                        this.setState({piedgauche:false})
                        this.setState({cuissedroite:false})
                        this.setState({jambedroite:false})
                        this.setState({pieddroite:false})
                        this.setState({epauledroite:false})
                        this.setState({brasdroite:false})
                        this.setState({maindroite:false})
                        this.props._selectedId(2,'Cou',this.state.cou)

                    }}
                    style={{marginTop:-screenWidth*0.02,marginLeft:-screenWidth*0.02,alignSelf:'center'}}
                >
                    { this.state.cou ? <AutoHeightImage
                            width={screenWidth*0.22}
                            source={require("../../../assets/images/devant_rouge/coup.png")}
                        />
                        :
                        <AutoHeightImage
                            width={screenWidth*0.22}
                            source={require("../../../assets/images/devant_blanc/Cou.png")}
                        />}
                </TouchableOpacity>

                <View style={{flexDirection:'row'}}>
                    <View>
                        <TouchableOpacity
                            onPress={()=>{
                                console.warn('epaule gauche')
                                this.setState({tete:false})
                                this.setState({cou:false})
                                this.setState({epaulegauche:!this.state.epaulegauche})
                                this.setState({brasgauche:false})
                                this.setState({maingauche:false})
                                this.setState({poitrine:false})
                                this.setState({bassin:false})
                                this.setState({cuissegauche:false})
                                this.setState({jambegauche:false})
                                this.setState({piedgauche:false})
                                this.setState({cuissedroite:false})
                                this.setState({jambedroite:false})
                                this.setState({pieddroite:false})
                                this.setState({epauledroite:false})
                                this.setState({brasdroite:false})
                                this.setState({maindroite:false}) //gauche changé en droite
                                this.props._selectedId(11,'Epaule droite',this.state.epaulegauche)


                            }}
                            style={{right:-screenWidth*0.055,top:-screenWidth*0.038,}}
                        >
                            { this.state.epaulegauche ? <AutoHeightImage
                                    width={screenWidth*0.125}
                                    source={require("../../../assets/images/devant_rouge/epaule2.png")}
                                />
                                :
                                <AutoHeightImage
                                    width={screenWidth*0.125}
                                    source={require("../../../assets/images/devant_blanc/epaule2.png")}
                                />
                            }
                        </TouchableOpacity>
                        <View>
                            <TouchableOpacity
                                onPress={()=>{
                                    console.warn('bras gauche')
                                    this.setState({tete:false})
                                    this.setState({cou:false})
                                    this.setState({epaulegauche:false})
                                    this.setState({brasgauche:!this.state.brasgauche})
                                    this.setState({maingauche:false})
                                    this.setState({poitrine:false})
                                    this.setState({bassin:false})
                                    this.setState({cuissegauche:false})
                                    this.setState({jambegauche:false})
                                    this.setState({piedgauche:false})
                                    this.setState({cuissedroite:false})
                                    this.setState({jambedroite:false})
                                    this.setState({pieddroite:false})
                                    this.setState({epauledroite:false})
                                    this.setState({brasdroite:false})
                                    this.setState({maindroite:false}) //gauche changé en droit
                                    this.props._selectedId(12,'Bras droit',this.state.brasgauche)


                                }}
                                style={{left:-screenWidth*0.01 ,top:-screenWidth*0.065,}}
                            >
                                {this.state.brasgauche ? <AutoHeightImage
                                        width={screenWidth*0.16}
                                        source={require("../../../assets/images/devant_rouge/bras2.png")}
                                    />
                                    :
                                    <AutoHeightImage
                                        width={screenWidth*0.16}
                                        source={require("../../../assets/images/devant_blanc/bras.png")}
                                    />
                                }
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={()=>{
                                    console.warn('main gauche')
                                    this.setState({tete:false})
                                    this.setState({cou:false})
                                    this.setState({epaulegauche:false})
                                    this.setState({brasgauche:false})
                                    this.setState({maingauche:!this.state.maingauche})
                                    this.setState({poitrine:false})
                                    this.setState({bassin:false})
                                    this.setState({cuissegauche:false})
                                    this.setState({jambegauche:false})
                                    this.setState({piedgauche:false})
                                    this.setState({cuissedroite:false})
                                    this.setState({jambedroite:false})
                                    this.setState({pieddroite:false})
                                    this.setState({epauledroite:false})
                                    this.setState({brasdroite:false})
                                    this.setState({maindroite:false}) //gauche changé en droite
                                    this.props._selectedId(13,'Main droite',this.state.maingauche)


                                }}
                            >
                                { this.state.maingauche ?<AutoHeightImage
                                        style={{left:-screenWidth*0.095 ,top:-screenWidth*0.08,}}
                                        width={screenWidth*0.14}
                                        source={require("../../../assets/images/devant_rouge/main2.png")}
                                    />
                                    :
                                    <AutoHeightImage
                                        style={{left:-screenWidth*0.095 ,top:-screenWidth*0.08,}}
                                        width={screenWidth*0.14}
                                        source={require("../../../assets/images/devant_blanc/main.png")}
                                    />
                                }
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View>

                        <TouchableOpacity
                            onPress={()=>{
                                console.warn('poitrine')
                                this.setState({tete:false})
                                this.setState({cou:false})
                                this.setState({epaulegauche:false})
                                this.setState({brasgauche:false})
                                this.setState({maingauche:false})
                                this.setState({poitrine:!this.state.poitrine})
                                this.setState({bassin:false})
                                this.setState({cuissegauche:false})
                                this.setState({jambegauche:false})
                                this.setState({piedgauche:false})
                                this.setState({cuissedroite:false})
                                this.setState({jambedroite:false})
                                this.setState({pieddroite:false})
                                this.setState({epauledroite:false})
                                this.setState({brasdroite:false})
                                this.setState({maindroite:false})
                                this.props._selectedId(3,'Poitrine',this.state.poitrine)


                            }}
                            style={{marginTop:-screenWidth*0.01}}
                        >
                            {this.state.poitrine ? <AutoHeightImage
                                    width={screenWidth*0.259}
                                    source={require("../../../assets/images/devant_rouge/poitrine.png")}
                                />
                                :
                                <AutoHeightImage
                                    width={screenWidth*0.259}
                                    source={require("../../../assets/images/devant_blanc/poitrune.png")}
                                />
                            }
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={()=>{
                                console.warn('bassin')
                                this.setState({tete:false})
                                this.setState({cou:false})
                                this.setState({epaulegauche:false})
                                this.setState({brasgauche:false})
                                this.setState({maingauche:false})
                                this.setState({poitrine:false})
                                this.setState({bassin:!this.state.bassin})
                                this.setState({cuissegauche:false})
                                this.setState({jambegauche:false})
                                this.setState({piedgauche:false})
                                this.setState({cuissedroite:false})
                                this.setState({jambedroite:false})
                                this.setState({pieddroite:false})
                                this.setState({epauledroite:false})
                                this.setState({brasdroite:false})
                                this.setState({maindroite:false})
                                this.props._selectedId(4,'Bassin',this.state.bassin)


                            }}
                            style={{marginTop:-screenWidth*0.065,right:-screenWidth*0.023}}
                        >
                            { this.state.bassin ?  <AutoHeightImage
                                    width={screenWidth*0.22}
                                    source={require("../../../assets/images/devant_rouge/bassin.png")}
                                />
                                :
                                <AutoHeightImage
                                    width={screenWidth*0.22}
                                    source={require("../../../assets/images/devant_blanc/Bassin.png")}
                                />
                            }
                        </TouchableOpacity>

                        <View style={{flexDirection:'row'}}>
                            <View style={{}}>
                                <TouchableOpacity
                                    onPress={()=>{
                                        console.warn('cuisse gauche')
                                        this.setState({tete:false})
                                        this.setState({cou:false})
                                        this.setState({epaulegauche:false})
                                        this.setState({brasgauche:false})
                                        this.setState({maingauche:false})
                                        this.setState({poitrine:false})
                                        this.setState({bassin:false})
                                        this.setState({cuissegauche:!this.state.cuissegauche})
                                        this.setState({jambegauche:false})
                                        this.setState({piedgauche:false})
                                        this.setState({cuissedroite:false})
                                        this.setState({jambedroite:false})
                                        this.setState({pieddroite:false})
                                        this.setState({epauledroite:false})
                                        this.setState({brasdroite:false})
                                        this.setState({maindroite:false}) //gauche changé en droite
                                        this.props._selectedId(14,'Cuisse droite',this.state.cuissegauche)


                                    }}
                                    style={{top:-screenWidth*0.15,left:-screenWidth*0.01,}}
                                >
                                    { this.state.cuissegauche ? <AutoHeightImage
                                            width={screenWidth*0.14}
                                            source={require("../../../assets/images/devant_rouge/cuisse.png")}
                                        />
                                        :
                                        <AutoHeightImage
                                            width={screenWidth*0.14}
                                            source={require("../../../assets/images/devant_blanc/cuisse.png")}
                                        />
                                    }
                                </TouchableOpacity>
                                <View style={{}}>
                                    <TouchableOpacity
                                        onPress={()=>{
                                            console.warn('jambe gauche')
                                            this.setState({tete:false})
                                            this.setState({cou:false})
                                            this.setState({epaulegauche:false})
                                            this.setState({brasgauche:false})
                                            this.setState({maingauche:false})
                                            this.setState({poitrine:false})
                                            this.setState({bassin:false})
                                            this.setState({cuissegauche:false})
                                            this.setState({jambegauche:!this.state.jambegauche})
                                            this.setState({piedgauche:false})
                                            this.setState({cuissedroite:false})
                                            this.setState({jambedroite:false})
                                            this.setState({pieddroite:false})
                                            this.setState({epauledroite:false})
                                            this.setState({brasdroite:false})
                                            this.setState({maindroite:false}) //gauche changé en droite
                                            this.props._selectedId(15,'Jambe droite',this.state.jambegauche)


                                        }}
                                        style={{top:-screenWidth*0.1745,left:-screenWidth*0.018,}}
                                    >
                                        {this.state.jambegauche ? <AutoHeightImage
                                                width={screenWidth*0.13}
                                                source={require("../../../assets/images/devant_rouge/jambe.png")}
                                            />
                                            :
                                            <AutoHeightImage
                                                width={screenWidth*0.13}
                                                source={require("../../../assets/images/devant_blanc/jambe.png")}
                                            />
                                        }
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        onPress={()=>{
                                            console.warn('pied gauche')
                                            this.setState({tete:false})
                                            this.setState({cou:false})
                                            this.setState({epaulegauche:false})
                                            this.setState({brasgauche:false})
                                            this.setState({maingauche:false})
                                            this.setState({poitrine:false})
                                            this.setState({bassin:false})
                                            this.setState({cuissegauche:false})
                                            this.setState({jambegauche:false})
                                            this.setState({piedgauche:!this.state.piedgauche})
                                            this.setState({cuissedroite:false})
                                            this.setState({jambedroite:false})
                                            this.setState({pieddroite:false})
                                            this.setState({epauledroite:false})
                                            this.setState({brasdroite:false})
                                            this.setState({maindroite:false}) //gauche changé en droite
                                            this.props._selectedId(16,'Pied droite',this.state.piedgauche)


                                        }}
                                        style={{top:-screenWidth*0.178,left:-screenWidth*0.035,}}
                                    >
                                        { this.state.piedgauche ? <AutoHeightImage
                                                width={screenWidth*0.09}
                                                source={require("../../../assets/images/devant_rouge/pied.png")}
                                            />
                                            :
                                            <AutoHeightImage
                                                width={screenWidth*0.09}
                                                source={require("../../../assets/images/devant_blanc/pied2.png")}
                                            />
                                        }
                                    </TouchableOpacity>
                                </View>
                            </View>


                            <View style={{}}>
                                <TouchableOpacity
                                    onPress={()=>{
                                        console.warn('cuisse droite')
                                        this.setState({tete:false})
                                        this.setState({cou:false})
                                        this.setState({epaulegauche:false})
                                        this.setState({brasgauche:false})
                                        this.setState({maingauche:false})
                                        this.setState({poitrine:false})
                                        this.setState({bassin:false})
                                        this.setState({cuissegauche:false})
                                        this.setState({jambegauche:false})
                                        this.setState({piedgauche:false})
                                        this.setState({cuissedroite:!this.state.cuissedroite})
                                        this.setState({jambedroite:false})
                                        this.setState({pieddroite:false})
                                        this.setState({epauledroite:false})
                                        this.setState({brasdroite:false})
                                        this.setState({maindroite:false}) //droite changé en gauche
                                        this.props._selectedId(8,'Cuisse gauche',this.state.cuissedroite)


                                    }}
                                    style={{top:-screenWidth*0.15,left:-screenWidth*0.008,}}
                                >
                                    { this.state.cuissedroite ? <AutoHeightImage
                                            width={screenWidth*0.142}
                                            source={require("../../../assets/images/devant_rouge/cuisse2.png")}
                                        />
                                        :
                                        <AutoHeightImage
                                            width={screenWidth*0.142}
                                            source={require("../../../assets/images/devant_blanc/cuisse2.png")}
                                        />
                                    }
                                </TouchableOpacity>
                                <View style={{}}>
                                    <TouchableOpacity
                                        onPress={()=>{
                                            console.warn('jambe droite')
                                            this.setState({tete:false})
                                            this.setState({cou:false})
                                            this.setState({epaulegauche:false})
                                            this.setState({brasgauche:false})
                                            this.setState({maingauche:false})
                                            this.setState({poitrine:false})
                                            this.setState({bassin:false})
                                            this.setState({cuissegauche:false})
                                            this.setState({jambegauche:false})
                                            this.setState({piedgauche:false})
                                            this.setState({cuissedroite:false})
                                            this.setState({jambedroite:!this.state.jambedroite})
                                            this.setState({pieddroite:false})
                                            this.setState({epauledroite:false})
                                            this.setState({brasdroite:false})
                                            this.setState({maindroite:false}) //droite changé en gauche
                                            this.props._selectedId(9,'Jambe gauche',this.state.jambedroite)


                                        }}
                                        style={{top:-screenWidth*0.17,left:screenWidth*0.007,}}
                                    >
                                        { this.state.jambedroite ? <AutoHeightImage
                                                width={screenWidth*0.13}
                                                source={require("../../../assets/images/devant_rouge/jambe2.png")}
                                            />
                                            :
                                            <AutoHeightImage
                                                width={screenWidth*0.13}
                                                source={require("../../../assets/images/devant_blanc/jambe2.png")}
                                            />
                                        }
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        onPress={()=>{
                                            console.warn('pied droite')
                                            this.setState({tete:false})
                                            this.setState({cou:false})
                                            this.setState({epaulegauche:false})
                                            this.setState({brasgauche:false})
                                            this.setState({maingauche:false})
                                            this.setState({poitrine:false})
                                            this.setState({bassin:false})
                                            this.setState({cuissegauche:false})
                                            this.setState({jambegauche:false})
                                            this.setState({piedgauche:false})
                                            this.setState({cuissedroite:false})
                                            this.setState({jambedroite:false})
                                            this.setState({pieddroite:!this.state.pieddroite})
                                            this.setState({epauledroite:false})
                                            this.setState({brasdroite:false})
                                            this.setState({maindroite:false}) //droite changé en gauche
                                            this.props._selectedId(10,'Pied gauche',this.state.pieddroite)

                                        }}
                                        style={{top:-screenWidth*0.175,left:screenWidth*0.066,}}
                                    >
                                        { this.state.pieddroite ? <AutoHeightImage
                                                width={screenWidth*0.09}
                                                source={require("../../../assets/images/devant_rouge/pied2.png")}
                                            />
                                            :
                                            <AutoHeightImage
                                                width={screenWidth*0.09}
                                                source={require("../../../assets/images/devant_blanc/pied.png")}
                                            />
                                        }
                                    </TouchableOpacity>
                                </View>

                            </View>
                        </View>
                    </View>


                    <View style={{}}>
                        <TouchableOpacity
                            onPress={()=>{
                                console.warn('epaule droite')
                                this.setState({tete:false})
                                this.setState({cou:false})
                                this.setState({epaulegauche:false})
                                this.setState({brasgauche:false})
                                this.setState({maingauche:false})
                                this.setState({poitrine:false})
                                this.setState({bassin:false})
                                this.setState({cuissegauche:false})
                                this.setState({jambegauche:false})
                                this.setState({piedgauche:false})
                                this.setState({cuissedroite:false})
                                this.setState({jambedroite:false})
                                this.setState({pieddroite:false})
                                this.setState({epauledroite:!this.state.epauledroite})
                                this.setState({brasdroite:false})
                                this.setState({maindroite:false}) //droite changé en gauche
                                this.props._selectedId(5,'Epaule gauche',this.state.epauledroite)

                            }}
                            style={{left:-screenWidth*0.045,top:-screenWidth*0.04,}}
                        >
                            { this.state.epauledroite ? <AutoHeightImage
                                    width={screenWidth*0.125}
                                    source={require("../../../assets/images/devant_rouge/epaule.png")}
                                />
                                :
                                <AutoHeightImage
                                    width={screenWidth*0.125}
                                    source={require("../../../assets/images/devant_blanc/epaule.png")}
                                />
                            }
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={()=>{
                                console.warn('bras droite')
                                this.setState({tete:false})
                                this.setState({cou:false})
                                this.setState({epaulegauche:false})
                                this.setState({brasgauche:false})
                                this.setState({maingauche:false})
                                this.setState({poitrine:false})
                                this.setState({bassin:false})
                                this.setState({cuissegauche:false})
                                this.setState({jambegauche:false})
                                this.setState({piedgauche:false})
                                this.setState({cuissedroite:false})
                                this.setState({jambedroite:false})
                                this.setState({pieddroite:false})
                                this.setState({epauledroite:false})
                                this.setState({brasdroite:!this.state.brasdroite})
                                this.setState({maindroite:false}) //droite changé en gauche
                                this.props._selectedId(6,'Bras gauche',this.state.brasdroite)

                            }}
                            style={{top:-screenWidth*0.067,left:-screenWidth*0.008}}
                        >
                            { this.state.brasdroite ? <AutoHeightImage
                                    width={screenWidth*0.15}
                                    source={require("../../../assets/images/devant_rouge/bras.png")}
                                />
                                :
                                <AutoHeightImage
                                    width={screenWidth*0.15}
                                    source={require("../../../assets/images/devant_blanc/bras2.png")}
                                />
                            }
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={()=>{
                                console.warn('main droite')
                                this.setState({tete:false})
                                this.setState({cou:false})
                                this.setState({epaulegauche:false})
                                this.setState({brasgauche:false})
                                this.setState({maingauche:false})
                                this.setState({poitrine:false})
                                this.setState({bassin:false})
                                this.setState({cuissegauche:false})
                                this.setState({jambegauche:false})
                                this.setState({piedgauche:false})
                                this.setState({cuissedroite:false})
                                this.setState({jambedroite:false})
                                this.setState({pieddroite:false})
                                this.setState({epauledroite:false})
                                this.setState({brasdroite:false})
                                this.setState({maindroite:!this.state.maindroite}) //droite changé en gauche
                                this.props._selectedId(7,'Main gauche',this.state.maindroite)

                            }}
                            style={{top:-screenWidth*0.08,right:-screenWidth*0.09}}
                        >
                            { this.state.maindroite ? <AutoHeightImage
                                    width={screenWidth*0.14}
                                    source={require("../../../assets/images/devant_rouge/main.png")}
                                />
                                :
                                <AutoHeightImage
                                    width={screenWidth*0.14}
                                    source={require("../../../assets/images/devant_blanc/main2.png")}
                                />
                            }
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

export default connect(mapStateToProps)(SqueletteDevantBlanc);
