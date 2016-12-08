<style lang="less" scoped>

	/* Gotta fix this */
	.card {
		text-align: left;
	}

	td {
		vertical-align: middle;
	}

	select.form-control {
		padding: .25rem .5rem;
	}

</style>

<template lang="jade">
	.container
		p.text-xs-center(v-show='$loadingRouteData') Loading&mldr;
		.card.card-block(v-show="!$loadingRouteData")
			.table-responsive(v-show='users.length')
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
						tr(v-for='u in users')
							th(scope='row') {{$index + 1}}
							td {{u.username}}
							td {{u.firstName}}
							td {{u.lastName}}
							td @{{u.tgId}}
							td.text-xs-center.p-0
								select.form-control(name='role_select', id='user_{{ u.id }}', @change='selectChanged')
									option(value='ghost', :selected="u.role == 'ghost'") Ghost
									option(value='student', :selected="u.role == 'student'") Student
			// Fix disabling
			button#acceptRoles.btn.btn-primary.btn-lg.btn-block(:disabled='selectChanged', @click='sendRoles', @keyup.enter='sendRoles') Save Changes
</template>

<script>
	module.exports = {
		data() {
			return {
				sortKey: 1,
				users: [],
				dirty: false
			}
		},
		props: ['user', 'roleChanged'],
		methods: {
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
					// console.log(a, b, key)
					if (a[key] < b[key]) return -1
					if (a[key] > b[key]) return 1
					return 0
				}
			}
		},
		route: {
			data(transition) {
				var api = this.$root.user;
				api.account.list(result => {
						transition.next({
							users: result.sort(this.compareBy('id'))
						});
					},
				 	transition.abort //Don't let non-moder enter this 'page'.
				);
			}
		}
	}
</script>