<!--  -->
<template>
 <div class="order">
    <div class="orderInfo">
        <span class="success">订单提交成功，请尽快付款！订单号：{{order.orderNo}}</span>
        <span class="price">应付金额 ：<label class="order_price">${{ fixed(order.orderPrice)}}</label></span>
        <div>
            <h3>收货详情</h3>
            <div>收货地址：{{address}}</div>
            <div>收货人：{{name}} {{tel}}</div>
            <div>收货人电话： {{tel}}</div>
            <div v-for="(item, index) in orderDetail" :key="index">
                <span>商品名称：{{item.productName}}</span>
            </div>  
        </div>
    </div>

    <div class="payoff">
        <el-button type="primary" @click="payoff">立即支付</el-button>
    </div>
 </div>
</template>

<script>
import { getOrderDetail } from '../../service/order'
import {fixed} from '../../utils/utils'
import {getUser} from '../../utils/user'
export default {
data () {
    return {
        orderDetail: [],
        orderNo: '',
        address: '',
        name: '',
        tel: '',
        order: {},
        activeNames: ['1'],
        orderId: '',
        fixed: fixed
    }
},
 //方法集合
methods: {
    async init () {
        const {orderNo, orderId, address, name, tel} = this.$route.query
        this.orderNo = orderNo
        this.orderId = orderId
        this.address = address
        this.name = name
        this.tel = tel
        if (orderId) {
            const resp = await getOrderDetail({
                params: {
                    orderId
                }
            })
            const {data : {order, orderDetails}} = resp
            if (order && order.length ==1) {
                this.order = order[0]
            }
            this.orderDetail = orderDetails
        }
    },
    payoff () {
        const orders = this.orderDetail.map(item => ({
                productId:item.productId,
                productNum: item.productNum
            }))
        this.$router.push({path: '/success' , query: {
            orderId: this.orderId,
            status: 1,
            userId: getUser().userId,
            orderDetail: orders
        }})
    }

},
 //生命周期 - 挂载完成（可以访问DOM元素）
 mounted(){
    this.init()
     // query 中包含 orderId ,查找orderDetail
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
.order {
    width: 100%;
    height: 100%;
    margin-top: 20px;
    background-color: '#DEE1E6';
    position: relative;

    .orderInfo {
        text-align: left;
        margin-left: 20%;

        .price {
            margin-left: 30px;
            .order_price {
                color: red;
                font-weight: 700;
            }

        }
    }

    .payoff {
        position: absolute;
        right: 20%;
        bottom: 20%;
    }
}
</style>