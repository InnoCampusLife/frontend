<template>
	<div>
		<h4>{{ item.title }} : {{ item.price }}</h3>
		<img :src="item.image_link">
		<h4 v-text="item.category.title"></h4>
		<p v-show="item.possible_joint_purchase">This item can be bought by a group of {{ item.max_buyers }}!</p>
		<div v-for="option in item.options" style="display: block">
			<select name="option.title" :id="option.title" :data-index="$index" @change="onselect(item, $event)">
				<option value="">Choose {{option.title}}</option>
				<option v-for="value in option.values" :value="value">{{ value }}</option>
			</select>
		</div>
		<div :id="item.title" controls v-show="item.selected || item.options == null">
			<slot></slot>
		</div>
	</div>
</template>

<script>
	module.exports = {
		props: ['item', 'onselect'],
		methods: {
			onselect(item, e) {
				var index = e.target.dataset.index;
				item.options[index].selected = !!e.target.value;

				var selectedItems = 0;
				item.options.forEach(option => {
					if (option.selected) selectedItems++;
				});

				if (selectedItems == item.options.length) {
					item.selected = {
						id: item.combinations
						//TODO
					}
				} else {
					item.selected = false;
				}
				console.log(item.selected);

				if (item.selected) {
					document.getElementById(item.title).style.display = "block";
				} else {
					document.getElementById(item.title).style.display = "none";
				}
			}
		}
	}
</script>