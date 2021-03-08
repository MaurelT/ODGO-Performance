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

class SqueletteDerriereBlancNotTouchable extends Component {
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
        //idzone no miasa redux
        this.setState({refreshing: true});
        this.getonetension().then((id)=>{
            switch (id) {
                case 17:
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
                case 18:
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
                case 19:
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
                case 20:
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
                case 21:
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
                case 22:
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
                case 23:
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
                case 24:
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
                case 25:
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
                case 26:
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
                case 27:
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
                case 28:
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
                case 29:
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
                case 30:
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
                case 31:
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
                case 32:
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
            }
        })
    }

    getonetension  = async () => {
        const pathologietension = await tensionHelper.getonetension(this.props.userToken,this.props.idoneTension);
        if (pathologietension) {
            return  pathologietension.data.zone_id;
        }};

    render() {
        return (
                <View style={{alignSelf:'center',backgroundColor:'transparent',marginVertical:10,marginLeft:-4}}>


                <View
                    style={{marginLeft:-screenWidth*0.035,alignSelf:'center'}}>
                   { this.state.tete ? <AutoHeightImage
                        width={screenWidth*0.13}
                        source={require("../../../assets/images/Dos_rouge/Tete.png")}
                    />
                   :
                       <AutoHeightImage
                           width={screenWidth*0.13}
                           source={require("../../../assets/images/Dos_blnc/teteblnc.png")}
                       />
                   }
                </View>
                <View

                     style={{marginTop:-screenWidth*0.02,marginLeft:-screenWidth*0.035,alignSelf:'center'}}
                    >
                   {this.state.cou ? <AutoHeightImage
                        width={screenWidth*0.22}
                    source={require("../../../assets/images/Dos_rouge/Cou.png")}
                />
                   :
                       <AutoHeightImage
                           width={screenWidth*0.22}
                           source={require("../../../assets/images/Dos_blnc/Coublnc.png")}
                       />
                   }
                </View>

                <View style={{flexDirection:'row'}}>
                    <View>
                        <View
                            style={{right:-screenWidth*0.04,top:-screenWidth*0.015,}}
                        >
                          { this.state.epaulegauche ?  <AutoHeightImage
                                width={screenWidth*0.125}
                            source={require("../../../assets/images/Dos_rouge/epaule2.png")}
                        />
                          :
                              <AutoHeightImage
                                  width={screenWidth*0.125}
                                  source={require("../../../assets/images/Dos_blnc/epauleblnc2.png")}
                              />
                          }
                        </View>
                        <View
                            style={{left:-screenWidth*0.03 ,top:-screenWidth*0.045,}}
                        >
                          { this.state.brasgauche ?  <AutoHeightImage
                                width={screenWidth*0.16}
                                source={require("../../../assets/images/Dos_rouge/bras2.png")}
                            />
                          :
                              <AutoHeightImage
                                  width={screenWidth*0.16}
                                  source={require("../../../assets/images/Dos_blnc/brasblnc2.png")}
                              />
                          }
                        </View>
                        <View
                            style={{left:-screenWidth*0.11 ,top:-screenWidth*0.07,}}
                        >
                          {  this.state.maingauche ? <AutoHeightImage
                                width={screenWidth*0.14}
                                source={require("../../../assets/images/Dos_rouge/Main2.png")}
                            />
                          :
                              <AutoHeightImage
                                  width={screenWidth*0.14}
                                  source={require("../../../assets/images/Dos_blnc/Mainblnc2.png")}
                              />
                          }
                        </View>
                    </View>

                    <View>

                        <View
                            style={{marginTop:-screenWidth*0.015,left:-screenWidth*0.015}}
                        >
                           { this.state.poitrine ?<AutoHeightImage
                                width={screenWidth*0.25}
                            source={require("../../../assets/images/Dos_rouge/dos.png")}
                        />
                           :
                               <AutoHeightImage
                                   width={screenWidth*0.25}
                                   source={require("../../../assets/images/Dos_blnc/dosblnc.png")}
                               />
                           }
                        </View>
                        <View
                            style={{marginTop:-screenWidth*0.05}}
                        >
                            {this.state.bassin ? <AutoHeightImage
                                width={screenWidth*0.22}
                            source={require("../../../assets/images/Dos_rouge/Bassin.png")}
                        />
                            :
                                <AutoHeightImage
                                    width={screenWidth*0.22}
                                    source={require("../../../assets/images/Dos_blnc/Bassinblnc.png")}
                                />
                            }
                        </View>

                        <View style={{flexDirection:'row'}}>
                            <View style={{}}>
                                <View
                                    style={{top:-screenWidth*0.06,left:-screenWidth*0.035,}}
                                >
                                 { this.state.cuissegauche ?   <AutoHeightImage
                                        width={screenWidth*0.14}
                                    source={require("../../../assets/images/Dos_rouge/Cuisse2.png")}
                                />
                                 :
                                     <AutoHeightImage
                                         width={screenWidth*0.14}
                                         source={require("../../../assets/images/Dos_blnc/Cuisseblnc2.png")}
                                     />
                                 }
                                </View>
                                <View style={{}}>
                                    <View
                                        style={{top:-screenWidth*0.079,left:-screenWidth*0.04,}}
                                    >
                                     { this.state.jambegauche ?   <AutoHeightImage
                                            width={screenWidth*0.13}
                                        source={require("../../../assets/images/Dos_rouge/Jambe.png")}
                                    />
                                     :
                                         <AutoHeightImage
                                             width={screenWidth*0.13}
                                             source={require("../../../assets/images/Dos_blnc/Jambeblnc.png")}
                                         />
                                     }
                                    </View>
                                    <View
                                        style={{top:-screenWidth*0.08,left:-screenWidth*0.055,}}
                                    >
                                        { this.state.piedgauche ?<AutoHeightImage
                                            width={screenWidth*0.09}
                                        source={require("../../../assets/images/Dos_rouge/pied2.png")}
                                    />
                                        :
                                            <AutoHeightImage
                                                width={screenWidth*0.09}
                                                source={require("../../../assets/images/Dos_blnc/piedblnc2.png")}
                                            />
                                        }
                                    </View>
                                </View>
                            </View>


                            <View style={{}}>
                                <View
                                    style={{top:-screenWidth*0.055,left:-screenWidth*0.03,}}
                                >
                                  { this.state.cuissedroite ?  <AutoHeightImage
                                        width={screenWidth*0.134}
                                    source={require("../../../assets/images/Dos_rouge/Cuisse.png")}
                                />
                                  :
                                      <AutoHeightImage
                                          width={screenWidth*0.134}
                                          source={require("../../../assets/images/Dos_blnc/Cuisseblnc.png")}
                                      />
                                  }
                                </View>
                                <View style={{}}>
                                    <View
                                        style={{top:-screenWidth*0.075,left:-screenWidth*0.02,}}
                                    >
                                        {this.state.jambedroite ? <AutoHeightImage
                                            width={screenWidth*0.13}
                                        source={require("../../../assets/images/Dos_rouge/Jambe2.png")}
                                    /> :
                                            <AutoHeightImage
                                                width={screenWidth*0.13}
                                                source={require("../../../assets/images/Dos_blnc/Jambeblnc2.png")}
                                            />
                                        }
                                    </View>
                                    <View
                                        style={{top:-screenWidth*0.078,right:-screenWidth*0.035,}}
                                    >
                                    { this.state.pieddroite ?   <AutoHeightImage
                                            width={screenWidth*0.09}
                                        source={require("../../../assets/images/Dos_rouge/pied.png")}
                                    />
                                    :
                                        <AutoHeightImage
                                            width={screenWidth*0.09}
                                            source={require("../../../assets/images/Dos_blnc/piedblnc.png")}
                                        />
                                    }
                                    </View>
                                </View>

                            </View>
                        </View>
                    </View>


                    <View style={{}}>
                        <View
                            style={{left:-screenWidth*0.06,top:-screenWidth*0.02,}}
                        >
                            {this.state.epauledroite ?<AutoHeightImage
                                width={screenWidth*0.125}
                                source={require("../../../assets/images/Dos_rouge/epaule.png")}
                            />
                            :
                                <AutoHeightImage
                                    width={screenWidth*0.125}
                                    source={require("../../../assets/images/Dos_blnc/epauleblnc.png")}
                                />
                            }
                        </View>

                        <View
                            style={{top:-screenWidth*0.048,left:-screenWidth*0.02}}
                        >
                          {  this.state.brasdroite ?<AutoHeightImage
                                width={screenWidth*0.14}
                                source={require("../../../assets/images/Dos_rouge/bras.png")}
                            />
                          :
                              <AutoHeightImage
                                  width={screenWidth*0.14}
                                  source={require("../../../assets/images/Dos_blnc/brasblnc.png")}
                              />
                          }
                        </View>
                        <View
                            style={{top:-screenWidth*0.07,right:-screenWidth*0.07}}
                        >
                          {  this.state.maindroite ?<AutoHeightImage
                                width={screenWidth*0.14}
                                source={require("../../../assets/images/Dos_rouge/Main.png")}
                            />
                          :
                              <AutoHeightImage
                                  width={screenWidth*0.14}
                                  source={require("../../../assets/images/Dos_blnc/Mainblnc.png")}
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

export default connect(mapStateToProps)(SqueletteDerriereBlancNotTouchable);
