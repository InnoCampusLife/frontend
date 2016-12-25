<style lang="less">

</style>

<template lang="jade">
	.container

		p.text-xs-center(v-show="isLoading") Loading...

		p.text-xs-center(v-show="!applications.length && !isLoading") Empty

		template(v-if="applications.length")
			// application(v-for="app in applications | filterBy $root.query in 'type' 'id' 'comment' 'creation_date' 'author.username' | orderBy 'creation_time' -1", :application="app", :user="user", :success="action_success")
			application(v-for="app in applications", :application="app", :user="user", :success="action_success")
</template>

<script>
	export default {
		name: 'innopoints-applications',

		data() {
			return {
				user: this.$root.user,
				applications: [],
				isLoading: false,
			}
		},

		components: {
			application: require('./application.vue')
		},

		created() {
			this.fetchData()
		},

		watch: {
			'$route': 'fetchData'
		},

		methods: {
			filter(apps) {

			},

			fetchData() {
				this.isLoading = true
				this.applications = []

				const self = this
				const params = this.$route.params
				const user = this.user

				if ((user.innopoints.data.isAdmin && !params.filter) || params.filter == 'all')
					params.filter = null

				user.innopoints.data.update((result) => {
					console.log('Innopoints: ', user.innopoints.data)

					user.innopoints.api.user.applications.get({
						status: params.filter || null,
						successCallback: (result) => {
							if (result.applications.length) {
								console.log('Applications: ', result)

								result.applications.forEach((res) => {
									const timestamp = res.creation_date * 1000
									res.creation_time = new Date(timestamp).toLocaleTimeString('ru')
									res.creation_date = new Date(timestamp).toLocaleDateString('ru')
								})
							}
							self.isLoading = false
							self.applications = result.applications
						}
					})
				})
			},

			action_success(id, new_status) {
				const apps = this.applications
				const app = this.applications.find(a => a.id == id)
				console.log(app)
				if (this.$route.params.filter === 'all' || this.$route.params.filter == null) {
					app.status = new_status;
				} else {
					apps.splice(apps.indexOf(app), 1)
				}
			},
		},
	}
</script>