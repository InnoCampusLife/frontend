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
									h1.md-title Account
		section
			.content
				router-view
			footer
				p.text-muted 2016 &copy; InnoDev
</template>

<script>
	export default {
		name: 'accounts-main',

		data() {
			return {
				search: ''
			}
		},

		methods: {
			toggleLeftSidenav() {
				this.$emit('toggleLeftSidenav')
			},
		}
	}
</script>