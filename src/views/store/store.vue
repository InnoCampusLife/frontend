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
						result.forEach(item => {
							var arr = [];
							for (var option in item.options)
								arr.push({title: option, values: item.options[option]});
							item.options = arr;
							console.log(item.options);
						});
						transition.next({
							items: result
						});
					}
				});
			} 
		},
		methods : {
			buy : function(item) {
				console.log(item.selected);
				console.log(!!item.combinations.find(c => c.options.equals(item.selected.options)));
				item.selected = {
					id: item.combinations.find(c => c.options.equals(item.selected.options)).id
				};
				console.log(item.selected);
			},
		}
	}
</script>