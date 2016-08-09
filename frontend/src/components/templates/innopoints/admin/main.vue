<template>
	<div block>
		<p v-if="$loadingRouteData">Loading users' list...</p>
	</div>
</template>

<script>
	import api from './../../../scripts/api.js'
	import {token} from './../../../scripts/user.js'

	export default {
		data () {
			return {
				users : [],
				moderToken : token,
				roleChanged : false
			}
		},
		methods: {
			
		},
		route: {
			data (transition) {
				
			}
		}
	}
</script>