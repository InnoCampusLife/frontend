<template lang="jade">
	.container
		// .card.card-block(v-for="o in orders | filterBy $router.app.query in 'title' 'category.title'", :status="o.status", :id="'card-' + o.id")
		.card.card-block(v-for="o in orders", :status="o.status", :id="'card-' + o.id")
			span.float-xs-right {{ o.creation_date }}
			h2.card-title.clearfix
				span.tag.tag-default.tag-success.float-xs-left(:status="o.status") {{ o.status | startCase }}
				span.float-xs-left.mx-1 {{(o._id = '#' + o.id)}} {{ o.type | startCase }}
					small.text-muted  by {{o.author.username}}
			h4
				template(v-if="o.items > 0") Items
				template(v-else) Item
			.table-responsive
				table.table.table-striped.table-bordered.table-sm
					thead
						tr
							th.text-xs-center #
							th.text-xs-center Title
							th.text-xs-center Amount
							th.text-xs-center Category
							th.text-xs-center Porperties
							th.text-xs-center Price
					tbody
						tr(v-for="(item, index) in o.items")
							th(scope='row') {{ index + 1 }}
							// TODO: add a link to item page
							td {{ item.title }}
							td {{ item.amount }}
							td {{ item.category.title }}
							td
								template(v-if="item.properties")
									template(v-for="(value, key) in item.properties")
										p.mb-0
											span {{ key }}:
											span.font-weight-bold  {{ value }}
								template(v-else) -
							td {{ item.price }}
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
				this.$router.app.user.innopoints.api.user.getListOfOrders(
					(orders) => {
						console.log('Orders: ', orders)
						orders.forEach((o) => {
							const timestamp = o.creation_date * 1000;
							o.creation_time = new Date(timestamp).toLocaleTimeString('ru');
							o.creation_date = new Date(timestamp).toLocaleDateString('ru');
						})
						this.orders = orders
					},
					(error) => console.log(error))
			}
		},
	}
</script>
