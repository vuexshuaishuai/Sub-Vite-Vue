<template>
  <div class="app-container">
    <router-view></router-view>
  </div>
</template>

<script setup lang="ts">

</script>

<style lang="scss">
html, body, #app, .app-container{
  width: 100%;
  height: 100%;
}
div, p, ul, li, button, input{
  margin: 0;
  padding: 0;
  list-style: none;
  outline: none;  
}
</style>