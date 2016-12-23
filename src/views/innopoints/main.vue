<template lang="jade">
	content
		div(slot='header')

			.search-group.input-group(v-show="$route.path.includes('applications')")
				input#search.form-control(type="search", placeholder="Search {{ $route.name | capitalize }}", v-model="$router.app.query")
				span.input-group-btn
					button.btn.btn-secondary(type='button')
						i.material-icons search

			ul.header-nav
				template(v-if="$route.path.includes('applications')")
					li(v-if="!user.innopoints.data.isAdmin")
						a.btn-outline-primary(v-link="{name: 'applications',	params: { username: user.account.username, filter: 'all' } }")
							i.material-icons description
							span All
					li
						a.btn-outline-primary(v-link="{name: 'applications',	params: { username: user.account.username, filter: 'in_process' } }")
							i.material-icons inbox
							span In&nbsp;Process
					li
						a.btn-outline-danger(v-link="{name: 'applications',	params: { username: user.account.username, filter: 'rejected' } }")
							i.material-icons thumb_down
							span Rejected
					li
						a.btn-outline-warning(v-link="{name: 'applications',	params: { username: user.account.username, filter: 'rework' } }")
							i.material-icons refresh
							span In&nbsp;Rework
					li
						a.btn-outline-success(v-link="{name: 'applications',	params: { username: user.account.username, filter: 'approved' } }")
							i.material-icons thumb_up
							span Approved
				template(v-else)
				li
					a.btn-outline-primary(v-link="{ name: 'applications', params: { username: user.account.username, filter: 'in_process' } }")
						i.material-icons library_books
						span Applications
				li.float-xs-right
					a.btn-outline-info(v-link="{ name: 'apply', params: { username: user.account.username } }")
						i.material-icons add
						span Apply
</template>

<script>

	import content from './../content.vue'

	export default {

		data() {
			return {
				route: this.$route,
				user: this.$root.user,
			}
		},

		components: {
			content: content
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
