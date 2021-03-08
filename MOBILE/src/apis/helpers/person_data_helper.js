import ParamsConstant from "../contants/params_constant";
import PersonDataConstant from "../contants/person_data_constant";

const PersonalDataHelper = {


    putVideoTestResponse: async (
        token,
        id
    ) => {
        //const url = PersonDataConstant.putVideoTestResponse
        const url = "https://odgo.makeitdev.fr/api/users/reponse/save"
        const params = JSON.stringify({
            video_test_reponse_id: id
        });
        console.warn('ici envoi',id,token)
        const response = await (await fetch(url, {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token
            },
           // cache: "no-cache",
            body: params
        })).json()
        return response
    },
    getDroits :  async (token) => {
    const url = PersonDataConstant.droits;
    const params = JSON.stringify({});
    const responses = await (await fetch(url, {
        method: "GET",
        headers: {
            "Authorization": "Bearer " + token
        }
    })).json()
        if(responses.data.length <= 5){
            let resdata = responses.data;
           let arra = resdata.concat([{
                "id":6,//manomboka eto ts fantatra
                "name":"get_besoin_kcal",
                "is_restrict":true
            },
                {
                    "id":7,
                    "name":"get_besoin_hydro",
                    "is_restrict":true
                },
                {
                    "id":8,
                    "name":"get_depense_energetique",
                    "is_restrict":true
                },
                {
                    "id":9,
                    "name":"get_videotheque",
                    "is_restrict":true
                },
                {
                    "id":10,
                    "name":"get_besoin_sommeil",
                    "is_restrict":true
                },
                {
                    "id":11,
                    "name":"get_historique_entrainement",
                    "is_restrict":true
                },
                {
                    "id":12,
                    "name":"get_historique_blessure",
                    "is_restrict":true
                },
                {
                    "id":13,
                    "name":"get_historique_tension",
                    "is_restrict":true
                },
                {
                    "id":14,
                    "name":"get_historique_testing",
                    "is_restrict":true
                },
                {
                    "id":15,
                    "name":"get_historique_resultat",
                    "is_restrict":true
                },
                {
                    "id":16,
                    "name":"get_agenda",
                    "is_restrict":true
                }])
            let response = {
                "success":true,
                "error_msg":null
            };
            response.data = arra;
            return response

        }else{
            let response = responses;
           return response
        }

},
    getMonPhysique : async (token) => {
    const url = PersonDataConstant.monphysique;
    const params = JSON.stringify({})
    const response = await (await fetch(url, {
        method: "GET",
        headers: {
            "Authorization": "Bearer " + token
        }
    })).json()
    return response
},

    getFirstConnexion :  async (token) => {
        const url = PersonDataConstant.firstconnexion;
        const params = JSON.stringify({})
        const response = await (await fetch(url, {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + token
            }
        })).json()
        return response
    },


    getpointfortfaible : async (token) => {
        const url = PersonDataConstant.getpoinfortfaible;
        const params = JSON.stringify({})
        const response = await (await fetch(url, {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + token
            }
        })).json()
        return response
    },

getTestMobilite : async (token,id) => {
    const url = PersonDataConstant.zonetest+id;
    const params = JSON.stringify({})
    const response = await (await fetch(url, {
        method: "GET",
        headers: {
            "Authorization": "Bearer " + token
        }
    })).json()
    return response
},

getTestMobilitewithvideo : async (token,id) => {
        console.warn('id',id)
    const url = PersonDataConstant.zonetestvideo+id;
    const params = JSON.stringify({})
    const response = await (await fetch(url, {
        method: "GET",
        headers: {
            "Authorization": "Bearer " + token
        }
    })).json()
    return response
},

    getTestMobilitewithphoto : async (token,id) => {
        const url = PersonDataConstant.zonetestphoto+id;
        const params = JSON.stringify({})
        const response = await (await fetch(url, {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + token
            }
        })).json()
        return response
    },

    getNationalities: async (token) => {
        const url = PersonDataConstant.NationalitiesURL
        const params = JSON.stringify({})
        const response = await (await fetch(url, {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + token
            }
        })).json()
        return response
    },
    getSports: async (token) => {
        const url = PersonDataConstant.SportsURL
        const params = JSON.stringify({})
        const response = await (await fetch(url, {
            method: "GET",
            headers: {
                Accept: 'application/json',
                "Authorization": "Bearer " + token
            }
        })).json()
        return response
    },
    getLevels: async (token, id_sport) => {
        const url = PersonDataConstant.SportsURL + "/" + id_sport + "/levels"
        const params = JSON.stringify({})
        const response = await (await fetch(url, {
            method: "GET",
            headers: {
                Accept: 'application/json',
                "Authorization": "Bearer " + token
            }
        })).json()
        return response
    },
    getClubs: async (token, id_sport, id_level) => {
        const url = PersonDataConstant.SportsURL + "/" + id_sport + "/levels/" + id_level + "/clubs"
        const params = JSON.stringify({})
        const response = await (await fetch(url, {
            method: "GET",
            headers: {
                Accept: 'application/json',
                "Authorization": "Bearer " + token
            }
        })).json()
        return response
    },
    getTrainingFrequency: async (token) => {
        const url = PersonDataConstant.TrainingFrequencyURL
        const params = JSON.stringify({})
        const response = await (await fetch(url, {
            method: "GET",
            headers: {
                Accept: 'application/json',
                "Authorization": "Bearer " + token
            }
        })).json()
        return response
    },
    getUserData: async (token) => {
        const url = PersonDataConstant.GetUserDataURL
        const params = JSON.stringify({})
       return new Promise(async (resolve, reject) => {
           // fetch(url, {
           //      method: "GET",
           //      headers: {
           //          Accept: 'application/json',
           //          "Authorization": "Bearer " + token
           //      }
           //  }).then((response)=>{
           //     console.warn('re', response);
           //
           //     response.bob ="false"
           //     const res = response.json();
           //     let msi = JSON.stringify(response)
           //     console.warn('res', res); //response.status
           //
           //     resolve(res)
           //
           // }).catch((e) => {
           //     reject(e)
           // });
           // return response
           const response = await (await fetch(url, {
               method: "GET",
               headers: {
                   Accept: 'application/json',
                   "Authorization": "Bearer " + token
               }
           })).json();
           console.warn("response",response);
           resolve(response)
        })
    },
    putUserData: async (
        token,
        sexe,
        date_naissance,
        nationalite_id,
        taille_cm,
        poids_kg,
        sport_niveau_id,
        sport_niveau_club_id,
        custom_clubname,
        equipe_nationale,
        nom_equipe,
       // frequence_entrainement_id = 2,
        have_acces_tiers,
        prenom_nom_tiers,
        email_tiers,
        fonction_tiers,
        isamateurclub
    ) => {
        const url = PersonDataConstant.PutUserDataURL;

        let frequence_entrainement_id = 2;
        let params = null;

        if(equipe_nationale == false && have_acces_tiers == false){
            if(isamateurclub === false){
                params = JSON.stringify({
                    "sexe":sexe,
                    "date_naissance": date_naissance,
                    "nationalite_id": parseInt(nationalite_id,10),
                    "taille_cm": parseInt(taille_cm,10),
                    "poids_kg": poids_kg,
                    "sport_niveau_id": parseInt(sport_niveau_id,10),
                    "sport_niveau_club_id": parseInt(sport_niveau_club_id,10),
                    "equipe_nationale": equipe_nationale,
                    "frequence_entrainement_id": parseInt(frequence_entrainement_id,10),
                    "have_acces_tiers": have_acces_tiers,
                });
            }else{
                console.warn('io fa hitako')
                params = JSON.stringify({
                    "sexe":sexe,
                    "date_naissance": date_naissance,
                    "nationalite_id": parseInt(nationalite_id,10),
                    "taille_cm": parseInt(taille_cm,10),
                    "poids_kg": poids_kg,
                    "sport_niveau_id": parseInt(sport_niveau_id,10),
                    "club_custom": custom_clubname,
                    "equipe_nationale": equipe_nationale,
                    "frequence_entrainement_id": parseInt(frequence_entrainement_id,10),
                    "have_acces_tiers": have_acces_tiers,
                });
            }

        }else if(equipe_nationale == true && have_acces_tiers == false){
            if(isamateurclub === false) {
                params = JSON.stringify({
                    "sexe": sexe,
                    "date_naissance": date_naissance,
                    "nationalite_id": parseInt(nationalite_id, 10),
                    "taille_cm": parseInt(taille_cm, 10),
                    "poids_kg": poids_kg,
                    "sport_niveau_id": parseInt(sport_niveau_id,10),
                    "sport_niveau_club_id": parseInt(sport_niveau_club_id, 10),
                    "equipe_nationale": equipe_nationale,
                    "nom_equipe": nom_equipe,
                    "frequence_entrainement_id": parseInt(frequence_entrainement_id, 10),
                    "have_acces_tiers": have_acces_tiers,
                });
            }else{
                params = JSON.stringify({
                    "sexe": sexe,
                    "date_naissance": date_naissance,
                    "nationalite_id": parseInt(nationalite_id, 10),
                    "taille_cm": parseInt(taille_cm, 10),
                    "poids_kg": poids_kg,
                    "sport_niveau_id": parseInt(sport_niveau_id,10),
                    "club_custom": custom_clubname,
                    "equipe_nationale": equipe_nationale,
                    "nom_equipe": nom_equipe,
                    "frequence_entrainement_id": parseInt(frequence_entrainement_id, 10),
                    "have_acces_tiers": have_acces_tiers,
                });
            }
        } else if( have_acces_tiers == true && equipe_nationale == false){
            if(isamateurclub === false) {
                params = JSON.stringify({
                    "sexe": sexe,
                    "date_naissance": date_naissance,
                    "nationalite_id": parseInt(nationalite_id, 10),
                    "taille_cm": parseInt(taille_cm, 10),
                    "poids_kg": poids_kg,
                    "sport_niveau_id": parseInt(sport_niveau_id,10),
                    "sport_niveau_club_id": parseInt(sport_niveau_club_id, 10),
                    "equipe_nationale": equipe_nationale,
                    "frequence_entrainement_id": parseInt(frequence_entrainement_id, 10),
                    "have_acces_tiers": have_acces_tiers,
                    "prenom_nom_tiers": prenom_nom_tiers,
                    "email_tiers": email_tiers,
                    "fonction_tiers": fonction_tiers
                });
            }else{
                params = JSON.stringify({
                    "sexe": sexe,
                    "date_naissance": date_naissance,
                    "nationalite_id": parseInt(nationalite_id, 10),
                    "taille_cm": parseInt(taille_cm, 10),
                    "poids_kg": poids_kg,
                    "sport_niveau_id": parseInt(sport_niveau_id,10),
                    "club_custom": custom_clubname,
                    "equipe_nationale": equipe_nationale,
                    "frequence_entrainement_id": parseInt(frequence_entrainement_id, 10),
                    "have_acces_tiers": have_acces_tiers,
                    "prenom_nom_tiers": prenom_nom_tiers,
                    "email_tiers": email_tiers,
                    "fonction_tiers": fonction_tiers
                });
            }
        }   else{
            if(isamateurclub === false) {
                params = JSON.stringify({
                    "sexe": sexe,
                    "date_naissance": date_naissance,
                    "nationalite_id": parseInt(nationalite_id, 10),
                    "taille_cm": parseInt(taille_cm, 10),
                    "poids_kg": poids_kg,
                    "sport_niveau_id": parseInt(sport_niveau_id,10),
                    "sport_niveau_club_id": parseInt(sport_niveau_club_id, 10),
                    "equipe_nationale": equipe_nationale,
                    "nom_equipe": nom_equipe,
                    "frequence_entrainement_id": parseInt(frequence_entrainement_id, 10),
                    "have_acces_tiers": have_acces_tiers,
                    "prenom_nom_tiers": prenom_nom_tiers,
                    "email_tiers": email_tiers,
                    "fonction_tiers": fonction_tiers
                });
            }else{
                params = JSON.stringify({
                    "sexe": sexe,
                    "date_naissance": date_naissance,
                    "nationalite_id": parseInt(nationalite_id, 10),
                    "taille_cm": parseInt(taille_cm, 10),
                    "poids_kg": poids_kg,
                    "sport_niveau_id": parseInt(sport_niveau_id,10),
                    "club_custom": custom_clubname,
                    "equipe_nationale": equipe_nationale,
                    "nom_equipe": nom_equipe,
                    "frequence_entrainement_id": parseInt(frequence_entrainement_id, 10),
                    "have_acces_tiers": have_acces_tiers,
                    "prenom_nom_tiers": prenom_nom_tiers,
                    "email_tiers": email_tiers,
                    "fonction_tiers": fonction_tiers
                });
            }
        }

        // let params = new FormData()
        // params.append("sexe", sexe)
        // params.append("date_naissance", date_naissance)
        // params.append("nationalite_id", nationalite_id)
        // params.append("taille_cm", taille_cm)
        // params.append("poids_kg", poids_kg)
        // params.append("sport_niveau_club_id", sport_niveau_club_id)
        // params.append("equipe_nationale", equipe_nationale)
        // params.append("nom_equipe", nom_equipe)
        // params.append("frequence_entrainement_id", frequence_entrainement_id)
        // params.append("have_acces_tiers", have_acces_tiers)
        // params.append("prenom_nom_tiers", prenom_nom_tiers)
        // params.append("email_tiers", email_tiers)
        // params.append("fonction_tiers", fonction_tiers)
        console.warn('ppapareme',params)
        const response = await (await fetch(url, {
            method: "PUT",
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                "Authorization": "Bearer " + token,
                Cache: "no-cache"
            },
            cache: "no-cache",
            body: params
        })).json()
        // console.log(JSON.stringify(response))
        console.warn('the response',response)
        return response
    },
    getObjectifs: async (token) => {
        const url = PersonDataConstant.GetObjectifsURL
        const params = JSON.stringify({})
        const response = await (await fetch(url, {
            method: "GET",
            headers: {
                Accept: 'application/json',
                "Authorization": "Bearer " + token
            }
        })).json()
        return response
    },
    getRegimes: async (token) => {
        const url = PersonDataConstant.GetRegimesURL
        const params = JSON.stringify({})
        const response = await (await fetch(url, {
            method: "GET",
            headers: {
                Accept: 'application/json',
                "Authorization": "Bearer " + token
            }
        })).json()
        return response
    },
    getExgAlim: async (token) => {
        const url = PersonDataConstant.GetExgAlimURL
        const params = JSON.stringify({})
        const response = await (await fetch(url, {
            method: "GET",
            headers: {
                Accept: 'application/json',
                "Authorization": "Bearer " + token
            }
        })).json()
        return response
    },
    getUserNutrition: async (token) => {
        const url = PersonDataConstant.GetUserNutritionURL
        const params = JSON.stringify({})
        const response = await (await fetch(url, {
            method: "GET",
            headers: {
                Accept: 'application/json',
                "Authorization": "Bearer " + token
            }
        })).json()
        return response
    },
    putUserNutrition: async (
        token,
        morphologie,
        objectif_id,
        regime_special_id,
        exigence_alimentaires
    ) => {
        const url = PersonDataConstant.PutUserNutritionURL
        const params = JSON.stringify({
            morphologie: morphologie,
            objectif_id: objectif_id,
            regime_special_id: regime_special_id,
            exigence_alimentaires: exigence_alimentaires // Array of id
        })
        const response = await (await fetch(url, {
            method: "PUT",
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                "Authorization": "Bearer " + token
            },
            cache: "no-cache",
            body: params
        })).json()
        return response
    },
    getUserNbHeureSommeil: async (token) => {
        const url = PersonDataConstant.GetUserNbHeureSommeilURL
        const params = JSON.stringify({})
        const response = await (await fetch(url, {
            method: "GET",
            headers: {
                Accept: 'application/json',
                "Authorization": "Bearer " + token
            }
        })).json()
        return response
    },
    putUserNbHeureSommeil: async (
        token,
        nb_heure_sommeil
    ) => {
        const url = PersonDataConstant.PutUserNbHeureSommeilURL
        const params = JSON.stringify({
            nb_heure_sommeil: nb_heure_sommeil
        })
        const response = await (await fetch(url, {
            method: "PUT",
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                "Authorization": "Bearer " + token
            },
            cache: "no-cache",
            body: params
        })).text()
        console.log(response)
        return response
    },
    getListTypesActivities: async (token) => {
        const url = PersonDataConstant.GetListTypesActivitiesURL
        const response = await (await fetch(url, {
            method: "GET",
            headers: {
                Accept: 'application/json',
                "Authorization": "Bearer " + token
            }
        })).json()
        return response
    },
    getUserActivities: async (token) => {
        const url = PersonDataConstant.UserActivitiesURL
        const response = await (await fetch(url, {
            method: "GET",
            headers: {
                Accept: 'application/json',
                "Authorization": "Bearer " + token
            }
        })).json()
        return response
    },
    postUserActivities: async (token) => {
        const url = PersonDataConstant.UserActivitiesURL
        const response = await (await fetch(url, {
            method: "POST",
            headers: {
                Accept: 'application/json',
                "Authorization": "Bearer " + token
            }
        })).json()
        return response
    }
}

export default PersonalDataHelper
