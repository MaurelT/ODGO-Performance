import { BaseURL } from "../../configs/api_base_url";

const PersonDataConstant = {
    putVideoTestResponse:BaseURL + 'api/users/reponse/save',
    droits:BaseURL + 'api/droits/index',
    monphysique:BaseURL + 'api/zone_tests',
    firstconnexion:BaseURL + 'api/users/changePremiereConnexion',
    getpoinfortfaible:BaseURL + 'api/zone_tests/getPointFortFaible',
    zonetest:BaseURL + 'api/video_tests/index/',
    zonetestvideo:BaseURL + 'api/video_tests/get/',
    zonetestphoto:BaseURL + 'api/video_test_reponses/index/',
    GetUserDataURL: BaseURL + "api/users/data/get",
    PutUserDataURL: BaseURL + "api/users/data/save",
    NationalitiesURL: BaseURL + "api/nationalities",
    SportsURL: BaseURL + "api/sports",
    // get levels api/sports/:id_sport/levels
    // get clubs api/sports/:id_sport/levels/:id_level/clubs
    TrainingFrequencyURL: BaseURL + "api/training-frequencies",
    // Page 2
    GetObjectifsURL: BaseURL + "api/objectifs",
    GetRegimesURL: BaseURL + "api/regimes",
    GetExgAlimURL: BaseURL + "api/food-requirements",
    // api/nationalities alredy on page 1
    GetUserNutritionURL: BaseURL + "api/users/nutrition/get",
    PutUserNutritionURL: BaseURL +  "api/users/nutrition/save",
    // Energie
    GetUserNbHeureSommeilURL: BaseURL + "api/users/sleep/get",
    PutUserNbHeureSommeilURL: BaseURL + "api/users/sleep/save",
    // Mon planning
    GetListTypesActivitiesURL: BaseURL + "api/activities",
    UserActivitiesURL: BaseURL + "api/weeks"
}

export default PersonDataConstant
