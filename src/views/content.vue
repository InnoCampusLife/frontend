<template lang="jade">
	main.main-main
		header-view
		.content-main
			.wrap
				router-view
			footer-view
</template>

<script>
	import headerView from './header.vue';
	import footerView from './footer.vue';

	export default {

		data() {
			return {
				user: this.$root.user
			}
		},

		components: {
			headerView,
			footerView,
		}
	}
</script>
