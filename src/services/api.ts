import axios from "axios";

export default () => {
    const api = axios.create({
        baseURL: import.meta.env.VITE_API_URL
    });

    api.interceptors.request.use(
        async config => {
            let token = localStorage.getItem('token');
            config.headers['Authorization'] = 'Bearer ' + token;
            return config;
        },
        error => {
            return Promise.reject(error);
        }
    );

    // Response interceptor for API calls
    // api.interceptors.response.use(
    //     (response) => {
    //         return response;
    //     },
    //     async function (error) {
    //         const originalRequest = error.config;
    //         if (error.response.status === 401) {
    //             window.location.href = '/auth/login';
    //             return;
    //         }
    //         return {
    //             status: error.response.status,
    //             error: !error.response.data.error
    //             ? error.response.data.msg
    //             :  error.response.data.error,
    //         };
    //     }
    // );

    return api;
};