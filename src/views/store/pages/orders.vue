<template lang="pug">
	.container
		order-card.my-3(v-for="order in orders", :key="order.id", :order="order")
		//- .card.card-block(v-for="o in orders | filterBy $router.app.query in 'title' 'category.title'", :status="o.status", :id="'card-' + o.id")
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
		},
	}
</script>
