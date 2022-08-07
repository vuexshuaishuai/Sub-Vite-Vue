import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";

const routes:Array<RouteRecordRaw> = [
    {
        path: "/",
        name: "Login",
        component: () => import("@/views/login/Login.vue")
    },
    {
        path: "/home",
        name: "Home",
        component: () => import("@/views/home.vue"),
        children: [
            {
                path: "/home",
                redirect: "/home/monitor"
            },
            {
                path: "/home/monitor",
                name: "Monitor",
                component: () => import("@/views/monitor/Monitor.vue")
            }
        ]
    },
    
];

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router;