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

		<button v-show="roleChanged" @click="sendRoles" @keyup.enter="sendRoles">accept changes</button>
	</div>
</template>

<script>
	import {accounts} from './../scripts/api.js'
	import {token} from './../scripts/user.js'

	export default {
		data () {
			return {
				users : [],
				moderToken : token,
				roleChanged : false
			}
		},
		methods: {
			sendRoles(e) {
				for (let user of this.users) {
					let newRole = document.getElementById('a' + user.id).value;
					if (newRole != user.role) accounts.updateRole(this.moderToken, user.id, user.role = newRole);
				}

				e.target.textContent = "accepted ✓";
			},
			selectChanged(e) {
				this.roleChanged = true;
			}
		},
		route: {
			data (transition) {
				accounts.exists(
					token,
					function () {
						console.log("Called exists in admin_side");
						accounts.list(
							token,
							function (result) {
								transition.next({
									users : result
								});
							},
						 	transition.abort //Don't let non-moder enter this 'page'.
						);
					},
					function(error) {
				 		user.clear();
				 		transition.redirect('/login');
					}
				);
			}
		}
	}
</script>