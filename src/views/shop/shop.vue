<template>
	<section shop>
		<section product v-for="item in items | filterBy $router.app.query in 'title' 'price' 'category.title' ">
			<item :item="item">
				<button @click="buy(item)">buy!</button>
			</item>
		</section>
	</section>
</template>

<script>
	var storage = require('./../../storage.js');

	module.exports = {
		data : function () {
			return {
				items: [],
				storage: storage
			}
		},
		components: {
			item: require('./item.vue'),
		},
		route : {
			data : function (transition) {
				var _cart = JSON.parse(storage.get('cart'));
				this.$router.app.user.innopoints.api.shop.getItems({
					successCallback: result => {
						transition.next({
							items: result
						});
					}
				});
			} 
		},
		methods : {
			buy : function(item) {
				
			},
		}
	}
</script>