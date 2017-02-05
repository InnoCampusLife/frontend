<template>
	<router-view></router-view>
</template>

<script>

	import { mapActions } from 'vuex'

	import accounts from './../modules/accounts'
	import innopoints from './../modules/innopoints'

	import modules from './../modules'

	export default {
		name: 'main',

		data() {
			return {
				user: {
					account: modules.accounts,
					innopoints: modules.innopoints,
				},

				api: {
					accounts,
					innopoints,
				}
			}
		},

		created() {
			this.updateState()
		},

		watch: {
			'$route': 'updateState',
		},

		// For testing
		methods: {
			...mapActions({
				updateAccounts: 'accounts/update',
				updateInnopoints: 'innopoints/update',
			}),

			updateState() {
				this.updateAccounts()
					.then((json) => {
						// console.log('Accounts update result:', json)
					})
					.catch((err) => {
						console.error('Couldn\'t update accounts:', err.message)
					})

				this.updateInnopoints()
					.then((json) => {
						// console.log('Innopoints update result:', json)
					})
					.catch((err) => {
						console.error('Couldn\'t update innopoints:', err.message)
					})
			},
		}
	}
</script>