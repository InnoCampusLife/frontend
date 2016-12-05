<style lang="less">

	.content-main > .wrap {
		min-height: 100%;
		padding-top: 1rem;
		padding-bottom: 4rem; // footer
		position: relative;
	}

</style>

<template lang="jade">
	main
		main-header
			slot(name='header')
		.content-main._scroller-x._scroller-y
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
