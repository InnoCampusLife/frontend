<style lang="scss" scoped>
	.container {
		padding-top: 16px;
		padding-bottom: 16px;
	}
</style>

<template lang="pug">
	layout
		template(slot="app-bar")
			.md-title Not Found
		template(slot="content")
			.container
				.row
					.col
						.text-center
							.md-display-4 :(
</template>

<script>
	import layout from './layout.vue'

	export default {
		name: 'not-found',

		components: {
			layout,
		},
	}
</script>
