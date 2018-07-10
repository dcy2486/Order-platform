<template>
  <div class="start">
    <span :class="getClass[index]" v-for="(item,index) in getClass"></span>
  </div>
</template>

<script type="es6">
export default {
  props: ["score"],
  data () {
    return {
      msg: '我的第一个'
    }
  },
  computed:{
    getClass(){
      var arrclass=[];
      //1.得到评分
      var scoreQ=Math.floor(this.score*2)/2;

        //2.全星有几个
        for(var i=0;i<Math.floor(scoreQ);i++){
          arrclass.push("qx");
        }
      //3.半心只有一个
      if(scoreQ%1!==0){
        arrclass.push("bx");
      }
      while (arrclass.length<5){
        arrclass.push("mx");
      }
      return arrclass;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  @import '../common/less/main_icon.less';
  .start{
    display: flex;
    span{
      width: 1.5rem;
      height: 1.5rem;
      display: block;
      background: #fff;
      .bg-img('/static/img/star48_on');
      background-size: cover;
      &.bx{
        .bg-img('/static/img/star48_half');
        background-size: cover;
      }
      &.mx{
        .bg-img('/static/img/star48_off');
        background-size: cover;
      }
    }
  }

</style>
