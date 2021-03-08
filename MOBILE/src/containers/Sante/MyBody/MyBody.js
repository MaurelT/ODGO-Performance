import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    ScrollView,
    View,
    Text,
    TouchableOpacity,
    Dimensions,
    StatusBar,
    Platform
} from 'react-native';
import baseStyles from '../../../base/BaseStyles';
import styles from './styles';
import colors from '../../../configs/colors';
import LinearGradient from 'react-native-linear-gradient';
import AutoHeightImage from 'react-native-auto-height-image';
import CorpsHelper from "../../../apis/helpers/corps_helper";
import AsyncStorage from '@react-native-community/async-storage';
import {SET_ACTIVE_TAB, SET_POP_TO_TOP} from '../../../redux/types/tabTypes';
import statusBarHeight from '../../../configs/screen';
import {Popover, PopoverController} from 'react-native-modal-popover';

const screen = Dimensions.get("window");
const SBHelight = statusBarHeight;
const screenWidth = screen.width
const screenHeight = screen.height - SBHelight



const popover = () => (
    <View style={{}}>
        <PopoverController>
            {({ openPopover, closePopover, popoverVisible, setPopoverAnchor, popoverAnchorRect }) => (
                <React.Fragment>
                    <TouchableOpacity ref={setPopoverAnchor} onPress={openPopover} ><AutoHeightImage
                        width={20}
                        source={require("../../../assets/icons/information.png")}
                        style={{ alignSelf: "center" }}
                    /></TouchableOpacity>
                    <Popover
                        contentStyle={{width:245}}
                        arrowStyle={styles.arrow}
                        backgroundStyle={styles.background}
                        visible={popoverVisible}
                        onClose={closePopover}
                        fromRect={popoverAnchorRect}
                        supportedOrientations={['portrait', 'landscape']}
                    >
                        <View style={{ flexDirection: "row" }}>
                            <View style={{ paddingLeft: 10, paddingRight: 10 }}>
                                <Text style={[baseStyles.textColorWhite, { fontSize: 8 }]}>{"< 18,4"}</Text>
                                <Text style={[baseStyles.textColorWhite, { fontSize: 8 }]}>{"18,5 - 25"}</Text>
                                <Text style={[baseStyles.textColorWhite, { fontSize: 8 }]}>{"25,1 - 30"}</Text>
                                <Text style={[baseStyles.textColorWhite, { fontSize: 8 }]}>{"30,1 - 35"}</Text>
                            </View>
                            <View style={{ paddingLeft: 10, paddingRight: 10 }}>
                                <Text style={[baseStyles.textColorWhite, { fontSize: 8 }]}>Déficit</Text>
                                <Text style={[baseStyles.textColorWhite, { fontSize: 8 }]}>Normal</Text>
                                <Text style={[baseStyles.textColorWhite, { fontSize: 8 }]}>Surpoids</Text>
                                <Text style={[baseStyles.textColorWhite, { fontSize: 8 }]}>Obésité</Text>
                            </View>
                        </View>
                       </Popover>
                </React.Fragment>
            )}
        </PopoverController>
    </View>
);


class MyBodyTemplates extends Component {
    constructor(props) {
        super(props)
        this.state = {
            activeMenu: 2,
            selectedZone: props.selectedZone,
            zonePicker: false,
            pathologie_text: "Traumatismes",
            autre_text: "Xxxxx",
            date_text: "07/06/2019",
            operation: false,
            indispo_time: "2 semaines",
            data:"",
            popToTop:this.props.popToTop,
            showImc:false,
            showImG:false,
            showFFMI:false,
        }
    }
    componentDidMount = async()=>{
       // const userToken = await AsyncStorage.getItem("userToken")
        let responseCorps = await CorpsHelper.getCorps(this.props.userToken)
        this.setState({data: responseCorps.data})
    };
    render() {
        if(this.props.popToTop === 'sante'){
            this.props.navigation.popToTop();
            const setPopToTop = { type: SET_POP_TO_TOP, value: '' }
            this.props.dispatch(setPopToTop);
        }
        return (
            <LinearGradient
                onStartShouldSetResponder={() =>
                {
                    console.warn('You click by View')
                    this.setState({ showImc: false })
                    this.setState({ showImG: false })
                    this.setState({ showFFMI: false })

                }}
                start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }} colors={[colors.balck, colors.green, colors.balck]} style={baseStyles.linearGradient}>

                <ScrollView
                    style={styles.scrollView}
                    contentContainerStyle={[styles.contentContainerStyle]}
                    keyboardShouldPersistTaps={'always'}
                >

                    <View style={{ alignItems :"center",justifyContent:"center",width:"100%"  }}>
                        <TouchableOpacity
                            onPress={() => {
                                if(this.props.navigation.goBack()) {}
                                else{
                                    const setActiveTab = { type: SET_ACTIVE_TAB, value: "home" }
                                    this.props.dispatch(setActiveTab);
                                }
                            }}
                            style={{width:50,position:"absolute",left:0}}
                        >
                            <AutoHeightImage
                                width={18}
                                source={require('../../../assets/icons/left.arrow.white.png')}
                                style={{marginLeft:0}}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity style={{}}
                                          onPress={() => {
                                              this.setState({ zonePicker: true })
                                          }}>
                        <Text style={[baseStyles.titleText,{textAlign:"center"}]}>
                            {"Mon corps"}
                        </Text>
                        </TouchableOpacity>
                    </View>

                    {/* {this.props.selectedZone.id != 0 ? */}

                    <View style={{ marginTop : Platform.OS === "ios" ? 15 : 0,justifyContent: "space-between", alignItems: "center" }}>
                        <View style={{}}>
                            <View style={[styles.inputBlock]}>

                              <View style={{ flexDirection: "row", alignItems: "center" }}>
                                    <Text style={[baseStyles.textColorWhite]}>IMC</Text>
                                    <TouchableOpacity
                                        onPress={()=>{
                                            this.setState({showImc:!this.state.showImc})
                                        }}
                                    >
                                    <AutoHeightImage
                                        width={14}
                                        source={require('../../../assets/icons/shape.red.1.png')}
                                        style={{ marginLeft: 5, marginRight: 5 }}
                                    />
                                    </TouchableOpacity>

                                    { this.state.showImc &&
                                    <View>
                                        <Text style={{fontSize: 8,color:'white',fontStyle:'italic',paddingBottom:6}}>Indice de masse corporelle</Text>
                                        <View style={{ flexDirection: "row",marginBottom:-10 }}>
                                        <View style={{ paddingLeft: 10, paddingRight: 10 }}>
                                            <Text style={[baseStyles.textColorWhite, { fontSize: 8 }]}>{"< 18,4"}</Text>
                                            <Text style={[baseStyles.textColorWhite, { fontSize: 8 }]}>{"18,5 - 25"}</Text>
                                            <Text style={[baseStyles.textColorWhite, { fontSize: 8 }]}>{"25,1 - 30"}</Text>
                                            <Text style={[baseStyles.textColorWhite, { fontSize: 8 }]}>{"30,1 - 35"}</Text>
                                        </View>
                                        <View style={{ paddingLeft: 10, paddingRight: 10 }}>
                                            <Text style={[baseStyles.textColorWhite, { fontSize: 8 }]}>Déficit</Text>
                                            <Text style={[baseStyles.textColorWhite, { fontSize: 8 }]}>Normal</Text>
                                            <Text style={[baseStyles.textColorWhite, { fontSize: 8 }]}>Surpoids</Text>
                                            <Text style={[baseStyles.textColorWhite, { fontSize: 8 }]}>Obésité</Text>
                                        </View>
                                    </View>
                                    </View>
                                    }
                                </View>

                                <Text style={[baseStyles.textColorWhite]}>{ this.state.data !== "" && (this.state.data.imc % 1 != 0 ? (this.state.data.imc).toFixed(2) : this.state.data.imc)}</Text>
                            </View>
                            <View style={[styles.inputBlock]}>
                                <View style={{ flexDirection: "row", alignItems: "center" }}>
                                    <Text style={[baseStyles.textColorWhite]}>IMG</Text>
                                    <TouchableOpacity
                                        onPress={()=>{
                                            this.setState({showImG:!this.state.showImG})
                                        }}
                                    >
                                    <AutoHeightImage
                                        width={14}
                                        source={require('../../../assets/icons/shape.red.1.png')}
                                        style={{ marginLeft: 5, marginRight: 5 }}
                                    />
                                    </TouchableOpacity>

                                    { this.state.showImG &&
                                    <View style={{ marginBottom:-10, marginTop:-10 }}>
                                        <View style={{alignItems:'center',marginBottom:4}}>
                                            <Text style={{fontSize: 9,color:'white',fontStyle:'italic',paddingBottom:6}}>Indice de masse graisseuse</Text>
                                            <Text style={{fontSize: 8,color:'white',fontStyle:'italic'}}>Pourcentage de gras</Text>
                                        </View>
                                        <View style={{flexDirection: "row",}}>
                                        <View style={{ paddingLeft: 10 }}>
                                            <Text style={[baseStyles.textColorWhite, { fontSize: 8,fontWeight:'bold',fontStyle:'italic' }]}>Hommes</Text>
                                            <Text style={[baseStyles.textColorWhite, { fontSize: 8 }]}>{"2% - 5%"}</Text>
                                            <Text style={[baseStyles.textColorWhite, { fontSize: 8 }]}>{"6% - 13%"}</Text>
                                            <Text style={[baseStyles.textColorWhite, { fontSize: 8 }]}>{"14% - 17%"}</Text>
                                            <Text style={[baseStyles.textColorWhite, { fontSize: 8 }]}>{"18% - 25%"}</Text>
                                            <Text style={[baseStyles.textColorWhite, { fontSize: 8 }]}>plus de 25%</Text>
                                        </View>
                                        <View style={{ paddingLeft: 10,alignItems:'center'}}>
                                            <Text style={[baseStyles.textColorWhite, { fontSize: 8 ,fontWeight:'bold',fontStyle:'italic'}]}>Catégories</Text>
                                            <Text style={[baseStyles.textColorWhite, { fontSize: 8 }]}>Gras essentiel minimal</Text>
                                            <Text style={[baseStyles.textColorWhite, { fontSize: 8 }]}>Athlètes</Text>
                                            <Text style={[baseStyles.textColorWhite, { fontSize: 8 }]}>Actifs</Text>
                                            <Text style={[baseStyles.textColorWhite, { fontSize: 8 }]}>Sédentaires</Text>
                                            <Text style={[baseStyles.textColorWhite, { fontSize: 8 }]}>Obèses</Text>
                                        </View>
                                        <View style={{ paddingLeft: 10, paddingRight: 10 }}>
                                            <Text style={[baseStyles.textColorWhite, { fontSize: 8 ,fontWeight:'bold',fontStyle:'italic'}]}>Femmes</Text>
                                            <Text style={[baseStyles.textColorWhite, { fontSize: 8 }]}>{"10% - 13%"}</Text>
                                            <Text style={[baseStyles.textColorWhite, { fontSize: 8 }]}>{"14% - 20%"}</Text>
                                            <Text style={[baseStyles.textColorWhite, { fontSize: 8 }]}>{"21% - 24%"}</Text>
                                            <Text style={[baseStyles.textColorWhite, { fontSize: 8 }]}>{"25% - 31%"}</Text>
                                            <Text style={[baseStyles.textColorWhite, { fontSize: 8 }]}>plus de 31%</Text>
                                        </View>
                                        </View>
                                    </View>}
                                </View>
                                <Text style={[baseStyles.textColorWhite]}>{ this.state.data !== "" && (this.state.data.img % 1 != 0 ? (this.state.data.img).toFixed(2) : this.state.data.img)}%</Text>
                            </View>

                            <View style={[styles.inputBlock]}>
                                <Text style={[baseStyles.textColorWhite]}>Masse grasse</Text>
                                <Text style={[baseStyles.textColorWhite]}>{ this.state.data !== "" && (this.state.data.masse_grasse % 1 != 0 ? (this.state.data.masse_grasse).toFixed(2) : this.state.data.masse_grasse)} kg</Text>
                            </View>

                            <View style={[styles.inputBlock]}>
                                <Text style={[baseStyles.textColorWhite]}>Masse maigre</Text>
                                <Text style={[baseStyles.textColorWhite]}>{ this.state.data !== "" && (this.state.data.masse_maigre % 1 != 0 ? (this.state.data.masse_maigre).toFixed(2) : this.state.data.masse_maigre)} kg</Text>
                            </View>


                            <View style={[styles.inputBlock]}>
                                <View style={{ flexDirection: "row", alignItems: "center" }}>
                                    <Text style={[baseStyles.textColorWhite]}>FFMI</Text>
                                    <TouchableOpacity
                                        onPress={()=>{
                                            this.setState({showFFMI:!this.state.showFFMI})
                                        }}
                                    >
                                    <AutoHeightImage
                                        width={14}
                                        source={require('../../../assets/icons/shape.red.1.png')}
                                        style={{ marginLeft: 5, marginRight: 5 }}
                                    />
                                    </TouchableOpacity>
                                    { this.state.showFFMI &&
                                    <View style={{ marginBottom:-10, marginTop:-10 }}>
                                        <View style={{alignItems:'center',marginBottom:4}}><Text style={{fontSize: 8,color:'white',fontStyle:'italic'}}>FFMI (Fat Free Mass Index)</Text></View>
                                        <View style={{flexDirection: "row",}}>
                                            <View style={{ paddingLeft: 3,justifyContent:'space-between' }}>
                                                <Text style={[baseStyles.textColorWhite, { fontSize: 7,fontWeight:'bold',fontStyle:'italic' }]}>Hommes</Text>
                                                <Text style={[baseStyles.textColorWhite, { fontSize: 7 }]}>Moins de 17</Text>
                                                <Text style={[baseStyles.textColorWhite, { fontSize: 7 }]}>Entre 17 et 20</Text>
                                                <Text style={[baseStyles.textColorWhite, { fontSize: 7 }]}>Entre 20 et 23</Text>
                                                <Text style={[baseStyles.textColorWhite, { fontSize: 7 }]}>Au-dessus de 23</Text>
                                            </View>
                                            <View style={{ paddingLeft: 5,alignItems:'center',justifyContent:'space-between'}}>
                                                <Text style={[baseStyles.textColorWhite, { fontSize: 7 ,fontWeight:'bold',fontStyle:'italic'}]}>Catégories</Text>
                                                <Text style={[baseStyles.textColorWhite, { fontSize: 6 }]}>Peu de muscle(maigre)</Text>
                                                <Text style={[baseStyles.textColorWhite, { fontSize: 6 }]}>Moyenne pour les jeunes adultes</Text>
                                                <Text style={[baseStyles.textColorWhite, { fontSize: 6 }]}>Visiblement musclé(e)</Text>
                                                <Text style={[baseStyles.textColorWhite, { fontSize: 6 }]}>Utilisateur/Utilisatrice de stéroïdes</Text>
                                            </View>
                                            <View style={{ paddingLeft: 5, justifyContent:'space-between' }}>
                                                <Text style={[baseStyles.textColorWhite, { fontSize: 7 ,fontWeight:'bold',fontStyle:'italic'}]}>Femmes</Text>
                                                <Text style={[baseStyles.textColorWhite, { fontSize: 7 }]}>Moins de 14</Text>
                                                <Text style={[baseStyles.textColorWhite, { fontSize: 7 }]}>Entre 14 et 17</Text>
                                                <Text style={[baseStyles.textColorWhite, { fontSize: 7 }]}>Entre 17 et 20</Text>
                                                <Text style={[baseStyles.textColorWhite, { fontSize: 7 }]}>Au-dessus de 20</Text>
                                            </View>
                                        </View>
                                    </View>}
                                </View>
                                <Text style={[baseStyles.textColorWhite]}>{ this.state.data !== "" && (this.state.data.ffmi % 1 != 0 ? (this.state.data.ffmi).toFixed(2) : this.state.data.ffmi)}</Text>
                            </View>
                            <View style={[styles.inputBlock, styles.lastInputBlock]}>
                                <Text style={[baseStyles.textColorWhite]}>Poids idéal</Text>
                                <Text style={[baseStyles.textColorWhite]}>{this.state.data !== "" && (this.state.data.poids_ideal % 1 != 0 ? (this.state.data.poids_ideal).toFixed(2) :this.state.data.poids_ideal)} kg</Text>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </LinearGradient>
        )
    }
}

// export default MyBody;
const mapStateToProps = (state) => {
    const { selectedZone, popToTop,userToken } = state.statedata
    return { selectedZone,popToTop,userToken }
};

export default connect(mapStateToProps)(MyBodyTemplates);
