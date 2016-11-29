<template>
	<content>
		<div content slot="header" flex align center>
			<input item type="search" id="search" inline
				:placeholder="'Search ' + $route.name"
				v-model="$router.app.query"
				v-show="$route.path.includes('applications')"
			/>
			<template v-if="$route.path.includes('applications')">
				<button item 
					v-link="{name: 'applications',	params: { username: user.account.username, filter: 'all' } }"
					v-if="!user.innopoints.data.isAdmin"
				>All Applications</button>
				<button item
					v-link="{name: 'applications',	params: { username: user.account.username, filter: 'in_process' } }"
				>In process</button>
				<button item
					v-link="{name: 'applications',	params: { username: user.account.username, filter: 'rejected' } }"
				>Rejected</button>
				<button item
					v-link="{name: 'applications',	params: { username: user.account.username, filter: 'rework' } }"
				>In rework</button>
				<button item
					v-link="{name: 'applications',	params: { username: user.account.username, filter: 'approved' } }"
				>Approved</button>
			</template>
			<template v-else>
				<button main item v-link="{ name: 'applications', params: { username: user.account.username, filter: 'in_process' } }" inline>
					Applications
				</button>
			</template>
			
			<button item right v-link="{ name: 'apply', params: { username: user.account.username } }">
				<span text info style="font-size:1.5rem">+</span>
			</button>
		</div>
	</content>
</template>

<script>
	var content = require('./../content.vue');

	module.exports = {
		data : function () {
			// var route = this.$route;
			return {
				route: this.$route,
				user : this.$root.user,
			}
		},
		components : {
			content:content
		},
		methods : {
			filter_changed : function(e) {
				this.$router.go(
					{
						name: 'applications',
						params: {
							username: this.user.account.username,
							filter: e.target.dataset.value
						}
					}
				);
			}
		}
	}
</script>