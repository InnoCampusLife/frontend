<template>
	<router-view></router-view>
</template>

<script>
	module.exports = {
		ready () {
			console.log('App is awaiting your command!');
		},
		data () {
			return {
				user : {
					account: require('./../modules.js').accounts,
					innopoints: require('./../modules.js').innopoints
				},
			}
		}
	}
</script>