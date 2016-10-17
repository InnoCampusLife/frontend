<template>
	<!-- <main content scroller-y-force> -->
	<main content>
		<!-- <main-header>
			<slot name="header"></slot>
		</main-header> -->
		<div scroller-x scroller-y>
			<router-view></router-view>
		</div>
	</main>
</template>

<script>
	var mainHeader = require('./header.vue');

	module.exports = {
		components: {
			mainHeader
		},
		// methods: {
		// 	scrl : function (e) {
		// 		if (e.target.scrollTop > 49)
		// 			e.target.setAttribute('scrolled', '');
		// 		else
		// 			e.target.removeAttribute('scrolled');
		// 	}
		// }
	}
</script>