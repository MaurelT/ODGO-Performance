import PathologieConstant from "../contants/pathologie_constant";
import { BaseURL } from "../../configs/api_base_url";

const PathologieHelper = {
    getBlessurePathologies: async (token,annee) => {
        const url = PathologieConstant.GetBlessurePathologies+'/'+annee
        const params = JSON.stringify({})
        const response = await (await fetch(url, {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + token
            }
        })).json()
        return response
    },
    getoneblessure: async (token,id) => {
        const url = BaseURL+'api/blessures/'+id;
        const params = JSON.stringify({})
        const response = await (await fetch(url, {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + token
            }
        })).json();
        return response
    },

    getNameMembreOfSquelette : async (token,id) => {
        const url = BaseURL+'api/zones/'+id;
        const params = JSON.stringify({})
        const response = await (await fetch(url, {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + token
            }
        })).json();
        return response
    },

    getpathologieblessure : async (token,zoneid,pathologie_type_id) => {
        const url = BaseURL+"api/pathologies/index/"+zoneid+"/"+pathologie_type_id
        const params = JSON.stringify({})
        const response = await (await fetch(url, {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + token
            }
        })).json()
        return response
    },

    gettempsindisponibilites : async (token) => {
        const url = BaseURL+"api/temps_indisponibilites"
        const params = JSON.stringify({})
        const response = await (await fetch(url, {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + token
            }
        })).json()
        return response
    },

    getIRM: async (token) => {
        const url = BaseURL+"api/examen_medicals"
        const params = JSON.stringify({})
        const response = await (await fetch(url, {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + token
            }
        })).json()
        return response
    },

    blessuresave : async (token,
                    zone_id,
                    //pathologie_type_id,
                    pathologie_id,
                    date,
                    operation,
                    temps_indisponibilite_id,
                    //examen_medical_id,
                    files
                    ) => {
        const url = BaseURL + "api/users/blessure/save";
        const params = JSON.stringify({
                zone_id: zone_id,
                //pathologie_type_id: pathologie_type_id,
                pathologie_id: pathologie_id,
                date: date,
                operation: operation,
                temps_indisponibilite_id: temps_indisponibilite_id,
            //facultatif
                //examen_medical_id: examen_medical_id,
                files:files

        });
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

export default PathologieHelper
