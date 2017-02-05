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

		mounted() {
			console.log('Main is mounted.')
		},

		// For testing
		created() {
			console.log('Main is created.')
			this.fetchData()
			this.updateState()
		},

		data() {
			return {
				user: {
					account: modules.accounts,
					innopoints: modules.innopoints,
				},

				// For testing
				api: {
					accounts,
					innopoints,
				}
			}
		},

		watch: {
			// '$route': 'fetchData',
			'$route': 'updateState',
		},

		// For testing
		methods: {

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

			...mapActions({
				updateAccounts: 'accounts/update',
				updateInnopoints: 'innopoints/update',
			}),

			fetchData() {
				// const self = this
				// this.modules.accounts.methods.self()
				// 	.then((json) => {
				// 		self.modules.accounts = json.result
				// 		console.log('Self: ', self.modules.accounts)
				// 	}).catch((err) => console.log("Couldn't fetch data: ", err))

				// console.log('Accounts data: ', this.$router.app.accounts)

				// accounts.methods.exists({ username: 'sstudent' })
				// 	.then((json) => console.log('Fetched data: ', json))
				// 	.catch((err) => console.log("Couldn't fetch data: ", err))

				// accounts.methods.getBio({ username: 'qweqweqweqwe' })
				// 	.then((json) => {
				// 		console.log('Got bio: ', json)
				// 		const accountId = json.result.id
				// 		const newRole = 'student'
				// 		return accounts.methods.updateRole({ accountId, newRole })
				// 	}).then((json) => console.log('Updated role: ', json))
				// 	.catch((err) => console.log("Couldn't fetch data: ", err))

				// accounts.create({
				// 	username: 'qweqweqweqweqwe',
				// 	password: 'qweqweqweqweqwe',
				// 	firstName: 'qwe',
				// 	lastName: 'qwe',
				// 	email: 'qweqweqwe@qwe.qwe',
				// }).then((json) => console.log('Fetched data:', json))
				// 	.catch((err) => console.error("Couldn't fetch data:", err))

				// accounts.methods.auth({ username: 'qweqweqweqwe', password: 'qweqweqweqwe' })
				// 	.then((json) => console.log('Fetched data: ', json))
				// 	.catch((err) => console.log("Couldn't fetch data: ", err))
			}
		}
	}
</script>