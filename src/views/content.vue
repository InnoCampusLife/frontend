<template lang="jade">
	main.main-main
		header-main
			slot(name='header')
		.content-main
			.wrap
				router-view
			footer-main
</template>

<script>
	import headerMain from './header.vue';
	import footerMain from './footer.vue';

	export default {
		
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
