<template>
	<div v-if="!$route.user.is.uis.moderator">
		<sidebar></sidebar>
		<content></content>
	</div>
	<div v-else style="margin: 42px">
		<router-view></router-view>
	</div>
</template>

<script>
	var sidebar = require('./sidebar.vue');
	var content = require('./content.vue');

	module.exports = {
		components : {
			content,
			sidebar
		},
		route (transition) {
			$route.user.update((result) => {
				transition.next({
					user: result
				});
			});
		}
	}
</script>