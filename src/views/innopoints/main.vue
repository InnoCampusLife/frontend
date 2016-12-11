<template lang="jade">
	content
		div(slot='header')
			.search-group.input-group(v-show="$route.path.includes('applications')")
				input#search.form-control(type="search", placeholder="Search {{ $route.name | capitalize }}", v-model="$router.app.query")
				span.input-group-btn
					button.btn.btn-secondary(type='button') {{{':mag:' | emojify}}}
			ul.header-nav
				template(v-if="$route.path.includes('applications')")
					li
						button.btn.btn-outline-primary(v-link="{name: 'applications',	params: { username: user.account.username, filter: 'all' } }" v-if="!user.innopoints.data.isAdmin") 
							span {{{'📑' | emojify}}}
							span All
					li
						button.btn.btn-outline-primary(v-link="{name: 'applications',	params: { username: user.account.username, filter: 'in_process' } }") 
							span {{{'📥' | emojify}}}
							span In&nbsp;Process
					li
						button.btn.btn-outline-danger(v-link="{name: 'applications',	params: { username: user.account.username, filter: 'rejected' } }")
							span {{{':thumbsdown:' | emojify}}}
							span Rejected
					li
						button.btn.btn-outline-warning(v-link="{name: 'applications',	params: { username: user.account.username, filter: 'rework' } }") 
							span {{{':arrows_clockwise:' | emojify}}}
							span In&nbsp;Rework
					li
						button.btn.btn-outline-success(v-link="{name: 'applications',	params: { username: user.account.username, filter: 'approved' } }") 
							span {{{':thumbsup:' | emojify}}}
							span Approved
				template(v-else)
					li
						button.btn.btn-outline-secondary(v-link="{ name: 'applications', params: { username: user.account.username, filter: 'in_process' } }") 
							span {{{'📄' | emojify}}}
							span Applications
				li.float-xs-right
					button.btn.btn-outline-info(v-link="{ name: 'apply', params: { username: user.account.username } }") 
						span {{{'📝' | emojify}}}
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
