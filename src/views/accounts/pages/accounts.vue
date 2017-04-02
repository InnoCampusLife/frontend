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
					md-table-row(v-for="(u, index) in filterBy(users, filter, ['role'])", :key="u.id")
						md-table-cell(md-numeric) {{ index + 1}}
						md-table-cell
							router-link(:to="{ name: 'profile', params: { id: u.id } }") {{ u.username }}
						md-table-cell {{ u.firstName }}
						md-table-cell {{ u.lastName }}
						md-table-cell {{ u.tgId | placeholder('-') }}
						md-table-cell {{ u.role | capitalize }}
</template>

<script>
	import * as _ from 'lodash'
	import { capitalize } from 'lodash'

	export default {
		name: 'accounts-accounts',

		data () {
			return {
				isLoading: false,
				filter: "",
				users: [],
			}
		},

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

			sort (property) {
				this.users = property.type === 'asc'
					? _.sortBy(this.users, property.name)
					: _.reverse(_.sortBy(this.users, property.name))
			},
		},
	}
</script>