import TrainConstant from "../contants/train_constant";
import PathologieConstant from "../contants/pathologie_constant";
import PersonDataConstant from "../contants/person_data_constant";
import {BaseURL} from '../../configs/api_base_url';

const TrainHelper = {
    getUserTrains: async (token,annee) => {
    //const url = TrainConstant.GetUserTrains+2020;
    const url = "https://odgo.makeitdev.fr/api/entrainements/get-by-date/"+annee;
    const params = JSON.stringify({});
    const response = await (await fetch(url, {
        method: "GET",
        headers: {
            "Authorization": "Bearer " + token
}
})).json();
return response
},

getactiviteprincipale: async (token) => {
    const url = TrainConstant.Getactiviteprincipale;
    const params = JSON.stringify({})
    const response = await (await fetch(url, {
        method: "GET",
        headers: {
            "Authorization": "Bearer " + token
        }
    })).json()
    return response
},

putUserConnectedTrain: async (
    token,
    duree_heure,
    duree_minute,
    entrainement_type_id,
    intensite,
    difficulte,
    qualite,
    implication,
    commentaire
) => {
    const url = TrainConstant.putUserConnectedTrainUrl
    const params = JSON.stringify({
        duree_heure: duree_heure,
        duree_minute: duree_minute,
        entrainement_type_id: entrainement_type_id,
        intensite: intensite,
        difficulte:difficulte,
        qualite:qualite,
        implication:implication,
        commentaire:commentaire
    });
    const response = await (await fetch(url, {
        method: "POST",
        headers: {
            // Accept: 'application/json',
            // 'Content-Type': 'application/json', POUR LES PUT
            // "Authorization": "Bearer " + token
            'content-type': 'application/json',
            "Authorization": "Bearer " + token
        },
        //cache: "no-cache", POUR PUT
        body: params
    })).json();
    return response
},


    sendcomsonly : async (token,
                         coms
    ) => {
        const url = BaseURL + "api/entrainements/addComment";
        const params = JSON.stringify(coms);
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
}

export default TrainHelper
