import axios from "axios";

const axiosInstance = axios.create({
    baseURL: 'http://47.128.166.252:8080',
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ${bearerToken}',
        'Access-Control-Allow-Origin': 'http://localhost:3000',
    }
});

export default axiosInstance;