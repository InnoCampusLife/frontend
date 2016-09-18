<template>
	<sidebar></sidebar>
	<router-view></router-view>
</template>

<script>
	var sidebar = require('./sidebar.vue');

	module.exports = {
		components : {
			sidebar
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