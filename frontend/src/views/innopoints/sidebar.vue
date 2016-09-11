<template>
	<aside secondary sidebar>
		<template v-if="user.isStudent">
			<button menu block v-link="{ name: 'applications', params: { username: user.username } }">applications</button>
			<button menu block v-link="{ name: 'apply', params: { username: user.username } }" >apply</button>
		</template>
		<template v-if="user.isModerator">
			<button menu block v-link="{ name: 'applications', params: { username: 'all' } }">applications</button>
			<button menu block v-link="{ name: 'apply', params: { username: user.username } }" >apply</button>
		</template>
		<button menu block v-link="{ name: 'shop' }">shop</span></button>
	</aside>
</template>

<script>
	module.exports = {
		data() {
			return {
				user: this.$router.app.user.account
			}
		}
	}
</script>