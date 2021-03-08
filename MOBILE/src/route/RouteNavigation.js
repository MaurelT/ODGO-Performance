import { StackNavigator, DrawerNavigator, DrawerItems} from  'react-navigation';

import HistoriqueCompetition from '../containers/Performance/HistoriqueCompetition';




const PageRoute = StackNavigator({
            HistoriqueCompetition:{screen: HistoriqueCompetition},

},
    {
        headerMode: "none",
    }
);


export default PageRoute;



