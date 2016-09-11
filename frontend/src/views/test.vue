<template>
	<h1>Current path: {{ $route.path }}</h1>
	<pre>{{ user | json 4 }}</pre>
	<pre v-if="$loadingRouteData">Data is not updated yet!</pre>
</template>

<script>

	module.exports =  {
		data () {
			return {
				user : this.$router.app.user
			}
		},
		route: {
			data(transition) {
				this.user.account.update(transition.next);
				console.log("test route updated!");
			}
		}
	}
</script>