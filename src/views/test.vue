<style lang="scss">
</style>

<template lang="pug">
	main
		header.app-bar
			md-theme(md-name="dark")
				md-whiteframe(md-tag="md-toolbar", md-elevation="4")
					.md-toolbar-container
						md-button.md-icon-button(@click='toggleLeftSidenav')
							md-icon menu
						.app-bar-container
							.row
								.col
									h1.md-title Account
		section
			.content
				.container
					.row
						.col
							md-card
								md-card-header
									.md-title Current path: {{ $route.path }}
								md-card-content
									pre {{ user }}
			footer
				p.text-muted 2016 &copy; InnoDev
</template>

<script>
	export default {
		name: 'test',

		data() {
			return {
				isLoading: false,
				user: this.$router.app.user
			}
		},

		created() {
			this.fetchData()
		},

		watch: {
			'$route': 'fetchData'
		},

		methods: {
			fetchData() {
				console.log("Fetching test data.");
			}
		},
	}
</script>
