import corpsConstant from "../contants/monCorps_constant";
const CorpsHelper = {
    getCorps: async (token) => {
        const url = corpsConstant.CorpsURL
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
}
export default CorpsHelper
