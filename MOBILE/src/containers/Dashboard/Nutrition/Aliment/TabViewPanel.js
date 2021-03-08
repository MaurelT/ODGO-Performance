import * as React from 'react';
import {View, StyleSheet, Dimensions, ScrollView, Text, TouchableOpacity, StatusBar} from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';
import LinearGradient from "react-native-linear-gradient";
import colors from '../../../../configs/colors';
import AutoHeightImage from 'react-native-auto-height-image';
import { TabBar } from 'react-native-tab-view';
import statusBarHeight from '../../../../configs/screen';


const screen = Dimensions.get("window");
const SBHelight = statusBarHeight;
const screenWidth = screen.width
const screenHeight = screen.height - SBHelight;


    this.ajouterstyle={width:screenWidth*0.2,height:screenWidth*0.06,backgroundColor:'#FF3A28',justifyContent:'center',alignItems:'center',borderRadius:6}
    this.nosSuggestions = [
    {
        id:1,
        name:'Produits frais',
        aliment:[
            {id:1,name:'Oeuf',kilocalorie:30, quantite:3,color:'yellow'},
        ]
    },
    {
        id:2,
        name:'Viandes & poissons',
        aliment:[
            {id:1,name:'Bacon',kilocalorie:948, quantite:3,color:'red'},
            {id:2,name:'Bavette',kilocalorie:310, quantite:3,color:'red'},
        ]
    },
    {
        id:3,
        name:'Pain & pâtisseries',
        aliment:[
            {id:1,name:'Pain de mie',kilocalorie:948, quantite:3,color:'yellow'},
            {id:2,name:'Croissant',kilocalorie:948, quantite:3,color:'yellow'},
        ]
    },

    {
        id:4,
        name:'Fruits & légumes',
        aliment:[
            {id:1,name:'Bananes',kilocalorie:948, quantite:3,color:'green'},
            {id:2,name:'Pomme',kilocalorie:1000, quantite:3,color:'green'},
            {id:2,name:'Poire',kilocalorie:150, quantite:30,color:'green'},
            {id:2,name:'Courgette',kilocalorie:500, quantite:10,color:'green'},
        ]
    },
],
    this.mesRepas= [
    {
        id:1,name:'Oeuf Bacon',kilocalorie:30, thumbnail:'https://theme4press.com/wp-content/uploads/2015/11/featured-small-circular.jpg'
    },
    {
        id:2,name:'Oeuf Bacon',kilocalorie:30, thumbnail:'https://theme4press.com/wp-content/uploads/2015/11/featured-small-circular.jpg'
    },
    {
        id:3,name:'Oeuf Bacon',kilocalorie:948, thumbnail:'https://theme4press.com/wp-content/uploads/2015/11/featured-small-circular.jpg'
    },
]

const FirstRoute = () => (
    <ScrollView style={{width:'100%',marginTop:screenWidth*0.03,paddingBottom:screenWidth*0.3}}>
        <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }} colors={[colors.balck, colors.green,  '#213D2E']} style={{paddingBottom:screenWidth*0.12}}>
            {
                this.nosSuggestions.length>0 && this.nosSuggestions.map(
                    (item)=>{
                        return(
                            <View style={{flexDirection:'column',justifyContent:'flex-start',backgroundColor:'#14261D'}}>
                                <Text style={{color:'#7c8e85',paddingLeft:screenWidth*0.07,fontSize:13,paddingTop:2,paddingBottom:3}}>{item.name}</Text>
                                {
                                    item.aliment.length>0 && item.aliment.map(
                                        (item1)=>{
                                            return(
                                                <View style={{  //item1
                                                    flexDirection:'row',
                                                    alignItems:'center',
                                                    justifyContent:'space-between',
                                                    width:'100%',
                                                    height:screenWidth*0.09,
                                                    backgroundColor:'#213D2E',
                                                    marginBottom:2
                                                }}>
                                                    <View style={{flexDirection:'row',alignItems:'center',width:'28%',height:screenWidth*0.09}}>
                                                        <View style={{borderRadius:screenWidth*0.04,width:screenWidth*0.04,height:screenWidth*0.04,backgroundColor:item1.color,marginLeft:screenWidth*0.03}}/>
                                                        <Text style={{color:'#b4c1b9',marginLeft:20,fontSize:12}}>{item1.name}</Text>
                                                    </View>
                                                    <View style={{width:'25%',height:screenWidth*0.09,justifyContent: 'center',alignItems:'flex-start'}}>
                                                        <Text style={{color:'#8e9992',fontSize:11,paddingLeft:screenWidth*0.05}}>{item1.kilocalorie} Kcal</Text>
                                                    </View>
                                                    {/*<View style={{}}>*/}
                                                    <View style={{width:'25%',justifyContent:'center',height:screenWidth*0.09,alignItems:'flex-start',paddingLeft:screenWidth*0.03}}>
                                                        <Text style={{color:'#8e9992',fontSize:11}}>Quantité : {item1.quantite}</Text>
                                                    </View>
                                                    <View style={{width:'20%',justifyContent:'center',marginRight:10,height:screenWidth*0.09}}>
                                                        <TouchableOpacity style={this.ajouterstyle}>
                                                            <Text style={{color:'white',fontSize:12}}>{'Ajouter'}</Text>
                                                        </TouchableOpacity>
                                                    </View>
                                                </View>
                                            )
                                        }
                                    )}
                            </View>
                        )
                    }
                )
            }
        </LinearGradient>
    </ScrollView>
);

const SecondRoute = () => (
    <ScrollView style={{width:'100%',marginTop:screenWidth*0.03,}}>
        <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }} colors={[colors.balck, colors.green,  '#213D2E']} style={{paddingBottom:screenWidth*0.12,height:screenWidth*1.2}}>

            {
                this.mesRepas.length>0 && this.mesRepas.map(


                    (item1)=>{
                        return(
                            <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between',width:'100%',height:screenWidth*0.13,backgroundColor:'#213D2E',marginBottom:2}}>
                                <View style={{flexDirection:'row',alignItems:'center',width:'25%'}}>

                                    <AutoHeightImage
                                        width={35}
                                        source={{uri:item1.thumbnail}}
                                        style={{
                                            marginLeft:10,
                                            borderRadius: 40
                                        }}
                                    />
                                    <Text style={{color:'#b4c1b9',marginLeft:20,fontSize:12}}>{item1.name}</Text>
                                </View>
                                <View style={{alignItems:'flex-start',justifyContent:'flex-end'}}>
                                    <Text style={{color:'#8e9992',marginLeft:20,fontSize:12,}}>{item1.kilocalorie}Kcal</Text>
                                </View>
                                <View style={{width:'20%',justifyContent:'center',marginRight:10,}}>
                                    <TouchableOpacity style={this.ajouterstyle}>
                                        <Text style={{color:'white',fontSize:12}}>{'Ajouter'}</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        )
                    }

                )
            }
        </LinearGradient>
    </ScrollView>
);

const Thirdroute  = () => (

    <ScrollView style={{width:'100%',marginTop:screenWidth*0.03,}}>
        <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }} colors={[colors.balck, colors.green,  '#213D2E']} style={{paddingBottom:screenWidth*0.12}}>

            {
                this.nosSuggestions.length>0 && this.nosSuggestions.map(
                    (item)=>{
                        return(
                            <View style={{flexDirection:'column',justifyContent:'flex-start',backgroundColor:'#14261D'}}>
                                <Text style={{color:'#7c8e85',paddingLeft:screenWidth*0.07,fontSize:13,paddingTop:2,paddingBottom:3}}>{item.name}</Text>
                                {
                                    item.aliment.length>0 && item.aliment.map(
                                        (item1)=>{
                                            return(
                                                <View style={{  //item1
                                                    flexDirection:'row',
                                                    alignItems:'center',
                                                    justifyContent:'space-between',
                                                    width:'100%',
                                                    height:screenWidth*0.09,
                                                    backgroundColor:'#213D2E',
                                                    marginBottom:2
                                                }}>
                                                    <View style={{flexDirection:'row',alignItems:'center',width:'28%',height:screenWidth*0.09}}>
                                                        <View style={{borderRadius:this.borderradiuscirclecolored,width:this.borderradiuscirclecolored,height:this.borderradiuscirclecolored,backgroundColor:item1.color,marginLeft:screenWidth*0.03}}/>
                                                        <Text style={{color:'#b4c1b9',marginLeft:20,fontSize:12}}>{item1.name}test</Text>
                                                    </View>
                                                    <View style={{width:'25%',height:screenWidth*0.09,justifyContent: 'center',alignItems:'flex-start'}}>
                                                        <Text style={{color:'#8e9992',fontSize:11,paddingLeft:screenWidth*0.05}}>{item1.kilocalorie} Kcal</Text>
                                                    </View>
                                                    {/*<View style={{}}>*/}
                                                    <View style={{width:'25%',justifyContent:'center',height:screenWidth*0.09,alignItems:'flex-start',paddingLeft:screenWidth*0.03}}>
                                                        <Text style={{color:'#8e9992',fontSize:11}}>Quantité : {item1.quantite}</Text>
                                                    </View>
                                                    <View style={{width:'20%',justifyContent:'center',marginRight:10,height:screenWidth*0.09}}>
                                                        <TouchableOpacity style={this.ajouterstyle}>
                                                            <Text style={{color:'white',fontSize:12}}>{'Ajouter'}</Text>
                                                        </TouchableOpacity>
                                                    </View>
                                                </View>
                                            )
                                        }
                                    )}
                            </View>
                        )
                    }
                )
            }
        </LinearGradient>
    </ScrollView>
);

const initialLayout = { width: screenWidth };





export default function TabViewPanel() {
    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { key: 'first', title: 'Nos suggestions' },
        { key: 'second', title: 'Mes repas' },
        { key: 'third', title: 'Consommé récemment' },
    ]);

    const renderScene = SceneMap({
        first: FirstRoute,
        second: SecondRoute,
        third: Thirdroute,
    });



    this.coloronIndexChange ='red';
    this.itemscrollablemesrepas = ["Petit-déjeuner", "Déjeuner", "Collation","Dîner"];
    this.indexrepas =0;

    return (
        <TabView
            navigationState={{ index, routes }}
            renderScene={renderScene}
            onIndexChange={setIndex}
            initialLayout={initialLayout}

            renderTabBar={(props) => {
                return(
                    <View style={{ marginBottom:-12,}}>
                    <TabBar
                        {...props}
                        activeColor={'yellow'}
                        indicatorStyle={{ backgroundColor: '#FF3A28' }}
                    //    getLabelText={({ route }) => { return(<Text>{route.title}</Text>)}}
                        style={{
                                backgroundColor: '#213D2E',
                                //marginTop:-20,
                                fontSize:11,
                                }}
                        // onTabPress={({ route }) => {
                        //     if (route.key === 'first') {
                        //
                        //         console.warn('bob')
                        //         // Do something else
                        //     }
                        // }}
                        onIndexChange={
                            // console.warn('index',index)
                            this.coloronIndexChange ='#FF3A28'//orange
                        }
                        renderLabel={({ route, focused, color }) =>{
                            if(route.key==='first' && index === 0){
                                return (
                                    <Text style={{ color:this.coloronIndexChange, margin: 8, }}>
                                        {route.title}
                                    </Text>
                                )
                            }else if(route.key==='second' && index === 1){
                                return (
                                    <Text style={{ color:this.coloronIndexChange, margin: 8 }}>
                                        {route.title}
                                    </Text>
                                )
                            }else if(route.key==='third' && index === 2){
                                return (
                                    <Text style={{ color:this.coloronIndexChange, margin: 8 }}>
                                        {route.title}
                                    </Text>
                                )
                            }else{
                                //gray
                                return (
                                    <Text style={{ color:'#84968d', margin: 8 }}>
                                        {route.title}
                                    </Text>
                                )
                            }
                         }
                        }
                    />
                {
                    index === 1 &&
                    <View style={{height:screenWidth*0.08, flexDirection:'row',alignItems:'center',justifyContent: 'space-between',backgroundColor: '#15261d',paddingHorizontal:12}}>
                        <TouchableOpacity
                            onPress={()=>{

                                this.indexrepas = this.indexrepas -1
                                console.warn(this.indexrepas)
                            }}
                        >
                        <AutoHeightImage
                            width={14}
                            style={{ transform: [{ rotateY: "180deg" }],}}
                            source={require('../../../../assets/icons/arrow-white.png')} />
                        </TouchableOpacity>
                        <Text style={{color: 'white'}}>
                            {
                            this.indexrepas
                        }</Text>
                        <TouchableOpacity
                            onPress={()=>{
                                this.indexrepas = this.indexrepas + 1
                                console.warn(this.indexrepas)
                            }}
                        >
                        <AutoHeightImage
                            width={14}
                            source={require('../../../../assets/icons/arrow-white.png')} />
                        </TouchableOpacity>
                    </View>
                }
               </View>
                )
            }}


        />
    );
}


