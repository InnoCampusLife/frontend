<template>
	<content>
		<div content slot="header" flex align center>
			<input item type="search" id="search" inline
				placeholder="Search shop"
				v-model="$router.app.query"
				v-show="$route.path.endsWith('shop')"
			/>
		</div>
	</content>
</template>

<script>
	module.exports = {
		components : {
			content: require('./../content.vue')
		}
	}
</script>