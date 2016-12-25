<template lang="jade">
	div
		sidebar
		router-view
</template>

<script>
	import sidebar from './sidebar.vue'

	export default {
		name: 'main',

		components: {
			sidebar,
		},

		created() {
			this.fetchData()
		},

		watch: {
			'$route': 'fetchData'
		},

		methods: {
			fetchData() {
				console.log("Fetching data in main.");

				const router = this.$router;
				const user = this.$root.user;
				user.account.update(
					(result) => {
						user.innopoints.data.update(
							(result) => {},
							(error) => {
								user.innopoints.api.user.create(
									(result) => {
										user.innopoints.data.update(
											(result) => {}
										)
									}
								)
							}
						)
					},
					(error) => {
						console.log("Fetching error.");
						router.push('/login');
					}
				)
			},
		},
	}
</script>