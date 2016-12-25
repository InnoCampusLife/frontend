<template lang="jade">
	app-view
		div(slot='header')

			.search-group.input-group(v-show="$route.path.includes('applications')")
				input#search.form-control(type="search", :placeholder="'Search ' + $route.name[0].toUpperCase() + $route.name.slice(1)", v-model="$router.app.query")
				span.input-group-btn
					button.btn.btn-secondary(type='button')
						i.material-icons search

			ul.header-nav
				template(v-if="$route.path.includes('applications') && user.account.username")
					// li(v-if="!user.innopoints.data.isAdmin")
					// 	router-link.btn-outline-primary(
					//		:to="{ name: 'applications',	params: { username: user.account.username, filter: 'all' } }")
					// 		i.material-icons description
					// 		span All
					li
						router-link.btn-outline-primary(
							:to="{ name: 'applications',	params: { username: user.account.username, filter: 'in_process' } }")
							i.material-icons inbox
							span In&nbsp;Process
					li
						router-link.btn-outline-danger(
							:to="{ name: 'applications',	params: { username: user.account.username, filter: 'rejected' } }")
							i.material-icons thumb_down
							span Rejected
					li
						router-link.btn-outline-warning(
							:to="{ name: 'applications',	params: { username: user.account.username, filter: 'rework' } }")
							i.material-icons refresh
							span In&nbsp;Rework
					li
						router-link.btn-outline-success(
							:to="{ name: 'applications',	params: { username: user.account.username, filter: 'approved' } }")
							i.material-icons thumb_up
							span Approved
				template(v-else-if="user.account.username")
					li
						router-link.btn-outline-primary(
							:to="{ name: 'applications', params: { username: user.account.username, filter: 'in_process' } }")
							i.material-icons library_books
							span Applications
				li.float-xs-right(v-if="user.account.username")
					router-link.btn-outline-info(:to="{ name: 'apply', params: { username: user.account.username } }")
						i.material-icons add
						span Apply
</template>

<script>

	import appView from './../app.vue'

	export default {
		name: 'innopoints-main',

		data() {
			return {
				route: this.$route,
				user: this.$root.user,
			}
		},

		components: {
			appView
		},

		methods: {
			filter_changed(e) {
				this.$router.go(
					{
						name: 'applications',
						params: {
							username: this.user.account.username,
							filter: e.target.dataset.value
						}
					}
				);
			}
		}
	}
</script>
