import { BaseURL } from "../../configs/api_base_url";


const dashBoardH = {
    getDashboard: async (token) => {
        const url = BaseURL + "api/users/dashboard/get";
        const params = JSON.stringify({})
        const response = await (await fetch(url, {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + token
            }
        })).json()
        return response
    },
    changephotoprofil: async (token, imageprofil
    ) => {
        const url = BaseURL + "api/dashboard/change-photo";
        const params = JSON.stringify(imageprofil);
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

export default dashBoardH
