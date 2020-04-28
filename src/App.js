import React, {Component} from 'react';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import allReducers from './reducers';
import AppNavigation from './navigation/AppNavigation';
import creatSagaMiddleware from 'redux-saga';
import rootSaga from './sagas/rootSaga';
import {AsyncStorage} from 'react-native';
import PushNotification from 'react-native-push-notification';

const sagaMiddleware = creatSagaMiddleware();
let store = createStore(allReducers, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(rootSaga);

class App extends Component {
  render() {
    console.disableYellowBox = true;
    return (
      <Provider store={store}>
        <AppNavigation />
      </Provider>
    );
  }
}
export default App;
