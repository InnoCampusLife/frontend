<template>
	<!-- <main content scroller-y force> -->
	<main content scroller-y>
		<main-header>
			<slot name="header"></slot>
		</main-header>
		<div scroller-x>
			<router-view></router-view>
		</div>
	</main>
</template>

<script>
	var mainHeader = require('./header.vue');

	module.exports = {
		components: {
			mainHeader
		}
	}
</script>