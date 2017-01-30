<template lang="jade">
	router-view
			// layout
			// 	template(slot="header")

			// router-link(
			// 	tag="md-button",
			// 	:to="{ name: 'orders', params: { username: user.account.username, filter: 'all' } }")
			// 	span Orders

			// router-link(
			// 	tag="md-button",
			// 	:to="{ name: 'store' }")
			// 	span Store

			// md-input-container(md-inline="true", md-theme="red")
			// 	label Search
			// 	md-input

			// .input-group.search-group
			// 	input#search.form-control(
			// 		type='search',
			// 		placeholder="Search",
			// 		v-model='$router.app.query')
			// 	span.input-group-btn
			// 		button.btn.btn-secondary(type='button')
			// 			i.material-icons search

			// ul.header-nav
			// 	li
			// 		router-link.btn-outline-primary(
			// 			:to="{ name: 'orders', params: { username: user.account.username, filter: 'all' } }")
			// 			i.material-icons receipt
			// 			span Orders
			// 	li
			// 		router-link.btn-outline-primary(:to="{ name: 'store' }")
			// 			i.material-icons store
			// 			span Store
</template>

<script>
	import layout from './../layout.vue'

	export default {
		name: 'store-main',

		mounted() {
			console.log('store-main is mounted.')
		},

		data() {
			return {
				route: this.$route,
				user: this.$root.user,
			}
		},

		components: {
			layout,
		},
	}
</script>
