<style lang="less">

</style>

<template lang="jade">
	.container
		p.text-xs-center(v-show="$loadingRouteData") Loading...

		p.text-xs-center(v-show="!applications.length && !$loadingRouteData") Empty

		template(v-if="applications.length")
			application(v-for="appl in applications | filterBy $root.query in 'type' '_id' 'comment' 'creation_date' 'author.username' | orderBy 'creation_time' -1", :application="appl", :user="user", :success="action_success")
</template>

<script>
	
	export default {
		
		data() {
			return {
				user: this.$root.user,
				applications: []
			}
		},

		components: {
			application: require('./application.vue')
		},
		
		methods: {
			action_success(id, new_status) {
				let apps = this.applications
				let app = this.applications.find(a => a.id == id)
				console.log(app)
				if (this.$route.params.filter === 'all' || this.$route.params.filter == null)
					app.status = new_status;
				else
					apps.splice(apps.indexOf(app), 1)
			},
		},
		
		route: {
			data (transition) {
				this.applications = [];
				const params = this.$route.params;
				const user = this.user;

				if ((user.innopoints.data.isAdmin && !params.filter) || params.filter == 'all')
					params.filter = null;

				const request = (result) => {
					if (result.applications.length) {
						console.log(result);
						console.log("called appl get");
						const _length = result.applications.length;
						result.applications.forEach((res) => {
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