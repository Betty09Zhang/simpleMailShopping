<!--  -->
<template>
    <div class="container">
        <Header :placeholder="search">
            <template slot="leftOpr">
               <img  src="../../public/1.jpg" class="logo"/>
            </template>
            <template slot="rightOpr">
                <div class="rightOpr">
                    <span @click="gotoLogin">登录</span>
                    <el-divider direction="vertical"></el-divider>
                    <span @click="gotoLogin">注册</span>
                </div>
            </template>
        </Header>
        <div class="product_container">
            <div class="category">
                <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item>商品详情</el-breadcrumb-item>
                </el-breadcrumb>
            </div>
            <div class="love_floor">
                <div class="floor_container">
                    <ul class="rec_goods_list clearfix">
                        <li v-for="item in goods" :key="item.productId">
                            <a href="#" class="redirect_URL" style="text-decoration: none;color:#475669">
                                <img :src="item.productImg | prefix" alt="" class="clearfix">
                                <span class="product_price"><strong>${{item.productPrice}}</strong></span>
                                <span class="product_info">{{item.productName}}</span>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { getProduct, getProductListByCategory } from '../../service/good'
import Header from '../header/Header.vue'
export default {
 name: 'ProductList',
 components: {
    Header
 },
 data () {
    return {
        goods: [],
        search: ''
    }
 },

 //方法集合
 methods: {
    gotoLogin () {
        this.$router.push({
        path: '/login'
        }) 
    }
 },

 //生命周期 - 创建完成（可以访问当前this实例）
 created(){

 },

 //生命周期 - 挂载完成（可以访问DOM元素）
async mounted(){
    // const {data:{data}} = await getReCommands()
    // this.recommandGoods = data.recommendGoodses
    const  {name, categoryId} = this.$route.query
    if (name) {
        const {data, status} = await getProduct({
            params: {
                name
            }
        })
        if (status == 200 && data.length > 1) {
            this.search = name
            this.goods = data[0]
        }
    } else if (categoryId){
        const {data, status} = await getProductListByCategory({
            params: {
               categoryId
            }
        })
        if (status == 200) {
            this.goods = data
        }
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
<style lang='less' scoped>
.container {
    width: 100%;
    height: 100%;
    margin: 0 auto;
    position: relative;

    .product_container {
        width: 60%;
        height: calc(100vh - 220px);
        background-color: red;
        margin: 18px auto;
        .category{
            font-size: 30px;

        }
         .floor_container {
        // width: 100%;
        // height: 100%;
        // display: flex;
        // position: relative;
            justify-content: flex-start;
            flex-wrap: wrap;
            margin: 10px 10px;
            .rec_goods_list {
                list-style: none;
                // display: inline-block;
                display: flex;
                margin: 20px;
                padding: 0px;
                // vertical-align: baseline;
                li {
                    width: 20%;
                    display: inline-block;
                    // border-bottom: 1PX solid #e9e9e9;
                    // float: left;
                    box-sizing: border-box;
                    // background-color: red;
                    margin-right: 20px;
                    .redirect_URL {
                        display: block;
                        img {
                        // width: 100px;
                        // height: 100px;
                        // background-color: black;
                            display: block;
                            width: 120px;
                            margin: 0 auto;
                        }
                        text-align:center;
                        .product_info {
                            // white-space: pre-wrap;
                            // text-align: center;
                            text-overflow:ellipsis;
                            display: block;
                            font-size: 12px;
                        }
                        .product_price {
                            // text-align: center;
                            // padding: 10px 10px;
                        }

                    }
                
                }
            }
        }  
        .clearfix{
            &:after{
                content:" ";
                clear:both;
                display:block;
                visibility:hidden;
            }
            zoom: 1;
        }
    }

    .rightOpr {
        line-height: 44px;
    }
}
.logo {
    display: block;
    margin: 0 20px;
    width: 42px;
    height: 42px;
}
</style>