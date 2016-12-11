<style lang="less" scoped>
	
	img {
		width: 100%
	}

	label {
		min-width: 7.5rem;
	}

</style>

<template lang="jade">
	div
		div.card
			img.card-img-top(:src='item.image_link', alt='')
			.card-block
				
				h4.card-title {{ item.title }}
					span.float-xs-right.tag.tag-default {{ item.price }} IP
				
				h6.card-subtitle.text-muted.mb-1 {{ item.category.title }}
				
				// div(v-show='item.possible_joint_purchase')
				// 	p.card-text You can buy it with {{item.max_buyers}} people:
				// 	.form-group(v-for="i in (item.max_buyers - 1)")
				// 		input.form-control(placeholder="Username")
				
				.form-group.row(v-for='option in item.options')
					label.col-xs-4.col-form-label(for='item-option-select-{{ $index }}') {{ option.title }}
					.col-xs-8
						select.form-control(:name='option.title', :data-index='$index', @change='onSelect(item, $event)', id='item-option-select-{{ $index }}')
							option(value='') Choose {{ option.title }}
							option(v-for='value in option.values', :value='value') {{ value }}
				
				p.card-text.text-xs-center
					span.text-success(v-if="getQuantity(item) > 0") {{ getQuantity(item) }} in Stock
					span.text-danger(v-else) Out of Stock
				
				// FIXME: add quantity check here
				button.btn.btn-outline-primary.btn-block(
					:disabled="!(itemSelected || !item.options)",
					type='button', 
					data-toggle="modal",
					data-target="#buying-modal-{{ item.id }}",
				) Buy

		.modal.fade.buying-modal(id="buying-modal-{{ item.id }}")
			.modal-dialog.modal-md
				.modal-content
					
					.modal-header(slot='header')
						h4.modal-title Confirm Purchase
					
					img.modal-img-middle(:src='item.image_link', alt='')
					
					.modal-body(slot='body')
						h4.card-title {{ item.title }}
							span.float-xs-right.tag.tag-default {{ item.price }} IP
						h6.card-subtitle.text-muted.mb-1 {{ item.category.title }}
						template(v-if="item.selectedItem && item.selectedItem.options")
							template(v-for="(key, value) in item.selectedItem.options")
								.row
									.col-sm
										p.text-sm-right
											{{ key }}
									.col-sm.font-weight-bold
										p {{ value }}
						p.card-text.text-xs-center
							span.text-success(v-if="getQuantity(item) > 0") {{ getQuantity(item) }} in Stock
							span.text-danger(v-else) Out of Stock
					
					.modal-footer(slot='footer')
						.row
							.col-xs
								// FIXME: add quantity check here
								button.btn.btn-block.btn-primary(type='button', data-dismiss="modal", @click="buy(item)") Buy
							.col-xs
								button.btn.btn-block.btn-secondary(type='button', data-dismiss="modal") Cancel
		
		
		// TODO: add link to orders page here
		.alert.alert-success.alert-dismissible.fade.in(role='alert', v-show="buySuccessful === true")
			button.close(type='button', aria-label='Close', @click='buySuccessful = null')
				span(aria-hidden='true') &times;
			p.mb-0
				strong Purchase complete!
				|  You can check you purchase on the orders page.

		.alert.alert-danger.alert-dismissible.fade.in(role='alert', , v-show="buySuccessful === false")
			button.close(type='button', aria-label='Close', @click='buySuccessful = null')
				span(aria-hidden='true') &times;
			p.mb-0
				strong Purchase failed!
				|  Something went wrong! You can tell us about it.

</template>

<script>

	import { modal } from 'vueboot'

	export default {
		
		props: ['item', 'buy'],
		
		data () {
			return {
				buySuccessful: null,
				itemSelected: false,
			}
		},

		components: {
			modal,
		},

		methods: {

			onSelect(item, e) {

				if (!this.item.selectedItem || !this.item.selectedItem.options) {
					this.item.selectedItem = { options: {} };

					// FIXME: Workaround for reactivity
					this.item = Object.assign({}, this.item)
				}
 
				if (e.target.value !== "") {
					this.item.selectedItem.options[e.target.name] = e.target.value

					// FIXME: Workaround for reactivity
					this.item.selectedItem.options = Object.assign({}, this.item.selectedItem.options)
				} else {
					delete this.item.selectedItem.options[e.target.name]

					// FIXME: Workaround for reactivity
					this.item.selectedItem.options = Object.assign({}, this.item.selectedItem.options)
				}

				if (Object.keys(this.item.selectedItem.options).length == item.options.length)
					this.itemSelected = true;
				else
					this.itemSelected = false;

			},
			
			// TODO: test this function
			// if no item is selected return overall quantity of all combinations
			// if some/all options are selected returns sum of quanitites of combinations
			// with such options
			getQuantity(item) {
				if (!(item.selectedItem && item.selectedItem.options)) {
					return item.combinations.reduce((sum, curr) => {
						return sum + curr.quantity
					}, 0)
				} else {
					let sum = 0
					
					for (let c of item.combinations) {
						let counter = 0;						
						
						for(let o in c.options) {							
							if (c.options[o] === this.item.selectedItem.options[o])
								counter++;
						}
						
						if (counter === item.selectedItem.options.length) {
							sum += c.quantity
							break;
						}
					}

					return sum;
				}
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
							if (c.options[o] === this.item.selectedItem.options[o])
								counter++;
						}
						
						if (counter === item.options.length) {
							curr.id = c.id;
							break;
						}
					}
				}

				let self = this
				this.$router.app.user.innopoints.api.store.order.create({
					order: {
						order: {
							is_joint_purchase: item.possible_joint_purchase,
							items: [
								curr
							],
							contributors: [
								{
									id: user.innopoints.data.id,
									points_amount: user.innopoints.data.amount
								}
							]
						}
					},
					
					successCallback(result) {
						self.buySuccessful = true
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
		}
	}
</script>
