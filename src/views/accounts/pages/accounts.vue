<style lang="less">
</style>

<template lang="pug">
	.container
		md-card
			md-card-content
				md-table
					md-table-header
						md-table-row
							md-table-head(md-numeric) #
							md-table-head Username
							md-table-head First Name
							md-table-head Last Name
							md-table-head Alias
							md-table-head Role
					md-table-body
						md-table-row(v-for='(u, index) in users', :key="u")
							md-table-cell(md-numeric) {{ index + 1}}
							md-table-cell
								router-link(:to="{ name: 'profile', params: { id: u.id } }") {{ u.username }}
							md-table-cell {{ u.firstName }}
							md-table-cell {{ u.lastName }}
							md-table-cell {{ u.tgId | placeholder('-') }}
							md-table-cell {{ u.role | capitalize }}
</template>

<script>
	import { capitalize } from 'lodash'

	export default {
		name: 'accounts-accounts',

		data () {
			return {
				isLoading: false,
				users: [],
			}
		},

		props: ['user'],

		filters: {
			capitalize,
		},

		created() {
			this.getAccounts()
		},

		watch: {
			'$route': 'getAccounts'
		},

		methods: {
			getAccounts() {
				this.isLoading = true

				this.$root.api.accounts.bio.many()
					.then((json) => {
						console.log('Got accounts:', json.result)
						this.isLoading = false
						this.users = json.result
					})
					.catch((err) => {
						console.error('Failed to get accounts:', err)
					})
			},
		},
	}
</script>