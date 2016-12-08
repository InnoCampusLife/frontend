<template lang="jade">
	.container-fluid
		.card-columns
			item(v-for="item in items | filterBy $router.app.query in 'title' 'price' 'category.title'", :item="item", :buy="buy")
			// For testing purposes
			// item(v-for="item in items | filterBy $router.app.query in 'title' 'price' 'category.title'", :item="item", :buy="buy")
			// item(v-for="item in items | filterBy $router.app.query in 'title' 'price' 'category.title'", :item="item", :buy="buy")
			// item(v-for="item in items | filterBy $router.app.query in 'title' 'price' 'category.title'", :item="item", :buy="buy")
			// item(v-for="item in items | filterBy $router.app.query in 'title' 'price' 'category.title'", :item="item", :buy="buy")
</template>

<script>
	const storage = require('./../../storage');

	module.exports = {
		data: function () {
			return {
				items: [],
				storage: storage
			}
		},
		components : {
			item: require('./item.vue')
		},
		route: {
			data(transition) {
				this.$router.app.user.innopoints.api.shop.getItems({
					successCallback: result => {
						transition.next({
							items: result
						});
					}
				});
			} 
		},
		methods: {
			buy(item) {
			},
		}
	}
</script>
