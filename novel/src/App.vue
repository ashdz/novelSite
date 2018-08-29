<template>
  <div id="app">
    <keep-alive><router-view/></keep-alive>
    <v-tab/> 
  </div>
</template>

<script>
import Tab from '@/components/tab/tab';
export default {
  name: 'App',
  components: {
    'v-tab': Tab
  }
}
</script>

<style>
html,body{
  height: 100%;
  width: 100%;
  background-color: #f0f0f0;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
  width: 100%;
}
</style>
