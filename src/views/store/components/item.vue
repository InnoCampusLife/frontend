<style lang="scss" scoped>
</style>

<template lang="pug">
	div
		md-card(md-theme="blue")
			md-card-media
				md-image(:md-src='item.image_link', alt='')
			md-card-header
				.md-title {{ item.title | startCase }}
				.md-subhead {{ item.category.title | startCase }}

			md-card-content
				p.card-text
					span.text-success(v-if="quantity > 0") {{ quantity }} in Stock
					span.text-danger(v-else) Out of Stock

			md-card-actions
				router-link.md-primary.md-raised(
					v-if="item",
					tag="md-button",
					:to="{ name: 'item', params: { id: item.id } }"
				) View

</template>

<script>
	export default {
		name: 'store-item-component',

		props: ['item'],

		data () {
			return {
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

		methods: {

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
		}
	}
</script>
