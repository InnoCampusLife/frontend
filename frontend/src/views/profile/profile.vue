<template>
	<h1>{{ user.username }}'s profile</h1>
	<div block>
		<pre>{{ user.id }}</pre>
		<pre>{{ user.role }}</pre>
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
	module.exports =  {
		data () {
			return {
				user : this.$router.app.user.account
			}
		},
		route: {
			data (transition) {
				console.log("Called get in user");
				var route = this.$route;
				console.log(route.params.username);
				
				if (route.params.username == this.$router.app.user.account.username) {
					this.$router.app.user.account.update(transition.next);
				}
				else
					this.$router.app.user.account.getBio({username: route.params.username},
						function (result) {
							console.log(result);
							result.username = route.params.username;
							transition.next({
								user : result
							});

						}
					);
					
			}
		}
	}
</script>