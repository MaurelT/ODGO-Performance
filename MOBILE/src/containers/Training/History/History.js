import React, { Component } from 'react';
import {
    Dimensions,
    StatusBar,
    TouchableOpacity,
    ScrollView,
    View,
    Text,
    Platform,
    RefreshControl
} from 'react-native';
import AutoHeightImage from 'react-native-auto-height-image';
import LinearGradient from 'react-native-linear-gradient';
import colors from '../../../configs/colors';
import baseStyles from '../../../base/BaseStyles';
import styles from './styles';
import MAAButton from '../../../components/MAAButton/MAAButton';
import HalfRed from '../../../components/HalfRed/HalfRed';
import AsyncStorage from '@react-native-community/async-storage';
import TrainHelper from '../../../apis/helpers/train_helper';
import {SET_ACTIVE_TAB, SET_POP_TO_TOP,SET_PARAM_TRAIN} from '../../../redux/types/tabTypes';
import {connect} from "react-redux";
import statusBarHeight from '../../../configs/screen';
import moment from 'moment';
import {getBlessurePathologie, getTensionPathologie} from '../../../apis/FonctionRedondant';
import PathologieHelper from '../../../apis/helpers/pathologie_helper';
import PathologieHelperTension from '../../../apis/helpers/tension_helper';
import Slidebottom from '../../../components/selectslidebottom/Slidebottom';
import {getUserTrains} from'../../../apis/FonctionRedondant'

const screen = Dimensions.get('screen');
const SBHelight = statusBarHeight;
const screenWidth = screen.width
const screenHeight = screen.height - SBHelight


class History extends Component {

    constructor(props) {
        super(props)
        this.state = {
            userToken: "",
            activeMenu: 2,
            refreshing: false,
            trainStories0: [],
            trainStories1: [],
            trainStories2: [],
            trainStories3: [],
            trainStories4: [],
            trainStories5: [],
            trainStories6: [],
            trainStories7: [],
            trainStories8: [],
            trainStories9: [],
            trainStories10: [],
            trainStories11: [],
            popToTop:this.props.popToTop,
            showYear:false,
            selectedAnnee:new Date().getFullYear(),
            arrayAnnee:[],
            trainStoriesobj:null,
        }
        for(let i = 2019; i<2060; i++)
        {
            this.state.arrayAnnee.push(i);
        }

        this.trainStoriesobj=[];
    }

    async componentDidMount() {
        const userToken = await AsyncStorage.getItem("userToken");
        this.setState({ userToken });
        // this.getUserTrains(moment(new Date()).format('YYYY'));
        this.setState({refreshing:true});
        getUserTrains(TrainHelper,this.props,moment(new Date()).format('YYYY')).then((refreshinfalse)=>{
            this.setState({refreshing:refreshinfalse});
        });


    }


     addAndSort2(arr, val) {
        arr.push(val);
       let i = arr.length - 1;
       let item = arr[i];
        while (i > 0 && item < arr[i-1]) {
            arr[i] = arr[i-1];
            i -= 1;
        }
        arr[i] = item;
        return arr;
    }

    getUserTrains = async (year) => {

        console.warn("trainStories")
        this.setState({ refreshing: true });
        const trainStories = await TrainHelper.getUserTrains(this.props.userToken,year);
        this.setState({trainStoriesobj:trainStories})


        //taloha fa ts miasa tson
        console.warn('trainStories',JSON.stringify(trainStories));
        let trainStories0 = []
        let trainStories1 = []
        let trainStories2 = []
        let trainStories3 = []
        let trainStories4 = []
        let trainStories5 = []
        let trainStories6 = []
        let trainStories7 = []
        let trainStories8 = []
        let trainStories9 = []
        let trainStories10 = []
        let trainStories11 = []

        console.warn('story.date',trainStories);
       // let myarray = [4,2,3,5,1,10,9,6];
        let mynewarray=[];
        // for(let i = 0; i< myarray.length; i++){
        //     this.addAndSort2(mynewarray,myarray[i])
        // }

        trainStories.data.map((story, index) => {
            const storyDate = new Date(story.date);

            this.addAndSort2(mynewarray,storyDate.getFullYear())

            if (storyDate.getMonth() == 0) {
                trainStories0.push(story)
            }
            else if (storyDate.getMonth() == 1) {
                trainStories1.push(story)
            }
            else if (storyDate.getMonth() == 2) {
                trainStories2.push(story)
            }
            else if (storyDate.getMonth() == 3) {
                trainStories3.push(story)
            }
            else if (storyDate.getMonth() == 4) {
                trainStories4.push(story)
            }
            else if (storyDate.getMonth() == 5) {
                trainStories5.push(story)
            }
            else if (storyDate.getMonth() == 6) {
                trainStories6.push(story)
            }
            else if (storyDate.getMonth() == 7) {
                trainStories7.push(story)
            }
            else if (storyDate.getMonth() == 8) {
                trainStories8.push(story)
            }
            else if (storyDate.getMonth() == 9) {
                trainStories9.push(story)
            }
            else if (storyDate.getMonth() == 10) {
                trainStories10.push(story)
            }
            else if (storyDate.getMonth() == 11) {
                trainStories11.push(story)
            }
        });
        console.warn('mynewarra',mynewarray)

        this.setState({ trainStories0 })
        this.setState({ trainStories1 })
        this.setState({ trainStories2 })
        this.setState({ trainStories3 })
        this.setState({ trainStories4 })
        this.setState({ trainStories5 })
        this.setState({ trainStories6 })
        this.setState({ trainStories7 })
        this.setState({ trainStories8 })
        this.setState({ trainStories9 })
        this.setState({ trainStories10 })
        this.setState({ trainStories11 })
        this.setState({ refreshing: false })
    }


    trainStories11=(paramDate)=>{
        let count = 0;
        for(let i = 0; i < this.state.trainStories11.length; i++){
            if(this.state.trainStories11[i].date.substring(0, 4) == paramDate){
                count++
            }
        }
        return(
                this.state.trainStories11.length > 0 && count > 0 ?
                    <View style={
                        // [styles.blockCtn]
                        {}}>
                        {/*<Text style={[styles.blockTitle]}>{'Décembre'.toUpperCase()}</Text>*/}
                        <View style={[styles.blockStory]}>

                            {
                                this.state.trainStories11.map((story, index) => {
                                    if(story.date.substring(0, 4) == paramDate) {
                                        return (
                                            <HalfRed key={'trainStories11' + index} redText={
                                                "" + story.date.substring(8, 10) + "/" +
                                                story.date.substring(5, 7) + "/" +
                                                story.date.substring(0, 4)
                                            } blackText={story.entrainement_type.name}
                                                     onPress={() => {
                                                         this.props.navigation.navigate("TrainSingle", {itemId: story.id})
                                                     }}/>
                                        )
                                    }
                                })
                            }

                        </View>

                        {/*<View style={[styles.blockSeparator]}></View>*/}
                    </View> : null
        )
    }


    trainStories10(paramDate){
        let count = 0;
        for(let i = 0; i < this.state.trainStories10.length; i++){
            if(this.state.trainStories10[i].date.substring(0, 4) == paramDate){
                count++
            }
        }
        return(
            this.state.trainStories10.length > 0 && count > 0 ?
                <View style={
                    // [styles.blockCtn]
                    {}}>
                                {/*<Text style={[styles.blockTitle]}>NOVEMBRE</Text>*/}
                                <View style={[styles.blockStory]}>
                                    {
                                        this.state.trainStories10.map((story, index) => {
                                            if(story.date.substring(0, 4) == paramDate) {
                                                return (
                                                    <HalfRed key={'trainStories10' + index} redText={
                                                        "" + story.date.substring(8, 10) + "/" +
                                                        story.date.substring(5, 7) + "/" +
                                                        story.date.substring(0, 4)
                                                    } blackText={story.entrainement_type.name}
                                                             onPress={() => {
                                                                 this.props.navigation.navigate("TrainSingle", {itemId: story.id})
                                                             }}/>
                                                )
                                            }
                                        })
                                    }
                                </View>
                                {/*<View style={[styles.blockSeparator]}></View>*/}
                            </View> : null
        )
    }

    trainStories9(paramDate){
        let count = 0;
        for(let i = 0; i < this.state.trainStories9.length; i++){
            if(this.state.trainStories9[i].date.substring(0, 4) == paramDate){
                count++
            }
        }
        return(
            this.state.trainStories9.length > 0 && count > 0 ?
                <View style={
                    // [styles.blockCtn]
                    {}}>
                                {/*<Text style={[styles.blockTitle]}>OCTOBRE</Text>*/}
                                <View style={[styles.blockStory]}>

                                    {
                                        this.state.trainStories9.map((story, index) => {
                                            if(story.date.substring(0, 4) == paramDate) {
                                                return (
                                                    <HalfRed key={'trainStories9' + index} redText={
                                                        "" + story.date.substring(8, 10) + "/" +
                                                        story.date.substring(5, 7) + "/" +
                                                        story.date.substring(0, 4)
                                                    }
                                                             blackText={story.entrainement_type.name}
                                                             onPress={() => {
                                                                 this.props.navigation.navigate("TrainSingle", {itemId: story.id}, {itemId: story.id})
                                                             }}/>
                                                )
                                            }
                                        })
                                    }

                                </View>

                                {/*<View style={[styles.blockSeparator]}></View>*/}
                            </View> : null
        )
    }

    trainStories8(paramDate){
        let count = 0;
        for(let i = 0; i < this.state.trainStories8.length; i++){
            if(this.state.trainStories8[i].date.substring(0, 4) == paramDate){
                count++
            }
        }
        return(
            this.state.trainStories8.length > 0 && count > 0 ?
                <View style={
                    // [styles.blockCtn]
                    {}}>
                                {/*<Text style={[styles.blockTitle]}>SEPTEMBRE</Text>*/}
                                <View style={[styles.blockStory]}>

                                    {
                                        this.state.trainStories8.map((story, index) => {
                                            if(story.date.substring(0, 4) == paramDate) {
                                                return (
                                                    <HalfRed key={'trainStories8' + index} redText={
                                                        "" + story.date.substring(8, 10) + "/" +
                                                        story.date.substring(5, 7) + "/" +
                                                        story.date.substring(0, 4)
                                                    } blackText={story.entrainement_type.name}
                                                             onPress={() => {
                                                                 this.props.navigation.navigate("TrainSingle", {itemId: story.id})
                                                             }}/>
                                                )
                                            }
                                        })
                                    }

                                </View>

                                {/*<View style={[styles.blockSeparator]}></View>*/}
                            </View> : null
        )
    }

    trainStories7(paramDate){
        let count = 0;
        for(let i = 0; i < this.state.trainStories7.length; i++){
            if(this.state.trainStories7[i].date.substring(0, 4) == paramDate){
                count++
            }
        }
        return(
            this.state.trainStories7.length > 0  && count > 0 ?
                <View style={
                    // [styles.blockCtn]
                    {}}>
                    {/*            <Text style={[styles.blockTitle]}>AOUT</Text>*/}
                                <View style={[styles.blockStory]}>

                                    {
                                        this.state.trainStories7.map((story, index) => {
                                            if(story.date.substring(0, 4) == paramDate) {
                                                return (
                                                    <HalfRed key={'trainStories7' + index} redText={
                                                        "" + story.date.substring(8, 10) + "/" +
                                                        story.date.substring(5, 7) + "/" +
                                                        story.date.substring(0, 4)
                                                    } blackText={story.entrainement_type.name}
                                                             onPress={() => {
                                                                 this.props.navigation.navigate("TrainSingle", {itemId: story.id})
                                                             }}/>
                                                )
                                            }
                                        })
                                    }

                                </View>

                                {/*<View style={[styles.blockSeparator]}></View>*/}
                            </View> : null
        )
    }

    trainStories6(paramDate){
        let count = 0;
        for(let i = 0; i < this.state.trainStories6.length; i++){
            if(this.state.trainStories6[i].date.substring(0, 4) == paramDate){
                count++
            }
        }
        return(
            this.state.trainStories6.length > 0 && count > 0 ?
                <View style={
                    // [styles.blockCtn]
                    {}}>
                    {/*            <Text style={[styles.blockTitle]}>JUILLET</Text>*/}
                                <View style={[styles.blockStory]}>

                                    {
                                        this.state.trainStories6.map((story, index) => {
                                            if(story.date.substring(0, 4) == paramDate) {
                                                return (
                                                    <HalfRed key={'trainStories6' + index} redText={
                                                        "" + story.date.substring(8, 10) + "/" +
                                                        story.date.substring(5, 7) + "/" +
                                                        story.date.substring(0, 4)
                                                    } blackText={story.entrainement_type.name}
                                                             onPress={() => {
                                                                 this.props.navigation.navigate("TrainSingle", {itemId: story.id})
                                                             }}/>
                                                )
                                            }
                                        })
                                    }

                                </View>

                                {/*<View style={[styles.blockSeparator]}></View>*/}
                            </View> : null
        )
    }

    trainStories5(paramDate){
        let count = 0;
        for(let i = 0; i < this.state.trainStories5.length; i++){
            if(this.state.trainStories5[i].date.substring(0, 4) == paramDate){
                count++
            }
        }
        return(
            this.state.trainStories5.length > 0 && count >0 ?
                <View style={
                    // [styles.blockCtn]
                    {}}>
                    {/*<Text style={[styles.blockTitle]}>JUIN</Text>*/}
                <View style={[styles.blockStory]}>

                    {
                        this.state.trainStories5.map((story, index) => {
                            if(story.date.substring(0, 4) == paramDate) {
                                return (
                                    <HalfRed key={'trainStories5' + index} redText={
                                        "" + story.date.substring(8, 10) + "/" +
                                        story.date.substring(5, 7) + "/" +
                                        story.date.substring(0, 4)
                                    } blackText={story.entrainement_type.name}
                                             onPress={() => {
                                                 this.props.navigation.navigate("TrainSingle", {itemId: story.id})
                                             }}/>
                                )
                            }
                        })
                    }
                </View>
                {/*<View style={[styles.blockSeparator]}></View>*/}
            </View> : null
        )
    }

    trainStories4(paramDate){
        let count = 0;
        for(let i = 0; i < this.state.trainStories4.length; i++){
            if(this.state.trainStories4[i].date.substring(0, 4) == paramDate){
                count++
            }
        }
        return(
            this.state.trainStories4.length > 0 && count >0 ?
                <View style={
                    // [styles.blockCtn]
                    {}}>
                                {/*<Text style={[styles.blockTitle]}>MAI</Text>*/}
                                <View style={[styles.blockStory]}>

                                    {
                                        this.state.trainStories4.map((story, index) => {
                                            if(story.date.substring(0, 4) == paramDate) {
                                                return (
                                                    <HalfRed key={'trainStories4' + index} redText={
                                                        "" + story.date.substring(8, 10) + "/" +
                                                        story.date.substring(5, 7) + "/" +
                                                        story.date.substring(0, 4)
                                                    } blackText={story.entrainement_type.name}
                                                             onPress={() => {
                                                                 this.props.navigation.navigate("TrainSingle", {itemId: story.id})
                                                             }}/>
                                                )
                                            }
                                        })
                                    }

                                </View>

                                {/*<View style={[styles.blockSeparator]}></View>*/}
                            </View> : null
        )
    }

    trainStories3(paramDate){
        let count = 0;
        for(let i = 0; i < this.state.trainStories3.length; i++){
            if(this.state.trainStories3[i].date.substring(0, 4) == paramDate){
                count++
            }
        }
        return(
            this.state.trainStories3.length > 0 && count > 0  ?
                <View style={
                    // [styles.blockCtn]
                    {}}>
                    {/*            <Text style={[styles.blockTitle]}>AVRIL</Text>*/}
                                <View style={[styles.blockStory]}>

                                    {
                                        this.state.trainStories3.map((story, index) => {
                                            if(story.date.substring(0, 4) == paramDate) {
                                                return (
                                                    <HalfRed key={'trainStories3' + index} redText={
                                                        "" + story.date.substring(8, 10) + "/" +
                                                        story.date.substring(5, 7) + "/" +
                                                        story.date.substring(0, 4)
                                                    } blackText={story.entrainement_type.name}
                                                             onPress={() => {
                                                                 this.props.navigation.navigate("TrainSingle", {itemId: story.id})
                                                             }}/>
                                                )
                                            }
                                        })
                                    }

                                </View>

                                {/*<View style={[styles.blockSeparator]}></View>*/}
                            </View> : null
        )
    }

    trainStories2(paramDate){
        let count = 0;
        for(let i = 0; i < this.state.trainStories2.length; i++){
            if(this.state.trainStories2[i].date.substring(0, 4) == paramDate){
                count++
            }
        }
        return(
            this.state.trainStories2.length > 0 && count > 0 ?
                <View style={
                    // [styles.blockCtn]
                    {}}>
                                {/*<Text style={[styles.blockTitle]}>MARS</Text>*/}
                                <View style={[styles.blockStory]}>

                                    {
                                        this.state.trainStories2.map((story, index) => {
                                            if(story.date.substring(0, 4) == paramDate) {
                                                return (
                                                    <HalfRed key={'trainStories2' + index} redText={
                                                        "" + story.date.substring(8, 10) + "/" +
                                                        story.date.substring(5, 7) + "/" +
                                                        story.date.substring(0, 4)
                                                    } blackText={story.entrainement_type.name}
                                                             onPress={() => {
                                                                 this.props.navigation.navigate("TrainSingle", {itemId: story.id})
                                                             }}/>
                                                )
                                            }
                                        })
                                    }

                                </View>

                                {/*<View style={[styles.blockSeparator]}></View>*/}
                            </View> : null
        )
    }

    trainStories1(paramDate){
        let count = 0;
        for(let i = 0; i < this.state.trainStories1.length; i++){
            if(this.state.trainStories1[i].date.substring(0, 4) == paramDate){
                count++
            }
        }
        return(
            this.state.trainStories1.length > 0  && count > 0 ?
            <View style={
                // [styles.blockCtn]
                {}}>
                {/*<Text style={[styles.blockTitle]}>FEVRIER</Text>*/}
                <View style={[styles.blockStory]}>

                    {
                        this.state.trainStories1.map((story, index) => {
                            if(story.date.substring(0, 4) == paramDate) {
                                return (
                                    <HalfRed key={'trainStories1' + index} redText={
                                        "" + story.date.substring(8, 10) + "/" +
                                        story.date.substring(5, 7) + "/" +
                                        story.date.substring(0, 4)
                                    } blackText={story.entrainement_type.name}
                                             onPress={() => {
                                                 this.props.navigation.navigate("TrainSingle", {itemId: story.id})
                                             }}/>
                                )
                            }
                        })
                    }

                </View>
                {/*<View style={[styles.blockSeparator]}></View>*/}
            </View> : null
        )
    }

    trainStories0(paramDate){
        console.warn('trainstory0', this.state.trainStories0);
        let count = 0;
        for(let i = 0; i < this.state.trainStories0.length; i++){
            if(this.state.trainStories0[i].date.substring(0, 4) == paramDate){
                count++
            }
        }
        return(
            this.state.trainStories0.length > 0 && count > 0 ?
                <View style={
                    // [styles.blockCtn]
                    {}}>
                                {/*<Text style={[styles.blockTitle]}>JANVIER</Text>*/}
                                <View style={[styles.blockStory]}>

                                    {
                                        this.state.trainStories0.map((story, index) => {
                                            if(story.date.substring(0, 4) == paramDate){
                                                return (
                                                    <HalfRed key={'trainStories0'+index} redText={
                                                        "" + story.date.substring(8, 10) + "/" +
                                                        story.date.substring(5, 7) + "/" +
                                                        story.date.substring(0, 4)
                                                    } blackText={story.entrainement_type.name}
                                                             onPress={() => {
                                                                 this.props.navigation.navigate("TrainSingle",{ itemId: story.id})
                                                             }} />
                                                )
                                            }
                                        })
                                    }
                                </View>

                                {/*<View style={[styles.blockSeparator]}></View>*/}
                            </View> : null
        )
    }

    SortTime(a,b){
        let  da=new Date(a.date);
        let   db=new Date(b.date);
        return (da<db)?1:-1;
    }

    render() {
        if(this.props.popToTop === 'train'){
            this.props.navigation.popToTop();
            const setPopToTop = { type: SET_POP_TO_TOP, value: '' }
            this.props.dispatch(setPopToTop);
        }

        this.trainStoriesobj =[];

        if (this.props.trainStoriesobj !== null){
            this.trainStoriesobj = this.props.trainStoriesobj.data.sort(this.SortTime); //novaiko ity mi-sort via date
        }

        return (
            <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }} colors={[colors.balck, colors.green, colors.balck]} style={baseStyles.linearGradient}>
                <ScrollView
                    style={styles.scrollView}
                    contentContainerStyle={[styles.contentContainerStyle]}
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.refreshing}
                            onRefresh={() => {
                                this.setState({refreshing:true});
                                getUserTrains(TrainHelper,this.props,moment(new Date()).format('YYYY')).then((refreshinfalse)=>{
                                    this.setState({refreshing:refreshinfalse});
                                });
                            }}
                            tintColor={Platform.OS==='ios'?colors.white:colors.green}
                            colors={[Platform.OS==='ios'?colors.white:colors.green]}
                        />
                    }
                >
                    <View style={{ alignItems :"center",justifyContent:"center",width:"100%",marginTop:15  }}>
                        <TouchableOpacity
                            onPress={() => {
                               if(this.props.navigation.goBack()){}
                               else
                               {
                                    const setActiveTab = { type: SET_ACTIVE_TAB, value: "train" }
                                    this.props.dispatch(setActiveTab);


                                }
                            }}
                            style={{width:50,position:"absolute",left:0}}
                        >
                            <AutoHeightImage
                                width={18}
                                source={require('../../../assets/icons/left.arrow.white.png')}
                                style={{marginLeft:15}}
                            />
                        </TouchableOpacity>
                        <Text style={[baseStyles.titleText,{textAlign:"center"}]}>
                            {" Historique des entraînements"}
                        </Text>
                    </View>


                    <TouchableOpacity
                        onPress={()=>{
                            this.setState({showYear:true});
                        }
                        }
                    >
                    <View style={{flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "center",
                        width: screenWidth ,
                        marginVertical: 15}}>
                        <View>
                            <AutoHeightImage
                                width={18}
                                source={require("../../../assets/icons/left.arrow.white.png")} />
                        </View>
                        <View>
                            <Text style={[baseStyles.textColorWhite,{marginLeft:7}]}>{this.state.selectedAnnee}</Text>
                        </View>
                        <View>
                            <Text style={{ color: "#00000000",opacity:0 }}>.</Text>
                        </View>
                    </View>
                </TouchableOpacity>

                    {/*{this.trainStories11(2042)}*/}
                    {/*{this.trainStories10(2042)}*/}
                    {/*{this.trainStories9(2042)}*/}
                    {/*{this.trainStories8(2042)}*/}
                    {/*{this.trainStories7(2042)}*/}
                    {/*{this.trainStories6(2042)}*/}
                    {/*{this.trainStories5(2042)}*/}
                    {/*{this.trainStories4(2042)}*/}
                    {/*{this.trainStories3(2042)}*/}
                    {/*{this.trainStories2(2042)}*/}
                    {/*{this.trainStories1(2042)}*/}
                    {/*{this.trainStories0(2042)}*/}

                    {/*{this.trainStories11(2041)}*/}
                    {/*{this.trainStories10(2041)}*/}
                    {/*{this.trainStories9(2041)}*/}
                    {/*{this.trainStories8(2041)}*/}
                    {/*{this.trainStories7(2041)}*/}
                    {/*{this.trainStories6(2041)}*/}
                    {/*{this.trainStories5(2041)}*/}
                    {/*{this.trainStories4(2041)}*/}
                    {/*{this.trainStories3(2041)}*/}
                    {/*{this.trainStories2(2041)}*/}
                    {/*{this.trainStories1(2041)}*/}
                    {/*{this.trainStories0(2041)}*/}

                    {/*{this.trainStories11(2040)}*/}
                    {/*{this.trainStories10(2040)}*/}
                    {/*{this.trainStories9(2040)}*/}
                    {/*{this.trainStories8(2040)}*/}
                    {/*{this.trainStories7(2040)}*/}
                    {/*{this.trainStories6(2040)}*/}
                    {/*{this.trainStories5(2040)}*/}
                    {/*{this.trainStories4(2040)}*/}
                    {/*{this.trainStories3(2040)}*/}
                    {/*{this.trainStories2(2040)}*/}
                    {/*{this.trainStories1(2040)}*/}
                    {/*{this.trainStories0(2040)}*/}

                    {/*{this.trainStories11(2039)}*/}
                    {/*{this.trainStories10(2039)}*/}
                    {/*{this.trainStories9(2039)}*/}
                    {/*{this.trainStories8(2039)}*/}
                    {/*{this.trainStories7(2039)}*/}
                    {/*{this.trainStories6(2039)}*/}
                    {/*{this.trainStories5(2039)}*/}
                    {/*{this.trainStories4(2039)}*/}
                    {/*{this.trainStories3(2039)}*/}
                    {/*{this.trainStories2(2039)}*/}
                    {/*{this.trainStories1(2039)}*/}
                    {/*{this.trainStories0(2039)}*/}

                    {/*{this.trainStories11(2038)}*/}
                    {/*{this.trainStories10(2038)}*/}
                    {/*{this.trainStories9(2038)}*/}
                    {/*{this.trainStories8(2038)}*/}
                    {/*{this.trainStories7(2038)}*/}
                    {/*{this.trainStories6(2038)}*/}
                    {/*{this.trainStories5(2038)}*/}
                    {/*{this.trainStories4(2038)}*/}
                    {/*{this.trainStories3(2038)}*/}
                    {/*{this.trainStories2(2038)}*/}
                    {/*{this.trainStories1(2038)}*/}
                    {/*{this.trainStories0(2038)}*/}

                    {/*{this.trainStories11(2037)}*/}
                    {/*{this.trainStories10(2037)}*/}
                    {/*{this.trainStories9(2037)}*/}
                    {/*{this.trainStories8(2037)}*/}
                    {/*{this.trainStories7(2037)}*/}
                    {/*{this.trainStories6(2037)}*/}
                    {/*{this.trainStories5(2037)}*/}
                    {/*{this.trainStories4(2037)}*/}
                    {/*{this.trainStories3(2037)}*/}
                    {/*{this.trainStories2(2037)}*/}
                    {/*{this.trainStories1(2037)}*/}
                    {/*{this.trainStories0(2037)}*/}

                    {/*{this.trainStories11(2036)}*/}
                    {/*{this.trainStories10(2036)}*/}
                    {/*{this.trainStories9(2036)}*/}
                    {/*{this.trainStories8(2036)}*/}
                    {/*{this.trainStories7(2036)}*/}
                    {/*{this.trainStories6(2036)}*/}
                    {/*{this.trainStories5(2036)}*/}
                    {/*{this.trainStories4(2036)}*/}
                    {/*{this.trainStories3(2036)}*/}
                    {/*{this.trainStories2(2036)}*/}
                    {/*{this.trainStories1(2036)}*/}
                    {/*{this.trainStories0(2036)}*/}

                    {/*{this.trainStories11(2035)}*/}
                    {/*{this.trainStories10(2035)}*/}
                    {/*{this.trainStories9(2035)}*/}
                    {/*{this.trainStories8(2035)}*/}
                    {/*{this.trainStories7(2035)}*/}
                    {/*{this.trainStories6(2035)}*/}
                    {/*{this.trainStories5(2035)}*/}
                    {/*{this.trainStories4(2035)}*/}
                    {/*{this.trainStories3(2035)}*/}
                    {/*{this.trainStories2(2035)}*/}
                    {/*{this.trainStories1(2035)}*/}
                    {/*{this.trainStories0(2035)}*/}

                    {/*{this.trainStories11(2034)}*/}
                    {/*{this.trainStories10(2034)}*/}
                    {/*{this.trainStories9(2034)}*/}
                    {/*{this.trainStories8(2034)}*/}
                    {/*{this.trainStories7(2034)}*/}
                    {/*{this.trainStories6(2034)}*/}
                    {/*{this.trainStories5(2034)}*/}
                    {/*{this.trainStories4(2034)}*/}
                    {/*{this.trainStories3(2034)}*/}
                    {/*{this.trainStories2(2034)}*/}
                    {/*{this.trainStories1(2034)}*/}
                    {/*{this.trainStories0(2034)}*/}


                    {/*{this.trainStories11(2033)}*/}
                    {/*{this.trainStories10(2033)}*/}
                    {/*{this.trainStories9(2033)}*/}
                    {/*{this.trainStories8(2033)}*/}
                    {/*{this.trainStories7(2033)}*/}
                    {/*{this.trainStories6(2033)}*/}
                    {/*{this.trainStories5(2033)}*/}
                    {/*{this.trainStories4(2033)}*/}
                    {/*{this.trainStories3(2033)}*/}
                    {/*{this.trainStories2(2033)}*/}
                    {/*{this.trainStories1(2033)}*/}
                    {/*{this.trainStories0(2033)}*/}

                    {/*{this.trainStories11(2032)}*/}
                    {/*{this.trainStories10(2032)}*/}
                    {/*{this.trainStories9(2032)}*/}
                    {/*{this.trainStories8(2032)}*/}
                    {/*{this.trainStories7(2032)}*/}
                    {/*{this.trainStories6(2032)}*/}
                    {/*{this.trainStories5(2032)}*/}
                    {/*{this.trainStories4(2032)}*/}
                    {/*{this.trainStories3(2032)}*/}
                    {/*{this.trainStories2(2032)}*/}
                    {/*{this.trainStories1(2032)}*/}
                    {/*{this.trainStories0(2032)}*/}

                    {/*{this.trainStories11(2031)}*/}
                    {/*{this.trainStories10(2031)}*/}
                    {/*{this.trainStories9(2031)}*/}
                    {/*{this.trainStories8(2031)}*/}
                    {/*{this.trainStories7(2031)}*/}
                    {/*{this.trainStories6(2031)}*/}
                    {/*{this.trainStories5(2031)}*/}
                    {/*{this.trainStories4(2031)}*/}
                    {/*{this.trainStories3(2031)}*/}
                    {/*{this.trainStories2(2031)}*/}
                    {/*{this.trainStories1(2031)}*/}
                    {/*{this.trainStories0(2031)}*/}

                    {/*{this.trainStories11(2030)}*/}
                    {/*{this.trainStories10(2030)}*/}
                    {/*{this.trainStories9(2030)}*/}
                    {/*{this.trainStories8(2030)}*/}
                    {/*{this.trainStories7(2030)}*/}
                    {/*{this.trainStories6(2030)}*/}
                    {/*{this.trainStories5(2030)}*/}
                    {/*{this.trainStories4(2030)}*/}
                    {/*{this.trainStories3(2030)}*/}
                    {/*{this.trainStories2(2030)}*/}
                    {/*{this.trainStories1(2030)}*/}
                    {/*{this.trainStories0(2030)}*/}

                    {/*{this.trainStories11(2029)}*/}
                    {/*{this.trainStories10(2029)}*/}
                    {/*{this.trainStories9(2029)}*/}
                    {/*{this.trainStories8(2029)}*/}
                    {/*{this.trainStories7(2029)}*/}
                    {/*{this.trainStories6(2029)}*/}
                    {/*{this.trainStories5(2029)}*/}
                    {/*{this.trainStories4(2029)}*/}
                    {/*{this.trainStories3(2029)}*/}
                    {/*{this.trainStories2(2029)}*/}
                    {/*{this.trainStories1(2029)}*/}
                    {/*{this.trainStories0(2029)}*/}

                    {/*{this.trainStories11(2028)}*/}
                    {/*{this.trainStories10(2028)}*/}
                    {/*{this.trainStories9(2028)}*/}
                    {/*{this.trainStories8(2028)}*/}
                    {/*{this.trainStories7(2028)}*/}
                    {/*{this.trainStories6(2028)}*/}
                    {/*{this.trainStories5(2028)}*/}
                    {/*{this.trainStories4(2028)}*/}
                    {/*{this.trainStories3(2028)}*/}
                    {/*{this.trainStories2(2028)}*/}
                    {/*{this.trainStories1(2028)}*/}
                    {/*{this.trainStories0(2028)}*/}

                    {/*{this.trainStories11(2027)}*/}
                    {/*{this.trainStories10(2027)}*/}
                    {/*{this.trainStories9(2027)}*/}
                    {/*{this.trainStories8(2027)}*/}
                    {/*{this.trainStories7(2027)}*/}
                    {/*{this.trainStories6(2027)}*/}
                    {/*{this.trainStories5(2027)}*/}
                    {/*{this.trainStories4(2027)}*/}
                    {/*{this.trainStories3(2027)}*/}
                    {/*{this.trainStories2(2027)}*/}
                    {/*{this.trainStories1(2027)}*/}
                    {/*{this.trainStories0(2027)}*/}

                    {/*{this.trainStories11(2026)}*/}
                    {/*{this.trainStories10(2026)}*/}
                    {/*{this.trainStories9(2026)}*/}
                    {/*{this.trainStories8(2026)}*/}
                    {/*{this.trainStories7(2026)}*/}
                    {/*{this.trainStories6(2026)}*/}
                    {/*{this.trainStories5(2026)}*/}
                    {/*{this.trainStories4(2026)}*/}
                    {/*{this.trainStories3(2026)}*/}
                    {/*{this.trainStories2(2026)}*/}
                    {/*{this.trainStories1(2026)}*/}
                    {/*{this.trainStories0(2026)}*/}

                    {/*{this.trainStories11(2025)}*/}
                    {/*{this.trainStories10(2025)}*/}
                    {/*{this.trainStories9(2025)}*/}
                    {/*{this.trainStories8(2025)}*/}
                    {/*{this.trainStories7(2025)}*/}
                    {/*{this.trainStories6(2025)}*/}
                    {/*{this.trainStories5(2025)}*/}
                    {/*{this.trainStories4(2025)}*/}
                    {/*{this.trainStories3(2025)}*/}
                    {/*{this.trainStories2(2025)}*/}
                    {/*{this.trainStories1(2025)}*/}
                    {/*{this.trainStories0(2025)}*/}

                    {/*{this.trainStories11(2024)}*/}
                    {/*{this.trainStories10(2024)}*/}
                    {/*{this.trainStories9(2024)}*/}
                    {/*{this.trainStories8(2024)}*/}
                    {/*{this.trainStories7(2024)}*/}
                    {/*{this.trainStories6(2024)}*/}
                    {/*{this.trainStories5(2024)}*/}
                    {/*{this.trainStories4(2024)}*/}
                    {/*{this.trainStories3(2024)}*/}
                    {/*{this.trainStories2(2024)}*/}
                    {/*{this.trainStories1(2024)}*/}
                    {/*{this.trainStories0(2024)}*/}

                    {/*{this.trainStories11(2023)}*/}
                    {/*{this.trainStories10(2023)}*/}
                    {/*{this.trainStories9(2023)}*/}
                    {/*{this.trainStories8(2023)}*/}
                    {/*{this.trainStories7(2023)}*/}
                    {/*{this.trainStories6(2023)}*/}
                    {/*{this.trainStories5(2023)}*/}
                    {/*{this.trainStories4(2023)}*/}
                    {/*{this.trainStories3(2023)}*/}
                    {/*{this.trainStories2(2023)}*/}
                    {/*{this.trainStories1(2023)}*/}
                    {/*{this.trainStories0(2023)}*/}

                    {/*{this.trainStories11(2022)}*/}
                    {/*{this.trainStories10(2022)}*/}
                    {/*{this.trainStories9(2022)}*/}
                    {/*{this.trainStories8(2022)}*/}
                    {/*{this.trainStories7(2022)}*/}
                    {/*{this.trainStories6(2022)}*/}
                    {/*{this.trainStories5(2022)}*/}
                    {/*{this.trainStories4(2022)}*/}
                    {/*{this.trainStories3(2022)}*/}
                    {/*{this.trainStories2(2022)}*/}
                    {/*{this.trainStories1(2022)}*/}
                    {/*{this.trainStories0(2022)}*/}

                    {/*{this.trainStories11(2021)}*/}
                    {/*{this.trainStories10(2021)}*/}
                    {/*{this.trainStories9(2021)}*/}
                    {/*{this.trainStories8(2021)}*/}
                    {/*{this.trainStories7(2021)}*/}
                    {/*{this.trainStories6(2021)}*/}
                    {/*{this.trainStories5(2021)}*/}
                    {/*{this.trainStories4(2021)}*/}
                    {/*{this.trainStories3(2021)}*/}
                    {/*{this.trainStories2(2021)}*/}
                    {/*{this.trainStories1(2021)}*/}
                    {/*{this.trainStories0(2021)}*/}


                    {/*{this.trainStories11(2020)}*/}
                    {/*{this.trainStories10(2020)}*/}
                    {/*{this.trainStories9(2020)}*/}
                    {/*{this.trainStories8(2020)}*/}
                    {/*{this.trainStories7(2020)}*/}
                    {/*{this.trainStories6(2020)}*/}
                    {/*{this.trainStories5(2020)}*/}
                    {/*{this.trainStories4(2020)}*/}
                    {/*{this.trainStories3(2020)}*/}
                    {/*{this.trainStories2(2020)}*/}
                    {/*{this.trainStories1(2020)}*/}
                    {/*{this.trainStories0(2020)}*/}


                    {/*{this.trainStories11(2019)}*/}
                    {/*{this.trainStories10(2019)}*/}
                    {/*{this.trainStories9(2019)}*/}
                    {/*{this.trainStories8(2019)}*/}
                    {/*{this.trainStories7(2019)}*/}
                    {/*{this.trainStories6(2019)}*/}
                    {/*{this.trainStories5(2019)}*/}
                    {/*{this.trainStories4(2019)}*/}
                    {/*{this.trainStories3(2019)}*/}
                    {/*{this.trainStories2(2019)}*/}
                    {/*{this.trainStories1(2019)}*/}
                    {/*{this.trainStories0(2019)}*/}


                    <View style={{width:'100%',alignItems:'center'}}>
                    {
                        this.trainStoriesobj.map((item, index) => {

                                return <HalfRed key={("A_" + index)} redText={
                                    "" + item.date.substring(8, 10) + "/" +
                                    item.date.substring(5, 7) + "/" +
                                    item.date.substring(0, 4)
                                } blackText={ item.entrainement_type.name }
                                onPress={() => {
                                    console.warn("Half red clicked")
                                    let paramtrain = {itemId: item.id,trainStoriesobj:this.trainStoriesobj};
                                    const setParamtrainS = { type: SET_PARAM_TRAIN, value: paramtrain }
                                    this.props.dispatch(setParamtrainS);
                                    if(this.props.navigation.navigate("TrainSingle")){}
                                    else{
                                        const setActiveTab = { type: SET_ACTIVE_TAB, value: "trainsingle" }
                                        this.props.dispatch(setActiveTab);
                                    }
                                }} />

                        })
                    }
                    </View>















                    {/* <View style={[styles.blockCtn]}>
                        <Text style={[styles.blockTitle]}>FÉVRIER</Text>
                        <View style={[styles.blockStory]}>

                            <HalfRed redText={'08/02/19'} blackText={'Entraînement 1'}
                                onPress={() => {
                                    this.props.navigation.navigate("TrainSingle")
                                }} />

                            <HalfRed redText={'19/02/19'} blackText={'Entraînement 2'}
                                onPress={() => {
                                    this.props.navigation.navigate("TrainSingle")
                                }} />

                        </View>

                        <View style={[styles.blockSeparator]}></View>
                    </View>

                    <View style={[styles.blockCtn]}>
                        <Text style={[styles.blockTitle]}>MARS</Text>
                        <View style={[styles.blockStory]}>

                            <HalfRed redText={'14/03/19'} blackText={'Entraînement 1'}
                                onPress={() => {
                                    this.props.navigation.navigate("TrainSingle")
                                }} />

                            <HalfRed redText={'30/03/19'} blackText={'Entraînement 2'}
                                onPress={() => {
                                    this.props.navigation.navigate("TrainSingle")
                                }} />

                        </View>

                    </View> */}




                </ScrollView>
                <View style={{ alignItems: "center", justifyContent: "center", alignSelf: "center",marginBottom:30 }}>
                    <MAAButton text={"AJOUTER UN ENTRAÎNEMENT"}
                               height={40}
                               width={(screenWidth - 80)}
                               style={{ alignSelf: "center", }}
                               onPress={() => {
                                   if(this.props.navigation.navigate("AddTraining")){}
                                   else{
                                       const setActiveTab = { type: SET_ACTIVE_TAB, value: "AddTraining" }
                                       this.props.dispatch(setActiveTab);
                                   }
                               }} />
                </View>
                <Slidebottom showModal={this.state.showYear}
                             onRequestClose={()=>{
                                 this.setState({showYear:false});
                             }}
                             callback={(item,index)=>{
                                 this.setState({refreshing:true});
                                 getUserTrains(TrainHelper,this.props,item).then((refreshinfalse)=>{
                                     this.setState({refreshing:refreshinfalse});
                                 });

                                 this.setState({selectedAnnee:item,showYear:false})
                             }}
                             items={this.state.arrayAnnee}
                             component_item={(item)=>{
                                 return(

                                         <Text style={{color:'#373535'}}>{item}</Text>
                                 )
                             }}
                />
            </LinearGradient>
        )
    }
}

// export default History;
const mapStateToProps = (state) => {
    const { popToTop,userToken,trainStoriesobj } = state.statedata
    return { popToTop,userToken,trainStoriesobj }
};

export default connect(mapStateToProps)(History);
