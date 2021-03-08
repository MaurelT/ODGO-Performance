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
import tensionHelper from '../../../apis/helpers/tension_helper';
import statusBarHeight from '../../../configs/screen';

const screen = Dimensions.get("window");
const SBHelight = statusBarHeight;
const screenWidth = screen.width
const screenHeight = screen.height - SBHelight

class SqueletteDevantBlancNotTouchable extends Component {
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
        this.setState({refreshing: true});
        this.getonetension().then((id)=>{
            switch (id) {
                case 1:
                    this.setState({
                        tete:true,
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
                    });
                    break;
                case 2:
                    this.setState({
                        tete:false,
                        cou:true,
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
                    });
                    break;
                case 3:
                    this.setState({
                        tete:false,
                        cou:false,
                        epaulegauche:false,
                        brasgauche:false,
                        maingauche:false,
                        poitrine:true,
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
                    });
                    break;
                case 4:
                    this.setState({
                        tete:false,
                        cou:false,
                        epaulegauche:false,
                        brasgauche:false,
                        maingauche:false,
                        poitrine:false,
                        bassin:true,
                        cuissegauche:false,
                        jambegauche:false,
                        piedgauche:false,
                        cuissedroite:false,
                        jambedroite:false,
                        pieddroite:false,
                        epauledroite:false,
                        brasdroite:false,
                        maindroite:false,
                    });
                    break;
                case 5:
                    this.setState({
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
                        epauledroite:true,
                        brasdroite:false,
                        maindroite:false,
                    });
                    break;
                case 6:
                    this.setState({
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
                        brasdroite:true,
                        maindroite:false,
                    });
                    break;
                case 7:
                    this.setState({
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
                        maindroite:true,
                    });
                    break;
                case 8:
                    this.setState({
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
                        cuissedroite:true,
                        jambedroite:false,
                        pieddroite:false,
                        epauledroite:false,
                        brasdroite:false,
                        maindroite:false,
                    });
                    break;
                case 9:
                    this.setState({
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
                        jambedroite:true,
                        pieddroite:false,
                        epauledroite:false,
                        brasdroite:false,
                        maindroite:false,
                    });
                    break;
                case 10:
                    this.setState({
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
                        pieddroite:true,
                        epauledroite:false,
                        brasdroite:false,
                        maindroite:false,
                    });
                    break;
                case 11:
                    this.setState({
                        tete:false,
                        cou:false,
                        epaulegauche:true,
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
                    });
                    break;
                case 12:
                    this.setState({
                        tete:false,
                        cou:false,
                        epaulegauche:false,
                        brasgauche:true,
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
                    });
                    break;
                case 13:
                    this.setState({
                        tete:false,
                        cou:false,
                        epaulegauche:false,
                        brasgauche:false,
                        maingauche:true,
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
                    });
                    break;
                case 14:
                    this.setState({
                        tete:false,
                        cou:false,
                        epaulegauche:false,
                        brasgauche:false,
                        maingauche:false,
                        poitrine:false,
                        bassin:false,
                        cuissegauche:true,
                        jambegauche:false,
                        piedgauche:false,
                        cuissedroite:false,
                        jambedroite:false,
                        pieddroite:false,
                        epauledroite:false,
                        brasdroite:false,
                        maindroite:false,
                    });
                    break;
                case 15:
                    this.setState({
                        tete:false,
                        cou:false,
                        epaulegauche:false,
                        brasgauche:false,
                        maingauche:false,
                        poitrine:false,
                        bassin:false,
                        cuissegauche:false,
                        jambegauche:true,
                        piedgauche:false,
                        cuissedroite:false,
                        jambedroite:false,
                        pieddroite:false,
                        epauledroite:false,
                        brasdroite:false,
                        maindroite:false,
                    });
                    break;
                case 16:
                    this.setState({
                        tete:false,
                        cou:false,
                        epaulegauche:false,
                        brasgauche:false,
                        maingauche:false,
                        poitrine:false,
                        bassin:false,
                        cuissegauche:false,
                        jambegauche:false,
                        piedgauche:true,
                        cuissedroite:false,
                        jambedroite:false,
                        pieddroite:false,
                        epauledroite:false,
                        brasdroite:false,
                        maindroite:false,
                    });
                    break;
                default:
                    this.setState({});
            }
            this.setState({refreshing: false});
        });
    }


    getonetension  = async () => {
        const pathologietension = await tensionHelper.getonetension(this.props.userToken,this.props.idoneTension);
        if (pathologietension) {
            return  pathologietension.data.zone_id;
        }};

    render() {
        return (
                <View style={{alignSelf:'center',backgroundColor:'transparent',marginVertical:10}}>
            <View

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
                </View>
                <View

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
                </View>

                <View style={{flexDirection:'row'}}>
                    <View>
                        <View
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
                        </View>
                        <View>
                        <View

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
                        </View>
                        <View

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
                        </View>
                        </View>
                    </View>

                    <View>

                        <View
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
                        </View>
                        <View

                            style={{marginTop:-screenWidth*0.065,right:-screenWidth*0.02}}
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
                        </View>

                        <View style={{flexDirection:'row'}}>
                            <View style={{}}>
                                <View

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
                                </View>
                                <View style={{}}>
                                    <View

                                        style={{top:-screenWidth*0.17,left:-screenWidth*0.01,}}
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
                                    </View>
                                    <View

                                        style={{top:-screenWidth*0.17,left:-screenWidth*0.03,}}
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
                                    </View>
                                </View>
                            </View>


                            <View style={{}}>
                                <View

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
                                </View>
                                <View style={{}}>
                                    <View

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
                                    </View>
                                    <View

                                        style={{top:-screenWidth*0.17,left:screenWidth*0.065,}}
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
                                    </View>
                                </View>

                            </View>
                        </View>
                    </View>


                    <View style={{}}>
                        <View

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
                        </View>

                        <View

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
                        </View>
                        <View

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
                        </View>
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

export default connect(mapStateToProps)(SqueletteDevantBlancNotTouchable);
