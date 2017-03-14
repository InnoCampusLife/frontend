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

					// div(v-show='item.possible_joint_purchase')
					// 	p.card-text You can buy it with {{item.max_buyers}} people:
					// 	.form-group(v-for="i in (item.max_buyers - 1)")
					// 		input.form-control(placeholder="Username")
					// .form-group.row(v-for='(option, index) in item.options')
					// 	label.col-xs-3.col-form-label(for="'item-option-select-' + index") {{ option.title }}
					// 	.col-xs-9
					// 		select.form-control(:name='option.title', :data-index='index', @change='onSelect(item, $event)', :id="'item-option-select-' + index")
					// 			option(value='') Choose {{ option.title }}
					// 			option(v-for='value in option.values', :value='value') {{ value }}

				md-card-content
					p.card-text
						span.text-success(v-if="quantity > 0") {{ quantity }} in Stock
						span.text-danger(v-else) Out of Stock

				md-card-actions
					md-button.md-primary.md-raised(
						:disabled="!(isItemSelected || !item.options) || quantity < 1",
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

								// template(v-if="item.selectedItem && item.selectedItem.options")
								// 	template(v-for="(value, key) in item.selectedItem.options")
								// 		.row
								// 			.col-sm
								// 				p.text-sm-right {{ key }}
								// 			.col-sm.font-weight-bold
								// 				p {{ value }}


							.md-card-actions
								// FIXME: add quantity check here
								md-button(type='button', data-dismiss="modal") Cancel
								md-button.md-primary.md-raised(type='button', data-dismiss="modal", @click="buy(item)") Purchase


			// TODO: add link to orders page here
			.alert.alert-success.alert-dismissible.fade.in(role='alert', v-show="buySuccessful === true")
				button.close(type='button', aria-label='Close', @click='buySuccessful = null')
					span(aria-hidden='true') &times;
				p.mb-0
					strong Purchase complete!
					|  You can check you purchase on the orders page.

			.alert.alert-danger.alert-dismissible.fade.in(role='alert', v-show="buySuccessful === false")
				button.close(type='button', aria-label='Close', @click='buySuccessful = null')
					span(aria-hidden='true') &times;
				p.mb-0
					strong Purchase failed!
					|  Something went wrong! You can tell us about it.

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

				if (!(this.selectedItem && Object.keys(this.selectedItem.options) > 0)) {
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

		created() {
			this.getItem()
		},

		watch: {
			$route: 'getItem',
		},

		methods: {
			getItem() {
				this.isLoading = true
				this.$root.api.innopoints.items.one({ item_id: this.$store.state.route.params.id })
					.then((json) => {
						console.log('Got item:', json.resutl)
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
