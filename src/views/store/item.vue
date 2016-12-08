<style lang="less">
	div.card > img.card-img-top {
		width: 100%;
	}
</style>

<template lang="jade">
	div.card
		img.card-img-top(:src='`http://lorempixel.com/${Math.floor(Math.random() * 4 + 2) * 100 }/${ Math.floor(Math.random() * 4 + 2) * 100 }/food`', alt='')
		.card-block
			h4.card-title {{ item.title }}
				span.float-xs-right {{ item.price }} IPs
			h6.card-subtitle.text-muted.mb-1 {{ item.category.title }}
			// div(v-show='item.possible_joint_purchase')
			// 	p.card-text You can buy it with {{item.max_buyers}} people:
			// 	.form-group(v-for="i in (item.max_buyers - 1)")
			// 		input.form-control(placeholder="Username")
			.form-group(v-for='option in item.options')
				select.form-control(:name='option.title', :data-index='$index', @change='onselect(item, $event)')
					option(value='') Choose {{ option.title }}
					option(v-for='value in option.values', :value='value') {{ value }}
			button.btn.btn-outline-primary.btn-block(:disabled="!(showButton || !item.options)", type='button', @click='buy(item)') Buy
</template>

<script>
	module.exports = {
		props: ['item', 'buy'],
		data () {
			return {
				showButton : false
			}
		},
		methods: {
			onselect(item, e) {
				if (!item.selected || !item.selected.options) item.selected = { options: {} };
 
				if (e.target.value !== "")
					item.selected.options[e.target.name] = e.target.value
				else
					delete item.selected.options[e.target.name]

				if (Object.keys(item.selected.options).length == item.options.length)
					this.showButton = true;
				else
					this.showButton = false;
			}
		}
	}
</script>
