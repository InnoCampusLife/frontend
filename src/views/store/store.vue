<template lang="jade">
	.container-fluid
		.card-columns
			// item(v-for="item in items | filterBy $router.app.query in 'title' 'price' 'category.title'", :item="item", :buy="buy")
			item(v-for="item in items", :item="item")
</template>

<script>
	export default {
		name: 'store-store',

		data() {
			return {
				items: [],
				storage: require('./../../storage')
			}
		},

		components: {
			item: require('./item.vue'),
		},

		created() {
			this.fetchData()
		},

		watch: {
			'$route': 'fetchData'
		},

		methods: {
			fetchData() {
				const self = this
				this.$router.app.user.innopoints.api.store.getItems({
					successCallback: (result) => {
						self.items = result
						console.log('Items: ', result)
					}
				})
			}
		},
	}
</script>
