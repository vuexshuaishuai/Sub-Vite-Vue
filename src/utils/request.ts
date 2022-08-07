import axios, { AxiosResponse, AxiosError, AxiosRequestConfig  } from "axios";
import { ElMessage } from "element-plus";
import { getToken } from "@/utils/subCookie";

/* 封装: 消息提示 */
const message = (mesg: string, type?: 'success' | 'error' | 'warning' | 'info') => {
    ElMessage({
        message: mesg,
        type: type || 'error',
        duration: 1500, 
    })
}

/* axios 默认配置 */
const defaultConfig: AxiosRequestConfig = {
    //默认接口前缀
    baseURL: "/exchange-pc",
    //请求超时时间: 15秒
    timeout: 15000,
    //请求头
    headers: {
        "Content-Type": "application/json",
        "token": getToken()
    }
}

/* 定义axios实例 */
const request = axios.create(defaultConfig);

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
    (response: AxiosResponse) => {
        return response.data;
    },
    (error: AxiosError) => {
        return Promise.reject(error);
    }
);

export default request;