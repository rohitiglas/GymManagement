import {
    SET_SELECTED_DRAWER_ROW,
    LOGIN_API_CALL,
    SET_USER_INFO,
    GET_USER_API_CALL,
    USER_PUNCH_API_CALL, CHANGE_PASSWORD_API_CALL, SET_USER_PUNCH, SET_LOGIN_TOKEN
} from './types';
export const login = (params, onSuccess, onError) => ({
    type: LOGIN_API_CALL,
    params,
    onSuccess,
    onError
})

export const userProfile = (params, onSuccess, onError) => ({
    type: GET_USER_API_CALL,
    params,
    onSuccess,
    onError
})

export const userPunch = (params, onSuccess, onError) => ({
    type: USER_PUNCH_API_CALL,
    params,
    onSuccess,
    onError
})

export const changePassword = (params, onSuccess, onError) => ({
    type: CHANGE_PASSWORD_API_CALL,
    params,
    onSuccess,
    onError
})

export const setUserInfo = (data) => ({
    type: SET_USER_INFO,
    data,
})

export const setUserPunch = (data) => ({
    type: SET_USER_PUNCH,
    data,
})

export const setLoginToken = (data) => ({
    type: SET_LOGIN_TOKEN,
    data,
})

export const setSelectedDrawerRow = (data) => ({
    type: SET_SELECTED_DRAWER_ROW,
    data,
})













