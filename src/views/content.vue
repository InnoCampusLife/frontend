<template lang="jade">
	main
		main-header
			slot(name='header')
		.content-main
			.wrap
				router-view
			main-footer
</template>

<script>
	import mainHeader from './header.vue';
	import mainFooter from './footer.vue';

	module.exports = {
		data() {
			return {
				user: this.$root.user
			}
		},
		components: {
			mainHeader,
			mainFooter,
		}
	}
</script>
