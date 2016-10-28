<template>
	<content>
		<div slot="header" flex center children>
			<input type="search" id="search" inline
				:placeholder="'Search ' + $route.name"
				v-model="$router.app.query"
				v-show="showApplications || showShop"
			/>
			<div menu>
				<template v-if="showApplications">
					<select name="applications" id="applications" @change="filter_changed" inline>
						<option value="all">All Applications</option>
						<option value="in_process">In process</option>
						<option value="rejected">Rejected</option>
						<option value="rework">In rework</option>
						<option value="approved">Approved</option>
					</select>
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
				get showApplications() { console.log(this.route.path.includes('applications')); return this.route.path.includes('applications'); },
				get showShop() { console.log(this.route.path.endsWith('shop')); return this.route.path.endsWith('shop'); }
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