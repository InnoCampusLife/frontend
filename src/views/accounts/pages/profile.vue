<style lang="scss">
</style>

<template lang="pug">
	.container
		md-card
			md-card-content
				.row.align-items-center
					.col-12.col-md-auto
							//- img.rounded-circle(:src="'https://api.adorable.io/avatars/285/' + username", alt='Avatar')
							avatar.mx-auto(
								:username="fullName | placeholder(username)",
								:size="240",
								style="width: 240px;",
							)
					.col
						.my-5
							p
								span.text-muted Username:
								span  {{ username | placeholder('-') }}
							p
								span.text-muted First Name:
								span  {{ firstName | placeholder('-') }}
							p
								span.text-muted Last Name:
								span  {{ lastName | placeholder('-') }}
							p
								span.text-muted Study Group:
								span  {{ studyGroup | placeholder('-') }}
							p
								span.text-muted Role:
								span  {{ role | capitalize }}

							//- 		md-input-container(disabled)
							//- 			label(for="role") Role
							//- 			md-select(
							//- 				id="role",
							//- 				name="role",
							//- 				:value="role | placeholder('-')",
							//- 			)
							//- 				md-option(value="ghost") Ghost
							//- 				md-option(value="student") Student
							//- 				md-option(value="moderator") Moderator
</template>

<script>
	import { Avatar as avatar } from 'vue-avatar'
	import { capitalize } from 'lodash'
	import { mapGetters } from 'vuex'

	export default {
		name: 'accounts-account',

		data () {
			return {
				// isLoading: false,

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
			$route: 'getProfile'
		},

		computed: {
			...mapGetters('accounts', [
				'isModerator',
				'fullName',
			]),

			isStudentProfile () {
				return this.role === 'student'
			},

			fullName () {
				if (this.firstName === '' || this.lastName === '') {
					return this.firstName + this.lastName
				}
				return this.firstName + ' ' + this.lastName
 			},
		},

		methods: {
			changeRole () {
				this.$root.api.accounts.update({
					accountId: this.id,
					newRole: this.role === 'ghost' ? 'student' : 'ghost',
				})
				.then((json) => {
					console.log('Updated profile:', json.result)
				})
				.catch((err) => {
					console.error('Failed to update profile:', err)
				})
			},

			getProfile () {
				// this.isLoading = true

				this.$root.api.accounts.bio.one({ id: this.$store.state.route.params.id })
					.then((json) => {
						console.log('Got profile:', json.result)
						// this.isLoading = false
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