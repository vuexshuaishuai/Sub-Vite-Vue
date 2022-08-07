<template>
    <div class="home-monitor">
        <div id="mapContainer"></div>
    </div>
</template>

<script setup lang="ts">
    import { ref, onMounted } from "vue";
    import { getVehicleList } from "@/api/monitor"

    /* 获取左侧车辆列表 */
    const initVehicleList = () => {
        getVehicleList({
            pageNo: 1,
            pageSize: 1999
        }).then(res => {
            if(res.code === 0){
                console.log(res);
            }
        })
    }
    
    onMounted(() => {
        new AMap.Map("mapContainer", {
            
        });
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
</style>