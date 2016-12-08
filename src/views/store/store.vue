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
				let curr = { id: 0, amount: 1 };

				let user = this.$root.user;

				if (!item.options) {
					curr.id = item.id;
				} else {
					for (let c of item.combinations) {
						let counter = 0;						
						for(let option in c.options) {							
							if (c.options[option] === item.selected.options[option])
								counter++;
						};
						console.log(counter);
						if (counter === item.options.length) {
							curr.id = c.id;
							break;
						}
					}
				}
				
				this.$router.app.user.innopoints.api.shop.order.create({
					order: {
						order: {
							is_joint_purchase: item.possible_joint_purchase,
							items: [
								curr
							],
							contributors: [
								{
									id: user.innopoints.data.id,
									points_amount: user.innopoints.data.amount
								}
							]
						}
					},
					successCallback: console.log,
					errorCallback: console.log
				});
			},
		}
	}
</script>
