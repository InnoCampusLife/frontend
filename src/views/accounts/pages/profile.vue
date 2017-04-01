<template lang="pug">
	.container
		template(v-if="isLoading")
			.text-center
				md-spinner(md-indeterminate, :md-size="100")
		template(v-else)
			md-card
				md-card-content
					.row
						.col-12.col-md-auto
							p
								//- img.rounded-circle(:src="'https://api.adorable.io/avatars/285/' + username", alt='Avatar')
								avatar(:username="fullName | placeholder(username)", :size="240")
						.col
							md-list.md-double-line
								md-list-item
									.md-list-text-container
										span {{ username | placeholder('-') }}
										span Username
								md-list-item
									.md-list-text-container
										span {{ firstName | placeholder('-') }}
										span First Name
								md-list-item
									.md-list-text-container
										span {{ lastName | placeholder('-') }}
										span Last Name
								md-list-item
									.md-list-text-container
										span {{ studyGroup | placeholder('-') }}
										span Study Group
								md-list-item
									.md-list-text-container
										span {{ role | capitalize }}
										span Role
</template>

<script>
	import { Avatar as avatar } from 'vue-avatar'
	import { capitalize } from 'lodash'
	import { mapState, mapGetters } from 'vuex'

	export default {
		name: 'accounts-account',

		data () {
			return {
				isLoading: false,

				username: '',
				firstName: '',
				lastName: '',
				studyGroup: '',
				role: '',
				id: '',
			}
		},

		components: {
			avatar,
		},

		filters: {
			capitalize,
		},

		created() {
			this.getProfile()
		},

		watch: {
			'$route': 'getProfile'
		},

		computed: {
			fullName () {
				if (this.firstName === '' || this.lastName === '') {
					return this.firstName + this.lastName
				}
				return this.firstName + ' ' + this.lastName
 			},
		},

		methods: {
			getProfile () {
				this.isLoading = true

				this.$root.api.accounts.bio.one({ id: this.$store.state.route.params.id })
					.then((json) => {
						console.log('Got profile:', json.result)
						this.isLoading = false
						this.username = json.result.username
						this.firstName = json.result.firstName || ''
						this.lastName = json.result.lastName || ''
						this.studyGroup = json.result.studyGroup || ''
						this.role = json.result.role
						this.id = json.result.id
					})
					.catch((err) => {
						console.error('Failed to get profile:', err)
					})
			},
		}
	}
</script>