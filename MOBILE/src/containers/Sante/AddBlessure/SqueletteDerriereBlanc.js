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

class SqueletteDevantBlanced extends Component {
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
                        this.props._selectedId(17,'Tête arrière',this.state.tete)

                    }}
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
                        this.props._selectedId(18,'Cervicale arrière',this.state.cou)

                    }}
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
                </TouchableOpacity>

                <View style={{flexDirection:'row'}}>
                    <View>
                        <TouchableOpacity
                            onPress={()=>{
                                console.warn('epaule gaucheD')
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
                                this.setState({maindroite:false})  //voici  ci dessous omoplate gauche j'ai changé en droite
                                this.props._selectedId(27,'Epaule / triceps gauche arrière',this.state.epaulegauche)

                            }}
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
                        </TouchableOpacity>
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
                                this.setState({maindroite:false})  //gauche changé en droite
                                this.props._selectedId(28,'Coude/Avant bras gauche arrière',this.state.brasgauche)

                            }}
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
                                this.setState({maindroite:false})  //gauche changé en droite
                                this.props._selectedId(29,'Poignet/main gauche arrière',this.state.maingauche)

                            }}
                            style={{left:-screenWidth*0.115 ,top:-screenWidth*0.065,}}
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
                        </TouchableOpacity>
                    </View>

                    <View>

                        <TouchableOpacity
                            onPress={()=>{
                                console.warn('Dos')
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
                                this.props._selectedId(19,'Dos',this.state.poitrine)


                            }}
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
                                this.props._selectedId(22,'Lombaire',this.state.bassin)

                            }}
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
                                        this.setState({maindroite:false})  //gauche changé en droite
                                        this.props._selectedId(30,'Cuisse / Hanche gauche arrière',this.state.cuissegauche)

                                    }}
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
                                            this.setState({maindroite:false})  //gauche changé en droite
                                            this.props._selectedId(31,'Genoux / Mollet gauche arrière',this.state.jambegauche)

                                        }}
                                        style={{top:-screenWidth*0.082,left:-screenWidth*0.04,}}
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
                                            this.setState({maindroite:false})  //gauche changé en droite
                                            this.props._selectedId(32,'Pied / Cheville gauche arrière',this.state.piedgauche)

                                        }}
                                        style={{top:-screenWidth*0.086,left:-screenWidth*0.054}}
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
                                        this.setState({maindroite:false})  //droite changé en gauche
                                        this.props._selectedId(24,'Cuisse / Hanche droite arrière',this.state.cuissedroite)

                                    }}
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
                                </TouchableOpacity>
                                <View style={{}}>
                                    <TouchableOpacity
                                        onPress={()=>{
                                            console.warn('jambe droitr')
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
                                            this.props._selectedId(25,'Genoux / Mollet droit arrière',this.state.jambedroite)


                                        }}
                                        style={{top:-screenWidth*0.077,left:-screenWidth*0.02,}}
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
                                            this.props._selectedId(26,'Pied / Cheville droite arrière',this.state.pieddroite)

                                        }}
                                        style={{top:-screenWidth*0.078,right:-screenWidth*0.036,}}
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
                                this.setState({maindroite:false})  //droite changé en gauche
                                this.props._selectedId(20,'Epaule / triceps droit arrière',this.state.epauledroite)


                            }}
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
                                this.props._selectedId(21,'Coude/Avant bras droit arrière',this.state.brasdroite)

                            }}
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
                                this.props._selectedId(23,'Poignet/main droit arrière',this.state.maindroite)


                            }}
                            style={{top:-screenWidth*0.065,right:-screenWidth*0.068}}
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

export default connect(mapStateToProps)(SqueletteDevantBlanced);
