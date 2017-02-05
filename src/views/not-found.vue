<style lang="scss">
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
							.md-display-4 404
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
