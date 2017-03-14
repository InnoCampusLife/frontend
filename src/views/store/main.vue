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
									h1.md-title
										span Store
										span(v-if="name === 'orders'") &ensp;&ndash;&ensp;Orders
										span(v-if="name === 'item'")  &ensp;&ndash;&ensp;Item
								.col.col-auto
									router-link(
										v-show="name === 'store'"
										tag="md-button",
										:to="{ name: 'orders' }")
										span Orders
									router-link(
										v-show="name === 'item' || name === 'orders'"
										tag="md-button",
										:to="{ name: 'store' }")
										span Store
								.col.col-auto.hidden-sm-down(v-show="name === 'store' || name === 'orders'")
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
		name: 'store-main',

		data() {
			return {
				search: '',
			}
		},

		computed: {
			...mapState({
				name: (state) => state.route.name,
			}),
		},

		methods: {
			toggleLeftSidenav() {
				this.$emit('toggleLeftSidenav')
			},
		}
	}
</script>