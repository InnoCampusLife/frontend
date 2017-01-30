<style lang="scss" scoped>
	.store-item {
		display: inline-block;
		margin: 12px;
	}
</style>

<template lang="jade">
	layout
		template(slot="content")
			.container-fluid
				template(v-if="isLoading")
					.text-center
						md-spinner(md-indeterminate, :md-size="100")
				template(v-else-if="items.length <= 0")
					.text-center
						.md-title Empty :(
				template(v-else)
					.card-columns
						// item(
						// 	v-for="item in items | filterBy $router.app.query in 'title' 'price' 'category.title'",
						// 	:item="item"
						// )
						item.store-item(
							v-for="item in items",
							:item="item",
						)
</template>

<script>
	export default {
		name: 'store-store',

		data() {
			return {
				isLoading: false,
				items: [],
			}
		},

		components: {
			layout: require('./../layout.vue'),
			item: require('./components/item.vue'),
		},

		created() {
			this.fetchData()
		},

		watch: {
			'$route': 'fetchData'
		},

		methods: {
			fetchData() {
				this.isLoading = true

				this.$root.api.innopoints.items.many()
					.then((json) => {
						console.log('Fetched items:', json.result)
						this.items = json.result
						this.isLoading = false
					})
					.catch((err) => {
						console.error('Couldn\'t fetch items:', err)
					})
			},
		},
	}
</script>
