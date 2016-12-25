<template>
	<router-view></router-view>
</template>

<script>

	import { accounts as account, innopoints } from './../modules'

	export default {

		mounted() {
			console.log('App is mounted.');
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