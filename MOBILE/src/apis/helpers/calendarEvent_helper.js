import { BaseURL } from "../../configs/api_base_url";
import CalendarWithPluginCompetition from "../../containers/CalendarWithPlugin/CalendarWithPluginCompetition";


const CalendarEventHelper = {
    getCalendarEvent: async (token,annee,month) => {
    const url = BaseURL + "api/events?year=" + annee + "&month=" + month;
    const params = JSON.stringify({})
    const response = await (await fetch(url, {
        method: "GET",
        headers: {
            "Authorization": "Bearer " + token,

}
})).json()
return response
},
    getCalendarEventCompetition: async (token,annee,month) => {
        console.warn('depart',parseInt(month).toString().padStart(2,'0'),annee);
        const url = BaseURL + "api/users/competitions/get/02/2020";
        const params = JSON.stringify({});
        const response = await (await fetch(url, {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + token,
              //  "Accept-Encoding":"gzip, deflate, br"
            }
        })).json();
        console.warn('tonga ve calendar compet',response);
        return response
    },

    getCompetitionByDay: async (token,year,month,day) => {
        const url = BaseURL + "api/competitions/getCompetitionByDate/"+year+'-'+month+'-'+day;
        const params = JSON.stringify({});
        const response = await (await fetch(url, {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + token
            }
        })).json()
        return response
    },

    getCompetitionbyId:async (token,id) => {
        const url = BaseURL + "api/competitions/"+ id;
        const params = JSON.stringify({})
        const response = await (await fetch(url, {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + token
            }
        })).json()
        return response
    },
    getScoreParams:async (token) => {
        const url = BaseURL + "api/sport_params";
        const params = JSON.stringify({})
        const response = await (await fetch(url, {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + token
            }
        })).json()
        return response
    },

    supprItem:async (token,id) => {
        const url = BaseURL + "api/events/"+id;
        const params = JSON.stringify({})
        const response = await (await fetch(url, {
            method: "DELETE",
            headers: {
                "Authorization": "Bearer " + token
            }
        })).json()
        return response
    },


    postEvent : async (
    token,
    jour,
    periode,
    activity_id,
    heure_debut,
    heure_fin

) => {
    const url = BaseURL + "api/weeks";
    const params = JSON.stringify(
        {
            "jour":jour,
            "periode": periode,
            "activity_id": activity_id,
            "heure_debut": heure_debut,
            "heure_fin": heure_fin
        }
    );
    const response = await (await fetch(url, {
        method: "POST",
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            "Authorization": "Bearer " + token
        },
        cache: "no-cache",
        body: params
    })).json();
    console.warn('res ',response)
    return response
},
    editEvent : async (
        token,
        id,
        jour,
        periode,
        activity_id,
        heure_debut,
        heure_fin

    ) => {
        const url = BaseURL + "api/weeks/edit";
        const params = JSON.stringify(
            {
                "id":id,
                "jour":jour,
                "periode": periode,
                "activity_id": activity_id,
                "heure_debut": heure_debut,
                "heure_fin": heure_fin
            }
        );
        const response = await (await fetch(url, {
            method: "POST",
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                "Authorization": "Bearer " + token
            },
            cache: "no-cache",
            body: params
        })).json();
        return response
    },
    supprItemmasemaine:async (token,ids) => {
        const url = BaseURL + "api/weeks/delete";
        const params = JSON.stringify({id:parseInt(ids)})
        const response = await (await fetch(url, {
            method: "DELETE",
            headers: {
                'content-type': 'application/json',
                "Authorization": "Bearer " + token
            },
           // cache: "no-cache",
            body: params
        })).json();
        console.warn(response)
        return response
    },

    postEventActiviteProgrammes : async (
        token,
        paramss
    ) => {
        const url = BaseURL + "api/events";
        const params = JSON.stringify(
            paramss
        );
        const response = await (await fetch(url, {
            method: "POST",
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                "Authorization": "Bearer " + token
            },
            cache: "no-cache",
            body: params
        })).json();
        console.warn('res ',response)
        return response
    },


    putEditEventActiviteProgrammes  : async (
    token,
    paramss,
    id
) => {
    const url = BaseURL + "api/events/"+id;
    const params = JSON.stringify(
        paramss
    );
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



    postDeclarerMatch: async (
        token,
        idCompet,
        param_idScore,
        userScore,
        param_idStatut,
        userStatut,
        param_idTempdejeu,
        userTempdejeu,
        param_idButs,
        userButs,
        param_idPasses,
        userPasses,
        param_idRouge,
        userRouge,
        param_idJaune,
        userJaune,
        param_idj18,
        j18
    ) => {
        const url = BaseURL + "api/users/competition-sport-params/save";
        const params = JSON.stringify(
            [
                {competition_id:idCompet,sport_param_id:param_idScore,current_value:userScore},
                {competition_id:idCompet,sport_param_id:param_idTempdejeu,current_value:userTempdejeu},
                {competition_id:idCompet,sport_param_id:param_idButs,current_value:userButs},
                {competition_id:idCompet,sport_param_id:param_idPasses,current_value:userPasses},
                {competition_id:idCompet,sport_param_id:param_idJaune,current_value:userJaune},
                {competition_id:idCompet,sport_param_id:param_idRouge,current_value:userRouge},
                {competition_id:idCompet,sport_param_id:param_idStatut,current_value:userStatut},
                {competition_id:idCompet,sport_param_id:param_idj18,current_value:j18}


            ]
        );
        const response = await (await fetch(url, {
            method: "POST",
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                "Authorization": "Bearer " + token
            },
            cache: "no-cache",
            body: params
        })).json();
        console.warn('res ',response)
        return response
    },

    postDeclarerCompet : async (
        token,
        data,
        // param_idData,
        // userData
    ) => {
        // const url = BaseURL + "api/users/competition-sport-params/save"; talou
        // const url = BaseURL + "api/competitions/save";
        const url = BaseURL + "api/competitions/add";
        // let vide = '';
        // let data = [];
        // for(let i = 0; i<param_idData.length; i++){
        //     if(userData[i] === null || userData[i] === ""){
        //         console.warn('vide');
        //         vide = 'vide';
        //         break;
        //     }else{
        //         data.push({competition_id:idCompet,sport_param_id:param_idData[i],current_value:userData[i]})
        //     }
        // }
        console.warn('datata',data)
        const params = JSON.stringify(data);

        // const params = JSON.stringify(
        //     [
        //         {competition_id:idCompet,sport_param_id:param_idScore,current_value:userScore},
        //         {competition_id:idCompet,sport_param_id:param_idTempdejeu,current_value:userTempdejeu},
        //         {competition_id:idCompet,sport_param_id:param_idButs,current_value:userButs},
        //         {competition_id:idCompet,sport_param_id:param_idPasses,current_value:userPasses},
        //         {competition_id:idCompet,sport_param_id:param_idJaune,current_value:userJaune},
        //         {competition_id:idCompet,sport_param_id:param_idRouge,current_value:userRouge},
        //         {competition_id:idCompet,sport_param_id:param_idStatut,current_value:userStatut},
        //         {competition_id:idCompet,sport_param_id:param_idj18,current_value:j18}
        //     ]
        // );

        const response = await (await fetch(url, {
            method: "POST",
            headers: {
                Accept: 'application/json', //nesoriko le 27 fev 2020
                'content-type': 'application/json',
                "Authorization": "Bearer " + token
            },
           // cache: "no-cache",
            body: params
        })).json();
        console.warn('res ',response)
        return response
    },



    getEventCalendarByDay:async (token,year,month,day) => {
        console.warn(year+''+month+''+day)
        const url = BaseURL + "/api/events?year=" + year + "&month="+ month +"&day="+ day;
        const params = JSON.stringify({})
        const response = await (await fetch(url, {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + token
            }
        })).json();
        console.warn(response)
        return response
    },

};

export default CalendarEventHelper
