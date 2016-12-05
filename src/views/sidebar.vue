<template lang="jade">
	aside.sidebar-main
		header
			button.btn.btn-block(v-link="'/'", type='button')
				h1 UIS
		ul.menu
			li
				button.btn.btn-block.clearfix(v-link="{ name: 'profile', params: { username: user.account.username } }")
					span.icon.pe-7s-user
					span.title Profile
			li
				button.btn.btn-block.clearfix(v-link="{ name: 'applications', params: { username: user.account.username, filter: 'in_process' } }")
					span.icon.pe-7s-medal
					span.title Innopoints
					// span.info.right(v-show='user.account.isStudent && !user.innopoints.isAdmin', v-text='user.innopoints.data.amount')
			li
				button.btn.btn-block.clearfix(v-link="{ name: 'store' }")
					span.icon.pe-7s-shopbag
					span.title Store
			li(v-if='user.account.isModerator')
				button.btn.btn-block.clearfix(v-link="{ name: 'accounts' }")
					span.icon.pe-7s-users
					span.title Accounts
		footer
			button.btn.btn-block.clearfix(@click='logout', block='')
				span.icon.pe-7s-upload.pe-rotate-270
				span.title Log Out
</template>

<script>
	module.exports = {
		data : function () {
			return {
				user : this.$router.app.user
			}
		},
		methods: {
			logout : function (e) {
				this.user.account.clear();
				this.$router.go('/login');
			}
		}
	}
</script>
