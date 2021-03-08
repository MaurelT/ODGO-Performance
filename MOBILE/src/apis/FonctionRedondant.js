import React from 'react';
import {AsyncStorage, NetInfo, Text, View} from 'react-native';
import {
    SET_MON_ASSIETTE,
    SET_NOS_SUGGESTION,
    SET_PETITS_DEJEUNER_REPAS,
    SET_MON_PHYSIQUE,
    SET_PATHOLOGIE_BLESSURE,
    SET_PATHOLOGIE_TENSION,
    SET_ONE_TENSION,
    SET_PETITS_DEJEUNERD,
    SET_COMPTEUR_NUTRITIONNEL,
    SET_COLLATION_MATIN, SET_REPAS_DEJEUNER, SET_COLLATION_APRESMIDI, SET_DINER, SET_DASHBOARD,
    SET_TRAIN_STORIES, SET_IS_CONECTED,
    SET_NOS_SUGGESTION_ALLFORSEARCH
} from '../redux/types/tabTypes';
import compteurNutritionnelHelper from './helpers/compteurNutritionnel_helper';
import PersonalDataHelper from './helpers/person_data_helper';
import PathologieHelper from './helpers/pathologie_helper';
import PathologieHelperTension from './helpers/tension_helper';
import dashboardHelper from './helpers/dashboard_helper';



async function getSelectionnerNosSuggestion(compteurNutritionnelHelper,props,idrepas) {  //compteur nutritionnnel , selectionnermesrepas
    this.nosSuggestions=[];
    //this.setState({refreshing: true});
    console.warn('miakatra donne',idrepas)
    let setnosSuggestions = { type: SET_NOS_SUGGESTION, value: [] }
    props.dispatch(setnosSuggestions);
    const selectionnerNosSuggestion = await compteurNutritionnelHelper.getSelectionnerNossuggestions(props.userToken,idrepas);
    if (selectionnerNosSuggestion) {
        console.warn('midina donne',selectionnerNosSuggestion);
        //esor manaraka ity a
        // if(idrepas === 1){
        //   //  selectionnerNosSuggestion.data.Céréales.aliments
        //     let nosSuggestions = {
        //                     id :selectionnerNosSuggestion.data.Céréales.id ,
        //                     name:selectionnerNosSuggestion.data.Céréales.name,
        //                 };
        //     let aliments = [];
        //             let aliments_ = selectionnerNosSuggestion.data.Céréales.aliments;
        //             for(let j = 0;j < aliments_.length; j++){
        //                 let aliment = aliments_[j];
        //                 let alimentss = {
        //                     id:aliment.id,
        //                     name:aliment.name,
        //                     kilocalorie:aliment.kcalorie_pour_100g,
        //                     quantite:aliment.quantity_recommanded,
        //                     color:'red',
        //                     repas_type_id:aliment.aliment_type_id,
        //                     food_id:aliment.id,
        //                     glucide:aliment.glucide_pour_100g,
        //                     proteine:aliment.proteine_pour_100g,
        //                     lipide:aliment.lipide_pour_100g,
        //                     portion_en_g:aliment.portion_en_g
        //                 }
        //                 aliments.push(alimentss)
        //             }
        //     nosSuggestions.aliment = aliments;
        //     this.nosSuggestions.push(nosSuggestions);
        // }
        //     let setnosSuggestions = { type: SET_NOS_SUGGESTION, value: this.nosSuggestions } //eto zany za no mi-trave
        //     props.dispatch(setnosSuggestions);
        //     let refreshingfalse = false;
        //     return refreshingfalse;


        if(selectionnerNosSuggestion.data.length> 0 ){
            for(let i = 0;i <selectionnerNosSuggestion.data.length;i++){
                let nosSuggestions = {
                    id :selectionnerNosSuggestion.data[i].id ,
                    name:selectionnerNosSuggestion.data[i].name,
                };
                let aliments = [];
                let aliments_ = selectionnerNosSuggestion.data[i].aliments;
                for(let j = 0;j < aliments_.length; j++){
                    let aliment = aliments_[j];
                    let alimentss = {
                        id:aliment.id,
                        name:aliment.name,
                        suggestion_id:aliment.suggestion_id,
                        color:aliment.aliment_type.color,
                        kilocalorie:aliment.kcalorie_pour_100g,
                        quantite:aliment.quantity_recommanded,
                        repas_type_id:selectionnerNosSuggestion.data[i].id,
                        food_id:aliment.id,
                        glucide:10,//ts mias tsun nefa tsis am le api vaovao
                        proteine:10,//ts mias tsun
                        lipide:10,//ts mias tsun
                        portion_en_g:10//ts mias tsun
                    };
                    aliments.push(alimentss)
                }
                nosSuggestions.aliment = aliments; //nataoko aliment koa re ty ry havako e nefa debu aliments

                this.nosSuggestions.push(nosSuggestions);
            }

            let setnosSuggestions = { type: SET_NOS_SUGGESTION, value: this.nosSuggestions } //eto zany za no mi-trave
            props.dispatch(setnosSuggestions);

            let refreshingfalse = false;
            return refreshingfalse;
        }
    }
};


async function monassiete(compteurNutritionnelHelper,props,repas_type_id,date) {  //petitdejeuner , compteurNutritionnel, SelectionnerMesRepas
    this.monassietee=[];
    //dispacchevako am le recuperation ataoko
    const monassiete = await compteurNutritionnelHelper.getMonassiete(props.userToken,repas_type_id,date);
    console.warn('azo ve de azo v',monassiete)
    if (monassiete) {
        if(monassiete.data.food_groups.length> 0 ){
            for(let i = 0;i <monassiete.data.food_groups.length;i++){
                if(monassiete.data.food_groups[i].aliments.length>0){// si pas vide chaque item
                    let assiete = {
                        id :monassiete.data.food_groups[i].id ,
                        name:monassiete.data.food_groups[i].name,
                        totalbe:{total_kcal:monassiete.data.total_kcal,
                            total_glucides:monassiete.data.total_glucides,
                            total_proteines:monassiete.data.total_proteines,
                            total_lipides:monassiete.data.total_lipides,

                            max_kcal:monassiete.data.max_kcal,
                            max_glucides:monassiete.data.max_glucides,
                            max_proteines:monassiete.data.max_proteines,
                            max_lipides:monassiete.data.max_lipides,
                        }
                    };
                    let aliments = [];
                    let aliments_ = monassiete.data.food_groups[i].aliments; //aliment n ato fa ts aliments otran nos suggestion
                    for(let j = 0;j < aliments_.length; j++){
                        let aliment = aliments_[j];
                        let alimentss = {}
                        if(aliment.is_portion){
                            if(aliment.portion_en_ml >0){
                                alimentss = {
                                    id:aliment.id,
                                    name:aliment.name,
                                    kilocalorie:((aliment.portion_en_ml * aliment.users_aliments[aliment.users_aliments.length-1].quantite) * aliment.kcalorie_pour_100g /100 ),
                                    //quantite:monassiete.data[i].quantite,
                                    quantite:aliment.users_aliments[aliment.users_aliments.length-1].quantite,//mety na indice zero na length-1
                                    color:aliment.aliment_type.color,
                                    repas_type_id:aliment.aliment_type_id,
                                    food_id:aliment.users_aliments[aliment.users_aliments.length-1].id, //id a utiliser est celui de users_aliments
                                    is_portion:aliment.is_portion
                                }
                            }else{
                                alimentss = {
                                    id:aliment.id,
                                    name:aliment.name,
                                    kilocalorie:((aliment.portion_en_g * aliment.users_aliments[aliment.users_aliments.length-1].quantite) * aliment.kcalorie_pour_100g /100 ),
                                    //quantite:monassiete.data[i].quantite,
                                    quantite:aliment.users_aliments[aliment.users_aliments.length-1].quantite,//mety na indice zero na length-1
                                    color:aliment.aliment_type.color,
                                    repas_type_id:aliment.aliment_type_id,
                                    food_id:aliment.users_aliments[aliment.users_aliments.length-1].id, //id a utiliser est celui de users_aliments
                                    is_portion:aliment.is_portion
                                }
                            }

                        }else{
                            alimentss = {
                                id:aliment.id,
                                name:aliment.name,
                                kilocalorie:(aliment.users_aliments[aliment.users_aliments.length-1].quantite *  aliment.kcalorie_pour_100g / 100),
                                //quantite:monassiete.data[i].quantite,
                                quantite:aliment.users_aliments[aliment.users_aliments.length-1].quantite,//mety na indice zero na length-1
                                color:aliment.aliment_type.color,
                                repas_type_id:aliment.aliment_type_id,
                                food_id:aliment.users_aliments[aliment.users_aliments.length-1].id, //id a utiliser est celui de users_aliments
                                is_portion:aliment.is_portion
                            }
                        }
                        aliments.push(alimentss)
                    }
                    assiete.aliment = aliments;
                    this.monassietee.push(assiete);
                }
            }
                console.warn(this.monassietee)
            const setmonassiette = { type: SET_MON_ASSIETTE, value: this.monassietee } ;
            props.dispatch(setmonassiette);
            let refreshingfalse = false;
            return refreshingfalse;
        }

    }
};


// async function getViaPostPetitsDejeuner(compteurNutritionnelHelper,props,repas_type_id) {  //petitdejeuner , selectionnermesrepas
//     this.petitsDejeunerMesRepas = [];
//
//     let setPetitsDejeuner = { type: SET_PETITS_DEJEUNER_REPAS, value: [] };
//     props.dispatch(setPetitsDejeuner);
//     const petitsdej = await compteurNutritionnelHelper.getViaPostPetitsDejeuner(props.userToken,repas_type_id);
//     if (petitsdej) {
//         console.warn('mon petj',petitsdej)
//         for(let i = 0 ; i < petitsdej.data.length; i++){
//             let Calories = 0;
//             if(petitsdej.data[i].aliments.length > 0){
//                 for(let j = 0 ; j < petitsdej.data[i].aliments.length; j++) {
//                     Calories += petitsdej.data[i].aliments[j].kcalorie_pour_100g * petitsdej.data[i].aliments[j].portion_en_g / 100;
//                 }
//             }
//             let petitdejeu = {
//                 id : petitsdej.data[i].id,
//                 name : petitsdej.data[i].libelle,
//                 thumbnail: petitsdej.data[i].picture,
//                 kilocalorie : Calories //calories io fa ts kilo fa ny recepteur any kilo de avelao aminio aloh
//             };
//             this.petitsDejeunerMesRepas.push(petitdejeu);
//         }
//         let setPetitsDejeuner = { type: SET_PETITS_DEJEUNER_REPAS, value: this.petitsDejeunerMesRepas }
//         props.dispatch(setPetitsDejeuner);
//
//         let refreshingfalse = false;
//         return refreshingfalse;
//     }
// };

async function getViaPostRepas(compteurNutritionnelHelper,props,repas_type_id) {
    let setrepas = null;

    if(repas_type_id == 1){ //collation matin
        setrepas = { type: SET_PETITS_DEJEUNER_REPAS, value: [] };
        props.dispatch(setrepas);

    }else if(repas_type_id == 2){ //collation matin

        setrepas = { type: SET_COLLATION_MATIN, value: [] };
        props.dispatch(setrepas);

    }else if(repas_type_id == 3){ //dejeuner
        setrepas = { type: SET_REPAS_DEJEUNER, value: [] }
        props.dispatch(setrepas);

    }else if(repas_type_id == 4){

        setrepas = { type: SET_COLLATION_APRESMIDI, value: [] };
        props.dispatch(setrepas);

    }else if(repas_type_id == 5){

        setrepas = { type: SET_DINER, value: [] };
        props.dispatch(setrepas);

    }

    const repas = await compteurNutritionnelHelper.getViaPostPetitsDejeuner(props.userToken,repas_type_id);
    let repasarray = [];
    if (repas.data !== null) {
        console.warn('okay',repas)
        for(let i = 0 ; i < repas.data.length; i++){
            let Calories = 0;
            if(repas.data[i].aliments.length > 0){
                for(let j = 0 ; j < repas.data[i].aliments.length; j++) {
                   const aliment = repas.data[i].aliments[j];
                   let caca = 0;
                    if(aliment.is_portion){
                        if(aliment.portion_en_ml  > 0){
                            caca = (aliment._joinData.quantite * aliment.portion_en_ml) * aliment.kcalorie_pour_100g / 100
                        }else{
                        caca = (aliment._joinData.quantite * aliment.portion_en_g) * aliment.kcalorie_pour_100g / 100
                    }
                    }else{
                        caca = aliment._joinData.quantite  * aliment.kcalorie_pour_100g / 100;
                    }
                    Calories += caca;
                }
            }
            let dejeu = {
                id : repas.data[i].id,
                name : repas.data[i].libelle,
                thumbnail: repas.data[i].picture,
                kilocalorie : Calories //calories io fa ts kilo fa ny recepteur any kilo de avelao aminio aloh
            };
            repasarray.push(dejeu);
        }
    console.warn('repasarray',repasarray)

        let setrepasplein; //Var redux

        if(repas_type_id == 1){
            setrepasplein = { type: SET_PETITS_DEJEUNER_REPAS, value: repasarray };
            props.dispatch(setrepasplein);

        }else if(repas_type_id == 2){
            let setCollationMatinn = { type: SET_COLLATION_MATIN, value:repasarray };
            props.dispatch(setCollationMatinn);

        }else if(repas_type_id == 3){
            setrepasplein  = { type: SET_REPAS_DEJEUNER, value: repasarray }
            props.dispatch(setrepasplein);

        }else if(repas_type_id == 4){

            setrepasplein = { type: SET_COLLATION_APRESMIDI, value: repasarray };
            props.dispatch(setrepasplein);

        }else if(repas_type_id == 5){

            setrepasplein = { type: SET_DINER, value: repasarray };
            props.dispatch(setrepasplein);

        }
        // console.warn('repas tonga via get ok',repasarray,repas);
        return null;
    }else{
        // console.warn('repas tonga via get ok',repasarray,repas);
        return null;
    }
};

async function getMonPhysique(PersonalDataHelper,props) {  //MonPhysique , Montestunit
    const monPhysique = await PersonalDataHelper.getMonPhysique(props.userToken);
    if(monPhysique){
        let setMonPhysique = { type: SET_MON_PHYSIQUE, value: monPhysique }
        props.dispatch(setMonPhysique);

        let refreshingfalse = false;
        return refreshingfalse;
    }
}


async function getBlessurePathologie(PathologieHelper,props,anneeparam) {  //Pathologie , addBlessure , carnet
    const pathologieblessure = await PathologieHelper.getBlessurePathologies(props.userToken,anneeparam);
    if(pathologieblessure){
        // this.setState({refreshing: false})
        // this.setState({pathologieblessure:pathologieblessure.data})
        let setPathologieblessure = { type: SET_PATHOLOGIE_BLESSURE, value: pathologieblessure.data }
        props.dispatch(setPathologieblessure);
        let refreshingfalse = pathologieblessure.data;
        return refreshingfalse;
    }
}

async  function getTensionPathologie(PathologieHelperTension,props,anneeparam) { //pathologie, addtension
    const pathologietension = await PathologieHelperTension.getTensionPathologies(props.userToken,anneeparam);
    if(pathologietension){
        let setPathologietension = { type: SET_PATHOLOGIE_TENSION, value: pathologietension.data }
        props.dispatch(setPathologietension);

        return false;
    }
}

async  function getonetension(PathologieHelperTension,props,id) { //pathologie , add tension
    const onetension = await PathologieHelperTension.getonetension(props.userToken,id);
    if (onetension) {
        let setOnetension = { type: SET_ONE_TENSION, value: onetension.data }
        props.dispatch(setOnetension);

        //this._selectedId = (pathologietension.data.zone_id,pathologietension.data.zone.name,true) tokon averiko any am tension

        let idzone = onetension.data.zone_id;//ilaiko am resaka swiper affichena io na face na derierre
        return idzone;
    }};


async  function getCompteurNutritionnel(compteurNutritionnelHelper,props,userToken) { //compteur nutritionnel
    const compteurNutritionnel = await compteurNutritionnelHelper.getCompteurNutritionnel(userToken);
    if (compteurNutritionnel) {
        console.warn('compteur nutrio',compteurNutritionnel)
        // this.setState({refreshing: false,compteurNutritionnel:compteurNutritionnel});
        const setcompteurNutritionnel = { type: SET_COMPTEUR_NUTRITIONNEL, value: compteurNutritionnel };
        props.dispatch(setcompteurNutritionnel);
        let refreshingfalse = false;
        return refreshingfalse;
    }
};

async  function getDashboar(dashboardHelper,props) {
    const dashboard = await dashboardHelper.getDashboard(props.userToken);
    if (dashboard) {
        const setDashboard = { type: SET_DASHBOARD, value: dashboard };
        props.dispatch(setDashboard);
        let refreshingfalse = false;
        return refreshingfalse;
    }
};


async  function getUserTrains(TrainHelper,props,annee) {
    const trainStories = await TrainHelper.getUserTrains(props.userToken,annee);
    if (trainStories) {
        const settrainStories = { type: SET_TRAIN_STORIES, value: trainStories };
        props.dispatch(settrainStories);
        let refreshingfalse = false;
        return refreshingfalse;

        // obj miasa trainStoriesobj
    }
};



  function unsubscribe(NetInfo,props) {
    NetInfo.addEventListener(state => {
        const setConnected = { type: SET_IS_CONECTED, value: state.isConnected };
        props.dispatch(setConnected);
    });
};

function MiniOfflineSign() {
    return (
        <View style={{backgroundColor: '#b52424',
            height: 30,
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'row',
            width:'100%',
            position: 'absolute',}}>
            <Text style={{color:'white'}}>Pas de connexion internet.</Text>
        </View>
    );
}

function search(textSearch,props,filteredNosSuggestionfiltered,filteredmesRepaspetitsdejeunerfiltered,filteredEatRecentlyfiltered,filteredCollationmatinfiltered,filteredDejeunerfiltered,filteredCollationApresMidifiltered,filteredDinerfiltered,createFilter){
    props.dispatch({ type: filteredNosSuggestionfiltered, value: [] });
    props.dispatch({ type: filteredmesRepaspetitsdejeunerfiltered, value: [] });
    props.dispatch({ type: filteredEatRecentlyfiltered, value: [] });
    props.dispatch({ type: filteredCollationmatinfiltered, value: [] });
    props.dispatch({ type: filteredDejeunerfiltered, value: [] });
    props.dispatch({ type: filteredCollationApresMidifiltered, value: [] });
    props.dispatch({ type: filteredDinerfiltered, value: [] });
    const KEYS_TO_FILTERS0 = ['name'
    //'aliments.name','aliments.kcalorie_pour_100g'
];

const KEYS_TO_FILTERS1 = [//aliments
    'name','kcalorie_pour_100g'
];
    let filteredNosSuggestionfiltered_ =[]

        if(textSearch.length>0){
            const filteredNosSuggestion0 = props.nosSuggestionssearch.filter(createFilter(textSearch, KEYS_TO_FILTERS0,{caseSensitive:false}));
            if(filteredNosSuggestion0.length>0) {
                props.dispatch({ type: filteredNosSuggestionfiltered, value: filteredNosSuggestion0 });
                return false;
            }else{
                for (let i = 0; i < props.nosSuggestionssearch.length; i++) {
                    if(props.nosSuggestionssearch[i].aliment.length>0) {//esorina
                        let filteredNosSuggestion1_ = props.nosSuggestionssearch[i].aliment.filter(createFilter(textSearch, KEYS_TO_FILTERS1));
                        if(filteredNosSuggestion1_.length>0){
                            let item = {
                                id: props.nosSuggestionssearch[i].id,
                                name: props.nosSuggestionssearch[i].name,
                                is_active: props.nosSuggestionssearch[i].is_active,
                                created: props.nosSuggestionssearch[i].created,
                                modified: props.nosSuggestionssearch[i].modified,
                            };
                            item.aliment = filteredNosSuggestion1_;
                            filteredNosSuggestionfiltered_.push(item);
                        }
                    }
                }
                props.dispatch({ type: filteredNosSuggestionfiltered, value: filteredNosSuggestionfiltered_ });
                return false;
            }

            const filteredPetitsDejeuner = props.mesRepaspetitsdejeuner.filter(createFilter(textSearch, KEYS_TO_FILTERS0));
            if(filteredPetitsDejeuner.length>0) {
                props.dispatch({ type: filteredmesRepaspetitsdejeunerfiltered, value: filteredPetitsDejeuner });

            }

            //filtered collation matin
            const filteredCollationmatin = props.collationmatin.filter(createFilter(textSearch, KEYS_TO_FILTERS0));
            if(filteredCollationmatin.length>0) {
                props.dispatch({ type: filteredCollationmatinfiltered, value: filteredCollationmatin });

            }

            //filtered collation matin
            const filteredDejeuner = props.dejeuner.filter(createFilter(textSearch, KEYS_TO_FILTERS0));
            if(filteredDejeuner.length>0) {
                props.dispatch({ type: filteredDejeunerfiltered, value: filteredDejeuner });

            }

            const filteredCollationApresMidi = props.collationapresmidi.filter(createFilter(textSearch, KEYS_TO_FILTERS0));
            if(filteredCollationApresMidi.length>0) {
                props.dispatch({ type: filteredCollationApresMidifiltered, value: filteredCollationApresMidi });
            }

            const filteredCollationDiner = props.diner.filter(createFilter(textSearch, KEYS_TO_FILTERS0));
            if(filteredCollationDiner.length>0) {
                props.dispatch({ type: filteredDinerfiltered, value: filteredCollationDiner });

            }

        }else{
            props.dispatch({ type: filteredNosSuggestionfiltered, value: [] });
            props.dispatch({ type: filteredmesRepaspetitsdejeunerfiltered, value: []})
            props.dispatch({ type: filteredCollationmatinfiltered, value: []})
            props.dispatch({ type: filteredDejeunerfiltered, value: []})
            props.dispatch({ type: filteredCollationApresMidifiltered, value: []})
            props.dispatch({ type: filteredDinerfiltered, value: []})
            return false;
        }
}

// this.setState({pathologieblessure:this.props.pathologieblessure});
// this.setState({pathologietension:this.props.pathologietension});

// getTensionPathologie = async (anneeparam) => {
//     this.setState({ refreshing:true })
//     const pathologietension = await PathologieHelperTension.getTensionPathologies(this.state.userToken,anneeparam);
//     if(pathologietension){
//         this.setState({refreshing: false})
//         // this.setAtivaListPathoToBlessure(pathologieblessure.data);
//         this.setState({pathologietension:pathologietension.data})
//     }
// };




 const getSelectionnerNossuggestionsAll = async (userToken,props) => { //nos suggestions
     const setnosSuggestions = { type: SET_NOS_SUGGESTION_ALLFORSEARCH, value: [] }
     props.dispatch(setnosSuggestions);
     this.nosSuggestions=[];
    const selectionnerMesPetitsDejeunerNosSuggestion = await compteurNutritionnelHelper.getSelectionnerNossuggestionsAll(userToken);
    if (selectionnerMesPetitsDejeunerNosSuggestion) {
         console.warn('data sug',selectionnerMesPetitsDejeunerNosSuggestion);
        if(selectionnerMesPetitsDejeunerNosSuggestion.data.length> 0 ){
            for(let i = 0;i <selectionnerMesPetitsDejeunerNosSuggestion.data.length;i++){
                let nosSuggestions = {
                    id :selectionnerMesPetitsDejeunerNosSuggestion.data[i].id ,
                    name:selectionnerMesPetitsDejeunerNosSuggestion.data[i].name,
                };
                let aliments = [];
                let aliments_ = selectionnerMesPetitsDejeunerNosSuggestion.data[i].aliments;
                for(let j = 0;j < aliments_.length; j++){
                    let aliment = aliments_[j];
                    let alimentss = {
                        id:aliment.id,
                        name:aliment.name,
                        kilocalorie:aliment.kcalorie_pour_100g,
                        quantite:aliment.quantity_recommanded,
                        color:aliment.aliment_type.color,
                        repas_type_id:aliment.aliment_type_id,
                        food_id:aliment.id,
                        glucide:aliment.glucide_pour_100g,
                        proteine:aliment.proteine_pour_100g,
                        lipide:aliment.lipide_pour_100g,
                        portion_en_g:aliment.portion_en_g,
                        newdatatoreglette:{portion_en_ml:aliment.portion_en_ml,is_portion:aliment.is_portion}
                    };
                    aliments.push(alimentss)
                }
                nosSuggestions.aliment = aliments;
                this.nosSuggestions.push(nosSuggestions);
            }

            let setnosSuggestions = { type: SET_NOS_SUGGESTION_ALLFORSEARCH, value: this.nosSuggestions }
            props.dispatch(setnosSuggestions);

            // this.setState({ nosSuggestions: this.state.nosSuggestions});
            // this.setState({refreshing: false});
            return true;
        }else{
            return true;
        }
    }else{
        return true;
    }



};



export{getSelectionnerNosSuggestion};
export{monassiete};
// export{getViaPostPetitsDejeuner};
export{getMonPhysique};
export{getBlessurePathologie};
export{getTensionPathologie};
export{getonetension};
export{getCompteurNutritionnel};
export{getViaPostRepas};
export{getDashboar};
export{getUserTrains};
export{unsubscribe};
export{MiniOfflineSign};
export{getSelectionnerNossuggestionsAll};
export{search};

