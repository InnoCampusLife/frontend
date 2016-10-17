<template>
	<h1>Current path: {{ $route.path }}</h1>
	<pre>{{ user | json 4 }}</pre>
	<pre v-if="$loadingRouteData">Data is not updated yet!</pre>
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
				this.user.account.update(transition.next);
				console.log("test route updated!");
			}
		}
	}
</script>