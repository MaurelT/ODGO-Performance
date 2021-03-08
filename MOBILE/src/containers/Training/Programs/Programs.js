import React, { Component } from 'react';
import {
    Dimensions,
    StatusBar,
    TouchableOpacity,
    ScrollView,
    View,
    Text
} from 'react-native';
import AutoHeightImage from 'react-native-auto-height-image';
import LinearGradient from 'react-native-linear-gradient';
import Swiper from 'react-native-swiper'
import colors from '../../../configs/colors';
import baseStyles from '../../../base/BaseStyles';
import styles from './styles';
import MAAButton from '../../../components/MAAButton/MAAButton';
import { connect } from 'react-redux';
import {SET_ACTIVE_TAB, SET_EXERCICE_TO_SHOW, SET_POP_TO_TOP, SET_ZONE} from '../../../redux/types/tabTypes';
import statusBarHeight from '../../../configs/screen';
import {getDashboar} from '../../../apis/FonctionRedondant';
import dashboardHelper from '../../../apis/helpers/dashboard_helper';


const screen = Dimensions.get('screen');
const SBHelight = statusBarHeight;
const screenWidth = screen.width
const screenHeight = screen.height - SBHelight


class Programs extends Component {
    swiper = []

    constructor(props) {
        super(props)
        this.state = {
            activeMenu: 1,
            selectedType: "",
            activeContent: "choice",
            listExercice: props.listExercice,
            popToTop:this.props.popToTop,
        }
    }
    selectType = async (type) => {
        await this.setState({ selectedType: type })
        await this.setState({ activeContent: "listing" })
    }
    // _isProgram = async () => {
    //     return (
    //     )
    // }
    render() {
        if(this.props.popToTop === 'train'){
            this.props.navigation.popToTop();
            const setPopToTop = { type: SET_POP_TO_TOP, value: 'train' }
            this.props.dispatch(setPopToTop);
        }

        return (
            <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }} colors={[colors.balck, colors.green, colors.balck]} style={baseStyles.linearGradient}>
                <ScrollView
                    contentInsetAdjustmentBehavior="automatic"
                    style={styles.scrollView}
                    contentContainerStyle={[styles.contentContainerStyle]}>

                    {/*<View style={{*/}
                    {/*    flexDirection: "row",*/}
                    {/*    width: screenWidth,*/}
                    {/*    alignItems: "center",*/}
                    {/*    justifyContent: "space-between",*/}
                    {/*    padding: 15,*/}
                    {/*    paddingLeft: 0,*/}
                    {/*    paddingRight: 0,*/}
                    {/*}}>*/}
                    {/*    <TouchableOpacity style={{*/}
                    {/*        width: 40, height: 40, alignItems: "center",*/}
                    {/*        justifyContent: "center"*/}
                    {/*    }}*/}
                    {/*        onPress={() => {*/}
                    {/*            if(this.props.navigation.goBack()){*/}

                    {/*            }else{*/}
                    {/*                const setActiveTabAction = { type: SET_ACTIVE_TAB, value: "entrainement" }*/}
                    {/*                this.props.dispatch(setActiveTabAction)*/}
                    {/*            }*/}
                    {/*        }}>*/}
                    {/*        <AutoHeightImage*/}
                    {/*            width={20}*/}
                    {/*            source={require("../../../assets/icons/arrow-white.png")}*/}
                    {/*            style={{*/}
                    {/*                transform: [*/}
                    {/*                    { rotateY: "180deg" }*/}
                    {/*                ]*/}
                    {/*            }} />*/}
                    {/*    </TouchableOpacity>*/}
                    {/*    <Text style={{*/}
                    {/*        color: colors.white,*/}
                    {/*        fontSize: 18*/}
                    {/*    }}>*/}
                    {/*        Vidéothèque*/}
                    {/*    </Text>*/}
                    {/*    <TouchableOpacity style={{*/}
                    {/*        width: 40, height: 40, alignItems: "center",*/}
                    {/*        justifyContent: "center", opacity: 0*/}
                    {/*    }}>*/}
                    {/*        <AutoHeightImage*/}
                    {/*            width={20}*/}
                    {/*            source={require("../../../assets/icons/arrow-white.png")}*/}
                    {/*            style={{*/}
                    {/*            }} />*/}
                    {/*    </TouchableOpacity>*/}
                    {/*</View>*/}
                    <View style={{ alignItems :"center",justifyContent:"center",width:"100%",marginTop:15  }}>
                        <TouchableOpacity
                            onPress={() => {
                                if(this.props.navigation.goBack()){

                                }else{
                                    const setActiveTabAction = { type: SET_ACTIVE_TAB, value: "entrainement" }
                                    this.props.dispatch(setActiveTabAction)
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
                            {"Vidéothèque"}
                        </Text>
                    </View>

                    <View style={[styles.btnCtn,{marginTop:30}]}>

                        <TouchableOpacity onPress={()=>{
                            // this.props.navigation.goBack()
                            this.props.navigation.navigate("Protocoles",{venudedashboard:false,id:null})
                        }}>
                            <View style={[styles.ctnMenu]}>
                                <Text style={[styles.btnMenuText]}>Mes protocoles</Text>
                                <AutoHeightImage
                                    width={screenWidth*0.03}
                                    source={require("../../../assets/icons/arrow-white.png")} />
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={()=>{
                            // this.props.navigation.navigate("Programs")
                            const setSelectedZone = { type: SET_ZONE, value: {id:0,text:"Ajouter une exercice"}}
                            this.props.dispatch(setSelectedZone)
                            this.props.navigation.navigate("VideoByZone")
                        }}>
                            <View style={[styles.ctnMenu]}>
                                <Text style={[styles.btnMenuText]} >Par zone</Text>
                                <AutoHeightImage
                                    width={screenWidth*0.03}
                                    source={require("../../../assets/icons/arrow-white.png")} />
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={()=>{
                            // this.props.navigation.navigate("Programs")
                            this.props.navigation.navigate("VideoByType")
                        }}>
                            <View style={[styles.ctnMenu,{marginBottom:50 }]}>
                                <Text style={[styles.btnMenuText]} >Par type</Text>
                                <AutoHeightImage
                                    width={screenWidth*0.03}
                                    source={require("../../../assets/icons/arrow-white.png")} />
                            </View>
                        </TouchableOpacity>

                    </View>

                </ScrollView>
            </LinearGradient>
        )
    }
}

// export default Training;

//                     <View style={[styles.headCtn]}>

//                         <TouchableOpacity
//                             style={[styles.headMenu]}
//                             onPress={() => {
//                                 this.setState({ activeMenu: 1 })
//                             }}>
//                             <View >
//                                 <Text style={[styles.menuText]}>Vidéothèque</Text>
//                             </View>
//                             <View style={[(this.state.activeMenu == 1 ? styles.activeMenu : styles.inactiveMenu)]}></View>
//                         </TouchableOpacity>

//                         <TouchableOpacity
//                             style={[styles.headMenu]}
//                             onPress={() => {
//                                 this.setState({ activeMenu: 2 })
//                             }}>
//                             <View >
//                                 <Text style={[styles.menuText]}>Mes programmes</Text>
//                             </View>
//                             <View style={[(this.state.activeMenu == 2 ? styles.activeMenu : styles.inactiveMenu)]}></View>
//                         </TouchableOpacity>

//                     </View>

//                     {
//                         this.state.activeMenu == 1 ?
//                             <View style={[styles.videoBtnCtn]}>
//                                 <MAAButton text={"Par zone"}
//                                     onPress={() => {
//                                         this.props.navigation.navigate("VideoByZone")
//                                     }}
//                                     width={(screenWidth - 60) / 2} />
//                                 <MAAButton text={"Par type"}
//                                     onPress={() => {
//                                         this.props.navigation.navigate("VideoByType")
//                                     }}
//                                     width={(screenWidth - 60) / 2} />
//                             </View> : null
//                     }

//                     {
//                         this.state.activeMenu == 2 ?

//                                 <ScrollView
//                                     style={styles.scrollView}
//                                     contentContainerStyle={[styles.contentContainerStyle]}
//                                     keyboardShouldPersistTaps={'always'}
//                                 >
//                                     <View style={[styles.headerCtn]}>

//                                         <TouchableOpacity style={[styles.noSelectedBtn, { width: 60 }]}
//                                             onPress={() => {
//                                                 console.log("Changing Zone")
//                                                 this.props.navigation.goBack()
//                                             }}>
//                                             <AutoHeightImage
//                                                 width={18}
//                                                 source={require("../../../assets/icons/arrow-white.png")}
//                                                 style={{
//                                                     transform: [
//                                                         { rotateY: "180deg" }
//                                                     ]
//                                                 }} />
//                                         </TouchableOpacity>

//                                         <TouchableOpacity style={[styles.noSelectedBtn]}
//                                             onPress={async () => {
//                                                 console.log("Chenging Zone")
//                                                 await this.setState({ selectedType: "" })
//                                                 await this.setState({ activeContent: "choice" })
//                                             }}>
//                                             <View style={[styles.headCtn]}>
//                                                 <Text style={[baseStyles.titleText]}>
//                                                     {this.state.selectedType == "" ? "Mes Programmes" : this.state.selectedType}
//                                                 </Text>
//                                             </View>
//                                         </TouchableOpacity>

//                                         <View style={{ width: 60 }}>
//                                             <Text style={{ color: colors.balck + "00" }}>...</Text>
//                                         </View>

//                                     </View>

//                                     {
//                                         this.state.activeContent == "choice" ?
//                                             <View style={{ width: screenWidth, alignItems: "center", paddingTop: 30 }}>

//                                                 <TouchableOpacity style={[styles.typeBtn]}
//                                                     onPress={() => {
//                                                         this.selectType("ÉCHAUFFEMENT")
//                                                     }}>
//                                                     <View style={[styles.btnView]}>
//                                                         <Text style={[baseStyles.textColorWhite]}>ÉCHAUFFEMENT</Text>
//                                                         <AutoHeightImage
//                                                             width={18}
//                                                             source={require("../../../assets/icons/arrow-white.png")}
//                                                         />
//                                                     </View>
//                                                 </TouchableOpacity>

//                                                 <TouchableOpacity style={[styles.typeBtn]}
//                                                     onPress={() => {
//                                                         this.selectType("RÉCUPÉRATION")
//                                                     }}>
//                                                     <View style={[styles.btnView]}>
//                                                         <Text style={[baseStyles.textColorWhite]}>RÉCUPÉRATION</Text>
//                                                         <AutoHeightImage
//                                                             width={18}
//                                                             source={require("../../../assets/icons/arrow-white.png")}
//                                                         />
//                                                     </View>
//                                                 </TouchableOpacity>

//                                                 <TouchableOpacity style={[styles.typeBtn]}
//                                                     onPress={() => {
//                                                         this.selectType("SÉANCE")
//                                                     }}>
//                                                     <View style={[styles.btnView]}>
//                                                         <Text style={[baseStyles.textColorWhite]}>SÉANCE</Text>
//                                                         <AutoHeightImage
//                                                             width={18}
//                                                             source={require("../../../assets/icons/arrow-white.png")}
//                                                         />
//                                                     </View>
//                                                 </TouchableOpacity>

//                                                 <TouchableOpacity style={[styles.typeBtn]}
//                                                     onPress={() => {
//                                                         this.selectType("RÉHABILITATION")
//                                                     }}>
//                                                     <View style={[styles.btnView]}>
//                                                         <Text style={[baseStyles.textColorWhite]}>RÉHABILITATION</Text>
//                                                         <AutoHeightImage
//                                                             width={18}
//                                                             source={require("../../../assets/icons/arrow-white.png")}
//                                                         />
//                                                     </View>
//                                                 </TouchableOpacity>

//                                             </View>
//                                             : null
//                                     }


//                                     {this.state.activeContent == "listing" ?

//                                         <View style={{ alignItems: "center", width: screenWidth }}>

//                                             {
//                                                 this.props.listExercice.map((value, index) => {
//                                                     return (
//                                                         <TouchableOpacity key={"ExItem" + index}
//                                                             onPress={() => {
//                                                                 const setExToShow = { type: SET_EXERCICE_TO_SHOW, value: value }
//                                                                 this.props.dispatch(setExToShow)
//                                                                 this.props.navigation.navigate("SingleExercice")
//                                                             }}
//                                                         >
//                                                             <View style={[styles.videoItemCtn, (index == (this.state.listExercice.length - 1) ? styles.videoItemCtnLast : {})]}>
//                                                                 <AutoHeightImage
//                                                                     width={50}
//                                                                     source={require("../../../assets/images/attelle.genou.jpg")}
//                                                                     style={{
//                                                                         minHeight: 50,
//                                                                         maxHeight: 50,
//                                                                         height: 50,
//                                                                         borderRadius: 50,
//                                                                         marginRight: 10
//                                                                     }} />
//                                                                 <Text style={[baseStyles.textColorWhite, { marginRight: 10 }]}>{value.title}</Text>

//                                                                 <AutoHeightImage
//                                                                     width={14}
//                                                                     source={require("../../../assets/icons/arrow-white.png")}
//                                                                     style={[styles.arrowRightIcon]} />
//                                                             </View>
//                                                         </TouchableOpacity>
//                                                     )
//                                                 })
//                                             }

//                                         </View> : null
//                                     }

//                                 </ScrollView>:null
//                     }


//                 </ScrollView>
//             </LinearGradient>
//         )
//     }
// }

// export default Programs;
const mapStateToProps = (state) => {
    const {  listExercice,popToTop } = state.statedata
    return {  listExercice,popToTop }
};

export default connect(mapStateToProps)(Programs);
