<style lang="less" scoped>


</style>

<template lang="jade">
	content
		div(slot='header')
			
			template(v-if="$route.path.endsWith('store')")
				.input-group.search-group
					input#search.form-control(type='search', placeholder='Search Store', v-model='$router.app.query',)
					span.input-group-btn
						button.btn.btn-secondary(type='button') 
							span {{{ ':mag:' | emojify }}}
				ul.header-nav
					li
						button.btn.btn-outline-primary(v-link="{ name: 'orders', params: { username: user.account.username, filter: 'all' } }") 
							span {{{'📑' | emojify}}}
							span Orders
			
			template(v-if="$route.path.endsWith('orders')")
				.input-group.search-group
					input#search.form-control(type='search', placeholder='Search Orders', v-model='$router.app.query',)
					span.input-group-btn
						button.btn.btn-secondary(type='button') 
							span {{{ ':mag:' | emojify }}}
				ul.header-nav
					li
						button.btn.btn-outline-primary(v-link="{ name: 'store' }") 
							span {{{'📑' | emojify}}}
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
		
		components: {
			content: require('./../content.vue')
		}
	}
</script>
