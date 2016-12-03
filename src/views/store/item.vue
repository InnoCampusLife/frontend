<template>
	<div>
		<img class="card-img-top" src="http://lorempixel.com/{{ Math.floor(Math.random() * 4 + 2) * 100 }}/{{ Math.floor(Math.random() * 4 + 2) * 100 }}/food" alt="">
		<div class="card-block">
			<!--<img :src="item.image_link">-->
			<h4 class="card-title">{{ item.title }} <span class="tag tag-default float-xs-right">{{ item.price }}</span></h4> 
			<h5 class="card-subtitle text-muted mb-1">{{ item.category.title }}</h5>
			<p class="card-text" v-show="item.possible_joint_purchase">This item can be bought by a group of {{ item.max_buyers }}!</p>
			<div class="form-group" v-for="option in item.options" style="display: block">
				<select class="form-control" :name="option.title" :id="option.title" :data-index="$index" @change="onselect(item, $event)">
					<option value="">Choose {{option.title}}</option>
					<option v-for="value in option.values" :value="value">{{ value }}</option>
				</select>
			</div>
			<div :id="item.title" controls>
				<slot></slot>
			</div>
		</div>
	</div>
</template>

<script>
	module.exports = {
		props: ['item'],
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