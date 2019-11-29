import {
    LOGIN_API_CALL,
    LOGIN,
    SET_USER_INFO,
    FETCH_USER_INFO,
    FETCH_STORE_DATA,
    SET_STORE_DATA,
    FETCH_INFO_STORE_DATA,
    SET_INFO_STORE_DATA,
    FETCH_PRODUCT_LIST,
    SET_PRODUCT_LIST,
    FETCH_ALL_MEAL_DATA,
    SET_ALL_MEAL_DATA,
    FETCH_MEAL_DETAILS, SET_MEAL_DETAILS, ADD_ITEMS_TO_CART, SET_ITEMS_TO_CART, REMOVE_ITEMS_TO_CART
} from './types';
export const login = (params, onSuccess, onError) => ({
    type: LOGIN_API_CALL,
    params,
    onSuccess,
    onError
})
export const loginApiCall = (params) => ({
    type: LOGIN_API_CALL,
    params,
})
export const setUserInfo = (data) => ({
    type: SET_USER_INFO,
    data,
})

export const setStoreData = (data) => ({
    type: SET_STORE_DATA,
    data,
})
export const setStoreInfoData = (data) => ({
    type: SET_INFO_STORE_DATA,
    data,
})

export const setProductList = (data) => ({
    type: SET_PRODUCT_LIST,
    data,
})
export const fetchUserInfo = (onSuccess, onError) => ({
    type: FETCH_USER_INFO,
    onSuccess,
    onError
})

export const fetchStoreData = (onSuccess, onError) => ({
    type: FETCH_STORE_DATA,
    onSuccess,
    onError
})

export const fetchStoreInfoData = (onSuccess, onError) => ({
    type: FETCH_INFO_STORE_DATA,
    onSuccess,
    onError
})
export const fetchProductList = (onSuccess, onError) => ({
    type: FETCH_PRODUCT_LIST,
    onSuccess,
    onError
})

export const fetchAllMealData = (onSuccess, onError,) => ({
    type: FETCH_ALL_MEAL_DATA,
    onSuccess,
    onError
})
export const setAllMealData = (data) => ({
    type: SET_ALL_MEAL_DATA,
    data,
})

export const fetchMealDetails = (params,onSuccess, onError,) => ({
    type: FETCH_MEAL_DETAILS,
    params,
    onSuccess,
    onError
});

export const addItemToCart = (params,onSuccess, onError,) => ({
    type: ADD_ITEMS_TO_CART,
    params,
    onSuccess,
    onError
})
export const setAddItemToCart= (data) => ({
    type: SET_ITEMS_TO_CART,
    data,
})
export const setRemoveItemToCart= (data) => ({
    type: REMOVE_ITEMS_TO_CART,
    data,
})


export const setMealDetails= (data) => ({
    type: SET_MEAL_DETAILS,
    data,
})