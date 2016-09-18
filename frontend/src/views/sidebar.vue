<template>
	<aside sidebar>
		<div menu>
			<button item id="Profile" icon="&#xe602;" v-link="{ name: 'profile', params: { username: user.account.username } }"></button>
			<button item id="Innopoints" points="{{ user.innopoints.data.amount || 239 }}" v-link="{ name: 'innopoints', params: { username: user.account.username } }"></button>
		</div>
	</aside>
</template>

<script>
	module.exports = {
		data () {
			return {
				user : this.$router.app.user
			}
		}
	}
</script>