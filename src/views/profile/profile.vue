<template>
	<div class="container">
		<div class="card card-block" block>
			<div class="row">
				<div class="col-sm text-sm-right">
					<p>Username</p>
				</div>
				<div class="col-sm">
					<p class="font-weight-bold">{{ user.username }}</p>
				</div>
			</div>
			<div class="row">
				<div class="col-sm text-sm-right">
					<p>Role</p>
				</div>
				<div class="col-sm">
					<p class="font-weight-bold">{{ user.role }}</p>
				</div>
			</div>
			<pre v-show="user.studyGroup != null">{{ user.studyGroup }}</pre>
			<pre v-show="user.tgId != null">{{ user.tgId }}</pre>
			<pre v-show="user.firstName">{{ user.firstName + " " + user.lastName }}</pre>
			<pre v-if="$loadingRouteData">Data is not updated yet!</pre>
		</div>
		<div block>
			<router-view></router-view>
		</div> 
	</div>
</template>

<script>
	module.exports =  {
		data : function () {
			return {
				user : {}
			}
		},
		route: {
			data  : function (transition) {
				console.log("Called get in user");

				var username = this.$route.params.username;
				var user = this.$root.user.account;

				if (user.username != username) {
					console.log("called getBio: " + username);
					user.getBio({username: username},
						(result) => {
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
						user.exists(result => {
							transition.next({user: user});
						});
				}		
			}
		}
	}
</script>