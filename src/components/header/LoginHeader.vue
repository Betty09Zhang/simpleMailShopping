<!--  -->
<template>
 <div>
      <Header>
        <template slot="center_header">
            <div class="login_header">
                <img class="logo" src="../.././assets/logo.png" alt="">
                <span class="title">{{type}}</span>
            </div>
      </template>
     </Header>
 </div>
</template>

<script>
import Header from './Header.vue'
export default {
 name: 'LoginHeader',
 data () {
  return {
  }
 },
 components: {
     Header
 },
props: {
  type: {
      type: String
  }

},
 //方法集合
 methods: {
    gotoCart() {

    }
 },

 //生命周期 - 创建完成（可以访问当前this实例）
 created(){

 },

 //生命周期 - 挂载完成（可以访问DOM元素）
 mounted(){

 },
 //生命周期 - 创建之前
 beforeCreate(){

 },
 //生命周期 - 挂载之前
 beforeMount(){

 },
 //生命周期 - 更新之前
 beforeUpdate(){

 },
 //生命周期 - 更新之后
 updated(){

 },
 //生命周期 - 销毁之前
 beforeDestroy(){

 },
 //生命周期 - 销毁完成
 destroyed(){

 },
 //如果页面有keep-alive缓存功能，该函数会触发
 activated(){

 }
}

</script>
<style lang='less' scoped>
.login_header {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    .logo {
        margin: 0;
        width: 60px;
        height: 60px;
        // vertical-align: bottom;
    }
    .title {
        display: block;
    }
}
</style>