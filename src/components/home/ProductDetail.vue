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
  <div class="product-detail">
    <span>商品详情</span>
    <div class="detail-content">
      <div class="detail-img">
        <img :src="detail.productImg | prefix" alt="">
      </div>
      <div class="product-info">
        <div class="product-title">

          {{ detail.productName }}
        </div>
        <div class="product-desc">免邮费 顺丰快递</div>
        <div class="product-price">
          <span>${{ detail.productPrice }}</span>
          <!-- <span>库存203</span> -->
        </div>
        <div class="buy_num">
         
          <div class="count">
            <!-- <input v-model="count" type="text"/>
            <a class="btn-reduce" @click="reduce" href="javascript:;" :aria-disabled="disableDelete">-</a>
            <a class="btn-add"  @click="add" href="javascript:;" :aria-disabled="disableAdd">+</a> -->

            <span>数量：</span>
            <button @click="reduce">-</button>
            <input v-model="count" type="text"/>
            <button @click="add(detail.productStock)">+</button>
                    
          </div>
          <span v-if="showStockTip">库存不足</span>
          <div class="oper">
            <el-button type="primary" @click="addCart">加入购物车</el-button>
            <el-button type="primary" @click="buyNow(detail.productId)">立即购买</el-button>
          </div>
         
         
        </div>
      </div>
      
      
      
      <div class="product-intro">
        <ul>
          <li>概述</li>
          <li>参数</li>
          <li>安装服务</li>
          <li>常见问题</li>
        </ul>
        <div class="product-content" v-html="detail.productDescription"></div>
      </div>
    </div>
    <!-- <van-goods-action>
      <van-goods-action-icon icon="chat-o" text="客服" />
      <van-goods-action-icon icon="cart-o" :info="!count ? '' : count" @click="goTo()" text="购物车"/>
      <van-goods-action-button type="warning" @click="addCart" text="加入购物车" />
      <van-goods-action-button type="danger" @click="goToCart" text="立即购买" />
    </van-goods-action> -->
    <el-dialog
      :title="title"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose">
      <el-button @click="goToCart" class="gotoCart">查看购物车</el-button>
      <!-- <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span> -->
    </el-dialog>

    
  </div>
</template>

<script>
import { getDetail } from '../../service/good'
import { addCart } from '../../service/cart'
import { getUser } from '../../utils/user'
export default {
  data() {
    return {
      detail: {
        goodsCarouselList: []
      },
      party: '',
      count: 1,
      dialogVisible : false,
      title: '',
      showStockTip : false
    }
  },
  async mounted() {
    const { id } = this.$route.query
    const {data : {product,party}} = await getDetail(id)
    this.detail = product
    this.party = party
  },
  computed: {
    disableDelete() {
      return this.count <=1
    },
    disableAdd() {
      return this.count >= this.detail.productStock
    }
  },
  methods: {
    buyNow (productId) {
      const user = getUser()
      if (!user) {
        this.$router.push({ 
          path: '/login',
          query: {
            location: window.location.href
          } 
        })
      } else {
        this.$router.push({ 
          path: '/createOrder',
          query: {
            productId
          } 
        })
      }
    },
    handleClose() {
      this.dialogVisible = false
    },
    reduce() {
      if (this.count >1) {
        --this.count
      }
    },
    add(stock) {
      if (this.count < stock) {
        this.count++
      } else {
        this.showStockTip = true
      }
    },
    goBack() {
      this.$router.go(-1)
    },
    goTo() {
      this.$router.push({ path: '/cart' })
    },
    async addCart() {
      const user = getUser()
      this.$store.commit('addCart')
      if (user && user.userId) {
        const { status } = await addCart({ productNum: 1, productId: this.detail.productId, userId: user.userId })
        if (status == 200 ) {
          // this.$message({
          //   message: '添加成功！',
          //   type: 'success'
          // });
          this.title = '添加成功！'
          this.dialogVisible = true

        } else {
          this.$message({
            message: '添加失败！',
            type: 'error'
          });
        }
      } else {
        this.$router.push({
          path: '/login'
        })
      }
      // this.$store.dispatch('updateCart')
    },
    async goToCart() {
      // const { data, resultCode } = await addCart({ goodsCount: 1, goodsId: this.detail.goodsId })
      // this.$store.dispatch('updateCart')
      this.$router.push({ path: '/cart' })
    }
  },
  watch: {
    $route: {
      handler(val) {
        const { id } = this.$route.params
        console.log('val: ',val)
        console.log('id : ',id)
        // const data = await getDetail(id)
        // this.detail = data
      }
    }
  }
  // computed: {
  //   count () {
  //     // return this.$store.state.cartCount
  //   }
  // }
}
</script>

<style lang="less" scope>
  .product-detail {
    .detail-content {
      margin-top: 44px;
      .product-info {
        padding: 0 10px;
        text-align: center;
        .product-title {
          font-size: 18px;
          // text-align: left;
          color: #333;
        }
        .product-desc {
          font-size: 14px;
          // text-align: left;
          color: #999;
          padding: 5px 0;
        }
        .product-price {
          span:nth-child(1) {
            color: #F63515;
            font-size: 22px;
          }
          span:nth-child(2) {
            color: #999;
            font-size: 16px;
          }
        }
        .buy_num {
          .count>input{
            width: 30px;
            height: 20px;
            text-align: center;
          }
          .count>button{
              width: 20px;
              height: 22px;
          }
          .oper {
            margin: 20px 0;
          }

        }
      }
      .product-intro {
        width: 100%;
        ul {
          display: flex;
          justify-content: space-between;
          width: 100%;
          margin: 10px 0;
          li {
            flex: 1;
            padding: 5px 0;
            text-align: center;
            font-size: 15px;
            border-right: 1px solid #999;
            box-sizing: border-box;
            &:last-child {
              border-right: none;
            }
          }
        }
        .product-content {
          padding: 0 20px;
          img {
            width: 100%;
          }
        }
      }
    }
}
</style>
