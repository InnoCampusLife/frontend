<style lang="less" scoped>
	
	img {
		width: 100%
	}

</style>

<template lang="jade">
	div.wrap-card
		div.card
			
			img.card-img-top(:src='item.image_link', alt='')
			
			.card-block
	
				h4.card-title {{ item.title }}

				h6.card-subtitle.text-muted.mt-0 {{ item.category.title | capitalize }}

				// .row
				// 	.col-xs
				// 		h6.card-subtitle.text-muted.mt-0 {{ item.category.title | capitalize }}
				// 	.col-xs.text-xs-right
				// 		h6.card-subtitle.text-info.mt-0 {{ item.price }} IP
					
				
				// div(v-show='item.possible_joint_purchase')
				// 	p.card-text You can buy it with {{item.max_buyers}} people:
				// 	.form-group(v-for="i in (item.max_buyers - 1)")
				// 		input.form-control(placeholder="Username")
				
				.form-group.row(v-for='option in item.options')
					label.col-xs-3.col-form-label(for='item-option-select-{{ $index }}') {{ option.title }}
					.col-xs-9
						select.form-control(:name='option.title', :data-index='$index', @change='onSelect(item, $event)', id='item-option-select-{{ $index }}')
							option(value='') Choose {{ option.title }}
							option(v-for='value in option.values', :value='value') {{ value }}
				
				.row.flex-items-xs-middle.mt-1
					
					.col-xs
						p.card-text
							span.text-success(v-if="quantity > 0") {{ quantity }} in Stock
							span.text-danger(v-else) Out of Stock
					
					.col-xs.text-xs-right
						// FIXME: add quantity check here
						button.btn.btn-outline-primary(
							:disabled="!(itemSelected || !item.options) || quantity < 1",
							type='button', 
							data-toggle="modal",
							data-target="#buying-modal-{{ item.id }}",
						) IUP {{ item.price - 0.01 }}

		.modal.fade.buying-modal(id="buying-modal-{{ item.id }}")
			.modal-dialog.modal-md
				.modal-content

					.modal-header
						h4.modal-title Confirm Purchase
					
					img.modal-img-middle(:src='item.image_link', alt='')
					
					.modal-body
						h4.card-title {{ item.title }}
						
						.row
							.col-xs
								h6.card-subtitle.text-muted.mt-0 {{ item.category.title | capitalize }}
							.col-xs.text-xs-right
								h6.card-subtitle.text-info.mt-0 {{ item.price - 0.01 }} IP
						
						template(v-if="item.selectedItem && item.selectedItem.options")
							template(v-for="(key, value) in item.selectedItem.options")
								.row
									.col-sm
										p.text-sm-right {{ key }}
									.col-sm.font-weight-bold
										p {{ value }}
						
						p.card-text.mt-1
							span.text-success(v-if="quantity > 0") {{ quantity }} in Stock
							span.text-danger(v-else) Out of Stock
					
					.modal-footer.text-xs-right
						// FIXME: add quantity check here
						button.btn.btn-secondary(type='button', data-dismiss="modal") Cancel
						button.btn.btn-primary(type='button', data-dismiss="modal", @click="buy(item)") Purchase
		
		
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

	export default {
		
		props: ['item', 'buy'],
		
		data () {
			return {
				buySuccessful: null,
				itemSelected: false,
			}
		},

		components: {
		},

		computed: {

			// TODO: Fix this function
			quantity() {

				console.log(this.item.selectedItem)
				
				if (!(this.item.selectedItem && Object.keys(this.item.selectedItem.options) > 0)) {
					return this.item.combinations.reduce((sum, curr) => {
						return sum + curr.quantity
					}, 0)
				} else {
					let sum = 0

					console.log('Checking quantities')
					
					for (let c of this.item.combinations) {
						let counter = 0;						
						
						for(let o in this.item.selectedItem.options) {							
							if (c.options[o] === this.item.selectedItem.options[o])
								counter++;
						}

						console.log(counter, Object.keys(this.item.selectedItem.options).length)
						
						if (counter === Object.keys(this.item.selectedItem.options).length) {
							sum += c.quantity
							break;
						}
					}

					return sum;
				}
			},
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

				console.log(user)

				this.$router.app.user.innopoints.api.store.order.create({
					order: {
						order: {
							is_joint_purchase: false,
							items: [
								curr
							],
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
