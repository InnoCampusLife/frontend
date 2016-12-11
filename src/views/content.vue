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
	import headerMain from './header.vue';
	import footerMain from './footer.vue';

	module.exports = {
		data() {
			return {
				user: this.$root.user
			}
		},
		components: {
			headerMain,
			footerMain,
		}
	}
</script>
