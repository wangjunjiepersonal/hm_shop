<template>
    <div class="app_cont">
    	<!--头部区域-->
    	<mt-header fixed title="黑马教材_Vue项目">
    		<span slot="left" @click="goBack" v-show="flag">
		       <mt-button icon="back">返回</mt-button>
		 	</span>
    	</mt-header>
  	<!--中间区域-->
  		<transition>
  			<router-view></router-view>
  		</transition>
  	<!--底部区域-->
	  	<nav class="mui-bar mui-bar-tab">
				<router-link class="mui-tab-item1 " to="/home">
					<span class="mui-icon mui-icon-home"></span>
					<span class="mui-tab-label">首页</span>
				</router-link>
				<router-link class="mui-tab-item1" to="/member">
					<span class="mui-icon mui-icon-contact"></span>
					<span class="mui-tab-label">会员</span>
				</router-link>
				<router-link class="mui-tab-item1" to="/shopcar">
					<span class="mui-icon mui-icon-extra mui-icon-extra-cart">
						<span class="mui-badge" id="badge">{{$store.getters.getAllCount}}</span>
					</span>
					<span class="mui-tab-label">购物车</span>
				</router-link>
				<router-link class="mui-tab-item1" to="/search">
					<span class="mui-icon mui-icon-search"></span>
					<span class="mui-tab-label">搜索</span>
				</router-link>
			</nav>
    </div>
</template>

<script>
export default {
	data(){
		return{
			flag:''
		}
	},
	created(){
		this.flag = this.$route.path == '/home'?false:true
	},
   methods:{
   	goBack(){
   		this.$router.go(-1)
   	}
   },
   watch:{
   	'$route.path':function(newval){
   		if (newval == '/home') {
   			this.flag = false	
   		}else{
   			this.flag = true
   		}
   	}
   }
}
</script>

<style scoped="scoped">
 	.mint-header{
 		z-index: 99;
 	}
	.app_cont{
		padding-top: 40px;
		padding-bottom: 50px;
		overflow-x: hidden;
		position: absolute;
		width: 100%;
	}
	.body{
		background-color: #fff;
	}
	.v-enter{
		opacity: 0;
		transform: translateX(100%);
	}
	.v-leave-to{
		opacity: 0;
		transform: translateX(-100%);
		position: absolute;
	}
	.v-enter-active,.v-leave-to{
		transition: all 0.5s ease;
	}
	*{
		touch-action: pan-y;
	}
	/*解决muicss和muijs的样式冲突  重写类样式*/
	.mui-bar-tab .mui-tab-item1.mui-active {
	    color: #007aff;
	}
	.mui-bar-tab .mui-tab-item1 {
	    display: table-cell;
	    overflow: hidden;
	    width: 1%;
	    height: 50px;
	    text-align: center;
	    vertical-align: middle;
	    white-space: nowrap;
	    text-overflow: ellipsis;
	    color: #929292;
	}
	.mui-bar-tab .mui-tab-item1 .mui-icon {
	    top: 3px;
	    width: 24px;
	    height: 24px;
	    padding-top: 0;
	    padding-bottom: 0;
	}
	.mui-bar-tab .mui-tab-item1 .mui-icon~.mui-tab-label {
	    font-size: 11px;
	    display: block;
	    overflow: hidden;
	    text-overflow: ellipsis;
	}
</style>
