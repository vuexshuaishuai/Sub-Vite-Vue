import Cookies from "js-cookie";

export const TOKEN_KEY = "TOKEN";

/* 设置Token */
export const setToken = (token: string, cookieExpire?: any) => {
    Cookies.set(TOKEN_KEY, token, { expires: cookieExpire || 30 });
}

/* 获取Token */
export const getToken = () => {
    const token = Cookies.get(TOKEN_KEY);
    if(token) return token
    else return false;
}

/* 删除Token */
export const delToken = () => {
    Cookies.remove(TOKEN_KEY);
}
