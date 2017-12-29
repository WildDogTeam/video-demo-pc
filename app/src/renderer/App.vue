<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>
<script>
const BrowserWindow = require("electron").remote.getCurrentWindow();
BrowserWindow.setResizable(false)
BrowserWindow.setSize(800, 600, true);

export default {
  name: 'app'
};

</script>
<style lang="scss">


@import './styles/index.scss'; // 全局自定义的css样式
#app {
    min-height: 100%;

}
</style>
