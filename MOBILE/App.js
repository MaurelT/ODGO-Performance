/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Fragment, Component } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar
} from 'react-native';
import { Provider } from 'react-redux';
import AppContainer from './src/navigation';
import appStore from './src/redux/appStore';
import 'react-native-gesture-handler'


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    global.repas_type_id = 1; //nouriture
    global.is_individual = false;
    global.is_venudedonneperso = true;

  }

  render() {
    return (
      <Provider store={appStore}>
        <AppContainer />
      </Provider>
    )
  }
}

export default App;
