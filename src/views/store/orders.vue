<template lang="pug">
	layout
		template(slot="app-bar")
			.row
				.col
					h1.md-title
						span.hidden-xs-down Store
						span.hidden-xs-down &ensp;&ndash;&ensp;
						span Orders
				.col.col-auto
					router-link(
						tag="md-button",
						:to="{ name: 'store' }")
						span Store
		template(slot="content")
			.container
				order.my-3(v-for="order in orders", :order="order")
				// .card.card-block(v-for="o in orders | filterBy $router.app.query in 'title' 'category.title'", :status="o.status", :id="'card-' + o.id")
</template>

<script>
	import { startCase } from 'lodash'

	export default {
		name: 'store-orders',

		data() {
			return {
				orders: [],
			}
		},

		components: {
			layout: require('./../layout.vue'),
			order: require('./components/order.vue'),
		},

		created() {
			this.fetchData()
		},

		filters: {
			startCase,
		},

		watch: {
			'$route': 'fetchData'
		},

		methods: {
			fetchData() {
				this.$root.api.innopoints.orders.many()
					.then((json) => {
						console.log('Got orders:', json.result)
						json.result.forEach((order) => {
							order.timestamp = order.creation_date
							order.creation_date = new Date(order.creation_date * 1000).toDateString()
						})
						this.orders = json.result
					})
					.catch((err) => {
						console.log('Failed to get orders:', err)
					})
			}
		},
	}
</script>
