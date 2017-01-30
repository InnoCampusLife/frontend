<template lang="pug">
	.layout

		md-sidenav.md-left(md-theme="sidenav", ref="leftSidenav")
			header
				// md-toolbar
				// 	.md-toolbar-container
				// 		h1.md-title.text-center
				// 			span UIS
				md-toolbar.md-account-header(md-theme="blue")
					md-list.md-transparent
						md-list-item.md-avatar-list(disabled)
							md-avatar.md-large
								img(src='https://placeimg.com/64/64/people/8', alt='People')
							span(style='flex: 1')
							// md-avatar
							// 	img(src='https://placeimg.com/40/40/people/3', alt='People')
							// md-avatar
							// 	img(src='https://placeimg.com/40/40/people/4', alt='People')
						md-list-item
							.md-list-text-container
								span {{ username }}
								span {{ points_amount }}
							// md-button.md-icon-button.md-list-action
							// 	md-icon arrow_drop_down
			main
				md-list
					router-link(
						tag="md-list-item",
						v-if="username",
						:to="{ name: 'account', params: { username } }",
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

						md-divider

					router-link(
						tag="md-list-item",
						v-if="user.account.isModerator",
						:to="{ name: 'accounts' }",
					)
						md-icon supervisor_account
						span Accounts

						md-divider

					md-list-item(@click='logOut')
						md-icon arrow_back
						span Log Out

			// footer
			// 	md-list
			// 		router-link(
			// 			tag="md-list-item",
			// 			v-if="user.account.username",
			// 			:to="{ name: 'account', params: { username: user.account.username } }",
			// 		)
			// 			md-icon account_circle
			// 			span Account

		main

			header.app-bar
				md-theme(md-name="dark")
					md-whiteframe(md-tag="md-toolbar", md-elevation="4")
						.md-toolbar-container
							md-button.md-icon-button(@click='toggleLeftSidenav')
								md-icon menu
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