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
				console.log("called get in main");
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
						console.log("updating error");
						router.go('/login');
					}
				);
			}
		}
	}
</script>