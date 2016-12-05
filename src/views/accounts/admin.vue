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

<template>
	<div class="container">
		<div class="card card-block">
			
			<h1 class="card-title mb-1">Registered users</h1>

			<p class="text-xs-center" v-show="$loadingRouteData">Loading Users</p>

			<div class="table-responsive" v-show="users.length">
				<table class="table  table-striped table-bordered">
					<thead>
						<tr>
							<th class="text-xs-center" @click="sortBy('id')">#</th>
							<th class="text-xs-center" @click="sortBy('username')">Username</th>
							<th class="text-xs-center" @click="sortBy('firstName')">First Name</th>
							<th class="text-xs-center" @click="sortBy('lastName')">Last Name</th>
							<th class="text-xs-center" @click="sortBy('tgId')">Alias</th>
							<th class="text-xs-center" @click="sortBy('role')">Role</th>							
						</tr>
					</thead>
					<tbody>
						<tr v-for="u in users">
							<th scope="row">{{ $index + 1 }}</td>
							<td >{{ u.username }}</td>
							<td>{{ u.firstName | capitalize}}</td>
							<td>{{ u.lastName | capitalize}}</td>
							<td>@{{ u.tgId }}</td>
							<td class="text-xs-center p-0">
								<select class="form-control" name="role_select" id="user_{{ u.id }}" @change="selectChanged">
									<option value="ghost" :selected="u.role == 'ghost'">Ghost</option>
									<option value="student" :selected="u.role == 'student'">Student</option>
								</select>
							</td>
						</tr>
					</tbody>
				</table>
			</div>

			<!-- Fix disabling -->
			<button :disabled="selectChanged" class="btn btn-primary btn-lg btn-block" id="acceptRoles" @click="sendRoles" @keyup.enter="sendRoles">Save Changes</button>
		</div>
	</div>
</template>

<script>
	module.exports = {
		data() {
			return {
				sortKey: 1,
				users : [],
				dirty: false
			}
		},
		props : ['user', 'roleChanged'],
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