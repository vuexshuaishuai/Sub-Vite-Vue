<template>
    <!-- 登录页容器 -->
    <div class="login-container" id="login-container">
        <!-- 容器: 登录页头部 -->
        <header class="login-header">
            <!-- 头部左侧: Logo -->
            <img src="@/assets/login/login_header_logo.png" alt="" class="header-logo">
            <!-- 头部右侧: 联系客服 -->
            <div class="login-header-service">
                <el-tooltip
                    class="box-item"
                    effect="light"
                    :content="loginPhone"
                    placement="bottom"
                    popper-class="phone-tooltip"
                >
                    <div class="header-service-tooltip">
                        <img src="@/assets/login/login_header_bubble.png" alt="">
                        <p>联系客服</p>
                    </div>
                </el-tooltip>
            </div>
        </header>

        <!-- 容器: 主要登录内容 -->
        <main class="login-main">
            <!-- 左侧广告介绍 -->
            <div class="login-main-banner">
                <!-- 核心介绍 -->
                <div class="main-banner-left">
                    <!-- 大标题 -->
                    <p class="main-banner-title">8大核心功能 · 3种管理方式</p>
                    <!-- 小标题 -->
                    <div class="main-banner-summary">
                        <p class="banner-line"></p>
                        <p>省心省力省钱，祝您轻松管车</p>
                        <p class="banner-line"></p>
                    </div>
                    <!-- 最大的广告电脑 -->
                    <img src="@/assets/login/login_biger_banner.png" alt="" class="banner-computer">
                    <!-- 详细功能介绍 -->
                    <ul class="banner-detail">
                        <li v-for="(item, key) in litBanner" :key="item.label">
                            <img :src="item.path" alt="">
                        </li>
                    </ul>
                </div>
                <!-- 三种渠道 -->
                <ul class="main-channel">
                    <li v-for="(item, key) in litChannel" :key="item.label">
                        <img :src="item.path" alt="" />
                        <p>{{item.label}}</p>
                    </li>
                </ul>
            </div>
            <!-- 右侧登录 -->
            <div class="login-main-sign">
                <div class="" id="iframeLogin">
                    
                </div>
            </div>
        </main>

        <!-- 容器: 底部 -->
        <footer class="login-footer">
            <!-- 公司地址 & 联系我们 & 公司介绍 -->
            <ul class="login-footer-detail">
                <li>
                    <img src="@/assets/login/login_position.png" alt="">
                    <p>公司地址：</p>
                    <p>北京市海淀区东北旺西路8号中关村软件园27号院千方科技大厦A座（100085）</p>
                </li>
                <li>
                    <img src="@/assets/login/login_phone.png" alt="">
                    <p>联系我们：</p>
                    <p>{{loginPhone}}</p>
                </li>
                <li>
                    <img src="@/assets/login/login_address.png" alt="">
                    <p>公司介绍：</p>
                    <p>北京中交兴路车联网科技有限公司基于AI、物联网和大数据等前沿科技，构建了全球最大的商用车车联网平台。“车旺大卡”是中交兴路推出的面向物流运输行业，以司机、车主和商家为主要用户群体的综合性移动服务平台，提供APP和PC两种管车方式。</p>
                </li>
            </ul>
            <!-- 备案 -->
            <div class="login-footer-record">
                <div>
                    <p>车旺-大卡 京ICP备14044000号</p>
                    <img src="@/assets/login/login_record.png" alt="">
                    <p>京公网安备 11010802034425号</p>
                </div>
                <p>@版权所有 北京中交兴路车联网科技有限公司</p>
            </div>
        </footer>
    </div>
</template>

<script setup lang="ts">
    import { ref, reactive, onMounted, nextTick } from "vue";
    import { login } from "@/api/login";
    import { setToken } from "@/utils/subCookie";
    import "@/plugins/user_center_login.js";
    /* 定义: 部分静态资源(方便维护)  */
    const loginPhone: string = "400-815-5656";

    /* 接口定义: 广告详情 */
    interface SubBanner {
        label: string;
        path: string;
    }
    /* 定义: 静态资源 - 功能详情 */
    const litBanner: Array<SubBanner> = reactive([
        {label: "车辆定位", path: "/src/assets/login/banner_detail_1.png"},
        {label: "轨迹回放", path: "/src/assets/login/banner_detail_2.png"},
        {label: "车辆追踪", path: "/src/assets/login/banner_detail_3.png"},
        {label: "全图监控", path: "/src/assets/login/banner_detail_4.png"},
        {label: "异常提醒", path: "/src/assets/login/banner_detail_5.png"},
        {label: "电子围栏", path: "/src/assets/login/banner_detail_6.png"},
        {label: "行车报告", path: "/src/assets/login/banner_detail_7.png"},
        {label: "账号共享", path: "/src/assets/login/banner_detail_8.png"},
    ]);
    /* 定义: 静态资源 - 渠道二维码 */
    const litChannel: Array<SubBanner> = reactive([
        { label: "扫码打开小程序", path: "/src/assets/login/channel_wecheat.png"},
        { label: "下载APP IOS", path: "/src/assets/login/channel_ios.png"},
        { label: "下载APP Android", path: "/src/assets/login/channel_android.png"},
    ])

    /* 回调: 登录成功 */
    const doLoginSuccessCallback = (loginCenterResp: any) => {
        console.log("登录完成", loginCenterResp);
        const { ticket, userId } = loginCenterResp;
        //iframe登录成功后会返回用户中心的票据(ticket)和用户唯一标识(userId), 获取票据成功状态值: status: "0";
        if(ticket && userId){
            login({
                ticket: ticket,
                userId: userId,
            }).then(res => {
                if(res.code === 0){
                    setToken(res.data.token)
                }
            })
        }
        
    }
    /* 回调: 打开或关闭协议条款 */
    const doClauseCallback = () => {
        
    }
    /* 获取当前屏幕宽度 */
    const getCurrentClientSize = () => {
        nextTick(() => {
            //设置rem
            document.documentElement.style.fontSize = document.documentElement.clientWidth / 19.2 + "px";
            //设置登录iframe的样式
            let innerDom = document.getElementById("businesslineIframe") as HTMLIFrameElement;
            let homeClientWidth = document.documentElement.clientWidth;
            let styleScale = Math.ceil(homeClientWidth / 400) * 0.19;
            innerDom.style.transform = `scale(${styleScale})`;
        })
    }
    
    onMounted(() => {
        //首先: 开启适配
        getCurrentClientSize();
        window.addEventListener("resize", getCurrentClientSize);
        //接入用户中心的登录
        (window as any).adminUserCenter.initAdminModal({
            wrapElementId: "iframeLogin", // 嵌入iframe的页面外层盒子id
            loginSuccess: doLoginSuccessCallback, // 登录/注册有结果时的回调
            changeIndex: doClauseCallback, // 打开或关闭协议条款的回调
        });
        (window as any).adminUserCenter.openAdminModal({
            //商户号
            merchantcode: "20191210131730365779",
            position: "0",
            right: "0",
            top: "center",
            transform: "scale(0.5)"
        });
    })

</script>

<style scoped lang="scss">
/* 登录页容器 */
.login-container{
    width: 100%;
    height: 100%;
    background: url("../../assets/login/login_background.png") no-repeat;
    background-size: cover;
    color: white;
    display: flex;
    flex-direction: column;
    overflow: auto;
}

/* 容器: 登录页头部 */
.login-header{
    width: 100%;
    min-height: 0.8rem;
    background: #0b47a5;
    padding: 0 0.6rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    // 头部左侧: Logo
    .header-logo{
        width: 2.61rem;
        height: 0.38rem;
    }
    // 头部右侧: 联系客服
    .login-header-service{
        font-size: 0.18rem;
        cursor: pointer;
        img{
            margin-right: 0.05rem;
            width: 0.28rem;
            height: 0.28rem;
        }
        p{
            letter-spacing: 0.01rem;
        }
        .header-service-tooltip{
            padding: 0.05rem 0;
            display: flex;
            justify-content: center;
            align-items: center;
        }
    }
}

/* 容器: 主要登录内容 */
.login-main{
    flex: 1;
    display: flex;
    align-items: center;
    padding-top: 0.35rem;
    //左侧容器: 广告介绍
    .login-main-banner{
        display: flex;
        justify-content: center;
        align-items: center;
        flex: 3;
        //大标题
        .main-banner-title{
            font-size: 0.45rem;
            letter-spacing: 0.04rem;
            text-align: center;
        }
        //小标题
        .main-banner-summary{
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 0.3rem;
            margin: 0.2rem 0 0.2rem;
            letter-spacing: 0.02rem;
            .banner-line{
                width: 0.6rem;
                height: 0.02rem;
                background: white;
            }
            >p:nth-of-type(2){
                margin: 0 0.2rem;
            }
        }
        //最大的广告电脑
        .banner-computer{
            // width: 7.5rem;
            // height: 3.84rem;
            display: block;
            margin: 0 auto;
            width: 6.5rem;
            // height: 3.54rem;
        }
        //详细功能介绍
        .banner-detail{
            display: flex;
            align-items: center;
            justify-content: center;
            li{
                margin-right: 0.4rem;
                img{
                    width: 0.63rem;
                    height: 0.87rem;
                }
            }
        }
        //三种渠道
        .main-channel{
            margin-left: 0.4rem;
            li{
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
            }
            p{
                text-align: center;
                font-size: 0.18rem;
                margin: 0.1rem 0 0.15rem;
            }
            img{
                width: 1.5rem;
            }
        }
    }

    /* 右侧容器: 登录 */
    .login-main-sign{
        position: relative;
        min-width: 452px;
        height: 100%;
        // overflow: hidden;
        flex: 2;
        display: flex;
        justify-content: center;
        #iframeLogin{
            width: 452px;
            height: 100%;
        }
    }
    
}










/* 容器: 底部 */
.login-footer{
    padding-bottom: 0.2rem;
    font-size: 0.12rem;
}
/* 公司地址 & 联系我们 & 公司介绍 */
.login-footer-detail{
    padding: 0 0.6rem;
    li{
        display: flex;
        img{
            margin-right: 0.1rem;
            height: 100%;
            padding-top: 0.05rem;
        }
        >p:nth-child(2){
            white-space: nowrap;
            line-height: 0.25rem;
        }
        >p:last-child{
            line-height: 0.25rem;
        }
    }
    >li:nth-child(1) img{
        width: 0.14rem;
        height: 0.20rem;
    }
    >li:nth-child(2) img{
        width: 0.18rem;
        height: 0.16rem;
    }
    >li:nth-child(3) img{
        width: 0.16rem;
        height: 0.22rem;
        padding-top: 0.02rem;
    }
}
/* 备案 */
.login-footer-record{
    margin-top: 0.05rem;
    >div{
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 0.05rem;
        p{
            cursor: pointer;
        }
    }
    >p{
        text-align: center;
    }
    img{
        margin: 0 0.05rem 0 0.4rem;
        width: 0.2rem;
        height: 0.2rem;
    }
}
</style>

<style lang="scss">
.phone-tooltip{
    font-size: 16px;
    padding: 10px;
}
/* 
    1920 - 1
    1600 - 0.9
    1440 - 0.8
    1400 - 0.8
    1366 - 0.8
    1360 - 0.8
*/
#businesslineIframe{
    position: static !important;
    // width: 352px !important;
    // height: 542px;
    // transform: scale(0.8);
}
</style>