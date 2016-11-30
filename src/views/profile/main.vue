<template>
	<content>
		<div slot="header">
			<div style="padding: 1rem;height: 4rem;display: block;font-size: 1.5rem;line-height: 2rem;">{{ user.username }}'s profile</div>
		</div>
	</content>
</template>

<script>
	var content = require('./../content.vue');

	module.exports = {
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
		},
		components : {
			content:content
		}
	}
</script>