<template lang="jade">
	content
		div(slot='header')
			.search-group.input-group
				input#search.form-control(type="search", placeholder="Search {{ $route.name | capitalize }}", v-model="$router.app.query", v-show="$route.path.includes('applications')")
				span.input-group-btn
					button.btn.btn-secondary(type='button') 🔍
			template(v-if="$route.path.includes('applications')")
				ul.header-nav
					li
						button.btn.btn-secondary(v-link="{name: 'applications',	params: { username: user.account.username, filter: 'all' } }" v-if="!user.innopoints.data.isAdmin") All
					li
						button.btn.btn-secondary(v-link="{name: 'applications',	params: { username: user.account.username, filter: 'in_process' } }") In&nbsp;process
					li
						button.btn.btn-secondary(v-link="{name: 'applications',	params: { username: user.account.username, filter: 'rejected' } }") Rejected
					li
						button.btn.btn-secondary(v-link="{name: 'applications',	params: { username: user.account.username, filter: 'rework' } }") In&nbsp;rework
					li
						button.btn.btn-secondary(v-link="{name: 'applications',	params: { username: user.account.username, filter: 'approved' } }") Approved
					li
						button.btn.btn-secondary(v-link="{ name: 'apply', params: { username: user.account.username } }")
							span Apply
			template(v-else)
				ul.header-nav
					li
						button.btn.btn-secondary(v-link="{ name: 'applications', params: { username: user.account.username, filter: 'in_process' } }") Applications
</template>

<script>
	var content = require('./../content.vue');

	module.exports = {
		data : function () {
			// var route = this.$route;
			return {
				route: this.$route,
				user : this.$root.user,
			}
		},
		components : {
			content:content
		},
		methods : {
			filter_changed : function(e) {
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
