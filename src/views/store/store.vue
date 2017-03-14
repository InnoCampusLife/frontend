<style lang="scss" scoped>
	.store-item {
		display: inline-block;
		margin: 12px;
	}
</style>

<template lang="pug">
	.container-fluid
		template(v-if="isLoading")
			.text-center
				md-spinner(md-indeterminate, :md-size="100")
		template(v-else-if="items.length <= 0")
			.text-center
				.md-title Empty
		template(v-else)
				transition-group.card-columns.store-item-list(name="store-item-list" tag="div")
					item.store-item(
						v-for="item in filterBy(items, search, 'title', 'price', 'category.title')",
						:item="item",
						:key="item.id",
					)
</template>

<script>
	export default {
		name: 'store-store',

		props: ['search'],

		data() {
			return {
				isLoading: false,
				items: [],
			}
		},

		components: {
			item: require('./components/item.vue'),
		},

		created() {
			this.getItems()
		},

		watch: {
			'$route': 'getItems'
		},

		methods: {
			getItems() {
				// this.isLoading = true
				this.$root.api.innopoints.items.many()
					.then((json) => {
						console.log('Got items:', json.result)
						this.items = json.result
						// this.isLoading = false
					})
					.catch((err) => {
						console.error('Failed to get items:', err)
					})
			},
		},
	}
</script>
