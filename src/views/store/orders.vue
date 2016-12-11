<template lang="jade">
	.container-fluid
		.card-columns
			
</template>

<script>

	export default {
		
		data() {
			return {
				orders: [],
			}
		},
		
		components: {
		},
		
		route: {
			data(transition) {
				this.$router.app.user.innopoints.api.user.getListOfOrders({
					successCallback: orders => {
						transition.next({
							orders,
						});
						console.log(orders)
					},
					errorCallback: console.log,
				})
			} 
		},
	}
</script>
