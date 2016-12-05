<style lang="less" scoped>
	img {
		width: 100%;
	}
</style>

<template lang="jade">
	div.card
		img.card-img-top(:src='`http://lorempixel.com/${Math.floor(Math.random() * 4 + 2) * 100 }/${ Math.floor(Math.random() * 4 + 2) * 100 }/food`', alt='')
		.card-block
			h4.card-title {{ item.title }}
				span.tag.tag-default.float-xs-right {{ item.price }}
			h6.card-subtitle.text-muted.mb-1 {{ item.category.title }}
			p.card-text(v-show='item.possible_joint_purchase') This item can be bought by a group of {{ item.max_buyers }}!
			.form-group(v-for='option in item.options')
				select.form-control(:name='option.title', :id='option.title', :data-index='$index', @change='onselect(item, $event)')
					option(value='') Choose {{ option.title }}
					option(v-for='value in option.values', :value='value') {{ value }}
			div(:id='item.title')
				button.btn.btn-outline-primary.btn-block(type='button', @click='buy(item)') Buy
</template>

<script>
	module.exports = {
		props: ['item', 'buy'],
		methods: {
			onselect(item, e) {
				if (!item.selected || !item.selected.options) item.selected = { options: {} };
 
				if (e.target.value !== "")
					item.selected.options[e.target.name] = e.target.value;
				else delete item.selected.options[e.target.name];

				if (Object.keys(item.selected.options).length == item.options.length)
					document.getElementById(item.title).style.display = "block";
				else
					document.getElementById(item.title).style.display = "none";
			}
		}
	}
</script>
