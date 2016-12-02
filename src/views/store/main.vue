<template>
	<content>
		<div content slot="header" flex align center>
			<input type="search" id="search" search inline
				placeholder="Search store"
				v-model="$router.app.query"
				v-show="$route.path.endsWith('store')"
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