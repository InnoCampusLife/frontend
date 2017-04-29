<template lang="pug">
	main
		md-sidenav.md-left(ref="leftSidenav")
			header
				md-theme(md-name="teal")
					md-toolbar.md-account-header
						md-list.md-transparent
							md-list-item.md-avatar-list(disabled)
								md-avatar.md-large
									//- img(:src="`https://api.adorable.io/avatars/285/${username}`", alt='Avatar')
									avatar(:username="fullName | placeholder(username)", :size="64")
								span(style='flex: 1')
							router-link(
								tag="md-list-item",
								:to="{ name: 'account' }",
							)
								.md-list-text-container
									span {{ username }}
									span {{ points_amount | currency('IUP ', 0) }}
								//- md-button.md-icon-button.md-list-action
								//- 	md-icon arrow_drop_down
				md-divider
			main
				section
					md-list
						md-subheader(v-if="isModerator") Navigate

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

					template(v-if="isModerator")
						md-divider
						md-list
							md-subheader Manage
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

		router-view(@toggleLeftSidenav="toggleLeftSidenav")
</template>

<script>
	import { Avatar as avatar } from 'vue-avatar'
	import { mapActions, mapGetters, mapMutations, mapState } from 'vuex'

	import accounts from 'Modules/accounts'
	import innopoints from 'Modules/innopoints'

	import storage from './../storage'
	import config from './../config'

	// Testing
	import { accounts as newAccounts } from 'Modules/accounts/accounts-api'

	export default {
		name: 'main',

		components: {
			avatar,
		},

		data () {
			return {
				api: {
					accounts,
					innopoints,
				},
			}
		},

		computed: {
			...mapState('innopoints', [
				'points_amount',
			]),

			...mapState('accounts', [
				'username',
			]),

			...mapGetters('accounts', [
				'fullName',
				'isModerator',
			]),
		},

		created() {
			this.updateState()
		},

		watch: {
			$route: ['closeLeftSidenav', 'updateState'],
		},

		// For testing
		methods: {
			...mapActions({
				updateAccounts: 'accounts/update',
				updateInnopoints: 'innopoints/update',
			}),

			...mapMutations({
				clearAccounts: 'accounts/clear',
				clearInnopoints: 'innopoints/clear',
			}),

			toggleLeftSidenav () {
				this.$refs.leftSidenav.toggle()
			},

			closeLeftSidenav () {
				this.$refs.leftSidenav.close()
			},

			logOut (e) {
				storage.clear()
				this.$router.push('/login')
			},

			updateState () {
				if (storage.getItem(config.tokenName)) {
					Promise.all([
						this.updateAccounts(),
						this.updateInnopoints(),
					]).then((jsons) => {
						console.log('Updated state:', jsons)
					}).catch((err) => {
						console.error('Failed to update state:', err)
					})
				} else {
					this.clearAccounts()
					this.clearInnopoints()
				}
			},
		}
	}
</script>
