<template>
	<sidebar></sidebar>
	<router-view></router-view>
</template>

<script>
	var sidebar = require('./sidebar.vue');

	module.exports = {
		components : {
			sidebar:sidebar
		},
		route: {
			data(transition) {
				console.log("Called GET in Main");
				var router = this.$router;
				var user = this.$root.user;
				user.account.update(result => {
						user.innopoints.data.update(result => {
								transition.next();
							}, error => {
								user.innopoints.api.user.create(result => {
									user.innopoints.data.update(result => {
										transition.next();
									});
								});
							}
						);
					}, error => {
						console.log("Updating Error");
						router.go('/login');
					}
				);
			}
		}
	}
</script>