<template>
	<router-view></router-view>
</template>

<script>
	import user from './scripts/userModel.js'

	//Make 'user' a global object for sharing between templates
	window.user = user;

	export default {
		ready () {
			console.log('App is awaiting your command!');
		}
	}
</script>