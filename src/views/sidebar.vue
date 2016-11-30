<template>
	<aside sidebar>
		<div header v-link="'/'"><span>UIS</span></div header>
		<ul menu>
<!-- 			<li>
				<button item v-link="{ name: 'profile', params: { username: user.account.username } }">
					<span icon class="pe-7s-user"></span>
					<p text>Profile</p>
				</button>
			</li> -->
			<li>
				<button item v-link="{ name: 'applications', params: { username: user.account.username, filter: 'in_process' } }">
					<span icon class="pe-7s-medal"></span>
					<p text style="float: left;">Innopoints</p>
					<span info right
						v-show="user.account.isStudent && !user.innopoints.isAdmin"
						style="float: right;display: inline-table;margin: 0;"
						v-text="user.innopoints.data.amount"
					></span>
				</button>
			</li>
			<li>
				<button item v-link="{ name: 'store' }">
					<span icon class="pe-7s-shopbag"></span>
					<p text>Store</p>
				</button>
			</li>
			<li v-if="user.account.isModerator">
				<button item v-link="{ name: 'accounts' }">
					<span icon class="pe-7s-users"></span>
					<p text>Accounts</p>
				</button>
			</li>

			<li>
				<button item bottom logout id="logout" @click="logout" block>
					<span icon class="pe-7s-upload pe-rotate-270"></span>
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