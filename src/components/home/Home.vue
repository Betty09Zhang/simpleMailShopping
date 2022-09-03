<!--  -->
<template>
 <div class="content_container">
     <Header @search="search">
        <template slot="leftOpr">
          <i class="el-icon-s-fold"></i>
        </template>
        <template slot="rightOpr">
          <div class="rightOpr">
            <el-badge :value="mark" class="item">
              <el-button size="small" @click="gotoCart">购物车</el-button>
            </el-badge>
            <span @click="userStatus" class="login">{{ type === 'logout'? '退出' : '登录' }}</span>
          </div>
        </template>
     </Header>
     <!-- <Content /> -->
     <router-view></router-view>
    <!-- <nav-bar/> -->
 </div>
</template>

<script>
// import Content from './Content.vue'
import Header from '../header/Header.vue'
// import NavBar from '../nav/NavBar.vue'
import { getUser } from '../../utils/user'
import { logout } from '../../service/user'
import { getCartNum} from '../../service/cart'

export default {
 name: 'Home',
 components: {
  // Content,
  Header
  // NavBar
 },
 data () {
  return {
    type: '',
    // mark: 0
  }
 },

 //方法集合
 methods: {
    async search(value) {
      this.$router.push({
        path: '/productList',
        query: {
          name: value
        }
      })
    },
    async userStatus() {
      if (this.type === 'logout') {
        localStorage.setItem('tokenUser', '')
        const { status } = await logout()
        if (status === 200) {
          this.$router.push({
            path: '/login'
          })
        }  
      } else {
        this.$router.push({
            path: '/login'
        })
      }
   },
   gotoCart () {
     this.$router.push({
       path: '/cart'
     })
   }
 },
 //生命周期 - 挂载完成（可以访问DOM元素）
 async mounted(){
    const userObj = getUser()
    this.type = userObj? 'logout': 'login'
    if (userObj) {
      const {status,data} = await getCartNum({
        params: {
            userId: userObj.userId,  
        }
      })
      if (status === 200) {
        // this.mark = data.length
        this.$store.state.cartCount = data.length
      }
    } else {
      // this.mark = 0
      this.$store.state.cartCount = 0
    }
 },
 computed:{
   mark () {
     return this.$store.state.cartCount
   }
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
<style lang="less" scoped>
.content_container {
  height: 100%;
  width: 100%;
}
/deep/ .el-badge__content.is-fixed {
    top: 17px;
}

.rightOpr {
  display: flex;
  justify-content: center;
  align-items: center;

  .login {
    margin-left: 20px;
    cursor: pointer;
  }
}
</style>