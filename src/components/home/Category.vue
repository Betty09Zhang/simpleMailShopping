<!--  -->
<template>
<div class="category_container">
    <Header>
       <template slot="leftOpr">
         <i class="el-icon-arrow-left"></i>
       </template>
    </Header>
    <div class="category_list">
        <ul>
            <li>10</li>
            <li>10</li>
            <li>10</li>
            <li>10</li>
            <li>10</li>
            <li>10</li>
            <li>10</li>
            <li>10</li>
            <li>10</li>
            <li>10</li>
            <li>10</li>
            <li>10</li>
            <li>10</li>
            <li>10</li>
            <li>10</li>
            <li>10</li>
            <li>10</li>
            <li>10</li>
            <li>10</li>
            <li>10</li>
            <li>10</li>
            <li>10</li>
            <li>10</li>
            <li>10</li>
            <li>10</li>
            <li>10</li>
            <li>10</li>
            <li>10</li>
            <li>10</li>
            <li>10</li>
        </ul>
    </div>
</div>

</template>

<script>
import Header from '../header/Header.vue'
export default {
 name: 'Category',
 components: {
    Header
 },
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
.category_container {
    position: relative;
    width: 100%;
    height: 100%;
    .category_list {
        // margin-top: 60px;
        background-color: black;
        font-size: 14px;
        height: calc(100% - 60px);
        ul {
            margin: 0;
            padding: 0;
            list-style: none;
        }
    }
}

</style>