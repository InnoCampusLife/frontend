<template>
	<h1>{{ user.username }}'s profile</h1>
	<div block>
		<pre>{{ user.id }}</pre>
		<pre>{{ user.roles.uis }}</pre>
		<pre v-show="user.studyGroup != null">{{ user.studyGroup }}</pre>
		<pre v-show="user.tgId != null">{{ user.tgId }}</pre>
		<pre v-show="user.fullName != ''">{{ user.fullName }}</pre>
		<pre v-if="$loadingRouteData">Data is not updated yet!</pre>
	</div>
	<div block>
		<router-view></router-view>
	</div>
</template>

<script>
	var user = require('./../../models/user.js');

	module.exports =  {
		data () {
			return {
				user : user
			}
		},
		route: {
			data (transition) {
				console.log("Called get in user");
				var route = this.$route;
				user.update(
					function (result) {
						// console.log(route.params.username);
						// if (route.params.username == result.username)
							transition.next({
								user : result
							});
						// else
						// 	require('./../../api.js').accounts.getBio(user.token, {username: route.params.username},
						// 		function (result) {
						// 			transition.next({
						// 				user : result
						// 			});
						// 		});
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