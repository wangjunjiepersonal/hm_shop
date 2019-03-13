<template>
	<ul class="mui-table-view">
				<li class="mui-table-view-cell mui-media" v-for="(item,index) in newslist" :key="index">
					<router-link :to="'/home/newsinfo/'+item.id">
						<img class="mui-media-object mui-pull-left" :src="item.img_url">
						<div class="mui-media-body">
							<h3>{{item.title}}</h3>
							<p class="mui-ellipsis">
								<span>发表时间:{{item.add_time | dataFormat}}</span>
								<span>点击：{{item.click}}次</span>
							</p>
						</div>
					</router-link>
				</li>
				 

			</ul>
</template>

<script>
	import { Toast} from 'mint-ui'
	export default{
		data(){
			return{
				newslist:[]
			}
		},
		created(){
			this.getNewsList()
		},
		methods:{
			getNewsList(){
				this.$http.get('news.json').then(response => {
					if (response.body.status == 0) {
						this.newslist = response.body.message
						//console.log(this.newslist)
					}
					//Toast('成功加载数据')	
				},response => {
					Toast('加载数据失败')		
				})
			}
		}
	}
</script>

<style scoped="scoped" lang="less">
	.mui-table-view{
		h3{
			font-size: 14px;
		}
		.mui-ellipsis{
			font-size: 12px;
			color: #226aff;
			display: flex;
			justify-content: space-between;
		}
	}
	 
</style>