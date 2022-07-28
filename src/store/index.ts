import { defineStore } from "pinia";

export const useStore = defineStore('useStore', {
    state: () => {
        return {
            count: 1
        }
    },
    /* 用于封装计算属性, 有缓存功能, 类似computed */
    getters: {

    },
    actions: {

    }
})