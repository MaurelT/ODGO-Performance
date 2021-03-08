import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    ScrollView,
    View,
    Text,
    TouchableOpacity,
    Dimensions,
    StatusBar,
    Modal,
    RefreshControl,
    TextInput,
    Alert,
    DatePickerAndroid,
    TouchableWithoutFeedback,
    // DatePickerIOS,
    Platform, Keyboard, Animated,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import AsyncStorage from '@react-native-community/async-storage';
import baseStyles from '../../../../base/BaseStyles';
import styles from './styles'
import colors from '../../../../configs/colors';
import LinearGradient from 'react-native-linear-gradient';
import ZonePicker from '../../../../components/ZonePicker/ZonePicker';
import MAAButton from '../../../../components/MAAButton/MAAButton';
import AutoHeightImage from 'react-native-auto-height-image';
import {
    SET_ACTIVE_FP,
    SET_ACTIVE_TAB,
    SET_ACTIVE_TABMENU_MYENERGY,
    SET_HIDDEN_FOOTER,
} from '../../../../redux/types/tabTypes';
import PersonalDataHelper from '../../../../apis/helpers/person_data_helper';
import DateTimePicker from 'react-native-modal-datetime-picker';
import moment from 'moment';
import Slidebottom from '../../../../components/selectslidebottom/Slidebottom';
import MAAInputText from '../../../../components/MAAInputText/MAAInputText';
import { validators } from '../../../../apis/validators'; // j'ai changé datepickerandroid with this plugin

const screen = Dimensions.get("window");
const SBHelight = StatusBar.currentHeight;
const screenWidth = screen.width
const screenHeight = screen.height - SBHelight



class DonneesPerso extends Component {
    textAnimationValue = new Animated.Value(0)

    constructor(props) {
        super(props)
        this.state = {
            refreshing: true,
            activeMenu: 2,
            selectedZone: props.selectedZone,
            zonePicker: false,
            sliderValueIntensite: 3.45,
            sliderValueDifficulte: 3,
            sliderValueQualite: 4,
            sliderValueImplication: 2,
            isDateTimePickerVisible: false,
            // date_text:moment(new Date()).format("DD/MM/YYYY"),

            userData: null,
            checkUserdata: [null, null, null, null, null, null, null, null, null, null],

            userSexe: "",
            userSexeChoice: false,
            possibleSexe: [
                {
                    id: 1,
                    name: "Homme",
                    value: "H"
                },
                {
                    id: 2,
                    name: "Femme",
                    value: "F"
                }
            ],

            userBirthDay: "",
            dateSelectedForsave: moment(new Date()).format("YYYY-MM-DD"),


            userNationality: null,
            userNationalitiesChoice: false,
            userNationalities: [], //izy rehetra mapevana

            userTaille: 0,
            isWritingTaille: false,

            userWeight: 0,
            isWritingWeight: false,

            userSports: [],
            selectedSport: null,
            userSportsListChoice: false,

            sportLevels: [],
            selectedSportLevel: { id: null, name: null },
            sportLevelChoice: false,

            levelClubs: [],
            selectedLevelClub: null,
            levelClubChoice: false,

            userNationalClub: false,
            userNationalClubChoice: false,
            userNationalClubName: "",
            isWritingNationalClubName: false,



            haveAccessTiers: false,
            haveAccessTiersChoice: false,
            tiersFullName: "_______________",
            isWritingFullName: false,
            tiersEmail: "_______________",
            isWritingEmail: false,
            tiersFonction: "_______________",
            isWritingFonction: false,

            booleanValues: [
                {
                    id: 1,
                    name: "Oui",
                    value: true
                },
                {
                    id: 2,
                    name: "Non",
                    value: false
                }
            ],
            tempsaveuserTaille: null,
            tempsaveuserWeight: null,
            isamateurclub: false,
            levelClubCustom: false,
            customclubname: "",
            animText: false,
        }
    }

    async componentDidMount() {

        this.getUserData().then((retour) => {
            console.warn("my retour", retour);
            if (retour !== null) {
                if (retour.data.sport_niveau_club !== null) {
                    this.getListClubs(retour.data.sport_niveau_club.sport_niveaux.sport.id, retour.data.sport_niveau_club.sport_niveaux.id) //idsport , id level
                }
            }
            this.getUserSports(retour);

        });
        this.getUserNationalities();
        // this.getTrainingFrequency();

        Keyboard.addListener(
            "keyboardDidHide",
            () => {
                const setHiddenFooter = { type: SET_HIDDEN_FOOTER, value: false };
                this.props.dispatch(setHiddenFooter);

            }
        );
        this.keyboardDidShowListener = Keyboard.addListener(
            "keyboardDidShow",
            () => {
                const setHiddenFooter = { type: SET_HIDDEN_FOOTER, value: true };
                this.props.dispatch(setHiddenFooter);
            }
        );
    }

    animateClickedText = () => {
        this.textAnimationValue.setValue(0)
        Animated.spring(
            this.textAnimationValue,
            {
                toValue: 1,
                friction: 3
            }
        )
            .start(() => {
            })
    };


    showDateTimePicker = () => {
        this.setState({ isDateTimePickerVisible: true });
    };

    hideDateTimePicker = () => {
        this.setState({ isDateTimePickerVisible: false });
    };

    handleDatePicked = date => {
        this.setState({ userBirthDay: moment(date).format("DD/MM/YYYY"), dateSelectedForsave: moment(date).format("YYYY-MM-DD") })
        let checkUserdata = this.state.checkUserdata;
        checkUserdata[1] = 'datenaissance';
        this.setState({ checkUserdata: checkUserdata });
        this.hideDateTimePicker();
    };



    formatBirthDate = (date_text) => {
        const birthDay = new Date(date_text)
        let birthDayFR = "" + (birthDay.getUTCDate() > 9 ? birthDay.getUTCDate() : ("0" + birthDay.getUTCDate())) + "/" +
            ((birthDay.getMonth() + 1) > 9 ? (birthDay.getMonth() + 1) : "0" + (birthDay.getMonth() + 1)) +
            "/" + birthDay.getFullYear()
        return birthDayFR
    }

    getUserNationalities = async () => {
        const userNationalities = await PersonalDataHelper.getNationalities(this.props.userToken)
        this.setState({ userNationalities: userNationalities.data })
    };

    getFirstConnexion = async () => {
        const msi = await PersonalDataHelper.getFirstConnexion(this.props.userToken);
        console.warn('msi', msi)
    };

    getUserSports = async (retour) => {
        console.warn('userSports0');
        const userSports = await PersonalDataHelper.getSports(this.props.userToken);
        console.warn('userSports', userSports);
        if (userSports.data !== null) {
            this.setState({ userSports: userSports.data });
        }
        if (retour === null) {
            await this.getSportListLevels(userSports.data[0].id)
        }
    }

    getSportListLevels = async (id_sport) => {
        const sportListLevels = await PersonalDataHelper.getLevels(this.props.userToken, id_sport);
        if (sportListLevels.data.length === 0) {
            this.setState({ sportLevels: [{ id: null, name: null }] })
            this.setState({ selectedLevelClub: null });

        } else {
            this.setState({ sportLevels: sportListLevels.data })
        }

        // await this.getListClubs(id_sport, sportListLevels.data[0].id)
    }

    getListClubs = async (id_sport, id_level) => {
        const listClubs = await PersonalDataHelper.getClubs(this.props.userToken, id_sport, id_level);
        if (listClubs) {
            this.setState({ levelClubs: listClubs.data });
        }

        // this.setState({selectedLevelClub: listClubs.data[0]})
    }

    getTrainingFrequency = async () => {
        const trainFrequency = await PersonalDataHelper.getTrainingFrequency(this.props.userToken);
        if (trainFrequency.data !== null) {
            this.setState({ trainFrequency: trainFrequency.data, refreshing: false })
        }

    };

    getUserData = async () => {
        this.setState({ refreshing: true });
        const userData = await PersonalDataHelper.getUserData(this.props.userToken);
        if (userData.success === true) {
            this.setState({ userData: userData.data });
            this.setState({ userSexe: userData.data.sexe }, () => {
                let checkUserdata = this.state.checkUserdata;
                checkUserdata[0] = 'sexe';
                this.setState({ checkUserdata: checkUserdata });
            });

            const birthDayFR = moment(userData.data.date_naissance).format('DD/MM/YYYY');
            console.warn("birthdayfr0", birthDayFR)
            try {
                if (userData.data.sport_niveau_club !== null) {
                    global.is_individual = userData.data.sport_niveau_club.sport_niveaux.sport.is_individual;
                }

                console.warn("birthdayfr", birthDayFR)
                if (birthDayFR == null || birthDayFR === "" || birthDayFR === undefined) {
                    this.setState({ userBirthDay: "YYYY/MM/DD" });
                } else {
                    this.setState({ userBirthDay: birthDayFR }, () => {
                        let checkUserdata = this.state.checkUserdata;
                        checkUserdata[1] = 'datenaissance';
                        this.setState({ checkUserdata: checkUserdata });
                    });
                }
                this.setState({ dateSelectedForsave: userData.data.date_naissance.toString().substring(0, 10) });

                if (userData.data.nationalite == null || userData.data.nationalite === "" || userData.data.nationalite === undefined) {
                    this.setState({ userNationality: null });
                } else {
                    this.setState({ userNationality: userData.data.nationalite }, () => {
                        let checkUserdata = this.state.checkUserdata;
                        checkUserdata[2] = 'nationalite';
                        this.setState({ checkUserdata: checkUserdata });
                    });
                }

                if (userData.data.taille_cm == null || userData.data.taille_cm === "" || userData.data.taille_cm === undefined) {
                    this.setState({ userTaille: 0 });
                } else {
                    this.setState({ userTaille: userData.data.taille_cm });
                }

                if (userData.data.poids_kg == null || userData.data.poids_kg === "" || userData.data.poids_kg === undefined) {
                    this.setState({ userWeight: 0 });
                } else {
                    this.setState({ userWeight: userData.data.poids_kg });
                }



                if (userData.data.nom_equipe === null) {
                    this.setState({ userNationalClubName: "_______________" })
                } else {
                    this.setState({ userNationalClubName: userData.data.nom_equipe })
                }


                this.setState({ selectedSport: userData.data.sport_niveau_club.sport_niveaux.sport }, () => {
                    let checkUserdata = this.state.checkUserdata;
                    checkUserdata[5] = 'sport';
                    this.setState({ checkUserdata: checkUserdata });
                });

                this.setState({ selectedSportLevel: userData.data.sport_niveau_club.sport_niveaux })
                this.getSportListLevels(userData.data.sport_niveau_club.sport_niveaux.sport.id)
            } catch (e) { }


            this.setState({ selectedLevelClub: userData.data.sport_niveau_club })

            if (userData.data.nom_equipe === null) {
                this.setState({ userNationalClub: false })
            } else {
                this.setState({ userNationalClub: userData.data.equipe_nationale })
            }

            if (userData.data.have_acces_tiers === null) {
                this.setState({ haveAccessTiers: false })
            } else {
                this.setState({ haveAccessTiers: userData.data.have_acces_tiers })
            }

            if (userData.data.prenom_nom_tiers === null) {

                this.setState({ tiersFullName: "_______________" })
            } else {
                this.setState({ tiersFullName: userData.data.prenom_nom_tiers })
            }

            if (userData.data.email_tiers === null) {
                this.setState({ tiersEmail: "_______________" })
            } else {
                this.setState({ tiersEmail: userData.data.email_tiers })
            }

            if (userData.data.fonction_tiers === null) {
                this.setState({ tiersFonction: "_______________" })
            } else {
                this.setState({ tiersFonction: userData.data.fonction_tiers });
            }
            this.setState({ refreshing: false });//za nanao anio
            console.warn('ato v')
            return userData;
        } else {
            this.setState({ refreshing: false });//za nanao anio
            this.setState({ selectedSportLevel: { id: null, name: null } });
            return null;
        }

    };

    changeBirthDay = async () => {
        // if (Platform.OS === "android") {
        try {
            const { action, year, month, day } = await DatePickerAndroid.open({
                // Use `new Date()` for current date.
                // May 25 2020. Month 0 is January.
                date: new Date()
            });

            if (action !== DatePickerAndroid.dismissedAction) {
                // Selected year, month (0-11), day
                await this.setState({ userBirthDay: (day > 9 ? day : ("0" + day)) + "/" + ((month + 1) > 9 ? (month + 1) : ("0" + (month + 1))) + "/" + year })
                await this.setState({ dateSelectedForsave: year + "-" + ((month + 1) > 9 ? (month + 1) : ("0" + (month + 1))) + "-" + (day > 9 ? day : ("0" + day)) })

                // let newBirthDate = new Date(year, month, day, 0, 0, 0, 0)
                // const dateNais = newBirthDate.getVarDate()
            }
        } catch ({ code, message }) {
            console.warn('Cannot open date picker', message);
        }
        // }
        // else if (Platform.OS === "ios") {
        // }

    };

    putUserData = async () => {
        this.setState({ refreshing: true });
        let resPutUserData = 'tslasa';
        console.warn(this.state.haveAccessTiers, "_______________");


        if (this.state.userSexe !== "" && this.state.userSexe !== "_______________" && this.state.userSexe !== null && this.state.userBirthDay !== "" && this.state.userBirthDay !== "YYYY/MM/DD" && this.state.userNationality !== null) {
            if (this.state.userTaille < 300 && this.state.userTaille !== 0 && this.state.userWeight.toString().length <= 3 && this.state.userWeight !== 0) {
                if (this.state.selectedSport !== null && {/* this.state.selectedLevelClub !== null */ } && this.state.selectedSportLevel.id !== null) {
                    console.warn('userNationalClub hoe', this.state.userNationalClubName, this.state.userNationalClub)
                    if (this.state.userNationalClubName !== "" && this.state.userNationalClubName !== "_______________" && this.state.userNationalClub === true) {
                        if (this.state.tiersFullName !== "" && this.state.tiersFullName !== "_______________" && validators.validateEMail(this.state.tiersEmail) && this.state.tiersEmail !== "" && this.state.tiersFonction !== "" && this.state.tiersFonction !== "_______________" && this.state.haveAccessTiers) {

                            if (this.state.selectedLevelClub === null && this.state.isamateurclub === false) {
                                Alert.alert('Odgo', 'Veuillez choisir le club sportif.')

                            } else if (this.state.isamateurclub === true && this.state.customclubname === "") {
                                Alert.alert('Odgo', 'Veuillez insérer votre club sportif.')
                            } else {
                                if (this.state.isamateurclub === true) {
                                    resPutUserData = await PersonalDataHelper.putUserData(
                                        this.props.userToken,
                                        this.state.userSexe,
                                        this.state.dateSelectedForsave,
                                        this.state.userNationality.id,
                                        this.state.userTaille,
                                        parseInt(this.state.userWeight, 10),
                                        this.state.selectedSportLevel.id,
                                        100,//ts miasa fa alefa ftsn
                                        this.state.customclubname,
                                        this.state.userNationalClub,
                                        this.state.userNationalClubName,
                                        this.state.haveAccessTiers,
                                        this.state.tiersFullName,
                                        this.state.tiersEmail,
                                        this.state.tiersFonction,
                                        this.state.isamateurclub
                                    );
                                    if (resPutUserData !== 'tslasa') {
                                        this.getUserData()
                                    }
                                } else {
                                    resPutUserData = await PersonalDataHelper.putUserData(
                                        this.props.userToken,
                                        this.state.userSexe,
                                        this.state.dateSelectedForsave,
                                        this.state.userNationality.id,
                                        this.state.userTaille,
                                        parseInt(this.state.userWeight, 10),
                                        this.state.selectedSportLevel.id,
                                        this.state.selectedLevelClub.id,
                                        this.state.customclubname,
                                        this.state.userNationalClub,
                                        this.state.userNationalClubName,
                                        this.state.haveAccessTiers,
                                        this.state.tiersFullName,
                                        this.state.tiersEmail,
                                        this.state.tiersFonction,
                                        this.state.isamateurclub
                                    );
                                    if (resPutUserData !== 'tslasa') {
                                        this.getUserData()
                                    }
                                }
                            }

                        } else {

                            if ((this.state.tiersFullName === "" || this.state.tiersFullName === "_______________") && this.state.haveAccessTiers === true) {
                                Alert.alert('Odgo', 'Veuillez insérer le prénom et nom du tiers.')
                            } else if (!validators.validateEMail(this.state.tiersEmail) && this.state.haveAccessTiers === true) {
                                if (this.state.tiersEmail === "_______________") {
                                    Alert.alert('Odgo', 'Veuillez insérer l\'adresse e-mail du tiers.')
                                } else {
                                    Alert.alert('Odgo', 'L\'adresse e-mail que vous avez insérée n\'est pas valide.')
                                }
                            } else if ((this.state.tiersFonction === "" || this.state.tiersFonction === "_______________") && this.state.haveAccessTiers === true) {
                                Alert.alert('Odgo', 'Veuillez insérer la fonction du tiers.')
                            } else if (this.state.haveAccessTiers === false) {
                                if (this.state.selectedLevelClub === null && this.state.isamateurclub === false) {
                                    Alert.alert('Odgo', 'Veuillez choisir le club sportif.')

                                } else if (this.state.isamateurclub === true && this.state.customclubname === "") {
                                    Alert.alert('Odgo', 'Veuillez insérer votre club sportif.')
                                } else {
                                    if (this.state.isamateurclub === true) {
                                        console.warn('ato indray')
                                        resPutUserData = await PersonalDataHelper.putUserData(
                                            this.props.userToken,
                                            this.state.userSexe,
                                            this.state.dateSelectedForsave,
                                            this.state.userNationality.id,
                                            this.state.userTaille,
                                            parseInt(this.state.userWeight, 10),
                                            this.state.selectedSportLevel.id,
                                            100,//ts miasa fa alefa ftsn
                                            this.state.customclubname,
                                            this.state.userNationalClub,
                                            this.state.userNationalClubName,
                                            this.state.haveAccessTiers,
                                            this.state.tiersFullName,
                                            this.state.tiersEmail,
                                            this.state.tiersFonction,
                                            this.state.isamateurclub
                                        );
                                        if (resPutUserData !== 'tslasa') {
                                            this.getUserData()
                                        }
                                    } else {
                                        resPutUserData = await PersonalDataHelper.putUserData(
                                            this.props.userToken,
                                            this.state.userSexe,
                                            this.state.dateSelectedForsave,
                                            this.state.userNationality.id,
                                            this.state.userTaille,
                                            parseInt(this.state.userWeight, 10),
                                            this.state.selectedSportLevel.id,
                                            this.state.selectedLevelClub.id,
                                            this.state.customclubname,
                                            this.state.userNationalClub,
                                            this.state.userNationalClubName,
                                            this.state.haveAccessTiers,
                                            this.state.tiersFullName,
                                            this.state.tiersEmail,
                                            this.state.tiersFonction,
                                            this.state.isamateurclub
                                        );
                                        if (resPutUserData !== 'tslasa') {
                                            this.getUserData()
                                        }
                                    }
                                }
                            } else {
                                Alert.alert('Odgo', 'Veuillez bien remplir les données tiers.')
                            }
                        }

                    } else {
                        console.warn("data", this.state.userNationalClub)
                        if (this.state.userNationalClub === false) {// refa false le national club name de ts alefa le nom club
                            if (this.state.tiersFullName !== "" && this.state.tiersFullName !== "_______________" && validators.validateEMail(this.state.tiersEmail) && this.state.tiersEmail !== "" && this.state.tiersFonction !== "" && this.state.tiersFonction !== "_______________" && this.state.haveAccessTiers) {
                                if (this.state.selectedLevelClub === null && this.state.isamateurclub === false) {
                                    Alert.alert('Odgo', 'Veuillez choisir le club sportif.')

                                } else if (this.state.isamateurclub === true && this.state.customclubname === "") {
                                    Alert.alert('Odgo', 'Veuillez insérer votre club sportif.')
                                } else {
                                    if (this.state.isamateurclub === true) {
                                        console.warn('ato indray')
                                        resPutUserData = await PersonalDataHelper.putUserData(
                                            this.props.userToken,
                                            this.state.userSexe,
                                            this.state.dateSelectedForsave,
                                            this.state.userNationality.id,
                                            this.state.userTaille,
                                            parseInt(this.state.userWeight, 10),
                                            this.state.selectedSportLevel.id,
                                            100,//ts miasa fa alefa ftsn
                                            this.state.customclubname,
                                            this.state.userNationalClub,
                                            this.state.userNationalClubName,
                                            this.state.haveAccessTiers,
                                            this.state.tiersFullName,
                                            this.state.tiersEmail,
                                            this.state.tiersFonction,
                                            this.state.isamateurclub
                                        );
                                        if (resPutUserData !== 'tslasa') {
                                            this.getUserData()
                                        }
                                    } else {
                                        resPutUserData = await PersonalDataHelper.putUserData(
                                            this.props.userToken,
                                            this.state.userSexe,
                                            this.state.dateSelectedForsave,
                                            this.state.userNationality.id,
                                            this.state.userTaille,
                                            parseInt(this.state.userWeight, 10),
                                            this.state.selectedSportLevel.id,
                                            this.state.selectedLevelClub.id,
                                            this.state.customclubname,
                                            this.state.userNationalClub,
                                            this.state.userNationalClubName,
                                            this.state.haveAccessTiers,
                                            this.state.tiersFullName,
                                            this.state.tiersEmail,
                                            this.state.tiersFonction,
                                            this.state.isamateurclub
                                        );
                                        if (resPutUserData !== 'tslasa') {
                                            this.getUserData()
                                        }
                                    }
                                }
                            } else {

                                if ((this.state.tiersFullName === "" || this.state.tiersFullName === "_______________") && this.state.haveAccessTiers === true) {
                                    Alert.alert('Odgo', 'Veuillez insérer le prénom et nom du tiers.')
                                } else if (!validators.validateEMail(this.state.tiersEmail) && this.state.haveAccessTiers === true) {
                                    if (this.state.tiersEmail === "_______________") {
                                        Alert.alert('Odgo', 'Veuillez insérer l\'adresse e-mail du tiers.')
                                    } else {
                                        Alert.alert('Odgo', 'L\'adresse e-mail que vous avez insérée n\'est pas valide.')
                                    }
                                } else if ((this.state.tiersFonction === "" || this.state.tiersFonction === "_______________") && this.state.haveAccessTiers === true) {
                                    Alert.alert('Odgo', 'Veuillez insérer la fonction du tiers.')
                                } else if (this.state.haveAccessTiers === false) {
                                    if (this.state.selectedLevelClub === null && this.state.isamateurclub === false) {
                                        Alert.alert('Odgo', 'Veuillez choisir le club sportif.')

                                    } else if (this.state.isamateurclub === true && this.state.customclubname === "") {
                                        Alert.alert('Odgo', 'Veuillez insérer votre club sportif.')
                                    } else {
                                        if (this.state.isamateurclub === true) {
                                            console.warn('ato indray')
                                            resPutUserData = await PersonalDataHelper.putUserData(
                                                this.props.userToken,
                                                this.state.userSexe,
                                                this.state.dateSelectedForsave,
                                                this.state.userNationality.id,
                                                this.state.userTaille,
                                                parseInt(this.state.userWeight, 10),
                                                this.state.selectedSportLevel.id,
                                                100,//ts miasa fa alefa ftsn
                                                this.state.customclubname,
                                                this.state.userNationalClub,
                                                this.state.userNationalClubName,
                                                this.state.haveAccessTiers,
                                                this.state.tiersFullName,
                                                this.state.tiersEmail,
                                                this.state.tiersFonction,
                                                this.state.isamateurclub
                                            );
                                            if (resPutUserData !== 'tslasa') {
                                                this.getUserData()
                                            }
                                        } else {
                                            resPutUserData = await PersonalDataHelper.putUserData(
                                                this.props.userToken,
                                                this.state.userSexe,
                                                this.state.dateSelectedForsave,
                                                this.state.userNationality.id,
                                                this.state.userTaille,
                                                parseInt(this.state.userWeight, 10),
                                                this.state.selectedSportLevel.id,
                                                this.state.selectedLevelClub.id,
                                                this.state.customclubname,
                                                this.state.userNationalClub,
                                                this.state.userNationalClubName,
                                                this.state.haveAccessTiers,
                                                this.state.tiersFullName,
                                                this.state.tiersEmail,
                                                this.state.tiersFonction,
                                                this.state.isamateurclub
                                            );
                                            if (resPutUserData !== 'tslasa') {
                                                this.getUserData()
                                            }
                                        }
                                    }
                                } else {
                                    Alert.alert('Odgo', 'Veuillez bien remplir les données tiers.')
                                }
                            }

                        } else {
                            Alert.alert('Odgo', 'Veuillez insérer votre équipe nationale.')
                        } //tampitra eto le club sportif oui non
                    }
                } else {
                    this.setState({ refreshing: false });
                    if (this.state.selectedSport == null) {
                        Alert.alert('Odgo', 'Veuillez choisir votre activité sportive.')
                    } else if (this.state.selectedSportLevel.id == null) {
                        Alert.alert('Odgo', 'Veuillez choisir votre niveau d\'activité sportive.')
                    }

                }
            } else {
                console.warn(this.state.userTaille)
                if (this.state.userTaille >= 300 || this.state.userTaille === 0) {
                    this.setState({ refreshing: false });
                    Alert.alert('Odgo', 'La taille saisie n\'est pas valide.')
                } else
                    if (this.state.userWeight.toString().length > 3 || this.state.userWeight === 0) {
                        this.setState({ refreshing: false })
                        Alert.alert('Odgo', 'Le poids saisie n\'est pas valide.')
                    }
            }
        } else {
            //alert

            if (this.state.userSexe === "" || this.state.userSexe === "_______________" || this.state.userSexe === null) {
                this.setState({ refreshing: false })
                Alert.alert('Odgo', 'Veuillez choisir votre sexe.')
            }

            if (this.state.userBirthDay === "" || this.state.userBirthDay === "YYYY/MM/DD") {
                this.setState({ refreshing: false })
                Alert.alert('Odgo', 'Veuillez choisir votre date de naissance.')
            }

            if (this.state.userNationality === null) {
                this.setState({ refreshing: false })
                Alert.alert('Odgo', 'Veuillez choisir votre nationalité.')
            }
        }
        if (resPutUserData) {
            //taptra eto
            console.warn('odgomad', resPutUserData)
        }
        return resPutUserData;
    };

    pressSexe() {
        this.setState({ userSexeChoice: !this.state.userSexeChoice })
        this.setState({ sportLevelChoice: false })
        this.setState({ levelClubChoice: false })
        this.setState({ userSportsListChoice: false })
        this.setState({ userNationalitiesChoice: false })
        this.setState({ isWritingTaille: false });
        this.setState({ isWritingWeight: false });
        this.setState({ isWritingFullName: false })
        this.setState({ isWritingEmail: false })
        this.setState({ isWritingFonction: false })
        this.setState({ userNationalClubChoice: false })
        this.setState({ isWritingNationalClubName: false })
        this.setState({ levelClubCustom: false })
    }

    pressNationalite() {
        this.setState({ userNationalitiesChoice: !this.state.userNationalitiesChoice })
        this.setState({ sportLevelChoice: false })
        this.setState({ levelClubChoice: false })
        this.setState({ userSportsListChoice: false })
        this.setState({ userSexeChoice: false })
        this.setState({ isWritingTaille: false, });
        this.setState({ isWritingWeight: false, });
        this.setState({ isWritingFullName: false })
        this.setState({ isWritingEmail: false })
        this.setState({ isWritingFonction: false })
        this.setState({ userNationalClubChoice: false })
        this.setState({ isWritingNationalClubName: false })
        this.setState({ levelClubCustom: false })
    }

    pressTaille() {
        this.setState({ isWritingTaille: !this.state.isWritingTaille, })
        this.setState({ sportLevelChoice: false })
        this.setState({ levelClubChoice: false })
        this.setState({ userSportsListChoice: false })
        this.setState({ userSexeChoice: false })
        this.setState({ isWritingWeight: false });
        this.setState({ isWritingFullName: false })
        this.setState({ isWritingEmail: false })
        this.setState({ isWritingFonction: false })
        this.setState({ userNationalClubChoice: false })
        this.setState({ isWritingNationalClubName: false })
        this.setState({ levelClubCustom: false })

    }


    pressPoids() {
        this.setState({ isWritingWeight: !this.state.isWritingWeight })
        this.setState({ sportLevelChoice: false })
        this.setState({ levelClubChoice: false })
        this.setState({ userSportsListChoice: false })
        this.setState({ userSexeChoice: false })
        this.setState({ isWritingTaille: false });
        this.setState({ isWritingFullName: false })
        this.setState({ isWritingEmail: false })
        this.setState({ isWritingFonction: false })
        this.setState({ userNationalClubChoice: false })
        this.setState({ isWritingNationalClubName: false })
        this.setState({ levelClubCustom: false })
    }

    pressSport() {
        this.setState({ userSportsListChoice: !this.state.userSportsListChoice })
        this.setState({ sportLevelChoice: false })
        this.setState({ levelClubChoice: false })
        this.setState({ isWritingFullName: false })
        this.setState({ isWritingEmail: false })
        this.setState({ isWritingFonction: false })
        this.setState({ userNationalClubChoice: false })
        this.setState({ isWritingNationalClubName: false })
        this.setState({ userSexeChoice: false })
        this.setState({ isWritingTaille: false });
        this.setState({ isWritingWeight: false });
        this.setState({ levelClubCustom: false })
    }

    pressNiveau() {
        this.setState({ sportLevelChoice: !this.state.sportLevelChoice })
        this.setState({ userSportsListChoice: false })
        this.setState({ levelClubChoice: false })
        this.setState({ isWritingFullName: false })
        this.setState({ isWritingEmail: false })
        this.setState({ isWritingFonction: false })
        this.setState({ userNationalClubChoice: false })
        this.setState({ isWritingNationalClubName: false })
        this.setState({ userSexeChoice: false })
        this.setState({ isWritingTaille: false });
        this.setState({ isWritingWeight: false });
        this.setState({ levelClubCustom: false })
    }

    pressEquipenationale() {
        this.setState({ userNationalClubChoice: !this.state.userNationalClubChoice })
        this.setState({ sportLevelChoice: false });
        this.setState({ levelClubChoice: false })
        this.setState({ userSportsListChoice: false })
        this.setState({ userNationalitiesChoice: false })
        this.setState({ isWritingFullName: false })
        this.setState({ isWritingEmail: false })
        this.setState({ isWritingFonction: false })
        this.setState({ isWritingNationalClubName: false })
        this.setState({ userSexeChoice: false })
        this.setState({ isWritingTaille: false });
        this.setState({ isWritingWeight: false });
        this.setState({ levelClubCustom: false })

    }



    pressClub() {
        if (this.state.isamateurclub === false) {
            this.setState({ levelClubChoice: !this.state.levelClubChoice, levelClubCustom: false });
        } else {
            this.setState({ levelClubChoice: false, levelClubCustom: !this.state.levelClubCustom });
        }

        this.setState({ userSportsListChoice: false })
        this.setState({ sportLevelChoice: false })
        this.setState({ isWritingFullName: false })
        this.setState({ isWritingEmail: false })
        this.setState({ isWritingFonction: false })
        this.setState({ userNationalClubChoice: false })
        this.setState({ isWritingNationalClubName: false })
        this.setState({ userSexeChoice: false })
        this.setState({ isWritingTaille: false });
        this.setState({ isWritingWeight: false });
    }

    pressnomEquipenational() {
        this.setState({ isWritingNationalClubName: !this.state.isWritingNationalClubName })
        this.setState({ sportLevelChoice: false })
        this.setState({ levelClubChoice: false })
        this.setState({ userSportsListChoice: false })
        this.setState({ userSexeChoice: false })
        this.setState({ isWritingTaille: false })
        this.setState({ isWritingFullName: false })
        this.setState({ isWritingEmail: false })
        this.setState({ isWritingFonction: false })
        this.setState({ userNationalClubChoice: false })
        this.setState({ userSexeChoice: false })
        this.setState({ isWritingWeight: false });
        this.setState({ levelClubCustom: false })
    }



    pressVoulezvousaccesstiers() {
        this.setState({ haveAccessTiersChoice: !this.state.haveAccessTiersChoice })
        this.setState({ sportLevelChoice: false })
        this.setState({ levelClubChoice: false })
        this.setState({ userSportsListChoice: false })
        this.setState({ userNationalitiesChoice: false })
        this.setState({ isWritingFullName: false })
        this.setState({ isWritingEmail: false })
        this.setState({ isWritingFonction: false })
        this.setState({ userNationalClubChoice: false })
        this.setState({ isWritingNationalClubName: false })
        this.setState({ userSexeChoice: false })
        this.setState({ isWritingTaille: false });
        this.setState({ isWritingWeight: false });
        this.setState({ levelClubCustom: false })
    }

    render() {
        const textAnime = this.textAnimationValue.interpolate({
            inputRange: [0, 0.5, 1],
            outputRange: [14, 18, 14]
        });

        this.state.selectedSport !== null && this.animateClickedText();

        let donneesutilisateur = null;
        let donneesutilisateur1 = null;
        let donneesutilisateur2 = null;
        let donneesutilisateur3 = null;
        let donneesutilisateur4 = null;
        try {
            donneesutilisateur = this.state.userData.taille_cm
            donneesutilisateur1 = this.state.userData.poids_kg
            donneesutilisateur2 = this.state.userData.equipe_nationale
            donneesutilisateur4 = this.state.userData.fonction_tiers

        } catch (e) { }
        return (
            <KeyboardAwareScrollView>
                <LinearGradient
                    onStartShouldSetResponder={() => {
                        this.setState({ userSexeChoice: false })
                        this.setState({ sportLevelChoice: false })
                        this.setState({ levelClubChoice: false })
                        this.setState({ userSportsListChoice: false })
                        this.setState({ userNationalitiesChoice: false })
                        this.setState({ isWritingFullName: false })
                        this.setState({ isWritingEmail: false })
                        this.setState({ isWritingFonction: false })
                        this.setState({ isWritingTaille: false })
                        this.setState({ isWritingWeight: false })
                        this.setState({ userNationalClubChoice: false })
                        this.setState({ isWritingNationalClubName: false })
                        this.setState({ levelClubCustom: false })
                        this.setState({ animText: false })

                    }
                    }
                    start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }} colors={[colors.balck, colors.green, colors.balck]} >
                    <ScrollView
                        style={styles.scrollView}
                        contentContainerStyle={[styles.contentContainerStyle]}
                        keyboardShouldPersistTaps="always"
                        refreshControl={
                            <RefreshControl
                                refreshing={this.state.refreshing}
                                onRefresh={() => {
                                     this.setState({ refreshing: true })
                                     setTimeout(() => {
                                         this.setState({ refreshing: false })
                                     }, 2000)
                                }}
                                tintColor={Platform.OS==='ios'?colors.white:colors.green}
                                colors={[Platform.OS==='ios'?colors.white:colors.green]}
                            />
                        }
                    >

                        {/*<View style={{*/}
                        {/*    flexDirection: "row",*/}
                        {/*    width: screenWidth,*/}
                        {/*    alignItems: "center",*/}
                        {/*    justifyContent: "space-between",*/}
                        {/*    padding: 15,*/}
                        {/*    paddingLeft: 0,*/}
                        {/*    paddingRight: 0,*/}
                        {/*    // backgroundColor: colors.balck*/}
                        {/*}}>*/}
                        {/*    {this.props.isvenudonneperso === true ? <View/> :<TouchableOpacity style={{*/}
                        {/*        width: 40, height: 40, alignItems: "center",*/}
                        {/*        justifyContent: "center"*/}
                        {/*    }}*/}
                        {/*                    >*/}
                        {/*        <AutoHeightImage*/}
                        {/*            width={20}*/}
                        {/*            source={require("../../../../assets/icons/arrow-white.png")}*/}
                        {/*            style={{*/}
                        {/*                transform: [*/}
                        {/*                    { rotateY: "180deg" }*/}
                        {/*                ]*/}
                        {/*            }} />*/}
                        {/*    </TouchableOpacity>}*/}
                        {/*    <Text style={{*/}
                        {/*        color: colors.white,*/}
                        {/*        fontSize: 20*/}
                        {/*    }}>*/}
                        {/*        Données personnelles*/}
                        {/*    </Text>*/}
                        {/*    <TouchableOpacity style={{*/}
                        {/*        width: 40, height: 40, alignItems: "center",*/}
                        {/*        justifyContent: "center", opacity: 0*/}
                        {/*    }}>*/}
                        {/*        <AutoHeightImage*/}
                        {/*            width={20}*/}
                        {/*            source={require("../../../../assets/icons/arrow-white.png")}*/}
                        {/*            style={{*/}
                        {/*            }} />*/}
                        {/*    </TouchableOpacity>*/}
                        {/*</View>*/}

                        <View style={{ alignItems: "center", justifyContent: "center", width: "100%", marginTop: 7, marginBottom: 15 }}>
                            {this.props.isvenudonneperso === true && <TouchableOpacity
                                onPress={async () => {
                                    if (this.state.userData === null) {
                                        this.props.navigation.navigate("Login")
                                        const setActiveTab = { type: SET_ACTIVE_TAB, value: "deco" };
                                        await this.props.dispatch(setActiveTab);
                                        const removeToken = await AsyncStorage.removeItem('userToken');
                                        await AsyncStorage.removeItem('userToken');

                                    } else {
                                        const setActiveFPAction = { type: SET_ACTIVE_FP, value: -1 };
                                        this.props.dispatch(setActiveFPAction)
                                        if (global.is_venudedonneperso === true) {
                                            console.warn('vers profile')
                                            const setActiveTab = { type: SET_ACTIVE_TAB, value: "profile" };
                                            await this.props.dispatch(setActiveTab);
                                            //  this.props.navigation.navigate('FichePedag')
                                            // this.props.navigation.pop()
                                        } else {
                                            this.props.navigation.navigate('FichePedag')
                                        }
                                    }
                                }}
                                style={{ width: 50, position: "absolute", left: 0 }}
                            >
                                <AutoHeightImage
                                    width={18}
                                    source={require('../../../../assets/icons/arrow-white.png')}
                                    style={{
                                        marginLeft: 15,
                                        transform: [
                                            { rotateY: "180deg" }
                                        ],
                                    }}
                                />
                            </TouchableOpacity>}
                            <Text style={[baseStyles.titleText, { textAlign: "center" }]}>
                                {" Données personnelles"}
                            </Text>
                        </View>

                        {/* informations G. */}
                        <View style={[styles.containerTitle, { marginLeft: 15, marginBottom: 10 }]}>
                            <AutoHeightImage
                                width={screenWidth * 0.05}
                                source={require('../../../../assets/icons/shape.red.1.png')}
                                style={styles.imgTitle}
                            />
                            <View style={{}}>
                                <Text style={[baseStyles.titleText, { color: colors.red, fontSize: 16 }]}>
                                    {"Informations générales".toUpperCase()}
                                </Text>
                            </View>
                        </View>
                        <View style={[this.state.checkUserdata[0] !== null ? styles.sliderCtn : { flexDirection: 'row', justifyContent: 'space-between' }]}>
                            <TouchableOpacity
                                onPress={() => {
                                    this.pressSexe()
                                }}
                                style={[this.state.checkUserdata[0] !== null ? styles.sliderTensionLabelG : { width: '36%' }]}>
                                <Text style={[baseStyles.textColorWhite]}>Sexe</Text>
                            </TouchableOpacity>
                            <View style={[this.state.checkUserdata[0] !== null ? styles.sliderTensionLabelD : { width: '60%' }]}>
                                <TouchableOpacity
                                    onPress={() => {
                                        this.pressSexe()
                                    }}
                                >
                                    {
                                        this.state.checkUserdata[0] !== null ?
                                            <Text style={[baseStyles.textColorWhite, { textDecorationLine: 'underline', textAlign: "right" }]}>
                                                {
                                                    this.state.userSexe == "H" ? "Homme" : (this.state.userSexe == "F" ? "Femme" : "_______________")
                                                }
                                            </Text>
                                            :
                                            <Text style={{ textAlign: "right", color: 'white' }}>
                                                _______________
                                        </Text>
                                    }
                                </TouchableOpacity>
                                {/*{*/}
                                {/*    this.state.userSexeChoice ?*/}
                                {/*        <View*/}
                                {/*            style={{*/}
                                {/*                position: "absolute",*/}
                                {/*                top: 20,*/}
                                {/*                right: 10,*/}
                                {/*                backgroundColor: colors.white,*/}
                                {/*                borderRadius: 5,*/}
                                {/*                zIndex: 999*/}
                                {/*            }}*/}
                                {/*        >*/}
                                {/*            {*/}
                                {/*                this.state.possibleSexe.map((sexe, index) => {*/}
                                {/*                    return (*/}
                                {/*                        <TouchableOpacity*/}
                                {/*                            key={"sexe_" + index}*/}
                                {/*                            style={{*/}
                                {/*                                padding: 5,*/}
                                {/*                                paddingLeft: 10,*/}
                                {/*                                paddingRight: 10,*/}
                                {/*                                margin: 5,*/}
                                {/*                                borderBottomColor: colors.grisbox,*/}
                                {/*                                borderBottomWidth: 0.5*/}
                                {/*                            }}*/}
                                {/*                            onPress={() => {*/}
                                {/*                                this.setState({ userSexe: sexe.value });*/}
                                {/*                                let checkUserdata = this.state.checkUserdata;*/}
                                {/*                                checkUserdata[0]='sexe';*/}
                                {/*                                this.setState({checkUserdata:checkUserdata});*/}
                                {/*                                this.setState({ userSexeChoice: false })*/}
                                {/*                            }}*/}
                                {/*                        >*/}
                                {/*                            <Text>*/}
                                {/*                                {*/}
                                {/*                                    sexe.name*/}
                                {/*                                }*/}
                                {/*                            </Text>*/}
                                {/*                        </TouchableOpacity>*/}
                                {/*                    )*/}
                                {/*                })*/}
                                {/*            }*/}
                                {/*        </View> : null*/}
                                {/*}*/}
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 8, width: Platform.OS === 'ios' ? '100%' : "100%", alignSelf: 'center', paddingHorizontal: screenWidth <= 360 ? (this.state.checkUserdata[1] !== null ? 15 : 7) : 15 }}>
                            <TouchableOpacity
                                onPress={() => {
                                    this.setState({ isWritingTaille: false, });
                                    this.setState({ isWritingWeight: false, });
                                    this.setState({ isWritingFullName: false })
                                    this.setState({ isWritingEmail: false })
                                    this.setState({ isWritingFonction: false })
                                    this.setState({ isWritingNationalClubName: false });
                                    this.showDateTimePicker()
                                }}
                                style={[this.state.checkUserdata[1] !== null ? styles.sliderTensionLabelG : Platform.OS === 'ios' ? { width: '60%' } : { width: '36%' }]}>
                                <Text style={[baseStyles.textColorWhite]}>Date de naissance</Text>
                            </TouchableOpacity>
                            <View style={{}}>
                                <TouchableOpacity
                                    onPress={() => {
                                        //    this.changeBirthDay()
                                        this.showDateTimePicker()
                                        this.setState({ isWritingTaille: false, });
                                        this.setState({ isWritingWeight: false, });
                                        this.setState({ isWritingFullName: false })
                                        this.setState({ isWritingEmail: false })
                                        this.setState({ isWritingFonction: false })
                                        this.setState({ isWritingNationalClubName: false })
                                    }}
                                >
                                    {
                                        this.state.checkUserdata[1] !== null ?
                                            <Text style={[baseStyles.textColorWhite, { textAlign: 'right', textDecorationLine: 'underline' }]}>
                                                {
                                                    this.state.userBirthDay
                                                }
                                            </Text>
                                            :
                                            <Text style={{ textAlign: "right", color: 'white' }}>
                                                _______________
                                        </Text>
                                    }
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={[this.state.checkUserdata[2] !== null ? {
                            width: (screenWidth - 30),
                            paddingTop: 15,
                            paddingBottom: screenHeight * 0.01,
                            flexDirection: 'row',
                            justifyContent: 'space-between'
                        } : { flexDirection: 'row', justifyContent: 'space-between', marginTop: 15 }]}>
                            <TouchableOpacity
                                onPress={() => {
                                    this.pressNationalite()
                                }}
                                style={[this.state.checkUserdata[2] !== null ? styles.sliderTensionLabelG : { width: '36%' }]}>
                                <Text style={[baseStyles.textColorWhite]}>Nationalité</Text>
                            </TouchableOpacity>
                            <View style={[this.state.checkUserdata[2] !== null ? styles.sliderTensionLabelD : { width: '60%' }]} >
                                <TouchableOpacity
                                    onPress={() => {
                                        this.pressNationalite()
                                    }}
                                >
                                    {
                                        this.state.checkUserdata[2] !== null ?
                                            <Text style={[baseStyles.textColorWhite, { textDecorationLine: 'underline', textAlign: 'right' }]}>
                                                {
                                                    this.state.userNationality != null &&
                                                    this.state.userNationality.name
                                                }
                                            </Text>
                                            :
                                            <Text style={{ textAlign: "right", color: 'white' }}>
                                                _______________
                                        </Text>
                                    }
                                </TouchableOpacity>

                            </View>
                        </View>
                        <View style={styles.separator}></View>

                        {/* Donnees B. */}
                        <View style={[styles.containerTitle, { marginLeft: 15 }]}>
                            <AutoHeightImage
                                width={screenWidth * 0.05}
                                source={require('../../../../assets/icons/standing-human-body-silhouette.png')}
                                style={styles.imgTitle}
                            />
                            <View style={[]}>
                                <Text style={[baseStyles.titleText, { color: colors.red, fontSize: 16 }]}>
                                    {"Données Biométriques".toUpperCase()}
                                </Text>
                            </View>
                        </View>
                        <View style={[styles.sliderCtn]}>
                            <TouchableOpacity
                                onPress={() => {
                                    this.pressTaille()
                                }}
                                style={[styles.sliderTensionLabelG]}>
                                <Text style={[baseStyles.textColorWhite]}>Taille</Text>
                            </TouchableOpacity>
                            <View style={[styles.sliderTensionLabelD]}>
                                <TouchableOpacity
                                    onPress={() => {
                                        this.pressTaille()
                                    }}
                                >
                                    <Text style={[baseStyles.textColorWhite, { textDecorationLine: 'underline', textAlign: 'right' }]}>
                                        {this.state.userTaille + "cm"}
                                    </Text>
                                </TouchableOpacity>
                                {
                                    this.state.isWritingTaille &&

                                    (
                                        <View
                                            style={{
                                                position: "absolute",
                                                top: 0,
                                                right: 5,
                                                backgroundColor: colors.white,
                                                borderRadius: 5,
                                                zIndex: 999
                                            }}
                                        >
                                            <TextInput
                                                onChangeText={(text) => {
                                                    this.setState({ userTaille: text })
                                                }}
                                               // keyboardAppearance={"default"}
                                                keyboardType={"numeric"}
                                                onBlur={() => {
                                                    this.setState({ isWritingTaille: false })
                                                }}
                                                style={{
                                                    padding: 5,
                                                    width: screenWidth <= 360 ? 110 : 200
                                                }}
                                                autoFocus={true}
                                            />
                                        </View>)
                                }
                            </View>
                        </View>
                        <View style={[styles.sliderCtn]}>
                            <TouchableOpacity
                                onPress={() => {
                                    this.pressPoids()
                                }}
                                style={[styles.sliderTensionLabelG]}>
                                <Text style={[baseStyles.textColorWhite]}>Poids</Text>
                            </TouchableOpacity>
                            <View style={[styles.sliderTensionLabelD]}>

                                <TouchableOpacity
                                    onPress={() => {
                                        this.pressPoids()
                                    }}
                                >
                                    <Text style={[baseStyles.textColorWhite, { textDecorationLine: 'underline', textAlign: 'right' }]}>
                                        {this.state.userWeight + "kg"}
                                    </Text>
                                </TouchableOpacity>
                                {
                                    this.state.isWritingWeight ?
                                        <View
                                            style={{
                                                position: "absolute",
                                                top: 0,
                                                right: 5,
                                                backgroundColor: colors.white,
                                                borderRadius: 5,
                                                zIndex: 999
                                            }}
                                        >
                                            <TextInput
                                                onChangeText={(text) => {
                                                    this.setState({ userWeight: text })
                                                }}
                                                //keyboardAppearance={"default"}
                                                keyboardType={"numeric"}
                                                onBlur={() => {
                                                    this.setState({ isWritingWeight: false })
                                                }}
                                                style={{
                                                    padding: 5,
                                                    width: screenWidth <= 360 ? 110 : 200
                                                }}
                                                autoFocus={true}
                                            />
                                        </View> : null
                                }
                            </View>
                        </View>
                        <View style={styles.separator}></View>

                        {/* Activite S. */}
                        <View style={[styles.containerTitle, { marginLeft: 15 }]}>
                            <AutoHeightImage
                                width={screenWidth * 0.05}
                                source={require('../../../../assets/icons/soccer-ball-variant.png')}
                                style={styles.imgTitle}
                            />
                            <View style={[]}>
                                <Text style={[baseStyles.titleText, { color: colors.red, fontSize: 16 }]}>
                                    {"Activité Sportive".toUpperCase()}
                                </Text>
                            </View>
                        </View>
                        <View style={[styles.sliderCtn]}>
                            <TouchableOpacity
                                onPress={() => {
                                    this.pressSport()
                                }}
                                style={[styles.sliderTensionLabelG]}>
                                <Text style={[baseStyles.textColorWhite]}>Sport</Text>
                            </TouchableOpacity>
                            <View style={[styles.sliderTensionLabelD]}>
                                <TouchableOpacity
                                    onPress={() => {
                                        console.warn('kala ray s clo')
                                        this.pressSport()
                                    }}
                                >

                                    {
                                        this.state.checkUserdata[5] !== null ?
                                            (
                                                this.state.selectedSport != null ?
                                                    <Animated.Text style={[baseStyles.textColorWhite, { textDecorationLine: 'underline', textAlign: 'right', fontSize: this.state.animText === true ? textAnime : 14 }]}>
                                                        {this.state.selectedSport.name}
                                                    </Animated.Text>
                                                    :
                                                    <Text style={{ textAlign: "right", color: 'white' }}>
                                                        _______________
                                                </Text>
                                            )
                                            :
                                            <Text style={{ textAlign: "right", color: 'white' }}>
                                                _______________
                                        </Text>
                                    }
                                </TouchableOpacity>
                            </View>
                        </View>
                        {
                            this.state.checkUserdata[5] !== null &&
                            <View>
                                <View style={[styles.sliderCtn]}>
                                    <TouchableOpacity
                                        onPress={() => {
                                            this.pressNiveau()
                                        }}
                                        style={[styles.sliderTensionLabelG]}>
                                        <Text style={[baseStyles.textColorWhite]}>Niveau</Text>
                                    </TouchableOpacity>
                                    <View style={[styles.sliderTensionLabelD]}>
                                        <TouchableOpacity
                                            onPress={() => {
                                                this.pressNiveau()
                                            }}
                                        >

                                            {
                                                this.state.selectedSportLevel.id !== null ?
                                                    <Text style={[baseStyles.textColorWhite, { textDecorationLine: 'underline', textAlign: 'right' }]}>
                                                        {this.state.selectedSportLevel.name.replace(/\n/g, "").replace(/\t/g, "").replace(/\r/g, "")
                                                            .replace(/\'/g, "")
                                                            .replace(/\"/g, '')
                                                            .replace(/\&/g, "")
                                                            .replace(/\b/g, "")
                                                            .replace(/\f/g, "")}
                                                    </Text>
                                                    :
                                                    <Text style={{ textAlign: "right", color: 'white' }}>
                                                        _______________
                                                            </Text>
                                            }

                                        </TouchableOpacity>
                                        {/*{*/}
                                        {/*    this.state.sportLevelChoice ?*/}
                                        {/*        <View*/}
                                        {/*            style={{*/}
                                        {/*                position: "absolute",*/}
                                        {/*                top: 20,*/}
                                        {/*                right: 10,*/}
                                        {/*                backgroundColor: colors.white,*/}
                                        {/*                borderRadius: 5,*/}
                                        {/*                zIndex: 999*/}
                                        {/*            }}*/}
                                        {/*        >*/}
                                        {/*            {*/}
                                        {/*                this.state.sportLevels.map((level, index) => {*/}
                                        {/*                    return (*/}
                                        {/*                        <TouchableOpacity*/}
                                        {/*                            key={"sport_" + index}*/}
                                        {/*                            style={{*/}
                                        {/*                                padding: 5,*/}
                                        {/*                                paddingLeft: 10,*/}
                                        {/*                                paddingRight: 10,*/}
                                        {/*                                margin: 5,*/}
                                        {/*                                borderBottomColor: colors.grisbox,*/}
                                        {/*                                borderBottomWidth: 0.5*/}
                                        {/*                            }}*/}
                                        {/*                            onPress={async () => {*/}
                                        {/*                                this.setState({ selectedSportLevel: level });*/}
                                        {/*                                this.setState({ sportLevelChoice: false });*/}
                                        {/*                                console.warn('ole level',level)*/}
                                        {/*                                console.warn('maka club',this.state.selectedSport.id, level.id);*/}
                                        {/*                                await this.getListClubs(this.state.selectedSport.id, level.id);*/}
                                        {/*                                this.setState({ selectedLevelClub: {"id": null,"name": null }})*/}
                                        {/*                            }}*/}
                                        {/*                        >*/}
                                        {/*                            <Text>*/}
                                        {/*                                {*/}
                                        {/*                                    level.name*/}
                                        {/*                                }*/}
                                        {/*                            </Text>*/}
                                        {/*                        </TouchableOpacity>*/}
                                        {/*                    )*/}
                                        {/*                })*/}
                                        {/*            }*/}
                                        {/*        </View> : null*/}
                                        {/*}*/}
                                    </View>
                                </View>
                                {
                                    this.state.selectedSportLevel.id !== null &&
                                    <View style={[styles.sliderCtn]}>
                                        <TouchableOpacity
                                            onPress={() => {
                                                this.pressClub()
                                            }}
                                            style={[styles.sliderTensionLabelG]}>
                                            <Text style={[baseStyles.textColorWhite]}>Club</Text>
                                        </TouchableOpacity>
                                        <View style={[styles.sliderTensionLabelD]}>
                                            <TouchableOpacity
                                                onPress={() => {
                                                    //  if(this.state.selectedLevelClub != null) {
                                                    //     this.setState({levelClubChoice: !this.state.levelClubChoice});
                                                    // }

                                                    this.pressClub()
                                                }}
                                            >
                                                {
                                                    this.state.isamateurclub == true ?
                                                        this.state.customclubname !== "" ?
                                                            <Text style={[baseStyles.textColorWhite, { textDecorationLine: 'underline', textAlign: 'right' }]}>
                                                                {this.state.customclubname}
                                                            </Text>
                                                            :
                                                            <Text style={{ textAlign: "right", color: 'white' }}>
                                                                _______________
                                                                </Text>
                                                        :
                                                        this.state.selectedLevelClub != null ?
                                                            (
                                                                this.state.selectedSportLevel.id !== null ?
                                                                    (this.state.selectedLevelClub != null && this.state.selectedLevelClub.id != null) ? (
                                                                        <Text style={[baseStyles.textColorWhite, { textDecorationLine: 'underline', textAlign: 'right' }]}>
                                                                            {
                                                                                this.state.selectedLevelClub.name.replace(/\n/g, "").replace(/\t/g, "").replace(/\r/g, "")
                                                                                    .replace(/\'/g, "")
                                                                                    .replace(/\"/g, '')
                                                                                    .replace(/\&/g, "")
                                                                                    .replace(/\b/g, "")
                                                                                    .replace(/\f/g, "")
                                                                            }
                                                                        </Text>
                                                                    ) :
                                                                        <Text style={{ textAlign: "right", color: 'white' }}>
                                                                            _______________
                                                                        </Text>

                                                                    :
                                                                    <Text style={{ textAlign: "right", color: 'white' }}>
                                                                        _______________
                                                                    </Text>
                                                            )
                                                            :
                                                            <Text style={{ textAlign: "right", color: 'white' }}>
                                                                _______________
                                                            </Text>
                                                }

                                            </TouchableOpacity>
                                            {
                                                this.state.levelClubCustom &&

                                                <View
                                                    style={{
                                                        position: "absolute",
                                                        top: 0,
                                                        right: 5,
                                                        backgroundColor: colors.white,
                                                        borderRadius: 5,
                                                        zIndex: 999
                                                    }}
                                                >
                                                    <TextInput
                                                        onChangeText={(text) => {
                                                            this.setState({ customclubname: text })
                                                        }}
                                                      //  keyboardAppearance={"default"}
                                                       // keyboardType={"default"}
                                                        onBlur={() => {
                                                            this.setState({ levelClubCustom: false })
                                                        }}
                                                        style={{
                                                            padding: 5,
                                                            width: screenWidth <= 360 ? 110 : 200
                                                        }}
                                                        autoFocus={true}
                                                    />
                                                </View>
                                            }
                                        </View>
                                    </View>
                                }
                            </View>
                        }
                        <View style={[styles.sliderCtn]}>
                            <TouchableOpacity
                                onPress={() => {
                                    this.pressEquipenationale()
                                }}
                                style={[styles.sliderTensionLabelG]}>
                                <Text style={[baseStyles.textColorWhite]}>Équipe Nationale</Text>
                            </TouchableOpacity>
                            <View style={[styles.sliderTensionLabelD]}>

                                <TouchableOpacity
                                    onPress={() => {
                                        this.pressEquipenationale()
                                    }}
                                >
                                    <Text style={[baseStyles.textColorWhite, { textDecorationLine: 'underline', textAlign: 'right' }]}>
                                        {
                                            this.state.userNationalClub ? "Oui" : "Non"
                                        }
                                    </Text>
                                </TouchableOpacity>
                                {/*{*/}
                                {/*    this.state.userNationalClubChoice ?*/}
                                {/*        <View*/}
                                {/*            style={{*/}
                                {/*                position: "absolute",*/}
                                {/*                top: 20,*/}
                                {/*                right: 10,*/}
                                {/*                backgroundColor: colors.white,*/}
                                {/*                borderRadius: 5,*/}
                                {/*                zIndex: 999*/}
                                {/*            }}*/}
                                {/*        >*/}
                                {/*            {*/}
                                {/*                this.state.booleanValues.map((bool, index) => {*/}
                                {/*                    return (*/}
                                {/*                        <TouchableOpacity*/}
                                {/*                            key={"bool1_" + index}*/}
                                {/*                            style={{*/}
                                {/*                                padding: 5,*/}
                                {/*                                paddingLeft: 10,*/}
                                {/*                                paddingRight: 10,*/}
                                {/*                                margin: 5,*/}
                                {/*                                borderBottomColor: colors.grisbox,*/}
                                {/*                                borderBottomWidth: 0.5*/}
                                {/*                            }}*/}
                                {/*                            onPress={() => {*/}
                                {/*                                this.setState({ userNationalClub: bool.value })*/}
                                {/*                                this.setState({ userNationalClubChoice: false })*/}
                                {/*                                if (bool.value) {*/}
                                {/*                                    //   this.setState({ userNationalClubName: this.state.userNationalClubName })*/}
                                {/*                                    this.setState({ isWritingNationalClubName: true })*/}
                                {/*                                }*/}
                                {/*                            }}*/}
                                {/*                        >*/}
                                {/*                            <Text>*/}
                                {/*                                {*/}
                                {/*                                    bool.name*/}
                                {/*                                }*/}
                                {/*                            </Text>*/}
                                {/*                        </TouchableOpacity>*/}
                                {/*                    )*/}
                                {/*                })*/}
                                {/*            }*/}
                                {/*        </View> : null*/}
                                {/*}*/}
                            </View>
                        </View>
                        {
                            this.state.userNationalClub ?
                                <View style={[styles.sliderCtn]}>
                                    <TouchableOpacity
                                        onPress={() => {
                                            this.pressnomEquipenational()
                                            this.setState({ isWritingNationalClubName: !this.state.isWritingNationalClubName })
                                        }}
                                        style={[styles.sliderTensionLabelG]}>
                                        <Text style={[baseStyles.textColorWhite]}>Quelle équipe nationale ?</Text>
                                    </TouchableOpacity>
                                    <View style={[styles.sliderTensionLabelD]}>
                                        <TouchableOpacity
                                            onPress={() => {
                                                this.pressnomEquipenational()
                                            }}
                                        >
                                            {this.state.userNationalClubName !== "" ?
                                                <Text style={[baseStyles.textColorWhite, { textDecorationLine: 'underline', textAlign: 'right' }]}>
                                                    {this.state.userNationalClubName}
                                                </Text>
                                                :
                                                <Text style={{ textAlign: "right", color: 'white' }}>
                                                    _______________
                                        </Text>}
                                        </TouchableOpacity>
                                        {
                                            this.state.isWritingNationalClubName ?
                                                <View
                                                    style={{
                                                        position: "absolute",
                                                        top: 0,
                                                        right: 5,
                                                        backgroundColor: colors.white,
                                                        borderRadius: 5,
                                                        zIndex: 999
                                                    }}
                                                >
                                                    <TextInput
                                                        onChangeText={(text) => {
                                                            this.setState({ userNationalClubName: text })
                                                        }}
                                                        //keyboardAppearance={"default"}
                                                        //keyboardType={"default"}
                                                        onBlur={() => {
                                                            this.setState({ isWritingNationalClubName: false })
                                                        }}
                                                        style={{
                                                            padding: 5,
                                                            width: screenWidth <= 360 ? 110 : 200
                                                        }}
                                                        autoFocus={true}
                                                    />
                                                </View> : null
                                        }
                                    </View>
                                </View> : null
                        }


                        {/* Suivi. */}
                        <View style={[styles.containerTitle, { marginLeft: 15 }]}>
                            <AutoHeightImage
                                width={screenWidth * 0.05}
                                source={require('../../../../assets/icons/graph-line.png')}
                                style={styles.imgTitle}
                            />
                            <View style={[]}>
                                <Text style={[baseStyles.titleText, { color: colors.red, fontSize: 16 }]}>
                                    {"Suivi".toUpperCase()}
                                </Text>
                            </View>
                        </View>
                        <View style={[styles.sliderCtn]}>
                            <TouchableOpacity
                                onPress={() => {
                                    this.pressVoulezvousaccesstiers()
                                }}
                                style={[styles.sliderTensionLabelG]}>
                                <Text style={[baseStyles.textColorWhite]}>Voulez-vous donner la possibilité à un tiers d'accéder à vos données ?</Text>
                            </TouchableOpacity>
                            <View style={[styles.sliderTensionLabelD]}>

                                <TouchableOpacity
                                    onPress={() => {
                                        this.pressVoulezvousaccesstiers()
                                    }}
                                >
                                    {console.warn('fls tk v have acces t', this.state.haveAccessTiers)}
                                    <Text style={[baseStyles.textColorWhite, { textDecorationLine: 'underline', textAlign: 'right' }]}>
                                        {
                                            this.state.haveAccessTiers ? "Oui" : "Non"
                                        }
                                    </Text>
                                </TouchableOpacity>
                                {/*{*/}
                                {/*    this.state.haveAccessTiersChoice ?*/}
                                {/*        <View*/}
                                {/*            style={{*/}
                                {/*                position: "absolute",*/}
                                {/*                top: 20,*/}
                                {/*                right: 10,*/}
                                {/*                backgroundColor: colors.white,*/}
                                {/*                borderRadius: 5,*/}
                                {/*                zIndex: 999*/}
                                {/*            }}*/}
                                {/*        >*/}
                                {/*            {*/}
                                {/*                this.state.booleanValues.map((bool, index) => {*/}
                                {/*                    return (*/}
                                {/*                        <TouchableOpacity*/}
                                {/*                            key={"bool1_" + index}*/}
                                {/*                            style={{*/}
                                {/*                                padding: 5,*/}
                                {/*                                paddingLeft: 10,*/}
                                {/*                                paddingRight: 10,*/}
                                {/*                                margin: 5,*/}
                                {/*                                borderBottomColor: colors.grisbox,*/}
                                {/*                                borderBottomWidth: 0.5*/}
                                {/*                            }}*/}
                                {/*                            onPress={() => {*/}
                                {/*                                this.setState({ haveAccessTiers: bool.value })*/}
                                {/*                                this.setState({ haveAccessTiersChoice: false })*/}
                                {/*                                if (bool.value) {*/}
                                {/*                                   // this.setState({ isWritingFullName: true })*/}
                                {/*                                }*/}
                                {/*                            }}*/}
                                {/*                        >*/}
                                {/*                            <Text>*/}
                                {/*                                {*/}
                                {/*                                    bool.name*/}
                                {/*                                }*/}
                                {/*                            </Text>*/}
                                {/*                        </TouchableOpacity>*/}
                                {/*                    )*/}
                                {/*                })*/}
                                {/*            }*/}
                                {/*        </View> : null*/}
                                {/*}*/}
                            </View>
                        </View>
                        {
                            this.state.haveAccessTiers ?
                                <View>
                                    <View style={[styles.sliderCtn]}>
                                        <TouchableOpacity
                                            onPress={() => {
                                                this.setState({ isWritingFullName: !this.state.isWritingFullName })
                                                this.setState({ sportLevelChoice: false })
                                                this.setState({ levelClubChoice: false })
                                                this.setState({ userSportsListChoice: false })
                                                this.setState({ userSexeChoice: false })
                                                this.setState({ isWritingTaille: false })
                                                this.setState({ isWritingEmail: false })
                                                this.setState({ isWritingFonction: false })
                                                this.setState({ userNationalClubChoice: false })
                                                this.setState({ isWritingNationalClubName: false })
                                                this.setState({ isWritingWeight: false });
                                                this.setState({ levelClubCustom: false })

                                            }}
                                            style={[styles.sliderTensionLabelG]}>
                                            <Text style={[baseStyles.textColorWhite]}>Prénom et nom du tiers</Text>
                                        </TouchableOpacity>
                                        <View style={[styles.sliderTensionLabelD]}>
                                            <TouchableOpacity
                                                onPress={() => {
                                                    this.setState({ isWritingFullName: !this.state.isWritingFullName })
                                                    this.setState({ sportLevelChoice: false })
                                                    this.setState({ levelClubChoice: false })
                                                    this.setState({ userSportsListChoice: false })
                                                    this.setState({ userSexeChoice: false })
                                                    this.setState({ isWritingTaille: false })
                                                    this.setState({ isWritingEmail: false })
                                                    this.setState({ isWritingFonction: false })
                                                    this.setState({ userNationalClubChoice: false })
                                                    this.setState({ isWritingNationalClubName: false })
                                                    this.setState({ isWritingWeight: false });
                                                    this.setState({ levelClubCustom: false })

                                                }}
                                            >
                                                <Text style={[baseStyles.textColorWhite, { textDecorationLine: 'underline', textAlign: 'right' }]}>
                                                    {this.state.tiersFullName}
                                                </Text>
                                            </TouchableOpacity>
                                            {
                                                this.state.isWritingFullName ?
                                                    <View
                                                        style={{
                                                            position: "absolute",
                                                            top: 0,
                                                            right: 5,
                                                            backgroundColor: colors.white,
                                                            borderRadius: 5,
                                                            zIndex: 999
                                                        }}
                                                    >
                                                        <TextInput
                                                            onChangeText={(text) => {
                                                                this.setState({ tiersFullName: text })
                                                            }}
                                                            //keyboardAppearance={"default"}
                                                            //keyboardType={"default"}
                                                            onBlur={() => {
                                                                // this.state.isWritingFullName
                                                                this.setState({ isWritingFullName: false })
                                                            }}
                                                            style={{
                                                                padding: 5,
                                                                width: screenWidth <= 360 ? 130 : 200
                                                            }}
                                                            autoFocus={true}
                                                        />
                                                    </View> : null
                                            }
                                        </View>
                                    </View>
                                    <View style={[styles.sliderCtn]}>
                                        <TouchableOpacity
                                            onPress={() => {
                                                this.setState({ isWritingEmail: !this.state.isWritingEmail })
                                                this.setState({ sportLevelChoice: false })
                                                this.setState({ levelClubChoice: false })
                                                this.setState({ userSportsListChoice: false })
                                                this.setState({ userSexeChoice: false })
                                                this.setState({ isWritingTaille: false })
                                                this.setState({ isWritingWeight: false });
                                                this.setState({ isWritingFullName: false })
                                                this.setState({ isWritingFonction: false })
                                                this.setState({ userNationalClubChoice: false })
                                                this.setState({ isWritingNationalClubName: false })
                                                this.setState({ levelClubCustom: false })

                                            }}
                                            style={[]}>
                                            <Text style={[baseStyles.textColorWhite]}>Adresse e-mail du tiers</Text>
                                        </TouchableOpacity>
                                        <View style={[this.state.checkUserdata[0] !== null ? { width: screenWidth * 0.4 } : { width: screenWidth * 0.4 }]}>
                                            <TouchableOpacity
                                                onPress={() => {
                                                    this.setState({ isWritingEmail: !this.state.isWritingEmail })
                                                    this.setState({ sportLevelChoice: false })
                                                    this.setState({ levelClubChoice: false })
                                                    this.setState({ userSportsListChoice: false })
                                                    this.setState({ userSexeChoice: false })
                                                    this.setState({ isWritingTaille: false })
                                                    this.setState({ isWritingFullName: false })
                                                    this.setState({ isWritingFonction: false })
                                                    this.setState({ userNationalClubChoice: false })
                                                    this.setState({ isWritingNationalClubName: false })
                                                    this.setState({ isWritingWeight: false });
                                                    this.setState({ levelClubCustom: false })

                                                }}
                                            >
                                                <Text style={[baseStyles.textColorWhite, { textDecorationLine: 'underline', textAlign: 'right' }]}>
                                                    {this.state.tiersEmail}
                                                </Text>
                                            </TouchableOpacity>
                                            {
                                                this.state.isWritingEmail ?
                                                    <View
                                                        style={{
                                                            position: "absolute",
                                                            top: 0,
                                                            right: 5,
                                                            backgroundColor: colors.white,
                                                            borderRadius: 5,
                                                            zIndex: 999
                                                        }}
                                                    >
                                                        <TextInput
                                                            onChangeText={(text) => {
                                                                this.setState({ tiersEmail: text })
                                                            }}
                                                            //keyboardAppearance={"default"}
                                                            keyboardType={"email-address"}
                                                            onBlur={() => {
                                                                // this.state.isWritingFullName
                                                                this.setState({ isWritingEmail: false })
                                                            }}
                                                            style={{
                                                                padding: 5,
                                                                width: screenWidth <= 360 ? 130 : 200
                                                            }}
                                                            autoFocus={true}
                                                        />
                                                    </View> : null
                                            }
                                        </View>
                                    </View>
                                    <View style={[styles.sliderCtn]}>
                                        <TouchableOpacity
                                            onPress={() => {
                                                this.setState({ isWritingFonction: !this.state.isWritingFonction })
                                                this.setState({ sportLevelChoice: false })
                                                this.setState({ levelClubChoice: false })
                                                this.setState({ userSportsListChoice: false })
                                                this.setState({ userSexeChoice: false })
                                                this.setState({ isWritingTaille: false })
                                                this.setState({ isWritingFullName: false })
                                                this.setState({ isWritingEmail: false })
                                                this.setState({ userNationalClubChoice: false })
                                                this.setState({ isWritingNationalClubName: false })
                                                this.setState({ isWritingWeight: false });
                                                this.setState({ levelClubCustom: false })

                                            }}
                                            style={[styles.sliderTensionLabelG]}>
                                            <Text style={[baseStyles.textColorWhite]}>Fonction du tiers</Text>
                                        </TouchableOpacity>
                                        <View style={[styles.sliderTensionLabelD]}>

                                            <TouchableOpacity
                                                onPress={() => {
                                                    this.setState({ isWritingFonction: !this.state.isWritingFonction })
                                                    this.setState({ sportLevelChoice: false })
                                                    this.setState({ levelClubChoice: false })
                                                    this.setState({ userSportsListChoice: false })
                                                    this.setState({ userSexeChoice: false })
                                                    this.setState({ isWritingTaille: false })
                                                    this.setState({ isWritingFullName: false })
                                                    this.setState({ isWritingEmail: false })
                                                    this.setState({ userNationalClubChoice: false })
                                                    this.setState({ isWritingNationalClubName: false })
                                                    this.setState({ isWritingWeight: false });
                                                    this.setState({ levelClubCustom: false })

                                                }}
                                            >
                                                <Text style={[baseStyles.textColorWhite, { textDecorationLine: 'underline', textAlign: 'right' }]}>
                                                    {this.state.tiersFonction}
                                                </Text>
                                            </TouchableOpacity>
                                            {
                                                this.state.isWritingFonction ?
                                                    <View
                                                        style={{
                                                            position: "absolute",
                                                            top: 0,
                                                            right: 5,
                                                            backgroundColor: colors.white,
                                                            borderRadius: 5,
                                                            zIndex: 999
                                                        }}
                                                    >
                                                        <TextInput
                                                            onChangeText={(text) => {
                                                                this.setState({ tiersFonction: text })
                                                            }}
                                                           // keyboardAppearance={"default"}
                                                            //keyboardType={"default"}
                                                            onBlur={() => {
                                                                // this.state.isWritingFullName
                                                                this.setState({ isWritingFonction: false })
                                                            }}
                                                            style={{
                                                                padding: 5,
                                                                width: screenWidth <= 360 ? 130 : 200
                                                            }}
                                                            autoFocus={true}
                                                        />
                                                    </View> : null
                                            }
                                        </View>
                                    </View></View> : null
                        }
                        <View style={[styles.separator, { height: 0 }]}></View>

                        <View style={{ marginTop: -screenWidth * 0.09 }}>
                            <MAAButton text={"SUIVANT"} width={(screenWidth - 100)} height={40}
                                onPress={() => {
                                    this.putUserData().then(async (resPutUserData) => {
                                        if (resPutUserData !== 'tslasa') {
                                            if (this.state.userData !== null) {
                                                this.setState({ refreshing: false })
                                                await this.getFirstConnexion();
                                                global.is_venudedonneperso = true;
                                                const setActive = { type: SET_ACTIVE_TABMENU_MYENERGY, value: 1 };
                                                await this.props.dispatch(setActive);
                                                const setActiveTab = { type: SET_ACTIVE_TAB, value: "myenergyviadatapersoempty" };
                                                this.props.dispatch(setActiveTab);
                                                this.props.navigation.navigate('LogedinNavigator');
                                                const setActiveFPAction = { type: SET_ACTIVE_FP, value: 2 };
                                                this.props.dispatch(setActiveFPAction);
                                            }
                                            // else{
                                            //     const setActiveTab = { type: SET_ACTIVE_TAB, value: "home" };
                                            //     this.props.dispatch(setActiveTab);
                                            //     this.props.navigation.navigate("LogedinNavigator")
                                            // }
                                        } else {
                                            this.setState({ refreshing: false })
                                        }
                                    })

                                }}
                                style={[styles.btnValidate]} />
                            {this.state.userData !== null &&
                                <MAAButton text={"MON PROFIL"} width={(screenWidth - 100)} height={40} backgroundColor='transparent' borderColor='#fff'
                                    onPress={async () => {
                                        const bob = await this.putUserData();
                                        const setActiveFPAction = { type: SET_ACTIVE_FP, value: null }
                                        this.props.dispatch(setActiveFPAction)
                                        if (global.is_venudedonneperso === true) {
                                            console.warn('vers profile')
                                            const setActiveTab = { type: SET_ACTIVE_TAB, value: "profile" };
                                            await this.props.dispatch(setActiveTab);
                                            // this.props.navigation.navigate('FichePedag')
                                        } else {
                                            this.props.navigation.popToTop()
                                        }

                                    }}
                                    style={[styles.btnMonProfil]} />
                            }
                        </View>
                    </ScrollView>

                    {/*<Modal*/}
                    {/*    visible={this.state.userSportsListChoice}*/}
                    {/*    onRequestClose={() => {*/}
                    {/*        this.setState({ userSportsListChoice: false })*/}
                    {/*    }}*/}
                    {/*    transparent={true}*/}

                    {/*><TouchableOpacity*/}
                    {/*    onPress={() => {*/}
                    {/*        this.setState({ userSportsListChoice: false })*/}
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
                    {/*        backgroundColor: colors.white,*/}
                    {/*    }}>*/}
                    {/*        <ScrollView>*/}
                    {/*            {*/}
                    {/*                this.state.userSports.map((sport, index) => {*/}
                    {/*                    return (*/}
                    {/*                        <TouchableOpacity*/}
                    {/*                            key={"sport_" + index}*/}
                    {/*                            style={{ marginTop:2,paddingHorizontal:30, backgroundColor:colors.red, marginHorizontal:4, paddingVertical:4,color:'white'}}*/}
                    {/*                            onPress={async () => {*/}
                    {/*                                this.setState({ selectedSport: sport });*/}
                    {/*                                let checkUserdata = this.state.checkUserdata;*/}
                    {/*                                checkUserdata[5]='sport';*/}
                    {/*                                this.setState({ checkUserdata: checkUserdata });*/}
                    {/*                                this.setState({ userSportsListChoice: false });*/}
                    {/*                                await this.getSportListLevels(sport.id);*/}
                    {/*                                this.setState({ selectedSportLevel: {id:null,name:null}});*/}
                    {/*                               // this.setState({ selectedSportLevel: this.state.sportLevels[0] });*/}
                    {/*                                await this.getListClubs(this.state.selectedSport.id, this.state.sportLevels[0].id)*/}
                    {/*                         //       this.setState({ selectedLevelClub: this.state.levelClubs[0] }) //mi s'affiche ny selectedlevelcub de popup ny levelclubs*/}
                    {/*                            }}*/}
                    {/*                        >*/}
                    {/*                            <Text style={{color:'white'}}>*/}
                    {/*                                {*/}
                    {/*                                    sport.name*/}
                    {/*                                }*/}
                    {/*                            </Text>*/}
                    {/*                        </TouchableOpacity>*/}
                    {/*                    )*/}
                    {/*                })*/}
                    {/*            }*/}

                    {/*        </ScrollView>*/}
                    {/*    </View>*/}
                    {/*</Modal>*/}
                    {/*<Modal*/}
                    {/*    visible={this.state.userNationalitiesChoice}*/}
                    {/*    onRequestClose={() => {*/}
                    {/*        this.setState({ userNationalitiesChoice: false })*/}
                    {/*    }}*/}
                    {/*    transparent={true}*/}

                    {/*><TouchableOpacity*/}
                    {/*    onPress={() => {*/}
                    {/*        this.setState({ userNationalitiesChoice: false })*/}
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
                    {/*        backgroundColor: colors.white,*/}
                    {/*    }}>*/}
                    {/*        <ScrollView>*/}
                    {/*            {*/}
                    {/*                this.state.userNationalities.map((nation, index) => {*/}
                    {/*                    return (*/}
                    {/*                        <TouchableOpacity*/}
                    {/*                            key={"sport_" + index}*/}
                    {/*                            style={{ marginTop:2,paddingHorizontal:30, backgroundColor:colors.red, marginHorizontal:4, paddingVertical:4,color:'white'}}*/}
                    {/*                            onPress={() => {*/}
                    {/*                                // this.state.userNationality*/}
                    {/*                                this.setState({ userNationality: nation });*/}
                    {/*                                let checkUserdata = this.state.checkUserdata;*/}
                    {/*                                checkUserdata[2]='nationalite';*/}
                    {/*                                this.setState({checkUserdata:checkUserdata});*/}
                    {/*                                this.setState({ userNationalitiesChoice: false })*/}
                    {/*                            }}*/}
                    {/*                        >*/}
                    {/*                            <Text style={{color:'white'}}>*/}
                    {/*                                {*/}
                    {/*                                    nation.name*/}
                    {/*                                }*/}
                    {/*                            </Text>*/}
                    {/*                        </TouchableOpacity>*/}
                    {/*                    )*/}
                    {/*                })*/}
                    {/*            }*/}
                    {/*        </ScrollView>*/}
                    {/*    </View>*/}
                    {/*</Modal>*/}
                    {this.state.possibleSexe.length > 0 && <Slidebottom showModal={this.state.userSexeChoice}
                        onRequestClose={() => {
                            this.setState({ userSexeChoice: false });
                        }}
                        callback={(item, index) => {
                            this.setState({ userSexe: item.value });
                            let checkUserdata = this.state.checkUserdata;
                            checkUserdata[0] = 'sexe';
                            this.setState({ checkUserdata: checkUserdata });
                            this.setState({ userSexeChoice: false })
                        }}
                        items={this.state.possibleSexe}
                        component_item={(item) => {
                            return (
                                <Text style={{ color: '#373535' }}>
                                    {
                                        item.name
                                    }
                                </Text>
                            )
                        }}
                    />}
                    {this.state.userNationalities.length > 0 && <Slidebottom showModal={this.state.userNationalitiesChoice}
                        onRequestClose={() => {
                            this.setState({ userNationalitiesChoice: false });
                        }}
                        callback={(item, index) => {
                            this.setState({ userNationality: item });
                            let checkUserdata = this.state.checkUserdata;
                            checkUserdata[2] = 'nationalite';
                            this.setState({ checkUserdata: checkUserdata });
                            this.setState({ userNationalitiesChoice: false })
                        }}
                        items={this.state.userNationalities}
                        component_item={(item) => {
                            return (
                                <Text style={{ color: '#373535' }}>
                                    {
                                        item.name
                                    }
                                </Text>
                            )
                        }}
                    />}
                    {(this.state.userSports && this.state.userSports.length > 0) && <Slidebottom showModal={this.state.userSportsListChoice}
                        onRequestClose={() => {
                            this.setState({ userSportsListChoice: false });
                        }}
                        callback={async (item, index) => {

                            this.setState({ selectedSport: item });
                            let checkUserdata = this.state.checkUserdata;
                            checkUserdata[5] = 'sport';
                            this.setState({ checkUserdata: checkUserdata });
                            await this.getSportListLevels(item.id);
                            this.setState({ selectedSportLevel: { id: null, name: null } });
                            // await this.getListClubs(this.state.selectedSport.id, this.state.sportLevels[0].id);
                            this.setState({ userSportsListChoice: false })
                            this.setState({ animText: true }, () => {
                                setTimeout(() => {
                                    this.setState({ animText: false })
                                }, 2000)
                            })
                        }}
                        items={this.state.userSports}
                        component_item={(item) => {
                            return (
                                <Text style={{ color: '#373535' }}>
                                    {
                                        item.name
                                    }
                                </Text>
                            )
                        }}
                    />}

                    {this.state.sportLevels.length > 0 && <Slidebottom showModal={this.state.sportLevelChoice}
                        onRequestClose={() => {
                            this.setState({ sportLevelChoice: false });
                        }}
                        callback={async (item, index) => {
                            this.setState({ selectedSportLevel: item });
                            this.setState({ sportLevelChoice: false });
                            if (item.is_amateur == false) {
                                await this.getListClubs(this.state.selectedSport.id, item.id);
                                // this.setState({ selectedLevelClub: {"id": null,"name": null }})
                                this.setState({ selectedLevelClub: null });
                                this.setState({ isamateurclub: false });
                            } else {
                                this.setState({ selectedLevelClub: null });
                                this.setState({ isamateurclub: true });
                            }
                        }}
                        items={this.state.sportLevels}
                        component_item={(item) => {
                            return (
                                <Text style={{ color: '#373535' }}>
                                    {
                                        item.name
                                    }
                                </Text>
                            )
                        }}
                    />}

                    {this.state.levelClubs.length > 0 && <Slidebottom showModal={this.state.levelClubChoice}
                        onRequestClose={() => {
                            this.setState({ levelClubChoice: false });
                        }}
                        callback={async (item, index) => {

                            this.setState({ selectedLevelClub: item })
                            this.setState({ levelClubChoice: false });

                        }}
                        items={this.state.levelClubs}
                        component_item={(item) => {
                            return (
                                <Text style={{ color: '#373535' }}>
                                    {
                                        item.name
                                    }
                                </Text>
                            )
                        }}
                    />}

                    <Slidebottom showModal={this.state.userNationalClubChoice}
                        onRequestClose={() => {
                            this.setState({ userNationalClubChoice: false });
                        }}
                        callback={async (item, index) => {

                            this.setState({ userNationalClub: item.value })
                            this.setState({ userNationalClubChoice: false })
                            // if (item.value) {
                            //     this.setState({ isWritingNationalClubName: true })
                            // }
                        }}
                        items={this.state.booleanValues}
                        component_item={(item) => {
                            return (
                                <Text style={{ color: '#373535' }}>
                                    {
                                        item.name
                                    }
                                </Text>
                            )
                        }}
                    />




                    <Slidebottom showModal={this.state.haveAccessTiersChoice}
                        onRequestClose={() => {
                            this.setState({ haveAccessTiersChoice: false });
                        }}
                        callback={async (item, index) => {

                            this.setState({ haveAccessTiers: item.value })
                            this.setState({ haveAccessTiersChoice: false })
                            if (item.value) {
                                console.warn('item.valu', item.value)
                                // this.setState({ isWritingFullName: true })
                            }
                        }}
                        items={this.state.booleanValues}
                        component_item={(item) => {
                            return (
                                <Text style={{ color: '#373535' }}>
                                    {
                                        item.name
                                    }
                                </Text>
                            )
                        }}
                    />
                    <DateTimePicker
                        cancelTextIOS={"Annuler"}
                        locale="fr_FR"
                        confirmTextIOS={"Confirmer"}
                        isDarkModeEnabled={false}
                        headerTextIOS={" "}
                        isVisible={this.state.isDateTimePickerVisible}
                        onConfirm={this.handleDatePicked}
                        onCancel={this.hideDateTimePicker}
                    // maximumDate={new Date()}
                    />
                </LinearGradient>
            </KeyboardAwareScrollView>
        )
    }
}

// export default AddTension;
const mapStateToProps = (state) => {
    const { isFichePedag, userToken, isvenudonneperso } = state.statedata
    return { isFichePedag, userToken, isvenudonneperso }
};

export default connect(mapStateToProps)(DonneesPerso);
