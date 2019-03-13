<template>
	<div class="mui-numbox" data-numbox-min='1' data-numbox-max='9'>
		<button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
		<input id="test" @change="countChanged" class="mui-input-numbox" type="number" :value="initcount" ref="numbox" readonly="readonly">
		<button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
	</div>
</template>

<script>
	import mui from '../../../lib/mui-master/dist/js/mui.min.js'
	export default{
		props:['initcount','goodsid'],
		methods:{
			countChanged(){
				console.log(this.initcount)
				this.$store.commit('updateGoodShop',{
					id:this.goodsid,
					count:parseInt(this.$refs.numbox.value)
				})
			}
		},
		
		mounted(){
			mui('.mui-numbox').numbox()
		}
	}
</script>

<style>
	.mui-numbox{
		height: 25px;
	}
</style>