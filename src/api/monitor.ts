import request from "@/utils/request";
import { Rows } from "@/api/schema/indexSchema";
import { VehicleListRequest, VehicleListItem } from "@/api/schema/monitorSchema";

/* 获取全部车辆数据: 监控列表 */
export function getVehicleList(params: VehicleListRequest): Promise<Rows<VehicleListItem>>{
    return request.post("/vehicle/dynamic/list", params)
}