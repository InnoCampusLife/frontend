<template lang="jade">
	.container
		p(v-show="$loadingRouteData") Loading...

		p(v-show="!applications.length && !$loadingRouteData") Empty

		template(v-if="applications.length")
			application(v-for="appl in applications | filterBy $root.query in 'type' '_id' 'comment' 'creation_date' 'author.username' | orderBy 'creation_time' -1", :application="appl", :user="user", :success="action_success")
</template>

<script>
	module.exports =  {
		data: function () {
			return {
				user: this.$root.user,
				applications: []
			}
		},
		components: {
			application: require('./application.vue')
		},
		methods: {
			action_success: function(id, new_status) {
				if (this.$route.params.filter === 'all' || this.$route.params.filter == null)
					this.applications.find(x => x.id == id).status = new_status;
				else
					document.getElementById('card'+id).remove();
			}
		},
		route: {
			data (transition) {
				this.applications = [];
				var params = this.$route.params;
				var user = this.user;

				if ((user.innopoints.data.isAdmin && !params.filter) || params.filter == 'all')
					params.filter = null;

				var request = (result) => {
					if (result.applications.length) {
						console.log(result);
						console.log("called appl get");
						var _length = result.applications.length;
						result.applications.forEach(function(res) {
							res.creation_time = res.creation_date;
							res.creation_date = new Date(res.creation_time * 1000).toLocaleString('ru');
						});
					}
					transition.next({
						applications: result.applications
					});
				};

				user.innopoints.data.update(result => {
					console.log(user.innopoints.data);
					console.log(result);
					user.innopoints.api.user.applications.get({
						status: params.filter || null,
						successCallback: request
					});
				});
			}
		}
	}
</script>