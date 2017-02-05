<style lang="scss" scoped>

	.container {
		padding-top: 16px;
		padding-bottom: 16px;
	}

</style>

<template lang="pug">

	layout
		template(slot="content")
			.container
				.row
					.col
						md-card
							md-card-header
								.md-title Current path: {{ $route.path }}
							md-card-content
								pre {{ user }}

</template>

<script>

	import layout from './layout.vue'

	export default {
		name: 'text',

		data() {
			return {
				isLoading: false,
				user: this.$router.app.user
			}
		},

		components: {
			layout,
		},

		created() {
			this.fetchData()
		},

		watch: {
			'$route': 'fetchData'
		},

		methods: {
			fetchData() {
				console.log("Fetching test data.");
			}
		},
	}
</script>
