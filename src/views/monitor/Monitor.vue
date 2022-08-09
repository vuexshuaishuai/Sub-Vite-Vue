<template>
    <div class="home-monitor">
        <!-- 容器: 地图 -->
        <div id="mapContainer"></div>
        <!-- 容器: 左侧滚动列表 -->
        <div class="vehicle-scroll">
            <LeftVehicleScrollVue :vehicleList="vehicleList"></LeftVehicleScrollVue>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { ref, onMounted, reactive, nextTick } from "vue";
    import { getVehicleList } from "@/api/monitor";
    import { TruckItem, VehicleStatus } from "@/api/schema/monitorSchema";
    import maputil from "@/plugins/mapChange.js";
    //左侧列表
    import LeftVehicleScrollVue from "@/views/monitor/LeftVehicleScroll.vue";

    //数据: 车辆列表
    const vehicleList = ref<Array<TruckItem>>([]);
    //数据: 地图
    const mapContainer = ref<AMap.Map>();
    //数据: 地图上的车辆点
    const mapVehicleMarkers: Array<AMap.Marker> = reactive([]);

    //静态数据接口定义: 车辆点的icon图片
    interface MarkerIcons {
        RUN: string;
        STOP: string;
        OFFLINE: string;
    }
    //静态数据: 车辆点的icon图片
    const markerIcons: MarkerIcons = reactive({
        RUN: "/src/assets/monitor/icon_run.png",
        STOP: "/src/assets/monitor/icon_stop.png",
        OFFLINE: "/src/assets/monitor/icon_offline.png",
    })

    //数据解析: 车辆状态值
    const doSeekStatus = (truckItem: TruckItem): VehicleStatus => {
        //状态一: 离线
        if(truckItem.abnormal == "1"){
            return VehicleStatus.Offline;
        }else{
            //状态二: 停驶
            if(truckItem.gpsSpeed == 0) return VehicleStatus.Stop;

            //状态三: 行驶
            if(truckItem.gpsSpeed != 0) return VehicleStatus.Run;
        }
        //最终: 如果上面逻辑都没有走, 那么按照离线处理这辆车的状态
        return VehicleStatus.Offline;
    }

    /* 初始化: 获取车辆列表 */
    const initVehicleList = () => {
        getVehicleList({
            pageNo: 1,
            pageSize: 19999
        }).then(res => {
            if(res.code === 0){
                console.log(res);
                vehicleList.value = res.data;
                let vehicleContainer: Array<TruckItem> = res.data;
                vehicleContainer.forEach((item, key) => {
                    //解析: 车辆是否到期
                    item.timeout = new Date().getTime() > (item.expirationTime || 0);
                    //解析: 车辆当前状态
                    item.status = doSeekStatus(item);
                    //解析: 车辆速度(如果有速度就 ÷10 保留1位)
                    item.gpsSpeed = item.gpsSpeed ? (item.gpsSpeed / 10).toFixed(0) : item.gpsSpeed;
                    // if(item.vehicleNo == "鄂ACK166") item.status = VehicleStatus.Run;
                    //检验: 地图车辆点展示的条件 (1)未到期 (2)属于PC可查车 (3)含有坐标
                    if(!item.timeout && item.isPcSelect != 0 && item.lon && item.lat){
                        //解析: 坐标转换
                        let tmpPos = maputil.convert.wgs84ToGcj(
                            item.lon / 600000,
                            item.lat / 600000
                        );
                        item.cLon = tmpPos[0];
                        item.cLat = tmpPos[1];
                        console.log(tmpPos);
                        //(1)绘制车牌号
                        let vehicleContent: string = "";
                        //行驶中: 展示
                        if(item.status == VehicleStatus.Run){
                            vehicleContent = `<div class="monitor-vehicle-run">
                                                <p class="run-vehicle">${item.vehicleNo}</p>
                                                <p class="run-speed">车速${item.gpsSpeed}km/h</p>
                                                <div class="monitor-vehicle-triangle"></div>
                                              </div>`
                        }
                        //停车|异常: 展示
                        else{
                            vehicleContent = `
                                <div class='monitor-vehicle ${item.status == VehicleStatus.Offline ? 'monitor-vehicle-offline' : ''}'>${item.vehicleNo}<div class="monitor-vehicle-triangle"></div></div>
                            `;
                        }
                        //(2)绘制车辆点
                        let vehicleMarker = new AMap.Marker({
                            //所属地图实例
                            map: mapContainer.value,
                            //车辆图标
                            icon: markerIcons[item.status],
                            //坐标位置
                            position: new AMap.LngLat(item.cLon!, item.cLat!),
                            //偏移量: 
                            offset: new AMap.Pixel(-18, -20),
                            //鼠标hover样式
                            cursor: "pointer",
                            // visible:true,
                        })
                        //(3)将绘制好的车牌号放在车辆点上方
                        vehicleMarker.setLabel({
                            //行驶的车牌号比较特殊需要增加偏移量
                            offset: item.status == VehicleStatus.Run ? new AMap.Pixel(-2, -5) : new AMap.Pixel(-2, -5),
                            content: vehicleContent,
                            direction: 'top'
                        });
                        mapVehicleMarkers.push(vehicleMarker);
                    }
                })
                let a = vehicleContainer.filter((item, key) => !item.timeout);
                console.log(a);
            }
        })
    }
    /* 初始化: 地图 */
    const initMap = () => {
        let map = new AMap.Map("mapContainer", {
            //是否监控地图容器尺寸变化
            resizeEnable: true,
            //初始化地图层级
            zoom: 5, 
            //初始化地图中心点
            center: [116.397428, 39.90923], 
        });
        console.log(map)
        mapContainer.value = map;
        map.on("complete", () => {
            console.log("地图加载完成");
            initVehicleList();
            let marker = new AMap.Marker({
                icon: "//a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-default.png",
                position: [116.406315, 39.908775],
                offset: new AMap.Pixel(-13, -30)
            });
            // marker.setMap(map)
        })
    }
    /* 封装: 地图绘制Marker点 */
    const subCreateMarker = () => {

    }


    onMounted(() => {
        nextTick(() => {
            //初始化地图
            initMap();
            
        })
    })
</script>

<style lang="scss" scoped>
.home-monitor{
    width: 100%;
    height: 100%;
    position: relative;
}
/* 地图容器 */
#mapContainer{
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    /* 地图: 车辆点上方的车牌号默认样式清除 */
    :deep(.amap-marker-label){
        border: none;
        padding: 0;
        border-radius: 4px;
        // left: -25px !important;
        // top: -30px !important;
    }
    /* 地图: 车辆点上方的车牌号内容(停驶、异常) */
    :deep(.monitor-vehicle){
        padding: 6px 10px;
        color: white;
        background: #4C85F8;
        border-radius: 4px;
        font-size: 14px;
        box-shadow: 0px 0px 4px 1px rgba(0,0,0,0.5000);
        position: relative;
    }
    /* 地图: 车辆点上方的车牌号内容(行驶) */
    :deep(.monitor-vehicle-run){
        position: relative;
        box-shadow: 0px 0px 4px 1px rgba(0,0,0,0.5000);
        border-radius: 4px;
        //车牌
        .run-vehicle{
            padding: 4px 10px;
            color: white;
            background: #319E57;
            font-size: 14px;
            margin: 0 auto;
            text-align: center;
        }
        //车速
        .run-speed{
            width: 100%;
            padding: 5px;
            text-align: center;
            font-size: 13px;
            color: #319E57;
        }
        //三角
        .monitor-vehicle-triangle{
            border-color: white transparent transparent;
        }
    }
    /* 地图: 车辆点的三角 */
    :deep(.monitor-vehicle-triangle){
        position: absolute;
        content: '';
        width: 0;
        height: 0;
        border-width: 8px 6px;
        border-style: solid;
        border-color: #4C85F8 transparent transparent;
        bottom: -16px;
        left: 50%;
        margin-left: -4px;
    }
    :deep(.monitor-vehicle-offline){
        background: #666666;
    }
    :deep(.monitor-vehicle-offline .monitor-vehicle-triangle){
        border-color: #666666 transparent transparent !important;
    }
}
/* 容器: 左侧滚动列表 */
.vehicle-scroll{
    position: absolute;
    left: 20px;
    top: 20px;
    height: calc(100% - 100px);
    width: 310px;
    background: white;
    box-shadow: 0 2px 13px 0px rgba(0,0,0,0.2);
    overflow: hidden;
}

</style>