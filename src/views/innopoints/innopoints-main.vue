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
										span(v-if="routeName === 'applications'") Innopoints&ensp;&ndash;&ensp;Applications
										span(v-if="routeName === 'apply'") Innopoints&ensp;&ndash;&ensp;Apply
										span(v-if="routeName === 'manage-applications'") Applications&ensp;&ndash;&ensp;Manage
								.col.col-auto(v-if="routeName === 'apply'")
									router-link(
										tag="md-button",
										:to="{ name: 'applications' }")
										span Applications
								.col.col-auto.hidden-sm-down(v-if="routeName === 'applications' || 'manage-applications'")
									.search
										md-button.md-icon-button
											md-icon search
										md-input-container(md-inline)
											label(for="search") Search
											md-input#search(name="search", type="search", v-model="search")
		section
			.content
				keep-alive
					router-view(:search="search")
			footer
				p.text-muted 2016 &copy; InnoDev
</template>

<script>
	import { mapState } from 'vuex'

	export default {
		name: 'innopoints-main',

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
			toggleLeftSidenav () {
				this.$emit('toggleLeftSidenav')
			},
		}
	}
</script>