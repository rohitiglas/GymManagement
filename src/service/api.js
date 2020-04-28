import axios from 'axios';
import {getToken, getGroceryToken} from '../utils/storage';
import {BASE_API_URL, GROCERY_BASE_API_URL} from './config';

export const api = axios.create({
  baseURL: BASE_API_URL,
  timeout: 6000,
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
  },
});

export const groceryApi = axios.create({
  baseURL: GROCERY_BASE_API_URL,
  timeout: 6000,
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
  },
});

export function setToken(token) {
  api.defaults.headers.common.Authorization = `Bearer ${token}`;
}
export function setGroceryToken(token) {
  groceryApi.defaults.headers.common.Authorization = `Bearer ${token}`;
}

getToken().then(token => {
  setToken(token);
});
getGroceryToken().then(token => {
  setGroceryToken(token);
});
