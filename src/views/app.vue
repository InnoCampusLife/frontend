<template>
	<router-view></router-view>
</template>

<script>

	import { accounts as account, innopoints } from './../modules'

	export default {
		
		ready() {
			console.log('App is awaiting your command!');
		},
		
		data() {
			return {
				user: {
					account,
					innopoints,
				},
				
				query: null
			}
		},
	}
</script>