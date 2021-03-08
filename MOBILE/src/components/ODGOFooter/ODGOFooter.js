import React, { Component, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  Easing,
  Dimensions,
  StatusBar,
  Modal
} from 'react-native';

import AutoHeightImage from 'react-native-auto-height-image';
import styles from './styles';
import colors from '../../configs/colors';
import { StackActions } from 'react-navigation';
import {SET_ACTIVE_FP} from "../../redux/types/tabTypes";
import statusBarHeight from '../../configs/screen';
import phoneType from '../../configs/typePhone';
import {getDashboar} from '../../apis/FonctionRedondant';
import dashboardHelper from '../../apis/helpers/dashboard_helper';
import LinearGradient from "react-native-linear-gradient";

const screen = Dimensions.get("window");
const window = Dimensions.get("window");
const SBHelight = statusBarHeight;
const screenWidth = screen.width
const screenHeight = screen.height - SBHelight

const constanwith = 357;
class ODGOFooter extends Component {

  rotate = new Animated.Value(0)
  rotate1 = new Animated.Value(0)
  left = new Animated.Value(0)
  center = new Animated.Value(0)
  right = new Animated.Value(0)

  constructor(props) {
    super(props)
    this.state = {
      test: false,
      testModal: false,
      transformRotate: 0
    }
  }

  animateBtnAdd = () => {

    if (this.state.testModal == false) {
      this.setState({ testModal: !this.state.testModal })

      this.rotate.setValue(0)
      Animated.timing(
        this.rotate,
        {
          toValue: 0,
          duration: 600,
          // bounciness: 30,
          easing: Easing.linear
        }
      ).start(() => { })

      this.center.setValue(0);
      Animated.timing(
        this.center,
        {
          toValue: 1,
          duration: 650,
          bounciness: 30,
          easing: Easing.linear
        }
      ).start(() => { });

      this.left.setValue(0)
      Animated.timing(
        this.left,
        {
          toValue: 1,
          duration: 650,
          bounciness: 30,
          easing: Easing.linear
        }
      ).start(() => { })
    }
    else {

      this.rotate.setValue(0)
      Animated.timing(
        this.rotate,
        {
          toValue: 0,
          duration: 600,
           bounciness: 30,
          easing: Easing.linear
        }
      ).start(() => { })

      this.center.setValue(1)
      Animated.timing(
        this.center,
        {
          toValue: 0,
          duration: 650,
          bounciness: 30,
          easing: Easing.linear
        }
      ).start(() => { })

      this.left.setValue(1)
      Animated.timing(
        this.left,
        {
          toValue: 0,
          duration: 650,
          bounciness: 30,
          easing: Easing.linear
        }
      ).start(() => { })
      setTimeout(() => {
        this.setState({ testModal: !this.state.testModal })

      }, 650);
    }

  }

  render() {


    let isrestrictget_videotheque = false;
    if(this.props.droits.length>0){
      for(let i = 0; i < this.props.droits.length; i++){
        if(this.props.droits[i].name === "get_videotheque"){
          isrestrictget_videotheque = this.props.droits[i].is_restrict;
          break;
        }
      }
    }

    const rotateZToClose = this.rotate.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '-45deg']
    })

    const rotateZToOpen = this.rotate.interpolate({
      inputRange: [0, 1],
      outputRange: ['-45deg', '0deg']
    })

    const animateCenterToTop = this.center.interpolate({
      inputRange: [0, 1],
      outputRange: [0, -120]
    })

    const animateCenterToBottom = this.center.interpolate({
      inputRange: [0, 1],
      outputRange: [-120, 0]
    });

    // Animate the left button
    const animateLeftToTop = this.left.interpolate({
      inputRange: [0, 1],
      outputRange: [30, 135]
    })

    const animateLeftToBottom = this.center.interpolate({
      inputRange: [0, 1],
      outputRange: [120, 0]
    })

    const animateLeftToLeft = this.left.interpolate({
      inputRange: [0, 1],
      outputRange: [(screenWidth / 2)-20, (screenWidth / 2) - 55]
    })

    const animateLeftToCenter = this.center.interpolate({
      inputRange: [0, 1],
      outputRange: [(screenWidth / 2), (screenWidth / 2)]
    })

    // Animate the right button
    const animateRightToTop = this.left.interpolate({
      inputRange: [0, 1],
      outputRange: [25, 135]
    })

    const animateRightToBottom = this.center.interpolate({
      inputRange: [0, 1],
      outputRange: [120, 25]
    })

    const animateRightToRight = this.left.interpolate({
      inputRange: [0, 1],
      outputRange: [(screenWidth / 2)-20, (screenWidth / 2) - 55]
    })

    const animateRightToCenter = this.center.interpolate({
      inputRange: [0, 1],
      outputRange: [(screenWidth / 2) - 70, (screenWidth / 2)]
    })

    // les autres boutons à insérer
    // right Training
    const animateRightToCenterTraining = this.left.interpolate({
      inputRange: [0, 1],
      outputRange: [(screenWidth / 2) , (screenWidth / 2)]
    })
    const animateRightToTopTraining = this.left.interpolate({
      inputRange: [0, 1],
      outputRange: [25, 85]
    })
    const animateRightToBottomTraining = this.center.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 0]
    })
    const animateRightToRightTraining = this.left.interpolate({
      inputRange: [0, 1],
      outputRange: [(screenWidth / 2)-20, (screenWidth / 2) - 100]
    })
    // left Resultat
    const animateLeftToTopResult = this.left.interpolate({
      inputRange: [0, 1],
      outputRange: [25, 85]
    })

    const animateLeftToBottomResult = this.center.interpolate({
      inputRange: [0, 1],
      outputRange: [70, 0]
    })

    const animateLeftToLeftResult = this.left.interpolate({
      inputRange: [0, 1],
      outputRange: [(screenWidth / 2)-20, (screenWidth / 2) - 100]
    })

    const animateLeftToCenterResult = this.center.interpolate({
      inputRange: [0, 1],
      outputRange: [(screenWidth / 2) , (screenWidth / 2)]
    })

    return (
      <View style={{}}>
        {this.props.activeTab == "deco" ?
          <View></View> : <View style={{}}>

            <Modal
              visible={this.state.testModal}
              style={{ height: "100%" }}
              onRequestClose={() => {
                this.setState({ testModal: false })
              }}
              transparent={true}
            >


              <Animated.View style={{ height: "100%", backgroundColor: "rgba(0,0,0,0.65)", zIndex: 999, }}>
                {/* Cup Module */}
                <Animated.View style={{
                  zIndex: 999,
                  alignItems: "center", justifyContent: "center",
                  width: 45, height: 45, backgroundColor: colors.red,
                  borderRadius: 45,
                  position: 'absolute',
                  bottom: (this.state.testModal ? animateLeftToTopResult : animateLeftToBottomResult),
                  left: (this.state.testModal ? animateLeftToLeftResult : animateLeftToCenterResult),
                }}>
                    <TouchableOpacity
                      onPress={() => {
                        this.props.onClickAddCompteurNutritionnel()
                        const test = this.state.test
                        this.animateBtnAdd()
                        const setActiveFPAction = { type: SET_ACTIVE_FP, value: -1 }
                        this.props.dispatch(setActiveFPAction)
                      }}
                      style={{ zIndex: 999, alignSelf: "center", alignItems: "center", justifyContent: "center" }}>
                      <AutoHeightImage
                        width={26}
                        source={require("../../assets/icons/food.stat.white.png")} />
                    </TouchableOpacity>
                </Animated.View>
                {/* Sleep Module */}
                <Animated.View style={{
                  zIndex: 999,
                  alignItems: "center", justifyContent: "center",
                  width: 45, height: 45, backgroundColor:!isrestrictget_videotheque ? colors.red : colors.grisee,
                  borderRadius: 45,
                  position: 'absolute',
                  bottom: (this.state.testModal ? animateLeftToTop : animateLeftToBottom),
                  left: (this.state.testModal ? animateLeftToLeft : animateLeftToCenter),
                }}>
                  <TouchableOpacity
                    onPress={() => {
                      if(!isrestrictget_videotheque){
                        this.props.onClickAddMamobilite(this.props.navigation)
                        const test = this.state.test
                        this.animateBtnAdd()
                        const setActiveFPAction = { type: SET_ACTIVE_FP, value: -1 }
                        this.props.dispatch(setActiveFPAction)
                      }
                    }}
                    style={{ zIndex: 999, alignSelf: "center", alignItems: "center", justifyContent: "center" }}>
                    <AutoHeightImage
                      width={15}
                      style={{tintColor:!isrestrictget_videotheque ?"white":colors.textgrisee, marginBottom:2,marginLeft:4}}
                      source={require("../../assets/icons/music-player-black.png")} />
                  </TouchableOpacity>
                </Animated.View>
                {/* Food Module */}
                {/*<Animated.View style={{*/}
                {/*  zIndex: 999,*/}
                {/*  alignItems: "center", justifyContent: "center",*/}
                {/*  width: 40, height: 40, backgroundColor: colors.red,*/}
                {/*  borderRadius: 20,*/}
                {/*  position: 'absolute', bottom: 25, left: (screenWidth / 2) - 20,*/}
                {/*  padding: 10,*/}
                {/*  transform: [{*/}
                {/*    translateY: (this.state.testModal ? animateCenterToTop : animateCenterToBottom),*/}
                {/*  }*/}
                {/*  ],*/}
                {/*}}>*/}
                {/*  <TouchableOpacity*/}
                {/*    onPress={() => {*/}
                {/*      this.props.onClickAddCompteurNutritionnel()*/}
                {/*      const test = this.state.test*/}
                {/*      this.animateBtnAdd()*/}
                {/*      const setActiveFPAction = { type: SET_ACTIVE_FP, value: -1 }*/}
                {/*      this.props.dispatch(setActiveFPAction)*/}
                {/*    }}*/}
                {/*    style={{ zIndex: 999, alignSelf: "center", alignItems: "center", justifyContent: "center" }}>*/}
                {/*    <AutoHeightImage*/}
                {/*      width={21}*/}
                {/*      source={require("../../assets/icons/food.stat.white.png")} />*/}
                {/*  </TouchableOpacity>*/}

                {/*</Animated.View>*/}
                {/* Hydratation Module */}
                <Animated.View style={{
                  zIndex: 999,
                  alignItems: "center", justifyContent: "center",
                  width: 45, height: 45, backgroundColor: colors.red,
                  borderRadius: 45,
                  position: 'absolute',
                  bottom: (this.state.testModal ? animateRightToTop : animateRightToBottom),
                  right: (this.state.testModal ? animateRightToRight : animateRightToCenter),
                  padding: 10,
                }}>
                  <TouchableOpacity
                      onPress={() => {
                        this.props.onClickAddTraining()
                        const test = this.state.test
                        this.animateBtnAdd()
                        const setActiveFPAction = { type: SET_ACTIVE_FP, value: -1 }
                        this.props.dispatch(setActiveFPAction)
                      }}
                      style={{ zIndex: 999, alignSelf: "center", alignItems: "center", justifyContent: "center" }}>
                    <AutoHeightImage
                        width={30}
                        source={require("../../assets/icons/train.white.png")} />
                  </TouchableOpacity>
                  {/*<TouchableOpacity*/}
                  {/*  onPress={() => {*/}
                  {/*    this.props.onClickAddHydratation()*/}
                  {/*    const test = this.state.test*/}
                  {/*    this.animateBtnAdd()*/}
                  {/*    const setActiveFPAction = { type: SET_ACTIVE_FP, value: -1 }*/}
                  {/*    this.props.dispatch(setActiveFPAction)*/}
                  {/*  }}*/}
                  {/*  style={{ zIndex: 999, alignSelf: "center", alignItems: "center", justifyContent: "center" }}>*/}
                  {/*  <AutoHeightImage*/}
                  {/*    width={21}*/}
                  {/*    source={require("../../assets/icons/water.stat.white.png")} />*/}
                  {/*</TouchableOpacity>*/}
                </Animated.View>
                {/* bouton entrainement a inserer */}
                <Animated.View style={{
                  zIndex: 999,
                  alignItems: "center", justifyContent: "center",
                  width: 45, height: 45, backgroundColor: colors.red,
                  borderRadius: 45,
                  position: 'absolute',
                  bottom: (this.state.testModal ? animateRightToTopTraining : animateRightToBottomTraining),
                  right: (this.state.testModal ? animateRightToRightTraining : animateRightToCenterTraining),
                  padding: 10,
                }}>
                  <TouchableOpacity
                      onPress={() => {
                        this.props.onClickAddCompetition();
                        const test = this.state.test;
                        this.animateBtnAdd();
                        const setActiveFPAction = { type: SET_ACTIVE_FP, value: -1 };
                        this.props.dispatch(setActiveFPAction)
                      }}
                      style={{ zIndex: 999, alignSelf: "center", alignItems: "center", justifyContent: "center" }}>
                    <AutoHeightImage
                        width={21}
                        source={require("../../assets/icons/Cup.png")} />
                  </TouchableOpacity>
                </Animated.View>
                <TouchableOpacity
                    onPress={() => {
                      this.setState({ testModal: false })
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
                <TouchableOpacity
                    onPress={() => {
                      const test = this.state.test
                      this.animateBtnAdd()
                    }}
                    style={[{
                      backgroundColor: "#FFFFFF00", alignItems: "center", justifyContent: "center",
                    }]}
                >
                <Animated.View style={{
                  width: 70, height: 70, backgroundColor: colors.red,
                  borderColor: colors.balck, borderWidth: 5, borderRadius: 35,
                  alignItems: "center", justifyContent: "center",
                  position: "absolute", left: (screenWidth / 2) - 35, bottom: 15,
                  transform: [{
                    rotateZ: (this.state.testModal ? rotateZToOpen : rotateZToClose),
                  }],
                }}>
                    <AutoHeightImage
                      width={25}
                      source={require("../../assets/icons/add.white.png")} />
                </Animated.View>
              </TouchableOpacity>
              </Animated.View>
            </Modal>
            <View style={[styles.footerCtn,{maxHeight:phoneType === 'iphoneX'?80:50,minHeight:phoneType === 'iphoneX'?80:50,paddingBottom:phoneType === 'iphoneX'? 35 :Platform.OS === 'ios'? 9 :7}]}>
              <TouchableOpacity
                onPress={() => {
                  getDashboar(dashboardHelper,this.props).then(()=>{})
                  this.props.onClickHomeTab();
                  const setActiveFPAction = { type: SET_ACTIVE_FP, value: -1 }
                  this.props.dispatch(setActiveFPAction)
                }}
                // style={[styles.tabElem,{marginTop:0.5,alignSelf:'center',alignItems:'center',justifyContent:'center'}]}>
                style={{alignSelf:'center',alignItems:'center',justifyContent:'flex-end',
                  width: (screenWidth / 5)-7,height:'100%'}}>
                <AutoHeightImage
                  width={20}
                  style={{marginBottom:2}}
                  source={
                    this.props.activeTab == "home" ?
                      require("../../assets/icons/maisonRouge.png") :
                      require("../../assets/icons/maisonBlanc.png")} />
                <Text style={this.props.activeTab == "home" ? {color: colors.red,
                  fontSize:screenWidth <= constanwith ? 7 : 9} : { color: colors.white,
                  fontSize: screenWidth <= constanwith ? 7 : 9}}>ACCUEIL</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  this.props.onClickTrainTab()
                  console.warn(this.props.activeTab)
                  const setActiveFPAction = { type: SET_ACTIVE_FP, value: -1 }
                  this.props.dispatch(setActiveFPAction)
                }}
                style={{alignSelf:'center',alignItems:'center',justifyContent:'flex-end',
                  width: (screenWidth / 5)+7,height:'100%'}}>
                <AutoHeightImage
                  width={24}
                  style={{marginBottom:2}}
                  source={
                    this.props.activeTab == "train" ?
                      require("../../assets/icons/poidsRouge.png") :
                      require("../../assets/icons/poidsBlanc.png")} />
                <Text style={this.props.activeTab == "train" ? {color: colors.red,
                  fontSize:screenWidth <= constanwith ? 7 : 9} : { color: colors.white,
                  fontSize: screenWidth <= constanwith ? 7 : 9}}>ENTRAÎNEMENT</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  // this.props.onClickAdd()
                  const test = this.state.test
                  this.animateBtnAdd()
                }}
                style={[{
                  backgroundColor: "#FFFFFF00", alignItems: "center", justifyContent: "center",
                  marginTop: -51
                }]}
              >
                <Animated.View style={{
                  width: 70, height: 70, backgroundColor: colors.red,
                  borderColor: colors.balck, borderWidth: 5, borderRadius: 35,
                  alignItems: "center", justifyContent: "center",
                  transform: [{
                    rotateZ: (this.state.testModal ? rotateZToOpen : rotateZToClose),
                  }],
                }}>
                  <AutoHeightImage
                    width={25}
                    source={require("../../assets/icons/add.white.png")} />
                </Animated.View>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  console.log("Sante clicked")
                  this.props.onClickSanteTab()
                  const setActiveFPAction = { type: SET_ACTIVE_FP, value: -1 }
                  this.props.dispatch(setActiveFPAction)
                }}
                style={{alignSelf:'center',alignItems:'center',justifyContent:'flex-end',
                  width: (screenWidth / 5)-9,height:'100%'}}>
                <AutoHeightImage
                  width={20}
                  style={{marginBottom:2}}
                  source={
                    this.props.activeTab == "sante" ?
                      require("../../assets/icons/santeRouge.png") :
                      require("../../assets/icons/santeBlanc.png")} />
                <Text style={this.props.activeTab == "sante" ? {color: colors.red,
                  fontSize:screenWidth <= constanwith ? 7 : 9} : { color: colors.white,
                  fontSize: screenWidth <= constanwith ? 7 : 9}}>SANTÉ</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  this.props.onClickPerfoTab()
                  const setActiveFPAction = { type: SET_ACTIVE_FP, value: -1 }
                  this.props.dispatch(setActiveFPAction)
                }}
                style={{alignSelf:'center',alignItems:'center',justifyContent:'flex-end',
                  width: (screenWidth / 5)+9,height:'100%'}}>
                <AutoHeightImage
                  width={20}
                  style={{marginBottom:2}}
                  source={
                    this.props.activeTab == "perfo" ?
                      require("../../assets/icons/performanceRouge.png") :
                      require("../../assets/icons/performanceBlanc.png")} />
                <Text style={this.props.activeTab == "perfo" ? {color: colors.red,
                  fontSize:screenWidth <= constanwith ? 7 : 9} : { color: colors.white,
                  fontSize: screenWidth <= constanwith ? 7 : 9}}>PERFORMANCE</Text>
              </TouchableOpacity>
            </View>

          </View>
        }
      </View>

    )
  }
}

// export default ODGOFooter;
const mapStateToProps = (state) => {
  const { activeTab,userToken,droits} = state.statedata
  return { activeTab,userToken,droits }
};

export default connect(mapStateToProps)(ODGOFooter);
