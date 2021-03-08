import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    Dimensions,
    StatusBar,
    ScrollView,
    View,
    TouchableOpacity,
    Text,
    ImageBackground, RefreshControl
} from 'react-native';
import colors from '../../../configs/colors';
import baseStyles from '../../../base/BaseStyles';
import LinearGradient from 'react-native-linear-gradient';
import styles from './styles';
import AutoHeightImage from 'react-native-auto-height-image';
import {SET_ACTIVE_TAB, SET_POP_TO_TOP} from '../../../redux/types/tabTypes';
import hydratationHelper from "../../../apis/helpers/hydratation_helper";
import statusBarHeight from '../../../configs/screen';
import {getDashboar} from '../../../apis/FonctionRedondant';
import dashboardHelper from '../../../apis/helpers/dashboard_helper';

const screen = Dimensions.get("window");
const SBHelight = statusBarHeight;
const screenWidth = screen.width
const screenHeight = screen.height - SBHelight

class Hydratation extends Component {
    constructor(props) {
        super(props)
        this.state = {
            listEnergy: props.listEnergy,
            heightBleu: 0,
            popToTop:props.popToTop,
            userToken:props.userToken,
            hydratations:null,
            count:null,
            hydratationContenantId:1,
            hydratationContenantUnite:'Verres',
            pluriels:false,
            nombredeverre:null,
            heightBleuaffiche:0,
        }
    }
    // componentDidMount() {
    // let Hauteur = 0
    // ((screenWidth * 0.5)-10)
    // let Hauteur = (this.state.heightBleu * screenWidth*0.5)/100
    // console.log("Hauteur:", Hauteur)
    // this.setState({ heightBleu: Hauteur })

    // }

   async componentDidMount() {
       this.getContenantandCount()
       this.getNombreDeVerre()
    }

    getNombreDeVerre = async () => {
        this.setState({refreshing: true});
        const nombredeverre = await hydratationHelper.getNombreDeVerre(this.props.userToken,this.state.hydratationContenantId);
        if (nombredeverre) {
            console.warn('nombre de verre',nombredeverre)
            this.setState({refreshing: false,nombredeverre:nombredeverre});
        }
    };

    subcount = async () => {
        this.setState({refreshing: true});
        // console.warn(this.state.userToken,this.state.hydratationContenantId);
        const subcount = await hydratationHelper.subCount(this.props.userToken,this.state.hydratationContenantId);
        if (subcount) {
            this.getCountOnly();
            this.getNombreDeVerre();
            getDashboar(dashboardHelper,this.props).then(()=>{})
            this.setState({refreshing: false});
        }
    };

    addcount = async () => {
        this.setState({refreshing: true});
        console.warn('ContenantId',this.state.hydratationContenantId)
        const addcount = await hydratationHelper.addCount(this.props.userToken,this.state.hydratationContenantId);
        if (addcount) {
            //console.warn('addcount',addcount);
            this.getCountOnly();
            this.getNombreDeVerre();
            getDashboar(dashboardHelper,this.props).then(()=>{})
            this.setState({refreshing: false});
        }
    };

    getContenantandCount = async () => {
        this.setState({refreshing: true});
        const hydratation = await hydratationHelper.getContenant(this.props.userToken);
        if (hydratation) {
            if(hydratation.success === true) {
                // console.warn(hydratation)
                this.setState({hydratations:hydratation});
                const count = await hydratationHelper.getCount(this.props.userToken,hydratation.data[0].id);
                if(count.success === true) {
                    this.setState({refreshing: false,count:count,hydratationContenantId:hydratation.data[0].id
                    })
                    if(hydratation.data[0].id ===1){
                        // if(count.data.current > count.data.obj){
                        //     this.setState({heightBleu:100})
                        // }else{
                           let msi = ((count.data.current*100)/count.data.obj);
                           console.warn(count.data.current/count.data.obj);
                           if(count.data.current== 0 && count.data.obj ==0){
                               this.setState({heightBleu:0})
                           }else{
                               this.setState({heightBleu:msi})
                           }
                        let hydracount = msi;
                        this.setState({heightBleuaffiche:hydracount})
                        // }
                    }
                }else {
                    this.setState({refreshing: false})//na goback
                }
            } else {
                this.setState({refreshing: false}) //na goback
            }
        }
    }

        getCountOnly = async () => {
            const count = await hydratationHelper.getCount(this.props.userToken,this.state.hydratationContenantId);
            if(count.success === true) {
                this.setState({refreshing: false,count:count});
                if(count.data.current>1){
                    this.setState({pluriels:true})
                }else{
                    this.setState({pluriels:false})
                }
                if(this.state.hydratationContenantId ===1){
                    if(count.data.current > count.data.obj){
                        this.setState({heightBleu:100})
                    }else{
                        this.setState({heightBleu:(count.data.current*100)/count.data.obj})
                    }
                    let hydracount = (count.data.current*100)/count.data.obj
                    this.setState({heightBleuaffiche:hydracount})

                } else if(this.state.hydratationContenantId ===2){
                    console.warn('ok',count.data.current ,count.data.obj)
                    if(count.data.current > count.data.obj){
                        this.setState({heightBleu:100})
                    }else{
                        let msi = (count.data.current*100)/count.data.obj;
                        this.setState({heightBleu:msi})
                    }
                    let hydracount = (count.data.current*100)/count.data.obj
                    this.setState({heightBleuaffiche:hydracount})

                }else if(this.state.hydratationContenantId ===3){
                    if(count.data.current > count.data.obj){
                        this.setState({heightBleu:100})
                    }else{
                        let msi =(count.data.current*100)/count.data.obj;
                        this.setState({heightBleu:msi})
                    }
                    let hydracount = (count.data.current*100)/count.data.obj
                    this.setState({heightBleuaffiche:hydracount})
                }
            }else {
                this.setState({refreshing: false})//na goback
            }
        }

    render() {

        let isrestrictget_besoin_hydro = false;
        if(this.props.droits.length>0){
            for(let i = 0; i < this.props.droits.length; i++){
                if(this.props.droits[i].name === "get_besoin_hydro"){
                    isrestrictget_besoin_hydro = this.props.droits[i].is_restrict;
                    break;
                }
            }
        }

        if(this.props.popToTop === 'home'){
            this.props.navigation.popToTop();
            const setPopToTop = { type: SET_POP_TO_TOP, value: '' }
            this.props.dispatch(setPopToTop);
            // return null;
        }
        return (
            <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }} colors={[colors.balck, colors.green, colors.balck]} style={baseStyles.linearGradient}>

                <ScrollView
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.refreshing}
                            onRefresh={() => {
                                console.log("Refreshing...")
                                this.setState({ refreshing: true })
                                setTimeout(() => {
                                    console.log("Refresh finished.")
                                    this.setState({ refreshing: false })
                                }, 1000)
                                // this.animateTiming()

                            }}
                            tintColor={colors.green}
                            colors={[colors.green]}
                        />
                    }
                    contentInsetAdjustmentBehavior="automatic"
                    style={styles.scrollView}
                    contentContainerStyle={[styles.contentContainerStyle]}>
                    <View style={{ alignItems :"center",justifyContent:"center",width:"100%",marginTop:15  }}>
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
                            {"Hydratation"}
                        </Text>
                    </View>
                    <View style={styles.bodyHydratation}>
                        <View style={[styles.headTitreOjectif,{}]}>
                            <Text style={styles.textObectif}>{"Objectif quotidien".toUpperCase()}</Text>
                            <Text style={[styles.textObectif, { fontWeight: "bold", fontSize: 16 ,marginTop:12,color:!isrestrictget_besoin_hydro ?'white':colors.textgrisee}]}>{!isrestrictget_besoin_hydro ? (this.state.count !== null ? this.state.count.data.obj : 0):0}{!isrestrictget_besoin_hydro ? (" litres".toUpperCase()):" LITRE"}</Text>
                        </View>
                        <Text style={{marginTop:15,color:'white',fontSize:15}}>{"Choisir votre contenant"}</Text>

                        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-evenly",
                            // marginTop: screenWidth * 0.25,
                            marginTop: 15,
                            marginBottom:10 }}>
                            <TouchableOpacity
                                onPress={()=>{
                                    this.setState({hydratationContenantId:1,hydratationContenantUnite:'Verres'},() => {
                                        this.getCountOnly();
                                        this.getNombreDeVerre()
                                    })
                                }}

                                style={[styles.hydrateElem, this.state.hydratationContenantId === 1 ? { backgroundColor: colors.bleuHydratation, borderTopLeftRadius: 10, borderBottomLeftRadius: 10 }
                                    :{ backgroundColor: colors.bleuClairHydratation, borderTopLeftRadius: 10, borderBottomLeftRadius: 10 }
                                ]}>
                                <AutoHeightImage
                                    source={require("../../../assets/images/verre.1.png")}
                                    width={screenHeight * 0.015}
                                    style={{ margin: 5 }} />
                                <Text style={[baseStyles.textColorWhite, { fontSize: 12, color: "lightgrey" }]}>
                                    {/*+ 250 ml*/}
                                    + {this.state.hydratations !== null && this.state.hydratations.data[0].contenance_ml} ml
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={()=>{
                                    this.setState({hydratationContenantId:2,hydratationContenantUnite:'Petites bouteilles'},() => {
                                        this.getCountOnly()
                                        this.getNombreDeVerre()
                                    })
                                }}

                                style={[styles.hydrateElem, this.state.hydratationContenantId === 2 ? { backgroundColor: colors.bleuHydratation }
                                    :{ backgroundColor: colors.bleuClairHydratation }
                                ]}
                            >
                                <AutoHeightImage
                                    source={require("../../../assets/images/water.png")}
                                    width={screenHeight * 0.015}
                                    style={{ margin: 5 }} />
                                <Text style={[baseStyles.textColorWhite, { fontSize: 12 }]}>
                                    {/*+ 500 ml*/}
                                    + {this.state.hydratations !== null && this.state.hydratations.data[1].contenance_ml} ml

                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.hydrateElem, { backgroundColor: colors.bleuClairHydratation, borderTopRightRadius: 10, borderBottomRightRadius: 10 }]}

                                onPress={()=>{
                                    this.setState({hydratationContenantId:3,hydratationContenantUnite:'Grandes bouteilles'},() => {
                                        this.getCountOnly()
                                        this.getNombreDeVerre()
                                    })
                                }}
                                style={[styles.hydrateElem, this.state.hydratationContenantId === 3 ? { backgroundColor: colors.bleuHydratation, borderTopRightRadius: 10, borderBottomRightRadius: 10 }
                                    :{backgroundColor: colors.bleuClairHydratation, borderTopRightRadius: 10, borderBottomRightRadius: 10 }
                                ]}
                            ><AutoHeightImage
                                    source={require("../../../assets/images/water.png")}
                                    width={screenHeight * 0.02}
                                    style={{ margin: 5 }} />
                                <Text style={[baseStyles.textColorWhite, { fontSize: 12 }]}>
                                    {/*+ 1 litres*/}
                                    + {this.state.hydratations !== null && this.state.hydratations.data[2].contenance_ml/1000} l
                                </Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ marginHorizontal:7}}></View>
                        <Text style={{ marginTop:15,fontSize:13,color:'white'}}>Mettre à jour ma consommation hydrique</Text>
                        <View style={styles.panelIncreDecreHydratation}>
                            <TouchableOpacity
                                onPress={()=>{
                                    this.subcount()
                                }}
                                style={styles.btnHydrat}>
                                <Text style={styles.textBtnHydrat}>-</Text>
                            </TouchableOpacity>
                            <View style={{ marginHorizontal:20,overflow: "hidden", flexDirection: "column-reverse", width: screenWidth * 0.5, height: screenWidth * 0.5, borderRadius: screenWidth * 0.25, borderWidth: 10, borderColor:"#000000" }}>
                                <LinearGradient
                                    start={{ x: 0, y: 0 }}
                                    end={{ x: 1, y: 1 }}
                                    colors={[colors.bleuHydratation,colors.bleuClairHydratation, colors.bleuHydratation, colors.bleuClairHydratation]}
                                    style={{ width: "100%", height: this.state.heightBleu + "%", borderTopWidth:5, borderTopColor:colors.bleuClairHydratation }}
                                >
                                </LinearGradient>
                            </View>
                            <TouchableOpacity
                                onPress={()=>{
                                    this.addcount()
                                }}
                                style={styles.btnHydrat}>
                                <Text style={styles.textBtnHydrat}>+</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={{ marginTop:-screenWidth*0.35}}>
                            <View style={{flexDirection:"row",alignSelf:'center'}}>
                                <Text style={{ alignSelf:"flex-end",fontWeight: "bold", fontSize: 36, color: colors.white }}>{isNaN(this.state.heightBleuaffiche) ?0 :(this.state.heightBleuaffiche % 1 != 0 ? this.state.heightBleuaffiche.toFixed(2) : this.state.heightBleuaffiche )}</Text>
                                <Text style={{alignSelf:"flex-start", fontSize: 24, color: colors.white }}>%</Text>
                            </View>
                            <Text style={{ fontSize: 10, color: colors.white,textAlign:'center' }}>de l'objectif</Text>
                        </View>
                        <View style={{ margin:7}}></View>

                        <View style={{flexDirection:"row",
                            alignItems:"center",
                            marginTop:screenHeight*0.11,marginBottom:20}}>
                            {/*<TouchableOpacity*/}
                            {/*    onPress={()=>{*/}
                            {/*        this.subcount()*/}
                            {/*    }}*/}
                            {/*    style={styles.btnHydrat}>*/}
                            {/*    <Text style={styles.textBtnHydrat}>-</Text>*/}
                            {/*</TouchableOpacity>*/}
                            <Text style={{
                                color:colors.white,
                                fontSize:14,}}>
                                {/*{this.state.count !== null && this.state.count.data.current}/20 {this.state.hydratationContenantUnite }*/}
                                {/*{this.state.nombredeverre !== null && this.state.nombredeverre.data.count}/{this.state.hydratationContenantId ===1 ? this.state.nombredeverre.data.max:this.state.hydratationContenantId ===2 ? this.state.nombredeverre.data.max : this.state.hydratationContenantId ===3 && this.state.nombredeverre.data.max } {this.state.hydratationContenantId ===1 && (this.state.nombredeverre !== null && (this.state.nombredeverre.data.count ===0 ||this.state.nombredeverre.data.count === 1)) ? "Verre" : this.state.hydratationContenantId ===2 && (this.state.nombredeverre !== null && (this.state.nombredeverre.data.count ===0 ||this.state.nombredeverre.data.count === 1)) ? "Petite bouteille":this.state.hydratationContenantId ===3 && (this.state.nombredeverre !== null && (this.state.nombredeverre.data.count ===0 ||this.state.nombredeverre.data.count === 1))? "Grande bouteille" : this.state.hydratationContenantUnite }*/}
                                {this.state.nombredeverre !== null &&( this.state.nombredeverre.data.count % 1 !== 0 ? this.state.nombredeverre.data.count.toFixed(2):this.state.nombredeverre.data.count)}{!isrestrictget_besoin_hydro && "/"}{!isrestrictget_besoin_hydro && (this.state.nombredeverre !== null && this.state.nombredeverre.data.max)} {(this.state.hydratationContenantId ===1 && (this.state.nombredeverre !== null && (this.state.nombredeverre.data.count ===0 ||this.state.nombredeverre.data.count === 1))) ? "Verre" :( this.state.hydratationContenantId ===2 && ((this.state.nombredeverre !== null && (this.state.nombredeverre.data.count ===0 ||this.state.nombredeverre.data.count === 1))) ? "Petite bouteille" : this.state.hydratationContenantId ===3 && ((this.state.nombredeverre !== null && (this.state.nombredeverre.data.count ===0 ||this.state.nombredeverre.data.count === 1))) ? "Grande bouteille" : this.state.hydratationContenantUnite)}
                            </Text>
                            {/*<TouchableOpacity*/}
                            {/*    onPress={()=>{*/}
                            {/*        this.addcount()*/}
                            {/*    }}*/}
                            {/*    style={styles.btnHydrat}>*/}
                            {/*    <Text style={styles.textBtnHydrat}>+</Text>*/}
                            {/*</TouchableOpacity>*/}
                        </View>
                    </View>



                </ScrollView>

            </LinearGradient>
        )
    }
}
// export default Hydratation;

const mapStateToProps = (state) => {
    const { popToTop, userToken,droits } = state.statedata
    return { popToTop, userToken,droits }
};

export default connect(mapStateToProps)(Hydratation);
