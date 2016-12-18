<template lang="jade">
	.container
			.card.card-block(v-for="o in orders | filterBy $router.app.query in 'title' 'category.title'" status="{{ o.status }}", id="card-{{ o.id }}")
				span.float-xs-right {{ o.creation_date }}
				h2.card-title.clearfix
					span.tag.tag-default.tag-success.float-xs-left(status="{{ o.status }}") {{ o.status.split('_').join(' ') | capitalize }}
					span.float-xs-left.mx-1 {{(o._id = '#' + o.id)}} {{ o.type | capitalize }}
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
							tr(v-for="i in o.items")
								th(scope='row') {{ $index + 1 }}
								// TODO: add a link to item page
								td {{ i.title }}
								td {{ i.amount }}
								td {{ i.category.title }}
								td 
									template(v-if="i.properties")
										template(v-for="(key, value) in i.properties")
											p.mb-0
												span {{ key }}:
												span.font-weight-bold  {{ value }}
									template(v-else) -
								td {{ i.price }}
				// pre {{ o | json }}
</template>

<script>

	export default {
		
		data() {
			return {
				orders: [],
			}
		},
		
		components: {
		},
		
		route: {
			data(transition) {
				this.$router.app.user.innopoints.api.user.getListOfOrders(
					(orders) => {
						console.log(orders)

						orders.forEach((o) => {
							o.creation_time = o.creation_date;
							o.creation_date = new Date(o.creation_time * 1000).toLocaleString('ru');
						})

						transition.next({
							orders,
						})
					},
					console.log
				)
			} 
		},
	}
</script>
