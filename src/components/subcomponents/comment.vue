<template>
	<div id="cmt_container">
		<h3>发表评论 当前ID为{{id}} 页数为{{pageIndex}}页</h3>
		<hr />
		<textarea name="" rows="" cols="" placeholder="请输入内容(120字以内)" maxlength="120" v-model="msg"></textarea>
		<mt-button type="primary" size="large" @click="postcomment">发表评论</mt-button>
		<div class="cmt_lists">
			<div class="cmt_item" v-for="(item,index) in comments" :key="index">
				<div class="cmt_title">
					第{{index+1}}楼&nbsp;&nbsp;用户:{{item.user_name}}&nbsp;&nbsp;发表时间:{{item.add_time}}
				</div>
				<div class="cmt_body">
					{{item.content}}
				</div>
			</div>
		</div>
		<mt-button type="danger" size="large" plain @click="getMore">加载更多</mt-button>
	</div>
</template>

<script>
	import moment from 'moment'
	import {Toast} from 'mint-ui'
	export default{
		props:["id"],
		data(){
			return{
				pageIndex:1,
				comments:[],
				msg:''
			}
		},
		created(){
			this.getComment()
		},
		mounted(){
			
		},
		methods:{
			getComment(){
				this.$http.get('comment.json').then(response => {
					if (response.body.status == 0) {
						this.comments = response.body.message
						this.comments = this.comments.concat(response.body.message)
						this.comments.forEach(item=>{
							item.add_time = moment(item.add_time).format('YYYY-MM-DD HH:mm:ss')
						})
					}
					//Toast('成功加载数据')	
				},response => {
					Toast('加载数据失败')		
				})
			},
			getMore(){
				this.pageIndex +=1
				this.getComment()
				Toast('您请求了第'+this.pageIndex+'页数据')
			},
			postcomment(){
				//数据校验
				if (this.msg.trim() === 0) {
					Toast('评论内容不能为空')
					reutrn
				}
				Toast('发表评论成功')
				var cmt = {
					user_name:"匿名用户",
					add_time:Date.now(),
					content:this.msg.trim()
				}
					this.comments.unshift(cmt)
					this.msg=""	
//				this.$http.post('api/postcomment'+this.id,{content:this.mag.trim()}).then(response => {
//					if (response.body.status == 0) {
//						 var cmt = {
//						 	user_name:"匿名用户",
//						 	add_time:Date.now(),
//						 	content:this.msg.trim()
//						 }
//						 this.comment.unshift(cmt )
//						}
//						this.msg=""
//				},
//					//Toast('成功加载数据')	
//				response => {
//					Toast('评论发表失败')		
//				})
			}
		}
	}	
</script>

<style scoped="scoped" lang="less">
	#cmt_container{
		margin: 5px 0;
		h3{
			font-size: 16px;
		}
		textarea{
			font-size: 14px;
			height: 85px;
			margin: 0;
		}
		.cmt_lists{
			margin: 5px 0;
			.cmt_item{
				font-size: 13px;
				.cmt_title{
					background-color: #bbbb;
				}
				.cmt_body{
					line-height: 35px;
					text-indent: 2em;
				}
			}
		}
	}
</style>