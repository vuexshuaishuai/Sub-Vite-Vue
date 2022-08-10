/* 监控页列表接口定义: 请求 */
export interface VehicleListRequest {
    pageNo: number;
    pageSize: number;
}
/* 监控页列表接口定义: 返回值 */
export interface TruckItem {
    //管车id
    id: string;
    //中台vid
    ztVid: string;
    //车牌号
    vehicleNo: string;
    //车牌颜色
    vehiclePlateColor: string;
    //车辆类型: 5模糊车
    type: number;
    //到期时间
    expirationTime?: number;
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
    //车机是否正常: 0车机正常 1车机异常
    abnormal: string;
    commAddr: string;
    createTime: number;
    isAuth: number;
    //是否是PC可查的车: 0不可查(按过期处理) 1可查
    isPcSelect: number;
    isTemp: number;
    serverTime: number;
    poiError?: string;
    systemTime?: number;
    trackLevel?: string;
    utc?: number;

    //自定义字段: 车辆状态
    status?: VehicleStatus;
    //自定义字段: 车辆坐标
    cLat?: number;
    cLon?: number;
    //自定义字段: 车辆坐标(数组)
    lnglat?: Array<number>, 
    //自定义字段: 车辆是否到期
    timeout?: boolean;
    community?: string;
    city?: string;
    district?: string;
    area?: string;
}

//车辆状态
export enum VehicleStatus {
    Run = "RUN",
    Stop = "STOP",
    Offline = "OFFLINE"
}