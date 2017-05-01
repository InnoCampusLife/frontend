<template lang="pug">
	.container
		order-card.my-3(v-for="order in orders", :key="order.id", :order="order")
		//- .card.card-block(v-for="o in orders | filterBy $router.app.query in 'title' 'category.title'", :status="o.status", :id="'card-' + o.id")
</template>

<script>
	import * as _ from 'lodash'
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

		created() {
			this.fetchDataOnce()
		},

		watch: {
			$route: 'fetchDataOnce'
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
						this.orders = orders
					})
					.catch((err) => {
						console.log('Failed to get orders:', err)
					})
			},

			fetchDataOnce: _.once(function () { return this.fetchData() }),
		},
	}
</script>
