<template lang="jade">
	.container
		.card.card-block
			h1 Current path: {{ $route.path }}
			pre {{ user | json 2 }}
			pre(v-if="$loadingRouteData") Data is not updated yet!
</template>

<script>
	module.exports =  {
		data  : function () {
			return {
				user : this.$router.app.user
			}
		},
		route: {
			data : function (transition) {
				// this.user.account.update(transition.next);
				console.log("test route updated!");
				transition.next();
			}
		}
	}
</script>
