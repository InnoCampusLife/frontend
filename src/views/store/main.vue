<style lang="less" scoped>

	.input-group {
		padding-top: 13/16rem;
		padding-bottom: 13/16rem
	}

</style>

<template lang="jade">
	content
		div(slot='header')
			h1.header-title Store
			.search-group.input-group
				input#search.form-control(type='search', placeholder='Search Store', v-model='$router.app.query', v-show="$route.path.endsWith('store')")
				span.input-group-btn
					button.btn.btn-secondary(type='button') 🔍
</template>

<script>
	module.exports = {
		components: {
			content: require('./../content.vue')
		}
	}
</script>
