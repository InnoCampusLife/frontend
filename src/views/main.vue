<template>
	<sidebar></sidebar>
	<router-view></router-view>
</template>

<script>
	
	import sidebar from './sidebar.vue'

	export default {
		
		components: {
			sidebar
		},
		
		route: {
			data(transition) {
				console.log("Called GET in Main");
				const router = this.$router;
				const user = this.$root.user;
				user.account.update(
					(result) => {
						user.innopoints.data.update(
							(result) => {
								transition.next();
							},
							
							(error) => {
								user.innopoints.api.user.create(
									(result) => {
										user.innopoints.data.update(
											(result) => {
												transition.next();
											}
										)
									}
								)
							}
						)
					},

					(error) => {
						console.log("Updating Error");
						router.go('/login');
					}
				)
			}
		}
	}
</script>