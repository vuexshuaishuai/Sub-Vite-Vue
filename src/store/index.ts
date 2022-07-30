import { defineStore } from "pinia";

export const useStore = defineStore({
    id: "useStore",
    state: () => {
        return {
            count: 1,
            firstName: "Pinia",
            token: "Sophia",
        }
    },
    /* 用于封装计算属性, 有缓存功能, 类似computed */
    getters: {
        changeCount(state){
            return state.count + 1;
        }
    },
    actions: {

    },
    persist: {
        enabled: true,
        strategies: [
            {storage: localStorage, paths: ["count", "firstName"]},
            {storage: sessionStorage, paths: ["token"]},
        ]
    }
})