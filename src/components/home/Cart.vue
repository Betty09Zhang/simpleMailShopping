
<!--
 * 严肃声明：
 * 开源版本请务必保留此注释头信息，若删除我方将保留所有法律责任追究！
 * 本系统已申请软件著作权，受国家版权局知识产权以及国家计算机软件著作权保护！
 * 可正常分享和学习源码，不得用于违法犯罪活动，违者必究！
 * Copyright (c) 2020 陈尼克 all rights reserved.
 * 版权所有，侵权必究！
 *
-->

<template>
  <div id="box">
    <div v-if="goodsList.length !=0">
            <div id="goods-box">
                <!-- 第一行 -->
                <div id="navig-box">
                    <!-- 全选 -->
                    <div class="select">
                        <input @change="selecAllAction" type="checkbox" id="select-all" v-model="selectAll">
                        <label for="select-all">全选</label>
                    </div>
                    <!-- 商品 -->
                    <div class="goods-info">商品</div>
                    <!-- 单价 -->
                    <div class="price">单价</div>
                    <!-- 数量 -->
                    <div class="count">数量</div>
                    <!-- 小计 -->
                    <div class="subtotal">小计</div>
                    <!-- 操作 -->
                    <div class="delete">操作</div>
                </div>
                
                <!-- ================显示商品信息============== -->
                <el-form>
                   <div class="goods" v-for="(goods,index) in goodsList" :key="index">
                    <!-- 选中 -->
                    <div class="select">
                        <input v-model="goods.isCheck" type="checkbox" id="select-all">
                    </div>
                    <!-- 商品 -->
                    <div class="goods-info">
                        <img v-bind:src="goods.productImg | prefix" >
                        <span>{{goods.productName}}</span>
                    </div>
                    <!-- 单价 -->
                    <div class="price">{{goods.productPrice}}</div>
                    <!-- 数量 -->
                    <div class="count">
                        <button @click="reduceCount(goods)">-</button>
                        <input type="text" name="" id="" v-bind:value="goods.productNum"  @blur="changeCount($event,goods)"/>
                        <button @click="addCount(goods)">+</button>
                    </div>
                   
                    <!-- 小计 -->
                    <!-- 数字.toFixed(小数位数) -->
                    <div class="subtotal">￥{{goods.productNum*goods.productPrice}}</div>
                    <!-- 操作 -->
                    <div class="delete">
                        <span @click="confirmDelete(goods.productId, goods.cartId)">删除</span>
                    </div>
                  </div>
                </el-form>     
            </div>
            <!-- -->
            <!-- =====================结算====================== -->
            <div id="account-box">
                <button type="button" @click="deleteBatch">删除选中商品</button>
                <div>
                    总共选中了<span id="count">{{totalCount}}</span>件商品 总计: <span id="total">￥{{totalPrice.toFixed(2)}}</span>
                </div>
                <button type="button" @click="createOrder">去结算</button>
            </div>
        </div>
        <div else><span v-if="goodsList.length ===0">购物车空空如也~~~~~~~~~~~~~~~</span></div>
  </div>

</template>

<script>
// import axios from '../../utils/axios'
import { getCart, deleteCart, updateCart } from '../../service/cart'
import { getUser } from '../../utils/user'
export default {
  data() {
    return {
      checked: false,
      list: [],
      all: false,
      result: [],
      checkAll: true,
      tableData: [],
      loading: false,
      count: '',
      selectAll:false,
      goodsList: [],
      stockTip: false
    }
  },
  mounted() {
    this.init()
  },
  computed: {
    totalPrice: function() {
     return this.goodsList.reduce((x, y)=>{
                return x+y.productNum*(y.productPrice==undefined?0:y.productPrice)*(y.isCheck)
            },0)
    },
    totalCount:function(){
          return this.goodsList.reduce((x, y)=>{
              return x+y.productNum*y.isCheck
          }, 0)
    }
  },
  methods: {
    createOrder () {
      // 获取 userId
      const user = getUser()
      if (user && user.userId) {
        const ids = this.goodsList.filter(item => {
          if (item.isCheck) {
            return true
          }
        }).map(ele => ele.productId)
        this.$router.push({path: '/createOrder', query:{
          productId: ids,
          userId: user.userId
        }})
      } else {
        this.$router.push({path: '/login'})
      }
    },
    changeCount($event, goods) {
      this.changeNum($event.target.value, goods)
    },
    async changeNum (productNum, goods) {
      console.log(productNum)
      // let productNum = $event.target.value
      if (/^\d+$/.test(productNum) && productNum <= goods.productStock) {
        productNum = parseInt(productNum)
        await updateCart({
          cartId: goods.cartId,
          productId: goods.productId,
          productNum
        })
      } else {
        this.$message({
          message: '添加的商品数量应为整数并小于库存！',
          type: 'warning'
        });
      }
      
    },
    deleteBatch() {
      const _this = this
      const ids = this.goodsList.filter(item => {
        if (item.isCheck) {
          return item.cartId
        }
      })
      this.$confirm('是否继续删除该文件?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        _this.deleteCartProduct(ids)
      })
      // this.confirmDelete(ids,cartId)
    },
    confirmDelete(cartId) {
      const _this = this
      this.$confirm('是否继续删除该文件?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        _this.deleteCartProduct(cartId)
      })
    },
    async reduceCount(goods) {
      if (goods.productNum >= 2) {
        //  goods.productNum--
        await this.changeNum (goods.productNum -1, goods)
        this.goodsList.forEach(item =>{
          if(item.productId === goods.productId){
            item.productNum = goods.productNum -1
          }
        })
        
      } 
    },
    async addCount(goods) { 
      if (goods.productNum < goods.productStock) {
         await this.changeNum (goods.productNum +1, goods)
        this.goodsList.forEach(item =>{
          if(item.productId === goods.productId){
            item.productNum = goods.productNum + 1
          }
        })

      } else {
        this.stockTip = true
      }
    },
    async deleteCartProduct(cartId) {
      // this.goodsList.splice(this.goodsList.indexOf(goods),1)
      let id
      if (Object.prototype.toString.call(cartId) === '[object Array]') {
        id = cartId
      } else {
        id = [cartId]
      }
      const resp = await deleteCart({
        data: {
          ids: id
        }
      })
      if (resp && resp.status == 200) {
        this.$message({
          message: '删除成功！',
          type: 'success'
        });
        this.init()
      }
    },
    selecAllAction () {
      this.goodsList.forEach((item)=>{
        item.isCheck = this.selectAll     //item是对象，slect是其中的属性
      })
    },
    async init() {
      // Toast.loading({ message: '加载中...', forbidClick: true });
      const user = await getUser()
      if (user && user.userId) {
        this.loading = true
      // 获取 userId
        const { data: {data}  } = await getCart({ 
          params: {
            pageNumber: 1,
            pageSize:1000,
            userId: user.userId
          }
        })
        // const { data: {data} } = await axios.get('/cart/getCartDetail',{
        //   params: {
        //     pageNumber: 1,
        //     userId: 1
        //   }
        // })
        this.goodsList = data
        // this.result = data.map(item => item.cartItemId)
        // Toast.clear()
        this.loading = false
      }
      
    },
    handleSelectionChange() {

    },
    async onDeleteProduct(productId) {
      await deleteCart({
        params: {
          ids: [productId]
        }
      })

    }
    // goBack() {
    //   this.$router.go(-1)
    // },
    // goTo() {
    //   this.$router.push({ path: 'home' })
    // },
    // async onChange(value, detail) {
    //   if (this.list.filter(item => item.cartItemId == detail.name)[0].goodsCount == value) return
    //   Toast.loading({ message: '修改中...', forbidClick: true });
    //   const params = {
    //     cartItemId: detail.name,
    //     goodsCount: value
    //   }
    //   const { data } = await modifyCart(params)
    //   this.list.forEach(item => {
    //     if (item.cartItemId == detail.name) {
    //       item.goodsCount = value
    //     }
    //   })
    //   Toast.clear();
    // },
    // async onSubmit() {
    //   if (this.result.length == 0) {
    //     Toast.fail('请选择商品进行结算')
    //     return
    //   }
    //   const params = JSON.stringify(this.result)
    //   // for(let i = 0; i < this.result.length; i++) {
    //   //   await deleteCartItem(this.result[i])
    //   // }
    //   this.$router.push({ path: `create-order?cartItemIds=${params}` })
    // },
    // async deleteGood(id) {
    //   const { data } = await deleteCartItem(id)
    //   this.$store.dispatch('updateCart')
    //   this.init()
    // },
    // groupChange(result) {
    //   if (result.length == this.list.length) {
    //     this.checkAll = true
    //   } else {
    //     this.checkAll = false
    //   }
    //   this.result = result
    // },
    // allCheck(value) {
    //   if (!this.checkAll) {
    //     this.result = this.list.map(item => item.cartItemId)
    //   } else {
    //     this.result = []
    //   }
    // }
  }
}
</script>

<style lang="less">
#goods-box{
    width: 850px;
    /* height: 300px; */
    /* background-color: yellow; */
    margin-left: auto;
    margin-right: auto;
    
    overflow: hidden;
}

#navig-box{
    height: 40px;
    background-color: lightgray;
    
    line-height: 40px;
}
#navig-box>div{
    float: left;
    
}

.select{
    width: 70px;
    text-align: center;
}

.count,.delete,.price,.subtotal{
    width: 100px;
    text-align: center;
}

.tip {
  color: black;
  text-align: center;
}

.goods-info{
    width: 380px;
    text-align: center;
}

/* ========每个商品========== */
.goods>div{
    float: left;
}

/* ====== 商品详情 ======*/
.goods>.goods-info{
    text-align: left;
    position: relative;
    /* background-color: #FF0000; */
    
}

.goods-info>img{
    width: 80px;
    height: 100px;
    margin-top: 10px;
    margin-bottom: 10px;
}
.goods-info>span{
    position: absolute; 
    left: 90px;
    height: 40px;
    top: 50%;
    margin-top: -20px;
}

/* ======单价====== */
.goods{
    /* background-color: seagreen; */
    overflow: hidden;
}
.goods>.price,.goods>.count,.goods>.subtotal, .goods>.delete,.goods>.select{
    /* background-color: salmon; */
    height: 120px;
    line-height: 120px;
}

/* =======数量======= */
.count>input{
    width: 30px;
    height: 20px;
    text-align: center;
}
.count>button{
    width: 20px;
    height: 22px;
}

/* =======操作======== */
.delete>span{
    color: gray;
    cursor: pointer;
}

/* ==========================结算===================== */
#account-box{
    width: 850px;
    height: 200px;
    margin-left: auto;
    margin-right: auto;
    position: relative;
    /* background-color: sandybrown; */
}

#account-box button:first-child{
    color: darkgray;
    border: 0;
    outline: 0;
    background-color: rgba(0,0,0,0);
    margin-top: 15px;
    font-size: 17px;
    position: absolute;
    left: 50px;
}

#account-box button:last-child{
    color: white;
    border: 0;
    outline: 0;
    background-color: red;
    width: 120px;
    height: 45px;
    font-size: 22px;
    position: absolute;
    right: 0;
    top: 15px;
}

#account-box>div{
    position: absolute;
    right: 220px;
    top: 15px;
}

#count{
    color: red;
}

#total{
    color: red;
    font-weight: 900;
    font-size: 20px;
}
</style>
