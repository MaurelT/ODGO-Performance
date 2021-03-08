import React, { Fragment, Component } from 'react';
import { connect } from 'react-redux';
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    View,
    Dimensions,
    StyleSheet, TouchableOpacity, Platform
} from 'react-native';
import ODGOHeader from '../components/ODGOHeader/ODGOHeader';
import ODGOFooter from '../components/ODGOFooter/ODGOFooter';
import DashboardNavigator from './Dashboard/';
import SanteContainer from './Sante';
import {SET_ACTIVE_TAB, SET_POP_TO_TOP} from '../redux/types/tabTypes';
import PerfoNavigator from './Performance';
import TrainContainer from './Training';
import colors from '../configs/colors';
import Message from './Message/Message';
import DeclareNavigator from './Dashboard/FichePedag/Declarer/';
import FichePedagNavigator from './Dashboard/FichePedag/';
import Calendarwithplugin from './CalendarWithPlugin/CalendarWithPlugin';
import Login from "./Login/Login";
import CompteurNutritionnel from './Dashboard/Nutrition'; // j'ai changé l'appel direct de compteurNutritionnel en appel de route-index
import Hydratation from './Performance/Hydratation/Hydratation';
import Sommeil from './Performance/Statistic/Energetique/sommeil';
import AddTraining from './Training/NewTraining/AddTraining';
import DeclarerCompetition from './Dashboard/FichePedag/DonneesPerso/DeclarerCompetition';
import DeclarerMatch from './Dashboard/FichePedag/DonneesPerso/DeclarerMatch';
import ActiviteProgrammes from "./Dashboard/FichePedag/ActiviteProgrammes/ActiviteProgrammes";
import DonneePerso from "./Dashboard/FichePedag/DonneesPerso/DonneesPerso";
import Myenergyviadatapersoempty from "../containers/Dashboard/MyEnergiy/MyEnergy";
import MesroutinesProtocoles from "../containers/Training/Protocoles/protocoles";//routes
import MonPlaning from "../containers/Dashboard/FichePedag/Masemaine/Masemaine";//routes
import Videotheque from "../containers/Training/Programs/Programs";
import Mamobilite from "../containers/Training/History/Videothequesquelette";
import Colonneleftright from "../containers/Training/History/Mamobilite";
import Tensionvideo from "../containers/Training/History/Tensionvideo";
import Carnet from "../containers/Dashboard/Carnet/Carnet";
import Pathologie from "../containers/Sante/Pathologie/Pathologie";
import MonPhysique from "../containers/Dashboard/FichePedag/MonPhysique/MonPhysique";
import Mobilites from "../containers/Dashboard/FichePedag/MonPhysique/Mobilites";
import TestMobilites from "../containers/Dashboard/FichePedag/MonPhysique/TestMoblilites";
import TestMobilitesUnitaires from "../containers/Dashboard/FichePedag/MonPhysique/TestMobilitesUnitaires";
import Montestunit from "../containers/Dashboard/FichePedag/MonPhysique/Montestunit";
import AddBlessure from "../containers/Sante/AddBlessure/AddBlessure";
import AddTension from "../containers/Sante/AddTension/AddTension";
import ListeLeftRightFoot from "../containers/Training/History/ListeVideoBycolonneLeftRight";
import SingleExercice from "../containers/Training/SingleExercice/SingleExercice";
import History from "../containers/Training/History/History";
import Trainsingle from "../containers/Training/TrainSingle/TrainSingle";
import Entrainement from "../containers/Training/Training";
import statusBarHeight from '../configs/screen';
import phoneType from '../configs/typePhone';
import {createAppContainer, createStackNavigator} from 'react-navigation';

const screen = Dimensions.get("window");
const SBHelight = statusBarHeight;
const screenWidth = screen.width
const screenHeight = screen.height - SBHelight

const style = StyleSheet.create({
    pr: {
        // maxHeight: screenHeight,
        // minHeight: screenHeight,
        backgroundColor: colors.balck,
        flexDirection: "column",
        display: "flex",
        flex: 1
    }
})


class TabContainer extends Component {

    constructor(props) {
        super(props)
        this.state = {
            activeTab: props.activeTab,
            dashBoard: <DashboardNavigator />,
            donneeperso: <DonneePerso navigation={this.props.navigation}  />,
            sante: <SanteContainer />,
            perfo: <PerfoNavigator />,
            train:<TrainContainer />,
            // train:
            //     // (<View style={{
            //     //     // minHeight: (screenHeight - 130)
            //     //     flex:1
            //     // }}>
            //         <TrainContainer />
            //     {/*</View>),*/}
            message: <Message />,
            declare: <DeclareNavigator />,
            fped: <FichePedagNavigator />,
            calendartopright: <Calendarwithplugin navigation={this.props.navigation} />,
            fichepedag_activiteprogram: <ActiviteProgrammes navigation={this.props.navigation} />,
            login: <Login  navigation={this.props.navigation}/>,
            // Call to action
            CompteurNutritionnel: <CompteurNutritionnel />,
            Hydratation:<Hydratation navigation={this.props.navigation}/>,
            Sommeil:<Sommeil navigation={this.props.navigation}/>,
            AddTraining:<AddTraining navigation={this.props.navigation}/>,
            DeclarerCompetition:<DeclarerCompetition navigation={this.props.navigation}/>,
            DeclarerMatch:<DeclarerMatch navigation={this.props.navigation}/>,
            ListeLeftRightFoot:<ListeLeftRightFoot navigation={this.props.navigation}/>,
            navigationmamobilite:this.props.navigation,
        }
    }

    onClickSanteTab = () => {
        const setActiveTab = { type: SET_ACTIVE_TAB, value: "sante" }
        this.props.dispatch(setActiveTab)

        if(this.props.activeTab == "sante"){
            const setPopToTop = { type: SET_POP_TO_TOP, value: 'sante' };
            this.props.dispatch(setPopToTop);
        } else {
            const setPopToTop = { type: SET_POP_TO_TOP, value: '' };
            this.props.dispatch(setPopToTop);
        }
    }

    onClickHomeTab = () => {


        if(this.props.activeTab == "home"){
            const setPopToTop = { type: SET_POP_TO_TOP, value: 'home' } //eto zany za no mi-trave
            this.props.dispatch(setPopToTop);
        } else {
            const setPopToTop = { type: SET_POP_TO_TOP, value: '' };
            this.props.dispatch(setPopToTop);
        }

        const setActiveTab = { type: SET_ACTIVE_TAB, value: "home" }
        this.props.dispatch(setActiveTab);

    }

    onClickPerfoTab = () => {


        if(this.props.activeTab == "perfo"){

            const setPopToTop = { type: SET_POP_TO_TOP, value: 'perfo' };
            this.props.dispatch(setPopToTop);
        } else {
            const setPopToTop = { type: SET_POP_TO_TOP, value: '' };
            this.props.dispatch(setPopToTop);
        }

        const setActiveTab = { type: SET_ACTIVE_TAB, value: "perfo" }
        this.props.dispatch(setActiveTab)
    }

    onClickTrainTab = () => {

        if(this.props.activeTab == "train"){
            const setPopToTop = { type: SET_POP_TO_TOP, value: 'train' };
            this.props.dispatch(setPopToTop);
        } else {
            const setPopToTop = { type: SET_POP_TO_TOP, value: '' };
            this.props.dispatch(setPopToTop);
        }

        const setActiveTab = { type: SET_ACTIVE_TAB, value: "train" }
        this.props.dispatch(setActiveTab);

    }

    onClickAdd = () => {
        console.log("Test bouton plus")
        const setActiveTab = { type: SET_ACTIVE_TAB, value: "declare" }
        this.props.dispatch(setActiveTab)
    }
    onClickAddCompteurNutritionnel = ()=>{
        const setActiveTab = { type: SET_ACTIVE_TAB, value: "CompteurNutritionnel" }
        this.props.dispatch(setActiveTab)
    }
    onClickAddHydratation = ()=>{
        const setActiveTab = { type: SET_ACTIVE_TAB, value: "Hydratation" }
        this.props.dispatch(setActiveTab)
    }
    onClickAddMamobilite = (navigationmobilite)=>{
        // const setActiveTab = { type: SET_ACTIVE_TAB, value: "Sommeil" }
        // this.props.dispatch(setActiveTab)
        this.setState({navigationmamobilite:navigationmobilite})//ListeLeftRightFoot
        const setActiveTab = { type: SET_ACTIVE_TAB, value: "Mamobilite" }
        this.props.dispatch(setActiveTab)
    }
    onClickAddTraining = ()=>{
        const setActiveTab = { type: SET_ACTIVE_TAB, value: "AddTraining" }
        this.props.dispatch(setActiveTab)
    }
    onClickAddCompetition = ()=>{
        //login
        if(global.is_individual === true){
            const setActiveTab = { type: SET_ACTIVE_TAB, value: "DeclarerCompetition" } //individual
            this.props.dispatch(setActiveTab)
        }else{
            const setActiveTab = { type: SET_ACTIVE_TAB, value: "DeclarerMatch" } //compet
            this.props.dispatch(setActiveTab)
        }
    };

    render() {

        return (
            <View style={[style.pr]}>
                {/* <StatusBar barStyle="dark-content" /> */}
                {/* <SafeAreaView> */}
                {this.props.activeTab == "deco" ?  null :
                    <View style={{ minHeight: 80, maxHeight: 180, paddingBottom:8 }}>
                        <ODGOHeader navigation={this.props.navigation} />
                    </View>
                }
                <View style={{ flex: 1 }}>
                    {this.props.activeTab == "Pathologie"  ? <Pathologie navigation={this.props.navigation} />  : null}
                    {this.props.activeTab == "AddBlessure"  ? <AddBlessure navigation={this.props.navigation} />  : null}
                    {this.props.activeTab == "AddTension"  ? <AddTension navigation={this.props.navigation} />  : null}
                    {this.props.activeTab == "home"  ? this.state.dashBoard : null}
                    {this.props.activeTab == "DonneesPerso"  ? this.state.donneeperso : null}
                    {this.props.activeTab == "sante" ? this.state.sante : null}
                    {this.props.activeTab == "perfo" ? this.state.perfo : null}
                    {this.props.activeTab == "train" ? this.state.train : null}
                    {this.props.activeTab == "message" ? this.state.message : null}
                    {this.props.activeTab == "declare" ? this.state.declare : null}
                    {this.props.activeTab == "profile" ? this.state.fped : null}
                    {this.props.activeTab == "calendartopright" ? this.state.calendartopright : null}
                    {this.props.activeTab == "fichepedag_activiteprogram" ? this.state.fichepedag_activiteprogram : null}
                    {this.props.activeTab == "deco" ? this.state.login : null}
                    {this.props.activeTab == "CompteurNutritionnel" ? this.state.CompteurNutritionnel : null}
                    {this.props.activeTab == "Hydratation" ? this.state.Hydratation : null}
                    {this.props.activeTab == "Sommeil" ? this.state.Sommeil : null}
                    {this.props.activeTab == "AddTraining" ? this.state.AddTraining : null}
                    {this.props.activeTab == "DeclarerCompetition" ? this.state.DeclarerCompetition : null}
                    {this.props.activeTab == "DeclarerMatch" ? this.state.DeclarerMatch : null}
                    {this.props.activeTab == "ListeLeftRightFoot" ? this.state.ListeLeftRightFoot : null}
                    {this.props.activeTab == "Mamobilite" ? <Mamobilite navigation={this.props.navigation} navigation1={this.state.navigationmamobilite}/> : null}
                    {this.props.activeTab == "colonneleftright" ? <Colonneleftright navigation={this.props.navigation} navigation1={this.state.navigationmamobilite}/> : null}
                    {this.props.activeTab == "tensionvideo" ? <Tensionvideo navigation={this.props.navigation} navigation1={this.state.navigationmamobilite}/> : null}


                    {this.props.activeTab == "mesroutines_protocoles" ? <MesroutinesProtocoles navigation={this.props.navigation} /> : null}
                    {this.props.activeTab == "monplaning" ? <MonPlaning navigation={this.props.navigation} /> : null}
                    {this.props.activeTab == "videotheque" ? <Videotheque navigation={this.props.navigation} /> : null}
                    {this.props.activeTab == "entrainement" ? this.state.train : null}
                    {this.props.activeTab == "profile_depuismasemaine" ? this.state.fped : null}
                    {this.props.activeTab == "myenergyviadatapersoempty" ? <Myenergyviadatapersoempty navigation={this.props.navigation} /> : null}
                    {this.props.activeTab == "Carnet" ? <Carnet navigation={this.props.navigation} /> : null}
                    {this.props.activeTab == "MonPhysique" ? <MonPhysique navigation={this.props.navigation} /> : null}
                    {this.props.activeTab == "Mobilites" ? <Mobilites navigation={this.props.navigation} /> : null}
                    {this.props.activeTab == "TestMobilites" ? <TestMobilites navigation={this.props.navigation} /> : null}
                    {this.props.activeTab == "TestMobilitesUnitaires" ? <TestMobilitesUnitaires navigation={this.props.navigation} /> : null}
                    {this.props.activeTab == "Montestunit" ? <Montestunit navigation={this.props.navigation} /> : null}
                    {this.props.activeTab == "SingleExercice" ? <SingleExercice navigation={this.props.navigation} /> : null}
                    {this.props.activeTab == "history" ? <History navigation={this.props.navigation} /> : null}
                    {this.props.activeTab == "trainsingle" ? <Trainsingle navigation={this.props.navigation} /> : null}


                </View>

                {(this.props.activeTab == "deco" || this.props.hiddenfooter) ? null :
                    <View style={{ flex: 1, minHeight: phoneType=='iphoneX'?80: 50, maxHeight: phoneType=='iphoneX'?80:50 }}>
                        <ODGOFooter
                            navigation={this.props.navigation}
                            onClickSanteTab={() => {
                                this.onClickSanteTab()
                            }}

                            onClickHomeTab={() => {
                                this.onClickHomeTab()
                            }}

                            onClickAdd={() => {
                                this.onClickAdd()
                            }}

                            onClickPerfoTab={() => {
                                this.onClickPerfoTab()
                            }}

                            onClickTrainTab={() => {
                                this.onClickTrainTab()
                            }}

                            onClickAddCompteurNutritionnel={()=>{
                                this.onClickAddCompteurNutritionnel()
                            }}

                            onClickAddHydratation={()=>{
                                this.onClickAddHydratation()
                            }}

                            onClickAddMamobilite={(navigationmobilite)=>{
                                this.onClickAddMamobilite(navigationmobilite)
                            }}

                            onClickAddTraining={()=>{
                                this.onClickAddTraining()
                            }}
                            onClickAddCompetition={()=>{
                                this.onClickAddCompetition()
                            }}
                        />

                    </View>}

                {/* </SafeAreaView> */}
            </View>
        )
    }
}

// export default TabContainer;
const mapStateToProps = (state) => {
    const { activeTab,hiddenfooter,droits } = state.statedata
    return { activeTab ,hiddenfooter,droits}
};

export default connect(mapStateToProps)(TabContainer);
