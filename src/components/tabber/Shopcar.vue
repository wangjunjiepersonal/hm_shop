<template>
	<div class="shopcontainer">
		<!--商品区域-->
		<div class="shoplist">
			<div class="mui-card" v-for="(item,index) in goodlist" :key="index">
				<div class="mui-card-content">
					<div class="mui-card-content-inner">
						
						<mt-switch 
							v-model="$store.getters.getGoodsSelected[item.id]" 
							@change="selectedchanged(item.id,$store.getters.getGoodsSelected[item.id])"
							></mt-switch>
						<img :src="item.thumb_path" alt="" />
						<div class="info">
							<h3>{{item.title}}</h3>
							<p>
								<span class="price">¥{{item.price}}</span>
								<numbox :initcount="$store.getters.getGoodsCount[item.id]" :goodsid="item.id"></numbox>	
								<span class="del" @click="deleteshop(item.id)">删除</span>
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
		<!--结算区域-->
		<div class="mui-card">
			
			<div class="mui-card-content">
				<div class="mui-card-content-inner accounts">
						<div class="left">
							<p class="total">总计（不含运费）</p>
							<p class="num">已勾选商品 <span class="red">{{$store.getters.getGoodsCountAmount.count}}</span> 件，总价¥<span class="red">{{$store.getters.getGoodsCountAmount.amount}}</span>元</p>
						</div>
						<div class="rifht">
							<mt-button type="danger">去结算</mt-button>
						</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import numbox from '../subcomponents/Shopcarnumbox.vue'
	export default {
		data(){
			return{
//				接收购物车的商品信息  模拟的数据就是state.car
				goodlist:{}
			}
		},
		created(){
			this.getGoodsList()
		},
		methods:{
//			发送数据的请求接口
			getGoodsList(){
				//模拟数据 取的是state.car中的数据
				this.goodlist = this.$store.state.car
				//console.log(this.$store.state.car)
				//模拟向后台发送数据请求
				//var idArr = []
				//this.$store.state.car.forEach(item=>idArr.push(item.id))
				//if (idArr.length == 0) {
					//return
				//}
				//this.$http.get('api/goods/getshopcarlist'+idArr.join(',')).then(result => {
					//if (result.body.status === 0) {
						//this.goodlist = result.body.message
					//}
				//})
			},
		    // 删除按钮 删除是时商品
			deleteshop(id){
				this.$store.commit('deleteCar',id)
			},
			//点击开关  把最新的数据传递给store
			selectedchanged(id,val){
				this.$store.commit('updateGoodsSelected',{id,selected:val})
			}
		},
		components:{
			numbox
		}
	}
</script>

<style scoped="scoped" lang="less">
	.shopcontainer{
		background-color: #eee;
		overflow: hidden;
		.shoplist{
			.mui-card-content-inner{
				display: flex;
				align-items: center;
				justify-content: space-between;
			}
			img{
				width: 60px;
				height: 60px;
			}
			h3{
				font-size: 16px;
				padding: 10px 0;
			}
			.info{
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				p{
					display: flex;
					justify-content: space-between;
					margin: 0;
					.price{
						color: red;
						font-size: 16px;
						font-weight: 700;
						width: 50px;
						text-align: center;
						line-height: 25px;
					}
					.del{
						width: 50px;
						text-align: center;
						color: red;
						line-height: 25px;
					}
				}
				
			}
		}
		.accounts{
			display: flex;
			justify-content: space-between;
			align-items: center;
			.left{
				.red{
					color: red;
					font-weight: 700;
					font-size: 16px;
				}
			}
			.right{
				
			}
		}
	}
</style>