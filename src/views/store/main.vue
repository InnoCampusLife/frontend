<style lang="less" scoped>


</style>

<template lang="jade">
	content
		div(slot='header')

			.input-group.search-group
				input#search.form-control(
					type='search',
					placeholder='Search {{ title | capitalize }}',
					v-model='$router.app.query')
				span.input-group-btn
					button.btn.btn-secondary(type='button')
						i.material-icons search

			template(v-if="$route.path.endsWith('store')")
				ul.header-nav
					li
						a.btn-outline-primary(href="", v-link="{ name: 'orders', params: { username: user.account.username, filter: 'all' } }")
							i.material-icons receipt
							span Orders

			template(v-if="$route.path.endsWith('orders')")
				ul.header-nav
					li
						a.btn-outline-primary(href="", v-link="{ name: 'store' }")
							i.material-icons store
							span Store

</template>

<script>
	export default {

		data() {
			return {
				route: this.$route,
				user: this.$root.user,
			}
		},

		computed: {
			title() {
				return this.$route.path.split('/').pop()
			}
		},

		components: {
			content: require('./../content.vue')
		}
	}
</script>
