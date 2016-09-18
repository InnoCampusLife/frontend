<template>
	<aside menubar>
		<div menu>
			<div id="applications">
				<button main item v-link="{ name: 'applications', params: { username: user.account.username } }">Applications</button>
			</div>
			<div id="shop">
				<button main item v-link="{ name: 'shop', params: { username: user.account.username } }">Shop</button>
				<button item>cart</button>
				<button item>orders</button>
			</div>
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