import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    Dimensions,
    StatusBar,
    TouchableOpacity,
    ScrollView,
    View,
    Text,
    RefreshControl,
    Image,
    Modal,
    TextInput, TouchableHighlight, Alert,Platform
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import AutoHeightImage from 'react-native-auto-height-image';
import LinearGradient from 'react-native-linear-gradient';
import colors from '../../../configs/colors';
import baseStyles from '../../../base/BaseStyles';
import styles from './styles';
import MAAButton from '../../../components/MAAButton/MAAButton';
import {SET_ACTIVE_FP, SET_ACTIVE_TAB,SET_ACTIVE_TABMENU_MYENERGY} from '../../../redux/types/tabTypes';
import PersonalDataHelper from '../../../apis/helpers/person_data_helper';
import statusBarHeight from '../../../configs/screen';
import {Popover, PopoverController} from 'react-native-modal-popover';
import Slidebottom from '../../../components/selectslidebottom/Slidebottom';
import {getDashboar} from '../../../apis/FonctionRedondant';
import dashboardHelper from '../../../apis/helpers/dashboard_helper';

const screen = Dimensions.get('screen');
const SBHelight = statusBarHeight;
const screenWidth = screen.width
const screenHeight = screen.height - SBHelight



const popover = () => (
    <View style={{}}>
        <PopoverController>
            {({ openPopover, closePopover, popoverVisible, setPopoverAnchor, popoverAnchorRect }) => (
                <React.Fragment>
                    <TouchableOpacity ref={setPopoverAnchor} onPress={openPopover} ><AutoHeightImage
                        width={17}
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
                        <Text style={{color:'#234232',textAlign:'center'}}>5 cycles de sommeil de 1h30 sont conseillés soit 7h30</Text>
                    </Popover>
                </React.Fragment>
            )}
        </PopoverController>
    </View>
);

class MyEnergy extends Component {

    uea = [];
    nbhsArray = [
        {h:"4h00",hor:4.00},
        {h:"4h15",hor:4.15},
        {h:"4h30",hor:4.30},
        {h:"4h45",hor:4.45},
        {h:"5h00",hor:5.00},
        {h:"5h15",hor:5.10},
        {h:"5h30",hor:5.30},
        {h:"5h45",hor:5.45},
        {h:"6h00",hor:6.00},
        {h:"6h15",hor:6.15},
        {h:"6h30",hor:6.30},
        {h:"6h45",hor:6.45},
        {h:"7h00",hor:7.00},
        {h:"7h15",hor:7.15},
        {h:"7h30",hor:7.30},
        {h:"7h45",hor:7.45},
        {h:"8h00",hor:8.00},
        {h:"8h15",hor:8.15},
        {h:"8h30",hor:8.30},
        {h:"8h45",hor:8.45},
        {h:"9h00",hor:9.00},
        {h:"9h15",hor:9.15},
        {h:"9h30",hor:9.30},
        {h:"9h45",hor:9.45},
        {h:"10h00",hor:10.00},
        {h:"10h15",hor:10.15},
        {h:"10h30",hor:10.30},
        {h:"10h45",hor:10.45},
        {h:"11h00",hor:11.00},
        {h:"11h15",hor:11.15},
        {h:"11h30",hor:11.30},
        {h:"11h45",hor:11.45},
        {h:"12h00",hor:12.00},
    ];

    constructor(props) {
        super(props)
        this.state = {
            activeTabMenu: 1,
            isFichePedag: props.isFichePedag,

            nutrition: null,
            objectifs: [],
            objectifsChoice: false,
            regimes: [],
            regimesChoice: false,
            exg_alim: [],
            exg_alimChoice: false,

            morphologie: "",
            userRS: null,
            userObjectif: null,
            userEA: [],
            isWritingNBHS:false,
            isWritingSommeil:false,

            showEA: false,

            nbhsommeil: null
        }
        // const count = ((12 * 60) - (4 * 60)) / 15
        // let inc = 0
        // for (let c = 0; c < count; c++) {
        //     if ((inc * 15) == 60) {
        //         inc = 0
        //     }
        //     else {
        //         inc++
        //     }
        //     this.nbhsArray.push(("" + (c + 4) + "h" + (inc * 15)))
        // }
    }

    async componentDidMount() {
        this.getUserNutrition();
        this.getObjectifs();
        this.getRegimes();
        this.getExgAlim();
        this.getUserNbHeureSommeil();

        console.warn('test hoe inona',this.props.activeTab)
        setTimeout(()=> this.setState({refreshing:false}),8000)

    }

    getUserNutrition = async () => {
        this.setState({ refreshing: true })
        const nutrition = await PersonalDataHelper.getUserNutrition(this.props.userToken)
        this.setState({ nutrition: nutrition.data })
        this.setState({ morphologie: nutrition.data.morphologie })
        this.setState({ userRS: nutrition.data.regime_special })
        this.setState({ userObjectif: nutrition.data.objectif })
        this.setState({ userEA: nutrition.data.exigence_alimentaires })

    }

    getObjectifs = async () => {
        const objectifs = await PersonalDataHelper.getObjectifs(this.props.userToken)
        console.log("objectifs")
        console.log(JSON.stringify(objectifs))
        this.setState({ objectifs: objectifs.data })
    }

    getRegimes = async () => {
        const regimes = await PersonalDataHelper.getRegimes(this.props.userToken)
        this.setState({ regimes: regimes.data })
    }

    getExgAlim = async () => {
        const exg_alim = await PersonalDataHelper.getExgAlim(this.props.userToken)
        console.log("regimes")
        console.log(JSON.stringify(exg_alim))
        this.setState({ exg_alim: exg_alim.data })
        this.uea = exg_alim.data
    }

    putUserNutrition = async () => {
        this.setState({ refreshing: true })
        let ea_id = []
        this.state.userEA.map((ea, index) => {
            ea_id.push(ea.id)
        })
        if(this.state.userObjectif !== null && this.state.userRS !== null){
            const newUserNutrition = await PersonalDataHelper.putUserNutrition(
                this.props.userToken,
                this.state.morphologie,
                this.state.userObjectif.id,
                this.state.userRS.id,
                ea_id
            );
            console.warn('resaka objectif s sakafo fady',newUserNutrition)
            if(newUserNutrition){
                this.setState({ refreshing: false })
            }
        }else{
            this.setState({ refreshing: false })
        }


    }

    getUserNbHeureSommeil = async () => {
        const nbhsommeil = await PersonalDataHelper.getUserNbHeureSommeil(this.props.userToken)
        console.log("nbhsommeil")
        console.log(JSON.stringify(nbhsommeil))
        this.setState({ nbhsommeil: nbhsommeil.data.nb_heure_sommeil })
        this.setState({refreshing:false})
    };

    putUserNbHeureSommeilURL = async () => {

        // const nbhsRpl = this.state.nbhsommeil.replace("h", ".")
        // console.log("this.state.nbhsommeil")
        // console.log(nbhsRpl)
        if(this.state.nbhsommeil !== null){
            const resPutNBHS = await PersonalDataHelper.putUserNbHeureSommeil(
                this.props.userToken,
                // parseFloat(nbhsRpl).toFixed(2)
                this.state.nbhsommeil
            )
            if( global.is_venudedonneperso === true){
                const setActiveTab = { type: SET_ACTIVE_TAB, value: "monplaning" };
                this.props.dispatch(setActiveTab);
                // this.props.navigation.navigate('AppScreen');
                this.props.navigation.navigate('LogedinNavigator');
            } else {
                this.props.navigation.navigate("Masemaine");
            }
        }else{
            Alert.alert('Odgo', 'Veuillez insérer votre temps de sommeil.')
        }
    };



    render() {
        var decimal = null;
        if(this.state.nbhsommeil !== null ){
            if(this.state.nbhsommeil % 1 !==0 ){
                let  aloha = Number(String(this.state.nbhsommeil).substr(String(this.state.nbhsommeil).indexOf('.')+1));
                let afara = Number(String(this.state.nbhsommeil).substr(String(this.state.nbhsommeil).indexOf('.')+2))
                if(afara === 0){
                    decimal = aloha +''+afara
                }else {
                    decimal = aloha
                }
            }else{
                decimal = null;
            }
        }


        return (
            <LinearGradient

                onStartShouldSetResponder={() =>
                {
                    console.warn('You click by View')
                    this.setState({ objectifsChoice: false })
                    this.setState({ regimesChoice: false })
                    this.setState({ isWritingNBHS: false })
                    this.setState({ isWritingSommeil: false })
                }}
                start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }} colors={[colors.balck, colors.green, colors.balck]} style={baseStyles.linearGradient}>
                <ScrollView
                    contentInsetAdjustmentBehavior="automatic"
                    style={styles.scrollView}
                    contentContainerStyle={[styles.contentContainerStyle]}
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.refreshing}
                            onRefresh={() => {
                                this.getUserNutrition()
                                this.getObjectifs()
                                this.getRegimes()
                                this.getExgAlim()
                                this.getUserNbHeureSommeil()
                            }}
                            tintColor={Platform.OS==='ios'?colors.white:colors.green}
                                colors={[Platform.OS==='ios'?colors.white:colors.green]}
                        />
                    }
                >


                    <View style={{ alignItems :"center",justifyContent:"center",width:"100%",marginTop:15 ,marginBottom:15 }}>
                        <TouchableOpacity
                            onPress={async () => {

                                if(this.props.activeTabMenu === 3 ){
                                    const setActiveFPAction = { type: SET_ACTIVE_FP, value: 2 };
                                    this.props.dispatch(setActiveFPAction);
                                    const setActive = { type: SET_ACTIVE_TABMENU_MYENERGY, value: 1 };
                                    await this.props.dispatch(setActive);
                                }else{
                                    if(global.is_venudedonneperso === true){
                                        const setActiveFPAction = { type: SET_ACTIVE_FP, value: 1 };
                                        this.props.dispatch(setActiveFPAction);
                                        const setActiveTab = { type: SET_ACTIVE_TAB, value: "DonneesPerso" };
                                        this.props.dispatch(setActiveTab);
                                        this.props.navigation.navigate('LogedinNavigator');
                                    }else {
                                        const setActiveFPAction = { type: SET_ACTIVE_FP, value: null };
                                        this.props.dispatch(setActiveFPAction);
                                        this.props.navigation.goBack();
                                    }
                                }

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
                        <Text style={[baseStyles.titleText,{textAlign:"center"}]}>
                            {" Mon énergie"}
                        </Text>
                    </View>

                    <View style={[styles.headCtn]}>

                        <TouchableOpacity
                            style={[styles.headMenu]}
                            onPress={async() => {

                                const setActive = { type: SET_ACTIVE_TABMENU_MYENERGY, value: 1 };
                                await this.props.dispatch(setActive);
                            }}>
                            <View >
                                <Text style={[styles.menuText]}>NUTRITION</Text>
                            </View>
                            <View style={[(this.props.activeTabMenu == 1 ? styles.activeMenu : styles.inactiveMenu)]}></View>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.headMenu]}
                            onPress={async() => {
                                // this.setState({ activeTabMenu: 3 })
                                const setActive = { type: SET_ACTIVE_TABMENU_MYENERGY, value: 3 };
                                await this.props.dispatch(setActive);
                            }}>
                            <View >
                                <Text style={[styles.menuText]}>SOMMEIL</Text>
                            </View>
                            <View style={[(this.props.activeTabMenu == 3 ? styles.activeMenu : styles.inactiveMenu)]}></View>
                        </TouchableOpacity>

                    </View>

                    {
                        this.props.activeTabMenu === 3 ?
                            <View style={{marginHorizontal:screenWidth * 0.042,alignSelf:'center'}}>


                                <View style={{
                                    flexDirection: "row", alignItems: "center", justifyContent: "space-between",
                                    padding: 15
                                }}>
                                    <View style={{flexDirection:'row',alignItems:'center'}}>
                                        <Text style={[baseStyles.textColorWhite]}>Temps de sommeil conseillé : 7h30{"  "}
                                            {/*<AutoHeightImage*/}
                                            {/*    width={13}*/}
                                            {/*    source={require("../../../assets/icons/shape.red.1.png")}*/}
                                            {/*    style={{*/}
                                            {/*        backgroundColor: colors.white, borderRadius: 20, margin: 10,*/}
                                            {/*        left: 18*/}
                                            {/*    }}*/}
                                            {/*/>*/}
                                        </Text>
                                        {popover()}
                                    </View>


                                </View>
                                <View style={{
                                  alignItems: "center",
                                    flexDirection: "row", flexWrap: "wrap", padding: 15, }}>
                                    <Text style={[baseStyles.textColorWhite]}>
                                        Objectif de sommeil par nuit :
                                    </Text>
                                    <TouchableOpacity
                                        onPress={() => {
                                            this.setState({ isWritingSommeil: !this.state.isWritingSommeil })
                                        }}
                                        style={{marginRight:screenWidth * 0.015}}
                                    >
                                        {console.warn(decimal)}
                                        {this.state.nbhsommeil !== null ? <Text style={[baseStyles.textColorWhite]}> {Math.trunc(this.state.nbhsommeil) +'h'}{decimal === null ? "": decimal}</Text> : <Text style={[baseStyles.textColorWhite,{textDecorationLine:'underline'}]}>____________</Text>}
                                    </TouchableOpacity>
                                </View>


                            </View>
                            : null
                    }

                    {
                        this.state.activeTabMenu == 2 ?
                            <View>
                                <View style={{
                                    flexDirection: "row", alignItems: "center", justifyContent: "space-between",
                                    padding: 15, paddingBottom: 0, paddingTop: 0
                                }}>
                                    <Text style={[baseStyles.textColorWhite]}>
                                        Objectifs {" "}
                                        <AutoHeightImage
                                            width={10}
                                            source={require("../../../assets/icons/shape.red.1.png")}
                                            style={{
                                                backgroundColor: colors.white, borderRadius: 20, margin: 10,
                                                left: 15
                                            }}
                                        />
                                    </Text>
                                    <Text style={[baseStyles.textColorWhite]}>2 litres</Text>
                                </View>
                                <View style={{
                                    flexDirection: "row", alignItems: "center", justifyContent: "space-between",
                                    padding: 15, paddingBottom: 0, paddingTop: 0
                                }}>
                                    <Text style={[baseStyles.textColorWhite, { opacity: 0.7 }]}>
                                        Recommandé pour vous : 3 litres
                                    </Text>
                                </View>
                                <View style={{ padding: 15 }}>
                                    <View style={{ borderWidth: 0.5, borderColor: colors.white + "44" }}></View>
                                </View>
                                <View style={{
                                    flexDirection: "row", alignItems: "center", justifyContent: "space-between",
                                    padding: 15, paddingBottom: 0, paddingTop: 0
                                }}>
                                    <Text style={[baseStyles.textColorWhite, { opacity: 1 }]}>
                                        Choisissez la contenance qui vous correspond à fin de mettre à jour votre compteur hydrique
                                    </Text>
                                </View>

                                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-evenly", marginTop: 20 }}>
                                    <View style={[styles.hydrateElem]}>
                                        <AutoHeightImage
                                            source={require("../../../assets/images/verre.1.png")}
                                            width={((screenWidth - 60) / 3) - 80} />
                                        <Text style={[baseStyles.textColorWhite, { fontSize: 10 }]}>
                                            Verre
                                        </Text>
                                        <Text style={[baseStyles.textColorWhite, { fontSize: 10 }]}>
                                            250 ml
                                        </Text>
                                        <AutoHeightImage
                                            width={18}
                                            source={require("../../../assets/icons/check.red.png")}
                                            style={{
                                                position: "absolute",
                                                top: 10,
                                                right: 10
                                            }} />
                                    </View>
                                    <View style={[styles.hydrateElem]}>
                                        <AutoHeightImage
                                            source={require("../../../assets/images/water.png")}
                                            width={15} />
                                        <Text style={[baseStyles.textColorWhite, { fontSize: 10 }]}>
                                            Petite bouteille
                                        </Text>
                                        <Text style={[baseStyles.textColorWhite, { fontSize: 10 }]}>
                                            500 ml
                                        </Text>
                                    </View>
                                    <View style={[styles.hydrateElem]}>
                                        <AutoHeightImage
                                            source={require("../../../assets/images/water.png")}
                                            width={20} />
                                        <Text style={[baseStyles.textColorWhite, { fontSize: 10 }]}>
                                            Grande boutaile
                                        </Text>
                                        <Text style={[baseStyles.textColorWhite, { fontSize: 10 }]}>
                                            1 L
                                        </Text>
                                    </View>
                                </View>

                            </View>
                            : null
                    }

                    {
                        this.props.activeTabMenu == 1 ?
                            <View>
                                <View style={{
                                    flexDirection: "row", alignItems: "center", justifyContent: "space-between",
                                    padding: 15, paddingBottom: 0, paddingTop: 0
                                }}>
                                    <Text style={[baseStyles.textColorWhite, { opacity: 1 }]}>
                                        De quelle morphologie vous rapprochez vous le plus ?
                                    </Text>
                                </View>

                                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-evenly", marginTop: 20 }}>
                                    <TouchableOpacity
                                        style={{ width: (screenWidth - 70) / 3,
                                            height: screenHeight *0.45,
                                            borderWidth: 1,
                                            borderColor: colors.white,
                                            borderRadius: 10,
                                            alignItems: "center",
                                            justifyContent: "center"}}
                                        onPress={() => {
                                            this.setState({ morphologie: "ecto" })
                                        }}
                                    >
                                        <Image
                                            source={require("../../../assets/images/11.png")}
                                            style={{width:(screenWidth - 70) / 3,height: screenHeight *0.40}}
                                            resizeMode={"contain"}
                                        />
                                        <Text style={[baseStyles.textColorWhite,{fontSize:13}]}>Ectomorphe</Text>
                                        {
                                            this.state.morphologie == "ecto" ?
                                                <AutoHeightImage
                                                    width={18}
                                                    source={require("../../../assets/icons/check.red.png")}
                                                    style={{
                                                        position: "absolute",
                                                        top: 10,
                                                        right: 10
                                                    }} /> : null
                                        }

                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={[styles.nutritionElem,{justifyContent:'center',alignItems:'center'}]}
                                        onPress={() => {
                                            this.setState({ morphologie: "meso" })
                                        }}
                                    >
                                        <Image
                                            source={require("../../../assets/images/22.png")}
                                            // width={(screenWidth  / 3) - 68}
                                            // width={(screenWidth  / 3) - 43}
                                            style={{width:(screenWidth - 70) / 3,height: screenHeight *0.40,top:-screenHeight*0.01}}
                                            resizeMode={"contain"}
                                        />
                                        <Text style={[baseStyles.textColorWhite,{textAlign:'center',fontSize:13}]}>Mésomorphe</Text>
                                        {
                                            this.state.morphologie == "meso" ?
                                                <AutoHeightImage
                                                    width={18}
                                                    source={require("../../../assets/icons/check.red.png")}
                                                    style={{
                                                        position: "absolute",
                                                        top: 10,
                                                        right: 10
                                                    }} /> : null
                                        }
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={[styles.nutritionElem]}
                                        onPress={() => {
                                            this.setState({ morphologie: "endo" })
                                        }}
                                    >
                                        <Image
                                            source={require("../../../assets/images/33.png")}
                                            // width={(screenWidth  / 3) - 68}
                                            // width={(screenWidth  / 3) - 43}
                                            style={{width:(screenWidth  / 3) - 43,height: screenHeight *0.40}}
                                            resizeMode={"contain"}
                                        />
                                        <Text style={[baseStyles.textColorWhite,{fontSize:13}]}>Endomorphe</Text>
                                        {
                                            this.state.morphologie == "endo" ?
                                                <AutoHeightImage
                                                    width={18}
                                                    source={require("../../../assets/icons/check.red.png")}
                                                    style={{
                                                        position: "absolute",
                                                        top: 10,
                                                        right: 10
                                                    }} /> : null
                                        }
                                    </TouchableOpacity>
                                </View>

                                <View style={{ padding: 15 }}>
                                    <View style={{ borderWidth: 0.5, borderColor: colors.white + "44" }}></View>
                                </View>

                                <View style={{
                                    flexDirection: "row", alignItems: "center", justifyContent: "space-between",
                                    padding: 15, paddingBottom: 0, paddingTop: 0
                                }}>
                                    <TouchableOpacity
                                        onPress={() => {
                                            this.setState({ objectifsChoice: !this.state.objectifsChoice })
                                            this.setState({ regimesChoice: false })
                                            this.setState({ exg_alimChoice: false })
                                        }}
                                    >
                                        <Text style={[baseStyles.textColorWhite]}>Mon objectif</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        onPress={() => {
                                            this.setState({ objectifsChoice: !this.state.objectifsChoice })
                                            this.setState({ regimesChoice: false })
                                            this.setState({ exg_alimChoice: false })
                                        }}
                                        style={{ flexDirection: "row", alignSelf: "center", justifyContent: "space-between" }}
                                    >

                                        {
                                            this.state.userObjectif != null ? <Text style={[baseStyles.textColorWhite, { alignSelf: "center" }]}>{this.state.userObjectif.name}</Text> : <Text style={[baseStyles.textColorWhite, { alignSelf: "center" ,textDecorationLine:'underline'}]}>____________</Text>
                                        }

                                        <AutoHeightImage
                                            source={require("../../../assets/icons/arrow-white.png")}
                                            width={screenWidth * 0.03}
                                            style={{ alignSelf: "center", marginLeft: 5, marginRight: 5 }}
                                        />
                                    </TouchableOpacity>
                                    {/*{*/}
                                    {/*    this.state.objectifsChoice ?*/}
                                    {/*        <ScrollView*/}
                                    {/*            style={{*/}
                                    {/*                position: "absolute",*/}
                                    {/*                top: 20,*/}
                                    {/*                right: 10,*/}
                                    {/*                backgroundColor: colors.white,*/}
                                    {/*                borderRadius: 5,*/}
                                    {/*                zIndex: 999*/}
                                    {/*            }}*/}
                                    {/*        >*/}
                                    {/*            {*/}
                                    {/*                this.state.objectifs.map((obj, index) => {*/}
                                    {/*                    return (*/}
                                    {/*                        <TouchableOpacity*/}
                                    {/*                            key={"sport_" + index}*/}
                                    {/*                            style={{*/}
                                    {/*                                padding: 5,*/}
                                    {/*                                paddingLeft: 10,*/}
                                    {/*                                paddingRight: 10,*/}
                                    {/*                                margin: 5,*/}
                                    {/*                                borderBottomColor:colors.grisbox,*/}
                                    {/*                                borderBottomWidth: this.state.objectifs.length == index ? 0 : 0.5*/}
                                    {/*                            }}*/}
                                    {/*                            onPress={() => {*/}
                                    {/*                                console.warn(index,this.state.objectifs.length)*/}
                                    {/*                                // this.state.userObjectif*/}
                                    {/*                                this.setState({ userObjectif: obj })*/}
                                    {/*                                this.setState({ objectifsChoice: false })*/}
                                    {/*                                // this.getSportListLevels(sport.id)*/}
                                    {/*                            }}*/}
                                    {/*                        >*/}
                                    {/*                            <Text>*/}
                                    {/*                                {*/}
                                    {/*                                    obj.name*/}
                                    {/*                                }*/}
                                    {/*                            </Text>*/}
                                    {/*                        </TouchableOpacity>*/}
                                    {/*                    )*/}
                                    {/*                })*/}
                                    {/*            }*/}
                                    {/*        </ScrollView> : null*/}
                                    {/*}*/}

                                </View>

                                <View style={{ padding: 15 }}>
                                    <View style={{ borderWidth: 0.5, borderColor: colors.white + "44" }}></View>
                                </View>

                                <View style={{
                                    flexDirection: "row", alignItems: "center", justifyContent: "space-between",
                                    padding: 15, paddingBottom: 0, paddingTop: 0
                                }}>
                                    <TouchableOpacity
                                        onPress={() => {
                                            this.setState({ regimesChoice: !this.state.regimesChoice })
                                            this.setState({ objectifsChoice: false })
                                            this.setState({ exg_alimChoice: false })
                                        }}
                                    >
                                        <Text style={[baseStyles.textColorWhite]}>Régime spécial</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        onPress={() => {
                                            this.setState({ regimesChoice: !this.state.regimesChoice })
                                            this.setState({ objectifsChoice: false })
                                            this.setState({ exg_alimChoice: false })
                                        }}
                                        style={{ flexDirection: "row", alignSelf: "center", justifyContent: "space-between" }}
                                    >

                                        {
                                            this.state.userRS != null ? <Text style={[baseStyles.textColorWhite, { alignSelf: "center" }]}>{this.state.userRS.name}</Text> : <Text style={[baseStyles.textColorWhite, { alignSelf: "center" ,textDecorationLine:'underline'}]}>____________</Text>
                                        }
                                        <AutoHeightImage
                                            source={require("../../../assets/icons/arrow-white.png")}
                                            width={screenWidth * 0.03}
                                            style={{ alignSelf: "center", marginLeft: 5, marginRight: 5 }}
                                        />
                                    </TouchableOpacity>
                                    {/*{*/}
                                    {/*    this.state.regimesChoice ?*/}
                                    {/*        <View*/}
                                    {/*            style={{*/}
                                    {/*                position: "absolute",*/}
                                    {/*                top: 20,*/}
                                    {/*                right: 10,*/}
                                    {/*                backgroundColor: colors.white,*/}
                                    {/*                borderRadius: 5,*/}
                                    {/*                zIndex: 999*/}
                                    {/*            }}*/}
                                    {/*        >*/}
                                    {/*            {*/}
                                    {/*                this.state.regimes.map((regime, index) => {*/}
                                    {/*                    return (*/}
                                    {/*                        <TouchableOpacity*/}
                                    {/*                            key={"sport_" + index}*/}
                                    {/*                            style={{*/}
                                    {/*                                padding: 5,*/}
                                    {/*                                paddingLeft: 10,*/}
                                    {/*                                paddingRight: 10,*/}
                                    {/*                                margin: 5,*/}
                                    {/*                                borderBottomColor: colors.grisbox,*/}
                                    {/*                                borderBottomWidth: 0.5*/}
                                    {/*                            }}*/}
                                    {/*                            onPress={() => {*/}
                                    {/*                              //  this.state.userRS*/}
                                    {/*                                this.setState({ userRS: regime })*/}
                                    {/*                                this.setState({ regimesChoice: false })*/}
                                    {/*                                // this.getSportListLevels(sport.id)*/}
                                    {/*                            }}*/}
                                    {/*                        >*/}
                                    {/*                            <Text>*/}
                                    {/*                                {*/}
                                    {/*                                    regime.name*/}
                                    {/*                                }*/}
                                    {/*                            </Text>*/}
                                    {/*                        </TouchableOpacity>*/}
                                    {/*                    )*/}
                                    {/*                })*/}
                                    {/*            }*/}
                                    {/*        </View> : null*/}
                                    {/*}*/}
                                </View>

                                <View style={{ padding: 15 }}>
                                    <View style={{ borderWidth: 0.5, borderColor: colors.white + "44" }}></View>
                                </View>

                                <View style={{
                                    flexDirection: "row", alignItems: "center", justifyContent: "space-between",
                                    padding: 15, paddingBottom: 0, paddingTop: 0
                                }}>
                                    <TouchableOpacity
                                        onPress={() => {
                                            this.setState({ regimesChoice: false });
                                            this.setState({ objectifsChoice: false });
                                            this.setState({ showEA: !this.state.showEA })
                                        }}
                                    >
                                        <Text style={[baseStyles.textColorWhite]}>Exigences alimentaires</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={{
                                            flexDirection: "row", alignSelf: "center", justifyContent: "space-between"
                                        }}
                                        onPress={() => {
                                            this.setState({ regimesChoice: false });
                                            this.setState({ objectifsChoice: false });
                                            this.setState({ showEA: !this.state.showEA })
                                        }}
                                    >
                                        <View style={{marginLeft:7,
                                            // flexDirection:'row', flexWrap:'wrap'
                                        }}>
                                            {
                                                this.state.userEA.length>0 ?this.state.userEA.map((item, key) =>{
                                                        if(key === this.state.userEA.length - 1){
                                                            return (<Text key={key} style={{ color:'white' }}>
                                                                {item.name}
                                                            </Text>)
                                                        }else{
                                                            return (<Text key={key} style={{ color:'white' }}>
                                                                {item.name +", "}
                                                            </Text>)
                                                        }
                                                    })
                                                    : <Text style={{ color:'white' }}>Aucune</Text>
                                            }
                                        </View>
                                        <AutoHeightImage
                                            source={require("../../../assets/icons/arrow-white.png")}
                                            width={screenWidth * 0.03}
                                            style={{ alignSelf: "center", marginLeft: 5, marginRight: 5 }}
                                        />
                                    </TouchableOpacity>

                                </View>
                            </View>
                            : null
                    }

                    <View style={{ alignItems: "center" }}>

                        <MAAButton text="SUIVANT" width={(screenWidth - 100)} height={40}
                                   style={{
                                       marginTop: this.state.isWritingSommeil ? 400 : 25
                                   }}
                                   onPress={() => {
                                       if (this.props.activeTabMenu === 1) {
                                           this.putUserNutrition().then(async()=>{
                                                   // this.setState({ activeTabMenu: 3 })
                                               const setActive = { type: SET_ACTIVE_TABMENU_MYENERGY, value: 3 };
                                               await this.props.dispatch(setActive);
                                               }
                                           )
                                       } else if (this.props.activeTabMenu === 3) {
                                           this.setState({ isWritingNBHS: false })
                                           this.setState({ isWritingSommeil: false })
                                           this.putUserNbHeureSommeilURL().then(()=>{
                                               const setActiveFPAction = { type: SET_ACTIVE_FP, value: 3 };
                                               this.props.dispatch(setActiveFPAction)
                                           })
                                       }
                                       // renvoie vers mon energie sommeil
                                   }}
                        />
                        <MAAButton text="MON PROFIL" width={(screenWidth - 100)} height={40}
                                   style={{
                                       backgroundColor: "transparent", borderColor: colors.white,
                                       marginTop: 20,
                                       borderWidth: 1,
                                   }}
                                   onPress={() => {
                                       this.putUserNutrition();
                                       if( global.is_venudedonneperso === true) {
                                           console.warn('vers profile')
                                           const setActiveTab = {type: SET_ACTIVE_TAB, value: "profile"};
                                           this.props.dispatch(setActiveTab);
                                       }else{
                                           this.props.navigation.popToTop()
                                       }
                                   }}
                        />
                    </View>

                </ScrollView>

                {/*<Modal*/}
                {/*    visible={this.state.showEA}*/}
                {/*    onRequestClose={() => {*/}
                {/*        this.setState({ showEA: false })*/}
                {/*    }}*/}
                {/*    transparent={true}*/}

                {/*>*/}
                {/*    <TouchableOpacity*/}
                {/*        onPress={() => {*/}
                {/*            this.setState({ showEA: false })*/}
                {/*        }}*/}
                {/*        style={{*/}
                {/*            position: "absolute",*/}
                {/*            top: 0,*/}
                {/*            left: 0,*/}
                {/*            width: screenWidth,*/}
                {/*            height: screenHeight,*/}
                {/*            zIndex: 0*/}
                {/*        }}*/}
                {/*    >*/}
                {/*    </TouchableOpacity>*/}
                {/*    <View*/}
                {/*        style={{*/}
                {/*            marginTop: 20,*/}
                {/*            borderRadius: 5,*/}
                {/*            alignSelf: "center",*/}
                {/*            maxWidth: screenWidth - 60,*/}
                {/*            maxHeight: screenHeight - 60,*/}
                {/*            minWidth: screenWidth - 60,*/}
                {/*            minHeight: screenHeight - 60,*/}
                {/*            backgroundColor: colors.white*/}
                {/*        }}*/}
                {/*    >*/}

                {/*        <ScrollView*/}

                {/*            style={{*/}
                {/*                borderRadius: 5,*/}
                {/*                zIndex: 999*/}
                {/*            }}*/}

                {/*            contentContainerStyle={{*/}
                {/*                minHeight: 32,*/}
                {/*                maxHeight: 300*/}
                {/*            }}*/}
                {/*        >*/}
                {/*            <View>*/}
                {/*                {*/}
                {/*                    this.state.exg_alim.map((exgalim, index) => {*/}
                {/*                        return (*/}
                {/*                            <TouchableOpacity*/}
                {/*                                key={"sport_" + index}*/}
                {/*                                style={{*/}

                {/*                                    padding: 5,*/}
                {/*                                    paddingLeft: 10,*/}
                {/*                                    paddingRight: 10,*/}
                {/*                                    margin: 5,*/}
                {/*                                    marginRight: 20,*/}
                {/*                                    borderBottomColor: colors.grisbox,*/}
                {/*                                    borderBottomWidth: 0.5,*/}
                {/*                                    flexDirection: "row",*/}
                {/*                                    alignItems: "center",*/}
                {/*                                    justifyContent: "space-between"*/}
                {/*                                }}*/}
                {/*                                onPress={async () => {*/}
                {/*                                    if (exgalim.name.toLowerCase() == "aucune") {*/}
                {/*                                        let newUEA = []*/}
                {/*                                        newUEA.push(exgalim)*/}
                {/*                                        this.setState({ userEA: newUEA })*/}
                {/*                                    }*/}
                {/*                                    else {*/}
                {/*                                        const isAucune = this.state.userEA.find(auc => {*/}
                {/*                                            return auc.name.toLowerCase() === "aucune"*/}
                {/*                                        })*/}
                {/*                                        console.log("isAucune", isAucune)*/}
                {/*                                        if (isAucune != undefined) {*/}
                {/*                                            for (let c = 0; c < this.state.userEA.length; c++) {*/}
                {/*                                                if (this.state.userEA[c].name.toLowerCase() === "aucune") {*/}
                {/*                                                    const newUEA = this.state.userEA.splice(c, 1)*/}
                {/*                                                    this.setState({ userEA: this.state.userEA })*/}
                {/*                                                    break*/}
                {/*                                                }*/}
                {/*                                            }*/}
                {/*                                        }*/}

                {/*                                        console.log(JSON.stringify(this.state.userEA))*/}
                {/*                                        const isInUEA = this.state.userEA.find(uealim => {*/}
                {/*                                            return uealim.id == exgalim.id*/}
                {/*                                        })*/}
                {/*                                        if (isInUEA == undefined) {*/}
                {/*                                            const newUEA = this.state.userEA.splice(0, 0, exgalim)*/}
                {/*                                            this.setState({ userEA: this.state.userEA })*/}
                {/*                                        }*/}
                {/*                                        else {*/}

                {/*                                            for (let c = 0; c < this.state.userEA.length; c++) {*/}
                {/*                                                if (exgalim.id === this.state.userEA[c].id) {*/}
                {/*                                                    const newUEA = this.state.userEA.splice(c, 1)*/}
                {/*                                                    this.setState({ userEA: this.state.userEA })*/}
                {/*                                                    break*/}
                {/*                                                }*/}
                {/*                                            }*/}
                {/*                                        }*/}
                {/*                                    }*/}
                {/*                                }}*/}
                {/*                            >*/}
                {/*                                <Text>*/}
                {/*                                    {*/}
                {/*                                        exgalim.name*/}
                {/*                                    }*/}
                {/*                                </Text>*/}
                {/*                                {*/}
                {/*                                    this.state.userEA.find(uealim => {*/}
                {/*                                        return uealim.id == exgalim.id*/}
                {/*                                    }) ?*/}
                {/*                                        <Image*/}
                {/*                                            style={{ width: 32, height: 32 }}*/}
                {/*                                            source={require("../../../assets/icons/check.red.png")}*/}
                {/*                                        /> : <View style={{ width: 32, height: 32 }}>*/}
                {/*                                            <Text style={{ color: 'white' }}></Text>*/}
                {/*                                        </View>*/}
                {/*                                }*/}
                {/*                            </TouchableOpacity>*/}

                {/*                        )*/}
                {/*                    })*/}
                {/*                }*/}
                {/*                <View style={{ alignItems: 'center', marginTop: 15 }}>*/}
                {/*                    <TouchableOpacity*/}
                {/*                        onPress={() => {*/}
                {/*                            this.setState({ showEA: false })*/}
                {/*                        }}*/}
                {/*                    >*/}
                {/*                        <View style={{ backgroundColor: colors.red, width: 200, height: 30, borderRadius: 10, alignItems: 'center', justifyContent: 'center' }}>*/}
                {/*                            <Text style={{ color: 'white' }}>Valider</Text>*/}
                {/*                        </View>*/}
                {/*                    </TouchableOpacity>*/}
                {/*                </View>*/}
                {/*            </View>*/}
                {/*        </ScrollView>*/}
                {/*    </View>*/}
                {/*</Modal>*/}
                <Slidebottom showModal={this.state.objectifsChoice}
                             onRequestClose={()=>{
                                 this.setState({objectifsChoice:false});
                             }}
                             callback={async (item,index)=>{
                                 // this.state.userObjectif
                                 this.setState({ userObjectif: item })
                                 this.setState({ objectifsChoice: false })
                             }}
                             items={ this.state.objectifs}
                             component_item={(item)=>{
                                 return(
                                     <Text style={{color:'#373535'}}>
                                         {
                                             item.name
                                         }
                                     </Text>
                                 )
                             }}
                />
                <Slidebottom showModal={this.state.regimesChoice}
                             onRequestClose={()=>{
                                 this.setState({regimesChoice:false});
                             }}
                             callback={async (item,index)=>{
                                 this.setState({ userRS: item })
                                 this.setState({ regimesChoice: false })
                             }}
                             items={ this.state.regimes}
                             component_item={(item)=>{
                                 return(
                                     <Text style={{color:'#373535'}}>
                                         {
                                             item.name
                                         }
                                     </Text>
                                 )
                             }}
                />
                {/*<Modal*/}
                {/*    visible={this.state.showEA}*/}
                {/*    animationType={"slide"}*/}
                {/*    onRequestClose={() => {*/}
                {/*      this.setState({showEA:false})*/}
                {/*    }*/}
                {/*    }*/}
                {/*    transparent={true}*/}
                {/*>*/}
                {/*    <TouchableOpacity*/}
                {/*        onPress={() => {*/}
                {/*            this.setState({showEA:false})*/}
                {/*        }}*/}
                {/*        style={{*/}
                {/*            position: "absolute",*/}
                {/*            top: 0,*/}
                {/*            left: 0,*/}
                {/*            width: screenWidth,*/}
                {/*            height: screenHeight,*/}
                {/*            zIndex: 0*/}
                {/*        }}*/}
                {/*    >*/}
                {/*    </TouchableOpacity>*/}
                {/*    <View style={{justifyContent:'flex-end',alignItems:'center',top:screenHeight-(30 + screenWidth*0.5)}}>*/}
                {/*        <View style={{height: 30,width: screenWidth,*/}
                {/*            backgroundColor: '#FF3A28',*/}
                {/*            bottom: 0 }}>*/}
                {/*            <View style={{flexDirection:'row',*/}
                {/*                justifyContent: 'space-between',*/}
                {/*                alignItems: 'center',*/}
                {/*                paddingTop:screenWidth*0.013,*/}
                {/*                paddingHorizontal:20*/}
                {/*            }}>*/}
                {/*                <TouchableOpacity*/}
                {/*                    onPress={ async ()=>{*/}
                {/*                        await  this.setState({showEA:false})*/}
                {/*                    }}*/}
                {/*                >*/}
                {/*                    <Text style={{color:'white'}}>Annuler</Text>*/}
                {/*                </TouchableOpacity>*/}
                {/*                <Text style={{color:'white'}}></Text>*/}
                {/*                <TouchableOpacity*/}
                {/*                    onPress={()=>{*/}
                {/*                        this.setState({ showEA: false })*/}
                {/*                    }}*/}
                {/*                >*/}
                {/*                    <Text style={{color:'white'}}>Ok</Text>*/}
                {/*                </TouchableOpacity>*/}
                {/*            </View>*/}
                {/*        </View>*/}
                {/*        <ScrollView*/}
                {/*            style={{height: screenWidth*0.5,backgroundColor:'white',width:'100%'}}*/}
                {/*            contentContainerStyle={{justifyContent:'center',alignItems:'center',paddingBottom:100}}*/}
                {/*        >*/}
                {/*            {*/}
                {/*                this.state.exg_alim.map((exgalim, index) => {*/}
                {/*                    return (*/}
                {/*                        <TouchableOpacity*/}
                {/*                            key={"sport_" + index}*/}
                {/*                            style={{*/}

                {/*                                padding: 5,*/}
                {/*                                paddingLeft: 80,*/}
                {/*                                paddingRight: 70,*/}
                {/*                                margin: 5,*/}
                {/*                                marginRight: 20,*/}
                {/*                                borderBottomColor: colors.grisbox,*/}
                {/*                                borderBottomWidth: 0.5,*/}
                {/*                                flexDirection: "row",*/}
                {/*                                alignItems: "center",*/}
                {/*                                width:'100%',*/}
                {/*                                justifyContent: "space-between"*/}
                {/*                            }}*/}
                {/*                            onPress={async () => {*/}
                {/*                                if (exgalim.name.toLowerCase() == "aucune") {*/}
                {/*                                    let newUEA = []*/}
                {/*                                    newUEA.push(exgalim)*/}
                {/*                                    this.setState({ userEA: newUEA })*/}
                {/*                                }*/}
                {/*                                else {*/}
                {/*                                    const isAucune = this.state.userEA.find(auc => {*/}
                {/*                                        return auc.name.toLowerCase() === "aucune"*/}
                {/*                                    });*/}
                {/*                                    console.log("isAucune", isAucune);*/}
                {/*                                    if (isAucune != undefined) {*/}
                {/*                                        for (let c = 0; c < this.state.userEA.length; c++) {*/}
                {/*                                            if (this.state.userEA[c].name.toLowerCase() === "aucune") {*/}
                {/*                                                const newUEA = this.state.userEA.splice(c, 1)*/}
                {/*                                                this.setState({ userEA: this.state.userEA })*/}
                {/*                                                break*/}
                {/*                                            }*/}
                {/*                                        }*/}
                {/*                                    }*/}

                {/*                                    console.warn(JSON.stringify(this.state.userEA))*/}
                {/*                                    const isInUEA = this.state.userEA.find(uealim => {*/}
                {/*                                        return uealim.id == exgalim.id*/}
                {/*                                    })*/}
                {/*                                    console.warn("isInUEA")*/}
                {/*                                    console.warn(isInUEA)*/}
                {/*                                    if (isInUEA == undefined) {*/}
                {/*                                        const newUEA = this.state.userEA.splice(0, 0, exgalim)*/}
                {/*                                        this.setState({ userEA: this.state.userEA })*/}
                {/*                                    }*/}
                {/*                                    else {*/}

                {/*                                        for (let c = 0; c < this.state.userEA.length; c++) {*/}
                {/*                                            if (exgalim.id === this.state.userEA[c].id) {*/}
                {/*                                                // this.setState({userEA: this.uea.splice(c, 1)})*/}
                {/*                                                const newUEA = this.state.userEA.splice(c, 1)*/}
                {/*                                                this.setState({ userEA: this.state.userEA })*/}
                {/*                                                break*/}
                {/*                                            }*/}
                {/*                                        }*/}
                {/*                                    }*/}
                {/*                                }*/}
                {/*                            }}*/}
                {/*                        >*/}
                {/*                            <Text>*/}
                {/*                                {*/}
                {/*                                    exgalim.name*/}
                {/*                                }*/}
                {/*                            </Text>*/}
                {/*                            {*/}
                {/*                                this.state.userEA.find(uealim => {*/}
                {/*                                    return uealim.id == exgalim.id*/}
                {/*                                }) ?*/}
                {/*                                    <Image*/}
                {/*                                        style={{ width: 32, height: 32 }}*/}
                {/*                                        source={require("../../../assets/icons/check.red.png")}*/}
                {/*                                    /> : <View style={{ width: 32, height: 32 }}>*/}
                {/*                                        <Text style={{ color: 'white' }}></Text>*/}
                {/*                                    </View>*/}
                {/*                            }*/}
                {/*                        </TouchableOpacity>*/}

                {/*                    )*/}
                {/*                })*/}
                {/*            }*/}
                {/*        </ScrollView>*/}
                {/*    </View>*/}
                {/*</Modal>*/}




                <Modal
                    visible={this.state.showEA}
                    animationType={"slide"}
                    onRequestClose={() => {
                        this.setState({showEA:false})
                    }
                    }
                    transparent={true}
                >
                    <TouchableOpacity
                        onPress={() => {
                            this.setState({showEA:false})
                        }}
                        style={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            width: screenWidth,
                            height: screenHeight,
                            zIndex: 0
                        }}
                    >
                    </TouchableOpacity>
                    <View style={{justifyContent:'flex-end',alignItems:'center',top:screenHeight-( screenWidth*0.5)}}>
                        <View style={{height: 33,width: screenWidth,
                            backgroundColor: '#FF3A28',
                            bottom: 0 }}>
                            <View style={{flexDirection:'row',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                paddingTop:7,
                                paddingHorizontal:20
                            }}>
                                <TouchableOpacity
                                    onPress={ async ()=>{
                                        await  this.setState({showEA:false})
                                    }}
                                >
                                    <Text style={{color:'white'}}>Annuler</Text>
                                </TouchableOpacity>
                                <Text style={{color:'white'}}></Text>
                                <TouchableOpacity
                                    onPress={()=>{
                                        this.setState({ showEA: false })
                                    }}
                                >
                                    <Text style={{color:'white'}}></Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <ScrollView
                            style={{height: screenWidth*0.5,backgroundColor:'white',width:'100%'}}
                            contentContainerStyle={{justifyContent:'center',alignItems:'center',paddingBottom:100}}
                        >
                            {
                                this.state.exg_alim.map((exgalim, index) => {
                                    return (
                                        <TouchableOpacity
                                            key={"someil" + index}
                                            style={{

                                                padding: 9,
                                                margin: 5,
                                                borderBottomColor: colors.grisbox,
                                                borderBottomWidth: 0.5,
                                                flexDirection: "row",
                                                alignItems: "center",
                                                width:'100%',
                                                justifyContent: "center"
                                            }}
                                            onPress={async () => {
                                                if (exgalim.name.toLowerCase() == "aucune") {
                                                    let newUEA = []
                                                    newUEA.push(exgalim)
                                                    this.setState({ userEA: newUEA })
                                                }
                                                else {
                                                    const isAucune = this.state.userEA.find(auc => {
                                                        return auc.name.toLowerCase() === "aucune"
                                                    });
                                                    console.log("isAucune", isAucune);
                                                    if (isAucune != undefined) {
                                                        for (let c = 0; c < this.state.userEA.length; c++) {
                                                            if (this.state.userEA[c].name.toLowerCase() === "aucune") {
                                                                const newUEA = this.state.userEA.splice(c, 1)
                                                                this.setState({ userEA: this.state.userEA })
                                                                break
                                                            }
                                                        }
                                                    }

                                                    console.warn(JSON.stringify(this.state.userEA))
                                                    const isInUEA = this.state.userEA.find(uealim => {
                                                        return uealim.id == exgalim.id
                                                    })
                                                    console.warn("isInUEA")
                                                    console.warn(isInUEA)
                                                    if (isInUEA == undefined) {
                                                        const newUEA = this.state.userEA.splice(0, 0, exgalim)
                                                        this.setState({ userEA: this.state.userEA })
                                                    }
                                                    else {

                                                        for (let c = 0; c < this.state.userEA.length; c++) {
                                                            if (exgalim.id === this.state.userEA[c].id) {
                                                                // this.setState({userEA: this.uea.splice(c, 1)})
                                                                const newUEA = this.state.userEA.splice(c, 1)
                                                                this.setState({ userEA: this.state.userEA })
                                                                break
                                                            }
                                                        }
                                                    }
                                                }
                                                this.setState({ showEA: false })
                                            }}
                                        >
                                            <Text>
                                                {
                                                    exgalim.name
                                                }
                                            </Text>

                                        </TouchableOpacity>

                                    )
                                })
                            }
                        </ScrollView>
                    </View>
                </Modal>

                <Modal
                    visible={this.state.isWritingSommeil}
                    animationType={"slide"}
                    onRequestClose={() => {
                        this.setState({isWritingSommeil:false})
                    }
                    }
                    transparent={true}
                >
                    <TouchableOpacity
                        onPress={() => {
                            this.setState({isWritingSommeil:false})
                        }}
                        style={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            width: screenWidth,
                            height: screenHeight,
                            zIndex: 0
                        }}
                    >
                    </TouchableOpacity>
                    <View style={{justifyContent:'flex-end',alignItems:'center',top:screenHeight-(screenWidth*0.5)}}>
                        <View style={{height: 33,width: screenWidth,
                            backgroundColor: '#FF3A28',
                            bottom: 0 }}>
                            <View style={{flexDirection:'row',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                paddingTop:7,
                                paddingHorizontal:20
                            }}>
                                <TouchableOpacity
                                    onPress={ async ()=>{
                                        await  this.setState({isWritingSommeil:false})
                                    }}
                                >
                                    <Text style={{color:'white'}}>Annuler</Text>
                                </TouchableOpacity>
                                <Text style={{color:'white'}}></Text>
                                <TouchableOpacity
                                    onPress={()=>{
                                        this.setState({ isWritingSommeil: false })
                                    }}
                                >
                                    <Text style={{color:'white'}}></Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <ScrollView
                            style={{height: screenWidth*0.5,backgroundColor:'white',width:'100%'}}
                            contentContainerStyle={{justifyContent:'center',alignItems:'center',paddingBottom:100}}
                        >
                            {
                                this.nbhsArray.map((item, index) => {
                                    return (
                                        <TouchableOpacity
                                            key={"someil" + index}
                                            style={{

                                                padding: 5,
                                                margin: 5,
                                                borderBottomColor: colors.grisbox,
                                                borderBottomWidth: 0.5,
                                                flexDirection: "row",
                                                alignItems: "center",
                                                width:'100%',
                                                justifyContent: "center"
                                            }}
                                            onPress={async () => {
                                                this.setState({ nbhsommeil: item.hor })
                                                this.setState({ isWritingSommeil: false })
                                            }}
                                        >
                                            <Text>
                                                {item.h} mn
                                            </Text>

                                        </TouchableOpacity>

                                    )
                                })
                            }
                        </ScrollView>
                    </View>
                </Modal>
                {/*<Slidebottom showModal={this.state.isWritingSommeil}*/}
                {/*             onRequestClose={()=>{*/}
                {/*                 this.setState({isWritingSommeil:false});*/}
                {/*             }}*/}
                {/*             callback={(item,index)=>{*/}
                {/*                 this.setState({ nbhsommeil: item.hor })*/}
                {/*                 this.setState({ isWritingSommeil: false })*/}
                {/*             }}*/}
                {/*             items={this.nbhsArray}*/}
                {/*             component_item={(item)=>{*/}
                {/*                 return(*/}
                {/*                     <Text style={{color:'#373535'}}>{item.h} mn</Text>*/}
                {/*                 )*/}
                {/*             }}*/}
                {/*/>*/}
            </LinearGradient>
        )
    }
}

// export default MyEnergy;
const mapStateToProps = (state) => {
    const { isFichePedag,userToken,activeTab ,activeTabMenu} = state.statedata
    return { isFichePedag ,userToken,activeTab,activeTabMenu}
};

export default connect(mapStateToProps)(MyEnergy);

