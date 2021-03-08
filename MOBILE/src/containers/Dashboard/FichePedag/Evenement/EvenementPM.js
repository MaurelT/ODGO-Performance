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
import statusBarHeight from '../../../../configs/screen';
import Slidebottom from '../../../../components/selectslidebottom/Slidebottom';
import Evenement from './Evenement';
const screen = Dimensions.get("window");
const SBHelight = statusBarHeight;
const screenWidth = screen.width
const screenHeight = screen.height - SBHelight

class EvenementPM extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showModalHour1:false,
            showModalHour2:false,
            showModalMinute1:false,
            showModalMinute2:false,
            // hours:[13,14,15,16,17,18,19,20,21,22,23,24],
            // // minutess:['01','02','03','04','05','06','07','08','09','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24','25','26','27','28','29','30','31','32','33','34','35','36','37','38','39','40','41','42','43','44','45','46','47','48','49','50','51','52','53','54','55','56','57','58','59','60'],
            // minutess:[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59],
            hours:[14,15,16,17,18,19,20,21,22,23,24],
            minutess:[0,15,30,45,60],
        };

    }

    componentDidMount() {
        // ispost={this.state.dragstart}
        if(this.props.defaulthour1 === 0){
            this.refs.swiperRefHour1.goTo(0);
        }else{
            this.refs.swiperRefHour1.goTo(this.props.defaulthour1);
        }
        if(this.props.defaulthour2 === 0){
            this.refs.swiperRefHour2.goTo(0);
        }else{
            this.refs.swiperRefHour2.goTo(this.props.defaulthour2);
        }
        console.warn('hour 1 et 2 pm',this.props.defaulthour1,this.props.defaulthour2)
        this.refs.showModalMinute1.goTo(this.props.defaultminute1);
        this.refs.showModalMinute2.goTo(this.props.defaultminute2);
    }


    render() {
        console.warn(this.props.jourMatinOuSoir)
        return (
            <View style={[styles.panelEvent,{top:-22}]}>
            <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }} colors={[colors.balck, colors.green, colors.balck]} style={styles.linearGradient}>


                <View
                    style={[styles.contentContainerStyle]}>
                    <View style={[styles.headerCtn]}>
                        <Text style={[baseStyles.titleText]}>
                            {/*{"Lundi matin"}*/}
                            {this.props.jourMatinOuSoir}
                        </Text>
                        <View style={{backgroundColor:this.props.backcolordraggedItem === 'cyan' ? '#3a81aa':this.props.backcolordraggedItem === 'yellow' ? 'rgb(255,206,73)' :this.props.backcolordraggedItem,
                            borderRadius:screenHeight*0.01,
                            alignItems:"center",
                            justifyContent:"center", marginTop:screenHeight*0.02,
                            marginBottom:screenHeight*0.02,
                            paddingHorizontal:screenWidth*0.04,
                            paddingVertical:screenHeight*0.009}} >
                            <Text style={styles.textbtnActivitesProgram}>{this.props.training}</Text>
                        </View>
                    </View>




                    <View style={styles.bodyEvent}>
                        <Text style={{color:colors.white,
                            fontSize:15,
                            marginBottom:7}}>Sélectionner l'horaire de l'activité</Text>
                        <View style={{justifyContent:'space-between',alignItems:'center',
                            height:(screenHeight/4),marginBottom:7,
                        }}>
                            <View style={{flexDirection:"row",alignItems:'center',justifyContent:'space-between'}}>
                                <View style={{
                                    // backgroundColor:'red',
                                    width:screenHeight*0.1,
                                    height:screenHeight*0.1,
                                    justifyContent:'center',
                                    alignItems:'center'
                                }}><Swiper
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
                                            justifyContent:"center",
                                        }}>
                                        {
                                            this.props.heuresPM.map((item,index)=>
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
                                    // marginRight:25,marginTop:-4,
                                    width:screenHeight*0.1,
                                    height:screenHeight*0.1,
                                    alignItems:'center',
                                    justifyContent:'center'
                                }}>
                                <Text style={{ fontSize:48,
                                    // marginTop:-25,marginLeft:-25,
                                    color:colors.white,
                                }} >:</Text>
                                </View>
                                <View style={{
                                    width:screenHeight*0.1,
                                    height:screenHeight*0.1,
                                    alignItems:"center",
                                    justifyContent:"center",}}>
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
                                        containerStyle={{
                                            width:screenHeight*0.1,
                                            height:screenHeight*0.1,
                                            alignItems:"center",
                                            justifyContent:"center",}}>
                                        {
                                            this.props.minutes.map((item,index)=>
                                            {
                                                return (
                                                    <TouchableOpacity
                                                        onPress={()=>{
                                                            this.setState({showModalMinute1:true})

                                                        }}
                                                        style={{}} >
                                                        <Text style={{  fontSize:48,
                                                            color:colors.white,}}>{item.value}</Text>
                                                        {/*<Text style={styles.heureMn}>{index}</Text>*/}
                                                    </TouchableOpacity>
                                                )
                                            })
                                        }
                                    </Swiper>
                                </View>
                            </View>
                            <View style={{
                                width:screenHeight*0.1,
                                height:screenHeight*0.1,
                                alignItems:'center',
                                justifyContent:'center',
                                marginTop:-screenHeight*0.02
                            }}>
                                <Text style={{fontSize:48,color:colors.white
                                }}>à</Text></View>
                            <View style={{flexDirection:"row",alignItems:'center',
                                marginTop:-screenHeight*0.02,
                                justifyContent:'space-between'}}>
                                <View style={{
                                    width:screenHeight*0.1,
                                    height:screenHeight*0.1,
                                    justifyContent:'center',
                                    alignItems:'center',
                                    // backgroundColor:'yellow'
                                }}>
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
                                        containerStyle={{
                                            width:screenHeight*0.1,
                                            height:screenHeight*0.1,
                                            alignItems:"center",
                                            justifyContent:"center"
                                        }}>
                                        {
                                            this.props.heuresPM.map((item,index)=>
                                            {
                                                return (
                                                    <TouchableOpacity
                                                        onPress={()=>{
                                                            this.setState({showModalHour2:true})

                                                        }}
                                                        style={{
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
                                    // marginRight:25,marginTop:-4,
                                    width:screenHeight*0.1,
                                    height:screenHeight*0.1,
                                    alignItems:'center',
                                    justifyContent:'center'
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
                                        containerStyle={{
                                            width:screenHeight*0.1,
                                            height:screenHeight*0.1,
                                            alignItems:"center",
                                            justifyContent:"center",}}>
                                        {
                                            this.props.minutes.map((item,index)=>
                                            {
                                                return (
                                                    <TouchableOpacity
                                                        onPress={()=>{
                                                            this.setState({showModalMinute2:true})

                                                        }}
                                                        style={{}} >
                                                        <Text style={{  fontSize:48,
                                                            color:colors.white,}}>{item.value}</Text>
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
                            borderWidth: 1,}]}  onPress={()=>{
                            if(this.props.ispost){
                                this.props.userActivites.pop();
                            }
                            this.props._hidePickerhour()}}>
                            <Text style={styles.textbtnValider}>Annuler</Text>
                        </TouchableOpacity>

                    </View>











                </View>

                <Slidebottom showModal={this.state.showModalHour1}
                             onRequestClose={()=>{
                                 this.setState({showModalHour1:false});
                             }}
                             callback={async (item,index)=>{
                                 this.refs.swiperRefHour1.goTo(index);
                                 this.setState({hourselectionne:item,showModalHour1:false})
                             }}
                             items={ this.state.hours}
                             component_item={(item)=>{
                                 return(
                                     <Text style={{color:'#373535'}}>
                                         {
                                             item
                                         } h
                                     </Text>
                                 )
                             }}
                />

                <Slidebottom showModal={this.state.showModalMinute1}
                             onRequestClose={()=>{
                                 this.setState({showModalMinute1:false});
                             }}
                             callback={async (item,index)=>{
                                 this.refs.showModalMinute1.goTo(index);
                                 this.setState({showModalMinute1:false})
                             }}
                             items={ this.state.minutess}
                             component_item={(item)=>{
                                 return(
                                     <Text style={{color:'#373535'}}>
                                         {
                                             item
                                         } mn
                                     </Text>
                                 )
                             }}
                />
                <Slidebottom showModal={this.state.showModalHour2}
                             onRequestClose={()=>{
                                 this.setState({showModalHour2:false});
                             }}
                             callback={async (item,index)=>{
                                 this.refs.swiperRefHour2.goTo(index);
                                 this.setState({showModalHour2:false})
                             }}
                             items={ this.state.hours}
                             component_item={(item)=>{
                                 return(
                                     <Text style={{color:'#373535'}}>
                                         {
                                             item
                                         } h
                                     </Text>
                                 )
                             }}
                />

                <Slidebottom showModal={this.state.showModalMinute2}
                             onRequestClose={()=>{
                                 this.setState({showModalMinute2:false});
                             }}
                             callback={async (item,index)=>{
                                 this.refs.showModalMinute2.goTo(index);
                                 this.setState({showModalMinute2:false})
                             }}
                             items={ this.state.minutess}
                             component_item={(item)=>{
                                 return(
                                     <Text style={{color:'#373535'}}>
                                         {
                                             item
                                         } mn
                                     </Text>
                                 )
                             }}
                />
            </LinearGradient>
        </View>
        )
    }
}

// export default StatEnergy;
const mapStateToProps = (state) => {
    const {minutes,heuresPM} = state.statedata;
    return {minutes,heuresPM}
};

export default connect(mapStateToProps)(EvenementPM);
