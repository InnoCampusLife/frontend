<style lang="less" scoped>


</style>

<template lang="jade">
	content-view
		div(slot='header')

			.input-group.search-group
				input#search.form-control(
					type='search',
					placeholder="'Search ' + capitalizedTitle",
					v-model='$router.app.query')
				span.input-group-btn
					button.btn.btn-secondary(type='button')
						i.material-icons search

			template(v-if="$route.path.endsWith('store')")
				ul.header-nav
					li
						router-link.btn-outline-primary(:to="{ name: 'orders', params: { username: user.account.username, filter: 'all' } }")
							i.material-icons receipt
							span Orders

			template(v-if="$route.path.endsWith('orders')")
				ul.header-nav
					li
						router-link.btn-outline-primary(:to="{ name: 'store' }")
							i.material-icons store
							span Store

</template>

<script>
	import contentView from './../content.vue'

	export default {
		name: 'store-main',

		data() {
			return {
				route: this.$route,
				user: this.$root.user,
			}
		},

		computed: {
			capitalizedTitle() {
				const title = this.$route.path.split('/').pop()
				return title[0].toUpperCase() + title.slice(1)
			}
		},

		components: {
			contentView,
		}
	}
</script>
