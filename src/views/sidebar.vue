<template>
	<aside class="sidebar">
		<div class="header" v-link="'/'"><span>UIS</span></div>
		<ul class="menu">
 			<li>
				<button class="item" v-link="{ name: 'profile', params: { username: user.account.username } }">
					<span class="icon pe-7s-user"></span>
					<p class="text">Profile</p>
				</button>
			</li> 
			<li>
				<button class="item" v-link="{ name: 'applications', params: { username: user.account.username, filter: 'in_process' } }">
					<span class="icon pe-7s-medal"></span>
					<p class="text">Innopoints</p>
					<span class="info right"
						v-show="user.account.isStudent && !user.innopoints.isAdmin"
						v-text="user.innopoints.data.amount"
					></span>
				</button>
			</li>
			<li>
				<button class="item" v-link="{ name: 'store' }">
					<span class="icon pe-7s-shopbag"></span>
					<p class="text">Store</p>
				</button>
			</li>
			<li v-if="user.account.isModerator">
				<button class="item" v-link="{ name: 'accounts' }">
					<span class="icon pe-7s-users"></span>
					<p class="text">Accounts</p>
				</button>
			</li>

			<li>
				<button class="item" bottom logout id="logout" @click="logout" block>
					<span class="icon pe-7s-upload pe-rotate-270"></span>
					<p class="text">Log out</p>
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
