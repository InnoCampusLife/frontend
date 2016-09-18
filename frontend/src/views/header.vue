<template>
	<header>
		<slot></slot>
		<button id="logout" @click="logout" block>logout</button>
	</header><!-- /header -->
</template>

<script>
	module.exports = {
		data () {
			return {
				user: this.$router.app.user
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