<template>
  <div>
    <div class="foot">
        <div class="left">
          <div class="cart" @click="showCart" :class="{'cart-cur':allSum}">
            <i class="icon-shopping_cart"></i>
             <span class="num" v-show="allSum">{{allSum}}</span>
          </div>

          <strong class="price">￥{{allPirce}}</strong>
          <p class="text">配送费{{deliveryPrice}}元</p>
        </div>
       <div class="right" :class="{jisun: isjie}">
          <!-- {{minPrice}}元起送 -->
          {{isprice}}
        </div>
    </div>
      <div data-bb="遮罩层" v-show="showcartFlag" @click="showcartFlag = false" class="alertZ"></div>
      <transition name="fade">
        <div class="foot-daitel" v-show="showcartFlag">
          <div class="foot-1">
            <h3>已选商品</h3>
            <span @click="clearGoods">清空</span>
          </div>

          <ul class="foot-2">
            <li v-for="item in selecALL">
              <span class="name">{{item.name}}</span>
              <span class="price">￥{{item.price}}</span>
             <!--  <p>:foods="food"我是一个组件</p> -->
              <v-addCart :fonds="item"></v-addCart>
            </li>
          </ul>
        </div>
        </transition>
    </div>
</template>


<style lang="less" scoped>
  .alertZ{
  position: fixed;
  height: 100%;
  left:0px;
  top: 0px;
  width: 100%;
  background: #000;
  opacity: 0.8;
}
  .foot-daitel{
    position: fixed;
    left: 0px;
    bottom: 0px;
    width: 100%;
    background: #fff;
    z-index: 1;
    min-height: 200px;
    overflow: hidden;
    .foot-1{
      background: #edeef2;
      line-height: 1.8rem;
      height: 1.8rem;
      display: flex;
      justify-content: space-between;
      padding: 0px 0.7rem;
      font-size: 0.7rem;
      font-weight: normal;
      border-bottom: 1px solid #ccc;
      color: #737574;
      h3{
        font-size: 0.7rem;
        margin: 0;
      }
    }
    .foot-2{
      color: #333333;
      
      font-size: 0.8rem;
      li{
        display: flex;
        width: 92%;
        padding:1rem 0;
        margin: 0rem 4%;
        justify-content: space-between;
        &+li{
          border-top: 1px solid #ccc;
        }
        .name{
        width: 60%;
        display: block;
        }
        .price{
          padding:0 0.5rem;
          color: #d96d25;
          font-weight: bold;
          font-size: 0.8rem;
        }
      }
    }
  }
  .foot{
    position: fixed;
    left: 0px;
    bottom: 0px;
    width: 100%;
    background: #131d26;
    height: 2.25rem;
    color: #fff;
    display: flex;
    line-height: 2.25rem;
    z-index: 999;
    /* justify-content: space-between; */
    .left{
      display: flex;
      flex: auto;
      .price{
        color: #939297;
        font-size: 0.65rem;
        padding: 0rem 0.65rem;
        position: relative;
        &:after{
          content: "";
          display: block;
          height: 1.6rem;
          width: 1px;
          background: #2c343f;
          position: absolute;
          right: 0;
          top: 0.35rem;
        }
      }
      .text{
        color: #939297;
        padding-left: 0.5rem;
      }

      .cart{
        width: 2rem;
        height: 2rem;
        border-radius: 100%;
        background: #2b343d;
        border:5px solid #131d26;
        position: relative;
        top: -0.5rem;
        text-align: center;
        &.cart-cur{
          background: #2c90e8;
          i{
            color: #fff;
          }
        }
        .num{
          position: absolute;
          top: -0.65rem;
          right: -0.35rem;
          width: 1rem;
          height: 1rem;
          background: -webkit-gradient(linear, left top, right top, from(#ff430d), to(#f96d20));
          background: linear-gradient(left, #ff430d, #f96d20);
          border-radius: 50%;
          font-size: 0.6rem;
          line-height: 1rem;
        }
        i{
          background: transparent;
          margin: auto;
          line-height: 2rem;
          color: #808589;

        }
      }
    }
    .right{
      width: 5.25rem;
      flex: 0 0 5.25rem;
      background: #2b343b;
      display: block;
      height: 100%;
      font-size: 0.65rem;
      font-weight: 600;
      text-align: center;
      line-height: 2.25rem;
      color: #93969b;
       &.jisun{
        background: #4bd865;
        color: #fff;
      }
    }
  }

    .fade-enter-active, .fade-leave-active {
      transition: all 1s
    }
    .fade-enter, .fade-leave-to /* .fade-leave-active in below version 2.1.8 */ {
      bottom: -150px;
    }
</style>

<script type="es6">
import "../common/css/style.css";
import addCart from './addCart.vue'
export default {
  props:["selecALL","minPrice","deliveryPrice"],
  data () {
    return {
      isjie:false,
      showcartFlag:false
    }
  },
  components:{ // 这里注册后可以直接  使用标签 引用 组件
    'v-addCart': addCart,
  },
  computed:{
    //计算总价
    allPirce(){
      var sum=0;
      for(var i=0; i<this.selecALL.length; i++){
        sum+= this.selecALL[i].count * this.selecALL[i].price
      }
      return sum;
    },
     //商品总数
    allSum(){
      let sum=0;
      for(let i=0; i<this.selecALL.length; i++){
        sum+= this.selecALL[i].count
      }

      return sum
    },
    //是否起送
    isprice(){
      //1.默认是20元起送
      if(!this.selecALL.length){
        this.isjie=false;
        return '20元起送'
      }
      else if(this.minPrice > this.allPirce){
        //2.还差多钱起送
        this.isjie=false;
        return `还差￥${this.minPrice - this.allPirce}起送`
      }
      else{
        //3. 去结算
        this.isjie=true;
        return "去结算"
      }
      
      
    }

  },
  methods:{
    showCart(){
    if(!this.selecALL.length) return;
    this.showcartFlag=!this.showcartFlag
    },
    clearGoods(){
      this.selecALL.forEach((food)=>{
        food.count=0;
      })
      this.showcartFlag=false;
      this.$emit('child-say');
    },
  }

}
</script>
