import { createStackNavigator, createAppContainer } from "react-navigation";
import Training from "./Training";
import Programs from "./Programs/Programs";
import History from "./History/History";
import Mamobilite from "./History/Mamobilite";
import ListeVideoByColonneLeftRight from "./History/ListeVideoBycolonneLeftRight";
import Tensionvideo from "./History/Tensionvideo";
import Videothequesquelette from "./History/Videothequesquelette";
import VideoByType from "./VideoByType/VideoByType";
import VideoByZone from "./VideoByZone/VideoByZone";
import SingleExercice from "./SingleExercice/SingleExercice";
import TrainSingle from "./TrainSingle/TrainSingle";
import AddTraining from "./NewTraining/AddTraining";
import Protocoles from "./Protocoles/protocoles";
import ListeExerciceByZone from "./VideoByZone/ListeExerciceByZone";

const TrainNavigator = createStackNavigator({
    Training: {
        screen: Training
    },
    Programs: {
        screen: Programs
    },
    History: {
        screen: History
    },
    VideoByType: {
        screen: VideoByType
    },
    VideoByZone: {
        screen: VideoByZone
    },
    Protocoles: {
        screen: Protocoles
    },
    SingleExercice: {
        screen: SingleExercice
    },
    AddTraining: {
        screen: AddTraining
    },
    TrainSingle: {
        screen: TrainSingle
    },
    ListeExerciceByZone:{
        screen: ListeExerciceByZone
    },
    Mamobilite:{
        screen: Mamobilite
    },
        ListeVideoByColonneLeftRight:{
            screen: ListeVideoByColonneLeftRight
        },
        Tensionvideo:{
            screen: Tensionvideo
        },
        Videothequesquelette:{
            screen: Videothequesquelette
        },
},
{
    initialRouteName: "Training",
    defaultNavigationOptions: {
        header: null
    }
})

export default createAppContainer(TrainNavigator)
