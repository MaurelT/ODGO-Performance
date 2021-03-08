import PathologieConstantTension from "../contants/tension_constant";
import {BaseURL} from '../../configs/api_base_url';

const PathologieHelperTension = {
    getTensionPathologies: async (token,annee) => {
        const url = PathologieConstantTension.GetTensionPathologies+'/'+annee
        const params = JSON.stringify({})
        const response = await (await fetch(url, {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + token
            }
        })).json()
        return response
    },

    getonetension: async (token,id) => {
        const url = BaseURL+'api/tensions/'+id;
        const params = JSON.stringify({})
        const response = await (await fetch(url, {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + token
            }
        })).json()
        return response
    },

    tensionsave : async (token,
                          zone_id,
                          intensite
    ) => {
        const url = BaseURL + "api/users/tension/save";
        const params = JSON.stringify({
            zone_id: zone_id,
            intensite: intensite,
        });
        const response = await (await fetch(url, {
            method: "PUT",
            headers: {
                'content-type': 'application/json',
                "Authorization": "Bearer " + token
            },
            body: params
        })).json();
        return response
    },

};

export default PathologieHelperTension;
