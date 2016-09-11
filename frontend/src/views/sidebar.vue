<template>
	<aside main sidebar>
		<button menu block data-points="239" v-link="{ name: 'profile', params: { username: user.account.username } }"><i class="material-icons">&#xE7FD;</i></button>
		<div menu info><span class="ion" data-icon="&#xf316;" v-text="user.innopoints.data.amount"></span></div>
		<div menu separator></div>
		<template v-if="user.account.isModerator">
			<button menu block v-link="{ name: 'accounts' }"><i class="material-icons">&#xE8D3;</i></button>
			<button menu block v-link="{ name: 'apply', params: { username: user.username } }" ><i class="material-icons">&#xE3BB;</i></button>
		</template>
		<template v-if="user.account.isStudent">
			<button menu block v-link="{ name: 'apply', params: { username: user.username } }" ><i class="material-icons">&#xE3BB;</i></button>
		</template>
		
		<button logout @click="logout" block class="ion"></button>
	</aside>
</template>

<script>
	module.exports = {
		data () {
			return {
				user : this.$router.app.user
			}
		},
		methods: {
			logout(e) {
				this.user.account.clear();
				this.$router.go('/login');
			}
		}
	}
</script>