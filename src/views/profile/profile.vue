<template lang="jade">
	.container
		p.text-xs-center(v-show='$loadingRouteData') Loading&mldr;
		.card.card-block(v-show='!$loadingRouteData')
			.row
				.col-sm.text-sm-right
					p Username
				.col-sm
					p.font-weight-bold {{ user.username }}
			.row
				.col-sm.text-sm-right
					p Role
				.col-sm
					p.font-weight-bold {{ user.role }}
			.row
				.col-sm.text-sm-right
					p First Name
				.col-sm
					p.font-weight-bold {{ user.firstName }}
			.row
				.col-sm.text-sm-right
					p Last Name
				.col-sm
					p.font-weight-bold {{ user.lastName }}
			.row
				.col-sm.text-sm-right
					p Alias
				.col-sm
					p.font-weight-bold {{ user.tgId }}
			.row
				.col-sm.text-sm-right
					p Study Group
				.col-sm
					p.font-weight-bold {{ user.studyGroup }}
	router-view
</template>

<script>
	module.exports =  {
		data: function () {
			return {
				user: {}
			}
		},
		route: {
			data : function (transition) {
				console.log("Called get in user");

				var username = this.$route.params.username;
				var user = this.$root.user.account;

				if (user.username != username) {
					console.log("called getBio: " + username);
					user.getBio({username: username},
						(result) => {
							console.log(result);
							transition.next({
								user: result
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