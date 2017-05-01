<style lang="scss" scoped>
</style>

<template lang="pug">
	.container
		template(v-if="!item")
			.text-center
				md-spinner(md-indeterminate, :md-size="100")
		template(v-else)
			md-card(md-theme="blue")
				md-card-media
					img(:src='item.image_link', :alt="item.title", :title="item.title")
				md-card-header
					.md-title {{ item.title | startCase }}
					.md-subhead {{ item.category.title | startCase }}

				md-card-content(v-show="item.options")
					md-input-container(v-for='(option, index) in item.options', :key="option")
						label(:for="'item-option-' + index") {{ option.title }}
						md-select(
							:name="'item-option-' + index",
							:id="'item-option-' + index",
							v-model="selectedOptions[index].value",
						)
							md-option(v-for='value in option.values', :value='value', :key="value") {{ value }}

				md-card-content
					p.card-text
						span.text-success(v-if="quantity > 0") {{ quantity }} in Stock
						span.text-danger(v-else) Out of Stock

				md-card-actions
					md-button.md-primary.md-raised(
						type='button',
						:disabled="!areAllOptionsSelected || quantity <= 0",
						data-toggle="modal",
						:data-target="'#buying-modal-' + item.id",
						@click="buy",
					) IUP {{ item.price - 0.01 }}

			//- .modal.fade.buying-modal(:id="'buying-modal-' + item.id")
			//- 	.modal-dialog.modal-md
			//- 		md-theme(md-name="blue")
			//- 			md-whiteframe(md-tag="md-card", md-elevation="24")
			//- 				md-card-header
			//- 					.md-title Confirm Purchase
			//- 				md-card-media(md-ratio="4:3")
			//- 					md-image(:md-src='item.image_link', alt='')
			//- 				md-card-header
			//- 					.md-title {{ item.title }}
			//- 					.md-subhead {{ item.category.title | startCase }}

			//- 				md-card-content
			//- 					.row
			//- 						.col
			//- 							p.card-text
			//- 								span.text-success(v-if="quantity > 0") {{ quantity }} in Stock
			//- 								span.text-danger(v-else) Out of Stock
			//- 						.col-12.col-sm-auto
			//- 							p.card-text.text-info {{ item.price - 0.01 }} IP

			//- 					template(v-if="item.selectedItem && item.selectedItem.options")
			//- 						template(v-for="(value, key) in item.selectedItem.options")
			//- 							.row
			//- 								.col-sm
			//- 									p.text-sm-right {{ key }}
			//- 								.col-sm.font-weight-bold
			//- 									p {{ value }}

			//- 				.md-card-actions
			//- 					// FIXME: add quantity check here
			//- 					md-button(type='button', data-dismiss="modal") Cancel
			//- 					md-button.md-primary.md-raised(type='button', data-dismiss="modal", @click="buy(item)") Purchase
</template>

<script>
	import { Item, Order } from 'Modules/innopoints/innopoints-api'

	export default {
		name: 'store-item',

		data () {
			return {
				isLoading: false,
				item: null,
				selectedOptions: [],
			}
		},

		computed: {
			quantity () {
				return this.item.combinations
					.filter((c) => {
						return this.selectedOptions
							.filter((o) => {
								return o.value !== null
							})
							.every((o) => {
								return c.options[o.title] === o.value
							})
					})
					.reduce((sum, current) => {
						return sum + current.quantity
					}, 0)
			},

			areAllOptionsSelected () {
				return this.selectedOptions.every((o) => o.value !== null)
			},
		},

		// created () {
		// 	this.getItem()
		// },

		// watch: {
		// 	$route: 'getItem',
		// },

		activated () {
			this.getItem()
		},

		deactivated () {
			this.item = null
			this.selectedOptions = []
		},

		methods: {
			getItem () {
				this.isLoading = true

				Item.one({ item_id: this.$store.state.route.params.id })
					.then((item) => {
						console.log('Got item:', item)

						this.isLoading = false
						this.item = item

						if (item.options) {
							item.options.forEach((o) => {
								this.selectedOptions.push({ title: o.title, value: null })
							})
						}
					})
					.catch((err) => {
						console.log('Failed to get item:', err)
					})
			},

			buy () {
				const item = this.item.combinations.find((c) => {
					return this.selectedOptions.every((o) => {
						return c.options[o.title] === o.value
					})
				})

				console.log('Selected item', item)

				Order.create({
					body: {
						order: {
							is_joint_purchase: false,
							items: [
								{
									id: item.id,
									amount: 1,
								},
							],
						},
					},
				}).then((result) => {
					console.log('Order complete:', result)
					this.selectedOptions = []
					this.getItem()
				}).catch((err) => {
					console.error('Failed to complete an order:', err)
				})
			},
		},
	}
</script>
