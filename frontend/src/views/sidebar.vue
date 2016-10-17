<template>
	<aside sidebar>
		<div menu>
			<button item title="Profile" icon="&#xe602;" v-link="{ name: 'profile', params: { username: user.account.username } }"></button>
			<button item title="Innopoints" points="{{ user.innopoints.data.amount }}" v-link="{ name: 'innopoints', params: { username: user.account.username, filter: 'all' } }" v-if="user.innopoints.data.id"></button>
			<button item title="Accounts" icon="&#xe699;" v-link="{ name: 'accounts' }" v-if="user.account.isModerator"></button>

			<button item bottom logout title="Log out" id="logout" icon="&#xe603;" @click="logout" block></button>
		</div>
	</aside>
</template>

<script>
	module.exports = {
		data  : function () {
			return {
				user : this.$router.app.user
			}
		},
		methods: {
			logout : function (e) {
				this.user.account.clear();
				this.$router.go('/login');
			}
		}
	}
</script>