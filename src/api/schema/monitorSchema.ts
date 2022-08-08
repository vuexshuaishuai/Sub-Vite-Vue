/* 监控页列表接口定义: 请求 */
export interface VehicleListRequest {
    pageNo: number;
    pageSize: number;
}
/* 监控页列表接口定义: 返回值 */
export interface VehicleListItem {
    //管车id
    id: string;
    //中台vid
    ztVid: string;
    //车牌号
    vehicleNo: string;
    //车牌颜色
    vehiclePlateColor: string;
    //车辆类型
    type: number;
    //到期时间
    expirationTime?: number;
    //是否到期
    timeout?: boolean;
    //速度
    gpsSpeed?: number;
    //坐标
    lon?: number;
    lat?: number;
    groupCreateTime?: number;
    //所属分组id
    groupId?: string;
    //所属分组名称
    groupName?: string;
    mileage?: number;
    nowAreaCode?: string;
    head?: number;
    height?: number;
    abnormal: string;
    commAddr: string;
    createTime: number;
    isAuth: number;
    isPcSelect: number;
    isTemp: number;
    serverTime: number;
    poiError?: string;
    systemTime?: number;
    trackLevel?: string;
    utc?: number;
}