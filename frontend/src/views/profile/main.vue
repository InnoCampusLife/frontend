<template>
	<!-- <sidebar></sidebar> -->
	<content></content>
</template>

<script>
	// var sidebar = require('./sidebar.vue');
	var content = require('./content.vue');

	module.exports = {
		components : {
			content,
			// sidebar
		},
		route (transition) {
			this.$router.app.user.account.update((result) => {
				transition.next();
			});
		}
	}
</script>