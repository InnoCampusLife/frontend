<template>
	<div block center children>
		<h3>{{ user.role | capitalize }}'s dashboard</h3>
	</div>
	<div flex column center children>
		<button padding margin style="width: 100%; border-width: 0;" block v-link="'/'"
		>main</button>
		<!-- Sudent buttons here -->
		<template v-if="user.isStudent">
			<button padding margin style="width: 100%; border-width: 0;" block v-link="'/account'"
			>my profile</button>
			<button padding margin style="width: 100%; border-width: 0;" block v-link="'/account/uis'"
			>uis profile</button>
			<button padding margin style="width: 100%; border-width: 0;" block v-link="'/account/uis/innopoints'"
			>innopoints profile</button>
			<button padding margin style="width: 100%; border-width: 0;" block v-link="'/account/uis/innopoints/get'"
			>innopoints</button>
		</template>
		<!-- Admin buttons here -->
		<template v-if="user.isAdmin">
			<button padding margin style="width: 100%; border-width: 0;" block v-link="'/administration/uis/accounts'"
			>admin_side</button>
		</template>
		<button padding="16" pinned bottom left style="width: 100%; border-width: 0; position: absolute;" block @click="logout"
		>logout</button>
	</div>
</template>

<script>
	import user from './../scripts/user.js'

	export default {
		data () {
			return {
				user : user
			}
		},
		methods : {
			logout () {
				this.user.clear();
				this.$router.go("/login");
			}
		},
		route: {
			data (transition) {
				accounts.get(
					user.token,
					function (result) {
						console.log("Called get in sidebar");
						user.set(result);
						transition.next({
							user : user
						});
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