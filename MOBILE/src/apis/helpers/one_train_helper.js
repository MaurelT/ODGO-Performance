import OneTrainConstant from "../contants/one_train_constant";
import { BaseURL } from "../../configs/api_base_url";

const OneTrainHelper = {
    getOneTrains: async (token,itemidparam) => {
        const url = BaseURL+"api/entrainements/"+itemidparam
        const params = JSON.stringify({})
        const response = await (await fetch(url, {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + token
            }
        })).json()
        return response
    }
}

export default OneTrainHelper;
