import axios from "axios";

const request = axios.create({
    //基础路径
    baseURL: "/api",
    //请求超时时间
    timeout: 15000,
    //请求头: 默认 JSON(form) 传参
    headers: {
        "Content-Type": "application/x-www-form-urlencoded"
    }
});

/* 请求拦截器 */
request.interceptors.request.use(
    config => {
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

/* 响应拦截器 */
request.interceptors.response.use(
    response => {
        return response.data;
    },
    error => {
        return Promise.reject(error);
    }
);

export default request;