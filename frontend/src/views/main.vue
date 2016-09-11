<template>
	<sidebar></sidebar>
	<content></content>
</template>

<script>
	var sidebar = require('./sidebar.vue');
	var content = require('./content.vue');

	module.exports = {
		components : {
			sidebar,
			content
		},
		route: {
			data(transition) {
				console.log("called get in main");
				var user = this.$router.app.user;
				user.account.update(result => {
					user.innopoints.data.update(result => {
						transition.next();
					});
				});
			}
		}
	}
</script>