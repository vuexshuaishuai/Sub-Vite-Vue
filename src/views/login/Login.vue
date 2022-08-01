<template>
    <!-- 登录页容器 -->
    <div class="login-container">
        <!-- 登录页头部 -->
        <header class="login-header">
            <!-- 头部左侧: Logo -->
            <img src="@/assets/login/login_header_logo.png" alt="">
            <!-- 头部右侧: 联系客服 -->
            <div class="login-header-service">
                <img src="@/assets/login/login_header_bubble.png" alt="">
                <p>联系客服</p>
            </div>
        </header>
    </div>
</template>

<script setup lang="ts">

</script>

<style scoped lang="scss">
/* 登录页容器 */
.login-container{
    width: 100%;
    height: 100%;
    background: url("../../assets/login/login_background.png") no-repeat;
    background-size: cover;
}
/* 登录页头部 */
.login-header{
    width: 100%;
    height: 80px;
    background: #0b47a5;
    padding: 0 60px;
    display: flex;
    align-items: center;
    justify-content: space-between;
}
/* 头部右侧: 联系客服 */
.login-header-service{
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    font-size: 18px;
    cursor: pointer;
    img{
        margin-right: 5px;
    }
    p{
        letter-spacing: 1px;
    }
}
</style>