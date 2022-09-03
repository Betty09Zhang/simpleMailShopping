<!--  -->
<template>
    <div class="header_container">
        <div class="op_container">
            <slot name="leftOpr"></slot>
            <slot name="center_header">
                <div class="search_goods">
                    <el-input type="text" maxlength="128" @keydown.enter.native="search(searchQuery)" v-model="searchQuery" :placeholder="placeholder"/>
                    <i class="el-icon-search" @click="search(searchQuery)"></i>
                </div>
            </slot>
            <slot name="rightOpr"/>
        </div>  
    </div>
</template>

<script>
export default {
 name: 'Header',
 data () {
    return {
        searchQuery: ''
    }
 },

 //方法集合
 methods: {
    search(value) {
        this.$emit('search', value)
    }

 },
 props: {
    placeholder: {
        type: String,
        default: ''
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
<style lang="less" scope>
 .header_container {
     position: relative;
     top: 0;
     left: 0;
     height: 60px;
     line-height: 60px;
     background-color: red;
     width: 100%;
    display: flex;
    align-items: center;
    z-index: 999;
    
    .op_container {
        position: relative;
        overflow: hidden;
        width: 100%;
        height: 60px;
         display: flex;
        align-items: center;
        // margin-left: 10px;
    }
     i:first-child {
         font-size: 30px;
         margin: 0 15px;
     }
    .search_goods {
         display: flex;
          width: 74%;
        //   height: 20px;
          line-height: 30px;
          margin: 10px 0;
          padding: 5px 0;
          position: relative;
        /deep/.el-input__inner {
            height: 30px;
          color: #232326;
          background: rgba(255, 255, 255, .7);
          border-radius: 20px;
        }
        i {
            position: absolute;
            top: 10px;
            right: 20px;
            font-size: 20px;
        }

    }
    .rightOpr {
        position: absolute;
        font-weight: 700;
        right: 15px;
        width: 10%;
        height: 44px;
        span {
            text-align: left;
        }
    }
   
 }
</style>