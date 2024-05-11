import axios from "axios";

const axiosInstance = axios.create({
    baseURL: 'https://mycostumes.ddns.net',
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': 'http://localhost:3000',
    }
});

function setAuthHeader(token) {
    axiosInstance.interceptors.request.use(
        config => {
            // Kiểm tra nếu có token, thêm header Authorization vào request
            if (token) {
                config.headers['Authorization'] = `Bearer ${token}`;
            }
            return config;
        },
        error => {
            return Promise.reject(error);
        }
    );
}

export default axiosInstance;

export function setBearerToken(token) {
    setAuthHeader(token)
}