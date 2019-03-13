<template>
	<div class="mui-numbox" data-numbox-min='1' data-numbox-max='9'>
		<button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
		<input id="test" class="mui-input-numbox" type="number" value="1" @change="countChanged" ref="numbox">
		<button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
	</div>
</template>

<script>
	import mui from '../../../lib/mui-master/dist/js/mui.min.js'
	export default{
		props:['max'],
		methods:{
			countChanged(){
				this.$emit('getcount',parseInt(this.$refs.numbox.value))
			}
		},
		watch:{
			'max':function(newval){
				mui('.mui-numbox').numbox().setOption('max',newval)
			}
		},
		mounted(){
			mui('.mui-numbox').numbox()
		}
	}
</script>

<style>
</style>