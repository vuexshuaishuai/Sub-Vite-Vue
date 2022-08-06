/* 登录接口定义: 请求 */
export interface LoginRequest {
    ticket: string;
    userId: string;
}
/* 登录接口定义: 返回值 */
export interface LoginResponse {
    companyId: string;
    mobile: string;
    roleList: Array<LoginRole>;
    status: string;
    token: string;
    uid: string;
}

/* 登录接口定义: 返回值(角色信息接口定义) */
export interface LoginRole {
    authStatus?: number;
    companyAuthStatus?: number;
    companyId: string;
    companyName: string;
    companyOwnerUid: string;
    createTime: number;
    id: number;
    isConsume?: number;
    isIndividual?: number;
    mobile: string;
    roleId: string;
    roleName: string;
    uid: string;
    userAuthStatus?: number;
    userName: string;
    userType?: number;
}
