<template lang="pug">
	main
		md-sidenav.md-fixed.md-left(ref="leftSidenav")
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
						md-subheader(v-if="isModerator") Innopoints

						router-link(
							tag="md-list-item",
							:to="{ name: 'applications' }",
						)
							md-icon stars
							span Applications

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
								:to="{ name: 'manage-accounts' }",
							)
								md-icon supervisor_account
								span Accounts

							router-link(
								tag="md-list-item",
								:to="{ name: 'manage-orders' }",
							)
								md-icon receipt
								span Orders

							router-link(
								tag="md-list-item",
								:to="{ name: 'manage-applications' }",
							)
								md-icon insert_drive_file
								span Applications

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

	import storage from './../storage'
	import config from './../config'

	export default {
		name: 'sidenav',

		components: {
			avatar,
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

			logOut () {
				storage.clear()
				this.$router.push('/login')
			},

			updateState () {
				if (storage.getItem(config.tokenName)) {
					this.updateAccounts()
						.then((result) => {
							console.log('Updated accounts state:', result)
						})
						.catch((err) => {
							console.error('Failed to update accounts state:', err)
							if (err === 'Unknown token') this.logOut()
						})

					this.updateInnopoints()
						.then((result) => {
							console.log('Updated innopoints state:', result)
						})
						.catch((err) => {
							console.error('Failed to update innopoints state:', err)
							if (err === 'ERROR IN ACCOUNTS MICROSERVICE') this.logOut()
						})
				} else {
					this.clearAccounts()
					this.clearInnopoints()
				}
			},
		}
	}
</script>