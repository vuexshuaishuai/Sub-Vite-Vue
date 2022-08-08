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
  font-family: Source Han Sans CN;
}
div, p, ul, li, button, input, header, footer, main{
  margin: 0;
  padding: 0;
  list-style: none;
  outline: none;  
  box-sizing: border-box;
}

/* 全局样式修改: input聚焦后颜色 */
.el-input .el-input__wrapper.is-focus{
  box-shadow: 0 0 0 1px #3076BC inset;
}
</style>