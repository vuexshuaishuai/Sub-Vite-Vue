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
    import { ref, onMounted, reactive } from "vue";
    import { getVehicleList } from "@/api/monitor";
    import { VehicleListItem } from "@/api/schema/monitorSchema";
    import maputil from "@/plugins/mapChange";
    //左侧列表
    import LeftVehicleScrollVue from "@/views/monitor/LeftVehicleScroll.vue";

    //数据: 车辆列表
    const vehicleList = ref<Array<VehicleListItem>>([]);
    //数据: 地图
    const mapContainer = ref(null);

    /* 初始化: 获取车辆列表 */
    const initVehicleList = () => {
        getVehicleList({
            pageNo: 1,
            pageSize: 999999
        }).then(res => {
            if(res.code === 0){
                console.log(res);
                vehicleList.value = res.data;
                let vehicleContainer: Array<VehicleListItem> = res.data;
                vehicleContainer.forEach((item, key) => {
                    //解析: 车辆是否到期
                    item.timeout = new Date().getTime() > item.expirationTime;
                    //如果该车辆未到期 & 含有坐标点
                    if(!item.timeout && item.lon && item.lat){
                        //解析: 坐标转换
                        let tmpPos = maputil.convert.wgs84ToGcj(
                            item.lon / 600000,
                            item.lat / 600000
                        );
                        item.cLat = tmpPos[0];
                        item.cLon = tmpPos[1];
                        // let icon = new AMap.Icon({
                        //     // size: new AMap.Size()
                        //     image: '/src/assets/monitor/icon_run.png',
                        //     image: '//vdata.amap.com/icons/b18/1/2.png'
                        // })
                        let vehicleMarker = new AMap.Marker({
                            position: new AMap.LngLat(item.cLon, item.cLat),
                            // position: [116.406315, 39.908775],
                            icon: '//a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-default.png',
                            offset: new AMap.Pixel(0, 0),
                            // cursor: "pointer",
                            // anchor: "center",
                        })
                        vehicleMarker.setMap(mapContainer.value);
                        // console.log(mapContainer.value);
                        // mapContainer.value.add(vehicleMarker);
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
        //初始化地图
        initMap();
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