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
									h1.md-title
										span(v-if="routeName === 'account'") Account
										span(v-else-if="routeName === 'profile'") Profile
										span(v-else) Accounts
		section
			.content
				router-view
			footer
				p.text-muted 2016 &copy; InnoDev
</template>

<script>
	import { mapState } from 'vuex'

	export default {
		name: 'accounts-main',

		data () {
			return {
				search: ''
			}
		},

		computed: {
			...mapState({
				routeName: (state) => state.route.name,
			}),
		},

		methods: {
			toggleLeftSidenav() {
				this.$emit('toggleLeftSidenav')
			},
		}
	}
</script>