<template lang="jade">
	content-view
		div(slot='header')
			div
				h1.header-title Accounts
</template>

<script>
	import contentView from './../content.vue';

	export default {
		name: 'accounts-main',

		components: {
			contentView
		}
	}
</script>