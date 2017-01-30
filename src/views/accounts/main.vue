<template lang="jade">
	layout
		div(slot='header')
				h1.header-title Accounts
</template>

<script>
	export default {
		name: 'accounts-main',

		components: {
			layout: require('./../layout.vue'),
		},
	}
</script>