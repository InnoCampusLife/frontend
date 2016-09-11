<template>
	<div block>
		<h1>List of registered users:</h1>

		<p v-if="$loadingRouteData">Loading users' list...</p>

		<ul>
			<li v-for="user in users">
				<hr>
				{{$index}} : <p><span>{{ user.username }} ({{ user.role | capitalize }})</span> : <span>{{ user.fullname | capitalize}}</span> : <span>@{{ user.tgId }}</span>;</p>
				<select name="role_select" id="a{{ user.id }}" @change="selectChanged">
					<option value="ghost" :selected="user.role == 'ghost'">Ghost</option>
					<option value="student" :selected="user.role == 'student'">Student</option>
				</select>
			</li>
		</ul>

		<button padding style="border-width: 0px;width: 100%;height: 30px;"
			id="acceptRoles"
			v-show="roleChanged"
			@click="sendRoles"
			@keyup.enter="sendRoles"
		>accept changes</button>
	</div>
</template>

<script>
	module.exports = {
		data () {
			return {
				users : [],
				roleChanged : false
			}
		},
		methods: {
			sendRoles(e) {
				for (let user of this.users) {
					let newRole = document.getElementById('a' + user.id).value;
					if (newRole != user.role) this.$router.app.user.account.updateRole(user.id, user.role = newRole);
				}

				e.target.textContent = "accepted ✓";
			},
			selectChanged(e) {
				this.roleChanged = true;
				document.getElementById('acceptRoles').textContent = "accept changes";
			}
		},
		route: {
			data (transition) {
				var api = this.$router.app.user;
				api.account.list(
					function (result) {
						transition.next({
							users : result
						});
					},
				 	transition.abort //Don't let non-moder enter this 'page'.
				);
			}
		}
	}
</script>