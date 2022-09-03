
<!--  -->
<template>
 <div>
     支付成功！
 </div>
</template>

<script>
import {updateOrderStatus} from '../../service/order'
export default {
 data () {
  return {
  }
 },

 //方法集合
 methods: {

 },

 //生命周期 - 创建完成（可以访问当前this实例）
 created(){

 },

 //生命周期 - 挂载完成（可以访问DOM元素）
 async mounted(){
     // 更新支付状态
    const {orderId, status, userId } = this.$route.query
    await updateOrderStatus({
        orderId,
        status,
        userId  
    })
     // 3s 钟跳转到首页
     // 后端通知下游仓库系统  出库，（省略退货、发货邮寄业务场景）更新商品数量
    // await notifyWareHouse({
    //     params: {
    //         orderDetail
    //     }
    // })
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
<style lang='scss' scoped>
</style>