<template lang="pug">
	// <md-sidenav class="md-left md-fixed" ref="leftSidenav" @open="open('Left')" @close="close('Left')">
	// 	<md-toolbar class="md-large">
	// 		<div class="md-toolbar-container">
	// 			<h3 class="md-title">Sidenav content</h3>
	// 		</div>
	// 	</md-toolbar>
	// 	<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nisi cupiditate esse necessitatibus beatae nobis, deserunt ut est fugit, tempora deleniti, eligendi commodi doloribus. Nemo, assumenda possimus, impedit inventore perferendis iusto!</p>
	// </md-sidenav>

	aside.sidebar-main
		header
			h1
				router-link(to="/") UIS
		ul.menu
			li(v-if="user.account.username")
				router-link(:to="{ name: 'account', params: { username: user.account.username } }")
					i.material-icons account_circle
					span Account
			li(v-if="user.account.username")
				router-link(:to="{ name: 'applications', params: { username: user.account.username, filter: 'in_process' } }")
					i.material-icons stars
					span Innopoints
					span.innopoints(v-show='user.account.isStudent && !user.innopoints.isAdmin', v-text='user.innopoints.data.amount')
			li
				router-link(:to="{ name: 'store' }")
					i.material-icons store
					span Store
		ul.menu
			li(v-if='user.account.isModerator')
				router-link(:to="{ name: 'accounts' }")
					i.material-icons supervisor_account
					span Accounts
		footer
			a(href="", @click='logout')
				i.material-icons arrow_back
				span Log Out
</template>

<script>
	export default {
		name: 'sidebar',

		data() {
			return {
				user: this.$router.app.user
			}
		},

		methods: {
			logout(e) {
				this.user.account.clear();
				this.$router.push('/login');
			}
		}
	}
</script>
