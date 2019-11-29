import { put, call, fork, takeLatest } from 'redux-saga/effects';
import * as types from '../actions/types';
import * as loginApis from '.././service/loginApis';
import {
    setStoreData,
    setUserInfo,
    setStoreInfoData,
    setProductList,
    setAllMealData,
    setMealDetails
} from '../actions/loginActions';
import { setToken } from '.././service/api';

export function* login(action) {
    try {
        const data = yield call(loginApis.login, action.params)
        action.onSuccess(data.data)
        setToken(data.data.token || '');
        yield put(setUserInfo(data.data.user))
    } catch (error) {
        action.onError(error)
    }
}

export function* loginApiCall(action) {
    console.log("SLSLSLLSLSLSLLSLSLLSLSbsbbsbs",action)
    try {
        const data = yield call(loginApis.loginApiCall, action.params)
        console.log("SLSLSLLSLSLSLLSLSLLSLSRESPONSE",data)

    } catch (error) {
        console.log("SLSLSLLSLSLSLLSLSLLSLSERROR",error)
        action.onError(error)
    }
}

export function* watchLoginApiCall() {
    yield takeLatest(types.LOGIN_API_CALL, loginApiCall)
}


export function* watchLogin() {
    yield takeLatest(types.LOGIN, login)
}

export function* fetchUserInfo(action) {
    try {
        const data = yield call(loginApis.fetchUserInfo)
        action.onSuccess(data.data)
        yield put(setUserInfo(data.data))
    } catch (error) {
        action.onError(error)
    }
}
export function* fetchAllMealData(action) {
    try {

        const data = yield call(loginApis.fetchAllMealData)

        action.onSuccess(data.data)

        yield put(setAllMealData(data.data))
    } catch (error) {

        action.onError(error)
    }
}

export function* fetchMealDetails(action) {
    try {
        const data = yield call(loginApis.fetchMealDetails)
        action.onSuccess(data.data)
        yield put(setMealDetails(data.data))
    } catch (error) {
        action.onError(error)
    }
}

export function* fetchStoreData(action) {
    try {
        const data = yield call(loginApis.fetchStoreData)
        action.onSuccess(data.data)
        yield put(setStoreData(data.data))
    } catch (error) {
        action.onError(error)
    }
}


export function* fetchStoreInfoData(action) {
    try {
        const data = yield call(loginApis.fetchStoreInfoData)
        action.onSuccess(data.data)
        yield put(setStoreInfoData(data.data))
    } catch (error) {
        action.onError(error)
    }
}
export function* fetchProductList(action) {
    try {
        const data = yield call(loginApis.fetchProductList)
        action.onSuccess(data.data)
        yield put(setProductList(data.data))
    } catch (error) {
        action.onError(error)
    }
}

export function* watchFetchUserInfo() {
    yield takeLatest(types.FETCH_USER_INFO, fetchUserInfo)
}
export function* watchAllMealData() {
    yield takeLatest(types.FETCH_ALL_MEAL_DATA, fetchAllMealData)
}

export function* watchMealDetails() {
    yield takeLatest(types.FETCH_MEAL_DETAILS, fetchMealDetails)
}

export function* watchFetchStoreData() {
    yield takeLatest(types.FETCH_STORE_DATA, fetchStoreData)
}
export function* watchFetchStoreInfoData() {
    yield takeLatest(types.FETCH_INFO_STORE_DATA, fetchStoreInfoData)
}

export function* watchFetchProductList() {
    yield takeLatest(types.FETCH_PRODUCT_LIST, fetchProductList)
}
