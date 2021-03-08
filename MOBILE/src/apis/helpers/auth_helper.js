import base64 from 'react-native-base64'
import AuthConstant from '../contants/auth_constant'
// import CookieManager from 'react-native-cookies'
import { BaseURL } from '../../configs/api_base_url'
// import jwt from "react-native-pure-jwt"

const useWebKit = true;

const AuthHelper = {
    _getToken: async (user, password) => {
        const response = await fetch('http://192.168.64.2', {
            method: "POST",
            // mode: "cors",
            headers: {
                "Authorization": "Basic " + base64.encode("user:password")
            },
            body: JSON.stringify({
                fiied1: value1,
                fiied2: value2,
                //...
                fiied3: value3
            })
        })
        return response
    },
    getAuth: async(email, password) =>{
        const URL = AuthConstant.AuthURL
        const params = JSON.stringify({
            email: email,
            password: password
        })
        let response = await (await fetch(URL,{
            method: "POST",
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            credentials: 'same-origin',
            body: params
        })).json()
        // const tokenCookie = {
        //     name: 'token',
        //     value: response.data.token,
        //     domain: BaseURL,
        //     origin: BaseURL,
        //     path: '/',
        //     version: '1',
        //     expiration: '2030-05-30T12:30:00.00-05:00'
        // }
        // const csrfTokenCookie = {
        //     name: 'x-crsf-token',
        //     value: response.data.token,
        //     domain: BaseURL,
        //     origin: BaseURL,
        //     path: '/',
        //     version: '1',
        //     expiration: '2030-05-30T12:30:00.00-05:00'
        // }
        // CookieManager.setFromResponse(AuthConstant.AuthURL,
        //     'token='+response.data.token+";x-crsf-token="+response.data.token+";"+
        //     'path=/;'+ 
        //     'expires=Thu, 1 Jan 2030 00:00:00 -0000;'
        //     )
        // .then((res) => {
        //     console.log('CookieManager.set from webkit-view =>', res);
        // })
        // CookieManager.setFromResponse(BaseURL,csrfTokenCookie)
        // .then((res) => {
        //     console.log('CookieManager.set from webkit-view =>', res);
        // })
        // response.headers.set('set-cookie', {token: (await response.json()).data.token})
        // console.log(JSON.stringify(response.headers.get('x-powered-by')))
        return response
    },
    // signInWithJWT: async (email, password) => {
    //     jwt.sign(
    //         {
    //             iss: email,
    //             exp: new Date().getTime() * 3600 * 1000,
    //             additional: "payload"
    //         },
    //         password,
    //         {
    //             alg: "HS256"
    //         }
    //     )
    //     .then(
    //         data => {
    //             console.log("JWT")
    //             console.log(JSON.stringify(data))
    //             // return data
    //         }
    //     )
    //     .catch(
    //         error => {
    //             console.log(JSON.stringify(error))
    //         }
    //     )
    // }
}

export default AuthHelper