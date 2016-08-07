<template>
	<div block center children>
		<h3>{{ user.role | capitalize }}'s dashboard</h3>
		<h5>{{ user.innopoints.amount }} innopoints</h5>
	</div>
	<div flex column center children>
		<button padding margin style="width: 100%; border-width: 0;" block v-link="'/'"
		>main</button>
		<button padding margin style="width: 100%; border-width: 0;" block v-link="'/feed'"
		>news</button>
		<button padding margin style="width: 100%; border-width: 0;" block v-link="'/account'"
		>my profile</button>
		<!-- Sudent buttons here -->
		<template v-if="user.isStudent">
			<button padding margin style="width: 100%; border-width: 0;" block v-link="'/account/innopoints'"
			>innopoints</button>
		</template>
		<!-- Admin buttons here -->
		<template v-if="user.isAdmin">
			<button padding margin style="width: 100%; border-width: 0;" block v-link="'/administration/accounts'"
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
		route : {
			data (transition) {
				user.innopoints.update();
			}
		}
	}
</script>