<template>
	<content>
		<div content slot="header" flex align center>
			<input item type="search" id="search" inline
				:placeholder="'Search ' + $route.name"
				v-model="$router.app.query"
				v-show="$route.path.includes('applications') || $route.path.endsWith('shop')"
			/>
			<div menu>
				<template v-if="$route.path.includes('applications')">
					<select item name="applications" id="applications" @change="filter_changed" inline>
						<option value="all">All Applications</option>
						<option value="in_process">In process</option>
						<option value="rejected">Rejected</option>
						<option value="rework">In rework</option>
						<option value="approved">Approved</option>
					</select>
				</template>
				<template v-else>
					<button main item v-link="{ name: 'applications', params: { username: user.account.username, filter: 'all' } }" inline>
						Applications
					</button>
				</template>
				<div id="__" inline>
					<button main item v-link="{ name: 'shop', params: { username: user.account.username } }" inline>Shop</button>
					<button item inline>cart</button>
					<button item inline>orders</button>
				</div>
			</div>
		</div>
	</content>
</template>

<script>
	var content = require('./../content.vue');

	module.exports = {
		data : function () {
			var route = this.$route;
			return {
				route: route,
				user : this.$router.app.user,
			}
		},
		components : {
			content
		},
		methods : {
			filter_changed : function(e) {
				this.$router.go(
					{
						name: 'applications',
						params: {
							username: this.user.account.username,
							filter: e.target.value
						}
					}
				);
			}
		}
	}
</script>