<template>
	<div>
		<!--顶部滑动条区域-->
		<div id="slider" class="mui-slider">
				<div id="sliderSegmentedControl" class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
					<div class="mui-scroll">
						<a 
							:class="['mui-control-item',item.id == 0?'mui-active':'']" 
							v-for="(item,index) in cates" 
							@tap="getPhoto(index)"
							:key="index">
							{{item.title}}
						</a>
						
					</div>
				</div>

		</div>
		<!--图片列表区域-->
		<ul class="ul_lists">
		  <router-link v-for="(item,index) in lists" :key="index" :to="'/home/photoinfo/'+item.id" tag="li">
		    <img v-lazy="item.img_url">
		    <div class="info">
		    	<h1 class="info_title">{{item.title}}</h1>
		    	<div class="info_body">{{item.zhaiyao}}</div>
		    </div>
		  </router-link>
		</ul>
	</div>
</template>

<script>
	import { Lazyload } from 'mint-ui'
	import mui from '../../../lib/mui-master/dist/js/mui.min.js'
	import {Toast} from 'mint-ui'
	export default {
		data(){
			return{
				//存储的是图片列表的数组 图片列表的图片数据
				cates:[],
				lists:[]
			}
		},
		created(){
			this.getAllCategory()
			this.getPhoto(0)
		},
		methods:{
			getAllCategory(){
				this.$http.get('photolist.json').then(response => {
					if (response.body.status == 0) {
						 response.body.message.unshift({"title":"全部","id":"0"})
						 this.cates = response.body.message
						 //console.log(this.cates)
					}
					//Toast('成功加载数据')	
				},response => {
					Toast('加载数据失败')		
				})
			},
			getPhoto(id){
				Toast('您点击的当前ID为'+id)	
				this.$http.get('images.json').then(response => {
					if (response.body.status == 0) {
						 this.lists = response.body.message
						 //console.log(this.lists)
					}
					//Toast('成功加载数据')	
				},response => {
					Toast('加载数据失败')		
				})
			},
		},
		mounted(){
			mui('.mui-scroll-wrapper').scroll({
				deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
			});
		}
	}
</script>

<style scoped="scoped" lang="less">
	*{
		touch-action: pan-y;
	}
	
	.ul_lists{
		padding: 0;
		margin: 0;
		padding: 0 10px;
		li{
			position: relative;
			margin: 10px 0;
			background-color: #bbb;
			list-style:none;
			text-align: center;
			img{
				width: 100%;
				/*height: 100%;*/
				display: block;
			}
			img[lazy=loading] {
			  width: 40px;
			  height: 300px;
			  margin: auto;  
			}
			.info{			
				position: absolute;
				bottom: 0;
				left: 0;
				color: #fff;
				background-color: rgba(0,0,0,0.5);
				max-height: 80px;
				width: 100%;
				text-align: left;
				.info_title{
					font-size: 14px;
				}
				.info_body{
					font-size: 13px
				}
			}
		} 
	}
</style>