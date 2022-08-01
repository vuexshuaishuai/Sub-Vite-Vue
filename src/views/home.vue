<template>
    <div class="home">
        <div id="mapContainer"></div>
    </div>
</template>

<script lang="ts" setup>
    import { ref, onMounted } from "vue";
    onMounted(() => {
        new AMap.Map("mapContainer", {
            
        })
    })

</script>

<style lang="scss" scoped>
.home{
    width: 100%;
    height: 100%;
}
/* 地图容器 */
#mapContainer{
    width: 100%;
    height: 100%;
}
</style>