<template>
	<div>
		<h4>{{ item.title }} : {{ item.price }}</h3>
		<img :src="item.image_link">
		<h4 v-text="item.category.title"></h4>
		<p v-show="item.possible_joint_purchase">This item can be bought by a group of {{ item.max_buyers }}!</p>
		<div v-for="option in item.options" style="display: block">
			<select :name="option.title" :id="option.title" :data-index="$index" @change="onselect(item, $event)">
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
				if (!item.selected || !item.selected.options) item.selected = {options: {}};

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