<template>
	<div class="photoinfo_container">
		<!--头部样式-->
		<h3 class="title">{{photoinfo.title}}</h3>
		<p class="subtitle">
			<span>发表时间:{{photoinfo.add_time}}</span>
			<span>点击次数:{{photoinfo.click}}</span>
		</p>
		<hr />
		<!--缩略图区域-->
		<div class="thumbs">
		  <vue-preview :slides="list" @close="handleClose"></vue-preview>
		</div>

		<!--图片内容区域-->
		<div class="content" v-html="photoinfo.content"></div>
		<!--评论子组件-->
		<cmt-box :id="id"></cmt-box>
	</div>
</template>

<script>
	import {Toast} from 'mint-ui'
	import moment from 'moment'
	import comments from '../subcomponents/comment.vue'
	export default{
		data(){
			return{
				id:this.$route.params.id,
				photoinfo:[],
				//缩略图的数组
				list:[]   
			}
		},
		created(){
			this.getPhotoInfo()
			this.getThumbs()
		},
		methods:{
			getPhotoInfo(){
				Toast('当前点击的ID值为'+this.id)
				this.$http.get('photoinfo.json').then(response => {
					if (response.body.status == 0) {
						this.photoinfo = response.body.message[0]
						//console.log(this.photoinfo)
						this.photoinfo.add_time = moment(this.photoinfo.add_time).format('YYYY-MM-DD HH:mm:ss')
					}
					//Toast('成功加载数据')	
				},response => {
					Toast('加载数据失败')		
				})
			},
			getThumbs(){
				this.$http.get('getthumi.json').then(response => {
					if (response.body.status == 0) {
						response.body.message.forEach(item => {
							item.w = 600
							item.h = 400
							item.msrc = item.src
							item.alt = ''
            				item.title = ''
						})
						this.list = response.body.message
						console.log(this.list)
						
					}
					//Toast('成功加载数据')	
				},response => {
					Toast('加载数据失败')		
				})
			},
			handleClose () {
		        Toast('图片预览关闭')
		      }
			
		},
		components:{
			//注册评论子组件
			'cmt-box':comments
		}
	}
</script>

<style lang="less">
	.photoinfo_container{
		padding: 3px;
		h3{
			color: #26a2ff;
			font-size: 16px;
			text-align: center;
			margin: 15px 0;
		}
		.subtitle{
			display: flex;
			justify-content: space-between;
			font-size: 13px;
		}
		.content{
			font-size: 13px;
			line-height: 30px;
		}
	}
	.thumbs {
		.my-gallery{
			width: 100%;
			display: flex;
			justify-content: flex-start;
			flex-wrap: wrap;
			figure{
				margin: 5px;				
				width: 30.3333%;
				img{
					width: 100%;
				}
			}
		}	
		
	}
	  
</style>