<template>
  <div class="app-container">
      <router-view v-slot="{ Component }">
        <transition name="fade-transform" mode="out-in">
          <keep-alive>
            <component :is="Component" :key="$route.name"></component>
          </keep-alive>
        </transition>
      </router-view>
  </div>
</template>

<script setup lang="ts">

</script>

<style lang="scss">
html, body, #app, .app-container{
  width: 100%;
  height: 100%;
}
div, p, ul, li, button, input, header, footer, main{
  margin: 0;
  padding: 0;
  list-style: none;
  outline: none;  
  box-sizing: border-box;
}
</style>