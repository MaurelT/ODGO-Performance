import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    Dimensions,
    StatusBar,
    ScrollView,
    View,
    TouchableOpacity,
    Text, Modal
} from 'react-native';
import Swiper from 'react-native-web-swiper';
import colors from '../../../../configs/colors'
import baseStyles from '../../../../base/BaseStyles';
import LinearGradient from 'react-native-linear-gradient';
import styles from './styles';
import AutoHeightImage from 'react-native-auto-height-image';
import ScrollPicker from 'react-native-wheel-scroll-picker';
import statusBarHeight from '../../../../configs/screen';
const screen = Dimensions.get("window");
const SBHelight = statusBarHeight;
const screenWidth = screen.width
const screenHeight = screen.height - SBHelight

class Evenement extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showModalHour1:false,
            showModalHour2:false,
            showModalMinute1:false,
            showModalMinute2:false,
            hours:[1,2,3,4,5,6,7,8,9,10,11,12],
            // minutess:['01','02','03','04','05','06','07','08','09','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24','25','26','27','28','29','30','31','32','33','34','35','36','37','38','39','40','41','42','43','44','45','46','47','48','49','50','51','52','53','54','55','56','57','58','59','60'],
            minutess:[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59],

        };

    }


    render() {
        console.warn(this.props.jourMatinOuSoir)
        return (
           <View style={styles.panelEvent}>
            <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }} colors={[colors.balck, colors.green, colors.balck]} style={styles.linearGradient}>
                {/*<TouchableOpacity*/}
                {/*    onPress={()=>{this.props._hidePickerhour()}}*/}
                {/*    style={{*/}
                {/*        position: "absolute",*/}
                {/*        top: 0,*/}
                {/*        left: 0,*/}
                {/*        width: screenWidth,*/}
                {/*        height: screenHeight,*/}
                {/*        zIndex: 0*/}
                {/*    }}*/}
                {/*>*/}
                {/*</TouchableOpacity>*/}
                <View
                    style={[styles.contentContainerStyle]}>
                    <View style={[styles.headerCtn]}>
                        <Text style={[baseStyles.titleText]}>
                            {/*{"Lundi matin"}*/}
                            {this.props.jourMatinOuSoir}
                        </Text>
                        <View style={{backgroundColor:this.props.backcolordraggedItem,borderRadius:screenHeight*0.01,
                            alignItems:"center",
                            justifyContent:"center", marginTop:screenHeight*0.02,paddingVertical:5,
                            marginBottom:screenHeight*0.05,paddingHorizontal:10}} >
                            <Text style={styles.textbtnActivitesProgram}>{this.props.training}</Text>
                        </View>
                    </View>
                        <View style={styles.bodyEvent}>
                        <Text style={styles.textSelectHoraire}>Sélectionner l'horaire de l'activité</Text>
                        <View style={styles.panelHeure}>
                            <View style={[styles.contentHMn,{marginTop:-screenWidth*0.05}]}>
                                <Swiper
                                    onIndexChanged={(payload)=>{
                                        this.props.onchangehour1(payload)
                                    }}
                                    ref={"swiperRefHour1"}
                                    vertical={true}
                                    pagingEnabled={true}
                                    automaticallyAdjustContentInsets={true}
                                    // removeClippedSubviews={true}
                                    loop={true}
                                    controlsEnabled={true}
                                    springConfig={{ speed: 11 }}
                                    controlsProps={{
                                        prevPos:true,
                                        nextPos:true,
                                        prevTitle:'',
                                        nextTitle:'',
                                        dotsPos:true,
                                        dotsTouchable:true,
                                    }}
                                    gesturesEnabled={true}


                                    containerStyle={styles.contentHMn}>
                                     {
                                         this.props.heures.map((item,index)=>
                                         {
                                                return (
                                                 <TouchableOpacity onPress={()=>{
                                                     this.setState({showModalHour1:true})

                                                 }} style={styles.panelHMn} >
                                                    <Text style={styles.heureMn}>{item.value}</Text>
                                                 </TouchableOpacity>)
                                         })
                                     }
                                </Swiper>
                                <ScrollPicker
                                    dataSource={this.props.heures}
                                    selectedIndex={1}
                                    renderItem={(data, index, isSelected) => {
                                        //
                                    }}
                                    onValueChange={(data, selectedIndex) => {
                                        //
                                        this.props.onchangehour1(data);
                                        console.warn('data new evenement slider',data)
                                    }}
                                    wrapperHeight={180}
                                    wrapperWidth={screenWidth}
                                    wrapperBackground={'#e6e6e6'}
                                    itemHeight={60}
                                    highlightColor={'#d8d8d8'}
                                    highlightBorderWidth={2}
                                    activeItemColor={'#222121'}
                                    itemColor={'#B4B4B4'}
                                />
                            </View>
                            <Text style={[styles.heureMnSeparateur,{marginTop:-screenWidth*0.05}]} >:</Text>
                            <View style={[styles.contentHMn,{marginTop:-screenWidth*0.05}]}>
                            <Swiper

                                        ref={"showModalMinute1"}
                                        onIndexChanged={(payload)=>{
                                            this.props.onchangeminute1(payload)
                                            // console.warn('payload ',payload)
                                        }}
                                        vertical={true}
                                        loop={true}
                                        springConfig={{ speed: 11 }}
                                        controlsProps={{
                                            prevPos:false,
                                            nextPos:false,
                                            prevTitle:'',
                                            nextTitle:'',
                                            dotsPos:false,
                                        }}
                                        gesturesEnabled={true}
                                        containerStyle={styles.contentHMn}>
                                        {
                                            this.props.minutes.map((item,index)=>
                                            {
                                                    return (
                                                    <TouchableOpacity
                                                        onPress={()=>{
                                                            this.setState({showModalMinute1:true})

                                                        }}
                                                        style={styles.panelHMn} >
                                                        <Text style={styles.heureMn}>{item.value}</Text>
                                                        {/*<Text style={styles.heureMn}>{index}</Text>*/}
                                                    </TouchableOpacity>
                                                    )
                                            })
                                        }
                                    </Swiper>
                            </View>
                        </View>
                            <View style={{marginTop:-18, width:'100%',left:-3}}>
                                <Text style={{fontSize:48,color:colors.white
                                }}>à</Text></View>
                        <View  style={[styles.panelHeure,{marginTop:-screenWidth*0.04}]}>
                            <View style={styles.contentHMn}>
                            <Swiper

                                onIndexChanged={(payload)=>{
                                    this.props.onchangehour2(payload)
                                }}
                                ref={"swiperRefHour2"}

                                vertical={true}
                                    loop={true}
                                    springConfig={{ speed: 11 }}
                                    controlsProps={{
                                        prevPos:false,
                                        nextPos:false,
                                        prevTitle:'',
                                        nextTitle:'',
                                        dotsPos:false,
                                    }}
                                    gesturesEnabled={true}
                                    containerStyle={styles.contentHMn}>
                                     {
                                         this.props.heures.map((item,index)=>
                                         {
                                                return (
                                                 <TouchableOpacity
                                                     onPress={()=>{
                                                         this.setState({showModalHour2:true})

                                                     }}
                                                     style={styles.panelHMn} >
                                                    <Text style={styles.heureMn}>{item.value}</Text>
                                                </TouchableOpacity>)
                                         })
                                     }
                                </Swiper>
                            </View >
                            <Text style={styles.heureMnSeparateur}>:</Text>
                            <View style={styles.contentHMn}>
                                <Swiper
                                        ref={'showModalMinute2'}
                                        onIndexChanged={(payload)=>{
                                            this.props.onchangeminute2(payload)
                                        }}
                                        vertical={true}
                                        loop={true}
                                        springConfig={{ speed: 11 }}
                                        controlsProps={{
                                            prevPos:false,
                                            nextPos:false,
                                            prevTitle:'',
                                            nextTitle:'',
                                            dotsPos:false,
                                        }}
                                        gesturesEnabled={true}
                                        containerStyle={styles.contentHMn}>
                                        {
                                            this.props.minutes.map((item,index)=>
                                            {
                                                    return (
                                                    <TouchableOpacity
                                                        onPress={()=>{
                                                            this.setState({showModalMinute2:true})

                                                        }}
                                                        style={styles.panelHMn} >
                                                        <Text style={styles.heureMn}>{item.value}</Text>
                                                    </TouchableOpacity>)
                                            })
                                        }
                                    </Swiper>
                            </View>
                        </View>
                        <TouchableOpacity style={styles.btnValider}  onPress={()=>{this.props._initaddEventActivity()}}>
                            <Text style={styles.textbtnValider}>VALIDER</Text>
                        </TouchableOpacity>

                        {/*<TouchableOpacity style={[styles.btnValider,{marginBottom:50}]}  onPress={()=>{this.props._hidePickerhour()}}>*/}
                        {/*    <Text style={styles.textbtnValider}>ANNULER</Text>*/}
                        {/*</TouchableOpacity>*/}
                        </View>

                </View>
                <Modal
                    visible={this.state.showModalHour1}
                    onRequestClose={() => {
                        this.setState({ showModalHour1: false })
                    }}
                    transparent={true}

                ><TouchableOpacity
                    onPress={() => {
                        this.setState({ showModalHour1: false })
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
                    <View style={{
                        marginTop: 90,
                        paddingTop:10,
                        paddingBottom:10,
                        borderRadius: 5,
                        alignSelf: "center",
                        // maxHeight: screenHeight - 150,
                        height: 340,
                        // transform: [{ translateY: (screenHeight / 2)}],
                            backgroundColor: colors.white,
                    }}>
                        <ScrollView>
                            {
                                this.state.hours.map((item, index) => {
                                    return (
                                        <TouchableOpacity
                                            onPress={()=> {
                                                this.refs.swiperRefHour1.goTo(item-1);
                                                this.setState({hourselectionne:item,showModalHour1:false})
                                            }}
                                            style={styles.anneePicker}>
                                            <Text style={{color:'white'}}>{item} h</Text>
                                        </TouchableOpacity>
                                    );
                                })

                            }

                        </ScrollView>
                    </View>
                </Modal>
                <Modal
                    visible={this.state.showModalMinute1}
                    onRequestClose={() => {
                        this.setState({ showModalMinute1: false })
                    }}
                    transparent={true}

                ><TouchableOpacity
                    onPress={() => {
                        this.setState({ showModalMinute1: false })
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
                    <View style={{
                        marginTop: 90,
                        paddingTop:10,
                        paddingBottom:10,
                        borderRadius: 5,
                        alignSelf: "center",
                        // maxHeight: screenHeight - 150,
                        // minHeight: screenHeight - 200,
                        height: 340,
                        // transform: [{ translateY: (screenHeight / 2)}],
                        backgroundColor: colors.white,
                    }}>
                        <ScrollView>
                            {
                                this.state.minutess.map((item, index) => {
                                //let ita = index+1
                                    return (
                                        <TouchableOpacity
                                            onPress={()=> {

                                                this.refs.showModalMinute1.goTo(index);
                                                this.setState({showModalMinute1:false})
                                            }}
                                            style={styles.anneePicker}>
                                            <Text style={{color:'white'}}>{index} mn</Text>
                                        </TouchableOpacity>
                                    );
                                })

                            }

                        </ScrollView>
                    </View>
                </Modal>
                <Modal
                    visible={this.state.showModalHour2}
                    onRequestClose={() => {
                        this.setState({ showModalHour2: false })
                    }}
                    transparent={true}

                ><TouchableOpacity
                    onPress={() => {
                        this.setState({ showModalHour2: false })
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
                    <View style={{
                        marginTop: 90,
                        paddingTop:10,
                        paddingBottom:10,
                        borderRadius: 5,
                        alignSelf: "center",
                        // maxHeight: screenHeight - 150,
                        // height: screenHeight - 210,
                        height: 340,
                        backgroundColor: colors.white,
                    }}>
                        <ScrollView>
                            {
                                this.state.hours.map((item, index) => {
                                    return (
                                        <TouchableOpacity
                                            onPress={()=> {
                                                this.refs.swiperRefHour2.goTo(item-1);
                                                this.setState({showModalHour2:false})
                                            }}
                                            style={styles.anneePicker}>
                                            <Text style={{color:'white'}}>{item} h</Text>
                                        </TouchableOpacity>
                                    );
                                })

                            }

                        </ScrollView>
                    </View>
                </Modal>
                <Modal
                    visible={this.state.showModalMinute2}
                    onRequestClose={() => {
                        this.setState({ showModalMinute2: false })
                    }}
                    transparent={true}

                ><TouchableOpacity
                    onPress={() => {
                        this.setState({ showModalMinute2: false })
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
                    <View style={{
                        marginTop: 90,
                        paddingTop:10,
                        paddingBottom:10,
                        borderRadius: 5,
                        alignSelf: "center",
                        // maxHeight: screenHeight - 150,
                        // minHeight: screenHeight - 200,
                        height: 340,
                        backgroundColor: colors.white,
                    }}>
                        <ScrollView>
                            {
                                this.state.minutess.map((item, index) => {
                                  //  let ita = index+1
                                    return (
                                        <TouchableOpacity
                                            onPress={()=> {

                                                this.refs.showModalMinute2.goTo(index);
                                                this.setState({showModalMinute2:false})
                                            }}
                                            style={styles.anneePicker}>
                                            <Text style={{color:'white'}}>{index} mn</Text>
                                        </TouchableOpacity>
                                    );
                                })

                            }

                        </ScrollView>
                    </View>
                </Modal>
            </LinearGradient>
        </View>
        )
    }
}

// export default StatEnergy;
const mapStateToProps = (state) => {
    const {heures,minutes} = state.statedata;
    return {heures,minutes}
};

export default connect(mapStateToProps)(Evenement);
