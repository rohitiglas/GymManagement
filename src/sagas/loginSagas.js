import { put, call, fork, takeLatest } from 'redux-saga/effects';
import {Alert} from 'react-native';
import * as types from '../actions/types';
import * as loginApis from '.././service/loginApis';
import {

    setUserInfo,
    setUserPunch, setSelectedDrawerRow, setLoginToken
} from '../actions/loginActions';
import { setToken } from '.././service/api';




export function* loginApiCall(action) {

    try {
        const data = yield call(loginApis.loginApiCall, action.params);



        if(data.data.error)
        {
            Alert.alert('',data.data.message)
        }
        else
        {
            setToken(data.data.data.token || '');
            yield put(setLoginToken(data.data.data.token || ''))
        }
        action.onSuccess(data.data);




    } catch (error) {

        action.onError(error)
    }
}

export function* getUserApiCall(action) {
    try {
        const data = yield call(loginApis.getUserApiCall, action.params);


        yield put(setUserInfo(data.data.data))
        action.onSuccess(data.data);

    } catch (error) {

        action.onError(error)
    }
}

export function* userPunchApiCall(action) {
    try {
        const data = yield call(loginApis.userPunchApiCall, action.params)

        yield put(setUserPunch(data.data.data))
        action.onSuccess(data.data);


    } catch (error) {


        action.onError(error)
    }
}

export function* changePasswordApiCall(action) {
    try {
        const data = yield call(loginApis.changePasswordApiCall, action.params);
        if(data.data.error)
        {
            Alert.alert('',data.data.message)
        }
        else
        {
            Alert.alert('',data.data.message)
            yield  put(setSelectedDrawerRow("Home"))

        }

        action.onSuccess(data.data);
        // yield put(setUserInfo(data.data))



    } catch (error) {


        action.onError(error)
    }
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








export function* watchLoginApiCall() {
    yield takeLatest(types.LOGIN_API_CALL, loginApiCall)
}

export function* watchGetUserApiCall() {

    yield takeLatest(types.GET_USER_API_CALL, getUserApiCall)
}

export function* watchUserPunchApiCall() {

    yield takeLatest(types.USER_PUNCH_API_CALL, userPunchApiCall)
}

export function* watchChangePasswordApiCall() {

    yield takeLatest(types.CHANGE_PASSWORD_API_CALL, changePasswordApiCall)
}

export function* watchFetchUserInfo() {
    yield takeLatest(types.FETCH_USER_INFO, fetchUserInfo)
}

