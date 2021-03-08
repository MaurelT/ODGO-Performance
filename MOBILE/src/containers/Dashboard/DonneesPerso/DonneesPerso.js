// import React, { Component } from 'react';
// import { connect } from 'react-redux';
// import {
//     ScrollView,
//     View,
//     Text,
//     TouchableOpacity,
//     Dimensions,
//     StatusBar,
//     Modal,
//     RefreshControl,
//     TextInput,
//     //DatePickerAndroid,
//     // DatePickerIOS,
//     Platform
// } from 'react-native';
// import DateTimePicker from 'react-native-modal-datetime-picker'; // j'ai changé datepickerandroid with this plugin
//
// import AsyncStorage from '@react-native-community/async-storage';
// import baseStyles from '../../../base/BaseStyles';
// import styles from './styles'
// import colors from '../../../configs/colors';
// import LinearGradient from 'react-native-linear-gradient';
// import ZonePicker from '../../../components/ZonePicker/ZonePicker';
// import MAAButton from '../../../components/MAAButton/MAAButton';
// import AutoHeightImage from 'react-native-auto-height-image';
// import { SET_ACTIVE_FP } from '../../../redux/types/tabTypes';
// import PersonalDataHelper from '../../../apis/helpers/person_data_helper';
// import moment from 'moment';
//
// const screen = Dimensions.get("window");
// const SBHelight = 20;
// const screenWidth = screen.width
// const screenHeight = screen.height - SBHelight
//
// class DonneesPerso extends Component {
//     constructor(props) {
//         super(props)
//         this.state = {
//             userToken: "",
//             refreshing: true,
//             activeMenu: 2,
//             selectedZone: props.selectedZone,
//             zonePicker: false,
//             sliderValueIntensite: 3.45,
//             sliderValueDifficulte: 3,
//             sliderValueQualite: 4,
//             sliderValueImplication: 2,
//             userData: null,
//             userSexe: "",
//             userSexeChoice: false,
//             possibleSexe: [
//                 {
//                     id: 1,
//                     name: "Homme",
//                     value: "H"
//                 },
//                 {
//                     id: 2,
//                     name: "Femme",
//                     value: "F"
//                 }
//             ],
//
//             userBirthDay: "",
//             userDateNais: "",
//
//             userNationality: null,
//             userNationalitiesChoice: false,
//             userNationalities: [],
//
//             userTaille: 0,
//             isWritingTaille: false,
//
//             userWeight: 0,
//             isWritingWeight: false,
//
//             userSports: [],
//             selectedSport: null,
//             userSportsListChoice: false,
//
//             sportLevels: [],
//             selectedSportLevel: null,
//             sportLevelChoice: false,
//
//             levelClubs: [],
//             selectedLevelClub: null,
//             levelClubChoice: false,
//
//             userNationalClub: false,
//             userNationalClubChoice: false,
//             userNationalClubName: "",
//             isWritingNationalClubName: false,
//
//             trainFrequency: [],
//             selectedTrainFrequency: null,
//             trainFrequencyChoice: false,
//
//             haveAccessTiers: false,
//             haveAccessTiersChoice: false,
//             tiersFullName: "",
//             isWritingFullName: false,
//             tiersEmail: "",
//             isWritingEmail: false,
//             tiersFonction: "",
//             isWritingFonction: false,
//
//             booleanValues: [
//                 {
//                     id: 1,
//                     name: "Oui",
//                     value: true
//                 },
//                 {
//                     id: 2,
//                     name: "Non",
//                     value: false
//                 }
//             ],
//
//             //new datetime picker plugin
//             isDateTimePickerVisible:false,
//             date_text:moment(new Date()).format("DD/MM/YYYY"),
//             dateSelectedForsave:moment(new Date()).format("YYYY-MM-DD")
//
//         }
//     }
//
//     async componentDidMount() {
//        // const userToken = await AsyncStorage.getItem("userToken")
//
//
//         this.getUserData()
//         this.getUserNationalities()
//         this.getUserSports()
//         this.getTrainingFrequency()
//         this.setState({ refreshing: false })
//
//
//     }
//
//     formatBirthDate = (date_text) => {
//         const birthDay = new Date(date_text)
//         let birthDayFR = "" + (birthDay.getUTCDate() > 9 ? birthDay.getUTCDate() : ("0" + birthDay.getUTCDate())) + "/" +
//             ((birthDay.getMonth() + 1) > 9 ? (birthDay.getMonth() + 1) : "0" + (birthDay.getMonth() + 1)) +
//             "/" + birthDay.getFullYear()
//         return birthDayFR
//     }
//
//     getUserNationalities = async () => {
//         const userNationality = await PersonalDataHelper.getNationalities(this.props.userToken)
//         this.setState({ userNationalities: userNationality.data })
//     }
//
//     getUserSports = async () => {
//         const userSports = await PersonalDataHelper.getSports(this.props.userToken)
//         this.setState({ userSports: userSports.data })
//         await this.getSportListLevels(userSports.data[0].id)
//     }
//
//     getSportListLevels = async (id_sport) => {
//         const sportListLevels = await PersonalDataHelper.getLevels(this.props.userToken, id_sport)
//         this.setState({ sportLevels: sportListLevels.data })
//         // this.setState({selectedSportLevel: sportListLevels.data[0]})
//         await this.getListClubs(id_sport, sportListLevels.data[0].id)
//     }
//
//     getListClubs = async (id_sport, id_level) => {
//         const listClubs = await PersonalDataHelper.getClubs(this.props.userToken, id_sport, id_level)
//         this.setState({ levelClubs: listClubs.data })
//         // this.setState({selectedLevelClub: listClubs.data[0]})
//     }
//
//     getTrainingFrequency = async () => {
//         const trainFrequency = await PersonalDataHelper.getTrainingFrequency(this.props.userToken)
//         this.setState({ trainFrequency: trainFrequency.data })
//
//     }
//
//     getUserData = async () => {
//         const userData = await PersonalDataHelper.getUserData(this.props.userToken)
//         this.setState({ userData: userData.data })
//         this.setState({ userSexe: userData.data.sexe })
//         // userData.data.date_naissance
//         const birthDayFR = this.formatBirthDate(userData.data.date_naissance)
//        // this.setState({ userBirthDay: birthDayFR })
//         this.setState({ date_text: birthDayFR })
//         this.setState({userDateNais: userData.data.date_naissance.substring(0, 10)})
//         this.setState({ userNationality: userData.data.nationalite })
//         this.setState({ userTaille: userData.data.taille_cm })
//         this.setState({ userWeight: userData.data.poids_kg })
//         this.setState({ selectedSport: userData.data.sport_niveau_club.sport_niveaux.sport })
//         this.setState({ selectedSportLevel: userData.data.sport_niveau_club.sport_niveaux })
//         this.setState({ selectedLevelClub: userData.data.sport_niveau_club })
//         this.setState({ userNationalClub: userData.data.equipe_nationale })
//         this.setState({ userNationalClubName: userData.data.nom_equipe })
//         this.setState({ selectedTrainFrequency: userData.data.frequence_entrainement })
//         this.setState({ haveAccessTiers: userData.data.have_acces_tiers })
//         this.setState({ tiersFullName: userData.data.prenom_nom_tiers })
//         this.setState({ tiersEmail: userData.data.email_tiers })
//         this.setState({ tiersFonction: userData.data.fonction_tiers })
//     }
//
//
//
//     putUserData = async () => {
//         // this.setState({ refreshing: true })
//         const resPutUserData = await PersonalDataHelper.putUserData(
//             this.props.userToken,
//             this.state.userSexe,
//             //this.state.userDateNais, //TEO TALOHA
//             this.state.dateSelectedForsave,
//             this.state.userNationality.id,
//             this.state.userTaille,
//             parseFloat(this.state.userWeight).toFixed(1),
//             this.state.selectedLevelClub.id,
//             this.state.userNationalClub,
//             this.state.userNationalClubName,
//             this.state.selectedTrainFrequency.id,
//             this.state.haveAccessTiers,
//             this.state.tiersFullName,
//             this.state.tiersEmail,
//             this.state.tiersFonction
//         )
//     }
//
//
//     showDateTimePicker = () => {
//         this.setState({ isDateTimePickerVisible: true });
//     };
//
//     hideDateTimePicker = () => {
//         this.setState({ isDateTimePickerVisible: false });
//     };
//
//     handleDatePicked = date => {
//         console.warn("A date has been picked: ", date);
//         this.setState({date_text:moment(date).format("DD/MM/YYYY"),dateSelectedForsave:moment(date).format("YYYY-MM-DD")})
//         this.hideDateTimePicker();
//     };
//
//
//     render() {
//         return (
//             <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }} colors={[colors.balck, colors.green, colors.balck]} style={baseStyles.linearGradient}>
//
//                 <ScrollView
//                     style={styles.scrollView}
//                     contentContainerStyle={[styles.contentContainerStyle]}
//                     keyboardShouldPersistTaps={'always'}
//                     refreshControl={
//                         <RefreshControl
//                             refreshing={this.state.refreshing}
//                             onRefresh={() => {
//                                 // this.setState({ refreshing: true })
//                                 // setTimeout(() => {
//                                 //     this.setState({ refreshing: false })
//                                 // }, 2000)
//                             }}
//                         />
//                     }
//                     on
//                 >
//                     <View style={{
//                         flexDirection: "row",
//                         width: screenWidth,
//                         alignItems: "center",
//                         justifyContent: "space-between",
//                         padding: 15,
//                         paddingLeft: 0,
//                         paddingRight: 0,
//                         // backgroundColor: colors.balck
//                     }}>
//                         <TouchableOpacity style={{
//                             width: 40, height: 40, alignItems: "center",
//                             justifyContent: "center"
//                         }}
//                             onPress={() => {
//                                 const setActiveFPAction = { type: SET_ACTIVE_FP, value: 0 }
//                                 this.props.dispatch(setActiveFPAction)
//                                 this.props.navigation.pop()
//                             }}>
//                             <AutoHeightImage
//                                 width={20}
//                                 source={require("../../../assets/icons/arrow-white.png")}
//                                 style={{
//                                     transform: [
//                                         { rotateY: "180deg" }
//                                     ]
//                                 }} />
//                         </TouchableOpacity>
//                         <Text style={{
//                             color: colors.white,
//                             fontSize: 20
//                         }}>
//                             Données personnelles
//                         </Text>
//                         <TouchableOpacity style={{
//                             width: 40, height: 40, alignItems: "center",
//                             justifyContent: "center", opacity: 0
//                         }}>
//                             <AutoHeightImage
//                                 width={20}
//                                 source={require("../../../assets/icons/arrow-white.png")}
//                                 style={{
//                                 }} />
//                         </TouchableOpacity>
//                     </View>
//
//                     {/* informations G. */}
//                     <View style={[styles.containerTitle, { marginLeft: 15 }]}>
//                         <AutoHeightImage
//                             width={screenWidth * 0.05}
//                             source={require('../../../assets/icons/shape.red.1.png')}
//                             style={styles.imgTitle}
//                         />
//                         <View style={[]}>
//                             <Text style={[baseStyles.titleText, { color: colors.red, fontSize: 16 }]}>
//                                 {"Informations générales".toUpperCase()}
//                             </Text>
//                         </View>
//                     </View>
//                     <View style={[styles.sliderCtn]}>
//                         <View style={[styles.sliderTensionLabelG]}>
//                             <Text style={[baseStyles.textColorWhite]}>Sexe</Text>
//                         </View>
//                         <View style={[styles.sliderTensionLabelD]}>
//
//                             <TouchableOpacity
//                                 onPress={() => {
//                                     this.setState({ userSexeChoice: !this.state.userSexeChoice })
//                                     this.setState({ sportLevelChoice: false })
//                                     this.setState({ levelClubChoice: false })
//                                     this.setState({ trainFrequencyChoice: false })
//                                     this.setState({ userSportsListChoice: false })
//                                     this.setState({ userNationalitiesChoice: false })
//                                 }}
//                             >
//                                 <Text style={[baseStyles.textColorGrey]}>
//                                     {
//                                         this.state.userSexe == "H" ? "Homme" : (this.state.userSexe == "F" ? "Femme" : "")
//                                     }
//                                 </Text>
//                             </TouchableOpacity>
//                             {
//                                 this.state.userSexeChoice ?
//                                     <View
//                                         style={{
//                                             position: "absolute",
//                                             top: 20,
//                                             right: 10,
//                                             backgroundColor: colors.white,
//                                             borderRadius: 5,
//                                             zIndex: 999
//                                         }}
//                                     >
//                                         {
//                                             this.state.possibleSexe.map((sexe, index) => {
//                                                 return (
//                                                     <TouchableOpacity
//                                                         key={"sexe_" + index}
//                                                         style={{
//                                                             padding: 5,
//                                                             paddingLeft: 10,
//                                                             paddingRight: 10,
//                                                             margin: 5,
//                                                             borderBottomColor: colors.grisbox,
//                                                             borderBottomWidth: 0.5
//                                                         }}
//                                                         onPress={() => {
//                                                             this.setState({ userSexe: sexe.value })
//                                                             this.setState({ userSexeChoice: false })
//                                                             // this.getSportListLevels(sport.id)
//                                                         }}
//                                                     >
//                                                         <Text>
//                                                             {
//                                                                 sexe.name
//                                                             }
//                                                         </Text>
//                                                     </TouchableOpacity>
//                                                 )
//                                             })
//                                         }
//                                     </View> : null
//                             }
//                         </View>
//                     </View>
//                     <View style={[styles.sliderCtn]}>
//                         <View style={[styles.sliderTensionLabelG]}>
//                             <Text style={[baseStyles.textColorWhite]}>Date de naissance</Text>
//                         </View>
//                         <View style={[styles.sliderTensionLabelD]}>
//                             <TouchableOpacity
//                                 onPress={()=>{
//                                    // this.changeBirthDay() //taloha date picker android ftsn
//                                     this.showDateTimePicker
//                                     console.warn('pressed show date')
//                                 }}
//                             >
//                             <Text style={[baseStyles.textColorGrey]}>
//                                 {
//                                     // this.state.userBirthDay
//                                     this.state.date_text
//                                 }
//                             </Text>
//                             </TouchableOpacity>
//                         </View>
//                     </View>
//                     <View style={[styles.sliderCtn]}>
//                         <View style={[styles.sliderTensionLabelG]}>
//                             <Text style={[baseStyles.textColorWhite]}>Nationalité</Text>
//                         </View>
//                         <View style={[styles.sliderTensionLabelD]}>
//                             <TouchableOpacity
//                                 onPress={() => {
//                                     this.setState({ userNationalitiesChoice: !this.state.userNationalitiesChoice })
//                                     this.setState({ sportLevelChoice: false })
//                                     this.setState({ levelClubChoice: false })
//                                     this.setState({ trainFrequencyChoice: false })
//                                     this.setState({ userSportsListChoice: false })
//                                     this.setState({ userSexeChoice: false })
//                                     this.setState({ isWritingTaille: false })
//                                 }}
//                             >
//                                 <Text style={[baseStyles.textColorGrey]}>
//                                     {
//                                         this.state.userNationality != null ?
//                                             this.state.userNationality.name : ""
//                                     }
//                                 </Text>
//                             </TouchableOpacity>
//                             {
//                                 this.state.userNationalitiesChoice ?
//                                     <View
//                                         style={{
//                                             position: "absolute",
//                                             top: 20,
//                                             right: 10,
//                                             backgroundColor: colors.white,
//                                             borderRadius: 5,
//                                             zIndex: 999
//                                         }}
//                                     >
//                                         {
//                                             this.state.userNationalities.map((nation, index) => {
//                                                 return (
//                                                     <TouchableOpacity
//                                                         key={"sport_" + index}
//                                                         style={{
//                                                             padding: 5,
//                                                             paddingLeft: 10,
//                                                             paddingRight: 10,
//                                                             margin: 5,
//                                                             borderBottomColor: colors.grisbox,
//                                                             borderBottomWidth: 0.5
//                                                         }}
//                                                         onPress={() => {
//                                                             // this.state.userNationality
//                                                             this.setState({ userNationality: nation })
//                                                             this.setState({ userNationalitiesChoice: false })
//                                                             // this.getSportListLevels(sport.id)
//                                                         }}
//                                                     >
//                                                         <Text>
//                                                             {
//                                                                 nation.name
//                                                             }
//                                                         </Text>
//                                                     </TouchableOpacity>
//                                                 )
//                                             })
//                                         }
//                                     </View> : null
//                             }
//                         </View>
//                     </View>
//                     <View style={styles.separator}></View>
//
//                     {/* Donnees B. */}
//                     <View style={[styles.containerTitle, { marginLeft: 15 }]}>
//                         <AutoHeightImage
//                             width={screenWidth * 0.05}
//                             source={require('../../../assets/icons/standing-human-body-silhouette.png')}
//                             style={styles.imgTitle}
//                         />
//                         <View style={[]}>
//                             <Text style={[baseStyles.titleText, { color: colors.red, fontSize: 16 }]}>
//                                 {"Données Biométriques".toUpperCase()}
//                             </Text>
//                         </View>
//                     </View>
//                     <View style={[styles.sliderCtn]}>
//                         <View style={[styles.sliderTensionLabelG]}>
//                             <Text style={[baseStyles.textColorWhite]}>Taille</Text>
//                         </View>
//                         <View style={[styles.sliderTensionLabelD]}>
//                             <TouchableOpacity
//                                 onPress={() => {
//                                     this.setState({ isWritingTaille: !this.state.isWritingTaille })
//                                     this.setState({ sportLevelChoice: false })
//                                     this.setState({ levelClubChoice: false })
//                                     this.setState({ trainFrequencyChoice: false })
//                                     this.setState({ userSportsListChoice: false })
//                                     this.setState({ userSexeChoice: false })
//                                     this.setState({ isWritingWeight: false })
//                                 }}
//                             >
//                                 <Text style={[baseStyles.textColorGrey]}>
//                                     {this.state.userTaille + "cm"}
//                                 </Text>
//                             </TouchableOpacity>
//                             {
//                                 this.state.isWritingTaille ?
//                                     <View
//                                         style={{
//                                             position: "absolute",
//                                             top: 20,
//                                             right: 10,
//                                             backgroundColor: colors.white,
//                                             borderRadius: 5,
//                                             zIndex: 999
//                                         }}
//                                     >
//                                         <TextInput
//                                             value={"" + this.state.userTaille}
//                                             onChangeText={(text) => {
//                                                 this.setState({ userTaille: text })
//                                             }}
//                                             keyboardAppearance={"default"}
//                                             keyboardType={"numeric"}
//                                             onBlur={() => {
//                                                 this.setState({ isWritingTaille: false })
//                                             }}
//                                             style={{
//                                                 width: 200
//                                             }}
//                                             autoFocus={true}
//                                         />
//                                     </View> : null
//                             }
//                         </View>
//                     </View>
//                     <View style={[styles.sliderCtn]}>
//                         <View style={[styles.sliderTensionLabelG]}>
//                             <Text style={[baseStyles.textColorWhite]}>Poids</Text>
//                         </View>
//                         <View style={[styles.sliderTensionLabelD]}>
//
//                             <TouchableOpacity
//                                 onPress={() => {
//                                     this.setState({ isWritingWeight: !this.state.isWritingWeight })
//                                     this.setState({ sportLevelChoice: false })
//                                     this.setState({ levelClubChoice: false })
//                                     this.setState({ trainFrequencyChoice: false })
//                                     this.setState({ userSportsListChoice: false })
//                                     this.setState({ userSexeChoice: false })
//                                     this.setState({ isWritingTaille: false })
//                                 }}
//                             >
//                                 <Text style={[baseStyles.textColorGrey]}>
//                                     {this.state.userWeight + "kg"}
//                                 </Text>
//                             </TouchableOpacity>
//                             {
//                                 this.state.isWritingWeight ?
//                                     <View
//                                         style={{
//                                             position: "absolute",
//                                             top: 20,
//                                             right: 10,
//                                             backgroundColor: colors.white,
//                                             borderRadius: 5,
//                                             zIndex: 999
//                                         }}
//                                     >
//                                         <TextInput
//                                             value={"" + this.state.userWeight}
//                                             onChangeText={(text) => {
//                                                 this.setState({ userWeight: text })
//                                             }}
//                                             keyboardAppearance={"default"}
//                                             keyboardType={"numeric"}
//                                             onBlur={() => {
//                                                 this.setState({ isWritingWeight: false })
//                                             }}
//                                             style={{
//                                                 width: 200
//                                             }}
//                                             autoFocus={true}
//                                         />
//                                     </View> : null
//                             }
//                         </View>
//                     </View>
//                     <View style={styles.separator}></View>
//
//                     {/* Activite S. */}
//                     <View style={[styles.containerTitle, { marginLeft: 15 }]}>
//                         <AutoHeightImage
//                             width={screenWidth * 0.05}
//                             source={require('../../../assets/icons/soccer-ball-variant.png')}
//                             style={styles.imgTitle}
//                         />
//                         <View style={[]}>
//                             <Text style={[baseStyles.titleText, { color: colors.red, fontSize: 16 }]}>
//                                 {"Activité Sportive".toUpperCase()}
//                             </Text>
//                         </View>
//                     </View>
//                     <View style={[styles.sliderCtn]}>
//                         <View style={[styles.sliderTensionLabelG]}>
//                             <Text style={[baseStyles.textColorWhite]}>Sport</Text>
//                         </View>
//                         <View style={[styles.sliderTensionLabelD]}>
//                             <TouchableOpacity
//                                 onPress={() => {
//                                     this.setState({ userSportsListChoice: !this.state.userSportsListChoice })
//                                     this.setState({ sportLevelChoice: false })
//                                     this.setState({ levelClubChoice: false })
//                                     this.setState({ trainFrequencyChoice: false })
//                                 }}
//                             >
//                                 <Text style={[baseStyles.textColorGrey]}>
//                                     {
//                                         this.state.selectedSport != null ?
//                                             this.state.selectedSport.name : ""
//                                     }
//                                 </Text>
//                             </TouchableOpacity>
//                             {
//                                 this.state.userSportsListChoice ?
//                                     <View
//                                         style={{
//                                             position: "absolute",
//                                             top: 20,
//                                             right: 10,
//                                             backgroundColor: colors.white,
//                                             borderRadius: 5,
//                                             zIndex: 999
//                                         }}
//                                     >
//                                         {
//                                             this.state.userSports.map((sport, index) => {
//                                                 return (
//                                                     <TouchableOpacity
//                                                         key={"sport_" + index}
//                                                         style={{
//                                                             padding: 5,
//                                                             paddingLeft: 10,
//                                                             paddingRight: 10,
//                                                             margin: 5,
//                                                             borderBottomColor: colors.grisbox,
//                                                             borderBottomWidth: 0.5
//                                                         }}
//                                                         onPress={async () => {
//                                                             this.setState({ selectedSport: sport })
//                                                             this.setState({ userSportsListChoice: false })
//                                                             await this.getSportListLevels(sport.id)
//                                                             this.setState({ selectedSportLevel: this.state.sportLevels[0] })
//                                                             await this.getListClubs(this.state.selectedSport.id, this.state.sportLevels[0].id)
//                                                             this.setState({ selectedLevelClub: this.state.levelClubs[0] })
//                                                         }}
//                                                     >
//                                                         <Text>
//                                                             {
//                                                                 sport.name
//                                                             }
//                                                         </Text>
//                                                     </TouchableOpacity>
//                                                 )
//                                             })
//                                         }
//                                     </View> : null
//                             }
//                         </View>
//                     </View>
//                     <View style={[styles.sliderCtn]}>
//                         <View style={[styles.sliderTensionLabelG]}>
//                             <Text style={[baseStyles.textColorWhite]}>Niveau</Text>
//                         </View>
//                         <View style={[styles.sliderTensionLabelD]}>
//                             <TouchableOpacity
//                                 onPress={() => {
//                                     this.setState({ sportLevelChoice: !this.state.sportLevelChoice })
//                                     this.setState({ userSportsListChoice: false })
//                                     this.setState({ levelClubChoice: false })
//                                     this.setState({ trainFrequencyChoice: false })
//                                 }}
//                             >
//                                 <Text style={[baseStyles.textColorGrey]}>
//                                     {
//                                         this.state.selectedSportLevel != null ?
//                                             this.state.selectedSportLevel.name : ""
//                                     }
//                                 </Text>
//                             </TouchableOpacity>
//                             {
//                                 this.state.sportLevelChoice ?
//                                     <View
//                                         style={{
//                                             position: "absolute",
//                                             top: 20,
//                                             right: 10,
//                                             backgroundColor: colors.white,
//                                             borderRadius: 5,
//                                             zIndex: 999
//                                         }}
//                                     >
//                                         {
//                                             this.state.sportLevels.map((level, index) => {
//                                                 return (
//                                                     <TouchableOpacity
//                                                         key={"sport_" + index}
//                                                         style={{
//                                                             padding: 5,
//                                                             paddingLeft: 10,
//                                                             paddingRight: 10,
//                                                             margin: 5,
//                                                             borderBottomColor: colors.grisbox,
//                                                             borderBottomWidth: 0.5
//                                                         }}
//                                                         onPress={async () => {
//                                                             this.setState({ selectedSportLevel: level })
//                                                             this.setState({ sportLevelChoice: false })
//                                                             await this.getListClubs(this.state.selectedSport.id, this.state.selectedSportLevel.id)
//                                                             this.setState({ selectedLevelClub: this.state.levelClubs[0] })
//                                                         }}
//                                                     >
//                                                         <Text>
//                                                             {
//                                                                 level.name
//                                                             }
//                                                         </Text>
//                                                     </TouchableOpacity>
//                                                 )
//                                             })
//                                         }
//                                     </View> : null
//                             }
//                         </View>
//                     </View>
//                     <View style={[styles.sliderCtn]}>
//                         <View style={[styles.sliderTensionLabelG]}>
//                             <Text style={[baseStyles.textColorWhite]}>Club</Text>
//                         </View>
//                         <View style={[styles.sliderTensionLabelD]}>
//                             <TouchableOpacity
//                                 onPress={() => {
//                                     this.setState({ levelClubChoice: !this.state.levelClubChoice })
//                                     this.setState({ userSportsListChoice: false })
//                                     this.setState({ sportLevelChoice: false })
//                                     this.setState({ trainFrequencyChoice: false })
//                                 }}
//                             >
//                                 <Text style={[baseStyles.textColorGrey]}>
//                                     {
//                                         this.state.selectedLevelClub != null ?
//                                             this.state.selectedLevelClub.name : ""
//                                     }
//                                 </Text>
//                             </TouchableOpacity>
//                             {
//                                 this.state.levelClubChoice ?
//                                     <View
//                                         style={{
//                                             position: "absolute",
//                                             top: 20,
//                                             right: 10,
//                                             backgroundColor: colors.white,
//                                             borderRadius: 5,
//                                             zIndex: 999
//                                         }}
//                                     >
//                                         {
//                                             this.state.levelClubs.map((club, index) => {
//                                                 return (
//                                                     <TouchableOpacity
//                                                         key={"club_" + index}
//                                                         style={{
//                                                             padding: 5,
//                                                             paddingLeft: 10,
//                                                             paddingRight: 10,
//                                                             margin: 5,
//                                                             borderBottomColor: colors.grisbox,
//                                                             borderBottomWidth: 0.5
//                                                         }}
//                                                         onPress={() => {
//                                                             this.setState({ selectedLevelClub: club })
//                                                             this.setState({ levelClubChoice: false })
//                                                         }}
//                                                     >
//                                                         <Text>
//                                                             {
//                                                                 club.name
//                                                             }
//                                                         </Text>
//                                                     </TouchableOpacity>
//                                                 )
//                                             })
//                                         }
//                                     </View> : null
//                             }
//                         </View>
//                     </View>
//                     <View style={[styles.sliderCtn]}>
//                         <View style={[styles.sliderTensionLabelG]}>
//                             <Text style={[baseStyles.textColorWhite]}>Equipe Nationale</Text>
//                         </View>
//                         <View style={[styles.sliderTensionLabelD]}>
//
//                             <TouchableOpacity
//                                 onPress={() => {
//                                     this.setState({ userNationalClubChoice: !this.state.userNationalClubChoice })
//                                     this.setState({ sportLevelChoice: false })
//                                     this.setState({ levelClubChoice: false })
//                                     this.setState({ trainFrequencyChoice: false })
//                                     this.setState({ userSportsListChoice: false })
//                                     this.setState({ userNationalitiesChoice: false })
//                                 }}
//                             >
//                                 <Text style={[baseStyles.textColorGrey]}>
//                                     {
//                                         this.state.userNationalClub ? "Oui" : "Non"
//                                     }
//                                 </Text>
//                             </TouchableOpacity>
//                             {
//                                 this.state.userNationalClubChoice ?
//                                     <View
//                                         style={{
//                                             position: "absolute",
//                                             top: 20,
//                                             right: 10,
//                                             backgroundColor: colors.white,
//                                             borderRadius: 5,
//                                             zIndex: 999
//                                         }}
//                                     >
//                                         {
//                                             this.state.booleanValues.map((bool, index) => {
//                                                 return (
//                                                     <TouchableOpacity
//                                                         key={"bool1_" + index}
//                                                         style={{
//                                                             padding: 5,
//                                                             paddingLeft: 10,
//                                                             paddingRight: 10,
//                                                             margin: 5,
//                                                             borderBottomColor: colors.grisbox,
//                                                             borderBottomWidth: 0.5
//                                                         }}
//                                                         onPress={() => {
//                                                             this.setState({ userNationalClub: bool.value })
//                                                             this.setState({ userNationalClubChoice: false })
//                                                             if (bool.value) {
//                                                                 this.setState({ userNationalClubName: "" })
//                                                                 this.setState({ isWritingNationalClubName: true })
//                                                             }
//                                                         }}
//                                                     >
//                                                         <Text>
//                                                             {
//                                                                 bool.name
//                                                             }
//                                                         </Text>
//                                                     </TouchableOpacity>
//                                                 )
//                                             })
//                                         }
//                                     </View> : null
//                             }
//                         </View>
//                     </View>
//                     {
//                         this.state.userNationalClub ?
//                             <View style={[styles.sliderCtn]}>
//                                 <View style={[styles.sliderTensionLabelG]}>
//                                     <Text style={[baseStyles.textColorWhite]}>Quelle équipe nationale ?</Text>
//                                 </View>
//                                 <View style={[styles.sliderTensionLabelD]}>
//
//
//                                     <TouchableOpacity
//                                         onPress={() => {
//                                             this.setState({ isWritingNationalClubName: !this.state.isWritingNationalClubName })
//                                             this.setState({ sportLevelChoice: false })
//                                             this.setState({ levelClubChoice: false })
//                                             this.setState({ trainFrequencyChoice: false })
//                                             this.setState({ userSportsListChoice: false })
//                                             this.setState({ userSexeChoice: false })
//                                             this.setState({ isWritingTaille: false })
//                                         }}
//                                     >
//                                         <Text style={[baseStyles.textColorGrey]}>
//                                             {this.state.userNationalClubName}
//                                         </Text>
//                                     </TouchableOpacity>
//                                     {
//                                         this.state.isWritingNationalClubName ?
//                                             <View
//                                                 style={{
//                                                     position: "absolute",
//                                                     top: 20,
//                                                     right: 10,
//                                                     backgroundColor: colors.white,
//                                                     borderRadius: 5,
//                                                     zIndex: 999
//                                                 }}
//                                             >
//                                                 <TextInput
//                                                     value={"" + this.state.userNationalClubName}
//                                                     onChangeText={(text) => {
//                                                         this.setState({ userNationalClubName: text })
//                                                     }}
//                                                     keyboardAppearance={"default"}
//                                                     keyboardType={"default"}
//                                                     onBlur={() => {
//                                                         this.setState({ isWritingNationalClubName: false })
//                                                     }}
//                                                     style={{
//                                                         width: 200
//                                                     }}
//                                                     autoFocus={true}
//                                                 />
//                                             </View> : null
//                                     }
//                                 </View>
//                             </View> : null
//                     }
//                     <View style={[styles.sliderCtn]}>
//                         <View style={[styles.sliderTensionLabelG]}>
//                             <Text style={[baseStyles.textColorWhite]}>Fréquence des entraînements</Text>
//                         </View>
//                         <View style={[styles.sliderTensionLabelD]}>
//                             <TouchableOpacity
//                                 onPress={() => {
//                                     this.setState({ trainFrequencyChoice: !this.state.trainFrequencyChoice })
//                                     this.setState({ userSportsListChoice: false })
//                                     this.setState({ sportLevelChoice: false })
//                                     this.setState({ levelClubChoice: false })
//                                 }}
//                             >
//                                 <Text style={[baseStyles.textColorGrey]}>
//                                     {
//                                         this.state.selectedTrainFrequency != null ?
//                                             this.state.selectedTrainFrequency.name : ""
//                                     }
//                                 </Text>
//                             </TouchableOpacity>
//                             {
//                                 this.state.trainFrequencyChoice ?
//                                     <View
//                                         style={{
//                                             position: "absolute",
//                                             top: 20,
//                                             right: 10,
//                                             backgroundColor: colors.white,
//                                             borderRadius: 5,
//                                             zIndex: 999
//                                         }}
//                                     >
//                                         {
//                                             this.state.trainFrequency.map((train, index) => {
//                                                 return (
//                                                     <TouchableOpacity
//                                                         key={"train_" + index}
//                                                         style={{
//                                                             padding: 5,
//                                                             paddingLeft: 10,
//                                                             paddingRight: 10,
//                                                             margin: 5,
//                                                             borderBottomColor: colors.grisbox,
//                                                             borderBottomWidth: 0.5
//                                                         }}
//                                                         onPress={() => {
//                                                             this.setState({ selectedTrainFrequency: train })
//                                                             this.setState({ trainFrequencyChoice: false })
//                                                         }}
//                                                     >
//                                                         <Text>
//                                                             {
//                                                                 train.name
//                                                             }
//                                                         </Text>
//                                                     </TouchableOpacity>
//                                                 )
//                                             })
//                                         }
//                                     </View> : null
//                             }
//                         </View>
//                     </View>
//                     <View style={styles.separator}></View>
//
//                     {/* Suivi. */}
//                     <View style={[styles.containerTitle, { marginLeft: 15 }]}>
//                         <AutoHeightImage
//                             width={screenWidth * 0.05}
//                             source={require('../../../assets/icons/graph-line.png')}
//                             style={styles.imgTitle}
//                         />
//                         <View style={[]}>
//                             <Text style={[baseStyles.titleText, { color: colors.red, fontSize: 16 }]}>
//                                 {"Suivi".toUpperCase()}
//                             </Text>
//                         </View>
//                     </View>
//                     <View style={[styles.sliderCtn]}>
//                         <View style={[styles.sliderTensionLabelG]}>
//                             <Text style={[baseStyles.textColorWhite]}>Voulez-vous donner la possibilité à un tiers d'accéder à vos données ?</Text>
//                         </View>
//                         <View style={[styles.sliderTensionLabelD]}>
//
//                             <TouchableOpacity
//                                 onPress={() => {
//                                     this.setState({ haveAccessTiersChoice: !this.state.haveAccessTiersChoice })
//                                     this.setState({ sportLevelChoice: false })
//                                     this.setState({ levelClubChoice: false })
//                                     this.setState({ trainFrequencyChoice: false })
//                                     this.setState({ userSportsListChoice: false })
//                                     this.setState({ userNationalitiesChoice: false })
//                                 }}
//                             >
//                                 <Text style={[baseStyles.textColorGrey]}>
//                                     {
//                                         this.state.haveAccessTiers ? "Oui" : "Non"
//                                     }
//                                 </Text>
//                             </TouchableOpacity>
//                             {
//                                 this.state.haveAccessTiersChoice ?
//                                     <View
//                                         style={{
//                                             position: "absolute",
//                                             top: 20,
//                                             right: 10,
//                                             backgroundColor: colors.white,
//                                             borderRadius: 5,
//                                             zIndex: 999
//                                         }}
//                                     >
//                                         {
//                                             this.state.booleanValues.map((bool, index) => {
//                                                 return (
//                                                     <TouchableOpacity
//                                                         key={"bool1_" + index}
//                                                         style={{
//                                                             padding: 5,
//                                                             paddingLeft: 10,
//                                                             paddingRight: 10,
//                                                             margin: 5,
//                                                             borderBottomColor: colors.grisbox,
//                                                             borderBottomWidth: 0.5
//                                                         }}
//                                                         onPress={() => {
//                                                             this.setState({ haveAccessTiers: bool.value })
//                                                             this.setState({ haveAccessTiersChoice: false })
//                                                             if (bool.value) {
//                                                                 // this.state.tiersFullName
//                                                                 // this.state.isWritingFullName
//                                                                 this.setState({ tiersFullName: "" })
//                                                                 this.setState({ isWritingFullName: true })
//                                                             }
//                                                         }}
//                                                     >
//                                                         <Text>
//                                                             {
//                                                                 bool.name
//                                                             }
//                                                         </Text>
//                                                     </TouchableOpacity>
//                                                 )
//                                             })
//                                         }
//                                     </View> : null
//                             }
//                         </View>
//                     </View>
//                     {
//                         this.state.haveAccessTiers ?
//                             <View>
//                                 <View style={[styles.sliderCtn]}>
//                                     <View style={[styles.sliderTensionLabelG]}>
//                                         <Text style={[baseStyles.textColorWhite]}>Prénom et nom du tiers</Text>
//                                     </View>
//                                     <View style={[styles.sliderTensionLabelD]}>
//
//                                         <TouchableOpacity
//                                             onPress={() => {
//                                                 this.setState({ isWritingFullName: !this.state.isWritingFullName })
//                                                 this.setState({ sportLevelChoice: false })
//                                                 this.setState({ levelClubChoice: false })
//                                                 this.setState({ trainFrequencyChoice: false })
//                                                 this.setState({ userSportsListChoice: false })
//                                                 this.setState({ userSexeChoice: false })
//                                                 this.setState({ isWritingTaille: false })
//                                             }}
//                                         >
//                                             <Text style={[baseStyles.textColorGrey]}>
//                                                 {this.state.tiersFullName}
//                                             </Text>
//                                         </TouchableOpacity>
//                                         {
//                                             this.state.isWritingFullName ?
//                                                 <View
//                                                     style={{
//                                                         position: "absolute",
//                                                         top: 20,
//                                                         right: 10,
//                                                         backgroundColor: colors.white,
//                                                         borderRadius: 5,
//                                                         zIndex: 999
//                                                     }}
//                                                 >
//                                                     <TextInput
//                                                         value={"" + this.state.tiersFullName}
//                                                         onChangeText={(text) => {
//                                                             this.setState({ tiersFullName: text })
//                                                         }}
//                                                         keyboardAppearance={"default"}
//                                                         keyboardType={"default"}
//                                                         onBlur={() => {
//                                                             // this.state.isWritingFullName
//                                                             this.setState({ isWritingFullName: false })
//                                                         }}
//                                                         style={{
//                                                             width: 200
//                                                         }}
//                                                         autoFocus={true}
//                                                     />
//                                                 </View> : null
//                                         }
//                                     </View>
//                                 </View>
//                                 <View style={[styles.sliderCtn]}>
//                                     <View style={[styles.sliderTensionLabelG]}>
//                                         <Text style={[baseStyles.textColorWhite]}>Adresse mail du tiers</Text>
//                                     </View>
//                                     <View style={[styles.sliderTensionLabelD]}>
//
//                                         <TouchableOpacity
//                                             onPress={() => {
//                                                 this.setState({ isWritingEmail: !this.state.isWritingEmail })
//                                                 this.setState({ sportLevelChoice: false })
//                                                 this.setState({ levelClubChoice: false })
//                                                 this.setState({ trainFrequencyChoice: false })
//                                                 this.setState({ userSportsListChoice: false })
//                                                 this.setState({ userSexeChoice: false })
//                                                 this.setState({ isWritingTaille: false })
//                                             }}
//                                         >
//                                             <Text style={[baseStyles.textColorGrey]}>
//                                                 {this.state.tiersEmail}
//                                             </Text>
//                                         </TouchableOpacity>
//                                         {
//                                             this.state.isWritingEmail ?
//                                                 <View
//                                                     style={{
//                                                         position: "absolute",
//                                                         top: 20,
//                                                         right: 10,
//                                                         backgroundColor: colors.white,
//                                                         borderRadius: 5,
//                                                         zIndex: 999
//                                                     }}
//                                                 >
//                                                     <TextInput
//                                                         value={"" + this.state.tiersEmail}
//                                                         onChangeText={(text) => {
//                                                             this.setState({ tiersEmail: text })
//                                                         }}
//                                                         keyboardAppearance={"default"}
//                                                         keyboardType={"default"}
//                                                         onBlur={() => {
//                                                             // this.state.isWritingFullName
//                                                             this.setState({ isWritingEmail: false })
//                                                         }}
//                                                         style={{
//                                                             width: 200
//                                                         }}
//                                                         autoFocus={true}
//                                                     />
//                                                 </View> : null
//                                         }
//                                     </View>
//                                 </View>
//                                 <View style={[styles.sliderCtn]}>
//                                     <View style={[styles.sliderTensionLabelG]}>
//                                         <Text style={[baseStyles.textColorWhite]}>Fonction du tiers</Text>
//                                     </View>
//                                     <View style={[styles.sliderTensionLabelD]}>
//
//                                         <TouchableOpacity
//                                             onPress={() => {
//                                                 this.setState({ isWritingFonction: !this.state.isWritingFonction })
//                                                 this.setState({ sportLevelChoice: false })
//                                                 this.setState({ levelClubChoice: false })
//                                                 this.setState({ trainFrequencyChoice: false })
//                                                 this.setState({ userSportsListChoice: false })
//                                                 this.setState({ userSexeChoice: false })
//                                                 this.setState({ isWritingTaille: false })
//                                             }}
//                                         >
//                                             <Text style={[baseStyles.textColorGrey]}>
//                                                 {this.state.tiersFonction}
//                                             </Text>
//                                         </TouchableOpacity>
//                                         {
//                                             this.state.isWritingFonction ?
//                                                 <View
//                                                     style={{
//                                                         position: "absolute",
//                                                         top: 20,
//                                                         right: 10,
//                                                         backgroundColor: colors.white,
//                                                         borderRadius: 5,
//                                                         zIndex: 999
//                                                     }}
//                                                 >
//                                                     <TextInput
//                                                         value={"" + this.state.tiersFonction}
//                                                         onChangeText={(text) => {
//                                                             this.setState({ tiersFonction: text })
//                                                         }}
//                                                         keyboardAppearance={"default"}
//                                                         keyboardType={"default"}
//                                                         onBlur={() => {
//                                                             // this.state.isWritingFullName
//                                                             this.setState({ isWritingFonction: false })
//                                                         }}
//                                                         style={{
//                                                             width: 200
//                                                         }}
//                                                         autoFocus={true}
//                                                     />
//                                                 </View> : null
//                                         }
//                                     </View>
//                                 </View></View> : null
//                     }
//                     <View style={[styles.separator, { height: 0 }]}></View>
//
//                     <MAAButton text={"SUIVANT"} width={(screenWidth - 100)} height={40}
//                         onPress={async () => {
//                             console.log("Suivant")
//                                 await this.putUserData()
//                               this.props.navigation.navigate('MyEnergy')
//                               const setActiveFPAction = { type: SET_ACTIVE_FP, value: 2 }
//                               this.props.dispatch(setActiveFPAction)
//
//
//                         }}
//                         style={[styles.btnValidate]} />
//                     <MAAButton text={"MON PROFIL"} width={(screenWidth - 100)} height={40} backgroundColor='transparent' borderColor='#fff'
//                         onPress={async () => {
//                        await this.putUserData()
//                             const setActiveFPAction = { type: SET_ACTIVE_FP, value: null}
//                             this.props.dispatch(setActiveFPAction)
//
//                             this.props.navigation.popToTop()
//
//
//                         }}
//                         style={[styles.btnMonProfil]} />
//
//
//
//                     <DateTimePicker
//                         isVisible={this.state.isDateTimePickerVisible}
//                         onConfirm={this.handleDatePicked}
//                         onCancel={this.hideDateTimePicker}
//                         maximumDate={new Date()}
//                     />
//                 </ScrollView>
//             </LinearGradient>
//         )
//     }
// }
//
// // export default AddTension;
// const mapStateToProps = (state) => {
//     const { isFichePedag ,userToken} = state.statedata
//     return { isFichePedag,userToken }
// };
//
// export default connect(mapStateToProps)(DonneesPerso);
