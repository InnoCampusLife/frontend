<template>
	<h1>Current path: {{ $route.path }}</h1>
	<pre>{{ user | json 4 }}</pre>
	<pre v-if="$loadingRouteData">Data is not updated yet!</pre>
</template>

<script>
	import {accounts} from './../scripts/api.js'
	import user from './../scripts/user.js'

	export default {
		data () {
			return {
				user : user
			}
		},
		route: {
			data (transition) {
				accounts.get(
					user.token,
					function (result) {
						console.log("Called get in test");
						user.set(result);
						transition.next({
							user : user
						});
					},
					function(error) {
				 		user.clear();
				 		transition.redirect('/login');
					}
				);
			}
		}
	}
</script>