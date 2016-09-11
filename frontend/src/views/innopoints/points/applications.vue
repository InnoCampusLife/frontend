<template>
	<div style="margin: 42px;">
		<pre v-if="$loadingRouteData">Loading...</pre>

		<div v-for="appl in applications">
			<br>
			<h4 v-text="appl.type"></h4>
			<div>
				<pre>{{ appl | json 4 }}</pre>
			</div>
			<hr>
		</div>
	</div>
</template>

<script>
	module.exports =  {
		data () {
			return {
				user : this.$router.app.user,
				applications: []
			}
		},
		route : {
			data (transition) {
				var user = this.user;
				user.innopoints.api.user.get(result => {
					if (result.role == "admin")
						user.innopoints.api.admin.applications.get(result => {
							transition.next({
								applications: result
							});
						});
					else
						user.innopoints.api.user.applications.get(result => {
							transition.next({
								applications: result
							});
						});
				});
			}
		}
	}
</script>