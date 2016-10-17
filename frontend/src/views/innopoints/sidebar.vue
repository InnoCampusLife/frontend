<template>
	<aside menubar>
		<div menu>
			<input type="search" id="search"
				:placeholder="'Search ' + $route.name"
				v-model="$router.app.query"
				v-show="$route.path.includes('applications') || $route.path.endsWith('shop')"
			/>
			<div id="_">
				<button main item v-link="{ name: 'applications', params: { username: user.account.username, filter: 'all' } }">Applications</button>
				<button item v-link="{ name: 'applications', params: { username: user.account.username, filter: 'in_process' } }">In process</button>
				<button item v-link="{ name: 'applications', params: { username: user.account.username, filter: 'rejected' } }">Rejected</button>
				<button item v-link="{ name: 'applications', params: { username: user.account.username, filter: 'rework' } }">In rework</button>
				<button item v-link="{ name: 'applications', params: { username: user.account.username, filter: 'approved' } }">Approved</button>
			</div>
			<div id="__">
				<button main item v-link="{ name: 'shop', params: { username: user.account.username } }">Shop</button>
				<button item>cart</button>
				<button item>orders</button>
			</div>
			<div id="___">
				<button item v-link="{ name: 'apply', params: { username: $router.app.user.account.username } }" style="
					background: hsl(226, 100%, 60%);
					color: #fff;
				">Request Innopoints +</button>
			</div>
		</div>
	</aside>
</template>

<script>
	module.exports = {
		data : function () {
			return {
				user : this.$router.app.user,
				query : this.$router.app.query
			}
		}
	}
</script>