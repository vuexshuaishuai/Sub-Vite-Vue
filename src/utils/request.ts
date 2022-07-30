import axios from "axios";

const services = axios.create({
    //基础路径
    baseURL: "/api",
    //请求超时时间
    timeout: 15000
});

/* 请求拦截器 */
services.interceptors.request.use(
    config => {
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

/* 响应拦截器 */
services.interceptors.response.use(
    response => {
        return response.data;
    },
    error => {
        return Promise.reject(error);
    }
);

export default services;