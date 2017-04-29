<style lang="less" scoped>
</style>

<template lang="pug">
	.container
		md-table-card
			md-toolbar
				.row-wrapper(style="flex: 1")
					.row
						.col.col-auto
							md-input-container
								md-icon filter_list
								md-select(
									id="filter",
									name="filter",
									@change="filterBy",
									v-model="filter",
									value="",
								)
									md-option(value="") All
									md-option(value="student") Student
									md-option(value="ghost") Ghost
			md-table(md-sort="id" @sort="sort")
				md-table-header
					md-table-row
						md-table-head(md-numeric, md-sort-by="id") #
						md-table-head(md-sort-by="username") Username
						md-table-head(md-sort-by="firstName") First Name
						md-table-head(md-sort-by="lastName") Last Name
						md-table-head(md-sort-by="tgId") Alias
						md-table-head(md-sort-by="role") Role
				md-table-body
					md-table-row(v-for="(a, index) in filterBy(accounts, filter, ['role'])", :key="a.id")
						md-table-cell(md-numeric) {{ index + 1}}
						md-table-cell
							router-link(:to="{ name: 'profile', params: { id: a.id } }") {{ a.username }}
						md-table-cell {{ a.firstName }}
						md-table-cell {{ a.lastName }}
						md-table-cell {{ a.tgId | placeholder('-') }}
						md-table-cell {{ a.role | capitalize }}
</template>

<script>
	import { capitalize, reverse, sortBy } from 'lodash'
	import { Account } from './../../../modules/accounts/accounts-api.ts'

	export default {
		name: 'accounts-accounts',

		data () {
			return {
				isLoading: false,
				filter: "",
				accounts: [],
			}
		},

		filters: {
			capitalize,
		},

		created() {
			this.getAccounts()
		},

		watch: {
			$route: 'getAccounts'
		},

		methods: {
			getAccounts() {
				this.isLoading = true

				Account.many()
					.then((accounts) => {
						console.log('Got accounts:', accounts)
						this.isLoading = false
						this.accounts = accounts
					})
					.catch((err) => {
						console.error('Failed to get accounts:', err)
					})
			},

			sort (property) {
				this.users = property.type === 'asc'
					? sortBy(this.users, property.name)
					: reverse(sortBy(this.users, property.name))
			},
		},
	}
</script>