import { all } from 'redux-saga/effects';
import { watchLogin,watchLoginApiCall,
    watchFetchUserInfo,
    watchFetchStoreData,watchAllMealData,watchMealDetails,
    watchFetchStoreInfoData,watchFetchProductList} from '../sagas/loginSagas';
function* rootSaga() {
    yield all([
        watchLoginApiCall(),
        watchLogin(),watchAllMealData(),
        watchMealDetails(),
        watchFetchUserInfo(),
        watchFetchStoreData(),
        watchFetchStoreInfoData(),
        watchFetchProductList()
    ])
}
export default rootSaga