<template lang="pug">
	main
		header.app-bar
			md-theme(md-name="dark")
				md-whiteframe(md-tag="md-toolbar", md-elevation="4")
					.md-toolbar-container
						md-button.md-icon-button(@click.native='toggleLeftSidenav')
							md-icon menu
						.app-bar-container
							.row
								.col
									h1.md-title Not Found
		section
			.content
				.container
					.row
						.col
							.text-center
								.md-display-4 404
			footer
				p.text-muted 2016 &copy; InnoDev
</template>

<script>
	export default {
		name: 'not-found',

		methods: {
			toggleLeftSidenav () {
				this.$emit('toggleLeftSidenav')
			},
		},
	}
</script>
