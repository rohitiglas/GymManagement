import {put, call, fork, takeLatest} from 'redux-saga/effects';
import {Alert} from 'react-native';
import * as types from '../actions/types';
import * as loginApis from '.././service/loginApis';
import {
  setStoreData,
  setUserInfo,
  setStoreInfoData,
  setProductList,
  setAllMealData,
  setMealDetails,
  setUserPunch,
  setSelectedDrawerRow,
} from '../actions/loginActions';

export function* login(action) {
  // try {
  //     const data = yield call(loginApis.login, action.params)
  //     action.onSuccess(data.data)
  //     setToken(data.data.token || '');
  //     yield put(setUserInfo(data.data.user))
  // } catch (error) {
  //     action.onError(error)
  // }
}

export function* loginApiCall(action) {
  try {
    const data = yield call(loginApis.loginApiCall, action.params);
    console.log('JSSSSSSSSSSSSSSSSSSSS', data.data);
    if (data.data.error) {
      Alert.alert('', data.data.message);
    } else {
      Alert.alert('', data.data.message);
    }
    action.onSuccess(data.data);
  } catch (error) {
    action.onError(error);
  }
}

export function* otpVerifyApiCall(action) {
  try {
    const data = yield call(loginApis.otpVerifyApiCall, action.params);
    if (data.data.error) {
      Alert.alert('', data.data.message);
    } else {
      Alert.alert('', data.data.message);
    }
    action.onSuccess(data.data);
  } catch (error) {
    action.onError(error);
  }
}

export function* updateUserDetailsApiCall(action) {
  try {
    const data = yield call(loginApis.updateUserDetailsApiCall, action.params);
    if (data.data.error) {
      Alert.alert('', data.data.message);
    } else {
      Alert.alert('', data.data.message);
    }
    action.onSuccess(data.data);
  } catch (error) {
    action.onError(error);
  }
}

export function* getUserApiCall(action) {
  try {
    const data = yield call(loginApis.getUserApiCall, action.params);

    yield put(setUserInfo(data.data.data));
    action.onSuccess(data.data);
  } catch (error) {
    action.onError(error);
  }
}

export function* userPunchApiCall(action) {
  try {
    const data = yield call(loginApis.userPunchApiCall, action.params);
    yield put(setUserPunch(data.data.data));
    action.onSuccess(data.data);
  } catch (error) {
    action.onError(error);
  }
}

export function* changePasswordApiCall(action) {
  try {
    const data = yield call(loginApis.changePasswordApiCall, action.params);
    if (data.data.error) {
      Alert.alert('', data.data.message);
    } else {
      yield put(setSelectedDrawerRow('Home'));
    }
    action.onSuccess(data.data);
    // yield put(setUserInfo(data.data))
  } catch (error) {
    console.log('skkkkkkkBBABAAAAAAAAAAA', error);

    action.onError(error);
  }
}

export function* watchLoginApiCall() {
  yield takeLatest(types.LOGIN_API_CALL, loginApiCall);
}

export function* watchOtpVerifyApiCall() {
  yield takeLatest(types.OTP_VERIFY_API_CALL, otpVerifyApiCall);
}
export function* watchUpdateUserDetailsApiCall() {
  yield takeLatest(
    types.UPDATE_USER_DETAILS_API_CALL,
    updateUserDetailsApiCall,
  );
}

export function* watchGetUserApiCall() {
  yield takeLatest(types.GET_USER_API_CALL, getUserApiCall);
}

export function* watchUserPunchApiCall() {
  yield takeLatest(types.USER_PUNCH_API_CALL, userPunchApiCall);
}

export function* watchChangePasswordApiCall() {
  yield takeLatest(types.CHANGE_PASSWORD_API_CALL, changePasswordApiCall);
}

export function* watchLogin() {
  yield takeLatest(types.LOGIN, login);
}

export function* fetchUserInfo(action) {
  try {
    const data = yield call(loginApis.fetchUserInfo);
    action.onSuccess(data.data);
    yield put(setUserInfo(data.data));
  } catch (error) {
    action.onError(error);
  }
}
export function* fetchAllMealData(action) {
  console.log('LLSLSLSLLSLLSLLSLS22222', 'Called2');
  try {
    const data = yield call(loginApis.fetchAllProducts);
    console.log('SLSLSLLSLDATATATATATTA', data);
    action.onSuccess(data.data);
    yield put(setAllMealData(data.data));
  } catch (error) {
    console.log('SLSLSLLSLDATATATATATTA', error);
    action.onError(error);
  }
}

export function* fetchMealDetails(action) {
  try {
    const data = yield call(loginApis.fetchMealDetails);
    action.onSuccess(data.data);
    yield put(setMealDetails(data.data));
  } catch (error) {
    action.onError(error);
  }
}

export function* fetchStoreData(action) {
  try {
    const data = yield call(loginApis.fetchStoreData);
    action.onSuccess(data.data);
    yield put(setStoreData(data.data));
  } catch (error) {
    action.onError(error);
  }
}

export function* fetchStoreInfoData(action) {
  try {
    const data = yield call(loginApis.fetchStoreInfoData);
    action.onSuccess(data.data);
    yield put(setStoreInfoData(data.data));
  } catch (error) {
    action.onError(error);
  }
}
export function* fetchProductList(action) {
  try {
    const data = yield call(loginApis.fetchProductList);
    action.onSuccess(data.data);
    yield put(setProductList(data.data));
  } catch (error) {
    action.onError(error);
  }
}

export function* watchFetchUserInfo() {
  yield takeLatest(types.FETCH_USER_INFO, fetchUserInfo);
}
export function* watchAllMealData() {
  yield takeLatest(types.FETCH_ALL_MEAL_DATA, fetchAllMealData);
}

export function* watchMealDetails() {
  yield takeLatest(types.FETCH_MEAL_DETAILS, fetchMealDetails);
}

export function* watchFetchStoreData() {
  yield takeLatest(types.FETCH_STORE_DATA, fetchStoreData);
}
export function* watchFetchStoreInfoData() {
  yield takeLatest(types.FETCH_INFO_STORE_DATA, fetchStoreInfoData);
}

export function* watchFetchProductList() {
  yield takeLatest(types.FETCH_PRODUCT_LIST, fetchProductList);
}
