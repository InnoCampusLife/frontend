<template>
	<h1>Current path: {{ $route.path }}</h1>
	<pre>{{ user | json 4 }}</pre>
	<pre v-if="$loadingRouteData">Data is not updated yet!</pre>
</template>

<script>
	import user from './../scripts/user.js'

	export default {
		data () {
			return {
				user : user
			}
		},
		route: {
			data (transition) {
				user.update(
					function (result) {
						transition.next({
							user : result
						});
					},
					function (error) {
						user.clear();
						transition.redirect('/login');
					}
				);
			}
		}
	}
</script>