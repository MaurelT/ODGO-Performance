import TrainConstant from "../contants/train_constant";
import PathologieConstant from "../contants/pathologie_constant";
import PersonDataConstant from "../contants/person_data_constant";
import { BaseURL } from "../../configs/api_base_url";


const VideothequeHelper = {
    get_trainer_userprogrammes: async (token) => {
    const url = BaseURL+'api/user-programmes';
    const params = JSON.stringify({})
    const response = await (await fetch(url, {
        method: "GET",
        headers: {
            "Authorization": "Bearer " + token
}
})).json()
return response
},
    getUserProgramByColumngauchedroite: async (token,idzone,idtest) => {
        const url = BaseURL+'api/VideoZoneTest/index/' + idzone + '/' + idtest;
        const params = JSON.stringify({})
        const response = await (await fetch(url, {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + token
            }
        })).json()
        return response
    },
    getUserProgramBysquelettepo: async (token,idzone,idtest) => {
        const url = BaseURL+'api/VideosZones/index/' + idzone + '/' + idtest;
        const params = JSON.stringify({})
        const response = await (await fetch(url, {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + token
            }
        })).json()
        return response
    },
    getMembres: async (token) => {
        const url = BaseURL+'api/zone_tests';
        const params = JSON.stringify({})
        const response = await (await fetch(url, {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + token
            }
        })).json()
        return response
    },
    get_trainer_userprogrammes_byType : async (token) => {
        const url = BaseURL+'api/video-types';
        const params = JSON.stringify({})
        const response = await (await fetch(url, {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + token
            }
        })).json()
        return response
    },
    getProgrammetypes : async (token) => {
        const url = BaseURL+'api/ProgrammeTypes/index/1';
        const params = JSON.stringify({});
        const response = await (await fetch(url, {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + token
            }
        })).json();
        return response
    },

    getUserProgramByType: async (token,idtype) => {
        const url = BaseURL+'api/video-types/'+idtype;
        const params = JSON.stringify({})
        const response = await (await fetch(url, {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + token
            }
        })).json()
        return response
    },

    getUserProgramByZone: async (token,idzone) => {
        const url = BaseURL+'api/videos-zones/'+idzone;
        const params = JSON.stringify({})
        const response = await (await fetch(url, {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + token
            }
        })).json()
        return response
    },

    getUserProgramByID: async (token,id,page) => {
        const url = BaseURL+'api/user-programmes/'+id+'/'+page;
        const params = JSON.stringify({})

        const response = await (await fetch(url, {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + token
            }
        })).text()
        console.warn('repponse',response)
        return response
    },

    getSingleVideoTrainingVideotech: async (token,id) => {
        const url = BaseURL+'api/videos/'+id;
        const params = JSON.stringify({})

        const response = await (await fetch(url, {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + token
            }
        })).json()
        console.warn('repponse',response)
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
//     });
//     const response = await (await fetch(url, {
//         method: "PUT",
//         headers: {
//             Accept: 'application/json',
//             'Content-Type': 'application/json',
//             "Authorization": "Bearer " + token
//         },
//         cache: "no-cache",
//         body: params
//     })).json();
//     return response
// },

};

export default VideothequeHelper
