<template lang="pug">
	.container
		template(v-if="isLoading")
			.text-center
				md-spinner(md-indeterminate, :md-size="100")
		template(v-else)
			md-card
				md-card-content
					.row
						.col-sm.text-sm-right
							p Username
						.col-sm
							p.font-weight-bold {{ username }}
					.row
						.col-sm.text-sm-right
							p Role
						.col-sm
							p.font-weight-bold {{ role | capitalize }}
					.row
						.col-sm.text-sm-right
							p First Name
						.col-sm
							p.font-weight-bold {{ firstName | placeholder('—') }}
					.row
						.col-sm.text-sm-right
							p Last Name
						.col-sm
							p.font-weight-bold {{ lastName | placeholder('—') }}
					.row
						.col-sm.text-sm-right
							p Email
						.col-sm
							p.font-weight-bold {{ email | placeholder('—') }}
					.row
						.col-sm.text-sm-right
							p Innopoints
						.col-sm
							p.font-weight-bold {{ points_amount | currency('IUP ') }}

			// md-card
			// 	md-card-header
			// 		.row
			// 			.col-12.col-sm-auto
			// 				p
			// 					img.rounded-circle(:src="'https://api.adorable.io/avatars/285/' + username", alt='Avatar')
			// 			.col
			// 				md-card-header-text
			// 					.md-title Title goes
			// 					.md-subhead Subtitle here

</template>

<script>
	import { capitalize } from 'lodash'

	import { mapState, mapGetters } from 'vuex'

	export default {
		name: 'accounts-account',

		data() {
			return {
				isLoading: false,
			}
		},

		filters: {
			capitalize
		},

		computed: {
			...mapState('innopoints', [
				'points_amount',
			]),

			...mapState('accounts', [
				'username',
				'role',
				'firstName',
				'lastName',
				'email'
			]),

			...mapGetters('accounts', [
				'fullName',
			]),
		},
	}
</script>