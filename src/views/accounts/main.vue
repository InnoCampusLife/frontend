<template lang="jade">
	app-view
		div(slot='header')
				h1.header-title Accounts
</template>

<script>
	import appView from './../app.vue';

	export default {
		name: 'accounts-main',

		components: {
			appView
		}
	}
</script>