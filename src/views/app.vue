<template>
	<router-view></router-view>
</template>

<script>

	import { accounts as account, innopoints } from './../modules'

	export default {
		name: 'app',

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