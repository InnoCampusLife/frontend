<template>
	<h1>Current path: {{ $route.path }}</h1>
	<pre v-if="!$loadingRouteData"> {{ user | json 4 }} </pre>
	<pre v-else> Loading user data... </pre>
</template>

<script>
	import {accounts} from './scripts/api.js'

	export default {
		data () {
			return {
				user : user
			}
		},
		route: {
			data (transition) {
				accounts.exists(
					user.token,
					function(result) {
						accounts.get(
							user.token,
							function (result) {
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