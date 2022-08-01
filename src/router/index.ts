import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";

const routes:Array<RouteRecordRaw> = [
    {
        path: "/home",
        name: "Home",
        component: () => import("@/views/home.vue")
    },
    {
        path: "/",
        name: "Login",
        component: () => import("@/views/login/Login.vue")
    }
];

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router;