<style lang="less">
</style>

<template lang="pug">
	.container(slot="content")
		p.text-xs-center(v-show='isLoading') Loading&mldr;
		.card.card-block(v-show="!isLoading")
			.table-responsive
				table.table.table-striped.table-bordered
					thead
						tr
							th.text-xs-center(@click="sortBy('id')") #
							th.text-xs-center(@click="sortBy('username')") Username
							th.text-xs-center(@click="sortBy('firstName')") First Name
							th.text-xs-center(@click="sortBy('lastName')") Last Name
							th.text-xs-center(@click="sortBy('tgId')") Alias
							th.text-xs-center(@click="sortBy('role')") Role
					tbody
						tr(v-for='(u, index) in users')
							th(scope='row') {{ index + 1}}
							td {{ u.username }}
							td {{ u.firstName }}
							td {{ u.lastName }}
							td @{{ u.tgId }}
							td.text-xs-center.p-0
								select.form-control(name='role_select', :id="'user_' + u.id", @change='selectChanged')
									option(value='ghost', :selected="u.role == 'ghost'") Ghost
									option(value='student', :selected="u.role == 'student'") Student
			// Fix disabling
			button#acceptRoles.btn.btn-primary.btn-lg.btn-block(:disabled='selectChanged', @click='sendRoles', @keyup.enter='sendRoles') Save Changes
</template>

<script>
	export default {
		name: 'accounts-accounts',

		data() {
			return {
				isLoading: false,
				users: [],
			}
		},

		props: ['user'],

		created() {
			this.fetchData()
		},

		watch: {
			'$route': 'fetchData'
		},

		methods: {
			fetchData() {
				console.log('Fetching data.')
				this.isLoading = true
				this.users = []

				const self = this
				const api = this.$root.user
				api.account.list(
					(result) => {
						self.isLoading = false
						self.users =  result.sort(this.compareBy('id'))
					},
					(error) => console.log(error)
				)
			},

			selectChanged(e) {
				this.roleChanged(e);
			},

			sendRoles(e) {
				var update = this.$router.app.user.account.updateRole;
				this.users.forEach(user => {
					var newRole = document.getElementById('user_' + user.id).value;
					if (newRole != user.role) update(user.id, user.role = newRole);
				});
				e.target.textContent = "Saved";
			},

			roleChanged(e) {
				acceptRoles.textContent = "Save Changes";
			},

			sortBy(key) {
				this.users.sort(this.compareBy(key))
			},

			compareBy(key) {
				return (a, b) => {
					if (a[key] < b[key]) return -1
					if (a[key] > b[key]) return 1
					return 0
				}
			},
		},
	}
</script>