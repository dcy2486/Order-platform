<template>
	<div>
	<div class="head getheadHeight" v-if="seller.supports">
		<!-- 防止报错 -->
		<div class="top-content">
			<div class="left">
				<img src="http://static.galileo.xiaojukeji.com/static/tms/seller_avatar_256px.jpg" alt="">
			</div>
			<div class="right">
				<div class="p1">
					<span class="icon-brand"></span>
					<h2>{{seller.name}}</h2>
				</div>
					<p class="p2">{{seller.description}},{{seller.deliveryTime}}分钟送达</p>
				<div class="p3">
					<span class="icon-decrease"></span>
					<p>{{seller.supports[0].description}}</p>
					<div class="num">
						<span>5个</span>
					</div>
				</div>
			</div>
		</div>
		<div class="foot" @click="detailOff = true">
				<span class="icon-bulletin"></span>
				<p>粥品香坊其烹饪粥料的秘方源于中国千年古法</p>
				<i class="icon-jt"></i>
		</div>
	</div>
	<div class="datail" v-show="detailOff">
		<div class="main">
			<h2>{{seller.name}}</h2>
			<start v-bind:score="4.6"></start>
			<div class="title">
				<div class="line"></div>
				<h2>优惠信息</h2>
			</div>
			<ul class="list">
				<li v-for="item in seller.supports">
					<span :class="iconClass[item.type]"></span>
					<p>{{item.description}}</p>
				</li>
				<!-- <li>
					<span class="icon-discount"></span>
					<p>{{seller.supports[1].description}}</p>
				</li>
				<li>
					<span class="icon-discount"></span>
					<p>{{seller.supports[2].description}}</p>
				</li>
				<li>
					<span class="icon-special"></span>
					<p>{{seller.supports[3].description}}</p>
				</li>
				<li>
					<span class="icon-special"></span>
					<p>{{seller.supports[4].description}}</p>
				</li> -->
			</ul> 
			<div class="title1">
				<div class="line"></div>
				<h2>商家公告</h2>
			</div>
			<p>{{seller.bulletin}}</p>
		</div>
		<div class="colose" @click="detailOff=false">x</div>
	</div>
	</div>
</template>

<script type="es6">
	import start from './start.vue'
	export default {
		props:["seller"],
	  data () {
	    return {
	      msg: '我是头部组件',
	       iconClass:["icon-decrease","icon-discount","icon-special","icon-invoice","icon-guarantee"],
	       detailOff:false
	    }
	  },
	  components:{
	  	start
	  }
	}
</script>

<style lang="less" scope>
	@import '../common/less/main_icon.less';
	.head{
		background: #4b4b4b;
		color: #fff;
		overflow: hidden;
		span[class^="icon-"],i[class^="icon-"]{
			width: 0.8rem;
			height: 0.8rem;
			display: block;
			background: #fff;
		}
	}
	.head *{
		margin: 0;
	}
	.top-content{
		display: flex;
		margin-bottom: 0.9rem;
		margin-top: 1.2rem;
		.left{
			width: 3.2rem;
			height: 3.2rem;
			border-radius: 0.4rem;
			overflow: hidden;
			margin: 0rem 0.6rem 0rem 1.2rem;
			img{
				width: 100%;
				height: 100%;
			}
		}
		.right{
			flex:auto;
			margin-right: 0.6rem;
			overflow: hidden;
			.p1{
				display: flex;
				align-items: center;
				h2{
					font-size: 0.8rem;
					line-height: 0.9rem;
					flex:auto;
					margin-left: 0.4rem;
					white-space: nowrap;
					overflow: hidden;
					text-overflow: ellipsis;
				}
				.icon-brand{
					.bg-img("/static/img/brand");
					background-size: cover;
					width: 1.5rem;
					flex: 0 0 1.5rem;
					height: 0.9rem;
				}
			}
			.p2{
				font-size: 0.6rem;
				font-weight: 200;
				line-height: 0.8rem;
				margin-top: 0.6rem;
				white-space: nowrap;
				overflow: hidden;
				text-overflow: ellipsis;
			}
			.p3{
				font-size: 0.5rem;
				font-weight: 200;
				margin-top: 0.4rem;
				display: flex;
				align-items: center;
				.icon-decrease{
					.bg-img("/static/img/decrease_2");
					background-size: cover;
				}
				&>p{
					flex:auto;
					white-space: nowrap;
					overflow: hidden;
					text-overflow: ellipsis;
				}
				.num{
					background: #4d5055;
					padding: 0.35rem 0.4rem;;
					border-radius: 0.5rem;
					display: flex;
				}
			}
		}
	}
	.foot{
		display: flex;
		align-items: center;
		background: rgba(0,0,0,.5);
		height: 1.4rem;
		padding:0rem 0.6rem;
		p{
			font-size: 0.6rem;
			margin: 0rem 0.2rem;
		}
		span{
			&.icon-bulletin{
				.bg-img("/static/img/bulletin") !important;
				background-size:cover !important;
				width: 1.5rem;
				flex:0 0 1.5rem;
			}
		}
		
	}
	body{
		min-height: 100%;
		display: flex;
		flex-direction: column;
	}
	.datail *{
		margin: 0;
	}
	.datail{
		z-index: 999999;
		color: #fff;
		position: fixed;
		top:0px;
		left:0px;
		min-height:100vh;
		width: 100%;
		background:rgba(0, 0, 0, 0.7);
		display:flex;
		flex-direction:column;
		.main{
			flex:auto;
			margin: 2.5rem 2rem;
			line-height: 2rem;
			.start{
				margin-left: 3rem;
				margin-top: 0.3rem;
				margin-bottom: 0.3rem
			}
			
			h2{
				text-align: center;
			}
			.list{

				margin-top: 1rem;
				li{
					display: flex;
					margin-top: 0.5rem;
					line-height: 1.2rem;
				.icon-decrease{
					.bg-img("/static/img/decrease_1") !important;
					background-size:cover !important;
					width: 1.2rem;
					height: 1.2rem;
					flex:0 0 1.2rem;
				}
				.icon-discount{
					.bg-img("/static/img/discount_1") !important;
					background-size:cover !important;
					width: 1.2rem;
					height: 1.2rem;
					flex:0 0 1.2rem;
				}
				.icon-special{
					.bg-img("/static/img/special_1") !important;
					background-size:cover !important;
					width: 1.2rem;
					height: 1.2rem;
					flex:0 0 1.2rem;
				}
				.icon-invoice{
					.bg-img("/static/img/invoice_1") !important;
					background-size:cover !important;
					width: 1.2rem;
					height: 1.2rem;
					flex:0 0 1.2rem;
				}
				.icon-guarantee{
					.bg-img("/static/img/guarantee_1") !important;
					background-size:cover !important;
					width: 1.2rem;
					height: 1.2rem;
					flex:0 0 1.2rem;
				}
				p{
					font-size: 0.5rem;
					margin-left: 0.2rem;

				}
				
				}

			}
			.title,.title1{
					.line{
						width: 100%;
						border: 1px solid #62666f;
						margin-top: 1.5rem;
					}
					h2{
						font-size: 1.3rem;
						margin-top: -1rem;
					}
			}
			.start{
				span{
					margin:0px 0.2rem;
				}
			}
			p{
			font-size: 0.5rem;
			line-height: 1rem;
			color: #d3d7d6;
			}
			
		}
		
		.colose{
			width: 80%;
			margin:0.8rem auto;
			text-align: center;

		}
	}
	@media (max-height: 500px){
			.datail .main{
				 margin: 1rem 2rem;
			}
		}
</style>

