import request from "@/utils/request";
import { Rows } from "@/api/schema/indexSchema";
import { VehicleListRequest, TruckItem } from "@/api/schema/monitorSchema";

/* 获取全部车辆数据: 监控列表 */
export function getVehicleList(params: VehicleListRequest): Promise<Rows<TruckItem>>{
    return request.post("/vehicle/dynamic/list", params)
}