<template>
	<div block center children>
		<h3>{{ user.role | capitalize }}'s dashboard</h3>
	</div>
	<div flex column center children>
		<button padding margin style="width: 100%; border-width: 0;" block v-link="'/'"
		>main</button>
		<button padding margin style="width: 100%; border-width: 0;" block v-link="'/test'"
		>test</button>
		<button padding margin style="width: 100%; border-width: 0;" block v-link="'/innopoints/get'"
		>innopoints</button>
		<button padding margin style="width: 100%; border-width: 0;" block v-link="'/user/profile'"
		>my profile</button>
		<button padding margin style="width: 100%; border-width: 0;" block v-link="'/user/administration'"	v-if="user.isAdmin"
		>admin_side</button>
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