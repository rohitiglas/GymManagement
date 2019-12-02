import { all } from 'redux-saga/effects';
import {
    watchChangePasswordApiCall,
    watchUserPunchApiCall,
    watchGetUserApiCall, watchLoginApiCall,
    watchFetchUserInfo,} from '../sagas/loginSagas';
function* rootSaga() {
    yield all([
        watchChangePasswordApiCall(),
        watchUserPunchApiCall(),
        watchGetUserApiCall(),
        watchLoginApiCall(),

        watchFetchUserInfo(),

    ])
}
export default rootSaga