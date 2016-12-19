<template lang="jade">
	
	aside.sidebar-main
		header
			h1 
				a(href="", v-link="'/'")
					span U
					span I
					span S
		ul.menu
			li
				a(href="", v-link="{ name: 'profile', params: { username: user.account.username } }")
					i.material-icons account_circle
					span Profile
			li
				a(href="", v-link="{ name: 'applications', params: { username: user.account.username, filter: 'in_process' } }")
					i.material-icons stars
					span Innopoints
					span.innopoints(v-show='user.account.isStudent && !user.innopoints.isAdmin', v-text='user.innopoints.data.amount')
			li
				a(href="", v-link="{ name: 'store' }")
					i.material-icons store
					span Store
			li(v-if='user.account.isModerator')
				a(href="", v-link="{ name: 'accounts' }")
					i.material-icons supervisor_account
					span Accounts
		footer
			a(href="", @click='logout', block='')
				i.material-icons arrow_back
				span Log Out

</template>

<script>

	export default {
		
		data() {
			return {
				user: this.$router.app.user
			}
		},
		
		methods: {
			
			logout(e) {
				this.user.account.clear();
				this.$router.go('/login');
			}
		}
	}
</script>
