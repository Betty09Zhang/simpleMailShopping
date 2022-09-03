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
  <div class="create-order">
    <el-form :model="receive" ref="formOrder" :rules="rules">
      <!-- <header :name="'生成订单'" @callback="deleteLocal"><header> -->
      <div class="address-wrap">
        <el-form-item label="收货人姓名" prop="name">
          <el-input
            placeholder="请输入内容"
            v-model="receive.name"
            label="收货人姓名"
            clearable>
          </el-input>
        </el-form-item>
        <el-form-item label="收货人电话" prop="tel">
          <el-input
            placeholder="请输入内容"
            v-model="receive.tel"
            label="收货人电话"
            clearable
            aria-required=""
            >
          </el-input>
        </el-form-item>
        <el-form-item label="收货人地址" prop="address">
          <el-input
            placeholder="请输入内容"
            v-model="receive.address"
            label="收货人地址"
            clearable>
          </el-input>
        </el-form-item>
        
      </div>

      <el-table
        :data="cartList"
        style="width: 100%">
         <el-table-column
          prop="productId"
          label="商品id"
          width="180">
          <template slot-scope="props">
            <el-form-item><span>{{props.row.productId}}</span></el-form-item>
          </template>
        </el-table-column>
        <el-table-column
          prop="productName"
          label="商品名称"
          width="180">
        </el-table-column>
        <el-table-column
          prop="productImg"
          label="商品图片"
          width="360">
          <template slot-scope="props">
            <img :src="props.row.productImg | prefix" style="width: 300px;height: 200px"/>
          </template>
        </el-table-column>
        <el-table-column
          prop="productPrice"
          label="商品价格">
        </el-table-column>
         <el-table-column
          prop="productNum"
          label="商品数量">
          <template slot-scope="props">
            <el-form-item><span>{{props.row.productNum}}</span></el-form-item>
          </template>
        </el-table-column>
      </el-table>
      <!-- <div class="good">
        <div class="good-item" v-for="(item, index) in cartList" :key="index">
          <div class="good-img"><img :src="item.productImg | prefix" alt=""></div>
          <div class="good-desc">
            <div class="good-title">
              <span>{{ item.productName }}</span>
              <span>x{{ item.productNum }}</span>
            </div>
            <div class="good-btn">
              <div class="price">¥{{ item.productPrice }}</div>
            </div>
          </div>
        </div>
      </div> -->
      <div class="pay-wrap">
        <div class="price">
          <span>商品金额</span>
          <el-form-item prop="total"><span>¥{{ total }}</span></el-form-item>
        </div>
        <el-button @click="createOrder" class="pay-btn" color="#1baeae" type="primary" block>生成订单</el-button>
      </div>
      <!-- <div :style="{ width: '90%', margin: '0 auto', padding: '50px 0' }">
        <el-button :style="{ marginBottom: '10px' }" color="#1989fa" block @click="payOrder(1)">支付宝支付</el-button>
        <el-button color="#4fc08d" block @click="payOrder(2)">微信支付</el-button>
      </div> -->
    </el-form>
  </div>
</template>

<script>
import { getCartDetail } from '../../service/cart'
import Validator from '../../utils/validate'
import { addOrder } from '../../service/order'
import { getUser} from '../../utils/user'
import { getDetail } from '../../service/good'

export default {
 
  data() {
    return {
      cartList: [],
      showPay: false,
      orderNo: '',
      cartItemIds: [],
      receive: {
        tel: '',
        name: '',
        address: ''
      },
      rules: {
        tel: [{ required: true, validator: Validator.validateTel, trigger: ['blur', 'change']}],
        name:[ { required: true, message: '请输入收件人姓名！', trigger: 'change' }],
        address:[ { required: true, message: '请输入收件人地址！', trigger: 'change' }]
      }
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    async createOrder () {
      //  获取 userId
      const user = getUser()
      if (user && user.userId) {
        this.$refs.formOrder.validate((flag) => {
          console.log('flag: ', flag)
          if (flag) {
            addOrder({
              userId: user.userId,
              productData: this.cartList,
              address: this.receive.address,
              name: this.receive.name,
              tel: this.receive.tel,
              total: this.total
            }).then((resp) => {
              console.log('resp； ', resp)
              const { status, result: {orderNo, orderId}} = resp.data
              if (status == 200) {
                this.$router.push({path: '/payoff', query: {
                  orderNo,
                  orderId,
                  address: this.receive.address,
                  name: this.receive.name,
                  tel: this.receive.tel
                }})
              }
            }).catch(err => {
              const {response : {status}} = err
              if (status == 401) {
                this.$router.push({
                  path: '/login'
                })
              }
              console.log('error: ',err)
            })
          }
        })
      } else {
        this.$router.push({
          path: '/login'
        })
      }
    },
    async init() {
      // Toast.loading({ message: '加载中...', forbidClick: true });
      // const { addressId, cartItemIds } = this.$route.query
      // const _cartItemIds = cartItemIds ? JSON.parse(cartItemIds) : JSON.parse(getLocal('cartItemIds'))
      // setLocal('cartItemIds', JSON.stringify(_cartItemIds))
      const user = getUser()
      console.log('routes', this.$route)
      const {productId} = this.$route.query
      if (user && !productId) {
        const {data} = await getCartDetail({ 
          params: {
            pageNumber: 1,
            userId: user.userId,
            pageSize: 1000
          }
        })
        if (data) {
          this.cartList = data
        }
      } else if (user && Array.isArray(productId)) {
        const {data} = await getCartDetail({ 
          params: {
            userId: user.userId,
            ids: productId
          }
        })
        if (data) {
          this.cartList = data
        }
      }else if (user) {
        // 直接购买
        const {data : {product}} =await getDetail(parseInt(productId))
        if (product) {
          this.cartList = [{...product,productNum: 1}]
        }
      } else {
        this.$router.push({
          path: '/login'
        })
      }
     
     
      // this.address = address
      // Toast.clear()
    }
    // goTo() {
    //   this.$router.push({ path: `address?cartItemIds=${JSON.stringify(this.cartItemIds)}` })
    // },
    // deleteLocal() {
    //   setLocal('cartItemIds', '')
    // },
    // async createOrder() {
    //   const params = {
    //     addressId: this.address.addressId,
    //     cartItemIds: this.cartList.map(item => item.cartItemId)
    //   }
    //   const { data, resultCode } = await createOrder(params)
    //   setLocal('cartItemIds', '')
    //   this.orderNo = data
    //   this.showPay = true
    // },
    // close() {
    //   this.$router.push({ path: 'order' })
    // },
    // async payOrder(type) {
    //   Toast.loading
    //   await payOrder({ orderNo: this.orderNo, payType: type })
    //   this.$router.push({ path: 'order' })
    // }
  },
  computed: {
    total: function() {
      let sum = 0
      if (this.cartList && this.cartList.length > 0) {
        this.cartList.forEach(item => {
          sum += item.productNum * item.productPrice
        })
      }
      return sum
    }
  },
  watch: {
    $routes:{
      handler(val) {
        console.log('val: ',val)
      }
    }
  }
}
</script>

<style lang="less" scoped>
/deep/ .el-form-item__content {
  width: 560px;
}
  .create-order {
    background: #f9f9f9;
    .address-wrap {
      margin-bottom: 20px;
      background: #fff;
      position: relative;
      margin-top: 44px;
      font-size: 14px;
      padding: 15px;
      color: #222333;
      .name, .address {
        margin: 10px 0;
      }
      .arrow {
        position: absolute;
        right: 10px;
        top: 50%;
        transform: translateY(-50%);
        font-size: 20px;
      }
      &::before {
        position: absolute;
        right: 0;
        bottom: 0;
        left: 0;
        height: 2px;
        background: -webkit-repeating-linear-gradient(135deg, #ff6c6c 0, #ff6c6c 20%, transparent 0, transparent 25%, #1989fa 0, #1989fa 45%, transparent 0, transparent 50%);
        background: repeating-linear-gradient(-45deg, #ff6c6c 0, #ff6c6c 20%, transparent 0, transparent 25%, #1989fa 0, #1989fa 45%, transparent 0, transparent 50%);
        background-size: 80px;
        content: '';
      }
    }
    .good {
      margin-bottom: 10px;
    }
    .good-item {
      padding: 10px;
      background: #fff;
      display: flex;
      .good-img {
        img {
          width: 100px;
          height: 100px;
        }
      }
      .good-desc {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        flex: 1;
        padding: 20px;
        .good-title {
          display: flex;
          justify-content: space-between;
        }
        .good-btn {
          display: flex;
          justify-content: space-between;
          .price {
            font-size: 16px;
            color: red;
            line-height: 28px;
          }
          // .van-icon-delete {
          //   font-size: 20px;
          //   margin-top: 4px;
          // }
        }
      }
    }
    .pay-wrap {
      width: 100%;
      background: #fff;
      padding: 10px 0;
      border-top: 1px solid #e9e9e9;
      >div {
        display: flex;
        justify-content: space-between;
        padding: 0 5%;
        margin: 10px 0;
        font-size: 14px;
        span:nth-child(2) {
          color: red;
          font-size: 18px;
        }
      }
      .pay-btn {
        // position: fixed;
        bottom: 7px;
        right: 0;
        left: 0;
        width: 90%;
        margin: 0 auto;
      }
    }
  }
</style>
