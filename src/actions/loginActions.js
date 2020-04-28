import {
  SET_SELECTED_DRAWER_ROW,
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
  FETCH_MEAL_DETAILS,
  SET_MEAL_DETAILS,
  ADD_ITEMS_TO_CART,
  SET_ITEMS_TO_CART,
  REMOVE_ITEMS_TO_CART,
  GET_USER_API_CALL,
  USER_PUNCH_API_CALL,
  CHANGE_PASSWORD_API_CALL,
  SET_USER_PUNCH,
  OTP_VERIFY_API_CALL, UPDATE_USER_DETAILS_API_CALL,
} from './types';
export const login = (params, onSuccess, onError) => ({
  type: LOGIN_API_CALL,
  params,
  onSuccess,
  onError,
});

export const otpVerify = (params, onSuccess, onError) => ({
  type: OTP_VERIFY_API_CALL,
  params,
  onSuccess,
  onError,
});
export const updateUserDetails = (params, onSuccess, onError) => ({
  type: UPDATE_USER_DETAILS_API_CALL,
  params,
  onSuccess,
  onError,
});

export const userProfile = (params, onSuccess, onError) => ({
  type: GET_USER_API_CALL,
  params,
  onSuccess,
  onError,
});

export const userPunch = (params, onSuccess, onError) => ({
  type: USER_PUNCH_API_CALL,
  params,
  onSuccess,
  onError,
});

export const changePassword = (params, onSuccess, onError) => ({
  type: CHANGE_PASSWORD_API_CALL,
  params,
  onSuccess,
  onError,
});

export const setUserInfo = data => ({
  type: SET_USER_INFO,
  data,
});

export const setUserPunch = data => ({
  type: SET_USER_PUNCH,
  data,
});

export const setSelectedDrawerRow = data => ({
  type: SET_SELECTED_DRAWER_ROW,
  data,
});


export const setStoreData = data => ({
  type: SET_STORE_DATA,
  data,
});
export const setStoreInfoData = data => ({
  type: SET_INFO_STORE_DATA,
  data,
});

export const setProductList = data => ({
  type: SET_PRODUCT_LIST,
  data,
});
export const fetchUserInfo = (onSuccess, onError) => ({
  type: FETCH_USER_INFO,
  onSuccess,
  onError,
});

export const fetchStoreData = (onSuccess, onError) => ({
  type: FETCH_STORE_DATA,
  onSuccess,
  onError,
});

export const fetchStoreInfoData = (onSuccess, onError) => ({
  type: FETCH_INFO_STORE_DATA,
  onSuccess,
  onError,
});
export const fetchProductList = (onSuccess, onError) => ({
  type: FETCH_PRODUCT_LIST,
  onSuccess,
  onError,
});

export const fetchAllMealData = (onSuccess, onError) => ({
  type: FETCH_ALL_MEAL_DATA,
  onSuccess,
  onError,
});
export const setAllMealData = data => ({
  type: SET_ALL_MEAL_DATA,
  data,
});

export const fetchMealDetails = (params, onSuccess, onError) => ({
  type: FETCH_MEAL_DETAILS,
  params,
  onSuccess,
  onError,
});

export const addItemToCart = (params, onSuccess, onError) => ({
  type: ADD_ITEMS_TO_CART,
  params,
  onSuccess,
  onError,
});
export const setAddItemToCart = data => ({
  type: SET_ITEMS_TO_CART,
  data,
});
export const setRemoveItemToCart = data => ({
  type: REMOVE_ITEMS_TO_CART,
  data,
});

export const setMealDetails = data => ({
  type: SET_MEAL_DETAILS,
  data,
});
