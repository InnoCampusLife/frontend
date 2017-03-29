<style lang="scss" scoped>
	.store-item {
		display: inline-block;
		margin: 12px;
	}
</style>

<template lang="pug">
	.container
		template(v-if="!item")
			.text-center
				md-spinner(md-indeterminate, :md-size="100")
		template(v-else)
			md-card(md-theme="blue")
				md-card-media
					md-image(:md-src='item.image_link', alt='')
				md-card-header
					.md-title {{ item.title | startCase }}
					.md-subhead {{ item.category.title | startCase }}

				md-card-content(v-show="item.options")
					//- .form-group.row(v-for='(option, index) in item.options')
					//- 	label.col-3.col-form-label(for="'item-option-select-' + index") {{ option.title }}
					//- 	.col-9
					//- 		select.form-control(
					//- 			:name='option.title',
					//- 			:data-index='index',
					//- 			@change='onSelect(item, $event)',
					//- 			:id="'item-option-select-' + index"
					//- 		)
					//- 			option(value='') Choose {{ option.title }}
					//- 			option(v-for='value in option.values', :value='value') {{ value }}

					md-input-container(v-for='(option, index) in item.options', :key="option")
						label(:for="'item-option-' + index") {{ option.title }}
						md-select(
							:name="'item-option-' + index",
							:id="'item-option-' + index",
						)
							md-option(v-for='value in option.values', :value='value', :key="value") {{ value }}

				md-card-content
					p.card-text
						span.text-success(v-if="quantity > 0") {{ quantity }} in Stock
						span.text-danger(v-else) Out of Stock

				md-card-actions
					md-button.md-primary.md-raised(
						type='button',
						data-toggle="modal",
						:data-target="'#buying-modal-' + item.id",
					) IUP {{ item.price - 0.01 }}

			.modal.fade.buying-modal(:id="'buying-modal-' + item.id")
				.modal-dialog.modal-md
					md-theme(md-name="blue")
						md-whiteframe(md-tag="md-card", md-elevation="24")
							md-card-header
								.md-title Confirm Purchase
							md-card-media(md-ratio="4:3")
								md-image(:md-src='item.image_link', alt='')
							md-card-header
								.md-title {{ item.title }}
								.md-subhead {{ item.category.title | startCase }}

							md-card-content
								.row
									.col
										p.card-text
											span.text-success(v-if="quantity > 0") {{ quantity }} in Stock
											span.text-danger(v-else) Out of Stock
									.col-12.col-sm-auto
										p.card-text.text-info {{ item.price - 0.01 }} IP

								template(v-if="item.selectedItem && item.selectedItem.options")
									template(v-for="(value, key) in item.selectedItem.options")
										.row
											.col-sm
												p.text-sm-right {{ key }}
											.col-sm.font-weight-bold
												p {{ value }}

							.md-card-actions
								// FIXME: add quantity check here
								md-button(type='button', data-dismiss="modal") Cancel
								md-button.md-primary.md-raised(type='button', data-dismiss="modal", @click="buy(item)") Purchase

</template>

<script>
	export default {
		name: 'store-item',

		data() {
			return {
				isLoading: false,
				item: null,

				buySuccessful: null,
				isItemSelected: false,
				selectedItem: null,
			}
		},

		computed: {
			// FIXME
			quantity() {

				if (!(this.selectedItem && Object.keys(this.selectedItem.options).length > 0)) {
					return this.item.combinations.reduce((sum, curr) => {
						return sum + curr.quantity
					}, 0)
				} else {
					let sum = 0

					console.log('Checking quantities')

					for (let c of this.item.combinations) {
						let counter = 0;

						for(let o in this.selectedItem.options) {
							if (c.options[o] === this.selectedItem.options[o])
								counter++;
						}

						console.log(counter, Object.keys(this.selectedItem.options).length)

						if (counter === Object.keys(this.selectedItem.options).length) {
							sum += c.quantity
							break;
						}
					}

					return sum;
				}
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
		},

		methods: {
			getItem() {
				this.isLoading = true
				this.$root.api.innopoints.items.one({ item_id: this.$store.state.route.params.id })
					.then((json) => {
						console.log('Got item:', json.result)
						this.isLoading = false
						this.item = json.result
					})
					.catch((err) => {
						console.log('Failed to get item:', err)
					})
			},

			onSelect(item, e) {

				if (!this.selectedItem || !this.selectedItem.options) {
					this.selectedItem = { options: {} };

					// FIXME: Workaround for reactivity
					this.item = Object.assign({}, this.item)
				}

				if (e.target.value !== "") {
					this.selectedItem.options[e.target.name] = e.target.value

					// FIXME: Workaround for reactivity
					this.selectedItem.options = Object.assign({}, this.selectedItem.options)
				} else {
					delete this.selectedItem.options[e.target.name]

					// FIXME: Workaround for reactivity
					this.selectedItem.options = Object.assign({}, this.selectedItem.options)
				}

				if (Object.keys(this.selectedItem.options).length == item.options.length)
					this.isItemSelected = true;
				else
					this.isItemSelected = false;

			},

			buy(item) {

				console.log('Item: ', item)

				let curr = { id: 0, amount: 1 };
				let user = this.$root.user;

				if (!item.options) {
					curr.id = item.id;
				} else {
					for (let c of item.combinations) {
						let counter = 0;

						for(let o in c.options) {
							if (c.options[o] === this.selectedItem.options[o])
								counter++;
						}

						if (counter === item.options.length) {
							curr.id = c.id;
							break;
						}
					}
				}

				const self = this

				console.log(user)

				this.$router.app.user.innopoints.api.store.order.create({
					order: {
						order: {
							is_joint_purchase: false,
							items: [ curr ],
						}
					},
					successCallback(result) {
						self.buySuccessful = true
						// self.$parent.fetchData()
						setTimeout(() => { self.buySuccessful = null }, 5000)
						//  console.log(result)
					},
					errorCallback(error) {
						self.buySuccessful = false
						setTimeout(() => { self.buySuccessful = null }, 5000)
						// console.log(error)
					},
				})
			},
		},
	}
</script>
