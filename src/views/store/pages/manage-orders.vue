<template lang="pug">
	div
		.container.pt-0
			.row.align-items-end
				.col.col-auto
						md-input-container
							md-icon filter_list
							md-select(
								id="filter",
								name="filter",
								v-model="status",
								@change="fetchData",
							)
								md-option(value="in_process") In&nbsp;process
								md-option(value="rejected") Rejected
								//- md-option(value="rework") In&nbsp;rework
								md-option(value="approved") Approved
				.col
			.row
				.col-12
					template(v-if="!orders")
						.text-center
							md-spinner(md-indeterminate, :md-size="100")
					template(v-else-if="orders.length <= 0")
						.text-center
							p.md-title.text-muted Empty
					template(v-else)
						order-card.my-3(
							v-for="order in filterBy(orders, search, ['id', 'creation_date', 'total_price', 'author', 'title', 'status', 'category', 'items'])",
							:key="order.id",
							:order="order",
							:isReview="true",
							@approveOrder="openApproveConfirm",
							@rejectOrder="openRejectConfirm",
						)
		md-dialog-confirm(
			:md-title="`Approve order #${currOrder ? currOrder.id : ''}?`",
			md-content="This cannot be undone.",
			md-ok-text="Approve",
			md-cancel-text="Cancel",
			@close="confirmApprove",
			ref='approveConfirm',
		)
		md-dialog-confirm(
			:md-title="`Reject order #${currOrder ? currOrder.id : ''}?`",
			md-content="This cannot be undone.",
			md-ok-text="Reject",
			md-cancel-text="Cancel",
			@close="confirmReject",
			ref='rejectConfirm',
		)
</template>

<script>
	import { reverse } from 'lodash'
	import { Admin } from 'Modules/innopoints/innopoints-api'

	import orderCard from './../components/order-card.vue'

	export default {
		name: 'store-orders',

		props: ['search'],

		data () {
			return {
				orders: null,
				currOrder: null,
				status: 'in_process',
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
				Admin.Order.many({ status: this.status })
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

			openApproveConfirm (order) {
				this.currOrder = order
				this.$refs['approveConfirm'].open()
			},

			openRejectConfirm (order) {
				this.currOrder = order
				this.$refs['rejectConfirm'].open()
			},

			confirmApprove (type) {
				if (type === 'ok') {
					Admin.Order.review({ order_id: this.currOrder.id, action: 'approve' })
						.then((result) => {
							this.orders.splice(this.orders.indexOf(this.currOrder), 1)
							console.log('Approved order:', result)
							this.currOrder = null
							this.fetchData()
						})
						.catch((err) => {
							console.error('Failed to approve order:', err)
							this.currOrder = null
						})
				}
			},

			confirmReject (type) {
				if (type === 'ok') {
					Admin.Order.review({ order_id: this.currOrder.id, action: 'reject' })
						.then((result) => {
							this.orders.splice(this.orders.indexOf(this.currOrder), 1)
							console.log('Rejected order:', result)
							this.currOrder = null
							this.fetchData()
						})
						.catch((err) => {
							console.error('Failed to reject order:', err)
							this.currOrder = null
						})
				}
			},
		},
	}
</script>
