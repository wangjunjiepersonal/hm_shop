<template>
	<div class="info_container">
		<h3>{{info.title}}</h3>
		<hr />
		<div class="content" v-html="info.content">
			
		</div>
	</div>
</template>

<script>
	import {Toast} from 'mint-ui'
	export default{
		data(){
			return{
				id:this.$route.params.id,
				info:{}
			}
		},
		created(){
			this.getDesc()
		},
		methods:{
			getDesc(){
				Toast('当前的ID值为'+this.id)	
				this.$http.get('getdesc.json').then(response => {
					if (response.body.status == 0) {			
						this.info = response.body.message[0]
					}
				},response => {
					Toast('加载数据失败')		
				})
			}
		}
	}
</script>

<style  lang="less">
	.info_container{
		padding: 5px;
		h3{
			font-size: 16px;
			color: #226AFF;
			text-align: center;
			margin: 15px 0;
		}
		.content{
			img{
				width: 100%;
			}
		}
	}
</style>