<template>
	<div class="goodinfo_continaer" ref="ball">
		<!--运动的小球-->
		<transition
			@before-enter="beforeenter"
			@enter="enter"
			@after-enter="afterenter"
			>
			<div class="ball" v-show="ballFlag"></div>
		</transition>
		<!--商品轮播图区域-->
		<div class="mui-card">
			<div class="mui-card-content">
				<div class="mui-card-content-inner">
					<swiper-box :lunbotuList="lunbotu" :isfull="false"></swiper-box>
				</div>
			</div>
		</div>
		<!--商品购买区域-->
		<div class="mui-card">
				<div class="mui-card-header">{{goodsinfo.title}}</div>
				<div class="mui-card-content">
					<div class="mui-card-content-inner">
						 <p class="price">
						 	市场价：&nbsp;¥&nbsp;<span class="old">{{goodsinfo.market_price}}</span>
						 	销售价：&nbsp;¥&nbsp;<span class="new">{{goodsinfo.sell_price}}</span>
						 </p>
						 <p class="buy">
						 	购买数量： <goodnumbox 
						 		@getcount="getSelectedCount" 
						 		:max="goodsinfo.stock_quantity"
						 		></goodnumbox>
						 </p>
						 <p class="btn">
						 	<mt-button type="primary" size="small">立即购买</mt-button>
						 	<mt-button type="danger" size="small" @click="addToCar">加入购物车</mt-button>
						 </p>
					</div>
				</div>
				
			</div>
		<!--商品参数区域-->
		<div class="mui-card">
				<div class="mui-card-header">商品参数</div>
				<div class="mui-card-content">
					<div class="mui-card-content-inner">
						<p>商品货号：{{goodsinfo.goods_no}}</p>
						<p>库存情况：{{goodsinfo.stock_quantity}}件</p>
						<p>上架时间：{{goodsinfo.add_time}}</p>
					</div>
				</div>
				<div class="mui-card-footer">
					<mt-button type="primary" size="large" plain @click="goDesc(id)">图文介绍</mt-button>
					<mt-button type="danger" size="large" plain @click="goComment(id)">商品评论</mt-button>
				</div>
			</div>
	</div>
</template>

<script>
	import {Toast} from 'mint-ui'
	import moment from 'moment'
	import swiper from '../subcomponents/Swiper.vue'
	import goodnumbox from '../subcomponents/Goodinfonumbox.vue'
	export default{
		data(){
			 return{
			 	id:this.$route.params.id,
			 	lunbotu:[],
			 	goodsinfo:[],
			 	//控制小球的标记
			 	ballFlag:false,
			 	SelectedCount:1
			 }
		},
		created(){
			this.getLunBo()
			this.getgoodsinfo()
		},
		methods:{
			getLunBo(){
				this.$http.get('getthumi.json').then(response => {
					if (response.body.status == 0) {
						response.body.message.forEach(item => {
							item.img = item.src
						})
						this.lunbotu = response.body.message
						console.log(this.lunbotu[0].src)
					}
					//Toast('成功加载数据')	
				},response => {
					Toast('加载数据失败')		
				})
			},
			getgoodsinfo(){
				Toast('加载的ID值为'+this.id)	
				this.$http.get('getgoodsinfo.json').then(response => {
					if (response.body.status == 0) {			
						response.body.message.forEach(item => {
							item.add_time = moment(item.add_time).format('YYYY-MM-DD HH:mm:ss')
						})
						this.goodsinfo = response.body.message[0]
						console.log(this.goodsinfo.id)
					}
				},response => {
					Toast('加载数据失败')		
				})
			},
			//使用编程式导航 跳转图文介绍和商品评论组件
			goDesc(id){
				this.$router.push({name:'goodsdesc',params:{id}})
			},
			goComment(id){	
				this.$router.push({name:'goodscomment',params:{id}})
			},
			addToCar(){
				//添加购物车
				this.ballFlag = !this.ballFlag
				//获取商品的对象存储到一个数组中  商品的ID  商品的购买数量 商品的单价  商品是否选中
				var goodshop = {
					id:this.id,
					count:this.SelectedCount,
					price:this.goodsinfo.sell_price,
					selected:true,
					title:this.goodsinfo.title,
					cou:this.id,
					thumb_path:this.lunbotu[0].img
				}
				//通过mutations将数据存储到state中
				this.$store.commit('addToCar',goodshop)
			},
			//动画的钩子函数
			beforeenter(el){
				el.style.transform = 'translate(0,0)'
			},
			enter(el,done){
				el.offsetWidth
				const ballPosition = this.$refs.ball.getBoundingClientRect()
				const badgePosition = document.getElementById('badge').getBoundingClientRect()
				const DistX = badgePosition.left - ballPosition.left
				const DistY = badgePosition.top - ballPosition.top
				el.style.transform = `translate(${DistX}px,${DistY}px)`
				el.style.transition = 'all 3s ease'
				done()
			},
			afterenter(){
				this.ballFlag = !this.ballFlag
			},
			getSelectedCount(count){
				this.SelectedCount = count
			}
		},
		components:{
			'swiper-box':swiper,
			goodnumbox
		},
	}
</script>

<style scoped="scoped" lang="less">
	.goodinfo_continaer{
		/*position: relative;*/
		background-color: #eee;
		overflow: hidden;
		.old{
			text-decoration: line-through;
			margin-right: 15px;
		}
		.new{
			color: red;
			font-size: 16px;
			font-weight: 700;
		}
		.mui-card-footer{
			display:block;
			button{
				margin: 12px 0;
			}
		}
		.ball{
			position: absolute;
			top: 390px;
			left: 146px;
			width: 16px;
			height: 16px;
			border-radius: 50%;
			background-color: red;
			z-index: 999;
		}
	}
</style>