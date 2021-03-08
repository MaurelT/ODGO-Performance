import { BaseURL } from "../../configs/api_base_url";


const compteurNutritionnelHelper = {
    getCompteurNutritionnel: async (token) => {
        const url = BaseURL + "api/nutritionals";
        const params = JSON.stringify({})
        const response = await (await fetch(url, {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + token
            }
        })).json()
        return response
    },
    deletealimentassiete: async (token,useralimentid) => {
        const url = BaseURL + "api/foods/delete/"+useralimentid;
        const params = JSON.stringify({})
        const response = await (await fetch(url, {
            method: "PUT",
            headers: {
                "Authorization": "Bearer " + token
            }
        })).json()
        return response
    },

    getforReglettepagewithparam: async (token,alimentid,suggestionid) => {
        const url = BaseURL + "api/foods/view/"+alimentid + "/" + suggestionid ;
        const params = JSON.stringify({})
        const response = await (await fetch(url, {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + token
            }
        })).json()
        return response
    },
    getforReglettepage: async (token,alimentid) => {
        const url = BaseURL + "api/foods/view/"+alimentid;
        const params = JSON.stringify({})
        const response = await (await fetch(url, {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + token
            }
        })).json()
        return response
    },

    suppressionrepas : async (token,idrepas) => {
        const url = BaseURL + "api/repas/delete";
        const params = JSON.stringify({
            id:idrepas
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

    saveCreationrepasFormdata: async (token,datasend) => {
        const url = BaseURL + "api/repas/add";
        const params = JSON.stringify(
             datasend
        )
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

    saveEditionrepas : async (token,datasend) => {
        const url = BaseURL + "api/repas/edit";
        const params = JSON.stringify(
            datasend
        );
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


    putquantitemonassiette: async (token,id,quantite,alimentid,myfoodid,daty) => {
        const url = BaseURL + "api/foods/"+myfoodid;
        let params = {}
        if(quantite === 0){
           // params =JSON.stringify({quantity:quantite})
            params =JSON.stringify({quantite:quantite,date:daty})
        }else{
            params = JSON.stringify({quantite:quantite,date:daty})

        }
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
        console.warn('response',response)
        return response
    },

    getEatRecently : async (token) => {
        const url = BaseURL + "api/foods/eatRecently";
        const params = JSON.stringify({})
        const response = await (await fetch(url, {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + token
            }
        })).json()
        return response
    },

    getMonassiete: async (token,repas_type_id,daty) => {
    const url = BaseURL + "api/foods/userFoods/"+repas_type_id+"/"+daty;
    const params = JSON.stringify({});
    const response = await (await fetch(url, {
        method: "GET",
        headers: {
            "Authorization": "Bearer " + token
        }
    })).json()
    return response
},
    getItemForEditMesRepas : async (token,repas_type_id) => {
        const url = BaseURL + "api/repas/view/"+repas_type_id;
        const params = JSON.stringify({})
        const response = await (await fetch(url, {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + token
            }
        })).json()
        return response
    },


    getViaPostPetitsDejeuner: async (token,repas_type_id) => {
        const url = BaseURL + "api/repas/index";
        const params = JSON.stringify({
            repas_type_id : repas_type_id
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

    getSelectionnerNossuggestions: async (token,idrepas) => {
        const url = BaseURL + "api/foods/suggestion/"+idrepas;
        //const url = BaseURL + "api/foods";

        const params = JSON.stringify({})
        const response = await (await fetch(url, {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + token
            }
        })).json()
        console.warn('nos  helper',response)
        return response
    },
    getSelectionnerNossuggestionsAll: async (token,idrepas) => {
       // const url = BaseURL + "api/foods/suggestion/"+idrepas;
        const url = BaseURL + "api/foods/index";

        const params = JSON.stringify({})
        const response = await (await fetch(url, {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + token
            }
        })).json()
        return response
    },
    getRepasType: async (token) => {
        const url = BaseURL + "api/RepasTypes";
        const params = JSON.stringify({})
        const response = await (await fetch(url, {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + token
            }
        })).json()
        return response
    },

    save_food : async (token,repas_type_id,food_id,quantite,date) => {
        const url = BaseURL + "api/foods";
        const params = JSON.stringify({
            repas_type_id:repas_type_id,
            food_id:food_id,
            quantite:quantite,
            date:date
        });
        console.warn('params',params)
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

    save_alimentMesRepas : async (token,id,daty) => {
        const url = BaseURL + "api/repas/addAliments";
        console.warn('id',id)
        const params = JSON.stringify({
            id:id,
            date:daty
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

};

export default compteurNutritionnelHelper
