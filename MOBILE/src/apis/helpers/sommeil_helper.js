import { BaseURL } from "../../configs/api_base_url";


const sommeilHelper = {
    getUserSommeils: async (token) => {
        const url = BaseURL + "api/users/sommeil/get";
        const params = JSON.stringify({})
        const response = await (await fetch(url, {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + token
            }
        })).json()
        return response
    },

    getFacteurNuisible : async (token) => {
        const url = BaseURL + "api/sommeil_facteur_nuisibles";
        const params = JSON.stringify({});
        const response = await (await fetch(url, {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + token
            }
        })).json()
        return response
    },

    postsommeil : async (token,
                datasend
    ) => {
        const url = BaseURL + "api/users/sommeil/save";
        const params = JSON.stringify(datasend);
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

    // addCount : async (token,id) => {
    //     const url = BaseURL + "api/users/hydratation/save";
    //     const params = JSON.stringify({
    //         hydratation_contenant_id:id
    //     })
    //     const response = await (await fetch(url, {
    //         method: "PUT",
    //         headers: {
    //             'content-type': 'application/json',
    //             "Authorization": "Bearer " + token
    //         },
    //         body: params
    //     })).json();
    //     return response
    // },



};

export default sommeilHelper
