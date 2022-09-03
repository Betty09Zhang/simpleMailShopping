<template>
  <div id="app">
    <div id="nav">
      <router-view></router-view>
      <!-- <Home /> -->
      <!-- <category></category> -->
        <!-- <nav-bar/> -->
    </div>
   
  </div>
</template>
<script>
// import Home from './components/home/Home.vue'
// import Category from './components/home/Category.vue'
// import NavBar from './components/nav/NavBar.vue'
export default {
  name: 'App',
  components: {
    // Home,
    // Category,
    // NavBar
  },
 data () {
  return {
  }
 }
}
</script>

<style lang="less">
body {
  margin: 0;
  padding: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  position: absolute;
  width: 100%;
  height: 100%;
  bottom: 0;
  left: 0;
}
</style>
