import { defineStore } from "pinia";

export const useStore = defineStore('useStore', {
    state: () => {
        return {
            count: 1,
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

    }
})