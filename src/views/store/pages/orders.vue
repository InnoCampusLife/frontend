<template lang="pug">
	.container
		div
			order-card.my-3(
				v-for="order in orders", 
				:key="order.id", 
				:order="order",
				@deleteOrder="openDeleteConfirm",
			)
		//- .card.card-block(v-for="o in orders | filterBy $router.app.query in 'title' 'category.title'", :status="o.status", :id="'card-' + o.id")
		md-dialog-confirm(
			:md-title="`Delete order #${currentOrder ? currentOrder.id : ''}?`",
			md-content="This cannot be undone.",
			md-ok-text="Delete",
			md-cancel-text="Cancel",
			@close="confirmDelete",
			ref='deleteConfirm',
		)
</template>

<script>
	import { reverse } from 'lodash'
	import { Order } from 'Modules/innopoints/innopoints-api'

	import orderCard from './../components/order-card.vue'

	export default {
		name: 'store-orders',

		props: ['search'],

		data () {
			return {
				orders: [],
				currentOrder: null,
			}
		},

		components: {
			orderCard,
		},

		// created() {
		// 	this.fetchData()
		// },

		// watch: {
		// 	$route: 'fetchDataOnce'
		// },

		activated () {
			this.fetchData()
		},

		methods: {
			fetchData() {
				Order.many()
					.then((orders) => {
						console.log('Got orders:', orders)
						orders.forEach((order) => {
							order.timestamp = order.creation_date
							order.creation_date = new Date(order.creation_date * 1000).toDateString()
						})
						this.orders = reverse(orders)
					})
					.catch((err) => {
						console.log('Failed to get orders:', err)
					})
			},

			openDeleteConfirm (order) {
				this.currentOrder = order
				this.$refs['deleteConfirm'].open()
			},

			confirmDelete (type) {
				if (type === 'ok') {
					Order.delete({ order_id: this.currentOrder.id })
						.then((result) => {
							this.orders.splice(this.orders.indexOf(this.currentOrder), 1)
							console.log('Deleted order:', result)
							this.currentOrder = null
							this.fetchData()
						})
						.catch((err) => {
							console.error('Failed to delete order:', err)
							this.currentOrder = null
						})
				}
			},
		},
	}
</script>
