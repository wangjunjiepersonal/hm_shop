<template>
	<div class="newsinfo_container">
		<!--标题区域-->
		<h3 class="title">{{newsinfo.title}}--当前id值为{{id}}</h3>
		<p class="subtitle">
			<span>发表时间:{{newsinfo.add_time}}</span>
			<span>点击次数:{{newsinfo.click}}次</span>
		</p>
		<hr />
		<!--内容区域-->
		<div class="content" v-html="newsinfo.content"></div>
		<!--评论区域-->
		<comments-box :id="this.id"></comments-box>
	</div>
</template>

<script>
	//导入组件  导入时间组件和评论子组件
	import moment from 'moment'
	import comments from '../subcomponents/comment.vue'
	import {Toast} from 'mint-ui'
	export default{
		data(){
			return {
				id:this.$route.params.id,
				newsinfo:{}
			}
		},
		created(){
			this.getNewsInfo()
		},
		methods:{
			getNewsInfo(){
				this.$http.get('newsinfo.json').then(response => {
					if (response.body.status == 0) {
						this.newsinfo = response.body.message[0]
						this.newsinfo.add_time = moment(this.newsinfo.add_time).format('YYYY-MM-DD HH:mm:ss')
						//console.log(this.newsinfo.add_time)
					}
					//Toast('成功加载数据')	
				},response => {
					Toast('加载数据失败')		
				})
			}
		},
		components:{
			'comments-box':comments
		}
	}
</script>

<style lang="less">
	.newsinfo_container{
		padding: 0 4px;
		.title{
			font-size: 16px;
			color: red;
			text-align: center;
			margin: 15px 0;
		}
		.subtitle{
			font-size: 13px;
			color: #226aff;
			display: flex;
			justify-content: space-between;
		}
		.content{
			img{
				width: 100%;
			}
		}
	}
</style>