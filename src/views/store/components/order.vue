<template lang="pug">
	.card-container
		md-card(:status="order.status", :id="'order-' + order.id")
			md-card-area
				md-card-content
					.row.align-items-center
						.col
							.md-title
								span(:class="'text-' + styleBasedOnStatus") {{ order.status | startCase }}
						.col-12.col-sm-auto
							.md-subhead
								span {{ order.creation_time }} {{ order.creation_date }}
				span
			md-card-area
				md-card-header
					.row.align-items-center
						.col
							.md-title
								span.text-muted  {{ '#' + order.id }}
						.col-12.col-sm-auto
							.md-subhead
								span by <a :href="'/account/' + order.author.username" :title="order.author.username">{{ order.author.username }}</a>
				md-card-content
					md-table
						md-table-header
							md-table-row
								md-table-head(md-numeric) #
								md-table-head Title
								md-table-head(md-numeric) Quantity
								md-table-head Category
								md-table-head Porperties
								md-table-head(md-numeric) Price
						md-table-body
							md-table-row(v-for="(item, index) in order.items", :key="index")
								md-table-cell(md-numeric) {{ index + 1 }}
								// TODO: add a link to item page
								md-table-cell {{ item.title }}
								md-table-cell(md-numeric) {{ item.amount }}
								md-table-cell {{ item.category.title | startCase }}
								md-table-cell
									template(v-if="item.properties")
											template(v-for="(value, key) in item.properties")
												p.mb-0
													span {{ key }}:
													span.font-weight-bold  {{ value }}
									template(v-else) —
								md-table-cell(md-numeric) {{ item.price }}
</template>

<script>

	import { startCase } from 'lodash'

	export default {
		name: 'store-order',

		props: ['order'],

		filters: {
			startCase,
		},

		computed: {
			styleBasedOnStatus() {
				switch(this.order.status) {
					case 'in_process': return 'primary'
					case 'rejected':   return 'danger'
					case 'rework':     return 'warning'
					case 'approved':   return 'success'
					default: return 'secondary'
				}
			}
		},
	}

</script>