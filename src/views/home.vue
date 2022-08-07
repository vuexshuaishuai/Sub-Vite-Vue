<template>
    <div class="home">
        <!-- 容器: 头部 -->
        <div class="home-header">
            <!-- 头部标题 -->
            <p class="home-header-title">智运管车专业版</p>
        </div>
        <!-- 容器: 菜单&功能区 -->
        <div class="main-container">
            <!-- 左侧: 菜单 -->
            <div class="home-slide">

            </div>
            <!-- 右侧: 功能区 -->
            <div class="home-main">
                <!-- <router-view v-slot="{ Component }">
                    <transition name="fade-transform" mode="out-in">
                        <keep-alive :include="keepComp">
                            <component :is="Component" :key="$route.name"></component>
                        </keep-alive>
                    </transition>
                </router-view> -->
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
    import { onMounted } from "vue";

    const keepComp = [];

    onMounted(() => {
        document.documentElement.style.fontSize = "16px";
    });
</script>

<style lang="scss" scoped>
.home{
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
}
/* 容器: 头部 */
.home-header{
    width: 100%;
    min-height: 60px;
    background: #001e3d;
    line-height: 60px;
    font-size: 22px;
    color: white;
    padding: 0 40px;
    //头部标题
    .home-header-title{
        letter-spacing: 1px;
    }
}

/* 容器: 菜单&功能区 */
.main-container{
    flex: 1;
    display: flex;
}

/* 左侧菜单 */
.home-slide{
    width: 220px;
    height: 100%;
    background: #001529;
}

/* 右侧: 功能区 */
.home-main{
    flex: 1;
    background: #f9f9f9;
}
</style>