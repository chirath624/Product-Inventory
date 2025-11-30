import axios from 'axios';

const axiosService = axios.create({
    baseURL: 'https://dummyjson.com',
    timeout: 10000
});

axiosService.interceptors.response.use(
    (response) => response,
    (error) => {
        const message =
            error?.response?.data?.message || error.message || 'Unknown error';
        return Promise.reject(new Error(message));
    }
);

export default axiosService;

