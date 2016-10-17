<template>
	<h1>{{ user.username }}'s profile</h1>
	<div block>
		<pre>{{ user.id }}</pre>
		<pre>{{ user.role }}</pre>
		<pre v-show="user.studyGroup != null">{{ user.studyGroup }}</pre>
		<pre v-show="user.tgId != null">{{ user.tgId }}</pre>
		<pre v-show="user.firstName">{{ user.firstName + " " + user.lastName }}</pre>
		<pre v-if="$loadingRouteData">Data is not updated yet!</pre>
	</div>
	<div block>
		<router-view></router-view>
	</div>
</template>

<script>
	module.exports =  {
		data () {
			return {
				user : {}
			}
		},
		route: {
			data  : function (transition) {
				console.log("Called get in user");

				var username = this.$route.params.username;
				var user = this.$router.app.user.account;

				if (user.username != username) {
					console.log("called getBio: " + username);
					user.getBio({username: username},
						function (result) {
							console.log(result);
							transition.next({
								user : result
							});
						}
					);
				}
				else {
					if (user.id)
						transition.next({user: user});
					else
						user.exists(function(result) {
							transition.next({user: user});
						});
				}		
			}
		}
	}
</script>