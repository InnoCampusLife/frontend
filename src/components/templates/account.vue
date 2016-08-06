<template>
	<div block>
		<h1>{{ user.username }}</h1>
		<pre>{{ user.id }}</pre>
		<pre>{{ user.role }}</pre>
		<pre v-show="user.studyGroup != null">{{ user.studyGroup }}</pre>
		<pre v-show="user.tgId != null">{{ user.tgId }}</pre>
		<pre v-show="user.fullName != ''">{{ user.fullName }}</pre>
		<pre v-if="$loadingRouteData">Data is not updated yet!</pre>
	</div>
</template>

<script>
	import api from './../scripts/api.js'
	import user from './../scripts/user.js'

	export default {
		data () {
			return {
				user : user
			}
		},
		route: {
			data (transition) {
				api.accounts.get(
					user.token,
					function (result) {
						console.log("Called get in user");
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