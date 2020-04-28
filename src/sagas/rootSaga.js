import {all} from 'redux-saga/effects';
import {
  watchUpdateUserDetailsApiCall,
  watchOtpVerifyApiCall,
  watchChangePasswordApiCall,
  watchUserPunchApiCall,
  watchGetUserApiCall,
  watchLogin,
  watchLoginApiCall,
  watchFetchUserInfo,
  watchFetchStoreData,
  watchAllMealData,
  watchMealDetails,
  watchFetchStoreInfoData,
  watchFetchProductList,
} from '../sagas/loginSagas';
function* rootSaga() {
  yield all([
    watchOtpVerifyApiCall(),
    watchUpdateUserDetailsApiCall(),
    watchChangePasswordApiCall(),
    watchUserPunchApiCall(),
    watchGetUserApiCall(),
    watchLoginApiCall(),
    watchLogin(),
    watchAllMealData(),
    watchMealDetails(),
    watchFetchUserInfo(),
    watchFetchStoreData(),
    watchFetchStoreInfoData(),
    watchFetchProductList(),
  ]);
}
export default rootSaga;
