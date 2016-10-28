<template>
	<aside sidebar>
		<div header v-link="'/'"><span>UIS</span></div header>
		<ul menu>
			<li>
				<button item v-link="{ name: 'profile', params: { username: user.account.username } }">
					<span icon></span>
					<p text>Profile</p>
				</button>
			</li>
			<li>
				<button item left v-link="{ name: 'innopoints', params: { username: user.account.username, filter: 'all' } }" v-if="user.innopoints.data.id">
					<span info v-text="user.innopoints.data.amount"></span>
					<p text>Innopoints</p>
				</button>
				<button item right v-link="{ name: 'apply', params: { username: $router.app.user.account.username } }">
					<p text info>&#x2795;</p>
				</button>
			</li>
			<li>
				<button item v-link="{ name: 'accounts' }" v-if="user.account.isModerator">
					<span icon></span>
					<p text>Accounts</p>
				</button>
			</li>

			<li>
				<button item bottom logout id="logout" @click="logout" block>
					<span icon></span>
					<p text>Log out</p>
				</button>
			</li>
		</ul>
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