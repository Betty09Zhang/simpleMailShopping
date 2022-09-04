<!--  -->
<template>
<div class="main_container">
    <div class="navleft_container">
        <div  @mouseleave="closeSuperior" class="left_list">
           
            <ul v-for="(item,index) in topList" :key="index">
                <li @mouseenter="getSuperiorListByParent(item.categoryId, index)" :id=" 'data_' + item.categoryId " class="list_category">{{item.categoryName}}</li>
            </ul>
           
            <div v-if="categoryId && superiorShow" class="superior_list">
                <dl  v-for="(item,index) in superiorList[categoryId]" :key="index+ '_'+item" class="list">
                    <dt @click="productList(item.categoryId)">{{item.categoryName}}</dt>
                    <dd v-for="(superiorItem,index) in filterData(item.categoryId)" :key="index">
                        <a href="#" @click="productList(item.categoryId)">{{superiorItem.categoryName}}</a>
                    </dd>
                </dl>
            </div>
        </div>
        
        <div class="swiper_container">
            <el-carousel :interval="5000" arrow="always">
                <el-carousel-item v-for="item in swiperURL" :key="item">
                    <img :src="item"/>
                </el-carousel-item>
            </el-carousel>
        </div>
    </div>
    
    <div class="mail_tips">
        <div  v-for="(item,index) in categoryList" :key="index">
            <a class="box" href="javascript:void 0;" style="text-decoration: none;">
                 <img :src="item.imgUrl"/>
                <span>{{item.name}}</span>
            </a>
            
        </div>
    </div>
    
    <div class="love_floor">
        <span class="goods_header">商品推荐</span>
        <div class="floor_container" style="border-top:1px #f0f2f5 solid" id="goods_container">
            <ul class="rec_goods_list clearfix">
                <li v-for="item in recommandGoods" :key="item.productId" @click="$router.push({path:'/productDetail',query:{id:item.productId}})">
                    <a  class="redirect_URL" style="text-decoration: none;color:#475669">
                        <img src="" alt="" :data-src="item.imgUrl" class="imgRecommands" v-lazy>
                        <span>{{item.categoryId}}</span>
                        <div class="product_info">{{item.name}}</div>
                        <div class="product_price">${{item.productPrice}}</div>
                    </a>
                </li>
            </ul>
        </div>
    </div>
    <div v-if="loading">...loading</div>
    
</div>

  
</template>

<script>
import axios from '../../utils/axios'
// import { getCategoryList } from '../../service/home'
// import {throttle} from '../../utils/utils'
// import NavLeft from './NavLeft.vue'
export default {
 name: 'Content',
 components: {
    // NavLeft
 },
 data () {
    return {
        swiperURL: ['https://m.360buyimg.com/mobilecms/s700x280_jfs/t1/116538/28/24056/324113/61a14a14E600cba7f/474890406001ba58.jpg!cr_1125x449_0_166!q70.jpg.dpg',
        'https://m.360buyimg.com/mobilecms/s700x280_jfs/t1/209174/34/10746/231785/61a12e65Edf61ac50/394b863de064faeb.jpg!cr_1125x449_0_166!q70.jpg.dpg',
        'https://m.360buyimg.com/mobilecms/s700x280_jfs/t1/197941/10/17639/71732/6195f90cE2c6d181c/e7745d5ea7805990.jpg!cr_1053x420_4_0!q70.jpg.dpg',
        'https://m.360buyimg.com/mobilecms/s700x280_jfs/t1/212695/20/5658/100506/619de796E55af0a41/d23e06bea38dccb9.jpg!cr_1053x420_4_0!q70.jpg.dpg'],
        categoryList: [
            {
                name: '新蜂超市',
                imgUrl: '//s.weituibao.com/1583585285461/cs.png',
                categoryId: 100001
            }, {
                name: '新蜂服饰',
                imgUrl: '//s.weituibao.com/1583585285468/fs.png',
                categoryId: 100003
            }, {
                name: '全球购',
                imgUrl: '//s.weituibao.com/1583585285470/qq.png',
                categoryId: 100002
            }, {
                name: '新蜂生鲜',
                imgUrl: '//s.weituibao.com/1583585285472/sx.png',
                categoryId: 100004
            }, {
                name: '新蜂到家',
                imgUrl: '//s.weituibao.com/1583585285467/dj.png',
                categoryId: 100005
            }, {
                name: '充值缴费',
                imgUrl: '//s.weituibao.com/1583585285465/cz.png',
                categoryId: 100006
            }, {
                name: '9.9元拼',
                imgUrl: '//s.weituibao.com/1583585285469/pt.png',
                categoryId: 100007
            }, {
                name: '领劵',
                imgUrl: '//s.weituibao.com/1583585285468/juan.png',
                categoryId: 100008
            }, {
                name: '省钱',
                imgUrl: '//s.weituibao.com/1583585285471/sq.png',
                categoryId: 100009
            }, {
                name: '全部',
                imgUrl: '//s.weituibao.com/1583585285470/qb.png',
                categoryId: 100010
            }
        ],
        recommandGoods:[],
        superiorList: {},
        topList: [],
        categoryId: null,
        index: null,
        categories: [],
        pageCur: 1,
        pageSize: 4,
        total: null,
        pageNum: null,
        loading: true

    }
 },
 mounted() {
    // const {data:{data}} = await getReCommands()
    // const _this = this
    // const resp = await getCategoryList()
    // if (resp.status == 200) {
    //     this.categories = resp.data
    //     this.splitCategoriesByLevel(resp.data) 
    // }
    // console.log('resp； ',resp);
    // console.log('this： ', this)
    // const { data: { data, meta }}  = await this.getGoodsList(this.pageSize,this.pageCur)
    // this.loading = false
    // this.recommandGoods = data
    // this.total = meta.total
    // this.pageNum = Math.ceil(this.total / this.pageSize)

    this.recommandGoods = [
        {
                name: '新蜂超市',
                imgUrl: '/image/1.jpeg',
                categoryId: 100001
            }, {
                name: '新蜂服饰',
                imgUrl: '/image/2.jpeg',
                categoryId: 100003
            }, {
                name: '全球购',
                imgUrl: '/image/3.jpeg',
                categoryId: 100002
            }, {
                name: '新蜂生鲜',
                imgUrl: 'image/4.jpeg',
                categoryId: 100004
            }, {
                name: '新蜂到家',
                imgUrl: '/image/5.jpeg',
                categoryId: 100005
            }, {
                name: '充值缴费',
                imgUrl: '/image/6.jpeg',
                categoryId: 100006
            }, {
                name: '9.9元拼',
                imgUrl: '/image/7.jpeg',
                categoryId: 100007
            }, {
                name: '领劵',
                imgUrl: '/image/8.jpeg',
                categoryId: 100008
            }, {
                name: '省钱',
                imgUrl: '/image/9.jpeg',
                categoryId: 100009
            }, {
                name: '全部',
                imgUrl: '/image/10.jpeg',
                categoryId: 100010
            }
    ]

    /**
     * 监听当前窗口滚动条的滚动事件
     */
    // const _this = this
    // document.addEventListener('scroll', throttle(_this.loadingImg.bind(this
    // ), 200), false)
    /**
     * 利用IntersectionObserver 观察目标进入视口，替换src
     */
    // this.$nextTick(() => {
    //     this.intersectionObserver()
    // })  
 },
 computed: {
    filterData() {
        return function(id) {
            return this.categories.filter(item => item.parentId == id)       
        }
    }
 },

 //方法集合
 methods: {
    intersectionObserver () {
        const imgs = document.querySelectorAll('.imgRecommands')
      
        var observer = new IntersectionObserver(function(entries) {
            if (entries[0].intersectionRatio <= 0) return;
            entries.forEach((entry) => {
                let lazyImage = entry.target;
                // 相交率，默认是相对于浏览器视窗
                if (entry.intersectionRatio > 0) {
                    lazyImage.src = lazyImage.getAttribute('data-src');
                    // 当前图片加载完之后需要去掉监听
                    observer.unobserve(lazyImage);
                }
            })
            // loadItems(10);
            console.log('Loaded new items');
        })

        imgs.forEach(img => {
            observer.observe(img)
        })  
    },
    viewport (el) {
        const viewHeight = document.documentElement.clientHeight
        // const viewHeight = view.clientHeight
       const re = el.getBoundingClientRect()
        if (re.top <= viewHeight ) {
            el.src = el.getAttribute('data-src')

        }
    },
    loadingImg () {
        const _this = this
        const imgArr = document.querySelectorAll('.imgRecommands')
        imgArr.forEach(function(ele){
            _this.viewport(ele)
        })
    },
    async getGoodsList(pageSize, pageNumber) {
        return await axios.get('/product/findByPagination', {
            params: {
                pageSize,
                pageNumber
            }
        }) 
    },
    async scrollAndLoading () {
        // 滚动条
        const scrollTop = document.documentElement.scrollTop
        // 可视区：
        const clientHeight = document.documentElement.clientHeight
        // 总高度：
        const scrollHeight = document.documentElement.scrollHeight
        if ((scrollTop + clientHeight >= scrollHeight) && this.pageCur < this.pageNum) {
            this.loading = true
            this.pageCur++
            const { data:{data}}  = await this.getGoodsList(this.pageSize, this.pageCur)
            console.log('data: ', data)
            if (data.length>0) {
                this.loading = false
                this.recommandGoods.push(...data)
            } 
            console.log('recommandGoods: ', this.recommandGoods)
        } 
    },
    goToDetailProduct(categoryId) {
        this.$router.push({ name: '/productDetail', params: { id: categoryId}})
    },
    filterCategory(arr, id ){
        const target = arr.filter(item => item.parentId == id)
        return target.length >0 ? target[0]: {}
    },
    splitCategoriesByLevel (list) {
        this.topList = list.filter(function(item){
            if(item.parentId == 0 ) {
                return true;
            }
        })
        console.log('this.topList； ',this.topList);
    },
    getSuperiorListByParent(categoryId, index) {
        // const oldIndex = this.index
        // const $elLi = document.getElementById("data_"+categoryId)
        // if (oldIndex) arr[oldIndex].classList.remove("enter_list")
        const _this = this
        let arr = document.getElementsByClassName("list_category")
        this.$nextTick(() => {
            for (let i =0 ;i < arr.length;i++) {
                arr[i].classList.remove("enter_list")
            }
            arr[index].classList.add("enter_list")    
            _this.index = index
            _this.superiorShow = true
            _this.categoryId = categoryId 
            
           
            if (_this.superiorList[categoryId]) return _this.superiorList[categoryId]
    
            _this.superiorList[categoryId] = _this.categories.filter(function(item){
                if (item.parentId === categoryId) {
                    return true
                }
            })  
        
        })
       
    },
    // getCategoryList (id) {
    //     return new Promise((resolve) => {
    //         axios.get('/categories/findByPagination', {
    //             pageSize: 1000,
    //             parentId: id
    //         }).then(resp => {
    //             resolve(resp)
    //         })
    //     })
    // },
    closeSuperior() {
        this.categoryId = null
        this.superiorShow = false
        // const $elLi = document.getElementById("data_"+categoryId)
        let arr = document.getElementsByClassName("list_category")
        this.$nextTick(() => {
            for (let i =0 ;i < arr.length;i++) {
                arr[i].classList.remove("enter_list")
            }
        })
    },
    productList(categoryId) {
        this.$router.push({
            path: '/productList',
            query: {
               categoryId
            }
        })
    }
 },

 //生命周期 - 创建完成（可以访问当前this实例）
 created(){

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
.enter_list {
    background-color: #323D43;
}
.main_container {
    position: relative;
    width: 60%;
    padding-top: 10px;
    // margin-top: 60px;
    margin: 0 auto;
    // display: flex;
    // justify-content: center;
    // flex-direction: row;
    .navleft_container {
        position: relative;
        // margin-top: 10px;
        // height: 300px;
        background-color: red;
        display: flex;
        width: 100%;
        margin: 0;
        padding: 0;
        .left_list {
            // display: inline-block;
            background-color: black;
            text-align: left;
            color: #ffffff;
            // display: flex;
            // flex-direction: row;
            
            width: 150px;
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            ul {
                list-style: none;
                margin: 0;
                padding: 0;
                text-align: center;
                li {
                    // margin: 10px 0;
                    padding: 7px 0;
                    border-bottom: 1px solid #ffffff;
                }
            }
        }
        .superior_list {
            position: absolute;
            left: 136px;
            background-color: #ffffff;
            width: 60%;
            top: 0;
            height: 300px;
            z-index: 9999;
            display: flex;
            color: #323D43;
            flex-direction: column;
            .list {
                dd {
                    display: inline; 
                    margin: 5px 5px;
                    padding: 5px 5px;
                }
               
                text-align: left;
                margin: 0;
                padding: 8px 5px;  
                :hover {
                    color:red

                } 
            }
            
            
        }  
    }
}
.swiper_container {
    // position: absolute;
    // top: 10px;
    // left: 150px;
    height: 300px;
    width: 600px;
    // margin-right: 200px;
}
 .el-carousel__item img {
    width: 600px;
    color: #475669;
    font-size: 18px;
    opacity: 0.75;
    // line-height: 470px;
    height: 300px;
    margin: 0;
  }
  
//   .el-carousel__item:nth-child(2n) {
//     background-color: #99a9bf;
//   }
  
//   .el-carousel__item:nth-child(2n+1) {
//     background-color: #d3dce6;
//   }
.mail_tips {
    display: flex;
    width: 100%;
    flex-wrap: wrap;
    // flex-shrink: 0;
    padding-bottom: 13px;
    background-color: #F6F6F6;
    div{
        display: flex;
        width:20%;
        flex-direction: column;
        margin:15px auto;
        img {
            width: 40px;
            height: 40px;
            margin: 13px auto 13px auto;
            display: block;
        }
    }
} 
.box {
    display: block;
    color: #475669;  
}
.love_floor {
    width: 100%;
    position: relative;
    margin-bottom: 20px;
    .goods_header {
        background: #f9f9f9;
        height: 50px;
        line-height: 50px;
        font-size: 16px;
        font-weight: 500;
    }
    .floor_container {
        // width: 100%;
        // height: 100%;
        // display: flex;
        position: relative;
        justify-content: flex-start;
        flex-wrap: wrap;
        margin: 10px 10px;
        .rec_goods_list {
            list-style: none;
            display: inline-block;
            margin: 0;
            
            padding: 0px;
            vertical-align: baseline;
            li {
                width: 50%;
                display: inline-block;
                 border-bottom: 1PX solid #e9e9e9;
                // float: left;
                box-sizing: border-box;
                // background-color: red;
                .redirect_URL {
                    // display: block;
                    img {
                    // width: 100px;
                    // height: 100px;
                    // background-color: black;
                    display: block;
                    width: 120px;
                    margin: 0 auto;

                    }
                    text-align:center;
                    // .product_info {
                    //     white-space: pre-wrap;
                    // }
                    .product_price {
                        text-align: center;
                        padding: 10px 10px;
                    }

                }
                &:nth-child(2n + 1) {
                    border-right: 1PX solid #e9e9e9;
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
    .imgRecommands {
        width: 200px;
        height: 200px;
        display: block;
    }
}
</style>