<template>
	<router-view></router-view>
</template>

<script>
	export default {
		ready() {
			console.log('App is awaiting your command!');
		},
		data() {
			const modules = require('./../modules');
			return {
				user: {
					account: modules.accounts,
					innopoints: modules.innopoints
				},
				query: null
			}
		}
	}
</script>