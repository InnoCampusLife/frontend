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
						:disabled="!areAllOptionsSelected || quantity <= 0 || points_amount < item.price",
						data-toggle="modal",
						:data-target="'#buying-modal-' + item.id",
						@click="openBuyConfirm",
					) IUP {{ item.price - 0.01 }}

		md-dialog-confirm(
			:md-title="`Buy ${startCasedTitle}`",
			md-content="This cannot be undone.",
			md-ok-text="Confirm",
			md-cancel-text="Cancel",
			@close="confirmBuy",
			ref='buyConfirm',
		)
</template>

<script>
	import { startCase } from 'lodash'
	import { Item, Order } from 'Modules/innopoints/innopoints-api'
	import { mapState } from 'vuex'

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
			...mapState('innopoints', [
				'points_amount',
			]),

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

			startCasedTitle () {
				return startCase(this.item ? this.item.title : '')
			}
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

			openBuyConfirm() {
				this.$refs['buyConfirm'].open()
			},

			confirmBuy(type) {
				if (type === 'ok') {
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
					})
					.then((result) => {
						console.log('Order complete:', result)
						this.selectedOptions = []
						this.getItem()
					})
					.then(() => {
						this.$router.push({ name: 'orders' })
					})
					.catch((err) => {
						console.error('Failed to complete an order:', err)
					})
				}
			},
		},
	}
</script>
