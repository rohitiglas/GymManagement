import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import allReducers from './reducers';
import AppNavigation from './navigation/AppNavigation';
import creatSagaMiddleware from 'redux-saga';
import rootSaga from './sagas/rootSaga';


const sagaMiddleware = creatSagaMiddleware()
let store = createStore(allReducers, applyMiddleware(sagaMiddleware))
sagaMiddleware.run(rootSaga)

const App = () => {
    console.disableYellowBox = true;
    return (
        <Provider store={store}>
            <AppNavigation />
        </Provider>
    )
}
export default App