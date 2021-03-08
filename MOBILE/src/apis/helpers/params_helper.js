import ParamsConstant from "../contants/params_constant";
// import CookieManager from 'react-native-cookies';

const ParamsHelper = {
    getParams: async (token) => {
        const url = ParamsConstant.ParamsURL
        const params = JSON.stringify({})
        const response = await (await fetch(url, {
            method: "GET",
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                "Authorization": 'Bearer ' + token
            }
        })).json()
        // console.log(response)
        return response
    },
    setParams: async (token, notification_type_id) => {
        const url = ParamsConstant.ParamsURL
        const dataToSend = new FormData()
        dataToSend.append("notification_type_id", notification_type_id)
        const response = await (await fetch(url, {
            method: "POST",
            headers: {
                Accept: 'application/json',
                // 'Content-Type': 'application/json',
                "Authorization": 'Bearer ' + token
            },
            body: dataToSend
        })).json()
        return response
    }
}

export default ParamsHelper
