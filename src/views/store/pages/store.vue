<style lang="scss" scoped>
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
			.card-columns
				.card-wrapper(
					v-for="item in filterBy(items, search, 'title', 'price', 'category.title')",
					:key="item.id",
				)
					item-card.store-item(
						:item="item",
					)
</template>

<script>
	import itemCard from './../components/item-card'

	export default {
		name: 'store-store',

		props: ['search'],

		data () {
			return {
				isLoading: false,
				items: [],
			}
		},

		components: {
			itemCard,
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
