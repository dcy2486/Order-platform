<template>
    <div class="addCart">
      <div class="box" v-show="count" @click="reduce">
        <i class="icon-remove_circle_outline"></i>
        <div class="count">{{count}}</div>
      </div>
      <i class="icon-add_circle" @click="plus"></i>
    </div>
</template>


<style lang="less" scoped>
  /* @import "../common/css/style.css"; */
  .addCart{
    display: flex;
    font-size: 0.7rem;
    color: #666;
     .box{
      display: flex;
    }
    .count{
      padding: 0px 0.2rem;
    }
    i{
      font-size: 0.9rem;
      color: #00a0dc;
    }
  }
</style>

<script type="es6">
import "../common/css/style.css";
import Vue from 'vue'
export default {
  props:["foods"],
  data () {
    return {
      msg: '我的一第一个',
      // flag:false
      count:0
    }
  },
  methods:{
   // 加加
    plus(){  
      //Vue.set( this.foods, count, this.count )
     if (!this.foods.count) {
          Vue.set( this.foods, "count", 1 );
          this.count=1;
      }
      else{
        this.count++;
        Vue.set( this.foods, "count", this.count );
      }
    },
    // 减减
    reduce(){
      if(this.count==0) return;
      this.count--;
      Vue.set( this.foods, "count", this.count );
      //数据如何到 foot组里面去
      //set 方法
    }
  }
}
</script>