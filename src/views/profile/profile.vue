<template lang="jade">
	.container
		p.text-xs-center(v-if="isLoading") Loading&mldr;
		.card.card-block(v-else-if="user")
			.row
				.col-sm.text-sm-right
					p Username
				.col-sm
					p.font-weight-bold {{ user.username }}
			.row
				.col-sm.text-sm-right
					p Role
				.col-sm
					p.font-weight-bold {{ user.role | capitalize }}
			.row
				.col-sm.text-sm-right
					p First Name
				.col-sm
					p.font-weight-bold {{ user.firstName }}
			.row
				.col-sm.text-sm-right
					p Last Name
				.col-sm
					p.font-weight-bold {{ user.lastName }}
			.row
				.col-sm.text-sm-right
					p Alias
				.col-sm
					p.font-weight-bold {{ user.tgId }}
			.row
				.col-sm.text-sm-right
					p Study Group
				.col-sm
					p.font-weight-bold {{ user.studyGroup }}
</template>

<script>
	import { capitalize } from 'lodash'

	export default  {
		name: 'profile-profile',

		data() {
			return {
				isLoading: false,
				user: null,
			}
		},

		filters: {
			capitalize
		},

		created() {
			this.fetchData()
		},

		watch: {
			'$route': 'fetchData'
		},

		methods: {
			fetchData() {
				console.log("Fetching data in profile-profile")

				this.isLoading = true
				this.user = null

				const self = this
				const username = this.$route.params.username
				const user = this.$root.user.account

				if (user.username != username) {
					console.log("Fetching data for " + username)
					user.getBio({ username },
						(result) => {
							console.log('Bio: ', result)
							self.isLoading = false
							self.user = result
						}
					)
				} else {
					if (user.id) {
						self.isLoading = false
						self.user = user
					} else {
						user.exists((result) => {
							self.isLoading = false
							self.user = user
						})
					}
				}
			},
		},
	}
</script>