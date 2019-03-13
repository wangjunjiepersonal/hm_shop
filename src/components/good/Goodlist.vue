<template>
	<div class="good_list">
		<!--//商品的数据展示-->
		<div class="good_item" v-for="(item,index) in addgoodlist" :key="index" @click="goDetail(item.id)">
			<img :src="item.img" alt="" />
			<h1 class="title">{{item.title}}</h1>
			<div class="info">
				<p class="price">
					<span class="new">¥{{item.sell_price}}</span>
					<span class="old">¥{{item.market_price}}</span>
				</p>
				<p class="sell">
					<span>热卖中</span>
					<span>剩余{{item.stock_quantity}}件</span>
				</p>
			</div>
		</div>
		<!--点击加载更多的按钮--> 
		<mt-button type="danger" size="large" @click="addlist">加载更多</mt-button>
	</div>
</template>

<script>
	import {Toast} from 'mint-ui'
	import moment from 'moment'
	export default{
		data(){
			return{
				pageIndex:1,
				goodlist:[],
				addgoodlist:[]
			}
		},
		created(){
			this.getGoodList()
		},
		methods:{
			getGoodList(){
				Toast('请求页数为第'+this.pageIndex+'页')
				this.$http.get('getgoods.json').then(response => {
					if (response.body.status == 0) {
						response.body.message.forEach(item => {
							item.add_time = moment(item.add_time).format('YYYY-MM-DD HH:mm:ss')
						})
						this.goodlist = response.body.message
						this.addgoodlist = this.addgoodlist.concat(this.goodlist)
						//console.log(this.addgoodlist)
						
					}
					//Toast('成功加载数据')	
				},response => {
					Toast('加载数据失败')		
				})
			},
			addlist(){
				this.pageIndex += 1
				console.log(111)
				this.addgoodlist = this.addgoodlist.concat(this.goodlist)
				Toast('开始请求第'+this.pageIndex+'页数据')
			},
			//编程式路由导航跳转事件
			goDetail(id){
				this.$router.push("/home/goodinfo/"+id)
			}
		}
	}
</script>

<style scoped="scoped" lang="less">
	.good_list{
		display: flex;
		flex-wrap: wrap;
		padding: 8px;
		justify-content: space-between;
		.good_item{
			display: flex;
			flex-direction:column;
			justify-content: space-between;
			border: 1px solid #bbb;
			box-shadow: 0 0 8px #ccc;
			width: 49%;
			margin: 3.5px 0;
			padding: 2px;
			min-height:290px;
			img{
				width: 100%;
			}
			.title{
				font-size: 14px;
			}
			.info{
				background-color: #eee;
				p{
					margin: 0;
					padding: 5px;
				}
				.price{
					.new{
						color: red;
						font-weight: 700;
						font-size: 16px;
					}
					.old{
						text-decoration: line-through;
						font-size: 14px;
						margin-left: 15px;
					}
				}
				.sell{
					display: flex;
					justify-content: space-between;
				}
			}
		}
	}
</style>