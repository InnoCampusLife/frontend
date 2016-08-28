<template>
	<aside sidebar>
		<button menu block v-link="{ name: 'profile', params: { username: $route.user.username } }"><span class="icon-user"></span></button>
		
		<button menu block v-link="{ name: 'administration', params: { username: $route.user.username } }" v-if="$route.user.is.uis.moderator"><span class="icon-users"></span></button>

		<button logout @click="logout" block><span class="icon-logout"></span></button>
	</aside>
</template>

<script>
	module.exports = {
		data() {
			return {
				
			}
		},
		methods: {
			logout(e) {
				this.$route.user.clear();
				this.$router.go('/login');
			}
		}
	}
</script>