<!-- 监控首页左侧车辆列表 -->
<template>
    <div class="vehicle-component">
        <!-- 顶部搜索 -->
        <div class="vehicle-search">
            <!-- 搜索输入框 -->
            <el-input v-model="inputSearchContent" placeholder="加车、查车请输入车牌号或别名"></el-input>
            <!-- 搜索按钮 -->
            <div class="search-button">
                <el-icon><Search /></el-icon>
            </div>
        </div>
        <!-- 容器: Tab & 列表 -->
        <div class="vehicle-main">
            <!-- Tab切换 -->
            <div class="vehicle-main-tab">
                <!-- Tab组件 -->
                <div class="vehicle-tab">
                    <el-tabs v-model="tabSubName" :stretch="true" @tab-change="tabSubChange">
                        <el-tab-pane label="车辆列表" name="tabSubList"></el-tab-pane>
                        <el-tab-pane label="历史记录" name="tabSubHistory"></el-tab-pane>
                    </el-tabs>
                </div>
                <!-- 刷新按钮 -->
                <div class="refresh-button">
                    <el-icon><Refresh /></el-icon>
                </div>
            </div>
            <!-- 列表 -->
            <div class="vehicle-list" v-if="tabSubName == 'tabSubList'">
                <ul>
                    <li v-for="(item, key) in vehicleList" :key="item.id"> 
                        {{item.vehicleNo}}
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { ref, defineProps } from "vue";
    import { Search, Refresh } from '@element-plus/icons-vue'
    import { TabPanelName } from "element-plus";
    import { TruckItem } from "@/api/schema/monitorSchema";

    //传值接收
    const props = defineProps({
        vehicleList: {
            type: Array<TruckItem>
        }
    })


    /* 定义: 搜索框绑定的值 */
    const inputSearchContent = ref("");

    /* 定义: tab绑定的值 */
    const tabSubName = ref("tabSubList");
    /* 回调: tab切换 */
    const tabSubChange = (name: TabPanelName) => {
        console.log(name);
    }
</script>

<style scoped lang="scss">
/* 监控首页左侧车辆列表 */
.vehicle-component{
    width: 100%;
    height: 100%;
    background: white;
    display: flex;
    flex-direction: column;
}

/* 顶部搜索 */
.vehicle-search{
    min-height: 46px;
    display: flex;
    //输入框样式
    :deep(.el-input__wrapper){
        border-radius: 0;
        font-size: 16px;
        padding: 0 11px;
    }
    :deep(.el-input__inner::placeholder){
        font-size: 15px;
        font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", 微软雅黑, Arial, sans-serif;
    }
    //搜索按钮
    .search-button{
        min-width: 50px;
        height: 100%;
        background: #3076BC;
        color: white;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 20px;
        cursor: pointer;
        &:hover{
            background: #407DBB;
        }
    }
}

/* 容器: Tab & 列表 */
.vehicle-main{
    flex: 1;
    display: flex;
    flex-direction: column;
    /* Tab切换 */
    .vehicle-main-tab{
        min-height: 50px;
        width: 100%;
        background: #3076BC;
        display: flex;
    }
    //tab
    .vehicle-tab{
        flex: 1;
        display: flex;
        align-items: center;
        padding: 0 20px 2px;
        .el-tabs{
            width: 100%;
            :deep(.el-tabs__header){
                margin: 0;
            }
            //tab切换的下划线容器
            :deep(.el-tabs__nav-wrap::after){
                background-color: #3076BC;
            }
            //tab切换的活动下划线
            :deep(.el-tabs__active-bar){
                background-color: white;
                bottom: 4px;
            }
            //未选中的标签字体样式
            :deep(.el-tabs__item){
                color: #C1D6EB;
                font-size: 16px;
            }
            //未选中的标签hover样式
            :deep(.el-tabs__item:hover){
                color: white;
            }
            //选中的标签字体样式
            :deep(.is-active){
                color: white;
            }
        }
    }
    //刷新按钮
    .refresh-button{
        width: 50px;
        height: 100%;
        color: white;
        background: #3076BC;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 20px;
        cursor: pointer;
        &:hover{
            background: #407DBB;
        }
    }
}

/* 列表 */
.vehicle-list{
    flex: 1;
    padding: 20px;
    font-size: 16px;
    overflow: auto;
    li{
        margin-bottom: 20px;
        cursor: pointer;
    }
}
</style>