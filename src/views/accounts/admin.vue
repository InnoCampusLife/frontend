<template>
	<div block>
		<h1>List of registered users:</h1>

		<p v-if="$loadingRouteData">Loading users' list...</p>

		<ul>
			<li v-for="user in users">
				<hr>
				<user :user="user" :role-changed="roleChanged"></user>
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
		data : function () {
			return {
				users : [],
				dirty: false
			}
		},
		components : {
			user : require('./user.vue')
		},
		methods: {
			sendRoles : function (e) {
				var update = this.$router.app.user.account.updateRole;
				this.users.forEach(user => {
					var newRole = document.getElementById('a' + user.id).value;
					if (newRole != user.role) update(user.id, user.role = newRole);
				});

				e.target.textContent = "accepted ✓";
			},
			roleChanged : function(e) {
				document.getElementById('acceptRoles').textContent = "accept changes";
			}
		},
		route: {
			data  : function (transition) {
				var api = this.$root.user;
				api.account.list(result => {
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