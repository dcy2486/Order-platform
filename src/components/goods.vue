<template>
		<div>
		<div class="goods">
			<div class="left wrapper">
				<ul>
					<li v-for="(item,index) in goods" @click="navLeftclick(index)" :class="{cur: index == currentIndex}">{{item.name}}</li>
				</ul>
			</div>
			<div class="right wrapper">
				<div>
				<div class="food-box" v-for="item in goods">
					<h1 class="title">{{item.name}}</h1>
					<ul>
						<li v-for="food in item.foods">
							<img class="food-left" :src="food.image">
							<div class="food-right">
								<h3>{{food.name}}</h3>
								<span>{{food.description}}</span>
								<p>月销{{food.sellCount}}</p>
								<div class="food-right-box">
									<div class="price">
										<strong>￥{{food.price}}</strong>
									</div>
									<!-- <p>我是一个组件</p> -->
									<v-addCart :foods="food"></v-addCart>
								</div>
							</div>
						</li>
					</ul>
				</div>
				</div>
			</div>	
		</div>
			<v-foot :selecALL="selecALL" :minPrice="seller.minPrice"  :deliveryPrice="seller.deliveryPrice"></v-foot>
	</div>
</template>

<script type="es6">
	import BScroll from 'better-scroll'
	import addCart from './addCart.vue'
	import foot from './foot.vue'
	export default {
		props:["goods","seller"],
	  data () {
	    return {
	      msg: '我是商品组件',
	      arrH:[], //右边滑块的高度
		 		postY:0 //右边滑块的滚动的距离
	    }
	  },
	  components:{ // 这里注册后可以直接  使用标签 引用 组件
			'v-addCart': addCart,
			'v-foot':foot
		},
	 	created:function(){ // 自动执行函数
			var that=this;

			setTimeout(function(){ //回调函数 最后执行
				that._initScroll();
				that.getH(); //右边获取滑块的高度
			},0)
		},
		computed:{
			currentIndex(){
				for(let i=0; i<this.arrH.length; i++){
					let height1 = this.arrH[i];
					let height2 = this.arrH[i+1];

					if(!height2) continue;
					if(this.postY >= height1 && this.postY<height2){
						return i;
					}
				}
				return 0;
			},
			// 加入购物车的数据
			selecALL(){
				var list=[];
				this.goods.forEach(function(item){
					//console.log(item)
					item.foods.forEach(function(food){
						if(food.count){
							//商品有数量的话，我们就要加入购物车
							list.push(food)
						}
					})
				})

				return list;
			}
		},
	  methods:{
	  	_initScroll(){
	  			
				// var o=document.querySelector('.goods .right');//获得元素
				// o.style.height=h+"px";

	  			let wrapper = document.querySelector('.goods .wrapper');
	  			let wrapper1 = document.querySelector('.goods .right.wrapper');

	  			var h= window.screen.height;
	  			let getnavheight = document.querySelector('.getnavheight');
	  			console.log(getnavheight)

	  			let getheadHeight = document.querySelector('.getheadHeight');
	  			console.log(getheadHeight)
	  			var boxheight=h-getnavheight.clientHeight-getheadHeight.clientHeight;
	  			console.log(boxheight)

	  			wrapper.style.height=boxheight-50+"px"
					wrapper1.style.height=boxheight-50+"px"



				//一定要页面加载完后才能取到
				new BScroll(wrapper,{
					click:true
				});
				this.scrollR=new BScroll(wrapper1,{
					click:true,
					probeType:3
				});
				// let scroll = new BScroll(wrapper1);


			//监听滑动事件
				//var that=this;
				this.scrollR.on("scroll",(pos) => {
					this.postY=Math.round(Math.abs(pos.y));
					
				})
	  	},
	  	getH(){
	  		let food_box=document.querySelectorAll('.goods div .food-box');
	  		console.log(food_box)
	  		var height = 0;
	  		this.arrH.push(height);
	  		for(var i=0;i<food_box.length;i++){

	  			height += food_box[i].clientHeight;

	  			this.arrH.push(height);
	  		}
	  	},
	  	navLeftclick(index){
	  		// console.log(111)
	  		let food_box=document.querySelectorAll('.goods .food-box');
	  		this.scrollR.scrollToElement(food_box[index],500);
	  	}
	  }
	}
</script>
<style lang="less">
	.goods{
		display: flex;
		overflow: hidden;
		.left{
			width: 4rem;
			background: #f3f5f7;
			flex: 0 0 4rem;
			height: 317.5px;
			ul{
				margin:0;
				li{
					&.cur{
						background: red;
						}
					font-size: 0.7rem;
					line-height: 0.7rem;
					padding: 1rem 0.5rem 0rem;
					text-align: center;
					&:after{
						content: "";
						display: block;
						width: 90%;
						margin: auto;
						height: 1px;
						background: #c7c7c7;
						margin-top: 1rem;
					}
				}
			}
		}
		.right{
			flex:auto;
			height: 317.5px;
			.food-box{
				.title{
					font-size: 0.7rem;
					color: #93999f;
					padding: 0.5rem 0rem;
					border-left:2px solid #d9dde1;
					text-indent: 0.6rem;
				}
				ul{
					background: #fff;
					overflow: hidden;
					margin:0px;
					li{
						display: flex;
						width: 90%;
						margin:0.9rem auto 0.5rem auto;
						&+li{
							border-top: 1px solid #d9dde1;
							padding-top: 1rem;
						}
						.food-left{
							width: 3rem;
							height: 3rem;
							flex:0 0 3rem;
						}
						.food-right{
							flex:auto;
							margin-top: 0.5rem;
							margin-left: 0.5rem;
							h3{
								margin:0;
								font-size: 0.8rem;
								color: #3a3a3a;
								font-size: 400;
							}
							span,p{
								color: #93999f;
								margin-top: 0.25rem;
								font-size: 0.6rem;
								margin-bottom: 0px;
							}
							.food-right-box{
								margin-top: 0.3rem;
								display: flex;
								align-items: center;
								font-weight: 500;
								font-size: 0.65rem;
								color: red;
								justify-content: space-between;
							}
						}
					}
				}
			}
		}
	}
</style>