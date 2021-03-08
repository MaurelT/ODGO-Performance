import { BaseURL } from "../../configs/api_base_url";


const hydratationHelper = {
    getContenant: async (token) => {
        const url = BaseURL + "api/hydratation_contenants";
        const params = JSON.stringify({})
        const response = await (await fetch(url, {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + token
            }
        })).json()
        return response
    },

    getNombreDeVerre: async (token,id) => {
        const url = BaseURL + "api/hydratation-contenants/"+id;
        const params = JSON.stringify({})
        const response = await (await fetch(url, {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + token
            }
        })).json()
        return response
    },

    getCount : async (token,id) => {
        const url = BaseURL + "api/hydratations";
        const params = JSON.stringify({})
        const response = await (await fetch(url, {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + token
            }
        })).json()
        return response
    },

    subCount : async (token,id) => {
        const url = BaseURL + "api/hydratations/delete/"+id;
        const params = JSON.stringify({
            hydratation_contenant_id:id
        });
        const response = await (await fetch(url, {
            method: "DELETE",
            headers: {
                'content-type': 'application/json',
                "Authorization": "Bearer " + token
            },
            body: params
        })).json();
        return response
    },

    addCount : async (token,id) => {
        const url = BaseURL + "api/hydratations";
        const params = JSON.stringify({
            hydratation_contenant_id:id
        })
        const response = await (await fetch(url, {
            method: "POST",
            headers: {
                'content-type': 'application/json',
                "Authorization": "Bearer " + token
            },
            body: params
        })).json();
        return response
    },



// putUserConnectedTrain: async (
//     token,
//     duree_heure,
//     duree_minute,
//     entrainement_type_id,
//     intensite,
//     difficulte,
//     qualite,
//     implication,
//     commentaire
// ) => {
//     const url = TrainConstant.putUserConnectedTrainUrl
//     const params = JSON.stringify({
//         duree_heure: duree_heure,
//         duree_minute: duree_minute,
//         entrainement_type_id: entrainement_type_id,
//         intensite: intensite,
//         difficulte:difficulte,
//         qualite:qualite,
//         implication:implication,
//         commentaire:commentaire
//     })
//     const response = await (await fetch(url, {
//         method: "PUT",
//         headers: {
//             Accept: 'application/json',
//             'Content-Type': 'application/json',
//             "Authorization": "Bearer " + token
//         },
//         cache: "no-cache",
//         body: params
//     })).json()
//     return response
// },

};

export default hydratationHelper
