<template lang="jade">
	app-view
		div(slot="header")
			.input-group.search-group
				input#search.form-control(
					type='search',
					placeholder="Search",
					v-model='$router.app.query')
				span.input-group-btn
					button.btn.btn-secondary(type='button')
						i.material-icons search

			ul.header-nav
				li
					router-link.btn-outline-primary(
						:to="{ name: 'orders', params: { username: user.account.username, filter: 'all' } }")
						i.material-icons receipt
						span Orders
				li
					router-link.btn-outline-primary(:to="{ name: 'store' }")
						i.material-icons store
						span Store
</template>

<script>
	import appView from './../app.vue'

	export default {
		name: 'store-main',

		data() {
			return {
				route: this.$route,
				user: this.$root.user,
			}
		},

		components: {
			appView,
		},
	}
</script>
