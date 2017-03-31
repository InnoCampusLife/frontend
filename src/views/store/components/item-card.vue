<style lang="scss" scoped>
</style>

<template lang="pug">
		md-card(
			md-with-hover,
			md-theme="blue",
			@click="$router.push({ name: 'item', params: { id: item.id } })",
		)
			router-link(
				tag="div",
				:to="{ name: 'item', params: { id: item.id } }",
			)
				md-card-media
					img(:src='item.image_link', :alt="item.title", :title="item.title")

				md-card-header
					.md-title {{ item.title | startCase }}
					.md-subhead {{ item.category.title | startCase }}

				md-card-content
					p.card-text
						span.text-success(v-if="quantity > 0") {{ quantity }} in Stock
						span.text-danger(v-else) Out of Stock

				//- md-card-actions
				//- 	router-link.md-primary.md-raised(
				//- 		v-if="item",
				//- 		tag="md-button",
				//- 		:to="{ name: 'item', params: { id: item.id } }"
				//- 	) View
</template>

<script>
	export default {
		name: 'store-item-component',

		props: ['item'],

		computed: {
			quantity () {
				return this.item.combinations
					.reduce((sum, current) => {
						return sum + current.quantity
					}, 0)
			},
		},
	}
</script>
