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
    import { getVehicleList } from "@/api/monitor"
    import { VehicleListItem } from "@/api/schema/monitorSchema";
    //左侧列表
    import LeftVehicleScrollVue from "@/views/monitor/LeftVehicleScroll.vue";

    //数据: 车辆列表
    const vehicleList = ref<Array<VehicleListItem>>([]);
    //状态值: 数据是否请求完成
    // const status

    /* 初始化: 获取车辆列表 */
    const initVehicleList = () => {
        getVehicleList({
            pageNo: 1,
            pageSize: 1999
        }).then(res => {
            if(res.code === 0){
                console.log(res);
                vehicleList.value = res.data;
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
        map.on("complete", () => {
            console.log("地图加载完成");
        })
    }
    onMounted(() => {
        //初始化地图
        initMap();
        //初始化列表
        initVehicleList();
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