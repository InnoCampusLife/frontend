<template>
	<header>
		<slot></slot>
		<button title="Lock the application." id="logout" icon="&#xe603;" @click="logout" block></button>
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