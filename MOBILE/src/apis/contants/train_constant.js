import { BaseURL } from "../../configs/api_base_url";

const TrainConstant = {
    // GetUserTrains: BaseURL + "api/users/entrainement/get",
    GetUserTrains: BaseURL + "api/users/entrainements/get-by-date/",
    Getactiviteprincipale:BaseURL+ "api/entrainement_types",
    // putUserConnectedTrainUrl:BaseURL+ "api/users/entrainement/save", niova tay koa
    putUserConnectedTrainUrl:BaseURL+ "api/entrainements",
}

export default TrainConstant;
