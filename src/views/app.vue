<template lang="jade">
	main
		sidebar
		section.main-main
			header.header-main
				slot(name='header')
			.content-main
				.wrap
					router-view
				footer.footer-main
					p.text-muted 2016 © InnoDev
</template>

<script>
	import sidebar from './sidebar.vue'

	export default {
		name: 'app',

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