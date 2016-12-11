<template lang="jade">
	.container-fluid
		.card-columns
			item(v-for="item in items | filterBy $router.app.query in 'title' 'price' 'category.title'", :item="item", :buy="buy")
</template>

<script>

	export default {
		
		data() {
			return {
				items: [],
				storage: require('./../../storage')
			}
		},
		
		components: {
			item: require('./item.vue'),
		},
		
		route: {
			data(transition) {
				this.$router.app.user.innopoints.api.store.getItems({
					successCallback: items => {
						transition.next({
							items,
						});
						console.log(items)
					}
				});
			} 
		},
	}
</script>
