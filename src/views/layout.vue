<template lang="pug">
	.layout

		md-sidenav.md-left(md-theme="sidenav", ref="leftSidenav")
			header
				md-theme(md-name="teal")
					md-whiteframe.md-account-header(md-tag="md-toolbar", md-elevation="1")
						md-list.md-transparent
							md-list-item.md-avatar-list(disabled)
								md-avatar.md-large
									img(:src="'https://api.adorable.io/avatars/285/' + username", alt='Avatar')
								span(style='flex: 1')
							md-list-item
								.md-list-text-container
									span {{ username }}
									span {{ points_amount | currency('IUP ') }}
								// md-button.md-icon-button.md-list-action
								// 	md-icon arrow_drop_down
			main
				section
					md-list
						router-link(
							tag="md-list-item",
							:to="{ name: 'account' }",
						)
							md-icon account_circle
							span Account

						router-link(
							tag="md-list-item",
							:to="{ name: 'applications' }",
						)
							md-icon stars
							span Innopoints

						router-link(
							tag="md-list-item",
							:to="{ name: 'store' }",
						)
							md-icon store
							span Store

					template(v-if="user.account.isModerator")
						md-divider
						md-list
							router-link(
								tag="md-list-item",
								:to="{ name: 'accounts' }",
							)
								md-icon supervisor_account
								span Accounts

				footer
					md-divider
					md-list
						md-list-item(@click='logOut')
							md-icon arrow_back
							span Log Out
		main
			header.app-bar
				md-theme(md-name="dark")
					md-whiteframe(md-tag="md-toolbar", md-elevation="4")
						.md-toolbar-container
							md-button.md-icon-button(@click='toggleLeftSidenav')
								md-icon menu
							.app-bar-container
								slot(name="app-bar")
			section
				.content
					slot(name="content")
				footer
					p.text-muted 2016 &copy; InnoDev
</template>

<script>
	import { mapState } from 'vuex'

	export default {
		name: 'layout',

		data() {
			return {
				user: this.$router.app.user,
			}
		},

		computed: {
			...mapState('innopoints', [
				'points_amount',
			]),

			...mapState('accounts', [
				'username',
			]),
		},

		methods: {
			toggleLeftSidenav() {
				this.$refs.leftSidenav.toggle();
			},

			logOut(e) {
				this.user.account.clear();
				this.$router.push('/login');
			},
		},
	}
</script>