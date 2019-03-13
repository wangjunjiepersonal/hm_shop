<template>
	<div class="header">
		<!--轮播图区域-->
	<swiper-box :lunbotuList="lblist" :isfull="true"></swiper-box>
	<!--九宫格区域-->
	<ul class="mui-table-view mui-grid-view mui-grid-9">
					<li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="/home/newslist">
		                    <img src="../../../static/img/menu1.png" alt="" />
		                    <div class="mui-media-body">新闻专区</div></router-link></li>
		            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="/home/photolist">
		                    <img src="../../../static/img/menu2.png" alt="" />
		                    <div class="mui-media-body">图片分享</div></router-link></li>
		            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="/home/goodlist">
		                    <img src="../../../static/img/menu3.png" alt="" />
		                    <div class="mui-media-body">商品购买</div></router-link></li>
		            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="#">
		                    <img src="../../../static/img/menu4.png" alt="" />
		                    <div class="mui-media-body">留言反馈</div></router-link></li>
		            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="#">
		                    <img src="../../../static/img/menu5.png" alt="" />
		                    <div class="mui-media-body">视频专区</div></router-link></li>
		            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="#">
		                    <img src="../../../static/img/menu6.png" alt="" />
		                    <div class="mui-media-body">联系我们</div></router-link></li>
		            
		        </ul>
	</div>
</template>

<script>
	import swiper from '../subcomponents/Swiper.vue'
	import {Toast} from 'mint-ui'
	export default {
		data(){
			return {
				lblist:[]
			}
		},
		created(){
			this.getlunbotu()
		},
		methods:{
			getlunbotu(){
				this.$http.get('lunbotu.json').then(response => {
					this.lblist = response.data.message
					//Toast('成功加载数据')	
				},response => {
					Toast('加载数据失败')		
				})
			}
		},
		components:{
			'swiper-box':swiper
		}
	}
</script>

<style scoped="scoped" lang="less">
	
	.mui-grid-view.mui-grid-9{
		background-color: #fff;
		img{
			width: 60px;
			height: 60px;
		}
		.mui-media-body{
			font-size: 13px;
		}
	}
	.mui-grid-view.mui-grid-9 .mui-table-view-cell{
		width: 33.33333%;
		border:none;
	}
</style>