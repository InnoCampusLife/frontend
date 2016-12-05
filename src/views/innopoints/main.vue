<template lang="jade">
	content
		div(slot='header')
			.search-group.input-group(v-show="$route.path.includes('applications')")
				input#search.form-control(type="search", placeholder="Search {{ $route.name | capitalize }}", v-model="$router.app.query")
				span.input-group-btn
					button.btn.btn-secondary(type='button') 🔍
			ul.header-nav
				template(v-if="$route.path.includes('applications')")
					li
						button.btn.btn-outline-primary(v-link="{name: 'applications',	params: { username: user.account.username, filter: 'all' } }" v-if="!user.innopoints.data.isAdmin") 📑 All
					li
						button.btn.btn-outline-primary(v-link="{name: 'applications',	params: { username: user.account.username, filter: 'in_process' } }") 📥 In&nbsp;process
					li
						button.btn.btn-outline-danger(v-link="{name: 'applications',	params: { username: user.account.username, filter: 'rejected' } }") 👎 Rejected
					li
						button.btn.btn-outline-warning(v-link="{name: 'applications',	params: { username: user.account.username, filter: 'rework' } }") 🔃 In&nbsp;rework
					li
						button.btn.btn-outline-success(v-link="{name: 'applications',	params: { username: user.account.username, filter: 'approved' } }") 👍 Approved
				template(v-else)
					li
						button.btn.btn-outline-secondary(v-link="{ name: 'applications', params: { username: user.account.username, filter: 'in_process' } }") 📄 Applications
				li.float-xs-right
					button.btn.btn-outline-info(v-link="{ name: 'apply', params: { username: user.account.username } }") 📝 Apply
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
