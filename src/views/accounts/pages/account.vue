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
							md-input-container
								label(for="username") Username
								md-input(
									readonly,
									type="text",
									id="username",
									name="username",
									:value="username",
								)

							md-input-container
								label(for="email") Email
								md-input(
									readonly,
									type="text",
									id="email",
									name="email",
									:value="email | placeholder('-')",
								)

							md-input-container
								label(for="firstName") First Name
								md-input(
									readonly,
									type="text",
									id="firstName",
									name="firstName",
									:value="firstName | placeholder('-')",
								)

							md-input-container
								label(for="lastName") Last Name
								md-input(
									readonly,
									type="text",
									id="lastName",
									name="lastName",
									:value="lastName | placeholder('-')",
								)

							md-input-container
								label(for="innopointsNum") Innopoints
								md-input(
									readonly,
									type="text",
									id="innopointsNum",
									name="innopointsNum",
									:value="innopointsNum | currency('IUP ', 0)",
								)

							md-input-container
								label(for="role") Role
								md-input(
									readonly,
									type="text",
									id="role",
									name="role",
									:value="role | capitalize | placeholder('-')",
								)
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
			}
		},

		components: {
			avatar,
		},

		filters: {
			capitalize,
		},

		computed: {
			...mapState('innopoints', {
				innopointsNum: (state) => state.points_amount,
			}),

			...mapState('accounts', [
				'username',
				'role',
				'firstName',
				'lastName',
				'email',
			]),

			...mapGetters('accounts', [
				'fullName',
			]),
		},
	}
</script>