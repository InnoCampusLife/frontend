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
			data : function (transition) {
				console.log("called get in main");
				var router = this.$router;
				var user = this.$router.app.user;
				user.account.update(
					function(result) {
						user.innopoints.data.update(
							function(result) {
								transition.next();
							}, function(error) {
								user.innopoints.api.user.create(function(result) {
									user.innopoints.data.update(function(result) {
										transition.next();
									});
								});
							}
						);
					}, function(error) {
						console.log("updating error");
						router.go('/login');
					}
				);
			}
		}
	}
</script>