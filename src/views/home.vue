<template>
    <div class="home">
        123
        <p>456</p>
        <div>{{store.changeCount}}</div>
        <div>{{store.token}}</div>
        <button type="button" @click="doChange()">点击</button>
    </div>
</template>

<script lang="ts" setup>
    import { useStore } from "@/store";
    import { storeToRefs } from "pinia";

    const store = useStore();
    console.log("输出", import.meta.env);
    const doChange = () => {
        store.$patch({
            count: 5,
            token: "David"
        })
    }

</script>

<style lang="scss" scoped>
.home{
    color: red;
    p{
        color: gold;
    }
}
</style>