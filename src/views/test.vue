<style lang="less" scoped>
</style>

<template lang="jade">

	.container
		.card.card-block
			h1 Current path: {{ $route.path }}
			pre {{ user }}
			pre(v-show="isLoading") Loading

</template>

<script>
	export default {
		data() {
			return {
				isLoading: false,
				user: this.$router.app.user
			}
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
