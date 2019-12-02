import { api } from './api';

export const login = (params) => {
    return api.post('/login', params);
}
export const loginApiCall = (params) => {
    return api.post('/login', params);
}
export const getUserApiCall = (params) => {
    return api.post('/getUser', params);
}
export const userPunchApiCall = (params) => {
    return api.post('/makepunch', params);
}
export const changePasswordApiCall = (params) => {
    return api.post('/changepassword', params);
}
export const fetchStoreData = () => {
    // return api.get('/?i=onions,garlic&q=omelet&p=3');
    return api.get('/get-all-stores');
}

export const fetchStoreInfoData = () => {
    // return api.get('/?i=onions,garlic&q=omelet&p=3');
    return api.get('/get-store?storeId=5b6e089682573a594a1797a0');
}
export const fetchProductList = () => {
    // return api.get('/?i=onions,garlic&q=omelet&p=3');
    return api.get('/get-store-products?storeId=5b6e089682573a594a1797a0');
}
export const fetchAllMealData = () => {
    return api.get('/1/categories.php');
}
export const fetchMealDetails = (params) => {
    return api.get('/1/lookup.php?i=52772');
}

export const fetchUserInfo = () => {
    return api.get('/getUserInfo');
}