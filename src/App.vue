<template>
  <div id="app">
    <header-f :seller="seller"></header-f>
    <ul class="list11 getnavheight">
      <li><router-link to="/">商品</router-link></li>
      <li><router-link to="/rating">评价</router-link></li>
      <li><router-link to="/seller">商家</router-link></li>
    </ul>
    <div class="appContent">
        <router-view :goods="goods" :seller="seller"></router-view>
    </div>
  </div>
</template>

<script type="es6">
import './common/less/main.less'

import headerF from './components/header.vue'
import goods from '@/components/goods.vue'
import rating from '@/components/rating.vue'
import seller from '@/components/seller.vue'
export default {
  name: 'app',
  data () {
    return {
      a:11,
      seller:{},
      goods:[]
    }
  },
  components:{
    headerF:headerF
  },
  component:{
    goods,
    rating,
    seller
  },
  created:function(){//打开页面执行
    this.init();

  },
  methods:{
    init(){
             // axios  vue-resource
        //1.安装vue-resource
        //1. 在 m1ain.js 导入进来
          // 在config / index.js 去配置
        //2.请求数据
      this.$http.get('/api/laji/data.txt').then(function(res){
      this.seller=JSON.parse(res.bodyText).seller;
      this.goods=JSON.parse(res.bodyText).goods;
      })

 
    }
  }
}
</script>

<style lang="less" scope>
#app {
   ul.list11{
      display: flex;
      text-align: center;
      background: #fff;
      height: 40px;
      border-bottom: 1px solid #e5e5e5;
      margin:0;
      li{
        flex:auto;
        a{
          color: #41464c;
          text-decoration: none;
          line-height: 40px;
          font-size:14px; 
          height: 14px;
          &.router-link-exact-active{
            color: red;
          }
        }
     }
  }
}
</style>
