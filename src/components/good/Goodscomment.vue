<template>
	<div class="com-box">
		<comments-box></comments-box>
	</div>
</template>

<script>
	import comments from '../subcomponents/comment.vue'
	export default{
		data(){
			return{}
		},
		components:{
			'comments-box':comments
		}
	}
</script>

<style>
</style>