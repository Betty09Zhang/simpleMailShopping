<!--  -->
<template>
    <div class="nav">
        <div class="copyright_info">
                <p>
                    <a href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=11000002000088" target="_blank">京公网安备 11000002000088号</a><span class="copyright_split">|</span><span><a href="http://beian.miit.gov.cn" target="_blank">京ICP备11041704号</a></span><span class="copyright_split">|</span>
                <p>
                    <a href="//img10.360buyimg.com/ling/jfs/t1/164806/19/5070/567736/6017d6d6Eab06ec9c/d8ca6e029f495447.jpg" target="_blank">网络文化经营许可证京网文[2020]6112-1201号</a><span class="copyright_split">|</span><span>违法和不良信息举报电话：4006561155</span></p>
                <p><span class="copyright_text">Copyright © 2004 - <em id="copyright_year">2022</em> 版权所有</span><span class="copyright_split">|</span><span>消费者维权热线：4006067733</span>
                    <a href="//pro.jd.com/mall/active/38PitHBfR7ZopNHRSHnuuWR5AMDL/index.html" target="_blank" class="copyright_license">经营证照</a>
                    <span class="copyright_split">|</span>
                    <span>(京)网械平台备字(2018)第00003号</span>
                    <span class="copyright_split">|</span>
                    <a href="//img14.360buyimg.com/ling/jfs/t1/174269/9/9343/427804/609cfd9fE45ac1f13/7b439af70aad11cc.jpg" target="_blank" class="mod_business_license">营业执照</a>
                </p>
            </div>
    </div>
</template>

<script>
export default {
 name: 'NavBar',
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
<style lang='less'>
    .nav {
        // height: 60px;
        // line-height: 40px;
        // position: absolute;
        // bottom: 0px;
        background-color: red;
        width: 100%;
        padding-bottom: 10px;
        font-size: 14px;

        .copyright_info a {
            text-decoration: none;
            color: #999;
        }

        .copyright_split {
            margin: 0 6px;
            color: #ccc;
        }
    }
</style>