<template>
	<div block>
		<p v-if="$loadingRouteData">Loading users' list...</p>
	</div>
</template>

<script>
	var api = require( './../../../scripts/api.js');
	var {token} = require( './../../../scripts/user.js');

	module.exports =  {
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