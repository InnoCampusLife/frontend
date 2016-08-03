<template>
	<div block>
		<span>{{ user.role | capitalize }}'s dashboard</span>
	</div>
	<div block>
		<button v-link="'/'"			title="">main</button>
		<button v-link="'/test'"		title="">test</button>
		<button v-link="'/innopoints'"	title="">innopoints</button>
		<button v-link="'/profile'"		title="">my profile</button>
		<button v-link="'/admin_side'"	v-if="user.isAdmin"	title="">admin_side</button>
		<button @click="logout" 		title="">logout</button>
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