<template>
	<aside secondary sidebar>
		<template v-if="user.isModerator">
			<button menu block v-link="{ name: 'accounts' }">manage accounts</button>
		</template>
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