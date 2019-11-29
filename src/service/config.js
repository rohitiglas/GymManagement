const env = {
    dev: 'dev', test: 'test', stg: 'stg',    product: 'product', local: 'local',
};
const API_URL = {
    local: '',
    dev: '',
    test: '',
    stg: '',
    product: '',
};
const currentEnv = env.product;



// export const BASE_API_URL = 'https://www.themealdb.com/api/json/v1';
export const BASE_API_URL = 'http://139.162.218.18:6010/api/v1/client';
export const USER_TOKEN = 'USER_TOKEN';
