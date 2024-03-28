import axios from "axios";

let bearerToken;

const axiosInstance = axios.create({
    baseURL: 'http://47.128.166.252:8080',
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': 'http://localhost:3000',
    }
});


axiosInstance.interceptors.request.use(
    config => {
        // Kiểm tra xem bearerToken đã được đặt hay chưa
        if (bearerToken) {
            config.headers['Authorization'] = `Bearer ${bearerToken}`;
            console.log("headers : " + bearerToken);
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

export default axiosInstance;

export function setBearerToken(token) {
    bearerToken = token;
}