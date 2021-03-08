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
import MAAButton from '../../../../components/MAAButton/MAAButton';
import statusBarHeight from '../../../../configs/screen';
import Slidebottom from '../../../../components/selectslidebottom/Slidebottom';
const screen = Dimensions.get("window");
const SBHelight = statusBarHeight;
const screenWidth = screen.width
const screenHeight = screen.height - SBHelight

class EvenementForActivityProgrammes extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showModalHour1:false,
            showModalHour2:false,
            showModalMinute1:false,
            showModalMinute2:false,
            hours:[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23],
             minutes:['00','01','02','03','04','05','06','07','08','09','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24','25','26','27','28','29','30','31','32','33','34','35','36','37','38','39','40','41','42','43','44','45','46','47','48','49','50','51','52','53','54','55','56','57','58','59'],
            minutess:[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59],
            // minutess:[0,15,30,45,60],
        };

    }


    componentDidMount() {
        console.warn('tonga b')
        if(this.props.venudemodifier){
            console.warn(this.props.paramforswipe.hourforswiper1)
            this.refs.swiperRefHour1.goTo(this.props.paramforswipe.hourforswiper1);
            this.refs.swiperRefHour2.goTo(this.props.paramforswipe.hourforswiper2);
            this.refs.swiperRefMinute1.goTo(this.props.paramforswipe.minuteforswiper1);
            this.refs.swiperRefMinute2.goTo(this.props.paramforswipe.minuteforswiper2);
        }else{
            this.refs.swiperRefHour1.goTo(1);
            this.refs.swiperRefHour2.goTo(1);
        }

    }

    render() {
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
                    style={[styles.contentContainerStyle,{alignItems:'center',justifyContent:'center'}]}>
                    <View style={[styles.headerCtn]}>
                        <Text style={[baseStyles.titleText]}>
                            {/*{"Lundi matin"}*/}
                            {this.props.jourMatinOuSoir}
                        </Text>
                        <View style={
                            this.props.backcolordraggedItem ==='yellow' ?
                                {
                                    backgroundColor:colors.yellowbox,
                                    borderRadius:screenHeight*0.01,
                                    alignItems:"center",
                                    justifyContent:"center", marginTop:screenHeight*0.02,
                                    marginBottom:screenHeight*0.05,
                                    paddingHorizontal:screenWidth*0.04,
                                    paddingVertical:screenHeight*0.009,
                                }
                            :
                            {
                            backgroundColor:this.props.backcolordraggedItem,
                            borderRadius:screenHeight*0.01,
                            alignItems:"center",
                            justifyContent:"center", marginTop:screenHeight*0.02,
                            marginBottom:screenHeight*0.05,
                            paddingHorizontal:screenWidth*0.04,
                            paddingVertical:screenHeight*0.009,
                        }} >
                            <Text style={styles.textbtnActivitesProgram}>{this.props.training}</Text>
                        </View>
                    </View>
                        <View style={[styles.bodyEvent,{alignItems:'center',alignSelf:'center'}]}>
                        <Text style={{color:colors.white,
                            fontSize:15,
                            marginBottom:7}}>Sélectionner l'horaire de l'activité</Text>
                            <View style={{justifyContent:'space-between',alignItems:'center',
                                height:(screenHeight/4),marginBottom:7,
                            }}>
                        <View style={{flexDirection:"row",alignItems:'center',
                            alignSelf:'center',
                            justifyContent:'center'}}>
                            <View style={{
                                            width:screenHeight*0.1,
                                            height:screenHeight*0.1,
                                            justifyContent:'center',
                                            alignItems:'center',

                                        }}>
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
                                    containerStyle={{
                                        width:screenHeight*0.1,
                                        height:screenHeight*0.1,
                                        alignItems:"center",
                                        justifyContent:"center"
                                    }}>
                                     {
                                         this.props.heuresAll.map((item,index)=>
                                         {
                                                return (
                                                 <TouchableOpacity onPress={()=>{
                                                     this.setState({showModalHour1:true})

                                                 }} style={{
                                                     flex:1
                                                 }} >
                                                    <Text style={{fontSize:48,
                                                        color:colors.white,}}>{item.value}</Text>
                                                 </TouchableOpacity>)
                                         })
                                     }
                                </Swiper>
                            </View>
                            <View style={{
                                width:screenHeight*0.1,
                                height:screenHeight*0.1,
                                justifyContent:'center',
                                alignItems:'center',                            }}>
                            <Text style={{ fontSize:48,
                                // marginLeft:-20,marginTop:-20,
                                            color:colors.white,
                                            }} >:</Text>
                            </View>
                            <View style={{
                                width:screenHeight*0.1,
                                height:screenHeight*0.1,
                                            alignItems:"center",
                                            justifyContent:"center",}}>
                            <Swiper

                                        ref={"swiperRefMinute1"}
                                        onIndexChanged={(payload)=>{
                                            this.props.onchangeminute1(payload)
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
                                        containerStyle={{
                                            width:screenHeight*0.1,
                                            height:screenHeight*0.1,
                                            alignItems:"center",
                                            justifyContent:"center",}}>
                                        {
                                            this.state.minutes.map((item,index)=>
                                            {
                                                    return (
                                                    <TouchableOpacity
                                                        onPress={()=>{
                                                            this.setState({showModalMinute1:true})

                                                        }}
                                                        style={{}} >
                                                        <Text style={{  fontSize:48,
                                                            color:colors.white,}}>{item}</Text>
                                                        {/*<Text style={styles.heureMn}>{index}</Text>*/}
                                                    </TouchableOpacity>
                                                    )
                                            })
                                        }
                                    </Swiper>
                            </View>
                        </View>
                                <View style={{ width:screenHeight*0.1,
                                    height:screenHeight*0.1,
                                    justifyContent:'center',
                                    marginTop:-screenHeight*0.015,
                                    alignItems:'center',}}>
                                    <Text style={{fontSize:48,color:colors.white
                                    }}>à</Text>
                                </View>
                            <View style={{flexDirection:"row",alignItems:'center', justifyContent:'center',marginTop:-screenHeight*0.015}}>
                                <View style={{
                                    width:screenHeight*0.1,
                                    height:screenHeight*0.1,
                                    justifyContent:'center',
                                    alignItems:'center'
                                }}>
                                    <Swiper
                                        onIndexChanged={(payload)=>{
                                            this.props.onchangehour2(payload)
                                        }}
                                        ref={"swiperRefHour2"}
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
                                        containerStyle={{
                                            width:screenHeight*0.1,
                                            height:screenHeight*0.1,
                                            alignItems:"center",
                                            justifyContent:"center"
                                        }}>
                                        {
                                            this.props.heuresAll.map((item,index)=>
                                            {
                                                return (
                                                    <TouchableOpacity onPress={()=>{
                                                        this.setState({showModalHour2:true})
                                                    }} style={{
                                                        flex:1
                                                    }} >
                                                        <Text style={{fontSize:48,
                                                            color:colors.white,}}>{item.value}</Text>
                                                    </TouchableOpacity>)
                                            })
                                        }
                                    </Swiper>
                                </View>
                                <View style={{
                                    width:screenHeight*0.1,
                                    height:screenHeight*0.1,
                                    justifyContent:'center',
                                    alignItems:'center',
                                }}>
                                <Text style={{ fontSize:48,
                                    color:colors.white,
                                }} >:</Text>
                                </View>
                                <View style={{
                                    width:screenHeight*0.1,
                                    height:screenHeight*0.1,
                                    alignItems:"center",
                                    justifyContent:"center",}}>
                                    <Swiper

                                        ref={'swiperRefMinute2'}
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
                                        containerStyle={{
                                            width:screenHeight*0.1,
                                            height:screenHeight*0.1,
                                            alignItems:"center",
                                            justifyContent:"center",}}>
                                        {
                                            this.state.minutes.map((item,index)=>
                                            {
                                                return (
                                                    <TouchableOpacity
                                                        onPress={()=>{
                                                            this.setState({showModalMinute2:true})
                                                        }}
                                                        style={{}} >
                                                        <Text style={{  fontSize:48,
                                                            color:colors.white,}}>{item}</Text>
                                                        {/*<Text style={styles.heureMn}>{index}</Text>*/}
                                                    </TouchableOpacity>
                                                )
                                            })
                                        }
                                    </Swiper>
                                </View>
                            </View>
                        </View>
                        <TouchableOpacity style={styles.btnValider}  onPress={()=>{this.props._initaddEventActivity()}}>
                            <Text style={styles.textbtnValider}>Valider</Text>
                        </TouchableOpacity>

                            <TouchableOpacity style={[styles.btnValider,{backgroundColor: "transparent", borderColor: colors.white,
                                marginTop: 15,
                                borderWidth: 1,}]}  onPress={()=>{this.props._hidePickerhour()}}>
                                <Text style={styles.textbtnValider}>Annuler</Text>
                            </TouchableOpacity>

                        </View>

                </View>
                {/*<Modal*/}
                {/*    visible={this.state.showModalHour1}*/}
                {/*    onRequestClose={() => {*/}
                {/*        this.setState({ showModalHour1: false })*/}
                {/*    }}*/}
                {/*    transparent={true}*/}

                {/*><TouchableOpacity*/}
                {/*    onPress={() => {*/}
                {/*        this.setState({ showModalHour1: false })*/}
                {/*    }}*/}
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
                {/*    <View style={{*/}
                {/*        marginTop: 90,*/}
                {/*        paddingTop:10,*/}
                {/*        paddingBottom:10,*/}
                {/*        borderRadius: 5,*/}
                {/*        alignSelf: "center",*/}
                {/*        // maxHeight: screenHeight - 150,*/}
                {/*        height: 340,*/}
                {/*        transform: [{ translateY: (screenHeight / 2)-340}],*/}
                {/*            backgroundColor: colors.white,*/}
                {/*    }}>*/}
                {/*        <ScrollView>*/}
                {/*            {*/}
                {/*                this.state.hours.map((item, index) => {*/}
                {/*                    return (*/}
                {/*                        <TouchableOpacity*/}
                {/*                            onPress={()=> {*/}
                {/*                                this.refs.swiperRefHour1.goTo(item);*/}
                {/*                                this.setState({hourselectionne:item,showModalHour1:false})*/}
                {/*                            }}*/}
                {/*                            style={styles.anneePicker}>*/}
                {/*                            <Text style={{color:'white'}}>{item} h</Text>*/}
                {/*                        </TouchableOpacity>*/}
                {/*                    );*/}
                {/*                })*/}

                {/*            }*/}

                {/*        </ScrollView>*/}
                {/*    </View>*/}
                {/*</Modal>*/}
                {this.state.hours.length > 0 && <Slidebottom showModal={this.state.showModalHour1}
                                                                onRequestClose={()=>{
                                                                    this.setState({showModalHour1:false});
                                                                }}
                                                                callback={(item,index)=>{
                                                                    this.refs.swiperRefHour1.goTo(item);
                                                                    this.setState({showModalHour1:false})
                                                                }}
                                                                items={this.state.hours}
                                                                component_item={(item)=>{
                                                                    return(
                                                                        <Text style={{color:'#373535'}}>{item} h</Text>
                                                                    )
                                                                }}
                />}
                {/*<Modal*/}
                {/*    visible={this.state.showModalMinute1}*/}
                {/*    onRequestClose={() => {*/}
                {/*        this.setState({ showModalMinute1: false })*/}
                {/*    }}*/}
                {/*    transparent={true}*/}

                {/*><TouchableOpacity*/}
                {/*    onPress={() => {*/}
                {/*        this.setState({ showModalMinute1: false })*/}
                {/*    }}*/}
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
                {/*    <View style={{*/}
                {/*        marginTop: 90,*/}
                {/*        paddingTop:10,*/}
                {/*        paddingBottom:10,*/}
                {/*        borderRadius: 5,*/}
                {/*        alignSelf: "center",*/}
                {/*        // maxHeight: screenHeight - 150,*/}
                {/*        // minHeight: screenHeight - 200,*/}
                {/*        height: 340,*/}
                {/*        transform: [{ translateY: (screenHeight / 2)-340}],*/}
                {/*        backgroundColor: colors.white,*/}
                {/*    }}>*/}
                {/*        <ScrollView>*/}
                {/*            {*/}
                {/*                this.state.minutess.map((item, index) => {*/}
                {/*                //let ita = index+1*/}
                {/*                    return (*/}
                {/*                        <TouchableOpacity*/}
                {/*                            onPress={()=> {*/}
                {/*                                this.refs.swiperRefMinute1.goTo(item);*/}
                {/*                                this.setState({showModalMinute1:false})*/}
                {/*                            }}*/}
                {/*                            style={styles.anneePicker}>*/}
                {/*                            <Text style={{color:'white'}}>{item} mn</Text>*/}
                {/*                        </TouchableOpacity>*/}
                {/*                    );*/}
                {/*                })*/}
                {/*            }*/}
                {/*        </ScrollView>*/}
                {/*    </View>*/}
                {/*</Modal>*/}
                {this.state.minutess.length > 0 && <Slidebottom showModal={this.state.showModalMinute1}
                                                             onRequestClose={()=>{
                                                                 this.setState({showModalMinute1:false});
                                                             }}
                                                             callback={(item,index)=>{
                                                                 this.refs.swiperRefMinute1.goTo(item);
                                                                 this.setState({showModalMinute1:false})
                                                             }}
                                                             items={this.state.minutess}
                                                             component_item={(item)=>{
                                                                 return(
                                                                     <Text style={{color:'#373535'}}>{item} mn</Text>
                                                                 )
                                                             }}
                />}
                {/*<Modal*/}
                {/*    visible={this.state.showModalHour2}*/}
                {/*    onRequestClose={() => {*/}
                {/*        this.setState({ showModalHour2: false })*/}
                {/*    }}*/}
                {/*    transparent={true}*/}

                {/*><TouchableOpacity*/}
                {/*    onPress={() => {*/}
                {/*        this.setState({ showModalHour2: false })*/}
                {/*    }}*/}
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
                {/*    <View style={{*/}
                {/*        marginTop: 90,*/}
                {/*        paddingTop:10,*/}
                {/*        paddingBottom:10,*/}
                {/*        borderRadius: 5,*/}
                {/*        alignSelf: "center",*/}
                {/*        // maxHeight: screenHeight - 150,*/}
                {/*        // height: screenHeight - 210,*/}
                {/*        transform: [{ translateY: (screenHeight / 2)-340}],*/}
                {/*        height: 340,*/}
                {/*        backgroundColor: colors.white,*/}
                {/*    }}>*/}
                {/*        <ScrollView>*/}
                {/*            {*/}
                {/*                this.state.hours.map((item, index) => {*/}
                {/*                    return (*/}
                {/*                        <TouchableOpacity*/}
                {/*                            onPress={()=> {*/}
                {/*                                this.refs.swiperRefHour2.goTo(item);*/}
                {/*                                this.setState({showModalHour2:false})*/}
                {/*                            }}*/}
                {/*                            style={styles.anneePicker}>*/}
                {/*                            <Text style={{color:'white'}}>{item} h</Text>*/}
                {/*                        </TouchableOpacity>*/}
                {/*                    );*/}
                {/*                })*/}

                {/*            }*/}

                {/*        </ScrollView>*/}
                {/*    </View>*/}
                {/*</Modal>*/}

                {this.state.hours.length > 0 && <Slidebottom showModal={this.state.showModalHour2}
                                                                onRequestClose={()=>{
                                                                    this.setState({showModalHour2:false});
                                                                }}
                                                                callback={(item,index)=>{
                                                                    this.refs.swiperRefHour2.goTo(item);
                                                                    this.setState({showModalHour2:false})
                                                                }}
                                                                items={this.state.hours}
                                                                component_item={(item)=>{
                                                                    return(
                                                                        <Text style={{color:'#373535'}}>{item} h</Text>
                                                                    )
                                                                }}
                />}

                {/*<Modal*/}
                {/*    visible={this.state.showModalMinute2}*/}
                {/*    onRequestClose={() => {*/}
                {/*        this.setState({ showModalMinute2: false })*/}
                {/*    }}*/}
                {/*    transparent={true}*/}

                {/*><TouchableOpacity*/}
                {/*    onPress={() => {*/}
                {/*        this.setState({ showModalMinute2: false })*/}
                {/*    }}*/}
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
                {/*    <View style={{*/}
                {/*        marginTop: 90,*/}
                {/*        paddingTop:10,*/}
                {/*        paddingBottom:10,*/}
                {/*        borderRadius: 5,*/}
                {/*        alignSelf: "center",*/}
                {/*        // maxHeight: screenHeight - 150,*/}
                {/*        // minHeight: screenHeight - 200,*/}
                {/*        transform: [{ translateY: (screenHeight / 2)-340}],*/}
                {/*        height: 340,*/}
                {/*        backgroundColor: colors.white,*/}
                {/*    }}>*/}
                {/*        <ScrollView>*/}
                {/*            {*/}
                {/*                this.state.minutess.map((item, index) => {*/}
                {/*                  //  let ita = index+1*/}
                {/*                    return (*/}
                {/*                        <TouchableOpacity*/}
                {/*                            onPress={()=> {*/}

                {/*                                this.refs.swiperRefMinute2.goTo(item);*/}
                {/*                                this.setState({showModalMinute2:false})*/}
                {/*                            }}*/}
                {/*                            style={styles.anneePicker}>*/}
                {/*                            <Text style={{color:'white'}}>{item} mn</Text>*/}
                {/*                        </TouchableOpacity>*/}
                {/*                    );*/}
                {/*                })*/}

                {/*            }*/}

                {/*        </ScrollView>*/}
                {/*    </View>*/}
                {/*</Modal>*/}
                {this.state.minutess.length > 0 && <Slidebottom showModal={this.state.showModalMinute2}
                             onRequestClose={()=>{
                                 this.setState({showModalMinute2:false});
                             }}
                             callback={(item,index)=>{
                                 this.refs.swiperRefMinute2.goTo(item);
                                 this.setState({showModalMinute2:false})
                             }}
                             items={this.state.minutess}
                             component_item={(item)=>{
                                 return(
                                     <Text style={{color:'#373535'}}>{item} mn</Text>
                                 )
                             }}
                />}
            </LinearGradient>
        </View>
        )
    }
}

// export default StatEnergy;
const mapStateToProps = (state) => {
    const {heuresAll,minutes} = state.statedata;
    return {heuresAll,minutes}
};

export default connect(mapStateToProps)(EvenementForActivityProgrammes);
